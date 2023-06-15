package egiskorea.com.webApp.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.geo.emi.service.ExaminationInfoService;
import egiskorea.com.geo.emi.service.ExaminationInfoVO;
import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 웹앱에서 조사정보를 관리하는 사용자 controller 클래스
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.06.15
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.06.15		장현승	최초 생성
 */

@Controller
@RequestMapping("/webApp/emi")
public class WebAppExaminationInfoController {
	
	private static final Logger logger = LoggerFactory.getLogger(WebAppExaminationInfoController.class);
			
	@Resource(name = "examinationInfoService")
	private ExaminationInfoService examinationInfoService;
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * @Description 행정구역별 조사정보 목록 (웹앱용)
	 * @Author 글로벌컨설팅부문 장현승
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/webApp/webAppAdministrationZoneList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectWebAppAdministrationZoneList.do")
	public String selectWebAppAdministrationZoneList(
			@ModelAttribute("searchVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{
		
		examinationInfoVO.setPageUnit(11);
		examinationInfoVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(examinationInfoVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(examinationInfoVO.getPageUnit());
		paginationInfo.setPageSize(examinationInfoVO.getPageSize());
		
		examinationInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		examinationInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
		examinationInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		Map<String, Object> map = examinationInfoService.selectAdministrationZoneList(examinationInfoVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
		
		// 행정구역
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("YPEMD");	// 읍면동
		List<?> code1List = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("code1List", code1List);
		
		return "egiskorea/com/webApp/emi/webAppAdministrationZoneList";
	}
	
	/**
	 * @Description 행정구역별 조사정보 목록 (웹앱용)
	 * @Author 글로벌컨설팅부문 장현승
	 * @param examinationInfoVO
	 * @param model
	 * @return "egiskorea/com/webApp/emi/webAppExaminationInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectWebAppExaminationInfoList.do")
	public String selectExaminationInfoList(
			@ModelAttribute("searchVO") ExaminationInfoVO examinationInfoVO,
			ModelMap model) throws Exception{
		
		examinationInfoVO.setPageUnit(12);
		examinationInfoVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(examinationInfoVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(examinationInfoVO.getPageUnit());
		paginationInfo.setPageSize(examinationInfoVO.getPageSize());

		examinationInfoVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		examinationInfoVO.setLastIndex(paginationInfo.getLastRecordIndex());
		examinationInfoVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		
		Map<String, Object> map = examinationInfoService.selectExaminationInfoList(examinationInfoVO);
		  
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("li", examinationInfoVO.getCode2());
		
		return "egiskorea/com/webApp/emi/webAppExaminationInfoList";
	}
}
