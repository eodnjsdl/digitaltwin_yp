package egiskorea.com.job.adas.asmng.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class AdministAssetsVO implements Serializable {
	
	private int sn;								// 순번
	private String prprtyNo;					// 재산번호
	private String saeolCertYn;					// 새올인증여부
	private String inputSys;					// 입력시스템
	private String prprtyNm;					// 재산명
	private String posesnSeCd;					// 소유구분코드
	private String prprtyPrposCd;				// 재산용도코드
	private String administPrprtyCd;			// 행정재산코드
	private String accountSeCd;					// 회계구분코드
	private String prprtyMngInscd;				// 재산관리관코드
	private String chrgDeptNm;					// 담당부서명
	private String dvTaskMngInscd;				// 분임관리관코드
	private String mndtMngInscd;				// 위임관리관코드
	private String prprtyMngDsgnYmd;			// 재산관리관지정일자
	private String zip;							// 우편번호
	private String dongCd;						// 행정동코드
	private String stdgCd;						// 법정동코드
	private String locplc;						// 소재지
	private String mtnCd;						// 산코드
	private String lnbr;						// 번지
	private String ho;							// 호
	private String tong;						// 통
	private String ban;							// 반
	private String spcadrs;						// 특수주소
	private String spcDong;						// 특수지동
	private String spcHo;						// 특수지호
	private String rnAddr;						// 도로명주소
	private String prprtyPc;					// 재산가격
	private String accnutStdrAmt;				// 회계기준가액
	private String acqsDeptCd;					// 취득부서코드
	private String acqsAmt;						// 취득액
	private String acqsYmd;						// 취득일자
	private String acqsMthSeCd;					// 취득방법구분코드
	private String acqsResn;					// 취득사유
	private String rgistYn;						// 등기여부
	private String recpNo;						// 등기부등본번호
	private String loanPosblYn;					// 대부가능여부
	private String saleLmttYn;					// 매각제한여부
	private String saleLmttYmd;					// 매각제한일자
	private String rm;							// 비고
	private String ladLndcgrCd;					// 토지지목코드
	private String rlLndcgrCd;					// 실지목코드
	private String ar;							// 면적
	private String rlAr;						// 실면적
	private String oalp;						// 공시지가
	private String acqsAr;						// 취득면적
	private String pblonsipQota1;				// 공유지분1
	private String pblonsipQota2;				// 공유지분2
	private String spfc;						// 용도지역
	private String ctyplnDstrc;					// 도시계획지구
	private String planFclty;					// 계획시설
	private String dwk;							// 개발사업
	private String planBiz;						// 계획사업
	private int pageNo;							// 페이지 번호
	private String year;						// 연도
	private String arMin;						// 검색용 최소면적
	private String arMax;						// 검색용 최대면적
	
	public int getSn() {
		return sn;
	}
	public void setSn(int sn) {
		this.sn = sn;
	}
	public String getPrprtyNo() {
		return prprtyNo;
	}
	public void setPrprtyNo(String prprtyNo) {
		this.prprtyNo = prprtyNo;
	}
	public String getSaeolCertYn() {
		return saeolCertYn;
	}
	public void setSaeolCertYn(String saeolCertYn) {
		this.saeolCertYn = saeolCertYn;
	}
	public String getInputSys() {
		return inputSys;
	}
	public void setInputSys(String inputSys) {
		this.inputSys = inputSys;
	}
	public String getPrprtyNm() {
		return prprtyNm;
	}
	public void setPrprtyNm(String prprtyNm) {
		this.prprtyNm = prprtyNm;
	}
	public String getPosesnSeCd() {
		return posesnSeCd;
	}
	public void setPosesnSeCd(String posesnSeCd) {
		this.posesnSeCd = posesnSeCd;
	}
	public String getPrprtyPrposCd() {
		return prprtyPrposCd;
	}
	public void setPrprtyPrposCd(String prprtyPrposCd) {
		this.prprtyPrposCd = prprtyPrposCd;
	}
	public String getAdministPrprtyCd() {
		return administPrprtyCd;
	}
	public void setAdministPrprtyCd(String administPrprtyCd) {
		this.administPrprtyCd = administPrprtyCd;
	}
	public String getAccountSeCd() {
		return accountSeCd;
	}
	public void setAccountSeCd(String accountSeCd) {
		this.accountSeCd = accountSeCd;
	}
	public String getPrprtyMngInscd() {
		return prprtyMngInscd;
	}
	public void setPrprtyMngInscd(String prprtyMngInscd) {
		this.prprtyMngInscd = prprtyMngInscd;
	}
	public String getChrgDeptNm() {
		return chrgDeptNm;
	}
	public void setChrgDeptNm(String chrgDeptNm) {
		this.chrgDeptNm = chrgDeptNm;
	}
	public String getDvTaskMngInscd() {
		return dvTaskMngInscd;
	}
	public void setDvTaskMngInscd(String dvTaskMngInscd) {
		this.dvTaskMngInscd = dvTaskMngInscd;
	}
	public String getMndtMngInscd() {
		return mndtMngInscd;
	}
	public void setMndtMngInscd(String mndtMngInscd) {
		this.mndtMngInscd = mndtMngInscd;
	}
	public String getPrprtyMngDsgnYmd() {
		return prprtyMngDsgnYmd;
	}
	public void setPrprtyMngDsgnYmd(String prprtyMngDsgnYmd) {
		this.prprtyMngDsgnYmd = prprtyMngDsgnYmd;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getDongCd() {
		return dongCd;
	}
	public void setDongCd(String dongCd) {
		this.dongCd = dongCd;
	}
	public String getStdgCd() {
		return stdgCd;
	}
	public void setStdgCd(String stdgCd) {
		this.stdgCd = stdgCd;
	}
	public String getLocplc() {
		return locplc;
	}
	public void setLocplc(String locplc) {
		this.locplc = locplc;
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
	public String getTong() {
		return tong;
	}
	public void setTong(String tong) {
		this.tong = tong;
	}
	public String getBan() {
		return ban;
	}
	public void setBan(String ban) {
		this.ban = ban;
	}
	public String getSpcadrs() {
		return spcadrs;
	}
	public void setSpcadrs(String spcadrs) {
		this.spcadrs = spcadrs;
	}
	public String getSpcDong() {
		return spcDong;
	}
	public void setSpcDong(String spcDong) {
		this.spcDong = spcDong;
	}
	public String getSpcHo() {
		return spcHo;
	}
	public void setSpcHo(String spcHo) {
		this.spcHo = spcHo;
	}
	public String getRnAddr() {
		return rnAddr;
	}
	public void setRnAddr(String rnAddr) {
		this.rnAddr = rnAddr;
	}
	public String getPrprtyPc() {
		return prprtyPc;
	}
	public void setPrprtyPc(String prprtyPc) {
		this.prprtyPc = prprtyPc;
	}
	public String getAccnutStdrAmt() {
		return accnutStdrAmt;
	}
	public void setAccnutStdrAmt(String accnutStdrAmt) {
		this.accnutStdrAmt = accnutStdrAmt;
	}
	public String getAcqsDeptCd() {
		return acqsDeptCd;
	}
	public void setAcqsDeptCd(String acqsDeptCd) {
		this.acqsDeptCd = acqsDeptCd;
	}
	public String getAcqsAmt() {
		return acqsAmt;
	}
	public void setAcqsAmt(String acqsAmt) {
		this.acqsAmt = acqsAmt;
	}
	public String getAcqsYmd() {
		return acqsYmd;
	}
	public void setAcqsYmd(String acqsYmd) {
		this.acqsYmd = acqsYmd;
	}
	public String getAcqsMthSeCd() {
		return acqsMthSeCd;
	}
	public void setAcqsMthSeCd(String acqsMthSeCd) {
		this.acqsMthSeCd = acqsMthSeCd;
	}
	public String getAcqsResn() {
		return acqsResn;
	}
	public void setAcqsResn(String acqsResn) {
		this.acqsResn = acqsResn;
	}
	public String getRgistYn() {
		return rgistYn;
	}
	public void setRgistYn(String rgistYn) {
		this.rgistYn = rgistYn;
	}
	public String getRecpNo() {
		return recpNo;
	}
	public void setRecpNo(String recpNo) {
		this.recpNo = recpNo;
	}
	public String getLoanPosblYn() {
		return loanPosblYn;
	}
	public void setLoanPosblYn(String loanPosblYn) {
		this.loanPosblYn = loanPosblYn;
	}
	public String getSaleLmttYn() {
		return saleLmttYn;
	}
	public void setSaleLmttYn(String saleLmttYn) {
		this.saleLmttYn = saleLmttYn;
	}
	public String getSaleLmttYmd() {
		return saleLmttYmd;
	}
	public void setSaleLmttYmd(String saleLmttYmd) {
		this.saleLmttYmd = saleLmttYmd;
	}
	public String getRm() {
		return rm;
	}
	public void setRm(String rm) {
		this.rm = rm;
	}
	public String getLadLndcgrCd() {
		return ladLndcgrCd;
	}
	public void setLadLndcgrCd(String ladLndcgrCd) {
		this.ladLndcgrCd = ladLndcgrCd;
	}
	public String getRlLndcgrCd() {
		return rlLndcgrCd;
	}
	public void setRlLndcgrCd(String rlLndcgrCd) {
		this.rlLndcgrCd = rlLndcgrCd;
	}
	public String getAr() {
		return ar;
	}
	public void setAr(String ar) {
		this.ar = ar;
	}
	public String getRlAr() {
		return rlAr;
	}
	public void setRlAr(String rlAr) {
		this.rlAr = rlAr;
	}
	public String getOalp() {
		return oalp;
	}
	public void setOalp(String oalp) {
		this.oalp = oalp;
	}
	public String getAcqsAr() {
		return acqsAr;
	}
	public void setAcqsAr(String acqsAr) {
		this.acqsAr = acqsAr;
	}
	public String getPblonsipQota1() {
		return pblonsipQota1;
	}
	public void setPblonsipQota1(String pblonsipQota1) {
		this.pblonsipQota1 = pblonsipQota1;
	}
	public String getPblonsipQota2() {
		return pblonsipQota2;
	}
	public void setPblonsipQota2(String pblonsipQota2) {
		this.pblonsipQota2 = pblonsipQota2;
	}
	public String getSpfc() {
		return spfc;
	}
	public void setSpfc(String spfc) {
		this.spfc = spfc;
	}
	public String getCtyplnDstrc() {
		return ctyplnDstrc;
	}
	public void setCtyplnDstrc(String ctyplnDstrc) {
		this.ctyplnDstrc = ctyplnDstrc;
	}
	public String getPlanFclty() {
		return planFclty;
	}
	public void setPlanFclty(String planFclty) {
		this.planFclty = planFclty;
	}
	public String getDwk() {
		return dwk;
	}
	public void setDwk(String dwk) {
		this.dwk = dwk;
	}
	public String getPlanBiz() {
		return planBiz;
	}
	public void setPlanBiz(String planBiz) {
		this.planBiz = planBiz;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	
	public String getArMin() {
		return arMin;
	}
	public void setArMin(String arMin) {
		this.arMin = arMin;
	}
	public String getArMax() {
		return arMax;
	}
	public void setArMax(String arMax) {
		this.arMax = arMax;
	}
	public void setArray(String[] arr) {
		this.sn = Integer.parseInt(arr[0]);
		this.prprtyNo = arr[1];
		this.saeolCertYn = arr[2];
		this.inputSys = arr[3];
		this.prprtyNm = arr[4];
		this.posesnSeCd = arr[5];
		this.prprtyPrposCd = arr[6];
		this.administPrprtyCd = arr[7];
		this.accountSeCd = arr[8];
		this.prprtyMngInscd = arr[9];
		this.chrgDeptNm = arr[10];
		this.dvTaskMngInscd = arr[11];
		this.mndtMngInscd = arr[12];
		this.prprtyMngDsgnYmd = arr[13];
		this.zip = arr[14];
		this.dongCd = arr[15];
		this.stdgCd = arr[16];
		this.locplc = arr[17];
		this.mtnCd = arr[18];
		this.lnbr = arr[19];
		this.ho = arr[20];
		this.tong = arr[21];
		this.ban = arr[22];
		this.spcadrs = arr[23];
		this.spcDong = arr[24];
		this.spcHo = arr[25];
		this.rnAddr = arr[26];
		this.prprtyPc = arr[27];
		this.accnutStdrAmt = arr[28];
		this.acqsDeptCd = arr[29];
		this.acqsAmt = arr[30];
		this.acqsYmd = arr[31];
		this.acqsMthSeCd = arr[32];
		this.acqsResn = arr[33];
		this.rgistYn = arr[34];
		this.recpNo = arr[35];
		this.loanPosblYn = arr[36];
		this.saleLmttYn = arr[37];
		this.saleLmttYmd = arr[38];
		this.rm = arr[39];
		this.ladLndcgrCd = arr[40];
		this.rlLndcgrCd = arr[41];
		this.ar = arr[42];
		this.rlAr = arr[43];
		this.oalp = arr[44];
		this.acqsAr = arr[45];
		this.pblonsipQota1 = arr[46];
		this.pblonsipQota2 = arr[47];
		this.spfc = arr[48];
		this.ctyplnDstrc = arr[49];
		this.planFclty = arr[50];
		this.dwk = arr[51];
		this.planBiz = arr[52];
	}	
}
