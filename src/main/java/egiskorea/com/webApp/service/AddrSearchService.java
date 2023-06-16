package egiskorea.com.webApp.service;

import java.util.List;

public interface AddrSearchService {
	
	public List<AddrResultVO> selectAddressList(AddrSearchVO addrSearchVO);

	int selectAddressListCount(AddrSearchVO addrSearchVO);

	AddrResultVO selectAddress(AddrSearchVO addrSearchVO);
}
