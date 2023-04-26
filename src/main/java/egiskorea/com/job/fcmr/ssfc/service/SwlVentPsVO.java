package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlVentPsVO implements Serializable {
	
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
	
	/** 도엽번호 */
	private String sht_num;
	
	/** 관리기관 */
	private String mng_cde;
	private String mng_cde_nm;
	
	/** 설치일자 */
	private String ist_ymd;
	
	/** 환기구구경 */
	private String vnt_dip;
	
	/** 관재질 */
	private String mop_cde;
	private String mop_cde_nm;
	
	/** 흡출기형식 */
	private String mof_cde;
	private String mof_cde_nm;
	
	/** 흡출기재질 */
	private String hmp_cde;
	private String hmp_cde_nm;
	
	/** 공사번호 */
	private String cnt_num;
	
	/** 대장초기화여부 */
	private String sys_chk;
	
	/** 방향각 */
	private String ang_dir;

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

	public String getSht_num() {
		return sht_num;
	}
	public void setSht_num(String sht_num) {
		this.sht_num = sht_num;
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
	
	public String getIst_ymd() {
		return ist_ymd;
	}
	public void setIst_ymd(String ist_ymd) {
		this.ist_ymd = ist_ymd;
	}

	public String getVnt_dip() {
		return vnt_dip;
	}
	public void setVnt_dip(String vnt_dip) {
		this.vnt_dip = vnt_dip;
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

	public String getMof_cde() {
		return mof_cde;
	}
	public void setMof_cde(String mof_cde) {
		this.mof_cde = mof_cde;
	}

	public String getMof_cde_nm() {
		return mof_cde_nm;
	}
	public void setMof_cde_nm(String mof_cde_nm) {
		this.mof_cde_nm = mof_cde_nm;
	}

	public String getHmp_cde() {
		return hmp_cde;
	}
	public void setHmp_cde(String hmp_cde) {
		this.hmp_cde = hmp_cde;
	}

	public String getHmp_cde_nm() {
		return hmp_cde_nm;
	}
	public void setHmp_cde_nm(String hmp_cde_nm) {
		this.hmp_cde_nm = hmp_cde_nm;
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

	public String getAng_dir() {
		return ang_dir;
	}
	public void setAng_dir(String ang_dir) {
		this.ang_dir = ang_dir;
	}
}
