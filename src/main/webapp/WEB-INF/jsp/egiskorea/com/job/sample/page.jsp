<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<script>

	function fn_sampleAjax() {
		//sample ajax
		var searchCnd = $('#searchCnd').val();
		var searchWrd = $('#searchWrd').val();
		$.ajax({
			type : "POST",
			url : "/com/noti/selectNoticeList.do",
			dataType : "html",
			data : {
				searchCnd : searchCnd,
				searchWrd :	searchWrd,
				pageIndex : 1
			},
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					$(".bbs-list-body").html(returnData);
				}else{
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				}
			}, complete : function(){
				toastr.success("selectNoticeList.do", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
			}
		});
	}

	function fn_insert() {
		toastr.warning("등록팝업", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
		ui.openPopup("rightSubPopup");
		var container = "#rightSubPopup";
		$(container).load("/job/sample/pageInsert.do", function() {
			toastr.success("/job/sample/pageInsert.do.", "상세 페이지🙂호🙂출🙂");
			$(".scroll-y").mCustomScrollbar({
				scrollbarPosition: "outside",
			});
		});
	}

	function fn_downloadExcel() {
		toastr.error("엑셀다운로드", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
	}

	function fn_pageDetail() {
		toastr.warning("상세팝업 + 상세정보 표출", "🙂 Ajax 🙂 호 🙂 출 🙂 ");
		ui.openPopup("rightSubPopup");
		var container = "#rightSubPopup";
		$(container).load("/job/sample/pageDetail.do", function() {
			toastr.success("/job/sample/pageDetail.do.", "상세 페이지🙂호🙂출🙂");
			$(".scroll-y").mCustomScrollbar({
				scrollbarPosition: "outside",
			});
		});
	}

</script>
<!-- 업무 > 공통 -->
<div class="popup-header">샘플 상세보기</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select class="form-select facility-select">
					<option value="1">샘플대장1</option>
					<option value="2">샘플대장2</option>
				</select>
			</div>
			<div class="tabBoxDepth2-wrap">
				<div class="tabBoxDepth2">
					<ul>
						<li data-tab="groundwaterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
						<li data-tab="groundwaterSpace" id="srchSpace"><button type="button" class="inner-tab">공간검색</button></li>
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
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search facility-attribute-search">조회</button></div>
					</div>
				</div>
				<div class="tab-cont groundwaterSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="rad-facility-area" id="rad-facility-area-extent" value="extent" checked="checked"><label for="rad-facility-area-extent">현재화면영역</label></span>
								<span><input type="radio" name="rad-facility-area" id="rad-facility-area-custom" value="custom"><label for="rad-facility-area-custom">사용자 정의</label></span>
							</span>
						</div>
						<div class="space-search-items space-facility-area" style="display:none;">
							<span class="drawing-obj small">
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point" value="1" checked="checked"><label for="rad-facility-drawing-point" class="obj-sm01"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-linestring" value="2"><label for="rad-facility-drawing-linestring" class="obj-sm02"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-box" value="3"><label for="rad-facility-drawing-box" class="obj-sm03"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-circle" value="4"><label for="rad-facility-drawing-circle" class="obj-sm04"></label></span>
							</span>
						</div>
						<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center area-facility-buffer" placeholder="0" value="0"> <sub>m</sub></span> 이내 범위</div>
					</div>
					<div class="btn-wrap">
						<div><button type="button" class="btn type01 search facility-spatial-search">조회</button></div>
					</div>
				</div>
			</div>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong><%-- <c:out value="${resultCnt}"></c:out> --%></strong>건</div>
				<div>
					<button type="button" class="btn basic" onclick="fn_pageDetail();">상세보기</button>
					<button type="button" class="btn basic" onclick="fn_sampleAjax();">Ajax</button>
					<button type="button" class="btn basic bi-write btn_add" onclick="fn_insert();">등록</button>
					<button type="button" class="btn basic bi-excel btn_excel" onclick="fn_downloadExcel();">엑셀저장</button>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div class="bbs-list-head">
						<table class="bbs-list">
							<thead>
							<tr>
							</tr>
							</thead>
						</table>
					</div>
					<div class="scroll-y bbs-list-body">
						<table class="bbs-list">
							<tbody>
							</tbody>
						</table>
					</div>
				</div>

				<div class="pagination">
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('상수도시설')"></button>
<button type="button" class="popup-close" onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');" title="닫기"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 시설물 공통 -->