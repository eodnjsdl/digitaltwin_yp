<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>
<script>
$(document).ready(function() {
	callDatePicker();
	SFFM.init();
});

// 가로등관리 등록페이지 열기 버튼
$("#insertSafetyFacilLampMngView").on("click", function(){
	openPopup("rightSubPopup");
	SFFM.aj_insertSafetyFacilLampMngView($("#tmpForm")[0], "", "right");
});

// 가로등관리 상세페이지 열기
function fn_select_detail(gid, lon, lat){
	openPopup("rightSubPopup");
	// SFFM.aj_selectSafetyFacilLampMng(gid, lon, lat);

	SFFM.aj_selectSafetyFacilLampMng($("#tmpForm")[0], gid, "right");

}
</script>
<!-- 업무 > 공간정보활용 > 안전시설물관리 -->
<!-- <div class="popup-panel popup-bottom work-01-03" style="left: 320px;width: 1600px;height: 378px;"> -->	
<div class="popup-header">안전시설물관리</div>
<div class="popup-body">
	<div class="bottom-popup-group">
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select id="sffm-facilityType" class="form-select">
					<option value="lamp">가로등관리</option>
					<option value="cctv">CCTV관리</option>
				</select>
			</div>
			<form:form name="searchForm" id="searchForm" method="post" onsubmit="SFFM.fn_select_sffm_list(''); return false;">
			<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
			<input type="hidden" name="bufferArea" id="bufferArea" value="<c:out value='${searchVO.bufferArea}' />">
			<div class="tabBoxDepth2-wrap">
				<div class="tabBoxDepth2">
					<ul>
						<li id="sffm-prop" data-tab="safetyFacilityProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
						<li id="sffm-space" data-tab="safetyFacilitySpace"><button type="button" class="inner-tab">공간검색</button></li>
					</ul>
				</div>
				<div class="tab-cont safetyFacilityProperty on">
					<div class="srch-default" style="margin-top: 15px;">
						<table class="srch-tbl">
							<colgroup>
								<col style="width: 30%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">설치일자</th>
									<td><div class="datapicker-group"><input type="text" id="sffm-search-instl-de" name="" class="datepicker" value="" autocomplete="off" onkeypress="if( event.keyCode == 13 ){ SFFM.fn_select_sffm_list(''); }"></div></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="sffm-search-adres" onkeypress="if( event.keyCode == 13 ){ SFFM.fn_select_sffm_list(''); }" placeholder="주소"></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="sffm-search-manage-no" onkeypress="if( event.keyCode == 13 ){ SFFM.fn_select_sffm_list(''); }" placeholder="관리번호"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onclick="SFFM.fn_select_sffm_list('');">조회</button></div>
					</div>
				</div>
				<div class="tab-cont safetyFacilitySpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="sffmSelect" id="rChk1-1_sffm" checked="" value="1"><label for="rChk1-1_sffm">현재화면영역</label></span>
								<span><input type="radio" name="sffmSelect" id="rChk1-2_sffm" value="2"><label for="rChk1-2_sffm">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items areaSrchTool">
							<span class="drawing-obj small">
								<span><input type="radio" name="sffmAreaDrawing" id="aChk1_sffm" value="1"><label for="aChk1_sffm" class="obj-sm01"></label></span>
								<span><input type="radio" name="sffmAreaDrawing" id="aChk2_sffm" value="2"><label for="aChk2_sffm" class="obj-sm02"></label></span>
								<span><input type="radio" name="sffmAreaDrawing" id="aChk3_sffm" value="3"><label for="aChk3_sffm" class="obj-sm03"></label></span>
								<span><input type="radio" name="sffmAreaDrawing" id="aChk4_sffm" value="4"><label for="aChk4_sffm" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="number" id="sffmBuffer" class="form-control align-center" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0" placeholder="0" onkeypress="if( event.keyCode == 13 ){ SFFM.fn_select_sffm_list('spital'); }"> <sub>m</sub></span> 이내 범위</div>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onclick="SFFM.fn_select_sffm_list('spital');">조회</button></div>
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
					<div class="" style="margin-right: 25px; float: left;"><span class="form-checkbox" style="float: left; margin-right: 5px;"><span><input type="checkbox" name="" id="sffmCrimianlChkBox" onclick="SFFM.getCriminalWMS();"><label for="sffmCrimianlChkBox"></label></span></span>영향권<span class="form-group">
						<input type="text" id="sffmBuffer2" style="width: 50px; margin-left: 5px;" maxlength="10" class="form-control align-center" value="0" onkeypress="if( event.keyCode == 13 ){ aj_selectSafetyFacilitiesMngList($('#searchForm')[0]); }"> 
						<sub>m</sub></span>
					</div>
					<button type="button" class="btn basic bi-write" id="insertSafetyFacilLampMngView">등록</button> 
					<a href="/job/sffm/sffmExcelDown.do"><button type="button" class="btn basic bi-excel">엑셀저장</button></a>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 273px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div class="bbs-list-head">
						<table class="bbs-list" id="sffm-table">
							<colgroup>
								<col style="width: 10%;">
								<col style="width: auto;">
								<col style="width: auto;">
								<col style="width: 8%;">
								<col style="width: 11%;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">관리번호</th>
									<th scope="col">주소</th>
									<th scope="col">설치일자</th>
									<th scope="col">가로등수</th>
									<th scope="col">기준일</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="scroll-y">
						<table class="bbs-list">
							<colgroup>
								<col style="width: 10%;">
								<col style="width: auto;">
								<col style="width: auto;">
								<col style="width: 8%;">
								<col style="width: 11%;">
							</colgroup>
							<tbody>
							<c:forEach items="${resultList}" var="lampList" varStatus="status">
								<tr id="sffm_<c:out value="${lampList.gid}" />" data-gid="<c:out value="${lampList.gid}" />"  onClick="fn_select_detail('<c:out value="${lampList.gid}" />', '<c:out value="${lampList.lon}" />', '<c:out value="${lampList.lat}" />')">
									<td><c:out value="${lampList.manageNo}"></c:out></td>
									<td><c:out value="${lampList.adres}"></c:out></td>
									<td><c:out value="${lampList.instlDe}"></c:out></td>
									<td><c:out value="${lampList.strtlgtCnt}"></c:out></td>
									<td><c:out value="${lampList.stdde}"></c:out></td>
								</tr>
							</c:forEach>
							<c:if test="${fn:length(resultList) == 0}">
								<tr>
									<td class="noData" colspan="6">데이터가 없습니다.</td>
								</tr>
							</c:if>
							</tbody>
						</table>
					</div>
				</div>
				
				<div class="pagination">
					<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="SFFM.fn_select_sffm_linkPage"/>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('안전시설물관리')"></button>
<button type="button" class="popup-close" title="닫기" onClick="toastr.warning('SFFM.removeCmmPOI();', 'onclick 이벤트');"></button>
<button type="button" class="popup-reset" class="초기화" onclick="bottomPopupOpen('safetyFacilitiesManagement');"></button>
<button type="button" class="popup-bottom-toggle" onclick="toggleFold(this);" title="접기"></button>
<!-- //안전시설물관리 -->