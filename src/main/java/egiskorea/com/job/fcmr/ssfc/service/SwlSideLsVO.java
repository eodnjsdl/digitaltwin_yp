package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlSideLsVO implements Serializable {

	/** GID */
	private int gid;
	
	/** 지형지물부호 */
	private String ftr_cde;
	private String ftr_cde_nm;
	
	/** 관리번호 */
	private String ftr_idn;
	
	/** 읍면동 */
	private String hjd_cde;
	private String hjd_cde_nm;
	
	/** 관리기관 */
	private String mng_cde;
	private String mng_cde_nm;
	
	/** 도엽번호 */
	private String sht_num;
	
	/** 설치일자 */
	private String ist_ymd;
	
	/** 촉구구분 */
	private String aeg_cde;
	private String aeg_cde_nm;
	
	/** 연장 */
	private String byc_len;
	
	/** 가로길이 */
	private String std_hol;
	
	/** 세로길이 */
	private String std_vel;
	
	/** 차선통로수 */
	private String sph_lin;
	
	/** 관재질 */
	private String mop_cde;
	private String mop_cde_nm;
	
	/** 공사번호 */
	private String cnt_num;
	
	/** 대장초기화여부 */
	private String sys_chk;

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

	public String getAeg_cde() {
		return aeg_cde;
	}
	public void setAeg_cde(String aeg_cde) {
		this.aeg_cde = aeg_cde;
	}

	public String getAeg_cde_nm() {
		return aeg_cde_nm;
	}
	public void setAeg_cde_nm(String aeg_cde_nm) {
		this.aeg_cde_nm = aeg_cde_nm;
	}

	public String getByc_len() {
		return byc_len;
	}
	public void setByc_len(String byc_len) {
		this.byc_len = byc_len;
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

	public String getSph_lin() {
		return sph_lin;
	}
	public void setSph_lin(String sph_lin) {
		this.sph_lin = sph_lin;
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
}
