package egiskorea.com.job.fcmr.phfc.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import egiskorea.com.job.spor.service.SportsVO;

/**
 * @Description : 시설관리/체육시설 Service
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

public interface PhyEduFaciService {

	/**
	 * 체육시설 상세보기
	 * @param SportsVO
	 * @throws Exception
	 */
	public SportsVO selectPhyEduFaciDetail(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 등록
	 */
	public int insertPhyEduFaci(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 수정
	 */
	public int updatePhyEduFaci(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 삭제
	 */
	public int deletePhyEduFaci(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 엑셀 다운로드
	 * @throws Exception
	 */
	SXSSFWorkbook makePhyEduFaciExcelList(HashMap parameter);
	HashMap getPhyEduFaciExcel(SportsVO sportsVO);
	
	/**
	 * 체육시설 > 운영정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	public Map<String, Object> selectPhyMngList(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 운영정보 년도 중복체크
	 * @param sportsVO
	 * @return
	 */
	public int checkPhyMngYear(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 운영정보 등록
	 * @param sportsVO
	 * @return
	 */
	public int insertPhyMng(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 운영정보 수정
	 * @param sportsVO
	 * @return
	 */
	public int updatePhyMng(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 운영정보 삭제
	 * @param sportsVO
	 * @return
	 */
	public int deletePhyMng(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 시설정보 리스트 조회
	 * @param sportsVO
	 * @return
	 */
	public Map<String, Object> selectPhyFaciMngList(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 시설정보 등록
	 * @param sportsVO
	 * @return
	 */
	public int insertPhyFaciMng(SportsVO sportsVO) throws Exception;
	
	/**
	 * 체육시설 > 시설정보 삭제
	 * @param sportsVO
	 * @return
	 */
	public int deletePhyFaciMng(SportsVO sportsVO) throws Exception;
}
