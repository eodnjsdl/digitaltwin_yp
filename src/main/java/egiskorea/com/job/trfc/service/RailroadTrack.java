package egiskorea.com.job.trfc.service;

import java.io.Serializable;

/**
 * @Description 철도선로를 관리하는 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2022.01.04
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.04   이병준           최초 생성
 *  </pre>
 */

public class RailroadTrack implements Serializable{

	

	/**
	 * 
	 */
	private static final long serialVersionUID = -402239697298168836L;

	/** GID */
	private String gid;
	
	/** lon */
	private double lon;
    
	/** lat */
    private double lat;
	
	/** 시군구코드 */
	private String sigCd;
	
	/** 철도노선명_한글 */
	private String korRlrNm;
	
	/** 작업일시 */
	private String opertDe;
	
	/** 철도선로일련번호 */
	private int rlrRlwSn;
	
	/** geom */
	private String geom;
	
	/** 버퍼 영역 */
	private String bufferArea;
	
	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}
	
	public String getGid() {
		return gid;
	}

	public void setGid(String gid) {
		this.gid = gid;
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

	public String getSigCd() {
		return sigCd;
	}

	public void setSigCd(String sigCd) {
		this.sigCd = sigCd;
	}

	public String getKorRlrNm() {
		return korRlrNm;
	}

	public void setKorRlrNm(String korRlrNm) {
		this.korRlrNm = korRlrNm;
	}

	public String getOpertDe() {
		return opertDe;
	}

	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}

	public int getRlrRlwSn() {
		return rlrRlwSn;
	}

	public void setRlrRlwSn(int rlrRlwSn) {
		this.rlrRlwSn = rlrRlwSn;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	

	
	
	
}
