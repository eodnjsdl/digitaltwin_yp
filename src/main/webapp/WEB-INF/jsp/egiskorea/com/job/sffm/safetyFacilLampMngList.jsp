<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/map-ui.js"></script>
<script src="/js/egiskorea/com/job/sffm//lamp/lamp.js"></script>
<script src="/js/egiskorea/com/job/sffm/sffm.js"></script>
<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>
<script>
$(document).ready(function() {
	ui.callDatePicker();
});
</script>
<!-- 업무 > 공간정보활용 > 안전시설물관리 -->
<form:form name="selectSffmLampFacilExcelList" id="searchForm" method="post" onsubmit="fn_select_list(); return false;">
<!-- <div class="popup-panel popup-bottom work-01-03" style="left: 320px;width: 1600px;height: 378px;"> -->	
<div class="popup-header">안전시설물관리</div>
<div class="popup-body">
	<div class="bottom-popup-group">
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select id="safeFacilityType" class="form-select">
					<option value="lamp">가로등관리</option>
					<option value="cctv">CCTV관리</option>
				</select>
			</div>
			
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
									<td><div class="datapicker-group"><input type="text" id="sffm-search-instl-de" name="searchInstlDe" class="datepicker" value="" autocomplete="off" onkeypress="if( event.keyCode == 13 ){ fn_search_sffm_list(''); }"></div></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="sffm-search-adres" name="searchAdres" onkeypress="if( event.keyCode == 13 ){ fn_search_sffm_list(''); }" placeholder="주소"></td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="sffm-search-manage-no" name="searchManageNo" onkeypress="if( event.keyCode == 13 ){ fn_search_sffm_list(''); }" placeholder="관리번호"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onclick="fn_search_List(); setData();">조회</button></div>
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
						<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="number" id="sffmBuffer" name="sffmBuffer" class="form-control align-center" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0" placeholder="0" onkeypress="if( event.keyCode == 13 ){ SFFM.fn_select_sffm_list('spital'); }"> <sub>m</sub></span> 이내 범위</div>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search" onclick="setData();">조회</button></div>
					</div>
				</div>
			</div>
			
		</div>
		<!-- //검색영역 -->
        <div class="items data-area">
            <div class="bbs-top">
                <div class="bbs-list-num">조회결과 : <strong></strong>건</strong></div>
                <div>
                    <div class="" style="margin-right: 25px; float: left;"><span class="form-checkbox" style="float: left; margin-right: 5px;"><span><input type="checkbox" name="" id="sffmCrimianlChkBox" onclick="getCriminalWMS();"><label for="sffmCrimianlChkBox"></label></span></span>영향권<span class="form-group">
						<input type="text" id="sffmBuffer2" style="width: 50px; margin-left: 5px;" maxlength="10" class="form-control align-center" value="0" onkeypress="if( event.keyCode == 13 ){ aj_selectSafetyFacilitiesMngList($('#searchForm')[0]); }"> 
						<sub>m</sub></span>
					</div>
					<button type="button" class="btn basic bi-write" onclick="fn_insert();">등록</button> 
					<button type="button" class="btn basic bi-excel" id="lampExcelDownload" data-form-name="selectSffmLampFacilExcelList">엑셀저장</button> 
					<!-- <a href="/job/sffm/sffmExcelDown.do"><button type="button" class="btn basic bi-excel">엑셀저장</button></a> -->
					<!-- <button type="button" class="btn basic bi-write" id="insertSafetyFacilLampMngView" >등록</button>  -->

                </div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="height: 267px;"></div>
                </div>
            </div>
        </div>

	</div>
</div>
</form:form>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('안전시설물관리')"></button>
<button type="button" class="popup-close" title="닫기" onClick="toastr.warning('SFFM.removeCmmPOI();', 'onclick 이벤트');"></button>
<button type="button" class="popup-reset" class="초기화" onclick="bottomPopupOpen('safetyFacilitiesManagement');"></button>
<button type="button" class="popup-bottom-toggle" onclick="toggleFold(this);" title="접기"></button>
<!-- //안전시설물관리 -->

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
		}
		
	});

	// 공간 검색 조회 버튼
	$(".facility-spatial-search", "#bottomPopup").on("click", function (e) {
		//console.log("공간검색 조회");
		
		const $parent = $(e.target).closest('.search-area');
		const type = $parent.find('input[name="rad-facility-area"]:checked').val();
		
		if (type === 'extent') {
			FACILITY.spaceSearchOption.bbox 	= dtmap.getExtent();
		} else {
			if(dtmap.draw.source.getFeatures().length > 0){
				FACILITY.spaceSearchOption.geometry = dtmap.draw.getGeometry();
			}else{
				alert("영역지정 안되었습니다");
				return false;
			}
		}

	});

	// 검색영역지정 변경 (현재화면영역, 사용자정의)
	$("[name=rad-facility-area]", "#bottomPopup").on("change", function () {
		const node = $(this);
		const value = node.val();
		if (value == "extent") {
			$(".space-facility-area", "#bottomPopup").hide();
			
			//그리기, 그려진 것 초기화
			dtmap.draw.dispose();
			dtmap.draw.clear();
			
		} else {
			$(".space-facility-area", "#bottomPopup").show();
			$("[name=rad-facility-drawing]:first", "#bottomPopup").trigger("click");
		}
	}); 
     	
     	
	// 사용자 정의 검색 조건
	$("[name=rad-facility-drawing]", "#bottomPopup").on("click", function () {
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
		dtmap.draw.active({type: type, once: true})
		//toastr.warning("that.searchDrawing(value);", "공간검색 사용자정의");
	});
		

     	//경계로부터 버퍼 영역 지정
	$(".area-facility-buffer", "#bottomPopup").on("keyup", function (event) {
		dtmap.draw.setBuffer(Number(this.value));
	});
		


</script>