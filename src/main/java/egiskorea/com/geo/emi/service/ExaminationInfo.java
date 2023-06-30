package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 조사정보를 관리하는 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.09   이상화           최초 생성
 *  </pre>
 */

public class ExaminationInfo implements Serializable{

	private static final long serialVersionUID = -2258953223825670579L;

	/** 고유번호 */
	private String orgFid = "";
	
	/** 행정구역코드 */
	private String pnu = "";
	
	/** 본번 */
	private String bonbun = "";
	
	/** 부번 */
	private String bubun = "";

	/** shape */
	private String shape = "";

	/** 조사시작일시 */
	private String startDate;

	/** 조사종료실시 */
	private String endDate;

	/** 최종변경일자 */
	private String updateDate;
	
	/** 최초등록자 ID */
	private String frstRegisterId;

	/** 최초등록시점 */
	private String frstRegistPnttm;

	/** 최종수정자 ID */
	private String lastUpdusrId;

	/** 최종수정시점 */
	private String lastUpdtPnttm;
	
	/** 지번주소 */
	private String addr;

	/** 지번주소(군) */
	private String gun;

	/** 지번주소(읍면)) */
	private String eupmyeon;

	/** 지번주소(리) */
	private String ri;

	/** 지번주소(번지) */
	private String bun;
	
	/** 위도 좌표 */
	private String lat;
	
	/** 경도 좌표 */
	private String lon;
	
	/** 행정구역 리 정보 */
	private String ypri = "";
	
	///////////////////////  지목조사  ///////////////////////

	/** 조사자(정) */
	private String main;

	/** 조사자(부) */
	private String sub;

	/** 원지목 */
	private String ori;

	/** 지목일치여부 */
	private String j0100;

	/** 재설정 지목 */
	private String j0200;
	
	/** 현실지목 대분류 */
	private String j0301;

	/** 현실지목 소분류 */
	private String j0302;

	/** 토지용도1 */
	private String j0401;

	/** 토지용도1 % */
	private String j0401p;

	/** 토지용도2 */
	private String j0402;

	/** 토지용도2 % */
	private String j0402p;

	/** 토지용도3 */
	private String j0403;

	/** 토지용도3 % */
	private String j0403p;

	/** 건물용도1 */
	private String j0501;

	/** 건물용도1 % */
	private String j0501p;

	/** 건물용도2 */
	private String j0502;

	/** 건물용도2 % */
	private String j0502p;

	/** 건물용도3 */
	private String j0503;

	/** 건물용도3 % */
	private String j0503p;

	/** 국공유지 */
	private String g0100;

	/** 유지무단 */
	private String g0101;

	/** 저장구분 */
	private String saveYn;

	/** 조사자의견 */
	private String opinion;	
	
	///////////////////////  공통항목  ///////////////////////
	
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
	
	
	///////////////////////  토지특성  ///////////////////////
		
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


	///////////////////////  주택특성  ///////////////////////
	
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
	
	
	///////////////////////  토지피복  ///////////////////////
	
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
	
	
	///////////////////////  사진  ///////////////////////
	/** 원거리 사진 */
	private String ldstcPhotoAtflId;
	
	/** 근거리 사진 */
	private String accdPhotoAtflId;
	
	
	public String getOrgFid() {
		return orgFid;
	}

	public void setOrgFid(String orgFid) {
		this.orgFid = orgFid;
	}

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getBonbun() {
		return bonbun;
	}

	public void setBonbun(String bonbun) {
		this.bonbun = bonbun;
	}

	public String getBubun() {
		return bubun;
	}

	public void setBubun(String bubun) {
		this.bubun = bubun;
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getFrstRegistPnttm() {
		return frstRegistPnttm;
	}

	public void setFrstRegistPnttm(String frstRegistPnttm) {
		this.frstRegistPnttm = frstRegistPnttm;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public String getLastUpdtPnttm() {
		return lastUpdtPnttm;
	}

	public void setLastUpdtPnttm(String lastUpdtPnttm) {
		this.lastUpdtPnttm = lastUpdtPnttm;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getGun() {
		return gun;
	}

	public void setGun(String gun) {
		this.gun = gun;
	}

	public String getEupmyeon() {
		return eupmyeon;
	}

	public void setEupmyeon(String eupmyeon) {
		this.eupmyeon = eupmyeon;
	}

	public String getRi() {
		return ri;
	}

	public void setRi(String ri) {
		this.ri = ri;
	}

	public String getBun() {
		return bun;
	}

	public void setBun(String bun) {
		this.bun = bun;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getYpri() {
		return ypri;
	}

	public void setYpri(String ypri) {
		this.ypri = ypri;
	}

	public String getMain() {
		return main;
	}

	public void setMain(String main) {
		this.main = main;
	}

	public String getSub() {
		return sub;
	}

	public void setSub(String sub) {
		this.sub = sub;
	}

	public String getOri() {
		return ori;
	}

	public void setOri(String ori) {
		this.ori = ori;
	}

	public String getJ0100() {
		return j0100;
	}

	public void setJ0100(String j0100) {
		this.j0100 = j0100;
	}

	public String getJ0200() {
		return j0200;
	}

	public void setJ0200(String j0200) {
		this.j0200 = j0200;
	}

	public String getJ0301() {
		return j0301;
	}

	public void setJ0301(String j0301) {
		this.j0301 = j0301;
	}

	public String getJ0302() {
		return j0302;
	}

	public void setJ0302(String j0302) {
		this.j0302 = j0302;
	}

	public String getJ0401() {
		return j0401;
	}

	public void setJ0401(String j0401) {
		this.j0401 = j0401;
	}

	public String getJ0401p() {
		return j0401p;
	}

	public void setJ0401p(String j0401p) {
		this.j0401p = j0401p;
	}

	public String getJ0402() {
		return j0402;
	}

	public void setJ0402(String j0402) {
		this.j0402 = j0402;
	}

	public String getJ0402p() {
		return j0402p;
	}

	public void setJ0402p(String j0402p) {
		this.j0402p = j0402p;
	}

	public String getJ0403() {
		return j0403;
	}

	public void setJ0403(String j0403) {
		this.j0403 = j0403;
	}

	public String getJ0403p() {
		return j0403p;
	}

	public void setJ0403p(String j0403p) {
		this.j0403p = j0403p;
	}

	public String getJ0501() {
		return j0501;
	}

	public void setJ0501(String j0501) {
		this.j0501 = j0501;
	}

	public String getJ0501p() {
		return j0501p;
	}

	public void setJ0501p(String j0501p) {
		this.j0501p = j0501p;
	}

	public String getJ0502() {
		return j0502;
	}

	public void setJ0502(String j0502) {
		this.j0502 = j0502;
	}

	public String getJ0502p() {
		return j0502p;
	}

	public void setJ0502p(String j0502p) {
		this.j0502p = j0502p;
	}

	public String getJ0503() {
		return j0503;
	}

	public void setJ0503(String j0503) {
		this.j0503 = j0503;
	}

	public String getJ0503p() {
		return j0503p;
	}

	public void setJ0503p(String j0503p) {
		this.j0503p = j0503p;
	}

	public String getG0100() {
		return g0100;
	}

	public void setG0100(String g0100) {
		this.g0100 = g0100;
	}

	public String getG0101() {
		return g0101;
	}

	public void setG0101(String g0101) {
		this.g0101 = g0101;
	}

	public String getSaveYn() {
		return saveYn;
	}

	public void setSaveYn(String saveYn) {
		this.saveYn = saveYn;
	}

	public String getOpinion() {
		return opinion;
	}

	public void setOpinion(String opinion) {
		this.opinion = opinion;
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

	public String getLdstcPhotoAtflId() {
		return ldstcPhotoAtflId;
	}

	public void setLdstcPhotoAtflId(String ldstcPhotoAtflId) {
		this.ldstcPhotoAtflId = ldstcPhotoAtflId;
	}

	public String getAccdPhotoAtflId() {
		return accdPhotoAtflId;
	}

	public void setAccdPhotoAtflId(String accdPhotoAtflId) {
		this.accdPhotoAtflId = accdPhotoAtflId;
	}
}
