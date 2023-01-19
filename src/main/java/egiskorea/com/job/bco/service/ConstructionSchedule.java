package egiskorea.com.job.bco.service;

import java.io.Serializable;

/**
 * @Description 공사예정 정보를 관리하는 vo 클래스
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

public class ConstructionSchedule implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9215911423601177369L;

	
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
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
				
		
		
		
		
		
		


	


	
	
	
	

	
	
	


	
	
	
	
}
