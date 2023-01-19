package egiskorea.com.sach.adr.service;

import java.io.Serializable;

/**
 * @Description 주소 결과 vo
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

public class AddressResultVO implements Serializable {

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
  
  /** WKT */
  private String wkt;

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

  public String getWkt() {
    return wkt;
  }

  public void setWkt(String wkt) {
    this.wkt = wkt;
  }
}
