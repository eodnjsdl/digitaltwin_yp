package egiskorea.com.geo.lgsr.service;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 지적을 관리하는 service 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.10   이상화           최초 생성
 *  </pre>
 */

public interface LandRegisterService {
	
	/**
	 * lon, lat을 이용해서 pnu 조회
	 * @param landRegisterVO
	 * @return egovMap
	 * @throws Exception
	 */
	public EgovMap getPnuByLonLat(LandRegisterVO landRegisterVO);
	
	/**
	 * pnu를 통해 지적정보 조회
	 * @param landRegisterVO
	 * @return landRegisterVO 
	 */
	public LandRegisterVO getLandRegisterByPnu(LandRegisterVO landRegisterVO);

}
