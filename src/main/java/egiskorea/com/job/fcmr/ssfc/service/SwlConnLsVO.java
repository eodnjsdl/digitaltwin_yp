package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlConnLsVO implements Serializable{
	
	/** gid 아이디 */
	private int gid;
	
	/** ftr_cde 지형지물부호*/
	private String ftr_cde;
	private String ftr_cde_nm;
	
	/** ftr_cde 관리번호*/
	private String ftr_idn;
	
	/** hjd_cde 읍면동*/
	private String hjd_cde;
	private String hjd_cde_nm;

	/** mng_cde 관리기관*/
	private String mng_cde;
	private String mng_cde_nm;
	
	/** sht_num 도엽번호*/
	private String sht_num;
	
	/** ist_ymd 설치일자*/
	private String ist_ymd;
	
	/** sba_cde 하수관용도*/
	private String sba_cde;
	private String sba_cde_nm;
	
	/** mop_cde 관재질*/
	private String mop_cde;
	private String mop_cde_nm;
	
	/** for_cde 시설물형태*/
	private String for_cde;
	private String for_cde_nm;
	
	/** std_dip 관경*/
	private String std_dip;

	/** std_hol 가로길이*/
	private String std_hol;
	
	/** std_vel 세로길이*/
	private String std_vel;
	
	/** byc_len 연장*/
	private String byc_len;
	
	/** sph_lin 차선통로수*/
	private String sph_lin;
	
	/** cnt_num 공사번호*/
	private String cnt_num;
	
	/** sys_chk 대장초기화여부*/
	private String sys_chk;
	
	/** pip_lbl 관라벨*/
	private String pip_lbl;

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

	public String getSba_cde() {
		return sba_cde;
	}

	public void setSba_cde(String sba_cde) {
		this.sba_cde = sba_cde;
	}

	public String getSba_cde_nm() {
		return sba_cde_nm;
	}

	public void setSba_cde_nm(String sba_cde_nm) {
		this.sba_cde_nm = sba_cde_nm;
	}

	public String getMop_cde() {
		return mop_cde;
	}

	public void setMop_cde(String mop_cde) {
		this.mop_cde = mop_cde;
	}

	public String getMop_cde_nm() {
		return mop_cde_nm;
	}

	public void setMop_cde_nm(String mop_cde_nm) {
		this.mop_cde_nm = mop_cde_nm;
	}

	public String getFor_cde() {
		return for_cde;
	}

	public void setFor_cde(String for_cde) {
		this.for_cde = for_cde;
	}

	public String getFor_cde_nm() {
		return for_cde_nm;
	}

	public void setFor_cde_nm(String for_cde_nm) {
		this.for_cde_nm = for_cde_nm;
	}

	public String getStd_dip() {
		return std_dip;
	}

	public void setStd_dip(String std_dip) {
		this.std_dip = std_dip;
	}

	public String getStd_hol() {
		return std_hol;
	}

	public void setStd_hol(String std_hol) {
		this.std_hol = std_hol;
	}

	public String getStd_vel() {
		return std_vel;
	}

	public void setStd_vel(String std_vel) {
		this.std_vel = std_vel;
	}

	public String getByc_len() {
		return byc_len;
	}

	public void setByc_len(String byc_len) {
		this.byc_len = byc_len;
	}

	public String getSph_lin() {
		return sph_lin;
	}

	public void setSph_lin(String sph_lin) {
		this.sph_lin = sph_lin;
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
	
}
