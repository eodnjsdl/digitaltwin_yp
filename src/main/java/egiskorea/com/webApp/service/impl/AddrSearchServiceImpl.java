package egiskorea.com.webApp.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.webApp.service.AddrResultVO;
import egiskorea.com.webApp.service.AddrSearchService;
import egiskorea.com.webApp.service.AddrSearchVO;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("addrSearchService")
public class AddrSearchServiceImpl extends EgovAbstractServiceImpl implements AddrSearchService {

	/** 주소 검색 dao */
	@Resource(name = "addrSearchDAO")
	private AddrSearchDAO addrSearchDAO;
	
	/**
	 * 주소 목록
	 */
	@Override
	public List<AddrResultVO> selectAddressList(AddrSearchVO addrSearchVO) {
		// TODO Auto-generated method stub
		return addrSearchDAO.selectAddressList(addrSearchVO);
	}

	@Override
	public int selectAddressListCount(AddrSearchVO addrSearchVO) {
		// TODO Auto-generated method stub
		return addrSearchDAO.selectAddressListCount(addrSearchVO);
	}

	@Override
	public AddrResultVO selectAddress(AddrSearchVO addrSearchVO) {
		// TODO Auto-generated method stub
		return addrSearchDAO.selectAddress(addrSearchVO);
	}
}
