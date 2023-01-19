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
	document.searchForm.searchKeyword.focus();
});

function fnSearch(){
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "<c:url value='/com/mngr/info/selectLayerManageList.do'/>";
	document.searchForm.submit();
}

function fnLinkPage(pageNo){
    document.searchForm.pageIndex.value = pageNo;
    document.searchForm.action = "<c:url value='/com/mngr/info/selectLayerManageList.do'/>";
    document.searchForm.submit();
}

function fnInquireLayerdetail(lyrId){
	document.listForm.lyrId.value = lyrId;
  	document.listForm.action = "<c:url value='/com/mngr/info/selectLayerManage.do'/>";
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
							<h3 class="page-tit">레이어 관리</h3>
							<p class="page-txt">레이어 목록을 입력 관리 할 수 있는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">조회 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong>건</div>
								<div class="d-flex">
									<div class="term">
										<form:form commandName="layerSet" name="searchForm" method="post" onsubmit="fnSearch(); return false;">
											<form:hidden path="pageIndex" />
											<div class="desc">
												<form:select cssClass="form-select" path="searchCondition">
													<option value="1"  <c:if test="${layerSet.searchCondition == '1'}">selected="selected"</c:if> >유형명</option>
													<option value="2"  <c:if test="${layerSet.searchCondition == '2'}">selected="selected"</c:if> >분류명</option>
													<option value="3"  <c:if test="${layerSet.searchCondition == '3'}">selected="selected"</c:if> >레이어명</option>
												</form:select>
												<form:input cssClass="form-control" path="searchKeyword" />
												<button type="submit" class="btn type05 bi-srch">조회</button>
											</div>
										</form:form>
									</div>
								</div>
							</div>

							<form:form commandName="layerSet" name="listForm" method="post">
								<form:hidden path="lyrId"/>
								
								<div class="bbs-default">
									<table class="bbs-list">
										<colgroup>
											<col style="width: 10%;">
											<col style="width: 12%;">
											<col style="width: 12%;">
											<col style="width: 13%;">
											<col style="width: auto%;">
											<col style="width: 12%;">
											<col style="width: 13%;">
											<col style="width: 12%;">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">번호</th>
												<th scope="col">유형</th>
												<th scope="col">분류</th>
												<th scope="col">레이어명</th>
												<th scope="col">테이블명</th>
												<th scope="col">등록자</th>
												<th scope="col">갱신일</th>
												<th scope="col">사용여부</th>
											</tr>
										</thead>
										<tbody>
										
										<c:if test="${fn:length(resultList) == 0}">
											<tr>
												<td colspan="8">자료가 없습니다. 다른 검색조건을 선택해주세요</td>
											</tr>
										</c:if>
										
										<c:forEach var="resultInfo" items="${resultList}" varStatus="status">
											<tr>
												<td><c:out value="${(layerSet.pageIndex-1) * (11) + status.count}"/></td>
												<td><c:out value='${resultInfo.lyrKnd}'/></td>
												<td><c:out value='${resultInfo.lyrCl}'/></td>
												<td><a href="#" onclick="fnInquireLayerdetail('<c:out value='${resultInfo.lyrId}'/>');"><c:out value='${resultInfo.lyrNm}' escapeXml="false"/></a></td>
												<td><a href="#" onclick="fnInquireLayerdetail('<c:out value='${resultInfo.lyrId}'/>');"><c:out value='${resultInfo.tblNm}' escapeXml="false"/></a></td>
												<td><c:out value='${resultInfo.frstRegisterNm}'/></td>
												<td><c:out value='${resultInfo.lastModfDt}'/></td>
												<td><c:out value='${resultInfo.useAt}'/></td>
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
