package egiskorea.com.webApp.service;

import java.util.List;

/**
 * @Description 주소 검색 Service
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

public interface AddrSearchService {
	
	/**
	 * 주소 목록
	 * @param addrSearchVO
	 * @return Exception
	 */
	public List<AddrResultVO> selectAddressList(AddrSearchVO addrSearchVO) throws Exception;
	
	/**
	 * 주소 목록 Count
	 * @param addrSearchVO
	 * @return Exception
	 */
	int selectAddressListCount(AddrSearchVO addrSearchVO) throws Exception;
}
