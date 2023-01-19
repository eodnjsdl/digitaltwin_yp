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


<script type="text/javaScript">

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

/*********************************************************
 * 아이디 체크 확인
 ******************************************************** */
function fn_id_checkOk(){
	var checkId = $("#checkIdModal").val();
	var regex = /^[a-z][a-z\d]{3,11}$/;
		
	if(!checkId){
		alert("아이디를 입력하세요");
		return false;
	} else if(!regex.test(checkId)){
		alert("영어소문자 또는 숫자포함 4-12자리로 입력해주세요.");
		$("#emplyrId").val("");
		return false; 
	} else {
		$.ajax({
			type:"POST",
			url:"<c:url value='/com/mngr/usr/idDplctCnfirmAjax.do' />",
			data:{
				"checkId": checkId			
			},
			dataType:'json',
			timeout:(1000*30),
			success:function(returnData, status){
				if(status == "success") {
					if(returnData.usedCnt > 0 ){
						alert("<spring:message code="comUssUmt.userManageRegistModal.noIdMsg" />"); //사용이 불가능한 아이디 입니다.
						return;
					}else{
						alert(checkId +"<spring:message code="comUssUmt.userManageRegistModal.notUseMsg" />"); //사용이 가능한 아이디 입니다.
						$("input[name=emplyrId]").val(returnData.checkId);
						$('.popup-emplyrId').dialog('close');
					}
				}else{ alert("ERROR!");return;} 
			}
		});
	}
}


//엔터이벤트처리
$("input[name=checkIdModal]").keydown(function (key) {
	if(key.keyCode == 13){
		fn_id_checkOk();	
	}
});

function fn_regist(form){
	
	$('#offmTelno').val($('#fOffmTelno').val() + '-' + $('#mOffmTelno').val() + '-' + $('#bOffmTelno').val())  
	$('#moblphonNo').val($('#fMoblphonNo').val() + '-' + $('#mMoblphonNo').val() + '-' + $('#bMoblphonNo').val())  
	
	if(validateUserManageVO(form)){
    	if(form.password.value != form.password2.value){
            alert("<spring:message code="fail.user.passwordUpdate2" />");
            return false;
        }
		if(confirm("<spring:message code="common.regist.msg" />")){
			form.submit();
			return true;
		}
		
    } else {
    	return false;
    }

}

function fnGoList(pageIndex){
	document.goListForm.pageIndex.value = pageIndex;
	document.goListForm.action = "<c:url value='/com/mngr/usr/selectUserManageList.do' />";
	document.goListForm.submit();
}


</script>
				
				<!-- content -->
				<section id="content">

					<div class="row">
						<div class="col-12 page-tit-wrap">
							<h3 class="page-tit">사용자정보</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
							<p class="page-txt">사용자정보를 등록하는 페이지입니다.</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12">
						
							<form:form commandName="userManageVO" action="/com/mngr/usr/insertUserManage.do" name="userManageVO" method="post">
							<!-- for validation -->
							<form:hidden path="emplyrSttusCode" value="P"/>
							<div><form:errors path="emplyrSttusCode" cssClass="error" /></div>
							<!-- 상세정보 사용자 삭제시 prameter 전달용 input -->
							<input name="checkedIdForDel" type="hidden" />
							<form:hidden path="offmTelno" id="offmTelno"/>
							<form:hidden path="moblphonNo" id="moblphonNo"/>
							<!-- 검색조건 유지 -->
							<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
							<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
							<input type="hidden" name="sbscrbSttus" value="<c:out value='${userSearchVO.sbscrbSttus}'/>"/>
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
											<td>
	 											<form:select path="groupId" cssClass="form-select" onchange="fnSubCombobox();">
	 												<form:option value="" label="그룹 선택"/>
						                        	<form:options items="${groupId_result}" itemValue="code" itemLabel="codeNm"/>
							                    </form:select>
							                    <div><form:errors path="groupId" cssClass="error"/></div>
											</td>
										</tr>
										<!-- 조직명 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.orgnztNm"/> <span class="essential">*</span></th>
											<td>
	 											<form:select path="orgnztId" cssClass="form-select">
	 												<form:option value="" label="조직 선택"/>
<%-- 						                        	<form:options items="${orgnztId_result}" itemValue="code" itemLabel="codeNm"/> --%>
							                    </form:select>
							                    <div><form:errors path="orgnztId" cssClass="error"/></div>
											</td>
										</tr>
										<!-- 회원 아이디 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.id"/> <span class="essential">*</span></th>
											<td>
												<form:input path="emplyrId" id="emplyrId" cssClass="form-control" size="20" maxlength="20" readonly="true" />
												<button type="button" class="btn type06" onclick="popup_open('popup-emplyrId');">중복아이디 검색</button>
												<div><form:errors path="emplyrId" cssClass="error" /></div>
											</td>
										</tr>
										<!-- 회원이름 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.name"/> <span class="essential">*</span></th>
											<td><form:input path="emplyrNm" id="emplyrNm" cssClass="form-control" size="20" maxlength="15" /></td>
										</tr>
										<!-- 비밀번호 -->
										<tr>
											<th><spring:message code="comUssUmt.deptUserManageRegist.pass"/> <span class="essential">*</span></th>
											<td class="left">
												<div>
													<form:password path="password" cssClass="form-control" size="50" maxlength="20" />
													<div><form:errors path="password" cssClass="error" /></div> 
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
										<tr>
											<th><spring:message code="comUssUmt.deptUserManageRegist.passConfirm"/> <span class="essential">*</span></th>
											<td class="left">
											<input name="password2" id="password2" type="password" class="form-control" size="50" maxlength="20" />
											</td>
										</tr>
										<!-- 사무실번호 -->
										<c:set var="title"><spring:message code="comUssUmt.deptUserManageRegist.offmTelno"/></c:set>
										<tr>
											<th scope="row"><label for="offmTelno">${title}</label> <span class=""></span></th>
											<td>
												<input type="text" id="fOffmTelno" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="mOffmTelno" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="bOffmTelno" class="form-control w-5p" maxlength="4">
											</td>
										</tr>
										<!-- 핸드폰번호 -->
										<c:set var="title"><spring:message code="comUssUmt.deptUserManageRegist.phone"/></c:set>
										<tr>
											<th scope="row"><label for="moblphonNo">${title}</label> <span class=""></span></th>
											<td>
												<input type="text" id="fMoblphonNo" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="mMoblphonNo" class="form-control w-5p" maxlength="4"> -
												<input type="text" id="bMoblphonNo" class="form-control w-5p" maxlength="4">
											</td>
										</tr>
										<!-- 이메일주소 -->
										<c:set var="title"><spring:message code="comUssUmt.deptUserManageRegist.emailAdres"/></c:set>
										<tr>
											<th scope="row"><label for="emailAdres">${title}</label> <span class="essential">*</span></th>
											<td><form:input path="emailAdres" id="emailAdres" title="" cssClass="form-control" size="30" maxlength="50" /></td>
										</tr>
										<!-- 직위 -->
										<tr>
											<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.ofcps"/></th>
											<td><form:input path="ofcpsNm" id="ofcpsNm" cssClass="form-control" size="20" maxlength="50" /></td>
										</tr>
									</tbody>
								</table>
							</div>
							
							<div class="btn-wrap justify-content-between">
								<button type="button" class="btn basic" onclick="fnGoList(<c:out value='${userSearchVO.pageIndex}'/>);"><spring:message code="button.list" /></button>
								<button type="button" class="btn type01" onclick="fn_regist(this.form);"><spring:message code="button.create" /></button>
							</div>
							
							</form:form>
						</div>
					</div>

					<form:form name="goListForm" method="post">
					<input type="hidden" name="searchCondition" value="<c:out value='${userSearchVO.searchCondition}'/>"/>
					<input type="hidden" name="searchKeyword" value="<c:out value='${userSearchVO.searchKeyword}'/>"/>
					<input type="hidden" name="pageIndex" value="<c:out value='${userSearchVO.pageIndex}'/>"/>
					</form:form>
					

					<!-- popup-emplyrId -->
					<div class="popup-panel popup-emplyrId" title="아이디 중복 확인">
						<div class="bbs-write-default">
							<table class="bbs-write">
								<colgroup>
									<col style="width: 35%;">
									<col style="width: auto;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">사용할아이디</th>
										<td><input type='text' class="form-control" id='checkIdModal' name='checkIdModal' value='' size='20' maxlength='20' /></td>
									</tr>
									<tr>
										<td colspan="2" class="text-center">중복확인을 실행하십시오.</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="btn-wrap justify-content-center">
							<div>
								<button type="button" class="btn type03" onclick="fn_id_checkOk()">확인</button>
								<button type="button" class="btn type07" onclick="">취소</button>
							</div>
						</div>

					</div>
					<!-- //popup-emplyrId -->					


				</section>
				<!-- //content -->
				
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->