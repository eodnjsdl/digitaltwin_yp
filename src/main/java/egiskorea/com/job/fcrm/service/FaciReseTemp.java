package egiskorea.com.job.fcrm.service;

import java.io.Serializable;


public class FaciReseTemp implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1847156493957910671L;

	/** GID */
	private int gid;
	
	/** 예약일자 */
	private String rsrvDe;
	
	/** 예약시작시각 */
	private String rsrvStrtTm;
	
	/** 예약종료시각 */
	private String rsrvEndTm;
	
	/** 보조시설순번 */
	private int asstnFcltySn;

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getRsrvDe() {
		return rsrvDe;
	}

	public void setRsrvDe(String rsrvDe) {
		this.rsrvDe = rsrvDe;
	}

	public String getRsrvStrtTm() {
		return rsrvStrtTm;
	}

	public void setRsrvStrtTm(String rsrvStrtTm) {
		this.rsrvStrtTm = rsrvStrtTm;
	}

	public String getRsrvEndTm() {
		return rsrvEndTm;
	}

	public void setRsrvEndTm(String rsrvEndTm) {
		this.rsrvEndTm = rsrvEndTm;
	}

	public int getAsstnFcltySn() {
		return asstnFcltySn;
	}

	public void setAsstnFcltySn(int asstnFcltySn) {
		this.asstnFcltySn = asstnFcltySn;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
