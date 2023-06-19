package egiskorea.com.webApp.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.webApp.service.AddrResultVO;
import egiskorea.com.webApp.service.AddrSearchService;
import egiskorea.com.webApp.service.AddrSearchVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Description 주소 검색 ServiceImpl
 * @author 김영주
 * @since 2023.06.15
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                     수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.06.15   김영주                최초 생성
 */

@Service("addrSearchService")
public class AddrSearchServiceImpl extends EgovAbstractServiceImpl implements AddrSearchService {

	/** 주소 검색 DAO */
	@Resource(name = "addrSearchDAO")
	private AddrSearchDAO addrSearchDAO;
	
	/**
	 * 주소 목록
	 * @param addrSearchVO
	 * @return Exception
	 */
	@Override
	public List<AddrResultVO> selectAddressList(AddrSearchVO addrSearchVO) throws Exception {
		// TODO Auto-generated method stub
		return addrSearchDAO.selectAddressList(addrSearchVO);
	}

	/**
	 * 주소 목록 Count
	 * @param addrSearchVO
	 * @return Exception
	 */
	@Override
	public int selectAddressListCount(AddrSearchVO addrSearchVO) throws Exception {
		// TODO Auto-generated method stub
		return addrSearchDAO.selectAddressListCount(addrSearchVO);
	}
}
