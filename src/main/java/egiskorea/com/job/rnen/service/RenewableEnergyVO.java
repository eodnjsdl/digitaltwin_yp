package egiskorea.com.job.rnen.service;

import java.io.Serializable;

/**
 * @Description 신재생에너지 vo 클래스
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

public class RenewableEnergyVO implements Serializable{

	private static final long serialVersionUID = 294641065911643832L;
	
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
    
    /** 읍면동이름 - 속성검색 */
    private String emdKorNm = "";
    
    /** 사업구분 - 속성검색 */
    private String bsnsSeSearch = "";
    
    /** 허가용량 범위 전 - 속성검색 */
    private String prmisnVolmASearch;
    
    /** 허가용량 범위 후 - 속성검색 */
    private String prmisnVolmBSearch;
    
    /** 발전소명 - 속성검색 */
    private String elcpwstnNmSearch = "";
    
    /** 공간검색 */
    private String spitalSearch = "";
    
    /** 공간검색인지 일반검색인지 구분자 */
    private String searchType = "";
    
    /** 경계 buffer 값 */
    private double bufferCnt;
    
    /** 사업구분 */
    private String bsnsSe;
    
    /** 조회했는지 여부 체크 */
    private String searchFlag;
    
    private String renewableEnergySelect;
    private String renewableEnergyAreaDrawing;
    
    private String bufferArea;
    
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

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public String getBsnsSeSearch() {
		return bsnsSeSearch;
	}

	public void setBsnsSeSearch(String bsnsSeSearch) {
		this.bsnsSeSearch = bsnsSeSearch;
	}

	public String getElcpwstnNmSearch() {
		return elcpwstnNmSearch;
	}

	public void setElcpwstnNmSearch(String elcpwstnNmSearch) {
		this.elcpwstnNmSearch = elcpwstnNmSearch;
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

	public String getPrmisnVolmASearch() {
		return prmisnVolmASearch;
	}

	public void setPrmisnVolmASearch(String prmisnVolmASearch) {
		this.prmisnVolmASearch = prmisnVolmASearch;
	}

	public String getPrmisnVolmBSearch() {
		return prmisnVolmBSearch;
	}

	public void setPrmisnVolmBSearch(String prmisnVolmBSearch) {
		this.prmisnVolmBSearch = prmisnVolmBSearch;
	}

	public String getBsnsSe() {
		return bsnsSe;
	}

	public void setBsnsSe(String bsnsSe) {
		this.bsnsSe = bsnsSe;
	}

	public String getSearchFlag() {
		return searchFlag;
	}

	public void setSearchFlag(String searchFlag) {
		this.searchFlag = searchFlag;
	}

	public String getRenewableEnergyAreaDrawing() {
		return renewableEnergyAreaDrawing;
	}

	public void setRenewableEnergyAreaDrawing(String renewableEnergyAreaDrawing) {
		this.renewableEnergyAreaDrawing = renewableEnergyAreaDrawing;
	}

	public String getRenewableEnergySelect() {
		return renewableEnergySelect;
	}

	public void setRenewableEnergySelect(String renewableEnergySelect) {
		this.renewableEnergySelect = renewableEnergySelect;
	}

	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}


}
