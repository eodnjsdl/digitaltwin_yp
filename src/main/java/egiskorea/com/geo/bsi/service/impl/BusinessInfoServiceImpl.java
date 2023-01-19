package egiskorea.com.geo.bsi.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.geo.bsi.service.BusinessInfoService;
import egiskorea.com.geo.bsi.service.BusinessInfoVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 업소정보를 관리하는 serviceImpl 클래스
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

@Service("businessInfoService")
public class BusinessInfoServiceImpl extends EgovAbstractServiceImpl implements BusinessInfoService{
	
	@Resource(name="businessInfoDAO")
	private BusinessInfoDAO businessInfoDAO;
	
	/**
	 * 업소정보 조회
	 * @param businessInfoVO
	 * @return businessInfo(업소정보)
	 * @throws Exception
	 */
	public List<?> selectBusinessInfo(BusinessInfoVO businessInfoVO) {
		return businessInfoDAO.selectBusinessInfo(businessInfoVO);
	}
}
