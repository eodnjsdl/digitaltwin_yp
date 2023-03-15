<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/ibbi/ibbi.js"></script>
<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>
<script type="text/javascript">
// 3d poi
var poiList = ${poiList};
$(".spaceArea").hide();
var lastEmdKorNm = "<c:out value='${searchVO.emdKorNm}' />";
var lastOpnnSvcNmSearch = "<c:out value='${searchVO.opnnSvcNmSearch}' />";
var lastBplcNmSearch = "<c:out value='${searchVO.bplcNmSearch}' />";
var lastSpitalSearch = "<c:out value='${searchVO.spitalSearch}' />";
var lastBufferCnt = "<c:out value='${searchVO.bufferCnt}' />";

var lastSelect = "<c:out value='${searchVO.inBusinessEstaInfoSelect}' />";
var lastDraw = "<c:out value='${searchVO.inBusinessEstaInfoAreaDrawing}' />";

$(".popup-reset").unbind('click').bind('click',function(){
	ibbiUi = '';
	// cmmUtil.drawClear();
	// bottomPopupOpen('inBusinessEstaInfo');
	ui.openPopup("bottomPopup");
	aj_selectInBusinessEstaInfoList($("#tmpForm")[0]);
});

</script>
<form name="selectInBusinessEstaInfoExcelList" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
<div class="popup-header">관내업소정보조회</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">						
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="tabBoxDepth2-wrap">
				<div class="tabBoxDepth2">
					<ul>
						<li data-tab="busiProperty" class="busiProperty on"><button type="button" class="inner-tab">속성검색</button></li>
						<li data-tab="busiSpace" class="busiSpace"><button type="button" class="inner-tab">공간검색</button></li>
					</ul>
				</div>
				<div class="tab-cont busiProperty on">
					<div class="srch-default">
						<table class="srch-tbl">
							<colgroup>
								<col style="width: 30%;">
								<col style="width: auto;">
							</colgroup>
							<tbody >
								<tr>
									<th scope="row">읍면동</th>
									<td>
										<select class="form-select ibbiSrch" id="emdKorNm" name="emdKorNm">
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
									<th scope="row">서비스명</th>
									<td>
										<select class="form-select ibbiSrch" id="opnnSvcNmSearch" name="opnnSvcNmSearch">
											<option value="">전체</option>
											<c:forEach items="${opnnSvcNmList}" var="opnnSvcNmList" varStatus="status">
												<option value="<c:out value='${opnnSvcNmList.opnnSvcNm}' />" <c:if test="${searchVO.opnnSvcNmSearch == opnnSvcNmList.opnnSvcNm}">selected</c:if>>
													<c:out value="${opnnSvcNmList.opnnSvcNm}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control ibbiSrch" id="bplcNmSearch" name="bplcNmSearch" 
									value='<c:out value="${searchVO.bplcNmSearch}"/>' 
									onkeypress="if( event.keyCode == 13 ){ fn_select_list('attr'); }"
									placeholder="사업자명"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onClick="fn_select_list('attr');">조회</button></div>
					</div>
				</div>
				<div class="tab-cont busiSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="inBusinessEstaInfoSelect" id="rChk1-1" checked="checked" value="1"><label for="rChk1-1">현재화면영역</label></span>
								<span><input type="radio" name="inBusinessEstaInfoSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea">
							<span class="drawing-obj small">
								<span><input type="radio" name="inBusinessEstaInfoAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
								<span><input type="radio" name="inBusinessEstaInfoAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
								<span><input type="radio" name="inBusinessEstaInfoAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
								<span><input type="radio" name="inBusinessEstaInfoAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea">
							경계로부터 <span class="form-group"><input type="text" class="form-control align-center" id="bufferCnt" name="bufferCnt" value="0" placeholder="0"> <sub>m</sub></span> 이내 범위
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
					<button type="button" class="btn basic bi-excel" id="ibbiExcelDownload" data-form-name="selectInBusinessEstaInfoExcelList">엑셀저장</button>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div class="bbs-list-head">
						<table class="bbs-list">
							<colgroup>
								<col style="width: auto;">
								<col style="width: auto;">
								<col style="width: auto;">
								<col style="width: 8%;">
								<col style="width: 8%;">
								<col style="width: 8%;">
								<col style="width: auto;">
								<col style="width: 8%;">
								<col style="width: auto;">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">업소구분</th>
									<th scope="col">관리번호</th>
									<th scope="col">사업장명</th>
									<th scope="col">영업상태</th>
									<th scope="col">업태구분명</th>
									<th scope="col">소재지 우편번호</th>
									<th scope="col">소재지 주소</th>
									<th scope="col">도로명 우편번호</th>
									<th scope="col">도로명 주소</th>														
								</tr>
							</thead>
						</table>
					</div>
					<div class="scroll-y">
						<table class="bbs-list">
							<colgroup>
								<col style="width: auto;">
								<col style="width: auto;">
								<col style="width: auto;">
								<col style="width: 8%;">
								<col style="width: 8%;">
								<col style="width: 8%;">
								<col style="width: auto;">
								<col style="width: 8%;">
								<col style="width: auto;">			
							</colgroup>
							<tbody>
							<c:forEach items="${resultList}" var="resultList" varStatus="status">
								<tr name="inBusiDtl" id="<c:out value="${resultList.no}" />" data-no='<c:out value="${resultList.no}" />' data-lon='<c:out value="${resultList.lonLon}" />' data-lat='<c:out value="${resultList.latLat}" />'>
									<td><c:out value="${resultList.opnnSvcNm}"></c:out></td>
									<td><c:out value="${resultList.mngNo}"></c:out></td>
									<td><c:out value="${resultList.bplcNm}"></c:out></td>
									<td><c:out value="${resultList.bsnStaeNm}"></c:out></td>
									<td><c:out value="${resultList.bizcSeNm}"></c:out></td>
									<td><c:out value="${resultList.lcZip}"></c:out></td>
									<td><c:out value="${resultList.lcAllAdr}"></c:out></td>
									<td><c:out value="${resultList.rdnZip}"></c:out></td>
									<td><c:out value="${resultList.rdnAllAdr}"></c:out></td>
								</tr>
							</c:forEach>
							<c:if test="${fn:length(resultList) == 0}">
								<tr>
									<td class="noData" colspan="9">데이터가 없습니다.</td>
								</tr>
							</c:if>
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
</form>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('관내업소정보조회')"></button>
<button type="button" class="popup-close" title="닫기" onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기" onclick="toggleFold(this);"></button>				
