package egiskorea.com.job.spor.service;

import java.io.Serializable;

/**
 * @Description 체육시설 VO.
 * @author 플랫폼개발부문 DT플랫폼 이혜인
 * @since 2022.01.12
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.12   이혜인           최초 생성
 */

public class SportsVO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
    /** 현재페이지 */
    private int pageIndex = 1;

    /** 페이지갯수 */
    private int pageUnit = 10;

    /** 페이지사이즈 */
    private int pageSize = 10;

    /** 첫페이지 인덱스 */
    private int firstIndex = 1;

    /** 마지막페이지 인덱스 */
    private int lastIndex = 1;

    /** 페이지당 레코드 개수 */
    private int recordCountPerPage = 10;

    /** 레코드 번호 */
    private int rowNo = 0;
    
    /** GID */
	private int gid;
	
	/** 체육시설명 */
	private String alsfcNm;
	
	/** 주소 */
//	private String adres;
	
	/** 부대시설 */
	private String sbrs;
	
	/** 문의처 */
	private String refrnc;
	
	/** 경기장구분 */
	private String stdmSe;
	
//	/** 경기장규격 */
//	private String stdmStndrd;
//	
//	/** 관람석수용인원 */
//	private String adtmAceptncNmpr;
	
	/** 데이터기준일 */
	private String dataStdde;
	
	/** GEOM */
//	private String geom;
	
	/** 사진위도 */
	private Double lat;
	
	/** 사진경도 */
	private Double lon;
	
	/** 시설구분 */
	private String sports_fcty_tp_cd;
	
	/** 운영방식 */
	private String sports_oper_mthd_cd;
	
	/** 읍면동 */
	private String sporSearchAdres;
	
	/** 시설명 */
	private String sporSearchAlsfc_nm;
	
	/** 공간검색 */
	private String sporSpitalSearch;
	
	/** 범위 */
	private double sportsBuffer;
	
	//0308 추가.
	
	/** 시설명 */
	private String fcltyNm;
	
	/** 시설유형 */
	private String fcltyTy;
	
	/** 운영방식 */
	private String operMthd;
	
	/** 설립일자 */
	private String fondDe;
	
	/** 건물크기 */
	private String buldSize;
	
	/** 토지크기 */
	private String ladSize;
	
	/** 경기장규격 */
	private String stdmStndrd;
	
	/** 관람석수용인원 */
	private String adtmAceptncNmpr;
	
	/** 관리인원 */
	private String manageNmpr;
	
	/** 연간이용인원 */
	private String fyerUtlztnNmpr;
	
	/** 건립비용 */
	private String ercCt;
	
	/** 주소 */
	private String adres;
	
	/** 담당부서명 */
	private String chrgDeptNm;
	
	/** 담당자명 */
	private String chargerNm;
	
	/** 연락처전화번호 */
	private String cttpcTelno;
	
	/** 시설개요 */
	private String fcltySumry;
	
	/** GEOMETRY */
	private String geom;
	
	/** 최초등록일시 */
	private String frstRegistDt;
	
	/** 최초등록자ID */
	private String frstRegisterId;
	
	/** 최종수정일시 */
	private String lastModfDt;
	
	/** 최종수정자ID */
	private String lastUpdusrId;
	
	private String bufferArea;
	
	/** 신규 - 체육시설 운영관리(TGD_PHSTRN_FCLTY_OPER_MANAGE) */
		   
	private String oper_year;			//운영년도
	private int acqs_amount;			//취득가액
	private int dprc_am;            	//감가상각액
	private int dprc_acmtl_am;         	//감가상각누계액
	private int bk_amount;            	//장부가액
	private String contents_yycnt;      //내용년수
	private String oper_ct;            	//운영비용
	private String oper_ern;         	//운영수익
	private String frst_regist_dt;      //최초등록일시
	private String frst_register_id;   	//최초등록자ID
	private String last_modf_dt;      	//최종수정일시
	private String last_updusr_id;      //최종수정자ID
	   
	/** 신규 - 체육시설 운영관리(TGD_PHSTRN_FCLTY_OPER_MANAGE) */
	
	/** 신규 - 체육시설보조(tgd_phstrn_fclty_asstn) */
	
	private int asstn_fclty_sn;			//보조시설순번
	private String asstn_fclty_nm;		//보조시설명
	private String oper_strt_time;		//운영시작시간
	private String oper_end_time;		//운영종료시간
	private String rsrv_at;				//예약여부
	private int ho_cnt;					//호수
	private String fclty_dc;			//시설설명
	private String facList;				//보조시설 순번 list
	
	/** 신규 - 체육시설보조(tgd_phstrn_fclty_asstn) */
	
	public String getFcltyNm() {
		return fcltyNm;
	}

	public String getOper_year() {
		return oper_year;
	}

	public void setOper_year(String oper_year) {
		this.oper_year = oper_year;
	}

	public int getAcqs_amount() {
		return acqs_amount;
	}

	public void setAcqs_amount(int acqs_amount) {
		this.acqs_amount = acqs_amount;
	}

	public int getDprc_am() {
		return dprc_am;
	}

	public void setDprc_am(int dprc_am) {
		this.dprc_am = dprc_am;
	}

	public int getDprc_acmtl_am() {
		return dprc_acmtl_am;
	}

	public void setDprc_acmtl_am(int dprc_acmtl_am) {
		this.dprc_acmtl_am = dprc_acmtl_am;
	}

	public int getBk_amount() {
		return bk_amount;
	}

	public void setBk_amount(int bk_amount) {
		this.bk_amount = bk_amount;
	}

	public String getContents_yycnt() {
		return contents_yycnt;
	}

	public void setContents_yycnt(String contents_yycnt) {
		this.contents_yycnt = contents_yycnt;
	}

	public String getOper_ct() {
		return oper_ct;
	}

	public void setOper_ct(String oper_ct) {
		this.oper_ct = oper_ct;
	}

	public String getOper_ern() {
		return oper_ern;
	}

	public void setOper_ern(String oper_ern) {
		this.oper_ern = oper_ern;
	}

	public String getFrst_regist_dt() {
		return frst_regist_dt;
	}

	public void setFrst_regist_dt(String frst_regist_dt) {
		this.frst_regist_dt = frst_regist_dt;
	}

	public String getFrst_register_id() {
		return frst_register_id;
	}

	public void setFrst_register_id(String frst_register_id) {
		this.frst_register_id = frst_register_id;
	}

	public String getLast_modf_dt() {
		return last_modf_dt;
	}

	public void setLast_modf_dt(String last_modf_dt) {
		this.last_modf_dt = last_modf_dt;
	}

	public String getLast_updusr_id() {
		return last_updusr_id;
	}

	public void setLast_updusr_id(String last_updusr_id) {
		this.last_updusr_id = last_updusr_id;
	}

	public void setFcltyNm(String fcltyNm) {
		this.fcltyNm = fcltyNm;
	}

	public String getFcltyTy() {
		return fcltyTy;
	}

	public void setFcltyTy(String fcltyTy) {
		this.fcltyTy = fcltyTy;
	}

	public String getOperMthd() {
		return operMthd;
	}

	public void setOperMthd(String operMthd) {
		this.operMthd = operMthd;
	}

	public String getFondDe() {
		return fondDe;
	}

	public void setFondDe(String fondDe) {
		this.fondDe = fondDe;
	}

	public String getBuldSize() {
		return buldSize;
	}

	public void setBuldSize(String buldSize) {
		this.buldSize = buldSize;
	}

	public String getLadSize() {
		return ladSize;
	}

	public void setLadSize(String ladSize) {
		this.ladSize = ladSize;
	}

	public String getManageNmpr() {
		return manageNmpr;
	}

	public void setManageNmpr(String manageNmpr) {
		this.manageNmpr = manageNmpr;
	}

	public String getFyerUtlztnNmpr() {
		return fyerUtlztnNmpr;
	}

	public void setFyerUtlztnNmpr(String fyerUtlztnNmpr) {
		this.fyerUtlztnNmpr = fyerUtlztnNmpr;
	}

	public String getErcCt() {
		return ercCt;
	}

	public void setErcCt(String ercCt) {
		this.ercCt = ercCt;
	}

	public String getChrgDeptNm() {
		return chrgDeptNm;
	}

	public void setChrgDeptNm(String chrgDeptNm) {
		this.chrgDeptNm = chrgDeptNm;
	}

	public String getChargerNm() {
		return chargerNm;
	}

	public void setChargerNm(String chargerNm) {
		this.chargerNm = chargerNm;
	}

	public String getCttpcTelno() {
		return cttpcTelno;
	}

	public void setCttpcTelno(String cttpcTelno) {
		this.cttpcTelno = cttpcTelno;
	}

	public String getFcltySumry() {
		return fcltySumry;
	}

	public void setFcltySumry(String fcltySumry) {
		this.fcltySumry = fcltySumry;
	}

	public String getFrstRegistDt() {
		return frstRegistDt;
	}

	public void setFrstRegistDt(String frstRegistDt) {
		this.frstRegistDt = frstRegistDt;
	}

	public String getFrstRegisterId() {
		return frstRegisterId;
	}

	public void setFrstRegisterId(String frstRegisterId) {
		this.frstRegisterId = frstRegisterId;
	}

	public String getLastModfDt() {
		return lastModfDt;
	}

	public void setLastModfDt(String lastModfDt) {
		this.lastModfDt = lastModfDt;
	}

	public String getLastUpdusrId() {
		return lastUpdusrId;
	}

	public void setLastUpdusrId(String lastUpdusrId) {
		this.lastUpdusrId = lastUpdusrId;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageUnit() {
		return pageUnit;
	}

	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getRowNo() {
		return rowNo;
	}

	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}

	public int getGid() {
		return gid;
	}

	public void setGid(int gid) {
		this.gid = gid;
	}

	public String getAlsfcNm() {
		return alsfcNm;
	}

	public void setAlsfcNm(String alsfcNm) {
		this.alsfcNm = alsfcNm;
	}

	public String getAdres() {
		return adres;
	}

	public void setAdres(String adres) {
		this.adres = adres;
	}

	public String getSbrs() {
		return sbrs;
	}

	public void setSbrs(String sbrs) {
		this.sbrs = sbrs;
	}

	public String getRefrnc() {
		return refrnc;
	}

	public void setRefrnc(String refrnc) {
		this.refrnc = refrnc;
	}

	public String getStdmSe() {
		return stdmSe;
	}

	public void setStdmSe(String stdmSe) {
		this.stdmSe = stdmSe;
	}

	public String getStdmStndrd() {
		return stdmStndrd;
	}

	public void setStdmStndrd(String stdmStndrd) {
		this.stdmStndrd = stdmStndrd;
	}

	public String getAdtmAceptncNmpr() {
		return adtmAceptncNmpr;
	}

	public void setAdtmAceptncNmpr(String adtmAceptncNmpr) {
		this.adtmAceptncNmpr = adtmAceptncNmpr;
	}

	public String getDataStdde() {
		return dataStdde;
	}

	public void setDataStdde(String dataStdde) {
		this.dataStdde = dataStdde;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLon() {
		return lon;
	}

	public void setLon(Double lon) {
		this.lon = lon;
	}

	public String getSports_fcty_tp_cd() {
		return sports_fcty_tp_cd;
	}

	public void setSports_fcty_tp_cd(String sports_fcty_tp_cd) {
		this.sports_fcty_tp_cd = sports_fcty_tp_cd;
	}

	public String getSports_oper_mthd_cd() {
		return sports_oper_mthd_cd;
	}

	public void setSports_oper_mthd_cd(String sports_oper_mthd_cd) {
		this.sports_oper_mthd_cd = sports_oper_mthd_cd;
	}

	public String getSporSearchAdres() {
		return sporSearchAdres;
	}

	public void setSporSearchAdres(String sporSearchAdres) {
		this.sporSearchAdres = sporSearchAdres;
	}

	public String getSporSearchAlsfc_nm() {
		return sporSearchAlsfc_nm;
	}

	public void setSporSearchAlsfc_nm(String sporSearchAlsfc_nm) {
		this.sporSearchAlsfc_nm = sporSearchAlsfc_nm;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getSporSpitalSearch() {
		return sporSpitalSearch;
	}

	public void setSporSpitalSearch(String sporSpitalSearch) {
		this.sporSpitalSearch = sporSpitalSearch;
	}

	public double getSportsBuffer() {
		return sportsBuffer;
	}

	public void setSportsBuffer(double sportsBuffer) {
		this.sportsBuffer = sportsBuffer;
	}

	public int getAsstn_fclty_sn() {
		return asstn_fclty_sn;
	}

	public void setAsstn_fclty_sn(int asstn_fclty_sn) {
		this.asstn_fclty_sn = asstn_fclty_sn;
	}

	public String getAsstn_fclty_nm() {
		return asstn_fclty_nm;
	}

	public void setAsstn_fclty_nm(String asstn_fclty_nm) {
		this.asstn_fclty_nm = asstn_fclty_nm;
	}

	public String getOper_strt_time() {
		return oper_strt_time;
	}

	public void setOper_strt_time(String oper_strt_time) {
		this.oper_strt_time = oper_strt_time;
	}

	public String getOper_end_time() {
		return oper_end_time;
	}

	public void setOper_end_time(String oper_end_time) {
		this.oper_end_time = oper_end_time;
	}

	public String getRsrv_at() {
		return rsrv_at;
	}

	public void setRsrv_at(String rsrv_at) {
		this.rsrv_at = rsrv_at;
	}

	public int getHo_cnt() {
		return ho_cnt;
	}

	public void setHo_cnt(int ho_cnt) {
		this.ho_cnt = ho_cnt;
	}

	public String getFclty_dc() {
		return fclty_dc;
	}

	public void setFclty_dc(String fclty_dc) {
		this.fclty_dc = fclty_dc;
	}

	public String getFacList() {
		return facList;
	}

	public void setFacList(String facList) {
		this.facList = facList;
	}

	public String getBufferArea() {
		return bufferArea;
	}

	public void setBufferArea(String bufferArea) {
		this.bufferArea = bufferArea;
	}
	
}
