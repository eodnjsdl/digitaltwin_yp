<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
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
$("#srchAddrList .addrResult").on("click", function() {
	var addrId = $(this).attr('id');
	
	$("#srchAddrList .addrResult").removeClass("addrOn");
	$("#" + addrId).addClass("addrOn");
	
	var options ={
		typeNames	: 'digitaltwin:lsmd_cont_ldreg_41830', //WFS 레이어명
		filter		: "gid = " + addrId,
	}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 지도 아이콘 작업
		dtmap.vector.clear();
	    
	    // 지도에 GeoJSON 추가
	    dtmap.vector.readGeoJson(data, function(feature) {
			return {
				stroke: {
					color: '#FF3333',
					width: 5
				},
			}
	    });
	    dtmap.vector.fit();
	});
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
			<div id="${list.gid}" class="addrResult">
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
