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

public class ConstructionScheduleOrder implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9215911423601177369L;

	
	/**공사예정ID**/	
	private String cntrkPrrngId = "";
	
	/** 공사차수 */
	private String cntrkOdr = "";
	
	/** 공사유형 */
	private String cntrkSctnTy = "";
	
	/** 공사내역 */
	private String cntrkDtls = "";

	/** 공사위치주소 */
	private String cntrkLcAdres = "";
	
	/** 공사시작일자 */
	private String cntrkBeginDe = "";
	
	/** 공사종료일자 */
	private String cntrkEndDe = "";
	
	/** 공사위치 */
	private String geom = "";
	
	/** lon 좌표정보 */
	private String lon = "";
	
	/** lat 좌표정보 */
	private String lat = "";

	/**
	 * @return the cntrkPrrngId
	 */
	public String getCntrkPrrngId() {
		return cntrkPrrngId;
	}

	/**
	 * @param cntrkPrrngId the cntrkPrrngId to set
	 */
	public void setCntrkPrrngId(String cntrkPrrngId) {
		this.cntrkPrrngId = cntrkPrrngId;
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
	 * @return the cntrkSctnTy
	 */
	public String getCntrkSctnTy() {
		return cntrkSctnTy;
	}

	/**
	 * @param cntrkSctnTy the cntrkSctnTy to set
	 */
	public void setCntrkSctnTy(String cntrkSctnTy) {
		this.cntrkSctnTy = cntrkSctnTy;
	}

	/**
	 * @return the cntrkDtls
	 */
	public String getCntrkDtls() {
		return cntrkDtls;
	}

	/**
	 * @param cntrkDtls the cntrkDtls to set
	 */
	public void setCntrkDtls(String cntrkDtls) {
		this.cntrkDtls = cntrkDtls;
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
	 * @return the cntrkBeginDe
	 */
	public String getCntrkBeginDe() {
		return cntrkBeginDe;
	}

	/**
	 * @param cntrkBeginDe the cntrkBeginDe to set
	 */
	public void setCntrkBeginDe(String cntrkBeginDe) {
		this.cntrkBeginDe = cntrkBeginDe;
	}

	/**
	 * @return the cntrkEndDe
	 */
	public String getCntrkEndDe() {
		return cntrkEndDe;
	}

	/**
	 * @param cntrkEndDe the cntrkEndDe to set
	 */
	public void setCntrkEndDe(String cntrkEndDe) {
		this.cntrkEndDe = cntrkEndDe;
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
