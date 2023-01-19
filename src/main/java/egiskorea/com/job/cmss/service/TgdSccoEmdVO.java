package egiskorea.com.job.cmss.service;

import java.io.Serializable;



/**
 * @Description 읍명동 정보 vo 클래스
 * @author 플랫폼개발부문 DT플랫폼 정재환
 * @since 2022.01.12
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2022.01.12		정재환	최초 생성
 *  </pre>
 */
public class TgdSccoEmdVO implements Serializable {

	private static final long serialVersionUID = 9215911423601177369L;

	/** 읍면동코드 */
	private String emdCd = "";
	
	/** 읍면동코드 */
	private String emdKorNm = "";
	
	/** 읍면동명_영문 */
	private String emdEngNm = "";
	
	/** GID */
	private int gid = 0;
	
	/** GEOMETRY */
	private String geom = "";

	/**
	 * @return the emdCd
	 */
	public String getEmdCd() {
		return emdCd;
	}

	/**
	 * @param emdCd the emdCd to set
	 */
	public void setEmdCd(String emdCd) {
		this.emdCd = emdCd;
	}

	/**
	 * @return the emdKorNm
	 */
	public String getEmdKorNm() {
		return emdKorNm;
	}

	/**
	 * @param emdKorNm the emdKorNm to set
	 */
	public void setEmdKorNm(String emdKorNm) {
		this.emdKorNm = emdKorNm;
	}

	/**
	 * @return the emdEngNm
	 */
	public String getEmdEngNm() {
		return emdEngNm;
	}

	/**
	 * @param emdEngNm the emdEngNm to set
	 */
	public void setEmdEngNm(String emdEngNm) {
		this.emdEngNm = emdEngNm;
	}

	/**
	 * @return the gid
	 */
	public int getGid() {
		return gid;
	}

	/**
	 * @param gid the gid to set
	 */
	public void setGid(int gid) {
		this.gid = gid;
	}

	/**
	 * @return the geom
	 */
	public String getGeom() {
		return geom;
	}

	/**
	 * @param geom the geom to set
	 */
	public void setGeom(String geom) {
		this.geom = geom;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
		
}
