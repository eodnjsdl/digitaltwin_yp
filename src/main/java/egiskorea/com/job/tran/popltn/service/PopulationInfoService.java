package egiskorea.com.job.tran.popltn.service;

import java.util.List;

/**
 * @Description 교통분석 service 클래스
 * @author 플랫폼개발부문 DT플랫폼 
 * @since 2023.05.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.12   황의현           최초 생성
 *  2023.05.17   백승석           데이터 조회 처리 생성
 *  </pre>
 */

public interface PopulationInfoService {
	
	/**
	 * 해당하는 면 정보 조회 (해당하는 면의 리 정보 조회)
	 * @param poplulationVO
	 * @return
	 */
	public List<PopulationVO> selectMyeonPopulationInfoList(PopulationVO populationVO);
	
	/**
	 * 검색 기준 년월 조회
	 * @param populationVO
	 * @return
	 */
	public List<String> selectStandardYmList(PopulationVO populationVO);
	
	/**
	 * 양평군 전체 인구 정보 조회
	 * @param populationVO
	 * @return
	 */
	public List<PopulationVO> selectAllPopulationInfoList(PopulationVO populationVO);
	
	/**
	 * 레이어 중심점 좌표 조회
	 * @param populationVO
	 * @return
	 */
	public String selectPopulationCenter(PopulationVO populationVO);
	
	/****************** GRID ******************/
	
	/**
	 * 검색 기준 년월 조회 - grid화면
	 * @param populationVO
	 * @return
	 */
	public List<String> selectGridStandardYmList(PopulationVO populationVO);
	
	/**
	 * 해당하는 면 정보 조회 (해당하는 면의 리 정보 조회)
	 * @param poplulationVO
	 * @return
	 */
	public List<PopulationVO> selectGridMyeonPopulationInfoList(PopulationVO populationVO);
	
	/**
	 * 레이어 중심점 좌표 조회
	 * @param populationVO
	 * @return
	 */
	public String selectGridPopulationCenter(PopulationVO populationVO);
}
