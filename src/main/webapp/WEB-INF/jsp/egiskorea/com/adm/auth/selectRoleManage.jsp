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

function fncRoleDelete() {
    var varFrom = document.getElementById("frmIdDelete");
    varFrom.action = "<c:url value='/com/mngr/auth/deleteRoleManage.do'/>";
    if(confirm("<spring:message code="common.delete.msg" />")){	//삭제하시겠습니까?
        varFrom.submit();
    }else{
    	return false;
    }
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/auth/selectRoleManageList.do' />";
	document.goListForm.submit();
}

function fnGoUpdate(roleCode) {
	document.goUpdateForm.roleCode.value = roleCode;
  	document.goUpdateForm.action = "<c:url value='/com/mngr/auth/updateRoleManageView.do'/>";
  	document.goUpdateForm.submit();
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>		
				
				<!-- content -->
				<section id="content">
					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">기능정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">기능정보를 조회하는 페이지입니다.</p>
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
										<!-- 롤 명 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollNm" /></th>
											<td><c:out value='${roleManage.roleNm}'/></td>
										</tr>
										<!-- 롤 패턴 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollPtn" /></th>
											<td><c:out value='${roleManage.rolePtn}'/></td>
										</tr>
										<!-- 롤 설명 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollDc" /></th>
											<td><c:out value='${roleManage.roleDc}'/></td>
										</tr>
										<!-- 롤 패턴 -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollType" /></th>
											<td><c:out value='${roleManage.roleTyp}'/></td>
										</tr>
										<!-- 롤 Sort -->
										<tr>
											<th scope="row"><spring:message code="comCopSecRam.regist.rollSort" /></th>
											<td><c:out value='${roleManage.roleSort}'/></td>
									</tbody>
								</table>
							</div>

							<!-- 하단 버튼  -->
							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${roleManageVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								</div>
								<div>
									<button type="button" class="btn type02" onclick="fnGoUpdate('<c:out value='${roleManage.roleCode}'/>')"><spring:message code="button.update" /></button>
									<button type="button" class="btn basic" onclick="fncRoleDelete();"><spring:message code="button.delete" /></button>
								</div>
							</div>

						</div>
					</div>
					
					<form:form name="goListForm" method="post">
					<input type="hidden" name="roleCode" value="<c:out value='${roleManage.roleCode}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${roleManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${roleManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${roleManageVO.pageIndex}'/>"/>
					</form:form>
					
					<form:form name="goUpdateForm" method="post">
					<input type="hidden" name="roleCode" value="<c:out value='${roleManage.roleCode}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${roleManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${roleManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${roleManageVO.pageIndex}'/>"/>
					</form:form>
					
					<form id="frmIdDelete" name="frmDelete" method="post">
					<input type="hidden" name="roleCode" value="<c:out value='${roleManage.roleCode}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${roleManageVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${roleManageVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${roleManageVO.pageIndex}'/>"/>
					</form>
				</section>
				<!-- //content -->
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->