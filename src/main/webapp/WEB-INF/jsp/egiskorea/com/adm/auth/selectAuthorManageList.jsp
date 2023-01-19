<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->


<script>

function fncCheckAll() {
    var checkField = document.listForm.checkField;
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

    var checkField = document.listForm.checkField;
    var checkId = document.listForm.checkId;
    var returnValue = "";

    var returnBoolean = false;
    var checkCount = 0;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked) {
                    checkField[i].value = checkId[i].value;
                    if(returnValue == "")
                        returnValue = checkField[i].value;
                    else
                	    returnValue = returnValue + ";" + checkField[i].value;
                    checkCount++;
                }
            }
            if(checkCount > 0)
                returnBoolean = true;
            else {
                alert("<spring:message code="comCopSecRam.validate.authorSelect" />"); //선택된 권한이 없습니다."
                returnBoolean = false;
            }
        } else {
            if(document.listForm.checkField.checked == false) {
                alert("<spring:message code="comCopSecRam.validate.authorSelect" />"); //선택된 권한이 없습니다."
                returnBoolean = false;
            }
            else {
                returnValue = checkId.value;
                returnBoolean = true;
            }
        }
    } else {
        alert("<spring:message code="comCopSecRam.validate.authorSelectResult" />"); //조회된 결과가 없습니다.
    }

    document.listForm.authorCodes.value = returnValue;

    return returnBoolean;
}

function fnSearch(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "/com/mngr/auth/selectAuthorManageList.do";
	document.searchForm.submit();
}

function fnGoInsert(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.action = "/com/mngr/auth/insertAuthorManageView.do";
	document.searchForm.submit();
}

function fnInquireAuthorManage(authorCode) {
	document.listForm.authorCode.value = authorCode;
  	document.listForm.action = "<c:url value='/com/mngr/auth/selectAuthorManage.do'/>";
  	document.listForm.submit();
}

function fncAuthorDeleteList() {

    if(fncManageChecked()) {
    	if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
            document.listForm.action = "<c:url value='/com/mngr/auth/deleteAuthorManageList.do'/>";
            document.listForm.submit();
        }
    }
}

function fncSelectAuthorRole(author) {
    document.listForm.searchKeyword.value = author;
    document.listForm.action = "<c:url value='/com/mngr/auth/selectAuthorRoleManageList.do'/>";
    document.listForm.submit();
}

function fnLinkPage(pageNo){
    document.listForm.pageIndex.value = pageNo;
    document.listForm.action = "<c:url value='/com/mngr/auth/selectAuthorManageList.do'/>";
    document.listForm.submit();
}
<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>

				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">권한정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">권한정보를 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">권한 수 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong></div>
								<div class="d-flex">
									<div class="term">권한명</div>
									<form:form name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<input type="hidden" name="searchCondition">
									<input type="hidden" name="pageIndex" value="<c:out value='${authorManageVO.pageIndex}'/>">
									<div class="desc">
										<input type="text" class="form-control" name="searchKeyword" maxlength="155" value="<c:out value="${authorManageVO.searchKeyword}"/>">
										<button type="submit" class="btn type05 bi-srch"><spring:message code="button.inquire" /></button> <!-- 조회 -->
										<button type="button" class="btn basic" onclick="fncAuthorDeleteList();"><spring:message code="title.delete" /></button> <!-- 삭제 -->
										<button type="button" class="btn type01" onclick="fnGoInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
									</div>
									</form:form>
								</div>
							</div>

							<form:form name="listForm" action="/com/mngr/usr/selectAuthorManageList.do" method="post">
							<input type="hidden" name="authorCode"/>
							<input type="hidden" name="authorCodes"/>
							<input type="hidden" name="pageIndex" value="<c:out value='${authorManageVO.pageIndex}'/>"/>
							<input type="hidden" name="searchCondition" value="<c:out value='${authorManageVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${authorManageVO.searchKeyword}'/>"/>
							
							<div class="bbs-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 5%;">
										<col style="width: 5%;">
										<col style="width: 20%;">
										<col style="width: 15%;">
										<col style="width: auto;">
										<col style="width: 10%;">
										<col style="width: 7%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">
												<span class="form-checkbox"><span><input type="checkbox" name="checkAll" id="checkAll" onclick="javascript:fncCheckAll()"><label for="checkAll"></label></span></span>
											</th>
											<th><spring:message code="table.num" /></th><!-- 번호 -->
											<th scope="col"><spring:message code="comCopSecRam.list.authorRollId" /></th><!-- 권한 ID -->
											<th scope="col"><spring:message code="comCopSecRam.list.authorNm" /></th><!-- 권한 명 -->
											<th scope="col"><spring:message code="comCopSecRam.list.authorDc" /></th><!-- 설명 -->
											<th scope="col"><spring:message code="table.regdate" /></th><!-- 등록일자 -->
											<th scope="col">기능정보</th>
										</tr>
									</thead>
									<tbody>
									<c:if test="${fn:length(resultList) == 0}">
										<tr>
											<td colspan="7"><spring:message code="common.nodata.msg" /></td>
										</tr>
									</c:if>
									<c:forEach var="result" items="${resultList}" varStatus="status">
										<tr>
											<td><span class="form-checkbox">
												<input type="checkbox" name="checkField" id="rChk1_<c:out value="${result.authorCode}" />" value="<c:out value="${result.authorCode}" />">
												<label for="rChk1_<c:out value="${result.authorCode}" />"></label></span>
												<input type="hidden" name="checkId" value="<c:out value="${result.authorCode}"/>" />
											</td>
											<td><c:out value="${(authorManageVO.pageIndex-1) * authorManageVO.pageUnit + status.count}"/></td>
											<td><a href="#" onclick="fnInquireAuthorManage('<c:out value='${result.authorCode}'/>');"><c:out value="${result.authorCode}"/></a></td>
											<td><c:out value="${result.authorNm}"/></td>
											<td><c:out value="${result.authorDc}"/></td>
											<td><c:out value="${fn:substring(result.authorCreatDe,0,10)}"/></td>
											<td><button type="button" class="btn basic" onclick="fncSelectAuthorRole('<c:out value="${result.authorCode}"/>')">설정</button></td>
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
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->