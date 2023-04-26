package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlDranPsVO implements Serializable {
	
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
	
	/** 하수처리장명 */
	private String drn_nam;
	
	/** 부지면적 */
	private String gai_ara;
	
	/** 개통상태 */
	private String soo_cde;
	private String soo_cde_nm;
	
	/** 처리구역면적 */
	private String adp_ara;
	
	/** 하수처리방식 */
	private String sbb_cde;
	private String sbb_cde_nm;
	
	/** 청천시처리용량 */
	private String pcc_vol;
	
	/** 우천시처리용량 */
	private String puc_vol;
	
	/** 설계유입수_수질 */
	private String qw1_exp;
	
	/** 설계유출수_수질 */
	private String qw2_exp;
	
	/** 차집관연장 */
	private String pip_len;
	
	/** 방류수역명 */
	private String dra_nam;
	
	/** 공사번호 */
	private String cnt_num;
	
	/** 개통상태 */
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

	public String getDrn_nam() {
		return drn_nam;
	}
	public void setDrn_nam(String drn_nam) {
		this.drn_nam = drn_nam;
	}

	public String getGai_ara() {
		return gai_ara;
	}
	public void setGai_ara(String gai_ara) {
		this.gai_ara = gai_ara;
	}

	public String getSoo_cde() {
		return soo_cde;
	}
	public void setSoo_cde(String soo_cde) {
		this.soo_cde = soo_cde;
	}

	public String getSoo_cde_nm() {
		return soo_cde_nm;
	}
	public void setSoo_cde_nm(String soo_cde_nm) {
		this.soo_cde_nm = soo_cde_nm;
	}

	public String getAdp_ara() {
		return adp_ara;
	}
	public void setAdp_ara(String adp_ara) {
		this.adp_ara = adp_ara;
	}

	public String getSbb_cde() {
		return sbb_cde;
	}
	public void setSbb_cde(String sbb_cde) {
		this.sbb_cde = sbb_cde;
	}

	public String getSbb_cde_nm() {
		return sbb_cde_nm;
	}
	public void setSbb_cde_nm(String sbb_cde_nm) {
		this.sbb_cde_nm = sbb_cde_nm;
	}

	public String getPcc_vol() {
		return pcc_vol;
	}
	public void setPcc_vol(String pcc_vol) {
		this.pcc_vol = pcc_vol;
	}

	public String getPuc_vol() {
		return puc_vol;
	}
	public void setPuc_vol(String puc_vol) {
		this.puc_vol = puc_vol;
	}

	public String getQw1_exp() {
		return qw1_exp;
	}
	public void setQw1_exp(String qw1_exp) {
		this.qw1_exp = qw1_exp;
	}

	public String getQw2_exp() {
		return qw2_exp;
	}
	public void setQw2_exp(String qw2_exp) {
		this.qw2_exp = qw2_exp;
	}

	public String getPip_len() {
		return pip_len;
	}
	public void setPip_len(String pip_len) {
		this.pip_len = pip_len;
	}

	public String getDra_nam() {
		return dra_nam;
	}
	public void setDra_nam(String dra_nam) {
		this.dra_nam = dra_nam;
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
