<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
    
<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->
<script type="text/javaScript" defer="defer">
/*********************************************************
 * 페이징 처리 함수
 ******************************************************** */
function fn_select_linkPage(pageNo){
	document.LoginLogForm.pageIndex.value = pageNo;
	document.LoginLogForm.action = "<c:url value='/com/mngr/hist/selectUseHistoryList.do'/>";
   	document.LoginLogForm.submit();
}
/*********************************************************
 * 조회 처리 함수
 ******************************************************** */
function fn_search_loginLog(){
	var vFrom = document.LoginLogForm;
	
	 if(vFrom.searchEndDe.value != ""){
	     if(vFrom.searchBgnDe.value > vFrom.searchEndDe.value){
	         alert("<spring:message code="comSymLogClg.validate.dateCheck" />"); //검색조건의 시작일자가 종료일자보다  늦습니다. 검색조건 날짜를 확인하세요!
	         return;
		  }
	 }else{
		 vFrom.searchEndDe.value = "";
	 }

	vFrom.pageIndex.value = "1";
	vFrom.action = "<c:url value='/com/mngr/hist/selectUseHistoryList.do'/>";
	vFrom.submit();
}
/*********************************************************
 * 엑셀 자료 다운로드
 ******************************************************** */
function fn_download_excelData(form){
	var resultCnt = Number("<c:out value='${resultCnt}'/>");
	
	if(resultCnt == 0){
		alert("다운로드할 이력이 없습니다.");
		return false;
	}
	
	document.cookie = "fileDownload=TRUE; path=/";
	ui.loadingBar("show");
	 	
	form.action = "/com/mngr/hist/downlaodUseHistoryListExcel.do";
	form.submit();
	
	var downloadTimer = setInterval(function() {
        var token = getCookie("fileDownload");
        
        if(token == "FALSE") {
        	clearInterval(downloadTimer);
        	ui.loadingBar("hide");
        }
    }, 1000);
}
</script>
    
				<!-- content -->
				<section id="content">
					<form name="LoginLogForm" action="<c:url value='/com/mngr/hist/selectUseHistoryList.do'/>" method="post" onSubmit="fn_search_loginLog(); return false;">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용이력 조회</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용이력을 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">

                            <div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="tab01" class="on"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectUseHistoryList.do'">이력조회</button></li>
										<li data-tab="tab02"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectUseHourlyStatistics.do'">시간대별 통계</button></li>
										<li data-tab="tab03"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectUseDailyStatistics.do'">일별 통계</button></li>
										<li data-tab="tab04"><button type="button" class="inner-tab" onclick="location.href='/com/mngr/hist/selectUseMonthlyStatistics.do'">월별 통계</button></li>
									</ul>
								</div>
                                <!-- 이력조회 -->
								<div class="tab-cont tab01 on">
									<div class="bbs-top">
                                        <div class="tbl-basic-num">전체 : <strong><c:out value="${resultCnt}" />건</strong></div>
                                        <div class="d-flex">
                                            <div class="desc">
                                                <div class="datapicker-group">
                                                	<input type="text" class="datepickerFrom" name="searchBgnDe" id="searchBgnDe" size="15" maxlength="10" value="${searchVO.searchBgnDe}" title="검색시작일 YYYY-MM-DD 형식으로 날짜를 입력해주세요" autocomplete="off"> 
                                                	<span class="form-dash">-</span> 
                                                	<input type="text" class="datepickerTo" name="searchEndDe" id="searchEndDe" size="15" maxlength="10" value="${searchVO.searchEndDe}" title="검색종료일 YYYY-MM-DD 형식으로 날짜를 입력해주세요" autocomplete="off">
                                                </div>
                                            </div>
                                            <div class="desc">
                                                <select name="searchCnd" id="searchCnd" name="searchCnd" title="검색조건" class="form-select" >
                                                    <option value="GROUP_NM" <c:if test="${searchVO.searchCnd == 'GROUP_NM'}">selected="selected"</c:if>>그룹</option>
                                                    <option value="ORGNZT_NM" <c:if test="${searchVO.searchCnd == 'ORGNZT_NM'}">selected="selected"</c:if>>조직</option>
                                                    <option value="USER_NM" <c:if test="${searchVO.searchCnd == 'USER_NM'}">selected="selected"</c:if>>사용자</option>
                                                </select>
                                                <input type="text" name="searchWrd" class="form-control" size="15" value='<c:out value="${searchVO.searchWrd}"/>' maxlength="15"><button type="submit" class="btn type05 bi-srch">검색</button>
                                                <button type="button" class="btn type08 bi-excel" onclick="fn_download_excelData(this.form)">엑셀자료 다운로드</button>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div class="bbs-default">
                                        <table class="bbs-list">
                                            <colgroup>
                                                <col style="width: auto;">
                                                <col style="width: auto;">
                                                <col style="width: auto;">
                                                <col style="width: auto;">
                                                <col style="width: auto;">
                                                <col style="width: auto;">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th scope="col">일시</th>
                                                    <th scope="col">그룹</th>
                                                    <th scope="col">조직</th>
                                                    <th scope="col">사용자명</th>
                                                    <th scope="col">사용자ID</th>
                                                    <th scope="col">기능</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <c:choose>
												<c:when test="${fn:length(resultList) == 0}">
												<tr>
													<td colspan="6"><spring:message code="common.nodata.msg" /></td>
												</tr>
												</c:when>
												<c:otherwise>
                                                <c:forEach items="${resultList}" var="result" varStatus="status">
												<tr>
													<td><c:out value='${result.occrrncDe}'/></td>
													<td><c:out value='${result.groupNm}'/></td>
													<td><c:out value='${result.orgnztNm}'/></td>
													<td><c:out value='${result.rqsterNm}'/></td>
													<td><c:out value='${result.userId}'/></td>
													<td><c:out value='${result.methodNm}'/></td>
												</tr>
												</c:forEach>																
												</c:otherwise>
                                            </c:choose>
                                            </tbody>
                                        </table>
                                    </div>
        
									<!-- paging navigation -->
									<c:if test="${paginationInfo.totalRecordCount > 0}">
									<div class="pagination">
										<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_linkPage"/>
									</div>
									</c:if>
								</div>
                                <!-- //이력조회 -->

							</div>
						</div>
					</div>
					<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>">
					</form>
				</section>