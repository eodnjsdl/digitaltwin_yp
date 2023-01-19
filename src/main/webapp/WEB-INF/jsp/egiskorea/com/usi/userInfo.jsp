<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
				
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>

<validator:javascript formName="userManageVO" staticJavascript="false" xhtml="true" cdata="false"/>
<%-- <validator:javascript formName="passwordChgVO" staticJavascript="false" xhtml="true" cdata="false"/> --%>

<script type="text/javaScript">

$(document).ready(function(){
	
	/* 대표 전화번호 자르기(회사번호) 및 input 값 넣기 */
	var offTelNo = "${userManageVO.offmTelno}";
	var splitOffTelNo = offTelNo.split("-");
	var offAreaNo = splitOffTelNo[0];
	var offMidNo = splitOffTelNo[1];
	var offEndNo = splitOffTelNo[2];
	
	$("#offAreaNo").val(offAreaNo);
	$("#offMidNo").val(offMidNo);
	$("#offEndNo").val(offEndNo);
	
	
	
	/* 휴대폰 번호 자르기  및 input 값 넣기*/
	var phoneNo = "${userManageVO.moblphonNo}"
	var splitPhoneNo = phoneNo.split("-");
	var phoneAreaNo = splitPhoneNo[0];
	var phoneMidNo = splitPhoneNo[1];
	var phoneEndNo = splitPhoneNo[2];
	
	$("#phoneAreaNo").val(phoneAreaNo);
	$("#phoneMidNo").val(phoneMidNo);
	$("#phoneEndNo").val(phoneEndNo);
	
	
	
	/* 이메일 자르기 */
	var email = "${userManageVO.emailAdres}";
	var splitEmailAddress = email.split("@");
	var emailId =  splitEmailAddress[0];
	var emailAddress=  splitEmailAddress[1];
	
	$("#emailId").val(emailId);
	$("#emailAddress").val(emailAddress);
	
	
	
	/*이메일 주소 selectbox 선택 시 */
	$("#selEmailAddress").change(function(){
		$("#emailAddress").val($(this).val());
		
	});
});

function onChangeDept(){
	alert("부서 변경 시 관리자에게 권한을 다시 부여받아야합니다.");
}


function aj_updateUser(){
	var form = $("form[name=userManageVO]")[0];
	var formData = new FormData(form);
	$.ajax({
		type : "POST",
		url : "/com/usi/updateUserInfo.do",
		data : formData,
		dataType : "html",
		async: false,
		processData: false,
		contentType: false,
		cache: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#userInfo").html(returnData);
			}else{ 
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
		}
	});
}

function fnUserUpdate(form){
	
	var offAreaNo = $("#offAreaNo").val();
	var offMidNo = $("#offMidNo").val();
	var offEndNo = $("#offEndNo").val();
	
	var phoneAreaNo = $("#phoneAreaNo").val();
	var phoneMidNo = $("#phoneMidNo").val();
	var phoneEndNo = $("#phoneEndNo").val();

	var emailId = $("#emailId").val();
	var emailAddress = $("#emailAddress").val();
	
	if((emailId == "") || (emailAddress == "")){
		alert("이메일 정보를 모두 기입해주세요.");
		return false;
	} else {
		$("#emailAdres").val(emailId+'@'+emailAddress);	
	}
		
	$("#offmTelno").val(offAreaNo+'-'+offMidNo+'-'+offEndNo);
	$("#moblphonNo").val(phoneAreaNo+'-'+phoneMidNo+'-'+phoneEndNo);
	
  	if(validateUserManageVO(form)){
  		var id = $("#emplyrId").val();
		if(confirm("<spring:message code="common.update.msg" />")){
			aj_updateUser();
// 			form.submit();
			return true;
		}
    } else {
    	return false;
    } 
    
}


function aj_updateUserPassword(){
	var form = $("form[name=passwordChgVO]")[0];
	console.log(form);
	var formData = new FormData(form);
	$.ajax({
		type : "POST",
		url : "/com/usi/updateUserInfoPassword.do",
		data : formData,
		dataType : "json",
		async: false,
		processData: false,
		contentType: false,
		cache: false,
		success : function(data) {
			alert(data.resultMsg);
		}
	});
}


function fnPasswordUpdate(form){
	 var pw = form.newPassword.value;
	 /* 비밀번호 길이 8~20, 영대문자, 영소문자, 숫자, 특수문자 최소 1개 필수 */
	 var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])[A-Za-z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/;
	 if( !reg.test(pw) ){
		 alert("비밀번호는 8~20자내 영문대문자,영문소문자,숫자,특수문자의 조합으로 이루어 져야 합니다.");
		 return false;
	 }
	 
    if(form.newPassword.value != form.newPassword2.value){
        alert("<spring:message code="fail.user.passwordUpdate2" />");
        return false;
    }
    
	if(confirm("<spring:message code="common.update.msg" />")){
		aj_updateUserPassword();
//			form.submit();
		return true;
	}
}

<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>
</script>


					<div class="popup-header">사용자정보 조회 및 수정</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="tabBoxDepth3-wrap" style="height: 100%;">
								<div class="tabBoxDepth3">
									<ul>
										<li data-tab="userModify01" class="on"><button type="button" class="inner-tab">사용자 정보 조회</button></li>
										<li data-tab="userModify02"><button type="button" class="inner-tab">비밀번호 변경</button></li>
									</ul>
								</div>
								<!-- 사용자 정보 조회 -->
								<div class="tab-cont userModify01 on">
									<form:form commandName="userManageVO" action="/com/usi/updateUserInfo.do" name="userManageVO" method="post">
									<!-- for validation -->
		 							<form:hidden path="emplyrId" value="${userManageVO.emplyrId}"/>
									<div><form:errors path="emplyrId" cssClass="error" /></div>
									<form:hidden path="uniqId" value="${userManageVO.uniqId}"/>
									<div><form:errors path="uniqId" cssClass="error" /></div>
								 	<form:hidden path="emplyrSttusCode" value="${userManageVO.emplyrSttusCode}"/>
								 	<div><form:errors path="emplyrSttusCode" cssClass="error" /></div>
								 	<form:hidden path="groupId" id="groupId" value="${userManageVO.groupId}"/>
								 	<div><form:errors path="groupId" cssClass="error" /></div>
								 	<form:hidden path="ofcpsNm" id="ofcpsNm" value="${userManageVO.ofcpsNm}"/>
								 	<div><form:errors path="ofcpsNm" cssClass="error" /></div>
								 	<form:hidden path="password" value="Tmakxm12!@"/>
								 	<div><form:errors path="password" cssClass="error" /></div>
									
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<!-- 회원 아이디 -->
												<tr>
													<th scope="row"><spring:message code="comUssUmt.deptUserManageRegist.id"/></th>
													<td><c:out value='${userManageVO.emplyrId}'/></td>
												</tr>
												<!-- 회원이름 -->
												<tr>
													<th scope="row"><span class="essential">*</span><spring:message code="comUssUmt.deptUserManageRegist.name"/></th>
													<td><form:input path="emplyrNm" id="emplyrNm" cssClass="form-control w-50p" size="20" maxlength="20" /></td>
												</tr>
												<!-- 기관 -->
												<tr>
													<th scope="row">기관</th>
													<td><c:out value='${userManageVO.groupNm}'/></td>
												</tr>
												
												<!-- 부서명 -->
												<tr>
													<th scope="row"><span class="essential">*</span>부서명</th>
													<td>
			 											<form:select path="orgnztId" cssClass="form-select w-50p" onChange="onChangeDept();">
			 												<form:options items="${orgnztId_result}" itemValue="orgnztId" itemLabel="orgnztNm"/>
									                    </form:select>
									                    <div><form:errors path="orgnztId" cssClass="error"/></div>
													</td>
												</tr>	
												<tr>
													<th scope="row">대표 전화번호</th>
													<td>
														<div class="form-row">
															<div class="col-3">
<!-- 																<select class="form-select">
																	<option value="">02</option>
																</select> -->
																<input type="text" id="offAreaNo" class="form-control">
															</div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" id="offMidNo" class="form-control"></div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" id="offEndNo" class="form-control"></div>
															<form:hidden path="offmTelno" id="offmTelno" cssClass="form-control" size="30" maxlength="50" />
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">휴대폰번호</th>
													<td>
														<div class="form-row">
															<div class="col-3">
<!-- 																<select class="form-select">
																	<option value="">010</option>
																</select> -->
																<input type="text" id="phoneAreaNo" class="form-control">
															</div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" id="phoneMidNo" class="form-control"></div>
															<div class="col-auto">-</div>
															<div class="col-3"><input type="text" id="phoneEndNo" class="form-control"></div>
															<form:hidden path="moblphonNo" id="moblphonNo" cssClass="form-control" size="30" maxlength="50" />
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row"><span class="essential">*</span>이메일</th>
													<td>
														<div class="form-row">
															<div class="col-4"><input type="text" id="emailId" class="form-control"></div>
															<div class="col-auto">@</div>
															<div class="col"><input type="text" id="emailAddress" class="form-control"></div>
															<div class="col-auto">
																<select id="selEmailAddress" class="form-select">
																	<option value="">직접입력</option>
																	<option value="korea.kr">korea.kr</option>
																	<option value="lx.or.kr">lx.or.kr</option>
																	<option value="gmail.com">gmail.com</option>
																	<option value="naver.com">naver.com</option>
																</select>
															</div>
															
														<form:hidden path="emailAdres" id="emailAdres" cssClass="form-control" size="30" maxlength="50" />
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-save" onclick="fnUserUpdate(this.form);">저장</button></div>
									</div>
									</form:form>
								</div>
								<!-- //사용자 정보 조회 -->
			
								<!-- 비밀번호 변경 -->
								<div class="tab-cont userModify02">
									<form:form commandName="passwordChgVO" name="passwordChgVO" method="post" action="/com/usi/updateUserInfoPassword.do">
											<input class="form-control" name="emplyrIdPassChg" id="emplyrIdPassChg" title="사용자아이디" type="hidden" size="20" value="<c:out value='${userManageVO.emplyrId}'/>"  maxlength="20" readonly/>
											<input class="form-control" name="uniqIdPassChg" id="uniqIdPassChg" title="uniqId" type="hidden" size="20" value="<c:out value='${userManageVO.uniqId}'/>"/>
											<input class="form-control" name="userTy" id="userTy" title="userTy" type="hidden" size="20" value="<c:out value='${userManageVO.userTy}'/>"/>
									
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">아이디</th>
													<td><c:out value="${userManageVO.emplyrId}"/></td>
												</tr>
												<tr>
													<th scope="row"><spring:message code="comUssUmt.userManagePasswordUpdt.oldPass" /> <span class="essential">*</span></th>
													<td><input type="password" id="oldPassword" name="oldPassword" class="form-control w-50p" autocomplete="off" /></td>
												</tr>
												<tr>
													<th scope="row"><spring:message code="comUssUmt.userManagePasswordUpdt.pass" /> <span class="essential">*</span></th>
													<td>
														<div class="form-row">
															<div class="col-6"><input type="password" id="newPassword" name="newPassword" class="form-control" autocomplete="off" /></div>
														</div>
														<div class="fs11 essential"><spring:message code="info.password.rule.password1" /></div>
														<div class="fs11 essential"><spring:message code="info.password.rule.pwdcheckcomb4" /></div>
														<div class="fs11 essential"><spring:message code="info.password.rule.password2" /></div> 
														<div class="fs11 essential"><spring:message code="info.password.rule.pwdcheckrepeat" /></div> 
													</td>
												</tr>
												<tr>
													<th scope="row"><spring:message code="comUssUmt.userManagePasswordUpdt.passConfirm" /> <span class="essential">*</span></th>
													<td><input type="password" id="newPassword2" name="newPassword2" class="form-control w-50p" autocomplete="off" /></td>
												</tr>
											</tbody>
										</table>
										
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-save" onclick="fnPasswordUpdate(this.form)">저장</button></div>
									</div>
									</form:form>
								</div>
								<!-- //비밀번호 변경 -->
							</div>	
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>	
					<script>
						$( function() {	
							$("#header .user-btn").click(function(){
								$(this).addClass("active");
								$(".popup-overlay").show();
							});

							$(".userInfoUdt .popup-close").click(function(){
								$("#header .user-btn").removeClass("active");
								$(".popup-overlay").hide();
							});
						});
					</script>