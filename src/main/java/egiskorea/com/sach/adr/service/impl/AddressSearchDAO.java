package egiskorea.com.sach.adr.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.sach.adr.service.AddressSearchVO;

/**
 * @Description 주소 검색 dao 클래스
 * @author 최원석
 * @since 2022.02.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.01		최원석	최초 생성
 *  </pre>
 */

@Repository("addressSearchDAO")
public class AddressSearchDAO extends ComAbstractDAO {

  /**
   * 
   * @Description : 주소 목록
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 주소 결과 vo
   */
  public List<?> selectAddressList(AddressSearchVO addressSearchVO) {
    return selectList("addressSearch.selectAddressList", addressSearchVO);
  }

  /**
   * 
   * @Description : 주소 목록 건 수
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 건 수
   */
  public int selectAddressListCnt(AddressSearchVO addressSearchVO) {
    return (Integer) selectOne("addressSearch.selectAddressListCnt", addressSearchVO);
  }

  /**
   * 
   * @Description : 도로명 주소 목록
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 주소 결과 vo
   */
  public List<?> selectRoadAddressList(AddressSearchVO addressSearchVO) {
    return selectList("addressSearch.selectRoadAddressList", addressSearchVO);
  }

  /**
   * 
   * @Description : 도로명 주소 목록 건 수
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 건 수
   */
  public int selectRoadAddressListCnt(AddressSearchVO addressSearchVO) {
    return (Integer) selectOne("addressSearch.selectRoadAddressListCnt", addressSearchVO);
  }
}
