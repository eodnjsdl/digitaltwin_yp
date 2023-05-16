package egiskorea.com.job.tran.popltn.service.impl;

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
 * @Description 교통시설 dao 클래스
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

@Repository("poplulationInfoDAO")
public class PoplulationInfoDAO extends ComAbstractDAO {
	
// ################################################# 도로구간 #################################################
	
	
	/**
	 * 교통시설 도로구간 목록
	 * @param roadSectionVO
	 * @return list
	 *//*
	public List<?> selectRoadSectionList(RoadSectionVO roadSectionVO) {
		return selectList("transportationFacility.selectRoadSectionList", roadSectionVO);
	}
	
	*//**
	 * 교통시설 도로구간 목록 cnt
	 * @param roadSectionVO
	 * @return int
	 *//*
	public int selectRoadSectionListCnt(RoadSectionVO roadSectionVO) {
		return (Integer)selectOne("transportationFacility.selectRoadSectionListCnt", roadSectionVO);
	}
	
	*//** 
	 * 교통시설 도로구간 상세조회
	 * @param roadSectionVO
	 * @return RoadSection
	 *//*
	public RoadSection selectRoadSection(RoadSectionVO roadSectionVO) {
		return (RoadSection) selectOne("transportationFacility.selectRoadSection", roadSectionVO);
	}
	
	*//**
	 * 교통시설 도로구간 엑셀다운로드
	 * @param roadSectionVO
	 * @return list
	 *//*
	public List<?> selectRoadSectionExcelList(RoadSectionVO roadSectionVO) {
		return selectList("transportationFacility.selectRoadSectionExcelList", roadSectionVO);
	}*/
	
	
// ################################################# 도로구간 #################################################
	
	

}
