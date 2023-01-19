package egiskorea.com.geo.emi.service;

import java.io.Serializable;

/**
 * @Description 행정구역별 조사정보 관리 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.01.05
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.05		이상화	최초 생성
 *  </pre>
 */

public class AdministrationZone implements Serializable{
	
	private static final long serialVersionUID = -391876675492801120L;

	/** 데이터 고유번호 */
	private String dataSeq;
	
	/** 데이터구분 */
	private String gubun;
	
	/** 읍면 구분 */
	private String code1;
	
	/** 읍면명 */
	private String code1Nm;
	
	/** 리 구분 */
	private String code2;
	
	/** 리명 */
	private String code2Nm;
	
	/** 최초등록자 ID */
	private String frstRegisterId;

	/** 최초등록시점 */
	private String frstRegistPnttm;

	/** 최종수정자 ID */
	private String lastUpdusrId;

	/** 최종수정시점 */
	private String lastUpdtPnttm;
	
	/** View Table Model */
	/** 등록자 아이디 */
	private String userId;
	
	/** 등록자명 */
	private String userNm;

	public String getDataSeq() {
		return dataSeq;
	}

	public void setDataSeq(String dataSeq) {
		this.dataSeq = dataSeq;
	}

	public String getGubun() {
		return gubun;
	}

	public void setGubun(String gubun) {
		this.gubun = gubun;
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

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}
	
	
}
