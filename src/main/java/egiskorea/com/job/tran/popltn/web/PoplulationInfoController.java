package egiskorea.com.job.tran.popltn.web;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import egiskorea.com.job.tran.popltn.service.PoplulationInfoService;
import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Description 교통분석  controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 
 * @since 2023.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.12   황의현           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/tran/popltn")
public class PoplulationInfoController {
	
	@Resource(name = "poplulationInfoService")
	private PoplulationInfoService poplulationInfoService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

	private static final Logger logger = LoggerFactory.getLogger(PoplulationInfoController.class);
	
	// ################################################# 인구정보 #################################################
	
	
	/**
	 * 인구정보 목록 조회
	 * 
	 * @param 
	 * @param model
	 * @return "egiskorea/com/job/tral/popltn/selectPopulationInfoList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectPopulationInfoList.do")
	public String selectPopulationInfoList(
			//@ModelAttribute("searchVO") RoadSectionVO roadSectionVO,
			ModelMap model) throws Exception{
		
		logger.info("selectPopulationInfoList.do");
		
		model.addAttribute("result", "ok");
		return "egiskorea/com/job/tran/popltn/selectPopulationInfoList";
	}
	
	
	/////////////////////////
	/**
	 * 교통시설 도로구간 목록
	 * 
	 * @param roadSectionVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/transportationFacilityList"
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/selectTransportationFacilityList.do")
	public String selectTransportationFacilityList(
			@ModelAttribute("searchVO") RoadSectionVO roadSectionVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		// 읍면동 선택한 값이 없을시에 기본값 양평군 시군구 코드로 설정
		if(roadSectionVO.getEmdKorNm() == "") {
			roadSectionVO.setEmdKorNm("41830");
		}
		
		// 페이징시 type miss match오류때문에 예외처리
		if(roadSectionVO.getRoadBtVal().equals("")) {
			roadSectionVO.setRoadBt(0);
		}else {
			String roadBtVal = roadSectionVO.getRoadBtVal();
			int roadBt = Integer.parseInt(roadBtVal);
			roadSectionVO.setRoadBt(roadBt);
		}
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(roadSectionVO.getSearchType().equals("") || roadSectionVO.getSearchType().equals("spatial")) {
			
			roadSectionVO.setEmdKorNm("41830");
			roadSectionVO.setRoadBt(0);
			roadSectionVO.setRn("");
			
		}
		
		roadSectionVO.setPageUnit(10);
		roadSectionVO.setPageSize(propertyService.getInt("pageSize"));		
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(roadSectionVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(roadSectionVO.getPageUnit());
		paginationInfo.setPageSize(roadSectionVO.getPageSize());

		roadSectionVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		roadSectionVO.setLastIndex(paginationInfo.getLastRecordIndex());
		roadSectionVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectTransportationFacilityList(roadSectionVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("searchVO", roadSectionVO);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(roadSectionVO);
		model.addAttribute("roadSectionVO", VOGson);
		
		return "egiskorea/com/job/trfc/transportationFacilityList";
	}
	
	*//**
	 * 교통시설 도로구간 상세 조회
	 * 
	 * @param roadSectionVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/transportationFacility"
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/selectTransportationFacility.do")
	public String selectTransportationFacility(
			@ModelAttribute("searchVO") RoadSectionVO roadSectionVO,
			ModelMap model) throws Exception{
			
		RoadSection result = transportationFacilityService.selectRoadSection(roadSectionVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/transportationFacility";
	}
	
	*//**
	 * 교통시설 도로구간 엑셀 다운로드
	 * 
	 * @param roadSectionVO
	 * @param model
	 * @return 
	 * @throws Exception
	 *//*
	@RequestMapping(value = "/selectRoadSectionExcelListDownload.do")
	public void selectRoadSectionExcelListDownload(
			@ModelAttribute("searchVO") RoadSectionVO roadSectionVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectRoadSectionExcelList(roadSectionVO);
		
		String[] titleArr = new String[19];
		titleArr[0] = "도로구간일련번호";
		titleArr[1] = "도로명";
		titleArr[2] = "도로명코드";
		titleArr[3] = "영문도로명";
		titleArr[4] = "고시일자";
		titleArr[5] = "광역도로구분코드";
		titleArr[6] = "도로위계기능구분";
		titleArr[7] = "도로구간종속구분";
		titleArr[8] = "기점";
		titleArr[9] = "종점";
		titleArr[10] = "도로폭";
		titleArr[11] = "도로길이";
		titleArr[12] = "기초간격";
		titleArr[13] = "부여사유";
		titleArr[14] = "부여일자";
		titleArr[15] = "이동사유코드";
		titleArr[16] = "이동사유";
		titleArr[17] = "이동일자";
		titleArr[18] = "작업일시";
		
		String[] voTitleArr = new String[19];
		voTitleArr[0] = "rdsManNo";
		voTitleArr[1] = "rn";
		voTitleArr[2] = "rnCd";
		voTitleArr[3] = "engRn";
		voTitleArr[4] = "ntfcDe";
		voTitleArr[5] = "wdrRdCd";
		voTitleArr[6] = "roaClsSe";
		voTitleArr[7] = "rdsDpnSe";
		voTitleArr[8] = "rbpCn";
		voTitleArr[9] = "repCn";
		voTitleArr[10] = "roadBt";
		voTitleArr[11] = "roadLt";
		voTitleArr[12] = "bsiInt";
		voTitleArr[13] = "alwncResn";
		voTitleArr[14] = "alwncDe";
		voTitleArr[15] = "mvmResCd";
		voTitleArr[16] = "mvmnResn";
		voTitleArr[17] = "mvmnDe";
		voTitleArr[18] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_도로구간_", titleArr, voTitleArr, excelVO);
	}*/
	
	
	// ################################################# 인구정보 end #################################################




		
	
	
}
