package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 조사정보 공통항목정보를 관리하는 model 클래스
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

public class CommonInfo implements Serializable{

	private static final long serialVersionUID = -3314709054871430235L;

	/** 행정구역코드 */
	private String pnu = "";
	
	/** 용도지역 이전(공적규제) */
	private String c0100p;
	
	/** 용도지역 현재(공적규제) */
	private String c0100n;
	
	/** 용도지역 변경(공적규제) */
	private String c0100c;
	
	/** 용도지구 이전(공적규제) */
	private String c0200p;
	
	/** 용도지구 현재(공적규제) */
	private String c0200n;
	
	/** 용도지구 변경(공적규제) */
	private String c0200c;
	
	/** 제주도 현재(공적규제 기타제한) */
	private String c0301n;
	
	/** 제주도 기타(공적규제 기타제한) */
	private String c0301e;
	
	/** 도시계획신설 이전(공적규제 기타제한) */
	private String c0302p;
	
	/** 도시계획신설 현재(공적규제 기타제한) */
	private String c0302n;
	
	/** 도시계획신설 변경(공적규제 기타제한) */
	private String c0302c;
	
	/** 도시계획신설 기타(공적규제 기타제한) */
	private String c0302e;
	
	/** 고저 이전(지형지세) */
	private String c0401p;
	
	/** 고저 현재(지형지세) */
	private String c0401n;
	
	/** 고저 변경(지형지세) */
	private String c0401c;
	
	/** 형상 이전(지형지세) */
	private String c0402p;
	
	/** 형상 현재(지형지세) */
	private String c0402n;
	
	/** 형상 변경(지형지세) */
	private String c0402c;
	
	/** 방위 이전(지형지세) */
	private String c0403p;
	
	/** 방위 현재(지형지세) */
	private String c0403n;
	
	/** 방위 기타(지형지세) */
	private String c0403c;
	
	/** 도로접면 이전(도로조건) */
	private String c0500p;
	
	/** 도로접면 현재(도로조건) */
	private String c0500n;
	
	/** 도로접면 변경(도로조건) */
	private String c0500c;
	
	/** 철도, 고속도로 등 이전(유해시설접근성) */
	private String c0601p;
	
	/** 철도, 고속도로 등 현재(유해시설접근성) */
	private String c0601n;
	
	/** 철도, 고속도로 등 변경(유해시설접근성) */
	private String c0601c;
	
	/** 폐기물, 수질오염 이전(유해시설접근성) */
	private String c0602p;
	
	/** 폐기물, 수질오염 현재(유해시설접근성) */
	private String c0602n;
	
	/** 폐기물, 수질오염 변경(유해시설접근성) */
	private String c0602c;

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getC0100p() {
		return c0100p;
	}

	public void setC0100p(String c0100p) {
		this.c0100p = c0100p;
	}

	public String getC0100n() {
		return c0100n;
	}

	public void setC0100n(String c0100n) {
		this.c0100n = c0100n;
	}

	public String getC0100c() {
		return c0100c;
	}

	public void setC0100c(String c0100c) {
		this.c0100c = c0100c;
	}

	public String getC0200p() {
		return c0200p;
	}

	public void setC0200p(String c0200p) {
		this.c0200p = c0200p;
	}

	public String getC0200n() {
		return c0200n;
	}

	public void setC0200n(String c0200n) {
		this.c0200n = c0200n;
	}

	public String getC0200c() {
		return c0200c;
	}

	public void setC0200c(String c0200c) {
		this.c0200c = c0200c;
	}

	public String getC0301n() {
		return c0301n;
	}

	public void setC0301n(String c0301n) {
		this.c0301n = c0301n;
	}

	public String getC0301e() {
		return c0301e;
	}

	public void setC0301e(String c0301e) {
		this.c0301e = c0301e;
	}

	public String getC0302p() {
		return c0302p;
	}

	public void setC0302p(String c0302p) {
		this.c0302p = c0302p;
	}

	public String getC0302n() {
		return c0302n;
	}

	public void setC0302n(String c0302n) {
		this.c0302n = c0302n;
	}

	public String getC0302c() {
		return c0302c;
	}

	public void setC0302c(String c0302c) {
		this.c0302c = c0302c;
	}

	public String getC0302e() {
		return c0302e;
	}

	public void setC0302e(String c0302e) {
		this.c0302e = c0302e;
	}

	public String getC0401p() {
		return c0401p;
	}

	public void setC0401p(String c0401p) {
		this.c0401p = c0401p;
	}

	public String getC0401n() {
		return c0401n;
	}

	public void setC0401n(String c0401n) {
		this.c0401n = c0401n;
	}

	public String getC0401c() {
		return c0401c;
	}

	public void setC0401c(String c0401c) {
		this.c0401c = c0401c;
	}

	public String getC0402p() {
		return c0402p;
	}

	public void setC0402p(String c0402p) {
		this.c0402p = c0402p;
	}

	public String getC0402n() {
		return c0402n;
	}

	public void setC0402n(String c0402n) {
		this.c0402n = c0402n;
	}

	public String getC0402c() {
		return c0402c;
	}

	public void setC0402c(String c0402c) {
		this.c0402c = c0402c;
	}

	public String getC0403p() {
		return c0403p;
	}

	public void setC0403p(String c0403p) {
		this.c0403p = c0403p;
	}

	public String getC0403n() {
		return c0403n;
	}

	public void setC0403n(String c0403n) {
		this.c0403n = c0403n;
	}

	public String getC0403c() {
		return c0403c;
	}

	public void setC0403c(String c0403c) {
		this.c0403c = c0403c;
	}

	public String getC0500p() {
		return c0500p;
	}

	public void setC0500p(String c0500p) {
		this.c0500p = c0500p;
	}

	public String getC0500n() {
		return c0500n;
	}

	public void setC0500n(String c0500n) {
		this.c0500n = c0500n;
	}

	public String getC0500c() {
		return c0500c;
	}

	public void setC0500c(String c0500c) {
		this.c0500c = c0500c;
	}

	public String getC0601p() {
		return c0601p;
	}

	public void setC0601p(String c0601p) {
		this.c0601p = c0601p;
	}

	public String getC0601n() {
		return c0601n;
	}

	public void setC0601n(String c0601n) {
		this.c0601n = c0601n;
	}

	public String getC0601c() {
		return c0601c;
	}

	public void setC0601c(String c0601c) {
		this.c0601c = c0601c;
	}

	public String getC0602p() {
		return c0602p;
	}

	public void setC0602p(String c0602p) {
		this.c0602p = c0602p;
	}

	public String getC0602n() {
		return c0602n;
	}

	public void setC0602n(String c0602n) {
		this.c0602n = c0602n;
	}

	public String getC0602c() {
		return c0602c;
	}

	public void setC0602c(String c0602c) {
		this.c0602c = c0602c;
	}
	
	
	
	
}
