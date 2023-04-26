package egiskorea.com.job.fcmr.wsfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class WtlPipePsVO implements Serializable{

	/** gid 아이디 */
	private int gid;
	
	/** ftr_cde 지형지물부호*/
	private String ftr_cde;
	private String ftr_cde_nm;
	
	/** ftr_idn 관리번호 */
	private String ftr_idn;
	
	/** pip_dep 심도 */
	private double pip_dep;
	
	/** sun_cde 코드 */
	private String sun_cde;
	
	/** ins_ymd 측량일 */
	private String ins_ymd;
	
	/** ins_usr 측량자 */
	private String ins_usr;
	
	/** mod_ymd 수정일 */
	private String mod_ymd;
	
	/** mod_usr 수정자 */
	private String mod_usr;
	
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

	public double getPip_dep() {
		return pip_dep;
	}

	public void setPip_dep(double pip_dep) {
		this.pip_dep = pip_dep;
	}

	public String getSun_cde() {
		return sun_cde;
	}

	public void setSun_cde(String sun_cde) {
		this.sun_cde = sun_cde;
	}

	public String getIns_ymd() {
		return ins_ymd;
	}

	public void setIns_ymd(String ins_ymd) {
		this.ins_ymd = ins_ymd;
	}

	public String getIns_usr() {
		return ins_usr;
	}

	public void setIns_usr(String ins_usr) {
		this.ins_usr = ins_usr;
	}

	public String getMod_ymd() {
		return mod_ymd;
	}

	public void setMod_ymd(String mod_ymd) {
		this.mod_ymd = mod_ymd;
	}

	public String getMod_usr() {
		return mod_usr;
	}

	public void setMod_usr(String mod_usr) {
		this.mod_usr = mod_usr;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}
	
}
