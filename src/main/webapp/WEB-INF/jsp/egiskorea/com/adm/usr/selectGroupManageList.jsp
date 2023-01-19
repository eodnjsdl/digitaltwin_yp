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
                alert("<spring:message code="comCopSecGmt.validate.groupSelect" />");//선택된 그룹이 없습니다.
                returnBoolean = false;
            }
        } else {
        	 if(document.listForm.delYn.checked == false) {
                alert("<spring:message code="comCopSecGmt.validate.groupSelect" />");//선택된 그룹이 없습니다.
                returnBoolean = false;
            }
            else {
                returnValue = checkId.value;
                returnBoolean = true;
            }
        }
    } else {
        alert("<spring:message code="comCopSecGmt.validate.groupSelectResult" />");//조회된 결과가 없습니다.
    }

    document.listForm.groupIds.value = returnValue;

    return returnBoolean;
}

function fncSelDeleteList() {

    if(fncManageChecked()) {
    	if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
            document.listForm.action = "<c:url value='/com/mngr/usr/deleteGroupManageList.do'/>";
            document.listForm.submit();
        }
    }
}

function fnInquireGroupManage(groupId) {
	document.listForm.groupId.value = groupId;
  	document.listForm.action = "<c:url value='/com/mngr/usr/selectGroupManage.do'/>";
  	document.listForm.submit();
}

function fnSearch(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.pageIndex.value = 1;
	document.searchForm.action = "/com/mngr/usr/selectGroupManageList.do";
	document.searchForm.submit();
}

function fnGoInsert(){
	document.searchForm.searchCondition.value = 1;
	document.searchForm.action = "/com/mngr/usr/insertGroupManageView.do";
	document.searchForm.submit();
}

function fnLinkPage(pageNo){
    document.listForm.pageIndex.value = pageNo;
    document.listForm.action = "<c:url value='/com/mngr/usr/selectGroupManageList.do'/>";
    document.listForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>


				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">그룹정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">그룹정보를 관리하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-top">
								<div class="bbs-list-num">그룹 수 : <strong><c:out value="${resultCnt}" /></strong></div>
								<div class="d-flex">
									<div class="term">그룹명</div>
									<form:form name="searchForm" method="post" onsubmit="fnSearch(); return false;">
									<input type="hidden" name="searchCondition">
									<input type="hidden" name="pageIndex" value="<c:out value='${groupManageVO.pageIndex}'/>">
									<div class="desc">
										<input type="text" class="form-control" name="searchKeyword" maxlength="155"  value="<c:out value="${groupManageVO.searchKeyword}"/>">
										<button type="submit" class="btn type05 bi-srch"><spring:message code="button.inquire" /></button> <!-- 조회 -->
										<button type="button" class="btn basic" onclick="fncSelDeleteList();"><spring:message code="title.delete" /></button> <!-- 삭제 -->
										<button type="button" class="btn type01" onclick="fnGoInsert();"><spring:message code="title.create" /></button> <!-- 등록 -->
									</div>
									</form:form>
								</div>
							</div>

							<form:form name="listForm" action="/com/mngr/usr/selectGroupManageList.do" method="post">
							<input type="hidden" name="groupId"/>
							<input type="hidden" name="groupIds"/>
							<input type="hidden" name="pageIndex" value="<c:out value='${groupManageVO.pageIndex}'/>"/>
							<input type="hidden" name="searchCondition" value="<c:out value='${groupManageVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${groupManageVO.searchKeyword}'/>"/>
							
							<div class="bbs-default">
								<table class="bbs-list">
									<colgroup>
										<col style="width: 5%;">
										<col style="width: 5%;">
										<col style="width: 20%;">
										<col style="width: 15%;">
										<col style="width: 10%;">
									</colgroup>
									<thead>
										<tr>
											<th scope="col">
												<span class="form-checkbox"><span><input type="checkbox" name="checkAll" id="checkAll" onclick="javascript:fncCheckAll()"><label for="checkAll"></label></span></span>
											</th>
											<th scope="col"><spring:message code="table.num" /></th><!-- 번호 -->
											<th scope="col"><spring:message code="comCopSecGmt.list.groupId" /></th> <!-- 그룹 ID  -->
											<th scope="col"><spring:message code="comCopSecGmt.list.groupNm" /></th> <!-- 그룹 명  -->
											<th scope="col"><spring:message code="table.regdate" /></th><!-- 등록일자 -->
										</tr>
									</thead>
									<tbody>
										<!-- 결과 없을 때 -->
										<c:if test="${fn:length(resultList) == 0}">
										<tr>
											<td colspan="5"><spring:message code="common.nodata.msg" /></td>
										</tr>
										</c:if>
										<c:forEach items="${resultList}" var="result" varStatus="status">
										<tr>
											<td><span class="form-checkbox">
												<input type="checkbox" name="delYn" id="rChk1_<c:out value="${result.groupId}" />" value="<c:out value="${result.groupId}" />">
												<label for="rChk1_<c:out value="${result.groupId}" />"></label></span>
												<input type="hidden" name="checkId" value="<c:out value="${result.groupId}"/>" />
											</td>
											<td><c:out value="${(groupManageVO.pageIndex-1) * groupManageVO.pageUnit + status.count}"/></td>
											<td><a href="#" onclick="fnInquireGroupManage('<c:out value='${result.groupId}'/>');"><c:out value="${result.groupId}" /></a></td>
											<td><c:out value="${result.groupNm}" /></td>
											<td><c:out value="${fn:substring(result.groupCreatDe,0,10)}"/></td>
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