package egiskorea.com.sach.unty.servcie;

import egiskorea.com.sach.adr.service.AddressSearchVO;

import java.util.List;
import java.util.Map;

/**
 * @Description 통합 검색 서비스 인터페이스
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

public interface UntySearchService {

  /**
   *
   * @Description : 통합 목록
   * @Author 배윤성
   * @Date 2022.02.09
   * @param untySearchVO 통합 검색 vo
   * @return 통합 결과 vo
   */
  public Map<String, Object> selectUntylList(UntySearchVO untySearchVO);


  public List<?> selectUntyExcelList(UntySearchVO untySearchVO);

}
