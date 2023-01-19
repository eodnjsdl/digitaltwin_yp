package egiskorea.com.job.ibbi.service;

import java.io.Serializable;

/**
 * @Description 관내업소정보 model 클래스
 * @author 플랫폼개발부문 DT플랫폼 전영후
 * @since 2022.02.17
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.02.10     이푸름		최초 생성	
 *  2022.02.17   전영후            2차 수정
 *  </pre>
 */

public class InBusinessEstaInfo implements Serializable{

	private static final long serialVersionUID = 4218586621239646164L;
	
	/** 번호 */
	private int no;
	
	/** 행정구역코드 */
	private String pnu;
	
	/** 개방서비스명 */
	private String opnnSvcNm;
	
	/** 개방서비스ID */
	private String opnnSvcId;
	
	/** 개방자치단체코드 */
	private String opnnGmGrpCd;
	
	/** 관리번호 */
	private String mngNo;
	
	/** 인허가일자 */
	private String aupmDe;
	
	/** 인허가취소일자 */
	private String aupmCanlDe;
	
	/** 영업상태구분코드 */
	private String bsnStaeSeCd;
	
	/** 영업상태명 */
	private String bsnStaeNm;
	
	/** 상세영업상태코드 */
	private String dealBsnStaeCd;
	
	/** 상세영업상태명 */
	private String dealBsnStaeNm;
	
	/** 폐업일자 */
	private String cbizDe;
	
	/** 휴업일자 */
	private String sobsDe;
	
	/** 휴업종료일자 */
	private String sobsEndDe;
	
	/** 재개업일자 */
	private String relcDe;
	
	/** 소재지전화 */
	private String lcTlp;
	
	/** 소재지면적 */
	private String lcAr;
	
	/** 소재지우편번호 */
	private String lcZip;
	
	/** 소재지전체주소 */
	private String lcAllAdr;
	
	/** 도로명전체주소 */
	private String rdnAllAdr;
	
	/** 도로명우편번호 */
	private String rdnZip;
	
	/** 사업장명 */
	private String bplcNm;
	
	/** 최종수정시점 */
	private String lastUpdtPnttm;
	
	/** 데이터갱신구분 */
	private String dataUpdtSe;
	
	/** 데이터갱신일자 */
	private String dataUpdtDe;
	
	/** 업태구분명 */
	private String bizcSeNm;
	
	/** lon */
	private double lon;
	
	/** lat */
	private double lat;
	
	/** ST_X(ST_Transform(GEOM,4326)) AS LON_LON */
	private double lonLon;
	
	/** ST_Y(ST_Transform(GEOM,4326)) AS LAT_LAT */
	private double latLat;
	
	/** GEOM */
	private String geom;
	
	/** 버퍼 영역 */
	private String bufferArea;
	
	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}
	
	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

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

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public double getLonLon() {
		return lonLon;
	}

	public void setLonLon(double lonLon) {
		this.lonLon = lonLon;
	}

	public double getLatLat() {
		return latLat;
	}

	public void setLatLat(double latLat) {
		this.latLat = latLat;
	}
	
}
