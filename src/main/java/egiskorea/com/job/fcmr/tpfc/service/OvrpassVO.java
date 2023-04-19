package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class OvrpassVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String korOveNm;		// 고가도로명(한글)
	private String opertDe;			// 작업일시
	private Integer oveSn;			// 고가도로일련번호
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
	public String getKorOveNm() {
		return korOveNm;
	}
	public void setKorOveNm(String korOveNm) {
		this.korOveNm = korOveNm;
	}
	public String getOpertDe() {
		return opertDe;
	}
	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}
	public Integer getOveSn() {
		return oveSn;
	}
	public void setOveSn(Integer oveSn) {
		this.oveSn = oveSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
