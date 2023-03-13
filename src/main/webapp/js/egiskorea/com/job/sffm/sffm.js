/**
 * 안전시설물관리 js
 */
var SFFM = {
	// LOCAL_URL : "http://localhost",
	// GEO_URL : geoServer,
	// spitalSearch : '',
	// sffmBuffer : '0',
	// Layer : null,
	// 가로등관리 초기 실행함수
	init : function() {
		// 레이어 지우기
		//cleanMap();
		
		$.datepicker.setDefaults({
		    changeYear: true,
		    changeMonth: true,
		    yearRange: 'c-30:c'
		});
		
		// Module.XDSetMouseState(6);
		// Module.canvas.addEventListener('Fire_EventSelectedObject', SFFM.PoiSelect);
		//
		// SFFM.spitalSearch == '';
		// SFFM.removeCmmPOI();
		//
		// $("input[name=sffmAreaDrawing]").attr('disabled', true);
		// $("#sffmBuffer").prop('readonly', true);
		//
		// var spitalChk = $("input[name=sffmSelect]:checked").val();
		// if(spitalChk == '1') {
		// 	$(".areaSrchTool").hide();
		// } else {
		// 	$(".areaSrchTool").show();
		// }
		//
		// // 가로등관리 공간검색
		// $("input[name=sffmAreaDrawing]").on('click', function() {
		// 	var chk2 = $("input[name=sffmAreaDrawing]:checked").val();
		// 	cmmUtil.spitalDraw(chk2);
		// });
		//
		// $("input[name=sffmSelect]").on('change', function() {
		// 	var chk = $("input[name=sffmSelect]:checked").val();
		// 	var chk2 = $("input[name=sffmAreaDrawing]:checked").val();
		//
		// 	if(chk == '1') {
		// 		$("input[name=sffmAreaDrawing]").prop("checked", false);
		// 		$(".areaSrchTool").hide();
		// 		$("input[name=sffmAreaDrawing]").attr('disabled', true);
		// 		$("#sffmBuffer").prop('readonly', true);
		// 		$("#sffmBuffer").val('0');
		// 		cmmUtil.drawClear();
		// 	} else {
		// 		$("input[name=sffmAreaDrawing]").attr('disabled', false);
		// 		$(".areaSrchTool").show();
		// 		$("#sffmBuffer").prop('readonly', false);
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
		$("#sffm-facilityType").change(function() {
			$(".popup-sub").removeClass("opened");
			
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
		
		// SFFM.ghostSymbolMap = Module.getGhostSymbolMap();
	},
	// 페이징
	fn_select_sffm_list : function(searchType) {
		
		if(!$('#mapType3D').prop("checked")) {
			
			console.log("여기 ㄴ 어디?");
			
			const yMap = app2D.getYMap();
			
			if($('#rChk1-2_sffm').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.safetyFacilitySpace').hasClass("on")) {
				toastr.warning("영역을 선택해주세요.");
				 return;
			}
		}
		
		document.searchForm.pageIndex.value = 1;
		if(searchType == '') {
			// 공간검색 체크 해제
			SFFMspitalYN = '';
			aj_selectSafetyFacilitiesMngList($("#searchForm")[0]);
		} else {
			// 공간검색 체크
			SFFMspitalYN = 'spital';
			aj_selectSafetyFacilitiesMngList($("#searchForm")[0], searchType);
			
			var buffer = $("#sffmBuffer").val();
			if(buffer && buffer > 0) {
				const wkt = cmmUtil.getSelectFeatureWKT();
				if(wkt) {
					cmmUtil.showBufferGeometry(wkt, buffer);
				}
			}
		}
	},
	fn_select_sffm_linkPage : function(pageNo) {
		document.searchForm.pageIndex.value = pageNo;
		aj_selectSafetyFacilitiesMngList($("#searchForm")[0]);
	},
	// 가로등관리 등록하기 페이지 호출
	// aj_insertSafetyFacilLampMngView : function() {
	aj_insertSafetyFacilLampMngView: function(form, param1, param2){
		loadingBar("show");
		// $(".popup-sub").removeClass("opened").html("");

		var formData = new FormData(form);

		$.ajax({
			type : "POST",
			url : "/job/sffm/insertSafetyFacilLampMngView.do",
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
	// 가로등관리 상세보기 페이지 호출
	// aj_selectSafetyFacilLampMng : function(gid, lon, lat) {
	aj_selectSafetyFacilLampMng: function(form, param1, param2){
		loadingBar("show");
		// $(".popup-sub").removeClass("opened").html("");
		// if(app2D) {
		// 	cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
		// 	cmmUtil.setPoiHighlight('Sffm_Polygon', gid);
		// 	cmmUtil.setCameraMove(parseFloat(lon), parseFloat(lat), true);
		// } else {
		// 	//cmmUtil.setCameraMove(parseFloat(lon), parseFloat(lat));
		// 	var alt = Module.getMap().getTerrHeightFast(parseFloat(lon), parseFloat(lat));
		// 	//Module.getViewCamera().setViewAt(parseFloat(lon), parseFloat(lat), parseFloat(alt)+100, 90, 5);
		//
		// 	var point = new Module.JSVector3D(parseFloat(lon), parseFloat(lat), alt);
		// 	//GLOBAL.Camera.moveLookAt(point, 45, GLOBAL.Camera.getDirect(), alt * 5);
		// 	GLOBAL.Camera.moveLookAt(point, Module.getViewCamera().getTilt(), GLOBAL.Camera.getDirect(), alt * 5);
		//
		// 	let layerList = new Module.JSLayerList(true);
		// 	let layer = layerList.nameAtLayer('SFFM_POI');
		// 	var objId = gid + '_' + lon + '_' + lat;
		// 	let sffmObject = layer.keyAtObject(objId);
		// 	Module.getMap().setSelectObject(sffmObject); //3D 객체 선택된 상태로 만들어주기
		// }
		
		// var formData = new FormData(form);
		// formData.append('gid', gid);

		var formData = new FormData(form);
		if(param1 != ''){
			formData.append('gid', param1);
		}

		
		$.ajax({
			type : "POST",
			url : "/job/sffm/selectSafetyFacilLampMng.do",
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
				//
				// $('.bbs-list tbody tr').removeClass("active");
				// $("#sffm_"+gid).addClass("active");
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
	// 가로등관리 삭제
	deleteSffm : function(gid) {
		var jsonData = {
				gid: gid
		}
		if(confirm("삭제하시겠습니까?") == true){
			loadingBar("show");
			$.ajax({
				url:"/job/sffm/deleteSffm.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
					toastr.success("정상적으로 삭제되었습니다.");
					// bottomPopupOpen("safetyFacilitiesManagement");
					openPopup("bottomPopup");
					aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]);
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
		cmmUtil.getPositionGeom(SFFM.positionCallback);
		
//		var lat = 0;
//		var lon = 0;
//		
//		canvas.onmouseup = function (e) {
//			var vPosition = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));
//			lat = vPosition.Latitude;
//			lon = vPosition.Longitude;
//			alt = vPosition.Altitude;
//			
//			$('#sffm-location').val(lat.toFixed(5) + "," + lon.toFixed(5) + "," + alt.toFixed(5));
//			
//			canvas.onmouseup = '';
//		}
	},
	positionCallback : function(pointGeom, address) {
		$("#sffm-adres").val("경기도 " + address);
		$('#geom').val(pointGeom);
	},
	// 현재날짜 가져오기
	getDate : function() {
		var today = new Date();
		
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2); 

		var dateString = year + "-" + month + "-" + day;

		return dateString;
	},
	// 가로등관리 등록
	insertSffm : function() {
		var geom = $('#geom').val();
		var position = geom.replace(/[^0-9\s.]/g, '').split(' ');
		position = TransformCoordinate(parseFloat(position[0]), parseFloat(position[1]), 26, 13);
		
		$('#sffm-location').val(position.x.toFixed(8) + "," + position.y.toFixed(7));
		
		var location = $('#sffm-location').val().split(',');
		var manageNo = $('#sffm-manage-no').val();
		var instlDe = $('#sffm-instl-de').val();
		var adres = $('#sffm-adres').val();
		var strtlgtCnt = $('#sffm-strtlgt-cnt').val();
		var lat = position.y.toFixed(7);
		var lon = position.x.toFixed(8);
		var alt = Module.getMap().getTerrHeightFast(parseFloat(lon), parseFloat(lat)).toFixed(6);
		var stdde = SFFM.getDate();
		
		if(manageNo == '') {
			toastr.warning("관리번호를 입력해주세요");
			return
		}
		if(instlDe == '') {
			toastr.warning("설치일자를 입력해주세요");
			return
		}
		if(adres == '') {
			toastr.warning("주소를 입력해주세요");
			return
		}
		if(strtlgtCnt == '') {
			toastr.warning("가로등수를 입력해주세요");
			return
		} else if (Number.isInteger(Number(strtlgtCnt)) == false) {
			toastr.warning("가로등수를 숫자로 입력해주세요");
			return
		}
		if(location == '') {
			toastr.warning("위치를 입력해주세요");
			return
		}
		
		var jsonData = {
				manageNo: manageNo,
				instlDe: instlDe,
				adres: adres,
				strtlgtCnt: strtlgtCnt,
				lat: lat,
				lon: lon,
				alt: alt,
				stdde: stdde
		}
		
		if(confirm("등록하시겠습니까?") == true){
			loadingBar("show");
			$.ajax({
				url:"/job/sffm/insertSffm.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
				    toastr.success("정상적으로 등록되었습니다.");
					// bottomPopupOpen("safetyFacilitiesManagement");
					openPopup("bottomPopup");
					aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]);
				}, complete : function(){
					loadingBar("hide"); 
					SFFM.removeCmmPOI();
				}
			});
	    } else {
	        return;
	    }
	},
	// 가로등관리 수정
	updateSffm : function(gid, manageNo, adres, instlDe, strtlgtCnt, lat, lon, alt) {
		
		// SFFM.aj_insertSafetyFacilLampMngView();
		openPopup("rightSubPopup");
		SFFM.aj_insertSafetyFacilLampMngView($("#tmpForm")[0], "", "right");
		
		var btnHtml = '<div><button type="button" class="btn basic bi-save" onclick="SFFM.updateOkSffm('+gid+');fn_select_detail('+gid+', '+lon+', '+lat+')" id="sffm-update-ok">저장</button> <button type="button" class="btn basic bi-cancel" onclick="fn_select_detail('+gid+', '+lon+', '+lat+');SFFM.removeCmmPOI();">취소</button></div>'
		$("#sffm-title-div").html("가로등관리 수정하기");		
		$("#sffm-btn-div").html(btnHtml);
		
		$('#sffm-manage-no').val(manageNo);
		$('#sffm-instl-de').val(instlDe);
		$('#sffm-adres').val(adres);
		$('#sffm-strtlgt-cnt').val(strtlgtCnt);
		$('#sffm-location').val(lat + "," + lon + "," + alt);
	},
	updateOkSffm : function(gid) {
		var geom = $('#geom').val();
		var position = geom.replace(/[^0-9\s.]/g, '').split(' ');
		position = TransformCoordinate(parseFloat(position[0]), parseFloat(position[1]), 26, 13);
		
		$('#sffm-location').val(position.x.toFixed(8) + "," + position.y.toFixed(7));
		
		var location = $('#sffm-location').val().split(',');
		var manageNo = $('#sffm-manage-no').val();
		var adres = $('#sffm-adres').val();
		var instlDe = $('#sffm-instl-de').val();
		var strtlgtCnt = $('#sffm-strtlgt-cnt').val();
		var lat = position.y.toFixed(7);
		var lon = position.x.toFixed(8);
		var alt = Module.getMap().getTerrHeightFast(parseFloat(lon), parseFloat(lat)).toFixed(6);
		var stdde = SFFM.getDate();
		
		if(manageNo == '') {
			toastr.warning("관리번호를 입력해주세요");
			return
		}
		if(instlDe == '') {
			toastr.warning("설치일자를 입력해주세요");
			return
		}
		if(adres == '') {
			toastr.warning("주소를 입력해주세요");
			return
		}
		if(strtlgtCnt == '') {
			toastr.warning("가로등수를 입력해주세요");
			return
		} else if (Number.isInteger(Number(strtlgtCnt)) == false) {
			toastr.warning("가로등수를 숫자로 입력해주세요");
			return
		}
		if(location == '') {
			toastr.warning("위치를 입력해주세요");
			return
		}
		
		var jsonData = {
				gid: gid,
				manageNo: manageNo,
				instlDe: instlDe,
				adres: adres,
				strtlgtCnt: strtlgtCnt,
				lat: lat,
				lon: lon,
				alt: alt,
				stdde: stdde
		}
		if(confirm("수정하시겠습니까?") == true){
			loadingBar("show");
			$.ajax({
				url:"/job/sffm/updateSffm.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
				    toastr.success("정상적으로 수정되었습니다.");
				    // bottomPopupOpen("safetyFacilitiesManagement");
					openPopup("bottomPopup");
					aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]);
				}, complete : function(){
					loadingBar("hide"); 
					SFFM.removeCmmPOI();
				}
			});
	    } else {
	        return;
	    }
	},
	/* 고스트 심볼 모델 오브젝트 생성 */
	createGhostSymbol : function(_objectKey, _modelKey, _position) {

		// console.log('----------------------------------------------------------------');
		// console.log('_objectKey : ', _objectKey);
		// console.log('_modelKey : ', _modelKey);
		// console.log('_position : ', _position);

		var newModel = Module.createGhostSymbol(_objectKey);

		// base point 설정
		var modelHeight = Module.getGhostSymbolMap().getGhostSymbolSize(_modelKey);

		newModel.setBasePoint(0, -modelHeight.height*0.5, 0);
		newModel.setRotation(0, 90.0, 0);
		newModel.setScale(new Module.JSSize3D(3.0, 3.0, 3.0));
		newModel.setGhostSymbol(_modelKey);
		newModel.setPosition(new Module.JSVector3D(_position[0], _position[1], _position[2]));

		return newModel;
	},
	// 가로등 POI 띄우기 
	selectSffmPOIList : function(searchInstlDe, searchAdres, searchManageNo, spitalSearch, sffmBuffer) {
		var _this = this;
		var	formData = new FormData($("#searchForm")[0]);
		formData.append("searchInstlDe", searchInstlDe);
		formData.append("searchAdres", searchAdres);
		formData.append("searchManageNo", searchManageNo);
		formData.append("spitalSearch", spitalSearch);
		formData.append("sffmBuffer", sffmBuffer);
		
		$.ajax({
			url:"/job/sffm/selectSffmPOIList.do",
			type: "POST",
			data: formData,
			dataType: 'json',
			contentType: false,
	        processData: false,
			success:function(result) {
			    var data = result.resultList;
			    if(app2D) {
					const format = new ol.format.GeoJSON();
					const features = [];
					data.forEach((item) => {
						const geometry = new ol.geom.Point([parseFloat(item["lon"]), parseFloat(item["lat"])]);
						const feature = new ol.Feature(geometry.transform("EPSG:4326", store.getPrj()));
						feature.setId(item["gid"]);
						features.push(feature);
					});
					if(features.length > 0) {
						const geojson = format.writeFeatures(features)
						cmmUtil.highlightFeatures(geojson, "./images/poi/street_lamp.png", { notMove: true, onClick: function(feature) {
							$(`.bbs-list tr[data-gid='${feature.getId()}']`).trigger('click');
						}});
					} else {
						cmmUtil.clearHighlight();
					}		
			    } else {
			    	var layerList = new Module.JSLayerList(true);
			    	// POI 레이어 삭제
					if(GLOBAL.LayerId.PoiLayerId != null){
						layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
						GLOBAL.LayerId.PoiLayerId = null;
						Module.XDRenderData();
					}
					// Polygon 레이어 삭제
					if(GLOBAL.LayerId.PolygonLayerId != null){
						layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
						GLOBAL.LayerId.PolygonLayerId = null;
						Module.XDRenderData();
					}
					if(layerList.nameAtLayer("SFFM_COLOR_POLYGONS") != null) {
						layerList.nameAtLayer("SFFM_COLOR_POLYGONS").removeAll();
					}
					
					// POI 레이어 이름은 각 해당 테이블명
					GLOBAL.LayerId.PoiLayerId = "SFFM_POI";
					
					//GLOBAL.PoiLayer = layerList.createLayer("SFFM_POI", Module.ELT_POLYHEDRON);
					GLOBAL.PoiLayer = layerList.createLayer("SFFM_POI", Module.ELT_GHOST_3DSYMBOL);

				    for (i = 0; i < data.length; i++) {
						//console.log('data['+i+'] : ', data[i]);
				    	// 첫번째 row로 이동
				    	if (i == 0) {
				    		var alt = Module.getMap().getTerrHeightFast(parseFloat(data[i].lon), parseFloat(data[i].lat));
							var point = new Module.JSVector3D(parseFloat(data[i].lon), parseFloat(data[i].lat), alt);
							//GLOBAL.Camera.moveLookAt(point, 45, GLOBAL.Camera.getDirect(), alt * 5);
							GLOBAL.Camera.moveLookAt(point, Module.getViewCamera().getTilt(), GLOBAL.Camera.getDirect(), alt * 5);
				    	}

				    	//var alt = Module.getMap().getTerrHeightFast(data[i].lon, data[i].lat);
				    	//SFFM.load3DS(vPosition, data[i].gid, data[i].lon, data[i].lat);

						var id = data[i].gid + "_" + data[i].lon + "_" + data[i].lat;

						Module.getGhostSymbolMap().insert({
							id : id,
							number: i,
							url : "./images/poi/3ds/SL251.3ds",
							callback : function(e) {

								//console.log('e : ', e);

								// 텍스쳐 설정
								Module.getGhostSymbolMap().setModelTexture({
									id : e.id,
									//face_index : 0,
									url : "./images/poi/3ds/SL251.JPG",
									callback : function(e) {
										//console.log(e.id);
									}
								});

								// 오브젝트 생성 및 레이어 추가

								var position = [data[e.number].lon, data[e.number].lat, data[e.number].alttd];
								var object = _this.createGhostSymbol(e.id, e.id, position);

								GLOBAL.PoiLayer.addObject(object, e.number);
							}
						});

				    	SFFM.createCirclePolygon(data[i].lon, data[i].lat, data[i].alttd);

				    	/*
				    	var options = {
								layer : SFFM.Layer,
								lon : data[i].lon,
								lat : data[i].lat,
								text : data[i].manageNo.toString(),
								markerImage : "./images/poi/street_lamp.png", // 해당 마커 이미지 Url
								lineColor : new Module.JSColor(163, 163, 163)
						}
				    	createLinePoi2(options);
						*/
				    }
				    //버퍼 Polygon
					if(sffmBuffer != '0'){
						var layerList = new Module.JSLayerList(true);
						var color1 = new Module.JSColor(80, 51, 153, 204);
					    var color2 = new Module.JSColor(100, 51, 153, 204);
						
						// 1번
						GLOBAL.LayerId.PolygonLayerId = "Sffm_Polygon"
						var bufferPolygonLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
						if(bufferPolygonLayerCheck != null) {
							layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
							Module.XDRenderData(); 
						}
						
						bufferPolygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
						bufferPolygonLayer.setSelectable(false)
						
						var buffurAreaAsText = data[0].bufferArea.split("(")[2];
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
			    }
			}
		});
	},
	// 가로등 3DS
	load3DS : function(vPosition, gid, lon, lat) {
		
    	var polygon = Module.createPolygon(gid + "_" + lon + "_" + lat);
		polygon.loadFile({
			position : vPosition,
			url : "./images/poi/3ds/SL251.3ds",
			align : "bottom"
		});

		GLOBAL.PoiLayer.addObject(polygon, 0);


		return polygon;
	},
	PoiSelect:function(e) {
		//console.log('이곳을 타는것인강?? ㅋㅋ');
		//console.log('sffm.js PoiSelect() e : ', e);
		//Module.getMap().clearSelectObj();
		Module.XDRenderData();
		
		var layerNm = e.layerName;
		var obj = e.objKey;
		
		if(layerNm == 'SFFM_POI'){
			var strArr = obj.split('_');
			var gid = strArr[0];
			var lon = strArr[1];
			var lat = strArr[2];
			
			SFFM.aj_selectSafetyFacilLampMng(gid, lon, lat);
		} 
	},
	cancelModal : function() {
		// setTimeout(function(){
		// 	Module.XDSetMouseState(6);
		// }, 500);
	},
	getCriminalWMS : function() {
		var layerNm = 'criminal_zone_5179';
		var layerList = new Module.JSLayerList(false);
		var layerList2 = new Module.JSLayerList(true);
		var layer = layerList.nameAtLayer(layerNm);
		var layer2 = layerList2.nameAtLayer('SFFM_COLOR_POLYGONS');
		var checked = $('#sffmCrimianlChkBox').is(':checked');
		
		if(app2D) {
			toastr.warning("3D에서만 동작하는 기능입니다.");
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
			aj_selectSafetyFacilitiesMngList($('#searchForm')[0]);
		}
		
	},
	createCirclePolygon : function(lon, lat, alt) {
		// 폴리곤을 추가 할 레이어 생성
		var layerList = new Module.JSLayerList(true);
		var layer = layerList.createLayer("SFFM_COLOR_POLYGONS", Module.ELT_PLANE);
		
		// 폴리곤 생성
		var inColor = new Module.JSColor(150, 255, 255, 255);
		var outColor = new Module.JSColor(0, 255, 255, 255);
		var center = new Module.JSVector3D(lon, lat, alt);
		var radius = parseFloat($("#sffmBuffer2").val());
		var segment = 20;	// 원을 구성하는 점 수. 점 수가 많을수록 곡면과 가깝게 생성됩니다.
		var checked = $('#sffmCrimianlChkBox').is(':checked');
		
		if(isNaN(radius)) {
			toastr.warning("값을 숫자로 입력하여주세요.");
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
		GLOBAL.LayerId.PolygonLayerId = 'SFFM_COLOR_POLYGONS';
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

