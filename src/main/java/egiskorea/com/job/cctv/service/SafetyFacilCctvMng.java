package egiskorea.com.job.cctv.service;

import java.io.Serializable;

/**
 * @Description 안전시설물관리 > 가로등관리 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2021.12.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.31   전영후            최초 생성
 *  </pre>
 */

public class SafetyFacilCctvMng implements Serializable{

	private static final long serialVersionUID = 2079782339566157860L;
	
	/** GID */
	private int gid;
	
	/** 명칭 */
	private String label;
	
	/** 기기ID */
	private String deviceid;
	
	/** 구분 */
	private String gbn;
	
	/** GEOMETRY */
	private String geom;
	
	private String uid;
	private String ___annox;
	private String ___annoy;
	private String channel;
	private String ptzYn;
	private String talkYn;
	private String netYn;
	private String preset1;
	private String preset2;
	private String preset3;
	private String preset4;
	private String preset5;
	private String preset6;
	private String preset7;
	private String preset8;
	private String preset9;
	private String preset10;
	private String preset11;
	private String preset12;
	private String preset13;
	private String preset14;
	private String preset15;
	private String preset16;
	private String preset17;
	private String preset18;
	private String preset19;
	private String preset20;
	private String angle;
	// TGD_CCTV_STATUS_NEW 로 변경된 테이블 컬럼
	private String lgsrAdr;
	private String newAdr;
	private String ipAdr;
	private String instlYy;
	private String chanYy;

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getDeviceid() {
		return deviceid;
	}

	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}

	public String getGbn() {
		return gbn;
	}

	public void setGbn(String gbn) {
		this.gbn = gbn;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String get___annox() {
		return ___annox;
	}

	public void set___annox(String ___annox) {
		this.___annox = ___annox;
	}

	public String get___annoy() {
		return ___annoy;
	}

	public void set___annoy(String ___annoy) {
		this.___annoy = ___annoy;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getPtzYn() {
		return ptzYn;
	}

	public void setPtzYn(String ptzYn) {
		this.ptzYn = ptzYn;
	}

	public String getTalkYn() {
		return talkYn;
	}

	public void setTalkYn(String talkYn) {
		this.talkYn = talkYn;
	}

	public String getNetYn() {
		return netYn;
	}

	public void setNetYn(String netYn) {
		this.netYn = netYn;
	}

	public String getPreset1() {
		return preset1;
	}

	public void setPreset1(String preset1) {
		this.preset1 = preset1;
	}

	public String getPreset2() {
		return preset2;
	}

	public void setPreset2(String preset2) {
		this.preset2 = preset2;
	}

	public String getPreset3() {
		return preset3;
	}

	public void setPreset3(String preset3) {
		this.preset3 = preset3;
	}

	public String getPreset4() {
		return preset4;
	}

	public void setPreset4(String preset4) {
		this.preset4 = preset4;
	}

	public String getPreset5() {
		return preset5;
	}

	public void setPreset5(String preset5) {
		this.preset5 = preset5;
	}

	public String getPreset6() {
		return preset6;
	}

	public void setPreset6(String preset6) {
		this.preset6 = preset6;
	}

	public String getPreset7() {
		return preset7;
	}

	public void setPreset7(String preset7) {
		this.preset7 = preset7;
	}

	public String getPreset8() {
		return preset8;
	}

	public void setPreset8(String preset8) {
		this.preset8 = preset8;
	}

	public String getPreset9() {
		return preset9;
	}

	public void setPreset9(String preset9) {
		this.preset9 = preset9;
	}

	public String getPreset10() {
		return preset10;
	}

	public void setPreset10(String preset10) {
		this.preset10 = preset10;
	}

	public String getPreset11() {
		return preset11;
	}

	public void setPreset11(String preset11) {
		this.preset11 = preset11;
	}

	public String getPreset12() {
		return preset12;
	}

	public void setPreset12(String preset12) {
		this.preset12 = preset12;
	}

	public String getPreset13() {
		return preset13;
	}

	public void setPreset13(String preset13) {
		this.preset13 = preset13;
	}

	public String getPreset14() {
		return preset14;
	}

	public void setPreset14(String preset14) {
		this.preset14 = preset14;
	}

	public String getPreset15() {
		return preset15;
	}

	public void setPreset15(String preset15) {
		this.preset15 = preset15;
	}

	public String getPreset16() {
		return preset16;
	}

	public void setPreset16(String preset16) {
		this.preset16 = preset16;
	}

	public String getPreset17() {
		return preset17;
	}

	public void setPreset17(String preset17) {
		this.preset17 = preset17;
	}

	public String getPreset18() {
		return preset18;
	}

	public void setPreset18(String preset18) {
		this.preset18 = preset18;
	}

	public String getPreset19() {
		return preset19;
	}

	public void setPreset19(String preset19) {
		this.preset19 = preset19;
	}

	public String getPreset20() {
		return preset20;
	}

	public void setPreset20(String preset20) {
		this.preset20 = preset20;
	}

	public String getAngle() {
		return angle;
	}

	public void setAngle(String angle) {
		this.angle = angle;
	}
	
	public String getLgsrAdr() {
		return lgsrAdr;
	}

	public void setLgsrAdr(String lgsrAdr) {
		this.lgsrAdr = lgsrAdr;
	}

	public String getNewAdr() {
		return newAdr;
	}

	public void setNewAdr(String newAdr) {
		this.newAdr = newAdr;
	}

	public String getIpAdr() {
		return ipAdr;
	}

	public void setIpAdr(String ipAdr) {
		this.ipAdr = ipAdr;
	}

	public String getInstlYy() {
		return instlYy;
	}

	public void setInstlYy(String instlYy) {
		this.instlYy = instlYy;
	}

	public String getChanYy() {
		return chanYy;
	}

	public void setChanYy(String chanYy) {
		this.chanYy = chanYy;
	}



	/* 추가 */
	private String searchLabel;
	private String searchDeviceid;
	private String searchGbn;
	private String spitalSearch;
	private double cctvBuffer;
	private String bufferArea;
	private double lon;
	private double lat;

	public String getSearchLabel() {
		return searchLabel;
	}

	public void setSearchLabel(String searchLabel) {
		this.searchLabel = searchLabel;
	}

	public String getSearchDeviceid() {
		return searchDeviceid;
	}

	public void setSearchDeviceid(String searchDeviceid) {
		this.searchDeviceid = searchDeviceid;
	}

	public String getSearchGbn() {
		return searchGbn;
	}

	public void setSearchGbn(String searchGbn) {
		this.searchGbn = searchGbn;
	}

	public String getSpitalSearch() {
		return spitalSearch;
	}

	public void setSpitalSearch(String spitalSearch) {
		this.spitalSearch = spitalSearch;
	}

	public double getCctvBuffer() {
		return cctvBuffer;
	}

	public void setCctvBuffer(double cctvBuffer) {
		this.cctvBuffer = cctvBuffer;
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

	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}
}
