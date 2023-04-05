package egiskorea.com.job.fcmr.phfc.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.spor.service.SportsVO;

/**
 * @Description : 시설관리/체육시설 DAO
 * @author      : 김영주
 * @since       : 2023.03.31
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.03.31   김영주           최초 생성
 */

@Repository("phyEduFaciDAO")
public class PhyEduFaciDAO extends ComAbstractDAO {
	
	/**
	 * 체육시설 상세보기
	 * @param sportsVO
	 * @return Exception
	 */
	public SportsVO selectPhyEduFaciDetail(SportsVO sportsVO) throws Exception {
		return (SportsVO)selectOne("phyEduFaciDAO.selectPhyEduFaciDetail", sportsVO);
	}
	
	/**
	 * 체육시설 등록
	 */
	
	/**
	 * 체육시설 수정
	 */
	
	/**
	 * 체육시설 삭제
	 */
	
	/**
	 * 체육시설 > 운영정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	public List<?> selectPhyMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return selectList("phyEduFaciDAO.selectPhyMngList", sportsVO);
	}

	/**
	 * 체육시설 > 운영정보 리스트 조회 총 건수
	 * @param sportsVO
	 * @return
	 */
	public int selectPhyMngListCnt(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return (Integer)selectOne("phyEduFaciDAO.selectPhyMngListCnt", sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 년도 중복체크
	 * @param sportsVO
	 * @return
	 */
	public int checkPhyMngYear(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return (Integer)selectOne("phyEduFaciDAO.checkPhyMngYear", sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 등록
	 * @param sportsVO
	 * @return
	 */
	public int insertPhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return insert("phyEduFaciDAO.insertPhyMng", sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 수정
	 * @param sportsVO
	 * @return
	 */
	public int updatePhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return update("phyEduFaciDAO.updatePhyMng", sportsVO);
	}
	
	/**
	 * 체육시설 > 운영정보 삭제
	 * @param sportsVO
	 * @return
	 */
	public int deletePhyMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return delete("phyEduFaciDAO.deletePhyMng", sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	public List<?> selectPhyFaciMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return selectList("phyEduFaciDAO.selectPhyFaciMngList", sportsVO);
	}

	/**
	 * 체육시설 > 시설정보 리스트 조회 총 건수
	 * @param sportsVO
	 * @return
	 */
	public int selectPhyFaciMngListCnt(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return (Integer)selectOne("phyEduFaciDAO.selectPhyFaciMngListCnt", sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 등록
	 * @param sportsVO
	 * @return
	 */
	public int insertPhyFaciMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return insert("phyEduFaciDAO.insertPhyFaciMng", sportsVO);
	}
	
	/**
	 * 체육시설 > 시설정보 삭제
	 * @param sportsVO
	 * @return
	 */
	public int deletePhyFaciMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return delete("phyEduFaciDAO.deletePhyFaciMng", sportsVO);
	}
}
