package egiskorea.com.job.trfc.service;

import java.io.Serializable;

/**
 * @Description 도로구간을 관리하는 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 이병준
 * @since 2021.12.30
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.30   이병준           최초 생성
 *  </pre>
 */

public class RoadSection implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -857540536149365978L;

	/** GID */
	private int gid;
	
	/** geom */
	private String geom;
	
	/** 부여일자 */
	private String alwncDe;
	
	/** lon */
	private double lon;
    
	/** lat */
    private double lat;
    
	/** 부여사유 */
	private String alwncResn;
	
	/** 기초간격 */
	private String bsiInt;
	
	/** 영문도로명 */
	private String engRn;
	
	/** 이동일자 */
	private String mvmnDe;
	
	/** 이동사유 */
	private String mvmnResn;
	
	/** 이동사유코드 */
	private String mvmResCd;
	
	/** 고시일자 */
	private String ntfcDe;
	
	/** 작업일시 */
	private String opertDe;
	
	/** 기점 */
	private String rbpCn;
	
	/** 도로구간종속구분 */
	private int rdsDpnSe;
	
	/** 도로구간일련번호 */
	private String rdsManNo;
	
	/** 종점 */
	private String repCn;
	
	/** 도로명 */
	private String rn;
	
	/** 도로명코드 */
	private String rnCd;
	
	/** 도로폭 */
	private int roadBt;
	
	/** 도로길이 */
	private int roadLt;
	
	/** 도로위계기능구분 */
	private String roaClsSe;
	
	/** 시군구코드 */
	private String sigCd;
	
	/** 광역도로구분코드 */
	private String wdrRdCd;

	/** 버퍼 영역 */
	private String bufferArea;
	
	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}

	public int getGid() {
		return gid;
	}

	public double getLon() {
		return lon;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
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

	public void setGid(int gid) {
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

	public int getRdsDpnSe() {
		return rdsDpnSe;
	}

	public void setRdsDpnSe(int rdsDpnSe) {
		this.rdsDpnSe = rdsDpnSe;
	}

	public String getRdsManNo() {
		return rdsManNo;
	}

	public void setRdsManNo(String rdsManNo) {
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

	public int getRoadBt() {
		return roadBt;
	}

	public void setRoadBt(int roadBt) {
		this.roadBt = roadBt;
	}

	public int getRoadLt() {
		return roadLt;
	}

	public void setRoadLt(int roadLt) {
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
	
	
	
	
}
