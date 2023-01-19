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

<script type="text/javaScript" language="javascript">

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
    var checkRegYn = document.listForm.regYn;
    var returnValue = "";
    var returnRegYns = "";
    var checkedCount = 0;
    var returnBoolean = false;

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked) {
                	checkedCount++;
                    checkField[i].value = checkId[i].value;

	                if(returnValue == "") {
	                    returnValue = checkField[i].value;
	                    returnRegYns = checkRegYn[i].value;
	                }
	                else {
	                    returnValue = returnValue + ";" + checkField[i].value;
	                    returnRegYns = returnRegYns + ";" + checkRegYn[i].value;
	                }
                }
            }

            if(checkedCount > 0)
            	returnBoolean = true;
            else {
                alert("<spring:message code="comCopSecRam.authorRoleList.validate.alert.noSelect" />");//선택된  롤이 없습니다.
                returnBoolean = false;
            }
        } else {
        	 if(document.listForm.checkField.checked == false) {
                alert("<spring:message code="comCopSecRam.authorRoleList.validate.alert.noSelect" />");//선택된 롤이 없습니다.
            	returnBoolean = false;
            }
            else {
            	returnValue = checkId.value;
                returnRegYns = checkRegYn.value;

                returnBoolean = true;
            }
        }
    } else {
        alert("<spring:message code="comCopSecRam.authorRoleList.validate.alert.noResult" />");//조회된 결과가 없습니다.
    }

    document.listForm.roleCodes.value = returnValue;
    document.listForm.regYns.value = returnRegYns;

    return returnBoolean;

}

function fnSearch(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "<c:url value='/com/mngr/auth/selectAuthorRoleManageList.do'/>";
	document.searchForm.submit();
}

function fncSelectAuthorList(){
    // document.listForm.searchCondition.value = "1";
    // document.listForm.pageIndex.value = "1";
    
    //document.listForm.searchKeyword.value = "";
    //document.listForm.action = "<c:url value='/sec/ram/EgovAuthorList.do'/>";
    //document.listForm.submit();
    location.href = "<c:url value='/com/mngr/auth/selectAuthorManageList.do'/>";
}

function fncAddAuthorRoleInsert() {
	if(fncManageChecked()) {
	    if(confirm("<spring:message code="comCopSecRam.authorRoleList.validate.confirm.regist" />")) {//등록하시겠습니까?
            document.listForm.action = "<c:url value='/com/mngr/auth/insertAuthorRoleManage.do'/>";
            document.listForm.submit();
	    }
	} else return;
}


function fnLinkPage(pageNo){
    document.listForm.searchCondition.value = "1";
    document.listForm.pageIndex.value = pageNo;
    document.listForm.action = "<c:url value='/com/mngr/auth/selectAuthorRoleManageList.do'/>";
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
								<div class="bbs-list-num">롤 수 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong></div>
								<div class="d-flex">
									<div class="term">권한코드</div>
									<form:form name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<input type="hidden" name="searchCondition">
									<input type="hidden" name="pageIndex">
									
									<div class="desc">
										<input type="text" class="form-control" name="searchKeyword" value='<c:out value="${searchVO.searchKeyword}"/>' maxlength="155">
										<button type="submit" class="btn type05 bi-srch"><spring:message code="button.inquire" /></button> <!-- 조회 -->
										<button type="button" class="btn basic" onclick="fncSelectAuthorList();"><spring:message code="title.list" /></button> <!-- 목록 -->
										<button type="button" class="btn type01" onclick="fncAddAuthorRoleInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
									</div>
									</form:form>
								</div>
							</div>

							<form:form name="listForm" action="/com/mngr/usr/selectAuthorManageList.do" method="post">
							<input type="hidden" name="roleCodes"/>
							<input type="hidden" name="regYns"/>
							<input type="hidden" name="pageIndex" value="<c:out value='${authorRoleManageVO.pageIndex}'/>"/>
							<input type="hidden" name="authorCode" value="<c:out value="${authorRoleManageVO.searchKeyword}"/>"/>
							<input type="hidden" name="searchCondition">
							<input type="hidden" name="searchKeyword" value="<c:out value="${authorRoleManageVO.searchKeyword}"/>"> 
							
							<div class="bbs-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 5%;">
										<col style="width: 12%;">
										<col style="width: 20%;">
										<col style="width: 12%;">
										<col style="width: ;">
										<col style="width: 10%;">
										<col style="width: 10%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">
												<span class="form-checkbox"><span><input type="checkbox" name="checkAll" id="checkAll" onclick="javascript:fncCheckAll()"><label for="checkAll"></label></span></span>
											</th>
											<th scope="col"><spring:message code="comCopSecRam.authorRoleList.rollId" /></th><!-- 롤 ID -->
											<th scope="col"><spring:message code="comCopSecRam.authorRoleList.rollNm" /></th><!-- 롤 명 -->
											<th scope="col"><spring:message code="comCopSecRam.authorRoleList.rollType" /></th><!-- 롤 타입 -->
											<th scope="col"><spring:message code="comCopSecRam.authorRoleList.rollDc" /></th><!-- 롤 설명 -->
											<th scope="col"><spring:message code="table.regdate" /></th><!--등록일 -->
											<th scope="col"><spring:message code="comCopSecRam.authorRoleList.regYn" /></th><!-- 등록여부 -->
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
												<input type="checkbox" name="checkField" id="rChk1_<c:out value="${result.roleCode}" />" value="<c:out value="${result.roleCode}" />">
												<label for="rChk1_<c:out value="${result.roleCode}" />"></label></span>
												<input type="hidden" name="checkId" value="<c:out value="${result.roleCode}"/>" />
											</td>
											
											<td><c:out value="${result.roleCode}"/></td>
											<td><c:out value="${result.roleNm}"/></td>
											<td><c:out value="${result.roleTyp}"/></td>
											<td><c:out value="${result.roleDc}"/></td>
											<td><c:out value="${fn:substring(result.creatDt,0,10)}"/></td>
											<td>
												<select name="regYn" title="<spring:message code="comCopSecRam.authorRoleList.regYn" />">
												<option value="Y" <c:if test="${result.regYn == 'Y'}">selected</c:if> ><spring:message code="comCopSecRam.authorRoleList.regY" /></option><!-- 등록 -->
												<option value="N" <c:if test="${result.regYn == 'N'}">selected</c:if> ><spring:message code="comCopSecRam.authorRoleList.regN" /></option><!-- 미등록 -->
												</select>
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
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->
