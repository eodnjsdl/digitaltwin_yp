<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/ugtm/ugtm.js"></script> 
<script src="/js/egiskorea/com/job/ugtm/ugag/ugag.js"></script>
<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>
<script>
// 3d poi
var poiList = ${poiList};
$(".spaceArea").hide();
var lastEmdKorNm = "<c:out value='${searchVO.emdKorNm}' />";
var lastManageSeSearch = "<c:out value='${searchVO.manageSeSearch}' />";
var lastDetailPrposSeSearch = "<c:out value='${searchVO.detailPrposSeSearch}' />";
var lastFcltsSttusSearch = "<c:out value='${searchVO.fcltsSttusSearch}' />";
var lastSpitalSearch = "<c:out value='${searchVO.spitalSearch}' />";
var lastBufferCnt = "<c:out value='${searchVO.bufferCnt}' />";	

var lastSelect = "<c:out value='${searchVO.underWaterAgriSelect}' />";
var lastDraw = "<c:out value='${searchVO.underWaterAgriAreaDrawing}' />";

$(".popup-reset").unbind('click').bind('click',function(){
	ugagUi = '';
	cmmUtil.drawClear();
	bottomPopupOpen('undergroundWaterManagement');
});

//Poi 추가
dtmap.poi.clear();
for (let i = 0; i < poiList.resultList.length; i++) {
	let poi = poiList.resultList[i];
	dtmap.poi.addPoi({
		id : poi.gid,
		coordinate : [Number(poi.lon),Number(poi.lat)],
		crs : 'EPSG:5179',
		text : poi.fcltyNm,
		properties : poi,
		img : './images/poi/underWaterAgri_poi.png'
	})
}
</script>
<form:form name="selectUnderWaterAgriExcelList" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
<div class="popup-header">지하수관리</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select class="form-select" id="changeBox" name="changeBox">
					<option value="underWaterAgri" selected>농업용공공관정</option>
					<option value="underDevelop">지하수개발</option>
					<option value="underUseFacil">지하수이용시설</option>
				</select>
			</div>
			<div class="tabBoxDepth2-wrap">
				<div class="tabBoxDepth2">
					<ul>
						<li data-tab="groundwaterProperty" class="groundwaterProperty on"><button type="button" class="inner-tab">속성검색</button></li>
						<li data-tab="groundwaterSpace" class="groundwaterSpace"><button type="button" class="inner-tab">공간검색</button></li>
					</ul>
				</div>
				<div class="tab-cont groundwaterProperty on">
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
										<select class="form-select ugtmSrch" id="emdKorNm" name="emdKorNm">
											<option value="">전체</option> 
											<c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
												<option value="<c:out value='${emdList.emdKorNm}' />" <c:if test="${searchVO.emdKorNm == emdList.emdKorNm}">selected</c:if>>
													<c:out value="${emdList.emdKorNm}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">관리구분</th>
									<td>
										<select class="form-select ugtmSrch" id="manageSeSearch" name="manageSeSearch">
											<option value="">전체</option>
											<c:forEach items="${manageSeList}" var="manageSeList" varStatus="status">
												<option value="<c:out value='${manageSeList.manageSe}' />" <c:if test="${searchVO.manageSeSearch == manageSeList.manageSe}">selected</c:if>>
													<c:out value="${manageSeList.manageSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">세부용도</th>
									<td>
										<select class="form-select ugtmSrch" id="detailPrposSeSearch" name="detailPrposSeSearch">
											<option value="">전체</option>
											<c:forEach items="${detailPrposSeList}" var="detailPrposSeList" varStatus="status">
												<option value="<c:out value='${detailPrposSeList.detailPrposSe}' />" <c:if test="${searchVO.detailPrposSeSearch == detailPrposSeList.detailPrposSe}">selected</c:if>>
													<c:out value="${detailPrposSeList.detailPrposSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">시설상태</th>
									<td>
										<select class="form-select ugtmSrch" id="fcltsSttusSearch" name="fcltsSttusSearch">
											<option value="">전체</option>
											<c:forEach items="${fcltsSttusList}" var="fcltsSttusList" varStatus="status">
												<option value="<c:out value='${fcltsSttusList.fcltsSttus}' />" <c:if test="${searchVO.fcltsSttusSearch == fcltsSttusList.fcltsSttus}">selected</c:if>>
													<c:out value="${fcltsSttusList.fcltsSttus}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onClick="fn_select_list('attr');">조회</button></div>
					</div>
				</div>
				<div class="tab-cont groundwaterSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="underWaterAgriSelect" id="rChk1-1" checked="checked" value="1"><label for="rChk1-1">현재화면영역</label></span>
								<span><input type="radio" name="underWaterAgriSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea">
							<span class="drawing-obj small">
								<span><input type="radio" name="underWaterAgriAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
								<span><input type="radio" name="underWaterAgriAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
								<span><input type="radio" name="underWaterAgriAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
								<span><input type="radio" name="underWaterAgriAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea">
							경계로부터 <span class="form-group"><input type="text" class="form-control align-center" name="bufferCnt" id="bufferCnt" value="0" placeholder="0"> <sub>m</sub></span> 이내 범위
						</div>
						<input type="hidden" id="spitalSearch" name="spitalSearch" value='<c:out value='${searchVO.spitalSearch}' />'>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onClick="fn_select_list('spital');">조회</button></div>
					</div>									
				</div>
			</div>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}" /></strong>건</div>
				<div>
					<button type="button" class="btn basic bi-write" onClick="fn_select_regist();">등록</button> 
					<button type="button" class="btn basic bi-excel" id="ugagExcelDownload" data-form-name="selectUnderWaterAgriExcelList">엑셀저장</button> 
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div class="bbs-list-head">
						<table class="bbs-list">
							<colgroup>
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: auto;">
								<col style="width: 6%;">
								<col style="width: 8%;">
								<col style="width: 8%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 11%;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">관리구분</th>
									<th scope="col">시설명</th>
									<th scope="col">주소</th>
									<th scope="col">시설상태</th>
									<th scope="col">시설물점검일</th>
									<th scope="col">용도</th>
									<th scope="col">세부용도</th>
									<th scope="col">구경 (㎜)</th>
									<th scope="col">심도 (m)</th>
									<th scope="col">양수능력 (㎥/일)</th>
									<th scope="col">토출관구경 (㎥)</th>
									<th scope="col">펌프형태</th>
									<th scope="col">펌프마력 (hp)</th>
									<th scope="col">관리기관</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="scroll-y">
						<table class="bbs-list">
							<colgroup>
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: auto;">
								<col style="width: 6%;">
								<col style="width: 8%;">
								<col style="width: 8%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 6%;">
								<col style="width: 11%;">
							</colgroup>
							<tbody>
							<c:forEach items="${resultList}" var="agriList" varStatus="status">
								<tr name="uwAgriDtl" id="<c:out value="${agriList.gid}" />" data-gid='<c:out value="${agriList.gid}" />' data-lon='<c:out value="${agriList.lon}" />' data-lat='<c:out value="${agriList.lat}" />'>
									<td><c:out value="${agriList.manageSe}" /></td>
									<td><c:out value="${agriList.fcltyNm}"  /></td>
									<td><c:out value="${agriList.adres}" /></td>
									<td><c:out value="${agriList.fcltsSttus}" /></td>
									<td><c:out value="${agriList.fcltsChckDe}" /></td>
									<td><c:out value="${agriList.prposSe}" /></td>
									<td><c:out value="${agriList.detailPrposSe}" /></td>
									<td><c:out value="${agriList.calbr}" /></td>
									<td><c:out value="${agriList.dph}" /></td>
									<td><c:out value="${agriList.wpAblty}" /></td>
									<td><c:out value="${agriList.dscrgppCalbr}" /></td>
									<td><c:out value="${agriList.pumpStleSe}" /></td>
									<td><c:out value="${agriList.pumpHrspw}" /></td>
									<td><c:out value="${agriList.manageInsttNm}" /></td>
								</tr>
							</c:forEach>
							<c:if test="${fn:length(resultList) == 0}">
								<tr>
									<td class="noData" colspan="14">데이터가 없습니다.</td>
								</tr>
							</c:if>
							</tbody>
						</table>
					</div>
				</div>
				
				<div class="pagination">
					<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_linkPage"/>
				</div>
			</div>
		</div>
	</div>
</div>
</form:form>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('지하수관리')"></button>
<button type="button" class="popup-close" title="닫기" onClick="removeLayer(); cmmUtil.drawClear();"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" onclick="toggleFold(this);" title="접기"></button>					
<!-- //업무 > 공간정보활용 > 지하수관리 -->