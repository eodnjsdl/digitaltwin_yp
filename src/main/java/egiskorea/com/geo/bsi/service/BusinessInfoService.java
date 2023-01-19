package egiskorea.com.geo.bsi.service;

import java.util.List;

import egiskorea.com.geo.emi.service.ExaminationInfoVO;

/**
 * @Description 업소정보를 관리하는 service 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.09   이상화           최초 생성
 *  </pre>
 */

public interface BusinessInfoService {
	
	/**
	 * 업소정보 조회
	 * @param examinationInfoVO
	 * @return businessInfo(업소정보)
	 * @throws Exception
	 */
	public List<?> selectBusinessInfo(BusinessInfoVO businessInfoVO);
}
