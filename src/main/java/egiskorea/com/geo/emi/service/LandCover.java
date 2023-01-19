package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 조사정보 토지피복을 관리하는 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.12.29
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.29   이상화           최초 생성
 *  </pre>
 */

public class LandCover implements Serializable{

	private static final long serialVersionUID = -8003766317469900200L;

	/** 행정구역코드 */
	private String pnu = "";
	
	/** 전(시설재배지) */
	private String t0100;
	
	/** 기타재배지(원예) */
	private String t0200;
	
	/** 산림지역(활엽) */
	private String t0300;
	
	/** 초지(자연, 인공) */
	private String t0400;
	
	/** 습지(내륙, 연안) */
	private String t0500;
	
	/** 나지(자연, 기타) */
	private String t0600;
	
	/** 수역(해양수) */
	private String t0700;

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getT0100() {
		return t0100;
	}

	public void setT0100(String t0100) {
		this.t0100 = t0100;
	}

	public String getT0200() {
		return t0200;
	}

	public void setT0200(String t0200) {
		this.t0200 = t0200;
	}

	public String getT0300() {
		return t0300;
	}

	public void setT0300(String t0300) {
		this.t0300 = t0300;
	}

	public String getT0400() {
		return t0400;
	}

	public void setT0400(String t0400) {
		this.t0400 = t0400;
	}

	public String getT0500() {
		return t0500;
	}

	public void setT0500(String t0500) {
		this.t0500 = t0500;
	}

	public String getT0600() {
		return t0600;
	}

	public void setT0600(String t0600) {
		this.t0600 = t0600;
	}

	public String getT0700() {
		return t0700;
	}

	public void setT0700(String t0700) {
		this.t0700 = t0700;
	}
	
	
	
}
