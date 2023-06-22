package egiskorea.com.job.tran.popltn.service;

import java.io.Serializable;

@SuppressWarnings("serial")
public class PopulationVO implements Serializable {
	private String liCd;					// 리 코드
	private String stdrYm;					// 기준 년월
	private Integer allPopltnCnt;			// 전체 인구
	private Integer malePopltnCnt;			// 남성 인구
	private Integer femalePopltnCnt;		// 여성 인구
	private Integer odsnPopltnCnt;			// 노인 인구
	private String geom; 					// 공간 정보
	private String pplShowType;				// 항목 정보
	private String pplGender; 				// 자료 유형(성별)
	private String codeNm;					// 면 이름
	private String liNm;					// 리 이름
	
	public String getLiCd() {
		return liCd;
	}
	public void setLiCd(String liCd) {
		this.liCd = liCd;
	}
	public String getStdrYm() {
		return stdrYm;
	}
	public void setStdrYm(String stdrYm) {
		this.stdrYm = stdrYm;
	}
	public Integer getAllPopltnCnt() {
		return allPopltnCnt;
	}
	public void setAllPopltnCnt(Integer allPopltnCnt) {
		this.allPopltnCnt = allPopltnCnt;
	}
	public Integer getMalePopltnCnt() {
		return malePopltnCnt;
	}
	public void setMalePopltnCnt(Integer malePopltnCnt) {
		this.malePopltnCnt = malePopltnCnt;
	}
	public Integer getFemalePopltnCnt() {
		return femalePopltnCnt;
	}
	public void setFemalePopltnCnt(Integer femalePopltnCnt) {
		this.femalePopltnCnt = femalePopltnCnt;
	}
	public Integer getOdsnPopltnCnt() {
		return odsnPopltnCnt;
	}
	public void setOdsnPopltnCnt(Integer odsnPopltnCnt) {
		this.odsnPopltnCnt = odsnPopltnCnt;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
	public String getPplShowType() {
		return pplShowType;
	}
	public void setPplShowType(String pplShowType) {
		this.pplShowType = pplShowType;
	}
	public String getPplGender() {
		return pplGender;
	}
	public void setPplGender(String pplGender) {
		this.pplGender = pplGender;
	}
	public String getCodeNm() {
		return codeNm;
	}
	public void setCodeNm(String codeNm) {
		this.codeNm = codeNm;
	}
	public String getLiNm() {
		return liNm;
	}
	public void setLiNm(String liNm) {
		this.liNm = liNm;
	}
	
}
