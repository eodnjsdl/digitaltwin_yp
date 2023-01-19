<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/trfc/trfc.js"></script>
<script>
//사용자 정의 툴 기본적으로 숨기기(공간검색시 예외처리 하단에 처리)
$(".areaSrchTool").hide();

// 변수선언
var railroadTrackVO = ${railroadTrackVO}
var korRlrNm = railroadTrackVO.korRlrNm
var emdKorNm = railroadTrackVO.emdKorNm
var trfcSelect = railroadTrackVO.trfcSelect
var trfcAreaDrawing = railroadTrackVO.trfcAreaDrawing
var bufferCnt = railroadTrackVO.bufferCnt

//######## 검색된 값 유지 ########
if(trfcSelect != ''){
	$("input[name=trfcSelect]:eq("+(trfcSelect-1)+")").attr("checked", true)
	
	// 사용자 정의일때
	if(trfcSelect == '2'){
		$(".areaSrchTool").css('display', 'block');
	}
}
if(trfcAreaDrawing != ''){
	$("input[name=trfcAreaDrawing]:eq("+(trfcAreaDrawing-1)+")").attr("checked", true)
}
if(korRlrNm != null){
	$("#korRlrNm").val(korRlrNm)
}
if(emdKorNm != null){
	$("#emdKorNm").val(emdKorNm)
}
if(bufferCnt != null){
	$("#bufferCnt").val(bufferCnt)
}
//######## 검색된 값 유지 ########


//공간검색시
if( $("#searchType").val() == 'spatial'){
	$(".waterProperty").removeClass("on");
	$(".waterSpace").addClass("on");
	$("li[data-tab='waterProperty']").removeClass("on");
	$("li[data-tab='waterSpace']").addClass("on");
	trfcSearchObj.searchType.spatialSearch = true
}

//레이어 표출
var geomData = ${geom};

// geomFromPointArray(geomData);



// 철도선로 최초 페이지
function fn_select_railroad_track_list(){
	
	if(!$('#mapType3D').prop("checked")) {
		const yMap = app2D.getYMap();
		
		if($('#rChk1-2').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.waterSpace').hasClass("on")) {
			 alert("영역을 선택해주세요.");
			 return;
		}
	}
	
	var searchType = $("#searchType");
	
	// 속성검색 조회시 검색여부 및 검색타입 값 변경
	if(searchType.val() == 'attrSearch') {
		trfcSearchObj.searchType.attrSearch		= true
		trfcSearchObj.searchType.spatialSearch	= false
		
	// 공간검색 조회시 검색여부 및 검색타입 값 변경
	} else if(searchType.val() == 'spatial'){
		trfcSearchObj.searchType.attrSearch		= false
		trfcSearchObj.searchType.spatialSearch	= true
	}
	
	// 공간검색 조회시 검색타입 및 검색조건 추가
	if(trfcSearchObj.searchFlag == true && trfcSearchObj.searchType.spatialSearch == true){
		searchType.val('spatial');
		
	// 속성검색 조회시 검색타입만 추가
	}else if(trfcSearchObj.searchFlag == true && trfcSearchObj.searchType.attrSearch == true){
		searchType.val("attrSearch");
		Module.getMap().clearInputPoint();
	}
	
	document.searchForm.pageIndex.value = 1;
	aj_selectRailroadTrackList($("#searchForm")[0], searchType.val());
}

// 철도선로 페이징
function fn_select_railroad_track_linkPage(pageNo){
	
	var searchType = $("#searchType");
	
	// 속성검색 조회시
	if(searchType.val() == 'attrSearch') {
		trfcSearchObj.searchType.attrSearch		= true
		trfcSearchObj.searchType.spatialSearch	= false
		
	// 공간검색 조회시
	} else if(searchType.val() == 'spatial'){
		trfcSearchObj.searchType.attrSearch		= false
		trfcSearchObj.searchType.spatialSearch	= true
	}
	
	// 페이징시 검색 종류 및 공간 검색시 form 값 추가
	if(trfcSearchObj.searchFlag == true && trfcSearchObj.searchType.spatialSearch == true){
		searchType.val('spatial');
	}else if(trfcSearchObj.searchFlag == true && trfcSearchObj.searchType.attrSearch == true){
		searchType.val("attrSearch");
		Module.getMap().clearInputPoint();
	}
	
	$("#rightSubPopup").removeClass("opened").html("");
	document.searchForm.pageIndex.value = pageNo;
	aj_selectRailroadTrackList($("#searchForm")[0], searchType.val());
}

// 철도선로 상세보기
function fn_select_railroad_track(gid, lon, lat){
	
	//cmmUtil.setCameraMove(lon, lat);
	rightSubPopupOpen('railroadTrack', gid)
}

</script>
				<!-- 업무 > 시설관리 > 교통시설 > 철도선로 -->
				<div class="popup-header">교통시설</div>
				<div class="popup-body trfc">
					<div class="bottom-popup-body bottom-popup-group">						
						<!-- 검색영역 -->
						<div class="items search-area">
							<div class="top-search">
								<select name="selectBoxTrfc" id="selectBoxTrfc" class="form-select">
									<option value="roadSection">도로구간</option>
									<option value="railroadTrack" selected>철도선로</option>
									<option value="railRoadStation">철도역사</option>
									<option value="subwayTrack">지하철선로</option>
									<option value="subwayStation">지하철역사</option>
									<option value="bridge">교량</option>
									<option value="overpass">고가도로</option>
									<option value="tunnel">터널</option>
								</select>
							</div>
							<form:form name="searchForm" id="searchForm" method="post" onsubmit="fn_select_railroad_track_list(); return false;">
							<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
							<input type="hidden" name="searchType" id="searchType" value="<c:out value='${searchVO.searchType}' />">
							<div class="tabBoxDepth2-wrap">
								<div class="tabBoxDepth2">
									<ul>
										<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
										<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
									</ul>
								</div>
								<div class="tab-cont waterProperty on">
									<div class="srch-default">
										<table class="srch-tbl">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">읍면동</th>
													<td>
														<select name="emdKorNm" id="emdKorNm" class="form-select">
															<option value="41830">전체</option>
															<c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
																<option value="<c:out value='${emdList.emdCd}' />" <c:if test="${searchVO.emdKorNm == emdList.emdCd}">selected</c:if>>
																	<c:out value="${emdList.emdKorNm}" />
																</option>																
															</c:forEach>
														</select>
													</td>
												</tr>
												<tr>
													<td colspan="2"><input type="text" class="form-control" id="korRlrNm" name="korRlrNm" placeholder="철도선로명" value="<c:out value='${searchVO.korRlrNm}' />"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="btn-wrap">
										<div><button type="submit" class="btn type01 search">조회</button></div>
									</div>
								</div>
								<div class="tab-cont waterSpace">
									<div class="space-search-group">
										<div class="space-search-items">
											<span class="form-radio text group">
												<span><input type="radio" name="trfcSelect" id="rChk1-1" checked="checked" value="1"><label for="rChk1-1">현재화면영역</label></span>
												<span><input type="radio" name="trfcSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
											</span>
										</div>
										<div class="space-search-items areaSrchTool">
											<span class="drawing-obj small">
												<span><input type="radio" name="trfcAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
												<span><input type="radio" name="trfcAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
												<span><input type="radio" name="trfcAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
												<span><input type="radio" name="trfcAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
											</span>
										</div>
										<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" name="bufferCnt" id="bufferCnt" value="0" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
									</div>
									<div class="btn-wrap">
										<div><button type="submit" class="btn type01 search">조회</button></div>
									</div>
								</div>
							</div>
							</form:form>
						</div>
						<!-- //검색영역 -->
						<div class="items data-area">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"></c:out></strong>건</div>
								<div>
									<button type="button" class="btn basic bi-excel trfcExcelDownload" id="selectRailroadTrackExcelList">엑셀저장</button>
<!-- 									<button type="button" class="btn basic bi-delete2">삭제</button> -->
								</div>
							</div>
							<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list">
											<colgroup>
<%-- 												<col style="width: 36px;"> --%>
												<col style="width: 12%;">
												<col style="width: 12%;">
												<col style="width: auto;">
												<col style="width: 20%;">
											</colgroup>
											<thead>
												<tr>
<!-- 													<th scope="col"> -->
<!-- 														<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span> -->
<!-- 													</th> -->
													<th scope="col">시군구</th>
													<th scope="col">일련번호</th>
													<th scope="col">철도선로명</th>
													<th scope="col">작업일시</th>														
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
<%-- 												<col style="width: 36px;"> --%>
												<col style="width: 12%;">
												<col style="width: 12%;">
												<col style="width: auto;">
												<col style="width: 20%;">
											</colgroup>
											<tbody>
											<c:if test="${resultCnt > 0}">
											<c:forEach items="${resultList}" var="rrtkList" varStatus="status">
												<tr id="<c:out value="${rrtkList.gid}" />" data-gid="<c:out value="${rrtkList.gid}" />" data-lon="<c:out value="${rrtkList.lon}" />" data-lat="<c:out value="${rrtkList.lat}" />"
												onclick="fn_select_railroad_track('<c:out value="${rrtkList.gid}"></c:out>', '<c:out value="${rrtkList.lon}"></c:out>', '<c:out value="${rrtkList.lat}"></c:out>')">
<!-- 													<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked=""><label for="chk1"></label></span></span></td> -->
													<td><c:out value="${rrtkList.sigCd}"></c:out></td>
													<td><c:out value="${rrtkList.rlrRlwSn}"></c:out></td>
													<td><c:out value="${rrtkList.korRlrNm}"></c:out></td>
													<!-- operDe가 String이여서 Date타입 변경 후 fmt:formatDate 사용 -->
													<fmt:parseDate value="${rrtkList.opertDe}" var="dateValue" pattern="yyyyMMddHHmmss"/>
<%-- 													<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd"/></td> --%>
													<td><fmt:formatDate value="${dateValue}" pattern="yyyy.MM.dd HH:mm:ss"/></td>
												</tr>
											</c:forEach>
											</c:if>
											<c:if test="${resultCnt == 0}">
											<tr>
												<td colspan="4">데이터가 없습니다.</td>
											</tr>
											</c:if>
											</tbody>
										</table>
									</div>
								</div>
								<div class="pagination">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_railroad_track_linkPage"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button type="button" class="manualBtn" title="도움말" onclick="manualTab('교통시설')"></button>
				<button type="button" class="popup-close" title="닫기" onclick="removeLayer()"></button>
				<button type="button" class="popup-reset" class="초기화" onclick="aj_selectTransportationFacilityList($('#tmpForm')[0])"></button>
				<button type="button" class="popup-bottom-toggle" onclick="toggleFold(this);" itle="접기"></button>
				<!-- //업무 > 시설관리 > 교통시설 > 철도선로 -->

