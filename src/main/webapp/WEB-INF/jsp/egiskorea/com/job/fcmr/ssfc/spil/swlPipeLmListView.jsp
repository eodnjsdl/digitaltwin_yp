<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<!-- js -->
<script src="/js/egiskorea/com/job/fcmr/ssfc/spil/swlPipeLm.js"></script>

<script>
$(document).ready(function() {
	//console.log("swlPipeLmListView.jsp");	

	// 2D/3D 버튼 처리
	arrangeAddBtnMode();
	
	//이벤트 리스너 추가
	dtmap.on('select', onFacilitySelectEventListener);
	
	// 하수도관리 메뉴 - 이벤트
	var $container = $("#container");
    var $target = $container.find('#bottomPopup .facility-select');
	
	$target.on('change', function() {
		getSewerSupplyFacility(this.value);
	});

	// 초기화 버튼
	$(".popup-reset").unbind('click').bind('click',function(){
		$target.trigger("change");
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
		
		//등록, 상세, 수정 팝업 창 닫기
		if ($("#rightSubPopup").hasClass("opened")) {
			$("#rightSubPopup").removeClass("opened");
			$("#rightSubPopup").empty();
		}
		
		//공간정보 편집도구 닫기
		if($(".space-edit-tool").hasClass("opened")){
        	$(".space-edit-tool").removeClass("opened");
            $(".space-edit-tool").empty();
        }
	});

	//속성 검색, 공간 검색 탭 제어
	$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function() {
		$(this).each(function() {
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});
		
		if ($("li[data-tab=groundwaterProperty]").hasClass("on")) {	//속성검색 일때 공간 검색때 사용한 그리기 초기화
			dtmap.draw.dispose();	//그리기 포인트 삭제
			dtmap.draw.clear();		//그리기 초기화
		}
	});
	
	// 공간 검색 조회 버튼
	$(".facility-spatial-search", "#bottomPopup").on("click", function(e) {
		//console.log("공간검색 조회");
		
		const $parent = $(e.target).closest('.search-area');
		const type = $parent.find('input[name="rad-facility-area"]:checked').val();
		
		if (type === 'extent') {
			FACILITY.spaceSearchOption.bbox = dtmap.getExtent();
		} else {
			if (dtmap.draw.source.getFeatures().length > 0) {
				FACILITY.spaceSearchOption.geometry = dtmap.draw.getGeometry();
			} else {
				alert("영역지정 안되었습니다");
				return false;
			}
		}
		selectSwlPipeLmList(1);
	});

	// 검색영역지정 변경 (현재화면영역, 사용자정의)
	$("[name=rad-facility-area]", "#bottomPopup").on("change", function() {
		const node = $(this);
		const value = node.val();

		if (value == "extent") {
			$(".space-facility-area", "#bottomPopup").hide();
			
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 초기화
		} else {
			$(".space-facility-area", "#bottomPopup").show();
			$("[name=rad-facility-drawing]:first", "#bottomPopup").trigger("click");
		}
	}); 

	// 사용자 정의 검색 조건
	$("[name=rad-facility-drawing]", "#bottomPopup").on("click", function() {
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

	//경계로부터 버퍼 영역 지정
	$(".area-facility-buffer", "#bottomPopup").on("keyup", function(event) {
		dtmap.draw.setBuffer(Number(this.value));
	});
});

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수관거 -->
<div class="popup-header">하수도관리</div>
<div class="popup-body">
    <div class="bottom-popup-body bottom-popup-group">
        <!-- 검색영역 -->
        <div class="items search-area">
            <div class="top-search">
                <select class="form-select facility-select">
                    <option value="swlConnLs">하수연결관</option>
                    <option value="swlDeptPs">하수관거심도</option>
                    <option value="swlDranPs">하수처리장</option>
                    <option value="swlManhPs">하수맨홀</option>
                    <option value="swlPipeAs">면형하수관거</option>
                    <option value="swlPipeLm" selected="selected">하수관거</option>
                    <option value="swlPumpPs">하수펌프장</option>
                    <option value="swlSideLs">측구</option>
                    <option value="swlSpewPs">토구</option>
                    <option value="swlSpotPs">물받이</option>
                    <option value="swlVentPs">환기구</option>
                </select>
            </div>
            <div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
                    <ul>
                        <li data-tab="groundwaterProperty" class="on">
                            <button type="button" class="inner-tab">속성검색</button>
                        </li>
                        <li data-tab="groundwaterSpace">
                            <button type="button" class="inner-tab">공간검색</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-cont groundwaterProperty on">
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
										<select name="hjd_cde" class="form-select">
											<option value="">전체</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">하수관용도</th>  
									<td>    
										<select name="sba_cde" class="form-select">
											<option value="">전체</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">관재질</th>  
									<td>    
										<select name="mop_cde" class="form-select">
											<option value="">전체</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">관경</th>  
									<td>    
										<input type="number" name="std_dip_min" class="form-control" value="" step="50" style="width:68px">    
										<input type="number" name="std_dip_max" class="form-control" value="" step="50" onkeypress="if( event.keyCode == 13 ){ selectSwlPipeLmList(1);}" style="width:68px">  
									</td>
								</tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search facility-attribute-search" onclick="selectSwlPipeLmList(1)">조회</button>
                        </div>
                    </div>
                </div>
                <div class="tab-cont groundwaterSpace">
                    <div class="space-search-group">
                        <div class="space-search-items">
							<span class="form-radio text group">
								<span>
									<input type="radio" name="rad-facility-area" id="rad-facility-area-extent" value="extent" checked="checked">
									<label for="rad-facility-area-extent">현재화면영역</label>
								</span>
								<span>
									<input type="radio" name="rad-facility-area" id="rad-facility-area-custom" value="custom">
									<label for="rad-facility-area-custom">사용자 정의</label>
								</span>
							</span>
                        </div>
                        <div class="space-search-items space-facility-area" style="display:none;">
							<span class="drawing-obj small">
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point" value="1" checked="checked">
									<label for="rad-facility-drawing-point" class="obj-sm01"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-linestring" value="2">
									<label for="rad-facility-drawing-linestring" class="obj-sm02"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-box" value="3">
									<label for="rad-facility-drawing-box" class="obj-sm03"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-circle" value="4">
									<label for="rad-facility-drawing-circle" class="obj-sm04"></label>
								</span>
							</span>
                        </div>
                        <div class="space-search-items space-facility-area" style="display:none;">
                        	경계로부터 
                        	<span class="form-group">
                        		<input type="text" class="form-control align-center area-facility-buffer" placeholder="0" value="0"><sub>m</sub>
                        	</span>
                        	이내 범위
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search facility-spatial-search">조회</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- //검색영역 -->
        <div class="items data-area">
            <div class="bbs-top">
                <div class="bbs-list-num">조회결과 : --건</div>
                <div>
                    <button type="button" class="btn basic bi-write btn_add" onclick="insertSwlPipeLmView();">등록</button>
                    <button type="button" class="btn basic bi-excel btn_excel" onclick="swlPipeLmExcel();">엑셀저장</button>
                </div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">
                    <div id="baseGridDiv" style="height:inherit; display: flex;flex-direction: column;">
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                        <div data-ax5grid="attr-grid-excel" style="diplay:none;"></div>
                        <input type="hidden" class="hiddenPage" value="1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('하수관거')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<button type="button" class="popup-reset" title="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수관거 end -->