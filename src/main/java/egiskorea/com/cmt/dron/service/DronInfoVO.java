package egiskorea.com.cmt.dron.service;

import java.io.Serializable;
import java.time.LocalDateTime;


/**
 * @Description 드론정보를 관리하는 vo 클래스
 * @author 배윤성
 * @since 2022.01.20
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.20   배윤성           최초 생성
 *  </pre>
 */

public class DronInfoVO implements Serializable {
    private static final long serialVersionUID = 4282701861264403474L;

    /** 드론ID */
    private String dronPicId="";
    /**업무사용자ID */
    private String emplyrId = "";
    /** 제목 */
    private String sj = "";
    /** 내용 */
    private String cn = "";
    /** 촬영일자 */
    private String potogrfDe = "";
    /**
     * 첨부파일 id
     */
    private String atchmnflId = "";
    /** 첨부파일 순번 */
    private String fileSn = "";

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

	/** 최초등록일시 */
	private String frstRegistDt = "";
	
	/** 최종수정일시 */
	private String lastModfDt = "";

    /** X좌표 */
    private Double xcord = 0.0;

    /** Y좌표 */
    private Double ycord = 0.0;

    /** 지도수준 */
    private int cchLevel = 0;

    /** 좌표계종류명 */
    private String cntmKndNm = "";


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

    public String getDronPicId() {
        return dronPicId;
    }

    public void setDronPicId(String dronPicId) {
        this.dronPicId = dronPicId;
    }

    public String getEmplyrId() {
        return emplyrId;
    }

    public void setEmplyrId(String emplyrId) {
        this.emplyrId = emplyrId;
    }

    public String getSj() {
        return sj;
    }

    public void setSj(String sj) {
        this.sj = sj;
    }

    public String getPotogrfDe() {
        return potogrfDe;
    }

    public void setPotogrfDe(String potogrfDe) {
        this.potogrfDe = potogrfDe;
    }

    public String getAtchmnflId() {
        return atchmnflId;
    }

    public void setAtchmnflId(String atchmnflId) {
        this.atchmnflId = atchmnflId;
    }

    public String getFileSn() {
        return fileSn;
    }

    public void setFileSn(String fileSn) {
        this.fileSn = fileSn;
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

    public String getCn() {
        return cn;
    }

    public void setCn(String cn) {
        this.cn = cn;
    }

	/**
	 * @return the lastModfDt
	 */
	public String getLastModfDt() {
		return lastModfDt;
	}

	/**
	 * @param lastModfDt the lastModfDt to set
	 */
	public void setLastModfDt(String lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	/**
	 * @return the frstRegistDt
	 */
	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	/**
	 * @param frstRegistDt the frstRegistDt to set
	 */
	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}
}
