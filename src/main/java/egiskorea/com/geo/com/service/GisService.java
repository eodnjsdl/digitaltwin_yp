package egiskorea.com.geo.com.service;

/**
 * 
 * @Description GIS 서비스 인터페이스 
 * @author 최원석
 * @since 2022.02.03
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.03		최원석	최초 생성
 *  </pre>
 */
public interface GisService {

  /**
   * 
   * @Description : 리버스 지오코딩 
   * @Author 최원석
   * @Date 2022.02.03
   * @param wkt WKT
   * @return 주소/도로명 주소 결과
   */
  public ReverseGeocodingResultVO reverseGeocoding(String wkt);


  /**
   * @Description 리버스 지오코딩(5174)
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.07.26
   * @param reverseGeocodingVO
   * @return 주소/도로명 주소 결과
   */
  public ReverseGeocodingResultVO reverseGeocoding5174(ReverseGeocodingVO reverseGeocodingVO);
}
