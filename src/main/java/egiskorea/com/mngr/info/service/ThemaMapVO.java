package egiskorea.com.mngr.info.service;

import egovframework.com.cmm.ComDefaultVO;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

/**
 * @Description 주제도관리 VO 클래스
 * @packageName egiskorea.com.mngr.info.service
 * @Class ThemaMapVO
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.07
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.07   이준호           최초 생성
 *      </pre>
 */

public class ThemaMapVO extends ComDefaultVO {

	private static final long serialVersionUID = -6563159916746987696L;

	/* 주제도 ID */
	private String themamapId = "";

	/* 분류 */
	private String themamapCl = "";

	/* 분류 코드 */
	private String themamapClCode = "";

	/* 주제도명 */
	private String themamapNm = "";

	/* 레이어명 */
	private String layerNm = "";

	/* 주제도 설명 */
	private String themamapDeci = "";

	/* 사용 여부 */
	private String useAt = "Y";

	/* 등록자 ID */
	private String registerId = "";

	/* 최초등록일시 */
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime frstRegistDt;

	/* 수정자 ID */
	private String lastUpdusrId = "";

	/* 최종수정일시 */
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime lastModfDt;

	public String getThemamapId() {
		return themamapId;
	}

	public void setThemamapId(String themamapId) {
		this.themamapId = themamapId;
	}

	public String getThemamapCl() {
		return themamapCl;
	}

	public void setThemamapCl(String themamapCl) {
		this.themamapCl = themamapCl;
	}

	public String getThemamapClCode() {
		return themamapClCode;
	}

	public void setThemamapClCode(String themamapClCode) {
		this.themamapClCode = themamapClCode;
	}

	public String getThemamapNm() {
		return themamapNm;
	}

	public void setThemamapNm(String themamapNm) {
		this.themamapNm = themamapNm;
	}

	public String getLayerNm() {
		return layerNm;
	}

	public void setLayerNm(String layerNm) {
		this.layerNm = layerNm;
	}

	public String getThemamapDeci() {
		return themamapDeci;
	}

	public void setThemamapDeci(String themamapDeci) {
		this.themamapDeci = themamapDeci;
	}

	public String getUseAt() {
		return useAt;
	}

	public void setUseAt(String useAt) {
		this.useAt = useAt;
	}

	public String getRegisterId() {
		return registerId;
	}

	public void setRegisterId(String registerId) {
		this.registerId = registerId;
	}

	public LocalDateTime getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(LocalDateTime frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public LocalDateTime getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(LocalDateTime lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	@Override
	public String toString() {
		return "ThemaMapVO{" +
				"themamapId='" + themamapId + '\'' +
				", themamapCl='" + themamapCl + '\'' +
				", themamapClCode='" + themamapClCode + '\'' +
				", themamapNm='" + themamapNm + '\'' +
				", layerNm='" + layerNm + '\'' +
				", themamapDeci='" + themamapDeci + '\'' +
				", useAt='" + useAt + '\'' +
				", registerId='" + registerId + '\'' +
				", frstRegistDt=" + frstRegistDt +
				", lastUpdusrId='" + lastUpdusrId + '\'' +
				", lastModfDt=" + lastModfDt +
				'}';
	}
}
