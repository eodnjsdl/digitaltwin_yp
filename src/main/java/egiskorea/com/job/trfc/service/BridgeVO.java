package egiskorea.com.job.trfc.service;

import java.io.Serializable;

/**
 * @Description 교량을 관리하는 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2022.01.06
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.06   이병준           최초 생성
 *  </pre>
 */

public class BridgeVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6971144475410918731L;

	/** GID */
	private int gid;
	
	/** 읍면동 */
	private String emdKorNm;
	
	/** 교량명_한글 */
	private String korBriNm;
	
	/** geom */
	private String geom;
	
	/** 공간검색 */
    private String spatialSearch = "";
    
    /** 공간검색인지 일반검색인지 구분자 */
    private String searchType = "";
    
    // spaceSelect
    private String trfcSelect = "";
    
    // spaceAreaDrawing
    private String trfcAreaDrawing = "";
    
    /** 경계 buffer 값 */
    private double bufferCnt;
    
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

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getSpatialSearch() {
		return spatialSearch;
	}

	public void setSpatialSearch(String spatialSearch) {
		this.spatialSearch = spatialSearch;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getTrfcSelect() {
		return trfcSelect;
	}

	public void setTrfcSelect(String trfcSelect) {
		this.trfcSelect = trfcSelect;
	}

	public String getTrfcAreaDrawing() {
		return trfcAreaDrawing;
	}

	public void setTrfcAreaDrawing(String trfcAreaDrawing) {
		this.trfcAreaDrawing = trfcAreaDrawing;
	}

	public double getBufferCnt() {
		return bufferCnt;
	}

	public void setBufferCnt(double bufferCnt) {
		this.bufferCnt = bufferCnt;
	}

	public String getEmdKorNm() {
		return emdKorNm;
	}

	public void setEmdKorNm(String emdKorNm) {
		this.emdKorNm = emdKorNm;
	}

	public String getKorBriNm() {
		return korBriNm;
	}

	public void setKorBriNm(String korBriNm) {
		this.korBriNm = korBriNm;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
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
