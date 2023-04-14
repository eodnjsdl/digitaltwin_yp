package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class RlroadTcVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String korRlrNm;		// 철도노선명(한글)
	private String opertDe;			// 작업일시
	private Integer rlrRlwSn;		// 철도선로일련번호
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
	public Integer getRlrRlwSn() {
		return rlrRlwSn;
	}
	public void setRlrRlwSn(Integer rlrRlwSn) {
		this.rlrRlwSn = rlrRlwSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
