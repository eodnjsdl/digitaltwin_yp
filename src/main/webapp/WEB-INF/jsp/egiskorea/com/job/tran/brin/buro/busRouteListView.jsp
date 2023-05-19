<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- js -->
<script src="/js/egiskorea/com/job/tran/brin/buro/busRoute.js"></script>	<!-- 버스 노선 -->
<script src="/js/egiskorea/com/job/tran/trafficAnalysisCommon.js"></script> <!-- 교통분석  공통 -->
<script>

$(document).ready(function() {
	//console.log("busRouteListView.jsp");
	
	// 이벤트 리스너 추가
	dtmap.on('select', onBusSelectEventListener);
			
	// 속성검색 조회 기능
	searchBusRouteFilters();
	
	// 버스노선정보 메뉴 이벤트
	var $container = $("#container");
	var $target = $container.find('#bottomPopup .info-select');
	$target.on('change', function() {
		dtmap.draw.dispose();	// 그리기 포인트 삭제
		dtmap.draw.clear();		// 그리기 초기화
		dtmap.draw.setBuffer(0);
		
		getBusRouteInformation(this.value);
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
	
	// 초기화
	$(".popup-reset").unbind('click').bind('click',function() {
		$target.trigger("change");
	});
	
	// 닫기
	$(".popup-close").unbind('click').bind('click',function() {
		// 등록, 상세, 수정 팝업 창 닫기
		if ($("#rightSubPopup").hasClass("opened")) {
			$("#rightSubPopup").removeClass("opened");
			$("#rightSubPopup").empty();
		}
		
		clearMap();		// 지도 clear
	});
	
	// 속성 검색, 공간 검색 탭 제어
	$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function() {
		$(this).each(function() {
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});
		
		if ($("li[data-tab=busRouteInfoProperty]").hasClass("on")) {
			// 속성검색 일때 공간 검색때 사용한 그리기 초기화
			dtmap.draw.dispose();	// 그리기 포인트 삭제
			dtmap.draw.clear();		// 그리기 초기화
		} else if ($("li[data-tab=busRouteInfoSpace]").hasClass("on")) {
			$("#rad-info-area-extent").trigger("click");	// 현재화면영역 클릭
		}
	});
	
	// 공간 검색 조회 버튼
	$(".info-spatial-search", "#bottomPopup").on("click", function(e) {
		const $parent = $(e.target).closest('.search-area');
		const type = $parent.find('input[name="rad-info-area"]:checked').val();
		
		if (type === 'extent') {
			FACILITY.spaceSearchOption.bbox = dtmap.getExtent();
		} else {
			if (dtmap.mod == "2D") {
				if (dtmap.draw.source.getFeatures().length > 0) {	// 임시로 그려진 형태체크
					FACILITY.spaceSearchOption.geometry = dtmap.draw.getGeometry();
				} else {
					alert("영역지정 안되었습니다");
					return false;
				}
			} else if (dtmap.mod == "3D") {		
				FACILITY.spaceSearchOption.geometry = dtmap.draw.getGeometry();
			}
		}
		selectBusRouteList(1);
	});

	// 검색영역지정 변경 (현재화면영역, 사용자정의)
	$("[name=rad-info-area]", "#bottomPopup").on("change", function() {
		const node = $(this);
		const value = node.val();
		
		if (value == "extent") {
			$(".space-info-area", "#bottomPopup").hide();
			
			dtmap.draw.dispose();		// 그리기 포인트 삭제
			dtmap.draw.clear();			// 그리기 초기화
		} else {
			$(".space-info-area", "#bottomPopup").show();
			$("[name=rad-info-drawing]:first", "#bottomPopup").trigger("click");
			$(".area-info-buffer").val(0);	// 경계 범위 초기화
		}
	});

	// 사용자 정의 검색 조건
	$("[name=rad-info-drawing]", "#bottomPopup").on("click", function() {
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
		dtmap.draw.active({type: type, once: true});
	});

	// 경계로부터 버퍼 영역 지정
	$(".area-info-buffer", "#bottomPopup").on("keyup", function(event) {
		dtmap.draw.setBuffer(Number(this.value));
	});
})

</script>

<!-- 업무 > 교통분석 > 버스노선정보 > 버스노선 -->
<div class="popup-header">버스노선정보</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select class="form-select info-select">
					<option value="busRoute" selected="selected">버스노선</option>
					<option value="busSttn">버스정류소</option>
				</select>
			</div>
			<div class="tabBoxDepth2-wrap">
				<div class="tabBoxDepth2">
					<ul>
						<li data-tab="busRouteInfoProperty" class="on">
							<button type="button" class="inner-tab">속성검색</button>
						</li>
						<li data-tab="busRouteInfoSpace">
							<button type="button" class="inner-tab">공간검색</button>
						</li>
					</ul>
				</div>
				<div class="tab-cont busRouteInfoProperty on">
					<div class="srch-default">
						<table class="srch-tbl">
							<colgroup>
								<col style="width: 30%;">
								<col style="width: auto;">
							</colgroup>
							<tbody id="lSrchOptions">
								<tr>  
									<th scope="row">읍면동</th>
									<td>
										<select name="emdKorNm" class="form-select">
											<option value="41830">전체</option>
										</select>
									</td>
								</tr>
								<tr>  
									<th scope="row">노선유형</th>
									<td>
										<select name="route_ty" class="form-select">
											<option value="">전체</option>
										</select>
									</td>
								</tr>
								<tr>  
									<td colspan="2">
										<input type="text" name="route_id" class="form-control" value="" placeholder="노선아이디">
									</td>
								</tr>
								<tr>  
									<td colspan="2">
										<input type="text" name="route_nm" class="form-control" value="" placeholder="노선번호">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div>
							<button type="button" class="btn type01 search info-attribute-search">조회</button>
						</div>
					</div>
				</div>
				<div class="tab-cont busRouteInfoSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span>
									<input type="radio" name="rad-info-area" id="rad-info-area-extent" value="extent" checked="checked">
									<label for="rad-info-area-extent">현재화면영역</label>
								</span>
								<span>
									<input type="radio" name="rad-info-area" id="rad-info-area-custom" value="custom">
									<label for="rad-info-area-custom">사용자 정의</label>
								</span>
							</span>
						</div>
						<div class="space-search-items space-info-area" style="display:none;">
							<span class="drawing-obj small">
								<span>
									<input type="radio" name="rad-info-drawing" id="rad-info-drawing-point" value="1" checked="checked">
									<label for="rad-info-drawing-point" class="obj-sm01"></label>
								</span>
								<span>
									<input type="radio" name="rad-info-drawing" id="rad-info-drawing-linestring" value="2">
									<label for="rad-info-drawing-linestring" class="obj-sm02"></label>
								</span>
								<span>
									<input type="radio" name="rad-info-drawing" id="rad-info-drawing-box" value="3">
									<label for="rad-info-drawing-box" class="obj-sm03"></label>
								</span>
								<span>
									<input type="radio" name="rad-info-drawing" id="rad-info-drawing-circle" value="4">
									<label for="rad-info-drawing-circle" class="obj-sm04"></label>
								</span>
							</span>
						</div>
						<div class="space-search-items space-info-area" style="display:none;">
							경계로부터 
							<span class="form-group">
								<input type="text" class="form-control align-center area-info-buffer" placeholder="0" value="0"><sub>m</sub>
							</span>
							이내 범위
						</div>
					</div>
					<div class="btn-wrap">
						<div>
							<button type="button" class="btn type01 search info-spatial-search">조회</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 데이터영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과: --건</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;">	<!-- pagination 하단 고정을 위해 반드시 필요 -->
				<div class="bbs-default">
					<div id="baseGridDiv" style="height: inherit; display: flex; flex-direction: column;">
						<div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1;"></div>
						<input type="hidden" class="hiddenPage" value="1" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="popup-close" title="닫기"></button>
<button type="button" class="popup-reset" title="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 교통분석 > 버스노선정보 > 버스노선 end -->