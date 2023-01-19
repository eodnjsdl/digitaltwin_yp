<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>



<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

<script type="text/javaScript" language="javascript">

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

	var resultCheck = false;

    var checkField = document.listForm.delYn;
    var checkId = document.listForm.checkId;
    var selectAuthor = document.listForm.authorManageCombo;
    var booleanRegYn = document.listForm.regYn;
    var listMberTyCode = document.listForm.mberTyCode;

    var returnId = "";
    var returnAuthor = "";
    var returnRegYn = "";
    var returnmberTyCode = "";

    var checkedCount = 0;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked) {
                	checkedCount++;
                    checkField[i].value = checkId[i].value;
                    if(returnId == "") {
                        returnId = checkField[i].value;
                        returnAuthor = selectAuthor[i].value;
                        returnRegYn = booleanRegYn[i].value;
                        returnmberTyCode = listMberTyCode[i].value;
                    }
                    else {
                    	returnId = returnId + ";" + checkField[i].value;
                    	returnAuthor = returnAuthor + ";" + selectAuthor[i].value;
                    	returnRegYn = returnRegYn + ";" + booleanRegYn[i].value;
                    	returnmberTyCode = returnmberTyCode + ";" + listMberTyCode[i].value;

                    }
                }
            }

            if(checkedCount > 0)
            	resultCheck = true;
            else {
                alert("<spring:message code="comCopSecRgm.list.validate.alert.notSelect" />");//선택된  항목이 없습니다.
                resultCheck = false;
            }

        } else {
        	 if(document.listForm.delYn.checked == false) {
                alert("<spring:message code="comCopSecRgm.list.validate.alert.notSelect" />");//선택 항목이 없습니다.
                resultCheck = false;
            }
            else {
                returnId = checkId.value;
                returnAuthor = selectAuthor.value;
                returnRegYn = booleanRegYn.value;
                returnmberTyCode = listMberTyCode.value;

                resultCheck = true;
            }
        }
    } else {
        alert("<spring:message code="comCopSecRgm.list.validate.alert.noResult" />");//조회된 결과가 없습니다.
    }

    document.listForm.userIds.value = returnId;
    document.listForm.authorCodes.value = returnAuthor;
    document.listForm.regYns.value = returnRegYn;
    document.listForm.mberTyCodes.value = returnmberTyCode;
    return resultCheck;
}

function fnSearch(){
	document.searchForm.pageIndex.value = 1;
    document.searchForm.action = "<c:url value='/com/mngr/auth/selectUserAuthorManageList.do'/>";
    document.searchForm.submit();
}

function fncAuthorGroupDeleteList() {

	if(!fncManageChecked()) return;

    if(confirm("<spring:message code="comCopSecRgm.list.validate.confirm.delete" />")) { //삭제하시겠습니까?
        document.listForm.action = "<c:url value='/com/mngr/auth/deleteUserAuthorManage.do'/>";
        document.listForm.submit();
    }
}

function fncAddAuthorGroupInsert() {

	if(!fncManageChecked()) return;

    if(confirm("<spring:message code="comCopSecRgm.list.validate.confirm.regist" />")) {//등록하시겠습니까?

        document.listForm.action = "<c:url value='/com/mngr/auth/insertUserAuthorManage.do'/>";
        document.listForm.submit();
    }
}

function fnLinkPage(pageNo){
    document.listForm.pageIndex.value = pageNo;
    document.listForm.action = "<c:url value='/com/mngr/auth/selectUserAuthorManageList.do'/>";
    document.listForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>	

				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용자권한</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용자권한을 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">사용자수 : <strong><c:out value="${paginationInfo.totalRecordCount}"/></strong></div>
								<div class="d-flex">
									<!-- 검색키워드 및 조회버튼 -->
									<form:form name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<input type="hidden" name="pageIndex">
									<div class="desc">
										<select class="form-select" name="searchCondition" title="<spring:message code="title.searchCondition" /> <spring:message code="input.cSelect" />">
											<option value="1" <c:if test="${authorGroupVO.searchCondition == '1'}">selected</c:if> ><spring:message code="comCopSecRgm.searchCondition.userNm" /></option><!-- 사용자 명 -->
											<option value="2" <c:if test="${authorGroupVO.searchCondition == '2'}">selected</c:if> ><spring:message code="comCopSecRgm.searchCondition.groupNm" /></option><!-- 그룹 명- -->
											<option value="3" <c:if test="${authorGroupVO.searchCondition == '3'}">selected</c:if> ><spring:message code="comCopSecRgm.searchCondition.orgnztNm" /></option><!-- 조직 명 -->
										</select>
										<input type="text" name="searchKeyword" class="form-control" title="검색어 입력" maxlength="155" value="<c:out value="${authorGroupVO.searchKeyword}"/>">
										<button type="submit" class="btn type05 bi-srch"><spring:message code="button.inquire" /></button> <!-- 조회 -->
										<button type="button" class="btn basic" onclick="fncAuthorGroupDeleteList();"><spring:message code="title.delete" /></button> <!-- 삭제 -->
										<button type="button" class="btn type01" onclick="fncAddAuthorGroupInsert();"><spring:message code="button.create" /></button> <!-- 등록 -->
									</div>
									</form:form>
								</div>
							</div>

							<form:form name="listForm" action="/com/mngr/auth/selectUserAuthorManageList.do" method="post">
							<input type="hidden" name="userId"/>
							<input type="hidden" name="userIds"/>
							<input type="hidden" name="authorCodes"/>
							<input type="hidden" name="regYns"/>
							<input type="hidden" name="mberTyCodes"/>
							<input type="hidden" name="searchCondition" value="<c:out value='${authorGroupVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${authorGroupVO.searchKeyword}'/>"/>
							<input type="hidden" name="pageIndex" value="<c:out value='${authorGroupVO.pageIndex}'/>"/>
							
							<div class="bbs-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 5%;">
										<col style="width: 10%;">
										<col style="width: 10%;">
										<col style="width: 20%;">
										<col style="width: 20%;">
										<col style="width: 20%;">
										<col style="width: 10%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">
												<span class="form-checkbox"><span><input type="checkbox" name="checkAll" id="checkAll" onclick="javascript:fncCheckAll()"><label for="checkAll"></label></span></span>
											</th>
											<th scope="col"><spring:message code="comCopSecRgm.list.userId" /></th><!-- 사용자 ID -->
											<th scope="col"><spring:message code="comCopSecRgm.list.userNm" /></th><!-- 사용자 명 -->
											<th scope="col"><spring:message code="comCopSecRgm.list.groupNm" /></th><!-- 그룹 명 -->
											<th scope="col"><spring:message code="comCopSecRgm.list.orgnztNm" /></th><!-- 조직 명 -->
											<th scope="col"><spring:message code="comCopSecRgm.list.author" /></th><!-- 권한 -->
											<th scope="col"><spring:message code="comCopSecRgm.list.regYn" /></th><!--등록 여부 -->
										</tr>
									</thead>
									<tbody>
									<!-- 결과 없을 때 -->
									<c:if test="${fn:length(resultList) == 0}">
									<tr>
										<td colspan="7"><spring:message code="common.nodata.msg" /></td>
									</tr>
									</c:if>
									<c:forEach var="result" items="${resultList}" varStatus="status">
									<input type="hidden" name="mberTyCode" value="<c:out value='${result.mberTyCode}'/>"/>
									<tr>
<%-- 										<td><input type="checkbox" name="delYn" class="check2" title="선택"><input type="hidden" name="checkId" value="<c:out value="${result.uniqId}"/>"/></td> --%>
										<td><span class="form-checkbox">
											<input type="checkbox" name="delYn" id="rChk1_<c:out value="${result.uniqId}" />" value="<c:out value="${result.uniqId}" />">
											<label for="rChk1_<c:out value="${result.uniqId}" />"></label></span>
											<input type="hidden" name="checkId" value="<c:out value="${result.uniqId}"/>" />
										</td>
										<td><c:out value="${result.userId}"/></td>
										<td><c:out value="${result.userNm}"/></td>
										<td><c:out value="${result.groupNm}"/></td>
										<td><c:out value="${result.orgnztNm}"/></td>
										<td><select name="authorManageCombo" title="<spring:message code="comCopSecRgm.list.authorManageCombo" />"> <!-- 권한선택 -->
											<c:forEach var="authorManage" items="${authorManageList}" varStatus="status">
											<option value="<c:out value="${authorManage.authorCode}"/>" <c:if test="${authorManage.authorCode == result.authorCode}">selected</c:if> ><c:out value="${authorManage.authorNm}"/></option>
											</c:forEach>
											</select></td>
										<td><c:out value="${result.regYn}"/><input type="hidden" name="regYn" value="<c:out value="${result.regYn}"/>"></td>
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
