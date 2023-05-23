package egiskorea.com.job.tran.brin.service;

/**
 * @Description 경유노선정보 VO
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

// VO 타입으로 담는다면, 언더바(_) 표기가 아닌 카멜 표기법으로 작성해야함
// mapper-config.xml Line 7 참고
public class TbdThrghRouteInfoVO {

	/** 정류소아이디 */
	private String sttnId;
	
	/** 노선아이디 */
	private String routeId;
	
	/** 노선명 */
	private String routeNm;
	
	/** 노선유형 */
	private String routeTy;
	
	/** 노선유형 */
	private String routeTyNm;
	
	/** 기점정류소명 */
	private String cdpntSttnNm;
	
	/** 종점정류소명 */
	private String tmnlSttnNm;

	public String getSttnId() {
		return sttnId;
	}

	public void setSttnId(String sttnId) {
		this.sttnId = sttnId;
	}

	public String getRouteId() {
		return routeId;
	}

	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}

	public String getRouteNm() {
		return routeNm;
	}

	public void setRouteNm(String routeNm) {
		this.routeNm = routeNm;
	}

	public String getRouteTy() {
		return routeTy;
	}

	public void setRouteTy(String routeTy) {
		this.routeTy = routeTy;
	}

	public String getRouteTyNm() {
		return routeTyNm;
	}

	public void setRouteTyNm(String routeTyNm) {
		this.routeTyNm = routeTyNm;
	}

	public String getCdpntSttnNm() {
		return cdpntSttnNm;
	}

	public void setCdpntSttnNm(String cdpntSttnNm) {
		this.cdpntSttnNm = cdpntSttnNm;
	}

	public String getTmnlSttnNm() {
		return tmnlSttnNm;
	}

	public void setTmnlSttnNm(String tmnlSttnNm) {
		this.tmnlSttnNm = tmnlSttnNm;
	}
	
	/** 정류소아이디 *//*
	private String sttn_id;
	
	*//** 노선아이디 *//*
	private String route_id;
	
	*//** 노선명 *//*
	private String route_nm;
	
	*//** 노선유형 *//*
	private String route_ty;
	
	*//** 노선유형명 *//*
	private String route_ty_nm;
	
	*//** 기점정류소명 *//*
	private String cdpnt_sttn_nm;
	
	*//** 종점정류소명 *//*
	private String tmnl_sttn_nm;*/

}
