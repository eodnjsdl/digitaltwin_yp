package egiskorea.com.job.fcmr.wsfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class WtlFirePsVO implements Serializable{
	
	/** gid 아이디 */
	private int gid;
	
	/** ftr_cde 지형지물부호*/
	private String ftr_cde;
	
	/** ftr_idn 관리번호 */
	private String ftr_idn;
	
	/** hjd_cde 읍면동 */
	private String hjd_cde;
	
	/** mng_cde 관리기관 */
	private String mng_cde;
	
	/** sht_num 도엽번호 */
	private String sht_num;
	
	/** ist_ymd 설치일자 */
	private String ist_ymd;
	
	/** hom_num 수용가번호 */
	private String hom_num;
	
	/** mof_cde 소화전형식 */
	private String mof_cde;
	
	/** fir_dip 소화전구경 */
	private String fir_dip;

	/** std_dip 관경 */
	private String std_dip;
	
	/** sup_hit 급수탑높이 */
	private String sup_hit;
	
	/** cnt_num 공사번호 */
	private String cnt_num;
	
	/** sys_chk 대장초기화여부 */
	private String sys_chk;
	
	/** ang_dir 방향각 */
	private String ang_dir;
	
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

	public String getMng_cde() {
		return mng_cde;
	}

	public void setMng_cde(String mng_cde) {
		this.mng_cde = mng_cde;
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

	public String getHom_num() {
		return hom_num;
	}

	public void setHom_num(String hom_num) {
		this.hom_num = hom_num;
	}

	public String getMof_cde() {
		return mof_cde;
	}

	public void setMof_cde(String mof_cde) {
		this.mof_cde = mof_cde;
	}

	public String getFir_dip() {
		return fir_dip;
	}

	public void setFir_dip(String fir_dip) {
		this.fir_dip = fir_dip;
	}

	public String getStd_dip() {
		return std_dip;
	}

	public void setStd_dip(String std_dip) {
		this.std_dip = std_dip;
	}

	public String getSup_hit() {
		return sup_hit;
	}

	public void setSup_hit(String sup_hit) {
		this.sup_hit = sup_hit;
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

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}
	
}
