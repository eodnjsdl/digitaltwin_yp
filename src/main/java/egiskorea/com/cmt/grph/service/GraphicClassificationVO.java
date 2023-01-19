package egiskorea.com.cmt.grph.service;

import java.io.Serializable;
import java.util.Date;

/**
 * @Description 그래픽 분류 vo 클래스
 * @author 최원석
 * @since 2022.01.27
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.27   최원석           최초 생성
 *  </pre>
 */
public class GraphicClassificationVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = -6981554925665163465L;
	
  /** 분류 ID */
  private String clId;
  
  /** 분류명 */
  private String clNm;
  
  /** 분류설명 */
  private String clDc;
  
  /** 등록자ID */
  private String registerId;
  
  /** 최초등록일시 */
  private Date frstRegistDt;
  
  /** 최종수정일시 */
  private Date lastModfDt;

  public String getClId() {
    return clId;
  }

  public void setClId(String clId) {
    this.clId = clId;
  }

  public String getClNm() {
    return clNm;
  }

  public void setClNm(String clNm) {
    this.clNm = clNm;
  }

  public String getClDc() {
    return clDc;
  }

  public void setClDc(String clDc) {
    this.clDc = clDc;
  }

  public String getRegisterId() {
    return registerId;
  }

  public void setRegisterId(String registerId) {
    this.registerId = registerId;
  }

  public Date getFrstRegistDt() {
    return frstRegistDt;
  }

  public void setFrstRegistDt(Date frstRegistDt) {
    this.frstRegistDt = frstRegistDt;
  }

  public Date getLastModfDt() {
    return lastModfDt;
  }

  public void setLastModfDt(Date lastModfDt) {
    this.lastModfDt = lastModfDt;
  }
}
