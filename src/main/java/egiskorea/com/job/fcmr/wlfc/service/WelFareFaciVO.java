package egiskorea.com.job.fcmr.wlfc.service;

import java.io.Serializable;

/**
 * @Description : 시설관리/복지시설 VO
 * @author      : 김영주
 * @since       : 2023.04.11
 * @version     : 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일                    수정자               수정내용
 *  ----------   --------   ---------------------------
 *  2023.04.11   김영주           최초 생성
 */

@SuppressWarnings("serial")
public class WelFareFaciVO implements Serializable {
	
	/** GID */
	private int gid;
	/** 시설명 */
	private String fcltyNm;
	/** 도로명주소 */
	private String rnAdres;
	/** 지번주소 */
	private String lnmAdres;
	/** 우편번호 */
	private String zip;
	/** 위도 */
	private double lat;
	/** 경도 */
	private double lon;
	/** 시설구분 */
	private String fcltySe;		// 시설구분 코드
	private String fcltySeNm;	// 시설구분 명
	/** 연락처전화번호 */
	private String cttpcTelno;
	/** 데이터기준일 */
	private String dataStdde;
	/** GEOMETRY */
	private String geom;
	
	public int getGid() {
		return gid;
	}
	public void setGid(int gid) {
		this.gid = gid;
	}
	public String getFcltyNm() {
		return fcltyNm;
	}
	public void setFcltyNm(String fcltyNm) {
		this.fcltyNm = fcltyNm;
	}
	public String getRnAdres() {
		return rnAdres;
	}
	public void setRnAdres(String rnAdres) {
		this.rnAdres = rnAdres;
	}
	public String getLnmAdres() {
		return lnmAdres;
	}
	public void setLnmAdres(String lnmAdres) {
		this.lnmAdres = lnmAdres;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public String getFcltySe() {
		return fcltySe;
	}
	public void setFcltySe(String fcltySe) {
		this.fcltySe = fcltySe;
	}
	public String getFcltySeNm() {
		return fcltySeNm;
	}
	public void setFcltySeNm(String fcltySeNm) {
		this.fcltySeNm = fcltySeNm;
	}
	public String getCttpcTelno() {
		return cttpcTelno;
	}
	public void setCttpcTelno(String cttpcTelno) {
		this.cttpcTelno = cttpcTelno;
	}
	public String getDataStdde() {
		return dataStdde;
	}
	public void setDataStdde(String dataStdde) {
		this.dataStdde = dataStdde;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
