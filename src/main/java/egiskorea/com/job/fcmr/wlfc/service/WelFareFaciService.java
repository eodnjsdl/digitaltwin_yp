package egiskorea.com.job.fcmr.wlfc.service;

import egiskorea.com.job.spor.service.SportsVO;

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

public interface WelFareFaciService {
	
	/**
	 * 복지시설 상세보기
	 * @param WelfareVO
	 * @throws Exception
	 */
	public WelFareFaciVO selectWelFareFaciDetail(WelFareFaciVO welFareFaciVO) throws Exception;
	
	/**
	 * 복지시설 등록
	 */
	public int insertWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception;
	
	/**
	 * 복지시설 수정
	 */
	public int updateWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception;
	
	/**
	 * 복지시설 삭제
	 */
	public int deleteWelFareFaci(WelFareFaciVO welFareFaciVO) throws Exception;
}
