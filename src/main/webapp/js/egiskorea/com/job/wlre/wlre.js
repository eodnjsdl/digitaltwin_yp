/**
 * 복지시설 js
 */
var WLRE = {
	LOCAL_URL : "http://localhost",
	GEO_URL : geoServer,
	pointCount : 0,
	spitalSearch : '',
	wlreBuffer : '0',
	Layer : null,
	// 복지시설 초기 실행함수
	init : function() {
		// 레이어 지우기
		//cleanMap();
		Module.XDSetMouseState(6);
//		Module.canvas.addEventListener('Fire_EventSelectedObject', WLRE.PoiSelect);
		
		WLRE.spitalSearch == '';
		
		if(!$('#rChk1-2').prop("checked")) {
			$("input[name=wlreAreaDrawing]").attr('disabled', true);
		}
		
		$("#wlreBuffer").prop('readonly', true);
		WLRE.removeCmmPOI();

		var spitalChk = $("input[name=wlreSelect]:checked").val();
		if(spitalChk == '1') {
			$(".areaSrchTool").hide();
		} else {
			$(".areaSrchTool").show();
		}
		
		// 복지시설 공간검색
		$("input[name=wlreAreaDrawing]").on('click', function() {
			var chk2 = $("input[name=wlreAreaDrawing]:checked").val();
			cmmUtil.spitalDraw(chk2);
		});
		$("input[name=wlreSelect]").on('change', function() {
			var chk = $("input[name=wlreSelect]:checked").val();
			var chk2 = $("input[name=wlreAreaDrawing]:checked").val();
			
			if(chk == '1') {
				$("input[name=wlreAreaDrawing]").attr('disabled', true);
				$(".areaSrchTool").hide();
				$("#wlreBuffer").prop('readonly', true);
				$("#wlreBuffer").val('0');
				cmmUtil.drawClear();
			} else {
				$("input[name=wlreAreaDrawing]").attr('disabled', false);
				$(".areaSrchTool").show();
				$("#wlreBuffer").prop('readonly', false);
				cmmUtil.spitalDraw(chk2);
			}
		}); 
	},
	// 페이징
	fn_select_wlre_list : function(searchType) {
		
		if(!$('#mapType3D').prop("checked")) {
			const yMap = app2D.getYMap();
			
			if($('#rChk1-2').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.waterSpace').hasClass("on")) {
				 alert("영역을 선택해주세요.");
				 return;
			}
		}
		
		document.wlre_searchForm.pageIndex.value = 1;
		if(searchType == '') {
			// 공간검색 체크 해제
			WLREspitalYN = '';
			aj_selectWelfareFacilityList($("#wlre_searchForm")[0]);
		} else {
			// 공간검색 체크
			WLREspitalYN = 'spital';
			
			var buffer = $("#wlreBuffer").val();
			if(buffer && buffer > 0) {
				const wkt = cmmUtil.getSelectFeatureWKT();
				if(wkt) {
					cmmUtil.showBufferGeometry(wkt, buffer);
				}
			}
			aj_selectWelfareFacilityList($("#wlre_searchForm")[0], searchType);
		}
		
	},
	fn_select_wlre_linkPage : function(pageNo) {
		document.wlre_searchForm.pageIndex.value = pageNo;
		aj_selectWelfareFacilityList($("#wlre_searchForm")[0]);
	},
	// 등록화면 호출
	aj_selectWelfareFacilityModal : function() {
		loadingShowHide("show");
		$(".popup-sub").removeClass("opened").html("");
		
		$.ajax({
			type : "POST",
			url : "/job/wlre/insertWelfareView.do",
			dataType : "html",
			async: false,
			success : function(returnData, status){
				if(status == "success") {	
					$("#container").append(returnData);
				}else{ 
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				} 
			}, complete : function(){
				loadingShowHide("hide"); 
			}
		});
	},
	// 복지시설 삭제
	deleteWelfare : function(gid) {
		var jsonData = {
				gid: gid
		}
		if(confirm("삭제하시겠습니까?") == true){
			loadingShowHide("show");
			$.ajax({
				url:"/job/wlre/deleteWelfare.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
					toastr.success("정상적으로 삭제되었습니다.");
					bottomPopupOpen("welfareFacility");
				}, complete : function(){
					loadingShowHide("hide"); 
				}
			});
	    } else {
	        return;
	    }
	},
	// 복지시설 등록
	insertWelfare : function() {
		var geom = $('#geom').val();
		var position = geom.replace(/[^0-9\s.]/g, '').split(' ');
		position = TransformCoordinate(parseFloat(position[0]), parseFloat(position[1]), 26, 13);
		
		$('#wlre-location').val(position.x.toFixed(8) + "," + position.y.toFixed(7));
		
		var loc = $('#wlre-location').val().split(',');
		var fcltyNm = $('#wlre-fclty-nm').val();
		var fcltySe = $('#wlre-fclty-se').val();
		var cttpcTelno = $('#wlre-cttpc-telno').val();
		var rnAdres = $('#wlre-rn-adres').val();
		var lnmAdres = $('#wlre-lnm-adres').val();
		var zip = $('#wlre-zip').val();
		var lat = position.y.toFixed(7);
		var lon = position.x.toFixed(8);
		var dataStdde = WLRE.getDate();
		
		if(fcltyNm == '') {
			alert("시설명을 입력해주세요");
			return
		}
		if(fcltySe == '') {
			alert("시설구분을 입력해주세요");
			return
		}
		if(cttpcTelno == '') {
			alert("전화번호를 입력해주세요");
			return
		}
		if(rnAdres == '') {
			alert("도로명주소를 입력해주세요");
			return
		}
		if(lnmAdres == '') {
			alert("지번주소를 입력해주세요");
			return
		}
		if(zip == '') {
			alert("우편번호를 입력해주세요");
			return
		}
		if(loc == '') {
			alert("위치를 입력해주세요");
			return
		}
		
		var jsonData = {
				fcltyNm: fcltyNm,
				fcltySe: fcltySe,
				cttpcTelno: cttpcTelno,
				rnAdres: rnAdres,
				lnmAdres: lnmAdres,
				zip: zip,
				lat: lat,
				lon: lon,
				dataStdde: dataStdde
		}
		if(confirm("등록하시겠습니까?") == true){
			loadingShowHide("show");
			$.ajax({
				url:"/job/wlre/insertWelfare.do",
				type: "POST",
				data: jsonData,
				dataType: 'json',
				success:function(result) {
				    alert("정상적으로 등록되었습니다.");
					bottomPopupOpen("welfareFacility");
				}, complete : function(){
					loadingShowHide("hide"); 
					WLRE.removeCmmPOI();
				}
			});
	    } else {
	        return;
	    }
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
	// 복지시설 등록 취소
	cancelModal : function() {
		$('#wlre-location').val('');
		$('#wlre-fclty-nm').val('');
		$('#wlre-fclty-se').val('');
		$('#wlre-cttpc-telno').val('');
		$('#wlre-rn-adres').val('');
		$('#wlre-lnm-adres').val('');
		$('#wlre-zip').val('');
		setTimeout(function(){
			Module.XDSetMouseState(6);	
		}, 500);
	},
	// 복지시설 상세조회
	selectWelfare : function(gid, lon, lat) {
		loadingShowHide("show");
		$(".popup-sub").removeClass("opened").html("");
		
		$('.bbs-list tbody tr').removeClass('active');
		$('#'+gid).addClass('active');
		
		WLRE.wlre_sethigh(gid); //선택한 poi 하이라이트 
		
		if(lon != null){
			cmmUtil.setCameraMove(parseFloat(lon), parseFloat(lat), true);
		}
		
		
//		if(app2D) {
//			cmmUtil.setCameraMove(parseFloat(lon), parseFloat(lat), true);		
//		} else {
//			//Module.getViewCamera().setViewAt(parseFloat(lon), parseFloat(lat), 10000, 90, 5);
//			cmmUtil.setCameraMove(parseFloat(lon), parseFloat(lat), true);
//		}
		
		var formData = new FormData();
		formData.append('gid', gid);
		
		$.ajax({
			type : "POST",
			url : "/job/wlre/selectWelfare.do",
			data: formData,
			dataType : "html",
			processData : false,
			contentType : false,
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					$("#container").append(returnData);
					
				}else{ 
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				} 
			}, complete : function(){
				loadingShowHide("hide"); 
			}
		});
	},
	// 복지시설 수정
	updateWelfare : function(gid, fcltyNm, fcltySe, cttpcTelno, rnAdres, lnmAdres, zip, lat, lon) {
		WLRE.getCode(fcltySe, 'update');
		WLRE.aj_selectWelfareFacilityModal();
		
		var btnHtml = '<div><button type="button" class="btn basic bi-save" id="wlre-update-ok">저장</button> <button type="button" class="btn basic bi-cancel" onclick="WLRE.selectWelfare('+gid+', '+lon+', '+lat+');WLRE.removeCmmPOI();">취소</button></div>'
		$("#wlre-title-div").html("복지시설 수정하기");		
		$("#wlre-btn-div").html(btnHtml);
		$('#wlre-fclty-nm').val(fcltyNm);
		$('#wlre-cttpc-telno').val(cttpcTelno);
		$('#wlre-rn-adres').val(rnAdres);
		$('#wlre-lnm-adres').val(lnmAdres);
		$('#wlre-zip').val(zip);
		$('#wlre-location').val(lon + "," + lat);

		// 복지시설 수정완료
		$("#wlre-update-ok").on("click", function(){
			var geom = $('#geom').val();
			var position = geom.replace(/[^0-9\s.]/g, '').split(' ');
			position = TransformCoordinate(parseFloat(position[0]), parseFloat(position[1]), 26, 13);
			
			$('#wlre-location').val(position.x.toFixed(8) + "," + position.y.toFixed(7));
			
			var loc = $('#wlre-location').val().split(',');
			var fcltyNm = $('#wlre-fclty-nm').val();
			var fcltySe = $('#wlre-fclty-se').val();
			var cttpcTelno = $('#wlre-cttpc-telno').val();
			var rnAdres = $('#wlre-rn-adres').val();
			var lnmAdres = $('#wlre-lnm-adres').val();
			var zip = $('#wlre-zip').val();
			var lat = position.y.toFixed(7);
			var lon = position.x.toFixed(8);
			var dataStdde = WLRE.getDate();
			
			if(fcltyNm == '') {
				alert("시설명을 입력해주세요");
				return
			}
			if(fcltySe == '') {
				alert("시설구분을 입력해주세요");
				return
			}
			if(cttpcTelno == '') {
				alert("전화번호를 입력해주세요");
				return
			}
			if(rnAdres == '') {
				alert("도로명주소를 입력해주세요");
				return
			}
			if(lnmAdres == '') {
				alert("지번주소를 입력해주세요");
				return
			}
			if(zip == '') {
				alert("우편번호를 입력해주세요");
				return
			}
			if(loc == '') {
				alert("위치를 입력해주세요");
				return
			}
			
			var jsonData = {
					gid: gid,
					fcltyNm: fcltyNm,
					fcltySe: fcltySe,
					cttpcTelno: cttpcTelno,
					rnAdres: rnAdres,
					lnmAdres: lnmAdres,
					zip: zip,
					lat: lat,
					lon: lon,
					dataStdde: dataStdde
			}
			
			if(confirm("수정하시겠습니까?") == true){
				loadingShowHide("show");
				$.ajax({
					url:"/job/wlre/updateWelfare.do",
					type: "POST",
					data: jsonData,
					dataType: 'json',
					success:function(result) {
					    alert("정상적으로 수정되었습니다.");
						bottomPopupOpen("welfareFacility");
					}, complete : function(){
						loadingShowHide("hide"); 
						WLRE.removeCmmPOI();
					}
				});
		    } else {
		        return;
		    }
		});
	},
	// 복지시설 POI 띄우기 
	selectWlrePOIList : function(searchFcltySe, searchFcltyNm, searchRnAdres, spitalSearch, wlreBuffer) {
		
		var	formData = new FormData($("#wlre_searchForm")[0]);
		formData.append("searchFcltySe", searchFcltySe);
		formData.append("searchFcltyNm", searchFcltyNm);
		formData.append("searchRnAdres", searchRnAdres);
		formData.append("spitalSearch", spitalSearch);
		formData.append("wlreBuffer", wlreBuffer);
		
		$.ajax({
			url:"/job/wlre/selectWlrePOIList.do",
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
						feature.set("text", item["fcltyNm"]);
						features.push(feature);
					});
					if(features.length > 0) {
						const geojson = format.writeFeatures(features)
						cmmUtil.highlightFeatures(geojson, "./images/poi/welfare_poi.png", { notMove: true, onClick: function(feature) {
							$(`.bbs-list tr[data-gid='${feature.getId()}']`).trigger('click');
						}});
					} else {
						cmmUtil.clearHighlight();
					}		
			    	
			    } else {
			    	var layerList = new Module.JSLayerList(true);
				    
			    	// 생성된어 있는 POI 레이어가 있을때 지워주기
					if(GLOBAL.LayerId.PoiLayerId != null){
						layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
						GLOBAL.LayerId.PoiLayerId = null;
						Module.XDRenderData();
					}
					if(GLOBAL.LayerId.PolygonLayerId != null) {
						layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
						GLOBAL.LayerId.PolygonLayerId = null;
						Module.XDRenderData(); 
					}
			    	
					// POI 레이어 이름은 각 해당 테이블명
					GLOBAL.LayerId.PoiLayerId = "WLRE_POI";
					var layerList = new Module.JSLayerList(true);
					GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
					
				    /*if(layerList.nameAtLayer("WLRE_POI") != null){
						layerList.nameAtLayer("WLRE_POI").removeAll();
					}*/
					
				    for(i=0; i<data.length; i++) {
				    	// z값 구해서 넣기
				    	var alt = Module.getMap().getTerrHeightFast(data[i].lon, data[i].lat);

				    	// 첫번째 row로 이동
						if(i==0) {
							var point = new Module.JSVector3D(data[i].lon, data[i].lat, alt);
							var tilt = Module.getViewCamera().getTilt();
							//GLOBAL.Camera.moveLookAt(point, 45, GLOBAL.Camera.getDirect(), alt * 10);
							GLOBAL.Camera.moveLookAt(point, tilt, GLOBAL.Camera.getDirect(), alt * 10);
				    	}
//				    	WLRE.createPOI3D(new Module.JSVector3D(data[i].lon, data[i].lat, alt), data[i].fcltyNm, data[i].gid, data[i].lon, data[i].lat);
						
						var options = {
								layer : GLOBAL.PoiLayer,
								lon : data[i].lon,
								lat : data[i].lat,
								text : data[i].fcltyNm,
								layerKey : data[i].gid,
								markerImage : "./images/poi/welfare_poi.png", // 해당 마커 이미지 Url 
								lineColor : new Module.JSColor(0, 0, 255),
						}
						
						createLinePoi2(options);
				    }
				    //버퍼 Polygon
					if(wlreBuffer != '0'){
						var layerList = new Module.JSLayerList(true);
						var color1 = new Module.JSColor(80, 51, 153, 204);
					    var color2 = new Module.JSColor(100, 51, 153, 204);
						
						// 1번
						GLOBAL.LayerId.PolygonLayerId = "Wlre_Polygon"
						var bufferPolygonLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
						if(bufferPolygonLayerCheck != null) {
							layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
							Module.XDRenderData(); 
						}
						
						bufferPolygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
						bufferPolygonLayer.setSelectable(false)
						
						if(data.length < 1) {
							return;
						}
						
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
	createPOI3D : function(vPosition, text, gid, lon, lat) {
		var layerList = new Module.JSLayerList(true);
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
//		WLRE.Layer = layerList.createLayer("WLRE_POI", Module.ELT_3DPOINT);
		GLOBAL.PoiLayer.setMaxDistance(GLOBAL.MaxDistance);
		
		// Text & image POI
		var img = new Image();
		img.onload = function() {
			// 이미지 로드 후 캔버스에 그리기
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			
			// 이미지 POI 생성
			var poi_with_text_n_image = Module.createPoint(gid + "_" + lon + "_" + lat);
			poi_with_text_n_image.setPosition(vPosition);
			poi_with_text_n_image.setImage(ctx.getImageData(0, 0, this.width, this.height).data, this.width, this.height);
			
			// z값 구해서 넣기
			var alt = Module.getMap().getTerrHeightFast(lon, lat);
			// POI 수직 라인 설정
			poi_with_text_n_image.setPositionLine(30.0 + alt, new Module.JSColor(0, 0, 255));
			
			// 텍스트 설정
			poi_with_text_n_image.setText(text);
			
			GLOBAL.PoiLayer.addObject(poi_with_text_n_image, 0);
	    };
	    img.layer = GLOBAL.PoiLayer;
	    img.src = "./images/poi/welfare_poi.png"
	},
	PoiSelect:function(e){
		Module.getMap().clearSelectObj();
		Module.XDRenderData();
		
		var layerNm = e.layerName;
		var obj = e.objKey;
		
		if(layerNm == 'WLRE_POI'){
			var strArr = obj.split('_');
			var gid = strArr[0];
			var lon = strArr[1];
			var lat = strArr[2];
			WLRE.selectWelfare(gid, lon, lat);
		} 
	},
	// 하이라이트
	wlre_sethigh:function(gid){
		if(!app2D) { //3D
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("WLRE_POI");
			for(var i = 0; i < layer.getObjectCount(); i++) {
				var point = layer.indexAtObject(i);
				if(point.getId() == gid){
				
					point.setHighlight(true);
				} else {
					point.setHighlight(false);
				}
			}
		} else { //2D
			cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
			cmmUtil.setPoiHighlight('WLRE_POI', gid);
		}
	},
	createDotPoint : function(_position, groudAltitude, objectAltitude, fcltyNm) {
		
		var layerList = new Module.JSLayerList(true);
		
		this.Layer = layerList.createLayer("WLRE_POI", Module.ELT_3DPOINT);
		this.Layer.setMaxDistance(GLOBAL.MaxDistance);
		
		var width = 230;
		var height = 30;
		
		var drawCanvas = document.createElement('canvas');
		drawCanvas.width = width;
		drawCanvas.height = height;
		
		var ctx = drawCanvas.getContext('2d');
		
		var dotSize = 10;
		this.drawDot(ctx, drawCanvas.width, drawCanvas.height, dotSize*0.5, "rgba(255, 0, 0, 0.6)", 3, 'rgba(255, 0, 0, 0.6)'); 
		
		ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
		ctx.fill();
		
		this.setText(ctx, width/2, 15, fcltyNm, "rgb(255, 255, 255)", 12);
		
		var imageData = ctx.getImageData(0, 0, width, height).data;
		
		var poi = Module.createPoint("POI" + this.pointCount);
		poi.setPosition(_position);
		poi.setImage(imageData, width, height);
		poi.addScreenPosition(0, -height*0.5+dotSize*0.5);
		
		this.Layer.addObject(poi, 0);
		
		this.pointCount++;
	},
	drawDot : function (ctx, width, height, radius, lineColor, lineWidth, fillColor) {
		
		ctx.beginPath();			
        ctx.lineWidth = 2;
        ctx.arc(width*0.5, height-radius, radius, 0, 2 * Math.PI, false);    
		ctx.closePath();
		
		ctx.fillStyle = fillColor;
		ctx.fill();
		
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.stroke();
	},
	/* 텍스트 그리기 */
	setText : function(_ctx, _posX, _posY, _value, _color, _size) {

		// 텍스트 스타일 설정
		_ctx.font = "bold "+_size+"px sans-serif";
		_ctx.textAlign = "center";
		_ctx.fillStyle = _color;

		// 텍스트 그리기
		_ctx.fillText(_value, _posX, _posY);
	},
	// 지도에서 위치 선택
	setLocation : function() {
		cmmUtil.getPositionGeom(WLRE.positionCallback);
		
		//var Position = TransformCoordinate()
		
//		var lat = 0;
//		var lon = 0;
//		
//		canvas.onmouseup = function (e) {
//			var vPosition = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));
//			lat = vPosition.Latitude;
//			lon = vPosition.Longitude;
//			
//			$('#wlre-location').val(lat.toFixed(5) + "," + lon.toFixed(5));
//			
//			canvas.onmouseup = '';
//		}
	},
	positionCallback : function(pointGeom, address) {
		$("#wlre-lnm-adres").val("경기도 " + address);
		$('#geom').val(pointGeom);
	},
	//코드정보 조회
	getCode : function(value, type){
		$.ajax({
			type : "POST",
			url : "/job/wlre/welfareCode.do",
			dataType : "json",
			success : function(result) {
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
					$("#wlre-search-fclty-se").append(html);
				} else {
					$("#wlre-fclty-se").html(html);
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