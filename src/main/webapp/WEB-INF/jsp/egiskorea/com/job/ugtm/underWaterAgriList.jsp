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
$(document).ready(function() {
	ui.callDatePicker();
	// 이벤트 리스너 추가
	dtmap.on('select', onFacilitySelectEventListener);

	// 초기화 버튼
	$(".popup-reset").unbind('click').bind('click',function() {
		$('#undergroundWaterManagement').trigger("click");
	});
	
	// 접기/펼치기
	$(".popup-bottom-toggle", "#bottomPopup").on("click", function() {
		const node = $(this);
		const divNode = node.closest("div.popup-panel");
		if (divNode.is(".fold")) {
			node.attr("title", "펼치기");
			divNode.removeClass("fold");
		} else {
			node.attr("title", "접기");
			divNode.addClass("fold");
		}
	});

	// 닫기
	$(".popup-close").unbind('click').bind('click',function() {
		// 지도 clear
		clearMap();
		
		// 등록, 상세, 수정 팝업 창 닫기
		if ($("#rightSubPopup").hasClass("opened")) {
			$("#rightSubPopup").removeClass("opened");
			$("#rightSubPopup").empty();
		}
	});
});

$(".spaceArea").hide();
var lastEmdKorNm = "<c:out value='${searchVO.emdKorNm}' />";
var lastManageSeSearch = "<c:out value='${searchVO.manageSeSearch}' />";
var lastDetailPrposSeSearch = "<c:out value='${searchVO.detailPrposSeSearch}' />";
var lastFcltsSttusSearch = "<c:out value='${searchVO.fcltsSttusSearch}' />";
var lastSpitalSearch = "<c:out value='${searchVO.spitalSearch}' />";
var lastBufferCnt = "<c:out value='${searchVO.bufferCnt}' />";

var lastSelect = "<c:out value='${searchVO.underWaterAgriSelect}' />";
var lastDraw = "<c:out value='${searchVO.underWaterAgriAreaDrawing}' />";

</script>
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
						<li id="ugag-prop" data-tab="groundwaterProperty" class="groundwaterProperty on"><button type="button" class="inner-tab">속성검색</button></li>
						<li id="ugag-space" data-tab="groundwaterSpace" class="groundwaterSpace"><button type="button" class="inner-tab">공간검색</button></li>
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
						<div><button type="button" class="btn type01 search" onClick="fn_search_List(); setData(0);">조회</button></div>
					</div>
				</div>
				<div class="tab-cont groundwaterSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="underWaterAgriSelect" id="rChk1-1" checked="checked" value="extent"><label for="rChk1-1">현재화면영역</label></span>
								<span><input type="radio" name="underWaterAgriSelect" id="rChk1-2" value="custom"><label for="rChk1-2">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items spaceArea" style="display: none;">
							<span class="drawing-obj small" >
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
						<div><button type="button" class="btn type01 search" onClick="fn_search_List(); setData(0);">조회</button></div>
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
					<button type="button" class="btn basic bi-excel" id="ugagExcelDownload" data-form-name="selectUnderWaterAgriExcelList">엑셀저장</button>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;">
				<div class="bbs-default">
					<div data-ax5grid="bbs-grid"  data-ax5grid-config="{}" style="height: 267px;">
					</div>
					<div data-ax5grid="attr-grid-excel" style="diplay:none;"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('지하수관리')"></button>
<button type="button" class="popup-close" title="닫기" ></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 공간정보활용 > 지하수관리 -->

<script>

	//속성 검색, 공간 검색 탭 제어
	$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
		$(this).each(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});
		
		if($("li[data-tab=groundwaterProperty]").hasClass("on")){	//속성검색 일때 공간 검색때 사용한 그리기 초기화
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 초기화
			dtmap.on('select',spaceClickListener );	//레이어 선택 핸들러
			$('#spitalSearch').val('');	//공간검색 초기화
		}else{
			$('input[name=underWaterAgriSelect]:first').prop('checked', 'checked');//공간검색>현재화면영역
			$(".spaceArea", "#bottomPopup").hide();

			//속성검색 초기화
			$('.groundwaterProperty select>option[value=""]').prop('selected', true);	
		}
		
	});

	// 검색영역지정 변경 (현재화면영역, 사용자정의)
	$("[name=underWaterAgriSelect]").on("change", function () {
		const node = $(this);
		const value = node.val();
		if (value == "extent") {
			$(".spaceArea", "#bottomPopup").hide();
			
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 초기화
			dtmap.on('select',spaceClickListener );	//레이어 선택 핸들러
			
		} else {
			
			$(".spaceArea", "#bottomPopup").show();
			$("[name=underWaterAgriAreaDrawing]:first", "#bottomPopup").trigger("click");
		}
	}); 
     	
     	
	// 사용자 정의 검색 조건
	$("[name=underWaterAgriAreaDrawing]", "#bottomPopup").on("click", function () {
		const node = $(this);
		const value = node.val();

		let type;
		switch (Number(value)) {
			case 1:
				type = 'Point';
				break;
			case 2:
				type = 'LineString';
				break;
			case 3:
				type = 'Box';
				break;
			case 4:
				type = 'Circle';
				break;
		}
		dtmap.off('select');
		dtmap.draw.active({type: type, once: true})
		//toastr.warning("that.searchDrawing(value);", "공간검색 사용자정의");
	});
		

    //경계로부터 버퍼 영역 지정
	$("#bufferCnt").on("change", function (event) {
		dtmap.draw.setBuffer(Number(this.value));
	});
		
</script>