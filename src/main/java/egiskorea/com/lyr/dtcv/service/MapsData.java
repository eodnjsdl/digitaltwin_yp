/**
 * 
 */
package egiskorea.com.lyr.dtcv.service;

import java.io.Serializable;

/**
 * @Description 맵데이터 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.01.26
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.26		이상화	최초 생성
 *  </pre>
 */

public class MapsData implements Serializable{

	private static final long serialVersionUID = -2182531990953512747L;
	
	/** 데이터 ID */
	private int dataid;
	
	/** 멤버 ID */
	private String mid;
	
	/** 데이터 그룹 ID */
	private int dgid;
	
	/** 워커 ID */
	private int cwid;
	
	/** csv 워커 ID */
	private int wcid;
	
	/** 첨부파일 ID */
	private String atchFileId;
	
	/** 데이터명 */
	private String dataName;
	
	/** 데이터 정렬 */
	private String dataDesc;
	
	/** 데이터 환경 */
	private String dataEnv;
	
	/** 데이터 종류 */
	private String dataType;
	
	/** 컨버트 여부 */
	private String isConverted;
	
	/** 하둡 URL */
	private String hdfsUrl;
	
	/** 하둡 경로 */
	private String hdfsPath;
	
	/** 프로그레스 URL */
	private String progressUrl;
	
	/** 프로그레스 경로 */
	private String progressPath;
	
	/** split 프로그레스 경로 */
	private String splitProgressPath;
	
	/** 데이터 경로 URL */
	private String datadirUrl;
	
	/** 정사영상 이미지 경로 */
	private String splitOutPath;
	
	/** 정사영상 이미지 txt 경로 */
	private String slitOutTxtPath;
	
	/** 서비스 데이터 경로 */
	private String metaOutPath;
	
	/** 서비승 데이터 컨버팅 URL */
	private String metaOutUrl;
	
	/** 서비스 데이터 컨버팅 완료 URL */
	private String metaOutWorkUrl;
	
	/** shape WMS URL */
	private String shpUrl;
	
	/** 3ds 가공 shp 경로 */
	private String shpPath;
	
	/** 좌표계 타입 */
	private String coordType;
	
	/** 컨버트 타입 */
	private String convertType;
	
	/** 썸네일 URL */
	private String thumbnailUrl;
	
	/** 썸네일 경로 */
	private String thumbnailPath;
	
	/** 다운로드 URL */
	private String downloadUrl;
	
	/** 카메라 이동 경도 */
	private double moveLon = 0;
	
	/** 카메라 이동 위도 */
	private double moveLat = 0;
	
	/** 카메라 이동 위도 */
	private double moveAlt;
	
	/** shp 레이어명 */
	private String shpLayerFullname;
	
	/** shp 데이터스토어명 */
	private String shpDataStoreName;
	
	/** shp 테이블명 */
	private String shpTableName;
	
	/** shp 속성 URL */
	private String shpInfoUrl;

	/** shp 데이터 타입 */
	private int shpDataType;
	
	/** shp 속성 높이 유무 */
	private String isShapeHeight;
	
	/** 파일 인코딩 데이터 */
	private String dataEncode;
	
	/** 레이어 최소 x 좌표 */
	private double minx;
	
	/** 레이어 최소 y 좌표 */
	private double miny;
	
	/** 레이어 바운더리 최소 z 값 */
	private double minz;
	
	/** 레이어 최대 x 좌표 */
	private double maxx;
	
	/** 레이어 최대 y 좌표 */
	private double maxy;
	
	/** 레이어 바운더리 최대 z 값 */
	private double maxz;
	
	/** 레이어 가로 길이 */
	private int width = 0;
	
	/** 레이어 세로 길이 */
	private int height = 0;
	
	/** 레이어 중심 좌표 x */
	private double centerX = 0.0;
	
	/** 레이어 중심 좌표 y */
	private double centerY = 0.0;
	
	/** 해상도 */
	private int resolution;
	
	/** 밴드 수 */
	private int bands = 0;
	
	/** csv db 테이블명 */
	private String csvLayerName;
	
	/** csv db 스키마명 */
	private String csvDbName;
	
	/** 좌표 x 컬럼 인덱스 */
	private int colX;
	
	/** 좌표 y 컬럼 인덱스 */
	private int colY;
	
	/** 라벨 컬럼 인덱스 */
	private int colLabel;
	
	/** 주소 컬럼 인덱스 */
	private int colAddress;
	
	/** 주소 타입 */
	private String addressType;
	
	/** 클러스터링 유무 */
	private String areaType;
	
	/** POI 종류 */
	private int poiType;
	
	/** POI 컬럼 인덱스 */
	private int poiIndex;
	
	/** POI 색상 */
	private String poiColor;
	
	/** 3ds shp 키 컬럼 */
	private String mlid;
	
	/** 3ds shp 텍스처 컬럼 */
	private String mltx;
	
	/** 데이터 가공 상태 */
	private int state;
	
	/** 데이터 파일 인코딩 */
	private String dataEncoding;
	
	/** 지오메트리 타입 */
	private String geometryType;
	
	/** 포인트클라우드 메타데이터 파일 경로 */
	private String rectInfoPath;
	
	/** 에러 메시지 */
	private String errorMessage;
	
	/** EPSG 코드 */
	private String coordEpsg;
	
	/** shp 타입 */
	private String shapeType;
	
	/** csv 포인트 색상 */
	private String pointColor;
	
	/** 포인트클라우드 높이 */
	private double pointAlt = 0;
	
	/** 포인트클라우드 사이즈 */
	private double pointSize = 2;
	
	/** 포인트클라우드 포인트 총 개수 */
	private int pointCount;
	
	/** 포인트클라우드 포인트 밀도 */
	private int pointIntense;
	
	/** gpx 트랙 색상 */
	private String trkColor;
	
	/** gpx 라우트 색상 */
	private String rteColor;
	
	/** 등록시간 */
	private String regDate;
	
	/** 최초등록자 ID */
	private String frstRegisterId;

	/** 최초등록시점 */
	private String frstRegistPnttm;

	/** 최종수정자 ID */
	private String lastUpdusrId;

	/** 최종수정시점 */
	private String lastUpdtPnttm;
	
	/******************/
	/** 카테고리 코드 */
	private String ctgrCd;

	public int getDataid() {
		return dataid;
	}

	public void setDataid(int dataid) {
		this.dataid = dataid;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public int getDgid() {
		return dgid;
	}

	public void setDgid(int dgid) {
		this.dgid = dgid;
	}

	public int getCwid() {
		return cwid;
	}

	public void setCwid(int cwid) {
		this.cwid = cwid;
	}

	public int getWcid() {
		return wcid;
	}

	public void setWcid(int wcid) {
		this.wcid = wcid;
	}

	public String getAtchFileId() {
		return atchFileId;
	}

	public void setAtchFileId(String atchFileId) {
		this.atchFileId = atchFileId;
	}

	public String getDataName() {
		return dataName;
	}

	public void setDataName(String dataName) {
		this.dataName = dataName;
	}

	public String getDataDesc() {
		return dataDesc;
	}

	public void setDataDesc(String dataDesc) {
		this.dataDesc = dataDesc;
	}

	public String getDataEnv() {
		return dataEnv;
	}

	public void setDataEnv(String dataEnv) {
		this.dataEnv = dataEnv;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public String getIsConverted() {
		return isConverted;
	}

	public void setIsConverted(String isConverted) {
		this.isConverted = isConverted;
	}

	public String getHdfsUrl() {
		return hdfsUrl;
	}

	public void setHdfsUrl(String hdfsUrl) {
		this.hdfsUrl = hdfsUrl;
	}

	public String getHdfsPath() {
		return hdfsPath;
	}

	public void setHdfsPath(String hdfsPath) {
		this.hdfsPath = hdfsPath;
	}

	public String getProgressUrl() {
		return progressUrl;
	}

	public void setProgressUrl(String progressUrl) {
		this.progressUrl = progressUrl;
	}

	public String getProgressPath() {
		return progressPath;
	}

	public void setProgressPath(String progressPath) {
		this.progressPath = progressPath;
	}

	public String getSplitProgressPath() {
		return splitProgressPath;
	}

	public void setSplitProgressPath(String splitProgressPath) {
		this.splitProgressPath = splitProgressPath;
	}

	public String getDatadirUrl() {
		return datadirUrl;
	}

	public void setDatadirUrl(String datadirUrl) {
		this.datadirUrl = datadirUrl;
	}

	public String getSplitOutPath() {
		return splitOutPath;
	}

	public void setSplitOutPath(String splitOutPath) {
		this.splitOutPath = splitOutPath;
	}

	public String getSlitOutTxtPath() {
		return slitOutTxtPath;
	}

	public void setSlitOutTxtPath(String slitOutTxtPath) {
		this.slitOutTxtPath = slitOutTxtPath;
	}

	public String getMetaOutPath() {
		return metaOutPath;
	}

	public void setMetaOutPath(String metaOutPath) {
		this.metaOutPath = metaOutPath;
	}

	public String getMetaOutUrl() {
		return metaOutUrl;
	}

	public void setMetaOutUrl(String metaOutUrl) {
		this.metaOutUrl = metaOutUrl;
	}

	public String getMetaOutWorkUrl() {
		return metaOutWorkUrl;
	}

	public void setMetaOutWorkUrl(String metaOutWorkUrl) {
		this.metaOutWorkUrl = metaOutWorkUrl;
	}

	public String getShpUrl() {
		return shpUrl;
	}

	public void setShpUrl(String shpUrl) {
		this.shpUrl = shpUrl;
	}

	public String getShpPath() {
		return shpPath;
	}

	public void setShpPath(String shpPath) {
		this.shpPath = shpPath;
	}

	public String getCoordType() {
		return coordType;
	}

	public void setCoordType(String coordType) {
		this.coordType = coordType;
	}

	public String getConvertType() {
		return convertType;
	}

	public void setConvertType(String convertType) {
		this.convertType = convertType;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public String getThumbnailPath() {
		return thumbnailPath;
	}

	public void setThumbnailPath(String thumbnailPath) {
		this.thumbnailPath = thumbnailPath;
	}

	public String getDownloadUrl() {
		return downloadUrl;
	}

	public void setDownloadUrl(String downloadUrl) {
		this.downloadUrl = downloadUrl;
	}

	public double getMoveLon() {
		return moveLon;
	}

	public void setMoveLon(double moveLon) {
		this.moveLon = moveLon;
	}

	public double getMoveLat() {
		return moveLat;
	}

	public void setMoveLat(double moveLat) {
		this.moveLat = moveLat;
	}

	public double getMoveAlt() {
		return moveAlt;
	}

	public void setMoveAlt(double moveAlt) {
		this.moveAlt = moveAlt;
	}

	public String getShpLayerFullname() {
		return shpLayerFullname;
	}

	public void setShpLayerFullname(String shpLayerFullname) {
		this.shpLayerFullname = shpLayerFullname;
	}

	public String getShpDataStoreName() {
		return shpDataStoreName;
	}

	public void setShpDataStoreName(String shpDataStoreName) {
		this.shpDataStoreName = shpDataStoreName;
	}

	public String getShpTableName() {
		return shpTableName;
	}

	public void setShpTableName(String shpTableName) {
		this.shpTableName = shpTableName;
	}

	public String getShpInfoUrl() {
		return shpInfoUrl;
	}

	public void setShpInfoUrl(String shpInfoUrl) {
		this.shpInfoUrl = shpInfoUrl;
	}

	public int getShpDataType() {
		return shpDataType;
	}

	public void setShpDataType(int shpDataType) {
		this.shpDataType = shpDataType;
	}

	public String getIsShapeHeight() {
		return isShapeHeight;
	}

	public void setIsShapeHeight(String isShapeHeight) {
		this.isShapeHeight = isShapeHeight;
	}

	public String getDataEncode() {
		return dataEncode;
	}

	public void setDataEncode(String dataEncode) {
		this.dataEncode = dataEncode;
	}

	public double getMinx() {
		return minx;
	}

	public void setMinx(double minx) {
		this.minx = minx;
	}

	public double getMiny() {
		return miny;
	}

	public void setMiny(double miny) {
		this.miny = miny;
	}

	public double getMinz() {
		return minz;
	}

	public void setMinz(double minz) {
		this.minz = minz;
	}

	public double getMaxx() {
		return maxx;
	}

	public void setMaxx(double maxx) {
		this.maxx = maxx;
	}

	public double getMaxy() {
		return maxy;
	}

	public void setMaxy(double maxy) {
		this.maxy = maxy;
	}

	public double getMaxz() {
		return maxz;
	}

	public void setMaxz(double maxz) {
		this.maxz = maxz;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public double getCenterX() {
		return centerX;
	}

	public void setCenterX(double centerX) {
		this.centerX = centerX;
	}

	public double getCenterY() {
		return centerY;
	}

	public void setCenterY(double centerY) {
		this.centerY = centerY;
	}

	public int getResolution() {
		return resolution;
	}

	public void setResolution(int resolution) {
		this.resolution = resolution;
	}

	public int getBands() {
		return bands;
	}

	public void setBands(int bands) {
		this.bands = bands;
	}

	public String getCsvLayerName() {
		return csvLayerName;
	}

	public void setCsvLayerName(String csvLayerName) {
		this.csvLayerName = csvLayerName;
	}

	public String getCsvDbName() {
		return csvDbName;
	}

	public void setCsvDbName(String csvDbName) {
		this.csvDbName = csvDbName;
	}

	public int getColX() {
		return colX;
	}

	public void setColX(int colX) {
		this.colX = colX;
	}

	public int getColY() {
		return colY;
	}

	public void setColY(int colY) {
		this.colY = colY;
	}

	public int getColLabel() {
		return colLabel;
	}

	public void setColLabel(int colLabel) {
		this.colLabel = colLabel;
	}

	public int getColAddress() {
		return colAddress;
	}

	public void setColAddress(int colAddress) {
		this.colAddress = colAddress;
	}

	public String getAddressType() {
		return addressType;
	}

	public void setAddressType(String addressType) {
		this.addressType = addressType;
	}

	public String getAreaType() {
		return areaType;
	}

	public void setAreaType(String areaType) {
		this.areaType = areaType;
	}

	public int getPoiType() {
		return poiType;
	}

	public void setPoiType(int poiType) {
		this.poiType = poiType;
	}

	public int getPoiIndex() {
		return poiIndex;
	}

	public void setPoiIndex(int poiIndex) {
		this.poiIndex = poiIndex;
	}

	public String getPoiColor() {
		return poiColor;
	}

	public void setPoiColor(String poiColor) {
		this.poiColor = poiColor;
	}

	public String getMlid() {
		return mlid;
	}

	public void setMlid(String mlid) {
		this.mlid = mlid;
	}

	public String getMltx() {
		return mltx;
	}

	public void setMltx(String mltx) {
		this.mltx = mltx;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getDataEncoding() {
		return dataEncoding;
	}

	public void setDataEncoding(String dataEncoding) {
		this.dataEncoding = dataEncoding;
	}

	public String getGeometryType() {
		return geometryType;
	}

	public void setGeometryType(String geometryType) {
		this.geometryType = geometryType;
	}

	public String getRectInfoPath() {
		return rectInfoPath;
	}

	public void setRectInfoPath(String rectInfoPath) {
		this.rectInfoPath = rectInfoPath;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getCoordEpsg() {
		return coordEpsg;
	}

	public void setCoordEpsg(String coordEpsg) {
		this.coordEpsg = coordEpsg;
	}

	public String getShapeType() {
		return shapeType;
	}

	public void setShapeType(String shapeType) {
		this.shapeType = shapeType;
	}

	public String getPointColor() {
		return pointColor;
	}

	public void setPointColor(String pointColor) {
		this.pointColor = pointColor;
	}

	public double getPointAlt() {
		return pointAlt;
	}

	public void setPointAlt(double pointAlt) {
		this.pointAlt = pointAlt;
	}

	public double getPointSize() {
		return pointSize;
	}

	public void setPointSize(double pointSize) {
		this.pointSize = pointSize;
	}

	public int getPointCount() {
		return pointCount;
	}

	public void setPointCount(int pointCount) {
		this.pointCount = pointCount;
	}

	public int getPointIntense() {
		return pointIntense;
	}

	public void setPointIntense(int pointIntense) {
		this.pointIntense = pointIntense;
	}

	public String getTrkColor() {
		return trkColor;
	}

	public void setTrkColor(String trkColor) {
		this.trkColor = trkColor;
	}

	public String getRteColor() {
		return rteColor;
	}

	public void setRteColor(String rteColor) {
		this.rteColor = rteColor;
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

	public String getCtgrCd() {
		return ctgrCd;
	}

	public void setCtgrCd(String ctgrCd) {
		this.ctgrCd = ctgrCd;
	}
}
