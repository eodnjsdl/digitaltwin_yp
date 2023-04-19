package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class RlroadStVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String korStaNm;		// 철도역사명(한글)
	private String opertDe;			// 작업일시
	private Integer rlrStaSn;		// 철도역사일련번호
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
	public Integer getRlrStaSn() {
		return rlrStaSn;
	}
	public void setRlrStaSn(Integer rlrStaSn) {
		this.rlrStaSn = rlrStaSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
