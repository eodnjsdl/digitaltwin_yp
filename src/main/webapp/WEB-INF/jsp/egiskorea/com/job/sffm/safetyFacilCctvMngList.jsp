<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/sffm/cctv/cctv.js"></script>
<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>
<!-- 업무 > 공간정보활용 > 안전시설물관리 -->
<!-- <div class="popup-panel popup-bottom work-01-03" style="left: 320px;width: 1600px;height: 378px;"> -->
<div class="popup-header">안전시설물관리</div>
<div class="popup-body">
	<div class="bottom-popup-group">
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select id="safeFacilityType" class="form-select">
					<option value="lamp">가로등관리</option>
					<option value="cctv" selected="selected">CCTV관리</option>
				</select>
			</div>
			<form:form name="searchForm" id="searchForm" method="post">
				<input type="hidden" name="pageIndex" id="pageIndex"
					value="<c:out value='${searchVO.pageIndex}' />">
				<input type="hidden" name="bufferArea" id="bufferArea" value="<c:out value='${searchVO.bufferArea}' />">
				<div class="tabBoxDepth2-wrap">
					<div class="tabBoxDepth2">
						<ul>
							<li id="cctv-prop" data-tab="safetyFacilityProperty" class="on"><button
									type="button" class="inner-tab">속성검색</button></li>
							<li id="cctv-space" data-tab="safetyFacilitySpace"><button
									type="button" class="inner-tab">공간검색</button></li>
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
										<th scope="row">기기구분</th>
										<td colspan="1">
											<select name="cctv-search-selbox" class="form-control" id="cctv-search-selbox">
												<option name="전체" value="">전체</option>
											</select>
										</td>
									</tr>
									<tr>
										<td colspan="2"><input type="text" class="form-control"
											id="cctv-search-deviceid"
											onkeypress="if( event.keyCode == 13 ){ fn_search_cctv_list(''); }"
											placeholder="기기ID"></td>
									</tr>
									<!-- <tr>
									<td colspan="2"><input type="text" class="form-control" id="cctv-search-gbn" onkeypress="if( event.keyCode == 13 ){ CCTV.fn_select_cctv_list(''); }" placeholder="구분"></td>
								</tr> -->
									<tr>
										<td colspan="2"><input type="text" class="form-control"
											id="cctv-search-label"
											onkeypress="if( event.keyCode == 13 ){ fn_search_cctv_list(''); }"
											placeholder="명칭"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="btn-wrap">
							<div>
								<button type="button" class="btn type01 search"
									onclick="setData('');">조회</button>
							</div>
						</div>
					</div>
					<div class="tab-cont safetyFacilitySpace">
						<div class="space-search-group">
							<div class="space-search-items">
								<span class="form-radio text group"> <span><input
										type="radio" name="cctvSelect" id="rChk1-1_cctv" checked=""
										value="1"><label for="rChk1-1_cctv">현재화면영역</label></span> <span><input
										type="radio" name="cctvSelect" id="rChk1-2_cctv" value="2"><label
										for="rChk1-2_cctv">사용자 정의</label></span>
								</span>
							</div>
							<div class="space-search-items areaSrchTool">
								<span class="drawing-obj small"> 
									<span><input type="radio" name="cctvAreaDrawing" id="aChk1_cctv" value="1"><label for="aChk1_cctv" class="obj-sm01"></label></span> <span><input
										type="radio" name="cctvAreaDrawing" id="aChk2_cctv" value="2"><label
										for="aChk2_cctv" class="obj-sm02"></label></span> <span><input
										type="radio" name="cctvAreaDrawing" id="aChk3_cctv" value="3"><label
										for="aChk3_cctv" class="obj-sm03"></label></span> <span><input
										type="radio" name="cctvAreaDrawing" id="aChk4_cctv" value="4"><label
										for="aChk4_cctv" class="obj-sm04"></label></span>
								</span>
							</div>
							<div class="space-search-items areaSrchTool">
								경계로부터 <span class="form-group"><input type="number"
									id="cctvBuffer" class="form-control align-center" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0"
									value="0" placeholder="0"
									onkeypress="if( event.keyCode == 13 ){ fn_select_cctv_list('spital'); }">
									<sub>m</sub></span> 이내 범위
							</div>
						</div>
						<div class="btn-wrap">
							<div>
								<button type="button" class="btn type01 search"
									onclick="setData('spital');">조회</button>
							</div>
						</div>
					</div>
				</div>
			</form:form>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">
					조회결과 : <strong><c:out value="${resultCnt}"></c:out></strong>건
				</div>
				<div>
					<div class="" style="margin-right: 25px; float: left;">
						<span class="form-checkbox"
							style="float: left; margin-right: 5px;"><span><input
								type="checkbox" name="" id="cctvCrimianlChkBox"
								onclick="getCriminalWMS();"><label
								for="cctvCrimianlChkBox"></label></span></span>영향권<span class="form-group">
							<input type="text" id="cctvBuffer2"
							style="width: 50px; margin-left: 5px;" maxlength="10"
							class="form-control align-center" value="0"
							onkeypress="if( event.keyCode == 13 ){ aj_selectCctvList($('#searchForm')[0]); }">
							<sub>m</sub>
						</span>
					</div>
					<button type="button" class="btn basic bi-write"
						id="insertSafetyFacilCctvMngView"
						onclick="fn_insert();">등록</button>
					<a href="/job/cctv/cctvExcelDown.do"><button type="button"
							class="btn basic bi-excel">엑셀저장</button></a>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 273px;">
				<!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div id="sampleGridDiv" style="height:inherit; display: flex;flex-direction: column">
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                    </div>
				</div>

				<div class="pagination">
					
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('안전시설물관리')"></button>
<button type="button" class="popup-close" title="닫기"
	onclick="CCTV.removeCmmPOI();"></button>
<button type="button" class="popup-reset" class="초기화"
	onclick="bottomPopupOpen('safetyFacilitiesCctv');"></button>
<button type="button" class="popup-bottom-toggle" onclick="toggleFold(this);" title="접기"></button>
<!-- //안전시설물관리 -->