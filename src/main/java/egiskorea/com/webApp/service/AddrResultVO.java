package egiskorea.com.webApp.service;

import java.io.Serializable;

public class AddrResultVO implements Serializable {

	/** 시리얼 버전 UID */
	private static final long serialVersionUID = 5142382895878295666L;

	/** gid */
	private String gid;

	/** 읍면동 명 */
	private String emdKorNm;

	/** 리 명 */
	private String liKorNm;

	/** 지번 */
	private String jibun;

	/** 필지고유번호 */
	private String pnu;

	private String lon;

	private String lat;

	/** geom */
	private String geom;

	/** 면적 */
	private int area;

	public String getGid() {
		return gid;
	}

	public void setGid(String gid) {
		this.gid = gid;
	}

	public String getEmdKorNm() {
		return emdKorNm;
	}

	public void setEmdKorNm(String emdKorNm) {
		this.emdKorNm = emdKorNm;
	}

	public String getLiKorNm() {
		return liKorNm;
	}

	public void setLiKorNm(String liKorNm) {
		this.liKorNm = liKorNm;
	}

	public String getJibun() {
		return jibun;
	}

	public void setJibun(String jibun) {
		this.jibun = jibun;
	}

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public int getArea() {
		return area;
	}

	public void setArea(int area) {
		this.area = area;
	}
}
