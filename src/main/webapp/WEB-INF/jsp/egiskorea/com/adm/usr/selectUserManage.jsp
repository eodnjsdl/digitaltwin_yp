<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->
				
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="userManageVO" staticJavascript="false" xhtml="true" cdata="false"/>


<script type="text/javaScript" language="javascript">

function fnDeleteUser(checkedIds) {
	if(confirm("<spring:message code="common.delete.msg" />")){
	    document.userManageVO.checkedIdForDel.value=checkedIds;
	    document.userManageVO.action = "<c:url value='/com/mngr/usr/deleteUserManage.do'/>";
	    document.userManageVO.submit();
	}
}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/usr/selectUserManageList.do' />";
	document.goListForm.submit();
}

function fnGoUpdate(emplyrId) {
	document.goUpdateForm.selectedId.value = emplyrId;
  	document.goUpdateForm.action = "<c:url value='/com/mngr/usr/updateUserManageView.do'/>";
  	document.goUpdateForm.submit();
}


<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>
				
				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용자정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용자정보를 조회하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
						
							<form:form commandName="userManageVO" action="/com/mngr/usr/updateUserManage.do" name="userManageVO" method="post">
							
							<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
							<input name="checkedIdForDel" type="hidden" />
							<!-- 검색조건 유지 -->
							<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
							<div class="bbs-write-default">
								<table class="bbs-write">
									<colgroup>
										<col style="width: 15%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<!-- 입력/선택 -->
										<c:set var="inputTxt"><spring:message code="input.input" /></c:set>
										<c:set var="inputSelect"><spring:message code="input.cSelect" /></c:set>
										<c:set var="inputSelect"><spring:message code="input.select"/></c:set>
									
										<!-- 그룹명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.userManageRegist.groupNm"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.groupNm}'/></td>
										</tr>
										<!-- 조직명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.orgnztNm"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.orgnztNm}'/></td>
										</tr>
										<!-- 회원 아이디 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.id"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.emplyrId}'/></td>
										</tr>
										<!-- 회원이름 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.name"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.emplyrNm}'/></td>
										</tr>
										<!--  소속기관명 -->
										<!-- <c:set var="title"><spring:message code="comUssUmt.deptUserManageRegist.insttNm"/></c:set>
										<tr>
											<th scope="row"><label for="insttCode">${title}</label> <span class="essential">*</span></th>
											<td class="left">
							                    <form:select path="insttCode" id="insttCode" title="${title} ${inputSelect}" cssClass="form-select">
							                       <form:option value="" label="${inputSelect}"/>
							                       <form:options items="${insttCode_result}" itemValue="code" itemLabel="codeNm"/>
							                    </form:select>
							                    <div><form:errors path="insttCode" cssClass="error"/></div>
											</td>
										</tr> -->
										<!-- 사무실번호 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.offmTelno"/> <span class=""></span></th>
											<td><c:out value='${userManageVO.offmTelno}'/></td>
										</tr>
										<!-- 핸드폰번호 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.phone"/></span></th>
											<td><c:out value='${userManageVO.moblphonNo}'/></td>
										</tr>
										<!-- 이메일주소 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.emailAdres"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.emailAdres}'/></td>
										</tr>
										<!-- 직위 -->
										<tr>
											<th><spring:message code="comUssUmt.deptUserManageRegist.ofcps"/></th>
											<td><c:out value='${userManageVO.ofcpsNm}'/></td>
										</tr>
										<!-- 사용자 상태 -->
										<tr>
											<th><spring:message code="comUssUmt.deptUserManageRegist.statusNm"/></th>
											<td><c:out value='${userManageVO.emplyrSttusNm}'/></td>
										</tr>
										<!-- 잠김여부 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.common.lockAt"/></th>
											<td>
											<c:if test="${userManageVO.lockAt eq 'Y'}">예</c:if>
											<c:if test="${userManageVO.lockAt == null || userManageVO.lockAt eq '' || userManageVO.lockAt eq 'N'}">아니오</c:if>
											</td>
										</tr>
										<!-- 잠금횟수 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.common.lockAtCnt"/></th>
											<c:if test="${userManageVO.lockCnt == null || userManageVO.lockCnt eq ''}"><td>0</td></c:if>
											<c:if test="${userManageVO.lockCnt != null && userManageVO.lockCnt ne ''}"><td><c:out value='${userManageVO.lockCnt}'/></td></c:if>
										</tr>
										<!-- 등록일자 -->
										<tr>
											<th scope="row"><spring:message code="table.regdate" /></th>
											<td><c:out value='${fn:substring(userManageVO.sbscrbDe,0,10)}'/></td>
										</tr>
							
									</tbody>
								</table>
							</div>
							
							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${userSearchVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								</div> <!-- 목록 -->
								<div>
									<button type="button" class="btn type02" onclick="fnGoUpdate('<c:out value='${userManageVO.emplyrId}'/>')"><spring:message code="button.update" /></button>
									<button type="button" class="btn basic" onclick="fnDeleteUser('<c:out value='${userManageVO.emplyrId}'/>'); return false;"><spring:message code="button.delete" /></button> <!-- 삭제 -->
								</div>
							</div>
							</form:form>
						</div>
					</div>

					<form:form name="goListForm" method="post">
					<input type="hidden" name="selectedId" value="<c:out value='${userManage.emplyrId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
					</form:form>
					
					<form:form name="goUpdateForm" method="post">
					<input type="hidden" name="selectedId" value="<c:out value='${userManage.emplyrId}'/>"/>
					<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
					</form:form>
					
				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->