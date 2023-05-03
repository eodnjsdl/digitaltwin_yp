<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<!doctype html>


<script type="text/javaScript">
$(".scroll-y", this.selector).mCustomScrollbar({
    scrollbarPosition: "outside",
});
//상세보기
function aj_selectNotice(nttId){
	
	var pageIndex = $('#pageNo').val();
	var searchCnd = $('#searchCnd').val();
	var searchWrd = $('#searchWrd').val();
	
	$.ajax({
		type : "POST",
		url : "/com/noti/selectNotice.do",
		dataType : "html",
		data : {
			nttId : nttId,
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd,
		},
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bbsPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

//검색
function aj_search() {
	
	var searchCnd = $('#searchCnd').val();
	var searchWrd = $('#searchWrd').val();
	
	$.ajax({
		type : "POST",
		url : "/com/noti/selectNoticeList.do",
		dataType : "html",
		data : {
			searchCnd : searchCnd,
			searchWrd :	searchWrd,
			pageIndex : 1
		},
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bbsPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

//페이징
function aj_pagination(pageIndex) {
	$.ajax({
		type : "POST",
		url : "/com/noti/selectNoticeList.do",
		dataType : "html",
		data : {
			searchCnd : $("#searchCnd").val(),
			searchWrd : $("#searchWrd").val(),
			pageIndex : pageIndex
		},
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bbsPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

</script>

				<div class="popup-header" style="background-image: url(/images/etc/popup-title-notice.svg);">공지사항</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong>건</div>
								<form:form commandName="searchVO" name="searchForm" method="post" onsubmit="aj_search(); return false;">
									<form:hidden path="pageIndex" />
									<div>
										<form:select cssClass="form-select" path="searchCnd" id="searchCnd">
											<option value="0"  <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if> >제목</option>
											<option value="1"  <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if> >내용</option>
											<option value="2"  <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if> >작성자</option>
										</form:select>
										<form:input type="text" cssClass="form-control" path="searchWrd" id="searchWrd" />
										<button type="submit" class="btn btn-xsm type06">검색</button>
									</div>
								</form:form>
							</div>
							<div class="bbs-list-wrap" style="height: 530px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 7%;">
												<col style="width: auto;">
												<col style="width: 55px;">
												<col style="width: 10%;">
												<col style="width: 10%;">
												<col style="width: 8%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">No</th>
													<th scope="col">제목</th>
													<th scope="col"></th>
													<th scope="col">등록일</th>
													<th scope="col">등록자</th>
													<th scope="col">조회수</th>
												</tr>
											</thead>
										</table>
									</div>
									
									<input type="hidden" name="pageNo" id="pageNo" value="${articleVO.pageIndex}" />
									
									<table class="bbs-list">
										<colgroup>
											<col style="width: 7%;">
											<col style="width: auto;">
											<col style="width: 55px;">
											<col style="width: 10%;">
											<col style="width: 10%;">
											<col style="width: 8%;">
										</colgroup>
										<tbody>
											<c:forEach items="${noticeList}" var="noticeInfo" varStatus="status">
												<tr>
													<td><img src="<c:url value='/images/egovframework/com/cop/bbs/icon_notice.png'/>" alt="notice"></td>
													<td class="subject fixed">
														<a href="#" onclick="aj_selectNotice('<c:out value='${noticeInfo.nttId}'/>');">${noticeInfo.nttSj}</a>
													</td>
													<td>
														<%-- <c:if test="${not empty noticeInfo.atchFileId}">
															<a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a>
														</c:if> --%>
													</td>
													<td><c:out value="${noticeInfo.frstRegisterPnttm}"/></td>
													<td><c:out value="${noticeInfo.frstRegisterNm}"/></td>
													<td><c:out value="${noticeInfo.inqireCo}"/></td>
												</tr>
											</c:forEach>
											
											<c:forEach var="resultInfo" items="${resultList}" varStatus="status">
												<tr>
													<td><c:out value="${(searchVO.pageIndex-1) * (13 - fn:length(noticeList)) + status.count}"/></td>
													<td class="subject">
														<a href="#" onclick="aj_selectNotice('<c:out value='${resultInfo.nttId}'/>');"><c:out value='${resultInfo.nttSj}' escapeXml="false"/></a>
													</td>
													<td>
														<%-- <c:if test="${not empty resultInfo.atchFileId}">
															<a href="javascript:void(0);"><img src="/images/icon/icon-attach.svg" alt=""></a>
														</c:if> --%>
													</td>
													<td><c:out value="${resultInfo.frstRegisterPnttm}"/></td>
													<td><c:out value="${resultInfo.frstRegisterNm}"/></td>
													<td><c:out value="${resultInfo.inqireCo}"/></td>
												</tr>
											</c:forEach>
										
											<c:if test="${fn:length(resultList) == 0}">
												<tr>
													<td colspan="6">자료가 없습니다. 다른 검색조건을 선택해주세요</td>
												</tr>
											</c:if>
										</tbody>
									</table>
								</div>
	
								<div class="pagination">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="aj_pagination"/>
								</div>
	
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<script>
						$( function() {	
							$(".popup-bbs .popup-close").click(function(){
								$(".popup-overlay").hide();
							});
						});
					</script>