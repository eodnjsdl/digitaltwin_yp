package egiskorea.com.job.ugtm.service;

import java.io.Serializable;

/**
 * @Description 지하수관리 > 지하수이용시설 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2022.01.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.07   전영후            최초 생성
 *  </pre>
 */

public class UnderWaterUseFacil implements Serializable{

	private static final long serialVersionUID = -4078986780681045206L;

	/** GID */
	private int gid;
	
	/** GEOM */
	private String geom;
	
	/** 관리구분 */
	private String manageSe = "";
	
	/** 주소 */
	private String adres = "";
	
	/** 표고 */
	private double al;
	
	/** 개발년도 */
	private String devlopYear = "";
	
	/** 충적암반구분 */
	private String allvlBsrckSe = "";
	
	/** 공공사설구분 */
	private String publicPvtesblSe = "";
	
	/** 허가신고구분 */
	private String prmisnSttemntSe = "";
	
	/** 허가신고번호 */
	private String prmisnSttemntNo = "";
	
	/** 용도구분 */
	private String prposSe = "";
	
	/** 세부용도구분 */
	private String detailPrposSe = "";
	
	/** 구경 */
	private double calbr = 0;
	
	/** 심도 */
	private double dph = 0;
	
	/** 양수량 */
	private double wpQty = 0;
	
	/** 연사용량 */
	private double yrUseQty = 0;
	
	/** 토출관구경 */
	private double dscrgppCalbr = 0;
	
	/** 펌프마력 */
	private double pumpHrspw = 0;
	
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

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public String getAdres() {
		return adres;
	}

	public void setAdres(String adres) {
		this.adres = adres;
	}


	public String getDevlopYear() {
		return devlopYear;
	}

	public void setDevlopYear(String devlopYear) {
		this.devlopYear = devlopYear;
	}

	public String getAllvlBsrckSe() {
		return allvlBsrckSe;
	}

	public void setAllvlBsrckSe(String allvlBsrckSe) {
		this.allvlBsrckSe = allvlBsrckSe;
	}

	public String getPublicPvtesblSe() {
		return publicPvtesblSe;
	}

	public void setPublicPvtesblSe(String publicPvtesblSe) {
		this.publicPvtesblSe = publicPvtesblSe;
	}

	public String getPrmisnSttemntSe() {
		return prmisnSttemntSe;
	}

	public void setPrmisnSttemntSe(String prmisnSttemntSe) {
		this.prmisnSttemntSe = prmisnSttemntSe;
	}

	public String getPrmisnSttemntNo() {
		return prmisnSttemntNo;
	}

	public void setPrmisnSttemntNo(String prmisnSttemntNo) {
		this.prmisnSttemntNo = prmisnSttemntNo;
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



	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getManageSe() {
		return manageSe;
	}

	public void setManageSe(String manageSe) {
		this.manageSe = manageSe;
	}


	public double getPumpHrspw() {
		return pumpHrspw;
	}

	public void setPumpHrspw(double pumpHrspw) {
		this.pumpHrspw = pumpHrspw;
	}

	public double getAl() {
		return al;
	}

	public void setAl(double al) {
		this.al = al;
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

	public double getWpQty() {
		return wpQty;
	}

	public void setWpQty(double wpQty) {
		this.wpQty = wpQty;
	}

	public double getYrUseQty() {
		return yrUseQty;
	}

	public void setYrUseQty(double yrUseQty) {
		this.yrUseQty = yrUseQty;
	}

	public double getDscrgppCalbr() {
		return dscrgppCalbr;
	}

	public void setDscrgppCalbr(double dscrgppCalbr) {
		this.dscrgppCalbr = dscrgppCalbr;
	}
	
}
