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

public class ConstructionPlan implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9215911423601177369L;

	
	
	/** 공사계획ID */
	private int cntrkPlnId;
	
	/** 공사유형 */
	private String cntrkTy= "";
	
	/** 공사명 */
	private String cntrkNm= "";	
	
	/** 계획년도 */
	private String plnYear= "";	
	
	/** 계획분기 */
	private String plnQu= "";	
	
	/** 공사예정활용여부 */
	private String cntrkPrrngPrcuseAt= "";
	
	/** 담당자명 */
	private String chpsnNm= "";	
	
	/** 담당자소속 */
	private String chpsnPsitn= "";
	
	/** 담당자연락처 */
	private String chpsnCttpc= "";
	
	/** 공사위치주소 */
	private String cntrkLcAdres= "";
	
	/** 공사위치 */
	private String cntrkLc = "";
	
	/** 공사개요 */
	private String cntrkOtl = "";
	
	/** 삭제여부 */
	private String deleteAt = "";
	
	/** 최초등록일시 */
	private String frstRegistDt = "";
	
	/** 최초등록자ID*/
	private String frstRegisterId = "";
	
	/** 최종수정일시 */
	private String lastModeDt = "";

	/** 최종수정자ID */
	private String lastUpdusrId = "";
	
	/** 공간데이터 */
	private String geom = "";
	
	/** 공간데이터 */
	private String lon = "";
	
	/** 공간데이터 */
	private String lat = "";
	

	/**
	 * @return the cntrkPlnId
	 */
	public int getCntrkPlnId() {
		return cntrkPlnId;
	}

	/**
	 * @param cntrkPlnId the cntrkPlnId to set
	 */
	public void setCntrkPlnId(int cntrkPlnId) {
		this.cntrkPlnId = cntrkPlnId;
	}

	public String getCntrkTy() {
		return cntrkTy;
	}

	public void setCntrkTy(String cntrkTy) {
		this.cntrkTy = cntrkTy;
	}

	public String getCntrkNm() {
		return cntrkNm;
	}

	public void setCntrkNm(String cntrkNm) {
		this.cntrkNm = cntrkNm;
	}

	public String getPlnYear() {
		return plnYear;
	}

	public void setPlnYear(String plnYear) {
		this.plnYear = plnYear;
	}

	public String getPlnQu() {
		return plnQu;
	}

	public void setPlnQu(String plnQu) {
		this.plnQu = plnQu;
	}

	public String getCntrkPrrngPrcuseAt() {
		return cntrkPrrngPrcuseAt;
	}

	public void setCntrkPrrngPrcuseAt(String cntrkPrrngPrcuseAt) {
		this.cntrkPrrngPrcuseAt = cntrkPrrngPrcuseAt;
	}

	public String getChpsnNm() {
		return chpsnNm;
	}

	public void setChpsnNm(String chpsnNm) {
		this.chpsnNm = chpsnNm;
	}

	public String getChpsnPsitn() {
		return chpsnPsitn;
	}

	public void setChpsnPsitn(String chpsnPsitn) {
		this.chpsnPsitn = chpsnPsitn;
	}

	public String getChpsnCttpc() {
		return chpsnCttpc;
	}

	public void setChpsnCttpc(String chpsnCttpc) {
		this.chpsnCttpc = chpsnCttpc;
	}

	public String getCntrkLcAdres() {
		return cntrkLcAdres;
	}

	public void setCntrkLcAdres(String cntrkLcAdres) {
		this.cntrkLcAdres = cntrkLcAdres;
	}

	public String getCntrkLc() {
		return cntrkLc;
	}

	public void setCntrkLc(String cntrkLc) {
		this.cntrkLc = cntrkLc;
	}

	public String getCntrkOtl() {
		return cntrkOtl;
	}

	public void setCntrkOtl(String cntrkOtl) {
		this.cntrkOtl = cntrkOtl;
	}

	public String getDeleteAt() {
		return deleteAt;
	}

	public void setDeleteAt(String deleteAt) {
		this.deleteAt = deleteAt;
	}

	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getLastModeDt() {
		return lastModeDt;
	}

	public void setLastModeDt(String lastModeDt) {
		this.lastModeDt = lastModeDt;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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

		
	
}
