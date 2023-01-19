package egiskorea.com.geo.lgsr.service.impl;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.geo.emi.service.ExaminationInfo;
import egiskorea.com.geo.lgsr.service.LandRegisterVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * @Description 지적을 관리하는 dao 클래스
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

@Repository("landRegisterDAO")
public class LandRegisterDAO extends ComAbstractDAO {
	
	/**
	 * lon, lat을 이용해서 pnu 조회
	 * @param landRegisterVO
	 * @return egovMap
	 * @throws Exception
	 */
	public EgovMap getPnuByLonLat(LandRegisterVO landRegisterVO) {
		return (EgovMap) selectOne("landRegister.getPnuByLonLat", landRegisterVO);
	}
	
	/**
	 * pnu를 통해 지적정보 조회
	 * @param landRegisterVO
	 * @return landRegisterVO 
	 */
	public LandRegisterVO getLandRegisterByPnu(LandRegisterVO landRegisterVO) {
		return (LandRegisterVO) selectOne("landRegister.getLandRegisterByPnu", landRegisterVO);
	}
}
