package egiskorea.com.sach.adr.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egiskorea.com.sach.adr.service.AddressSearchService;
import egiskorea.com.sach.adr.service.AddressSearchVO;

/**
 * @Description 주소 검색 서비스 구현 클래스
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

@Service("addressSearchService")
public class AddressSearchServiceImpl implements AddressSearchService {

  /** 주소 검색 dao */
  @Resource AddressSearchDAO addressSearchDAO;

  /**
   * 주소 목록
   */
  @Override
  public Map<String, Object> selectAddressList(AddressSearchVO addressSearchVO) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<?> list = addressSearchDAO.selectAddressList(addressSearchVO);
    int cnt = addressSearchDAO.selectAddressListCnt(addressSearchVO);
    map.put("resultList", list);
    map.put("resultCnt", cnt);
    return map;
  }

  /**
   * 도로명 주소 목록
   */
  @Override
  public Map<String, Object> selectRoadAddressList(AddressSearchVO addressSearchVO) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<?> list = addressSearchDAO.selectRoadAddressList(addressSearchVO);
    int cnt = addressSearchDAO.selectRoadAddressListCnt(addressSearchVO);
    map.put("resultList", list);
    map.put("resultCnt", cnt);
    return map;
  }
}
