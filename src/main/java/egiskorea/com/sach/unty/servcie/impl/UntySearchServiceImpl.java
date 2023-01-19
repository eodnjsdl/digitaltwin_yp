package egiskorea.com.sach.unty.servcie.impl;

import egiskorea.com.sach.adr.service.AddressSearchService;
import egiskorea.com.sach.adr.service.AddressSearchVO;
import egiskorea.com.sach.adr.service.impl.AddressSearchDAO;
import egiskorea.com.sach.unty.servcie.UntySearchService;
import egiskorea.com.sach.unty.servcie.UntySearchVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description 통합 검색 서비스 구현 클래스
 * @author 배윤성
 * @since 2022.02.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.09		배윤성	최초 생성
 *  </pre>
 */

@Service("untySearchService")
public class UntySearchServiceImpl implements UntySearchService {

  /** 통합 검색 dao */
  @Resource
  UntySearchDAO untySearchDAO;


  /**
   * 통합검색 목록
   */
  @Override
  public Map<String, Object> selectUntylList(UntySearchVO untySearchVO) {
    Map<String, Object> map = new HashMap<String, Object>();
    List<?> list = untySearchDAO.selectUntyList(untySearchVO);
    int cnt = untySearchDAO.selectUntyListCnt(untySearchVO);
    map.put("resultList", list);
    map.put("resultCnt", cnt);
    return map;
  }

  /**
   * 통합검색 엑셀
   * @param untySearchVO
   * @return
   */
  @Override
  public List<?> selectUntyExcelList(UntySearchVO untySearchVO) {

    List<?> list = untySearchDAO.selectUntyExcelList(untySearchVO);

    return list;
  }

}
