package egiskorea.com.geo.lgsr.service;

import java.io.Serializable;

/**
 * @Description 지적을 관리하는 vo 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2021.11.10
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2021.11.10   이상화           최초 생성
 *  </pre>
 */

public class LandRegisterVO implements Serializable{

	private static final long serialVersionUID = -4496941646100937747L;
	
	/** 행정구역코드 */
	private String pnu = "";
	
	/** 위도 좌표 */
	private String lat;
	
	/** 경도 좌표 */
	private String lon;
	
	/** 원지목 */
	private String ori;
	
	/** geometry */
	private String geometry;
	
	/** mode */
	private String mode;
	
	/** 넓이 */
	private String area;
	
	/** 좌표계 */
	private String crs;

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getOri() {
		return ori;
	}

	public void setOri(String ori) {
		this.ori = ori;
	}

	public String getGeometry() {
		return geometry;
	}

	public void setGeometry(String geometry) {
		this.geometry = geometry;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCrs() {
		return crs;
	}

	public void setCrs(String crs) {
		this.crs = crs;
	}

}
