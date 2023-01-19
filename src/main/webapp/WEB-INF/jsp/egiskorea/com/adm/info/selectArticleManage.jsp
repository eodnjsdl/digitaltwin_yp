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

function fnDeleteArticle(){
	if(confirm("<spring:message code="common.delete.msg" />")){	
		document.listform.action = "<c:url value='/com/mngr/info/deleteArticleManage.do'/>";
		document.listform.submit();
	}
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/info/selectArticleManageList.do' />";
	document.goListForm.submit();
}

function fnGoUpdate(nttId) {
	document.goUpdateForm.nttId.value = nttId;
  	document.goUpdateForm.action = "<c:url value='/com/mngr/info/updateArticleManageView.do'/>";
  	document.goUpdateForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>		

				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">공지사항 관리</h3>
							<p class="page-txt">공지사항 관리 페이지입니다.</p>
						</div>
					</div>
					
					<div class="row">
						<div class="col-12">
						<form:form commandName="searchVO" name="listform" method="post" action="/com/mngr/info/updateArticleManageView.do">
							<form:hidden path="nttId" />
							<form:hidden path="bbsId" />
							<form:hidden path="pageIndex" />
							
							<div class="bbs-detail-default">
								<table class="bbs-detail">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: 30%;">
										<col style="width: 20%;">
										<col style="width: 30%;"> 
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">제목</th>
											<td colspan="3"><c:out value="${result.nttSj}" escapeXml="false"/></td>
										</tr>
										<tr>
											<th scope="row">공개 여부</th>
											<td>
												<c:choose>
													<c:when test="${result.secretAt eq 'Y'}">비공개</c:when>
													<c:when test="${result.secretAt eq 'N'}">공개</c:when>
												</c:choose>
											</td>
											<th scope="row">작성일</th>
											<td><c:out value="${result.frstRegisterPnttm}"/></td>
										</tr>
										<tr>
											<th scope="row">팝업공개여부</th>
											<td>
												<c:choose>
													<c:when test="${result.noticeAt eq 'Y'}">공개</c:when>
													<c:when test="${result.noticeAt eq 'N'}">비공개</c:when>
												</c:choose>
											</td>
											<th scope="row">게시일</th>
											<td>
												<c:out value="${result.ntceBgnde}"/>
												~
												<c:out value="${result.ntceEndde}"/>
											</td>
										</tr>
										<tr>
											<th scope="row">작성자</th>
											<td>
												<c:out value="${result.ntcrNm}"/>
											</td>
											<th scope="row">조회수</th>
											<td>
												<c:out value="${result.inqireCo}"/>
											</td>
										</tr>
										<tr>
											<th scope="row">공지 내용</th>
											<td colspan="3">
												<c:out value="${fn:replace(result.nttCn , crlf , '<br/>')}" escapeXml="false" />
											</td>
										</tr>
										<tr>
											<c:if test="${boardMasterVO.fileAtchPosblAt == 'Y'}">
												<tr>
													<th scope="row">첨부파일</th>
													<td colspan="3">
														<c:import url="/cmm/fms/selectFileInfs.do" charEncoding="utf-8">
															<c:param name="param_atchFileId" value="${result.atchFileId}" />
														</c:import>
													</td>
												</tr>
											</c:if>
										</tr>										
									</tbody>
								</table>
							</div>

							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${searchVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								</div>
								<div>
									<button type="button" class="btn type02" onclick="fnGoUpdate('<c:out value='${result.nttId}'/>')"><spring:message code="button.update" /></button>
									<button type="button" class="btn basic" onclick="fnDeleteArticle(); return false;"><spring:message code="button.delete" /></button>
								</div>
							</div>
							</form:form>
						</div>
					</div>
					
					<form:form name="goListForm" method="post">
					<input type="hidden" name="nttId" value="<c:out value='${result.nttId}'/>"/>
					<input type="hidden" name="bbsId" value="<c:out value='${result.bbsId}'/>"/>
					<input type="hidden" name="searchCnd" value="<c:out value='${searchVO.searchCnd}'/>"/>
					<input type="hidden" name="searchWrd" value="<c:out value='${searchVO.searchWrd}'/>"/>
					<input type="hidden" name="pageIndex"/>
					</form:form>
					
					<form:form name="goUpdateForm" method="post">
					<input type="hidden" name="nttId" value="<c:out value='${result.nttId}'/>"/>
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