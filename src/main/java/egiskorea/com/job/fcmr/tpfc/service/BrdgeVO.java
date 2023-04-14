package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class BrdgeVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String korBriNm;		// 교량명(한글)
	private String opertDe;			// 작업일시
	private Integer bridgeSn;		// 교량일련번호
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
	public String getKorBriNm() {
		return korBriNm;
	}
	public void setKorBriNm(String korBriNm) {
		this.korBriNm = korBriNm;
	}
	public String getOpertDe() {
		return opertDe;
	}
	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}
	public Integer getBridgeSn() {
		return bridgeSn;
	}
	public void setBridgeSn(Integer bridgeSn) {
		this.bridgeSn = bridgeSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
