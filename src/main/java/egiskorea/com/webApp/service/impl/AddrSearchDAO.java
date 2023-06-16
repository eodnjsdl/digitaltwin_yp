package egiskorea.com.webApp.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.webApp.service.AddrResultVO;
import egiskorea.com.webApp.service.AddrSearchVO;

@Repository("addrSearchDAO")
public class AddrSearchDAO extends ComAbstractDAO {
	public List<AddrResultVO> selectAddressList(AddrSearchVO addrSearchVO) {
		return selectList("addrSearchDAO.selectAddressList", addrSearchVO);
	}

	public int selectAddressListCount(AddrSearchVO addrSearchVO) {
		return selectOne("addrSearchDAO.selectAddressListCount", addrSearchVO);
	}

	AddrResultVO selectAddress(AddrSearchVO addrSearchVO) {
		return (AddrResultVO) selectList("addrSearchDAO.selectAddress", addrSearchVO);
	}
}
