package egiskorea.com.job.trfc.service;

import java.io.Serializable;

/**
 * @Description 터널을 관리하는 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2022.02.21
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.21   이병준           최초 생성
 *  </pre>
 */

public class Tunnel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -139357698967290533L;

	/** GID */
	private String gid;
	
	/** geom */
	private String geom;
	
	/** 시군구코드 */
	private String sigCd;
	
	/** 터널명_한글 */
	private String tunKorNm;
	
	/** 작업일시 */
	private String opertDe;
	
	/** 터널일련번호 */
	private int tunnelSn;
	
	/** lon */
	private double lon;
    
	/** lat */
    private double lat;
    
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

	public String getSigCd() {
		return sigCd;
	}

	public void setSigCd(String sigCd) {
		this.sigCd = sigCd;
	}

	public String getOpertDe() {
		return opertDe;
	}

	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}

	public String getTunKorNm() {
		return tunKorNm;
	}

	public void setTunKorNm(String tunKorNm) {
		this.tunKorNm = tunKorNm;
	}

	public int getTunnelSn() {
		return tunnelSn;
	}

	public void setTunnelSn(int tunnelSn) {
		this.tunnelSn = tunnelSn;
	}


	

	
	
	
}
