package egiskorea.com.cmt.mmi.web;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egiskorea.com.cmt.mmi.service.MemoInfoService;
import egiskorea.com.cmt.mmi.service.MemoInfoVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 메모정보를 관리하는 controller 클래스
 * @author 오윤성
 * @since 2021.12.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.31   오윤성           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/cmt/mmi")
public class MemoInfoController {
	
	private static final Logger logger = LoggerFactory.getLogger(MemoInfoController.class);
	
	@Resource(name = "memoInfoService")
	private MemoInfoService memoInfoService;

	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

	/**
	 * 메모정보 목록
	 * 
	 * @param memoInfoVO
	 * @param model
	 * @return "egiskorea/com/cmt/mmi/memoInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectMemoList.do")
	public String selectMemoList(
			@ModelAttribute("searchVO") MemoInfoVO memoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			memoInfoVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			memoInfoVO.setEmplyrId("webmaster");
		}
		memoInfoVO.setPageUnit(10);
		memoInfoVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(memoInfoVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(memoInfoVO.getPageUnit());
		paginationInfo.setPageSize(memoInfoVO.getPageSize());

		memoInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		memoInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
		memoInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = memoInfoService.selectMemoInfoList(memoInfoVO);
		  
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		Gson gson = new Gson();
		String gsonResultList = gson.toJson(map.get("resultList"));
		model.addAttribute("gsonResultList",gsonResultList);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		  return "egiskorea/com/cmt/mmi/memoInfoList";
	}
	
	/**
	 * 메모정보 상세조회
	 * 
	 * @param memoInfoVO
	 * @param model
	 * @return "egiskorea/com/cmt/mmi/selectMemoInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectMemoInfoView.do")
	public String selectMemoInfoView(
			@ModelAttribute("memoInfoVO") MemoInfoVO memoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			memoInfoVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			memoInfoVO.setEmplyrId("webmaster");
		}
		
		String lastModfDt = memoInfoService.selectLastModfDt(memoInfoVO);
		String selectSubject = memoInfoService.selectSubject(memoInfoVO);
		memoInfoVO.setLastModfDt(lastModfDt);
		memoInfoVO.setSj(selectSubject);
		
		EgovMap result = memoInfoService.selectMemoInfoView(memoInfoVO);

		Map<String, Object> map = memoInfoService.selectMemoInfoList(memoInfoVO);

		Gson gson = new Gson();
		String gsonResultList = gson.toJson(result);
		model.addAttribute("pageIndex",memoInfoVO.getPageIndex());
		model.addAttribute("searchWrd",memoInfoVO.getSearchWrd());
		model.addAttribute("sortKind",memoInfoVO.getSortKind());
		model.addAttribute("searchCnd",memoInfoVO.getSearchCnd());
		model.addAttribute("gsonResultList",gsonResultList);
		model.addAttribute("result", result);
		model.addAttribute("resultList", map.get("resultList"));
		
		  return "egiskorea/com/cmt/mmi/selectMemoInfoView";
	}
	
	/**
	 * 메모정보 등록 화면 호출
	 * 
	 * @param memoInfoVO
	 * @param model
	 * @param request
	 * @return "egiskorea/com/cmt/mmi/insertMemoInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertMemoInfoView.do")
	public String insertMemoInfoView(
			@ModelAttribute("searchVO") MemoInfoVO memoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		if(loginVO != null) {
			memoInfoVO.setEmplyrId(loginVO.getId());
		} else {
			logger.info("아이디가 존재하지 않습니다");
			memoInfoVO.setEmplyrId("webmaster");
			
		}
			model.addAttribute("emplyrId", memoInfoVO.getEmplyrId());
			model.addAttribute("pageIndex",memoInfoVO.getPageIndex());
			model.addAttribute("searchWrd",memoInfoVO.getSearchWrd());
			model.addAttribute("sortKind",memoInfoVO.getSortKind());
			model.addAttribute("searchCnd",memoInfoVO.getSearchCnd());
			
		  return "egiskorea/com/cmt/mmi/insertMemoInfoView";
	}
	
	/**
	 * 메모정보 수정 화면 호출
	 * 
	 * @param memoInfoVO
	 * @param model
	 * @return "egiskorea/com/cmt/mmi/updateMemoInfoView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateMemoInfoView.do")
	public String updateMemoInfoView(
			@ModelAttribute("searchVO") MemoInfoVO memoInfoVO,
			ModelMap model, HttpServletRequest request) throws Exception{
		
		String lastModfDt = memoInfoService.selectLastModfDt(memoInfoVO);
		String selectSubject = memoInfoService.selectSubject(memoInfoVO);
		memoInfoVO.setLastModfDt(lastModfDt);
		memoInfoVO.setSj(selectSubject);
		
		EgovMap result = memoInfoService.selectMemoInfoView(memoInfoVO);
		Gson gson = new Gson();
		String gsonResultList = gson.toJson(result);
		model.addAttribute("pageIndex",memoInfoVO.getPageIndex());
		model.addAttribute("searchWrd",memoInfoVO.getSearchWrd());
		model.addAttribute("sortKind",memoInfoVO.getSortKind());
		model.addAttribute("searchCnd",memoInfoVO.getSearchCnd());
		model.addAttribute("result", result);
		model.addAttribute("gsonResultList",gsonResultList);
		  return "egiskorea/com/cmt/mmi/updateMemoInfoView";
	}
	
	/**
	 * 메모정보 등록
	 * @param memoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertMemoInfo.do")
	public ModelAndView insertMemoInfo(
			@ModelAttribute("memoInfoVO") MemoInfoVO memoInfoVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		try {
				if(loginVO != null) {
					memoInfoVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					memoInfoVO.setEmplyrId("webmaster");
				}
				memoInfoService.insertMemoInfo(memoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 메모정보 수정
	 * @param memoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateMemoInfo.do")
	public ModelAndView updateMemoInfo(
			@ModelAttribute("memoInfoVO") MemoInfoVO memoInfoVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		try {
				if(loginVO != null) {
					memoInfoVO.setEmplyrId(loginVO.getId());
				} else {
					logger.info("아이디가 존재하지 않습니다");
					memoInfoVO.setEmplyrId("webmaster");
				}
				memoInfoService.updateMemoInfo(memoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 메모정보 삭제
	 * @param MemoInfoVO
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteMemoInfo.do")
	public ModelAndView deleteMemoInfo(
			@ModelAttribute("memoInfoVO") MemoInfoVO memoInfoVO,
			HttpServletRequest request) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			memoInfoService.deleteMemoInfo(memoInfoVO);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
}
