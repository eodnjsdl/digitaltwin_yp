package egiskorea.com.job.tran.brin.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class ThrghSttnVO implements Serializable {

	/** 노선아이디 */
	private String route_id;
	/** 정류소아이디 */
	private String sttn_id;
	/** 정류소순번 */
	private String sttn_sn;
	/** 정류소명 */
	private String sttn_nm;
	/** 정류소번호 */
	private String sttn_no;
	/** 지역명 */
	private String area_nm;
	/** 관할코드 */
	private String cmptnc_cd;
	/** 중앙차로여부 */
	private String centr_cartrk_at;
	/** 회차여부 */
	private String turn_at;
	/** X좌표 */
	private String x_crdnt;
	/** Y좌표 */
	private String y_crdnt;
	
	public String getRoute_id() {
		return route_id;
	}
	public void setRoute_id(String route_id) {
		this.route_id = route_id;
	}
	public String getSttn_id() {
		return sttn_id;
	}
	public void setSttn_id(String sttn_id) {
		this.sttn_id = sttn_id;
	}
	public String getSttn_sn() {
		return sttn_sn;
	}
	public void setSttn_sn(String sttn_sn) {
		this.sttn_sn = sttn_sn;
	}
	public String getSttn_nm() {
		return sttn_nm;
	}
	public void setSttn_nm(String sttn_nm) {
		this.sttn_nm = sttn_nm;
	}
	public String getSttn_no() {
		return sttn_no;
	}
	public void setSttn_no(String sttn_no) {
		this.sttn_no = sttn_no;
	}
	public String getArea_nm() {
		return area_nm;
	}
	public void setArea_nm(String area_nm) {
		this.area_nm = area_nm;
	}
	public String getCmptnc_cd() {
		return cmptnc_cd;
	}
	public void setCmptnc_cd(String cmptnc_cd) {
		this.cmptnc_cd = cmptnc_cd;
	}
	public String getCentr_cartrk_at() {
		return centr_cartrk_at;
	}
	public void setCentr_cartrk_at(String centr_cartrk_at) {
		this.centr_cartrk_at = centr_cartrk_at;
	}
	public String getTurn_at() {
		return turn_at;
	}
	public void setTurn_at(String turn_at) {
		this.turn_at = turn_at;
	}
	public String getX_crdnt() {
		return x_crdnt;
	}
	public void setX_crdnt(String x_crdnt) {
		this.x_crdnt = x_crdnt;
	}
	public String getY_crdnt() {
		return y_crdnt;
	}
	public void setY_crdnt(String y_crdnt) {
		this.y_crdnt = y_crdnt;
	}
}
