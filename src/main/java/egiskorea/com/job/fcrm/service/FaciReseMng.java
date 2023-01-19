package egiskorea.com.job.fcrm.service;

import java.io.Serializable;

/**
 * @Description 시설예약관리 
 * @author  플랫폼개발부문 DT플랫폼 이푸름
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27		이푸름	최초 생성
 *  2022.02.11		전영후	2차  작성
 *  </pre>
 */

public class FaciReseMng implements Serializable{

	private static final long serialVersionUID = 8313203146177949967L;
	
	/****************** 시설예약관리 ******************/
	
	/** GID */
	private int gid;
	
	/** GEOM */
	private String geom;
	
	/** 보조시설명 */
	private String asstnFcltyNm;
	
	/** 예약순번 */
	private int rsrvSn;
	
	/** 예약일자 */
	private String rsrvDe;
	
	/** 예약시작시각 */
	private String rsrvStrtTm;
	
	/** 예약종료시각 */
	private String rsrvEndTm;
	
	/** 예약자명 */
	private String rsvctmNm;
	
	/** 예약자연락처 */
	private String rsvctmCttpc;
	
	/** 사용비용 */
	private int useCt;
	
	/** 비고 */
	private String rm;
	
	/** 보조시설순번 */
	private int asstnFcltySn;
	
	/****************** 체육시설보조 ******************/

	/** 운영시작시간 */
	private String operStrtTime;
	
	/** 운영종료시간 */
	private String operEndTime;
	
	/** 예약여부 */
	private String rsrvAt;
	
	/** 호수 */
	private int hoCnt;
	
	/** 시설설명 */
	private String fcltyDc;
	
	/** 최초등록일시 */
	private String frstRegistDt;
	
	/** 최초등록자ID */
	private String frstRegisterId;
	
	/** 최종수정일시 */
	private String lastModfDt;
	
	/** 최종수장자ID */
	private String lastUpdusrId;
	
	/** LON */
    private double lon;
    
    /** LAT */
    private double lat;

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public String getAsstnFcltyNm() {
		return asstnFcltyNm;
	}

	public void setAsstnFcltyNm(String asstnFcltyNm) {
		this.asstnFcltyNm = asstnFcltyNm;
	}

	public int getRsrvSn() {
		return rsrvSn;
	}

	public void setRsrvSn(int rsrvSn) {
		this.rsrvSn = rsrvSn;
	}

	public String getRsrvDe() {
		return rsrvDe;
	}

	public void setRsrvDe(String rsrvDe) {
		this.rsrvDe = rsrvDe;
	}

	public String getRsrvStrtTm() {
		return rsrvStrtTm;
	}

	public void setRsrvStrtTm(String rsrvStrtTm) {
		this.rsrvStrtTm = rsrvStrtTm;
	}

	public String getRsrvEndTm() {
		return rsrvEndTm;
	}

	public void setRsrvEndTm(String rsrvEndTm) {
		this.rsrvEndTm = rsrvEndTm;
	}

	public String getRsvctmCttpc() {
		return rsvctmCttpc;
	}

	public void setRsvctmCttpc(String rsvctmCttpc) {
		this.rsvctmCttpc = rsvctmCttpc;
	}

	public int getUseCt() {
		return useCt;
	}

	public void setUseCt(int useCt) {
		this.useCt = useCt;
	}

	public String getRm() {
		return rm;
	}

	public void setRm(String rm) {
		this.rm = rm;
	}

	public String getOperStrtTime() {
		return operStrtTime;
	}

	public void setOperStrtTime(String operStrtTime) {
		this.operStrtTime = operStrtTime;
	}

	public String getOperEndTime() {
		return operEndTime;
	}

	public void setOperEndTime(String operEndTime) {
		this.operEndTime = operEndTime;
	}

	public String getRsrvAt() {
		return rsrvAt;
	}

	public void setRsrvAt(String rsrvAt) {
		this.rsrvAt = rsrvAt;
	}

	public int getHoCnt() {
		return hoCnt;
	}

	public void setHoCnt(int hoCnt) {
		this.hoCnt = hoCnt;
	}

	public String getFcltyDc() {
		return fcltyDc;
	}

	public void setFcltyDc(String fcltyDc) {
		this.fcltyDc = fcltyDc;
	}

	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(String lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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

	public String getRsvctmNm() {
		return rsvctmNm;
	}

	public void setRsvctmNm(String rsvctmNm) {
		this.rsvctmNm = rsvctmNm;
	}

	public int getAsstnFcltySn() {
		return asstnFcltySn;
	}

	public void setAsstnFcltySn(int asstnFcltySn) {
		this.asstnFcltySn = asstnFcltySn;
	} 
	
}
