package egiskorea.com.cmt.grph.service;

import java.io.Serializable;
import java.util.Date;

/**
 * @Description 그래픽 정보 vo 클래스
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
public class GraphicInfoVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = -4042715846335110889L;
  
  /** 그래픽 ID */
  private String grphcId;
  
  /** 분류 ID */
  private String clId;
  
  /** 제목 */
  private String sj;
  
  /** Geojson */
  private String geojson;
  
  /** 공유여부 */
  private String pnrsAt;
  
  /** 삭제여부 */
  private String deleteAt;
  
  /** 등록자ID */
  private String registerId;
  
  /** 최초등록일시 */
  private Date frstRegistDt;

  /** 최종수정일시 */
  private Date lastModfDt;
  
  /** 정렬순서(DESC,ASC) */
  private long so1rtOrdr = 0L;

  /** 현재페이지 */
  private int pageIndex = 1;
  
  /** 페이지갯수 */
  private int pageUnit = 10;

  /** 페이지사이즈 */
  private int pageSize = 10;

  /** 첫페이지 인덱스 */
  private int firstIndex = 1;

  /** 마지막페이지 인덱스 */
  private int lastIndex = 1;

  /** 페이지당 레코드 개수 */
  private int recordCountPerPage = 10;
  
  /** 검색조건 */
  private String searchCnd = "";
  
  /** 검색단어 */
  private String searchWrd = "";
  
  /** 일치여부  */
  private String searchMch = "";
  
  /** 정렬방법 */
  private String sortKind = "newest";
  
  /** 분류 */
  private String searchCl = "";
  
  public String getGrphcId() {
    return grphcId;
  }

  public void setGrphcId(String grphcId) {
    this.grphcId = grphcId;
  }

  public String getClId() {
    return clId;
  }

  public void setClId(String clId) {
    this.clId = clId;
  }

  public String getSj() {
    return sj;
  }

  public void setSj(String sj) {
    this.sj = sj;
  }

  public String getGeojson() {
    return geojson;
  }

  public void setGeojson(String geojson) {
    this.geojson = geojson;
  }

  public String getPnrsAt() {
    return pnrsAt;
  }

  public void setPnrsAt(String pnrsAt) {
    this.pnrsAt = pnrsAt;
  }

  public String getDeleteAt() {
    return deleteAt;
  }

  public void setDeleteAt(String deleteAt) {
    this.deleteAt = deleteAt;
  }

  public String getRegisterId() {
    return registerId;
  }

  public void setRegisterId(String registerId) {
    this.registerId = registerId;
  }

  public Date getFrstRegistDt() {
    return frstRegistDt;
  }

  public void setFrstRegistDt(Date frstRegistDt) {
    this.frstRegistDt = frstRegistDt;
  }

  public Date getLastModfDt() {
    return lastModfDt;
  }

  public void setLastModfDt(Date lastModfDt) {
    this.lastModfDt = lastModfDt;
  }

/**
 * @return the searchCnd
 */
public String getSearchCnd() {
	return searchCnd;
}

/**
 * @param searchCnd the searchCnd to set
 */
public void setSearchCnd(String searchCnd) {
	this.searchCnd = searchCnd;
}

/**
 * @return the searchWrd
 */
public String getSearchWrd() {
	return searchWrd;
}

/**
 * @param searchWrd the searchWrd to set
 */
public void setSearchWrd(String searchWrd) {
	this.searchWrd = searchWrd;
}

/**
 * @return the searchMch
 */
public String getSearchMch() {
	return searchMch;
}

/**
 * @param searchMch the searchMch to set
 */
public void setSearchMch(String searchMch) {
	this.searchMch = searchMch;
}

/**
 * @return the sortKind
 */
public String getSortKind() {
	return sortKind;
}

/**
 * @param sortKind the sortKind to set
 */
public void setSortKind(String sortKind) {
	this.sortKind = sortKind;
}

/**
 * @return the so1rtOrdr
 */
public long getSo1rtOrdr() {
	return so1rtOrdr;
}

/**
 * @param so1rtOrdr the so1rtOrdr to set
 */
public void setSo1rtOrdr(long so1rtOrdr) {
	this.so1rtOrdr = so1rtOrdr;
}

/**
 * @return the pageIndex
 */
public int getPageIndex() {
	return pageIndex;
}

/**
 * @param pageIndex the pageIndex to set
 */
public void setPageIndex(int pageIndex) {
	this.pageIndex = pageIndex;
}

/**
 * @return the pageUnit
 */
public int getPageUnit() {
	return pageUnit;
}

/**
 * @param pageUnit the pageUnit to set
 */
public void setPageUnit(int pageUnit) {
	this.pageUnit = pageUnit;
}

/**
 * @return the pageSize
 */
public int getPageSize() {
	return pageSize;
}

/**
 * @param pageSize the pageSize to set
 */
public void setPageSize(int pageSize) {
	this.pageSize = pageSize;
}

/**
 * @return the firstIndex
 */
public int getFirstIndex() {
	return firstIndex;
}

/**
 * @param firstIndex the firstIndex to set
 */
public void setFirstIndex(int firstIndex) {
	this.firstIndex = firstIndex;
}

/**
 * @return the lastIndex
 */
public int getLastIndex() {
	return lastIndex;
}

/**
 * @param lastIndex the lastIndex to set
 */
public void setLastIndex(int lastIndex) {
	this.lastIndex = lastIndex;
}

/**
 * @return the recordCountPerPage
 */
public int getRecordCountPerPage() {
	return recordCountPerPage;
}

/**
 * @param recordCountPerPage the recordCountPerPage to set
 */
public void setRecordCountPerPage(int recordCountPerPage) {
	this.recordCountPerPage = recordCountPerPage;
}

/**
 * @return the searchCl
 */
public String getSearchCl() {
	return searchCl;
}

/**
 * @param searchCl the searchCl to set
 */
public void setSearchCl(String searchCl) {
	this.searchCl = searchCl;
}
}
