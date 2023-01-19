package egiskorea.com.job.sffm.service;

import java.io.Serializable;

/**
 * @Description 안전시설물관리 > 가로등관리 model 클래스
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

public class SafetyFacilLampMng implements Serializable{

	private static final long serialVersionUID = 2079782339566157860L;
	
	/** GID */
	private int gid;
	
	/** 관리번호 */
	private String manageNo;
	
	/** 주소 */
	private String adres;
	
	/** 설치일자 */
	private String instlDe;
	
	/** 가로등수 */
	private int strtlgtCnt;
	
	/** 위도 */
	private double lat;
	
	/** 경도 */
	private double lon;
	
	/** 기준일 */
	private String stdde;
	
	/** GEOMETRY */
	private String geom;
	
	/** 고도 */
	private double alttd;

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getManageNo() {
		return manageNo;
	}

	public void setManageNo(String manageNo) {
		this.manageNo = manageNo;
	}

	public String getAdres() {
		return adres;
	}

	public void setAdres(String adres) {
		this.adres = adres;
	}

	public String getInstlDe() {
		return instlDe;
	}

	public void setInstlDe(String instlDe) {
		this.instlDe = instlDe;
	}

	public int getStrtlgtCnt() {
		return strtlgtCnt;
	}

	public void setStrtlgtCnt(int strtlgtCnt) {
		this.strtlgtCnt = strtlgtCnt;
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

	public String getStdde() {
		return stdde;
	}

	public void setStdde(String stdde) {
		this.stdde = stdde;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	/* 추가 */
	private String searchInstlDe;
	private String searchAdres;
	private String searchManageNo;
	private String spitalSearch;
	private double sffmBuffer;
	private String bufferArea;;

	public String getSearchInstlDe() {
		return searchInstlDe;
	}

	public void setSearchInstlDe(String searchInstlDe) {
		this.searchInstlDe = searchInstlDe;
	}

	public String getSearchAdres() {
		return searchAdres;
	}

	public void setSearchAdres(String searchAdres) {
		this.searchAdres = searchAdres;
	}

	public String getSearchManageNo() {
		return searchManageNo;
	}

	public void setSearchManageNo(String searchManageNo) {
		this.searchManageNo = searchManageNo;
	}

	public String getSpitalSearch() {
		return spitalSearch;
	}

	public void setSpitalSearch(String spitalSearch) {
		this.spitalSearch = spitalSearch;
	}

	public double getSffmBuffer() {
		return sffmBuffer;
	}

	public void setSffmBuffer(double sffmBuffer) {
		this.sffmBuffer = sffmBuffer;
	}

	public double getAlttd() {
		return alttd;
	}

	public void setAlttd(double alttd) {
		this.alttd = alttd;
	}

	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}
}
