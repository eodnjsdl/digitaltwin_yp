package egiskorea.com.sach.adr.service;

import java.io.Serializable;

/**
 * @Description 주소 검색 vo
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

public class AddressSearchVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = 5604632779125564808L;

  /** PNU */
  private String pnu;

  /** 도로 코드 */
  private String rnCd;

  /** 읍면동 코드 */
  private String emdCd;

  /** 본번 */
  private Integer mnnm;

  /** 부번 */
  private Integer slno;
  
  /** WKT */
  private String wkt;

  /** 페이지 인덱스 */
  private int pageIndex = 1;

  /** 페이지 갯수 */
  private int pageUnit = 10;

  /** 페이지 크기 */
  private int pageSize = 5;

  public String getPnu() {
    return pnu;
  }

  public void setPnu(String pnu) {
    this.pnu = pnu;
  }

  public String getRnCd() {
    return rnCd;
  }

  public void setRnCd(String rnCd) {
    this.rnCd = rnCd;
  }

  public String getEmdCd() {
    return emdCd;
  }

  public void setEmdCd(String emdCd) {
    this.emdCd = emdCd;
  }

  public Integer getMnnm() {
    return mnnm;
  }

  public void setMnnm(Integer mnnm) {
    this.mnnm = mnnm;
  }

  public Integer getSlno() {
    return slno;
  }

  public void setSlno(Integer slno) {
    this.slno = slno;
  }

  public String getWkt() {
    return wkt;
  }

  public void setWkt(String wkt) {
    this.wkt = wkt;
  }

  public int getPageIndex() {
    return pageIndex;
  }

  public void setPageIndex(int pageIndex) {
    this.pageIndex = pageIndex;
  }

  public int getPageUnit() {
    return pageUnit;
  }

  public void setPageUnit(int pageUnit) {
    this.pageUnit = pageUnit;
  }

  public int getPageSize() {
    return pageSize;
  }

  public void setPageSize(int pageSize) {
    this.pageSize = pageSize;
  }
}
