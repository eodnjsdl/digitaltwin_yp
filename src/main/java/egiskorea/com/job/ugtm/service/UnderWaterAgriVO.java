package egiskorea.com.job.ugtm.service;

import java.io.Serializable;

/**
 * @Description 지하수관리 > 농업용공공관정 VO 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   전영후            최초 생성
 *  </pre>
 */

public class UnderWaterAgriVO implements Serializable{

	private static final long serialVersionUID = 8166258432952972791L;
	
	/** 설치연도 */
	private String srchYear = "";
	
	/** 설치일자  */
	private String srchDate = "";
	
	/** 행정읍면동코드 */
	private String hjdCde = "";
	
	/** 도로구간번호 */
	private int secIdn = 0;
	
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
    
    /** GID */
    private int gid;
    
    private double lon;
    
    private double lat;
    
    /** 속성검색 - 읍면동이름 */
    private String emdKorNm = "";

    /** 속성검색 - 관리구분 */
	private String manageSeSearch = "";
	
	/** 속성검색 - 세부용도구분  */
	private String detailPrposSeSearch = "";
    
	/** 속성검색 - 시설물상태 */
	private String fcltsSttusSearch = "";
	
	/** 공간검색 */
    private String spitalSearch = "";
    
    /** 공간검색인지 일반검색인지 구분자 */
    private String searchType = "";
    
    /** 경계 buffer 값 */
    private double bufferCnt;

    /** 관리구분 */
	private String manageSe;
	
	/** 세부용도구분  */
	private String detailPrposSe;
    
	/** 시설물상태 */
	private String fcltsSttus;
    
	/** 용도구분 */
	private String prposSe;
	
	/** 펌프형태구분 */
	private String pumpStleSe;
	
	/** 관리기관명 */
	private String manageInsttNm;
	
	private String underWaterAgriAreaDrawing;
	private String underWaterAgriSelect;
	
	public String getSrchYear() {
		return srchYear;
	}

	public void setSrchYear(String srchYear) {
		this.srchYear = srchYear;
	}

	public String getSrchDate() {
		return srchDate;
	}

	public void setSrchDate(String srchDate) {
		this.srchDate = srchDate;
	}

	public String getHjdCde() {
		return hjdCde;
	}

	public void setHjdCde(String hjdCde) {
		this.hjdCde = hjdCde;
	}

	public int getSecIdn() {
		return secIdn;
	}

	public void setSecIdn(int secIdn) {
		this.secIdn = secIdn;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getEmdKorNm() {
		return emdKorNm;
	}

	public void setEmdKorNm(String emdKorNm) {
		this.emdKorNm = emdKorNm;
	}

	public String getManageSeSearch() {
		return manageSeSearch;
	}

	public void setManageSeSearch(String manageSeSearch) {
		this.manageSeSearch = manageSeSearch;
	}

	public String getDetailPrposSeSearch() {
		return detailPrposSeSearch;
	}

	public void setDetailPrposSeSearch(String detailPrposSeSearch) {
		this.detailPrposSeSearch = detailPrposSeSearch;
	}

	public String getFcltsSttusSearch() {
		return fcltsSttusSearch;
	}

	public void setFcltsSttusSearch(String fcltsSttusSearch) {
		this.fcltsSttusSearch = fcltsSttusSearch;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public String getSpitalSearch() {
		return spitalSearch;
	}

	public void setSpitalSearch(String spitalSearch) {
		this.spitalSearch = spitalSearch;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public double getBufferCnt() {
		return bufferCnt;
	}

	public void setBufferCnt(double bufferCnt) {
		this.bufferCnt = bufferCnt;
	}

	public String getManageSe() {
		return manageSe;
	}

	public void setManageSe(String manageSe) {
		this.manageSe = manageSe;
	}

	public String getDetailPrposSe() {
		return detailPrposSe;
	}

	public void setDetailPrposSe(String detailPrposSe) {
		this.detailPrposSe = detailPrposSe;
	}

	public String getFcltsSttus() {
		return fcltsSttus;
	}

	public void setFcltsSttus(String fcltsSttus) {
		this.fcltsSttus = fcltsSttus;
	}

	public String getManageInsttNm() {
		return manageInsttNm;
	}

	public void setManageInsttNm(String manageInsttNm) {
		this.manageInsttNm = manageInsttNm;
	}

	public String getPumpStleSe() {
		return pumpStleSe;
	}

	public void setPumpStleSe(String pumpStleSe) {
		this.pumpStleSe = pumpStleSe;
	}

	public String getPrposSe() {
		return prposSe;
	}

	public void setPrposSe(String prposSe) {
		this.prposSe = prposSe;
	}

	public String getUnderWaterAgriAreaDrawing() {
		return underWaterAgriAreaDrawing;
	}

	public void setUnderWaterAgriAreaDrawing(String underWaterAgriAreaDrawing) {
		this.underWaterAgriAreaDrawing = underWaterAgriAreaDrawing;
	}

	public String getUnderWaterAgriSelect() {
		return underWaterAgriSelect;
	}

	public void setUnderWaterAgriSelect(String underWaterAgriSelect) {
		this.underWaterAgriSelect = underWaterAgriSelect;
	}
	
}
