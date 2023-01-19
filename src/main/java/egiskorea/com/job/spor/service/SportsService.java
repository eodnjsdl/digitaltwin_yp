package egiskorea.com.job.spor.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;

/**
 * @Description 체육시설 Service.
 * @author 플랫폼개발부문 DT플랫폼 이혜인
 * @since 2022.01.12
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.12   이혜인           최초 생성
 */

public interface SportsService {
	/**
	 * 체육시설 목록
	 * @param SportsVO
	 * @return Map
	 */
	public Map<String, Object> selectSportsList(SportsVO sportsVO);
	
	/**
	 * 체육시설 삭제
	 * @param SportsVO
	 * @throws Exception
	 */
	public void deleteSports(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 등록
	 * @param SportsVO
	 * @throws Exception
	 */
	public void insertSports(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 상세보기
	 * @param SportsVO
	 * @return Map
	 */
	public SportsVO selectSportsDetail(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 수정
	 * @param SportsVO
	 * @throws Exception
	 */
	int updateSports(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 다운로드
	 * @throws Exception
	 */
	SXSSFWorkbook makeSportsExcelList(HashMap parameter);
	HashMap getAllSportsExcel(SportsVO sportsVO);

	public Map<String, Object> poi_selectSportsList(SportsVO sportsVO);

	/**
	 * 체육시설 > 운영정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	public Map<String, Object> selectSportsMngList(SportsVO sportsVO);

	public int checkSportsOperYear(SportsVO sportsVO);

	/**
	 * 체육시설 > 운영정보 신규 등록
	 * @param sportsVO
	 * @return
	 */
	public int insertSportsMngInfo(SportsVO sportsVO);

	/**
	 * 
	 * @param sportsVO
	 * @return
	 */
	public int updateSportsMngInfo(SportsVO sportsVO);

	public int deleteSportsMng(SportsVO sportsVO);

	public Map<String, Object> selectSportsFacMngList(SportsVO sportsVO);

	public int insertSportsFacMngInfo(SportsVO sportsVO);

	public int deleteFacSportsMng(SportsVO sportsVO);

}
