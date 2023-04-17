package egiskorea.com.job.sffm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.sffm.service.SafetyFacilLampMng;
import egiskorea.com.job.sffm.service.SafetyFacilLampMngVO;
import egiskorea.com.job.sffm.service.SafetyFacilitiesMngService;
import egiskorea.com.job.ugtm.service.UnderWaterUseFacilVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 안전시설물관리 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 한유경
 * @since 2022.02.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.27   한유경            최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/sffm")
public class SafetyFacilitiesMngController {
	
	private static final Logger logger = LoggerFactory.getLogger(SafetyFacilitiesMngController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** safetyFacilitiesMngService */
	@Resource(name = "safetyFacilitiesMngService")
	private SafetyFacilitiesMngService safetyFacilitiesMngService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * 안전시설물관리 > 가로등관리 목록
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/safetyFacilLampMngList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSafetyFacilLampMngList.do")
	public String selectSafetyFacilLampMngList(
			@ModelAttribute("searchVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model/*, HttpServletRequest request*/) throws Exception{

		
		return "egiskorea/com/job/sffm/safetyFacilLampMngList";
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 등록페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/insertSafetyFacilLampMngView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertSafetyFacilLampMngView.do")
	public String insertSafetyFacilLampMngView(
			ModelMap model) throws Exception{
		
		return "egiskorea/com/job/sffm/insertSafetyFacilLampMngView";
	}
	/**
	 * 안전시설물관리 > 가로등관리 수정페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/updateSafetyFacilLampMngView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateSafetyFacilLampMngView.do")
	public String updateSafetyFacilLampMngView(
			@ModelAttribute("safetyFacilLampMngVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model) throws Exception{
		SafetyFacilLampMng result = safetyFacilitiesMngService.selectSafetyFacilLampMng(safetyFacilLampMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/sffm/updateSafetyFacilLampMngView";
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 상세페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/selectSafetyFacilLampMng"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSafetyFacilLampMng.do")
	public String selectSafetyFacilLampMng(
			@ModelAttribute("safetyFacilLampMngVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model) throws Exception{
		
		SafetyFacilLampMng result = safetyFacilitiesMngService.selectSafetyFacilLampMng(safetyFacilLampMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/sffm/safetyFacilLampMng";
	}
	
	// 안전시설물관리 > 가로등관리 삭제
	@RequestMapping(value = "/deleteSffm.do")
	public ModelAndView deleteSffm(ModelMap model, HttpServletRequest request) throws Exception { 
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		SafetyFacilLampMng sffmVO = new SafetyFacilLampMng();
		sffmVO.setGid(Integer.parseInt(request.getParameter("gid")));
		
		try {
			safetyFacilitiesMngService.deleteSffm(sffmVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		
		return mav;
	}
	
	// 안전시설물관리 > 가로등관리 등록
	@RequestMapping(value = "/insertSffm.do")
	public ModelAndView insertSffm(ModelMap model, HttpServletRequest request) throws Exception { 
		
		SafetyFacilLampMng sffmVO = new SafetyFacilLampMng();
		ModelAndView mav = new ModelAndView("jsonView");
		
		sffmVO.setManageNo(request.getParameter("manageNo"));
		sffmVO.setInstlDe(request.getParameter("instlDe"));
		sffmVO.setAdres(request.getParameter("adres"));
		sffmVO.setStrtlgtCnt(Integer.parseInt(request.getParameter("strtlgtCnt")));
		sffmVO.setLat(Double.parseDouble(request.getParameter("lat")));
		sffmVO.setLon(Double.parseDouble(request.getParameter("lon")));
		sffmVO.setAlttd(Double.parseDouble(request.getParameter("alt")));
		sffmVO.setStdde(request.getParameter("stdde"));
		
		safetyFacilitiesMngService.insertSffm(sffmVO);
		
		try {
			safetyFacilitiesMngService.updateSffm(sffmVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		return mav;
	}

	// 안전시설물관리 > 가로등관리 수정
	@ResponseBody
	@RequestMapping(value = "/updateSffm.do")
	public ModelAndView updateSffm(ModelMap model, HttpServletRequest request) throws Exception { 
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		SafetyFacilLampMng sffmVO = new SafetyFacilLampMng();
		
		sffmVO.setGid(Integer.parseInt(request.getParameter("gid")));
		sffmVO.setManageNo(request.getParameter("manageNo"));
		sffmVO.setInstlDe(request.getParameter("instlDe"));
		sffmVO.setAdres(request.getParameter("adres"));
		sffmVO.setStrtlgtCnt(Integer.parseInt(request.getParameter("strtlgtCnt")));
		sffmVO.setLat(Double.parseDouble(request.getParameter("lat")));
		sffmVO.setLon(Double.parseDouble(request.getParameter("lon")));
		sffmVO.setAlttd(Double.parseDouble(request.getParameter("alt")));
		sffmVO.setStdde(request.getParameter("stdde"));
		
		try {
			safetyFacilitiesMngService.updateSffm(sffmVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	HashMap excelResultMap;
	// 안전시설물관리 > 가로등관리 엑셀다운
	/*		@RequestMapping(value = "/sffmExcelDown.do")
		public ModelAndView sffmExcelDown(@RequestParam Map paramMap, ModelMap model,
				@ModelAttribute("searchVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
				HttpServletRequest request) throws Exception { 
			safetyFacilLampMngVO.setSearchInstlDe(request.getParameter("instlDe"));
			safetyFacilLampMngVO.setSearchAdres(request.getParameter("adres"));
			safetyFacilLampMngVO.setSearchManageNo(request.getParameter("manageNo"));
			safetyFacilLampMngVO.setSpitalSearch(request.getParameter("spitalSearch"));
			safetyFacilLampMngVO.setSffmBuffer(Double.parseDouble(request.getParameter("sffmBuffer")) * 0.00001);
			
			excelResultMap = safetyFacilitiesMngService.sffmExcelDown(safetyFacilLampMngVO);
			
			
			
			ModelAndView mav = new ModelAndView("excelDownloadView");
			
			SXSSFWorkbook workbook = safetyFacilitiesMngService.makeSffmExcelList(excelResultMap);
			
			mav.addObject("locale", Locale.KOREA);
			mav.addObject("workbook", workbook);
			mav.addObject("workbookName", "가로등관리목록");
			mav.addObject("fileType", "excel");
				
			return mav;
			
		Workbook workbook = new HSSFWorkbook();
	        Sheet sheet = workbook.createSheet("가로등관리_목록");
	        int rowNo = 0;
	 
	        Row headerRow = sheet.createRow(rowNo++);
	        headerRow.createCell(0).setCellValue("GID");
	        headerRow.createCell(1).setCellValue("관리번호");
	        headerRow.createCell(2).setCellValue("주소");
	        headerRow.createCell(3).setCellValue("설치일자");
	        headerRow.createCell(4).setCellValue("가로등수");
	        headerRow.createCell(5).setCellValue("위도");
	        headerRow.createCell(6).setCellValue("경도");
	        headerRow.createCell(7).setCellValue("기준일");
	        headerRow.createCell(8).setCellValue("GEOMETRY");
	 
	        List<SafetyFacilLampMng> excelList = safetyFacilitiesMngService.sffmExcelDown();
	        
	        for (SafetyFacilLampMng list : excelList) {
	            Row row = sheet.createRow(rowNo++);
	            row.createCell(0).setCellValue(list.getGid());
	            row.createCell(1).setCellValue(list.getManageNo());
	            row.createCell(2).setCellValue(list.getAdres());
	            row.createCell(3).setCellValue(list.getInstlDe());
	            row.createCell(4).setCellValue(list.getStrtlgtCnt());
	            row.createCell(5).setCellValue(list.getLat());
	            row.createCell(6).setCellValue(list.getLon());
	            row.createCell(7).setCellValue(list.getStdde());
	            row.createCell(8).setCellValue(list.getGeom());
	        }
	 
	        response.setContentType("ms-vnd/excel");
	        response.setHeader("Content-Disposition", "attachment;filename=Sffm_List.xls");
	 
	        workbook.write(response.getOutputStream());
	        workbook.close(); 
		}
		*/
//안전시설물관리 > 가로등관리 엑셀다운
	@RequestMapping(value = "/selectSffmLampFacilExcelListDownload.do")
	public void selectSffmLampFacilExcelListDownload(
			@ModelAttribute("safetyFacilLampMngVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<SafetyFacilLampMng> excelVO = safetyFacilitiesMngService.selectSffmLampFacilExcelListDownload(safetyFacilLampMngVO);
		
		
		String[] titleArr = new String[10];
		titleArr[0] = "GID";
		titleArr[1] = "관리번호";
		titleArr[2] = "주소";
		titleArr[3] = "설치일자";
		titleArr[4] = "가로등수";
		titleArr[5] = "위도";
		titleArr[6] = "경도";
		titleArr[7] = "기준일";
		titleArr[8] = "GEOMETRY";
		titleArr[9] = "고도";
		
		
		String[] voTitleArr = new String[10];
		voTitleArr[0] = "gid";
		voTitleArr[1] = "manageNo";
		voTitleArr[2] = "adres";
		voTitleArr[3] = "instlDe";
		voTitleArr[4] = "strtlgtCnt";
		voTitleArr[5] = "lat";
		voTitleArr[6] = "lon";
		voTitleArr[7] = "stdde";
		voTitleArr[8] = "geom";
		voTitleArr[9] = "alttd";
		
		
		ExcelView.excelDownload(request, response,  "안전시설물관리_가로등관리_", titleArr, voTitleArr, excelVO);
	}

	
	// 가로등 poi
	@RequestMapping(value = "/selectSffmPOIList.do")
	public String selectSffmPOIList(
			@ModelAttribute("searchVO") SafetyFacilLampMngVO safetyFacilLampMngVO,
			ModelMap model, HttpServletRequest request) throws Exception { 
		
		safetyFacilLampMngVO.setPageUnit(10);
		safetyFacilLampMngVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(safetyFacilLampMngVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(safetyFacilLampMngVO.getPageUnit());
		paginationInfo.setPageSize(safetyFacilLampMngVO.getPageSize());

		safetyFacilLampMngVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		safetyFacilLampMngVO.setLastIndex(paginationInfo.getLastRecordIndex());
		safetyFacilLampMngVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		safetyFacilLampMngVO.setSearchInstlDe(request.getParameter("searchInstlDe"));
		safetyFacilLampMngVO.setSearchAdres(request.getParameter("searchAdres"));
		safetyFacilLampMngVO.setSearchManageNo(request.getParameter("searchManageNo"));
		safetyFacilLampMngVO.setSpitalSearch(request.getParameter("spitalSearch"));
		safetyFacilLampMngVO.setSffmBuffer(Double.parseDouble(request.getParameter("sffmBuffer")) * 0.00001);
		
		Map<String, Object> map = safetyFacilitiesMngService.selectSafetyFacilLampMngList(safetyFacilLampMngVO);
		excelResultMap = safetyFacilitiesMngService.sffmExcelDown(safetyFacilLampMngVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "jsonView";
	}
}
