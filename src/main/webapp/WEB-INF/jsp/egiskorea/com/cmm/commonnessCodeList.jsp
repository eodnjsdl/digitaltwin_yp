<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:choose>
<c:when test="${returnType eq 'select'}">
	<c:forEach var="result" items="${resultList}" varStatus="status">
		<option value="<c:out value="${result.code}" />"><c:out value="${result.codeNm}" /></option>
	</c:forEach>
</c:when>
<c:otherwise>
</c:otherwise>
</c:choose>	