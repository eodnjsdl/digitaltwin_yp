/**
 *  ################################################# 지하수개발 #################################################
 */
$(document).ready(function(){
});

// POILsyrt를 추가해준다.
function setPointLayer(){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		const format = new ol.format.GeoJSON();
		const features = [];
		poiList["resultList"].forEach((item) => {
			const feature = new ol.Feature(new ol.geom.Point([parseFloat(item["lon"]), parseFloat(item["lat"])]));
			feature.setId(item["gid"]);
			features.push(feature);
		});
		if(features.length > 0) {
			const geojson = format.writeFeatures(features)
			cmmUtil.highlightFeatures(geojson, "./images/poi/underWaterDevelop_poi.png", { notMove: true, onClick: function(feature) {
				$(`tr[name='uwDevelopDtl'][data-gid='${feature.getId()}']`).trigger('click');
			}});
		} else {
			cmmUtil.clearHighlight();
		}				
	}else{
		// POI 오브젝트를 추가 할 레이어 생성
		var layerList = new Module.JSLayerList(true);
		
		// 생성된어 있는 POI 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.PoiLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
			GLOBAL.LayerId.PoiLayerId = null;
			Module.XDRenderData();
		}
		// 생성되어있는 POLYGON 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.PolygonLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
			GLOBAL.LayerId.PolygonLayerId = null;
			Module.XDRenderData();
		}
		
		// POI 레이어 이름은 각 해당 테이블명
		GLOBAL.LayerId.PoiLayerId = "TGD_UGRWTR_DEVLOP";
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
		
		var BUFFER_POLYGON_RED = new Module.JSColor(100, 255, 0, 0);
		var BUFFER_POLYGON_BLUE = new Module.JSColor(100, 0, 0, 255);
		var color1 = new Module.JSColor(80, 51, 153, 204);
	    var color2 = new Module.JSColor(100, 51, 153, 204);
		
		var spitalSearch = $("spitalSearch").val();
	    // 버퍼
		if($("#spitalSearch").val() != '' && poiList.resultList[0] != undefined) {
			
			// 1번
			GLOBAL.LayerId.PolygonLayerId = "Ugdv_Polygon"
			var bufferPolygonLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
			if(bufferPolygonLayerCheck != null) {
				layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
				Module.XDRenderData(); 
			}
			
			bufferPolygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
			bufferPolygonLayer.setSelectable(false);
			
			var buffurAreaAsText = poiList.resultList[0].bufferArea.split("(")[2];
			bExtractionArray = buffurAreaAsText.split("))");
			bSecondExtArray = bExtractionArray[0].split(",");
			var polygonVertex = new Module.JSVec3Array();
			var arrayCnt = (bSecondExtArray.length-1);
			
			for(var j=0;j<arrayCnt;j++) {
				polygonVertex.push( new Module.JSVector3D(parseFloat(bSecondExtArray[j].split(" ")[0]), parseFloat(bSecondExtArray[j].split(" ")[1]), 15.0) );
			}
			
			let bufferPolygon = Module.createPolygon("POLYGON_"+i);
			
			// 폴리곤 색상 설정
			var bufferPolygonStyle = new Module.JSPolygonStyle();
			bufferPolygonStyle.setFill(true);
			bufferPolygonStyle.setFillColor(color1);
			bufferPolygonStyle.setOutLine(true);
			bufferPolygonStyle.setOutLineWidth(2.0);
			bufferPolygonStyle.setOutLineColor(color2);
			bufferPolygon.setStyle(bufferPolygonStyle);
			
			var part = new Module.Collection();
			part.add(arrayCnt)
			
			bufferPolygon.setPartCoordinates(polygonVertex, part);

			bufferPolygonLayer.addObject(bufferPolygon, 0);
			bufferPolygonLayer.setMaxDistance(GLOBAL.MaxDistance);
			
		}
		
		// POI 설정
		for(var i = 0; i < poiList.resultList.length; i++){
			var pointX = Number(poiList.resultList[i].lon); //x 좌표
			var pointY = Number(poiList.resultList[i].lat); //y 좌표
			var position = TransformCoordinate(pointX, pointY, 26, 13);
			
			var lonlon = poiList.resultList[i].lon;
			var latlat = poiList.resultList[i].lat;
			if(i == 0) {
				cmmUtil.setCameraMove(parseFloat(lonlon), parseFloat(latlat));
			}
			
			var options = {
					layer : GLOBAL.PoiLayer,
					lon : position.x,
					lat : position.y,
					text : poiList.resultList[i].prmisnSttemntNo,
					layerKey : poiList.resultList[i].gid,
					markerImage : "./images/poi/underWaterDevelop_poi.png", // 해당 마커 이미지 Url 
					lineColor : new Module.JSColor(0, 0, 255)
			}
			createLinePoi2(options);
		}	
	}
	// 마우스 상태 설정
	Module.XDSetMouseState(Module.MML_SELECT_POINT);
}	

//페이지네이션1
function fn_select_list(searchType){
	
	// if(!$('#mapType3D').prop("checked")) {
	// 	const yMap = app2D.getYMap();
	//
	// 	if($('#rChk1-2').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.groundwaterSpace').hasClass("on")) {
	// 		 alert("영역을 선택해주세요.");
	// 		 return;
	// 	}
	// }
	
	$("#rightSubPopup").removeClass("opened").html("");
	document.getElementById("searchForm").pageIndex.value = 1;
	if(searchType == 'attr') {
		// cmmUtil.drawClear();
		toastr.warning("cmmUtil.drawClear();", "지도 그리기 초기화");
		ugdvFlag = 'true';
		ugdvUi = 'false';
		$("#spitalSearch").val('');
		aj_selectUnderWaterDevelopList($("#searchForm")[0], searchType);
	} else {
		ugdvFlag = 'true';
		ugdvUi = 'true';
		$(".ugtmSrch").val('');
		
		var buffer = $("#bufferCnt").val();
		if(buffer && buffer > 0) {
			// const wkt = cmmUtil.getSelectFeatureWKT();
			toastr.warning("cmmUtil.getSelectFeatureWKT();", "1. 선택 그리기 공간객체 WKT 가져오기");
			// if(wkt) {
			// 	cmmUtil.showBufferGeometry(wkt, buffer);
			// }
			toastr.warning("cmmUtil.showBufferGeometry(wkt, buffer);", "2. 버퍼 공간 정보 표시");
		}
		aj_selectUnderWaterDevelopList($("#searchForm")[0], searchType);
	}
}
// 페이지네이션2
function fn_select_linkPage(pageNo){
	document.getElementById("searchForm").pageIndex.value = pageNo;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").allvlBsrckSeSearch.value = lastAllvlBsrckSeSearch;
	document.getElementById("searchForm").prposSeSearch.value = lastPrposSeSearch;
	document.getElementById("searchForm").detailPrposSeSearch.value = lastDetailPrposSeSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	ugdvFlag = 'false';
	aj_selectUnderWaterDevelopList($("#searchForm")[0], 'spital');
}

// 지하수개발 등록페이지 열기 버튼
$("#insertUnderWaterDevelopView").on("click", function(){
	openPopup("rightSubPopup");
	aj_insertUnderWaterDevelopView($("#tmpForm")[0], "", "right");

});

// 지하수개발 상세페이지 열기
$("tr[name='uwDevelopDtl']").unbind('click').bind('click',function(){
	//cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));
	// cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
	// cmmUtil.setPoiHighlight('TGD_UGRWTR_DEVLOP', $(this).data('gid')); //POI 아이콘 활성화

	openPopup("rightSubPopup");
	aj_selectUnderWaterDevelop($("#tmpForm")[0], $(this).data('gid'), "right");
});

//하이라이트
function ugdv_sethigh(gid){
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("TGD_UGRWTR_DEVLOP");
	
	if(layer.getObjectCount()!=0){
		for(var i = 0; i < layer.getObjectCount(); i++) {
			var point = layer.indexAtObject(i);
			
			if(point.getId() == gid){
				point.setHighlight(true);
			} else {
				point.setHighlight(false);
			}
		}
	}else{
		console.log("count is -")
	}
}

// 지하수개발 엑셀다운로드 버튼
$("#ugdvExcelDownload").on("click", function(){
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").allvlBsrckSeSearch.value = lastAllvlBsrckSeSearch;
	document.getElementById("searchForm").prposSeSearch.value = lastPrposSeSearch;
	document.getElementById("searchForm").detailPrposSeSearch.value = lastDetailPrposSeSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	let url = '/job/ugtm/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;');
	$("form[name='"+ formName + "']").attr('action', '');
});

//공간검색 radio버튼 change 이벤트1
$("input[name=underWaterDevelopAreaDrawing]").on('change',function(){
	var chk2 = $("input[name=underWaterDevelopAreaDrawing]:checked").val();
	cmmUtil.spitalDraw(chk2);
});

// 공간검색 radio버튼 change 이벤트2
$("input[name=underWaterDevelopSelect]").on('change',function(){
	var chk = $("input[name=underWaterDevelopSelect]:checked").val();
	var chk2 = $("input[name=underWaterDevelopAreaDrawing]:checked").val();
	if(chk != '1'){
		$(".spaceArea").show();
		cmmUtil.spitalDraw(chk2); 
	} else {
		$(".spaceArea").hide();
		cmmUtil.drawClear();
	}
});

// 지하수개발 등록페이지 열기
function aj_insertUnderWaterDevelopView(form, param1, param2){
	loadingBar("show");
	
	var formData = new FormData(form);
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/insertUnderWaterDevelopView.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#" + param2 + "SubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingBar("hide");
			setYear();
		}
	});
}

// 지하수개발 상세페이지 열기
function aj_selectUnderWaterDevelop(form, gid, param2){
	loadingBar("show");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	// cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	// if(!app2D){
	// 	ugdv_sethigh(gid);
	// }
	
	var formData = new FormData(form);
	if(gid != ''){
		formData.append('gid', gid);
		dtmap.poi.select(gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterDevelop.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#" + param2 + "SubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingBar("hide"); 
		}
	});
}

// 지하수개발 상세 > 수정페이지 열기
function aj_updateUnderWaterDevelopView(form, param1, param2){
	loadingBar("show");
	
	var formData = new FormData(form);
	if(param1 != ''){
		formData.append('gid', param1);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/updateUnderWaterDevelopView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#" + param2 + "SubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingBar("hide"); 
			setYear();
		}
	});
	
}
