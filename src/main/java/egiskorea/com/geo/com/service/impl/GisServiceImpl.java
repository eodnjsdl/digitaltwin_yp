package egiskorea.com.geo.com.service.impl;

import javax.annotation.Resource;

import egiskorea.com.geo.com.service.ReverseGeocodingVO;
import org.springframework.stereotype.Service;

import egiskorea.com.geo.com.service.GisService;
import egiskorea.com.geo.com.service.ReverseGeocodingResultVO;

/**
 * 
 * @Description GIS 서비스 구현 클래스 
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
@Service("gisService")
public class GisServiceImpl implements GisService {

  /** GIS DAO */
  @Resource GisDAO gisDAO;

  /**
   * 리버스 지오코딩
   */
  @Override
  public ReverseGeocodingResultVO reverseGeocoding(String wkt) {
    ReverseGeocodingResultVO result = new ReverseGeocodingResultVO();
    ReverseGeocodingResultVO addressResult = gisDAO.selectAddress(wkt);
    ReverseGeocodingResultVO roadResult = gisDAO.selectRoadAddress(wkt);

    if (addressResult != null) {
      result.setEmdKorNm(addressResult.getEmdKorNm());
      result.setLiKorNm(addressResult.getLiKorNm());
      result.setMntnYn(addressResult.getMntnYn());
      result.setLnbrMnnm(addressResult.getLnbrMnnm());
      result.setLnbrSlno(addressResult.getLnbrSlno());
      result.setLnbrWkt(addressResult.getLnbrWkt());
      result.setPnu(addressResult.getPnu());
    }

    if (roadResult != null) {
      result.setRn(roadResult.getRn());
      result.setBuldMnnm(roadResult.getBuldMnnm());
      result.setBuldSlno(roadResult.getBuldSlno());
      result.setBuldWkt(roadResult.getBuldWkt());
    }

    return result;
  }

  /**
   * @Description 리버스 지오코딩(5174)
   * @Author 플랫폼개발부문 DT솔루션 이준호
   * @Date 2022.07.26
   * @param reverseGeocodingVO
   * @return 주소/도로명 주소 결과
   */
  public ReverseGeocodingResultVO reverseGeocoding5174(ReverseGeocodingVO reverseGeocodingVO) {
    ReverseGeocodingResultVO result = new ReverseGeocodingResultVO();
    ReverseGeocodingResultVO addressResult = gisDAO.selectAddress5174(reverseGeocodingVO);
    ReverseGeocodingResultVO roadResult = gisDAO.selectRoadAddress(reverseGeocodingVO.getWkt5179());

    if (addressResult != null) {
      result.setEmdKorNm(addressResult.getEmdKorNm());
      result.setLiKorNm(addressResult.getLiKorNm());
      result.setMntnYn(addressResult.getMntnYn());
      result.setLnbrMnnm(addressResult.getLnbrMnnm());
      result.setLnbrSlno(addressResult.getLnbrSlno());
      result.setLnbrWkt(addressResult.getLnbrWkt());
      result.setPnu(addressResult.getPnu());
    }

    if (roadResult != null) {
      result.setRn(roadResult.getRn());
      result.setBuldMnnm(roadResult.getBuldMnnm());
      result.setBuldSlno(roadResult.getBuldSlno());
      result.setBuldWkt(roadResult.getBuldWkt());
    }

    return result;
  }
}