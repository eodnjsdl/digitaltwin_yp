package egiskorea.com.job.trfc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 교통시설를 관리하는 serviceImpl 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   이병준           최초 생성
 *  </pre>
 */

@Service("transportationFacilityService")
public class TransportationFacilityServiceImpl extends EgovAbstractServiceImpl implements TransportationFacilityService{
	
	@Resource(name = "transportationFacilityDAO")
	private TransportationFacilityDAO transportationFacilityDAO;

	
// ################################################# 도로구간 #################################################
	
	/**
	 * 교통시설 도로구간 목록
	 * @param roadSectionVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectTransportationFacilityList(RoadSectionVO roadSectionVO) {
		
		List<?> list = transportationFacilityDAO.selectRoadSectionList(roadSectionVO);
		
		int cnt = transportationFacilityDAO.selectRoadSectionListCnt(roadSectionVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 도로구간 상세조회
	 * @param roadSectionVO
	 * @return RoadSection
	 */
	public RoadSection selectRoadSection(RoadSectionVO roadSectionVO) {
		
		RoadSection result = transportationFacilityDAO.selectRoadSection(roadSectionVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 도로구간 엑셀 다운로드
	 * @param roadSectionVO
	 * @return List<?>
	 */
	public List<?> selectRoadSectionExcelList(RoadSectionVO roadSectionVO) {
		
		List<?> result = transportationFacilityDAO.selectRoadSectionExcelList(roadSectionVO);
		
		return result;
		
	}
	
	
// ################################################# 도로구간 #################################################


// ################################################# 철도선로 #################################################
	
	/**
	 * 교통시설 철도선로 목록
	 * @param railroadTrackVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectRailroadTrackList(RailroadTrackVO railroadTrackVO) {
		
		List<?> list = transportationFacilityDAO.selectRailroadTrackList(railroadTrackVO);
		
		int cnt = transportationFacilityDAO.selectRailroadTrackListCnt(railroadTrackVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 철도선로 상세조회
	 * @param railroadTrackVO
	 * @return RailroadTrack
	 */
	public RailroadTrack selectRailroadTrack(RailroadTrackVO railroadTrackVO) {
		
		RailroadTrack result = transportationFacilityDAO.selectRailroadTrack(railroadTrackVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 철도선로 엑셀 다운로드
	 * @param railroadTrackVO
	 * @return List<?>
	 */
	public List<?> selectRailroadTrackExcelList(RailroadTrackVO railroadTrackVO) {
		
		List<?> result = transportationFacilityDAO.selectRailroadTrackExcelList(railroadTrackVO);
		
		return result;
		
	}
	
	
// ################################################# 철도선로 #################################################
	

// ################################################# 철도역사 #################################################
	
	
	/**
	 * 교통시설 철도역사 목록
	 * @param railroadStationVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectRailroadStationList(RailroadStationVO railroadStationVO) {
		
		List<?> list = transportationFacilityDAO.selectRailroadStationList(railroadStationVO);
		
		int cnt = transportationFacilityDAO.selectRailroadStationListCnt(railroadStationVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 철도역사 상세조회
	 * @param railroadStationVO
	 * @return RailroadStation
	 */
	public RailroadStation selectRailroadStation(RailroadStationVO railroadStationVO) {
		
		RailroadStation result = transportationFacilityDAO.selectRailroadStation(railroadStationVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 철도역사 엑셀 다운로드
	 * @param railroadStationVO
	 * @return List<?>
	 */
	public List<?> selectRailroadStationExcelList(RailroadStationVO railroadStationVO) {
		
		List<?> result = transportationFacilityDAO.selectRailroadStationExcelList(railroadStationVO);
		
		return result;
		
	}
	
// ################################################# 철도역사 #################################################
	
	
// ################################################# 지하철선로 #################################################
	
	/**
	 * 교통시설 지하철선로 목록
	 * @param subwayTrackVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectSubwayTrackList(SubwayTrackVO subwayTrackVO) {
		
		List<?> list = transportationFacilityDAO.selectSubwayTrackList(subwayTrackVO);
		
		int cnt = transportationFacilityDAO.selectSubwayTrackListCnt(subwayTrackVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 지하철선로 상세조회
	 * @param subwayTrackVO
	 * @return SubwayTrack
	 */
	public SubwayTrack selectSubwayTrack(SubwayTrackVO subwayTrackVO) {
		
		SubwayTrack result = transportationFacilityDAO.selectSubwayTrack(subwayTrackVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 지하철선로 엑셀 다운로드
	 * @param subwayTrackVO
	 * @return List<?>
	 */
	public List<?> selectSubwayTrackExcelList(SubwayTrackVO subwayTrackVO) {
		
		List<?> result = transportationFacilityDAO.selectSubwayTrackExcelList(subwayTrackVO);
		
		return result;
		
	}
	
	
// ################################################# 지하철선로 #################################################
	
	
	
// ################################################# 지하철역사 #################################################
	
	
	/**
	 * 교통시설 지하철역사 목록
	 * @param subwayStationVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectSubwayStationList(SubwayStationVO subwayStationVO) {
		
		List<?> list = transportationFacilityDAO.selectSubwayStationList(subwayStationVO);
		
		int cnt = transportationFacilityDAO.selectSubwayStationListCnt(subwayStationVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 지하철역사 상세조회
	 * @param subwayStationVO
	 * @return SubwayStation
	 */
	public SubwayStation selectSubwayStation(SubwayStationVO subwayStationVO) {
		
		SubwayStation result = transportationFacilityDAO.selectSubwayStation(subwayStationVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 지하철역사 엑셀 다운로드
	 * @param subwayStationVO
	 * @return List<?>
	 */
	public List<?> selectSubwayStationExcelList(SubwayStationVO subwayStationVO) {
		
		List<?> result = transportationFacilityDAO.selectSubwayStationExcelList(subwayStationVO);
		
		return result;
		
	}
	
	
// ################################################# 지하철역사 #################################################
	
	
// ################################################# 교량 #################################################
	
	
	/**
	 * 교통시설 교량 목록
	 * @param bridgeVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectBridgeList(BridgeVO bridgeVO) {
		
		List<?> list = transportationFacilityDAO.selectBridgeList(bridgeVO);
		
		int cnt = transportationFacilityDAO.selectBridgeListCnt(bridgeVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 교량 상세조회
	 * @param bridgeVO
	 * @return Bridge
	 */
	public Bridge selectBridge(BridgeVO bridgeVO) {
		
		Bridge result = transportationFacilityDAO.selectBridge(bridgeVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 교량 엑셀 다운로드
	 * @param bridgeVO
	 * @return List<?>
	 */
	public List<?> selectBridgeExcelList(BridgeVO bridgeVO) {
		
		List<?> result = transportationFacilityDAO.selectBridgeExcelList(bridgeVO);
		
		return result;
		
	}
	
	
// ################################################# 교량 #################################################
	
	
// ################################################# 고가도로 #################################################
	
	
	/**
	 * 교통시설 고가도로 목록
	 * @param overpassVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectOverpassList(OverpassVO overpassVO) {
		
		List<?> list = transportationFacilityDAO.selectOverpassList(overpassVO);
		
		int cnt = transportationFacilityDAO.selectOverpassListCnt(overpassVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 고가도로 상세조회
	 * @param overpassVO
	 * @return Overpass
	 */
	public Overpass selectOverpass(OverpassVO overpassVO) {
		
		Overpass result = transportationFacilityDAO.selectOverpass(overpassVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 고가도로 엑셀 다운로드
	 * @param overpassVO
	 * @return List<?>
	 */
	public List<?> selectOverpassExcelList(OverpassVO overpassVO) {
		
		List<?> result = transportationFacilityDAO.selectOverpassExcelList(overpassVO);
		
		return result;
		
	}
	
	
// ################################################# 고가도로 #################################################
	

// ################################################# 터널 #################################################


	/**
	 * 교통시설 터널 목록
	 * @param tunnelVO
	 * @return Map<String, Object>
	 */
	@Override
	public Map<String, Object> selectTunnelList(TunnelVO tunnelVO) {
		
		List<?> list = transportationFacilityDAO.selectTunnelList(tunnelVO);
		
		int cnt = transportationFacilityDAO.selectTunnelListCnt(tunnelVO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("resultList", list);
		map.put("resultCnt", Integer.toString(cnt));
		
		return map;
		
	}
	
	/** 
	 * 교통시설 터널 상세조회
	 * @param tunnelVO
	 * @return Tunnel
	 */
	public Tunnel selectTunnel(TunnelVO tunnelVO) {
		
		Tunnel result = transportationFacilityDAO.selectTunnel(tunnelVO);
		
		return result;
		
	}
	
	/** 
	 * 교통시설 터널 엑셀 다운로드
	 * @param tunnelVO
	 * @return List<?>
	 */
	public List<?> selectTunnelExcelList(TunnelVO tunnelVO) {
		
		List<?> result = transportationFacilityDAO.selectTunnelExcelList(tunnelVO);
		
		return result;
		
	}
	
	
	
// ################################################# 터널 #################################################
	
	
	
	
}
