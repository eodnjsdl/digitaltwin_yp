package egiskorea.com.geo.bsi.service;

import java.io.Serializable;

/**
 * @Class Name : BusinessInfo.java
 * @Description 지목조사정보 model 클래스
 * @Modification Information
 * @
 * @  수정일     	      수정자              		수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.01.23    최초생성
 *
 * @author 스마트융합사업본부 이상화
 * @since 2021. 01.23
 * @version 1.0
 * @see
 */

public class BusinessInfo implements Serializable{

	private static final long serialVersionUID = -2358465116902903742L;
	
	/** 행정구역코드 */
	private String pnu ;
	
	/** 개방 서비스 명 */
	private String opnnSvcNm;
	
	/** 개방 서비스 ID */
	private String opnnSvcId;
	
	/** 개방 자치 단체 코드 */
	private String opnnGmGrpCd;
	
	/** 관리 번호 */
	private String mngNo;
	
	/** 인허가 일자 */
	private String aupmDe;
	
	/** 인허가 취소 일자 */
	private String aupmCanlDe;
	
	/** 영업 상태 구분 코드 */
	private String bsnStaeSeCd;
	
	/** 영업 상태 명 */
	private String bsnStaeNm;
	
	/** 상세 영업 상태 코드 */
	private String dealBsnStaeCd;
	
	/** 상세 영업 상태 명 */
	private String dealBsnStaeNm;
	
	/** 폐업 일자 */
	private String cbizDe;
	
	/** 휴업 일자 */
	private String sobsDe;
	
	/** 휴업 종료 일자 */
	private String sobsEndDe;
	
	/** 재개업 일자 */
	private String relcDe;
	
	/** 소재지 전화 */
	private String lcTlp;
	
	/** 소재지 면적 */
	private String lcAr;
	
	/** 소재지 우편번호 */
	private String lcZip;
	
	/** 소재지 전체 주소 */
	private String lcAllAdr;
	
	/** 도로명 전체 주소 */
	private String rdnAllAdr;
	
	/** 도로명 우편번호 */
	private String rdnZip;
	
	/** 사업장 명*/
	private String bplcNm;
	
	/** 최종 수정 시점 */
	private String lastUpdtPnttm;
	
	/** 데이터 갱신 구분 */
	private String dataUpdtSe;
	
	/** 데이터 갱신 일자 */
	private String dataUpdtDe;
	
	/** 업태 구분 명 */
	private String bizcSeNm;
	
	/** 좌표정보(X) */
	private String lon;
	
	/** 좌표정보(Y) */
	private String lat;

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getOpnnSvcNm() {
		return opnnSvcNm;
	}

	public void setOpnnSvcNm(String opnnSvcNm) {
		this.opnnSvcNm = opnnSvcNm;
	}

	public String getOpnnSvcId() {
		return opnnSvcId;
	}

	public void setOpnnSvcId(String opnnSvcId) {
		this.opnnSvcId = opnnSvcId;
	}

	public String getOpnnGmGrpCd() {
		return opnnGmGrpCd;
	}

	public void setOpnnGmGrpCd(String opnnGmGrpCd) {
		this.opnnGmGrpCd = opnnGmGrpCd;
	}

	public String getMngNo() {
		return mngNo;
	}

	public void setMngNo(String mngNo) {
		this.mngNo = mngNo;
	}

	public String getAupmDe() {
		return aupmDe;
	}

	public void setAupmDe(String aupmDe) {
		this.aupmDe = aupmDe;
	}

	public String getAupmCanlDe() {
		return aupmCanlDe;
	}

	public void setAupmCanlDe(String aupmCanlDe) {
		this.aupmCanlDe = aupmCanlDe;
	}

	public String getBsnStaeSeCd() {
		return bsnStaeSeCd;
	}

	public void setBsnStaeSeCd(String bsnStaeSeCd) {
		this.bsnStaeSeCd = bsnStaeSeCd;
	}

	public String getBsnStaeNm() {
		return bsnStaeNm;
	}

	public void setBsnStaeNm(String bsnStaeNm) {
		this.bsnStaeNm = bsnStaeNm;
	}

	public String getDealBsnStaeCd() {
		return dealBsnStaeCd;
	}

	public void setDealBsnStaeCd(String dealBsnStaeCd) {
		this.dealBsnStaeCd = dealBsnStaeCd;
	}

	public String getDealBsnStaeNm() {
		return dealBsnStaeNm;
	}

	public void setDealBsnStaeNm(String dealBsnStaeNm) {
		this.dealBsnStaeNm = dealBsnStaeNm;
	}

	public String getCbizDe() {
		return cbizDe;
	}

	public void setCbizDe(String cbizDe) {
		this.cbizDe = cbizDe;
	}

	public String getSobsDe() {
		return sobsDe;
	}

	public void setSobsDe(String sobsDe) {
		this.sobsDe = sobsDe;
	}

	public String getSobsEndDe() {
		return sobsEndDe;
	}

	public void setSobsEndDe(String sobsEndDe) {
		this.sobsEndDe = sobsEndDe;
	}

	public String getRelcDe() {
		return relcDe;
	}

	public void setRelcDe(String relcDe) {
		this.relcDe = relcDe;
	}

	public String getLcTlp() {
		return lcTlp;
	}

	public void setLcTlp(String lcTlp) {
		this.lcTlp = lcTlp;
	}

	public String getLcAr() {
		return lcAr;
	}

	public void setLcAr(String lcAr) {
		this.lcAr = lcAr;
	}

	public String getLcZip() {
		return lcZip;
	}

	public void setLcZip(String lcZip) {
		this.lcZip = lcZip;
	}

	public String getLcAllAdr() {
		return lcAllAdr;
	}

	public void setLcAllAdr(String lcAllAdr) {
		this.lcAllAdr = lcAllAdr;
	}

	public String getRdnAllAdr() {
		return rdnAllAdr;
	}

	public void setRdnAllAdr(String rdnAllAdr) {
		this.rdnAllAdr = rdnAllAdr;
	}

	public String getRdnZip() {
		return rdnZip;
	}

	public void setRdnZip(String rdnZip) {
		this.rdnZip = rdnZip;
	}

	public String getBplcNm() {
		return bplcNm;
	}

	public void setBplcNm(String bplcNm) {
		this.bplcNm = bplcNm;
	}

	public String getLastUpdtPnttm() {
		return lastUpdtPnttm;
	}

	public void setLastUpdtPnttm(String lastUpdtPnttm) {
		this.lastUpdtPnttm = lastUpdtPnttm;
	}

	public String getDataUpdtSe() {
		return dataUpdtSe;
	}

	public void setDataUpdtSe(String dataUpdtSe) {
		this.dataUpdtSe = dataUpdtSe;
	}

	public String getDataUpdtDe() {
		return dataUpdtDe;
	}

	public void setDataUpdtDe(String dataUpdtDe) {
		this.dataUpdtDe = dataUpdtDe;
	}

	public String getBizcSeNm() {
		return bizcSeNm;
	}

	public void setBizcSeNm(String bizcSeNm) {
		this.bizcSeNm = bizcSeNm;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}
	
}
