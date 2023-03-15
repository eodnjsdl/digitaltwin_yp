/**
 * 체육시설 js
 */

$(document).ready(function(){
	//엑셀 저장
	$('#sportsExcelDown').click(function(){
		window.location.href ="/job/spor/getAllSportsExcel.do";
//		if(SPORTS_TOTALCOUNT == 0){
//			alert('다운로드할 이력이 없습니다.');
//			return;
//		}else{
//			window.location.href ="/job/spor/getAllSportsExcel.do";
//		}
	});
//	$("input[name=sportsAreaDrawing]").attr('disabled', true);
	
	Module.XDSetMouseState(6);
});

//체육시설 목록 조회결과
var SPORTS_TOTALCOUNT;

/**
 * geom 값 넣기
 * @param pointGeom
 * @param address
 * @returns
 */
function positionCallback(pointGeom, address){
//	console.log(" pointGeom : " +  pointGeom )
//	console.log("address : " + address)
	$('input[name=adres]').attr('value',"경기도 " + address);
	$("#geom").val(pointGeom);
}

/**
 * 체육시설 위치 선택
 * @returns
 */
function sporSelLocation(){
	Module.canvas.onclick = function(e) {
		var Projection=Module.getProjection();
		var positionString = Module.GetClickPosition();
		var position = positionString.split("_");      
		var pointX = Number(position[0]); //x 좌표
		var pointY = Number(position[1]); //y 좌표

		// 클릭이벤트 제거
		Module.canvas.onclick = "";
		$('input[name=adres]').attr('value',pointX+" "+pointY);
		$('input[name=xcrd]').attr('value',pointX);
		$('input[name=ycrd]').attr('value',pointY);
	};
	
	Module.XDSetMouseState(1);
	
}

/**
 * 체육시설 등록 목록 호출 ajax
 * @param form
 * @returns
 */
function insertSportsView(form){
	loadingShowHide("show");
	var	formData = new FormData(form);
	$.ajax({
		type : "POST",
		url : "/job/spor/insertSportsView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#container").append(returnData); //팝업 append
				YYMM_datePicker()
//				callDatePicker(); //date picker
				
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});

	
}

/**
 * 체육시설 삭제 
 * @param gid
 * @returns
 */
function deleteSports(gid){
	if (confirm("체육시설 정보를 삭제 하시겠습니까?") == true){    //확인
		loadingShowHide("show");
		$.ajax({
			type : "POST",
			url : "/job/spor/deleteSports.do",
			dataType : "json",
			data : {"gid" : gid},
			success : function(data){
				closeSubPopup();
				fn_select_physicalEducation_facility_list();
			},
			complete : function (){
				loadingShowHide("hide"); 
			}
		});
	}else{
		return false;
	}
}

/**
 * 체육시설 정보 등록
 * @returns
 */
function insertSports(){
	var fclty_nm = $('input[name=fclty_nm]').val();
	var adres = $('input[name=adres]').val();
	var fclty_ty = $('#fclty_ty option:selected').val();
	var oper_mthd = $('#oper_mthd option:selected').val();
	var erc_ct = $('input[name=erc_ct]').val();
	var fond_de = $('input[name=fond_de]').val();
	var buld_size = $('input[name=buld_size]').val();
	var lad_size = $('input[name=lad_size]').val();
	var manage_nmpr = $('input[name=manage_nmpr]').val();
	var fyer_utlztn_nmpr = $('input[name=fyer_utlztn_nmpr]').val();
	var chrg_dept_nm =  $('#chrg_dept_nm option:selected').val();
	var charger_nm = $('input[name=charger_nm]').val();
	var cttpc_telno = $('input[name=cttpc_telno]').val();
	var fclty_sumry = $('input[name=fclty_sumry]').val();
	var geom = $('#geom').val();
	
	if(fclty_nm == '' || adres == '' || fclty_ty == '' ||oper_mthd == '' ||erc_ct == '' ||fond_de == '' || buld_size == '' || lad_size == '' || manage_nmpr == ''
		 || fyer_utlztn_nmpr == '' || chrg_dept_nm == '' || charger_nm == '' || cttpc_telno == '' || fclty_sumry == '' || geom == '') {
		alert("상세정보를 입력해주세요");
		return false;
		
	}else{
		
		if(confirm("등록하시겠습니까?") == true){
			loadingShowHide("show");
			
			$.ajax({
				type : "POST",
				url : "/job/spor/insertSports.do",
				dataType : "json",
				data : {
					"fcltyNm" : fclty_nm,
					"adres" : adres,
					"fcltyTy" : fclty_ty,
					"operMthd" : oper_mthd,
					"ercCt" : erc_ct,
					"fondDe" : fond_de,
					"buldSize" : buld_size,
					"ladSize" : lad_size,
					"manageNmpr" : manage_nmpr,
					"fyerUtlztnNmpr" : fyer_utlztn_nmpr,
					"chrgDeptNm" : chrg_dept_nm,
					"chargerNm" : charger_nm,
					"cttpcTelno" : cttpc_telno,
					"fcltySumry" : fclty_sumry,
					"geom" : geom
					},
				success : function(data){
					
					$('.sporInput').val('');
					
					alert("정상적으로 등록되었습니다.");
					bottomPopupOpen('physicalEducationFacility');
					fn_select_physicalEducation_facility_list();
					removePoint(GLOBAL.NomalIcon);
				},
				error: function(request,status,error){
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				},
				complete : function (){
					loadingShowHide("hide"); 
				}
			});
		}else{
			return;
		}
	}
}

/**
 * 체육시설 상세정보
 * @param gid
 * @param lon
 * @param lat
 * @returns
 */
function selectSportsDetail(gid,lon,lat){
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	
	var d_lon = parseFloat(lon);
	var d_lat = parseFloat(lat);
	
	spor_sethigh(gid); //해당 poi 하이라이트
	
	if(lon != null){
		// 지도 이동
		cmmUtil.setCameraMove(d_lon, d_lat, true);
	}

	$(".popup-sub").removeClass("opened").html("");
	
	var formData = new FormData();
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/selectSportsDetail.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#container").append(returnData);
//				callDatePicker(); //date picker
				YYMM_datePicker()
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}
	});
}

/**
 * 체육시설 수정 호출 
 * @param gid
 * @returns
 */
function updateSportsView(gid){
	$(".popup-sub").removeClass("opened").html("");
	var formData = new FormData();
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/updateSportsView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#container").append(returnData); //팝업 append
//				callDatePicker(); //date picker		
				YYMM_datePicker()
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 체육시설 수정 ajax
 * @param gid
 * @returns
 */
function updateSports(gid){
	
	if (confirm("체육시설 정보를 수정 하시겠습니까?") == true){    //확인
		loadingShowHide("show");
		
		$.ajax({
			
			type : "POST",
			url : "/job/spor/updateSports.do",
			dataType:"json",
			data: {
				"gid" : gid,
				"fcltyNm" : $('input[name=fclty_nm]').val(),
				"adres" : $('input[name=adres]').val(),
				"fcltyTy" : $('#fclty_ty option:selected').val(),
				"operMthd" : $('#oper_mthd option:selected').val(),
				"ercCt" : $('input[name=erc_ct]').val(),
				"fondDe" : $('input[name=fond_de]').val(),
				"buldSize" : $('input[name=buld_size]').val(),
				"ladSize" : $('input[name=lad_size]').val(),
				"manageNmpr" : $('input[name=manage_nmpr]').val(),
				"fyerUtlztnNmpr" : $('input[name=fyer_utlztn_nmpr]').val(),
				"chargerNm" : $('input[name=charger_nm]').val(),
				"chrgDeptNm" : $('#chrg_dept_nm option:selected').val(),
				"cttpcTelno" : $('input[name=cttpc_telno]').val(),
				"fcltySumry" : $('input[name=fclty_sumry]').val(),
				"geom" : $('#geom').val()
			},
			
			success : function(returnData, status){
				
				if(status == "success") {
					alert("정상적으로 수정되었습니다.");
					bottomPopupOpen("physicalEducationFacility");
//					selectSportsDetail(gid); //상세보기
//					fn_select_physicalEducation_facility_list(); // 체육시설 목록
				}else{ 
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				} 
			},error: function(request,status,error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			},
			complete : function (){
				loadingShowHide("hide"); 
			}
		});
		
	}else{
		return false;
	}	
}

/**
 * 공간검색 조회
 * @param id
 * @returns
 */
function Sports_spitalSearch(id){
	var result = cmmUtil.spitalSearch(id);
	//console.log ("공간검색 조회 결과 : " + result);
}

/**
 * 체육시설 poi ajax
 * @param sporSearchAdres
 * @param sporSearchAlsfc_nm
 * @param sporSpitalSearch
 * @param sportsBuffer
 * @returns
 */
function sportsPOIList (sporSearchAdres,sporSearchAlsfc_nm,sporSpitalSearch,sportsBuffer,sports_fcty_tp_cd,sports_oper_mthd_cd){
	if(sporSpitalSearch == null){
		sporSpitalSearch = '';
	}
//	var	formData = new FormData();
	var	formData = new FormData($("#spor_searchForm")[0]);
	formData.append('sports_fcty_tp_cd', sports_fcty_tp_cd);
	formData.append('sports_oper_mthd_cd',sports_oper_mthd_cd);
	formData.append("sporSearchAdres", sporSearchAdres);
	formData.append("sporSearchAlsfc_nm", sporSearchAlsfc_nm);
	formData.append("sporSpitalSearch", sporSpitalSearch.toString());
	formData.append("sportsBuffer", sportsBuffer);
	
	$.ajax({
		url : "/job/spor/poi_selectSportsList.do",
		type: "POST",
		data : formData,
		dataType: 'json',
		contentType: false,
        processData: false,
		success : function(result){
			var d_lon;
			var d_lat;
			var name_;
			var data = result;
			if(app2D) {
		    	const format = new ol.format.GeoJSON();
				const features = [];
				data["poi_list"].forEach((item) => {
					const geometry = new ol.geom.Point([parseFloat(item["lonLon"]), parseFloat(item["latLat"])]);
					const feature = new ol.Feature(geometry.transform("EPSG:4326", store.getPrj()));
					feature.setId(item["gid"]);
					feature.set("text", item["fclty_nm"]);
					features.push(feature);
				});
				if(features.length > 0) {
					const geojson = format.writeFeatures(features)
					cmmUtil.highlightFeatures(geojson, "./images/poi/sports_poi.png", { notMove: true, onClick: function(feature) {
						$(`.bbs-list tr[data-gid='${feature.getId()}']`).trigger('click');
					}});
				} else {
					cmmUtil.clearHighlight();
				}		
			} else {
				var layerList = new Module.JSLayerList(true);
				
				// 생성되어 있는 POI 레이어가 있을때 지워주기
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
				var layerList = new Module.JSLayerList(true);
				GLOBAL.LayerId.PoiLayerId = "SPORTS_POI";
				GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
				
				//조회결과 개수 확인
				SPORTS_TOTALCOUNT = data.poi_list.length;

				for (var i = 0; i < data.poi_list.length; i++) {
					d_lon = parseFloat(data.poi_list[i].lonLon);
					d_lat = parseFloat(data.poi_list[i].latLat);
					name_ = data.poi_list[i].fcltyNm;
					gid = data.poi_list[i].gid;
					
					// 첫번째 row로 이동
					if(i==0) {
			    		var alt = Module.getMap().getTerrHeightFast(d_lon, d_lat);
						var point = new Module.JSVector3D(d_lon, d_lat, alt);
						var tilt = Module.getViewCamera().getTilt();
						//GLOBAL.Camera.moveLookAt(point, 45, GLOBAL.Camera.getDirect(), alt * 10);
						GLOBAL.Camera.moveLookAt(point, tilt, GLOBAL.Camera.getDirect(), alt * 10);
			    	}
					
					var options = {
							layer : GLOBAL.PoiLayer,
							lon : d_lon,
							lat : d_lat,
							text : name_,
							layerName : 'SPORTS_POI',
							layerKey : data.poi_list[i].gid,
							markerImage : "./images/poi/sports_poi.png", // 해당 마커 이미지 Url 
							lineColor : new Module.JSColor(0, 0, 255),
					}
					
					createLinePoi2(options);
					
				}
				
				//버퍼 영역설정
				if(sportsBuffer != '0' || sportsBuffer != 0){
					
					var BUFFER_POLYGON_RED = new Module.JSColor(100, 255, 0, 0);
					var BUFFER_POLYGON_BLUE = new Module.JSColor(100, 0, 0, 255);
					var color1 = new Module.JSColor(80, 51, 153, 204);
				    var color2 = new Module.JSColor(100, 51, 153, 204);
				    
					
					//폴리곤
					GLOBAL.LayerId.PolygonLayerId = "Sports_Polygon"
					var bufferPolygonLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
					if(bufferPolygonLayerCheck != null) {
						layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
						Module.XDRenderData(); 
					}
					
					bufferPolygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
					bufferPolygonLayer.setSelectable(false)
					
					var buffurAreaAsText = data.poi_list[0].bufferarea.split("(")[2];
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
			
			$(".scroll-y").mCustomScrollbar({
				scrollbarPosition:"outside"
			});
				
			
		},error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 체육시설 POI 하이라이트 해주는 함수.
 * @param gid
 */
function spor_sethigh(gid){
	if(!app2D) {
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("SPORTS_POI");
		for(var i = 0; i < layer.getObjectCount(); i++) {
			var point = layer.indexAtObject(i);
			if(point.getId() == gid){
			
				point.setHighlight(true);
			} else {
				point.setHighlight(false);
			}
		}
	} else {
		cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
		cmmUtil.setPoiHighlight('SPORTS_POI', gid);
	}
}

/**
 * poi text 설정
 * @param _ctx
 * @param _posX
 * @param _posY
 * @param _value
 * @param _color
 * @param _size
 * @returns
 */
function setText(_ctx, _posX, _posY, _value, _color, _size) {

	// 텍스트 문자열 설정
	var strText = (isNaN(_value)) ? _value : this.setTextComma(_value.toFixed(2));

	// 텍스트 스타일 설정
	_ctx.font = "bold "+_size+"px sans-serif";
	_ctx.textAlign = "center";
	_ctx.fillStyle = _color;

	// 텍스트 그리기
	_ctx.fillText(strText, _posX, _posY);
}

function drawDot(ctx, width, height, radius, lineColor, lineWidth, fillColor) {
	
	ctx.beginPath();			
    ctx.lineWidth = 2;
    ctx.arc(width*0.5, height-radius, radius, 0, 2 * Math.PI, false);    
	ctx.closePath();
	
	ctx.fillStyle = fillColor;
	ctx.fill();
	
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = lineColor;
	ctx.stroke();
}

/**
 * 체육시설 poi 그리기
 * @param vPosition
 * @param text
 * @param gid
 * @param lon
 * @param lat
 * @returns
 */
function sportsPOI3D(vPosition, text, gid, lon, lat) {
	var layerList = new Module.JSLayerList(true);
	GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
//	var Layer = layerList.createLayer("SPORTS_POI", Module.ELT_3DPOINT);
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
    img.src = "./images/poi/sports_poi.png"
}

/**
 * 체육시설 poi 선택
 * @param e
 * @returns
 */
function sporPoiSelect(e) {
	Module.getMap().clearSelectObj();
	Module.XDRenderData();
	
	var layerNm = e.layerName;
	var obj = e.objKey;
	
	if(layerNm == 'SPORTS_POI'){
		var strArr = obj.split('_');
		var gid = strArr[0];
		var lon = strArr[1];
		var lat = strArr[2];
		selectSportsDetail(gid, lon, lat);
	} 
}

/**
 * 체육시설 상세보기로 이동
 * @param gid
 * @param lon
 * @param lat
 * @returns
 */
function backDetail(gid, lon, lat){
	$("#selectSafetyFacilLampMng").addClass("opened");
	destroy();
	
//	console.log(gid+', '+lon+', '+lat);
	
	selectSportsDetail(gid, lon, lat); //상세보기
}

/**
 * 체육시설 보조시설 poi 레이어 초기화
 * @returns
 */
function resetFacMagLayer(){
	var layerList = new Module.JSLayerList(true);
	var layerNm = "SPORTS_FAC_POI";
	if(layerList.nameAtLayer(layerNm) != null){
		layerList.delLayerAtName(layerNm);
	}
}

/**
 * 신규 등록창 취소
 * @returns
 */
function cancleSportsPopup(){
	$('#selectSafetyFacilLampMng').removeClass('opened');
	removePoint(GLOBAL.NomalIcon);
	closeSubPopup();
}

/**
 * 데이트 피커 년/월 선택
 * @returns
 */

function YYMM_datePicker(){
	//input을 datepicker로 선언
	$("#spor_datepicker").datepicker({
	    dateFormat: 'yy-mm-dd' //달력 날짜 형태
	    ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	    ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
	    ,changeYear: true //option값 년 선택 가능
	    ,changeMonth: true //option값  월 선택 가능                
	    ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시 
	   	,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
	    ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
	    ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
	    ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
	    ,buttonImage: '/images/icon/form-calendar.svg' //버튼 이미지 경로
	    ,buttonText: "선택" //버튼 호버 텍스트              
	    ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
	});  
}