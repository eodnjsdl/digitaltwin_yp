package egiskorea.com.job.fcmr.wlfc.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.job.fcmr.wlfc.service.WelFareFaciService;
import egiskorea.com.job.fcmr.wlfc.service.WelFareFaciVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description : 시설관리/복지시설
 * @author      : 김영주
 * @since       : 2023.04.11
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.11   김영주           최초 생성
 */

@Service("welFareFaciService")
public class WelFareFaciServiceImpl extends EgovAbstractServiceImpl implements WelFareFaciService {

	@Resource(name = "welFareFaciDAO")
	private WelFareFaciDAO welFareFaciDAO;
	
	/**
	 * 복지시설 상세보기
	 * @param welFareFaciVO
	 * @throws Exception
	 */
	@Override
	public WelFareFaciVO selectWelFareFaciDetail(WelFareFaciVO welFareFaciVO) throws Exception {
		// TODO Auto-generated method stub
		return welFareFaciDAO.selectWelFareFaciDetail(welFareFaciVO);
	}
	
	/**
	 * 복지시설 등록
	 * @param welFareFaciVO
	 * @return Exception
	 */
	@Override
	public int insertWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception {
		// TODO Auto-generated method stub
		return welFareFaciDAO.insertWelFareFaci(welFareFaciVO);
	}
	
	/**
	 * 복지시설 수정
	 * @param welFareFaciVO
	 * @return Exception
	 */
	@Override
	public int updateWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception {
		// TODO Auto-generated method stub
		return welFareFaciDAO.updateWelFareFaci(welFareFaciVO);
	}
	
	/**
	 * 복지시설 삭제
	 * @param welFareFaciVO
	 * @return Exception
	 */
	@Override
	public int deleteWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception {
		// TODO Auto-generated method stub
		return welFareFaciDAO.deleteWelFareFaci(welFareFaciVO);
	}
}
