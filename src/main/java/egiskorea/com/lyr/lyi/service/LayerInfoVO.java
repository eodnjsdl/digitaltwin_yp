package egiskorea.com.lyr.lyi.service;

import java.io.Serializable;
import java.time.LocalDateTime;

import egovframework.com.cmm.ComDefaultVO;

/**
 * @Description 레이어 정보 VO 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.02.22
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.22		김선옥	최초 생성
 *      </pre>
 */

public class LayerInfoVO extends ComDefaultVO implements Serializable {

	private static final long serialVersionUID = -3211917859656153615L;

	/** 레이어 ID */
	private int lyrId = 0;
	
	/** 속성 ID */
	private String atrbId = "";
	
	/** 테이블명 */
	private String tblNm = "";

	/** 레이어 유형 */
	private String lyrDtlKnd = "";
	
	public int getLyrId() {
		return lyrId;
	}

	public void setLyrId(int lyrId) {
		this.lyrId = lyrId;
	}

	public String getAtrbId() {
		return atrbId;
	}

	public void setAtrbId(String atrbId) {
		this.atrbId = atrbId;
	}

	public String getTblNm() {
		return tblNm;
	}

	public void setTblNm(String tblNm) {
		this.tblNm = tblNm;
	}

	public String getLyrDtlKnd() {
		return lyrDtlKnd;
	}

	public void setLyrDtlKnd(String lyrDtlKnd) {
		this.lyrDtlKnd = lyrDtlKnd;
	}

	
}
