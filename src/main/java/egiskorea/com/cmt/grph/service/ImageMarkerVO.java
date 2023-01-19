package egiskorea.com.cmt.grph.service;

import java.io.Serializable;
import java.util.Date;

/**
 * @Description 이미지 마커 vo 클래스
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
public class ImageMarkerVO implements Serializable {

  /** 시리얼 버전 UID */
  private static final long serialVersionUID = 188749009083863946L;

  /** 마커ID */
  private String mkrId;
  
  /** 마커명 */
  private String mkrNm;
  
  /** IMG */
  private String img;
  
  /** 등록자ID */
  private String registerId;
  
  /** 최초등록일시 */
  private Date frstRegistDt;

  public String getMkrId() {
    return mkrId;
  }

  public void setMkrId(String mkrId) {
    this.mkrId = mkrId;
  }

  public String getMkrNm() {
    return mkrNm;
  }

  public void setMkrNm(String mkrNm) {
    this.mkrNm = mkrNm;
  }

  public String getImg() {
    return img;
  }

  public void setImg(String img) {
    this.img = img;
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
}
