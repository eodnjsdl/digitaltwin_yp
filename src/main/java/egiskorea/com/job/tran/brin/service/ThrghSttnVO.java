package egiskorea.com.job.tran.brin.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ThrghSttnVO implements Serializable {

	/** 노선아이디 */
	private String routeId;
	/** 정류소아이디 */
	private String sttnId;
	/** 정류소순번 */
	private String sttnSn;
	/** 정류소명 */
	private String sttnNm;
	/** 정류소번호 */
	private String sttnNo;
	/** 지역명 */
	private String areaNm;
	/** 관할코드 */
	private String cmptncCd;
	/** 중앙차로여부 */
	private String centrCartrkAt;
	/** 회차여부 */
	private String turnAt;
	/** X좌표 */
	private String xCrdnt;
	/** Y좌표 */
	private String yCrdnt;
	
	public String getRouteId() {
		return routeId;
	}
	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}
	public String getSttnId() {
		return sttnId;
	}
	public void setSttnId(String sttnId) {
		this.sttnId = sttnId;
	}
	public String getSttnSn() {
		return sttnSn;
	}
	public void setSttnSn(String sttnSn) {
		this.sttnSn = sttnSn;
	}
	public String getSttnNm() {
		return sttnNm;
	}
	public void setSttnNm(String sttnNm) {
		this.sttnNm = sttnNm;
	}
	public String getSttnNo() {
		return sttnNo;
	}
	public void setSttnNo(String sttnNo) {
		this.sttnNo = sttnNo;
	}
	public String getAreaNm() {
		return areaNm;
	}
	public void setAreaNm(String areaNm) {
		this.areaNm = areaNm;
	}
	public String getCmptncCd() {
		return cmptncCd;
	}
	public void setCmptncCd(String cmptncCd) {
		this.cmptncCd = cmptncCd;
	}
	public String getCentrCartrkAt() {
		return centrCartrkAt;
	}
	public void setCentrCartrkAt(String centrCartrkAt) {
		this.centrCartrkAt = centrCartrkAt;
	}
	public String getTurnAt() {
		return turnAt;
	}
	public void setTurnAt(String turnAt) {
		this.turnAt = turnAt;
	}
	public String getxCrdnt() {
		return xCrdnt;
	}
	public void setxCrdnt(String xCrdnt) {
		this.xCrdnt = xCrdnt;
	}
	public String getyCrdnt() {
		return yCrdnt;
	}
	public void setyCrdnt(String yCrdnt) {
		this.yCrdnt = yCrdnt;
	}
}
