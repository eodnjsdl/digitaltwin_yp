$(document).ready(function(){
	callDatePicker();
	if(poiList != ""){
		setPointLayer();
	}
});

//페이지네이션
function fn_select_list(searchType){
	
	if(!$('#mapType3D').prop("checked")) {
		const yMap = app2D.getYMap();
		
		if($('#rChk1-2').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.busiSpace').hasClass("on")) {
			 alert("영역을 선택해주세요.");
			 return;
		}
	}
	
	$("#rightSubPopup").removeClass("opened").html("");
	document.getElementById("searchForm").pageIndex.value = 1;
	if(searchType == 'attr'){
		cmmUtil.drawClear();
		ibbiFlag = 'true';
		ibbiUi = 'false';
		$("#spitalSearch").val('');
		aj_selectInBusinessEstaInfoList($("#searchForm")[0], searchType);
	} else {
		ibbiFlag = 'true';
		ibbiUi = 'true';
		$(".ibbiSrch").val('');
		
		var buffer = $("#bufferCnt").val();
		if(buffer && buffer > 0) {
			const wkt = cmmUtil.getSelectFeatureWKT();
			if(wkt) {
				cmmUtil.showBufferGeometry(wkt, buffer);
			}
		}
		aj_selectInBusinessEstaInfoList($("#searchForm")[0], searchType);
	}
}

function fn_select_linkPage(pageNo){
	document.getElementById("searchForm").pageIndex.value = pageNo;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").opnnSvcNmSearch.value = lastOpnnSvcNmSearch;
	document.getElementById("searchForm").bplcNmSearch.value = lastBplcNmSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	ibbiFlag = 'false';
	aj_selectInBusinessEstaInfoList($("#searchForm")[0], 'spital');
}

// 관내업소정보 상세페이지 열기
$("tr[name='inBusiDtl']").unbind('click').bind('click',function(){
	//cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));
	cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
	cmmUtil.setPoiHighlight('YP_BSSH_INFO', $(this).data('no'));
	rightSubPopupOpen("selectInBusinessEstaInfo", $(this).data('no'), "right");
})

// 하이라이트
function ibbi_sethigh(no){
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("YP_BSSH_INFO");
	
	if(layer.getObjectCount()!=0){
		for(var i = 0; i < layer.getObjectCount(); i++) {
			var point = layer.indexAtObject(i);
			
			if(point.getId() == no){
				point.setHighlight(true);
			} else {
				point.setHighlight(false);
			}
		}
	}else{
		console.log("count is -")
	}
}

// 공간검색 radio버튼 change 이벤트1
$("input[name=inBusinessEstaInfoAreaDrawing]").on('change',function(){
	var chk2 = $("input[name=inBusinessEstaInfoAreaDrawing]:checked").val();
	cmmUtil.spitalDraw(chk2);
});

// 공간검색 radio버튼 change 이벤트2
$("input[name=inBusinessEstaInfoSelect]").on('change',function(){
	var chk = $("input[name=inBusinessEstaInfoSelect]:checked").val();
	var chk2 = $("input[name=inBusinessEstaInfoAreaDrawing]:checked").val();
	if(chk != '1'){
		$(".spaceArea").show();
		cmmUtil.spitalDraw(chk2); 
	} else {
		$(".spaceArea").hide();
		cmmUtil.spitalDraw(chk2);
	}
});

// 속성검색 공간검색 탭박스 change 이벤트시 도형 지워주기
/*$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
	$(".ibbiSrch").val('');
	cmmUtil.drawClear();
});*/

// 관내업소정보 엑셀다운로드 버튼
$("#ibbiExcelDownload").on("click", function(){
	
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").opnnSvcNmSearch.value = lastOpnnSvcNmSearch;
	document.getElementById("searchForm").bplcNmSearch.value = lastBplcNmSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	let url = '/job/ibbi/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;'); 
	$("form[name='"+ formName + "']").attr('action', '');
});

// POILsyrt를 추가해준다.
function setPointLayer(){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		const format = new ol.format.GeoJSON();
		const features = [];
		poiList["resultList"].forEach((item) => {
			const feature = new ol.Feature(new ol.geom.Point([parseFloat(item["lonLon"]), parseFloat(item["latLat"])]));
			feature.setId(item["no"]);
			features.push(feature);
		});
		if(features.length > 0) {
			const geojson = format.writeFeatures(features)
			cmmUtil.highlightFeatures(geojson, "./images/poi/faciRese_poi.png", { notMove: true, onClick: function(feature) {
				$(`.bbs-list tr[name='inBusiDtl'][data-no='${feature.getId()}']`).trigger('click');
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
		GLOBAL.LayerId.PoiLayerId = "YP_BSSH_INFO";
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
		
		var BUFFER_POLYGON_RED = new Module.JSColor(100, 255, 0, 0);
		var BUFFER_POLYGON_BLUE = new Module.JSColor(100, 0, 0, 255);
		var color1 = new Module.JSColor(80, 51, 153, 204);
	    var color2 = new Module.JSColor(100, 51, 153, 204);
		
		var spitalSearch = $("spitalSearch").val();
		
		 // 버퍼
		if($("#spitalSearch").val() != '' && poiList.resultList[0] != undefined) {
			
			// 1번
			GLOBAL.LayerId.PolygonLayerId = "Ibbi_Polygon"
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
			var pointX = Number(poiList.resultList[i].lonLon); //x 좌표
			var pointY = Number(poiList.resultList[i].latLat); //y 좌표
			var position = TransformCoordinate(pointX, pointY, 26, 13);
			
			if(i == 0) {
				cmmUtil.setCameraMove(pointX, pointY);
			}
			
			var options = {
					layer : GLOBAL.PoiLayer,
					lon : position.x,
					lat : position.y,
					text : poiList.resultList[i].bplcNm,
					layerKey : poiList.resultList[i].no,
					markerImage : "./images/poi/faciRese_poi.png", // 해당 마커 이미지 Url
					lineColor : new Module.JSColor(0, 0, 255)
			}
			createLinePoi2(options);
		}
		// 마우스 상태 설정
		Module.XDSetMouseState(Module.MML_SELECT_POINT);
	}
}	

// 관내업소정보 상세페이지 호출 ajax
function aj_selectInBusinessEstaInfo(form, no, param2){
	loadingShowHide("show");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+no).addClass('active');
	cmmUtil.setCameraMove($('#'+no).data('lon'), $('#'+no).data('lat'));
	
	if(!app2D){
		ibbi_sethigh(no);
	}
	
	var formData = new FormData(form);
	if(no != ''){
		formData.append('no', no);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ibbi/selectInBusinessEstaInfo.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#" + param2 + "SubPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{ 
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}
