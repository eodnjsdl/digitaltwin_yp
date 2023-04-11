/***********************************
* 공통 페이징 처리 VO
* @author  : 백승석
* @since   : 2023.02.21
* @version : 1.0
************************************/
package egiskorea.com.cmm.service;

public class PgeVO {
	private int totalRowCount;			//총 row 개수
	private int rowCountPerPage= 10;	//한 페이지에 보여질 row 수
	private int pages=10; 				//한 화면에 보여질 페이지 수
	
	private int totalPageCount;			//총 페이지 수
	private int pageGroup=1;			//화면에 보여질 페이지의 그룹
	private int last=10;				//화면에 보여질 마지막 페이지
	private int first=1;				//화면에 보여질 첫번째 페이지
	
	private int currentPageNo=1; 		//현재 페이지 번호
	private int firstRow=1;				//화면에 보여질 첫번째 row
	private int lastRow=10;				//화면에 보여질 마지막 row
	
	public int getTotalRowCount() {
		return totalRowCount;
	}
	public void setTotalRowCount(int totalRowCount) {
		this.totalRowCount = totalRowCount;
	}
	public int getRowCountPerPage() {
		return rowCountPerPage;
	}
	public void setRowCountPerPage(int rowCountPerPage) {
		this.rowCountPerPage = rowCountPerPage;
	}
	public int getPages() {
		return pages;
	}
	public void setPages(int pages) {
		this.pages = pages;
	}
	public int getTotalPageCount() {
		return totalPageCount;
	}
	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}
	public int getPageGroup() {
		return pageGroup;
	}
	public void setPageGroup(int pageGroup) {
		this.pageGroup = pageGroup;
	}
	public int getLast() {
		return last;
	}
	public void setLast(int last) {
		this.last = last;
	}
	public int getFirst() {
		return first;
	}
	public void setFirst(int first) {
		this.first = first;
	}
	public int getCurrentPageNo() {
		return currentPageNo;
	}
	public void setCurrentPageNo(int currentPageNo) {
		this.currentPageNo = currentPageNo;
	}
	public int getFirstRow() {
		return firstRow;
	}
	public void setFirstRow(int firstRow) {
		this.firstRow = firstRow;
	}
	public int getLastRow() {
		return lastRow;
	}
	public void setLastRow(int lastRow) {
		this.lastRow = lastRow;
	}
}
