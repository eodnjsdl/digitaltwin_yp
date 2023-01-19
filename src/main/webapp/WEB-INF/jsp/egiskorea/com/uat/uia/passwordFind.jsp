<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<script>

$(document).ready(function(){
	$("#selPwEmailAddress").change(function(){
		$("#pwEmail").val($(this).val());
		
	});
	
	
	// 결과화면 및 버튼 -> 숨김or표시
	$('.success').css('display', 'none');
	$('.fail').css('display', 'none');
	$('.bi-check').css('display', 'none');
	
	
	//팝업창 button event
	$('.btn-confirm').on("click", function() {
		$('#dialog-findPw').dialog('close');
	}); 
	
	
});
	
function fnSearchPassword() {
	var id = $("#pwId").val();
	var name = $("#pwName").val();
	var email = $("#pwEmailId").val() + '@' + $("#pwEmail").val();
	$('input[name=email]').attr('value',email);
	
 	$.ajax({
		type : "POST",
		url : "/uat/uia/selectPassword.do",
		data : {
			"id" : id,
			"name" : name,
			"email" : email,
		},
		dataType : "json",
		success : function(returnData, status){
			
			if(returnData.resultMsg == "success") {
				
				$('.fail').css('display', 'none'); // 실패 결과 숨기기
				$('.success').css('display', ''); // 임시비밀번호 생성 나타내기
				
				$('.btn-clear').css('display', ''); // 초기화 버튼 나타내기
				$('.btn-confirm').css('display', 'none'); // 확인 버튼 숨기기
				
				//id, name, password의 input disabled
				$('#pwId').attr('readonly', true);
				$('#pwName').attr('readonly', true);
				$('#pwEmailId').attr('readonly', true);
				$('#pwEmail').attr('readonly', true);
				
				
				
			} else if(returnData.resultMsg == "fail") {
				
				$('.fail').css('display', ''); // 실패 결과 나타내기
				$('.success').css('display', 'none'); // 임시비밀번호 생성 숨기기
				
				$('.btn-confirm').css('display', ''); // 확인 버튼 나오기
				$('.btn-clear').css('display', 'none'); // 초기화 버튼 숨기기
				
				
			}
				
				
		},
		error : function(err){
			
		}
	});
}

function fnCreatePassword(){
 	$.ajax({
		type : "POST",
		url : "/uat/uia/createPassword.do",
		data : {
		},
		dataType : "json",
		success : function(returnData, status){
			$('#newPassword').val(returnData.newPassword);

		},
		error : function(){
			alert("비밀번호 생성에 실패하였습니다.");
		}
	});	
	
	
}

function copy_to_clipboard() {
	var copyText = document.getElementById("newPassword");
	if(copyText.value == "") {
		alert("임시 비밀번호 생성을 먼저 해주세요.")	
	} else {
		copyText.select();
		document.execCommand("Copy");
		alert("임시 비밀번호를 복사했습니다.");	
	}
	
}


function fnClearPassword(){
	var pw = $("#newPassword").val();
	var space = /\s/;
	var hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

	if(pw == ""){
		alert("생성버튼을 눌러 비밀번호를 생성하세요.");
		return;
	} else {
		if(confirm("해당 임시 비밀번호로 초기화 하시겠습니까?")){
		 	$.ajax({
				type : "POST",
				url : "/uat/uia/clearPassword.do",
				data : {
					"id" : $("#pwId").val(),
					"newPassword" : pw
				},
				dataType : "text",
				success : function(){
					alert("비밀번호 초기화에 성공했습니다.");
					$('#dialog-findPw').dialog('close');
				},
				error : function(){
					alert("비밀번호 초기화에 실패했습니다.");
					
				}
			});
		}
	 
	}
}

</script>

			<p class="cont-txt">등록된 사용자 정보를 입력해 주세요</p>
			<form:form commandName="passwordForm" method="post">
			<div class="login-default">
				<table>
					<colgroup>
						<col style="width: 15%;">
						<col style="width: auto;">
					</colgroup>
					<tbody>
						<tr>
							<th scope="row">아이디</th>
							<td>
								<div class="form-row">
									<div class="col-4"><input name="id" id="pwId" class="form-control" /></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">이름</th>
							<td>
								<div class="form-row">
									<div class="col-4"><input name="name" id="pwName" class="form-control"/></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">이메일</th>
							<td>
								<div class="form-row">
									<div class="col-4"><input type="text" class="form-control" id="pwEmailId"></div>
									<div class="col-auto">@</div>
									<div class="col"><input type="text" class="form-control" id="pwEmail"></div>
									<div class="col-auto">
										<select name="" id="selPwEmailAddress" class="form-select">
											<option value="">직접 입력</option>
											<option value="korea.kr">korea.kr</option>
											<option value="lx.or.kr">lx.or.kr</option>
											<option value="gmail.com">gmail.com</option>
											<option value="naver.com">naver.com</option>
										</select>
									</div>
									
									<input type="hidden" name="email" value="" />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="btn-wrap">
				<div>
				<button type="button" class="btn type01 find" onclick="fnSearchPassword()">찾기</button>
				</div>
			</div>
			</form:form>
			
			<!--  찾기 성공 -->
			<div class="find-result-box success">
				<p class="tit">비밀번호 생성하기</p>
				<div class="pw-group">
					<div>임시 비밀번호</div><div><input type="text" class="form-control" id="newPassword" readOnly></div>
					<div>
						<button type="button" class="btn basic" onclick="fnCreatePassword()">생성</button>
					</div>
					<div>
						<button type="button" class="icon-btn detail2" onclick="copy_to_clipboard()">복사</button>
					</div>
				</div>
			</div>
			<div class="btn-wrap">
				<div><button type="button" class="btn basic bi-check btn-clear" onclick="fnClearPassword();">초기화</button></div>
			</div>
			
			<!-- 찾기 실패 --> 
			<div class="find-result-box fail">
				<p class="tit">찾기 결과</p>
				<p class="result-txt essential">검색하신 정보와 매칭되는 사용자가 없습니다!</p>
			</div>
			<div class="btn-wrap">
				<div><button type="button" class="btn basic bi-check btn-confirm">확인</button></div>
			</div>
