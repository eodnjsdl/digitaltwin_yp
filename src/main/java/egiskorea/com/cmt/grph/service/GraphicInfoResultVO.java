package egiskorea.com.cmt.grph.service;

import java.io.Serializable;

/**
 * @Description 그래픽 정보 vo 클래스
 *
 * @author 최원석
 * @since 2022.01.27
 * @version 1.0
 * @see
 *     <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27   최원석           최초 생성
 *  </pre>
 */
public class GraphicInfoResultVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = -3740348872304664737L;

  /** 그래픽 ID */
  private String grphcId;

  /** 제목 */
  private String sj;

  /** 작성자 */
  private String register;

  /** 최종수정일시 */
  private String lastModfDt;
  
  /** 공유 */
  private String pnrsAt;
  
  /** 등록자ID */	//보기 권한 체크 위해
  private String registerId;

  public String getRegisterId() {
	return registerId;
}

public void setRegisterId(String registerId) {
	this.registerId = registerId;
}

public String getGrphcId() {
    return grphcId;
  }

  public void setGrphcId(String grphcId) {
    this.grphcId = grphcId;
  }

  public String getSj() {
    return sj;
  }

  public void setSj(String sj) {
    this.sj = sj;
  }

  public String getRegister() {
    return register;
  }

  public void setRegister(String register) {
    this.register = register;
  }

  public String getLastModfDt() {
    return lastModfDt;
  }

  public void setLastModfDt(String lastModfDt) {
    this.lastModfDt = lastModfDt;
  }

  public String getPnrsAt() {
    return pnrsAt;
  }

  public void setPnrsAt(String pnrsAt) {
    this.pnrsAt = pnrsAt;
  }
}
