package egiskorea.com.job.bco.service;

import java.io.Serializable;

/**
 * @Description 공사계획정보를 관리하는 vo 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   정재환           최초 생성
 *      </pre>
 */

public class ConstructionPlanVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9215911423601177369L;

	
	
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
	
	/** 시기 년도 */
	private String plnYear = "";
	
	/** 시기 분기 */
	private String plnQu = "";
	
	/** 유형 */
	private String cntrkTy = "";
	
	/** 공사예정활용여부 */
	private String cntrkPrrngPrcuseAt = "";
	
	/** 집행부서  */
	private String chpsnPsitn = "";
	
	/** 읍명동   */
	private String cntrkLcAdres = "";
	
	/** 공사명   */
	private String cntrkNm = "";
	
	/** 공사계획ID */
	private int cntrkPlnId;
	
	/** 검색된 시기 년도 */
	private String rePlnYear = "";
	
	/** 검색된  시기 분기 */
	private String rePlnQu = "";
	
	/** 검색된  유형 */
	private String reCntrkTy = "";
	
	/** 검색된  공사예정활용여부 */
	private String reCntrkPrrngPrcuseAt = "";
	
	/** 검색된  집행부서  */
	private String reChpsnPsitn = "";
	
	/** 검색된  읍명동   */
	private String reCntrkLcAdres = "";
	
	/** 검색된  공사명   */
	private String reCntrkNm = "";
	
	/** 검색된 페이지 */
	private int rePageIndex = 1;
	
	/**
	 * @return the cntrkPrrngPrcuseAt
	 */
	public String getCntrkPrrngPrcuseAt() {
		return cntrkPrrngPrcuseAt;
	}

	/**
	 * @param cntrkPrrngPrcuseAt the cntrkPrrngPrcuseAt to set
	 */
	public void setCntrkPrrngPrcuseAt(String cntrkPrrngPrcuseAt) {
		this.cntrkPrrngPrcuseAt = cntrkPrrngPrcuseAt;
	}

	/**
	 * @return the cntrkPlnId
	 */
	public int getCntrkPlnId() {
		return cntrkPlnId;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * @param cntrkPlnId the cntrkPlnId to set
	 */
	public void setCntrkPlnId(int cntrkPlnId) {
		this.cntrkPlnId = cntrkPlnId;
	}

	/**
	 * @return the cntrkTy
	 */
	public String getCntrkTy() {
		return cntrkTy;
	}

	/**
	 * @param cntrkTy the cntrkTy to set
	 */
	public void setCntrkTy(String cntrkTy) {
		this.cntrkTy = cntrkTy;
	}

	/**
	 * @return the chpsnPsitn
	 */
	public String getChpsnPsitn() {
		return chpsnPsitn;
	}

	/**
	 * @param chpsnPsitn the chpsnPsitn to set
	 */
	public void setChpsnPsitn(String chpsnPsitn) {
		this.chpsnPsitn = chpsnPsitn;
	}

	/**
	 * @return the cntrkLcAdres
	 */
	public String getCntrkLcAdres() {
		return cntrkLcAdres;
	}

	/**
	 * @param cntrkLcAdres the cntrkLcAdres to set
	 */
	public void setCntrkLcAdres(String cntrkLcAdres) {
		this.cntrkLcAdres = cntrkLcAdres;
	}

	/**
	 * @return the cntrkNm
	 */
	public String getCntrkNm() {
		return cntrkNm;
	}

	/**
	 * @param cntrkNm the cntrkNm to set
	 */
	public void setCntrkNm(String cntrkNm) {
		this.cntrkNm = cntrkNm;
	}

	/**
	 * @return the plnYear
	 */
	public String getPlnYear() {
		return plnYear;
	}

	/**
	 * @param plnYear the plnYear to set
	 */
	public void setPlnYear(String plnYear) {
		this.plnYear = plnYear;
	}

	/**
	 * @return the plnQu
	 */
	public String getPlnQu() {
		return plnQu;
	}

	/**
	 * @param plnQu the plnQu to set
	 */
	public void setPlnQu(String plnQu) {
		this.plnQu = plnQu;
	}

	/**
	 * @return the rePlnYear
	 */
	public String getRePlnYear() {
		return rePlnYear;
	}

	/**
	 * @param rePlnYear the rePlnYear to set
	 */
	public void setRePlnYear(String rePlnYear) {
		this.rePlnYear = rePlnYear;
	}

	/**
	 * @return the rePlnQu
	 */
	public String getRePlnQu() {
		return rePlnQu;
	}

	/**
	 * @param rePlnQu the rePlnQu to set
	 */
	public void setRePlnQu(String rePlnQu) {
		this.rePlnQu = rePlnQu;
	}

	/**
	 * @return the reCntrkTy
	 */
	public String getReCntrkTy() {
		return reCntrkTy;
	}

	/**
	 * @param reCntrkTy the reCntrkTy to set
	 */
	public void setReCntrkTy(String reCntrkTy) {
		this.reCntrkTy = reCntrkTy;
	}

	/**
	 * @return the reCntrkPrrngPrcuseAt
	 */
	public String getReCntrkPrrngPrcuseAt() {
		return reCntrkPrrngPrcuseAt;
	}

	/**
	 * @param reCntrkPrrngPrcuseAt the reCntrkPrrngPrcuseAt to set
	 */
	public void setReCntrkPrrngPrcuseAt(String reCntrkPrrngPrcuseAt) {
		this.reCntrkPrrngPrcuseAt = reCntrkPrrngPrcuseAt;
	}

	/**
	 * @return the reChpsnPsitn
	 */
	public String getReChpsnPsitn() {
		return reChpsnPsitn;
	}

	/**
	 * @param reChpsnPsitn the reChpsnPsitn to set
	 */
	public void setReChpsnPsitn(String reChpsnPsitn) {
		this.reChpsnPsitn = reChpsnPsitn;
	}

	/**
	 * @return the reCntrkLcAdres
	 */
	public String getReCntrkLcAdres() {
		return reCntrkLcAdres;
	}

	/**
	 * @param reCntrkLcAdres the reCntrkLcAdres to set
	 */
	public void setReCntrkLcAdres(String reCntrkLcAdres) {
		this.reCntrkLcAdres = reCntrkLcAdres;
	}

	/**
	 * @return the reCntrkNm
	 */
	public String getReCntrkNm() {
		return reCntrkNm;
	}

	/**
	 * @param reCntrkNm the reCntrkNm to set
	 */
	public void setReCntrkNm(String reCntrkNm) {
		this.reCntrkNm = reCntrkNm;
	}


	/**
	 * @return the rePageIndex
	 */
	public int getRePageIndex() {
		return rePageIndex;
	}

	/**
	 * @param rePageIndex the rePageIndex to set
	 */
	public void setRePageIndex(int rePageIndex) {
		this.rePageIndex = rePageIndex;
	}

	
	
	
	

	
	
	


	
	
	
	
}
