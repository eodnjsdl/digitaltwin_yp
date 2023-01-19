package egiskorea.com.job.trfc.service;

import java.io.Serializable;

/**
 * @Description 철도역사를 관리하는 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2022.01.05
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.05   이병준           최초 생성
 *  </pre>
 */

public class RailroadStation implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5746263266635779932L;

	/** GID */
	private String gid;
	
	/** geom */
	private String geom;
	
	/** 시군구코드 */
	private String sigCd;
	
	/** 철도역사명_한글 */
	private String korStaNm;
	
	/** 작업일시 */
	private String opertDe;
	
	/** 철도역사일련번호 */
	private int rlrStaSn;
	
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

	public String getKorStaNm() {
		return korStaNm;
	}

	public void setKorStaNm(String korStaNm) {
		this.korStaNm = korStaNm;
	}

	public String getOpertDe() {
		return opertDe;
	}

	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}

	public int getRlrStaSn() {
		return rlrStaSn;
	}

	public void setRlrStaSn(int rlrStaSn) {
		this.rlrStaSn = rlrStaSn;
	}


	
	
}
