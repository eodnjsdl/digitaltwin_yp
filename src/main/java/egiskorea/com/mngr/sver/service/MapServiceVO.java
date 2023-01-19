package egiskorea.com.mngr.sver.service;

import egovframework.com.cmm.ComDefaultVO;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

/**
 * @Description 지도서비스관리 VO 클래스
 * @packageName egiskorea.com.mngr.sver.service
 * @Class MapServiceVO
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.16
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.16   이준호           최초 생성
 *
 */
public class MapServiceVO extends ComDefaultVO {

    private static final long serialVersionUID = 5971419829993422419L;

    /* 지도서비스 ID(고유값:primary key) */
    private String mapserviceId = "";

    /* 서비스 ID(2D) */
    private String serviceId = "";

    /* 서비스명 */
    private String serviceNm = "";

    /* 서비스 설명 */
    private String serviceDc = "";

    /* 사용여부 */
    private String useAt = "Y";

    /* 서비스주소(3D) */
    private String serviceUrl = "";
    
    /* 서비스주소 LX(3D) */
    private String serviceUrlLx = "";

    /* 배경지도 종류 */
    private String bmCode = "";

    /* 배경지도 이름 */
    private String bmCodeNm = "";

    /* 생성일 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime frstRegistDt;

    /* 생성자 */
    private String frstRegisterId = "";

    /* 수정일 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastModfDt;

    /* 수정자 */
    private String lastUpdusrId = "";

    /* 이미지 원본 파일명 */
    private String originalFileNm = "";

    /* 이미지 암호화 파일명 */
    private String streFileNm = "";

    /* 기본 배경 선택 여부 */
    private String basicAt = "N";

    public String getMapserviceId() {
        return mapserviceId;
    }

    public void setMapserviceId(String mapserviceId) {
        this.mapserviceId = mapserviceId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceNm() {
        return serviceNm;
    }

    public void setServiceNm(String serviceNm) {
        this.serviceNm = serviceNm;
    }

    public String getServiceDc() {
        return serviceDc;
    }

    public void setServiceDc(String serviceDc) {
        this.serviceDc = serviceDc;
    }

    public String getUseAt() {
        return useAt;
    }

    public void setUseAt(String useAt) {
        this.useAt = useAt;
    }

    public LocalDateTime getFrstRegistDt() {
        return frstRegistDt;
    }

    public void setFrstRegistDt(LocalDateTime frstRegistDt) {
        this.frstRegistDt = frstRegistDt;
    }

    public String getFrstRegisterId() {
        return frstRegisterId;
    }

    public void setFrstRegisterId(String frstRegisterId) {
        this.frstRegisterId = frstRegisterId;
    }

    public LocalDateTime getLastModfDt() {
        return lastModfDt;
    }

    public void setLastModfDt(LocalDateTime lastModfDt) {
        this.lastModfDt = lastModfDt;
    }

    public String getLastUpdusrId() {
        return lastUpdusrId;
    }

    public void setLastUpdusrId(String lastUpdusrId) {
        this.lastUpdusrId = lastUpdusrId;
    }

    public String getOriginalFileNm() {
        return originalFileNm;
    }

    public void setOriginalFileNm(String originalFileNm) {
        this.originalFileNm = originalFileNm;
    }

    public String getStreFileNm() {
        return streFileNm;
    }

    public void setStreFileNm(String streFileNm) {
        this.streFileNm = streFileNm;
    }

    public String getServiceUrl() {
        return serviceUrl;
    }

    public void setServiceUrl(String serviceUrl) {
        this.serviceUrl = serviceUrl;
    }
    
	public String getServiceUrlLx() {
		return serviceUrlLx;
	}
	
	public void setServiceUrlLx(String serviceUrlLx) {
		this.serviceUrlLx = serviceUrlLx;
	}
	
    public String getBmCode() {
        return bmCode;
    }

    public void setBmCode(String bmCode) {
        this.bmCode = bmCode;
    }

    public String getBmCodeNm() {
        return bmCodeNm;
    }

    public void setBmCodeNm(String bmCodeNm) {
        this.bmCodeNm = bmCodeNm;
    }

    public String getBasicAt() {
        return basicAt;
    }

    public void setBasicAt(String basicAt) {
        this.basicAt = basicAt;
    }

    @Override
    public String toString() {
        return "MapServiceVO{" +
                "mapserviceId='" + mapserviceId + '\'' +
                ", serviceId='" + serviceId + '\'' +
                ", serviceNm='" + serviceNm + '\'' +
                ", serviceDc='" + serviceDc + '\'' +
                ", useAt='" + useAt + '\'' +
                ", serviceUrl='" + serviceUrl + '\'' +
                ", bmCode='" + bmCode + '\'' +
                ", bmCodeNm='" + bmCodeNm + '\'' +
                ", frstRegistDt=" + frstRegistDt +
                ", frstRegisterId='" + frstRegisterId + '\'' +
                ", lastModfDt=" + lastModfDt +
                ", lastUpdusrId='" + lastUpdusrId + '\'' +
                ", originalFileNm='" + originalFileNm + '\'' +
                ", streFileNm='" + streFileNm + '\'' +
                ", basicAt='" + basicAt + '\'' +
                '}';
    }
}
