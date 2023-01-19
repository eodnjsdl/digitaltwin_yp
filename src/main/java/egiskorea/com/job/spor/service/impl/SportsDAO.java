package egiskorea.com.job.spor.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.job.spor.service.SportsVO;

/**
 * 
* <pre>
* 간략 : 체육시설 DAO.
* 상세 : .
* egiskorea.com.fcty.spor.service.impl
*   |_ SportsDAO.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2022. 1. 5 오전 9:46:32
* @Version : 1.0
 */

@Repository("sportsDAO")
public class SportsDAO extends ComAbstractDAO {

	/**
	 * 체육시설 목록
	 * @param SportsVO
	 * @return list
	 */
	
	public List<?> selectSportsList(SportsVO sportsVO) {
		return selectList("sportsDAO.selectSportsList", sportsVO);
	}
	
	
	/**
	 * 체육시설 목록 cnt
	 * @param SportsVO
	 * @return int
	 */
	
	public int selectSportsListCnt(SportsVO sportsVO) {
		return (Integer)selectOne("sportsDAO.selectSportsListCnt", sportsVO);
	}
	
	
	/**
	 * 체육시설 삭제
	 * @param SportsVO
	 * @return
	 */

	public int deleteSports(SportsVO sportsVO) {
		return delete("sportsDAO.deleteSports", sportsVO);
	}
	
	/**
	 * 체육시설 등록
	 * @param SportsVO
	 * @throws Exception
	 */
	public void insertSports(SportsVO sportsVO) throws Exception {
		insert("sportsDAO.insertSports", sportsVO);
	}
	
	/**
	 * 체육시설 상세보기
	 */
	
	public SportsVO selectSportsDetail(SportsVO sportsVO) throws Exception {
		return (SportsVO)selectOne("sportsDAO.selectSportsDetail", sportsVO);
	}
	
	/**
	 * 체육시설 수정
	 * @param SportsVO
	 * @return int
	 */
	
	public int updateSports(SportsVO sportsVO) throws Exception{
		return update("sportsDAO.updateSports", sportsVO);
	}
	
	/**
	 * 체육시설 다운로드
	 */
	
	public List getAllSportsExcel(SportsVO sportsVO) {
		return selectList("sportsDAO.getAllSportsExcel",sportsVO);
	}
	
	
	public List<?> poi_selectSportsList(SportsVO sportsVO) {
		return selectList("sportsDAO.poi_selectSportsList", sportsVO);
	}

	/**
	 * 체육시설 > 운영정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	public List<?> selectSportsMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return selectList("sportsDAO.selectSportsMngList", sportsVO);
	}

	/**
	 * 체육시설 > 운영정보 리스트 조회 총 건수
	 * @param sportsVO
	 * @return
	 */
	public int selectSportsMngListCnt(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return (Integer)selectOne("sportsDAO.selectSportsMngListCnt", sportsVO);
	}
	
	public int checkSportsOperYear(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return (Integer)selectOne("sportsDAO.checkSportsOperYear", sportsVO);
	}

	public int insertSportsMngInfo(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return insert("sportsDAO.insertSportsMngInfo", sportsVO);
	}


	public int updateSportsMngInfo(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return update("sportsDAO.updateSportsMngInfo", sportsVO);
	}


	public int deleteSportsMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return delete("sportsDAO.deleteSportsMng", sportsVO);
	}


	public List<?> selectSportsFacMngList(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return selectList("sportsDAO.selectSportsFacMngList", sportsVO);
	}


	public int selectSportsFacMngListCnt(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return (Integer)selectOne("sportsDAO.selectSportsFacMngListCnt", sportsVO);
	}


	public int insertSportsFacMngInfo(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return insert("sportsDAO.insertSportsFacMngInfo", sportsVO);
	}


	public int deleteFacSportsMng(SportsVO sportsVO) {
		// TODO Auto-generated method stub
		return delete("sportsDAO.deleteFacSportsMng", sportsVO);
	}
}
