package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SbwayTcVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String korSbrNm;		// 지하철노선명(한글)
	private String opertDe;			// 작업일시
	private Integer subRlwSn;		// 지하철선로일련번호
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
	public String getKorSbrNm() {
		return korSbrNm;
	}
	public void setKorSbrNm(String korSbrNm) {
		this.korSbrNm = korSbrNm;
	}
	public String getOpertDe() {
		return opertDe;
	}
	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}
	public Integer getSubRlwSn() {
		return subRlwSn;
	}
	public void setSubRlwSn(Integer subRlwSn) {
		this.subRlwSn = subRlwSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
