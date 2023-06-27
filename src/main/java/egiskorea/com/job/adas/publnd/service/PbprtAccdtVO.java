/***********************************
* 공유재산 실태조사 VO
* @author  : 백승석
* @since   : 2023.02.21
* @version : 1.0
************************************/
package egiskorea.com.job.adas.publnd.service;

public class PbprtAccdtVO {
	
	private int publndNo;					// 공유지 번호
	private String ctrtYmd;					// 계약일자
	private String cntrctpd;				// 계약기간
	private String locplc;					// 소재지
	private String ldcgCd;					// 지목코드
	private double ar;						// 면적
	private double loanAr;					// 대부면적
	private String loanPrpos;				// 대부용도
	private String rrno;					// 주민등록번호
	private String loanmnSndngYn;			// 대부료 발송 여부 
	private String nm;						// 성명
	private String addr;					// 주소
	private String zip;						// 우편번호
	private String cttpc;					// 연락처
	private String rm;						// 비고
	private String nhtSndng;				// 고지서 발송
	private String atchPapers;				// 정부 서류
	private String cnfirmMatter;			// 확인사항
	private String editYn = "N";			// 수정여부
	private String delYn = "N";				// 삭제여부
	private String year;					// 등록연도
	private String yearOption;				// 연도별 조회 할때
	private int pageNo;						// 페이지 번호
	private String prprtyNo;				// 재산번호
	
	public String getYearOption() {
		return yearOption;
	}

	public void setYearOption(String yearOption) {
		this.yearOption = yearOption;
	}

	public int getPublndNo() {
		return publndNo;
	}

	public void setPublndNo(int publndNo) {
		this.publndNo = publndNo;
	}

	public String getCtrtYmd() {
		return ctrtYmd;
	}

	public void setCtrtYmd(String ctrtYmd) {
		this.ctrtYmd = ctrtYmd;
	}

	public String getCntrctpd() {
		return cntrctpd;
	}

	public void setCntrctpd(String cntrctpd) {
		this.cntrctpd = cntrctpd;
	}

	public String getLocplc() {
		return locplc;
	}

	public void setLocplc(String locplc) {
		this.locplc = locplc;
	}

	public String getLdcgCd() {
		return ldcgCd;
	}

	public void setLdcgCd(String ldcgCd) {
		this.ldcgCd = ldcgCd;
	}

	public double getAr() {
		return ar;
	}

	public void setAr(double ar) {
		this.ar = ar;
	}

	public double getLoanAr() {
		return loanAr;
	}

	public void setLoanAr(double loanAr) {
		this.loanAr = loanAr;
	}

	public String getLoanPrpos() {
		return loanPrpos;
	}

	public void setLoanPrpos(String loanPrpos) {
		this.loanPrpos = loanPrpos;
	}

	public String getRrno() {
		return rrno;
	}

	public void setRrno(String rrno) {
		this.rrno = rrno;
	}

	public String getLoanmnSndngYn() {
		return loanmnSndngYn;
	}

	public void setLoanmnSndngYn(String loanmnSndngYn) {
		this.loanmnSndngYn = loanmnSndngYn;
	}

	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCttpc() {
		return cttpc;
	}

	public void setCttpc(String cttpc) {
		this.cttpc = cttpc;
	}

	public String getRm() {
		return rm;
	}

	public void setRm(String rm) {
		this.rm = rm;
	}

	public String getNhtSndng() {
		return nhtSndng;
	}

	public void setNhtSndng(String nhtSndng) {
		this.nhtSndng = nhtSndng;
	}

	public String getAtchPapers() {
		return atchPapers;
	}

	public void setAtchPapers(String atchPapers) {
		this.atchPapers = atchPapers;
	}

	public String getCnfirmMatter() {
		return cnfirmMatter;
	}

	public void setCnfirmMatter(String cnfirmMatter) {
		this.cnfirmMatter = cnfirmMatter;
	}

	public String getEditYn() {
		return editYn;
	}

	public void setEditYn(String editYn) {
		this.editYn = editYn;
	}

	public String getDelYn() {
		return delYn;
	}

	public void setDelYn(String delYn) {
		this.delYn = delYn;
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

	public String getPrprtyNo() {
		return prprtyNo;
	}

	public void setPrprtyNo(String prprtyNo) {
		this.prprtyNo = prprtyNo;
	}
	
}
