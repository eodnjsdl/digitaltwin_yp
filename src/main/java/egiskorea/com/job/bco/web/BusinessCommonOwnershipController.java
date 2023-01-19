package egiskorea.com.job.bco.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import egiskorea.com.job.bco.service.BusinessCommonOwnershipService;
import egiskorea.com.job.bco.service.ConstructionPlanVO;
import egiskorea.com.job.bco.service.ConstructionPlan;

import egiskorea.com.job.bco.service.ConstructionScheduleVO;
import egiskorea.com.job.bco.service.ConstructionSchedule;

import egiskorea.com.job.bco.service.ConstructionScheduleOrder;

import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.cmss.service.ComtccmmnclCode;
import egiskorea.com.job.cmss.service.Comtccmmndetailcode;

import egiskorea.com.job.bco.service.ConstructionDtlsInfo;

import com.google.gson.Gson;


/**
 * @Description 사업공유관리 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2021.01.11
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.11   정재환            최초 생성
 *  </pre>
 */
@Controller
@RequestMapping("/job/bco")
public class BusinessCommonOwnershipController {
	
	private static final Logger logger = LoggerFactory.getLogger(BusinessCommonOwnershipController.class);
	
	// 사업공유 관리 서비스 등록
	@Resource(name = "businessCommonOwnershipService") private
	BusinessCommonOwnershipService businessCommonOwnershipService;
	
	// 사업공유 관리 서비스 등록
	@Resource(name = "commonnessSpaceSearchService") private
	CommonnessSpaceSearchService commonnessSpaceSearchService;
	
	// 공간조회 및 지역명칭 조회 서비스 등록
//	@Resource(name = "spaceSearchService") private
//	SpaceSearchService spaceSearchService;
	 
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	
	
	/****************************** 공사 계획 *****************************************/
	
	/** 
	 * @Description : 사업공유관리 > 공사계획정보 리스트 조회
	 * @Author egis
	 * @Date 2022.01.11
	 * @param constructionPlanVO
	 * @param model
	 * @return egiskorea/com/job/bco/constructionPlanMngList.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/selectConstructionPlanList.do")
	public String selectConstructionPlanList(@ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, TgdSccoEmdVO tgdSccoEmdVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		
		constructionPlanVO.setPageUnit(10);
		constructionPlanVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(constructionPlanVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionPlanVO.getPageUnit());
		paginationInfo.setPageSize(constructionPlanVO.getPageSize());

		constructionPlanVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionPlanVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionPlanVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionPlanList(constructionPlanVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		String codeList = gson.toJson(map3);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("clCodeList", codeList);
		model.addAttribute("codeList", map3.get("resultList"));
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		
		return "egiskorea/com/job/bco/constructionPlanList";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사계획정보 상세화면 으로 이동
	 * @Author egis
	 * @Date 2022.01.11
	 * @param constructionPlanVO
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionPlan.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/selectConstructionPlan.do")
	public String selectConstructionPlan(@ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		ConstructionPlan result = businessCommonOwnershipService.selectConstructionPlan(constructionPlanVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		
		model.addAttribute("result", result);
		model.addAttribute("codeList", map.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionPlan";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사계획정보 수정화면 으로 이동
	 * @Author egis
	 * @Date 2022.01.14
	 * @param constructionPlanVO
	 * @param model
	 * @return "egiskorea/com/job/bco/updateConstructionPlanView.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/updateConstructionPlanView.do")
	public String updateConstructionPlanView(@ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		ConstructionPlan result = businessCommonOwnershipService.selectConstructionPlan(constructionPlanVO);
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		
		model.addAttribute("result", result);
		model.addAttribute("codeList", map.get("resultList"));
		
		return "egiskorea/com/job/bco/updateConstructionPlanView";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사계획정보 수정 처리
	 * @Author egis
	 * @Date 2022.01.14
	 * @param constructionPlanVO
	 * @param model
	 * @return "/egiskorea/com/job/bco/cwp/selectConstructionPlanList.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/updateConstructionPlan.do")
	public String updateConstructionPlan(@ModelAttribute("updateVO") ConstructionPlan constructionPlan, @ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, ComtccmmnclCode comtccmmnclCode, TgdSccoEmdVO tgdSccoEmdVO, ModelMap model) throws Exception{
		
		
		businessCommonOwnershipService.updateConstructionPlan(constructionPlan);	
		
		constructionPlanVO.setPageUnit(10);
		constructionPlanVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		constructionPlanVO.setPageIndex(constructionPlanVO.getRePageIndex());
		paginationInfo.setCurrentPageNo(constructionPlanVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionPlanVO.getPageUnit());
		paginationInfo.setPageSize(constructionPlanVO.getPageSize());

		constructionPlanVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionPlanVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionPlanVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		
		constructionPlanVO.setPlnYear(constructionPlanVO.getRePlnYear());
		constructionPlanVO.setPlnQu(constructionPlanVO.getRePlnQu());
		constructionPlanVO.setCntrkTy(constructionPlanVO.getReCntrkTy());
		constructionPlanVO.setChpsnPsitn(constructionPlanVO.getReChpsnPsitn());
		constructionPlanVO.setCntrkLcAdres(constructionPlanVO.getReCntrkLcAdres());
		constructionPlanVO.setCntrkNm(constructionPlanVO.getReCntrkNm());
		
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionPlanList(constructionPlanVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		String codeList = gson.toJson(map3);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("clCodeList", codeList);
		model.addAttribute("codeList", map3.get("resultList"));
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionPlanList";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사계획정보 삭제 처리
	 * @Author egis
	 * @Date 2022.01.18
	 * @param constructionPlanVO
	 * @param model
	 * @return "/egiskorea/com/job/bco/cwp/deleteConstructionPlan.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/deleteConstructionPlan.do")
	public String deleteConstructionPlan(@ModelAttribute("updateVO") ConstructionPlan constructionPlan, @ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, ComtccmmnclCode comtccmmnclCode, TgdSccoEmdVO tgdSccoEmdVO, ModelMap model) throws Exception{
		
		businessCommonOwnershipService.deleteConstructionPlan(constructionPlan);	
		
		constructionPlanVO.setPageUnit(10);
		constructionPlanVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(constructionPlanVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionPlanVO.getPageUnit());
		paginationInfo.setPageSize(constructionPlanVO.getPageSize());

		constructionPlanVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionPlanVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionPlanVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionPlanList(constructionPlanVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);

		if(map.get("resultList").toString().length() < 3) {
			int pageIndex = constructionPlanVO.getPageIndex();
			if(pageIndex > 1) {
				constructionPlanVO.setPageIndex(pageIndex -1);
				constructionPlanVO.setPageUnit(10);
				constructionPlanVO.setPageSize(propertyService.getInt("pageSize"));		
				
				paginationInfo.setCurrentPageNo(constructionPlanVO.getPageIndex());
				paginationInfo.setRecordCountPerPage(constructionPlanVO.getPageUnit());
				paginationInfo.setPageSize(constructionPlanVO.getPageSize());

				constructionPlanVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				constructionPlanVO.setLastIndex(paginationInfo.getLastRecordIndex());
				constructionPlanVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				map = businessCommonOwnershipService.selectConstructionPlanList(constructionPlanVO);
			}
		}
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		String codeList = gson.toJson(map3);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("clCodeList", codeList);
		model.addAttribute("codeList", map3.get("resultList"));
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionPlanList";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사계획정보 등록화면 으로 이동
	 * @Author egis
	 * @Date 2022.01.11
	 * @param model
	 * @return "egiskorea/com/job/bco/insertConstructionPlanView.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/insertConstructionPlanView.do")
	public String selectConstructionPlanRegist(@ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		model.addAttribute("codeList", map.get("resultList"));
		
		return "egiskorea/com/job/bco/insertConstructionPlanView";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사계획정보 등록처리
	 * @Author egis
	 * @Date 2022.01.19
	 * @param model
	 * @return "/job/bco/cwp/selectConstructionPlanList.do"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwp/insertConstructionPlan.do")
	public String insertConstructionPlan(@ModelAttribute("insertVO") ConstructionPlan constructionPlan, ModelMap model) throws Exception{
		
		businessCommonOwnershipService.insertConstructionPlan(constructionPlan);
		
		return "redirect:/job/bco/cwp/selectConstructionPlanList.do";
	}
	
	
	
	/*******************************************************************************************************************************************************************************/
	/**************************************************************************** 공사예정 정보 ****************************************************************************************/
	
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 조회
	 * @Author egis
	 * @Date 2022.01.11
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionScheduleList.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/selectConstructionScheduleList.do")
	public String selectConstructionScheduleList(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, TgdSccoEmdVO tgdSccoEmdVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		constructionScheduleVO.setPageUnit(10);
		constructionScheduleVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(constructionScheduleVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionScheduleVO.getPageUnit());
		paginationInfo.setPageSize(constructionScheduleVO.getPageSize());

		constructionScheduleVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionScheduleVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionScheduleVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionScheduleList(constructionScheduleVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		model.addAttribute("codeList", map3.get("resultList"));
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("codeList", map3.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionScheduleList";
	}
	
	/**************************************************************************** 사업공유관리 > 공사예정정보 상세 ***********************************************************************************************/
	/**
	 * @Description : 사업공유관리 > 공사예정정보 상세화면 으로 이동
	 * @Author egis
	 * @Date 2022.01.25
	 * @param ConstructionScheduleVO, ConstructionScheduleOrder
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionSchedule.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/selectConstructionSchedule.do")
	public String selectConstructionSchedule(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder, ComtccmmnclCode comtccmmnclCode, Comtccmmndetailcode comtccmmndetailcode, ConstructionDtlsInfo constructionDtlsInfo, ModelMap model) throws Exception{
		Gson gson = new Gson(); 
		
		// 차수 정보 리스트 조회를 위한 key값 
		String CntrkPrrngId = Integer.toString(constructionScheduleVO.getCntrkPrrngId());
		constructionScheduleOrder.setCntrkPrrngId(CntrkPrrngId);
				
		// 차수 정보 리스트
        Map<String, Object> ordList  = businessCommonOwnershipService.selectConstructionScheduleOrder2(constructionScheduleVO, constructionScheduleOrder);
        
        // 공사유형 코드조회
 		comtccmmnclCode.setClCode("CWT");
 		Map<String, Object> codeList = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
 		
 		// 공사내역 상세 내용 리스트 조회
 		Map<String, Object> dtlCodeList = businessCommonOwnershipService.selectConstructionDtlsInfo(constructionDtlsInfo);
 		
 		
 		System.out.println(ordList.get("orderCntrkDtls").toString());
 		
 		// 공사유형 상세 리스트 코드조회
 		comtccmmndetailcode.setCodeId(ordList.get("orderCntrkDtls").toString());
 		Map<String, Object> codeDtlList = commonnessSpaceSearchService.selectComtccmmndetailcodeList(comtccmmndetailcode);
 		
 		
		String orderInfo = gson.toJson(ordList.get("orderInfo"));
		String orderListInfo = gson.toJson(ordList.get("orderList"));
		String codeDtl = gson.toJson(codeDtlList.get("resultList"));
		String dtlCodeList2 = gson.toJson(dtlCodeList.get("resultList"));
		
		
		model.addAttribute("nomalList", ordList.get("nomalList"));
		model.addAttribute("orderListInfo", orderListInfo);
		model.addAttribute("orderInfo", orderInfo);
		model.addAttribute("codeDtlList", codeDtl);		
		model.addAttribute("dtlListCode", dtlCodeList2);	
		model.addAttribute("orderList", ordList.get("orderList"));
		model.addAttribute("codeList", codeList.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionSchedule";
	} 
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보 상세화면 > 차수정보 조회
	 * @Author egis
	 * @Date 2022.01.25
	 * @param ConstructionScheduleVO, ConstructionScheduleOrder
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionSchedule.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/selectConstructionScheduleOderInfo.do")
	public ModelAndView selectConstructionScheduleOderInfo(@ModelAttribute("searchVO") ConstructionScheduleOrder constructionScheduleOrder, Comtccmmndetailcode comtccmmndetailcode, ModelMap model) throws Exception{
		
		// 차수 정보 리스트
        Map<String, Object> ordList  = businessCommonOwnershipService.selectConstructionScheduleOrder(constructionScheduleOrder);
        
        // 공사유형 상세 코드조회
  		comtccmmndetailcode.setCodeId(ordList.get("codeId").toString());
  		Map<String, Object> codeDtlList = commonnessSpaceSearchService.selectComtccmmndetailcodeList(comtccmmndetailcode);
        
        ModelAndView modelAndView = new ModelAndView("jsonView");
        modelAndView.addObject("orderList", ordList.get("oderInfo"));
        modelAndView.addObject("codeDtlList", codeDtlList.get("resultList"));
		
		return modelAndView;
	} 
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보 상세화면 > 공사예정 정보 삭제
	 * @Author egis
	 * @Date 2022.02.24
	 * @param ConstructionScheduleVO, ConstructionScheduleOrder
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionScheduleList.jsp"
	 * @throws Exception
	 */
	
	@RequestMapping(value = "/cws/deleteConstructionSchedule.do")
	public String deleteConstructionSchedule(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder, TgdSccoEmdVO tgdSccoEmdVO, ComtccmmnclCode comtccmmnclCode, ConstructionDtlsInfo constructionDtlsInfo, ModelMap model) throws Exception{
		  
		// 공사예정 정보 삭제 처리 
		businessCommonOwnershipService.deleteConstructionSchedule(constructionScheduleVO);
		
		// 공사예정 정보에 속해 있는 차수 정보 전체 삭제 처리
		constructionScheduleOrder.setCntrkPrrngId(Integer.toString(constructionScheduleVO.getCntrkPrrngId()));
		businessCommonOwnershipService.deleteConstructionScheduleOdr(constructionScheduleOrder);
		
		// 공사내역 상세 지우기
		businessCommonOwnershipService.deleteConstructionDtlsInfo(constructionDtlsInfo);
				
		constructionScheduleVO.setPageUnit(10);
		constructionScheduleVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(constructionScheduleVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionScheduleVO.getPageUnit());
		paginationInfo.setPageSize(constructionScheduleVO.getPageSize());

		constructionScheduleVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionScheduleVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionScheduleVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionScheduleList(constructionScheduleVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		if(map.get("resultList").toString().length() < 3) {
			int pageIndex = constructionScheduleVO.getPageIndex();
			if(pageIndex > 1) {
				paginationInfo.setCurrentPageNo(pageIndex -1);
				paginationInfo.setRecordCountPerPage(constructionScheduleVO.getPageUnit());
				paginationInfo.setPageSize(constructionScheduleVO.getPageSize());

				constructionScheduleVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
				constructionScheduleVO.setLastIndex(paginationInfo.getLastRecordIndex());
				constructionScheduleVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
				
				map = businessCommonOwnershipService.selectConstructionScheduleList(constructionScheduleVO);
			}
		}
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		model.addAttribute("codeList", map3.get("resultList"));
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("codeList", map3.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionScheduleList";
	} 
	
	/**
	 * @Description : 사업공유관리 > 공사예정정보 상세화면 > 차수정보 삭제
	 * @Author egis
	 * @Date 2022.01.25
	 * @param ConstructionScheduleVO, ConstructionScheduleOrder
	 * @param model
	 * @return ModelAndView"
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/cws/deleteConstructionScheduleOrder.do")
	public ModelAndView deleteConstructionScheduleOrder(@RequestParam(value="cntrkOdrList[]") List<String> paramMap, @RequestParam(value="cntrkPrrngId") String cntrkPrrngId, ConstructionScheduleVO constructionScheduleVO,ConstructionScheduleOrder constructionScheduleOrder, ConstructionDtlsInfo constructionDtlsInfo, ModelMap model) throws Exception{
		
		constructionScheduleOrder.setCntrkPrrngId(cntrkPrrngId);
		constructionDtlsInfo.setCntrkPrrngId(cntrkPrrngId);
		
		for(String cntrkOdr : paramMap) {
			// 차수 정보 삭제처리
			constructionScheduleOrder.setCntrkOdr(cntrkOdr);
			businessCommonOwnershipService.deleteConstructionScheduleOdr(constructionScheduleOrder);
			
			// 차수 정보 > 공사내역 상세 삭제 처리
			constructionDtlsInfo.setCntrkOdr(cntrkOdr);
			businessCommonOwnershipService.deleteConstructionDtlsInfo(constructionDtlsInfo);
		}
		// 차수 정보 전체 리스트 받기
		constructionScheduleOrder.setCntrkOdr("");		
        Map<String, Object> ordList  = businessCommonOwnershipService.selectConstructionScheduleOrder2(constructionScheduleVO, constructionScheduleOrder);
		
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("odrList", ordList.get("orderList"));

		
		return modelAndView;
	} 
	
	
	/**************************************************************************** 사업공유관리 > 공사예정 정보 수정 ***********************************************************************************************/
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 수정 페이지로 이동
	 * @Author egis
	 * @Date 2022.02.18
	 * @param model
	 * @return "egiskorea/com/job/bco/updataConstructionScheduleView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/updateConstructionScheduleView.do")
	public String updateConstructionScheduleView(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder, ComtccmmnclCode comtccmmnclCode, Comtccmmndetailcode comtccmmndetailcode, ModelMap model) throws Exception{
	Gson gson = new Gson();
		
		// 차수 정보 리스트 조회를 위한 key값 
		String CntrkPrrngId = Integer.toString(constructionScheduleVO.getCntrkPrrngId());
		constructionScheduleOrder.setCntrkPrrngId(CntrkPrrngId);
				
		// 차수 정보 리스트
        Map<String, Object> ordList  = businessCommonOwnershipService.selectConstructionScheduleOrder2(constructionScheduleVO, constructionScheduleOrder);
        
        // 공사유형 코드조회
 		comtccmmnclCode.setClCode("CWT");
 		Map<String, Object> codeList = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
 		
 		
 		System.out.println(ordList.get("orderCntrkDtls").toString());
 		// 공사유형 상세 코드조회
 		comtccmmndetailcode.setCodeId(ordList.get("orderCntrkDtls").toString());
 		Map<String, Object> codeDtlList = commonnessSpaceSearchService.selectComtccmmndetailcodeList(comtccmmndetailcode);
 		
 		
		String orderInfo = gson.toJson(ordList.get("orderInfo"));
		String orderListInfo = gson.toJson(ordList.get("orderList"));
		String codeDtl = gson.toJson(codeDtlList.get("resultList"));
		
		model.addAttribute("nomalList", ordList.get("nomalList"));
		model.addAttribute("orderInfo", orderInfo);
		model.addAttribute("codeDtlList", codeDtl);	
		model.addAttribute("orderListInfo", orderListInfo);
		model.addAttribute("orderList", ordList.get("orderList"));
		model.addAttribute("codeList", codeList.get("resultList"));
		
		return "egiskorea/com/job/bco/updateConstructionScheduleView";
	} 
	
	/**
	 * @Description : 사업공유관리 > 공사예정 기본정보 수정 
	 * @Author egis
	 * @Date 2022.02.28
	 * @param model
	 * @return "ModelAndView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/updateConstructionScheduleNomal.do")
	public ModelAndView updateConstructionScheduleNomal(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder, ModelMap model) throws Exception{
		Gson gson = new Gson();
		
		//공사 예정 정보 수정 처리(기본정보 수정)
 		businessCommonOwnershipService.updateConstructionScheduleNomal(constructionScheduleVO);
		constructionScheduleOrder.setCntrkPrrngId(Integer.toString(constructionScheduleVO.getCntrkPrrngId()));
		
		// 차수 정보 리스트 조회를 위한 key값 
		String cntrkPrrngId = Integer.toString(constructionScheduleVO.getCntrkPrrngId());
		constructionScheduleOrder.setCntrkPrrngId(cntrkPrrngId);
		
		int maxOdr = Integer.parseInt(constructionScheduleVO.getMaxOdr());
		int cntrkOdr = Integer.parseInt(constructionScheduleVO.getCntrkOdr());
		
		if(maxOdr > cntrkOdr) {
			for(int i = 1; i <= (maxOdr - cntrkOdr); i++) {
				int odrNum = Integer.parseInt(constructionScheduleVO.getCntrkOdr());
				constructionScheduleOrder.setCntrkOdr(Integer.toString(odrNum + i));
				businessCommonOwnershipService.deleteConstructionScheduleOdr(constructionScheduleOrder);
			}
		}
		
		// 차수 정보 전체 리스트 받기
		constructionScheduleOrder.setCntrkOdr("");	
		// 차수 정보 리스트
        Map<String, Object> ordList  = businessCommonOwnershipService.selectConstructionScheduleOrder2(constructionScheduleVO, constructionScheduleOrder);
    
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("odrList", ordList.get("orderList"));
		return modelAndView;
	} 
	
	/**
	 * @Description : 사업공유관리 > 공사예정 차수정보 수정처리 
	 * @Author egis
	 * @Date 2022.02.17
	 * @param model
	 * @return "modelAndView"
	 * @throws Exception
	 */
	@ResponseBody	
	@RequestMapping(value = "/cws/updateConstructionScheduleOdr.do")
	public ModelAndView updateConstructionScheduleOdr(@RequestParam Map<String,Object> dtlCodeArray, ConstructionScheduleOrder constructionScheduleOrder, ConstructionDtlsInfo constructionDtlsInfo, ModelMap model) throws Exception{
		
		businessCommonOwnershipService.updateConstructionScheduleOdr(constructionScheduleOrder);
		
		// 공사내역 상세 지우기
		businessCommonOwnershipService.deleteConstructionDtlsInfo(constructionDtlsInfo);
		
		// 공사내역 상세 등록
		for(int i = 0; i<Integer.parseInt(dtlCodeArray.get("count").toString());i++){
			constructionDtlsInfo.setCntrkDph(dtlCodeArray.get("cntrkDt["+i+"]").toString());
			constructionDtlsInfo.setCntrkDtls(dtlCodeArray.get("cntrkDh["+i+"]").toString());
			businessCommonOwnershipService.insertConstructionDtlsInfo(constructionDtlsInfo);
		}
		
		// 차수 리스트 조회
		constructionScheduleOrder.setCntrkOdr("");
		Map<String, Object> odrList = businessCommonOwnershipService.selectConstructionScheduleOrder(constructionScheduleOrder);
		
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("odrList",odrList.get("resultList"));		// 공사내역 리스트
		return modelAndView;
	}
	
	/**************************************************************************** 사업공유관리 > 공사예정 정보 등록 ***********************************************************************************************/
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 등록화면 으로 이동
	 * @Author egis
	 * @Date 2022.01.11
	 * @param model
	 * @return "egiskorea/com/job/bco/insertConstructionScheduleView.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/insertConstructionScheduleView.do")
	public String insertConstructionScheduleView(@ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		model.addAttribute("codeList", map.get("resultList"));
		
		return "egiskorea/com/job/bco/insertConstructionScheduleView";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사예정 정보 등록화면 > 공사계획 조회
	 * @Author egis
	 * @Date 2022.02.10
	 * @param model
	 * @return "egiskorea/com/job/bco/selectConstructionPlanList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/selectInnerConstructionPlan.do")
	public String selectInnerConstructionPlan(@ModelAttribute("searchVO") ConstructionPlanVO constructionPlanVO, TgdSccoEmdVO tgdSccoEmdVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		constructionPlanVO.setPageUnit(10);
		constructionPlanVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(constructionPlanVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionPlanVO.getPageUnit());
		paginationInfo.setPageSize(constructionPlanVO.getPageSize());

		constructionPlanVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionPlanVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionPlanVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionPlanList(constructionPlanVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		String codeList = gson.toJson(map3);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("clCodeList", codeList);
		model.addAttribute("codeList", map3.get("resultList"));
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionScheduleInner";
	}
	
	/**
	 * @Description : 사업공유관리 > 공사예정 기본정보 등록처리
	 * @Author egis
	 * @Date 2022.02.16
	 * @param model
	 * @return "modelAndView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/insertConstructionScheduleNomal.do")
	public ModelAndView insertConstructionScheduleNomal(@ModelAttribute("searchVO") ConstructionSchedule constructionSchedule, ComtccmmnclCode comtccmmnclCode, Comtccmmndetailcode comtccmmndetailcode, ModelMap model) throws Exception{
		
		Map<String, Object> maxId = businessCommonOwnershipService.insertConstructionScheduleNomal(constructionSchedule);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		
		comtccmmndetailcode.setCodeId(constructionSchedule.getCntrkTy());
		Map<String, Object> codeList = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		Map<String, Object> codeList2 = commonnessSpaceSearchService.selectComtccmmndetailcodeList(comtccmmndetailcode);
		
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("cntrkPrrngId", maxId.get("resultMaxId"));	// 등록된 ID	
		modelAndView.addObject("codeList", codeList.get("resultList"));		// 공사내역 리스트
		modelAndView.addObject("codeDtlList", codeList2.get("resultList"));	// 공사내역 상세 리스트
		return modelAndView;
	}
	
	
	/**
	 * @Description : 사업공유관리 > 공사예정 수정/등록 > 공사내역 상세 정보 조회 
	 * @Author egis
	 * @Date 2022.02.17
	 * @param model
	 * @return "modelAndView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/selectConstructionScheduleDtlCode.do")
	public ModelAndView selectConstructionScheduleDtlCode(@ModelAttribute("searchVO") Comtccmmndetailcode comtccmmndetailcode, ModelMap model) throws Exception{
		
		
		// 공사내역 상세 정보 조회(공통 코드 상세..)
		Map<String, Object> codeList2 = commonnessSpaceSearchService.selectComtccmmndetailcodeList(comtccmmndetailcode);
		
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("codeDtlList", codeList2.get("resultList"));	// 공사내역 상세 리스트
		
		return modelAndView;
	}
	
	/**
	 * @Description : 사업공유관리 > 공사예정 차수정보 등록처리 
	 * @Author egis
	 * @Date 2022.02.17
	 * @param model
	 * @return "modelAndView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cws/insertConstructionScheduleOdr.do")
	public ModelAndView insertConstructionScheduleOdr(@ModelAttribute("searchVO") ConstructionScheduleOrder constructionScheduleOrder, ModelMap model) throws Exception{
		//
		businessCommonOwnershipService.insertConstructionScheduleOdr(constructionScheduleOrder);
		
		constructionScheduleOrder.setCntrkOdr("");
		
		Map<String, Object> odrList = businessCommonOwnershipService.selectConstructionScheduleOrder(constructionScheduleOrder);
		
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("odrList",odrList.get("resultList"));		// 공사내역 리스트
		return modelAndView;
	}
	
	@ResponseBody	
	@RequestMapping(value = "/cws/insertConstructionScheduleOdr2.do")
	public ModelAndView insertConstructionScheduleOdr2(@RequestParam Map<String,Object> dtlCodeArray,  ModelMap model, ConstructionScheduleOrder constructionScheduleOrder, ConstructionDtlsInfo constructionDtlsInfo) throws Exception{
	
		// 차수별 정보 입력
		businessCommonOwnershipService.insertConstructionScheduleOdr(constructionScheduleOrder);
		
		// 공사내역 상세 지우기
		businessCommonOwnershipService.deleteConstructionDtlsInfo(constructionDtlsInfo);
		
		// 공사내역 상세 등록
		for(int i = 0; i<Integer.parseInt(dtlCodeArray.get("count").toString());i++){
			constructionDtlsInfo.setCntrkDph(dtlCodeArray.get("cntrkDt["+i+"]").toString());
			constructionDtlsInfo.setCntrkDtls(dtlCodeArray.get("cntrkDh["+i+"]").toString());
			businessCommonOwnershipService.insertConstructionDtlsInfo(constructionDtlsInfo);
		}
		 
		constructionScheduleOrder.setCntrkOdr("");
		Map<String, Object> odrList = businessCommonOwnershipService.selectConstructionScheduleOrder(constructionScheduleOrder);
		
		ModelAndView modelAndView = new ModelAndView("jsonView");
		modelAndView.addObject("odrList",odrList.get("resultList"));		// 공사내역 리스트
		return modelAndView;
	}

	/**************************************************************************************************************************************************************************/
	/************************************************************************* 공사정보 조회 **************************************************************************************/
	/**
	 * 사업공유관리 > 공사정보 조회 화면 
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionInquiryList"
	 * @throws Exception
	 */
	
	/**
	 * 
	 * @Description : 사업공유관리 > 공사정보 조회 화면 
	 * @Author egis
	 * @Date 2022.03.02
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionInquiryList.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwi/selectConstructionInquiryList.do")
public String selectConstructionInquiryList(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, TgdSccoEmdVO tgdSccoEmdVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		
		constructionScheduleVO.setPageUnit(10);
		constructionScheduleVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(constructionScheduleVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionScheduleVO.getPageUnit());
		paginationInfo.setPageSize(constructionScheduleVO.getPageSize());

		constructionScheduleVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionScheduleVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionScheduleVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = businessCommonOwnershipService.selectConstructionScheduleList(constructionScheduleVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		model.addAttribute("codeList", map3.get("resultList"));
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("poiList", poiList);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("codeList", map3.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionInquiryList";
	}
	
	/**
	 * 
	 * @Description : 사업공유관리 > 공사정보 조회 화면 
	 * @Author egis
	 * @Date 2022.03.02
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionInquiryList.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwi/aj_selectConstructionInquirySpaceList.do")
	public String aj_selectConstructionInquirySpaceList(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, TgdSccoEmdVO tgdSccoEmdVO, ComtccmmnclCode comtccmmnclCode, ModelMap model) throws Exception{
		
		
		constructionScheduleVO.setPageUnit(10);
		constructionScheduleVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(constructionScheduleVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(constructionScheduleVO.getPageUnit());
		paginationInfo.setPageSize(constructionScheduleVO.getPageSize());

		constructionScheduleVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		constructionScheduleVO.setLastIndex(paginationInfo.getLastRecordIndex());
		constructionScheduleVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
 		Map<String, Object> map = businessCommonOwnershipService.selectConstructionInquirySpaceList(constructionScheduleVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		// 공사유형 코드조회
		comtccmmnclCode.setClCode("CWT");
		Map<String, Object> map3 = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
		model.addAttribute("codeList", map3.get("resultList"));
		
		Gson gson = new Gson();
		String poiList = gson.toJson(map);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
  		model.addAttribute("poiList", poiList);
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("sccoEndList", map2.get("resultList"));
		model.addAttribute("codeList", map3.get("resultList"));
		
		return "egiskorea/com/job/bco/constructionInquiryList";
	}
	/**
	 * @Description : 사업공유관리 > 공사정보 상세화면 으로 이동
	 * @Author egis                                                           
	 * @Date 2022.01.25
	 * @param ConstructionScheduleVO, ConstructionScheduleOrder
	 * @param model
	 * @return "egiskorea/com/job/bco/constructionInquiry.jsp"
	 * @throws Exception
	 */
	@RequestMapping(value = "/cwi/selectConstructionInquiry.do")
	public String selectConstructionInquiry(@ModelAttribute("searchVO") ConstructionScheduleVO constructionScheduleVO, ConstructionScheduleOrder constructionScheduleOrder, ComtccmmnclCode comtccmmnclCode, Comtccmmndetailcode comtccmmndetailcode, ConstructionDtlsInfo constructionDtlsInfo, ModelMap model) throws Exception{
		Gson gson = new Gson();
		
		//공사 예정 정보 상세 정보 조회 (기본정보 조회)
		//ConstructionSchedule result = businessCommonOwnershipService.selectConstructionScheduleNomal(constructionScheduleVO);
		
		// 차수 정보 리스트 조회를 위한 key값 
		String CntrkPrrngId = Integer.toString(constructionScheduleVO.getCntrkPrrngId());
		constructionScheduleOrder.setCntrkPrrngId(CntrkPrrngId);
		
		// 차수 정보 리스트
        Map<String, Object> ordList  = businessCommonOwnershipService.selectConstructionScheduleOrder2(constructionScheduleVO, constructionScheduleOrder);
        
        // 공사유형 코드조회
 		comtccmmnclCode.setClCode("CWT");
 		Map<String, Object> codeList = commonnessSpaceSearchService.selectComtccmmnclCodeList(comtccmmnclCode);
 		
 		// 공사유형 상세 코드조회
 		comtccmmndetailcode.setCodeId(ordList.get("orderCntrkDtls").toString());
 		Map<String, Object> codeDtlList = commonnessSpaceSearchService.selectComtccmmndetailcodeList(comtccmmndetailcode);
 		
 		
 		constructionDtlsInfo.setCntrkPrrngId(CntrkPrrngId);
 		// 공사내역 상세 내용 리스트 조회
 	 	Map<String, Object> dtlCodeList = businessCommonOwnershipService.selectConstructionDtlsInfo(constructionDtlsInfo);
 	 	String dtlCodeList2 = gson.toJson(dtlCodeList.get("resultList"));
 	 	
		String orderInfo = gson.toJson(ordList.get("orderInfo"));
		String orderListInfo = gson.toJson(ordList.get("orderList"));
		
		String codeDtl = gson.toJson(codeDtlList.get("resultList"));
		String codeAllList = gson.toJson(codeList.get("resultList"));
		
		model.addAttribute("nomalList", ordList.get("nomalList"));
		model.addAttribute("orderListInfo", orderListInfo);
		model.addAttribute("orderInfo", orderInfo);
		model.addAttribute("codeDtlList", codeDtl);		
		model.addAttribute("orderList", ordList.get("orderList"));
		model.addAttribute("codeList", codeAllList);
		model.addAttribute("dtlListCode", dtlCodeList2);	
		
		return "egiskorea/com/job/bco/constructionInquiry";
	}
	
	
	
	
	
}
