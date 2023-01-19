package egiskorea.com.job.bco.service;

import java.io.Serializable;

/**
 * @Description 공사예정 정보 공사내역 상세 vo 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2021.03.18
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.03.18 	  정재환           최초 생성
 *      </pre>
 */

public class ConstructionDtlsInfo implements Serializable {
	
	/** 공사예정ID */
	private String cntrkPrrngId;
	
	/** 공사차수 */
	private String cntrkOdr;
	
	/** 공사내역 */
	private String cntrkDtls;
	
	/** 공사심도 */
	private String cntrkDph;

	
	
	
	/**
	 * @return the cntrkPrrngId
	 */
	public String getCntrkPrrngId() {
		return cntrkPrrngId;
	}

	/**
	 * @param cntrkPrrngId the cntrkPrrngId to set
	 */
	public void setCntrkPrrngId(String cntrkPrrngId) {
		this.cntrkPrrngId = cntrkPrrngId;
	}

	/**
	 * @return the cntrkOdr
	 */
	public String getCntrkOdr() {
		return cntrkOdr;
	}

	/**
	 * @param cntrkOdr the cntrkOdr to set
	 */
	public void setCntrkOdr(String cntrkOdr) {
		this.cntrkOdr = cntrkOdr;
	}

	/**
	 * @return the cntrkDtls
	 */
	public String getCntrkDtls() {
		return cntrkDtls;
	}

	/**
	 * @param cntrkDtls the cntrkDtls to set
	 */
	public void setCntrkDtls(String cntrkDtls) {
		this.cntrkDtls = cntrkDtls;
	}

	/**
	 * @return the cntrkDph
	 */
	public String getCntrkDph() {
		return cntrkDph;
	}

	/**
	 * @param cntrkDph the cntrkDph to set
	 */
	public void setCntrkDph(String cntrkDph) {
		this.cntrkDph = cntrkDph;
	}
	
	
		
	
	
	
}
