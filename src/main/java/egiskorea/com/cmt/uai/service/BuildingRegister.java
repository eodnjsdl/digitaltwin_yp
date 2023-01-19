package egiskorea.com.cmt.uai.service;

import java.io.Serializable;

/**
 * @Description 건축물대장정보를 관리하는 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.03.10
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.10		이상화	최초 생성
 *      </pre>
 */

public class BuildingRegister implements Serializable {

	private static final long serialVersionUID = -5103914132013076974L;
	
	/** pnu */
	private String pnu = "";
	
	/** 건축물대장 표제부 */
	/** 순번 **/
	private String rnum = "";

	/** 대지위치 **/
	private String platPlc = "";

	/** 시군구코드 **/
	private String sigunguCd = "";

	/** 법정동코드 **/
	private String bjdongCd = "";

	/** 대지구분코드 **/
	private String platGbCd = "";

	/** 번 **/
	private String bun = "";

	/** 지 **/
	private String ji = "";

	/** 관리건축물대장PK **/
	private String mgmBldrgstPk = "";

	/** 대장구분코드 **/
	private String regstrGbCd = "";

	/** 대장구분코드명 **/
	private String regstrGbCdNm = "";

	/** 대장종류코드 **/
	private String regstrKindCd = "";

	/** 대장종류코드명 **/
	private String regstrKindCdNm = "";

	/** 도로명대지위치 **/
	private String newPlatPlc = "";

	/** 건물명 **/
	private String bldNm = "";

	/** 특수지명 **/
	private String splotNm = "";

	/** 블록 **/
	private String block = "";

	/** 로트 **/
	private String lot = "";

	/** 외필지수 **/
	private String bylotCnt = "";

	/** 새주소도로코드 **/
	private String naRoadCd = "";

	/** 새주소법정동코드 **/
	private String naBjdongCd = "";

	/** 새주소지상지하코드 **/
	private String naUgrndCd = "";

	/** 새주소본번 **/
	private String naMainBun = "";

	/** 새주소부번 **/
	private String naSubBun = "";

	/** 동명칭 **/
	private String dongNm = "";

	/** 주부속구분코드 **/
	private String mainAtchGbCd = "";

	/** 주부속구분코드명 **/
	private String mainAtchGbCdNm = "";

	/** 대지면적(㎡) **/
	private String platArea = "";

	/** 건축면적(㎡) **/
	private String archArea = "";

	/** 건폐율(%) **/
	private String bcRat = "";

	/** 연면적(㎡) **/
	private String totArea = "";

	/** 용적률산정연면적(㎡) **/
	private String vlRatEstmTotArea = "";

	/** 용적률(%) **/
	private String vlRat = "";

	/** 구조코드 **/
	private String strctCd = "";

	/** 구조코드명 **/
	private String strctCdNm = "";

	/** 기타구조 **/
	private String etcStrct = "";

	/** 주용도코드 **/
	private String mainPurpsCd = "";

	/** 주용도코드명 **/
	private String mainPurpsCdNm = "";

	/** 기타용도 **/
	private String etcPurps = "";

	/** 지붕코드 **/
	private String roofCd = "";

	/** 지붕코드명 **/
	private String roofCdNm = "";

	/** 기타지붕 **/
	private String etcRoof = "";

	/** 세대수(세대) **/
	private String hhldCnt = "";

	/** 가구수(가구) **/
	private String fmlyCnt = "";

	/** 높이(m) **/
	private String heit = "";

	/** 지상층수 **/
	private String grndFlrCnt = "";

	/** 지하층수 **/
	private String ugrndFlrCnt = "";

	/** 승용승강기수 **/
	private String rideUseElvtCnt = "";

	/** 비상용승강기수 **/
	private String emgenUseElvtCnt = "";

	/** 부속건축물수 **/
	private String atchBldCnt = "";

	/** 부속건축물면적(㎡) **/
	private String atchBldArea = "";

	/** 총동연면적(㎡) **/
	private String totDongTotArea = "";

	/** 옥내기계식대수(대) **/
	private String indrMechUtcnt = "";

	/** 옥내기계식면적(㎡) **/
	private String indrMechArea = "";

	/** 옥외기계식대수(대) **/
	private String oudrMechUtcnt = "";

	/** 옥외기계식면적(㎡) **/
	private String oudrMechArea = "";

	/** 옥내자주식대수(대) **/
	private String indrAutoUtcnt = "";

	/** 옥내자주식면적(㎡) **/
	private String indrAutoArea = "";

	/** 옥외자주식대수(대) **/
	private String oudrAutoUtcnt = "";

	/** 옥외자주식면적(㎡) **/
	private String oudrAutoArea = "";

	/** 허가일 **/
	private String pmsDay = "";

	/** 착공일 **/
	private String stcnsDay = "";

	/** 사용승인일 **/
	private String useAprDay = "";

	/** 허가번호년 **/
	private String pmsnoYear = "";

	/** 허가번호기관코드 **/
	private String pmsnoKikCd = "";

	/** 허가번호기관코드명 **/
	private String pmsnoKikCdNm = "";

	/** 허가번호구분코드 **/
	private String pmsnoGbCd = "";

	/** 허가번호구분코드명 **/
	private String pmsnoGbCdNm = "";

	/** 호수(호) **/
	private String hoCnt = "";

	/** 에너지효율등급 **/
	private String engrGrade = "";

	/** 에너지절감율 **/
	private String engrRat = "";

	/** EPI점수 **/
	private String engrEpi = "";

	/** 친환경건축물등급 **/
	private String gnBldGrade = "";

	/** 친환경건축물인증점수 **/
	private String gnBldCert = "";

	/** 지능형건축물등급 **/
	private String itgBldGrade = "";

	/** 지능형건축물인증점수 **/
	private String itgBldCert = "";

	/** 생성일자 **/
	private String crtnDay = "";

	/** 내진 설계 적용 여부 **/
	private String rserthqkDsgnApplyYn = "";

	/** 내진 능력 **/
	private String rserthqkAblty = "";
	
	/** 건축물대장 층별개요 */
	/** 층구분코드 **/
	private String flrGbCd = "";

	/** 층구분코드명 **/
	private String flrGbCdNm = "";

	/** 층번호 **/
	private String flrNo = "";

	/** 층번호명 **/
	private String flrNoNm = "";

	/** 면적(㎡) **/
	private String area = "";

	/** 면적제외여부 **/
	private String areaExctYn = "";
	
	/** 건축물대장 부속지번 */
	/** 부속대장구분코드 **/
	private String atchRegstrGbCd = "";

	/** 부속대장구분코드명 **/
	private String atchRegstrGbCdNm = "";

	/** 부속시군구코드 **/
	private String atchSigunguCd = "";

	/** 부속법정동코드 **/
	private String atchBjdongCd = "";

	/** 부속대지구분코드 **/
	private String atchPlatGbCd = "";

	/** 부속번 **/
	private String atchBun = "";

	/** 부속지 **/
	private String atchJi = "";

	/** 부속특수지명 **/
	private String atchSplotNm = "";

	/** 부속블록 **/
	private String atchBlock = "";

	/** 부속로트 **/
	private String atchLot = "";

	/** 부속기타지번명 **/
	private String atchEtcJibunNm = "";

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getRnum() {
		return rnum;
	}

	public void setRnum(String rnum) {
		this.rnum = rnum;
	}

	public String getPlatPlc() {
		return platPlc;
	}

	public void setPlatPlc(String platPlc) {
		this.platPlc = platPlc;
	}

	public String getSigunguCd() {
		return sigunguCd;
	}

	public void setSigunguCd(String sigunguCd) {
		this.sigunguCd = sigunguCd;
	}

	public String getBjdongCd() {
		return bjdongCd;
	}

	public void setBjdongCd(String bjdongCd) {
		this.bjdongCd = bjdongCd;
	}

	public String getPlatGbCd() {
		return platGbCd;
	}

	public void setPlatGbCd(String platGbCd) {
		this.platGbCd = platGbCd;
	}

	public String getBun() {
		return bun;
	}

	public void setBun(String bun) {
		this.bun = bun;
	}

	public String getJi() {
		return ji;
	}

	public void setJi(String ji) {
		this.ji = ji;
	}

	public String getMgmBldrgstPk() {
		return mgmBldrgstPk;
	}

	public void setMgmBldrgstPk(String mgmBldrgstPk) {
		this.mgmBldrgstPk = mgmBldrgstPk;
	}

	public String getRegstrGbCd() {
		return regstrGbCd;
	}

	public void setRegstrGbCd(String regstrGbCd) {
		this.regstrGbCd = regstrGbCd;
	}

	public String getRegstrGbCdNm() {
		return regstrGbCdNm;
	}

	public void setRegstrGbCdNm(String regstrGbCdNm) {
		this.regstrGbCdNm = regstrGbCdNm;
	}

	public String getRegstrKindCd() {
		return regstrKindCd;
	}

	public void setRegstrKindCd(String regstrKindCd) {
		this.regstrKindCd = regstrKindCd;
	}

	public String getRegstrKindCdNm() {
		return regstrKindCdNm;
	}

	public void setRegstrKindCdNm(String regstrKindCdNm) {
		this.regstrKindCdNm = regstrKindCdNm;
	}

	public String getNewPlatPlc() {
		return newPlatPlc;
	}

	public void setNewPlatPlc(String newPlatPlc) {
		this.newPlatPlc = newPlatPlc;
	}

	public String getBldNm() {
		return bldNm;
	}

	public void setBldNm(String bldNm) {
		this.bldNm = bldNm;
	}

	public String getSplotNm() {
		return splotNm;
	}

	public void setSplotNm(String splotNm) {
		this.splotNm = splotNm;
	}

	public String getBlock() {
		return block;
	}

	public void setBlock(String block) {
		this.block = block;
	}

	public String getLot() {
		return lot;
	}

	public void setLot(String lot) {
		this.lot = lot;
	}

	public String getBylotCnt() {
		return bylotCnt;
	}

	public void setBylotCnt(String bylotCnt) {
		this.bylotCnt = bylotCnt;
	}

	public String getNaRoadCd() {
		return naRoadCd;
	}

	public void setNaRoadCd(String naRoadCd) {
		this.naRoadCd = naRoadCd;
	}

	public String getNaBjdongCd() {
		return naBjdongCd;
	}

	public void setNaBjdongCd(String naBjdongCd) {
		this.naBjdongCd = naBjdongCd;
	}

	public String getNaUgrndCd() {
		return naUgrndCd;
	}

	public void setNaUgrndCd(String naUgrndCd) {
		this.naUgrndCd = naUgrndCd;
	}

	public String getNaMainBun() {
		return naMainBun;
	}

	public void setNaMainBun(String naMainBun) {
		this.naMainBun = naMainBun;
	}

	public String getNaSubBun() {
		return naSubBun;
	}

	public void setNaSubBun(String naSubBun) {
		this.naSubBun = naSubBun;
	}

	public String getDongNm() {
		return dongNm;
	}

	public void setDongNm(String dongNm) {
		this.dongNm = dongNm;
	}

	public String getMainAtchGbCd() {
		return mainAtchGbCd;
	}

	public void setMainAtchGbCd(String mainAtchGbCd) {
		this.mainAtchGbCd = mainAtchGbCd;
	}

	public String getMainAtchGbCdNm() {
		return mainAtchGbCdNm;
	}

	public void setMainAtchGbCdNm(String mainAtchGbCdNm) {
		this.mainAtchGbCdNm = mainAtchGbCdNm;
	}

	public String getPlatArea() {
		return platArea;
	}

	public void setPlatArea(String platArea) {
		this.platArea = platArea;
	}

	public String getArchArea() {
		return archArea;
	}

	public void setArchArea(String archArea) {
		this.archArea = archArea;
	}

	public String getBcRat() {
		return bcRat;
	}

	public void setBcRat(String bcRat) {
		this.bcRat = bcRat;
	}

	public String getTotArea() {
		return totArea;
	}

	public void setTotArea(String totArea) {
		this.totArea = totArea;
	}

	public String getVlRatEstmTotArea() {
		return vlRatEstmTotArea;
	}

	public void setVlRatEstmTotArea(String vlRatEstmTotArea) {
		this.vlRatEstmTotArea = vlRatEstmTotArea;
	}

	public String getVlRat() {
		return vlRat;
	}

	public void setVlRat(String vlRat) {
		this.vlRat = vlRat;
	}

	public String getStrctCd() {
		return strctCd;
	}

	public void setStrctCd(String strctCd) {
		this.strctCd = strctCd;
	}

	public String getStrctCdNm() {
		return strctCdNm;
	}

	public void setStrctCdNm(String strctCdNm) {
		this.strctCdNm = strctCdNm;
	}

	public String getEtcStrct() {
		return etcStrct;
	}

	public void setEtcStrct(String etcStrct) {
		this.etcStrct = etcStrct;
	}

	public String getMainPurpsCd() {
		return mainPurpsCd;
	}

	public void setMainPurpsCd(String mainPurpsCd) {
		this.mainPurpsCd = mainPurpsCd;
	}

	public String getMainPurpsCdNm() {
		return mainPurpsCdNm;
	}

	public void setMainPurpsCdNm(String mainPurpsCdNm) {
		this.mainPurpsCdNm = mainPurpsCdNm;
	}

	public String getEtcPurps() {
		return etcPurps;
	}

	public void setEtcPurps(String etcPurps) {
		this.etcPurps = etcPurps;
	}

	public String getRoofCd() {
		return roofCd;
	}

	public void setRoofCd(String roofCd) {
		this.roofCd = roofCd;
	}

	public String getRoofCdNm() {
		return roofCdNm;
	}

	public void setRoofCdNm(String roofCdNm) {
		this.roofCdNm = roofCdNm;
	}

	public String getEtcRoof() {
		return etcRoof;
	}

	public void setEtcRoof(String etcRoof) {
		this.etcRoof = etcRoof;
	}

	public String getHhldCnt() {
		return hhldCnt;
	}

	public void setHhldCnt(String hhldCnt) {
		this.hhldCnt = hhldCnt;
	}

	public String getFmlyCnt() {
		return fmlyCnt;
	}

	public void setFmlyCnt(String fmlyCnt) {
		this.fmlyCnt = fmlyCnt;
	}

	public String getHeit() {
		return heit;
	}

	public void setHeit(String heit) {
		this.heit = heit;
	}

	public String getGrndFlrCnt() {
		return grndFlrCnt;
	}

	public void setGrndFlrCnt(String grndFlrCnt) {
		this.grndFlrCnt = grndFlrCnt;
	}

	public String getUgrndFlrCnt() {
		return ugrndFlrCnt;
	}

	public void setUgrndFlrCnt(String ugrndFlrCnt) {
		this.ugrndFlrCnt = ugrndFlrCnt;
	}

	public String getRideUseElvtCnt() {
		return rideUseElvtCnt;
	}

	public void setRideUseElvtCnt(String rideUseElvtCnt) {
		this.rideUseElvtCnt = rideUseElvtCnt;
	}

	public String getEmgenUseElvtCnt() {
		return emgenUseElvtCnt;
	}

	public void setEmgenUseElvtCnt(String emgenUseElvtCnt) {
		this.emgenUseElvtCnt = emgenUseElvtCnt;
	}

	public String getAtchBldCnt() {
		return atchBldCnt;
	}

	public void setAtchBldCnt(String atchBldCnt) {
		this.atchBldCnt = atchBldCnt;
	}

	public String getAtchBldArea() {
		return atchBldArea;
	}

	public void setAtchBldArea(String atchBldArea) {
		this.atchBldArea = atchBldArea;
	}

	public String getTotDongTotArea() {
		return totDongTotArea;
	}

	public void setTotDongTotArea(String totDongTotArea) {
		this.totDongTotArea = totDongTotArea;
	}

	public String getIndrMechUtcnt() {
		return indrMechUtcnt;
	}

	public void setIndrMechUtcnt(String indrMechUtcnt) {
		this.indrMechUtcnt = indrMechUtcnt;
	}

	public String getIndrMechArea() {
		return indrMechArea;
	}

	public void setIndrMechArea(String indrMechArea) {
		this.indrMechArea = indrMechArea;
	}

	public String getOudrMechUtcnt() {
		return oudrMechUtcnt;
	}

	public void setOudrMechUtcnt(String oudrMechUtcnt) {
		this.oudrMechUtcnt = oudrMechUtcnt;
	}

	public String getOudrMechArea() {
		return oudrMechArea;
	}

	public void setOudrMechArea(String oudrMechArea) {
		this.oudrMechArea = oudrMechArea;
	}

	public String getIndrAutoUtcnt() {
		return indrAutoUtcnt;
	}

	public void setIndrAutoUtcnt(String indrAutoUtcnt) {
		this.indrAutoUtcnt = indrAutoUtcnt;
	}

	public String getIndrAutoArea() {
		return indrAutoArea;
	}

	public void setIndrAutoArea(String indrAutoArea) {
		this.indrAutoArea = indrAutoArea;
	}

	public String getOudrAutoUtcnt() {
		return oudrAutoUtcnt;
	}

	public void setOudrAutoUtcnt(String oudrAutoUtcnt) {
		this.oudrAutoUtcnt = oudrAutoUtcnt;
	}

	public String getOudrAutoArea() {
		return oudrAutoArea;
	}

	public void setOudrAutoArea(String oudrAutoArea) {
		this.oudrAutoArea = oudrAutoArea;
	}

	public String getPmsDay() {
		return pmsDay;
	}

	public void setPmsDay(String pmsDay) {
		this.pmsDay = pmsDay;
	}

	public String getStcnsDay() {
		return stcnsDay;
	}

	public void setStcnsDay(String stcnsDay) {
		this.stcnsDay = stcnsDay;
	}

	public String getUseAprDay() {
		return useAprDay;
	}

	public void setUseAprDay(String useAprDay) {
		this.useAprDay = useAprDay;
	}

	public String getPmsnoYear() {
		return pmsnoYear;
	}

	public void setPmsnoYear(String pmsnoYear) {
		this.pmsnoYear = pmsnoYear;
	}

	public String getPmsnoKikCd() {
		return pmsnoKikCd;
	}

	public void setPmsnoKikCd(String pmsnoKikCd) {
		this.pmsnoKikCd = pmsnoKikCd;
	}

	public String getPmsnoKikCdNm() {
		return pmsnoKikCdNm;
	}

	public void setPmsnoKikCdNm(String pmsnoKikCdNm) {
		this.pmsnoKikCdNm = pmsnoKikCdNm;
	}

	public String getPmsnoGbCd() {
		return pmsnoGbCd;
	}

	public void setPmsnoGbCd(String pmsnoGbCd) {
		this.pmsnoGbCd = pmsnoGbCd;
	}

	public String getPmsnoGbCdNm() {
		return pmsnoGbCdNm;
	}

	public void setPmsnoGbCdNm(String pmsnoGbCdNm) {
		this.pmsnoGbCdNm = pmsnoGbCdNm;
	}

	public String getHoCnt() {
		return hoCnt;
	}

	public void setHoCnt(String hoCnt) {
		this.hoCnt = hoCnt;
	}

	public String getEngrGrade() {
		return engrGrade;
	}

	public void setEngrGrade(String engrGrade) {
		this.engrGrade = engrGrade;
	}

	public String getEngrRat() {
		return engrRat;
	}

	public void setEngrRat(String engrRat) {
		this.engrRat = engrRat;
	}

	public String getEngrEpi() {
		return engrEpi;
	}

	public void setEngrEpi(String engrEpi) {
		this.engrEpi = engrEpi;
	}

	public String getGnBldGrade() {
		return gnBldGrade;
	}

	public void setGnBldGrade(String gnBldGrade) {
		this.gnBldGrade = gnBldGrade;
	}

	public String getGnBldCert() {
		return gnBldCert;
	}

	public void setGnBldCert(String gnBldCert) {
		this.gnBldCert = gnBldCert;
	}

	public String getItgBldGrade() {
		return itgBldGrade;
	}

	public void setItgBldGrade(String itgBldGrade) {
		this.itgBldGrade = itgBldGrade;
	}

	public String getItgBldCert() {
		return itgBldCert;
	}

	public void setItgBldCert(String itgBldCert) {
		this.itgBldCert = itgBldCert;
	}

	public String getCrtnDay() {
		return crtnDay;
	}

	public void setCrtnDay(String crtnDay) {
		this.crtnDay = crtnDay;
	}

	public String getRserthqkDsgnApplyYn() {
		return rserthqkDsgnApplyYn;
	}

	public void setRserthqkDsgnApplyYn(String rserthqkDsgnApplyYn) {
		this.rserthqkDsgnApplyYn = rserthqkDsgnApplyYn;
	}

	public String getRserthqkAblty() {
		return rserthqkAblty;
	}

	public void setRserthqkAblty(String rserthqkAblty) {
		this.rserthqkAblty = rserthqkAblty;
	}

	public String getFlrGbCd() {
		return flrGbCd;
	}

	public void setFlrGbCd(String flrGbCd) {
		this.flrGbCd = flrGbCd;
	}

	public String getFlrGbCdNm() {
		return flrGbCdNm;
	}

	public void setFlrGbCdNm(String flrGbCdNm) {
		this.flrGbCdNm = flrGbCdNm;
	}

	public String getFlrNo() {
		return flrNo;
	}

	public void setFlrNo(String flrNo) {
		this.flrNo = flrNo;
	}

	public String getFlrNoNm() {
		return flrNoNm;
	}

	public void setFlrNoNm(String flrNoNm) {
		this.flrNoNm = flrNoNm;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAreaExctYn() {
		return areaExctYn;
	}

	public void setAreaExctYn(String areaExctYn) {
		this.areaExctYn = areaExctYn;
	}

	public String getAtchRegstrGbCd() {
		return atchRegstrGbCd;
	}

	public void setAtchRegstrGbCd(String atchRegstrGbCd) {
		this.atchRegstrGbCd = atchRegstrGbCd;
	}

	public String getAtchRegstrGbCdNm() {
		return atchRegstrGbCdNm;
	}

	public void setAtchRegstrGbCdNm(String atchRegstrGbCdNm) {
		this.atchRegstrGbCdNm = atchRegstrGbCdNm;
	}

	public String getAtchSigunguCd() {
		return atchSigunguCd;
	}

	public void setAtchSigunguCd(String atchSigunguCd) {
		this.atchSigunguCd = atchSigunguCd;
	}

	public String getAtchBjdongCd() {
		return atchBjdongCd;
	}

	public void setAtchBjdongCd(String atchBjdongCd) {
		this.atchBjdongCd = atchBjdongCd;
	}

	public String getAtchPlatGbCd() {
		return atchPlatGbCd;
	}

	public void setAtchPlatGbCd(String atchPlatGbCd) {
		this.atchPlatGbCd = atchPlatGbCd;
	}

	public String getAtchBun() {
		return atchBun;
	}

	public void setAtchBun(String atchBun) {
		this.atchBun = atchBun;
	}

	public String getAtchJi() {
		return atchJi;
	}

	public void setAtchJi(String atchJi) {
		this.atchJi = atchJi;
	}

	public String getAtchSplotNm() {
		return atchSplotNm;
	}

	public void setAtchSplotNm(String atchSplotNm) {
		this.atchSplotNm = atchSplotNm;
	}

	public String getAtchBlock() {
		return atchBlock;
	}

	public void setAtchBlock(String atchBlock) {
		this.atchBlock = atchBlock;
	}

	public String getAtchLot() {
		return atchLot;
	}

	public void setAtchLot(String atchLot) {
		this.atchLot = atchLot;
	}

	public String getAtchEtcJibunNm() {
		return atchEtcJibunNm;
	}

	public void setAtchEtcJibunNm(String atchEtcJibunNm) {
		this.atchEtcJibunNm = atchEtcJibunNm;
	}
}
