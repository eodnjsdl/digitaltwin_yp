$(document).ready(function(){
	ui.callDatePicker();
});

//시설예약관리
//POILsyrt를 추가해준다. 
function setPointLayer(){
	//console.log("setPointLayer()");
	/*var mapType = $('input:radio[name="mapType"]:checked').val();
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
			cmmUtil.highlightFeatures(geojson, "./images/poi/inBusinessEsta_poi.png", { notMove: true, onClick: function(feature) {
				//const coordinates = feature.getGeometry().getCoordinates();
				//const lon = coordinates[0];
				//const lat = coordinates[1];

				const poi = poiList["resultList"].find((item) => item.gid == feature.getId());
				const lon = poi.lon;
				const lat = poi.lat;
				const gid = poi.gid;
				const rsrvsn = poi.rsrvSn;

				aj_selectFaciReseMng(gid, rsrvsn, lon, lat);
			}});
		} else {
			cmmUtil.clearHighlight();
		}
	}else{
		if(highChk == ''){
			
		} else {
			// POI 오브젝트를 추가 할 레이어 생성
			var layerList = new Module.JSLayerList(true);
			
			// 생성된어 있는 POI 레이어가 있을때 지워주기
			if(GLOBAL.LayerId.PoiLayerId != null){
				layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
				GLOBAL.LayerId.PoiLayerId = null;
				Module.XDRenderData();
			}
			
			// POI 레이어 이름은 각 해당 테이블명
			GLOBAL.LayerId.PoiLayerId = "TBD_FCLTY_RSRV_MANAGE";
			GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
			
			// POI 설정
			for(var i = 0; i < poiList.resultList.length; i++){
				var pointX = Number(poiList.resultList[i].lon); //x 좌표
				var pointY = Number(poiList.resultList[i].lat); //y 좌표
				var position = TransformCoordinate(pointX, pointY, 26, 13);

				if(i == 0) {
					cmmUtil.setCameraMove(pointX, pointY);
				}
				var options = {
						layer : GLOBAL.PoiLayer,
						lon : position.x,
						lat : position.y,
						text : poiList.resultList[i].fcltyDc,
						layerKey : poiList.resultList[i].gid+"_"+poiList.resultList[i].rsrvSn+"_"+poiList.resultList[i].lon+"_"+poiList.resultList[i].lat,
						markerImage : "./images/poi/inBusinessEsta_poi.png", // 해당 마커 이미지 Url
						lineColor : new Module.JSColor(0, 0, 255)
				}
				createLinePoi2(options);
			}
			// 마우스 상태 설정
			Module.XDSetMouseState(Module.MML_SELECT_POINT);
		 }
	}*/
	/////////////////
	// 2d/3d 통합
	const features = [];
	poiList["resultList"].forEach((item) => {
		const feature = new ol.Feature(new ol.geom.Point([parseFloat(item["lon"]), parseFloat(item["lat"])]));
		//feature.setId(item["gid"]);
		if(dtmap.mod == "2D"){
			feature.setId(item["gid"]);
		}else if(dtmap.mod == "3D"){
			feature.setId("faciReseMng"+item["gid"]);
		}
		//console.log(">>>>"+item["rsrvSn"]);
		feature.set('rsrvsn', item["rsrvSn"]);			//rsrvsn 추가 / 아이콘 클릭시 상세보기 에 사용
		feature.set('facMenuNm', 'faciReseMng');		//시설예약관리	구분자 이벤트
		features.push(feature);
	});
	
	if(features.length > 0) {
		const format = new ol.format.GeoJSON();
		const geojson = format.writeFeatures(features);
		
		//console.log("geojson>>");
		//console.log(geojson);
		
		dtmap.vector.clear();
        //지도에 GeoJSON 추가
        dtmap.vector.readGeoJson(geojson, function (feature) {
            return {
                marker: {
                    src: './images/poi/inBusinessEsta_poi.png'
                },
                label: {
                    text: ''
                }
            }
        });

        dtmap.vector.fit();
		
	} else {
		dtmap.vector.clear();
	}
	
}

//페이지네이션
function fn_select_list(){
	document.getElementById("searchForm").pageIndex.value = 1;
	highChk = 'yes';
	aj_selectFaciReseMngList($("#searchForm")[0]);
}

function fn_select_linkPage(pageNo){
	document.getElementById("searchForm").pageIndex.value = pageNo;
	document.getElementById("searchForm").srchYM.value = lastSrchYM;
	highChk = 'yes';
	aj_selectFaciReseMngList($("#searchForm")[0]);
}

// 등록페이지
$("#faciRegistViewBtn").unbind('click').bind('click',function(){
	aj_insertFaciReseMngView($("#searchForm")[0]);
});

//상세페이지 취소버튼
$("#faciListBtn").unbind('click').bind('click',function(){
	document.getElementById("searchForm").pageIndex.value = lastPageIndex;
	document.getElementById("searchForm").srchYM.value = lastSrchYM;
	aj_selectFaciReseMngList($("#searchForm")[0]);
});

// 수정페이지 취소버튼
$("#faciCancelBtn").unbind('click').bind('click',function(){
	document.searchForm.pageIndex.value = lastPageIndex;
	document.searchForm.srchYM.value = lastSrchYM;
	aj_selectFaciReseMng($(this).data('gid'), $(this).data('rsrvsn'));
})

// 상세 페이지호출
$("a[name='fcrmDtl']").unbind('click').bind('click',function(){
	document.searchForm.pageIndex.value = lastPageIndex;
	document.searchForm.srchYM.value = lastSrchYM;
	//cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));

	aj_selectFaciReseMng($(this).data('gid'), $(this).data('rsrvsn'), $(this).data('lon'), $(this).data('lat'));
})

// 리셋버튼
$("#fcrmResetBtn").unbind('click').bind('click',function(){
	highChk = 'yes';
	//leftPopupOpen('faciReseMng');
	$(".lnb-facility .lnb-body #faciReseMng").trigger("click");	//시설 예약 관리 클릭 이벤트
});

// 닫기버튼 추가
$("#fcrmCloseBtn").unbind('click').bind('click',function(){
	highChk = '';
	clearMap();
});

// 하이라이트
function fcrm_sethigh(gid, rsrvSn, lon, lat) {
	if (app2D) { //2d일때 POI 하이라이트
		cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
		cmmUtil.setPoiHighlight('TBD_FCLTY_RSRV_MANAGE', gid);
	} else { //3D 일때 POI 하이라이트
		var layerList = new Module.JSLayerList(true);
		var layer = layerList.nameAtLayer("TBD_FCLTY_RSRV_MANAGE");

		if(layer.getObjectCount()!=0){
			for(var i = 0; i < layer.getObjectCount(); i++) {
				var point = layer.indexAtObject(i);
				var pointId = gid+"_"+rsrvSn+"_"+lon+"_"+lat;

//				console.log(pointId);
//				console.log(point.getId());
//				console.log(point.getId()==pointId);

				if(point.getId() == pointId){
					point.setHighlight(true);
				} else {
					point.setHighlight(false);
				}
			}
		}else{
			console.log("count is -")
		}
	}

}

// 등록, 수정시 시설명 onChange 이벤트
$(".facilNm").on("change", function(){
	var gid = $(".facilNm option:selected").val();
	
	if(!gid){	//gid 없으면 예약 시설도 초기화
		alert("초기화")
		$(".facilDtlNm").html('<option value="">시설명을 선택하세요</option>');
		return false;
	}
	
	var formData = new FormData();
	formData.append("gid", gid);
	
	$.ajax({
		type : "POST",
		url : "/job/fcrm/selectFacilAsstn.do",
		data: formData,
		dataType : "json",
		processData : false,
		contentType : false,
		success:function(data){
			$(".operStrtTime").empty();
			$(".operEndTime").empty();
			$(".rsrvAt").empty();
			$(".hoCnt").empty();
			$(".fcltyDtl").empty();
			$(".facilDtlNm").empty();
			
			//var facilDtlListHtml = '<option>선택해주세요</option>';
			var facilDtlListHtml = '<option value="">시설명을 선택하세요</option>';
			
			for(var i=0; i < data.resultList.length; i++){
				facilDtlListHtml += '<option value="' + data.resultList[i].asstnFcltySn + '">' + data.resultList[i].asstnFcltyNm + '</option>';
			}
			
			$(".facilDtlNm").append(facilDtlListHtml);
		}
	});
})

// 등록, 수정시 예약시설 선택시 onChange 이벤트 
$(".facilDtlNm").on("change", function(){
	var gid = $(".facilNm option:selected").val();
	var asstnFcltySn = $(".facilDtlNm option:selected").val();
	
	var formData = new FormData();
	formData.append("gid", gid);
	formData.append("asstnFcltySn", asstnFcltySn);
	
	$.ajax({
		type : "POST",
		url : "/job/fcrm/selectFacilAsstnDtlList.do",
		data: formData,
		dataType : "json",
		processData : false,
		contentType : false,
		success:function(data){
			$(".operStrtTime").empty();
			$(".operEndTime").empty();
			$(".rsrvAt").empty();
			$(".hoCnt").empty();
			$(".fcltyDtl").empty();
			
			if(data.resultList[0].operStrtTime == null){ $(".operStrtTime").append(''); } else { $(".operStrtTime").append(data.resultList[0].operStrtTime); }
			if(data.resultList[0].operEndTime == null){ $(".operEndTime").append(''); } else { $(".operEndTime").append(data.resultList[0].operEndTime); }
			if(data.resultList[0].rsrvAt == null){ 
				$(".rsrvAt").append(''); 
			} else if(data.resultList[0].rsrvAt == 'N') { 
				$(".rsrvAt").append('가능'); 
			} else {
				$(".rsrvAt").append('불가능'); 
			}
			if(data.resultList[0].hoCnt == null){ $(".hoCnt").append(''); } else { $(".hoCnt").append(data.resultList[0].hoCnt + '층'); } 
			if(data.resultList[0].fcltyDtl == null){ $(".fcltyDtl").append(''); } else { $(".fcltyDtl").append(data.resultList[0].fcltyDtl); }
			
			var timeHtml = '';
			var timeVal = '0';
			var timeSet = ':00';
			var timeText = '시';
			
			//시간 만 추출후 숫자로 변환
			var operStrtTime 	= data.resultList[0].operStrtTime.substring(0,2);
			var operEndTime 	= data.resultList[0].operEndTime.substring(0,2);
			if(typeof operStrtTime == "string"){
				operStrtTime 	= parseInt(operStrtTime, 10);
			}
			if(typeof operEndTime == "string"){
				operEndTime 	= parseInt(operEndTime, 10);
			}
			//console.log("operStrtTime>>"+operStrtTime);
			//console.log("operEndTime>>"+operEndTime);
			
			for(var i = operStrtTime; i <= operEndTime; i++){
				
				i += "";
				
				if(i.length == 1){
					timeVal = "0"+i;
				}else{
					timeVal = i;
				}
				
				timeHtml += "<option value=" + timeVal + timeSet + " >" + timeVal + timeText + "</option>";
			}
			
			$(".timepicker").empty();
			$(".timepicker").append(timeHtml);
			
		}
	});
	
});

// 등록페이지호출 ajax
function aj_insertFaciReseMngView(form){
	
	//loadingShowHide("show");
	ui.loadingBar("show");
	
	var formData = new FormData();
	document.searchForm.pageIndex.value = lastPageIndex;
	document.searchForm.srchYM.value = lastSrchYM;
	formData.append('srchYM', lastSrchYM);
	
	$.ajax({
		type : "POST",
		url : "/job/fcrm/insertFaciReseMngView.do",
		data: formData,
		dataType : "html",
		async: false,
		processData : false,
		contentType : false,
		success : function(returnData, status){
			if(status == "success") {		
				$(".facility-rsve-mng-body").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				
				var now = new Date();
				var year = now.getFullYear();
				var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
				var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

				$("#rsrvDe").attr("value", year+"-"+mon+"-"+day);
				
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			//loadingShowHide("hide");
			ui.loadingBar("hide");
			/*setTime();*/
		}
	});
}

// 상세페이지 ajax
function aj_selectFaciReseMng(param1, param2, lon, lat){
	//console.log("aj_selectFaciReseMng(param1, param2, lon, lat)");
	//console.log(param1);
	//console.log(param2);
	//console.log(lon);
	//console.log(lat);
	
	//loadingShowHide("show");
	ui.loadingBar("show");
	
	highChk = '';
	$(".facility-rsve-mng-body").html("");
	
	//if(lon != null){
	//	cmmUtil.setCameraMove(lon, lat);
	//}

	//fcrm_sethigh(param1, param2, lon, lat); //POI 하이라이트
	/////////////////////////
	if(param1){
		//dtmap.vector.select(param1);	//지도에  표시
		///////
		if(dtmap.mod == "2D"){	
			dtmap.vector.select(param1);
		}else if(dtmap.mod == "3D"){
			var coord = "faciReseMng"+param1;
			dtmap.vector.select(coord);	//지도에  표시
		}
	}

	var formData = new FormData();
	document.searchForm.pageIndex.value = lastPageIndex;
	document.searchForm.srchYM.value 	= lastSrchYM;
	
	formData.append('gid', param1);
	formData.append('rsrvSn', param2);
	formData.append('srchYM', lastSrchYM);

	$.ajax({
		type : "POST",
		url : "/job/fcrm/selectFaciReseMng.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$(".facility-rsve-mng-body").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			//loadingShowHide("hide"); 
			ui.loadingBar("hide");
		}
	});
}

// 상세 > 수정페이지 ajax
function aj_updateFaciReseMngView(param1, param2){
	//console.log("aj_updateFaciReseMngView(param1, param2)");
	//console.log(param1);
	//console.log(param2);
	
	//loadingShowHide("show");
	ui.loadingBar("show");
	
	var formData = new FormData();
	
	formData.append('gid', param1);
	formData.append('rsrvSn', param2);
	
	$.ajax({
		type : "POST",
		url : "/job/fcrm/updateFaciReseMngView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$(".facility-rsve-mng-body").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			//loadingShowHide("hide");
			ui.loadingBar("hide");
		}
	});
}

// 시간 설정
var setTime = function(){
	
	var timeHtml = '';
	var timeVal = '0';
	var timeSet = ':00';
	var timeText = '시';
	
	for(var i = 0; i < 24; i++){
		if(i < 10){
			timeVal = "0" + i;
		} else {
			timeVal = i;
		}
		timeHtml += "<option value=" + timeVal + timeSet + " >" + timeVal + timeText + "</option>";
	}
	
	$(".timepicker").append(timeHtml);
} 


