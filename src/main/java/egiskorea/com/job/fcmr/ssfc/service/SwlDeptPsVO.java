package egiskorea.com.job.fcmr.ssfc.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SwlDeptPsVO implements Serializable {

	/** GID */
	private int gid;
	
	/** 지형지물부호 */
	private String ftr_cde;
	private String ftr_cde_nm;
	
	/** 심도 */
	private String pip_dep;
	
	/** 관리번호 */
	private String ftr_idn;

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

	public String getPip_dep() {
		return pip_dep;
	}
	public void setPip_dep(String pip_dep) {
		this.pip_dep = pip_dep;
	}

	public String getFtr_idn() {
		return ftr_idn;
	}
	public void setFtr_idn(String ftr_idn) {
		this.ftr_idn = ftr_idn;
	}
}
