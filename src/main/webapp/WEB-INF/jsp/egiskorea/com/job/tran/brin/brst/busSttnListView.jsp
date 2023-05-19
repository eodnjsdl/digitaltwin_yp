<%@ page language="java" contentType="text/html; charset=UTF-8" %>

<!-- js -->
<script src="/js/egiskorea/com/job/tran/brin/brst/busSttn.js"></script>			<!-- 버스정류소  -->

<!-- 업무 > 공통 -->
<div class="popup-header">버스노선정보</div>
<div class="popup-body">
    <div class="bottom-popup-body bottom-popup-group">
        <!-- 검색영역 -->
        <div class="items search-area">
            <div class="top-search">
                <select class="form-select trafficAnalysis-select">
                    <option value="busRoute">버스노선</option>
                    <option value="busSttn" selected="selected">버스정류소</option>
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
										<select name="emdKorNm" class="form-select">
											<option value="41830">전체</option>
<!-- 											<option value="지평면">지평면</option>
											<option value="용문면">용문면</option>
											<option value="개군면">개군면</option>
											<option value="단월면">단월면</option>
											<option value="청운면">청운면</option>
											<option value="양동면">양동면</option>
											<option value="양평읍">양평읍</option>
											<option value="강상면">강상면</option>
											<option value="강하면">강하면</option>
											<option value="양서면">양서면</option>
											<option value="옥천면">옥천면</option>
											<option value="서종면">서종면</option> -->
										</select>  
									</td>
								</tr>
								<tr>  
									<th scope="row">정류소명</th>  
									<td>    
										<input type="text" name="sttn_nm" class="form-control" value="">    
									</td>
								</tr>
								<tr>  
									<th scope="row">정류소번호</th>  
									<td>    
										<input type="number" step="1" name="sttn_no" class="form-control" value="">    
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
                <div class="tab-cont groundwaterSpace">
                    <div class="space-search-group">
                        <div class="space-search-items">
							<span class="form-radio text group">
								<span><input type="radio" name="rad-trafficAnalysis-area" id="rad-trafficAnalysis-area-extent"
                                             value="extent" checked="checked"><label for="rad-trafficAnalysis-area-extent">현재화면영역</label></span>
								<span><input type="radio" name="rad-trafficAnalysis-area" id="rad-trafficAnalysis-area-custom"
                                             value="custom"><label for="rad-trafficAnalysis-area-custom">사용자 정의</label></span>
							</span>
                        </div>
                        <div class="space-search-items space-trafficAnalysis-area" style="display:none;">
							<span class="drawing-obj small">
								<span><input type="radio" name="rad-trafficAnalysis-drawing" id="rad-trafficAnalysis-drawing-point"
                                             value="1" checked="checked"><label for="rad-trafficAnalysis-drawing-point"
                                                                                class="obj-sm01"></label></span>
								<span><input type="radio" name="rad-trafficAnalysis-drawing"
                                             id="rad-trafficAnalysis-drawing-linestring" value="2"><label
                                        for="rad-trafficAnalysis-drawing-linestring" class="obj-sm02"></label></span>
								<span><input type="radio" name="rad-trafficAnalysis-drawing" id="rad-trafficAnalysis-drawing-box"
                                             value="3"><label for="rad-trafficAnalysis-drawing-box"
                                                              class="obj-sm03"></label></span>
								<span><input type="radio" name="rad-trafficAnalysis-drawing" id="rad-trafficAnalysis-drawing-circle"
                                             value="4"><label for="rad-trafficAnalysis-drawing-circle"
                                                              class="obj-sm04"></label></span>
							</span>
                        </div>
                        <div class="space-search-items">
                        	경계로부터 
                        	<span class="form-group">
                        		<input type="text" class="form-control align-center area-trafficAnalysis-buffer" placeholder="0" value="0"><sub>m</sub>
                        	</span>
                        	이내 범위
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search trafficAnalysis-spatial-search">조회</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- //검색영역 -->
        <div class="items data-area">
        	<div class="bbs-top">
                <div class="bbs-list-num">조회결과 : --건</div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                <div class="bbs-default">
                    <div id="baseGridDiv" style="height:inherit; display: flex;flex-direction: column">
                        <div id="gridax5" data-ax5grid="attr-grid" data-ax5grid-config="{}" style="flex: 1"></div>
                        <div data-ax5grid="attr-grid-excel" style="diplay:none;"></div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="tgdBusSttnInfoListPage" 	value="">
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('공간분석')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<button type="button" class="popup-reset" title="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>
<!-- //업무 > 시설물 공통 -->
<script type="text/javascript">
	//jqeury
	$(document).ready(function(){
		 
		//이벤트 리스너 추가
		dtmap.on('select', onTrficAnalsSelectEventListener);
		
		initBusSttn();	//초기화
		
		// 속성검색 조회 기능
		searchBusSttnFilters(); 
		
		//버스노선정보 메뉴 - 이벤트
		var $container = $("#container");
	    var $target = $container.find('#bottomPopup .trafficAnalysis-select');
		
		$target.on('change', function() {
			dtmap.draw.clear();
			dtmap.draw.setBuffer(0);
			getBusRouteInformation(this.value);
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
			
			//공간정보 편집도구 닫기
			if($(".space-edit-tool").hasClass("opened")){
            	$(".space-edit-tool").removeClass("opened");
                $(".space-edit-tool").empty();
            }
			
			clearMap();		//지도 클리어
		});
		
		
		/////////////////////
		
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
        $(".trafficAnalysis-spatial-search", "#bottomPopup").on("click", function (e) {
           	console.log("공간검색 조회");
			
           	const $parent = $(e.target).closest('.search-area');
            const type = $parent.find('input[name="rad-trafficAnalysis-area"]:checked').val();
            
            if (type === 'extent') {
            	TRFICANALS.spaceSearchOption.bbox 	= dtmap.getExtent();
            } else {
            	//console.log("모드>>>"+dtmap.mod);
            	if(dtmap.mod == "2D"){
            		if(dtmap.draw.source.getFeatures().length > 0){	//임시로 그려진 형태체크
            			TRFICANALS.spaceSearchOption.geometry = dtmap.draw.getGeometry();
                	}else{
                		alert("영역지정 안되었습니다");
                		return false;
                	}
            	}else if(dtmap.mod == "3D"){		
            		TRFICANALS.spaceSearchOption.geometry = dtmap.draw.getGeometry();
            	}
            	
            }
           	
            selectBusSttnList(1);

        });
     	
     	
     	// 검색영역지정 변경 (현재화면영역, 사용자정의)
        $("[name=rad-trafficAnalysis-area]", "#bottomPopup").on("change", function () {
            const node = $(this);
            const value = node.val();
            if (value == "extent") {
                $(".space-trafficAnalysis-area", "#bottomPopup").hide();
                
                //그리기, 그려진 것 초기화
                dtmap.draw.dispose();
                dtmap.draw.clear();
                
            } else {
                $(".space-trafficAnalysis-area", "#bottomPopup").show();
                $("[name=rad-trafficAnalysis-drawing]:first", "#bottomPopup").trigger("click");
            }
        }); 
     	
     	
     	// 사용자 정의 검색 조건
        $("[name=rad-trafficAnalysis-drawing]", "#bottomPopup").on("click", function () {
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
        $(".area-trafficAnalysis-buffer", "#bottomPopup").on("keyup", function (event) {
            dtmap.draw.setBuffer(Number(this.value));
        });
		
	});

	//functions
</script>