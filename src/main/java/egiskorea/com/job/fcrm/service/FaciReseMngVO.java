package egiskorea.com.job.fcrm.service;

import java.io.Serializable;

/**
 * @Description 시설예약관리 VO 
 * @author 플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27		이푸름	최초 생성
 *  2022.02.11		전영후	2차  작성
 *  </pre>
 */

public class FaciReseMngVO implements Serializable{
	
	private static final long serialVersionUID = 294641065911643832L;
	
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
    
    /** LON */
    private double lon;
    
    /** LAT */
    private double lat;
    
    /** 년월 검색 */
	private String srchYM;
	private String searchym;
	
	/** 예약순번 */
	private int rsrvSn;
	
	/** 시설조회용 */
	private String fcltyDc;
	
	/** 운영시작시간 */
	private String operStrtTime;
	
	/** 운영종료시간 */
	private String operEndTime;
	
	/** 예약여부 */
	private String rsrvAt;
	
	/** 호수 */
	private int hoCnt;
	
	/** 보조시설순번 */
	private int asstnFcltySn;
	
	/** 예약일자 */
	private String rsrvDe;
	
	/** 예약시작시각 */
	private String rsrvStrtTm;
	
	/** 예약종료시각 */
	private String rsrvEndTm;
	
	/** 중복체크용 예약시작시각 */
	private String rsrvStrtTm2;
	
	/** 중복체크용 예약종료시각 */
	private String rsrvEndTm2;
	
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

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
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

	public String getSrchYM() {
		return srchYM;
	}

	public void setSrchYM(String srchYM) {
		this.srchYM = srchYM;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public int getRsrvSn() {
		return rsrvSn;
	}

	public void setRsrvSn(int rsrvSn) {
		this.rsrvSn = rsrvSn;
	}

	public String getFcltyDc() {
		return fcltyDc;
	}

	public void setFcltyDc(String fcltyDc) {
		this.fcltyDc = fcltyDc;
	}

	public int getHoCnt() {
		return hoCnt;
	}

	public void setHoCnt(int hoCnt) {
		this.hoCnt = hoCnt;
	}

	public String getRsrvAt() {
		return rsrvAt;
	}

	public void setRsrvAt(String rsrvAt) {
		this.rsrvAt = rsrvAt;
	}

	public String getOperEndTime() {
		return operEndTime;
	}

	public void setOperEndTime(String operEndTime) {
		this.operEndTime = operEndTime;
	}

	public String getOperStrtTime() {
		return operStrtTime;
	}

	public void setOperStrtTime(String operStrtTime) {
		this.operStrtTime = operStrtTime;
	}

	public int getAsstnFcltySn() {
		return asstnFcltySn;
	}

	public void setAsstnFcltySn(int asstnFcltySn) {
		this.asstnFcltySn = asstnFcltySn;
	}

	public String getRsrvDe() {
		return rsrvDe;
	}

	public void setRsrvDe(String rsrvDe) {
		this.rsrvDe = rsrvDe;
	}

	public String getRsrvStrtTm() {
		return rsrvStrtTm;
	}

	public void setRsrvStrtTm(String rsrvStrtTm) {
		this.rsrvStrtTm = rsrvStrtTm;
	}

	public String getRsrvEndTm() {
		return rsrvEndTm;
	}

	public void setRsrvEndTm(String rsrvEndTm) {
		this.rsrvEndTm = rsrvEndTm;
	}

	public String getRsrvStrtTm2() {
		return rsrvStrtTm2;
	}

	public void setRsrvStrtTm2(String rsrvStrtTm2) {
		this.rsrvStrtTm2 = rsrvStrtTm2;
	}

	public String getRsrvEndTm2() {
		return rsrvEndTm2;
	}

	public void setRsrvEndTm2(String rsrvEndTm2) {
		this.rsrvEndTm2 = rsrvEndTm2;
	}

	public String getSearchym() {
		return searchym;
	}

	public void setSearchym(String searchym) {
		this.searchym = searchym;
	}
}