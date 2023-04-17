package egiskorea.com.job.cctv.web;

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

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.cctv.service.CctvService;
import egiskorea.com.job.cctv.service.SafetyFacilCctvMng;
import egiskorea.com.job.cctv.service.SafetyFacilCctvMngVO;
import egiskorea.com.job.sffm.service.SafetyFacilLampMng;
import egiskorea.com.job.sffm.service.SafetyFacilLampMngVO;
import egovframework.com.cmm.ComDefaultCodeVO;
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
@RequestMapping("/job/cctv")
public class CctvController {
	
	private static final Logger logger = LoggerFactory.getLogger(CctvController.class);
	
	/** cmmUseService */
	@Resource(name = "EgovCmmUseService")
	private EgovCmmUseService cmmUseService;
	
	/** safetyFacilitiesMngService */
	@Resource(name = "cctvService")
	private CctvService cctvService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	// 안전시설물관리 > CCTV관리 조회
	@RequestMapping(value = "/selectCctvList.do")
	public String selectCctvList(
			@ModelAttribute("searchVO") SafetyFacilCctvMngVO safetyFacilCctvMngVO,
			ModelMap model, HttpServletRequest request) throws Exception{
	
	/*	safetyFacilCctvMngVO.setPageUnit(10);
		safetyFacilCctvMngVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(safetyFacilCctvMngVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(safetyFacilCctvMngVO.getPageUnit());
		paginationInfo.setPageSize(safetyFacilCctvMngVO.getPageSize());

		safetyFacilCctvMngVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		safetyFacilCctvMngVO.setLastIndex(paginationInfo.getLastRecordIndex());
		safetyFacilCctvMngVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		safetyFacilCctvMngVO.setSearchDeviceid(request.getParameter("searchDeviceid"));
		safetyFacilCctvMngVO.setSearchGbn(request.getParameter("searchGbn"));
		safetyFacilCctvMngVO.setSearchLabel(request.getParameter("searchLabel"));
		safetyFacilCctvMngVO.setSpitalSearch(request.getParameter("spitalSearch"));
		safetyFacilCctvMngVO.setCctvBuffer(Double.parseDouble(request.getParameter("cctvBuffer")) * 0.00001);
		
		Map<String, Object> map = cctvService.selectCctvList(safetyFacilCctvMngVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);*/
		
		return "egiskorea/com/job/sffm/safetyFacilCctvMngList";
	}
	
	// 안전시설물관리 > CCTV관리 등록페이지 호출
	@RequestMapping(value = "/insertSafetyFacilCctvMngView.do")
	public String insertSafetyFacilCctvMngView(
			ModelMap model) throws Exception{
		
		return "egiskorea/com/job/sffm/insertSafetyFacilCctvMngView";
	}
	
	/**
	 * 안전시설물관리 > 가로등관리 수정페이지 호출
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/sffm/updateSafetyFacilCctvMngView"
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateSafetyFacilCctvMngView.do")
	public String updateSafetyFacilCctvMngView(
			@ModelAttribute("safetyFacilCctvMngVO") SafetyFacilCctvMngVO safetyFacilCctvMngVO,
			ModelMap model) throws Exception{
		SafetyFacilCctvMng result = cctvService.selectSafetyFacilCctvMng(safetyFacilCctvMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/sffm/updateSafetyFacilCctvMngView";
	}
	
	
	// 안전시설물관리 > CCTV관리 상세페이지 호출
	@RequestMapping(value = "/selectCctv.do")
	public String selectSafetyFacilCctvMng(
			@ModelAttribute("safetyFacilCctvMngVO") SafetyFacilCctvMngVO safetyFacilCctvMngVO,
			ModelMap model) throws Exception{
		
		SafetyFacilCctvMng result = cctvService.selectSafetyFacilCctvMng(safetyFacilCctvMngVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/sffm/safetyFacilCctvMng";
	}
	
	// 안전시설물관리 > CCTV관리 삭제
	@RequestMapping(value = "/deleteCctv.do")
	public ModelAndView deleteCctv(ModelMap model, HttpServletRequest request) throws Exception { 
		ModelAndView mav = new ModelAndView("jsonView");
		
		SafetyFacilCctvMng cctvVO = new SafetyFacilCctvMng();
		cctvVO.setGid(Integer.parseInt(request.getParameter("gid")));
		
		try {
			cctvService.deleteCctv(cctvVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		
		return mav;
	}
	
	// 안전시설물관리 > CCTV관리 등록
	@RequestMapping(value = "/insertCctv.do")
	public ModelAndView insertCctv(ModelMap model, HttpServletRequest request) throws Exception { 
		
		SafetyFacilCctvMng cctvVO = new SafetyFacilCctvMng();
		ModelAndView mav = new ModelAndView("jsonView");
		
		cctvVO.setLabel(request.getParameter("label"));
		cctvVO.setDeviceid(request.getParameter("deviceid"));
		cctvVO.setGbn(request.getParameter("gbn"));
		cctvVO.setLat(Double.parseDouble(request.getParameter("lat")));
		cctvVO.setLon(Double.parseDouble(request.getParameter("lon")));
		cctvVO.setLgsrAdr(request.getParameter("adres"));
		
		try {
			cctvService.insertCctv(cctvVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		return mav;
	}

	// 안전시설물관리 > CCTV관리 수정
	@RequestMapping(value = "/updateCctv.do")
	public ModelAndView updateCctv(ModelMap model, HttpServletRequest request) throws Exception { 
		
		SafetyFacilCctvMng cctvVO = new SafetyFacilCctvMng();
		ModelAndView mav = new ModelAndView("jsonView");
		
		cctvVO.setGid(Integer.parseInt(request.getParameter("gid")));
		cctvVO.setLabel(request.getParameter("label"));
		cctvVO.setDeviceid(request.getParameter("deviceid"));
		cctvVO.setGbn(request.getParameter("gbn"));
		cctvVO.setLat(Double.parseDouble(request.getParameter("lat")));
		cctvVO.setLon(Double.parseDouble(request.getParameter("lon")));
		cctvVO.setLgsrAdr(request.getParameter("adres"));
		
		try {
			cctvService.updateCctv(cctvVO);
			mav.addObject("result", "success");
		}catch(Exception e ) {
			logger.info(e.getMessage());
			mav.addObject("result", "fail");
		}
		return mav;
	}
	
	// 안전시설물관리 > CCTV관리 엑셀다운
	@RequestMapping(value = "/cctvExcelDown.do")
	public ModelAndView cctvExcelDown(@RequestParam Map paramMap, ModelMap model) throws Exception { 
		
		ModelAndView mav = new ModelAndView("excelDownloadView");
		
		SXSSFWorkbook workbook = cctvService.makeCctvExcelList(excelResultMap);
		
		mav.addObject("locale", Locale.KOREA);
		mav.addObject("workbook", workbook);
		mav.addObject("workbookName", "CCTV관리목록");
		mav.addObject("fileType", "excel");
			
		return mav;
		
		/* Workbook workbook = new HSSFWorkbook();
        Sheet sheet = workbook.createSheet("CCTV관리_목록");
        int rowNo = 0;
 
        Row headerRow = sheet.createRow(rowNo++);
        headerRow.createCell(0).setCellValue("GID");
        headerRow.createCell(1).setCellValue("UID");
        headerRow.createCell(2).setCellValue("___ANNOX");
        headerRow.createCell(3).setCellValue("___ANNOY");
        headerRow.createCell(4).setCellValue("명칭");
        headerRow.createCell(5).setCellValue("기기ID");
        headerRow.createCell(6).setCellValue("CHANNEL");
        headerRow.createCell(7).setCellValue("구분");
        headerRow.createCell(8).setCellValue("PTZ_YN");
        headerRow.createCell(9).setCellValue("TALK_YN");
        headerRow.createCell(10).setCellValue("NET_YN");
        headerRow.createCell(11).setCellValue("PRESET1");
        headerRow.createCell(12).setCellValue("PRESET2");
        headerRow.createCell(13).setCellValue("PRESET3");
        headerRow.createCell(14).setCellValue("PRESET4");
        headerRow.createCell(15).setCellValue("PRESET5");
        headerRow.createCell(16).setCellValue("PRESET6");
        headerRow.createCell(17).setCellValue("PRESET7");
        headerRow.createCell(18).setCellValue("PRESET8");
        headerRow.createCell(19).setCellValue("PRESET9");
        headerRow.createCell(20).setCellValue("PRESET10");
        headerRow.createCell(21).setCellValue("PRESET11");
        headerRow.createCell(22).setCellValue("PRESET12");
        headerRow.createCell(23).setCellValue("PRESET13");
        headerRow.createCell(24).setCellValue("PRESET14");
        headerRow.createCell(25).setCellValue("PRESET15");
        headerRow.createCell(26).setCellValue("PRESET16");
        headerRow.createCell(27).setCellValue("PRESET17");
        headerRow.createCell(28).setCellValue("PRESET18");
        headerRow.createCell(29).setCellValue("PRESET19");
        headerRow.createCell(30).setCellValue("PRESET20");
        headerRow.createCell(31).setCellValue("ANGLE");
        headerRow.createCell(32).setCellValue("ADDR_OLD");
        headerRow.createCell(33).setCellValue("ADDR_NEW");
        headerRow.createCell(34).setCellValue("ADDR_IP");
        headerRow.createCell(35).setCellValue("INS_YEAR");
        headerRow.createCell(36).setCellValue("BIZ_YEAR");
        headerRow.createCell(37).setCellValue("GEOM");
 
        List<SafetyFacilCctvMng> excelList = cctvService.cctvExcelDown();
        
        for (SafetyFacilCctvMng list : excelList) {
            Row row = sheet.createRow(rowNo++);
            row.createCell(0).setCellValue(list.getGid());
            row.createCell(1).setCellValue(list.getUid());
            row.createCell(2).setCellValue(list.get___annox());
            row.createCell(3).setCellValue(list.get___annoy());
            row.createCell(4).setCellValue(list.getLabel());
            row.createCell(5).setCellValue(list.getDeviceid());
            row.createCell(6).setCellValue(list.getChannel());
            row.createCell(7).setCellValue(list.getGbn());
            row.createCell(8).setCellValue(list.getPtzYn());
            row.createCell(9).setCellValue(list.getTalkYn());
            row.createCell(10).setCellValue(list.getNetYn());
            row.createCell(11).setCellValue(list.getPreset1());
            row.createCell(12).setCellValue(list.getPreset2());
            row.createCell(13).setCellValue(list.getPreset3());
            row.createCell(14).setCellValue(list.getPreset4());
            row.createCell(15).setCellValue(list.getPreset5());
            row.createCell(16).setCellValue(list.getPreset6());
            row.createCell(17).setCellValue(list.getPreset7());
            row.createCell(18).setCellValue(list.getPreset8());
            row.createCell(19).setCellValue(list.getPreset9());
            row.createCell(20).setCellValue(list.getPreset10());
            row.createCell(21).setCellValue(list.getPreset11());
            row.createCell(22).setCellValue(list.getPreset12());
            row.createCell(23).setCellValue(list.getPreset13());
            row.createCell(24).setCellValue(list.getPreset14());
            row.createCell(25).setCellValue(list.getPreset15());
            row.createCell(26).setCellValue(list.getPreset16());
            row.createCell(27).setCellValue(list.getPreset17());
            row.createCell(28).setCellValue(list.getPreset18());
            row.createCell(29).setCellValue(list.getPreset19());
            row.createCell(30).setCellValue(list.getPreset20());
            row.createCell(31).setCellValue(list.getAngle());
            row.createCell(32).setCellValue(list.getAddrOld());
            row.createCell(33).setCellValue(list.getAddrNew());
            row.createCell(34).setCellValue(list.getAddrIp());
            row.createCell(35).setCellValue(list.getInsYear());
            row.createCell(36).setCellValue(list.getBizYear());
            row.createCell(37).setCellValue(list.getGeom());
        }
 
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=Cctv_List.xls");
 
        workbook.write(response.getOutputStream());
        workbook.close(); */
	}
	
	HashMap excelResultMap;
	// CCTV poi
	@RequestMapping(value = "/selectCctvPOIList.do")
	public String selectCctvPOIList(
			@ModelAttribute("searchVO") SafetyFacilCctvMngVO safetyFacilCctvMngVO,
			ModelMap model, HttpServletRequest request) throws Exception { 
		
		safetyFacilCctvMngVO.setPageUnit(10);
		safetyFacilCctvMngVO.setPageSize(propertyService.getInt("pageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		
		paginationInfo.setCurrentPageNo(safetyFacilCctvMngVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(safetyFacilCctvMngVO.getPageUnit());
		paginationInfo.setPageSize(safetyFacilCctvMngVO.getPageSize());

		safetyFacilCctvMngVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		safetyFacilCctvMngVO.setLastIndex(paginationInfo.getLastRecordIndex());
		safetyFacilCctvMngVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		safetyFacilCctvMngVO.setSearchDeviceid(request.getParameter("searchDeviceid"));
		safetyFacilCctvMngVO.setSearchGbn(request.getParameter("searchGbn"));
		safetyFacilCctvMngVO.setSearchLabel(request.getParameter("searchLabel"));
		safetyFacilCctvMngVO.setSpitalSearch(request.getParameter("spitalSearch"));
		safetyFacilCctvMngVO.setCctvBuffer(Double.parseDouble(request.getParameter("cctvBuffer")) * 0.00001);
		
		Map<String, Object> map = cctvService.selectCctvList(safetyFacilCctvMngVO);
		excelResultMap = cctvService.cctvExcelDown(safetyFacilCctvMngVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "jsonView";
	} 
	
	// 안전시설물관리 > CCTV관리 코드조회
	@RequestMapping(value = "/getCode.do")
	public String getCode(ModelMap model, HttpServletRequest request) throws Exception { 
			
		ComDefaultCodeVO vo = new ComDefaultCodeVO();
		vo.setCodeId("CCTVCD");   // 원지목
		List<?> oriList = cmmUseService.selectCmmCodeDetail(vo);
		
		model.addAttribute("resultList", oriList);
			
		return "jsonView";
	}
	
	//안전시설물관리 > cctv관리 엑셀다운
	@RequestMapping(value = "/selectSffmCctvFacilExcelListDownload.do")
	public void selectSffmCctvFacilExcelListtDownload(
			@ModelAttribute("safetyFacilCctvMngVO") SafetyFacilCctvMngVO safetyFacilCctvMngVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<SafetyFacilCctvMng> excelVO = cctvService.selectSffmCctvFacilExcelListDownload(safetyFacilCctvMngVO);
		
		
		String[] titleArr = new String[37];
		titleArr[0] = "GID";
		titleArr[1] = "구분";
		titleArr[2] = "명칭";
		titleArr[3] = "기기ID";
		titleArr[4] = "channel";
		titleArr[5] = "ptz_yn";
		titleArr[6] = "talk_yn";
		titleArr[7] = "net_yn";
		titleArr[8] = "위도";
		titleArr[9] = "경도";
		titleArr[10] = "preset1";
		titleArr[11] = "preset2";
		titleArr[12] = "preset3";
		titleArr[13] = "preset4";
		titleArr[14] = "preset5";
		titleArr[15] = "preset6";
		titleArr[16] = "preset7";
		titleArr[17] = "preset8";
		titleArr[18] = "preset9";
		titleArr[19] = "preset10";
		titleArr[20] = "preset11";
		titleArr[21] = "preset12";
		titleArr[22] = "preset13";
		titleArr[23] = "preset14";
		titleArr[24] = "preset15";
		titleArr[25] = "preset16";
		titleArr[26] = "preset17";
		titleArr[27] = "preset18";
		titleArr[28] = "preset19";
		titleArr[29] = "preset20";
		titleArr[30] = "angle";
		titleArr[31] = "주소";
		titleArr[32] = "new_adr";
		titleArr[33] = "ip_adr";
		titleArr[34] = "istl_yy";
		titleArr[35] = "chan_yy";
		titleArr[36] = "geom";
		
		
		String[] voTitleArr = new String[37];
		voTitleArr[0] = "gid";
		voTitleArr[1] = "gbn";
		voTitleArr[2] = "label";
		voTitleArr[3] = "deviceid";
		voTitleArr[4] = "channel";
		voTitleArr[5] = "ptzYn";
		voTitleArr[6] = "talkYn";
		voTitleArr[7] = "netYn";
		voTitleArr[8] = "lon";
		voTitleArr[9] = "lat";
		voTitleArr[10] = "preset1";
		voTitleArr[11] = "preset2";
		voTitleArr[12] = "preset3";
		voTitleArr[13] = "preset4";
		voTitleArr[14] = "preset5";
		voTitleArr[15] = "preset6";
		voTitleArr[16] = "preset7";
		voTitleArr[17] = "preset8";
		voTitleArr[18] = "preset9";
		voTitleArr[19] = "preset10";
		voTitleArr[20] = "preset11";
		voTitleArr[21] = "preset12";
		voTitleArr[22] = "preset13";
		voTitleArr[23] = "preset14";
		voTitleArr[24] = "preset15";
		voTitleArr[25] = "preset16";
		voTitleArr[26] = "preset17";
		voTitleArr[27] = "preset18";
		voTitleArr[28] = "preset19";
		voTitleArr[29] = "preset20";
		voTitleArr[30] = "angle";
		voTitleArr[31] = "lgsrAdr";
		voTitleArr[32] = "newAdr";
		voTitleArr[33] = "ipAdr";
		voTitleArr[34] = "instlYy";
		voTitleArr[35] = "chanYy";
		voTitleArr[36] = "geom";
		
		
		ExcelView.excelDownload(request, response,  "안전시설물관리_cctv관리_", titleArr, voTitleArr, excelVO);
	}

}
