package egiskorea.com.webApp.service;

import java.io.Serializable;

public class AddrSearchVO implements Serializable {

	/** 시리얼 버전 UID */
	private static final long serialVersionUID = 5604632779125564808L;

	/** 검색할 주소 */
	private String SearchAdr;

	/** gid */
	private String gid;

	/** PNU */
	private String pnu;

	/** WKT */
	private String wkt;

	/** 페이지 인덱스 */
	private int pageIndex = 1;

	/** 페이지 갯수 */
	private final int pageUnit = 10;

	/** 페이지 크기 */
	private final int pageSize = 5;

	@Override
	public String toString() {
		return "AddrSearchVO{" + "SearchAdr='" + SearchAdr + '\'' + ", pnu='" + pnu + '\'' + ", wkt='" + wkt + '\''
				+ ", pageIndex=" + pageIndex + ", pageUnit=" + pageUnit + ", pageSize=" + pageSize + '}';
	}

	public String getSearchAdr() {
		return SearchAdr;
	}

	public void setSearchAdr(String searchAdr) {
		SearchAdr = searchAdr;
	}

	public String getPnu() {
		return pnu;
	}

	public void setPnu(String pnu) {
		this.pnu = pnu;
	}

	public String getWkt() {
		return wkt;
	}

	public void setWkt(String wkt) {
		this.wkt = wkt;
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

	public int getPageSize() {
		return pageSize;
	}

	public String getGid() {
		return gid;
	}

	public void setGid(String gid) {
		this.gid = gid;
	}
}
