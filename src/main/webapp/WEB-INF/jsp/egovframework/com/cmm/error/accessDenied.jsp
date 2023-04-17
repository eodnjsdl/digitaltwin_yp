<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>스마트시티 IN 양평 플랫폼</title>
		
		<link rel="stylesheet" href="/css/com/common.css">
		<link rel="stylesheet" href="/css/error.css">

		<script type="text/javascript">
		function fncGoAfterErrorPage(){
		    history.back(-2);
		}
		
		<c:if test="${not empty resultMsg}">alert("${resultMsg}");</c:if>
		
		</script>

	</head>
	<body>

		<!-- errorPage -->
		<div id="errorPage">

			<div class="error-box">
				
				<p class="txt1 obj"><spring:message code="comCmmErr.accessDenied.title" /></p><!-- 현재 페이지에 대한 접근권한이 없습니다! -->

				<div class="box">
					<p class="txt2">지속적으로 문제가 발생할 경우 <br>관리자에게 문의해 주시기 바랍니다.</p>
					<div class="btn-wrap"><a href="javascript:fncGoAfterErrorPage();" class="btn">이전 페이지</a></div>
				</div>	
			</div>		

		</div>
		<!-- //errorPage -->

	</body>
</html>