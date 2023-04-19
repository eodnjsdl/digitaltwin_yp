package egiskorea.com.job.fcmr.tpfc.service.impl;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import egiskorea.com.cmm.service.impl.ExcelView;
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
	
	// 메뉴 별 엑셀 다운로드 부분
	
	/**
	 * 도로구간 - 엑셀 다운로드
	 * @throws Exception 
	 */
	@Override
	public void selectRoadSectExcelListDownload(HttpServletRequest request, HttpServletResponse response,
			RoadSectVO roadSectVO) throws Exception {
		
		List<?> excelVO = trnsportFaciDAO.selectRoadSectExcelListDownload(roadSectVO);
		
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
}
