package egiskorea.com.lyr.lym.service;

import java.io.Serializable;

import egovframework.com.cmm.ComDefaultVO;

/**
 * @Description 레이어 관리 vo 클래스
 * @author 플랫폼개발부문 DT솔루션 김선옥
 * @since 2021.12.21
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.12.21   김선옥           최초 생성
 *  </pre>
 */

public class LayerManagementVO extends ComDefaultVO implements Serializable{

	private static final long serialVersionUID = 2854033228929138611L;
	
	/** 데이터 ID */
	private int dataid = 0;
	/** 데이터명 */
	private String dataName = "";
	/** 데이터 유형(T : 지형, I : 영상, F : 시설물, S : Shape, L : LOD MODEL, D : 3DS, O: Object, C : CSV) */
	private String dataType = "";
	/** SHP 유형 (1 : LINESTRING, 2 : POLYGON, 3 : POINT, 4 : MULTIPOINT, 5 : MULTILINESTRING, 6 : MULTIPOLYGON, 7 : GEOMETRYCOLLECTION)*/
	private String shpDataType = "";
	/** 사용자 ID */
	private String mid = "";
	/** 공유여부 */
	private String shareYn = "";
	/** 그릅 ID */
	private String groupId = "";
	/** 부서 ID */
	private String orgnztId = ""; 
	/** 레이어 ID 리스트  */
	private String layerIds = "";
	/** SHP 저장소 */
	private String shpDataStoreName = "";
	/** SHP 테이블명 */
	private String shpTableName = "";
	/** 레이어 분류코드 */
	private String lyrCl = "";
	/** 레이어 분류명 */
	private String lyrClNm = "";
	/** 레이어 사용자 ID */
	private String emplyrId = "";
	/** 모드 */
	private String mode = "";
	/** 데이터 설명 */
	private String dataDesc = "";
	
	public int getDataid() {
		return dataid;
	}
	public void setDataid(int dataid) {
		this.dataid = dataid;
	}
	public String getDataName() {
		return dataName;
	}
	public void setDataName(String dataName) {
		this.dataName = dataName;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public String getShpDataType() {
		return shpDataType;
	}
	public void setShpDataType(String shpDataType) {
		this.shpDataType = shpDataType;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
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
	public String getLayerIds() {
		return layerIds;
	}
	public void setLayerIds(String layerIds) {
		this.layerIds = layerIds;
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
	public String getLyrCl() {
		return lyrCl;
	}
	public void setLyrCl(String lyrCl) {
		this.lyrCl = lyrCl;
	}
	public String getLyrClNm() {
		return lyrClNm;
	}
	public void setLyrClNm(String lyrClNm) {
		this.lyrClNm = lyrClNm;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getEmplyrId() {
		return emplyrId;
	}
	public void setEmplyrId(String emplyrId) {
		this.emplyrId = emplyrId;
	}
	public String getDataDesc() {
		return dataDesc;
	}
	public void setDataDesc(String dataDesc) {
		this.dataDesc = dataDesc;
	}
	
	
}

