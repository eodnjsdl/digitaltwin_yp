/**
 * 체육시설 시설정보 관리 js
 */

$(document).ready(function() {
	$("#sporFacChkAll").click(function() {
		if($("#sporFacChkAll").is(":checked")) $("input[name=sporFacMngcheck]").prop("checked", true);
		else $("input[name=sporFacMngcheck]").prop("checked", false);
	});

	$("input[name=sporFacMngcheck]").click(function() {
		var total = $("input[name=sporFacMngcheck]").length;
		var checked = $("input[name=sporFacMngcheck]:checked").length;

		if(total != checked) $("sporFacChkAll").prop("checked", false);
		else $("#sporFacChkAll").prop("sporFacChkAll", true); 
	});
	
	
	
	GLOBAL.LayerId.LowPoiLayerId = "SPORTS_FAC_POI";
	resetFacMagLayer();
});

/**
 * 체육시설 시설정보 관리 화면
 * @param gid
 * @returns
 */
function sportsFacMngView(gid){
	loadingShowHide("show"); 
//	console.log(gid);
	$(".popup-sub").removeClass("opened").html("");
	var formData = new FormData();
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/sportsFacMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			
			if(status == "success") {
				$("#container").append(returnData);
				setPoint();
			}else{ 
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 체육시설 시설정보 관리 화면 페이징
 * @param pageIndex
 * @param gid
 * @returns
 */
function sportsFacMngViewPaging(pageIndex, gid){
	loadingShowHide("show"); 
	$(".popup-sub").removeClass("opened").html("");
	
	var formData = new FormData();

	pageIndex = parseInt(pageIndex);
	formData.append('pageIndex', pageIndex);
		
	gid = parseInt(gid);
	formData.append('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/sportsFacMngView.do",
		dataType : "html",
		data : formData,
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#container").append(returnData);
				
			}else{ 
				alert("ERROR!");
				return;
			} 
		},
		error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 체육시설 > 보조시설 poi
 * @returns
 */
function setPoint(){
	
	var gid = $('#gid').val();
	var pageIndex = $('#pageIndex').val();
	
//	console.log(gid);
//	console.log(pageIndex);
	
	var formData = new FormData();
	formData.append('gid', gid);
	formData.append('pageIndex', pageIndex);
	
	$.ajax({
		type : "POST",
		url : "/job/spor/sportsFacMngPoint.do",
		dataType: 'json',
		contentType: false,
        processData: false,
		data : formData,
		success : function(returnData, status){
//			console.log(returnData);
			if(status == "success") {
				for(var i=0; i<returnData.sportsList.length; i++){					
					var asstnFcltyNm = returnData.sportsList[i].asstnFcltyNm;
					var lon = returnData.sportsList[i].lon;
					var lat = returnData.sportsList[i].lat;
					
//					console.log(parseFloat(lon)+', '+parseFloat(lat)+', '+asstnFcltyNm);
					
					setFacSportsPoi(parseFloat(lon), parseFloat(lat), asstnFcltyNm);
				}
			}else{ 
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

/**
 * 체육시설 보조시설 poi 그리기
 * @param lon
 * @param lat
 * @param asstn_fclty_nm
 * @returns
 */
function setFacSportsPoi(lon, lat, asstn_fclty_nm){

	var layerList = new Module.JSLayerList(true);
	var layerNm = "SPORTS_FAC_POI";
	var pointLayer = layerList.nameAtLayer(layerNm);
//	GLOBAL.LayerId.LineLayerId = "SPORTS_POI";
	if(layerList.nameAtLayer(layerNm) != null){
		layerList.nameAtLayer(layerNm).removeAll();
	}else{
		pointLayer = layerList.createLayer(layerNm, Module.ELT_3DPOINT);
	}
	
	pointLayer.setMaxDistance(GLOBAL.MaxDistance);
	
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
		var poi_with_text_n_image = Module.createPoint("POI_"+pointLayer.getObjectCount());
		poi_with_text_n_image.setPosition(new Module.JSVector3D(parseFloat(lon), parseFloat(lat), 100));
		poi_with_text_n_image.setImage(ctx.getImageData(0, 0, this.width, this.height).data, this.width, this.height);
		
		// 텍스트 설정
		poi_with_text_n_image.setText(asstn_fclty_nm);
		
		pointLayer.addObject(poi_with_text_n_image, 0);
    };
//    img.layer = pointLayer;
    img.src = "./images/poi/icon1.png"
}

/**
 * 최대길이
 * @param object
 * @returns
 */
function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}   
}

/**
 * 체육시설 운영정보 신규 등록
 * @param gid
 * @returns
 */
function insertSportsFacMngInfo(gid){
	
	var asstn_fclty_nm= $('input[name=asstn_fclty_nm]').val();
	var oper_strt_time = $('select[name=oper_strt_time]').val()+':00';
	var oper_end_time= $('select[name=oper_end_time]').val()+':00';
	var rsrv_at= $('input:radio[name=rsrv_at]:checked').val();
	var ho_cnt= $('input[name=ho_cnt]').val();
	var fclty_dc= $('input[name=fclty_dc]').val();
	var geom= $('input[name=geom]').val();
	
	
	if(asstn_fclty_nm == '' || oper_strt_time == '' || oper_end_time == '' ||rsrv_at == '' ||ho_cnt == '' ||fclty_dc == '') {
		alert("상세정보를 입력해주세요");
		return false;
		
	}else if(geom == '') {
		alert("체육시설 위치를 선택해주세요.");
		return false;
		
	}else{
		
		// 운영정보 신규 등록

		if (!confirm("등록하시겠습니까?")) {
			// 취소(아니오) 버튼 클릭 시 이벤트
			return false;
		} else {
			loadingShowHide("show");
			
			$.ajax({
				type : "POST",
				url : "/job/spor/insertSportsFacMngInfo.do",
				dataType : "json",
				data : {
					"gid" : gid,
					"asstn_fclty_nm" : asstn_fclty_nm,
					"oper_strt_time" : oper_strt_time,
					"oper_end_time" : oper_end_time,
					"rsrv_at" : rsrv_at,
					"ho_cnt" : ho_cnt,
					"fclty_dc" : fclty_dc,
					"geom" : geom
					},
				success : function(data){
					
					console.log(data);
					
					$('.align-right').val('');
					alert("정상적으로 등록되었습니다");
					
					destroy();
					
					var lon = data.resultVO.lon;
					var lat = data.resultVO.lat;
					
					// 운영정보 관리 화면
					sportsFacMngView(gid);
				},
				error: function(request,status,error){
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				},
				complete : function (){
					loadingShowHide("hide"); 
				}
			});
		}
	}
}

/**
 * 체육시설 > 운영정보 선택 삭제
 * @returns
 */
function deleteFacSportsMng(){
	
	if (!confirm("삭제하시겠습니까?")) {
		// 취소(아니오) 버튼 클릭 시 이벤트
		return false;
	} else {
	
		var facList = "";
		
		$("input[name=sporFacMngcheck]:checked").each(function() {
		
			if(facList == ""){
				facList = $(this).val();
			} else {
				facList = facList + "," + $(this).val();
			}
		});
		
		var gid = $('#gid').val();
			gid = parseInt(gid);

		$.ajax({
			type : "POST",
			url : "/job/spor/deleteFacSportsMng.do",
			dataType : "json",
			data : {
				"gid" : gid,
				"facList" : facList
				},
			success : function(data){
				$('.align-right').val('');
				
				// 시설정보 관리 화면
				sportsFacMngView(gid);
			},
			error: function(request,status,error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			},
			complete : function (){
				loadingShowHide("hide"); 
			}
		});
	}
}

/**
 * 등록 위치 선택
 * @returns
 */
function sporFacSelLocation(){

	cmmUtil.getPositionGeom(sporFacPositionCallback);
	
	var lat = 0;
	var lon = 0;
	
	canvas.onmouseup = function (e) {
		var vPosition = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));
		lat = vPosition.Latitude;
		lon = vPosition.Longitude;

		$('#adres').val(lat.toFixed(5) + "," + lon.toFixed(5));
		
//		console.log(lat.toFixed(5) + "," + lon.toFixed(5));
		
		canvas.onmouseup = '';
	}
	/*Module.canvas.onclick = function(e) {
		
		var Projection=Module.getProjection();
		var positionString = Module.GetClickPosition();
		var position = positionString.split("_");      
		var pointX = Number(position[0]); //x 좌표
		var pointY = Number(position[1]); //y 좌표

		// 클릭이벤트 제거
		Module.canvas.onclick = "";
		
		$('input[name=xcrd]').attr('value',pointX);
		$('input[name=ycrd]').attr('value',pointY);
	};
	
	Module.XDSetMouseState(1);*/
	
}

/**
 * 위치정보 setting
 * @param pointGeom
 * @param address
 * @returns
 */
function sporFacPositionCallback(pointGeom, address) {
//	console.log("경기도 " + address);
	$('#geom').val(pointGeom);
}

//설정되어 있는 정보값들을 초기화 한다.
function destroy(){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if (mapType == "2D") {
 	
	}else{
		
		// 레이어 생성
	    var layerList = new Module.JSLayerList(true);
		
	    // 지도에서 선택 레이어 삭제처리
	    cmmUtil.drawClear();
		if(GLOBAL.StartPoint){
			GLOBAL.StartPoint = false;
			removePoint(GLOBAL.NomalIcon);
		}
		
	}
}