<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!doctype html>
<script type="text/javaScript">

$( function() {	
	$(".popup-bbs .popup-close").click(function(){
		$(".popup-overlay").hide();
	});
});
$(".scroll-y", this.selector).mCustomScrollbar({
    scrollbarPosition: "outside",
});

function fnSearch(){
	$.ajax({
		type : "POST",
		url : "/com/qna/selectQnaList.do",
		data : {
			searchCnd : $("#searchCnd").val(),
			searchWrd : $("#searchWrd").val(),
			pageIndex : 1,
		},
		dataType : "html",
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

function aj_selectQna(qaId){
	
	var pageIndex = $('#pageNo').val();
	var searchCnd = $('#searchCnd').val();
	var searchWrd = $('#searchWrd').val();
	
	$.ajax({
		type : "POST",
		url : "/com/qna/selectQna.do",
		data : {
			qaId : qaId,
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd,
		},
		dataType : "html",
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

function aj_insertQnaView(){
	
	var pageIndex = $('#pageNo').val();
	var searchCnd = $('#searchCnd').val();
	var searchWrd = $('#searchWrd').val();
	
	$.ajax({
		type : "POST",
		url : "/com/qna/insertQnaView.do",
		data : {
			pageIndex : pageIndex,
			searchCnd : searchCnd,
			searchWrd : searchWrd,
		},
		dataType : "html",
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

function aj_pagination(pageIndex) {
	$.ajax({
		type : "POST",
		url : "/com/qna/selectQnaList.do",
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

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>


					<div class="popup-header" style="background-image: url(/images/etc/popup-title-board.svg)">Q&A</div>
					<div class="popup-body">
						<div class="bbs-popup-body">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 :  <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong>건</div>
								<form:form commandName="searchVO" name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<form:hidden path="areaNo" />
									<form:hidden path="pageIndex" />
									
									<div>
										<form:select cssClass="form-select" path="searchCnd" id="searchCnd">
											<option value="0"  <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if> >제목</option>
											<option value="1"  <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if> >작성자</option>
										</form:select>
										<form:input cssClass="form-control" path="searchWrd" id="searchWrd"/>
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
												<col style="width: 10%;">
												<col style="width: 8%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">No</th>
													<th scope="col">제목</th>
													<th scope="col"></th>
													<th scope="col">진행상태</th>
													<th scope="col">등록일</th>
													<th scope="col">등록자</th>
													<th scope="col">조회수</th>
												</tr>
											</thead>
										</table>
									</div>
									
									<input type="hidden" name="pageNo" id="pageNo" value="${searchVO.pageIndex}" />
									
									<table class="bbs-list">
										<colgroup>
											<col style="width: 7%;">
											<col style="width: auto;">
											<col style="width: 55px;">
											<col style="width: 10%;">
											<col style="width: 10%;">
											<col style="width: 10%;">
											<col style="width: 8%;">
										</colgroup>
										<tbody>
										
											<c:if test="${fn:length(resultList) == 0}">
												<!-- 글이 없는 경우 -->
												<tr>
													<td colspan="8"><spring:message code="common.nodata.msg" /></td>
												</tr>
											</c:if>	
											
											<c:forEach var="resultInfo" items="${resultList}" varStatus="status">
											<tr>
												<td><c:out value="${(searchVO.pageIndex-1) * 10 + status.count}"/></td>
												<td class="subject">
													<a href="javascript:aj_selectQna('<c:out value="${resultInfo.qaId}"/>')" class="subject">
		    											<c:out value='${fn:substring(resultInfo.qestnSj, 0, 70)}' escapeXml="false"/>
		  		  										<c:if test="${resultInfo.qnaProcessSttusCode eq '3'}" >
		    												<!-- <img src="/images/icon/bbs-badge-completion.svg" class="bbs-badge" alt="완료"> -->
		    												<span class="reply-badge">완료</span>
				    									</c:if>
				    								</a>
												</td>
												<td>
										<%-- 			<c:if test="${not empty resultInfo.atchFileId}">
													<img src="/images/icon/icon-attach.svg" alt="">
													</c:if> --%>
												</td>
												<td><c:out value='${resultInfo.qnaProcessSttusCodeNm}'/></td>
												<td><c:out value='${resultInfo.frstRegisterPnttm}'/></td>
												<td><c:out value='${resultInfo.wrterNm}'/></td>
												<td><c:out value='${resultInfo.inqireCo}'/></td>
											</tr>
											</c:forEach>
											
										</tbody>
									</table>
								</div>
	
								<!-- pagination -->
								<div class="pagination">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="aj_pagination"/>
								</div>
								<!-- //pagination -->
	
								<div class="position-absolute right"><button type="button" class="btn basic bi-write2" onclick="aj_insertQnaView()">등록</button></div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>