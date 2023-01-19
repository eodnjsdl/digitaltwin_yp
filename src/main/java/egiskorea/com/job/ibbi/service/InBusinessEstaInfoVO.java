package egiskorea.com.job.ibbi.service;

import java.io.Serializable;

/**
 * @Description 관내업소정보 vo 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2022.02.17
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.10     이푸름		최초 생성	
 *  2022.02.17   전영후            2차 수정
 *  </pre>
 */

public class InBusinessEstaInfoVO implements Serializable{

	private static final long serialVersionUID = -7224010419734353876L;
	
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
    
    /** lon */
	private double lon;
	
	/** lat */
	private double lat;
	
	/** ST_X(ST_Transform(GEOM,4326)) AS LON_LON */
	private double lonLon;
	
	/** ST_Y(ST_Transform(GEOM,4326)) AS LAT_LAT */
	private double latLat;
	
	/** GEOM */
	private String geom;
	
	/** 읍면동이름 - 속성검색 */
    private String emdKorNm = "";
    
    /** 개방서비스명 - 속성검색 */
    private String opnnSvcNmSearch = "";
    
    /** 사업장명 - 속성검색 */
    private String bplcNmSearch = "";
    
    /** 공간검색 */
    private String spitalSearch = "";
    
    /** 공간검색인지 일반검색인지 구분자 */
    private String searchType = "";
    
    /** 경계 buffer 값 */
    private double bufferCnt;

    /** 개방서비스명 */
    private String opnnSvcNm;
    
    /** 사업장명 */
    private String bplcNm;
    
    /** 번호 */
	private int no;
	
	private String inBusinessEstaInfoAreaDrawing;
	private String inBusinessEstaInfoSelect;
	
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

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public String getEmdKorNm() {
		return emdKorNm;
	}

	public void setEmdKorNm(String emdKorNm) {
		this.emdKorNm = emdKorNm;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getOpnnSvcNmSearch() {
		return opnnSvcNmSearch;
	}

	public void setOpnnSvcNmSearch(String opnnSvcNmSearch) {
		this.opnnSvcNmSearch = opnnSvcNmSearch;
	}

	public String getBplcNmSearch() {
		return bplcNmSearch;
	}

	public void setBplcNmSearch(String bplcNmSearch) {
		this.bplcNmSearch = bplcNmSearch;
	}

	public String getBplcNm() {
		return bplcNm;
	}

	public void setBplcNm(String bplcNm) {
		this.bplcNm = bplcNm;
	}

	public String getOpnnSvcNm() {
		return opnnSvcNm;
	}

	public void setOpnnSvcNm(String opnnSvcNm) {
		this.opnnSvcNm = opnnSvcNm;
	}

	public double getLonLon() {
		return lonLon;
	}

	public void setLonLon(double lonLon) {
		this.lonLon = lonLon;
	}

	public double getLatLat() {
		return latLat;
	}

	public void setLatLat(double latLat) {
		this.latLat = latLat;
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getInBusinessEstaInfoSelect() {
		return inBusinessEstaInfoSelect;
	}

	public void setInBusinessEstaInfoSelect(String inBusinessEstaInfoSelect) {
		this.inBusinessEstaInfoSelect = inBusinessEstaInfoSelect;
	}

	public String getInBusinessEstaInfoAreaDrawing() {
		return inBusinessEstaInfoAreaDrawing;
	}

	public void setInBusinessEstaInfoAreaDrawing(String inBusinessEstaInfoAreaDrawing) {
		this.inBusinessEstaInfoAreaDrawing = inBusinessEstaInfoAreaDrawing;
	}
	
}	
