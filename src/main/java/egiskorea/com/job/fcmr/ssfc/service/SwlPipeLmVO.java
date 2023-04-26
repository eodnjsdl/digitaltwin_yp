package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlPipeLmVO implements Serializable {

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
	
	/** 하수관용도 */
	private String sba_cde;
	private String sba_cde_nm;
	
	/** 관재질 */
	private String mop_cde;
	private String mop_cde_nm;
	
	/** 규모 */
	private String lit_cde;
	private String lit_cde_nm;
	
	/** 시설물형태 */
	private String for_cde;
	private String for_cde_nm;
	
	/** 관경 */
	private String std_dip;
	
	/** 가로길이 */
	private String std_hol;
	
	/** 세로길이 */
	private String std_vel;
	
	/** 연장 */
	private String byc_len;
	
	/** 시점깊이 */
	private String beg_dep;
	
	/** 종점깊이 */
	private String end_dep;
	
	/** 시점관저고 */
	private String sbk_hsl;
	
	/** 종점관저고 */
	private String sbl_hsl;
	
	/** 평균구배 */
	private String pip_slp;
	
	/** 평균구배? */
	private String sph_lin;
	
	/** 우수배수면적 */
	private String bst_ara;
	
	/** 오수배수면적 */
	private String drt_ara;
	
	/** 우천시_유속 */
	private String sbq_spd;
	
	/** 청천시_유속 */
	private String sbr_spd;
	
	/** 공사번호 */
	private String cnt_num;
	
	/** 대장초기화여부 */
	private String sys_chk;
	
	/** 관라벨 */
	private String pip_lbl;
	
	/** 시점맨홀지형지물부호 */
	private String bom_cde;
	private String bom_cde_nm;
	
	/** 시점맨홀관리번호 */
	private String bom_idn;
	
	/** 종점맨홀지형지물부호 */
	private String eom_cde;
	private String eom_cde_nm;
	
	/** 종점맨홀관리번호 */
	private String eom_idn;

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

	public String getLit_cde() {
		return lit_cde;
	}
	public void setLit_cde(String lit_cde) {
		this.lit_cde = lit_cde;
	}

	public String getLit_cde_nm() {
		return lit_cde_nm;
	}
	public void setLit_cde_nm(String lit_cde_nm) {
		this.lit_cde_nm = lit_cde_nm;
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

	public String getBeg_dep() {
		return beg_dep;
	}
	public void setBeg_dep(String beg_dep) {
		this.beg_dep = beg_dep;
	}

	public String getEnd_dep() {
		return end_dep;
	}
	public void setEnd_dep(String end_dep) {
		this.end_dep = end_dep;
	}

	public String getSbk_hsl() {
		return sbk_hsl;
	}
	public void setSbk_hsl(String sbk_hsl) {
		this.sbk_hsl = sbk_hsl;
	}

	public String getSbl_hsl() {
		return sbl_hsl;
	}
	public void setSbl_hsl(String sbl_hsl) {
		this.sbl_hsl = sbl_hsl;
	}

	public String getPip_slp() {
		return pip_slp;
	}
	public void setPip_slp(String pip_slp) {
		this.pip_slp = pip_slp;
	}

	public String getSph_lin() {
		return sph_lin;
	}
	public void setSph_lin(String sph_lin) {
		this.sph_lin = sph_lin;
	}

	public String getBst_ara() {
		return bst_ara;
	}
	public void setBst_ara(String bst_ara) {
		this.bst_ara = bst_ara;
	}

	public String getDrt_ara() {
		return drt_ara;
	}
	public void setDrt_ara(String drt_ara) {
		this.drt_ara = drt_ara;
	}

	public String getSbq_spd() {
		return sbq_spd;
	}
	public void setSbq_spd(String sbq_spd) {
		this.sbq_spd = sbq_spd;
	}

	public String getSbr_spd() {
		return sbr_spd;
	}
	public void setSbr_spd(String sbr_spd) {
		this.sbr_spd = sbr_spd;
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

	public String getBom_cde() {
		return bom_cde;
	}
	public void setBom_cde(String bom_cde) {
		this.bom_cde = bom_cde;
	}

	public String getBom_cde_nm() {
		return bom_cde_nm;
	}
	public void setBom_cde_nm(String bom_cde_nm) {
		this.bom_cde_nm = bom_cde_nm;
	}

	public String getBom_idn() {
		return bom_idn;
	}
	public void setBom_idn(String bom_idn) {
		this.bom_idn = bom_idn;
	}

	public String getEom_cde() {
		return eom_cde;
	}
	public void setEom_cde(String eom_cde) {
		this.eom_cde = eom_cde;
	}

	public String getEom_cde_nm() {
		return eom_cde_nm;
	}
	public void setEom_cde_nm(String eom_cde_nm) {
		this.eom_cde_nm = eom_cde_nm;
	}

	public String getEom_idn() {
		return eom_idn;
	}
	public void setEom_idn(String eom_idn) {
		this.eom_idn = eom_idn;
	}
}
