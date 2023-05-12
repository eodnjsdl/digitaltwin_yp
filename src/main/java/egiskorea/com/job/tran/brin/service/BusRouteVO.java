package egiskorea.com.job.tran.brin.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class BusRouteVO implements Serializable {

	/** GID */
	//private int gid;
	
	/** 노선아이디 */
	private String route_id;
	/** 노선번호 */
	private String route_nm;
	/** 노선유형 */
	private String route_ty;
	/** 노선유형명 */
	private String route_ty_nm;
	/** 기점정류소아이디 */
	private String cdpnt_sttn_id;
	/** 기점정류소명 */
	private String cdpnt_sttn_nm;
	/** 기점정류소번호 */
	private String cdpnt_sttn_no;
	/** 종점정류소아이디 */
	private String tmnl_sttn_id;
	/** 종점정류소명 */
	private String tmnl_sttn_nm;
	/** 종점정류소번호 */
	private String tmnl_sttn_no;
	/** 지역명 */
	private String area_nm;
	/** 관할코드 */
	private String cmptnc_cd;
	/** 기점첫차시간 */
	private String cdpnt_fircar_time;
	/** 기점막차시간 */
	private String cdpnt_ltcar_time;
	/** 종점첫차시간 */
	private String tmnl_fircar_time;
	/** 종점막차시간 */
	private String tmnl_ltcar_time;
	/** 최소배차시간 */
	private String mumm_caralc_time;
	/** 최대배차시간 */
	private String mxmm_caralc_time;
	/** 업체아이디 */
	private String entrps_id;
	/** 업체명 */
	private String entrps_nm;
	/** 업체전화번호 */
	private String entrps_telno;
	
	public String getRoute_id() {
		return route_id;
	}
	public void setRoute_id(String route_id) {
		this.route_id = route_id;
	}
	public String getRoute_nm() {
		return route_nm;
	}
	public void setRoute_nm(String route_nm) {
		this.route_nm = route_nm;
	}
	public String getRoute_ty() {
		return route_ty;
	}
	public void setRoute_ty(String route_ty) {
		this.route_ty = route_ty;
	}
	public String getRoute_ty_nm() {
		return route_ty_nm;
	}
	public void setRoute_ty_nm(String route_ty_nm) {
		this.route_ty_nm = route_ty_nm;
	}
	public String getCdpnt_sttn_id() {
		return cdpnt_sttn_id;
	}
	public void setCdpnt_sttn_id(String cdpnt_sttn_id) {
		this.cdpnt_sttn_id = cdpnt_sttn_id;
	}
	public String getCdpnt_sttn_nm() {
		return cdpnt_sttn_nm;
	}
	public void setCdpnt_sttn_nm(String cdpnt_sttn_nm) {
		this.cdpnt_sttn_nm = cdpnt_sttn_nm;
	}
	public String getCdpnt_sttn_no() {
		return cdpnt_sttn_no;
	}
	public void setCdpnt_sttn_no(String cdpnt_sttn_no) {
		this.cdpnt_sttn_no = cdpnt_sttn_no;
	}
	public String getTmnl_sttn_id() {
		return tmnl_sttn_id;
	}
	public void setTmnl_sttn_id(String tmnl_sttn_id) {
		this.tmnl_sttn_id = tmnl_sttn_id;
	}
	public String getTmnl_sttn_nm() {
		return tmnl_sttn_nm;
	}
	public void setTmnl_sttn_nm(String tmnl_sttn_nm) {
		this.tmnl_sttn_nm = tmnl_sttn_nm;
	}
	public String getTmnl_sttn_no() {
		return tmnl_sttn_no;
	}
	public void setTmnl_sttn_no(String tmnl_sttn_no) {
		this.tmnl_sttn_no = tmnl_sttn_no;
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
	public String getCdpnt_fircar_time() {
		return cdpnt_fircar_time;
	}
	public void setCdpnt_fircar_time(String cdpnt_fircar_time) {
		this.cdpnt_fircar_time = cdpnt_fircar_time;
	}
	public String getCdpnt_ltcar_time() {
		return cdpnt_ltcar_time;
	}
	public void setCdpnt_ltcar_time(String cdpnt_ltcar_time) {
		this.cdpnt_ltcar_time = cdpnt_ltcar_time;
	}
	public String getTmnl_fircar_time() {
		return tmnl_fircar_time;
	}
	public void setTmnl_fircar_time(String tmnl_fircar_time) {
		this.tmnl_fircar_time = tmnl_fircar_time;
	}
	public String getTmnl_ltcar_time() {
		return tmnl_ltcar_time;
	}
	public void setTmnl_ltcar_time(String tmnl_ltcar_time) {
		this.tmnl_ltcar_time = tmnl_ltcar_time;
	}
	public String getMumm_caralc_time() {
		return mumm_caralc_time;
	}
	public void setMumm_caralc_time(String mumm_caralc_time) {
		this.mumm_caralc_time = mumm_caralc_time;
	}
	public String getMxmm_caralc_time() {
		return mxmm_caralc_time;
	}
	public void setMxmm_caralc_time(String mxmm_caralc_time) {
		this.mxmm_caralc_time = mxmm_caralc_time;
	}
	public String getEntrps_id() {
		return entrps_id;
	}
	public void setEntrps_id(String entrps_id) {
		this.entrps_id = entrps_id;
	}
	public String getEntrps_nm() {
		return entrps_nm;
	}
	public void setEntrps_nm(String entrps_nm) {
		this.entrps_nm = entrps_nm;
	}
	public String getEntrps_telno() {
		return entrps_telno;
	}
	public void setEntrps_telno(String entrps_telno) {
		this.entrps_telno = entrps_telno;
	}
}
