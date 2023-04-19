package egiskorea.com.job.fcmr.tpfc.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.fcmr.tpfc.service.BrdgeVO;
import egiskorea.com.job.fcmr.tpfc.service.OvrpassVO;
import egiskorea.com.job.fcmr.tpfc.service.RlroadStVO;
import egiskorea.com.job.fcmr.tpfc.service.RlroadTcVO;
import egiskorea.com.job.fcmr.tpfc.service.RoadSectVO;
import egiskorea.com.job.fcmr.tpfc.service.SbwayStVO;
import egiskorea.com.job.fcmr.tpfc.service.SbwayTcVO;
import egiskorea.com.job.fcmr.tpfc.service.TunnlVO;

/**
 * @Description : 시설관리/교통시설 DAO
 * @author      : 김영주
 * @since       : 2023.04.05
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.05   김영주           최초 생성
 *  2023.04.14   백승석           전체조회 및 상세조회 생성
 */

@Repository("trnsportFaciDAO")
public class TrnsportFaciDAO extends ComAbstractDAO {
	
	// -------- 도로구간 --------
	
	/**
	 * 교통시설 도로구간 상세조회 
	 * @param roadSectVO
	 * @return
	 */
	public RoadSectVO selectRoadSect(RoadSectVO roadSectVO) {
		return selectOne("transportationFacility.selectRoadSection", roadSectVO);
	}
	
	/**
	 * 교통시설 도로구간 엑셀 다운로드
	 * @param roadSectVO
	 * @return
	 */
	public List<?> selectRoadSectExcelListDownload(RoadSectVO roadSectVO) {
		return selectList("transportationFacility.selectRoadSectionExcelList", roadSectVO);
	}
	
	// -------- 철도선로 --------
	
	/**
	 * 교통시설 철도선로 상세조회
	 * @param rlroadTcVO
	 * @return
	 */
	public RlroadTcVO selectRlroadTc(RlroadTcVO rlroadTcVO) {
		return selectOne("transportationFacility.selectRailroadTrack", rlroadTcVO);
	}
	
	// -------- 철도역사 --------
	/**
	 * 교통시설 철도역사 상세조회
	 * @param rlroadStVO
	 * @return
	 */
	public RlroadStVO selectRlroadSt(RlroadStVO rlroadStVO) {
		return selectOne("transportationFacility.selectRailroadStation", rlroadStVO);
	}
	
	// -------- 지하철선로 --------
	/**
	 * 교통시설 지하철선로 상세조회
	 * @param sbwayTcVO
	 * @return
	 */
	public SbwayTcVO selectSbwayTc(SbwayTcVO sbwayTcVO) {
		return selectOne("transportationFacility.selectSubwayTrack", sbwayTcVO);
	}
	
	// -------- 지하철역사 --------
	/**
	 * 교통시설 지하철역사 상세조회
	 * @param sbwayStVO
	 * @return
	 */
	public SbwayStVO selectSbwaySt(SbwayStVO sbwayStVO) {
		return selectOne("transportationFacility.selectSubwayStation", sbwayStVO);
	}
	
	// -------- 교량 --------
	/**
	 * 교통시설 교량 상세조회
	 * @param brdgeVO
	 * @return
	 */
	public BrdgeVO selectBrdge(BrdgeVO brdgeVO) {
		return selectOne("transportationFacility.selectBridge", brdgeVO);
	}
	// -------- 고가도로 --------
	/**
	 * 교통시설 고가도로 상세조회
	 * @param ovrpassVO
	 * @return
	 */
	public OvrpassVO selectOvrpass(OvrpassVO ovrpassVO) {
		return selectOne("transportationFacility.selectOverpass", ovrpassVO);
	}
	// -------- 터널 --------
	/**
	 * 교통시설 터널 상세조회
	 * @param tunnlVO
	 * @return
	 */
	public TunnlVO selectTunnl(TunnlVO tunnlVO) {
		return selectOne("transportationFacility.selectTunnel", tunnlVO);
	}

	
}
