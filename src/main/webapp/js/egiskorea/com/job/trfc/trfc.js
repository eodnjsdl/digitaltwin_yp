//$(document).ready(function(){
$(function(){
	
//	callDatePicker();
	/*if(poiList != ""){
		setPointLayer();
	}*/
	
//	console.log( "Trfc - document ready - GLOBAL.LayerId : " + JSON.stringify( GLOBAL.LayerId ) )
	
	// 교통시설 셀렉트박스 체인지 함수
	$("#selectBoxTrfc").change(function(){
		
		var thisValue = $(this).val();
		
		initSearchObj();
		
		
		$("#rightSubPopup").removeClass("opened").html("");
		
		// 도로구간
		if(thisValue == 'roadSection') {
			
			
			aj_selectTransportationFacilityList($("#tmpForm")[0]);
			layerNm = 'tgd_sprd_manage';
			
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		// 철도선로
		} else if(thisValue == 'railroadTrack') {
			
//			console.log("trfc.js $(\"#selectBoxTrfc\").change(function() =======  start  =======");
			aj_selectRailroadTrackList($("#tmpForm")[0]);
			layerNm = 'tgd_sprl_rlway';
			
//			cqlFilter = '';
			
			// lineString
//			loadWMS_3D(layerNm, crs, cqlFilter)
//			console.log("trfc.js $(\"#selectBoxTrfc\").change(function() =======  end  =======");
			
		// 철도역사
		} else if(thisValue == 'railRoadStation') {
			
			aj_selectRailroadStationList($("#tmpForm")[0]);
			layerNm = 'tgd_sprl_statn';
			
			// polygon
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		// 지하철선로
		} else if(thisValue == 'subwayTrack') {
			
			aj_selectSubwayTrackList($("#tmpForm")[0]);
			layerNm = 'tgd_spsb_rlway';
			
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		// 지하철역사
		} else if(thisValue == 'subwayStation') {
			
			aj_selectSubwayStationList($("#tmpForm")[0]);
			layerNm = 'tgd_spsb_statn';
			
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		// 교량
		} else if(thisValue == 'bridge') {
			
			aj_selectBridgeList($("#tmpForm")[0]);
			layerNm = 'tgd_spot_bridge';
			
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		// 고가도로
		} else if(thisValue == 'overpass') {
			
			aj_selectOverpassList($("#tmpForm")[0]);
			layerNm = 'tgd_spot_overpass';
			
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		// 터널
		} else if(thisValue == 'tunnel') {
			
			aj_selectTunnelList($("#tmpForm")[0]);
			layerNm = 'tgd_spot_overpass';
			
//			loadWMS_3D(layerNm, crs, cqlFilter)
			
		}

	}); // $("#selectBoxTrfc").change(function(){

	
	// 교통시설 공간검색 radio버튼 이벤트
	$("input[name=trfcSelect]").on('change',function(){
//		debugger;
		var flag = $("input[name=trfcSelect]:checked").val();
		var spatialVal = $("input[name=trfcAreaDrawing]:checked").val();
		if(flag == 2){
			$(".areaSrchTool").show();
			cmmUtil.spitalDraw(spatialVal);
		} else {
			$(".areaSrchTool").hide();
			cmmUtil.drawClear();
		}
	});
	
	// 교통시설 공간검색 radio버튼 이벤트
	$("input[name=trfcAreaDrawing]").on('change',function(){
//		debugger;
		var spatialVal = $("input[name=trfcAreaDrawing]:checked").val();
		cmmUtil.spitalDraw(spatialVal);
	});
		
	
	$(".trfc .search").on('click',function(){
		
		trfcSearchObj.searchFlag = true
		
	})
	
	// 속성검색시
	$(".waterProperty .search").on('click', function(){

//	    alert("속성검색")
//	    debugger;
//	    trfcSearchObj.searchFlag = true;
		
		if(trfcSearchObj.searchFlag == true) {
			
			trfcSearchObj.searchType.attrSearch		= true;
			trfcSearchObj.searchType.spatialSearch	= false;
			$("#searchType").val("attrSearch")
			
//			console.log("속성검색시 : " + trfcSearchObj.searchType.attrSearch)
		}
	    
	})

	// 공간검색 ui 이벤트
	$(".waterSpace .search").on('click', function(){

//	    alert("공간검색")
//	    debugger;
//	    trfcSearchObj.searchFlag = true;
		
		if(trfcSearchObj.searchFlag == true) {
			
			trfcSearchObj.searchType.attrSearch		= false;
			trfcSearchObj.searchType.spatialSearch	= true;
			$("#searchType").val('spatial')
			
//			console.log("공간검색시 : " + trfcSearchObj.searchType.spatialSearch)
		}
	    
	})
	
	
	// 교통시설 엑셀다운로드 버튼
	$(".trfcExcelDownload").on("click", function(){
		
//		let formName = $(this).attr('id');
//		document.getElementById("searchForm").emdKorNm.value = $("#emdKorNm").val();
//		document.getElementById("searchForm").trfcSelect.value = lastManageSeSearch;
//		document.getElementById("searchForm").detailPrposSeSearch.value = lastDetailPrposSeSearch;
//		document.getElementById("searchForm").fcltsSttusSearch.value = lastFcltsSttusSearch;
//		document.getElementById("searchForm").spatialSearch.value = lastspatialSearch;
//		document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
		
//		$("form[name='"+ formName + "']").attr('onsubmit', '');
//		$("form[name='"+ formName + "']").attr('action', url);
//		$("form[name='"+ formName + "']").submit();
//		$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;');
//		$("form[name='"+ formName + "']").attr('action', '');
		
		let formName = $(this).attr('id');
		let url = '/job/trfc/' + formName + 'Download.do';
		
		var fn_list = '';
		var fn_return = '; return false;';
		
		var spatialSearch = $(".waterSpace").hasClass("on");
		
		var spatialSearchVal = cmmUtil.spitalSearch('trfc');
		
		var html = '';
		
		if(spatialSearch == true) {
			var buffer = $("#bufferCnt").val();
			if(buffer && buffer > 0) {
				const wkt = cmmUtil.getSelectFeatureWKT();
				if(wkt) {
					cmmUtil.showBufferGeometry(wkt, buffer);
				}
			}
			html += '<input type="hidden" name="spatialSearch" id="spatialSearch" value="' + spatialSearchVal + '">'
			
			$("#searchForm").append(html)
		}
		
		
		
		// 도로구간
		if(formName == 'selectRoadSectionExcelList') {
			
			fn_list = 'fn_select_transportation_facility_list()'
					
		// 철도선로
		} else if(formName == '"selectRailroadTrackExcelList"') {
			
			fn_list = 'fn_select_railroad_track_list()'
				
		// 철도역사
		} else if(formName == 'selectRailroadStationExcelList') {
			
			fn_list = 'fn_select_railroad_station_list()'
				
		// 지하철선로
		} else if(formName == 'selectSubwayTrackExcelList') {
			
			fn_list = 'fn_select_subway_track_list()'
			
		// 지하철역사
		} else if(formName == 'selectSubwayStationExcelList') {
			
			fn_list = 'fn_select_subway_station_list()'
			
		// 교량
		} else if(formName == 'selectBridgeExcelList') {
			
			fn_list = 'fn_select_bridge_list()'
			
		// 고가도로
		} else if(formName == 'selectOverpassExcelList') {
			
			fn_list = 'fn_select_overpass_list()'
					
		// 터널
		} else if(formName == 'selectTunnelExcelList') {
			
			fn_list = 'fn_select_tunnel_list()'
		}
		
		fn_list = fn_list+fn_return;
		
		
		$("form[name='searchForm']").attr('onsubmit', '');
		$("form[name='searchForm']").attr('action', url);
		$("form[name='searchForm']").submit();
//		$("form[name='searchForm']").attr('onsubmit', 'fn_select_list(); return false;');
		$("form[name='searchForm']").attr('onsubmit', fn_list);
		$("form[name='searchForm']").attr('action', '');
		

		
	});
	
	var spatial;
	
	if(trfcSearchObj.searchFlag == true && trfcSearchObj.searchType.spatialSearch == true){
		spatial = true
	}
	
	// 레이어 표출
	geomFromPointArray(geomData, spatial);
	
	
});

// ################################################# 전역변수 zone

//레이어 관리
var layerNm = '';

// crs > 좌표계
var crs = '5179';

var sig_cd = '41830';

// cqlFilter
var cqlFilter = 'CQL_FILTER=sig_cd=\''+sig_cd+'\'&';

// 공간검색
var spatialSearch = '';


// #### 조회여부 예외처리 부분 ####
// 조회 타입 object
//var trfcSearchObj;
if(trfcSearchObj == undefined) {
	var trfcSearchObj = {
			
		// 조회결과 - 조회결과인지 아닌지 체크하는 flag
		searchFlag : false,
		
		// 검색종류 - 속성검색인지 공간검색인지 체크
		searchType : {
			attrSearch : true,		// 속성검색
			spatialSearch : false	// 공간검색
		}
			
	};
}

function initSearchObj() {
	
	trfcSearchObj.searchFlag = false;
	trfcSearchObj.searchType.attrSearch		= true
	trfcSearchObj.searchType.spatialSearch	= false
	
}

//하이라이트
function trfc_sethigh(gid){
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("Trfc_Poi");
	
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
// ################################################# 전역변수 zone


/**
 *  ################################################# 도로구간 #################################################
 */
		
// 교통시설 > 도로구간 상세보기
function aj_selectTransportationFacility(form, gid){
	
//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectTransportationFacility.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
				/*
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				*/
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
 * ################################################# 도로구간 #################################################
 */



/**
 * ################################################# 철도선로 #################################################
 */

// 교통시설 철도선로 목록 호출
function aj_selectRailroadTrackList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectRailroadTrackList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


// 교통시설 철도선로 상세보기
function aj_selectRailroadTrack(form, gid){
	
//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectRailroadTrack.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 철도선로 #################################################
 */




/**
 * ################################################# 철도역사 #################################################
 */


// 교통시설 철도역사 목록 호출
function aj_selectRailroadStationList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectRailroadStationList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


// 교통시설 철도역사 상세보기
function aj_selectRailroadStation(form, gid){

//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectRailroadStation.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 철도역사 #################################################
 */


/**
 * ################################################# 지하철선로 #################################################
 */

//교통시설 지하철선로 목록 호출
function aj_selectSubwayTrackList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectSubwayTrackList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


// 교통시설 지하철선로 상세보기
function aj_selectSubwayTrack(form, gid){

//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectSubwayTrack.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 지하철선로 #################################################
 */



/**
 * ################################################# 지하철역사 #################################################
 */

// 교통시설 지하철역사 목록 호출
function aj_selectSubwayStationList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectSubwayStationList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


// 교통시설 지하철역사 상세보기
function aj_selectSubwayStation(form, gid){

//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectSubwayStation.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 지하철역사 #################################################
 */


/**
 * ################################################# 교량 #################################################
 */

// 교통시설 교량 목록 호출
function aj_selectBridgeList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectBridgeList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


//교통시설 교량 상세보기
function aj_selectBridge(form, gid){

	//debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData();
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectBridge.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 교량 #################################################
 */


/**
 * ################################################# 고가도로 #################################################
 */

//교통시설 고가도로 목록 호출
function aj_selectOverpassList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectOverpassList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


//교통시설 고가도로 상세보기
function aj_selectOverpass(form, gid){

//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectOverpass.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 고가도로 #################################################
 */






/**
 * ################################################# 터널 #################################################
 */

//교통시설 터널 목록 호출
function aj_selectTunnelList(form, searchType){
	
	loadingShowHide("show");
	
	var spatialSearch = ''; 
	
//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		spatialSearch = cmmUtil.spitalSearch('trfc');
	}
	
	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectTunnelList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#bottomPopup").html(returnData);
				
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


//교통시설 터널 상세보기
function aj_selectTunnel(form, gid){

//	debugger;
	
	loadingShowHide("show");
	$(".popup-sub").removeClass("opened").html("");
	
	$('.bbs-list tbody tr').removeClass('active');
	$('#'+gid).addClass('active');
	cmmUtil.setCameraMove($('#'+gid).data('lon'), $('#'+gid).data('lat'));
	
	if(!app2D){
		trfc_sethigh(gid);
	}
	
	var formData = new FormData(form);
	formData.set('gid', gid);
	
	$.ajax({
		type : "POST",
		url : "/job/trfc/selectTunnel.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
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
 * ################################################# 터널 #################################################
 */




// 레이어 표출 함수
function geomFromPointArray(geom, spatial) {
	
//	console.log( "Trfc fn - geomFromPointArray() 시작부분 - GLOBAL.LayerId : " + JSON.stringify( GLOBAL.LayerId ) )
	
	
	// 셀박값
	var selectBoxTrfcVal = $("#selectBoxTrfc").val();
	// 포인트 텍스트 이름 , poi 변수 선언
	var pointTextNm, poi;	
	if(app2D) {
		const wktFormat = new ol.format.WKT();
		const format = new ol.format.GeoJSON();
		const features = [];
		geom.forEach((item) => {
			// 포인트 텍스트 이름 설정
			// 도로구간
			if(selectBoxTrfcVal == 'roadSection') {
				pointTextNm = item.rn;
				poi = './images/poi/roadSection_poi.png'
			// 철도선로
			} else if(selectBoxTrfcVal == 'railroadTrack') {
				pointTextNm = item.korRlrNm;
				poi = './images/poi/railroadTrack_poi.png'
			// 철도역사
			} else if(selectBoxTrfcVal == 'railRoadStation') {
				pointTextNm = item.korStaNm;
				poi = './images/poi/railroadStation_poi.png'
			// 지하철선로
			} else if(selectBoxTrfcVal == 'subwayTrack') {
				pointTextNm = item.korSbrNm;
				poi = './images/poi/subwayTrack_poi.png'
			// 지하철역사
			} else if(selectBoxTrfcVal == 'subwayStation') {
				pointTextNm = item.korSubNm;
				poi = './images/poi/subwayStation_poi.png'
			// 교량
			} else if(selectBoxTrfcVal == 'bridge') {
				pointTextNm = item.korBriNm;
				poi = './images/poi/bridge_poi.png'
			// 고가도로
			} else if(selectBoxTrfcVal == 'overpass') {
				pointTextNm = item.korOveNm;
				poi = './images/poi/overpass_poi.png'
			// 터널
			} else if(selectBoxTrfcVal == 'tunnel') {
				pointTextNm = item.tunKorNm;
				poi = './images/poi/tunnel_poi.png'
			}
			const geometry = wktFormat.readGeometry(item["geom"]);
			const feature = new ol.Feature(geometry.transform("EPSG:4326", store.getPrj()));
			feature.setId(item["gid"]);
			feature.set("text", pointTextNm);
			features.push(feature);
		});
		if(features.length > 0) {
			const geojson = format.writeFeatures(features)
			cmmUtil.highlightFeatures(geojson, poi, { notMove: true, onClick: function(feature) {
				$(`.bbs-list tr[data-gid='${feature.getId()}']`).trigger('click');
			}});
		} else {
			cmmUtil.clearHighlight();
		}
	} else {
		
//		debugger;
		
		var layerList = new Module.JSLayerList(true);
		
		// 생성되어 있는 POI 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.PoiLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
			GLOBAL.LayerId.PoiLayerId = null;
			Module.XDRenderData();
		}
		// 생성되어있는 LINE 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.LineLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId).removeAll();
			GLOBAL.LayerId.LineLayerId = null;
			Module.XDRenderData();
		}
		// 생성되어있는 POLYGON 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.PolygonLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
			GLOBAL.LayerId.PolygonLayerId = null;
			Module.XDRenderData();
		}
		  
		var lineLayer, polygonLayer, bufferPolygonLayer;
		
		GLOBAL.LayerId.PoiLayerId = "Trfc_Poi"
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
		
		var RED = new Module.JSColor(255, 0, 0);
		var BLUE = new Module.JSColor(0, 0, 255);
		var YELLOW = new Module.JSColor(255, 255, 0);
		var WHITE = new Module.JSColor(255, 255, 255);
		var BUFFER_POLYGON_RED = new Module.JSColor(100, 255, 0, 0);
		var BUFFER_POLYGON_BLUE = new Module.JSColor(100, 0, 0, 255);
		var color1 = new Module.JSColor(80, 51, 153, 204);
	    var color2 = new Module.JSColor(100, 51, 153, 204);
		
		// 버퍼
		if(spatial && $("#bufferCnt").val() > 0) {
			
			// 1번
			GLOBAL.LayerId.PolygonLayerId = "Trfc_Polygon"
			var bufferPolygonLayerCheck = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
			if(bufferPolygonLayerCheck != null) {
				layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
				Module.XDRenderData();
			}
			
			bufferPolygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
			bufferPolygonLayer.setSelectable(false);
			
			var buffurAreaAsText = geom[0].bufferArea.split("(")[2];
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
		
		
		
		for(var i=0;i<geom.length;i++) {
			
			// 포인트 텍스트 이름 설정
			// 도로구간
			if(selectBoxTrfcVal == 'roadSection') {
				
				pointTextNm = geom[i].rn;
				poi = './images/poi/roadSection_poi.png'
				
			// 철도선로
			} else if(selectBoxTrfcVal == 'railroadTrack') {
				
				pointTextNm = geom[i].korRlrNm;
				poi = './images/poi/railroadTrack_poi.png'
						
			// 철도역사
			} else if(selectBoxTrfcVal == 'railRoadStation') {
				
				pointTextNm = geom[i].korStaNm;
				poi = './images/poi/railroadStation_poi.png'
						
			// 지하철선로
			} else if(selectBoxTrfcVal == 'subwayTrack') {
				
				pointTextNm = geom[i].korSbrNm;
				poi = './images/poi/subwayTrack_poi.png'
						
			// 지하철역사
			} else if(selectBoxTrfcVal == 'subwayStation') {
				
				pointTextNm = geom[i].korSubNm;
				poi = './images/poi/subwayStation_poi.png'
						
			// 교량
			} else if(selectBoxTrfcVal == 'bridge') {
				
				pointTextNm = geom[i].korBriNm;
				poi = './images/poi/bridge_poi.png'
						
			// 고가도로
			} else if(selectBoxTrfcVal == 'overpass') {
				
				pointTextNm = geom[i].korOveNm;
				poi = './images/poi/overpass_poi.png'
						
			// 터널
			} else if(selectBoxTrfcVal == 'tunnel') {
				
				pointTextNm = geom[i].tunKorNm;
				poi = './images/poi/tunnel_poi.png'
						
			}
			
			
			var data = geom[i].geom.split("(");
			var dataType = data[0];
			var extractionArray = [], secondExtArray = [], pointArray = [];
			var lineStringArray = [];
			var mackerPointArray = [];
			
			
			
//			debugger;
			
			if(dataType == 'MULTILINESTRING' || dataType == 'LINESTRING') {
				
				GLOBAL.LayerId.LineLayerId = "Trfc_Line";
				lineLayer = layerList.createLayer(GLOBAL.LayerId.LineLayerId, Module.ELT_3DLINE);
//				lineLayer = layerList.createLayer("Line_Option", Module.ELT_3DLINE);
				
				extractionArray = data[1].split(")");
				secondExtArray = extractionArray[0].split(",");
				
				for(var j=0;j<secondExtArray.length;j++) {
					
					lineStringArray.push( [parseFloat(secondExtArray[j].split(" ")[0]), parseFloat(secondExtArray[j].split(" ")[1]), 1000 ] );
					
				}
				
				var pointX = geom[i].lon; //x 좌표
				var pointY = geom[i].lat; //y 좌표
				var position = TransformCoordinate(pointX, pointY, 26, 13);
				
				if(i == 0) {
					cmmUtil.setCameraMove(pointX, pointY);
				}
				
				var options = {
						layer : GLOBAL.PoiLayer,
						layerKey : geom[i].gid,
						lon : position.x,
						lat : position.y,
						text : pointTextNm, // 객체별 네이밍 체크 
						markerImage : poi, // 해당 마커 이미지 Url -- "./images/poi/cctv_water_level.png"
						lineColor : new Module.JSColor(0, 0, 255)
				}
				createLinePoi2(options);
				
				
				
				let object_option = {
					coordinates: {
						coordinate: lineStringArray,						// 정점 배열
						style: "XYZ"
						// style에 따른 배열 관계
						// "XY" = [x, y],[x, y],[..]
						// "XYZ" = [x, y, z],[x, y, z],[...]
						// "XYZARRAY" = [x, y, z, x, y, z ...]
						// "JSVector3D" = JSVector3D 인스턴스
					},
					type: 0,											// 실선 생성 		
					union: true,										// 지형 결합 유무
					depth: true,										// 오브젝트 겹침 유무
					color: new Module.JSColor(255, 255, 0, 0),			// ARGB 설정
					width: 3											// 선 굵기
				}
				
				var TrfcLineString = "TrfcLineString"+i;
				let line = Module.createLineString(TrfcLineString);

//				let appendlineLayer = layerList.nameAtLayer("Line_Option");
//				let appendlineLayer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
//				appendlineLayer.addObject(line, 0);
//				appendlineLayer.setMaxDistance(GLOBAL.MaxDistance);
				
				lineLayer.addObject(line, 0);
				lineLayer.setMaxDistance(GLOBAL.MaxDistance);
//				console.log("라인레이어 오브젝트 개수 : " + lineLayer.getObjectCount() )
				
			} else if(dataType == 'MULTIPOLYGON' || dataType == 'POLYGON') {
				
//				debugger;
				
				GLOBAL.LayerId.PolygonLayerId = "Trfc_Polygon"
				polygonLayer = layerList.createLayer(GLOBAL.LayerId.PolygonLayerId, Module.ELT_PLANE);
				
				extractionArray = data[2].split("))");
				secondExtArray = extractionArray[0].split(",");
				var polygonVertex = new Module.JSVec3Array();
				var arrayCnt = (secondExtArray.length-1);
				
				for(var j=0;j<arrayCnt;j++) {
					
					polygonVertex.push( new Module.JSVector3D(parseFloat(secondExtArray[j].split(" ")[0]), parseFloat(secondExtArray[j].split(" ")[1]), 15.0) );
					
				}
				
				
				let polygon = Module.createPolygon("POLYGON_"+i);
				
				// 폴리곤 색상 설정
				var polygonStyle = new Module.JSPolygonStyle();
				polygonStyle.setFill(true);
				polygonStyle.setFillColor(BUFFER_POLYGON_RED);
				polygonStyle.setOutLine(true);
				polygonStyle.setOutLineWidth(2.0);
				polygonStyle.setOutLineColor(RED);
				polygon.setStyle(polygonStyle);
				
				var part = new Module.Collection();
				part.add(arrayCnt)
				
				polygon.setPartCoordinates(polygonVertex, part);

				polygonLayer.addObject(polygon, 0);
				polygonLayer.setMaxDistance(GLOBAL.MaxDistance);
				
				var pointX = geom[i].lon; //x 좌표
				var pointY = geom[i].lat; //y 좌표
				var position = TransformCoordinate(pointX, pointY, 26, 13);
				
				if(i == 0) {
					cmmUtil.setCameraMove(pointX, pointY);
				}
				
				var options = {
						layer : GLOBAL.PoiLayer,
						layerKey : geom[i].gid,
						lon : position.x,
						lat : position.y,
						text : pointTextNm, // 객체별 네이밍 체크
						markerImage : poi, // 해당 마커 이미지 Url -- "./images/poi/cctv_water_level.png"
						lineColor : new Module.JSColor(0, 0, 255)
				}
				createLinePoi2(options);
				
				
			} // if(polygon)
			
		} // for
		
//		var checkLineLayer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
//		console.log("checkLineLayer 라인레이어 오브젝트 개수 : " + checkLineLayer.getObjectCount() )
		
		Module.XDSetMouseState(Module.MML_SELECT_POINT);
		
	}// 3D
	
//	console.log( "Trfc fn - geomFromPointArray() - GLOBAL.LayerId : " + JSON.stringify( GLOBAL.LayerId ) )
	
} // function geomFromPointArray
