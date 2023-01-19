package egiskorea.com.job.wlre.service;

import java.io.Serializable;

/**
 * 
* <pre>
* 간략 : 복지시설 관리 VO.
* 상세 : .
* egiskorea.com.fcty.wlre.service
*   |_ WelfareVO.java
* </pre>
* 
* @Company : DGIST
* @Author  : j
* @Date    : 2022. 1. 5 오전 9:39:14
* @Version : 1.0
 */

public class WelfareVO implements Serializable{

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
	
	/* 사회복지시설현황 테이블 */
	
	private int gid;             // GID
	private String fcltyNm;      // 시설명
	private String rnAdres;      // 도로명주소
	private String lnmAdres;     // 지번주소
	private String zip;          // 우편번호
	private double lat;          // 위도
	private double lon;          // 경도
	private String fcltySe;      // 시설구분
	private String cttpcTelno;   // 연락처전화번호
	private String dataStdde;    // 데이터기준일
	private String geom;         // GEOMETRY
	
	/* 추가 */
	private String searchFcltySe;
	private String searchRnAdres;
	private String searchFcltyNm;
	private String spitalSearch;
	private double wlreBuffer;
	private String bufferArea;

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getFcltyNm() {
		return fcltyNm;
	}

	public void setFcltyNm(String fcltyNm) {
		this.fcltyNm = fcltyNm;
	}

	public String getRnAdres() {
		return rnAdres;
	}

	public void setRnAdres(String rnAdres) {
		this.rnAdres = rnAdres;
	}

	public String getLnmAdres() {
		return lnmAdres;
	}

	public void setLnmAdres(String lnmAdres) {
		this.lnmAdres = lnmAdres;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
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

	public String getFcltySe() {
		return fcltySe;
	}

	public void setFcltySe(String fcltySe) {
		this.fcltySe = fcltySe;
	}

	public String getCttpcTelno() {
		return cttpcTelno;
	}

	public void setCttpcTelno(String cttpcTelno) {
		this.cttpcTelno = cttpcTelno;
	}

	public String getDataStdde() {
		return dataStdde;
	}

	public void setDataStdde(String dataStdde) {
		this.dataStdde = dataStdde;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public String getSearchFcltySe() {
		return searchFcltySe;
	}

	public void setSearchFcltySe(String searchFcltySe) {
		this.searchFcltySe = searchFcltySe;
	}

	public String getSearchRnAdres() {
		return searchRnAdres;
	}

	public void setSearchRnAdres(String searchRnAdres) {
		this.searchRnAdres = searchRnAdres;
	}

	public String getSearchFcltyNm() {
		return searchFcltyNm;
	}

	public void setSearchFcltyNm(String searchFcltyNm) {
		this.searchFcltyNm = searchFcltyNm;
	}

	public String getSpitalSearch() {
		return spitalSearch;
	}

	public void setSpitalSearch(String spitalSearch) {
		this.spitalSearch = spitalSearch;
	}

	public double getWlreBuffer() {
		return wlreBuffer;
	}

	public void setWlreBuffer(double wlreBuffer) {
		this.wlreBuffer = wlreBuffer;
	}

	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}	
}
