/**
 * 
 */
package egiskorea.com.lyr.dtcv.service;

import java.io.Serializable;

/**
 * @Description csv 데이터 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.02.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.07		이름기입	최초 생성
 *  </pre>
 */

public class WorkerCsvItem implements Serializable{
	
	private static final long serialVersionUID = -2767495566919695055L;
	
	/** 컨버터워커 ID */
	private int wcid;
	
	/** 사용자 ID */
	private String mid;
	
	/** 데이터 ID */
	private int dataid;
	
	/** 첨부파일 ID */
	private String atchFileId;
	
	/** 컨버트 데이터베이스명 */
	private String dbName;
	
	/** 컨버트 테이블명 */
	private String tblName;
	
	/** csv 파일 경로 */
	private String csvPath;
	
	/** shp 파일 경로 */
	private String shpPath;
	
	/** 가공 완료 경로 */
	private String outputPath;
	
	/** 지오코딩 유무 */
	private String isTwoColumn;
	
	/** 프로그래스 경로 */
	private String progressPath;
	
	/** 프로그래스 URL */
	private String progressUrl;
	
	/** 주소 인덱스 */
	private int addressIndex;
	
	/** 라벨 타이틀 인덱스 */
	private int titleIndex;
	
	/** 경도 인덱스 */
	private int lonIndex;
	
	/** 위도 인덱스 */
	private int latIndex;
	
	/** 주소 타입 */
	private String addrType;
	
	/** POI 타입 */
	private String poiType;
	
	/** POI 인덱스 */
	private String poiIndex;
	
	/** POI 색상 */
	private String poiColor;
	
	/** SHP 변환 유무 */
	private String shpType;
	
	/** 좌표계 EPSG 코드 */
	private int srsCode;
	
	/** 클러스터링 유무 */
	private String areaType;
	
	/** 인코딩 */
	private String encoding;
	
	/** 프로그레스 인덱스 */
	private int pid;
	
	/** 컨버팅 상태 */
	private String status;
	
	/** 컨버팅 시작 시간 */
	private String startDate;
	
	/** 컨버팅 완료 시간 */
	private String completeDate;
	
	/** 에러 발생 시간 */
	private String errorDate;
	
	/** 에러 메시지 */
	private String errorMessage;
	
	/** 등록 날짜 */
	private String regDate;	

	/** 최초등록자 ID */
	private String frstRegisterId;

	/** 최초등록시점 */
	private String frstRegistPnttm;

	/** 최종수정자 ID */
	private String lastUpdusrId;

	/** 최종수정시점 */
	private String lastUpdtPnttm;

	public int getWcid() {
		return wcid;
	}

	public void setWcid(int wcid) {
		this.wcid = wcid;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public int getDataid() {
		return dataid;
	}

	public void setDataid(int dataid) {
		this.dataid = dataid;
	}

	public String getAtchFileId() {
		return atchFileId;
	}

	public void setAtchFileId(String atchFileId) {
		this.atchFileId = atchFileId;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getTblName() {
		return tblName;
	}

	public void setTblName(String tblName) {
		this.tblName = tblName;
	}

	public String getCsvPath() {
		return csvPath;
	}

	public void setCsvPath(String csvPath) {
		this.csvPath = csvPath;
	}

	public String getShpPath() {
		return shpPath;
	}

	public void setShpPath(String shpPath) {
		this.shpPath = shpPath;
	}

	public String getOutputPath() {
		return outputPath;
	}

	public void setOutputPath(String outputPath) {
		this.outputPath = outputPath;
	}

	public String getIsTwoColumn() {
		return isTwoColumn;
	}

	public void setIsTwoColumn(String isTwoColumn) {
		this.isTwoColumn = isTwoColumn;
	}

	public String getProgressPath() {
		return progressPath;
	}

	public void setProgressPath(String progressPath) {
		this.progressPath = progressPath;
	}

	public String getProgressUrl() {
		return progressUrl;
	}

	public void setProgressUrl(String progressUrl) {
		this.progressUrl = progressUrl;
	}

	public int getAddressIndex() {
		return addressIndex;
	}

	public void setAddressIndex(int addressIndex) {
		this.addressIndex = addressIndex;
	}

	public int getTitleIndex() {
		return titleIndex;
	}

	public void setTitleIndex(int titleIndex) {
		this.titleIndex = titleIndex;
	}

	public int getLonIndex() {
		return lonIndex;
	}

	public void setLonIndex(int lonIndex) {
		this.lonIndex = lonIndex;
	}

	public int getLatIndex() {
		return latIndex;
	}

	public void setLatIndex(int latIndex) {
		this.latIndex = latIndex;
	}

	public String getAddrType() {
		return addrType;
	}

	public void setAddrType(String addrType) {
		this.addrType = addrType;
	}

	public String getPoiType() {
		return poiType;
	}

	public void setPoiType(String poiType) {
		this.poiType = poiType;
	}

	public String getPoiIndex() {
		return poiIndex;
	}

	public void setPoiIndex(String poiIndex) {
		this.poiIndex = poiIndex;
	}

	public String getPoiColor() {
		return poiColor;
	}

	public void setPoiColor(String poiColor) {
		this.poiColor = poiColor;
	}

	public String getShpType() {
		return shpType;
	}

	public void setShpType(String shpType) {
		this.shpType = shpType;
	}

	public int getSrsCode() {
		return srsCode;
	}

	public void setSrsCode(int srsCode) {
		this.srsCode = srsCode;
	}

	public String getAreaType() {
		return areaType;
	}

	public void setAreaType(String areaType) {
		this.areaType = areaType;
	}

	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getCompleteDate() {
		return completeDate;
	}

	public void setCompleteDate(String completeDate) {
		this.completeDate = completeDate;
	}

	public String getErrorDate() {
		return errorDate;
	}

	public void setErrorDate(String errorDate) {
		this.errorDate = errorDate;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getFrstRegistPnttm() {
		return frstRegistPnttm;
	}

	public void setFrstRegistPnttm(String frstRegistPnttm) {
		this.frstRegistPnttm = frstRegistPnttm;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public String getLastUpdtPnttm() {
		return lastUpdtPnttm;
	}

	public void setLastUpdtPnttm(String lastUpdtPnttm) {
		this.lastUpdtPnttm = lastUpdtPnttm;
	}

	
}
