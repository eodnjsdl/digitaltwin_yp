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

public class ConstructionScheduleVO implements Serializable {

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
	
	
	/**공사예정ID**/	
	private int cntrkPrrngId;
	
	/** 공사유형 */
	private String cntrkTy = "";
	
	/** 공유여부 */
	private String pnrsAt = "";
		 
	/** 공사명 */
	private String cntrkNm = "";
	
	/** 계획년도 */
	private String plnYear = "";
	
	/** 계획분기 */
	private String plnQu = "";
	
	/** 공사차수 */
	private String cntrkOdr = "";
	
	/** 담당자명 */
	private String chpsnNm = "";
	
	/** 담당자소속 */
	private String chpsnPsitn = "";
	
	/** 담당자연락처 */
	private String chpsnCttpc = "";
	
	/** 공사위치주소 */
	private String cntrkLcAdres = "";
	
	/** 공사개요 */
	private String cntrkOtl = "";
	
	/** 삭제여부 */
	private String deleteAt = "";
	
	/** 최초등록일시 */
	private String frstRegistDt = "";
	
	/** 최초등록자ID */
	private String frstRegisterId = "";
	
	/** 최종수정일시 */
	private String lastModfDt = "";
	
	/** 최종수정자ID */
	private String lastUpdusrId = "";
	
	/** 공간데이터 */
	private String geom = "";
	
	/** 공간데이터 */
	private String lon = "";
	
	/** 공간데이터 */
	private String lat = "";

	/** maxOdr */
	private String maxOdr = "";
	
	

	/** 계획년도 */
	private String plnYearSp = "";
	
	/** 계획분기 */
	private String plnQuSp = "";

	/** 공사위치주소 */
	private String cntrkLcAdresSp = "";

	/** 공간데이터 */
	private String geomSp = "";
	
	/** 반경 */
	private double radius;
	
	/** 페이지타입 */
	private String pageType = "type01";
	
	
	
	
	
	/**
	 * @return the pageType
	 */
	public String getPageType() {
		return pageType;
	}

	/**
	 * @param pageType the pageType to set
	 */
	public void setPageType(String pageType) {
		this.pageType = pageType;
	}

	/**
	 * @return the sortOrdr
	 */
	public long getSortOrdr() {
		return sortOrdr;
	}

	/**
	 * @param sortOrdr the sortOrdr to set
	 */
	public void setSortOrdr(long sortOrdr) {
		this.sortOrdr = sortOrdr;
	}

	/**
	 * @return the pageIndex
	 */
	public int getPageIndex() {
		return pageIndex;
	}

	/**
	 * @param pageIndex the pageIndex to set
	 */
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	/**
	 * @return the pageUnit
	 */
	public int getPageUnit() {
		return pageUnit;
	}

	/**
	 * @param pageUnit the pageUnit to set
	 */
	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	/**
	 * @return the pageSize
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * @param pageSize the pageSize to set
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * @return the firstIndex
	 */
	public int getFirstIndex() {
		return firstIndex;
	}

	/**
	 * @param firstIndex the firstIndex to set
	 */
	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	/**
	 * @return the lastIndex
	 */
	public int getLastIndex() {
		return lastIndex;
	}

	/**
	 * @param lastIndex the lastIndex to set
	 */
	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	/**
	 * @return the recordCountPerPage
	 */
	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	/**
	 * @param recordCountPerPage the recordCountPerPage to set
	 */
	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	/**
	 * @return the rowNo
	 */
	public int getRowNo() {
		return rowNo;
	}

	/**
	 * @param rowNo the rowNo to set
	 */
	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}

	/**
	 * @return the cntrkPrrngId
	 */
	public int getCntrkPrrngId() {
		return cntrkPrrngId;
	}

	/**
	 * @param cntrkPrrngId the cntrkPrrngId to set
	 */
	public void setCntrkPrrngId(int cntrkPrrngId) {
		this.cntrkPrrngId = cntrkPrrngId;
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
	 * @return the pnrsAt
	 */
	public String getPnrsAt() {
		return pnrsAt;
	}

	/**
	 * @param pnrsAt the pnrsAt to set
	 */
	public void setPnrsAt(String pnrsAt) {
		this.pnrsAt = pnrsAt;
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
	 * @return the cntrkOdr
	 */
	public String getCntrkOdr() {
		return cntrkOdr;
	}

	/**
	 * @param cntrkOdr the cntrkOdr to set
	 */
	public void setCntrkOdr(String cntrkOdr) {
		this.cntrkOdr = cntrkOdr;
	}

	/**
	 * @return the chpsnNm
	 */
	public String getChpsnNm() {
		return chpsnNm;
	}

	/**
	 * @param chpsnNm the chpsnNm to set
	 */
	public void setChpsnNm(String chpsnNm) {
		this.chpsnNm = chpsnNm;
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
	 * @return the chpsnCttpc
	 */
	public String getChpsnCttpc() {
		return chpsnCttpc;
	}

	/**
	 * @param chpsnCttpc the chpsnCttpc to set
	 */
	public void setChpsnCttpc(String chpsnCttpc) {
		this.chpsnCttpc = chpsnCttpc;
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
	 * @return the cntrkOtl
	 */
	public String getCntrkOtl() {
		return cntrkOtl;
	}

	/**
	 * @param cntrkOtl the cntrkOtl to set
	 */
	public void setCntrkOtl(String cntrkOtl) {
		this.cntrkOtl = cntrkOtl;
	}

	/**
	 * @return the deleteAt
	 */
	public String getDeleteAt() {
		return deleteAt;
	}

	/**
	 * @param deleteAt the deleteAt to set
	 */
	public void setDeleteAt(String deleteAt) {
		this.deleteAt = deleteAt;
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

	/**
	 * @return the frstRegisterId
	 */
	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	/**
	 * @param frstRegisterId the frstRegisterId to set
	 */
	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
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
	 * @return the lastUpdusrId
	 */
	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	/**
	 * @param lastUpdusrId the lastUpdusrId to set
	 */
	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	/**
	 * @return the geom
	 */
	public String getGeom() {
		return geom;
	}

	/**
	 * @param geom the geom to set
	 */
	public void setGeom(String geom) {
		this.geom = geom;
	}

	/**
	 * @return the lon
	 */
	public String getLon() {
		return lon;
	}

	/**
	 * @param lon the lon to set
	 */
	public void setLon(String lon) {
		this.lon = lon;
	}

	/**
	 * @return the lat
	 */
	public String getLat() {
		return lat;
	}

	/**
	 * @param lat the lat to set
	 */
	public void setLat(String lat) {
		this.lat = lat;
	}

	/**
	 * @return the maxOdr
	 */
	public String getMaxOdr() {
		return maxOdr;
	}

	/**
	 * @param maxOdr the maxOdr to set
	 */
	public void setMaxOdr(String maxOdr) {
		this.maxOdr = maxOdr;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * @return the radius
	 */
	public double getRadius() {
		return radius;
	}

	/**
	 * @param radius the radius to set
	 */
	public void setRadius(double radius) {
		this.radius = radius;
	}

	/**
	 * @return the plnYearSp
	 */
	public String getPlnYearSp() {
		return plnYearSp;
	}

	/**
	 * @param plnYearSp the plnYearSp to set
	 */
	public void setPlnYearSp(String plnYearSp) {
		this.plnYearSp = plnYearSp;
	}

	/**
	 * @return the plnQuSp
	 */
	public String getPlnQuSp() {
		return plnQuSp;
	}

	/**
	 * @param plnQuSp the plnQuSp to set
	 */
	public void setPlnQuSp(String plnQuSp) {
		this.plnQuSp = plnQuSp;
	}

	/**
	 * @return the cntrkLcAdresSp
	 */
	public String getCntrkLcAdresSp() {
		return cntrkLcAdresSp;
	}

	/**
	 * @param cntrkLcAdresSp the cntrkLcAdresSp to set
	 */
	public void setCntrkLcAdresSp(String cntrkLcAdresSp) {
		this.cntrkLcAdresSp = cntrkLcAdresSp;
	}

	/**
	 * @return the geomSp
	 */
	public String getGeomSp() {
		return geomSp;
	}

	/**
	 * @param geomSp the geomSp to set
	 */
	public void setGeomSp(String geomSp) {
		this.geomSp = geomSp;
	}

	
	
	
		
	
}
