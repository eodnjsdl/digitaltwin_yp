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

<script src='//cdnjs.cloudflare.com/ajax/libs/jquery-chained/1.0.1/jquery.chained.min.js'></script>

<script type="text/javaScript" language="javascript">

$(document).ready(function(){
	$("#groupId option:eq(0)").prop("selected", true); // 그룹명 '그룹 선택'으로 고정 시킴.
	
	var offmTelno = $('#offmTelno').val();
	var offmTelnoList = offmTelno.split("-");
	
	var moblphonNo = $('#moblphonNo').val();
	var moblphonNoList = moblphonNo.split("-");
	
	$('#fOffmTelno').val(offmTelnoList[0])
	$('#mOffmTelno').val(offmTelnoList[1])
	$('#bOffmTelno').val(offmTelnoList[2])
	
	$('#fMoblphonNo').val(moblphonNoList[0])
	$('#mMoblphonNo').val(moblphonNoList[1])
	$('#bMoblphonNo').val(moblphonNoList[2])
});

function fnSubCombobox() {
	$.ajax({
		type : "POST",
		url : "/com/mngr/usr/selectGroupDeptAjaxList.do",
		data : {
			"groupId" : $("#groupId option:selected").val()
		},
		dataType : "html",
		success : function(returnData, status){
			if(status == "success") {
				$("#orgnztId").html(returnData);
				
			}else{ 
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
		}
	});	
}

function fnUpdate(form){
	
	$('#offmTelno').val($('#fOffmTelno').val() + '-' + $('#mOffmTelno').val() + '-' + $('#bOffmTelno').val())  
	$('#moblphonNo').val($('#fMoblphonNo').val() + '-' + $('#mMoblphonNo').val() + '-' + $('#bMoblphonNo').val())
	
  	if(validateUserManageVO(form)){
		if(confirm("<spring:message code="common.update.msg" />")){
			form.submit();
			return true;
		}
    } else {
    	return false;
    } 
    
}

function fnPasswordMove(){
	document.userManageVO.action = "<c:url value='/com/mngr/usr/updateUserPasswordView.do'/>";
    document.userManageVO.submit();
}


function fnLockIncorrect(){
	if(confirm("<spring:message code="comUssUmt.common.lockAtConfirm" />")){
		var form = $("form[name=userManageVO]")[0];
		var formData = new FormData(form);
		
		$.ajax({
			url: "/com/mngr/usr/updateUserLockIncorrect.do",
			data : formData,
			type : "post",
			contentType : false,
			processData: false,
			dataType : "json",
			success : function(data) {
				if(data.resultMsg == "success") {
					alert("로그인 인증제한 해제에 성공했습니다.");
				}else{
					alert("로그인 인증제한 해제에 실패했습니다.");
				}
			}
		});
	}
}

function fnPasswordReset(){
	var form = $("form[name=userManageVO]")[0];
	var formData = new FormData(form);
	
	$.ajax({
		url: "/com/mngr/usr/userPasswordReset.do",
		data : formData,
		type : "post",
		contentType : false,
		processData: false,
		dataType : "json",
		success : function(data) {
			if(data.resultMsg == "success") {
				alert("비밀번호 초기화에 성공했습니다.");
			}else{
				alert("비밀번호 초기화에 실패했습니다.");
			}
		}
	});
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>
				
				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용자정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용자정보를 수정하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
							<form:form commandName="userManageVO" action="/com/mngr/usr/updateUserManage.do" name="userManageVO" method="post">
							<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
							<input type="hidden" name="checkedIdForDel" />
							<!-- 검색조건 유지 -->
							<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
							<input type="hidden" name="sbscrbSttus" value="<c:out value='${userSearchVO.sbscrbSttus}'/>"/>
							<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
							<!-- 사용자유형정보 : password 수정화면으로 이동시 타겟 유형정보 확인용, 만약검색조건으로 유형이 포함될경우 혼란을 피하기위해 userTy명칭을 쓰지 않음-->
							<input type="hidden" name="userTyForPassword" value="<c:out value='${userManageVO.userTy}'/>" />
							<!-- 수정 -->
							<!-- for validation -->
 							<form:hidden path="emplyrId" value="${userManageVO.emplyrId}"/>
							<div><form:errors path="emplyrId" cssClass="error" /></div>
							<form:hidden path="uniqId" value="${userManageVO.uniqId}"/>
							<div><form:errors path="uniqId" cssClass="error" /></div>
							<form:hidden path="groupId" value="${userManageVO.groupId}"/>
							<div><form:errors path="groupId" cssClass="error" /></div>
							<form:hidden path="offmTelno" id="offmTelno"/>
							<form:hidden path="moblphonNo" id="moblphonNo"/>
							<input type="hidden" name="password" id="password" value="ex~Test#$12"/>
							<!-- + 상세정보 사용자 수정시 prameter 전달용 input -->
							<input type="hidden" name="selectedId" value="<c:out value='${userManageVO.emplyrId}'/>"/>
							
							<div class="bbs-write-default">
								<table class="bbs-write">
									<colgroup>
										<col style="width: 15%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<!-- 그룹명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.userManageRegist.groupNm"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.groupNm}'/></td>
										</tr>
										<!-- 조직명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.orgnztNm"/> <span class="essential">*</span></th>
											<td>
	 											<form:select path="orgnztId" cssClass="form-select">
	 												<form:options items="${orgnztId_result}" itemValue="orgnztId" itemLabel="orgnztNm"/>
							                    </form:select>
							                    <div><form:errors path="orgnztId" cssClass="error"/></div>
											</td>
										</tr>
										<!-- 회원 아이디 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.id"/> <span class="essential">*</span></th>
											<td><c:out value='${userManageVO.emplyrId}'/></td>
										</tr>
										<!-- 회원이름 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.name"/> <span class="essential">*</span></th>
											<td><form:input path="emplyrNm" id="emplyrNm" cssClass="form-control" size="20" maxlength="15" /></td>
										</tr>
										<!-- 사무실번호 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.offmTelno"/> <span class=""></span></th>
											<td>
												<input type="text" id="fOffmTelno" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="mOffmTelno" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="bOffmTelno" class="form-control w-5p" maxlength="4">
											</td>
										</tr>
										<!-- 핸드폰번호 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.phone"/></th>
											<td>
												<input type="text" id="fMoblphonNo" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="mMoblphonNo" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="bMoblphonNo" class="form-control w-5p" maxlength="4">
											</td>
										</tr>
										<!-- 이메일주소 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.emailAdres"/> <span class="essential">*</span></th>
											<td><form:input path="emailAdres" id="emailAdres" cssClass="form-control" size="30" maxlength="50" /></td>
										</tr>
										<!-- 사용자 상태 -->
										<tr>
											<th><spring:message code="comUssUmt.deptUserManageRegist.status"/> <span class="essential">*</span></th>
											<td>
							                    <form:select path="emplyrSttusCode" id="emplyrSttusCode" cssClass="form-select">
							                        <form:option value="" label="상태 선택"/>
							                        <form:options items="${emplyrSttusCode_result}" itemValue="code" itemLabel="codeNm"/>
							                    </form:select>
							                    <div><form:errors path="emplyrSttusCode" cssClass="error"/></div>
											</td>
										</tr>
										<!-- 직위 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.ofcps"/></th>
											<td><form:input path="ofcpsNm" id="ofcpsNm" cssClass="form-control" size="20" maxlength="50" /></td>
										</tr>
										<!-- 로그인인증제한여부 -->
										<c:set var="title"><spring:message code="comUssUmt.common.lockAt"/></c:set>
										<tr>
											<th><label for="lockAt">${title}</label></th>
											<td class="left">
											<c:if test="${userManageVO.lockAt eq 'Y'}">예</c:if>
											<c:if test="${userManageVO.lockAt == null || userManageVO.lockAt eq '' || userManageVO.lockAt eq 'N'}">아니오</c:if>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							
							<div class="btn-wrap justify-content-between">
								<div>
									<button type="button" class="btn type04" onclick="fnPasswordMove(); return false;"><spring:message code="comUssUmt.userManageModifyBtn.passwordChange" /></button> <!-- 비밀번호 변경 -->
									<button type="button" class="btn type06" onclick="fnLockIncorrect(); return false;" ><spring:message code="comUssUmt.common.lockAtBtn" /></button> <!-- 로그인인증제한해제 -->
									<button type="button" class="btn type02" onclick="fnPasswordReset(); return false;" >비밀번호 초기화</button> <!-- 비밀번호 초기화 -->
								</div> <!-- 목록 -->
								<div>
									<button type="button" class="btn type07" onclick="history.back();"><spring:message code="button.reset" /></button>
									<button type="button" class="btn type03" onclick="fnUpdate(this.form);"><spring:message code="button.update" /></button> <!-- 수정 -->
								</div>
							</div>
							</form:form>
						</div>
					</div>

				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->