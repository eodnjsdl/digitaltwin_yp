package egiskorea.com.job.fcmr.wsfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class WtlPipeLmVO implements Serializable{

	/** gid 아이디 */
	private int gid;
	
	/** ftr_cde 지형지물부호*/
	private String ftr_cde;
	private String ftr_cde_nm;
	
	/** ftr_idn 관리번호 */
	private String ftr_idn;
	
	/** hjd_cde 읍면동 */
	private String hjd_cde;
	private String hjd_cde_nm;
	
	/** mng_cde 관리기관 */
	private String mng_cde;
	private String mng_cde_nm;
	
	/** sht_num 도엽번호 */
	private String sht_num;
	
	/** ist_ymd 설치일자 */
	private String ist_ymd;
	
	/** saa_cde 관용도 */
	private String saa_cde;
	private String saa_cde_nm;
	
	/** mop_cde 관재질 */
	private String mop_cde;
	private String mop_cde_nm;

	/** std_dip 관경 */
	private String std_dip;
	
	/** byc_len 연장 */
	private String byc_len;
	
	/** jht_cde 접합종류 */
	private String jht_cde;
	private String jht_cde_nm;
	
	/** low_dep 최저깊이 */
	private String low_dep;
	
	/** hgh_dep 최고깊이 */
	private String hgh_dep;
	
	/** cnt_num 공사번호 */
	private String cnt_num;
	
	/** sys_chk 대장초기화여부 */
	private String sys_chk;

	/** pip_lbl 관라벨 */
	private String pip_lbl;
	
	/** iqt_cde 탐사구분 */
	private String iqt_cde;
	
	/** org_idn 기관관리번호 */
	private String org_idn;
	
	/** geom 공간정보 */
	private String geom;

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getFtr_cde() {
		return ftr_cde;
	}

	public void setFtr_cde(String ftr_cde) {
		this.ftr_cde = ftr_cde;
	}

	public String getFtr_cde_nm() {
		return ftr_cde_nm;
	}

	public void setFtr_cde_nm(String ftr_cde_nm) {
		this.ftr_cde_nm = ftr_cde_nm;
	}

	public String getFtr_idn() {
		return ftr_idn;
	}

	public void setFtr_idn(String ftr_idn) {
		this.ftr_idn = ftr_idn;
	}

	public String getHjd_cde() {
		return hjd_cde;
	}

	public void setHjd_cde(String hjd_cde) {
		this.hjd_cde = hjd_cde;
	}

	public String getHjd_cde_nm() {
		return hjd_cde_nm;
	}

	public void setHjd_cde_nm(String hjd_cde_nm) {
		this.hjd_cde_nm = hjd_cde_nm;
	}

	public String getMng_cde() {
		return mng_cde;
	}

	public void setMng_cde(String mng_cde) {
		this.mng_cde = mng_cde;
	}

	public String getMng_cde_nm() {
		return mng_cde_nm;
	}

	public void setMng_cde_nm(String mng_cde_nm) {
		this.mng_cde_nm = mng_cde_nm;
	}

	public String getSht_num() {
		return sht_num;
	}

	public void setSht_num(String sht_num) {
		this.sht_num = sht_num;
	}

	public String getIst_ymd() {
		return ist_ymd;
	}

	public void setIst_ymd(String ist_ymd) {
		this.ist_ymd = ist_ymd;
	}

	public String getSaa_cde() {
		return saa_cde;
	}

	public void setSaa_cde(String saa_cde) {
		this.saa_cde = saa_cde;
	}

	public String getSaa_cde_nm() {
		return saa_cde_nm;
	}

	public void setSaa_cde_nm(String saa_cde_nm) {
		this.saa_cde_nm = saa_cde_nm;
	}

	public String getmop_cde() {
		return mop_cde;
	}

	public void setmop_cde(String mop_cde) {
		this.mop_cde = mop_cde;
	}

	public String getmop_cde_nm() {
		return mop_cde_nm;
	}

	public void setmop_cde_nm(String mop_cde_nm) {
		this.mop_cde_nm = mop_cde_nm;
	}

	public String getStd_dip() {
		return std_dip;
	}

	public void setStd_dip(String std_dip) {
		this.std_dip = std_dip;
	}

	public String getByc_len() {
		return byc_len;
	}

	public void setByc_len(String byc_len) {
		this.byc_len = byc_len;
	}

	public String getJht_cde() {
		return jht_cde;
	}

	public void setJht_cde(String jht_cde) {
		this.jht_cde = jht_cde;
	}

	public String getJht_cde_nm() {
		return jht_cde_nm;
	}

	public void setJht_cde_nm(String jht_cde_nm) {
		this.jht_cde_nm = jht_cde_nm;
	}

	public String getLow_dep() {
		return low_dep;
	}

	public void setLow_dep(String low_dep) {
		this.low_dep = low_dep;
	}

	public String getHgh_dep() {
		return hgh_dep;
	}

	public void setHgh_dep(String hgh_dep) {
		this.hgh_dep = hgh_dep;
	}

	public String getCnt_num() {
		return cnt_num;
	}

	public void setCnt_num(String cnt_num) {
		this.cnt_num = cnt_num;
	}

	public String getSys_chk() {
		return sys_chk;
	}

	public void setSys_chk(String sys_chk) {
		this.sys_chk = sys_chk;
	}

	public String getPip_lbl() {
		return pip_lbl;
	}

	public void setPip_lbl(String pip_lbl) {
		this.pip_lbl = pip_lbl;
	}

	public String getIqt_cde() {
		return iqt_cde;
	}

	public void setIqt_cde(String iqt_cde) {
		this.iqt_cde = iqt_cde;
	}

	public String getOrg_idn() {
		return org_idn;
	}

	public void setOrg_idn(String org_idn) {
		this.org_idn = org_idn;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}
	
}
