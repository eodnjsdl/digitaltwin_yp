<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
	document.searchForm.action = "<c:url value='/com/mngr/info/selectArticleManageList.do'/>";
	document.searchForm.submit();
}

function fnGoInsert(){
	document.searchForm.action = "<c:url value='/com/mngr/info/insertArticleManageView.do'/>";
	document.searchForm.submit();
}

function fnLinkPage(pageNo){
    document.searchForm.pageIndex.value = pageNo;
    document.searchForm.action = "<c:url value='/com/mngr/info/selectArticleManageList.do'/>";
    document.searchForm.submit();
}

function fnInquireArticleDetail(nttId){
	document.listForm.nttId.value = nttId;
  	document.listForm.action = "<c:url value='/com/mngr/info/selectArticleManage.do'/>";
  	document.listForm.submit();
}

function fnInsertArticle() {
	document.searchForm.action = "<c:url value='/com/mngr/info/insertArticleManageView.do'/>";
  	document.searchForm.submit();
}

function fncCheckAll() {
    var checkField = document.listForm.delYn;
    if(document.listForm.checkAll.checked) {
        if(checkField) {
            if(checkField.length > 1) {
                for(var i=0; i < checkField.length; i++) {
                    checkField[i].checked = true;
                }
            } else {
                checkField.checked = true;
            }
        }
    } else {
        if(checkField) {
            if(checkField.length > 1) {
                for(var j=0; j < checkField.length; j++) {
                    checkField[j].checked = false;
                }
            } else {
                checkField.checked = false;
            }
        }
    }
}

function fncManageChecked() {

    var checkField = document.listForm.delYn;
    var checkId = document.listForm.checkId;
    var returnValue = "";
    var returnBoolean = false;
    var checkCount = 0;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked) {
                	checkCount++;
                    checkField[i].value = checkId[i].value;

                    if(returnValue == "")
                        returnValue = checkField[i].value;
                    else
                        returnValue = returnValue + ";" + checkField[i].value;
                }
            }
            if(checkCount > 0)
                returnBoolean = true;
            else {
                alert("<spring:message code="comUssUmt.validate.deptSelect" />");//선택된 부서가 없습니다.
                returnBoolean = false;
            }
        } else {
        	 if(document.listForm.delYn.checked == false) {
                alert("<spring:message code="comUssUmt.validate.deptSelect" />");//선택된 부서가 없습니다.
                returnBoolean = false;
            }
            else {
                returnValue = checkId.value;
                returnBoolean = true;
            }
        }
    } else {
        alert("<spring:message code="comUssUmt.validate.deptSelectResult" />");//조회된 결과가 없습니다.
    }
	
    document.listForm.nttIds.value = returnValue;

    return returnBoolean;
}

function fncSelDeleteList() {
    if(fncManageChecked()) {
    	if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
            document.listForm.action = "/com/mngr/info/deleteArticleManageList.do";
            document.listForm.submit();
        }
    }
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

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
							<div class="bbs-top">
								<div class="bbs-list-num">조회 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong>건</div>
								<div class="d-flex">
									<div class="term">
										<form:form commandName="searchVO" name="searchForm" method="post" onsubmit="fnSearch(); return false;">
											<form:hidden path="pageIndex" value="${searchVO.pageIndex}" />
											<form:hidden path="bbsId" />
											
											<div class="desc">
												<form:select cssClass="form-select" path="searchCnd">
													<option value="0"  <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if> >제목</option>
													<option value="1"  <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if> >내용</option>
													<option value="2"  <c:if test="${searchVO.searchCnd == '2'}">selected="selected"</c:if> >작성자</option>
												</form:select>
												<form:input cssClass="form-control" path="searchWrd" value="${searchVO.searchWrd}"/>
												<button type="submit" class="btn type05 bi-srch">조회</button>
												<button type="button" class="btn basic" onclick="fncSelDeleteList();">삭제</button>
												<button type="button" class="btn type01" onclick="fnGoInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
											</div>
										</form:form>
									</div>
								</div>
							</div>

							<form:form commandName="searchVO" name="listForm" method="post">
								<form:hidden path="pageIndex"/>
								<form:hidden path="nttId"/>
								<form:hidden path="bbsId"/>
								<form:hidden path="searchCnd" value="${searchVO.searchCnd}"/>
								<form:hidden path="searchWrd" value="${searchVO.searchWrd}"/>
							
								<input type="hidden" name="nttIds"/>
								 
								<c:set var="usetAt" value="${resultInfo.useAt}" />
								<fmt:parseDate  value="${nowDate}" pattern="yyyy-MM-dd" var="date"/>
								<fmt:formatDate value="${date}" pattern="yyyy-MM-dd" var="fdate"/>
								
								<div class="bbs-default">
									<table class="bbs-list">
										<colgroup>
											<col style="width: 5%;">
											<col style="width: 5%;">
											<col style="width: auto%;">
											<col style="width: 10%;">
											<col style="width: 20%;">
											<col style="width: 10%;">
											<col style="width: 10%;">
											<col style="width: 10%;">
										</colgroup>
										<thead>
											<tr>
												<th scope="col">
													<span class="form-checkbox">
														<input type="checkbox" name="checkAll" id="rChk-all" onclick="fncCheckAll();">
														<label for="rChk-all"></label>
													</span>
												</th>
												<th scope="col">번호</th>
												<th scope="col">제목</th>
												<th scope="col">공개여부</th>
												<th scope="col">게시 기간</th>
												<th scope="col">작성자</th>
												<th scope="col">작성일</th>
												<th scope="col">조회수</th>
											</tr>
										</thead>
										<tbody>
										
										<c:forEach items="${noticeList}" var="noticeInfo" varStatus="status">
											<tr>
												<td>
													<span class="form-checkbox">
														<input type="checkbox" name="delYn" id="noti_<c:out value="${noticeInfo.nttId}" />" value="<c:out value="${noticeInfo.nttId}" />">
														<label for="noti_<c:out value="${noticeInfo.nttId}" />"></label>
													</span>
													<input type="hidden" name="checkId" value="<c:out value="${noticeInfo.nttId}"/>" />
												</td>
												<td><img src="<c:url value='/images/egovframework/com/cop/bbs/icon_notice.png'/>" alt="notice"></td>
												<td>
													<a href="#" onclick="fnInquireArticleDetail('<c:out value='${noticeInfo.nttId}'/>');"><c:out value="${noticeInfo.nttSj}" escapeXml="false"/></a>
												</td>
												<td>
													<c:choose>
														<c:when test="${noticeInfo.secretAt eq 'Y'}">비공개</c:when>
														<c:when test="${noticeInfo.secretAt eq 'N'}">공개</c:when>
													</c:choose>
												</td>
												<td><c:out value="${noticeInfo.ntceBgnde}"/> ~ <c:out value="${noticeInfo.ntceEndde}"/></td>
												<td><c:out value="${noticeInfo.frstRegisterNm}"/></td>
												<td><c:out value="${noticeInfo.frstRegisterPnttm}"/></td>
												<td><c:out value="${noticeInfo.inqireCo}"/></td>	
											</tr>
										</c:forEach>
										
										<c:forEach var="resultInfo" items="${resultList}" varStatus="status">
											<tr>
												<td>
													<span class="form-checkbox">
														<input type="checkbox" name="delYn" id="rChk1_<c:out value="${resultInfo.nttId}" />" value="<c:out value="${resultInfo.nttId}" />">
														<label for="rChk1_<c:out value="${resultInfo.nttId}" />"></label>
													</span>
													<input type="hidden" name="checkId" value="<c:out value="${resultInfo.nttId}"/>" />
												</td>
												<td><c:out value="${(searchVO.pageIndex-1) * (11 - fn:length(noticeList)) + status.count}"/></td>
												<td><a href="#" onclick="fnInquireArticleDetail('<c:out value='${resultInfo.nttId}'/>');"><c:out value="${resultInfo.nttSj}" escapeXml="false"/></a></td>
												<td>
													<c:choose>
														<c:when test="${resultInfo.secretAt eq 'Y'}">비공개</c:when>
														<c:when test="${resultInfo.secretAt eq 'N'}">공개</c:when>
													</c:choose>
												</td>
												<td><c:out value="${resultInfo.ntceBgnde}"/> ~ <c:out value="${resultInfo.ntceEndde}"/></td>
												<td><c:out value="${resultInfo.frstRegisterNm}"/></td>
												<td><c:out value="${resultInfo.frstRegisterPnttm}"/></td>
												<td><c:out value="${resultInfo.inqireCo}"/></td>
											</tr>
										</c:forEach>
										
										<c:if test="${fn:length(resultList) == 0}">
											<tr>
												<td colspan="8">자료가 없습니다. 다른 검색조건을 선택해주세요</td>
											</tr>
										</c:if>
										
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
