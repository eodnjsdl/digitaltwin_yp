package egiskorea.com.cmm;
/**
 * PaginationInfo.java
 * <p/><b>NOTE:</b><pre>
 *                페이징 처리를 위한 데이터가 담기는 빈.
 *                페이징 처리에 필요한 데이터를 Required Fields, Not Required Fields 로 나누었다.
 *
 *                Required Fields
 *                : 사용자가 입력해야 하는 필드값이다.
 *                currentPageNo : 현재 페이지 번호.
 *                recordCountPerPage : 한 페이지당 게시되는 게시물 건 수.
 *                pageSize : 페이지 리스트에 게시되는 페이지 건수.
 *                totalRecordCount : 전체 게시물 건 수.
 *
 *                Not Required Fields
 *                : 사용자가 입력한 Required Fields 값을 바탕으로 계산하여 정해지는 값이다.
 *                totalPageCount: 페이지 개수.
 *                firstPageNoOnPageList : 페이지 리스트의 첫 페이지 번호.
 *                lastPageNoOnPageList : 페이지 리스트의 마지막 페이지 번호.
 *                firstRecordIndex : 페이징 SQL의 조건절에 사용되는 시작 rownum.
 *                lastRecordIndex : 페이징 SQL의 조건절에 사용되는 마지막 rownum.
 *
 *                페이징 Custom 태그인 &lt;ui:pagination&gt; 사용시에 paginationInfo 필드에 PaginationInfo 객체를 값으로 주어야 한다.
 *                </pre>
 *
 */
public class PaginationInfo {

    /**
     * Required Fields
     * - 이 필드들은 페이징 계산을 위해 반드시 입력되어야 하는 필드 값들이다.
     *
     * currentPageNo : 현재 페이지 번호
     * pageSize : 한 페이지당 게시되는 게시물 건 수
     * pageUnit : 페이지 리스트에 게시되는 페이지 건수,
     * totalRecordCount : 전체 게시물 건 수.
     */

    private int currentPageNo;
    private int pageSize;
    private int pageUnit;
    private int totalRecordCount;

    /**
     * Not Required Fields
     * - 이 필드들은 Required Fields 값을 바탕으로 계산해서 정해지는 필드 값이다.
     *
     * totalPageCount: 페이지 개수
     * firstPageNoOnPageList : 페이지 리스트의 첫 페이지 번호
     * lastPageNoOnPageList : 페이지 리스트의 마지막 페이지 번호
     * firstRecordIndex : 페이징 SQL의 조건절에 사용되는 시작 rownum.
     * lastRecordIndex : 페이징 SQL의 조건절에 사용되는 마지막 rownum.
     */

    private int totalPageCount;
    private int startPage;
    private int endPage;
    private int firstRecordIndex;
    private int lastRecordIndex;
    private boolean hasPrevious = true;
    private boolean hasNext = true;

    public PaginationInfo(int currentPageNo, int pageSize, int pageUnit, int totalRecordCount) {
        this.currentPageNo = currentPageNo;
        this.pageSize = pageSize;
        this.pageUnit = pageUnit;
        this.totalRecordCount = totalRecordCount;

        this.totalPageCount = totalRecordCount/pageSize;
        this.totalPageCount = (totalRecordCount%pageSize) > 0 ? this.totalPageCount +1: this.totalPageCount;

        this.startPage = (((currentPageNo-1)/pageUnit)*pageUnit)+1;

        this.endPage = (this.startPage-1) + pageUnit;

        if(this.totalPageCount < this.endPage) {
            this.endPage = this.totalPageCount == 0? 1 : this.totalPageCount;
        }
        
        if(this.startPage==1) {this.setHasPrevious(false);}
        if(endPage>this.totalPageCount-10) {this.setHasNext(false);}
        this.hasPrevious = isHasPrevious();
        this.hasNext = isHasNext();
    }


    public int getCurrentPageNo() {
        return currentPageNo;
    }

    public void setCurrentPageNo(int currentPageNo) {
        this.currentPageNo = currentPageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageUnit() {
        return pageUnit;
    }

    public void setPageUnit(int pageUnit) {
        this.pageUnit = pageUnit;
    }

    public int getTotalRecordCount() {
        return totalRecordCount;
    }

    public void setTotalRecordCount(int totalRecordCount) {this.totalRecordCount = totalRecordCount;}

    public int getTotalPageCount() {
        return totalPageCount;
    }

    public int getStartPage() {
        return startPage;
    }

    public int getEndPage() {
        return endPage;
    }

    public int getFirstRecordIndex() {
        return firstRecordIndex;
    }

    public int getLastRecordIndex() {
        return lastRecordIndex;
    }


	public boolean isHasNext() {
		return hasNext;
	}


	public void setHasNext(boolean hasNext) {
		this.hasNext = hasNext;
	}


	public boolean isHasPrevious() {
		return hasPrevious;
	}


	public void setHasPrevious(boolean hasPrevious) {
		this.hasPrevious = hasPrevious;
	}
}
