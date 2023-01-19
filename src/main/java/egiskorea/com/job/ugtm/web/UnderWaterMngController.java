package egiskorea.com.job.ugtm.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egiskorea.com.job.ugtm.service.UnderWaterMngService;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacil;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacilVO;
import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.ugtm.service.UnderWaterAgri;
import egiskorea.com.job.ugtm.service.UnderWaterAgriVO;
import egiskorea.com.job.ugtm.service.UnderWaterDevelop;
import egiskorea.com.job.ugtm.service.UnderWaterDevelopVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 지하수관리 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.29
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.29   전영후            최초 생성
 *  </pre>
 */
@Controller
@RequestMapping("/job/ugtm")
public class UnderWaterMngController {
	
	private static final Logger logger = LoggerFactory.getLogger(UnderWaterMngController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** underWaterMngService */
	@Resource(name = "underWaterMngService")
	private UnderWaterMngService underWaterMngService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/** 공통공간검색 서비스단 */
	@Resource(name = "commonnessSpaceSearchService") 
	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	/////////////////////////////////////////농업용공공관정//////////////////////////////////////////
	
	/**
	 * 지하수관리 > 농업용공공관정 목록 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/underWaterAgriList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterAgriList.do")
	public String selectUnderWaterAgriList(
			@ModelAttribute("searchVO") UnderWaterAgriVO underWaterAgriVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{ 
		
		underWaterAgriVO.setPageUnit(10);
		underWaterAgriVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(underWaterAgriVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(underWaterAgriVO.getPageUnit());
		paginationInfo.setPageSize(underWaterAgriVO.getPageSize());

		underWaterAgriVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		underWaterAgriVO.setLastIndex(paginationInfo.getLastRecordIndex());
		underWaterAgriVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		// 농업용공공관정 목록
		Map<String, Object> map = underWaterMngService.selectUnderWaterAgriList(underWaterAgriVO);
		// 읍면동 목록
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		// 관리구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterAgriManageSeList(underWaterAgriVO);
		// 세부용도 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterAgriDetailPrposSeList(underWaterAgriVO);	
		// 시설상태 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterAgriFcltsSttusList(underWaterAgriVO);
		
		if(map.get("resultList").toString().length() < 3) {
			
			int pageIndex = underWaterAgriVO.getPageIndex();
			if (pageIndex > 1) {
				underWaterAgriVO.setPageIndex(pageIndex -1);
				underWaterAgriVO.setPageUnit(10);
				underWaterAgriVO.setPageSize(propertyService.getInt("pageSize"));
				
				paginationInfo.setCurrentPageNo(underWaterAgriVO.getPageIndex());
				paginationInfo.setRecordCountPerPage(underWaterAgriVO.getPageUnit());
				paginationInfo.setPageSize(underWaterAgriVO.getPageSize());
				
				underWaterAgriVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				underWaterAgriVO.setLastIndex(paginationInfo.getLastRecordIndex());
				underWaterAgriVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				map = underWaterMngService.selectUnderWaterAgriList(underWaterAgriVO);
			}
		}
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("poiList", poiList);
		model.addAttribute("manageSeList", map3.get("resultList"));
		model.addAttribute("detailPrposSeList", map4.get("resultList"));
		model.addAttribute("fcltsSttusList", map5.get("resultList"));
		
		return "egiskorea/com/job/ugtm/underWaterAgriList";
	}
		
	/**
	 * 지하수관리 > 농업용공공관정 등록페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/insertUnderWaterAgriView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertUnderWaterAgriView.do")
	public String insertUnderWaterAgriView(
			UnderWaterAgriVO underWaterAgriVO,
			ModelMap model) throws Exception{
		
		// 관리구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterAgriManageSeList(underWaterAgriVO);
		// 세부용도 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterAgriDetailPrposSeList(underWaterAgriVO);	
		// 시설상태 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterAgriFcltsSttusList(underWaterAgriVO);
		//crud용 - 용도 목록
		Map<String, Object> map6 = underWaterMngService.selectUnderWaterAgriPrposSeList(underWaterAgriVO);
		//crud용 - 펌프형태
		Map<String, Object> map7 = underWaterMngService.selectUnderWaterAgriPumpStleSeList(underWaterAgriVO);
		//curd용 - 관리기관
		Map<String, Object> map8 = underWaterMngService.selectUnderWaterAgriManageInsttNmList(underWaterAgriVO);
		
		model.addAttribute("manageSeList", map3.get("resultList"));
		model.addAttribute("detailPrposSeList", map4.get("resultList"));
		model.addAttribute("fcltsSttusList", map5.get("resultList"));
		model.addAttribute("prposSeList", map6.get("resultList"));
		model.addAttribute("pumpStleSeList", map7.get("resultList"));
		model.addAttribute("manageInsttNmList", map8.get("resultList"));
		
		return "egiskorea/com/job/ugtm/insertUnderWaterAgriView";
	}
	
	/**
	 * 지하수관리 > 농업용공공관정 등록하기 
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/insertUnderWaterAgri.do")
	public ModelAndView insertUnderWaterAgri(
			@ModelAttribute("underWaterAgri") UnderWaterAgri underWaterAgri,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.insertUnderWaterAgri(underWaterAgri);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 농업용공공관정 수정하기 
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/updateUnderWaterAgri.do")
	public ModelAndView updateUnderWaterAgri(
			@ModelAttribute("underWaterAgri") UnderWaterAgri underWaterAgri,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.updateUnderWaterAgri(underWaterAgri);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 농업용공공관정 상세페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/underWaterAgri"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterAgri.do")
	public String selectUnderWaterAgri(
			@ModelAttribute("underWaterAgriVO") UnderWaterAgriVO underWaterAgriVO,
			ModelMap model) throws Exception{
			
		UnderWaterAgri result = underWaterMngService.selectUnderWaterAgri(underWaterAgriVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/ugtm/underWaterAgri";
	}
	
	/**
	 * 지하수관리 > 농업용공공관정 수정페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/updateUnderWaterAgriView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUnderWaterAgriView.do")
	public String updateUnderWaterAgriView(
			@ModelAttribute("underWaterAgriVO") UnderWaterAgriVO underWaterAgriVO,
			ModelMap model) throws Exception{
		
		// 관리구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterAgriManageSeList(underWaterAgriVO);
		// 세부용도 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterAgriDetailPrposSeList(underWaterAgriVO);	
		// 시설상태 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterAgriFcltsSttusList(underWaterAgriVO);
		//crud용 - 용도 목록
		Map<String, Object> map6 = underWaterMngService.selectUnderWaterAgriPrposSeList(underWaterAgriVO);
		//crud용 - 펌프형태
		Map<String, Object> map7 = underWaterMngService.selectUnderWaterAgriPumpStleSeList(underWaterAgriVO);
		//curd용 - 관리기관
		Map<String, Object> map8 = underWaterMngService.selectUnderWaterAgriManageInsttNmList(underWaterAgriVO);
		
		UnderWaterAgri result = underWaterMngService.selectUnderWaterAgri(underWaterAgriVO);
		model.addAttribute("result", result);
		model.addAttribute("manageSeList", map3.get("resultList"));
		model.addAttribute("detailPrposSeList", map4.get("resultList"));
		model.addAttribute("fcltsSttusList", map5.get("resultList"));
		model.addAttribute("prposSeList", map6.get("resultList"));
		model.addAttribute("pumpStleSeList", map7.get("resultList"));
		model.addAttribute("manageInsttNmList", map8.get("resultList"));
		
		return "egiskorea/com/job/ugtm/updateUnderWaterAgriView";
	}
	
	/**
	 * 지하수관리 > 농업용공공관정 상세 > 삭제
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteUnderWaterAgri.do")
	public ModelAndView deleteUnderWaterAgri(
			@ModelAttribute("underWaterAgri") UnderWaterAgri underWaterAgri,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.deleteUnderWaterAgri(underWaterAgri);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	/**
	 * 지하수관리 > 농업용공공관정 엑셀 다운로드
	 * 
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterAgriExcelListDownload.do")
	public void selectUnderWaterAgriExcelListDownload(
			@ModelAttribute("underWaterAgriVO") UnderWaterAgriVO underWaterAgriVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<UnderWaterAgriVO> excelVO = underWaterMngService.selectUnderWaterAgriExcelList(underWaterAgriVO);
		
		String[] titleArr = new String[15];
		titleArr[0] = "관리구분";
		titleArr[1] = "주소";
		titleArr[2] = "시설명";
		titleArr[3] = "개발년도";
		titleArr[4] = "관리기관명";
		titleArr[5] = "용도구분";
		titleArr[6] = "세부용도구분";
		titleArr[7] = "구경";
		titleArr[8] = "심도";
		titleArr[9] = "양수능력";
		titleArr[10] = "토출관구경";
		titleArr[11] = "펌프형태구분";
		titleArr[12] = "펌프마력";
		titleArr[13] = "시설물상태";
		titleArr[14] = "시설물점검일자";
		
		String[] voTitleArr = new String[15];
		voTitleArr[0] = "manageSe";
		voTitleArr[1] = "adres";
		voTitleArr[2] = "fcltyNm";
		voTitleArr[3] = "devlopYear";
		voTitleArr[4] = "manageInsttNm";
		voTitleArr[5] = "prposSe";
		voTitleArr[6] = "detailPrposSe";
		voTitleArr[7] = "calbr";
		voTitleArr[8] = "dph";
		voTitleArr[9] = "wpAblty";
		voTitleArr[10] = "dscrgppCalbr";
		voTitleArr[11] = "pumpStleSe";
		voTitleArr[12] = "pumpHrspw";
		voTitleArr[13] = "fcltsSttus";
		voTitleArr[14] = "fcltsChckDe";
		
		ExcelView.excelDownload(request, response,  "지하수관리_농업용공공관정_", titleArr, voTitleArr, excelVO);
	}
	
	/////////////////////////////////////////지하수개발//////////////////////////////////////////
	
	/**
	 * 지하수관리 > 지하수개발 목록
	 * 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/underWaterDevelopList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterDevelopList.do")
	public String selectUnderWaterDevelopList(
			@ModelAttribute("searchVO") UnderWaterDevelopVO underWaterDevelopVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{ 
		
		underWaterDevelopVO.setPageUnit(10);
		underWaterDevelopVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(underWaterDevelopVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(underWaterDevelopVO.getPageUnit());
		paginationInfo.setPageSize(underWaterDevelopVO.getPageSize());

		underWaterDevelopVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		underWaterDevelopVO.setLastIndex(paginationInfo.getLastRecordIndex());
		underWaterDevelopVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		// 지하수개발 목록
		Map<String, Object> map = underWaterMngService.selectUnderWaterDevelopList(underWaterDevelopVO);
		// 읍면동 목록
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		// 암반구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterDevelopAllvlBsrckSeList(underWaterDevelopVO);
		// 용도구분 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterDevelopPrposSeList(underWaterDevelopVO);
		// 세부용도 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterDevelopDetailPrposSeList(underWaterDevelopVO);
		
		if(map.get("resultList").toString().length() < 3) {
			
			int pageIndex = underWaterDevelopVO.getPageIndex();
			if (pageIndex > 1) {
				underWaterDevelopVO.setPageIndex(pageIndex -1);
				underWaterDevelopVO.setPageUnit(10);
				underWaterDevelopVO.setPageSize(propertyService.getInt("pageSize"));
				
				paginationInfo.setCurrentPageNo(underWaterDevelopVO.getPageIndex());
				paginationInfo.setRecordCountPerPage(underWaterDevelopVO.getPageUnit());
				paginationInfo.setPageSize(underWaterDevelopVO.getPageSize());
				
				underWaterDevelopVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				underWaterDevelopVO.setLastIndex(paginationInfo.getLastRecordIndex());
				underWaterDevelopVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				map = underWaterMngService.selectUnderWaterDevelopList(underWaterDevelopVO);
			}
		}
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("poiList", poiList);
		model.addAttribute("allvlBsrckSeList", map3.get("resultList"));
		model.addAttribute("prposSeList", map4.get("resultList"));
		model.addAttribute("detailPrposSeList", map5.get("resultList"));
		
		return "egiskorea/com/job/ugtm/underWaterDevelopList";
	}
	
	
	/**
	 * 지하수관리 > 지하수개발 등록페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/insertUnderWaterDevelopView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertUnderWaterDevelopView.do")
	public String insertUnderWaterDevelopView(
			UnderWaterDevelopVO underWaterDevelopVO,
			ModelMap model) throws Exception{
		
		// 암반구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterDevelopAllvlBsrckSeList(underWaterDevelopVO);
		// 용도구분 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterDevelopPrposSeList(underWaterDevelopVO);
		// 세부용도 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterDevelopDetailPrposSeList(underWaterDevelopVO);
		// crud용 - 관리구분
		Map<String, Object> map6 = underWaterMngService.selectUnderWaterDevelopManageSeList(underWaterDevelopVO);
		// crud용 - 허가/신고
		Map<String, Object> map7 = underWaterMngService.selectUnderWaterDevelopPrmisnSttemntSeList(underWaterDevelopVO);
		
		model.addAttribute("allvlBsrckSeList", map3.get("resultList"));
		model.addAttribute("prposSeList", map4.get("resultList"));
		model.addAttribute("detailPrposSeList", map5.get("resultList"));
		model.addAttribute("manageSeList", map6.get("resultList"));
		model.addAttribute("prmisnSttemntSeList", map7.get("resultList"));
		
		return "egiskorea/com/job/ugtm/insertUnderWaterDevelopView";
	}
	
	/**
	 * 지하수관리 > 지하수개발 등록하기 
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/insertUnderWaterDevelop.do")
	public ModelAndView insertUnderWaterDevelop(
			@ModelAttribute("underWaterDevelop") UnderWaterDevelop underWaterDevelop,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.insertUnderWaterDevelop(underWaterDevelop);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 지하수개발 수정하기 
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/updateUnderWaterDevelop.do")
	public ModelAndView updateUnderWaterDevelop(
			@ModelAttribute("underWaterDevelop") UnderWaterDevelop underWaterDevelop,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.updateUnderWaterDevelop(underWaterDevelop);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 지하수개발 상세페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/underWaterDevelop"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterDevelop.do")
	public String selectUnderWaterDevelop(
			@ModelAttribute("underWaterDevelopVO") UnderWaterDevelopVO underWaterDevelopVO,
			ModelMap model) throws Exception{
		
		UnderWaterDevelop result = underWaterMngService.selectUnderWaterDevelop(underWaterDevelopVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/ugtm/underWaterDevelop";
	}
	
	/**
	 * 지하수관리 > 지하수개발 수정페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/updateUnderWaterDevelopView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUnderWaterDevelopView.do")
	public String updateUnderWaterAgriView(
			@ModelAttribute("UnderWaterDevelopVO") UnderWaterDevelopVO underWaterDevelopVO,
			ModelMap model) throws Exception{
		
		// 암반구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterDevelopAllvlBsrckSeList(underWaterDevelopVO);
		// 용도구분 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterDevelopPrposSeList(underWaterDevelopVO);
		// 세부용도 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterDevelopDetailPrposSeList(underWaterDevelopVO);
		// crud용 - 관리구분
		Map<String, Object> map6 = underWaterMngService.selectUnderWaterDevelopManageSeList(underWaterDevelopVO);
		// crud용 - 허가/신고
		Map<String, Object> map7 = underWaterMngService.selectUnderWaterDevelopPrmisnSttemntSeList(underWaterDevelopVO);
		
		UnderWaterDevelop result = underWaterMngService.selectUnderWaterDevelop(underWaterDevelopVO);
		model.addAttribute("result", result);
		model.addAttribute("allvlBsrckSeList", map3.get("resultList"));
		model.addAttribute("prposSeList", map4.get("resultList"));
		model.addAttribute("detailPrposSeList", map5.get("resultList"));
		model.addAttribute("manageSeList", map6.get("resultList"));
		model.addAttribute("prmisnSttemntSeList", map7.get("resultList"));
		
		return "egiskorea/com/job/ugtm/updateUnderWaterDevelopView";
	}
	
	/**
	 * 지하수관리 > 지하수개발 상세 > 삭제
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteUnderWaterDevelop.do")
	public ModelAndView deleteUnderWaterDevelop(
			@ModelAttribute("underWaterDevelop") UnderWaterDevelop underWaterDevelop,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.deleteUnderWaterDevelop(underWaterDevelop);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	/**
	 * 지하수관리 > 지하수개발 엑셀 다운로드
	 * 
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterDevelopExcelListDownload.do")
	public void selectUnderWaterDevelopExcelListDownload(
			@ModelAttribute("underWaterDevelopVO") UnderWaterDevelopVO underWaterDevelopVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<UnderWaterDevelopVO> excelVO = underWaterMngService.selectUnderWaterDevelopExcelList(underWaterDevelopVO);
		
		String[] titleArr = new String[15];
		titleArr[0] = "관리구분";
		titleArr[1] = "주소";
		titleArr[2] = "표고";
		titleArr[3] = "개발년도";
		titleArr[4] = "충적암반구분";
		titleArr[5] = "허가신고구분";
		titleArr[6] = "허가신고번호";
		titleArr[7] = "용도구분";
		titleArr[8] = "세부용도구분";
		titleArr[9] = "구경";
		titleArr[10] = "심도";
		titleArr[11] = "양수량";
		titleArr[12] = "연사용량";
		titleArr[13] = "토출관구경";
		titleArr[14] = "펌프마력";
		
		String[] voTitleArr = new String[15];
		voTitleArr[0] = "manageSe";
		voTitleArr[1] = "adres";
		voTitleArr[2] = "al";
		voTitleArr[3] = "devlopYear";
		voTitleArr[4] = "allvlBsrckSe";
		voTitleArr[5] = "prmisnSttemntSe";
		voTitleArr[6] = "prmisnSttemntNo";
		voTitleArr[7] = "prposSe";
		voTitleArr[8] = "detailPrposSe";
		voTitleArr[9] = "calbr";
		voTitleArr[10] = "dph";
		voTitleArr[11] = "wpQty";
		voTitleArr[12] = "yrUseQty";
		voTitleArr[13] = "dscrgppCalbr";
		voTitleArr[14] = "pumpHrspw";
		
		ExcelView.excelDownload(request, response,  "지하수관리_지하수개발_", titleArr, voTitleArr, excelVO);
	}
	
	/////////////////////////////////////////지하수이용시설//////////////////////////////////////////
	
	/**
	 * 지하수관리 > 지하수이용시설 목록
	 * 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/underWaterUseFacilList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterUseFacilList.do")
	public String selectUnderWaterUseFacilList(
			@ModelAttribute("searchVO") UnderWaterUseFacilVO underWaterUseFacilVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{ 
		
		underWaterUseFacilVO.setPageUnit(10);
		underWaterUseFacilVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(underWaterUseFacilVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(underWaterUseFacilVO.getPageUnit());
		paginationInfo.setPageSize(underWaterUseFacilVO.getPageSize());

		underWaterUseFacilVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		underWaterUseFacilVO.setLastIndex(paginationInfo.getLastRecordIndex());
		underWaterUseFacilVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		// 지하수이용시설 목록
		Map<String, Object> map = underWaterMngService.selectUnderWaterUseFacilList(underWaterUseFacilVO);
		// 읍면동목록
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		// 암반구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterUseFacilAllvlBsrckSeList(underWaterUseFacilVO);
		// 용도구분 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterUseFacilPrposSeList(underWaterUseFacilVO);
		// 세부용도 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterUseFacilDetailPrposSeList(underWaterUseFacilVO);
		
		if(map.get("resultList").toString().length() < 3) {
			
			int pageIndex = underWaterUseFacilVO.getPageIndex();
			if (pageIndex > 1) {
				underWaterUseFacilVO.setPageIndex(pageIndex -1);
				underWaterUseFacilVO.setPageUnit(10);
				underWaterUseFacilVO.setPageSize(propertyService.getInt("pageSize"));
				
				paginationInfo.setCurrentPageNo(underWaterUseFacilVO.getPageIndex());
				paginationInfo.setRecordCountPerPage(underWaterUseFacilVO.getPageUnit());
				paginationInfo.setPageSize(underWaterUseFacilVO.getPageSize());
				
				underWaterUseFacilVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				underWaterUseFacilVO.setLastIndex(paginationInfo.getLastRecordIndex());
				underWaterUseFacilVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				map = underWaterMngService.selectUnderWaterUseFacilList(underWaterUseFacilVO);
			}
		}
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("poiList", poiList);
		model.addAttribute("allvlBsrckSeList", map3.get("resultList"));
		model.addAttribute("prposSeList", map4.get("resultList"));
		model.addAttribute("detailPrposSeList", map5.get("resultList"));
		
		return "egiskorea/com/job/ugtm/underWaterUseFacilList";
	}
	
	
	/**
	 * 지하수관리 > 지하수이용시설 등록페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/insertUnderWaterUseFacilView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertUnderWaterUseFacilView.do")
	public String insertUnderWaterUseFacilView(
			UnderWaterUseFacilVO underWaterUseFacilVO,
			ModelMap model) throws Exception{
		
		// 암반구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterUseFacilAllvlBsrckSeList(underWaterUseFacilVO);
		// 용도구분 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterUseFacilPrposSeList(underWaterUseFacilVO);
		// 세부용도 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterUseFacilDetailPrposSeList(underWaterUseFacilVO);
		// crud용 - 관리구분
		Map<String, Object> map6 = underWaterMngService.selectUnderWaterUseFacilManageSeList(underWaterUseFacilVO);
		// crud용 - 허가/신고
		Map<String, Object> map7 = underWaterMngService.selectUnderWaterUseFacilPrmisnSttemntSeList(underWaterUseFacilVO);
		// crud용 - 공공/사설
		Map<String, Object> map8 = underWaterMngService.selectUnderWaterUseFacilPublicPvtesblSeList(underWaterUseFacilVO);
		
		model.addAttribute("allvlBsrckSeList", map3.get("resultList"));
		model.addAttribute("prposSeList", map4.get("resultList"));
		model.addAttribute("detailPrposSeList", map5.get("resultList"));
		model.addAttribute("manageSeList", map6.get("resultList"));
		model.addAttribute("prmisnSttemntSeList", map7.get("resultList"));
		model.addAttribute("publicPvtesblSeList", map8.get("resultList"));
		
		return "egiskorea/com/job/ugtm/insertUnderWaterUseFacilView";
	}
	
	/**
	 * 지하수관리 > 지하수이용시설 등록하기 
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/insertUnderWaterUseFacil.do")
	public ModelAndView insertUnderWaterUseFacil(
			@ModelAttribute("underWaterUseFacil") UnderWaterUseFacil underWaterUseFacil,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.insertUnderWaterUseFacil(underWaterUseFacil);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 지하수이용시설 수정하기 
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/updateUnderWaterUseFacil.do")
	public ModelAndView updateUnderWaterUseFacil(
			@ModelAttribute("underWaterUseFacil") UnderWaterUseFacil underWaterUseFacil,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.updateUnderWaterUseFacil(underWaterUseFacil);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 지하수이용시설 상세페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/underWaterUseFacil"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterUseFacil.do")
	public String selectUnderWaterUseFacil(
			@ModelAttribute("underWaterUseFacilVO") UnderWaterUseFacilVO underWaterUseFacilVO,
			ModelMap model) throws Exception{
		
		UnderWaterUseFacil result = underWaterMngService.selectUnderWaterUseFacil(underWaterUseFacilVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/ugtm/underWaterUseFacil";
	}
	
	/**
	 * 지하수관리 > 지하수이용시설 수정페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/ugtm/updateUnderWaterUseFacilView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateUnderWaterUseFacilView.do")
	public String updateUnderWaterUseFacilView(
			@ModelAttribute("underWaterUseFacilVO") UnderWaterUseFacilVO underWaterUseFacilVO,
			ModelMap model) throws Exception{
			
		// 암반구분 목록
		Map<String, Object> map3 = underWaterMngService.selectUnderWaterUseFacilAllvlBsrckSeList(underWaterUseFacilVO);
		// 용도구분 목록
		Map<String, Object> map4 = underWaterMngService.selectUnderWaterUseFacilPrposSeList(underWaterUseFacilVO);
		// 세부용도 목록
		Map<String, Object> map5 = underWaterMngService.selectUnderWaterUseFacilDetailPrposSeList(underWaterUseFacilVO);
		// crud용 - 관리구분
		Map<String, Object> map6 = underWaterMngService.selectUnderWaterUseFacilManageSeList(underWaterUseFacilVO);
		// crud용 - 허가/신고
		Map<String, Object> map7 = underWaterMngService.selectUnderWaterUseFacilPrmisnSttemntSeList(underWaterUseFacilVO);
		// crud용 - 공공/사설
		Map<String, Object> map8 = underWaterMngService.selectUnderWaterUseFacilPublicPvtesblSeList(underWaterUseFacilVO);
		
		UnderWaterUseFacil result = underWaterMngService.selectUnderWaterUseFacil(underWaterUseFacilVO);
		model.addAttribute("result", result);
		model.addAttribute("allvlBsrckSeList", map3.get("resultList"));
		model.addAttribute("prposSeList", map4.get("resultList"));
		model.addAttribute("detailPrposSeList", map5.get("resultList"));
		model.addAttribute("manageSeList", map6.get("resultList"));
		model.addAttribute("prmisnSttemntSeList", map7.get("resultList"));
		model.addAttribute("publicPvtesblSeList", map8.get("resultList"));
		
		return "egiskorea/com/job/ugtm/updateUnderWaterUseFacilView";
	}
	
	/**
	 * 지하수관리 > 지하수이용시설 상세 > 삭제
	 * 
	 * @param 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteUnderWaterUseFacil.do")
	public ModelAndView deleteUnderWaterUseFacil(
			@ModelAttribute("underWaterAgri") UnderWaterUseFacil underWaterUseFacil,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			underWaterMngService.deleteUnderWaterUseFacil(underWaterUseFacil);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	/**
	 * 지하수관리 > 지하수이용시설 엑셀 다운로드
	 * 
	 * @param 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectUnderWaterUseFacilExcelListDownload.do")
	public void selectUnderWaterUseFacilExcelListDownload(
			@ModelAttribute("underWaterUseFacilVO") UnderWaterUseFacilVO underWaterUseFacilVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<UnderWaterUseFacilVO> excelVO = underWaterMngService.selectUnderWaterUseFacilExcelList(underWaterUseFacilVO);
		
		String[] titleArr = new String[16];
		titleArr[0] = "관리구분";
		titleArr[1] = "주소";
		titleArr[2] = "표고";
		titleArr[3] = "개발년도";
		titleArr[4] = "충적암반구분";
		titleArr[5] = "허가신고구분";
		titleArr[6] = "허가신고번호";
		titleArr[7] = "용도구분";
		titleArr[8] = "세부용도구분";
		titleArr[9] = "구경";
		titleArr[10] = "심도";
		titleArr[11] = "양수량";
		titleArr[12] = "연사용량";
		titleArr[13] = "토출관구경";
		titleArr[14] = "펌프마력";
		titleArr[15] = "공공사설구분";
		
		String[] voTitleArr = new String[16];
		voTitleArr[0] = "manageSe";
		voTitleArr[1] = "adres";
		voTitleArr[2] = "al";
		voTitleArr[3] = "devlopYear";
		voTitleArr[4] = "allvlBsrckSe";
		voTitleArr[5] = "prmisnSttemntSe";
		voTitleArr[6] = "prmisnSttemntNo";
		voTitleArr[7] = "prposSe";
		voTitleArr[8] = "detailPrposSe";
		voTitleArr[9] = "calbr";
		voTitleArr[10] = "dph";
		voTitleArr[11] = "wpQty";
		voTitleArr[12] = "yrUseQty";
		voTitleArr[13] = "dscrgppCalbr";
		voTitleArr[14] = "pumpHrspw";
		voTitleArr[15] = "publicPvtesblSe";
		
		ExcelView.excelDownload(request, response,  "지하수관리_지하수이용시설_", titleArr, voTitleArr, excelVO);
	}
	
}
