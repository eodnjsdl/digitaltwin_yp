<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

<script type="text/javaScript">

$(document).ready(function(){
	document.searchForm.searchWrd.focus();
});

function fnSearch(){
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "<c:url value='/com/mngr/info/selectBBSManageList.do'/>";
	document.searchForm.submit();
}

function fnGoInsert(){
	document.searchForm.action = "<c:url value='/com/mngr/info/insertBBSManageView.do'/>";
	document.searchForm.submit();
}

function fnLinkPage(pageNo){
    document.searchForm.pageIndex.value = pageNo;
    document.searchForm.action = "<c:url value='/com/mngr/info/selectBBSManageList.do'/>";
    document.searchForm.submit();
}

function fnInquireBbsDetail(bbsId){
	document.listForm.bbsId.value = bbsId;
  	document.listForm.action = "<c:url value='/com/mngr/info/selectBBSManage.do'/>";
  	document.listForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">게시판 관리</h3>
							<p class="page-txt">게시판 관리 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">조회 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong>건</div>
								<div class="d-flex">
									<div class="term">
										<form:form commandName="searchVO" name="searchForm" method="post" onsubmit="fnSearch(); return false;">
											<form:hidden path="pageIndex" value="${searchVO.pageIndex}" />
											<div class="desc">
												<form:select cssClass="form-select" path="searchCnd">
													<option value="0"  <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if> >게시판명</option>
													<option value="1"  <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if> >게시판내용</option>
												</form:select>
												<form:input cssClass="form-control" path="searchWrd" value="${searchVO.searchWrd}"/>
												<button type="submit" class="btn type05 bi-srch">조회</button>
												<button type="button" class="btn type01" onclick="fnGoInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
											</div>
										</form:form>
									</div>
								</div>
							</div>

							<form:form commandName="searchVO" name="listForm" method="post">
								<form:hidden path="cmmntyId"/>
								<form:hidden path="bbsId"/>
								<form:hidden path="pageIndex"/>
								<form:hidden path="searchCnd" value="${searchVO.searchCnd}"/>
								<form:hidden path="searchWrd" value="${searchVO.searchWrd}"/>
								<c:set var="usetAt" value="${resultInfo.useAt}" />
								
								<div class="bbs-default">
									<table class="bbs-list">
										<colgroup>
											<col style="width: 10%;">
											<col style="width: auto%;">
											<col style="width: 15%;">
											<col style="width: 15%;">
											<col style="width: 15%;">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">번호</th>
												<th scope="col">게시판명</th>
												<th scope="col">등록자</th>
												<th scope="col">등록일</th>
												<th scope="col">사용여부</th>
											</tr>
										</thead>
										<tbody>
										
										<c:if test="${fn:length(resultList) == 0}">
											<tr>
												<td colspan="5">자료가 없습니다. 다른 검색조건을 선택해주세요</td>
											</tr>
										</c:if>
										
										<c:forEach var="resultInfo" items="${resultList}" varStatus="status">
											<tr>
												<td><c:out value="${(searchVO.pageIndex-1) * (11) + status.count}"/></td>
												<td><a href="#" onclick="fnInquireBbsDetail('<c:out value='${resultInfo.bbsId}'/>');"><c:out value="${resultInfo.bbsNm}" escapeXml="false"/></a></td>
												<td><c:out value="${resultInfo.frstRegisterNm}"/></td>
												<td><c:out value="${resultInfo.frstRegisterPnttm}"/></td>
												<td>
													<c:choose>
														<c:when test="${resultInfo.useAt eq 'Y'}">사용</c:when>
														<c:when test="${resultInfo.useAt eq 'N'}">미사용</c:when>
													</c:choose>
												</td>
											</tr>
										</c:forEach>
										
										</tbody>
									</table>
								</div>
								
								<!-- pagination -->
								<div class="pagination">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fnLinkPage"/>
								</div>
								<!-- //pagination -->
								
							</form:form>
						</div>
					</div>

				</section>
				<!-- //content -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
