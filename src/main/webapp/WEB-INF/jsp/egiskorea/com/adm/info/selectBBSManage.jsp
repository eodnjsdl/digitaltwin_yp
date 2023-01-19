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

function fnDeleteBbs(bbsId){
	if(confirm("<spring:message code="common.delete.msg" />")){	
		document.listform.bbsId.value = bbsId;
		document.listform.action = "<c:url value='/com/mngr/info/deleteBBSManage.do'/>";
		document.listform.submit();
	}
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/info/selectBBSManageList.do' />";
	document.goListForm.submit();
}

function fnGoUpdate(bbsId) {
	document.goUpdateForm.bbsId.value = bbsId;
  	document.goUpdateForm.action = "<c:url value='/com/mngr/info/updateBBSManageView.do'/>";
  	document.goUpdateForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>		
				
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
						<form:form commandName="searchVO" name="listform" method="post" action="/com/mngr/info/updateBBSManageView.do">
							<form:hidden path="cmmntyId" />
							<form:hidden path="bbsId" />
							
							<div class="bbs-detail-default">
								<table class="bbs-detail">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">게시판명</th>
											<td><c:out value="${result.bbsNm}" escapeXml="false"/></td>
										</tr>
										<tr>
											<th scope="row">게시판 내용</th>
											<td><c:out value="${fn:replace(result.bbsIntrcn , crlf , '<br/>')}" escapeXml="false"/></td>
										</tr>
										<tr>
											<th scope="row">게시판 유형</th>
											<td><c:out value="${result.bbsTyCodeNm}" /></td>
										</tr>
										<tr>
											<th scope="row">답장 여부</th>
											<td>
												<c:choose>
													<c:when test="${result.replyPosblAt eq 'Y'}">사용</c:when>
													<c:when test="${result.replyPosblAt eq 'N'}">미사용</c:when>
												</c:choose>
											</td>
										</tr>
										<tr>
											<th scope="row">파일첨부 여부</th>
											<td>
												<c:choose>
													<c:when test="${result.fileAtchPosblAt eq 'Y'}">사용</c:when>
													<c:when test="${result.fileAtchPosblAt eq 'N'}">미사용</c:when>
												</c:choose>
											</td>
										</tr>
										<tr>
											<th scope="row">첨부파일 최대수</th>
											<td><c:out value="${result.atchPosblFileNumber}" /></td>
										</tr>
										<tr>
											<th scope="row">추가선택사항</th>
											<td>
												<c:choose>
													<c:when test="${result.option eq 'comment'}">댓글</c:when>
													<c:when test="${result.option eq 'stsfdg'}">만족도조사</c:when>
													<c:otherwise>미선택</c:otherwise>
												</c:choose>
											</td>
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
									</tbody>
								</table>
							</div>

							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${searchVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								</div>
								<div>
									<button type="button" class="btn type02" onclick="fnGoUpdate('<c:out value='${result.bbsId}'/>')"><spring:message code="button.update" /></button>
									<button type="button" class="btn basic" onclick="fnDeleteBbs('<c:out value="${result.bbsId}"/>'); return false;">삭제</button>
								</div>
							</div>
							</form:form>
						</div>
					</div>
					
					<form:form name="goListForm" method="post">
					<input type="hidden" name="cmmntyId" value="<c:out value='${result.cmmntyId}'/>"/>
					<input type="hidden" name="bbsId" value="<c:out value='${result.bbsId}'/>"/>
					<input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>"/>
					<input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>"/>
					<input type="hidden" name="pageIndex"/>
					</form:form>
					
					<form:form name="goUpdateForm" method="post">
					<input type="hidden" name="cmmntyId" value="<c:out value='${result.cmmntyId}'/>"/>
					<input type="hidden" name="bbsId" value="<c:out value='${result.bbsId}'/>"/>
					<input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>"/>
					<input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'/>"/>
					</form:form>
				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->