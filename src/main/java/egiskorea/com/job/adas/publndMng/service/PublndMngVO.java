package egiskorea.com.job.adas.publndMng.service;

public class PublndMngVO {
	private String pnu;				// 행정구역코드
	private String sn;				// 순번
	private String prprtyNo;		// 재산번호
	private String rlLndcgrCd;		// 실지목코드
	private String stdgCd;			// 법정동코드
	private String mtnCd;			// 산코드
	private String lnbr;			// 번지
	private String ho;				// 호
	private String locplc;			// 소재지
	private String year;			// 연도
	private int pageNo;			// 페이징처리
	
	public String getSn() {
		return sn;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}

	public String getPrprtyNo() {
		return prprtyNo;
	}

	public void setPrprtyNo(String prprtyNo) {
		this.prprtyNo = prprtyNo;
	}
	
	public String getRlLndcgrCd() {
		return rlLndcgrCd;
	}
	
	public void setRlLndcgrCd(String rlLndcgrCd) {
		this.rlLndcgrCd = rlLndcgrCd;
	}

	public String getStdgCd() {
		return stdgCd;
	}

	public void setStdgCd(String stdgCd) {
		this.stdgCd = stdgCd;
	}

	public String getMtnCd() {
		return mtnCd;
	}

	public void setMtnCd(String mtnCd) {
		this.mtnCd = mtnCd;
	}

	public String getLnbr() {
		return lnbr;
	}

	public void setLnbr(String lnbr) {
		this.lnbr = lnbr;
	}

	public String getHo() {
		return ho;
	}

	public void setHo(String ho) {
		this.ho = ho;
	}

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}
	
	public String getLocplc() {
		return locplc;
	}
	
	public void setLocplc(String locplc) {
		this.locplc = locplc;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

}
