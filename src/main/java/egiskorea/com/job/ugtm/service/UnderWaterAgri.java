package egiskorea.com.job.ugtm.service;

import java.io.Serializable;

/**
 * @Description 지하수관리 > 농업용공공관정 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.31   전영후            최초 생성
 *  </pre>
 */

public class UnderWaterAgri implements Serializable{

	private static final long serialVersionUID = -3832110709483349733L;
	
	/** GID */
	private int gid;
	
	/** GEOM */
	private String geom;
	
	/** 관리구분 */
	private String manageSe = "";
	
	/** 주소 */
	private String adres = "";
	
	/** 시설명 */
	private String fcltyNm = "";
	
	/** 개발년도 */
	private String devlopYear = "";
	
	/** 관리기관명 */
	private String manageInsttNm = "";
	
	/** 용도구분 */
	private String prposSe = "";
	
	/** 세부용도구분 */
	private String detailPrposSe = "";
	
	/** 구경 */
	private double calbr = 0;
	
	/** 심도 */
	private double dph = 0;
	
	/** 양수능력 */
	private double wpAblty = 0;
	
	/** 토출관구경 */
	private double dscrgppCalbr = 0;
	
	/** 펌프형태구분 */
	private String pumpStleSe = "";
	
	/** 펌프마력 */
	private double pumpHrspw = 0;
	
	/** 시설물상태 */
	private String fcltsSttus = "";
	
	/** 시설물점검일자 */
	private String fcltsChckDe = "";
	
	private double lon;
    
    private double lat;
    
    /** 버퍼 영역 */
	private String bufferArea;
	
	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	} 
	
	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getManageSe() {
		return manageSe;
	}

	public void setManageSe(String manageSe) {
		this.manageSe = manageSe;
	}

	public String getAdres() {
		return adres;
	}

	public void setAdres(String adres) {
		this.adres = adres;
	}

	public String getFcltyNm() {
		return fcltyNm;
	}

	public void setFcltyNm(String fcltyNm) {
		this.fcltyNm = fcltyNm;
	}

	public String getDevlopYear() {
		return devlopYear;
	}

	public void setDevlopYear(String devlopYear) {
		this.devlopYear = devlopYear;
	}

	public String getManageInsttNm() {
		return manageInsttNm;
	}

	public void setManageInsttNm(String manageInsttNm) {
		this.manageInsttNm = manageInsttNm;
	}

	public String getPrposSe() {
		return prposSe;
	}

	public void setPrposSe(String prposSe) {
		this.prposSe = prposSe;
	}

	public String getDetailPrposSe() {
		return detailPrposSe;
	}

	public void setDetailPrposSe(String detailPrposSe) {
		this.detailPrposSe = detailPrposSe;
	}


	public void setDscrgppCalbr(int dscrgppCalbr) {
		this.dscrgppCalbr = dscrgppCalbr;
	}

	public String getPumpStleSe() {
		return pumpStleSe;
	}

	public void setPumpStleSe(String pumpStleSe) {
		this.pumpStleSe = pumpStleSe;
	}

	public String getFcltsSttus() {
		return fcltsSttus;
	}

	public void setFcltsSttus(String fcltsSttus) {
		this.fcltsSttus = fcltsSttus;
	}

	public String getFcltsChckDe() {
		return fcltsChckDe;
	}

	public void setFcltsChckDe(String fcltsChckDe) {
		this.fcltsChckDe = fcltsChckDe;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
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

	public double getCalbr() {
		return calbr;
	}

	public void setCalbr(double calbr) {
		this.calbr = calbr;
	}

	public double getDph() {
		return dph;
	}

	public void setDph(double dph) {
		this.dph = dph;
	}

	public double getWpAblty() {
		return wpAblty;
	}

	public void setWpAblty(double wpAblty) {
		this.wpAblty = wpAblty;
	}

	public double getDscrgppCalbr() {
		return dscrgppCalbr;
	}

	public void setDscrgppCalbr(double dscrgppCalbr) {
		this.dscrgppCalbr = dscrgppCalbr;
	}

	public double getPumpHrspw() {
		return pumpHrspw;
	}

	public void setPumpHrspw(double pumpHrspw) {
		this.pumpHrspw = pumpHrspw;
	}

}
