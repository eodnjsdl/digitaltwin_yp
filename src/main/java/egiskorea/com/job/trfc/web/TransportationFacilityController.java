package egiskorea.com.job.trfc.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;

import egiskorea.com.cmm.service.impl.ExcelView;
import egiskorea.com.job.cmss.service.CommonnessSpaceSearchService;
import egiskorea.com.job.cmss.service.TgdSccoEmdVO;
import egiskorea.com.job.trfc.service.Bridge;
import egiskorea.com.job.trfc.service.BridgeVO;
import egiskorea.com.job.trfc.service.Overpass;
import egiskorea.com.job.trfc.service.OverpassVO;
import egiskorea.com.job.trfc.service.RailroadStation;
import egiskorea.com.job.trfc.service.RailroadStationVO;
import egiskorea.com.job.trfc.service.RailroadTrack;
import egiskorea.com.job.trfc.service.RailroadTrackVO;
import egiskorea.com.job.trfc.service.RoadSection;
import egiskorea.com.job.trfc.service.RoadSectionVO;
import egiskorea.com.job.trfc.service.SubwayStation;
import egiskorea.com.job.trfc.service.SubwayStationVO;
import egiskorea.com.job.trfc.service.SubwayTrack;
import egiskorea.com.job.trfc.service.SubwayTrackVO;
import egiskorea.com.job.trfc.service.TransportationFacilityService;
import egiskorea.com.job.trfc.service.Tunnel;
import egiskorea.com.job.trfc.service.TunnelVO;
import egiskorea.com.job.ugtm.service.UnderWaterAgriVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * @Description 교통시설을 관리하는 사용자 controller 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2021.12.28
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.28   이병준           최초 생성
 *  </pre>
 */

@Controller
@RequestMapping("/job/trfc")
public class TransportationFacilityController {
	
	@Resource(name = "transportationFacilityService")
	private TransportationFacilityService transportationFacilityService;
	
	@Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;
	
	/** 공통공간검색 서비스단 */
	@Resource(name = "commonnessSpaceSearchService") 
	private CommonnessSpaceSearchService commonnessSpaceSearchService;
	
// ################################################# 도로구간 #################################################
	
	
	/**
	 * 교통시설 도로구간 목록
	 * 
	 * @param roadSectionVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/transportationFacilityList"
	 * @throws Exception
	 */
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
	
	/**
	 * 교통시설 도로구간 상세 조회
	 * 
	 * @param roadSectionVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/transportationFacility"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectTransportationFacility.do")
	public String selectTransportationFacility(
			@ModelAttribute("searchVO") RoadSectionVO roadSectionVO,
			ModelMap model) throws Exception{
			
		RoadSection result = transportationFacilityService.selectRoadSection(roadSectionVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/transportationFacility";
	}
	
	/**
	 * 교통시설 도로구간 엑셀 다운로드
	 * 
	 * @param roadSectionVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
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
	}
	
	
	
// ################################################# 도로구간 #################################################


// ################################################# 철도선로 #################################################
	
	/**
	 * 교통시설 철도선로 목록
	 * 
	 * @param railroadTrackVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/railroadTrackList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadTrackList.do")
	public String selectRailroadTrackList(
			@ModelAttribute("searchVO") RailroadTrackVO railroadTrackVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(railroadTrackVO.getEmdKorNm() == null)railroadTrackVO.setEmdKorNm("41830");
		railroadTrackVO.setPageUnit(10);
		railroadTrackVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(railroadTrackVO.getSearchType().equals("") || railroadTrackVO.getSearchType().equals("spatial")) {
			
			railroadTrackVO.setEmdKorNm("41830");
			railroadTrackVO.setKorRlrNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(railroadTrackVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(railroadTrackVO.getPageUnit());
		paginationInfo.setPageSize(railroadTrackVO.getPageSize());

		railroadTrackVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		railroadTrackVO.setLastIndex(paginationInfo.getLastRecordIndex());
		railroadTrackVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectRailroadTrackList(railroadTrackVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		// geom 테스트
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(railroadTrackVO);
		model.addAttribute("railroadTrackVO", VOGson);
		
		// geom 테스트		
		
		return "egiskorea/com/job/trfc/railroadTrackList";
	}
	
	/**
	 * 교통시설 철도선로 상세 조회
	 * 
	 * @param railroadTrackVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/railroadTrack"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadTrack.do")
	public String selectRailroadTrack(
			@ModelAttribute("searchVO") RailroadTrackVO railroadTrackVO,
			ModelMap model) throws Exception{
			
		RailroadTrack result = transportationFacilityService.selectRailroadTrack(railroadTrackVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/railroadTrack";
	}
	
	/**
	 * 교통시설 철도선로 엑셀 다운로드
	 * 
	 * @param railroadTrackVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadTrackExcelListDownload.do")
	public void selectRailroadTrackExcelListDownload(
			@ModelAttribute("searchVO") RailroadTrackVO railroadTrackVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectRailroadTrackExcelList(railroadTrackVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "철도선로일련번호";
		titleArr[1] = "철도노선명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "rlrRlwSn";
		voTitleArr[1] = "korRlrNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_철도선로_", titleArr, voTitleArr, excelVO);
	}
	
	
// ################################################# 철도선로 #################################################
	

// ################################################# 철도역사 #################################################
	
	
	/**
	 * 교통시설 철도역사 목록
	 * 
	 * @param railroadStationVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/railroadStationList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadStationList.do")
	public String selectRailroadStationList(
			@ModelAttribute("searchVO") RailroadStationVO railroadStationVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(railroadStationVO.getEmdKorNm() == null)railroadStationVO.setEmdKorNm("41830");
		railroadStationVO.setPageUnit(10);
		railroadStationVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(railroadStationVO.getSearchType().equals("") || railroadStationVO.getSearchType().equals("spatial")) {
			
			railroadStationVO.setEmdKorNm("41830");
			railroadStationVO.setKorStaNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(railroadStationVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(railroadStationVO.getPageUnit());
		paginationInfo.setPageSize(railroadStationVO.getPageSize());

		railroadStationVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		railroadStationVO.setLastIndex(paginationInfo.getLastRecordIndex());
		railroadStationVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectRailroadStationList(railroadStationVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		// geom 테스트
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(railroadStationVO);
		model.addAttribute("railroadStationVO", VOGson);
		
		// geom 테스트		
				
		return "egiskorea/com/job/trfc/railroadStationList";
	}
	
	/**
	 * 교통시설 철도역사 상세 조회
	 * 
	 * @param railroadStationVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/railroadStation"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadStation.do")
	public String selectRailroadStation(
			@ModelAttribute("searchVO") RailroadStationVO railroadStationVO,
			ModelMap model) throws Exception{
			
		RailroadStation result = transportationFacilityService.selectRailroadStation(railroadStationVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/railroadStation";
	}
	
	/**
	 * 교통시설 철도역사 엑셀 다운로드
	 * 
	 * @param railroadStationVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRailroadStationExcelListDownload.do")
	public void selectRailroadStationExcelListDownload(
			@ModelAttribute("searchVO") RailroadStationVO railroadStationVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectRailroadStationExcelList(railroadStationVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "철도역사일련번호";
		titleArr[1] = "철도역사명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "rlrStaSn";
		voTitleArr[1] = "korStaNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_철도역사_", titleArr, voTitleArr, excelVO);
	}
	
	
// ################################################# 철도역사 #################################################
	
	
// ################################################# 지하철선로 #################################################	
	
	/**
	 * 교통시설 지하철선로 목록
	 * 
	 * @param subwayTrackVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/subwayTrackList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayTrackList.do")
	public String selectSubwayStationList(
			@ModelAttribute("searchVO") SubwayTrackVO subwayTrackVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(subwayTrackVO.getEmdKorNm() == null)subwayTrackVO.setEmdKorNm("41830");
		subwayTrackVO.setPageUnit(10);
		subwayTrackVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(subwayTrackVO.getSearchType().equals("") || subwayTrackVO.getSearchType().equals("spatial")) {
			
			subwayTrackVO.setEmdKorNm("41830");
			subwayTrackVO.setKorSbrNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(subwayTrackVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(subwayTrackVO.getPageUnit());
		paginationInfo.setPageSize(subwayTrackVO.getPageSize());

		subwayTrackVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		subwayTrackVO.setLastIndex(paginationInfo.getLastRecordIndex());
		subwayTrackVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectSubwayTrackList(subwayTrackVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(subwayTrackVO);
		model.addAttribute("subwayTrackVO", VOGson);
		
		return "egiskorea/com/job/trfc/subwayTrackList";
	}
	
	/**
	 * 교통시설 지하철선로 상세 조회
	 * 
	 * @param subwayTrackVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/subwayTrack"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayTrack.do")
	public String selectSubwayTrack(
			@ModelAttribute("searchVO") SubwayTrackVO subwayTrackVO,
			ModelMap model) throws Exception{
			
		SubwayTrack result = transportationFacilityService.selectSubwayTrack(subwayTrackVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/subwayTrack";
	}
	
	/**
	 * 교통시설 지하철선로 엑셀 다운로드
	 * 
	 * @param subwayTrackVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayTrackExcelListDownload.do")
	public void selectSubwayTrackExcelListDownload(
			@ModelAttribute("searchVO") SubwayTrackVO subwayTrackVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectSubwayTrackExcelList(subwayTrackVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "지하철선로일련번호";
		titleArr[1] = "지하철노선명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "subRlwSn";
		voTitleArr[1] = "korSbrNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_지하철선로_", titleArr, voTitleArr, excelVO);
	}
	
	
// ################################################# 지하철선로 #################################################
	
	
// ################################################# 지하철역사 #################################################
	
	/**
	 * 교통시설 지하철역사 목록
	 * 
	 * @param subwayTrackVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/subwayStationList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayStationList.do")
	public String selectSubwayStationList(
			@ModelAttribute("searchVO") SubwayStationVO subwayStationVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(subwayStationVO.getEmdKorNm() == null)subwayStationVO.setEmdKorNm("41830");
		subwayStationVO.setPageUnit(10);
		subwayStationVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(subwayStationVO.getSearchType().equals("") || subwayStationVO.getSearchType().equals("spatial")) {
			
			subwayStationVO.setEmdKorNm("41830");
			subwayStationVO.setKorSubNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(subwayStationVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(subwayStationVO.getPageUnit());
		paginationInfo.setPageSize(subwayStationVO.getPageSize());

		subwayStationVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		subwayStationVO.setLastIndex(paginationInfo.getLastRecordIndex());
		subwayStationVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectSubwayStationList(subwayStationVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(subwayStationVO);
		model.addAttribute("subwayStationVO", VOGson);
		
		return "egiskorea/com/job/trfc/subwayStationList";
	}
	
	/**
	 * 교통시설 지하철역사 상세 조회
	 * 
	 * @param subwayStationVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/subwayStation"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayStation.do")
	public String selectSubwayStation(
			@ModelAttribute("searchVO") SubwayStationVO subwayStationVO,
			ModelMap model) throws Exception{
			
		SubwayStation result = transportationFacilityService.selectSubwayStation(subwayStationVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/subwayStation";
	}
	
	/**
	 * 교통시설 지하철역사 엑셀 다운로드
	 * 
	 * @param subwayStationVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectSubwayStationExcelListDownload.do")
	public void selectSubwayStationExcelListDownload(
			@ModelAttribute("searchVO") SubwayStationVO subwayStationVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectSubwayStationExcelList(subwayStationVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "지하철역사일련번호";
		titleArr[1] = "지하철역사명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "subStaSn";
		voTitleArr[1] = "korSubNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_지하철역사_", titleArr, voTitleArr, excelVO);
	}
	
	
	
// ################################################# 지하철역사 #################################################
	
	
// ################################################# 교량 #################################################
	
	/**
	 * 교통시설 교량 목록
	 * 
	 * @param bridgeVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/bridgeList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBridgeList.do")
	public String selectBridgeList(
			@ModelAttribute("searchVO") BridgeVO bridgeVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(bridgeVO.getEmdKorNm() == null)bridgeVO.setEmdKorNm("41830");
		bridgeVO.setPageUnit(10);
		bridgeVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(bridgeVO.getSearchType().equals("") || bridgeVO.getSearchType().equals("spatial")) {
			
			bridgeVO.setEmdKorNm("41830");
			bridgeVO.setKorBriNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(bridgeVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(bridgeVO.getPageUnit());
		paginationInfo.setPageSize(bridgeVO.getPageSize());

		bridgeVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		bridgeVO.setLastIndex(paginationInfo.getLastRecordIndex());
		bridgeVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectBridgeList(bridgeVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(bridgeVO);
		model.addAttribute("bridgeVO", VOGson);
		
		return "egiskorea/com/job/trfc/bridgeList";
	}
	
	/**
	 * 교통시설 교량 상세 조회
	 * 
	 * @param bridgeVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/bridge"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBridge.do")
	public String selectBridge(
			@ModelAttribute("searchVO") BridgeVO bridgeVO,
			ModelMap model) throws Exception{
			
		Bridge result = transportationFacilityService.selectBridge(bridgeVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/bridge";
	}
	
	/**
	 * 교통시설 교량 엑셀 다운로드
	 * 
	 * @param bridgeVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectBridgeExcelListDownload.do")
	public void selectBridgeExcelListDownload(
			@ModelAttribute("searchVO") BridgeVO bridgeVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectBridgeExcelList(bridgeVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "교량일련번호";
		titleArr[1] = "교량명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "bridgeSn";
		voTitleArr[1] = "korBriNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_교량_", titleArr, voTitleArr, excelVO);
	}
	
	
// ################################################# 교량 #################################################
	
	
	
// ################################################# 고가도로 #################################################
	
	/**
	 * 교통시설 고가도로 목록
	 * 
	 * @param overpassVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/overpassList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOverpassList.do")
	public String selectBridgeList(
			@ModelAttribute("searchVO") OverpassVO overpassVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(overpassVO.getEmdKorNm() == null)overpassVO.setEmdKorNm("41830");
		overpassVO.setPageUnit(10);
		overpassVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(overpassVO.getSearchType().equals("") || overpassVO.getSearchType().equals("spatial")) {
			
			overpassVO.setEmdKorNm("41830");
			overpassVO.setKorOveNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(overpassVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(overpassVO.getPageUnit());
		paginationInfo.setPageSize(overpassVO.getPageSize());

		overpassVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		overpassVO.setLastIndex(paginationInfo.getLastRecordIndex());
		overpassVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectOverpassList(overpassVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(overpassVO);
		model.addAttribute("overpassVO", VOGson);
		
		return "egiskorea/com/job/trfc/overpassList";
	}
	
	/**
	 * 교통시설 고가도로 상세 조회
	 * 
	 * @param overpassVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/overpass"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOverpass.do")
	public String selectOverpass(
			@ModelAttribute("searchVO") OverpassVO overpassVO,
			ModelMap model) throws Exception{
			
		Overpass result = transportationFacilityService.selectOverpass(overpassVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/overpass";
	}
	
	/**
	 * 교통시설 고가도로 엑셀 다운로드
	 * 
	 * @param overpassVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectOverpassExcelListDownload.do")
	public void selectOverpassExcelListDownload(
			@ModelAttribute("searchVO") OverpassVO overpassVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectOverpassExcelList(overpassVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "고가도로일련번호";
		titleArr[1] = "고가도로명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "oveSn";
		voTitleArr[1] = "korOveNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_고가도로_", titleArr, voTitleArr, excelVO);
	}
	
	
	
// ################################################# 고가도로 #################################################

	
// ################################################# 터널 #################################################

	/**
	 * 교통시설 터널 목록
	 * 
	 * @param tunnelVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/tunnelList"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectTunnelList.do")
	public String selectTunnelList(
			@ModelAttribute("searchVO") TunnelVO tunnelVO,
			TgdSccoEmdVO tgdSccoEmdVO,
			ModelMap model) throws Exception{
		
		if(tunnelVO.getEmdKorNm() == null)tunnelVO.setEmdKorNm("41830");
		tunnelVO.setPageUnit(10);
		tunnelVO.setPageSize(propertyService.getInt("pageSize"));		
		
		// 검색타입 체크. 공간검색 혹은 속성검색시 조회된 값이 없을때 default값으로 변경
		if(tunnelVO.getSearchType().equals("") || tunnelVO.getSearchType().equals("spatial")) {
			
			tunnelVO.setEmdKorNm("41830");
			tunnelVO.setTunKorNm("");
			
		}
		
		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(tunnelVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(tunnelVO.getPageUnit());
		paginationInfo.setPageSize(tunnelVO.getPageSize());

		tunnelVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		tunnelVO.setLastIndex(paginationInfo.getLastRecordIndex());
		tunnelVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		Map<String, Object> map = transportationFacilityService.selectTunnelList(tunnelVO);
		
		int totCnt = Integer.parseInt((String)map.get("resultCnt"));
		  
		paginationInfo.setTotalRecordCount(totCnt);
		
		model.addAttribute("resultList", map.get("resultList"));
		model.addAttribute("resultCnt", map.get("resultCnt"));
		model.addAttribute("paginationInfo", paginationInfo);
		
		Map<String, Object> map2 = commonnessSpaceSearchService.selectTgdSccoEmdList(tgdSccoEmdVO);
		
		model.addAttribute("sccoEndList", map2.get("resultList"));
		
		Gson gson = new Gson();
		String geom = gson.toJson(map.get("resultList"));
		model.addAttribute("geom", geom);
		
		String VOGson = gson.toJson(tunnelVO);
		model.addAttribute("tunnelVO", VOGson);
		
		return "egiskorea/com/job/trfc/tunnelList";
	}
	
	/**
	 * 교통시설 터널 상세 조회
	 * 
	 * @param tunnelVO
	 * @param model
	 * @return "egiskorea/com/job/trfc/tunnel"
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectTunnel.do")
	public String selectTunnel(
			@ModelAttribute("searchVO") TunnelVO tunnelVO,
			ModelMap model) throws Exception{
			
		Tunnel result = transportationFacilityService.selectTunnel(tunnelVO);
		model.addAttribute("result", result);
		
		return "egiskorea/com/job/trfc/tunnel";
	}
	
	/**
	 * 교통시설 터널 엑셀 다운로드
	 * 
	 * @param tunnelVO
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectTunnelExcelListDownload.do")
	public void selectTunnelExcelListDownload(
			@ModelAttribute("searchVO") TunnelVO tunnelVO,
			HttpServletRequest request,
			HttpServletResponse response,
			ModelMap model) throws Exception{
		
		List<?> excelVO = transportationFacilityService.selectTunnelExcelList(tunnelVO);
		
		String[] titleArr = new String[3];
		titleArr[0] = "터널일련번호";
		titleArr[1] = "터널명_한글";
		titleArr[2] = "작업일시";
		
		
		String[] voTitleArr = new String[3];
		voTitleArr[0] = "tunnelSn";
		voTitleArr[1] = "tunKorNm";
		voTitleArr[2] = "opertDe";
		
		ExcelView.excelDownload(request, response,  "교통시설_터널_", titleArr, voTitleArr, excelVO);
	}
	
	
// ################################################# 터널 #################################################
		
		
		
	
	
}
