package egiskorea.com.geo.com.service.impl;

import egiskorea.com.geo.com.service.ReverseGeocodingVO;
import org.springframework.stereotype.Repository;

import egiskorea.com.cmm.service.impl.ComAbstractDAO;
import egiskorea.com.geo.com.service.ReverseGeocodingResultVO;

/**
 * 
 * @Description GIS dao 
 * @author 최원석
 * @since 2022.02.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.04		최원석	최초 생성
 *  </pre>
 */
@Repository("gisDAO")
public class GisDAO extends ComAbstractDAO {

  /**
   * 
   * @Description : 주소 검색 
   * @Author 최원석
   * @Date 2022.02.04
   * @param wkt WKT
   * @return 주소 검색 결과
   */
  public ReverseGeocodingResultVO selectAddress(String wkt) {
    return (ReverseGeocodingResultVO) selectOne("gis.selectAddress", wkt);
  }

  /**
   * 
   * @Description : 도로명 주소 검색 
   * @Author 최원석
   * @Date 2022.02.04
   * @param wkt WKT
   * @return 도로명 주소 검색 결과
   */
  public ReverseGeocodingResultVO selectRoadAddress(String wkt) {
    return (ReverseGeocodingResultVO) selectOne("gis.selectRoadAddress", wkt);
  }

  /**
   * @Description : 주소 검색 좌표계 5174
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.07.26
   * @param reverseGeocodingVO
   * @return 주소 검색 결과
   */
  public ReverseGeocodingResultVO selectAddress5174(ReverseGeocodingVO reverseGeocodingVO) {
    return (ReverseGeocodingResultVO) selectOne("gis.selectAddress5174", reverseGeocodingVO);
  }
}
