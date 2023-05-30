/***********************************
* 공유재산 실태조사서 VO
* @author  : 이혜인
* @since   : 2023.02.23
* @version : 1.0
************************************/
package egiskorea.com.job.adas.publnd.service;

public class PbprtAccdtWrinvstgVO {
	private int publndNo;				// 공유지_번호
	private String publndSe;			// 공유지_구분
	private String locplc;				// 소재지
	private String ldcgCd;				// 지목_코드
	private String ldcgCdNm;			// 지목_코드
	private Double ar;					// 면적
	private int oalp;					// 공시지가
	private String rm;					// 비고
	private String addr;				// 주소
	private String nm;					// 성명
	private Double possesnAr;			// 점유_면적
	private String possesnCn;			// 점유_내용
	private String cttpc;				// 연락처
	private String loanPosblYn;			// 대부_가능_여부
	private String bsrpCn;				// 출장_내용
	private String exmnr;				// 조사자
	private String wrtYn;				// 작성_여부
	private String satlitPhoto;			// 위성_사진
	private String sptPhoto;			// 현장_사진
	private String atchFileId;			// 파일_아이디
	private String fileSn;				// 파일_순번
	private String fileDelYn;			// 파일_삭제_여부
	private int sptPhotoSn = 9;			// 현장_사진_순번
	private int satlitPhotoSn = 9;		// 위성_사진_순번
	
	public int getPublndNo() {
		return publndNo;
	}
	public void setPublndNo(int publndNo) {
		this.publndNo = publndNo;
	}
	public String getPublndSe() {
		return publndSe;
	}
	public void setPublndSe(String publndSe) {
		this.publndSe = publndSe;
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
	public Double getAr() {
		return ar;
	}
	public void setAr(Double ar) {
		this.ar = ar;
	}
	public int getOalp() {
		return oalp;
	}
	public void setOalp(int oalp) {
		this.oalp = oalp;
	}
	public String getRm() {
		return rm;
	}
	public void setRm(String rm) {
		this.rm = rm;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getNm() {
		return nm;
	}
	public void setNm(String nm) {
		this.nm = nm;
	}
	public Double getPossesnAr() {
		return possesnAr;
	}
	public void setPossesnAr(Double possesnAr) {
		this.possesnAr = possesnAr;
	}
	public String getPossesnCn() {
		return possesnCn;
	}
	public void setPossesnCn(String possesnCn) {
		this.possesnCn = possesnCn;
	}
	public String getCttpc() {
		return cttpc;
	}
	public void setCttpc(String cttpc) {
		this.cttpc = cttpc;
	}
	public String getLoanPosblYn() {
		return loanPosblYn;
	}
	public void setLoanPosblYn(String loanPosblYn) {
		this.loanPosblYn = loanPosblYn;
	}
	public String getBsrpCn() {
		return bsrpCn;
	}
	public void setBsrpCn(String bsrpCn) {
		this.bsrpCn = bsrpCn;
	}
	public String getExmnr() {
		return exmnr;
	}
	public void setExmnr(String exmnr) {
		this.exmnr = exmnr;
	}
	public String getWrtYn() {
		return wrtYn;
	}
	public void setWrtYn(String wrtYn) {
		this.wrtYn = wrtYn;
	}
	public String getSatlitPhoto() {
		return satlitPhoto;
	}
	public void setSatlitPhoto(String satlitPhoto) {
		this.satlitPhoto = satlitPhoto;
	}
	public String getSptPhoto() {
		return sptPhoto;
	}
	public void setSptPhoto(String sptPhoto) {
		this.sptPhoto = sptPhoto;
	}
	public String getAtchFileId() {
		return atchFileId;
	}
	public void setAtchFileId(String atchFileId) {
		this.atchFileId = atchFileId;
	}
	public String getFileSn() {
		return fileSn;
	}
	public void setFileSn(String fileSn) {
		this.fileSn = fileSn;
	}
	public String getFileDelYn() {
		return fileDelYn;
	}
	public void setFileDelYn(String fileDelYn) {
		this.fileDelYn = fileDelYn;
	}
	public int getSptPhotoSn() {
		return sptPhotoSn;
	}
	public void setSptPhotoSn(int sptPhotoSn) {
		this.sptPhotoSn = sptPhotoSn;
	}
	public int getSatlitPhotoSn() {
		return satlitPhotoSn;
	}
	public void setSatlitPhotoSn(int satlitPhotoSn) {
		this.satlitPhotoSn = satlitPhotoSn;
	}
	public String getLdcgCdNm() {
		return ldcgCdNm;
	}
	public void setLdcgCdNm(String ldcgCdNm) {
		this.ldcgCdNm = ldcgCdNm;
	}
	
}
