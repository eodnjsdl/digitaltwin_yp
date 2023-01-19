package egiskorea.com.lyr.lym.service;

/**
 * @Description 레이어 등록 정보 model 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.03.21
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.21		김선옥	최초 생성
 *      </pre>
 */


import java.io.Serializable;

import egovframework.com.cmm.ComDefaultVO;

public class LayerRegisterInfo extends ComDefaultVO implements Serializable {

	private static final long serialVersionUID = -2833966954806662404L;
	
	/** 레이어 분류 */
	private String lyrCl = "";
	
	/** 공유여부(Y : 전체공유 / O : 부서공유 / N : 공유안함) **/
	private String shareYn = "";
	
	/** 그룹 ID **/
	private String groupId = "";
	
	/** 부서 ID **/
	private String orgnztId = "";
	
	/** 데이터 ID **/
	private int dataid = 0;
	
	/** 사용여부 **/
	private String useYn = "";
	
	public String getLyrCl() {
		return lyrCl;
	}
	public void setLyrCl(String lyrCl) {
		this.lyrCl = lyrCl;
	}
	public String getShareYn() {
		return shareYn;
	}
	public void setShareYn(String shareYn) {
		this.shareYn = shareYn;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getOrgnztId() {
		return orgnztId;
	}
	public void setOrgnztId(String orgnztId) {
		this.orgnztId = orgnztId;
	}
	public int getDataid() {
		return dataid;
	}
	public void setDataid(int dataid) {
		this.dataid = dataid;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

}
