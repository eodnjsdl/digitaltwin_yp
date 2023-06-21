package egiskorea.com.webApp.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.webApp.service.AddrResultVO;
import egiskorea.com.webApp.service.AddrSearchVO;

/**
 * @Description 주소 검색 DAO
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

@Repository("addrSearchDAO")
public class AddrSearchDAO extends ComAbstractDAO {
	
	/**
	 * 주소 목록
	 * @param addrSearchVO
	 * @return Exception
	 */
	public List<AddrResultVO> selectAddressList(AddrSearchVO addrSearchVO) {
		return selectList("addrSearchDAO.selectAddressList", addrSearchVO);
	}

	/**
	 * 주소 목록 Count
	 * @param addrSearchVO
	 * @return Exception
	 */
	public int selectAddressListCount(AddrSearchVO addrSearchVO) {
		return selectOne("addrSearchDAO.selectAddressListCount", addrSearchVO);
	}
}
