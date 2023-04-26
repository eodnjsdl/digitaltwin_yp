package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlPumpPsVO implements Serializable {

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
	
	/** 하수펌프장명 */
	private String pmp_nam;
	
	/** 부지면적 */
	private String gai_ara;
	
	/** 개통상태 */
	private String soo_cde;
	private String soo_cde_nm;
	
	/** 펌프장용도 */
	private String sbe_cde;
	private String sbe_cde_nm;
	
	/** 일일처리용량 */
	private String day_vol;
	
	/** 최대저수용량 */
	private String max_vol;
	
	/** 표고 */
	private String stp_hsl;
	
	/** 수위 */
	private String pmp_wal;
	
	/** 청천시_오수양수능력 */
	private String cos_vol;
	
	/** 우천시_오수양수능력 */
	private String uos_vol;
	
	/** 우수양수능력 */
	private String usu_vol;
	
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

	public String getPmp_nam() {
		return pmp_nam;
	}
	public void setPmp_nam(String pmp_nam) {
		this.pmp_nam = pmp_nam;
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

	public String getSbe_cde() {
		return sbe_cde;
	}
	public void setSbe_cde(String sbe_cde) {
		this.sbe_cde = sbe_cde;
	}

	public String getSbe_cde_nm() {
		return sbe_cde_nm;
	}
	public void setSbe_cde_nm(String sbe_cde_nm) {
		this.sbe_cde_nm = sbe_cde_nm;
	}

	public String getDay_vol() {
		return day_vol;
	}
	public void setDay_vol(String day_vol) {
		this.day_vol = day_vol;
	}

	public String getMax_vol() {
		return max_vol;
	}
	public void setMax_vol(String max_vol) {
		this.max_vol = max_vol;
	}

	public String getStp_hsl() {
		return stp_hsl;
	}
	public void setStp_hsl(String stp_hsl) {
		this.stp_hsl = stp_hsl;
	}

	public String getPmp_wal() {
		return pmp_wal;
	}
	public void setPmp_wal(String pmp_wal) {
		this.pmp_wal = pmp_wal;
	}

	public String getCos_vol() {
		return cos_vol;
	}
	public void setCos_vol(String cos_vol) {
		this.cos_vol = cos_vol;
	}

	public String getUos_vol() {
		return uos_vol;
	}
	public void setUos_vol(String uos_vol) {
		this.uos_vol = uos_vol;
	}

	public String getUsu_vol() {
		return usu_vol;
	}
	public void setUsu_vol(String usu_vol) {
		this.usu_vol = usu_vol;
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
