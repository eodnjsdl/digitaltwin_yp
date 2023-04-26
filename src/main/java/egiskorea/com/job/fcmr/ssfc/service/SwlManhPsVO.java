package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlManhPsVO implements Serializable {

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
	
	/** 하수맨홀용도 */
	private String smu_cde;
	private String smu_cde_nm;
	
	/** 시설물형태 */
	private String for_cde;
	private String for_cde_nm;
	
	/** 맨홀종류 */
	private String som_cde;
	private String som_cde_nm;
	
	/** 하수맨홀구경 */
	private String man_dip;
	
	/** 하수맨홀가로 */
	private String man_hol;
	
	/** 하수맨홀세로 */
	private String man_vel;
	
	/** 뚜껑재질 */
	private String sbc_cde;
	private String sbc_cde_nm;
	
	/** 인버트유무 */
	private String ivt_cde;
	private String ivt_cde_nm;
	
	/** 사다리설치유무 */
	private String lad_cde;
	private String lad_cde_nm;
	
	/** 하수맨홀고도 */
	private String mos_hsl;
	
	/** 하수맨홀저고 */
	private String lms_hsl;
	
	/** 이상상태 */
	private String cst_cde;
	private String cst_cde_nm;
	
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

	public String getSmu_cde() {
		return smu_cde;
	}
	public void setSmu_cde(String smu_cde) {
		this.smu_cde = smu_cde;
	}

	public String getSmu_cde_nm() {
		return smu_cde_nm;
	}
	public void setSmu_cde_nm(String smu_cde_nm) {
		this.smu_cde_nm = smu_cde_nm;
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

	public String getSom_cde() {
		return som_cde;
	}
	public void setSom_cde(String som_cde) {
		this.som_cde = som_cde;
	}

	public String getSom_cde_nm() {
		return som_cde_nm;
	}
	public void setSom_cde_nm(String som_cde_nm) {
		this.som_cde_nm = som_cde_nm;
	}

	public String getMan_dip() {
		return man_dip;
	}
	public void setMan_dip(String man_dip) {
		this.man_dip = man_dip;
	}

	public String getMan_hol() {
		return man_hol;
	}
	public void setMan_hol(String man_hol) {
		this.man_hol = man_hol;
	}

	public String getMan_vel() {
		return man_vel;
	}
	public void setMan_vel(String man_vel) {
		this.man_vel = man_vel;
	}

	public String getSbc_cde() {
		return sbc_cde;
	}
	public void setSbc_cde(String sbc_cde) {
		this.sbc_cde = sbc_cde;
	}

	public String getSbc_cde_nm() {
		return sbc_cde_nm;
	}
	public void setSbc_cde_nm(String sbc_cde_nm) {
		this.sbc_cde_nm = sbc_cde_nm;
	}

	public String getIvt_cde() {
		return ivt_cde;
	}
	public void setIvt_cde(String ivt_cde) {
		this.ivt_cde = ivt_cde;
	}

	public String getIvt_cde_nm() {
		return ivt_cde_nm;
	}
	public void setIvt_cde_nm(String ivt_cde_nm) {
		this.ivt_cde_nm = ivt_cde_nm;
	}

	public String getLad_cde() {
		return lad_cde;
	}
	public void setLad_cde(String lad_cde) {
		this.lad_cde = lad_cde;
	}

	public String getLad_cde_nm() {
		return lad_cde_nm;
	}
	public void setLad_cde_nm(String lad_cde_nm) {
		this.lad_cde_nm = lad_cde_nm;
	}

	public String getMos_hsl() {
		return mos_hsl;
	}
	public void setMos_hsl(String mos_hsl) {
		this.mos_hsl = mos_hsl;
	}

	public String getLms_hsl() {
		return lms_hsl;
	}
	public void setLms_hsl(String lms_hsl) {
		this.lms_hsl = lms_hsl;
	}

	public String getCst_cde() {
		return cst_cde;
	}
	public void setCst_cde(String cst_cde) {
		this.cst_cde = cst_cde;
	}

	public String getCst_cde_nm() {
		return cst_cde_nm;
	}
	public void setCst_cde_nm(String cst_cde_nm) {
		this.cst_cde_nm = cst_cde_nm;
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
