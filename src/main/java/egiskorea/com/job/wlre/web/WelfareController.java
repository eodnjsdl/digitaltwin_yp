package egiskorea.com.job.wlre.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import egiskorea.com.job.spor.service.SportsVO;
import egiskorea.com.job.wlre.service.WelfareService;
import egiskorea.com.job.wlre.service.WelfareVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;


/**
 * 
* <pre>
* 간략 : 복지시설 관리.
* 상세 : .
* egiskorea.com.fcty.wlre.web
*   |_ WelfareController.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2022. 1. 5 오전 9:30:52
* @Version : 1.0
 */

@Controller
@RequestMapping("/job/wlre")
public class WelfareController {
	
	private static final Logger logger = LoggerFactory.getLogger(WelfareController.class);
	
	@Resource(name = "welfareService")
	private WelfareService welfareService;

	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/**
	 * 
	* <PRE>
	* 간략 : 복지시설 목록.
	* 상세 : .
	* <PRE>
	* @param model
	* @param request
	* @return
	* @throws Exception
	 */
	
	// 복지시설 조회
	@RequestMapping(value = "/selectWelfareList.do")
	public String selectWelfareList(
			@ModelAttribute("searchVO") WelfareVO welfareVO,
			ModelMap model, HttpServletRequest request) throws Exception { 
		
		welfareVO.setPageUnit(10);
		welfareVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(welfareVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(welfareVO.getPageUnit());
		paginationInfo.setPageSize(welfareVO.getPageSize());

		welfareVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		welfareVO.setLastIndex(paginationInfo.getLastRecordIndex());
		welfareVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		welfareVO.setSearchFcltySe(request.getParameter("searchFcltySe"));
		welfareVO.setSearchFcltyNm(request.getParameter("searchFcltyNm"));
		welfareVO.setSearchRnAdres(request.getParameter("searchRnAdres"));
		welfareVO.setSpitalSearch(request.getParameter("spitalSearch"));
		welfareVO.setWlreBuffer(Double.parseDouble(request.getParameter("wlreBuffer")) * 0.00001);
		
		Map<String, Object> map = welfareService.selectWelfareList(welfareVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("welfareListLength", map.get("resultCnt"));
		model.addAttribute("welfareList", map.get("resultList"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "egiskorea/com/job/wlre/welfareList";
	}
	
	// 등록화면 호출
	@RequestMapping(value = "/insertWelfareView.do")
	public String insertWelfareView(ModelMap model) throws Exception{ 
		
		return "egiskorea/com/job/wlre/welfareModal";
	}
	
	// 복지시설 삭제
	@RequestMapping(value = "/deleteWelfare.do")
	public String deleteWelfare(ModelMap model, HttpServletRequest request) throws Exception { 
		
		WelfareVO welfareVO = new WelfareVO();
		welfareVO.setGid(Integer.parseInt(request.getParameter("gid")));
	    welfareService.deleteWelfare(welfareVO);
		
		return "jsonView";
	}
	
	// 복지시설 등록
	@RequestMapping(value = "/insertWelfare.do")
	public String insertWelfare(ModelMap model, HttpServletRequest request) throws Exception { 
		
		WelfareVO welfareVO = new WelfareVO();
		
		welfareVO.setFcltyNm(request.getParameter("fcltyNm"));
		welfareVO.setFcltySe(request.getParameter("fcltySe"));
		welfareVO.setCttpcTelno(request.getParameter("cttpcTelno"));
		welfareVO.setRnAdres(request.getParameter("rnAdres"));
		welfareVO.setZip(request.getParameter("zip"));
		welfareVO.setLnmAdres(request.getParameter("lnmAdres"));
		welfareVO.setLat(Double.parseDouble(request.getParameter("lat")));
		welfareVO.setLon(Double.parseDouble(request.getParameter("lon")));
		welfareVO.setDataStdde(request.getParameter("dataStdde"));
		
		welfareService.insertWelfare(welfareVO);
		
		return "jsonView";
	}
	
	// 복지시설 상세조회
	@RequestMapping(value = "/selectWelfare.do")
	public String selectWelfare(ModelMap model, HttpServletRequest request) throws Exception { 
			
		WelfareVO welfareVO = new WelfareVO();
		welfareVO.setGid(Integer.parseInt(request.getParameter("gid")));
		WelfareVO resultList = welfareService.selectWelfare(welfareVO);
			
		model.addAttribute("resultList", resultList);
		
		return "egiskorea/com/job/wlre/welfareDetail";
	}
	
	// 복지시설 수정
	@RequestMapping(value = "/updateWelfare.do")
	public String updateWelfare(ModelMap model, HttpServletRequest request) throws Exception { 
		
		WelfareVO welfareVO = new WelfareVO();
		
		welfareVO.setGid(Integer.parseInt(request.getParameter("gid")));
		welfareVO.setFcltyNm(request.getParameter("fcltyNm"));
		welfareVO.setFcltySe(request.getParameter("fcltySe"));
		welfareVO.setCttpcTelno(request.getParameter("cttpcTelno"));
		welfareVO.setRnAdres(request.getParameter("rnAdres"));
		welfareVO.setZip(request.getParameter("zip"));
		welfareVO.setLnmAdres(request.getParameter("lnmAdres"));
		welfareVO.setLat(Double.parseDouble(request.getParameter("lat")));
		welfareVO.setLon(Double.parseDouble(request.getParameter("lon")));
		welfareVO.setDataStdde(request.getParameter("dataStdde"));
		
		welfareService.updateWelfare(welfareVO);
		
		return "jsonView";
	}
	
	// 복지시설 엑셀다운
	@RequestMapping(value = "/wlreExcelDown.do")
	public ModelAndView wlreExcelDown(@RequestParam Map paramMap, ModelMap model) throws Exception { 
		
		ModelAndView mav = new ModelAndView("excelDownloadView");
		
		SXSSFWorkbook workbook = welfareService.makeWlreExcelList(excelResultMap);
		
		mav.addObject("locale", Locale.KOREA);
		mav.addObject("workbook", workbook);
		mav.addObject("workbookName", "복지시설목록");
		mav.addObject("fileType", "excel");
			
		return mav;
		
		/* Workbook workbook = new HSSFWorkbook();
        Sheet sheet = workbook.createSheet("복지시설_목록");
        int rowNo = 0;
 
        Row headerRow = sheet.createRow(rowNo++);
        headerRow.createCell(0).setCellValue("GID");
        headerRow.createCell(1).setCellValue("시설명");
        headerRow.createCell(2).setCellValue("도로명주소");
        headerRow.createCell(3).setCellValue("지번주소");
        headerRow.createCell(4).setCellValue("우편번호");
        headerRow.createCell(5).setCellValue("위도");
        headerRow.createCell(6).setCellValue("경도");
        headerRow.createCell(7).setCellValue("시설구분");
        headerRow.createCell(8).setCellValue("연락처전화번호");
        headerRow.createCell(9).setCellValue("데이터기준일");
        headerRow.createCell(10).setCellValue("GEOMETRY");
 
        List<WelfareVO> excelList = welfareService.wlreExcelDown();
        
        for (WelfareVO welfareVO : excelList) {
            Row row = sheet.createRow(rowNo++);
            row.createCell(0).setCellValue(welfareVO.getGid());
            row.createCell(1).setCellValue(welfareVO.getFcltyNm());
            row.createCell(2).setCellValue(welfareVO.getRnAdres());
            row.createCell(3).setCellValue(welfareVO.getLnmAdres());
            row.createCell(4).setCellValue(welfareVO.getZip());
            row.createCell(5).setCellValue(welfareVO.getLat());
            row.createCell(6).setCellValue(welfareVO.getLon());
            row.createCell(7).setCellValue(welfareVO.getFcltySe());
            row.createCell(8).setCellValue(welfareVO.getCttpcTelno());
            row.createCell(9).setCellValue(welfareVO.getDataStdde());
            row.createCell(10).setCellValue(welfareVO.getGeom());
        }
 
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=Welfare_List.xls");
 
        workbook.write(response.getOutputStream());
        workbook.close(); */
	}
	
	HashMap excelResultMap;
	// 복지시설 poi
	@RequestMapping(value = "/selectWlrePOIList.do")
	public String selectWlrePOIList(
			@ModelAttribute("searchVO") WelfareVO welfareVO,
			ModelMap model, HttpServletRequest request) throws Exception { 
		
		welfareVO.setPageUnit(10);
		welfareVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(welfareVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(welfareVO.getPageUnit());
		paginationInfo.setPageSize(welfareVO.getPageSize());

		welfareVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		welfareVO.setLastIndex(paginationInfo.getLastRecordIndex());
		welfareVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		welfareVO.setSearchFcltySe(request.getParameter("searchFcltySe"));
		welfareVO.setSearchFcltyNm(request.getParameter("searchFcltyNm"));
		welfareVO.setSearchRnAdres(request.getParameter("searchRnAdres"));
		welfareVO.setSpitalSearch(request.getParameter("spitalSearch"));
		welfareVO.setWlreBuffer(Double.parseDouble(request.getParameter("wlreBuffer")) * 0.00001);
		
		Map<String, Object> map = welfareService.selectWelfareList(welfareVO);
		excelResultMap = welfareService.wlreExcelDown(welfareVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("welfareListLength", map.get("resultCnt"));
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "jsonView";
	}
	
	//복지시설 시설구분 코드정보 조회
	@RequestMapping(value = "/welfareCode.do")
	public String welfareCode(ModelMap model, HttpServletRequest request) throws Exception { 
		WelfareVO welfareVO = new WelfareVO();
		List<WelfareVO> map = welfareService.welfareCode(welfareVO);
			
		model.addAttribute("resultList", map);
		
		return "jsonView";
	}
	
}
