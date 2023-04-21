package egiskorea.com.job.fcmr.tpfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class RoadSectVO implements Serializable {
	
	private Integer gid;			// gid
	private String alwncDe;			// 부여일자
	private String alwncResn;		// 부여사유
	private String bsiInt;			// 기초간격
	private String engRn;			// 영문도로명
	private String mvmnDe;			// 이동일자
	private String mvmnResn;		// 이동사유
	private String mvmResCd;		// 이동사유코드
	private String ntfcDe;			// 고시일자
	private String opertDe;			// 작업일시
	private String rbpCn;			// 기점
	private String rdsDpnSe;		// 도로구간종속구분
	private Integer rdsManNo;		// 도로구간일련번호
	private String repCn;			// 종점
	private String rn;				// 도로명
	private String rnCd;			// 도로명코드
	private Integer roadBt;			// 도로폭
	private Integer roadLt;			// 도로길이
	private String roaClsSe;		// 도로위계기능구분
	private String sigCd;			// 시군구코드
	private String wdrRdCd;			// 광역도로구분코드
	private String geom;			// 공간정보
	
	public Integer getGid() {
		return gid;
	}
	public void setGid(Integer gid) {
		this.gid = gid;
	}
	public String getAlwncDe() {
		return alwncDe;
	}
	public void setAlwncDe(String alwncDe) {
		this.alwncDe = alwncDe;
	}
	public String getAlwncResn() {
		return alwncResn;
	}
	public void setAlwncResn(String alwncResn) {
		this.alwncResn = alwncResn;
	}
	public String getBsiInt() {
		return bsiInt;
	}
	public void setBsiInt(String bsiInt) {
		this.bsiInt = bsiInt;
	}
	public String getEngRn() {
		return engRn;
	}
	public void setEngRn(String engRn) {
		this.engRn = engRn;
	}
	public String getMvmnDe() {
		return mvmnDe;
	}
	public void setMvmnDe(String mvmnDe) {
		this.mvmnDe = mvmnDe;
	}
	public String getMvmnResn() {
		return mvmnResn;
	}
	public void setMvmnResn(String mvmnResn) {
		this.mvmnResn = mvmnResn;
	}
	public String getMvmResCd() {
		return mvmResCd;
	}
	public void setMvmResCd(String mvmResCd) {
		this.mvmResCd = mvmResCd;
	}
	public String getNtfcDe() {
		return ntfcDe;
	}
	public void setNtfcDe(String ntfcDe) {
		this.ntfcDe = ntfcDe;
	}
	public String getOpertDe() {
		return opertDe;
	}
	public void setOpertDe(String opertDe) {
		this.opertDe = opertDe;
	}
	public String getRbpCn() {
		return rbpCn;
	}
	public void setRbpCn(String rbpCn) {
		this.rbpCn = rbpCn;
	}
	public String getRdsDpnSe() {
		return rdsDpnSe;
	}
	public void setRdsDpnSe(String rdsDpnSe) {
		this.rdsDpnSe = rdsDpnSe;
	}
	public Integer getRdsManNo() {
		return rdsManNo;
	}
	public void setRdsManNo(Integer rdsManNo) {
		this.rdsManNo = rdsManNo;
	}
	public String getRepCn() {
		return repCn;
	}
	public void setRepCn(String repCn) {
		this.repCn = repCn;
	}
	public String getRn() {
		return rn;
	}
	public void setRn(String rn) {
		this.rn = rn;
	}
	public String getRnCd() {
		return rnCd;
	}
	public void setRnCd(String rnCd) {
		this.rnCd = rnCd;
	}
	public Integer getRoadBt() {
		return roadBt;
	}
	public void setRoadBt(Integer roadBt) {
		this.roadBt = roadBt;
	}
	public Integer getRoadLt() {
		return roadLt;
	}
	public void setRoadLt(Integer roadLt) {
		this.roadLt = roadLt;
	}
	public String getRoaClsSe() {
		return roaClsSe;
	}
	public void setRoaClsSe(String roaClsSe) {
		this.roaClsSe = roaClsSe;
	}
	public String getSigCd() {
		return sigCd;
	}
	public void setSigCd(String sigCd) {
		this.sigCd = sigCd;
	}
	public String getWdrRdCd() {
		return wdrRdCd;
	}
	public void setWdrRdCd(String wdrRdCd) {
		this.wdrRdCd = wdrRdCd;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
	
}
