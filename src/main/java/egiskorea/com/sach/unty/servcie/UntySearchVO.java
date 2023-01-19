package egiskorea.com.sach.unty.servcie;

import java.io.Serializable;

/**
 * @Description 통합 검색 vo
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

public class UntySearchVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = -2183471751170848195L;

  /** lryNm */
  private String lyrNm;

  /** 명칭 */
  private String nm;

  /** 읍면동 */
  private String addr;

  /** wkt */
  private String wkt;

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

  /** 페이지 인덱스 */
  private int pageIndex = 1;

  /** 페이지 갯수 */
  private int pageUnit = 10;

  /** 페이지 크기 */
  private int pageSize = 5;

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

  public String getLyrNm() {
    return lyrNm;
  }

  public void setLyrNm(String lyrNm) {
    this.lyrNm = lyrNm;
  }

  public String getNm() {
    return nm;
  }

  public void setNm(String nm) {
    this.nm = nm;
  }

  public String getAddr() {
    return addr;
  }

  public void setAddr(String addr) {
    this.addr = addr;
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
