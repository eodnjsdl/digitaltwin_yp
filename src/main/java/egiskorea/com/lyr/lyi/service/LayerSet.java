package egiskorea.com.lyr.lyi.service;

import java.io.Serializable;

import egovframework.com.cmm.ComDefaultVO;

/**
 * @Description 레이어셋 model 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2022.02.14
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.14		김선옥	최초 생성
 *      </pre>
 */

public class LayerSet extends ComDefaultVO implements Serializable {

	private static final long serialVersionUID = -3694644694713382902L;

	/** 레이어ID **/
	private int lyrId = 0;
	/** 레이어분류 **/
	private String lyrCl = "";
	/** 레이어명 **/
	private String lyrNm = "";
	/** 레이어별칭 **/
	private String lyrNcm = "";
	/** 테이블명 **/
	private String tblNm = "";
	/** 레이어종류 **/
	private String lyrKnd = "";
	/** 레이어상세종류 **/
	private String lyrDtlKnd = "";
	/** 갱신주기 **/
	private String rnwlCycle = "";
	/** 갱신단위 **/
	private String rnwlUnit = "";
	/** 갱신형태 **/
	private String rnwlStle = "";
	/** 공유형태 **/
	private String cnrsStle = "";
	/** 레이어경로 **/
	private String lyrPath = "";
	/** 2D가시화여부 **/
	private String aprnt2DAt = "";
	/** 3D가시화여부 **/
	private String aprnt3DAt = "";
	/** 사용여부 **/
	private String useAt = "";
	/** 스타일정보 **/
	private String styleInfo = "";
	/** 최초등록일시 **/
	private String frstRegistDt = "";
	/** 최초등록자ID **/
	private String frstRegisterId = "";
	/** 최종수정일시 **/
	private String lastModfDt = "";
	/** 최종수정자ID **/
	private String lastUpdusrId = "";
	/** 최초등록자명 **/
	private String frstRegisterNm = "";
	/** 라벨 필드 */
	private String lblField = "";
	/** 라벨 표시 여부 */
	private String lblEprssAt = "";

	public int getLyrId() {
		return lyrId;
	}

	public void setLyrId(int lyrId) {
		this.lyrId = lyrId;
	}

	public String getLyrCl() {
		return lyrCl;
	}

	public void setLyrCl(String lyrCl) {
		this.lyrCl = lyrCl;
	}

	public String getLyrNm() {
		return lyrNm;
	}

	public void setLyrNm(String lyrNm) {
		this.lyrNm = lyrNm;
	}

	public String getLyrNcm() {
		return lyrNcm;
	}

	public void setLyrNcm(String lyrNcm) {
		this.lyrNcm = lyrNcm;
	}

	public String getTblNm() {
		return tblNm;
	}

	public void setTblNm(String tblNm) {
		this.tblNm = tblNm;
	}

	public String getLyrKnd() {
		return lyrKnd;
	}

	public void setLyrKnd(String lyrKnd) {
		this.lyrKnd = lyrKnd;
	}

	public String getLyrDtlKnd() {
		return lyrDtlKnd;
	}

	public void setLyrDtlKnd(String lyrDtlKnd) {
		this.lyrDtlKnd = lyrDtlKnd;
	}

	public String getRnwlCycle() {
		return rnwlCycle;
	}

	public void setRnwlCycle(String rnwlCycle) {
		this.rnwlCycle = rnwlCycle;
	}

	public String getRnwlUnit() {
		return rnwlUnit;
	}

	public void setRnwlUnit(String rnwlUnit) {
		this.rnwlUnit = rnwlUnit;
	}

	public String getRnwlStle() {
		return rnwlStle;
	}

	public void setRnwlStle(String rnwlStle) {
		this.rnwlStle = rnwlStle;
	}

	public String getCnrsStle() {
		return cnrsStle;
	}

	public void setCnrsStle(String cnrsStle) {
		this.cnrsStle = cnrsStle;
	}

	public String getLyrPath() {
		return lyrPath;
	}

	public void setLyrPath(String lyrPath) {
		this.lyrPath = lyrPath;
	}

	public String getAprnt2DAt() {
		return aprnt2DAt;
	}

	public void setAprnt2DAt(String aprnt2dAt) {
		aprnt2DAt = aprnt2dAt;
	}

	public String getAprnt3DAt() {
		return aprnt3DAt;
	}

	public void setAprnt3DAt(String aprnt3dAt) {
		aprnt3DAt = aprnt3dAt;
	}

	public String getUseAt() {
		return useAt;
	}

	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	public String getStyleInfo() {
		return styleInfo;
	}

	public void setStyleInfo(String styleInfo) {
		this.styleInfo = styleInfo;
	}

	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(String lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}
	
	public String getFrstRegisterNm() {
		return frstRegisterNm;
	}

	public void setFrstRegisterNm(String frstRegisterNm) {
		this.frstRegisterNm = frstRegisterNm;
	}

    public String getLblField() {
      return lblField;
    }

    public void setLblField(String lblField) {
      this.lblField = lblField;
    }

    public String getLblEprssAt() {
      return lblEprssAt;
    }

    public void setLblEprssAt(String lblEprssAt) {
      this.lblEprssAt = lblEprssAt;
    }
  
    @Override
	public String toString() {
		return "LayerSet [lyrId=" + lyrId + ", lyrCl=" + lyrCl + ", lyrNm=" + lyrNm + ", lyrNcm=" + lyrNcm + ", tblNm="
				+ tblNm + ", lyrKnd=" + lyrKnd + ", lyrDtlKnd=" + lyrDtlKnd + ", rnwlCycle=" + rnwlCycle + ", rnwlUnit="
				+ rnwlUnit + ", rnwlStle=" + rnwlStle + ", nrsStle=" + cnrsStle + ", lyrPath=" + lyrPath + ", aprnt2DAt="
				+ aprnt2DAt + ", aprnt3DAt=" + aprnt3DAt + ", useAt=" + useAt + ", styleInfo=" + styleInfo
				+ ", frstRegistDt=" + frstRegistDt + ", frstRegisterId=" + frstRegisterId + ", lastModfDt=" + lastModfDt
				+ ", lastUpdusrId=" + lastUpdusrId + "]";
	}
}
