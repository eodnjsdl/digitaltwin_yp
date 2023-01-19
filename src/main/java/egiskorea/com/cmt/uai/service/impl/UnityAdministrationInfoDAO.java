/**
 * 
 */
package egiskorea.com.cmt.uai.service.impl;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.cmt.uai.service.UnityAdministrationInfoVO;

/**
 * @Description 통합행정정보를 관리하는 dao 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.03.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.07		이상화	최초 생성
 *  </pre>
 */

@Repository("unityAdministrationInfoDAO")
public class UnityAdministrationInfoDAO extends ComAbstractDAO {
	
	/**
	 * @Description pnu를 통해 주소정보 조회 
	 * @Author 플랫폼개발부문 DT솔루션 이상화
	 * @Date 2022.03.07
	 * @param vo
	 * @return
	 */
	public UnityAdministrationInfoVO getAddrByPnu(UnityAdministrationInfoVO unityAdministrationInfoVO) {
		return (UnityAdministrationInfoVO) selectOne("unityAdministrationInfo.getAddrByPnu", unityAdministrationInfoVO);
	}
}
