package egiskorea.com.job.rnen.service;

import java.io.Serializable;

/**
 * @Description 신재생에너지 > 태양광발전소 model 클래스
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

public class RenewableEnergy implements Serializable{

	private static final long serialVersionUID = 8313203146177949967L;
	
	/** GID */
	private int gid;
	
	/** 발전소명 */
	private String elcpwstnNm;
	
	/** 설비위치 */
	private String eqpLc;
	
	/** 발전기구분 */
	private String eltgnrSe;
	
	/** 허가용량 */
	private double prmisnVolm;
	
	/** 사업구분 */
	private String bsnsSe;
	
	/** GEOM */
	private String geom;
	
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

	public String getElcpwstnNm() {
		return elcpwstnNm;
	}

	public void setElcpwstnNm(String elcpwstnNm) {
		this.elcpwstnNm = elcpwstnNm;
	}

	public String getEqpLc() {
		return eqpLc;
	}

	public void setEqpLc(String eqpLc) {
		this.eqpLc = eqpLc;
	}

	public String getEltgnrSe() {
		return eltgnrSe;
	}

	public void setEltgnrSe(String eltgnrSe) {
		this.eltgnrSe = eltgnrSe;
	}

	public String getBsnsSe() {
		return bsnsSe;
	}

	public void setBsnsSe(String bsnsSe) {
		this.bsnsSe = bsnsSe;
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

	public double getPrmisnVolm() {
		return prmisnVolm;
	}

	public void setPrmisnVolm(double prmisnVolm) {
		this.prmisnVolm = prmisnVolm;
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

}
