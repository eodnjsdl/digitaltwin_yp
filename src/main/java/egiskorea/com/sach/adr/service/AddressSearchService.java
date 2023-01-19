package egiskorea.com.sach.adr.service;

import java.util.Map;

/**
 * @Description 주소 검색 서비스 인터페이스
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

public interface AddressSearchService {

  /**
   * 
   * @Description : 주소 목록
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 주소 결과 vo
   */
  public Map<String, Object> selectAddressList(AddressSearchVO addressSearchVO);

  /**
   *  
   * @Description : 도로명 주소 목록
   * @Author 최원석
   * @Date 2022.02.01
   * @param addressSearchVO 주소 검색 vo
   * @return 주소 결과 vo
   */
  public Map<String, Object> selectRoadAddressList(AddressSearchVO addressSearchVO);
}
