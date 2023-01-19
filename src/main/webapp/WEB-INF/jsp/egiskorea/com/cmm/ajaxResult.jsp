<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:choose>
<c:when test="${returnType eq 'select'}">
	<c:choose>
	<c:when test="${type eq 'dept'}">
		<option value="">조직 선택</option>
		<c:forEach var="result" items="${resultList}" varStatus="status">
			<option value="<c:out value="${result.orgnztId}" />"><c:out value="${result.orgnztNm}" /></option>
		</c:forEach>
	</c:when>
	</c:choose>
</c:when>
</c:choose>