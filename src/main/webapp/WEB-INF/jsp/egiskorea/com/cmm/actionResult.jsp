<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="/js/plugin/jquery/jquery-3.4.1.min.js"></script>

<script>
$(document).ready(function(){
	$(".popup-panel").removeClass('opened');
	ui.loadingBar("hide");
})
</script>

<script>
<c:if test="${not empty resultMsg}">alert("${resultMsg}");</c:if>
<c:choose>
    <c:when test="${not empty resultRedirect}">
    	<c:choose>
    		<c:when test="${not empty resultClose}">
    			window.close();
    		</c:when>
    	</c:choose>
        location.href="${resultRedirect}";
    </c:when>
    
    <c:otherwise>
        <c:choose>
            <c:when test="${not empty resultClose}">
                window.close();
            </c:when>
            <c:otherwise>
                <c:if test="${empty resultRedirect}">window.history.back();</c:if>
            </c:otherwise>
        </c:choose>
    </c:otherwise>
</c:choose>
</script>