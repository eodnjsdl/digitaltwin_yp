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


<script type="text/javaScript">

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

    document.listForm.orgnztIds.value = returnValue;

    return returnBoolean;
}



function fncSelDeleteList() {

    if(fncManageChecked()) {
    	if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
            document.listForm.action = "/com/mngr/usr/deleteDeptManageList.do";
            document.listForm.submit();
        }
    }
}

function fnInquireDeptManage(orgnztId) {
	document.listForm.orgnztId.value = orgnztId;
  	document.listForm.action = "<c:url value='/com/mngr/usr/selectDeptManage.do'/>";
  	document.listForm.submit();
}

function fnSearch(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "/com/mngr/usr/selectDeptManageList.do";
	document.searchForm.submit();
}

function fnGoInsert(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.action = "/com/mngr/usr/insertDeptManageView.do";
	document.searchForm.submit();
}

function fnLinkPage(pageNo){
    document.listForm.pageIndex.value = pageNo;
    document.listForm.action = "<c:url value='/com/mngr/usr/selectDeptManageList.do'/>";
    document.listForm.submit();
}

function press() {

    if (event.keyCode==13) {
    	fncSelectDeptManageList('1');
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
							<h3 class="page-tit">조직정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">조직정보를 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">부서 수 : <strong><c:out value="${paginationInfo.totalRecordCount}" /></strong></div>
								<div class="d-flex">
									<div class="term">부서명</div>
									<form:form name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<input type="hidden" name="searchCondition">
									<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
									<div class="desc">
										<input type="text" class="form-control" name="searchKeyword" maxlength="155"  value="<c:out value="${deptManageVO.searchKeyword}"/>">
										<button type="submit" class="btn type05 bi-srch"><spring:message code="button.inquire" /></button> <!-- 조회 -->
										<button type="button" class="btn basic" onclick="fncSelDeleteList();"><spring:message code="title.delete" /></button> <!-- 삭제 -->
										<button type="button" class="btn type01" onclick="fnGoInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
									</div>
									</form:form>
								</div>
							</div>

							<form:form name="listForm" action="/com/mngr/usr/selectDeptManageList.do" method="post">
							<input type="hidden" name="orgnztId"/>
							<input type="hidden" name="orgnztIds"/>
							<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
							<input type="hidden" name="searchCondition" value="<c:out value='${deptManageVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${deptManageVO.searchKeyword}'/>"/>
							
							<div class="bbs-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 5%;">
										<col style="width: 5%;">
										<col style="width: 25%;">
										<col style="width: 25%;">
										<col style="width: 30%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">
												<span class="form-checkbox"><span><input type="checkbox" name="checkAll" id="checkAll" onclick="javascript:fncCheckAll()"><label for="checkAll"></label></span></span>
											</th>
											<th><spring:message code="table.num" /></th><!-- 번호 -->
											<th scope="col"><spring:message code="comCopSecGmt.list.groupNm" /></th> <!-- 그룹 명  -->
											<th scope="col"><spring:message code="comUssUmt.deptManageList.deptId" /></th><!-- 부서 ID -->
											<th scope="col"><spring:message code="comUssUmt.deptManageList.deptName" /></th><!-- 부서 명 -->
											<th scope="col"><spring:message code="table.regdate" /></th><!-- 등록일자 -->
										</tr>
									</thead>
									<tbody>
									<c:if test="${fn:length(resultList) == 0}">
									<tr>
										<td colspan="6"><spring:message code="common.nodata.msg" /></td>
									</tr>
									</c:if>
									<c:forEach var="result" items="${resultList}" varStatus="status">
									<tr>
										<td><span class="form-checkbox">
											<input type="checkbox" name="delYn" id="rChk1_<c:out value="${result.orgnztId}" />" value="<c:out value="${result.orgnztId}" />">
											<label for="rChk1_<c:out value="${result.orgnztId}" />"></label></span>
											<input type="hidden" name="checkId" value="<c:out value="${result.orgnztId}"/>" />
										</td>
										<td><c:out value="${(deptManageVO.pageIndex-1) * deptManageVO.pageUnit + status.count}"/></td>
										<td><c:out value="${result.groupNm}" /></td>
										<td><a href="#" onclick="fnInquireDeptManage('<c:out value='${result.orgnztId}'/>');"><c:out value="${result.orgnztId}"/></a></td>
										<td><c:out value="${result.orgnztNm}"/></td>
										<td><c:out value="${fn:substring(result.orgnztCreatDe,0,10)}"/></td>
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
