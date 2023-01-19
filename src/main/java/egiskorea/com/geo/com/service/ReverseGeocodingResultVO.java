package egiskorea.com.geo.com.service;

import java.io.Serializable;

/**
 * 
 * @Description 리버스 지오코딩 결과 vo 
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
public class ReverseGeocodingResultVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = 5142382895878295666L;

  /** 읍면동 명 */
  private String emdKorNm;

  /** 리 명 */
  private String liKorNm;

  /** 산 여부 */
  private String mntnYn;

  /** 주소 본번 */
  private String lnbrMnnm;

  /** 주소 부번 */
  private String lnbrSlno;

  /** 도로명 */
  private String rn;

  /** 건물 본번 */
  private String buldMnnm;

  /** 건물 부번 */
  private String buldSlno;

  /** 지적 WKT */
  private String lnbrWkt;

  /** 건물 WKT */
  private String buldWkt;

  /**
   * pnu
   */
  private  String pnu;

  public String getPnu() {
    return pnu;
  }

  public void setPnu(String pnu) {
    this.pnu = pnu;
  }

  public String getEmdKorNm() {
    return emdKorNm;
  }

  public void setEmdKorNm(String emdKorNm) {
    this.emdKorNm = emdKorNm;
  }

  public String getLiKorNm() {
    return liKorNm;
  }

  public void setLiKorNm(String liKorNm) {
    this.liKorNm = liKorNm;
  }

  public String getMntnYn() {
    return mntnYn;
  }

  public void setMntnYn(String mntnYn) {
    this.mntnYn = mntnYn;
  }

  public String getLnbrMnnm() {
    return lnbrMnnm;
  }

  public void setLnbrMnnm(String lnbrMnnm) {
    this.lnbrMnnm = lnbrMnnm;
  }

  public String getLnbrSlno() {
    return lnbrSlno;
  }

  public void setLnbrSlno(String lnbrSlno) {
    this.lnbrSlno = lnbrSlno;
  }

  public String getRn() {
    return rn;
  }

  public void setRn(String rn) {
    this.rn = rn;
  }

  public String getBuldMnnm() {
    return buldMnnm;
  }

  public void setBuldMnnm(String buldMnnm) {
    this.buldMnnm = buldMnnm;
  }

  public String getBuldSlno() {
    return buldSlno;
  }

  public void setBuldSlno(String buldSlno) {
    this.buldSlno = buldSlno;
  }

  public String getLnbrWkt() {
    return lnbrWkt;
  }

  public void setLnbrWkt(String lnbrWkt) {
    this.lnbrWkt = lnbrWkt;
  }

  public String getBuldWkt() {
    return buldWkt;
  }

  public void setBuldWkt(String buldWkt) {
    this.buldWkt = buldWkt;
  }
}
