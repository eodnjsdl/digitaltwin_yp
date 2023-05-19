package egiskorea.com.job.tran.brin.service;

import java.io.Serializable;

/**
 * @Description 버스정류소정보 VO
 * @author 글로벌컨설팅부문 장현승
 * @since 2023.05.17
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *  수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2023.05.17   장현승           최초 생성
 */

@SuppressWarnings("serial")
public class TgdBusSttnInfoVO implements Serializable{
	
	/** 정류소아이디 */
	private String sttn_id;
	
	/** 정류소명 */
	private String sttn_nm;
	
	/** 정류소번호 */
	private String sttn_no;
	
	/** 지역명 */
	private String area_nm;
	
	/** 관할코드 */
	private String cmptnc_cd;
	
	/** 중앙차로여부 */
	private String centr_cartrk_at;
	
	/** x좌표 */
	private String x_crdnt;
	
	/** y좌표 */
	private String y_crdnt;
	
	/** geom 공간정보 */
	private String geom;

	public String getSttn_id() {
		return sttn_id;
	}

	public void setSttn_id(String sttn_id) {
		this.sttn_id = sttn_id;
	}

	public String getSttn_nm() {
		return sttn_nm;
	}

	public void setSttn_nm(String sttn_nm) {
		this.sttn_nm = sttn_nm;
	}

	public String getSttn_no() {
		return sttn_no;
	}

	public void setSttn_no(String sttn_no) {
		this.sttn_no = sttn_no;
	}

	public String getArea_nm() {
		return area_nm;
	}

	public void setArea_nm(String area_nm) {
		this.area_nm = area_nm;
	}

	public String getCmptnc_cd() {
		return cmptnc_cd;
	}

	public void setCmptnc_cd(String cmptnc_cd) {
		this.cmptnc_cd = cmptnc_cd;
	}

	public String getCentr_cartrk_at() {
		return centr_cartrk_at;
	}

	public void setCentr_cartrk_at(String centr_cartrk_at) {
		this.centr_cartrk_at = centr_cartrk_at;
	}

	public String getX_crdnt() {
		return x_crdnt;
	}

	public void setX_crdnt(String x_crdnt) {
		this.x_crdnt = x_crdnt;
	}

	public String getY_crdnt() {
		return y_crdnt;
	}

	public void setY_crdnt(String y_crdnt) {
		this.y_crdnt = y_crdnt;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}
	
}
