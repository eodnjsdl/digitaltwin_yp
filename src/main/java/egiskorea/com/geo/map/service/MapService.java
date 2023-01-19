package egiskorea.com.geo.map.service;

/**
 * @Description 사용자 지도 설정을 관리하는 service 클래스
 * @author SI사업부문 개발그룹 정수환
 * @since 2022.03.23
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.23   정수환           최초 생성
 *  </pre>
 */

public interface MapService {
	
	/**
	 * 사용자 지도 설정을 조회한다.
	 * @param mapVO
	 * @return mapVO
	 * @throws Exception
	 */
	MapVO selectUserSetup(MapVO mapVO) throws Exception;
	
	/**
	 * 사용자 지도 설정을 수정한다.
	 * @param mapVO
	 * @throws Exception
	 */
	void updateUserSetup(MapVO mapVO) throws Exception;
	
	/**
	 * 사용자 지도 설정을 추가한다.
	 * @param mapVO
	 * @throws Exception
	 */
	void insertUserSetup(MapVO mapVO) throws Exception;

}
