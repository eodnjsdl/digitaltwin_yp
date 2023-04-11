<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%pageContext.setAttribute("crlf", "\r\n"); %>
<!doctype html>
<html lang="ko">
<link type="text/css" rel="stylesheet" id="dark-mode-custom-link">
<link type="text/css" rel="stylesheet" id="dark-mode-general-link">
<style lang="en" type="text/css" id="dark-mode-custom-style"></style>
<style lang="en" type="text/css" id="dark-mode-native-style"></style>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title><spring:message code="site.title" /></title>
	
	<script src="/js/com/jquery/jquery-3.4.1.min.js"></script>
	<script src="/js/com/jquery-ui/jquery-ui.js"></script>
	<link rel="stylesheet" href="/js/com/jquery-ui/jquery-ui.css">
	
	<link rel="stylesheet" href="/css/com/common.css">
	<link rel="stylesheet" href="/css/login.css">
	
	<script src="/js/egiskorea/com/uat/uia/login-popup.js"></script>
	
	<link rel="stylesheet" href="/css/com/common.css">
	<link rel="stylesheet" href="/css/login.css">
	<script>
	$(document).ready(function(){
		
		$('.system-popup').draggable({
			containment: "#wrap",
			scroll: false,
			start: function() {
				$(this).css({transform: "none", top: $(this).offset().top+"px", left:$(this).offset().left+"px"});
			}
		});
		
		var popupCount = $(".system-popup").length;
		
		if(popupCount > 1) {
			var loc = 50 - (popupCount * 2);
			for(var i=0; i<popupCount; i++) {
				$("#system-popup-" + i).css({"top" : loc + "%", "left" :  loc + "%"});
				loc += 3;
			}
		}
		
		$(".system-popup .system-close, .system-popup .bi-check").click(function(){
			var popupId = $(this).closest(".system-popup").attr("id");
			$("#" + popupId).hide();
		});
		
		
		<c:if test="${not empty fn:trim(loginMessage) &&  loginMessage ne ''}">
	    	alert("<c:out value='${loginMessage}'/>");
	    </c:if>
		
	    getid(document.loginForm);
	});
	
	function getid(form) {
		form.checkId.checked = ((form.id.value = getCookie("saveid")) != "");
	}
	
	function checkLogin(userSe) {
	    // 일반회원
	    if (userSe == "GNR") {
	        document.loginForm.rdoSlctUsr[0].checked = true;
	        document.loginForm.rdoSlctUsr[1].checked = false;
	        document.loginForm.rdoSlctUsr[2].checked = false;
	        document.loginForm.userSe.value = "GNR";
	    // 기업회원
	    } else if (userSe == "ENT") {
	        document.loginForm.rdoSlctUsr[0].checked = false;
	        document.loginForm.rdoSlctUsr[1].checked = true;
	        document.loginForm.rdoSlctUsr[2].checked = false;
	        document.loginForm.userSe.value = "ENT";
	    // 업무사용자
	    } else if (userSe == "USR") {
	        document.loginForm.rdoSlctUsr[0].checked = false;
	        document.loginForm.rdoSlctUsr[1].checked = false;
	        document.loginForm.rdoSlctUsr[2].checked = true;
	        document.loginForm.userSe.value = "USR";
	    }
	}

	function actionLogin() {
		if (document.loginForm.id.value =="") {
	        alert("<spring:message code="comUatUia.validate.idCheck" />"); <%-- 아이디를 입력하세요 --%>
	        $("#id").focus();
	        return false;
	    } else if (document.loginForm.password.value =="") {
	        alert("<spring:message code="comUatUia.validate.passCheck" />"); <%-- 비밀번호를 입력하세요 --%>
	        $("#password").focus();
	        return false;
	    } else {
	        document.loginForm.action="<c:url value='/uat/uia/loginAction.do'/>";
	        document.loginForm.submit();
	    }
		return false;
	}
	
	function setCookie (name, value, expires) {
	    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
	}

	function getCookie(Name) {
	    var search = Name + "=";
	    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
	        offset = document.cookie.indexOf(search);
	        if (offset != -1) { // 쿠키가 존재하면
	            offset += search.length;
	            // set index of beginning of value
	            end = document.cookie.indexOf(";", offset);
	            // 쿠키 값의 마지막 위치 인덱스 번호 설정
	            if (end == -1)
	                end = document.cookie.length;
	            return unescape(document.cookie.substring(offset, end));
	        }
	    }
	    return "";
	}

	function saveid(form) {
	    var expdate = new Date();
	    // 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
	    if (form.checkId.checked)
	        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
	    else
	        expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제조건
	    setCookie("saveid", form.id.value, expdate);
	}

	function getid(form) {
		form.checkId.checked = ((form.id.value = getCookie("saveid")) != "");
	}
	
	function aj_idFind(){
		$.ajax({
			type : "POST",
			url : "/uat/uia/idFindViewPopup.do",
			dataType : "html",
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					$("#dialog-findId").html(returnData);
				}else{ 
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				} 
			}, complete : function(){
			}
		});
	}
	
	function aj_passwordFind(){
		$.ajax({
			type : "POST",
			url : "/uat/uia/passwordFindViewPopup.do",
			dataType : "html",
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					$("#dialog-findPw").html(returnData);
				}else{ 
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				} 
			}, complete : function(){
			}
		});
	}
	<c:if test="${!empty resultMsg}">alert("<spring:message code="${resultMsg}" />");</c:if>

	</script>
</head>
<body>

	<div id="wrap">

		<!-- login -->
		<div id="login">
			<h1 class="logo"><spring:message code="site.title" /> <spring:message code="comUatUia.title" /></h1>
			<p class="txt1">도시문제 분석모델과 행정업무를 지원하는<br><strong>도농복합형 디지털트윈 서비스</strong></p>
			<div class="login-group">
				<form name="loginForm" id="loginForm" method="post" onsubmit="return actionLogin();">
				<input name="userSe" type="hidden" value="USR"/>
				<input type="hidden" id="message" name="message" value="<c:out value='${message}'/>">
				<div class="items"><label for="id" class="form-label">ID</label><input type="text" name="id" id="id" class="form-control" maxlength="20" placeholder="아이디"></div>
				<div class="items"><label for="password" class="form-label">PASSWORD</label><input type="password" name="password" id="password" class="form-control" maxlength="20" placeholder="비밀번호"></div>
				<div class="align-right"><span class="form-checkbox"><input type="checkbox" name="checkId" id="checkId" onclick="javascript:saveid(document.loginForm);"><label for="checkId">아이디저장</label></span></div>
				<div><button type="submit" class="btn login-btn">로그인</button></div>
				<div class="util">
					<button type="button" id="findId" onclick="aj_idFind();">아이디찾기</button>
					<button type="button" id="findPw" onclick="aj_passwordFind();">비밀번호찾기</button>
				</div>
				</form>
			</div>
		</div>
		<!-- //login -->

		<!-- 아이디 찾기 -->
		<div class="popup-panel" id="dialog-findId" title="아이디 찾기">
		</div>
		
		<!-- 패스워드 찾기 -->
		<div class="popup-panel" id="dialog-findPw" title="비밀번호 초기화">
		</div>
		
		<!-- 시스템 이용 안내 -->
		<c:forEach var="resultInfo" items="${result}" varStatus="status">
			<div class="system-popup" id="system-popup-${status.index}">
				<div class="system-header"><p class="tit"><c:out value="${resultInfo.nttSj}" escapeXml="false"/></p></div>
				<div class="system-body">
					<div class="cont">
						<div>
							<p>
								<c:out value="${fn:replace(resultInfo.nttCn , crlf , '<br/>')}" escapeXml="false"/>
							</p>
						</div>
						<div class="btn-wrap"><button type="button" class="btn basic bi-check">확인</button></div>
					</div>
				</div>
				<button type="button" class="system-close" title="닫기"></button>
			</div>
		</c:forEach>
		
		<!-- 시스템 이용 안내 -->
		<div class="system-popup">
			<div class="system-header"><p class="tit">시스템 이용 안내</p></div>
			<div class="system-body">
				<div class="cont">
					<div>
						<p>- 회원가입 시 먼저 [아이디 찾기]에서 계정 유무를 확인해주시기 바랍니다.<br>이미 계정이 있으신 경우 반려 처리됩니다.</p>
					</div>
					<div>
						<p>- 신규 회원가입<br>
							1) 자가격리자 관련 기능을 사용하실 경우 : 총괄공무원에게 계정 발급을 요청해주시기 바랍니다.<br>
							2) 그 외 기능만 사용하실 경우 : 회원가입 페이지에서 신청해주시면 됩니다.
						</p>
					</div>
					<div>
						<p>- 전담공무원 등록 :<br>
							총괄공무원이 "신규 자가격리 관리" 상황판의  "정보관리 > 전담공무원관리"에서 등록
						</p>
					</div>
					<div>
						<p>- 총괄공무원 권한 신청 : <br>
							총괄공무원이 "신규 자가격리 관리" 상황판의  "정보관리 > 전담공무원관리"에서 <br>
							해당 아이디의 권한 수정
						</p>
					</div>
					<div>
						<p>문의사항은 헬프데스크(070-5008-6632)로 연락해주시기 바랍니다.</p>
					</div>
	
					<div class="btn-wrap"><button type="button" class="btn basic bi-check">확인</button></div>
	
				</div>
			</div>
			<button type="button" class="system-close" title="닫기"></button>
		</div>
		<!-- //시스템 이용 안내 -->

		<script>
			$(document).ready(function(){
				$('.system-popup').draggable({
					containment: "#wrap",
					scroll: false,
					start: function() {
						$(this).css({transform: "none", top: $(this).offset().top+"px", left:$(this).offset().left+"px"});
					}
				});
				$(".system-popup .system-close, .system-popup .bi-check").click(function(){
					$(".system-popup").hide();
				});
			});
		</script>
		
		<!-- footer -->
		<footer id="footer">
			<p class="copyright">COPYRIGHT ⓒ 2021 YANGPYEONG GUN. All Rights Reserved.</p>
		</footer>
		<!-- //footer -->

	</div>
	<!-- //wrap -->


</body></html>