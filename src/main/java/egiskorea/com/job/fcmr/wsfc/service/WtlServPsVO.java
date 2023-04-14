package egiskorea.com.job.fcmr.wsfc.service;

public class WtlServPsVO {

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
	
	/** sht_num 도엽번호 */
	private String sht_num;
	
	/** mng_cde 관리기관 */
	private String mng_cde;
	private String mng_cde_nm;
	
	/** fns_ymd 준공일자 */
	private String fns_ymd;
	
	/** srv_nam 배수지명 */
	private String srv_nam;
	
	/** pur_nam 정수장명 */
	private String pur_nam;
	
	/** gai_ara 부지면적 */
	private String gai_ara;
	
	/** sag_cde 관리방법 */
	private String sag_cde;
	private String sag_cde_nm;
	
	/** srv_vol 시설용량 */
	private String srv_vol;
	
	/** hgh_wal 최고수위 */
	private String hgh_wal;
	
	/** low_wal 최저수위 */
	private String low_wal;
	
	/** isr_vol 배수지유입량 */
	private String isr_vol;
	
	/** sup_are 급수지역 */
	private String sup_are;
	
	/** sup_pop 급수인구 */
	private String sup_pop;
	
	/** scw_cde 배수지제어방법 */
	private String scw_cde;
	private String scw_cde_nm;
	
	/** cnt_num 공사번호 */
	private String cnt_num;
	
	/** sys_chk 대장초기화여부 */
	private String sys_chk;
	
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

	public String getFns_ymd() {
		return fns_ymd;
	}

	public void setFns_ymd(String fns_ymd) {
		this.fns_ymd = fns_ymd;
	}

	public String getSrv_nam() {
		return srv_nam;
	}

	public void setSrv_nam(String srv_nam) {
		this.srv_nam = srv_nam;
	}

	public String getPur_nam() {
		return pur_nam;
	}

	public void setPur_nam(String pur_nam) {
		this.pur_nam = pur_nam;
	}

	public String getGai_ara() {
		return gai_ara;
	}

	public void setGai_ara(String gai_ara) {
		this.gai_ara = gai_ara;
	}

	public String getSag_cde() {
		return sag_cde;
	}

	public void setSag_cde(String sag_cde) {
		this.sag_cde = sag_cde;
	}

	public String getSag_cde_nm() {
		return sag_cde_nm;
	}

	public void setSag_cde_nm(String sag_cde_nm) {
		this.sag_cde_nm = sag_cde_nm;
	}

	public String getSrv_vol() {
		return srv_vol;
	}

	public void setSrv_vol(String srv_vol) {
		this.srv_vol = srv_vol;
	}

	public String getHgh_wal() {
		return hgh_wal;
	}

	public void setHgh_wal(String hgh_wal) {
		this.hgh_wal = hgh_wal;
	}

	public String getLow_wal() {
		return low_wal;
	}

	public void setLow_wal(String low_wal) {
		this.low_wal = low_wal;
	}

	public String getIsr_vol() {
		return isr_vol;
	}

	public void setIsr_vol(String isr_vol) {
		this.isr_vol = isr_vol;
	}

	public String getSup_are() {
		return sup_are;
	}

	public void setSup_are(String sup_are) {
		this.sup_are = sup_are;
	}

	public String getSup_pop() {
		return sup_pop;
	}

	public void setSup_pop(String sup_pop) {
		this.sup_pop = sup_pop;
	}

	public String getScw_cde() {
		return scw_cde;
	}

	public void setScw_cde(String scw_cde) {
		this.scw_cde = scw_cde;
	}

	public String getScw_cde_nm() {
		return scw_cde_nm;
	}

	public void setScw_cde_nm(String scw_cde_nm) {
		this.scw_cde_nm = scw_cde_nm;
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
