<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
$(document).ready(function(){
    dtmap.draw.dispose();
	dtmap.draw.clear();

	//이벤트 리스너 추가 - 객체 선택
	dtmap.on('select', onSelectRailroadStationEventListener);
    
	// 교통시설 메뉴 - 이벤트
	var $container = $("#container");
    var $target = $container.find('#bottomPopup .facility-select');
	
	$target.on('change', function() {
		getTransportationFacility(this.value);
	});
	
	selectRlroadStWithFilters();
	
	//속성 검색, 공간 검색 탭 제어
	$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
		$(this).each(function(){
			$(this).parent().addClass("on").siblings().removeClass("on");
			$("."+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
		});
		
		if($("li[data-tab=railroadStationProperty]").hasClass("on")){	//속성검색 일때 공간 검색때 사용한 그리기 초기화
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 초기화
		}
	});
	
	// 공간 검색 조회 버튼
    $(".facility-spatial-search", "#bottomPopup").on("click", function (e) {
		
       	const $parent = $(e.target).closest('.search-area');
        const type = $parent.find('input[name="rad-facility-area"]:checked').val();
        
        console.log(type);
        
        if (type === 'extent') {
        	FACILITY.spaceSearchOption.bbox 	= dtmap.getExtent();
        } else {
        	//console.log("모드>>>"+dtmap.mod);
        	if(dtmap.mod == "2D"){
        		if(dtmap.draw.source.getFeatures().length > 0){	//임시로 그려진 형태체크
        			FACILITY.spaceSearchOption.geometry = dtmap.draw.getGeometry();
        		}else{
        			alert("영역지정 안되었습니다");
        			return false;
        		}
        	}else if(dtmap.mod == "3D"){		
        		FACILITY.spaceSearchOption.geometry = dtmap.draw.getGeometry();
        	}
        	
        }
        setRailroadStationListData(0);
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
        dtmap.draw.active({type: type, once: true});
    });

   	//경계로부터 버퍼 영역 지정
    $(".area-facility-buffer", "#bottomPopup").on("keyup", function (event) {
        dtmap.draw.setBuffer(Number(this.value));
    });
   	
 	// 엑셀 다운로드
    $('#downloadExcelRailroadStation').on('click', function () {
		downloadExcelRailroadStation();
	});
});
</script>

<!-- 업무 > 시설관리 > 교통시설 > 철도역사 -->
<div class="popup-header">교통시설</div>
<div class="popup-body trfc">
	<div class="bottom-popup-body bottom-popup-group">						
		<!-- 검색영역 -->
		<div class="items search-area">
			<div class="top-search">
				<select name="selectBoxTrfc" id="selectBoxTrfc" class="form-select facility-select">
					<option value="roadSection">도로구간</option>
					<option value="railroadTrack">철도선로</option>
					<option value="railroadStation" selected>철도역사</option>
					<option value="subwayTrack">지하철선로</option>
					<option value="subwayStation">지하철역사</option>
					<option value="bridge">교량</option>
					<option value="overpass">고가도로</option>
					<option value="tunnel">터널</option>
				</select>
			</div>
			<div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
					<ul>
						<li data-tab="railroadStationProperty" class="on">
							<button type="button" class="inner-tab">속성검색</button>
						</li>
						<li data-tab="railroadStationSpace">
							<button type="button" class="inner-tab">공간검색</button>
						</li>
					</ul>
				</div>
				<div class="tab-cont railroadStationProperty on rlroadSt">
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
										<select name="emdKorNm" id="emdKorNm" class="form-select">
											<option value="41830">전체</option>
											<c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
												<option value="<c:out value='${emdList.emdCd}' />" <c:if test="${searchVO.emdKorNm == emdList.emdCd}">selected</c:if>>
													<c:out value="${emdList.emdKorNm}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<td colspan="2"><input type="text" class="form-control" id="korStaNm" name="korStaNm" placeholder="철도역사명"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<div>
							<button type="submit" class="btn type01 search">조회</button>
						</div>
					</div>
				</div>
				<div class="tab-cont railroadStationSpace">
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
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point" value="1">
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
						<div class="space-search-items areaSrchTool">경계로부터
						 	<span class="form-group">
						 		<input type="text" onkeyup = "this.value=this.value.replace(/[^-0-9]/g,'');" class="form-control align-center" value="0" placeholder="0">
						 		<sub>m</sub>
					 		</span> 이내 범위
						</div>
					</div>
					<div class="btn-wrap">
						<div><button type="submit" class="btn type01 search facility-spatial-search">조회</button></div>
					</div>
				</div>
			</div>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
            <div class="bbs-top">
                <div class="bbs-list-num">조회결과 : <strong></strong>건</div>
                <div>
					<button type="button" class="btn basic bi-excel" id="downloadExcelRailroadStation">엑셀저장</button>
				</div>
            </div>
            <div class="bbs-list-wrap" style="height: 267px;">
                <div class="bbs-default">
                <form:form>
                	<div data-ax5grid="rlroadStListGrid" data-ax5grid-config="{}" style="height: 267px;"></div>
                	<div data-ax5grid="attr-grid-excel" style="display:none;"></div> 
                </form:form>
                </div>
            </div>
        </div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('교통시설')"></button>
<button type="button" class="popup-close" title="닫기" onclick="removeLayer()"></button>
<button type="button" class="popup-reset" class="초기화" onclick="getTransportationFacility('railRoadStation')"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- //업무 > 시설관리 > 교통시설 > 철도역사 -->