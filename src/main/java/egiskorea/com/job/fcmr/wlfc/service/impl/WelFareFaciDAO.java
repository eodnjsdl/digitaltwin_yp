package egiskorea.com.job.fcmr.wlfc.service.impl;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.fcmr.wlfc.service.WelFareFaciVO;

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

@Repository("welFareFaciDAO")
public class WelFareFaciDAO extends ComAbstractDAO {

	/**
	 * 복지시설 상세보기
	 * @param welFareFaciVO
	 * @return Exception
	 */
	public WelFareFaciVO selectWelFareFaciDetail(WelFareFaciVO welFareFaciVO) throws Exception {
		return (WelFareFaciVO)selectOne("welFareFaciDAO.selectWelFareFaciDetail", welFareFaciVO);
	}
	
	/**
	 * 복지시설 등록
	 * @param welFareFaciVO
	 * @return Exception
	 */
	public int insertWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception {
		return insert("welFareFaciDAO.insertWelFareFaci", welFareFaciVO);
	}
	
	/**
	 * 복지시설 수정
	 * @param welFareFaciVO
	 * @return Exception
	 */
	public int updateWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception {
		return update("welFareFaciDAO.updateWelFareFaci", welFareFaciVO);
	}
	
	/**
	 * 복지시설 삭제
	 * @param welFareFaciVO
	 * @return Exception
	 */
	public int deleteWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception {
		return delete("welFareFaciDAO.deleteWelFareFaci", welFareFaciVO);
	}
}
