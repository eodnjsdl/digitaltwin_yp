package egiskorea.com.cmt.uai.service;

import java.io.Serializable;

/**
 * @Description 통합행정정보를 관리하는 vo 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.01.03
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.03   이상화           최초 생성
 *  </pre>
 */

public class UnityAdministrationInfoVO implements Serializable{

	private static final long serialVersionUID = -1502202295154851069L;
	
	/** 행정구역코드 */
	private String pnu = "";
	
	/** 지번 주소 */
	private String addr = "";
	
	/** 읍면동 */
	private String emd = "";
	
	/** 리 */
	private String li = "";
	
	/** 검색 */
	private String searchSet = "";
	
	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getEmd() {
		return emd;
	}

	public void setEmd(String emd) {
		this.emd = emd;
	}

	public String getLi() {
		return li;
	}

	public void setLi(String li) {
		this.li = li;
	}

	public String getSearchSet() {
		return searchSet;
	}

	public void setSearchSet(String searchSet) {
		this.searchSet = searchSet;
	}
}
