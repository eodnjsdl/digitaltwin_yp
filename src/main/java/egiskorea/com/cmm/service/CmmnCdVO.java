/***********************************
* 공통 코드 VO
* @author  : 이혜인
* @since   : 2023.03.01
* @version : 1.0
************************************/
package egiskorea.com.cmm.service;

public class CmmnCdVO {
	private String code;			// 코드
	private String codeNm;			// 코드명
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeNm() {
		return codeNm;
	}
	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}
}
