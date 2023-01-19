package egiskorea.com.sach.unty.servcie.impl;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.sach.adr.service.AddressSearchVO;
import egiskorea.com.sach.unty.servcie.UntySearchVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description 통합 검색 dao 클래스
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

@Repository("untySearchDAO")
public class UntySearchDAO extends ComAbstractDAO {
  /**
   *
   * @Description : 통합 목록
   * @Author 배윤성
   * @Date 2022.02.09
   * @param untySearchVO 통합 검색 vo
   * @return 통합 결과 vo
   */
  public List<?> selectUntyList(UntySearchVO untySearchVO) {
    return selectList("untySearch.selectUntyList", untySearchVO);
  }

  /**
   * 
   * @Description : 통합 목록 건 수
   * @Author 배윤성
   * @Date 2022.02.09
   * @param untySearchVO 통합 검색 vo
   * @return 건 수
   */
  public int selectUntyListCnt(UntySearchVO untySearchVO) {
    return (Integer) selectOne("untySearch.selectUntyCnt", untySearchVO);
  }

  /**
   *
   * @Description : 통합 목록 엑셀
   * @Author 배윤성
   * @Date 2022.02.10
   * @param untySearchVO 통합 검색 vo
   * @return 통합 결과
   */
  public List<?> selectUntyExcelList(UntySearchVO untySearchVO){
    return selectList("untySearch.selectUntyExcelList", untySearchVO);
  }


}
