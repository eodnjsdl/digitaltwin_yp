package egiskorea.com.cmt.uai.service;

import java.io.Serializable;

/**
 * @Description 통합행정정보를 관리하는 model 클래스
 * @author 플랫폼개발부문 DT솔루션 이상화
 * @since 2022.03.07
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.03.07		이상화	최초 생성
 *  </pre>
 */

public class UnityAdministrationInfo implements Serializable{

	private static final long serialVersionUID = -7411436219641386953L;
	
	/** 공통 */	
	/** 건물식별번호 **/
	private String bldgGbnNo = "";

	/** 공시지가 **/
	private String pannJiga = "";
	
	/** 기준년도 **/
	private String baseYear = "";
	
	/** 토지(임야) 대장 */	
	/** 행정구역코드 */
	private String admSectCd = "";
	
	/** 소재지코드 */
	private String landLocCd = "";
	
	/** 대장구분 */
	private String ledgGbn = "";
	
	/** 본번 */
	private String bobn = "";
	
	/** 부번 */
	private String bubn = "";
	
	/** 지목코드 */
	private String jimok = "";
	
	/** 지목명 */
	private String jimokNm = "";
	
	/** 면적 */
	private String parea = "";
	
	/** grd */
	private String grd = "";
	
	/** 등급변동일자 */
	private String grdYmd = "";
	
	/** 이동사유코드 */
	private String landMovRsnCd = "";
	
	/** 이동사유명 **/
	private String landMovRsnCdNm = "";
	
	/** 이동일자 **/
	private String landMovYmd = "";
	
	/** 대장대조필구분 **/
	private String ledgCntrstCnfGbn = "";
	
	/** 사업시행신고구분 **/
	private String bizActNtcGbn = "";
	
	/** 도해/수치 구분 **/
	private String mapGbn = "";
	
	/** 토지최종연혁순번 **/
	private String landLastHistOdrno = "";
	
	/** 소유권최종연혁순번 **/
	private String ownRgtLastHistOdrno = "";
	
	/** 소유자명 **/
	private String ownerNm = "";
	
	/** 등록번호 **/
	private String dregno = "";
	
	/** 소유구분코드 **/
	private String ownGbn = "";
	
	/** 소유구분명 **/
	private String ownGbnNm = "";
	
	/** 공유인수 **/
	private String shrCnt = "";
	
	/** 주소 **/
	private String ownerAddr = "";
	
	/** 변동원인코드 **/
	private String ownRgtChgRsnCd = "";
	
	/** 변동원인명 **/
	private String ownRgtChgRsnCdNm = "";
	
	/** 변동일자 **/
	private String owndymd = "";
	
	/** 축척코드 **/
	private String scale = "";
	
	/** 축척명 **/
	private String scaleNm = "";
	
	/** 도호 **/
	private String doho = "";
	
	/** 공시지가기준월 **/
	private String jigaBaseMon = "";	
	
	/** 최종종번 **/
	private String lastJibn = "";
	
	/** 본번의 최종부번 **/
	private String lastBu = "";
	
	/** 최종종번의 본번 **/
	private String lastbobn = "";
	
	/** 최종종번의 부번 **/
	private String lastbubn = "";
	
	/** 토지이동담당당자ID **/
	private String landMovChrgManId = "";
	
	/** 소유권변동담당자ID **/
	private String ownRgtChgChrgManId = "";	
	
	/** 관련지번 **/
	private String landMoveRellJibn = "";
	
	/** 토지이동연혁 */
	/** 말소일자 **/
	private String delYmd = "";
	
	/** 토지이동말소일자 **/
	private String landMovDelYmd = "";
	
	/** 토지이동연혁순번 **/
	private String landMovHistOdrno = "";
	
	/** 연혁순번 **/
	private String landHistOdrno = "";
	
	/** 이동일자 **/
	private String dymd = "";
	
	/** 지번 **/
	private String jibun = "";
	
	/** 소유권 변동연혁 */
	/** 소유권변동연혁 **/
	private String ownChgHist = "";
	
	/** 연혁순번 **/
	private String dodrno = "";
	
	/** 소유권연혁순번 **/
	private String ownRgtChgHistOdrno = "";

	/** 건물통합정보 */
	/** 건물통합정보 정보 **/
	private String gisBldgIntergInfo = "";
	
	/** 소재지명 **/
	private String landLocNm = "";
	
	/** 지번 **/
	private String jibn = "";
	
	/** PNU **/
	private String pnu = "";
	
	/** UFID **/
	private String ufid = "";
	
	/** 건물명 **/
	private String bldgNm = "";
	
	/** 동 **/
	private String dong = "";
	
	/** 대지면적 **/
	private String larea = "";
	
	/** 건축면적 **/
	private String barea = "";
	
	/** 연면적 **/
	private String garea = "";
	
	/** 건폐율 **/
	private String blr = "";
	
	/** 용적율 **/
	private String fsi = "";
	
	/** 위반건물여부 **/
	private String vioBldgYn = "";
	
	/** 지상층수 **/
	private String uflr = "";
	
	/** 지하층수 **/
	private String bflr = "";
	
	/** 높이 **/
	private String hgt = "";
	
	/** 주구조코드 **/
	private String struCd = "";
	
	/** 주구조 **/
	private String struNm = "";
	
	/** 주용도코드 **/
	private String mainUseCd = "";
	
	/** 주용도명 **/
	private String mainUseNm = "";
	
	/** 승인일자 **/
	private String useAprvYmd = "";
	
	/** 주/부건축물코드 **/
	private String mainSubGbn = "";
	
	/** 주/부건축물명 **/
	private String mainSubGbnNm = "";
	
	/** 데이터생성(변경)일자 **/
	private String registDay = "";
	
	/** 공간정보출처코드 **/
	private String bndrInfoSrcCd = "";
	
	/** 공간정보출처명 **/
	private String bndrInfoSrcNm = "";
	
	/** 속성정보출처코드 **/
	private String attrInfoSrcCd = "";
	
	/** 속성정보출처명 **/
	private String attrInfoSrcNm = "";
	
	/** 기타건축물명 **/
	private String kmName = "";
	
	/** 기타건축물 출처코드 **/
	private String kmNameSrc = "";
	
	/** 기타건축물 출처 **/
	private String kmNameSrcNm = "";
	
	/** 건축허가번호 **/
	private String permiNum = "";
	
	/** 공용건축물승인번호 **/
	private String useAprNum = "";
	
	/** 대상외건물코드 **/
	private String etcCd = "";
	
	/** 대상외건물 **/
	private String etcCdNm = "";
	
	/** 지번변경검토코드 **/
	private String chJibun = "";
	
	/** 지번변경검토 **/
	private String chJibunNm = "";
	
	/** 매칭유형코드 **/
	private String matCd = "";
	
	/** 매칭기준코드 **/
	private String sMat = "";
	
	/** 매칭기준명 **/
	private String sMatNm = "";
	
	/** 건물수 **/
	private String bldCnt = "";
	
	/** 대장수 **/
	private String aisCnt = "";
	
	/** 수치지형도 제작일 **/
	private String nemDate = "";
	
	/** 원지번 **/
	private String pnuOrg = "";
	
	/** 매칭유형 세부코드 **/
	private String buMatGbCd = "";
	
	/** 매칭유형 세부정보 **/
	private String buMatGbNm = "";
	
	/**  **/
	private String subInfoCnt = "";
	
	/** 관련지번 **/
	private String reljibun = "";
	
	/** 토지이용계획 */
	/** 용도지역지구 코드 **/
	private String ucode = "";
	
	/** 용도지역코드 번호 **/
	private String divno = "";
	
	/** 용도지역지구 형태 **/
	private String gubun = "";
	
	/** 저촉여부 **/
	private String ctype = "";
	
	/** 용도지역지구 명 **/
	private String unm = "";
	
	/** 일련번호 **/
	private String seq = "";
	
	/** 법률명 **/
	private String lawnm = "";
	
	/** 용도지역지구 명 **/
	private String uname = "";
	
	/** 공시지가 */
	/** 공시지가 **/
	private String jiga = "";
	
	/** 기준월 **/
	private String baseMon = "";
	
	/** 공시일자 **/
	private String pannYmd = "";
	
	/** 비고 **/
	private String remark = "";
	
	/** 개별주택공시가격 */
	/** 개별주택가격 **/
	private String indiHousePrc = "";
	
	/** 토지 면적 **/
	private String landArea = "";
	
	/** 토지 산정 면적 **/
	private String landCalcArea = "";
	
	/** 건물 번호 **/
	private String bldgNo = "";
	
	/** 건물 면적 **/
	private String bldgArea = "";
	
	/** 건물 산정 면적 **/
	private String bldgCalcArea = "";
	
	/** 공시 기준월 **/
	private String stdmt = "";


	public String getBldgGbnNo() {
		return bldgGbnNo;
	}

	public void setBldgGbnNo(String bldgGbnNo) {
		this.bldgGbnNo = bldgGbnNo;
	}

	public String getPannJiga() {
		return pannJiga;
	}

	public void setPannJiga(String pannJiga) {
		this.pannJiga = pannJiga;
	}

	public String getAdmSectCd() {
		return admSectCd;
	}

	public void setAdmSectCd(String admSectCd) {
		this.admSectCd = admSectCd;
	}

	public String getLandLocCd() {
		return landLocCd;
	}

	public void setLandLocCd(String landLocCd) {
		this.landLocCd = landLocCd;
	}

	public String getLedgGbn() {
		return ledgGbn;
	}

	public void setLedgGbn(String ledgGbn) {
		this.ledgGbn = ledgGbn;
	}

	public String getBobn() {
		return bobn;
	}

	public void setBobn(String bobn) {
		this.bobn = bobn;
	}

	public String getBubn() {
		return bubn;
	}

	public void setBubn(String bubn) {
		this.bubn = bubn;
	}

	public String getJimok() {
		return jimok;
	}

	public void setJimok(String jimok) {
		this.jimok = jimok;
	}

	public String getJimokNm() {
		return jimokNm;
	}

	public void setJimokNm(String jimokNm) {
		this.jimokNm = jimokNm;
	}

	public String getParea() {
		return parea;
	}

	public void setParea(String parea) {
		this.parea = parea;
	}

	public String getGrd() {
		return grd;
	}

	public void setGrd(String grd) {
		this.grd = grd;
	}

	public String getGrdYmd() {
		return grdYmd;
	}

	public void setGrdYmd(String grdYmd) {
		this.grdYmd = grdYmd;
	}

	public String getLandMovRsnCd() {
		return landMovRsnCd;
	}

	public void setLandMovRsnCd(String landMovRsnCd) {
		this.landMovRsnCd = landMovRsnCd;
	}

	public String getLandMovRsnCdNm() {
		return landMovRsnCdNm;
	}

	public void setLandMovRsnCdNm(String landMovRsnCdNm) {
		this.landMovRsnCdNm = landMovRsnCdNm;
	}

	public String getLandMovYmd() {
		return landMovYmd;
	}

	public void setLandMovYmd(String landMovYmd) {
		this.landMovYmd = landMovYmd;
	}

	public String getLedgCntrstCnfGbn() {
		return ledgCntrstCnfGbn;
	}

	public void setLedgCntrstCnfGbn(String ledgCntrstCnfGbn) {
		this.ledgCntrstCnfGbn = ledgCntrstCnfGbn;
	}

	public String getBizActNtcGbn() {
		return bizActNtcGbn;
	}

	public void setBizActNtcGbn(String bizActNtcGbn) {
		this.bizActNtcGbn = bizActNtcGbn;
	}

	public String getMapGbn() {
		return mapGbn;
	}

	public void setMapGbn(String mapGbn) {
		this.mapGbn = mapGbn;
	}

	public String getLandLastHistOdrno() {
		return landLastHistOdrno;
	}

	public void setLandLastHistOdrno(String landLastHistOdrno) {
		this.landLastHistOdrno = landLastHistOdrno;
	}

	public String getOwnRgtLastHistOdrno() {
		return ownRgtLastHistOdrno;
	}

	public void setOwnRgtLastHistOdrno(String ownRgtLastHistOdrno) {
		this.ownRgtLastHistOdrno = ownRgtLastHistOdrno;
	}

	public String getOwnerNm() {
		return ownerNm;
	}

	public void setOwnerNm(String ownerNm) {
		this.ownerNm = ownerNm;
	}

	public String getDregno() {
		return dregno;
	}

	public void setDregno(String dregno) {
		this.dregno = dregno;
	}

	public String getOwnGbn() {
		return ownGbn;
	}

	public void setOwnGbn(String ownGbn) {
		this.ownGbn = ownGbn;
	}

	public String getOwnGbnNm() {
		return ownGbnNm;
	}

	public void setOwnGbnNm(String ownGbnNm) {
		this.ownGbnNm = ownGbnNm;
	}

	public String getShrCnt() {
		return shrCnt;
	}

	public void setShrCnt(String shrCnt) {
		this.shrCnt = shrCnt;
	}

	public String getOwnerAddr() {
		return ownerAddr;
	}

	public void setOwnerAddr(String ownerAddr) {
		this.ownerAddr = ownerAddr;
	}

	public String getOwnRgtChgRsnCd() {
		return ownRgtChgRsnCd;
	}

	public void setOwnRgtChgRsnCd(String ownRgtChgRsnCd) {
		this.ownRgtChgRsnCd = ownRgtChgRsnCd;
	}

	public String getOwnRgtChgRsnCdNm() {
		return ownRgtChgRsnCdNm;
	}

	public void setOwnRgtChgRsnCdNm(String ownRgtChgRsnCdNm) {
		this.ownRgtChgRsnCdNm = ownRgtChgRsnCdNm;
	}

	public String getOwndymd() {
		return owndymd;
	}

	public void setOwndymd(String owndymd) {
		this.owndymd = owndymd;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getScaleNm() {
		return scaleNm;
	}

	public void setScaleNm(String scaleNm) {
		this.scaleNm = scaleNm;
	}

	public String getDoho() {
		return doho;
	}

	public void setDoho(String doho) {
		this.doho = doho;
	}

	public String getJigaBaseMon() {
		return jigaBaseMon;
	}

	public void setJigaBaseMon(String jigaBaseMon) {
		this.jigaBaseMon = jigaBaseMon;
	}

	public String getLastJibn() {
		return lastJibn;
	}

	public void setLastJibn(String lastJibn) {
		this.lastJibn = lastJibn;
	}

	public String getLastBu() {
		return lastBu;
	}

	public void setLastBu(String lastBu) {
		this.lastBu = lastBu;
	}

	public String getLastbobn() {
		return lastbobn;
	}

	public void setLastbobn(String lastbobn) {
		this.lastbobn = lastbobn;
	}

	public String getLastbubn() {
		return lastbubn;
	}

	public void setLastbubn(String lastbubn) {
		this.lastbubn = lastbubn;
	}

	public String getLandMovChrgManId() {
		return landMovChrgManId;
	}

	public void setLandMovChrgManId(String landMovChrgManId) {
		this.landMovChrgManId = landMovChrgManId;
	}

	public String getOwnRgtChgChrgManId() {
		return ownRgtChgChrgManId;
	}

	public void setOwnRgtChgChrgManId(String ownRgtChgChrgManId) {
		this.ownRgtChgChrgManId = ownRgtChgChrgManId;
	}

	public String getLandMoveRellJibn() {
		return landMoveRellJibn;
	}

	public void setLandMoveRellJibn(String landMoveRellJibn) {
		this.landMoveRellJibn = landMoveRellJibn;
	}

	public String getDelYmd() {
		return delYmd;
	}

	public void setDelYmd(String delYmd) {
		this.delYmd = delYmd;
	}

	public String getLandMovDelYmd() {
		return landMovDelYmd;
	}

	public void setLandMovDelYmd(String landMovDelYmd) {
		this.landMovDelYmd = landMovDelYmd;
	}

	public String getLandMovHistOdrno() {
		return landMovHistOdrno;
	}

	public void setLandMovHistOdrno(String landMovHistOdrno) {
		this.landMovHistOdrno = landMovHistOdrno;
	}

	public String getLandHistOdrno() {
		return landHistOdrno;
	}

	public void setLandHistOdrno(String landHistOdrno) {
		this.landHistOdrno = landHistOdrno;
	}

	public String getDymd() {
		return dymd;
	}

	public void setDymd(String dymd) {
		this.dymd = dymd;
	}

	public String getJibun() {
		return jibun;
	}

	public void setJibun(String jibun) {
		this.jibun = jibun;
	}

	public String getOwnChgHist() {
		return ownChgHist;
	}

	public void setOwnChgHist(String ownChgHist) {
		this.ownChgHist = ownChgHist;
	}

	public String getDodrno() {
		return dodrno;
	}

	public void setDodrno(String dodrno) {
		this.dodrno = dodrno;
	}

	public String getOwnRgtChgHistOdrno() {
		return ownRgtChgHistOdrno;
	}

	public void setOwnRgtChgHistOdrno(String ownRgtChgHistOdrno) {
		this.ownRgtChgHistOdrno = ownRgtChgHistOdrno;
	}

	public String getGisBldgIntergInfo() {
		return gisBldgIntergInfo;
	}

	public void setGisBldgIntergInfo(String gisBldgIntergInfo) {
		this.gisBldgIntergInfo = gisBldgIntergInfo;
	}

	public String getLandLocNm() {
		return landLocNm;
	}

	public void setLandLocNm(String landLocNm) {
		this.landLocNm = landLocNm;
	}

	public String getJibn() {
		return jibn;
	}

	public void setJibn(String jibn) {
		this.jibn = jibn;
	}

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getUfid() {
		return ufid;
	}

	public void setUfid(String ufid) {
		this.ufid = ufid;
	}

	public String getBldgNm() {
		return bldgNm;
	}

	public void setBldgNm(String bldgNm) {
		this.bldgNm = bldgNm;
	}

	public String getDong() {
		return dong;
	}

	public void setDong(String dong) {
		this.dong = dong;
	}

	public String getLarea() {
		return larea;
	}

	public void setLarea(String larea) {
		this.larea = larea;
	}

	public String getBarea() {
		return barea;
	}

	public void setBarea(String barea) {
		this.barea = barea;
	}

	public String getGarea() {
		return garea;
	}

	public void setGarea(String garea) {
		this.garea = garea;
	}

	public String getBlr() {
		return blr;
	}

	public void setBlr(String blr) {
		this.blr = blr;
	}

	public String getFsi() {
		return fsi;
	}

	public void setFsi(String fsi) {
		this.fsi = fsi;
	}

	public String getVioBldgYn() {
		return vioBldgYn;
	}

	public void setVioBldgYn(String vioBldgYn) {
		this.vioBldgYn = vioBldgYn;
	}

	public String getUflr() {
		return uflr;
	}

	public void setUflr(String uflr) {
		this.uflr = uflr;
	}

	public String getBflr() {
		return bflr;
	}

	public void setBflr(String bflr) {
		this.bflr = bflr;
	}

	public String getHgt() {
		return hgt;
	}

	public void setHgt(String hgt) {
		this.hgt = hgt;
	}

	public String getStruCd() {
		return struCd;
	}

	public void setStruCd(String struCd) {
		this.struCd = struCd;
	}

	public String getStruNm() {
		return struNm;
	}

	public void setStruNm(String struNm) {
		this.struNm = struNm;
	}

	public String getMainUseCd() {
		return mainUseCd;
	}

	public void setMainUseCd(String mainUseCd) {
		this.mainUseCd = mainUseCd;
	}

	public String getMainUseNm() {
		return mainUseNm;
	}

	public void setMainUseNm(String mainUseNm) {
		this.mainUseNm = mainUseNm;
	}

	public String getUseAprvYmd() {
		return useAprvYmd;
	}

	public void setUseAprvYmd(String useAprvYmd) {
		this.useAprvYmd = useAprvYmd;
	}

	public String getMainSubGbn() {
		return mainSubGbn;
	}

	public void setMainSubGbn(String mainSubGbn) {
		this.mainSubGbn = mainSubGbn;
	}

	public String getMainSubGbnNm() {
		return mainSubGbnNm;
	}

	public void setMainSubGbnNm(String mainSubGbnNm) {
		this.mainSubGbnNm = mainSubGbnNm;
	}

	public String getRegistDay() {
		return registDay;
	}

	public void setRegistDay(String registDay) {
		this.registDay = registDay;
	}

	public String getBndrInfoSrcCd() {
		return bndrInfoSrcCd;
	}

	public void setBndrInfoSrcCd(String bndrInfoSrcCd) {
		this.bndrInfoSrcCd = bndrInfoSrcCd;
	}

	public String getBndrInfoSrcNm() {
		return bndrInfoSrcNm;
	}

	public void setBndrInfoSrcNm(String bndrInfoSrcNm) {
		this.bndrInfoSrcNm = bndrInfoSrcNm;
	}

	public String getAttrInfoSrcCd() {
		return attrInfoSrcCd;
	}

	public void setAttrInfoSrcCd(String attrInfoSrcCd) {
		this.attrInfoSrcCd = attrInfoSrcCd;
	}

	public String getAttrInfoSrcNm() {
		return attrInfoSrcNm;
	}

	public void setAttrInfoSrcNm(String attrInfoSrcNm) {
		this.attrInfoSrcNm = attrInfoSrcNm;
	}

	public String getKmName() {
		return kmName;
	}

	public void setKmName(String kmName) {
		this.kmName = kmName;
	}

	public String getKmNameSrc() {
		return kmNameSrc;
	}

	public void setKmNameSrc(String kmNameSrc) {
		this.kmNameSrc = kmNameSrc;
	}

	public String getKmNameSrcNm() {
		return kmNameSrcNm;
	}

	public void setKmNameSrcNm(String kmNameSrcNm) {
		this.kmNameSrcNm = kmNameSrcNm;
	}

	public String getPermiNum() {
		return permiNum;
	}

	public void setPermiNum(String permiNum) {
		this.permiNum = permiNum;
	}

	public String getUseAprNum() {
		return useAprNum;
	}

	public void setUseAprNum(String useAprNum) {
		this.useAprNum = useAprNum;
	}

	public String getEtcCd() {
		return etcCd;
	}

	public void setEtcCd(String etcCd) {
		this.etcCd = etcCd;
	}

	public String getEtcCdNm() {
		return etcCdNm;
	}

	public void setEtcCdNm(String etcCdNm) {
		this.etcCdNm = etcCdNm;
	}

	public String getChJibun() {
		return chJibun;
	}

	public void setChJibun(String chJibun) {
		this.chJibun = chJibun;
	}

	public String getChJibunNm() {
		return chJibunNm;
	}

	public void setChJibunNm(String chJibunNm) {
		this.chJibunNm = chJibunNm;
	}

	public String getMatCd() {
		return matCd;
	}

	public void setMatCd(String matCd) {
		this.matCd = matCd;
	}

	public String getsMat() {
		return sMat;
	}

	public void setsMat(String sMat) {
		this.sMat = sMat;
	}

	public String getsMatNm() {
		return sMatNm;
	}

	public void setsMatNm(String sMatNm) {
		this.sMatNm = sMatNm;
	}

	public String getBldCnt() {
		return bldCnt;
	}

	public void setBldCnt(String bldCnt) {
		this.bldCnt = bldCnt;
	}

	public String getAisCnt() {
		return aisCnt;
	}

	public void setAisCnt(String aisCnt) {
		this.aisCnt = aisCnt;
	}

	public String getNemDate() {
		return nemDate;
	}

	public void setNemDate(String nemDate) {
		this.nemDate = nemDate;
	}

	public String getPnuOrg() {
		return pnuOrg;
	}

	public void setPnuOrg(String pnuOrg) {
		this.pnuOrg = pnuOrg;
	}

	public String getBuMatGbCd() {
		return buMatGbCd;
	}

	public void setBuMatGbCd(String buMatGbCd) {
		this.buMatGbCd = buMatGbCd;
	}

	public String getBuMatGbNm() {
		return buMatGbNm;
	}

	public void setBuMatGbNm(String buMatGbNm) {
		this.buMatGbNm = buMatGbNm;
	}

	public String getSubInfoCnt() {
		return subInfoCnt;
	}

	public void setSubInfoCnt(String subInfoCnt) {
		this.subInfoCnt = subInfoCnt;
	}

	public String getReljibun() {
		return reljibun;
	}

	public void setReljibun(String reljibun) {
		this.reljibun = reljibun;
	}

	public String getUcode() {
		return ucode;
	}

	public void setUcode(String ucode) {
		this.ucode = ucode;
	}

	public String getDivno() {
		return divno;
	}

	public void setDivno(String divno) {
		this.divno = divno;
	}

	public String getGubun() {
		return gubun;
	}

	public void setGubun(String gubun) {
		this.gubun = gubun;
	}

	public String getCtype() {
		return ctype;
	}

	public void setCtype(String ctype) {
		this.ctype = ctype;
	}

	public String getUnm() {
		return unm;
	}

	public void setUnm(String unm) {
		this.unm = unm;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getLawnm() {
		return lawnm;
	}

	public void setLawnm(String lawnm) {
		this.lawnm = lawnm;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getJiga() {
		return jiga;
	}

	public void setJiga(String jiga) {
		this.jiga = jiga;
	}

	public String getBaseYear() {
		return baseYear;
	}

	public void setBaseYear(String baseYear) {
		this.baseYear = baseYear;
	}

	public String getBaseMon() {
		return baseMon;
	}

	public void setBaseMon(String baseMon) {
		this.baseMon = baseMon;
	}

	public String getPannYmd() {
		return pannYmd;
	}

	public void setPannYmd(String pannYmd) {
		this.pannYmd = pannYmd;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getIndiHousePrc() {
		return indiHousePrc;
	}

	public void setIndiHousePrc(String indiHousePrc) {
		this.indiHousePrc = indiHousePrc;
	}

	public String getLandArea() {
		return landArea;
	}

	public void setLandArea(String landArea) {
		this.landArea = landArea;
	}

	public String getLandCalcArea() {
		return landCalcArea;
	}

	public void setLandCalcArea(String landCalcArea) {
		this.landCalcArea = landCalcArea;
	}

	public String getBldgArea() {
		return bldgArea;
	}

	public void setBldgArea(String bldgArea) {
		this.bldgArea = bldgArea;
	}

	public String getBldgCalcArea() {
		return bldgCalcArea;
	}

	public void setBldgCalcArea(String bldgCalcArea) {
		this.bldgCalcArea = bldgCalcArea;
	}


	public String getBldgNo() {
		return bldgNo;
	}

	public void setBldgNo(String bldgNo) {
		this.bldgNo = bldgNo;
	}

	public String getStdmt() {
		return stdmt;
	}

	public void setStdmt(String stdmt) {
		this.stdmt = stdmt;
	}

	
	
}
