<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
$(document).ready(function() {
	//console.log("webAppSearch.jsp");	
})

//페이지 이동
$("#pageNum li").on("click", function() {
	var pge = $(this).val();
	if (pge == 0) {
		searchAddress($(this).text());
	} else {
		if (pge % 10 != 1) {
			searchAddress(pge - (pge % 10 - 1));
		} else {
			searchAddress(pge);
		}
	}
})

// 주소 클릭
$("#srchAddrList .addrResult").on("click", function(e) {
	var pnu = $(this).attr('id');
	var addr = e.target.innerText;
	
	$("#srchAddrList .addrResult").removeClass("addrOn");
	$("#" + pnu).addClass("addrOn");
	
	drawPnu(pnu, addr.substring(12));
})

$("#searchTit").on("click", function() {
	if($("#searchDiv").hasClass("dsplyNon") === false) {
		$("#searchDiv").addClass("dsplyNon");
		
		$("#listOnOff").removeClass("rotateImg");
	} else {
		$("#searchDiv").removeClass("dsplyNon");
		
		$("#listOnOff").addClass("rotateImg");
	}
})
</script>

<h3 id="searchTit">
	<span>총 <i>${paginationInfo.totalRecordCount}</i> 건</span>
	<span><img id="listOnOff" class="rotateImg" src="/images/webApp/search-arrow-btn.svg" alt=""></span>
</h3>
<div id="searchDiv">
	<div id="srchAddrList">
		<c:forEach items="${resultList}" var="list" varStatus="status">
			<div id="${list.pnu}" class="addrResult">
				<span>경기도 양평군 ${list.emdKorNm} ${list.liKorNm} ${list.jibun}</span>
			</div>
		</c:forEach>
	</div>
	
	<ul id="pageNum">
		<c:set var="page" value="${paginationInfo}"/>
		<c:choose>
			<c:when test="${page.hasPrevious eq false}"></c:when>
			<c:otherwise>
				<li class="prePage" value=""><img src="/images/webApp/paging-arrow.svg" alt=""></li>
			</c:otherwise>
		</c:choose>
		
		<c:forEach begin="${page.startPage}" end="${page.endPage}" step="1" var="pageNum" varStatus="num">
			<li id="page${pageNum}">${pageNum}</li>
		</c:forEach>
		
		<c:choose>
			<c:when test="${page.hasNext eq false}"></c:when>
			<c:otherwise>
				<li class="nextPage" value=""><img class="rotateImg" src="/images/webApp/paging-arrow.svg" alt=""></li>
			</c:otherwise>
		</c:choose>
	</ul>
</div>
