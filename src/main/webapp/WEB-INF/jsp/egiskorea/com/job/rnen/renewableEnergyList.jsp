<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/map-ui.js"></script>
<script src="/js/egiskorea/com/job/rnen/rnen.js"></script>
<script type="text/javascript">
$(".spaceArea").hide();
var lastEmdKorNm = "<c:out value='${searchVO.emdKorNm}' />";
var lastBsnsSeSearch = "<c:out value='${searchVO.bsnsSeSearch}' />";
var lastPrmisnVolmASearch = "<c:out value='${searchVO.prmisnVolmASearch}' />";
var lastPrmisnVolmBSearch = "<c:out value='${searchVO.prmisnVolmBSearch}' />";
var lastElcpwstnNmSearch = "<c:out value='${searchVO.elcpwstnNmSearch}' />";
var lastSpitalSearch = "<c:out value='${searchVO.spitalSearch}' />";
var lastBufferCnt = "<c:out value='${searchVO.bufferCnt}' />";

var lastSelect = "<c:out value='${searchVO.renewableEnergySelect}' />";
var lastDraw = "<c:out value='${searchVO.renewableEnergyAreaDrawing}' />";

// $(".popup-reset").unbind('click').bind('click',function(){
// 	rnenUi = '';
// 	// cmmUtil.drawClear();
// 	bottomPopupOpen('renewableEnergy');
// });

</script>
<form name="selectRenewableEnergyExcelList" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
<input type="hidden" name="bufferArea" id="bufferArea" value="<c:out value='${searchVO.bufferArea}' />">
<div class="popup-header">신재생에너지</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">						
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select class="form-select" id="changeBox" name="changeBox">
					<option value="solarPlant" selected>태양광발전소</option>
				</select>
			</div>
			<div class="tabBoxDepth2-wrap">
				<div class="tabBoxDepth2">
					<ul>
						<li data-tab="energyProperty" class="energyProperty on" ><button type="button" class="inner-tab">속성검색</button></li>
						<li data-tab="energySpace" class="energySpace"><button type="button" class="inner-tab ">공간검색</button></li>
					</ul>
				</div>
				<div class="tab-cont energyProperty on">
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
										<select class="form-select rnenSrch" id="emdKorNm" name="emdKorNm">
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
									<th scope="row">사업구분</th>
									<td>
										<select class="form-select rnenSrch" id="bsnsSeSearch" name="bsnsSeSearch">
											<option value="">전체</option>
											<c:forEach items="${bsnsSeList}" var="bsnsSeList" varStatus="status">
												<option value="<c:out value='${bsnsSeList.bsnsSe}' />" <c:if test="${searchVO.bsnsSeSearch == bsnsSeList.bsnsSe}">selected</c:if>>
													<c:out value="${bsnsSeList.bsnsSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">허가용량</th>
									<td>
										<input type="text" class="form-control rnenSrch" id="prmisnVolmASearch" name="prmisnVolmASearch" value='<c:out value='${searchVO.prmisnVolmASearch}' />' style="width:63px;">
										 ~ 
										<input type="text" class="form-control rnenSrch" id="prmisnVolmBSearch" name="prmisnVolmBSearch" value='<c:out value='${searchVO.prmisnVolmBSearch}' />' style="width:63px;">
									</td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control rnenSrch" id="elcpwstnNmSearch" name="elcpwstnNmSearch" value='<c:out value="${searchVO.elcpwstnNmSearch}" />' onkeypress="if( event.keyCode == 13 ){ setData(0); }" placeholder="발전소명"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="button" id="renewableSearch" class="btn type01 search" onClick="fn_search_List(); setData(0);">조회</button></div>
					</div>
				</div>
				<div class="tab-cont energySpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="renewableEnergySelect" id="rChk1-1" checked="checked" value="1"><label for="rChk1-1">현재화면영역</label></span>
								<span><input type="radio" name="renewableEnergySelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea">
							<span class="drawing-obj small">
								<span><input type="radio" name="renewableEnergyAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
								<span><input type="radio" name="renewableEnergyAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
								<span><input type="radio" name="renewableEnergyAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
								<span><input type="radio" name="renewableEnergyAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea">
							경계로부터 <span class="form-group"><input type="text" class="form-control align-center" id="bufferCnt" name="bufferCnt" value="0" placeholder="0"> <sub>m</sub></span> 이내 범위
						</div>
						<input type="hidden" id="spitalSearch" name="spitalSearch" value='<c:out value='${searchVO.spitalSearch}' />'>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" id="rnenSpital" onClick="fn_select_list('spital');">조회</button></div>
					</div>
				</div>
			</div>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong></strong>건</div>
				<div>
					<button type="button" class="btn basic bi-write" onClick="fn_insert();">등록</button> 
					<button type="button" class="btn basic bi-excel" id="rnenExcelDownload" data-form-name="selectRenewableEnergyExcelList">엑셀저장</button> 
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div data-ax5grid="bbs-grid"  data-ax5grid-config="{}" style="height: 267px;">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</form>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('신재생에너지')"></button>
<button type="button" class="popup-close" title="닫기" onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');"></button>
<button type="button" class="popup-reset" class="초기화" onclick="bottomPopupOpen('renewableEnergy');"></button>
<button type="button" class="popup-bottom-toggle" onclick="toggleFold(this);" title="접기"></button>				
<!-- //업무 > 공간정보활용 > 신재생에너지 -->