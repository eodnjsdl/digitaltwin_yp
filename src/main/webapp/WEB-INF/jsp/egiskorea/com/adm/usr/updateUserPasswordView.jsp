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
<validator:javascript formName="passwordChgVO" staticJavascript="false" xhtml="true" cdata="false"/>
<script type="text/javaScript" language="javascript" defer="defer">

function fnUpdate(form){
    if(validatePasswordChgVO(form)){
        if(form.newPassword.value != form.newPassword2.value){
            alert("<spring:message code="fail.user.passwordUpdate2" />");
            return false;
        }
        form.submit();
        return  true;
    }else{
    	return false;
    }
}

function fnCancel(form){
	if(confirm("작성중인 내용을 취소하시겠습니까?")){
		form.reset();
	}
}
<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>

				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용자정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용자 패스워드를 변경하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<form name="passwordChgVO" method="post" action="/com/mngr/usr/updateUserPassword.do">
								<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
								<input name="checkedIdForDel" type="hidden" />
								<!-- 검색조건 유지 -->
								<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
								<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
								<input type="hidden" name="sbscrbSttus" value="<c:out value='${userSearchVO.sbscrbSttus}'/>"/>
								<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
							
							<div class="bbs-write-default">
								<table class="bbs-write" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
								<caption>${pageTitle} <spring:message code="title.create" /></caption>
								<colgroup>
									<col style="width: 16%;"><col style="width: ;">
								</colgroup>
								<tbody>
									<!-- 입력 -->
									<c:set var="inputTxt"><spring:message code="input.input" /></c:set>
									<!-- 일반회원아이디 -->
									<c:set var="title"><spring:message code="comUssUmt.userManagePasswordUpdt.id" /></c:set>
									<tr>
										<th>${title}</th>
										<td class="left">
											<c:out value="${userManageVO.emplyrId}" />
											<input class="form-control" name="emplyrId" id="emplyrId" title="사용자아이디" type="hidden" size="20" value="<c:out value='${userManageVO.emplyrId}'/>"  maxlength="20" readonly/>
											<input class="form-control" name="uniqId" id="uniqId" title="uniqId" type="hidden" size="20" value="<c:out value='${userManageVO.uniqId}'/>"/>
											<input class="form-control" name="userTy" id="userTy" title="userTy" type="hidden" size="20" value="<c:out value='${userManageVO.userTy}'/>"/>
										</td>
									</tr>
									
									<!-- 기존 비밀번호 -->
									<c:set var="title"><spring:message code="comUssUmt.userManagePasswordUpdt.oldPass" /></c:set>
									<tr>
										<th>${title}<span class="essential">*</span></th>
										<td class="left">
											<input class="form-control" name="oldPassword" id="oldPassword" type="password" size="20" value=""  maxlength="100" >
										</td>
									</tr>
									<!-- 비밀번호 -->
									<c:set var="title"><spring:message code="comUssUmt.userManagePasswordUpdt.pass" /></c:set>
									<tr>
										<th>${title}<span class="essential">*</span></th>
										<td class="left">
											<div>
											    <input class="form-control" name="newPassword" id="newPassword" type="password" size="20" value=""  maxlength="100" >
											</div>
											<div>
												<div><spring:message code="info.password.rule.password1" /></div>
												<div><spring:message code="info.password.rule.pwdcheckcomb4" /></div>
												<div><spring:message code="info.password.rule.password2" /></div> 
												<div><spring:message code="info.password.rule.pwdcheckrepeat" /></div> 
											</div>
										</td>
									</tr>
									<!-- 비밀번호확인 -->
									<c:set var="title"><spring:message code="comUssUmt.userManagePasswordUpdt.passConfirm" /></c:set>
									<tr>
										<th>${title}<span class="essential">*</span></th>
										<td class="left">
										    <input class="form-control" name="newPassword2" id="newPassword2" type="password" size="20" value=""  maxlength="100" >
										</td>
									</tr>
								</tbody>
								</table>
							</div>
							
							<!-- 하단 버튼 -->
							<div class="btn-wrap justify-content-between">
								<div><a href="/com/mngr/usr/selectUserManageList.do" class="btn basic">목록</a></div>
								<div>
									<button type="button" class="btn type03" onclick="fnUpdate(this.form)"><spring:message code="button.update" /></button> <!-- 수정 -->
									<button type="button" class="btn type07" onClick="fnCancel(this.form)"><spring:message code="button.reset" /></button> <!-- 취소 -->
								</div>
							</div>
							</form>
						</div>
					</div>

				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->
