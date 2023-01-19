package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 조사정보 주택특성을 관리하는 model 클래스
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

public class HouseCharacter implements Serializable{
	
	private static final long serialVersionUID = 493924689040081110L;

	/** 행정구역코드 */
	private String pnu = "";
	
	/** 기타제한 이전(공적규제) */
	private String b0101p;
	
	/** 기타제한 현재(공적규제) */
	private String b0101n;
	
	/** 기타제한 변경(공적규제) */
	private String b0101c;
	
	/** 개발사업지역구분 이전(공적규제) */
	private String b0102p;
	
	/** 개발사업지역구분 현재(공적규제) */
	private String b0102n;
	
	/** 개발사업지역구분 변경(공적규제) */
	private String b0102c;
	
	/** 개발사업지역구분 기타(공적규제) */
	private String b0102e;
	
	/** 대분류 이전(토지이용상황) */
	private String b0201p;
	
	/** 대분류 현재(토지이용상황) */
	private String b0201n;
	
	/** 대분류 변경(토지이용상황) */
	private String b0201c;
	
	/** 소분류 이전(토지이용상황) */
	private String b0202p;
	
	/** 소분류 현재(토지이용상황) */
	private String b0202n;
	
	/** 소분류 변경(토지이용상황) */
	private String b0202c;
	
	/** 소분류 기타(토지이용상황) */
	private String b0202e;
	
	/** 토지용도구분 이전(지형지세) */
	private String b0300p;
	
	/** 토지용도구분 현재(지형지세) */
	private String b0300n;
	
	/** 토지용도구분 변경(지형지세) */
	private String b0300c;
	
	/** 건물구조 이전 */
	private String b0400p;
	
	/** 건물구조 현재 */
	private String b0400n;
	
	/** 건물구조 변경 */
	private String b0400c;
	
	/** 건물구조 기타 */
	private String b0400e;
	
	/** 건물지붕 이전 */
	private String b0500p;
	
	/** 건물지붕 현재 */
	private String b0500n;
	
	/** 건물지붕 변경 */
	private String b0500c;
	
	/** 건물지붕 기타 */
	private String b0500e;
	
	/** 대분류 이전(건물용도) */
	private String b0601p;
	
	/** 대분류 현재(건물용도) */
	private String b0601n;
	
	/** 대분류 변경(건물용도) */
	private String b0601c;
	
	/** 소분류 이전(건물용도) */
	private String b0602p;
	
	/** 소분류 현재(건물용도) */
	private String b0602n;
	
	/** 소분류 변경(건물용도) */
	private String b0602c;
	
	/** 소분류 기타(건물용도) */
	private String b0602e;
	
	/** 증개축 이전 */
	private String b0700p;
	
	/** 증개축 현재 */
	private String b0700n;
	
	/** 증개축 변경 */
	private String b0700c;
	
	/** 리모델링 이전 */
	private String b0800p;
	
	/** 리모델링 현재*/
	private String b0800n;
	
	/** 리모델링 변경 */
	private String b0800c;
	
	/** 특수부대시설 이전 */
	private String b0900p;
	
	/** 특수부대시설 현재 */
	private String b0900n;
	
	/** 특수부대시설 이전 */
	private String b0900c;
	
	/** 특수부대시설 기타 */
	private String b0900e;
	
	/** 주택유형구분 이전 */
	private String b1000p;
	
	/** 주택유형구분 현재 */
	private String b1000n;
	
	/** 주택유형구분 변경 */
	private String b1000c;
	
	/** 공가주택구분 이전 */
	private String b1100p;
	
	/** 공가주택구분 현재 */
	private String b1100n;
	
	/** 공가주택구분 변경 */
	private String b1100c;

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getB0101p() {
		return b0101p;
	}

	public void setB0101p(String b0101p) {
		this.b0101p = b0101p;
	}

	public String getB0101n() {
		return b0101n;
	}

	public void setB0101n(String b0101n) {
		this.b0101n = b0101n;
	}

	public String getB0101c() {
		return b0101c;
	}

	public void setB0101c(String b0101c) {
		this.b0101c = b0101c;
	}

	public String getB0102p() {
		return b0102p;
	}

	public void setB0102p(String b0102p) {
		this.b0102p = b0102p;
	}

	public String getB0102n() {
		return b0102n;
	}

	public void setB0102n(String b0102n) {
		this.b0102n = b0102n;
	}

	public String getB0102c() {
		return b0102c;
	}

	public void setB0102c(String b0102c) {
		this.b0102c = b0102c;
	}

	public String getB0102e() {
		return b0102e;
	}

	public void setB0102e(String b0102e) {
		this.b0102e = b0102e;
	}

	public String getB0201p() {
		return b0201p;
	}

	public void setB0201p(String b0201p) {
		this.b0201p = b0201p;
	}

	public String getB0201n() {
		return b0201n;
	}

	public void setB0201n(String b0201n) {
		this.b0201n = b0201n;
	}

	public String getB0201c() {
		return b0201c;
	}

	public void setB0201c(String b0201c) {
		this.b0201c = b0201c;
	}

	public String getB0202p() {
		return b0202p;
	}

	public void setB0202p(String b0202p) {
		this.b0202p = b0202p;
	}

	public String getB0202n() {
		return b0202n;
	}

	public void setB0202n(String b0202n) {
		this.b0202n = b0202n;
	}

	public String getB0202c() {
		return b0202c;
	}

	public void setB0202c(String b0202c) {
		this.b0202c = b0202c;
	}

	public String getB0202e() {
		return b0202e;
	}

	public void setB0202e(String b0202e) {
		this.b0202e = b0202e;
	}

	public String getB0300p() {
		return b0300p;
	}

	public void setB0300p(String b0300p) {
		this.b0300p = b0300p;
	}

	public String getB0300n() {
		return b0300n;
	}

	public void setB0300n(String b0300n) {
		this.b0300n = b0300n;
	}

	public String getB0300c() {
		return b0300c;
	}

	public void setB0300c(String b0300c) {
		this.b0300c = b0300c;
	}

	public String getB0400p() {
		return b0400p;
	}

	public void setB0400p(String b0400p) {
		this.b0400p = b0400p;
	}

	public String getB0400n() {
		return b0400n;
	}

	public void setB0400n(String b0400n) {
		this.b0400n = b0400n;
	}

	public String getB0400c() {
		return b0400c;
	}

	public void setB0400c(String b0400c) {
		this.b0400c = b0400c;
	}

	public String getB0400e() {
		return b0400e;
	}

	public void setB0400e(String b0400e) {
		this.b0400e = b0400e;
	}

	public String getB0500p() {
		return b0500p;
	}

	public void setB0500p(String b0500p) {
		this.b0500p = b0500p;
	}

	public String getB0500n() {
		return b0500n;
	}

	public void setB0500n(String b0500n) {
		this.b0500n = b0500n;
	}

	public String getB0500c() {
		return b0500c;
	}

	public void setB0500c(String b0500c) {
		this.b0500c = b0500c;
	}

	public String getB0500e() {
		return b0500e;
	}

	public void setB0500e(String b0500e) {
		this.b0500e = b0500e;
	}

	public String getB0601p() {
		return b0601p;
	}

	public void setB0601p(String b0601p) {
		this.b0601p = b0601p;
	}

	public String getB0601n() {
		return b0601n;
	}

	public void setB0601n(String b0601n) {
		this.b0601n = b0601n;
	}

	public String getB0601c() {
		return b0601c;
	}

	public void setB0601c(String b0601c) {
		this.b0601c = b0601c;
	}

	public String getB0602p() {
		return b0602p;
	}

	public void setB0602p(String b0602p) {
		this.b0602p = b0602p;
	}

	public String getB0602n() {
		return b0602n;
	}

	public void setB0602n(String b0602n) {
		this.b0602n = b0602n;
	}

	public String getB0602c() {
		return b0602c;
	}

	public void setB0602c(String b0602c) {
		this.b0602c = b0602c;
	}

	public String getB0602e() {
		return b0602e;
	}

	public void setB0602e(String b0602e) {
		this.b0602e = b0602e;
	}

	public String getB0700p() {
		return b0700p;
	}

	public void setB0700p(String b0700p) {
		this.b0700p = b0700p;
	}

	public String getB0700n() {
		return b0700n;
	}

	public void setB0700n(String b0700n) {
		this.b0700n = b0700n;
	}

	public String getB0700c() {
		return b0700c;
	}

	public void setB0700c(String b0700c) {
		this.b0700c = b0700c;
	}

	public String getB0800p() {
		return b0800p;
	}

	public void setB0800p(String b0800p) {
		this.b0800p = b0800p;
	}

	public String getB0800n() {
		return b0800n;
	}

	public void setB0800n(String b0800n) {
		this.b0800n = b0800n;
	}

	public String getB0800c() {
		return b0800c;
	}

	public void setB0800c(String b0800c) {
		this.b0800c = b0800c;
	}

	public String getB0900p() {
		return b0900p;
	}

	public void setB0900p(String b0900p) {
		this.b0900p = b0900p;
	}

	public String getB0900n() {
		return b0900n;
	}

	public void setB0900n(String b0900n) {
		this.b0900n = b0900n;
	}

	public String getB0900c() {
		return b0900c;
	}

	public void setB0900c(String b0900c) {
		this.b0900c = b0900c;
	}

	public String getB0900e() {
		return b0900e;
	}

	public void setB0900e(String b0900e) {
		this.b0900e = b0900e;
	}

	public String getB1000p() {
		return b1000p;
	}

	public void setB1000p(String b1000p) {
		this.b1000p = b1000p;
	}

	public String getB1000n() {
		return b1000n;
	}

	public void setB1000n(String b1000n) {
		this.b1000n = b1000n;
	}

	public String getB1000c() {
		return b1000c;
	}

	public void setB1000c(String b1000c) {
		this.b1000c = b1000c;
	}

	public String getB1100p() {
		return b1100p;
	}

	public void setB1100p(String b1100p) {
		this.b1100p = b1100p;
	}

	public String getB1100n() {
		return b1100n;
	}

	public void setB1100n(String b1100n) {
		this.b1100n = b1100n;
	}

	public String getB1100c() {
		return b1100c;
	}

	public void setB1100c(String b1100c) {
		this.b1100c = b1100c;
	}
	
	
}
