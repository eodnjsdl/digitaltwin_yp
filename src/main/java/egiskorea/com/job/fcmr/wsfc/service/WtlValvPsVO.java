package egiskorea.com.job.fcmr.wsfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class WtlValvPsVO implements Serializable{

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
	
	/** mof_cde 변류형식 */
	private String mof_cde;
	private String mof_cde_nm;
	
	/** mop_cde 관재질 */
	private String mop_cde;

	/** std_dip 관경 */
	private String std_dip;
	
	/** sae_cde 제수변회전방향 */
	private String sae_cde;
	private String sae_cde_nm;
	
	/** tro_cnt 제수변총회전수 */
	private String tro_cnt;
	
	/** cro_cnt 제수변현회전수 */
	private String cro_cnt;
	
	/** mth_cde 제수변구동방법 */
	private String mth_cde;
	private String mth_cde_nm;
	
	/** for_cde 시설물형태 */
	private String for_cde;
	private String for_cde_nm;
	
	/** val_std 변실규격 */
	private String val_std;
	
	/** val_saf 설정압력 */
	private String val_saf;
	
	/** prc_nam 제작회사명 */
	private String prc_nam;
	
	/** pip_cde 관로지형지물부호 */
	private String pip_cde;

	private String pip_cde_nm;
	
	/** pip_idn 관로관리번호 */
	private String pip_idn;
	
	/** cst_cde 이상상태 */
	private String cst_cde;
	private String cst_cde_nm;
	
	/** off_cde 개폐여부 */
	private String off_cde;
	private String off_cde_nm;
	
	/** cnt_num 공사번호 */
	private String cnt_num;
	
	/** sys_chk 대장초기화여부 */
	private String sys_chk;
	
	/** ang_dir 방향각 */
	private String ang_dir;
	
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

	public String getMop_cde() {
		return mop_cde;
	}

	public void setMop_cde(String mop_cde) {
		this.mop_cde = mop_cde;
	}

	public String getStd_dip() {
		return std_dip;
	}

	public void setStd_dip(String std_dip) {
		this.std_dip = std_dip;
	}

	public String getSae_cde() {
		return sae_cde;
	}

	public void setSae_cde(String sae_cde) {
		this.sae_cde = sae_cde;
	}

	public String getSae_cde_nm() {
		return sae_cde_nm;
	}

	public void setSae_cde_nm(String sae_cde_nm) {
		this.sae_cde_nm = sae_cde_nm;
	}

	public String getTro_cnt() {
		return tro_cnt;
	}

	public void setTro_cnt(String tro_cnt) {
		this.tro_cnt = tro_cnt;
	}

	public String getCro_cnt() {
		return cro_cnt;
	}

	public void setCro_cnt(String cro_cnt) {
		this.cro_cnt = cro_cnt;
	}

	public String getMth_cde() {
		return mth_cde;
	}

	public void setMth_cde(String mth_cde) {
		this.mth_cde = mth_cde;
	}

	public String getMth_cde_nm() {
		return mth_cde_nm;
	}

	public void setMth_cde_nm(String mth_cde_nm) {
		this.mth_cde_nm = mth_cde_nm;
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

	public String getVal_std() {
		return val_std;
	}

	public void setVal_std(String val_std) {
		this.val_std = val_std;
	}

	public String getVal_saf() {
		return val_saf;
	}

	public void setVal_saf(String val_saf) {
		this.val_saf = val_saf;
	}

	public String getPrc_nam() {
		return prc_nam;
	}

	public void setPrc_nam(String prc_nam) {
		this.prc_nam = prc_nam;
	}

	public String getPip_cde() {
		return pip_cde;
	}

	public void setPip_cde(String pip_cde) {
		this.pip_cde = pip_cde;
	}
	
	public String getPip_cde_nm() {
		return pip_cde_nm;
	}

	public void setPip_cde_nm(String pip_cde_nm) {
		this.pip_cde_nm = pip_cde_nm;

	}

	public String getPip_idn() {
		return pip_idn;
	}

	public void setPip_idn(String pip_idn) {
		this.pip_idn = pip_idn;
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

	public String getOff_cde() {
		return off_cde;
	}

	public void setOff_cde(String off_cde) {
		this.off_cde = off_cde;
	}

	public String getOff_cde_nm() {
		return off_cde_nm;
	}

	public void setOff_cde_nm(String off_cde_nm) {
		this.off_cde_nm = off_cde_nm;
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
