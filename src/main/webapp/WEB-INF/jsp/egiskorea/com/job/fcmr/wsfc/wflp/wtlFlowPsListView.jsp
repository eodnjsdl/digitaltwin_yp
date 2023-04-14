<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<!-- js -->
<script src="/js/egiskorea/com/job/fcmr/wsfc/wflp/wtlFlowPs.js"></script>			<!-- 유량계 -->

<!-- 업무 > 공통 -->
<div class="popup-header">상수도관리</div>
<div class="popup-body">
    <div class="bottom-popup-body bottom-popup-group">
        <!-- 검색영역 -->
        <div class="items search-area">
            <div class="top-search">
                <select class="form-select facility-select">
                    <option value="wtlFirePs">소방시설</option>
                    <option value="wtlPipeLm">상수관로</option>
                    <option value="wtlFlowPs" selected="selected">유량계</option>
                    <option value="wtlManhPs">상수맨홀</option>
                    <option value="wtlPipePs">상수관로심도</option>
                    <option value="wtlPrgaPs">수압계</option>
                    <option value="wtlServPs">배수지</option>
                    <option value="wtlSplyLs">급수관로</option>
                    <option value="wtlServPs">변류시설</option>
                </select>
            </div>
            <div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
                    <ul>
                        <li data-tab="groundwaterProperty" class="on">
                            <button type="button" class="inner-tab">속성검색</button>
                        </li>
                        <li data-tab="groundwaterSpace" id="srchSpace">
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
											<option value="">선택</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">유량계종류</th>  
									<td>    
										<select name="gag_cde" class="form-select">
											<option value="">선택</option>
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">유량계형식</th>  
									<td>    
										<select name="mof_cde" class="form-select">
											<option value="">선택</option>
										</select> 
									</td>
								</tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search facility-attribute-search" onclick="selectWtlFlowPsList(1)">조회</button>
                        </div>
                    </div>
                </div>
                <div class="tab-cont groundwaterSpace">
                    <div class="space-search-group">
                        <div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="rad-facility-area" id="rad-facility-area-extent"
                                             value="extent" checked="checked"><label for="rad-facility-area-extent">현재화면영역</label></span>
								<span><input type="radio" name="rad-facility-area" id="rad-facility-area-custom"
                                             value="custom"><label for="rad-facility-area-custom">사용자 정의</label></span>
							</span>
                        </div>
                        <div class="space-search-items space-facility-area" style="display:none;">
							<span class="drawing-obj small">
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point"
                                             value="1" checked="checked"><label for="rad-facility-drawing-point"
                                                                                class="obj-sm01"></label></span>
								<span><input type="radio" name="rad-facility-drawing"
                                             id="rad-facility-drawing-linestring" value="2"><label
                                        for="rad-facility-drawing-linestring" class="obj-sm02"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-box"
                                             value="3"><label for="rad-facility-drawing-box"
                                                              class="obj-sm03"></label></span>
								<span><input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-circle"
                                             value="4"><label for="rad-facility-drawing-circle"
                                                              class="obj-sm04"></label></span>
							</span>
                        </div>
                        <div class="space-search-items">
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
                    <button type="button" class="btn basic bi-write btn_add" onclick="insertWtlFlowPsView();">등록</button>
                    <button type="button" class="btn basic bi-excel btn_excel" onclick="fn_downloadExcel();">엑셀저장
                    </button>
                </div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">

                    <div id="baseGridDiv" style="height:inherit; display: flex;flex-direction: column">
                        <!-- <div style="display: inline-block">
                            <label>농업용공공관정</label>
                        </div> -->
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                    </div>
                </div>
                <!-- <div class="pagination">
                </div> -->
            </div>
            <input type="hidden" id="wtlFlowPsListPage" 	value="">
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('상수도시설')"></button>
<button type="button" class="popup-close"
        onClick="toastr.warning('removeLayer(); cmmUtil.drawClear();', 'onclick 이벤트');" title="닫기"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 시설물 공통 -->
<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		//console.log("wtlFlowPsListView.jsp");	
		
		//////////////////
		//하위메뉴 select box
		
		//상수도 관리 메뉴 - 이벤트
		var $container = $("#container");
	    var $target = $container.find('#bottomPopup .facility-select');
		
		$target.on('change', function() {
			getWaterSupplyFacility(this.value);
		});
		
		///////////
		//관리 상위 버튼
		
		// 접기/펼치기
        $(".popup-bottom-toggle", "#bottomPopup").on("click", function () {
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
		
		//리셋
		$(".popup-reset").unbind('click').bind('click',function(){
			$target.trigger("change"); 
		});
		
		//닫기
		$(".popup-close").unbind('click').bind('click',function(){
			//등록, 상세, 수정 팝업 창 닫기
			if($("#rightSubPopup").hasClass("opened")){
				$("#rightSubPopup").removeClass("opened");
				$("#rightSubPopup").empty();
			}
		});
		
		
		/////////////////////
     	
     	// 공간 검색
        $(".facility-spatial-search", "#bottomPopup").on("click", function (e) {
            // that.searchArea();
            const $parent = $(e.target).closest('.search-area');
            const type = $parent.find('input[name="rad-facility-area"]:checked').val();

            const param = {
                typeNames: "wtl_flow_ps",
            }
            if (type === 'extent') {
                param.bbox = dtmap.getExtent();
            } else {
                param.geometry = dtmap.draw.getGeometry()
            }

            dtmap.wfsGetFeature(param).then(function (e) {
                dtmap.vector.clear();
                dtmap.vector.readGeoJson(e);
            })

        });
     	
     	
     	// 검색영역지정 변경 (현재화면영역, 사용자정의)
        $("[name=rad-facility-area]", "#bottomPopup").on("change", function () {
            const node = $(this);
            const value = node.val();
            if (value == "extent") {
                $(".space-facility-area", "#bottomPopup").hide();
            } else {
                $(".space-facility-area", "#bottomPopup").show();
                $("[name=rad-facility-drawing]:first", "#bottomPopup").trigger("click");
            }
        }); 
     	
     	
     	// 사용자 정의 검색 조건
        $("[name=rad-facility-drawing]", "#bottomPopup").on("click", function () {
            const node = $(this);
            const value = node.val();
            // that.searchDrawing(value);

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
            toastr.warning("that.searchDrawing(value);", "공간검색 사용자정의");
        });
		
     	
        $(".area-facility-buffer", "#bottomPopup").on("keyup", function (event) {
            // if (event.keyCode == "13") {
            //     $(".facility-spatial-search", that.container).trigger("click");
            // }

            dtmap.draw.setBuffer(Number(this.value))
        });
        
		
	});

	//functions
</script>