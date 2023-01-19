package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 조사정보를 지목정보를 관리하는 model 클래스
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

public class LandCategoryInfo implements Serializable{
	
	private static final long serialVersionUID = 1074763160228582928L;

	/** 고유번호 */
	private String orgFid = "";
	
	/** 행정구역코드 */
	private String pnu = "";

	/** shape */
	private String shape = "";

	/** 조사시작일시 */
	private String startDate;

	/** 조사종료실시 */
	private String endDate;

	/** 최종변경일자 */
	private String updateDate;

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

	/** 최초등록자 ID */
	private String frstRegisterId;

	/** 최초등록시점 */
	private String frstRegistPnttm;

	/** 최종수정자 ID */
	private String lastUpdusrId;

	/** 최종수정시점 */
	private String lastUpdtPnttm;	
	
	/******************/
	/** 주소 */
	private String addr;
	
	/** 읍면 구분 */
	private String code1;
	
	/** 읍면명 */
	private String code1Nm;
	
	/** 리 구분 */
	private String code2;
	
	/** 리명 */
	private String code2Nm;
	
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

	public String getCode1() {
		return code1;
	}

	public void setCode1(String code1) {
		this.code1 = code1;
	}

	public String getCode1Nm() {
		return code1Nm;
	}

	public void setCode1Nm(String code1Nm) {
		this.code1Nm = code1Nm;
	}

	public String getCode2() {
		return code2;
	}

	public void setCode2(String code2) {
		this.code2 = code2;
	}

	public String getCode2Nm() {
		return code2Nm;
	}

	public void setCode2Nm(String code2Nm) {
		this.code2Nm = code2Nm;
	}
}
