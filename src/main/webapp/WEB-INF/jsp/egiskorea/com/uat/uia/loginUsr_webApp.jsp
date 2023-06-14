<%@ page contentType="text/html; charset=utf-8"%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>국토조사앱</title>

<script src="/js/com/jquery/jquery-3.4.1.min.js"></script>
<script src="/js/com/jquery-ui/jquery-ui.js"></script>
<link rel="stylesheet" href="/js/com/jquery-ui/jquery-ui.css">

<link rel="stylesheet" href="/css/com/common.css">
<link rel="stylesheet" href="/css/login.css">

<script>
	function checkLogin() {
	    if ($('#loginId').val() =='') {
	    	alert("아이디를 입력하세요.");
	        $("#loginId").focus();
	        return false;
	    } else if ($('#loginPw').val() == '') {
	    	alert("비밀번호를 입력하세요.");
	        $("#loginPw").focus();
	        return false;
	    } else {
			$('form[name=loginForm]').submit();
	    }
		return false;
	}
</script>
</head>
<body>
	<!-- wrap -->
	<div id="wrapWebApp" class="webApp">
	
		<!-- header -->
	    <header id="headerWebApp">
			<div>
				<h1 class="logo">
					<a href="javascript:void(0);">디지털트윈 <strong>공간정보 통합플랫폼</strong></a>
				</h1>
			</div>
			<div>
				<a href="javascript:void(0);" class="admin">국토조사앱</a>
			</div>
		</header>
	    <!-- //header -->
	    
		<!-- login -->
		<div id="container">
			<div id="loginWebApp">
				<form id="loginForm" name="loginForm" method="post" action="/uat/uia/loginAction.do">
				<input name="userSe" type="hidden" value="USR"/>
				<div class="login-box">
					<div class="items">
						<label for="id" class="form-label">ID</label>
						<input type="text" name="id" id="loginId" class="form-control" onkeypress="if( event.keyCode == 13 ){ checkLogin();}" maxlength="20" placeholder="아이디">
					</div>
					<div class="items">
						<label for="password" class="form-label">Password</label>
						<input type="password" name="password" id="loginPw" class="form-control" onkeypress="if( event.keyCode == 13 ){ checkLogin();}" maxlength="20" placeholder="비밀번호">
					</div>
					<button type="button" onclick="checkLogin();" class="login-WebApp-btn">로그인</button>
				</div>
				</form>
			</div>
		</div>
		<!-- //login -->
		
		<!-- footer -->
		<footer id="footerWebApp">
			<p class="copyright">Copyright (c) YANGPYEONG GUN. All rights Reserved.</p>
		</footer>
		<!-- //footer -->

	</div>
	<!-- //wrap -->
</body>
</html>