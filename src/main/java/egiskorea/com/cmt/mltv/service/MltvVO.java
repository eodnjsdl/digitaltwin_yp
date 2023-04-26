package egiskorea.com.cmt.mltv.service;

import java.io.Serializable;

/**
 * @Description 화면분할을 관리하는 vo 클래스
 * @author
 * @since
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  </pre>
 */

public class MltvVO implements Serializable{

	private static final long serialVersionUID = 4282701861264403473L;

	/** 업무사용자ID */
	private String emplyrId = "";

	public String getEmplyrId() {
		return emplyrId;
	}

	public void setEmplyrId(String emplyrId) {
		this.emplyrId = emplyrId;
	}
}
