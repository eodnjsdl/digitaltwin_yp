$(document).ready(function(){
	callDatePicker();
	if(poiList != ""){
		// setPointLayer();
	}
});

//페이지네이션
function fn_select_list(searchType){
	
	if(!$('#mapType3D').prop("checked")) {
		const yMap = app2D.getYMap();
		
		if($('#rChk1-2').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.energySpace').hasClass("on")) {
			 // alert("영역을 선택해주세요.");
			toastr.warning("영역을 선택해주세요.");
			 return;
		}
	}
	
	$("#rightSubPopup").removeClass("opened").html("");
	document.getElementById("searchForm").pageIndex.value = 1;
	if(searchType == 'attr'){
		// cmmUtil.drawClear();
		rnenFlag = 'true';
		rnenUi = 'false';
		$("#spitalSearch").val('');
		aj_selectRenewableEnergyList($("#searchForm")[0], 'attr');
		
	} else {
		rnenFlag = 'true';
		rnenUi = 'true';
		$(".rnenSrch").val('');
		aj_selectRenewableEnergyList($("#searchForm")[0], 'spital');
		
		var buffer = $("#bufferCnt").val();
		if(buffer && buffer > 0) {
			// const wkt = cmmUtil.getSelectFeatureWKT();
			if(wkt) {
				// cmmUtil.showBufferGeometry(wkt, buffer);
			}
		}
	}
}

function fn_select_linkPage(pageNo){
	document.getElementById("searchForm").pageIndex.value = pageNo;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").bsnsSeSearch.value = lastBsnsSeSearch;
	document.getElementById("searchForm").prmisnVolmASearch.value = lastPrmisnVolmASearch;
	document.getElementById("searchForm").prmisnVolmBSearch.value = lastPrmisnVolmBSearch;
	document.getElementById("searchForm").elcpwstnNmSearch.value = lastElcpwstnNmSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	rnenFlag = 'false';
	aj_selectRenewableEnergyList($("#searchForm")[0], 'spital');
}

// 태양광발전소 등록페이지 열기 버튼 
function fn_select_regist(){
	openPopup("rightSubPopup");
	aj_insertRenewableEnergyView($("#tmpForm")[0], "", "right");
}

// 태양광발전소 상세페이지 열기
$("tr[name='energyDtl']").unbind('click').bind('click',function(){
	var gid = $(this).data('gid');
	//cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));
	// cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
	// cmmUtil.setPoiHighlight('TGD_ELCTY_BSNS_PRMISN', gid);
	// rightSubPopupOpen("selectRenewableEnergy", gid, "right");

	openPopup("rightSubPopup");
	aj_selectRenewableEnergy($("#tmpForm")[0], gid, "right");

});

// 하이라이트
function rnen_sethigh(gid){
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("TGD_ELCTY_BSNS_PRMISN");
	
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

// 신재생에너지 엑셀다운로드 버튼
$("#rnenExcelDownload").on("click", function(){
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").bsnsSeSearch.value = lastBsnsSeSearch;
	document.getElementById("searchForm").prmisnVolmASearch.value = lastPrmisnVolmASearch;
	document.getElementById("searchForm").prmisnVolmBSearch.value = lastPrmisnVolmBSearch;
	document.getElementById("searchForm").elcpwstnNmSearch.value = lastElcpwstnNmSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	let url = '/job/rnen/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;'); 
	$("form[name='"+ formName + "']").attr('action', '');
});

// '지도에서 선택' 버튼
$("#mapSelectBtn").unbind('click').bind('click',function(){
	// cmmUtil.getPositionGeom(positionCallback);
});

//geom 값 넣기
function positionCallback(pointGeom, address){
	$("#eqpLc").val("경기도 " + address);
	$("#geom").val(pointGeom);
}

// 공간검색 radio버튼 change 이벤트1
$("input[name=renewableEnergyAreaDrawing]").on('change',function(){
	var chk2 = $("input[name=renewableEnergyAreaDrawing]:checked").val();
	// cmmUtil.spitalDraw(chk2);
});

// 공간검색 radio버튼 change 이벤트2
$("input[name=renewableEnergySelect]").on('change',function(){
	var chk = $("input[name=renewableEnergySelect]:checked").val();
	var chk2 = $("input[name=renewableEnergyAreaDrawing]:checked").val();
	if(chk != '1'){
		//$("input[name=renewableEnergyAreaDrawing]").attr('disabled', false);
		$(".spaceArea").show();
		// cmmUtil.spitalDraw(chk2);
	} else {
		//$("input[name=renewableEnergyAreaDrawing]").attr('disabled', true);
		$(".spaceArea").hide();
		// cmmUtil.drawClear();
	}
});

// 속성검색 공간검색 탭박스 change 이벤트시 도형 지워주기
/*$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
	$(".rnenSrch").val('');
	cmmUtil.drawClear();
});*/

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
			cmmUtil.highlightFeatures(geojson, "./images/poi/renewableEnergy_poi.png", { notMove: true, onClick: function(feature) {
				$(`tr[name='energyDtl'][data-gid='${feature.getId()}']`).trigger('click');
			}});
		} else {
			cmmUtil.clearHighlight();
		}			
	}else{
		// POI 오브젝트를 추가 할 레이어 생성
		var layerList = new Module.JSLayerList(true);
		
		// 생성되어있는 POI 레이어가 있을때 지워주기
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
		GLOBAL.LayerId.PoiLayerId = "TGD_ELCTY_BSNS_PRMISN";
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
		
		var BUFFER_POLYGON_RED = new Module.JSColor(100, 255, 0, 0);
		var BUFFER_POLYGON_BLUE = new Module.JSColor(100, 0, 0, 255);
		var color1 = new Module.JSColor(80, 51, 153, 204);
	    var color2 = new Module.JSColor(100, 51, 153, 204);
		
		var spitalSearch = $("spitalSearch").val();
	    // 버퍼
		if($("#spitalSearch").val() != '' && poiList.resultList[0] != undefined) {
			
			// 1번
			GLOBAL.LayerId.PolygonLayerId = "Rnen_Polygon"
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
					text : poiList.resultList[i].elcpwstnNm,
					layerKey : poiList.resultList[i].gid,
					markerImage : "./images/poi/renewableEnergy_poi.png", // 해당 마커 이미지 Url 
					lineColor : new Module.JSColor(0, 0, 255)
			}
			createLinePoi2(options);
		}
		// 마우스 상태 설정
		Module.XDSetMouseState(Module.MML_SELECT_POINT);
	}
}	

/**
 *  ################################################# 태양광발전소 #################################################
 */

// 태양광발전소 등록하기 페이지 호출
function aj_insertRenewableEnergyView(form, param1, param2){
	loadingBar("show");
	
	var formData = new FormData(form);
	
	$.ajax({
		type : "POST",
		url : "/job/rnen/insertRenewableEnergyView.do",
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

// 태양광발전소 상세보기 페이지 호출
function aj_selectRenewableEnergy(form, gid, param2){
	loadingBar("show");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	// cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	// if(!app2D){
	// 	rnen_sethigh(gid);
	// }
	
	var formData = new FormData(form);
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/rnen/selectRenewableEnergy.do",
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

//태양광발전소 상세 > 수정페이지 열기
function aj_updateRenewableEnergyView(form, param1, param2){
	loadingBar("show");
	
	var formData = new FormData(form);
	if(param1 != ''){
		formData.append('gid', param1);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/rnen/updateRenewableEnergyView.do",
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

// 태양광발전소 수정페이지 취소버튼
$("#returnBack").unbind('click').bind('click',function(){
	// rightSubPopupOpen("selectRenewableEnergy", $(this).data('gid'), "right");

	openPopup("rightSubPopup");
	aj_selectRenewableEnergy($("#tmpForm")[0], $(this).data('gid'), "right");

});

function rnenInputKeyup() {
	if (event.keyCode == "13") {
	  fn_select_list('attr');
	}
}