package egiskorea.com.job.fcmr.tpfc.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.fcmr.tpfc.service.BrdgeVO;
import egiskorea.com.job.fcmr.tpfc.service.OvrpassVO;
import egiskorea.com.job.fcmr.tpfc.service.RlroadStVO;
import egiskorea.com.job.fcmr.tpfc.service.RlroadTcVO;
import egiskorea.com.job.fcmr.tpfc.service.RoadSectVO;
import egiskorea.com.job.fcmr.tpfc.service.SbwayStVO;
import egiskorea.com.job.fcmr.tpfc.service.SbwayTcVO;
import egiskorea.com.job.fcmr.tpfc.service.TrnsportFaciService;
import egiskorea.com.job.fcmr.tpfc.service.TunnlVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description : 시설관리/교통시설 Impl
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

@Service("trnsportFaciService")
public class TrnsportFaciServiceImpl extends EgovAbstractServiceImpl implements TrnsportFaciService {

	@Resource(name = "trnsportFaciDAO")
	private TrnsportFaciDAO trnsportFaciDAO;

	@Override
	public RoadSectVO selectRoadSect(RoadSectVO roadSectVO) {
		RoadSectVO result = trnsportFaciDAO.selectRoadSect(roadSectVO);
		return result;
	}

	@Override
	public RlroadTcVO selectRlroadTc(RlroadTcVO rlroadTcVO) {
		RlroadTcVO result = trnsportFaciDAO.selectRlroadTc(rlroadTcVO);
		return result;
	}

	@Override
	public RlroadStVO selectRlroadSt(RlroadStVO rlroadStVO) {
		RlroadStVO result = trnsportFaciDAO.selectRlroadSt(rlroadStVO);
		return result;
	}

	@Override
	public SbwayTcVO selectSbwayTc(SbwayTcVO sbwayTcVO) {
		SbwayTcVO result = trnsportFaciDAO.selectSbwayTc(sbwayTcVO);
		return result;
	}

	@Override
	public SbwayStVO selectSbwaySt(SbwayStVO sbwayStVO) {
		SbwayStVO result = trnsportFaciDAO.selectSbwaySt(sbwayStVO);
		return result;
	}

	@Override
	public BrdgeVO selectBrdge(BrdgeVO brdgeVO) {
		BrdgeVO result = trnsportFaciDAO.selectBrdge(brdgeVO);
		return result;
	}

	@Override
	public OvrpassVO selectOvrpass(OvrpassVO ovrpassVO) {
		OvrpassVO result = trnsportFaciDAO.selectOvrpass(ovrpassVO);
		return result;
	}

	@Override
	public TunnlVO selectTunnl(TunnlVO tunnlVO) {
		TunnlVO result = trnsportFaciDAO.selectTunnl(tunnlVO);
		return result;
	}
}
