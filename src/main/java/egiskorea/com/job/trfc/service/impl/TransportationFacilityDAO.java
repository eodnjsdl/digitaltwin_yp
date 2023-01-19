package egiskorea.com.job.trfc.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
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
import egiskorea.com.job.trfc.service.Tunnel;
import egiskorea.com.job.trfc.service.TunnelVO;

/**
 * @Description 교통시설를 관리하는 dao 클래스
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

@Repository("transportationFacilityDAO")
public class TransportationFacilityDAO extends ComAbstractDAO {
	
// ################################################# 도로구간 #################################################
	
	
	/**
	 * 교통시설 도로구간 목록
	 * @param roadSectionVO
	 * @return list
	 */
	public List<?> selectRoadSectionList(RoadSectionVO roadSectionVO) {
		return selectList("transportationFacility.selectRoadSectionList", roadSectionVO);
	}
	
	/**
	 * 교통시설 도로구간 목록 cnt
	 * @param roadSectionVO
	 * @return int
	 */
	public int selectRoadSectionListCnt(RoadSectionVO roadSectionVO) {
		return (Integer)selectOne("transportationFacility.selectRoadSectionListCnt", roadSectionVO);
	}
	
	/** 
	 * 교통시설 도로구간 상세조회
	 * @param roadSectionVO
	 * @return RoadSection
	 */
	public RoadSection selectRoadSection(RoadSectionVO roadSectionVO) {
		return (RoadSection) selectOne("transportationFacility.selectRoadSection", roadSectionVO);
	}
	
	/**
	 * 교통시설 도로구간 엑셀다운로드
	 * @param roadSectionVO
	 * @return list
	 */
	public List<?> selectRoadSectionExcelList(RoadSectionVO roadSectionVO) {
		return selectList("transportationFacility.selectRoadSectionExcelList", roadSectionVO);
	}
	
	
// ################################################# 도로구간 #################################################
	
	
// ################################################# 철도선로 #################################################
	
	
	/**
	 * 교통시설 철도선로 목록
	 * @param railroadTrackVO
	 * @return list
	 */
	public List<?> selectRailroadTrackList(RailroadTrackVO railroadTrackVO) {
		return selectList("transportationFacility.selectRailroadTrackList", railroadTrackVO);
	}
	
	/**
	 * 교통시설 철도선로 목록 cnt
	 * @param railroadTrackVO
	 * @return int
	 */
	public int selectRailroadTrackListCnt(RailroadTrackVO railroadTrackVO) {
		return (Integer)selectOne("transportationFacility.selectRailroadTrackListCnt", railroadTrackVO);
	}
	
	/** 
	 * 교통시설 철도선로 상세조회
	 * @param railroadTrackVO
	 * @return RailroadTrack
	 */
	public RailroadTrack selectRailroadTrack(RailroadTrackVO railroadTrackVO) {
		return (RailroadTrack) selectOne("transportationFacility.selectRailroadTrack", railroadTrackVO);
	}
	
	/**
	 * 교통시설 철도선로 엑셀다운로드
	 * @param railroadTrackVO
	 * @return list
	 */
	public List<?> selectRailroadTrackExcelList(RailroadTrackVO railroadTrackVO) {
		return selectList("transportationFacility.selectRailroadTrackExcelList", railroadTrackVO);
	}

// ################################################# 철도선로 #################################################
	

// ################################################# 철도역사 #################################################
	
	
	/**
	 * 교통시설 철도역사 목록
	 * @param railroadStationVO
	 * @return list
	 */
	public List<?> selectRailroadStationList(RailroadStationVO railroadStationVO) {
		return selectList("transportationFacility.selectRailroadStationList", railroadStationVO);
	}
	
	/**
	 * 교통시설 철도역사 목록 cnt
	 * @param railroadStationVO
	 * @return int
	 */
	public int selectRailroadStationListCnt(RailroadStationVO railroadStationVO) {
		return (Integer)selectOne("transportationFacility.selectRailroadStationListCnt", railroadStationVO);
	}
	
	/** 
	 * 교통시설 철도역사 상세조회
	 * @param railroadStationVO
	 * @return RailroadStation
	 */
	public RailroadStation selectRailroadStation(RailroadStationVO railroadStationVO) {
		return (RailroadStation) selectOne("transportationFacility.selectRailroadStation", railroadStationVO);
	}
	
	/**
	 * 교통시설 철도역사 엑셀다운로드
	 * @param railroadStationVO
	 * @return list
	 */
	public List<?> selectRailroadStationExcelList(RailroadStationVO railroadStationVO) {
		return selectList("transportationFacility.selectRailroadStationExcelList", railroadStationVO);
	}
	
// ################################################# 철도역사 #################################################
	
	
// ################################################# 지하철선로 #################################################
	
	
	/**
	 * 교통시설 지하철선로 목록
	 * @param subwayTrackVO
	 * @return list
	 */
	public List<?> selectSubwayTrackList(SubwayTrackVO subwayTrackVO) {
		return selectList("transportationFacility.selectSubwayTrackList", subwayTrackVO);
	}
	
	/**
	 * 교통시설 지하철선로 목록 cnt
	 * @param subwayTrackVO
	 * @return int
	 */
	public int selectSubwayTrackListCnt(SubwayTrackVO subwayTrackVO) {
		return (Integer)selectOne("transportationFacility.selectSubwayTrackListCnt", subwayTrackVO);
	}
	
	/** 
	 * 교통시설 지하철선로 상세조회
	 * @param subwayTrackVO
	 * @return SubwayTrack
	 */
	public SubwayTrack selectSubwayTrack(SubwayTrackVO subwayTrackVO) {
		return (SubwayTrack) selectOne("transportationFacility.selectSubwayTrack", subwayTrackVO);
	}
	
	/**
	 * 교통시설 지하철선로 엑셀다운로드
	 * @param subwayTrackVO
	 * @return list
	 */
	public List<?> selectSubwayTrackExcelList(SubwayTrackVO subwayTrackVO) {
		return selectList("transportationFacility.selectSubwayTrackExcelList", subwayTrackVO);
	}
	
// ################################################# 지하철선로 #################################################
	
	
// ################################################# 지하철역사 #################################################	
	
	/**
	 * 교통시설 지하철역사 목록
	 * @param subwayStationVO
	 * @return list
	 */
	public List<?> selectSubwayStationList(SubwayStationVO subwayStationVO) {
		return selectList("transportationFacility.selectSubwayStationList", subwayStationVO);
	}
	
	/**
	 * 교통시설 지하철역사 목록 cnt
	 * @param subwayStationVO
	 * @return int
	 */
	public int selectSubwayStationListCnt(SubwayStationVO subwayStationVO) {
		return (Integer)selectOne("transportationFacility.selectSubwayStationListCnt", subwayStationVO);
	}
	
	/** 
	 * 교통시설 지하철역사 상세조회
	 * @param subwayStationVO
	 * @return SubwayStation
	 */
	public SubwayStation selectSubwayStation(SubwayStationVO subwayStationVO) {
		return (SubwayStation) selectOne("transportationFacility.selectSubwayStation", subwayStationVO);
	}
	
	/**
	 * 교통시설 지하철역사 엑셀다운로드
	 * @param subwayStationVO
	 * @return list
	 */
	public List<?> selectSubwayStationExcelList(SubwayStationVO subwayStationVO) {
		return selectList("transportationFacility.selectSubwayStationExcelList", subwayStationVO);
	}
	
// ################################################# 지하철역사 #################################################
	
	
// ################################################# 교량 #################################################
	
	/**
	 * 교통시설 교량 목록
	 * @param bridgeVO
	 * @return list
	 */
	public List<?> selectBridgeList(BridgeVO bridgeVO) {
		return selectList("transportationFacility.selectBridgeList", bridgeVO);
	}
	
	/**
	 * 교통시설 교량 목록 cnt
	 * @param bridgeVO
	 * @return int
	 */
	public int selectBridgeListCnt(BridgeVO bridgeVO) {
		return (Integer)selectOne("transportationFacility.selectBridgeListCnt", bridgeVO);
	}
	
	/** 
	 * 교통시설 교량 상세조회
	 * @param bridgeVO
	 * @return Bridge
	 */
	public Bridge selectBridge(BridgeVO bridgeVO) {
		return (Bridge) selectOne("transportationFacility.selectBridge", bridgeVO);
	}
	
	/**
	 * 교통시설 교량 엑셀다운로드
	 * @param bridgeVO
	 * @return list
	 */
	public List<?> selectBridgeExcelList(BridgeVO bridgeVO) {
		return selectList("transportationFacility.selectBridgeExcelList", bridgeVO);
	}
	
// ################################################# 교량 #################################################
	
	
// ################################################# 고가도로 #################################################	
	/**
	 * 교통시설 고가도로 목록
	 * @param overpassVO
	 * @return list
	 */
	public List<?> selectOverpassList(OverpassVO overpassVO) {
		return selectList("transportationFacility.selectOverpassList", overpassVO);
	}
	
	/**
	 * 교통시설 고가도로 목록 cnt
	 * @param overpassVO
	 * @return int
	 */
	public int selectOverpassListCnt(OverpassVO overpassVO) {
		return (Integer)selectOne("transportationFacility.selectOverpassListCnt", overpassVO);
	}
	
	/** 
	 * 교통시설 고가도로 상세조회
	 * @param overpassVO
	 * @return Overpass
	 */
	public Overpass selectOverpass(OverpassVO overpassVO) {
		return (Overpass) selectOne("transportationFacility.selectOverpass", overpassVO);
	}
	
	/**
	 * 교통시설 고가도로 엑셀다운로드
	 * @param overpassVO
	 * @return list
	 */
	public List<?> selectOverpassExcelList(OverpassVO overpassVO) {
		return selectList("transportationFacility.selectOverpassExcelList", overpassVO);
	}
	
// ################################################# 고가도로 #################################################
	
	
// ################################################# 터널 #################################################	
	
	/**
	 * 교통시설 터널 목록
	 * @param tunnelVO
	 * @return list
	 */
	public List<?> selectTunnelList(TunnelVO tunnelVO) {
		return selectList("transportationFacility.selectTunnelList", tunnelVO);
	}
	
	/**
	 * 교통시설 터널 목록 cnt
	 * @param tunnelVO
	 * @return int
	 */
	public int selectTunnelListCnt(TunnelVO tunnelVO) {
		return (Integer)selectOne("transportationFacility.selectTunnelListCnt", tunnelVO);
	}
	
	/** 
	 * 교통시설 터널 상세조회
	 * @param tunnelVO
	 * @return Tunnel
	 */
	public Tunnel selectTunnel(TunnelVO tunnelVO) {
		return (Tunnel) selectOne("transportationFacility.selectTunnel", tunnelVO);
	}
	
	/**
	 * 교통시설 터널 엑셀다운로드
	 * @param tunnelVO
	 * @return list
	 */
	public List<?> selectTunnelExcelList(TunnelVO tunnelVO) {
		return selectList("transportationFacility.selectTunnelExcelList", tunnelVO);
	}
		
// ################################################# 터널 #################################################
		
		
}
