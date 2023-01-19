package egiskorea.com.cmt.grph.service;

import java.io.Serializable;


/**
 * @Description 그래픽 정보 검색 vo 클래스
 * @author 최원석
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27   최원석           최초 생성
 *  </pre>
 */
public class GraphicInfoSearchVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = -4546941786942837462L;
	
  /** 제목 */
  private String sj;
  
  /** 등록자ID */
  private String registerId;
  
  /** 검색 조건 */
  private String searchCnd;
  
  /** 검색 키워드 */
  private String searchWrd;
  
  /** 정렬 종류 */
  private String sortKind;
  
  /** 페이지 인덱스 */
  private int pageIndex = 1;
  
  /** 페이지 갯수 */
  private int pageUnit = 10;
  
  /** 페이지 크기 */
  private int pageSize = 5;

  public String getSj() {
    return sj;
  }

  public void setSj(String sj) {
    this.sj = sj;
  }

  public String getRegisterId() {
    return registerId;
  }

  public void setRegisterId(String registerId) {
    this.registerId = registerId;
  }

  public String getSearchCnd() {
    return searchCnd;
  }

  public void setSearchCnd(String searchCnd) {
    this.searchCnd = searchCnd;
  }

  public String getSearchWrd() {
    return searchWrd;
  }

  public String getSortKind() {
    return sortKind;
  }

  public void setSortKind(String sortKind) {
    this.sortKind = sortKind;
  }

  public void setSearchWrd(String searchWrd) {
    this.searchWrd = searchWrd;
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

/**
 * @Description  
 * @Author 플랫폼개발부문 DT솔루션 이상화
 * @Date 2022.04.28
 * @return
 */
public Object getSearchCl() {
	// TODO Auto-generated method stub
	return null;
}
}
