<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%pageContext.setAttribute("crlf", "\r\n"); %>

<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

<script type="text/javaScript">

function fnDeleteCode(codeId, code){
	if(confirm("<spring:message code="common.delete.msg" />")){	
		document.listform.codeId.value = codeId;
		document.listform.code.value = code;
		document.listform.action = "<c:url value='/com/mngr/info/deleteCcmCmmnDetailCodeManage.do'/>";
		document.listform.submit();
	}
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/info/selectCcmCmmnDetailCodeManageList.do' />";
	document.goListForm.submit();
}

function fnGoUpdate(codeId) {
	document.goUpdateForm.codeId.value = codeId;
  	document.goUpdateForm.action = "<c:url value='/com/mngr/info/updateCcmCmmnDetailCodeManageView.do'/>";
  	document.goUpdateForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>		

				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">공통상세코드 관리</h3>
							<p class="page-txt">공통상세코드 관리 페이지입니다.</p>
						</div>
					</div>
					
					<div class="row">
						<div class="col-12">
						<form:form commandName="cmmnDetailCodeVO" name="listform" method="post" action="/com/mngr/info/updateCcmCmmnDetailCodeManageView.do">
							<form:hidden path="codeId" />
							<form:hidden path="code" />
							
							<div class="bbs-detail-default">
								<table class="bbs-detail">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										
										<tr>
											<th scope="row">코드ID명</th>
											<td><c:out value="${result.codeIdNm}" /></td>
										</tr>
										<tr>
											<th scope="row">상세코드</th>
											<td><c:out value="${result.code}" escapeXml="false"/></td>
										</tr>
										<tr>
											<th scope="row">상세코드명</th>
											<td><c:out value="${result.codeNm}" escapeXml="false"/></td>
										</tr>
										<tr>
											<th scope="row">상세코드설명</th>
											<td><c:out value="${fn:replace(result.codeDc , crlf , '<br/>')}" escapeXml="false"/></td>
										</tr>
										<tr>
											<th scope="row">사용여부</th>
											<td>
												<c:choose>
													<c:when test="${result.useAt eq 'Y'}">사용</c:when>
													<c:when test="${result.useAt eq 'N'}">미사용</c:when>
												</c:choose>
											</td>
										</tr>
										<tr>
											<th scope="row">생성일</th>
											<td><c:out value="${result.frstRegistPnttm}"/></td>
										</tr>
										<tr>
											<th scope="row">생성자</th>
											<td><c:out value="${result.frstRegisterNm}"/></td>
										</tr>
										<tr>
											<th scope="row">수정일</th>
											<td><c:out value="${result.lastUpdtPnttm}"/></td>
										</tr>
										<tr>
											<th scope="row">수정자</th>
											<td><c:out value="${result.lastUpdusrNm}"/></td>
										</tr>										
									</tbody>
								</table>
							</div>

							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${cmmnDetailCodeVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								</div>
								<div>
									<button type="button" class="btn type02" onclick="fnGoUpdate('<c:out value='${result.codeId}'/>')"><spring:message code="button.update" /></button>
									<button type="button" class="btn basic" onclick="fnDeleteCode('<c:out value="${result.codeId}"/>', '<c:out value="${result.code}"/>'); return false;"><spring:message code="button.delete" /></button>
								</div>
							</div>
							</form:form>
						</div>
					</div>
					
					<form:form name="goListForm" method="post">
					<input type="hidden" name="codeId" value="<c:out value='${result.codeId}'/>"/>
					<input type="hidden" name="code" value="<c:out value='${result.code}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${cmmnDetailCodeVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${cmmnDetailCodeVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex"/>
					</form:form>
					
					<form:form name="goUpdateForm" method="post">
					<input type="hidden" name="codeId" value="<c:out value='${result.codeId}'/>"/>
					<input type="hidden" name="code" value="<c:out value='${result.code}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${cmmnDetailCodeVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${cmmnDetailCodeVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${cmmnDetailCodeVO.pageIndex}'/>"/>
					</form:form>
					
				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->