$(document).ready(function(){
	// 레이어 항목 체크(개별)
	$(document).on("click", ".layer-list-dep2 input[type='checkbox']", function(){
		var checked = $(this).prop("checked");
		var layerNm = $(this).attr("id");
		var layerType = layerNm.split("_")[1];
		var layerId = layerNm.split("_")[2];
		var siblingItems = $(this).closest("ul").find("input[type='checkbox']");
		var dataTable = $(this).attr("data-table");
		var onCnt = 0;
		var categoryNm = $(this).parents("ul").siblings(".form-checkbox").find("label").html();
		var category3D = ["양평지하시설물", "모델객체", "정사영상", "3차원 영상"];
		var topLayer = false;
		
		//left, top layer 구분
		if (this.closest('ul.topLayer') === null) {
			topLayer = false;
		} else {
			topLayer = true;
		}
		
		//3차원 영상 리 데이터
		var liData = this.parentElement.parentElement.className;
		
		// 2D일 때 3D 레이어 활성화하면 경고창 띄우기
		if(app2D != null 
				&& (category3D.indexOf(categoryNm) >= 0 || $(this).siblings("label").html() == "가로등" || $(this).hasClass("only3d"))){
			$(this).prop("checked", false);
			alert("3D에서만 가능합니다.");
		} else {
			if(checked) {
				store.addLayerId(dataTable);
			} else {
				store.removeLayerId(dataTable);
			}
			
			if(app2D) {
				onOffLayer2D(layerType, layerId, checked);	
			} else {

				if(liData == 'liData') {
					onOffLayer3DLi(layerNm, checked);
				} else {
					onOffLayer3D(layerType, layerId, checked, topLayer);
				}
			}
			
			// 형제 list 모두 on·off일 경우, 부모 on·off
			for(var i = 0; i < siblingItems.length; i++){
				if(siblingItems[i].checked){
					onCnt++;
				}
			}
			if (onCnt == siblingItems.length) {
				$(this).closest("ul").siblings("span").find("input[type='checkbox']").prop("checked", true);
			} else {
				$(this).closest("ul").siblings("span").find("input[type='checkbox']").prop("checked", false);
			}
		}
	});
	
	// 레이어 항목 체크(전체)
	$(document).on("click", ".layer-list>li>span>input[type='checkbox']", function(){
		var checked = $(this).prop("checked");
		var layerItems = $(this).parents("li").find(".layer-list-dep2 input[type='checkbox']");
		var layerType = "";
		var layerId = "";
		var categoryNm = $(this).siblings("label").html();
		var category3D = ["양평지하시설물", "모델객체", "정사영상", "3차원 영상"];
		var layerNm = $(this).attr("id");
		var topLayer = false;
		
		//left, top layer 구분
		if (this.closest('ul.topLayer') === null) {
			topLayer = false;
		} else {
			topLayer = true;
		}
		
		// 2D일 때 3D 레이어 활성화하면 경고창 띄우기
		if(app2D != null 
				&& (category3D.indexOf(categoryNm) >= 0 || $(this).siblings("label").html() == "가로등" || $(this).hasClass("only3d") || layerNm.split("_")[3] == 2)){
			$(this).prop("checked", false);
			alert("3D에서만 가능합니다.");
		} else{
			for(var i = 0; i < layerItems.length; i++){			
				layerType = $(layerItems[i]).attr("id").split("_")[1];
				layerId = $(layerItems[i]).attr("id").split("_")[2];
				var dataTable = $(layerItems[i]).attr("data-table");
				
				if(!(app2D != null && $(layerItems[i]).siblings("label").html() == "가로등")){
					$(layerItems[i]).prop("checked", checked);
					
					if(checked) {
						store.addLayerId(dataTable);
					} else {
						store.removeLayerId(dataTable);
					}
					
					if(app2D) { 
						onOffLayer2D(layerType, layerId, checked);	
					} else {
						onOffLayer3D(layerType, layerId, checked, topLayer);	
					}
				}
			}
		}
	});
});

// 개인별 레이어 목록 호출
function aj_selectLayerList(mode, reset = false){
	var searchKeyword = mode == "left" 
						? $(".lnb-layer input[name='searchKeyword']").val()
						: $("#rightPopup input[name='searchKeyword']").val();
	
	loadingShowHide("show");
	$.ajax({
		type : "POST",
		url : "/lyr/lym/selectLayerList.do",
		data : {
			"searchKeyword" : searchKeyword,
			"mode" : mode
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				if(mode == "left"){ // 좌측 메뉴 선택 시
					$(".lnb-layer").html(returnData);
					$(".lnb-layer input[name='searchKeyword']").val(searchKeyword);
				} else if(mode == "top"){ // 상단 메뉴 선택 시
					$("#rightPopup").html(returnData);
					$("#rightPopup input[name='searchKeyword']").val(searchKeyword);
				}
				
				if(!$(".lnb-layer .scroll-y").hasClass("mCustomScrollbar")){
					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside",
						mouseWheel:{ scrollAmount: 250} 
					});
				}
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 레이어 목록 관리 호출
function aj_selectLayerManagementList(){
	var searchCondition = $("#leftPopup select[name='searchCondition']").val();
	var searchKeyword = $("#leftPopup input[name='searchKeyword']").val();
	
	loadingShowHide("show");
	$.ajax({
		type : "POST",
		url : "/lyr/lym/selectLayerManagementList.do",
		data : {
			"searchCondition" : searchCondition,
			"searchKeyword" : searchKeyword
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
				$("#leftPopup select[name='searchCondition']").val(searchCondition);
				$("#leftPopup input[name='searchKeyword']").val(searchKeyword);
				$(".layer-list .layer-list-dep2 li").removeClass("active");
				
				if(!$(".layerListMng .scroll-y").hasClass("mCustomScrollbar")){
					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside",
						mouseWheel:{ scrollAmount: 250 }
					});
				}
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}
 
// 레이어 등록 관리 호출
function aj_insertDataConversionView(){
	loadingShowHide("show");
	$.ajax({
		type : "POST",
		url : "/lyr/dtcv/insertDataConversionView.do",
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingShowHide("hide"); 
		}
	});
}

// 레이어 정보 수정 화면 표출
function aj_updateLayerInfoView(layerId){
	loadingShowHide("show");
	$.ajax({
		type : "POST",
		url : "/lyr/lyi/updateLayerInfoView.do",
		data: {
			lyrId : layerId
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#layerManagement").removeClass("active");
				$("#leftPopup").html(returnData);
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
 * 2D 레이어 on/off
 * @param layerType 레이어 타입
 * @param layerId 레이어 명
 * @param visible 표시 여부
 */
function onOffLayer2D(layerType, layerId, visible) {
	if(app2D) {
		const yMap = app2D.getYMap();
		const findLayer = store.facility.getData().find((layer) => layer["lyrId"] == layerId);
		if(findLayer) {
			const layerName = findLayer["tblNm"];
			const sld = findLayer["styleInfo"];
			let zIndex = 2;
			if(findLayer["lyrDtlKnd"] == "P") {
				zIndex = 4;
			} else if(findLayer["lyrDtlKnd"] == "L") {
				zIndex = 3;
			} else if(findLayer["lyrDtlKnd"] == "A") {
				zIndex = 2;
			}
			if(visible) {
				yMap.addWMSLayer(layerName, sld, zIndex);
			} else {
				yMap.removeWMSLayer(layerName);
			}	
		}	
	}
}

var chkBul = false;
var chk3D = 0;

// 3D 레이어 on/off
function onOffLayer3D(layerType, layerId, visible, topLayer){
	var layerList = new Module.JSLayerList(false);
	var layer = null;
	//var layerNm = $("button[data-popup='top-popup11']").parent("li").hasClass("active") ? "layer_" + layerType + "_" + layerId + "_2" : "layer_" + layerType + "_" + layerId;
	
	//layerType 3D: ('I','D','L','G','F')
	//layerType이 3D일 경우에는 "_2" 추가
	var layerType3d = ["I","D","L","G","F"];
	var layerNm = "";
	if (layerType3d.indexOf(layerType) >= 0 || topLayer === true) {
		layerNm = "layer_" + layerType + "_" + layerId + "_2";
	} else {
		layerNm = "layer_" + layerType + "_" + layerId;
	}
	var layerTitle = $("label[for='" + layerNm + "']").html();
	var layerCtgr = $("#" + layerNm).parents("ul").siblings(".form-checkbox").find("label").html();
	var lodChk = $(".layer-list>li>span>label[data-title='LOD 2.5']").closest("li").find("ul input[type='checkbox']");
	var dronChk = $(".layer-list>li>span>label[data-title='3차원 영상']").closest("li").find("ul input[type='checkbox']");
	var modelObj = $(".layer-list>li>ul>li>span>label[data-title='일반건물']").closest("span").find("input[type='checkbox']");
	var	landmarkObj = $(".layer-list>li>ul>li>span>label[data-title='주요건물']").closest("span").find("input[type='checkbox']");
	var chk = false;
	var chkCnt = $("#" + layerNm).closest(".layer-list-dep2").find("input[type='checkbox']:checked").length;
	
	for(var i=0; i<lodChk.length; i++) {
		if($(lodChk[i]).prop("checked")) {
			chk = true;
		}
	}
	
	for(var i=0; i<dronChk.length; i++) {
		if($(dronChk[i]).prop("checked")) {
			chk = true;
		}
	}
	 
	
	if(layerCtgr == "정사영상"){
		var myeonIdx = ypMyeon.indexOf(layerTitle);
		
		for(var i = 0; i < ypLiImg[myeonIdx].length; i++){
			layerList = new Module.JSLayerList(false);
			layerNm = ypLiImg[myeonIdx][i];
			layer = layerList.nameAtLayer(layerNm); 
			
			if(visible == true) {
				Module.XDEMapCreateLayer(layerNm, xdServer, 0, false, visible, false, 10, 0, 19);
				Module.setVisibleRange(layerNm, userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
			} else {
				layerList.delLayerAtName(layerNm);
			}
		}
	} else if(layerCtgr == "양평지하시설물"){
		layerList = new Module.JSLayerList(true);
		
		if(layerTitle == "상수관로"){
			if(visible == true) {
				loadUnderFac("WTL_MANH_PSZ");
			} else {
				layerList.delLayerAtName("WTL_PIPE_LMZ");
				layerList.delLayerAtName("WTL_VALV_PSZ");
				layerList.delLayerAtName("WTL_MANH_PSZ");
			}
		} else if(layerTitle == "하수관로"){
			if(visible == true) {
				loadUnderFac("SWL_MANH_PSZ");
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/SWL_MANH_PSZ.geojson","SWL_MANH_PSZ");
			} else {
				layerList.delLayerAtName("SWL_PIPE_LMZ");
				layerList.delLayerAtName("SWL_MANH_PSZ");
			}
		} else if(layerTitle == "천연가스관로"){
			if(visible == true) {
				loadUnderFac("VALV_PSZ");
			} else {
				layerList.delLayerAtName("UFL_GPIP_LMZ");
				layerList.delLayerAtName("UFL_GVAL_PSZ");
			}
		} else if(layerTitle == "통신관로"){
			if(visible == true) {
				loadUnderFac("UFL_KMAN_PSZ");
			} else {
				layerList.delLayerAtName("UFL_KPIP_LSZ");
				layerList.delLayerAtName("UFL_KMAN_PSZ");
			}
		} else if(layerTitle == "전력지중관로"){
			if(visible == true) {
				loadUnderFac("UFL_BMAN_PSZ");
			} else {
				layerList.delLayerAtName("UFL_BPIP_LMZ");
				layerList.delLayerAtName("UFL_BMAN_PSZ");
			}
		} else if(layerTitle == "농업용공공관정"){
			if(visible == true) {
				loadUnderFac("FAR_PMAN_LMZ");
			} else {
				layerList.delLayerAtName("FAR_PMAN_LMZ");
				layerList.delLayerAtName("FAR_PMAN_LMZ_poi");
			}
		} else if(layerTitle == "지하수개발"){
			if(visible == true) {
				loadUnderFac("GRW_DMAN_LMZ");
			} else {
				layerList.delLayerAtName("GRW_DMAN_LMZ");
				layerList.delLayerAtName("GRW_DMAN_LMZ_poi");
			}
		} else if(layerTitle == "지하수이용시설"){
			if(visible == true) {
				loadUnderFac("GRU_FMAN_LMZ");
			} else {
				layerList.delLayerAtName("GRU_FMAN_LMZ");
				layerList.delLayerAtName("GRU_FMAN_LMZ_poi");
			}
		}
		
		if(visible && chkCnt == 1){
			//alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");
			var msgTxt = "지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.";
			showMsg(msgTxt);
		}
	} else {
		if(layerTitle == "일반건물"){
			
//			layer = layerList.nameAtLayer("building_object");
			
//			if(layer != null) {
//				layerList.delLayerAtName("building_object");
//				
//				Module.XDEMapCreateLayer("building_object", xdServer, 0, true, visible, false, 9, 0, 14);
//				Module.setVisibleRange("building_object", userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
//				
//				layer = new Module.JSLayerList(false).nameAtLayer("building_object");
//				layer.simple_real3d = true;
//				
//				if(chk3D > 0) {
//					layer.setVisible(true);
//				}
//				
//				if(visible == false && chk3D > 0) {
//					layer.setAlpha(0);
//				} else {
//					layer.setAlpha(255);
//				}
//			} else {
//				Module.XDEMapCreateLayer("building_object", xdServer, 0, true, visible, false, 9, 0, 14);
//				Module.setVisibleRange("building_object", userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
//				
//				layer = new Module.JSLayerList(false).nameAtLayer("building_object");
//				layer.simple_real3d = true;
//				layer.setVisible(visible);
//				layer.setAlpha(255);
//			}
			
			// 해제 시 건물 선택 비활성화 및 팝업창 닫기
			if(visible){
				Module.XDEMapCreateLayer("building_object", xdServer, 0, true, true, false, 9, 0, 14);
				Module.setVisibleRange("building_object", userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
				
				layer = new Module.JSLayerList(false).nameAtLayer("building_object");
				layer.simple_real3d = true; //심플모드
				
				chkBul = true;
				Module.XDSetMouseState(6);
				var msgTxt = "건물객체 선택 시 업소정보를 확인할 수 있습니다.";
				showMsg(msgTxt);
			} else {
				layerList.delLayerAtName("building_object");
				
				chkBul = false;
				Module.getMap().clearSelectObj();
				Module.XDSetMouseState(1);
			}
		} else if(layerTitle == "주요건물"){
			if(visible == true) {
				Module.XDEMapCreateLayer("landmark", xdServer, 0, true, visible, false, 9, 0, 12);
				Module.setVisibleRange("landmark", userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
			} else {
				layerList.delLayerAtName("landmark");
			}
		} else if(layerTitle == "가로등"){
			if(visible == true) {
				loadLamp();
			} else {
				layerList.delLayerAtName("SL251");
			}
		} else {
			switch(layerType){
				//  SHAPE
				case "S":
					shpType = Number($("#" + layerNm).data("shptype"));
					
					if(shpType == 3	|| shpType == 4){
						layerList = new Module.JSLayerList(true);
					}
					
					layerTable = $("#" + layerNm).data("table");
					layer = layerList.nameAtLayer(layerNm);
					
//					if(layer != null){
//						layer.setVisible(visible);
//					} else{
//						if(visible){
//							if(shpType == 3	|| shpType == 4){
//								loadPOI_3D(layerNm, layerId, layerTable);
//							} else{
//								loadWMS_3D(layerNm, storageId + ":" + layerTable, "");
//							}
//						}
//					}
					
					if(visible == true) {
						if(shpType == 3	|| shpType == 4){
							loadPOI_3D(layerNm, layerId, layerTable);
						} else{
							loadWMS_3D(layerNm, storageId + ":" + layerTable, "");
							console.log(layerTable);
						}
					} else {
						wmslayer = layerList.nameAtLayer(layerNm);
						if(wmslayer != null) {
							wmslayer.clearWMSCache();
							layerList.delLayerAtName(layerNm);
						}
					}
					
					break;
				//  CSV
				case "C":
					loadCsv(layerNm, layerId);
					break;
				// IMAGE
				case "I":					
					if(visible == true) {
						Module.XDEMapCreateLayer($("#" + layerNm).data("desc"), xdServer, 0, false, visible, false, 10, 1, 15);
						Module.setVisibleRange($("#" + layerNm).data("desc"), userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
					} else {
						layerList.nameAtLayer($("#" + layerNm).data("desc")).clearWMSCache();
						layerList.nameAtLayer($("#" + layerNm).data("desc")).setVisible(false);
						layerList.delLayerAtName($("#" + layerNm).data("desc"));
					}
					
					break;
				// IMAGE
				case "POI":
					if(visible == true) {
						let lyrNm = $("#" + layerNm).data("desc");
						//Module.ELT_3DPOINT = 5
						Module.XDEMapCreateLayer(lyrNm, xdServer, 0, true, true, false, Module.ELT_3DPOINT, 0, 15);
						//poi icon 표출
						let layerList=new Module.JSLayerList(false);
						let layer = layerList.nameAtLayer(lyrNm);
						layer.tile_load_ratio=1000;
					} else {
						layerList.nameAtLayer($("#" + layerNm).data("desc")).setVisible(false);
						layerList.delLayerAtName($("#" + layerNm).data("desc"));
					}
					
					break;
				// 3DS
				case "D":
					if(visible == true) {
						Module.XDEMapCreateLayer($("#" + layerNm).data("desc"), xdServer, 0, false, visible, false, 9, 0, 13);
						Module.setVisibleRange($("#" + layerNm).data("desc"), userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
//						
//						if($("#" + layerNm).data("desc") == "bldg_yp_polygon_jpg_level_15"){
//							var colorList = [
//								new Module.JSColor(150, 255, 255, 0), // 노랑
//								new Module.JSColor(150, 255, 0, 0), // 빨강
//								new Module.JSColor(150, 0, 255, 0), // 초록
//								new Module.JSColor(150, 0, 0, 255)  // 파랑
//							]; 
//							
//							layerList = new Module.JSLayerList(false);
//							layer = layerList.nameAtLayer("bldg_yp_polygon_jpg_level_15");
//							
//							layer.simple_real3d = true;
//							
//							var fillColorInterval = setInterval(function(){
//								var cnt = layer.getObjectCount();
//								
//								if(cnt == 4){
//									
//									clearInterval(fillColorInterval);
//									
//									for(var i = 0; i < cnt; i++){
//										var obj = layer.indexAtObject(i);
//										
//										obj.setFillColor(true, colorList[i]);
//									}
//								}
//							}, 100);
//						}
					} else {
						layerList.nameAtLayer($("#" + layerNm).data("desc")).setVisible(false);
						layerList.delLayerAtName($("#" + layerNm).data("desc"));
					}
					
					break;
				// Graph
				case "G" :
					var obj = $("#" + layerNm).data("desc");
					
					if(visible == true) {
						eval(obj + ".createLayer()");	
					} else{
						eval(obj + ".deleteLayer()");
					}
					
					
					break;
			}
		}
	}
	
	Module.XDRenderData();
}

// 레이어 체크 확인
function layerChecked() {
	$('.layer-list .layer-list-dep2 input[type="checkbox"]').each(function () {
		var lId = $(this).attr('id');
		var lNm = $('label[for="' + lId + '"]').html();
		var lCt = $(this).parents('.layer-list-dep2').siblings('span').find('label').html();
		var lTp = lId.split("_")[1];
		var tfTp = false;
		var shpType = $(this).data("shptype");
		var dataTable = $(this).attr("data-table");
		var desc = $(this).data('desc');
		
		if ($(this).parents('.layer-list').hasClass('topLayer')) {
			lId = lId.slice(0, -2);
		}

		if(lCt == "3차원 영상"){
			var myeonIdx = ypMyeon.indexOf(lNm);
		
			for(var i = 0; i < ypLiLod[myeonIdx].length; i++){
				lId = "lod_" + ypLiLod[myeonIdx][i];
			}
		} else if(lCt == "정사영상"){
			var myeonIdx = ypMyeon.indexOf(lNm);
			
			for(var i = 0; i < ypLiImg[myeonIdx].length; i++){
				lId = ypLiImg[myeonIdx][i];
			}
		} else if(lCt == "양평지하시설물"){
			tfTp = true;

			if(lNm == "상수관로"){
				lId = "WTL_PIPE_LMZ";
			} else if(lNm == "하수관로"){
				lId = "SWL_PIPE_LMZ";
			} else if(lNm == "천연가스관로"){
				lId = "UFL_GPIP_LMZ";
			} else if(lNm == "통신관로"){
				lId = "UFL_KPIP_LSZ";
			} else if(lNm == "전력지중관로"){
				lId = "UFL_BPIP_LMZ";
			} else if(lNm == "농업용공공관정"){
				lId = "FAR_PMAN_LMZ";
			} else if(lNm == "지하수개발"){
				lId = "GRW_DMAN_LMZ";
			} else if(lNm == "지하수이용시설"){
				lId = "GRU_FMAN_LMZ";
			}
		} else {
			if(lNm == "일반건물"){
				lId = "building_object";
			} else if(lNm == "주요건물"){
				lId = "landmark";
			} else if(lNm == "가로등"){
				lId = "SL251";
			} else {
				switch(lTp){
					//  SHAPE
					case "S":
						if(shpType == "3" || shpType == "4") {
							tfTp = true;
						}
						
						break;
						
					// IMAGE
					case "I": case "POI" : case "D" : 
						lId = $("#" + lId).data("desc");
						
						break;
					 case "G" : 
						 tfTp = true;
						 
						 if(lNm == "1인 가구"){
							 lId = "graph_SINGPLE_PERSON_HOUSEHOLDS_0";
						 } else if(lNm == "기초생활수급자"){
							 lId = "graph_BASIC_LIVELIHOOD_RECIPIENT_0_0";
						 } else if(lNm == "등록장애인"){
							 lId = "LAYER_GRAPH_DISABLE_PERSON";
						 }
						 
						 
						 break;
				}
				if ($(this).parents('.layer-list').hasClass('topLayer')) {
					lId = desc;
				}
			}
		}

		var layer = null;
		
		// 2D, 3D 공통으로 사용
		var visible;
		
		if (app2D) {
			visible = store.findLayerId(dataTable)?true:false;
	    } else {
	    	if(lId != undefined) {
				layer = new Module.JSLayerList(tfTp).nameAtLayer(lId);	
				if (layer != null && layer.getVisible() && layer.getAlpha() != 0) {
					visible = true;
				}
	    	}
		}
		
		if (visible) {
			$(this).prop('checked', true);

			var allChk = true;
			$(this).parents('.layer-list-dep2').find('input[type="checkbox"]').each(function(){
				if (!$(this).prop('checked')) {
					allChk = false;
				}
			});

			if (allChk == true) {
				$(this).parents('.layer-list-dep2').siblings('span').find('input[type="checkbox"]').prop('checked', true);
			}
		}
	});
}

/**
 * 3차원 영상 면 > 리 정보 조회
 * @returns
 */
function myeonList() {
	let cnt = $('#ctgr_025 > ul.layer-list-dep2 > li').length;
	let idx = "";
	let myeon = "";
	let myeonText = "";
	let liTag = "";
	let myeonId = "";
	let myeonNm = "";
	let liVal = "";
	let len = "";
	if (cnt > 0) {
		myeon = $('#ctgr_025 > ul.layer-list-dep2 > li');
		for(let i = 0; i < cnt; i++) {
			myeonText = myeon[i].innerText;
			idx = ypMyeon.indexOf(myeonText);
			myeonId = myeon[i].children[0].id;
			myeonNm = myeon[i].children[0].name;
			len = ypLiLod[idx].length;
			if (myeonText == '강상면') {
				$('#ctgr_025 > ul.layer-list-dep2 > li[title="'+myeonText+'"]').append('<ul class="riCheckBox" title="'+myeonText+'"></ul>');
			} else {
				$('#ctgr_025 > ul.layer-list-dep2 > li[title="'+myeonText+'"]').append('<ul class="riCheckBox" title="'+myeonText+'" style="display: none;"></ul>');
			}
			for(let j = 0; j < len; j++) {
				liVal = ypLiLod[idx][j];
				liValTxt = ypLiLodNm[idx][j];
				liTag = "";
				liTag += '<li title="'+myeonText+' '+liValTxt+'" class="liData">';
				liTag += '<span class="form-checkbox">';
				liTag += '<input type="checkbox" id="'+myeonId+'_'+j+'" name="'+myeonNm+'" class="only3d" value="'+liVal+'">';
				liTag += '<label for="'+myeonId+'_'+j+'" data-title="'+liValTxt+'">'+liValTxt+'</label></span></li>';
				$('#ctgr_025 > ul.layer-list-dep2 > li[title="'+myeonText+'"] > ul').append(liTag);
			}
		}
	}
}

/**
 * 3차원 영상 리 레이어 On/Off
 * @param layerNm
 * @param checked
 * @returns
 */
function onOffLayer3DLi(layerNm, visible) {
	var layerType = layerNm.split("_")[1];
	var layerId = layerNm.split("_")[2];
	var layerList = new Module.JSLayerList(false);
	var layer = null;
	var liIdx = layerNm.split("_")[4];
	var myeonId = null;
	if(liIdx.length==1) {
		myeonId = layerNm.substring(0, layerNm.length-1);
	} else {
		myeonId = layerNm.substring(0, layerNm.length-2);
	}
	myeonId = myeonId.slice(0,-1);
	
	myeonTxt = $('#'+myeonId)[0].parentElement.title;

	var chk = false;
	var chkCnt = $("#" + layerNm).closest(".layer-list-dep2").find("input[type='checkbox']:checked").length;

	var myeonIdx = ypMyeon.indexOf(myeonTxt);
	layerNm = "lod_" + ypLiLod[myeonIdx][liIdx];
	if (layerNm === 'lod_yanggeunri') {
		layerNm = 'lod25';
	}
	
	if(visible == true) {
		Module.XDEMapCreateLayer(layerNm, xdServer, 0, false, visible, false, 20, 12, 12);
		Module.XDSetLayerMoveZ(layerNm, 3);
		Module.setVisibleRange(layerNm, userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
		
		layerList = new Module.JSLayerList(false);
		layer = layerList.nameAtLayer(layerNm); 
		
		layer.lod_object_detail_ratio = userSetup.vidoQlityLevel;
	} else {
		layerList.delLayerAtName(layerNm);
	}
	
	// 해제 시 건물 선택 비활성화 및 팝업창 닫기
	/*if(visible){
		Module.XDSetMouseState(6);
		chk3D++;
		if (chkCnt == 1) {
			alert("건물객체 선택 시 업소정보를 확인할 수 있습니다.");
		}
	} else {
		Module.getMap().clearSelectObj();
		chk3D--;
	}*/
		
	Module.XDRenderData();
}