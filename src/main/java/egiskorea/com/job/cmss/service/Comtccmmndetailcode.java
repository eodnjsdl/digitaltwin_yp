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

public class Comtccmmndetailcode implements Serializable {
	
	/** 코드ID */
	private String codeId = "";
	
	/** 코드 */
	private String code = "";
	
	/** 코드명 */
	private String codeNm = "";
	
	/** 코드설명 */
	private String codeDc = "";
	
	/** 사용여부 */
	private String useAt = "";
	
	/** 최초등록시점 */
	private String frstRegistPnttm = "";
	
	/** 최초등록자ID */
	private String frstRegisterId = "";
	
	/** 최종수정시점 */
	private String lastIUpdtPnttm = "";

	/** 최종수정자ID */
	private String lastIUpdusrId = "";

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
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * @return the codeNm
	 */
	public String getCodeNm() {
		return codeNm;
	}

	/**
	 * @param codeNm the codeNm to set
	 */
	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}

	/**
	 * @return the codeDc
	 */
	public String getCodeDc() {
		return codeDc;
	}

	/**
	 * @param codeDc the codeDc to set
	 */
	public void setCodeDc(String codeDc) {
		this.codeDc = codeDc;
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
	 * @return the lastIUpdtPnttm
	 */
	public String getLastIUpdtPnttm() {
		return lastIUpdtPnttm;
	}

	/**
	 * @param lastIUpdtPnttm the lastIUpdtPnttm to set
	 */
	public void setLastIUpdtPnttm(String lastIUpdtPnttm) {
		this.lastIUpdtPnttm = lastIUpdtPnttm;
	}

	/**
	 * @return the lastIUpdusrId
	 */
	public String getLastIUpdusrId() {
		return lastIUpdusrId;
	}

	/**
	 * @param lastIUpdusrId the lastIUpdusrId to set
	 */
	public void setLastIUpdusrId(String lastIUpdusrId) {
		this.lastIUpdusrId = lastIUpdusrId;
	}

	
	
}
