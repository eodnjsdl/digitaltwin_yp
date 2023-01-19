<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
/**
 * @file Name : postAction.jsp
 * @Description : post로 리다이렉션을 위한 페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.03.18      이준호                  최초생성
 *
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.03.18
 * @version 1.0
 *
 */
%>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>관리자</title>
    <script src="<c:url value="/adm/js/plugin/jquery/jquery-3.4.1.min.js"/>"></script>
</head>
<body>
    <form id="actionForm" method="post" action="${action}">
        <c:forEach var="form" items="${formData}" varStatus="status">
            <input type="hidden" name="${form.name}" value="${form.value}">
        </c:forEach>
    </form>
    <script>
        $(document).ready(function() {
            alert('${message}');
            $('#actionForm').submit();
        })
    </script>
</body>
</html>