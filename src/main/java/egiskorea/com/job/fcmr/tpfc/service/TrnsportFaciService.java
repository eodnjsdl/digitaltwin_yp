package egiskorea.com.job.fcmr.tpfc.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Description : 시설관리/교통시설 Service
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

public interface TrnsportFaciService {

	// ---------- 도로구간 ----------
	
	/**
	 * 도로구간 - 상세조회
	 * @param roadSectVO
	 * @return
	 */
	public RoadSectVO selectRoadSect(RoadSectVO roadSectVO);
	
//	/**
//	 * 도로구간 - 엑셀다운로드
//	 * @param request
//	 * @param response
//	 * @param roadSectVO
//	 */
//	public void selectRoadSectExcelListDownload(HttpServletRequest request, HttpServletResponse response,
//			RoadSectVO roadSectVO) throws Exception;
	
	// ---------- 철도선로 ----------
	
	/**
	 * 철도선로 - 상세조회
	 * @param rlroadTcVO
	 * @return
	 */
	public RlroadTcVO selectRlroadTc(RlroadTcVO rlroadTcVO);
	
	// ---------- 철도역사 ----------
	
	/**
	 * 철도역사 - 상세조회
	 * @param rlroadStVO
	 * @return
	 */
	public RlroadStVO selectRlroadSt(RlroadStVO rlroadStVO);
	
	// ---------- 지하철선로 ----------
	
	/**
	 * 지하철선로 - 상세조회
	 * @param sbwayTcVO
	 * @return
	 */
	public SbwayTcVO selectSbwayTc(SbwayTcVO sbwayTcVO);
	
	// ---------- 지하철역사 ----------
	/**
	 * 지하철역사 - 상세조회
	 * @param sbwayStVO
	 * @return
	 */
	public SbwayStVO selectSbwaySt(SbwayStVO sbwayStVO);
	
	// ---------- 교량 ----------
	/**
	 * 교량 - 상세조회
	 * @param brdgeVO
	 * @return
	 */
	public BrdgeVO selectBrdge(BrdgeVO brdgeVO);
	
	// ---------- 고가도로 ----------
	/**
	 * 고가도로 - 상세조회
	 * @param ovrpassVO
	 * @return
	 */
	public OvrpassVO selectOvrpass(OvrpassVO ovrpassVO);
	
	// ---------- 터널 ----------
	/**
	 * 터널 - 상세조회
	 * @param tunnlVO
	 * @return
	 */
	public TunnlVO selectTunnl(TunnlVO tunnlVO);
	
}
