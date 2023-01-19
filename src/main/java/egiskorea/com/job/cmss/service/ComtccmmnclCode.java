package egiskorea.com.job.cmss.service;

import java.io.Serializable;

/**
 * @Description 공통분류 코드 vo 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2022.02.08
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.08   정재환           최초 생성
 *      </pre>
 */

public class ComtccmmnclCode implements Serializable {
	
	/** 코드ID */
	private String codeId = "";
	
	/** 코드ID명 */
	private String codeIdNm = "";
	
	/** 코드ID설명 */
	private String codeIdDc = "";
	
	/** 사용여부 */
	private String useAt = "";
	
	/** 분류코드 */
	private String clCode = "";
	
	/** 최초등록시점 */
	private String frstRegistPnttm = "";
	
	/** 최초등록자ID */
	private String frstRegisterId = "";
	
	/** 최종수정시점 */
	private String lastUpdtPnttm = "";
	
	/** 최종수정자ID */
	private String lastUpdusrId = "";

	/**
	 * @return the codeId
	 */
	public String getCodeId() {
		return codeId;
	}

	/**
	 * @param codeId the codeId to set
	 */
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

	/**
	 * @return the codeIdNm
	 */
	public String getCodeIdNm() {
		return codeIdNm;
	}

	/**
	 * @param codeIdNm the codeIdNm to set
	 */
	public void setCodeIdNm(String codeIdNm) {
		this.codeIdNm = codeIdNm;
	}

	/**
	 * @return the codeIdDc
	 */
	public String getCodeIdDc() {
		return codeIdDc;
	}

	/**
	 * @param codeIdDc the codeIdDc to set
	 */
	public void setCodeIdDc(String codeIdDc) {
		this.codeIdDc = codeIdDc;
	}

	/**
	 * @return the useAt
	 */
	public String getUseAt() {
		return useAt;
	}

	/**
	 * @param useAt the useAt to set
	 */
	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	/**
	 * @return the clCode
	 */
	public String getClCode() {
		return clCode;
	}

	/**
	 * @param clCode the clCode to set
	 */
	public void setClCode(String clCode) {
		this.clCode = clCode;
	}

	/**
	 * @return the frstRegistPnttm
	 */
	public String getFrstRegistPnttm() {
		return frstRegistPnttm;
	}

	/**
	 * @param frstRegistPnttm the frstRegistPnttm to set
	 */
	public void setFrstRegistPnttm(String frstRegistPnttm) {
		this.frstRegistPnttm = frstRegistPnttm;
	}

	/**
	 * @return the frstRegisterId
	 */
	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	/**
	 * @param frstRegisterId the frstRegisterId to set
	 */
	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	/**
	 * @return the lastUpdtPnttm
	 */
	public String getLastUpdtPnttm() {
		return lastUpdtPnttm;
	}

	/**
	 * @param lastUpdtPnttm the lastUpdtPnttm to set
	 */
	public void setLastUpdtPnttm(String lastUpdtPnttm) {
		this.lastUpdtPnttm = lastUpdtPnttm;
	}

	/**
	 * @return the lastUpdusrId
	 */
	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	/**
	 * @param lastUpdusrId the lastUpdusrId to set
	 */
	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}
	
		
		
		
		
		
		
		
		

	
	
	
	
}
