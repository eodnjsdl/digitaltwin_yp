/**
 * 안전시설물관리 js
 */
var CCTV = {
	// LOCAL_URL : "http://localhost",
	// GEO_URL : geoServer,
	// spitalSearch : '',
	// cctvBuffer : '0',
	// Layer : null,
	// CCTV관리 초기 실행함수
	init : function() {
		// 레이어 지우기
		//cleanMap();
		
		// Module.XDSetMouseState(6);
		// Module.canvas.addEventListener('Fire_EventSelectedObject', CCTV.PoiSelect);
		//
		// CCTV.spitalSearch == '';
		// $("input[name=cctvAreaDrawing]").attr('disabled', true);
		// $("#cctvBuffer").prop('readonly', true);
		// CCTV.removeCmmPOI();
		//
		// var spitalChk = $("input[name=cctvSelect]:checked").val();
		// if(spitalChk == '1') {
		// 	$(".areaSrchTool").hide();
		// } else {
		// 	$(".areaSrchTool").show();
		// }
		//
		// // CCTV관리 공간검색
		// $("input[name=cctvAreaDrawing]").on('click', function() {
		// 	var chk2 = $("input[name=cctvAreaDrawing]:checked").val();
		// 	cmmUtil.spitalDraw(chk2);
		// });
		//
		// $("input[name=cctvSelect]").on('change', function() {
		// 	var chk = $("input[name=cctvSelect]:checked").val();
		// 	var chk2 = $("input[name=cctvAreaDrawing]:checked").val();
		//
		// 	if(chk == '1') {
		// 		$("input[name=cctvAreaDrawing]").prop("checked", false);
		// 		$(".areaSrchTool").hide();
		// 		$("input[name=cctvAreaDrawing]").attr('disabled', true);
		// 		$("#cctvBuffer").prop('readonly', true);
		// 		$("#cctvBuffer").val('0');
		// 		cmmUtil.drawClear();
		// 	} else {
		// 		$("input[name=cctvAreaDrawing]").attr('disabled', false);
		// 		$(".areaSrchTool").show();
		// 		$("#cctvBuffer").prop('readonly', false);
		// 		cmmUtil.spitalDraw(chk2);
		// 	}
		// });
		
		/*$(".popup-panel .popup-bottom-toggle").each(function() {
			$(this).click(function(){
				$(this).parent().toggleClass("fold");
				if( $(this).parent().hasClass("fold") ){
					$(this).attr("title","펼치기");
				} else {			
					$(this).attr("title","접기");
				}
			});
		});*/
		
		// 시설물 변경
		$("#cctv-facilityType").change(function() {
			closeSubPopup();
			
			// WMS 레이어 삭제
			// if(GLOBAL.layerWMS != null){
			// 	delWMSLayer(GLOBAL.layerWMS)
			// 	GLOBAL.layerWMS = null
			// }
			if(this.value == "lamp") {
				document.searchForm.pageIndex.value = 1;
				SFFMspitalYN = '';
				aj_selectSafetyFacilitiesMngList($("#searchForm")[0]);
			} else {
				document.searchForm.pageIndex.value = 1;
				CCTVspitalYN = '';
				aj_selectCctvList($("#searchForm")[0]);
			}
		});
	},
	// 페이징
	fn_select_cctv_list : function(searchType) {
		
		if(!$('#mapType3D').prop("checked")) {
			const yMap = app2D.getYMap();
			
			if($('#rChk1-2_cctv').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('#sffm-space').hasClass("on")) {
				 alert("영역을 선택해주세요.");
				 return;
			}
		}
		
		document.searchForm.pageIndex.value = 1;
		if(searchType == '') {
			// 공간검색 체크 해제
			CCTVspitalYN = '';
			aj_selectCctvList($("#searchForm")[0]);
		} else {
			// 공간검색 체크
			CCTVspitalYN = 'spital';
			aj_selectCctvList($("#searchForm")[0], searchType);
			
			var buffer = $("#cctvBuffer2").val();
			if(buffer && buffer > 0) {
				const wkt = cmmUtil.getSelectFeatureWKT();
				if(wkt) {
					cmmUtil.showBufferGeometry(wkt, buffer);
				}
			}
		}
	},
	fn_select_cctv_linkPage : function(pageNo) {
		document.searchForm.pageIndex.value = pageNo;
		aj_selectCctvList($("#searchForm")[0]);
	},
	// CCTV관리 등록하기 페이지 호출
	aj_insertSafetyFacilCctvMngView : function(form, param1, param2) {
		loadingBar("show");
		// $(".popup-sub").removeClass("opened").html("");

		var formData = new FormData(form);

		$.ajax({
			type : "POST",
			url : "/job/cctv/insertSafetyFacilCctvMngView.do",
			dataType : "html",
			async: false,
			success : function(returnData, status){
				// if(status == "success") {
				// 	$("#container").append(returnData);
				// }else{
				// 	toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				// 	return;
				// }
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
	},
	// CCTV 상세보기 페이지 호출
	aj_selectSafetyFacilCctvMng : function(form, param1, param2) {
		loadingBar("show");
		// $(".popup-sub").removeClass("opened").html("");
		// cmmUtil.setCameraMove(parseFloat(lon), parseFloat(lat), true);
		
		// var formData = new FormData();
		// formData.append('gid', gid);

		var formData = new FormData(form);
		if(param1 != ''){
			formData.append('gid', param1);
		}

		
		$.ajax({
			type : "POST",
			url : "/job/cctv/selectCctv.do",
			data: formData,
			dataType : "html",
			processData : false,
			contentType : false,
			async: false,
			success : function(returnData, status){
				// if(status == "success") {
				// 	$("#container").append(returnData);
				// }else{
				// 	toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				// 	return;
				// }
				
				// if(!app2D) {
				// 	Module.getMap().clearSelectObj();
				// 	Module.XDRenderData()
				// 	var layerList = new Module.JSLayerList(true);
				// 	var layer = layerList.nameAtLayer('CCTV_POI');
				//
				// 	for(var i = 0; i < layer.getObjectCount(); i++) {
				// 		var point = layer.indexAtObject(i);
				// 		var strArr = point.getId().split('_');
				// 		var poi_gid = strArr[0];
				//
				// 		if(poi_gid == gid){
				// 			point.setHighlight(true);
				// 		} else {
				// 			point.setHighlight(false);
				// 		}
				// 	}
				//
				// 	$('.bbs-list tbody tr').removeClass('active');
				// 	$("#cctv_"+gid).addClass("active");
				// } else {
				// 	cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
				// 	cmmUtil.setPoiHighlight('CCTV_POI', gid);
				// }

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
	},
	// CCTV관리 삭제
	deleteCctv : function(gid) {
		var jsonData = {
				gid: gid
		}
		if(confirm("삭제하시겠습니까?") == true){
			loadingBar("show");
			$.ajax({
				url:"/job/cctv/deleteCctv.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
					toastr.success("정상적으로 삭제되었습니다.");
					// bottomPopupOpen("safetyFacilitiesCctv");
					openPopup("bottomPopup");
					aj_selectCctvList($("#tmpForm")[0]);
				}, complete : function(){
					loadingBar("hide"); 
				}
			});
	    } else {
	        return;
	    }
	},
	// 지도에서 위치 선택
	setLocation : function() {
		cmmUtil.getPositionGeom(CCTV.positionCallback);
		
		// var lat = 0;
		// var lon = 0;
		//
		// canvas.onmouseup = function (e) {
		// 	var vPosition = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));
		// 	lat = vPosition.Latitude;
		// 	lon = vPosition.Longitude;
		//
		// 	$('#cctv-location').val(lat.toFixed(5) + "," + lon.toFixed(5));
		//
		// 	canvas.onmouseup = '';
		// }
	},
	positionCallback : function(pointGeom, address) {
		$("#cctv-adres").val("경기도 " + address);
	},
	// CCTV관리 등록
	insertCctv : function() {
		var location = $('#cctv-location').val().split(',');
		var deviceid = $('#cctv-deviceid').val();
		//var gbn = $('#cctv-gbn').val();
		var gbn = $("#cctv-insert-selbox option:selected").text();
		var label = $('#cctv-label').val();
		var lat = location[0];
		var lon = location[1];
		var adres = $("#cctv-adres").val();
		
		if(deviceid == '') {
			alert("기기ID를 입력해주세요");
			return
		}
		if(gbn == '') {
			alert("구분을 입력해주세요");
			return
		}
		if(label == '') {
			alert("명칭을 입력해주세요");
			return
		}
		if(location == '') {
			alert("위치를 입력해주세요");
			return
		}
		if(adres == '') {
			alert("주소를 입력해주세요");
			return
		}
		
		var jsonData = {
				deviceid: deviceid,
				gbn: gbn,
				label: label,
				lat: lat,
				lon: lon,
				adres: adres
		}
		
		if(confirm("등록하시겠습니까?") == true){
			loadingBar("show");
			$.ajax({
				url:"/job/cctv/insertCctv.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
				    alert("정상적으로 등록되었습니다.");
					// bottomPopupOpen("safetyFacilitiesCctv");
					openPopup("bottomPopup");
					aj_selectCctvList($("#tmpForm")[0]);
				}, complete : function(){
					loadingBar("hide"); 
					CCTV.removeCmmPOI();
				}
			});
	    } else {
	        return;
	    }
	},
	// CCTV관리 수정
	updateCctv : function(gid, deviceid, gbn, label, lat, lon, adres) {
		CCTV.getCode(gbn, 'update');
		// CCTV.aj_insertSafetyFacilCctvMngView();
		openPopup("rightSubPopup");
		CCTV.aj_insertSafetyFacilCctvMngView($("#tmpForm")[0], "", "right");
		
		var btnHtml = '<div><button type="button" class="btn basic bi-save" id="cctv-update-ok" onclick="CCTV.updateOkCctv('+gid+');fn_select_cctv_detail('+gid+', '+lon+', '+lat+');">저장</button> <button type="button" class="btn basic bi-cancel" onclick="fn_select_cctv_detail('+gid+', '+lon+', '+lat+');CCTV.removeCmmPOI();">취소</button></div>'
		$("#cctv-title-div").html("CCTV관리 수정하기");		
		$("#cctv-btn-div").html(btnHtml);
		
		$('#cctv-deviceid').val(deviceid);
		$('#cctv-label').val(label);
		$('#cctv-location').val(lat + "," + lon);
		$("#cctv-adres").val(adres);
	},
	updateOkCctv : function(gid) {
		var location = $('#cctv-location').val().split(',');
		var deviceid = $('#cctv-deviceid').val();
		var gbn = $('#cctv-insert-selbox').val();
		var label = $('#cctv-label').val();
		var lat = location[0];
		var lon = location[1];
		var adres = $("#cctv-adres").val();
		
		if(deviceid == '') {
			alert("기기ID를 입력해주세요");
			return
		}
		if(gbn == '') {
			alert("구분을 입력해주세요");
			return
		}
		if(label == '') {
			alert("명칭을 입력해주세요");
			return
		}
		if(location == '') {
			alert("위치를 입력해주세요");
			return
		}
		if(adres == '') {
			alert("주소를 입력해주세요");
			return
		}
		
		var jsonData = {
				gid: gid,
				deviceid: deviceid,
				gbn: gbn,
				label: label,
				lat: lat,
				lon: lon,
				adres: adres
		}
		if(confirm("수정하시겠습니까?") == true){
			loadingBar("show");
			$.ajax({
				url:"/job/cctv/updateCctv.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
				    alert("정상적으로 수정되었습니다.");
				    // bottomPopupOpen("safetyFacilitiesCctv");
					openPopup("bottomPopup");
					aj_selectCctvList($("#tmpForm")[0]);
				}, complete : function(){
					loadingBar("hide"); 
					CCTV.removeCmmPOI();
				}
			});
	    } else {
	        return;
	    }
	},
	// CCTV POI 띄우기 
	selectCctvPOIList : function(searchDeviceid, searchGbn, searchLabel, spitalSearch, cctvBuffer) {
		
		var	formData = new FormData($("#searchForm")[0]);
		formData.append("searchDeviceid", searchDeviceid);
		formData.append("searchGbn", searchGbn);
		formData.append("searchLabel", searchLabel);
		formData.append("spitalSearch", spitalSearch);
		formData.append("cctvBuffer", cctvBuffer);
		
		$.ajax({
			url:"/job/cctv/selectCctvPOIList.do",
			type: "POST",
			data: formData,
			dataType: 'json',
			contentType: false,
	        processData: false,
			success:function(result) {
			    var data = result.resultList;
			    // if(app2D) {
			    // 	const format = new ol.format.GeoJSON();
				// 	const features = [];
				// 	data.forEach((item) => {
				// 		const geometry = new ol.geom.Point([parseFloat(item["lon"]), parseFloat(item["lat"])]);
				// 		const feature = new ol.Feature(geometry.transform("EPSG:4326", store.getPrj()));
				// 		feature.setId(item["gid"]);
				// 		features.push(feature);
				// 	});
				// 	if(features.length > 0) {
				// 		const geojson = format.writeFeatures(features)
				// 		cmmUtil.highlightFeatures(geojson, "./images/poi/cctv_poi.png", { notMove: true, onClick: function(feature) {
				// 			$(`.bbs-list tr[data-gid='${feature.getId()}']`).trigger('click');
				// 		}});
				// 	} else {
				// 		cmmUtil.clearHighlight();
				// 	}
			    // }
			    // else {
			    // 	var layerList = new Module.JSLayerList(true);
				//
				//     // POI 레이어 삭제
				// 	if(GLOBAL.LayerId.PoiLayerId != null){
				// 		layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
				// 		GLOBAL.LayerId.PoiLayerId = null;
				// 		Module.XDRenderData();
				// 	}
				// 	// Polygon 레이어 삭제
				// 	if(GLOBAL.LayerId.PolygonLayerId != null){
				// 		layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
				// 		GLOBAL.LayerId.PolygonLayerId = null;
				// 		Module.XDRenderData();
				// 	}
				// 	if(layerList.nameAtLayer("CCTV_COLOR_POLYGONS") != null) {
				// 		layerList.nameAtLayer("CCTV_COLOR_POLYGONS").removeAll();
				// 	}
			    //
				// 	// POI 레이어 이름은 각 해당 테이블명
				// 	GLOBAL.LayerId.PoiLayerId = "CCTV_POI";
				//
				// 	GLOBAL.PoiLayer = layerList.createLayer("CCTV_POI", Module.ELT_3DPOINT);
				//
				//     /*if(layerList.nameAtLayer("CCTV_POI") != null) {
				// 		layerList.nameAtLayer("CCTV_POI").removeAll();
				// 	}*/
				//
				//     for(i=0; i<data.length; i++) {
				//     	var alt = Module.getMap().getTerrHeightFast(data[i].lon, data[i].lat);
				//     	// 첫번째 row로 이동
				//     	if(i==0) {
				//     		cmmUtil.setCameraMove(parseFloat(data[i].lon), parseFloat(data[i].lat), true);
				//     	}
				//
				//     	CCTV.createCirclePolygon(data[i].lon, data[i].lat, alt);
				//     	var options = {
				//     			layer : GLOBAL.PoiLayer,
				//     			layerKey : data[i].gid,
				// 				lon : data[i].lon,
				// 				lat : data[i].lat,
				// 				text : data[i].deviceid.toString(),
				// 				markerImage : "./images/poi/cctv_poi.png", // 해당 마커 이미지 Url
				// 				lineColor : new Module.JSColor(255, 255, 255),
				// 				gid : data[i].gid
				// 		}
				//     	CCTV.createLinePoi2(options);
				//     }
				//   //버퍼 Polygon
				// 	if(cctvBuffer != '0'){
				// 		var layerList = new Module.JSLayerList(true);
				// 		var color1 = new Module.JSColor(80, 51, 153, 204);
				// 	    var color2 = new Module.JSColor(100, 51, 153, 204);
				//
				// 		// 1번
				// 		GLOBAL.LayerId.PolygonLayerId = "Cctv_Polygon"
				// 		var bufferPolygonLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
				// 		if(bufferPolygonLayerCheck != null) {
				// 			layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
				// 			Module.XDRenderData();
				// 		}
				//
				// 		bufferPolygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
				// 		bufferPolygonLayer.setSelectable(false)
				//
				// 		var buffurAreaAsText = data[0].bufferArea.split("(")[2];
				// 		bExtractionArray = buffurAreaAsText.split("))");
				// 		bSecondExtArray = bExtractionArray[0].split(",");
				// 		var polygonVertex = new Module.JSVec3Array();
				// 		var arrayCnt = (bSecondExtArray.length-1);
				//
				// 		for(var j=0;j<arrayCnt;j++) {
				// 			polygonVertex.push( new Module.JSVector3D(parseFloat(bSecondExtArray[j].split(" ")[0]), parseFloat(bSecondExtArray[j].split(" ")[1]), 15.0) );
				// 		}
				// 		let bufferPolygon = Module.createPolygon("POLYGON_"+i);
				//
				// 		// 폴리곤 색상 설정
				// 		var bufferPolygonStyle = new Module.JSPolygonStyle();
				// 		bufferPolygonStyle.setFill(true);
				// 		bufferPolygonStyle.setFillColor(color1);
				// 		bufferPolygonStyle.setOutLine(true);
				// 		bufferPolygonStyle.setOutLineWidth(2.0);
				// 		bufferPolygonStyle.setOutLineColor(color2);
				// 		bufferPolygon.setStyle(bufferPolygonStyle);
				//
				// 		var part = new Module.Collection();
				// 		part.add(arrayCnt)
				//
				// 		bufferPolygon.setPartCoordinates(polygonVertex, part);
				//
				// 		bufferPolygonLayer.addObject(bufferPolygon, 0);
				// 		bufferPolygonLayer.setMaxDistance(GLOBAL.MaxDistance);
				// 	}
			    // }
			}
		});
	},
	PoiSelect:function(e){
		Module.getMap().clearSelectObj();
		Module.XDRenderData();
		var layerNm = e.layerName;
		var obj = e.objKey;
		
		if(layerNm == 'CCTV_POI'){
			var strArr = obj.split('_');
			var gid = strArr[0];
			var lon = strArr[1];
			var lat = strArr[2];
			CCTV.aj_selectSafetyFacilCctvMng(gid, lon, lat);
		} 
		
		var layerList = new Module.JSLayerList(true);
		var layer = layerList.nameAtLayer(layerNm);
		
		for(var i = 0; i < layer.getObjectCount(); i++) {
			var point = layer.indexAtObject(i);
			
			if(point.getId() == e.objKey){
				point.setHighlight(true);
			} else {
				point.setHighlight(false);
			}
		}
	},
	createLinePoi2 : function(options) {
		var img = new Image();
		img.onload = function() {
			// 이미지 로드 후 캔버스에 그리기
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			
			ctx.width = img.width;
			ctx.height = img.height;
			ctx.drawImage(img, 0, 0);
			
			// z값 구해서 넣기
			var alt = Module.getMap().getTerrHeightFast(Number(options.lon), Number(options.lat));
			var point;
			var pointNm = "";
			
			// 이미지 POI 생성 및 Key값 지정
			if(options.layerKey != undefined && options.layer2Key == undefined){
				pointNm = options.layerKey.toString();
			}else if(options.layer2Key != undefined){
				pointNm = options.layerKey.toString() +  "_"  + options.layer2Key.toString();
			}else{
				pointNm = "POI_" + options.layer.getObjectCount();
			}
			
			point = Module.createPoint(options.gid + "_" + options.lon + "_" + options.lat);
			
			var imageData = ctx.getImageData(0, 0, this.width, this.height).data;
			
			point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));
			
			// POI 수직 라인 설정
			if(options.alt != undefined){
				point.setPositionLine(5.0 + alt, options.lineColor);
			}else{
				point.setPositionLine(30.0 + alt, options.lineColor);
			}
			
			// 텍스트 설정
			//point.setTextMargin(0, -5);
			
			// 하이라이트 POI 등록
			if(options.highlight != undefined){  
				if(options.highlight){
					var bResult = GLOBAL.Symbol.insertIcon(options.gid + "_" + options.lon + "_" + options.lat, imageData, ctx.width, ctx.height);
					
					if (bResult) {
						options.layer.keyAtObject(options.gid + "_" + options.lon + "_" + options.lat.replaceAll("_on", "")).setHighlightIcon(GLOBAL.Symbol.getIcon(options.gid + "_" + options.lon + "_" + options.lat));
					}
				}
			} else { 
				var imgUrl = options.markerImage;
				
				imgUrl = imgUrl.split(".")[0] + imgUrl.split(".")[1] + "_on." + imgUrl.split(".")[2];
				
				options.markerImage = imgUrl;
				options.highlight = true;
				options.layerKey = options.gid + "_" + options.lon + "_" + options.lat + "_on";
				
				createLinePoi2(options);
				
				point.setText(String(options.text));
				point.setImage(imageData, this.width, this.height);
			}
			
			point.setHighlight(false);
			
			options.layer.setMaxDistance(GLOBAL.MaxDistance);
			options.layer.addObject(point, 0);			
		};
		img.src = options.markerImage;
		
		
		
		
		
		
		// POI 이미지 로드
		/*var img = new Image();
		img.onload = function() {
			// 이미지 로드 후 캔버스에 그리기
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			
			// z값 구해서 넣기
			var alt = Module.getMap().getTerrHeightFast(options.lon, options.lat);
			
			// 이미지 POI 생성
			var point = Module.createPoint(options.gid + "_" + options.lon + "_" + options.lat);
			point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));
			point.setImage(ctx.getImageData(0, 0, this.width, this.height).data, this.width, this.height);			
	        
			point.setPositionLine(30.0 + alt, options.lineColor);
			
	        // 텍스트 설정
			point.setText(options.text);
			GLOBAL.PoiLayer.setMaxDistance(GLOBAL.MaxDistance);
			GLOBAL.PoiLayer.addObject(point, 0);
	    };
	    img.src = options.markerImage;*/
	},
	getCriminalWMS : function() {
		var layerNm = 'criminal_zone_5179';
		var layerList = new Module.JSLayerList(false);
		var layerList2 = new Module.JSLayerList(true);
		var layer = layerList.nameAtLayer(layerNm);
		var layer2 = layerList2.nameAtLayer('CCTV_COLOR_POLYGONS');
		var checked = $('#cctvCrimianlChkBox').is(':checked');
		
		if(app2D) {
			alert("3D에서만 동작하는 기능입니다.");
		} else {
			if(checked){
				if (layer == null){
					layer = layerList.createWMSLayer(layerNm);
					layer.setLevelWMS(7, 20)
					layer.setConnectionWMS(SFFM.GEO_URL+'/geoserver/digitaltwin/wms?', 0, '');
					layer.setLayersWMS('digitaltwin:'+layerNm);
				} else {
					layer.setVisible(true);
				}
				layer2.setVisible(true);
			} else {
				if (layer != null){
					layer.setVisible(false);
				}
				if (layer2 != null){
					layer2.setVisible(false);
				}
			}
			
			GLOBAL.layerWMS = layerNm;
			aj_selectCctvList($('#searchForm')[0]);
		}
	},
	createCirclePolygon : function(lon, lat, alt) {
		// 폴리곤을 추가 할 레이어 생성
		var layerList = new Module.JSLayerList(true);
		var layer = layerList.createLayer("CCTV_COLOR_POLYGONS", Module.ELT_PLANE);
		
		// 폴리곤 생성
		var inColor = new Module.JSColor(150, 255, 255, 255);
		var outColor = new Module.JSColor(0, 255, 255, 255);
		var center = new Module.JSVector3D(lon, lat, alt);
		var radius = parseFloat($("#cctvBuffer2").val());
		var segment = 20;	// 원을 구성하는 점 수. 점 수가 많을수록 곡면과 가깝게 생성됩니다.
		var checked = $('#cctvCrimianlChkBox').is(':checked');
		
		if(isNaN(radius)) {
			alert("값을 숫자로 입력하여주세요.");
		} else {
			// 폴리곤 객체 생성
			var polygon = Module.createPolygon("POLYGON_0");
			
			// 폴리곤 색상 설정
			var polygonStyle = new Module.JSPolygonStyle();
			polygonStyle.setFill(true);
			polygonStyle.setFillColor(inColor);
			if (outColor != null) {
				polygonStyle.setOutLine(true);
				polygonStyle.setOutLineWidth(2.0);
				polygonStyle.setOutLineColor(outColor);
			}
			polygon.setStyle(polygonStyle);
			// 버텍스 폴리곤 형태 설정
			polygon.setCircle(center, radius, segment);
			// 레이어에 객체 추가
			layer.addObject(polygon, 0);
			
			if(checked) {
				layer.setVisible(true);
			} else {
				layer.setVisible(false);
			}
		}
		GLOBAL.LayerId.PolygonLayerId = 'CCTV_COLOR_POLYGONS';
	},
	getCode : function(value, type) {
		$.ajax({
			url:"/job/cctv/getCode.do",
			type: "POST",
			dataType: 'json',
			success:function(result) {
				var data = result.resultList;
				var html = '';
				
				for(i=0; i<data.length; i++) {
					if((data[i].codeNm == value) && (type != 'insert')) {
						html += '<option selected="selected" value='+ data[i].codeNm +'>'+ data[i].codeNm +'</option>';
					} else {
						html += '<option value='+ data[i].codeNm +'>'+ data[i].codeNm +'</option>';
					}
				}
				if(type == 'search') {
					$("#cctv-search-selbox").append(html);
				} else {
					$("#cctv-insert-selbox").html(html);
				} 
			}
		});
	},
	removeCmmPOI : function() {
		// if(GLOBAL.StartPoint){
		// 	GLOBAL.StartPoint = false;
		// 	removePoint(GLOBAL.NomalIcon);
		// }
		// var layerList = new Module.JSLayerList(true);
		// if(GLOBAL.LayerId.PolygonLayerId != null) {
		// 	layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
		// 	GLOBAL.LayerId.PolygonLayerId = null;
		// 	Module.XDRenderData();
		// }
	}
}

