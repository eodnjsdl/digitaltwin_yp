package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlSpotPsVO implements Serializable {

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
	
	/** 최종준설일자 */
	private String ecn_ymd;
	
	/** 물받이용도 */
	private String sbd_cde;
	private String sbd_cde_nm;
	
	/** 시설물형태 */
	private String for_cde;
	private String for_cde_nm;
	
	/** 원형물받이내경 */
	private String spt_dip;
	
	/** 각형물받이가로길이 */
	private String spt_hol;
	
	/** 각형물받이세로길이 */
	private String spt_vel;
	
	/** 평균수위 */
	private String spt_dep;
	
	/** 물받이뚜껑형태 */
	private String cov_cde;
	private String cov_cde_nm;
	
	/** 관재질 */
	private String mop_cde;
	private String mop_cde_nm;
	
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

	public String getEcn_ymd() {
		return ecn_ymd;
	}
	public void setEcn_ymd(String ecn_ymd) {
		this.ecn_ymd = ecn_ymd;
	}

	public String getSbd_cde() {
		return sbd_cde;
	}
	public void setSbd_cde(String sbd_cde) {
		this.sbd_cde = sbd_cde;
	}

	public String getSbd_cde_nm() {
		return sbd_cde_nm;
	}
	public void setSbd_cde_nm(String sbd_cde_nm) {
		this.sbd_cde_nm = sbd_cde_nm;
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

	public String getSpt_dip() {
		return spt_dip;
	}
	public void setSpt_dip(String spt_dip) {
		this.spt_dip = spt_dip;
	}

	public String getSpt_hol() {
		return spt_hol;
	}
	public void setSpt_hol(String spt_hol) {
		this.spt_hol = spt_hol;
	}

	public String getSpt_vel() {
		return spt_vel;
	}
	public void setSpt_vel(String spt_vel) {
		this.spt_vel = spt_vel;
	}

	public String getSpt_dep() {
		return spt_dep;
	}
	public void setSpt_dep(String spt_dep) {
		this.spt_dep = spt_dep;
	}

	public String getCov_cde() {
		return cov_cde;
	}
	public void setCov_cde(String cov_cde) {
		this.cov_cde = cov_cde;
	}

	public String getCov_cde_nm() {
		return cov_cde_nm;
	}
	public void setCov_cde_nm(String cov_cde_nm) {
		this.cov_cde_nm = cov_cde_nm;
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

	public String getAng_dir() {
		return ang_dir;
	}
	public void setAng_dir(String ang_dir) {
		this.ang_dir = ang_dir;
	}
}
