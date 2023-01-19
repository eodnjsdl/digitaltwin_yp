package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 조사정보 토지특성을 관리하는 model 클래스
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

public class LandCharacter implements Serializable{

	private static final long serialVersionUID = 2377369911446382250L;

	/** 행정구역코드 */
	private String pnu = "";
	
	/** 기타제한 이전(공적규제) */
	private String l0100p;
	
	/** 기타제한 현재(공적규제) */
	private String l0100n;
	
	/** 기타제한 변경(공적규제) */
	private String l0100c;
	
	/** 기타제한 기타(공적규제) */
	private String l0100e;	
	
	/** 대분류 이전(토지이용상황) */
	private String l0201p;
	
	/** 대분류 현재(토지이용상황) */
	private String l0201n;
	
	/** 대분류 변경(토지이용상황) */
	private String l0201c;
	
	/** 소분류 이전(토지이용상황) */
	private String l0202p;
	
	/** 소분류 현재(토지이용상황) */
	private String l0202n;
	
	/** 소분류 변경(토지이용상황) */
	private String l0202c;
	
	/** 소분류 기타(토지이용상황) */
	private String l0202e;
	
	/** 구분 이전(농지) */
	private String l0301p;
	
	/** 구분 현재(농지) */
	private String l0301n;
	
	/** 구분 변경(농지) */
	private String l0301c;
	
	/** 비옥도 이전(농지) */
	private String l0302p;
	
	/** 비옥도 현재(농지) */
	private String l0302n;
	
	/** 비옥도 변경(농지) */
	private String l0302c;
	
	/** 경지정리 이전(농지) */
	private String l0303p;
	
	/** 경지정리 현재(농지) */
	private String l0303n;
	
	/** 경지정리 변경(농지) */
	private String l0303c;
	
	/** 임야 이전 */
	private String l0400p;
	
	/** 임야 현재 */
	private String l0400n;
	
	/** 임야 변경 */
	private String l0400c;
	
	/** 도로거리 이전(도로조건) */
	private String l0500p;
	
	/** 도로거리 현재(도로조건) */
	private String l0500n;
	
	/** 도로거리 변경(도로조건) */
	private String l0500c;
	
	/** 사업방식 이전(대규모개발사업) */
	private String l0601p;
	
	/** 사업방식 현재(대규모개발사업) */
	private String l0601n;
	
	/** 사업방식 변경(대규모개발사업) */
	private String l0601c;
	
	/** 사업단계 이전(대규모개발사업) */
	private String l0602p;
	
	/** 사업단계 현재(대규모개발사업) */
	private String l0602n;
	
	/** 사업단계 변경(대규모개발사업) */
	private String l0602c;

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getL0100p() {
		return l0100p;
	}

	public void setL0100p(String l0100p) {
		this.l0100p = l0100p;
	}

	public String getL0100n() {
		return l0100n;
	}

	public void setL0100n(String l0100n) {
		this.l0100n = l0100n;
	}

	public String getL0100c() {
		return l0100c;
	}

	public void setL0100c(String l0100c) {
		this.l0100c = l0100c;
	}

	public String getL0100e() {
		return l0100e;
	}

	public void setL0100e(String l0100e) {
		this.l0100e = l0100e;
	}

	public String getL0201p() {
		return l0201p;
	}

	public void setL0201p(String l0201p) {
		this.l0201p = l0201p;
	}

	public String getL0201n() {
		return l0201n;
	}

	public void setL0201n(String l0201n) {
		this.l0201n = l0201n;
	}

	public String getL0201c() {
		return l0201c;
	}

	public void setL0201c(String l0201c) {
		this.l0201c = l0201c;
	}

	public String getL0202p() {
		return l0202p;
	}

	public void setL0202p(String l0202p) {
		this.l0202p = l0202p;
	}

	public String getL0202n() {
		return l0202n;
	}

	public void setL0202n(String l0202n) {
		this.l0202n = l0202n;
	}

	public String getL0202c() {
		return l0202c;
	}

	public void setL0202c(String l0202c) {
		this.l0202c = l0202c;
	}

	public String getL0202e() {
		return l0202e;
	}

	public void setL0202e(String l0202e) {
		this.l0202e = l0202e;
	}

	public String getL0301p() {
		return l0301p;
	}

	public void setL0301p(String l0301p) {
		this.l0301p = l0301p;
	}

	public String getL0301n() {
		return l0301n;
	}

	public void setL0301n(String l0301n) {
		this.l0301n = l0301n;
	}

	public String getL0301c() {
		return l0301c;
	}

	public void setL0301c(String l0301c) {
		this.l0301c = l0301c;
	}

	public String getL0302p() {
		return l0302p;
	}

	public void setL0302p(String l0302p) {
		this.l0302p = l0302p;
	}

	public String getL0302n() {
		return l0302n;
	}

	public void setL0302n(String l0302n) {
		this.l0302n = l0302n;
	}

	public String getL0302c() {
		return l0302c;
	}

	public void setL0302c(String l0302c) {
		this.l0302c = l0302c;
	}

	public String getL0303p() {
		return l0303p;
	}

	public void setL0303p(String l0303p) {
		this.l0303p = l0303p;
	}

	public String getL0303n() {
		return l0303n;
	}

	public void setL0303n(String l0303n) {
		this.l0303n = l0303n;
	}

	public String getL0303c() {
		return l0303c;
	}

	public void setL0303c(String l0303c) {
		this.l0303c = l0303c;
	}

	public String getL0400p() {
		return l0400p;
	}

	public void setL0400p(String l0400p) {
		this.l0400p = l0400p;
	}

	public String getL0400n() {
		return l0400n;
	}

	public void setL0400n(String l0400n) {
		this.l0400n = l0400n;
	}

	public String getL0400c() {
		return l0400c;
	}

	public void setL0400c(String l0400c) {
		this.l0400c = l0400c;
	}

	public String getL0500p() {
		return l0500p;
	}

	public void setL0500p(String l0500p) {
		this.l0500p = l0500p;
	}

	public String getL0500n() {
		return l0500n;
	}

	public void setL0500n(String l0500n) {
		this.l0500n = l0500n;
	}

	public String getL0500c() {
		return l0500c;
	}

	public void setL0500c(String l0500c) {
		this.l0500c = l0500c;
	}

	public String getL0601p() {
		return l0601p;
	}

	public void setL0601p(String l0601p) {
		this.l0601p = l0601p;
	}

	public String getL0601n() {
		return l0601n;
	}

	public void setL0601n(String l0601n) {
		this.l0601n = l0601n;
	}

	public String getL0601c() {
		return l0601c;
	}

	public void setL0601c(String l0601c) {
		this.l0601c = l0601c;
	}

	public String getL0602p() {
		return l0602p;
	}

	public void setL0602p(String l0602p) {
		this.l0602p = l0602p;
	}

	public String getL0602n() {
		return l0602n;
	}

	public void setL0602n(String l0602n) {
		this.l0602n = l0602n;
	}

	public String getL0602c() {
		return l0602c;
	}

	public void setL0602c(String l0602c) {
		this.l0602c = l0602c;
	}
	
	
}
