package egiskorea.com.job.fcrm.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.fcrm.service.FaciReseMng;
import egiskorea.com.job.fcrm.service.FaciReseMngService;
import egiskorea.com.job.fcrm.service.FaciReseMngVO;
import egiskorea.com.job.fcrm.service.FaciReseTemp;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 시설예약관리 Controller
 * @author 플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27		이푸름	최초 생성
 *  2022.02.18		전영후	2차 수정
 *  </pre>
 */
@Controller
@RequestMapping("/job/fcrm")
public class FaciReseMngController {
	
	private static final Logger logger = LoggerFactory.getLogger(FaciReseMngController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** 공통공간검색 서비스단 */
	@Resource(name = "commonnessSpaceSearchService") 
	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	@Resource(name = "faciReseMngService")
	private FaciReseMngService faciReseMngService;
	
	/**
	 * 시설예약관리 목록
	 * 
	 * @param model
	 * @return "egiskorea/com/job/fcrm/faciReseMngList";
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectFaciReseMngList.do")
	public String selectfaciReseMngList( 
			@ModelAttribute("searchVO") FaciReseMngVO faciReseMngVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{ 
			
		faciReseMngVO.setPageUnit(10);
		faciReseMngVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(faciReseMngVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(faciReseMngVO.getPageUnit());
		paginationInfo.setPageSize(faciReseMngVO.getPageSize());

		faciReseMngVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		faciReseMngVO.setLastIndex(paginationInfo.getLastRecordIndex());
		faciReseMngVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		// 시설예약관리 리스트
		Map<String, Object> map = faciReseMngService.selectFaciReseMngList(faciReseMngVO);
		// 읍면동 리스트
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		if(map.get("resultList").toString().length() < 3) {
			
			int pageIndex = faciReseMngVO.getPageIndex();
			if (pageIndex > 1) {
				faciReseMngVO.setPageIndex(pageIndex -1);
				faciReseMngVO.setPageUnit(10);
				faciReseMngVO.setPageSize(propertyService.getInt("pageSize"));
				
				paginationInfo.setCurrentPageNo(faciReseMngVO.getPageIndex());
				paginationInfo.setRecordCountPerPage(faciReseMngVO.getPageUnit());
				paginationInfo.setPageSize(faciReseMngVO.getPageSize());
				
				faciReseMngVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				faciReseMngVO.setLastIndex(paginationInfo.getLastRecordIndex());
				faciReseMngVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				map = faciReseMngService.selectFaciReseMngList(faciReseMngVO);
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
		
		return "egiskorea/com/job/fcrm/faciReseMngList";
	}
	
	/**
	 * 시설예약관리 등록페이지 호출
	 * 
	 * @param model
	 * @return "egiskorea/com/job/fcrm/insertFaciReseMngView";
	 * @throws Exception
	 */
	@RequestMapping(value="/insertFaciReseMngView.do")
	public String insertFaciReseMngView(
			@ModelAttribute("faciReseMngVO") FaciReseMngVO faciReseMngVO,
			ModelMap model) throws Exception{
		
		// 시설조회
		Map<String, Object> map3 = faciReseMngService.selectFacilPhstrnList(faciReseMngVO);
		model.addAttribute("facilNmList", map3.get("resultList"));
		
		return "egiskorea/com/job/fcrm/insertFaciReseMngView";
	}
	
	/**
	 * 시설예약관리 보조시설명 조회
	 * 
	 * @param model
	 * @return resultA
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value="/selectFacilAsstn.do")
	public ModelAndView selectFacilAsstn(
			FaciReseMngVO faciReseMngVO,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		Map<String, Object> map4 = faciReseMngService.selectFacilAsstnList(faciReseMngVO);
		
		mav.addObject("resultList", map4.get("resultList"));
		
		return mav;
	}
	
	/**
	 * 시설예약관리 보조시설 상세조회
	 * 
	 * @param model
	 * @return resultB
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value="/selectFacilAsstnDtlList.do")
	public ModelAndView selectFacilAsstnDtlList(
			FaciReseMngVO faciReseMngVO,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		Map<String, Object> map5 = faciReseMngService.selectFacilAsstnDtlList(faciReseMngVO);
		
		mav.addObject("resultList", map5.get("resultList"));
		
		return mav;
	}
	
	/**
	 * 시설예약관리 등록
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/insertFaciReseMng.do")
	public ModelAndView insertFaciReseMng(
			@ModelAttribute("searchVO") FaciReseMng faciReseMng,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			faciReseMngService.insertFaciReseMng(faciReseMng);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		return mav;
	}
	
	/**
	 * 시설예약관리 등록용 중복체크
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/dubCheckFaciReseMngRegist.do")
	public String dubCheckFaciReseMngRegist(
			@ModelAttribute("faciReseMngVO") FaciReseMngVO faciReseMngVO) throws Exception {
			//@ModelAttribute("faciReseMng") FaciReseMng faciReseMng) throws Exception {
			//@ModelAttribute("faciReseTemp") FaciReseTemp faciReseTemp) throws Exception {
			//@RequestParam Map<String,Object> checkData) throws Exception {
		//System.out.println(checkData.toString());
		String dubCnt = Integer.toString(faciReseMngService.dubCheckFaciReseMngRegist(faciReseMngVO));
		//String dubCnt = Integer.toString(faciReseMngService.dubCheckFaciReseMngRegist2(faciReseTemp));
		//String dubCnt = Integer.toString(faciReseMngService.dubCheckFaciReseMngRegistMap(checkData));
		
		return dubCnt;
		//return "";
	}
	
	/**
	 * 시설예약관리 수정용 중복체크
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/dubCheckFaciReseMngUpdate.do")
	public String dubCheckFaciReseMngUpdate(
			@ModelAttribute("faciReseMngVO") FaciReseMngVO faciReseMngVO) throws Exception {
		
		String dubCnt = Integer.toString(faciReseMngService.dubCheckFaciReseMngUpdate(faciReseMngVO));
		
		return dubCnt;
	}
	
	
	/**
	 * 시설예약관리 수정
	 * 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/updateFaciReseMng.do")
	public ModelAndView updateFaciReseMng(
			@ModelAttribute("searchVO") FaciReseMng faciReseMng,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		try {
			faciReseMngService.updateFaciReseMng(faciReseMng);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		return mav;
	}
	
	/**
	 * 시설예약관리 상세페이지 호출
	 * 
	 * @param model
	 * @return "egiskorea/com/job/fcrm/faciReseMng";
	 * @throws Exception
	 */
	@RequestMapping(value="/selectFaciReseMng.do")
	public String selectFaciReseMng(
			@ModelAttribute("faciReseMngVO") FaciReseMngVO faciReseMngVO,
			ModelMap model) throws Exception{
		
		FaciReseMng result = faciReseMngService.selectFaciReseMng(faciReseMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcrm/faciReseMng";
	}
	
	/**
	 * 시설예약관리 상세 > 수정 페이지 호출
	 * 
	 * @param model
	 * @return "egiskorea/com/job/fcrm/updateFaciReseMngView";
	 * @throws Exception
	 */
	@RequestMapping(value="/updateFaciReseMngView.do")
	public String updateFaciReseMngView(
			@ModelAttribute("faciReseMngVO") FaciReseMngVO faciReseMngVO,
			ModelMap model) throws Exception{
		
		// 상세조회
		FaciReseMng result = faciReseMngService.selectFaciReseMng(faciReseMngVO);
		// 시설명 조회
		Map<String, Object> map3 = faciReseMngService.selectFacilPhstrnList(faciReseMngVO);
		// 예약시설(보조시설) 조회
		Map<String, Object> map4 = faciReseMngService.selectFacilAsstnList(faciReseMngVO);
		
		int asstnFcltySn = result.getAsstnFcltySn();
		
		faciReseMngVO.setAsstnFcltySn(asstnFcltySn);
		
		// 시설상세정보 조회
		Map<String, Object> map5 = faciReseMngService.selectFacilAsstnDtlList(faciReseMngVO);
		
		model.addAttribute("facilNmList", map3.get("resultList"));
		model.addAttribute("facilAsstnList", map4.get("resultList"));
		model.addAttribute("faciAsstnDtlList", map5.get("resultList"));
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/fcrm/updateFaciReseMngView";
	}
	
	/**
	 * 시설예약관리 상세 > 단일삭제
	 * 
	 * @param model
	 * @return result
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteFaciReseMng.do")
	public ModelAndView deleteFaciReseMng(
			@ModelAttribute("searchVO") FaciReseMng faciReseMng,
			ModelMap model) throws Exception{
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		try {
			faciReseMngService.deleteFaciReseMng(faciReseMng);
			mav.addObject("result", "success");
		} catch(Exception e) {
			logger.info(e.getMessage());
			
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
}
