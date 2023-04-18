package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class TunnlVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String tunKorNm;		// 터널명(한글)
	private String opertDe;			// 작업일시
	private Integer tunnelSn;		// 터널일련번호
	private String geom;			// geometry
	
	public Integer getGid() {
		return gid;
	}
	public void setGid(Integer gid) {
		this.gid = gid;
	}
	public String getSigCd() {
		return sigCd;
	}
	public void setSigCd(String sigCd) {
		this.sigCd = sigCd;
	}
	public String getTunKorNm() {
		return tunKorNm;
	}
	public void setTunKorNm(String tunKorNm) {
		this.tunKorNm = tunKorNm;
	}
	public String getOpertDe() {
		return opertDe;
	}
	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}
	public Integer getTunnelSn() {
		return tunnelSn;
	}
	public void setTunnelSn(Integer tunnelSn) {
		this.tunnelSn = tunnelSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
