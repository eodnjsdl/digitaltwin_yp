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

function fncDeptDelete() {
	var varFrom = document.getElementById("frmIdDelete");
    varFrom.action = "<c:url value='/com/mngr/usr/deleteDeptManage.do'/>";
    if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
    	varFrom.submit();
    }else{
    	return false;
    }
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/usr/selectDeptManageList.do' />";
	document.goListForm.submit();
}

function fnGoUpdate(orgnztId) {
	document.goUpdateForm.orgnztId.value = orgnztId;
  	document.goUpdateForm.action = "<c:url value='/com/mngr/usr/updateDeptManageView.do'/>";
  	document.goUpdateForm.submit();
}


<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>
				
				<!-- content -->
				<section id="content">
					<input type="hidden" name="orgnztId" value="<c:out value='${deptManage.orgnztId}'/>"/>
					<input type="hidden" name="orgnztNm" value="<c:out value='${deptManage.orgnztNm}'/>"/>
					<input type="hidden" name="orgnztDc" value="<c:out value='${deptManage.orgnztId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${deptManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${deptManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
					
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">조직정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">조직정보를 조회하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<div class="bbs-write-default">
								<table class="bbs-write">
									<colgroup>
										<col style="width: 15%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row"><spring:message code="comCopSecGmt.list.groupNm" /></th>
											<td><c:out value='${deptManage.groupNm}'/></td>
										</tr>
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptManageRegist.deptId" /></th>
											<td><c:out value='${deptManage.orgnztId}'/></td>
										</tr>
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptManageRegist.deptName" /></th>
											<td><c:out value='${deptManage.orgnztNm}'/></td>
										</tr>
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptManageRegist.deptDc" /></th>
											<td><c:out value='${deptManage.orgnztDc}'/></td>
										</tr>
										<tr>
											<th scope="row"><spring:message code="table.regdate" /></th>
											<td><c:out value='${fn:substring(deptManage.orgnztCreatDe,0,10)}'/></td>
										</tr>		
									</tbody>
								</table>
							</div>
							
							<!-- 하단 버튼  -->
							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${deptManageVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								</div>
								<div>
									<button type="button" class="btn type02" onclick="fnGoUpdate('<c:out value='${deptManage.orgnztId}'/>')"><spring:message code="button.update" /></button>
									<button type="button" class="btn basic" onclick="fncDeptDelete();"><spring:message code="button.delete" /></button>
								</div>
							</div>
						</div>
					</div>
					
					<form:form name="goListForm" method="post">
					<input type="hidden" name="orgnztId" value="<c:out value='${deptManage.orgnztId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${deptManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${deptManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
					</form:form>
					
					<form:form name="goUpdateForm" method="post">
					<input type="hidden" name="orgnztId" value="<c:out value='${deptManage.orgnztId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${deptManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${deptManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
					</form:form>
					
					<form id="frmIdDelete" name="frmDelete" method="post">
					<input type="hidden" name="orgnztId" value="<c:out value='${deptManage.orgnztId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${deptManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${deptManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${deptManageVO.pageIndex}'/>"/>
					</form>
				</section>
				<!-- //content -->
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->