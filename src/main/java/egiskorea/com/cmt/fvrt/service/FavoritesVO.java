package egiskorea.com.cmt.fvrt.service;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @Description 즐겨찾기를 관리하는 vo 클래스
 * @author 오윤성
 * @since 2021.01.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.04   오윤성           최초 생성
 *  </pre>
 */

public class FavoritesVO implements Serializable {

private static final long serialVersionUID = 4282701861264402474L;

	/** 즐겨찾기ID */
	private String bkmkId = "";
	
	/** 업무사용자ID */
	private String emplyrId = "";
	
	/** 즐겨찾기명 */
	private String bkmkNm = "";
	
	/** 삭제여부 */
	private String deleteAt = "";
	
	/** 이미지 파일명 */
	private String imageFileNm = "";
	
	/** 이미지 경로명 */
	private String imageFlpthNm = "";
	
	/** X좌표 */
	private Double xcord = 0.0;
	
	/** Y좌표 */
	private Double ycord = 0.0;
	
	/** 지도수준 */
	private int cchLevel = 0;
	
	/** 좌표계종류명 */
	private String cntmKndNm = "";
	
	/** 최초등록일시 */
	private LocalDateTime frstRegistDt = LocalDateTime.now();
	
	/** 최종수정일시 */
	private LocalDateTime lastModfDt = LocalDateTime.now();
	
	/** 이미지데이터문자열 */
	private String imgDataString = "";
	
	/** 검색조건 */
    private String searchCnd = "";
    
    /** 검색단어 */
    private String searchWrd = "";
    
    /** 일치여부  */
    private String searchMch = "";
    
    /** 정렬방법 */
    private String sortKind = "1";
    
    /** 정렬순서(DESC,ASC) */
    private long sortOrdr = 0L;

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

    /** 레코드 번호 */
    private int rowNo = 0;

    /** 최초 등록자명 */
    private String frstRegisterNm = "";

    /** 최종 수정자명 */
    private String lastUpdusrNm = "";

	/**
	 *  기본여부.
	 */
	private String bass ="";

	public String getBass() {
		return bass;
	}

	public void setBass(String bass) {
		this.bass = bass;
	}

	public String getBkmkId() {
		return bkmkId;
	}

	public void setBkmkId(String bkmkId) {
		this.bkmkId = bkmkId;
	}

	public String getEmplyrId() {
		return emplyrId;
	}

	public void setEmplyrId(String emplyrId) {
		this.emplyrId = emplyrId;
	}

	public String getBkmkNm() {
		return bkmkNm;
	}

	public void setBkmkNm(String bkmkNm) {
		this.bkmkNm = bkmkNm;
	}

	public String getDeleteAt() {
		return deleteAt;
	}

	public void setDeleteAt(String deleteAt) {
		this.deleteAt = deleteAt;
	}

	public String getImageFileNm() {
		return imageFileNm;
	}

	public void setImageFileNm(String imageFileNm) {
		this.imageFileNm = imageFileNm;
	}

	public String getImageFlpthNm() {
		return imageFlpthNm;
	}

	public void setImageFlpthNm(String imageFlpthNm) {
		this.imageFlpthNm = imageFlpthNm;
	}

	public Double getXcord() {
		return xcord;
	}

	public void setXcord(Double xcord) {
		this.xcord = xcord;
	}

	public Double getYcord() {
		return ycord;
	}

	public void setYcord(Double ycord) {
		this.ycord = ycord;
	}

	public int getCchLevel() {
		return cchLevel;
	}

	public void setCchLevel(int cchLevel) {
		this.cchLevel = cchLevel;
	}

	public String getCntmKndNm() {
		return cntmKndNm;
	}

	public void setCntmKndNm(String cntmKndNm) {
		this.cntmKndNm = cntmKndNm;
	}

	public LocalDateTime getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(LocalDateTime frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public LocalDateTime getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(LocalDateTime lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	public String getImgDataString() {
		return imgDataString;
	}

	public void setImgDataString(String imgDataString) {
		this.imgDataString = imgDataString;
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

	public void setSearchWrd(String searchWrd) {
		this.searchWrd = searchWrd;
	}

	public String getSearchMch() {
		return searchMch;
	}

	public void setSearchMch(String searchMch) {
		this.searchMch = searchMch;
	}

	public String getSortKind() {
		return sortKind;
	}

	public void setSortKind(String sortKind) {
		this.sortKind = sortKind;
	}

	public long getSortOrdr() {
		return sortOrdr;
	}

	public void setSortOrdr(long sortOrdr) {
		this.sortOrdr = sortOrdr;
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

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getRowNo() {
		return rowNo;
	}

	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}

	public String getFrstRegisterNm() {
		return frstRegisterNm;
	}

	public void setFrstRegisterNm(String frstRegisterNm) {
		this.frstRegisterNm = frstRegisterNm;
	}

	public String getLastUpdusrNm() {
		return lastUpdusrNm;
	}

	public void setLastUpdusrNm(String lastUpdusrNm) {
		this.lastUpdusrNm = lastUpdusrNm;
	}
    
	
}
