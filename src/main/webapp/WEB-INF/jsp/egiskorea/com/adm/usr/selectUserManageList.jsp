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

function fnDeleteUser() {
    var checkField = document.listForm.checkField;
    var id = document.listForm.checkId;
    var checkedIds = "";
    var checkedCount = 0;
    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i < checkField.length; i++) {
                if(checkField[i].checked) {
                    checkedIds += ((checkedCount==0? "" : ",") + id[i].value);
                    checkedCount++;
                }
            }
        } else {
            if(checkField.checked) {
                checkedIds = id.value;
            }
        }
    }
    if(checkedIds.length > 0) {
        if(confirm("<spring:message code="common.delete.msg" />")){
        	document.listForm.checkedIdForDel.value=checkedIds;
            document.listForm.action = "<c:url value='/com/mngr/usr/deleteUserManage.do'/>";
            document.listForm.submit();
        }
    }
}

function fnGoInsert(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.action = "/com/mngr/usr/insertUserManageView.do";
	document.searchForm.submit();
}

function fnLinkPage(pageNo){
    document.listForm.pageIndex.value = pageNo;
    document.listForm.action = "<c:url value='/com/mngr/usr/selectUserManageList.do'/>";
    document.listForm.submit();
}

function fnInquireUserManage(userId) {
	document.listForm.selectedId.value = userId;
  	document.listForm.action = "<c:url value='/com/mngr/usr/selectUserManage.do'/>";
  	document.listForm.submit();
}

function fnSearch(){
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "<c:url value='/com/mngr/usr/selectUserManageList.do'/>";
	document.searchForm.submit();
}
 
<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>

				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용자정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용자정보를 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">사용자수 : <strong><c:out value="${paginationInfo.totalRecordCount}"/></strong></div>
								<div class="d-flex">
									<form:form name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<input type="hidden" name="pageIndex" value="<c:out value="${userSearchVO.pageIndex}"/>">
									
									<div class="desc">
										<select class="form-select" name="sbscrbSttus" id="sbscrbSttus" title="가입상태조건 선택">
											<option value="0" <c:if test="${empty mberVO.sbscrbSttus || mberVO.sbscrbSttus == '0'}">selected="selected"</c:if> ><spring:message code="comUssUmt.userManageSsearch.sbscrbSttusAll" /></option><!-- 상태(전체) -->
						                    <option value="A" <c:if test="${mberVO.sbscrbSttus == 'A'}">selected="selected"</c:if> ><spring:message code="comUssUmt.userManageSsearch.sbscrbSttusA" /></option><!-- 가입신청 -->
						                    <option value="D" <c:if test="${mberVO.sbscrbSttus == 'D'}">selected="selected"</c:if> ><spring:message code="comUssUmt.userManageSsearch.sbscrbSttusD" /></option><!-- 삭제 -->
						                    <option value="P" <c:if test="${mberVO.sbscrbSttus == 'P'}">selected="selected"</c:if> ><spring:message code="comUssUmt.userManageSsearch.sbscrbSttusP" /></option><!-- 승인 -->
										</select>
										<select class="form-select" name="searchCondition" id="" title="조회조건 선택">
											<option value="0" <c:if test="${userSearchVO.searchCondition == '0'}">selected="selected"</c:if> ><spring:message code="comUssUmt.userManageSsearch.searchConditionId" /></option><!-- ID  -->
                    						<option value="1" <c:if test="${userSearchVO.searchCondition == '1'}"></c:if> ><spring:message code="comUssUmt.userManageSsearch.searchConditionName" /></option><!-- Name -->
										</select>
										<input type="text" id="" name="searchKeyword" class="form-control" value="<c:out value="${userSearchVO.searchKeyword}"/>"><button type="submit" class="btn type05 bi-srch"><spring:message code="button.inquire" /></button> <!-- 조회 -->
										<button type="button" class="btn basic" onclick="fnDeleteUser();"><spring:message code="title.delete" /></button> <!-- 삭제 -->
										<button type="button" class="btn type01" onclick="fnGoInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
									</div>
									</form:form>
								</div>
							</div>

							<form:form name="listForm" action="/com/mngr/usr/selectUserManageList.do" method="post">
							<input type="hidden" name="selectedId" />
							<input type="hidden" name="checkedIdForDel" />
							<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
							<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
							
							<div class="bbs-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 5%;">
										<col style="width: 5%;">
										<col style="width: 20%;">
										<col style="width: 20%;">
										<col style="width: 10%;">
										<col style="width: 10%;">
										<col style="width: 15%;">
										<col style="width: 15%;">
										<col style="width: 15%;">
										<col style="width: 15%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col"><span class="form-checkbox"><input type="checkbox" name="checkAll" id="rChk-all" onclick="javascript:fncCheckAll()"><label for="rChk-all"></label></span></th>
											<th scope="col"><spring:message code="table.num" /></th><!-- 번호 -->
											<th scope="col"><spring:message code="comCopSecGmt.list.groupNm" /></th> <!-- 그룹 명  -->
											<th scope="col"><spring:message code="comUssUmt.deptManageList.deptId" /></th><!-- 부서 ID -->
											<th scope="col"><spring:message code="comUssUmt.userManageList.id" /></th><!-- 아이디 -->
											<th scope="col"><spring:message code="comUssUmt.userManageList.name" /></th><!-- 사용자이름 -->
											<th scope="col"><spring:message code="comUssUmt.userManageList.sbscrbSttus" /></th><!-- 가입상태 -->
											<th scope="col"><spring:message code="comUssUmt.userManageList.phone" /></th><!-- 전화번호 -->
											<th scope="col"><spring:message code="comUssUmt.userManageList.email" /></th><!-- 사용자이메일 -->
											<th scope="col"><spring:message code="table.regdate" /></th><!-- 등록일 -->
										</tr>
									</thead>
									<tbody>
									<!-- 결과 없을 때 -->
									<c:if test="${fn:length(resultList) == 0}">
									<tr>
										<td colspan="10"><spring:message code="common.nodata.msg" /></td>
									</tr>
									</c:if>
									
									<c:forEach var="result" items="${resultList}" varStatus="status">
										<tr>
											<td><span class="form-checkbox">
												<input type="checkbox" name="checkField" id="rChk1_<c:out value="${result.userId}" />" value="<c:out value="${result.userId}" />">
												<label for="rChk1_<c:out value="${result.userId}" />"></label></span>
												<input type="hidden" name="checkId" value="<c:out value='${result.userId}'/>" />
											</td>
											<td><c:out value="${(userSearchVO.pageIndex-1) * userSearchVO.pageUnit + status.count}"/></td>
											<td><c:out value="${result.groupNm}" /></td>
											<td><c:out value="${result.orgnztNm}" /></td>
											<td><a href="#" onclick="fnInquireUserManage('<c:out value='${result.userId}'/>');"><c:out value="${result.userId}"/></a></td>
											<td><c:out value="${result.userNm}" /></td>
											<td><c:out value="${result.codeNm}" /></td>
											<td><c:out value="${result.moblphonNo}" /></td>
											<td><c:out value="${result.emailAdres}" /></td>
											<td><c:out value="${fn:substring(result.sbscrbDe,0,10)}" /></td>
										</tr>
<%-- 										<input type="hidden" value="${result.sttus}" />	 --%>
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