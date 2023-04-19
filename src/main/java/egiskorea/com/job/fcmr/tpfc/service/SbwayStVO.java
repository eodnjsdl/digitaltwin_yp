package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SbwayStVO implements Serializable {
	private Integer gid;			// gid
	private String sigCd;			// 시군구코드
	private String korSubNm;		// 지하철역사명(한글)
	private String opertDe;			// 작업일시
	private Integer subStaSn;		// 지하철역사일련번호
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
	public String getKorSubNm() {
		return korSubNm;
	}
	public void setKorSubNm(String korSubNm) {
		this.korSubNm = korSubNm;
	}
	public String getOpertDe() {
		return opertDe;
	}
	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}
	public Integer getSubStaSn() {
		return subStaSn;
	}
	public void setSubStaSn(Integer subStaSn) {
		this.subStaSn = subStaSn;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
}
