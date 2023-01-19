package egiskorea.com.job.trfc.service;

import java.util.List;
import java.util.Map;

/**
 * @Description 교통시설를 관리하는 service 클래스
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

public interface TransportationFacilityService {
	
	
// ################################################# 도로구간 #################################################
	
	
	/**
	 * 교통시설 도로구간 목록
	 * @param transportationFacilityVO
	 * @return Map
	 */
	public Map<String, Object> selectTransportationFacilityList(RoadSectionVO transportationFacilityVO);
	
	/** 
	 * 교통시설 도로구간 상세조회
	 * @param roadSectionVO
	 * @return RoadSection
	 */
	public RoadSection selectRoadSection(RoadSectionVO roadSectionVO);
	
	/**
	 * 교통시설 도로구간 엑셀다운로드
	 * @param roadSectionVO
	 * @return list
	 */
	public List<?> selectRoadSectionExcelList(RoadSectionVO roadSectionVO);
	
// ################################################# 도로구간 #################################################


// ################################################# 철도선로 #################################################
	
	
	/**
	 * 교통시설 철도선로 목록
	 * @param railroadTrackVO
	 * @return Map
	 */
	public Map<String, Object> selectRailroadTrackList(RailroadTrackVO railroadTrackVO);
	
	/** 
	 * 교통시설 철도선로 상세조회
	 * @param railroadTrackVO
	 * @return RailroadTrack
	 */
	public RailroadTrack selectRailroadTrack(RailroadTrackVO railroadTrackVO);
	
	/**
	 * 교통시설 철도선로 엑셀다운로드
	 * @param railroadTrackVO
	 * @return list
	 */
	public List<?> selectRailroadTrackExcelList(RailroadTrackVO railroadTrackVO);
	
	
// ################################################# 철도선로 #################################################

	
// ################################################# 철도역사 #################################################
	
	/**
	 * 교통시설 철도역사 목록
	 * @param railroadStationVO
	 * @return Map
	 */
	public Map<String, Object> selectRailroadStationList(RailroadStationVO railroadStationVO);
	
	/** 
	 * 교통시설 철도역사 상세조회
	 * @param railroadStationVO
	 * @return RailroadStation
	 */
	public RailroadStation selectRailroadStation(RailroadStationVO railroadStationVO);
	
	/**
	 * 교통시설 철도역사 엑셀다운로드
	 * @param railroadStationVO
	 * @return list
	 */
	public List<?> selectRailroadStationExcelList(RailroadStationVO railroadStationVO);
	
	
// ################################################# 철도역사 #################################################
	
	
// ################################################# 지하철선로 #################################################
	
	
	/**
	 * 교통시설 지하철선로 목록
	 * @param subwayTrackVO
	 * @return Map
	 */
	public Map<String, Object> selectSubwayTrackList(SubwayTrackVO subwayTrackVO);
	
	/** 
	 * 교통시설 지하철선로 상세조회
	 * @param subwayTrackVO
	 * @return SubwayTrack
	 */
	public SubwayTrack selectSubwayTrack(SubwayTrackVO subwayTrackVO);
	
	/**
	 * 교통시설 지하철선로 엑셀다운로드
	 * @param subwayTrackVO
	 * @return list
	 */
	public List<?> selectSubwayTrackExcelList(SubwayTrackVO subwayTrackVO);
	
	
// ################################################# 지하철선로 #################################################
	
	
// ################################################# 지하철역사 #################################################
	
	
	/**
	 * 교통시설 지하철역사 목록
	 * @param subwayStationVO
	 * @return Map
	 */
	public Map<String, Object> selectSubwayStationList(SubwayStationVO subwayStationVO);
	
	/** 
	 * 교통시설 지하철역사 상세조회
	 * @param subwayStationVO
	 * @return SubwayStation
	 */
	public SubwayStation selectSubwayStation(SubwayStationVO subwayStationVO);
	
	/**
	 * 교통시설 지하철역사 엑셀다운로드
	 * @param subwayStationVO
	 * @return list
	 */
	public List<?> selectSubwayStationExcelList(SubwayStationVO subwayStationVO);
	
// ################################################# 지하철역사 #################################################

	
	
// ################################################# 교량 #################################################
	
	
	/**
	 * 교통시설 교량 목록
	 * @param bridgeVO
	 * @return Map
	 */
	public Map<String, Object> selectBridgeList(BridgeVO bridgeVO);
	
	/** 
	 * 교통시설 교량 상세조회
	 * @param bridgeVO
	 * @return Bridge
	 */
	public Bridge selectBridge(BridgeVO bridgeVO);
	
	/**
	 * 교통시설 교량 엑셀다운로드
	 * @param bridgeVO
	 * @return list
	 */
	public List<?> selectBridgeExcelList(BridgeVO bridgeVO);
	
	
// ################################################# 교량 #################################################
	
	
// ################################################# 고가도로 #################################################
	
	/**
	 * 교통시설 고가도로 목록
	 * @param overpassVO
	 * @return Map
	 */
	public Map<String, Object> selectOverpassList(OverpassVO overpassVO);
	
	/** 
	 * 교통시설 고가도로 상세조회
	 * @param overpassVO
	 * @return Overpass
	 */
	public Overpass selectOverpass(OverpassVO overpassVO);
	
	/**
	 * 교통시설 고가도로 엑셀다운로드
	 * @param overpassVO
	 * @return list
	 */
	public List<?> selectOverpassExcelList(OverpassVO overpassVO);
	
// ################################################# 고가도로 #################################################

	
// ################################################# 터널 #################################################

	/**
	 * 교통시설 터널 목록
	 * @param tunnelVO
	 * @return Map
	 */
	public Map<String, Object> selectTunnelList(TunnelVO tunnelVO);
	
	/** 
	 * 교통시설 터널 상세조회
	 * @param tunnelVO
	 * @return Tunnel
	 */
	public Tunnel selectTunnel(TunnelVO tunnelVO);
	
	/**
	 * 교통시설 터널 엑셀다운로드
	 * @param tunnelVO
	 * @return list
	 */
	public List<?> selectTunnelExcelList(TunnelVO tunnelVO);
	
// ################################################# 터널 #################################################
		
		
		
}
