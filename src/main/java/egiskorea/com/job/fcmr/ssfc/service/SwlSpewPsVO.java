package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlSpewPsVO implements Serializable {

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
	
	/** 토구용도 */
	private String vmt_cde;
	private String vmt_cde_nm;
	
	/** 시설물형태 */
	private String for_cde;
	private String for_cde_nm;
	
	/** 원형토구내경 */
	private String spw_dip;
	
	/** 각형토구가로길이 */
	private String spw_hol;
	
	/** 각형토구세로길이 */
	private String spw_vel;
	
	/** 토구표고 */
	private String spw_hsl;
	
	/** 평균수위 */
	private String spw_wal;
	
	/** 세로길이 */
	private String riv_nam;
	
	/** 계획방류량 */
	private String spw_saf;
	
	/** 배수구역지형지물부호 */
	private String dra_cde;
	private String dra_cde_nm;
	
	/** 배수구역관리번호 */
	private String dra_idn;
	
	/** 처리구역지형지물부호 */
	private String dsp_cde;
	private String dsp_cde_nm;
	
	/** 처리구역관리번호 */
	private String dsp_idn;
	
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

	public String getVmt_cde() {
		return vmt_cde;
	}
	public void setVmt_cde(String vmt_cde) {
		this.vmt_cde = vmt_cde;
	}

	public String getVmt_cde_nm() {
		return vmt_cde_nm;
	}
	public void setVmt_cde_nm(String vmt_cde_nm) {
		this.vmt_cde_nm = vmt_cde_nm;
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

	public String getSpw_dip() {
		return spw_dip;
	}
	public void setSpw_dip(String spw_dip) {
		this.spw_dip = spw_dip;
	}

	public String getSpw_hol() {
		return spw_hol;
	}
	public void setSpw_hol(String spw_hol) {
		this.spw_hol = spw_hol;
	}

	public String getSpw_vel() {
		return spw_vel;
	}
	public void setSpw_vel(String spw_vel) {
		this.spw_vel = spw_vel;
	}

	public String getSpw_hsl() {
		return spw_hsl;
	}
	public void setSpw_hsl(String spw_hsl) {
		this.spw_hsl = spw_hsl;
	}

	public String getSpw_wal() {
		return spw_wal;
	}
	public void setSpw_wal(String spw_wal) {
		this.spw_wal = spw_wal;
	}

	public String getRiv_nam() {
		return riv_nam;
	}
	public void setRiv_nam(String riv_nam) {
		this.riv_nam = riv_nam;
	}
	
	public String getSpw_saf() {
		return spw_saf;
	}
	public void setSpw_saf(String spw_saf) {
		this.spw_saf = spw_saf;
	}

	public String getDra_cde() {
		return dra_cde;
	}
	public void setDra_cde(String dra_cde) {
		this.dra_cde = dra_cde;
	}

	public String getDra_cde_nm() {
		return dra_cde_nm;
	}
	public void setDra_cde_nm(String dra_cde_nm) {
		this.dra_cde_nm = dra_cde_nm;
	}

	public String getDra_idn() {
		return dra_idn;
	}
	public void setDra_idn(String dra_idn) {
		this.dra_idn = dra_idn;
	}

	public String getDsp_cde() {
		return dsp_cde;
	}
	public void setDsp_cde(String dsp_cde) {
		this.dsp_cde = dsp_cde;
	}

	public String getDsp_cde_nm() {
		return dsp_cde_nm;
	}
	public void setDsp_cde_nm(String dsp_cde_nm) {
		this.dsp_cde_nm = dsp_cde_nm;
	}

	public String getDsp_idn() {
		return dsp_idn;
	}
	public void setDsp_idn(String dsp_idn) {
		this.dsp_idn = dsp_idn;
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
