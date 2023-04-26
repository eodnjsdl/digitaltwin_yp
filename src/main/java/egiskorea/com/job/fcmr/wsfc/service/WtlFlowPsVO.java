package egiskorea.com.job.fcmr.wsfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class WtlFlowPsVO implements Serializable{

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
	
	/** gag_cde 유량계종류 */
	private String gag_cde;
	private String gag_cde_nm;
	
	/** mof_cde 유량계형식 */
	private String mof_cde;
	private String mof_cde_nm;

	/** std_dip 관경 */
	private String std_dip;
	
	/** prc_nam 제작회사명 */
	private String prc_nam;
	
	/** pip_cde 관로지형지물부호 */
	private String pip_cde;
	private String pip_cde_nm;
	
	/** pip_idn 관로관리번호 */
	private String pip_idn;
	
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

	public String getGag_cde() {
		return gag_cde;
	}

	public void setGag_cde(String gag_cde) {
		this.gag_cde = gag_cde;
	}

	public String getGag_cde_nm() {
		return gag_cde_nm;
	}

	public void setGag_cde_nm(String gag_cde_nm) {
		this.gag_cde_nm = gag_cde_nm;
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

	public String getStd_dip() {
		return std_dip;
	}

	public void setStd_dip(String std_dip) {
		this.std_dip = std_dip;
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
