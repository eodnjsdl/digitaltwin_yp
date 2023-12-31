package egiskorea.com.cmt.pti.service;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * @Description 사진정보를 관리하는 vo 클래스
 * @author 오윤성
 * @since 2021.01.02
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.01.02   오윤성           최초 생성
 *  2022.02.15	배윤성			geom등록 추가.
 *  </pre>
 */

public class PotoInfoVO implements Serializable{

	private static final long serialVersionUID = 4282701861264403474L;
	
	/** 사진ID */
	private String phtoId = "";
	
	/** 업무사용자ID */
	private String emplyrId = "";
	
	/** 제목 */
	private String sj = "";
	
	/** 공유여부 */
	private String pnrsAt = "";
	
	/** 지번주소 */
	private String lnmAdres = "";
	
	/** 첨부파일ID */
	private String atchmnflId = "";
	
	/** 최초등록일시 */
	private String frstRegistDt = "";
	
	/** 최종수정일시 */
	private String lastModfDt = "";
	
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

	/**wkt */
	private  String wkt="";
	
	/** 일괄 공유 사진ID 목록*/
	private List<String> updatePhotoIdArray = null;

	public List<String> getUpdatePhotoIdArray() {
		return updatePhotoIdArray;
	}

	public void setUpdatePhotoIdArray(List<String> updatePhotoIdArray) {
		this.updatePhotoIdArray = updatePhotoIdArray;
	}

	public String getWkt() {
		return wkt;
	}

	public void setWkt(String wkt) {
		this.wkt = wkt;
	}

	public String getPhtoId() {
		return phtoId;
	}

	public void setPhtoId(String phtoId) {
		this.phtoId = phtoId;
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

	public String getPnrsAt() {
		return pnrsAt;
	}

	public void setPnrsAt(String pnrsAt) {
		this.pnrsAt = pnrsAt;
	}

	public String getLnmAdres() {
		return lnmAdres;
	}

	public void setLnmAdres(String lnmAdres) {
		this.lnmAdres = lnmAdres;
	}

	public String getAtchmnflId() {
		return atchmnflId;
	}

	public void setAtchmnflId(String atchmnflId) {
		this.atchmnflId = atchmnflId;
	}

	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(String lastModfDt) {
		this.lastModfDt = lastModfDt;
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
	
	

	public String getFileSn() {
		return fileSn;
	}

	public void setFileSn(String fileSn) {
		this.fileSn = fileSn;
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
