/** 공사계획 정보 **/

var cwp = {
			inPlnYear : null,
			inPlnQu : null,
			inCntrkTy : null,
			inChpsnPsitn : null,
			inCntrkLcAdres : null,
			inCntrkNm : null,
			layerId : "TBD_CNTRK_PLN_INFO",
			layerTextKey : "cntrkNm",
			imgUrl : "./images/poi/constructionPlan_poi.png"

}

$(document).ready(function(){ // 실행할 기능을 정의해주세요.

	//오브젝트 클릭 이벤트 처리 
    dtmap.off('select');
    dtmap.on('select',spaceClickListener );

	// 공사 계획정보 등록 화면 이동 이벤트 처리
	$("#cwpRegist").unbind('click').bind('click',function(){
		 aj_insertConstructionPlanView();
	});

	// 지도 클릭위치 좌표값 획득 이벤트 처리
	$("#getPositionLocation").unbind('click').bind('click',function(){
		// cmmUtil.getPositionGeom(positionCallback);
		dtmap.off('select');
		dtmap.draw.active({type: 'Point', once: true});
		dtmap.on('drawend', onDrawEnd);
	});

	// 공사계획 상세페이지 에서 취소버튼 이벤트 처리
	$("#btnCpCancel").unbind('click').bind('click',function(){

		document.searchPlanForm.pageIndex.value = rePageIndexDtl;			// 선택한 페이지 번호
		document.searchPlanForm.plnYear.value = rePlnYearDtl;			// 검색된(초기 null) 년도;
		document.searchPlanForm.plnQu.value = rePlnQuDtl;				// 검색된(초기 null) 분기;
		document.searchPlanForm.cntrkTy.value = reCntrkTyDtl;			// 검색된(초기 null) 공사유형;
		document.searchPlanForm.chpsnPsitn.value = reChpsnPsitnDtl;	// 검색된(초기 null) 집행부서;
		document.searchPlanForm.cntrkLcAdres.value = reCntrkLcAdresDtl;// 검색된(초기 null) 읍명동;
		document.searchPlanForm.cntrkNm.value = reCntrkNmDtl;			// 검색된(초기 null) 공사명;

		aj_selectConstructionPlanList($("#searchPlanForm")[0]);
	});

	// 공사계획 수정페이지 에서 취소버튼 이벤트 처리
	$("#btnCpReCancel").unbind('click').bind('click',function(){
		aj_selectConstructionPlan($(this).data('cpi'));
		//destroy();
	});


	// 공사계획 등록페이지 에서 취소버튼 이벤트 처리
	$("#btnCpInsertCancel").unbind('click').bind('click',function(){
		aj_selectConstructionPlanList($("#searchPlanForm")[0]);
		//destroy();
	});
	// 공사계획정보 > 상세페이지  수정 페이지로 이동 이벤트 처리
	$("#btnCpUpdate").unbind('click').bind('click',function(){
		aj_updateConstructionPlanView($(this).data('cwpid'));
	});

	// 등록하기 이벤트 처리
	/*$("#btnCpInsert").unbind('click').bind('click',function(){
		aj_insertConstructionPlan($("#insertForm")[0]);
	});*/


	// 조회버튼 이벤트 처리
	$("button[name='cplSearch']").unbind('click').bind('click',function(){
		document.searchPlanForm.pageIndex.value = "1";			// 선택한 페이지 번호
		aj_selectConstructionPlanList($("#searchPlanForm")[0]);
	});

	// 상세 페이지 조회 이벤트 처리
	$("tr[name='tdCwpDtl']").unbind('click').bind('click',function(){
		// cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat')); //lon Lat 값에 따라 화면 이동
		// cmmUtil.setPoiHighlight(cwp.layerId, $(this).data('cpi'));
		aj_selectConstructionPlan($(this).data('cpi'));
	});

	// poi 표출 리스트 확인후 값이 있을때 poi생성
	if(Number(poiListPlan.resultCnt) != 0){

		//cmmUtil.setPointLayer(poiListPlan.resultList, cwp.layerTextKey, cwp.layerId, cwp.imgUrl);
		if(poiListPlan != ''){
			//setPlanPointLayer();
			// cmmUtil.setPointLayer(poiListPlan.resultList, cwp.layerId, "cntrkPlnId", "cntrkNm", cwp.imgUrl, (feature) => {
			// 	console.log('POI 아이콘 클릭!!');
				//$(`tr[name='tdCwpDtl'][data-cpi='${feature.getId()}']`).trigger('click');
				// aj_selectConstructionPlan(`${feature.getId()}`);
			// });
		}
	}
});
// 지도 클릭위치 좌표값 획득 이벤트
function onDrawEnd(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#cntrkLcAdres").val("경기도 양평군 "+result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#geom").val(wkt);
	});
	dtmap.on('select',spaceClickListener );
}

//TODO GIS
//POILsyrt를 추가해준다.
function setPlanPointLayer(){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		//alert("2D환경 POI마커는 개발중입니다!");
	}else{
		// POI 오브젝트를 추가 할 레이어 생성
		var layerList = new Module.JSLayerList(true);

		// 생성된어 있는 POI 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.PoiLayerId != null){
			var layer = layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId);
			if(layer != null){
				layerList.delLayerAtName(GLOBAL.LayerId.PoiLayerId);
				GLOBAL.LayerId.PoiLayerId = null;
			}

			Module.XDRenderData();
		}

		// POI 레이어 이름은 각 해당 테이블명
		GLOBAL.LayerId.PoiLayerId = cwp.layerId;
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);

		// POI 설정
		for(var i = 0; i < poiListPlan.resultList.length; i++){
			var pointX = Number(poiListPlan.resultList[i].lon); //x 좌표
			var pointY = Number(poiListPlan.resultList[i].lat); //y 좌표
			var position = TransformCoordinate(pointX, pointY, 26, 13);
			var options = {
					layer : GLOBAL.PoiLayer,
					layerKey : poiListPlan.resultList[i].cntrkPlnId,
					lon : position.x,
					lat : position.y,
					text : poiListPlan.resultList[i].cntrkNm,
					markerImage : cwp.imgUrl, // 해당 마커 이미지 Url
					lineColor : new Module.JSColor(0, 0, 255)
			}
			createLinePoi2(options);
		}
		// 마우스 상태 설정
		Module.XDSetMouseState(Module.MML_SELECT_POINT);
	}
}

// 공사계획정보 시기 Option 정보 생성및 조회값이 있을때 처리
function callSelectOptions(){
	// 시기 년도 최초 시작년도 세팅값
	var startYear = 2010;
	// 현재 년도
	var date = new Date();
	var year = date.getFullYear();
	var count = (year - startYear) + 2;	// 기준년도 부터 + 1Y

	// 최초 시작년도 부터 현재로부터 + 1Y
	for(var i = 0; i < count; i++ ){
		var years = startYear + i;
		$("#plnYear").append('<option value="'+years+'">'+years+'</option>');
	}
	// 1~4분기 설정
	for(var i = 1; i < 5; i++ ){
		var plnQuValue = i + "분기";
		$("#plnQu").append('<option value="'+plnQuValue+'">'+plnQuValue+'</option>');
	}

	// 검색/수정시 셀렉트박스 값 유지를위한 처리 내용
	// 시기 - 년도

	if(rePlnYear != ""){
		$("#plnYear").val(rePlnYear);
	}
	// 시기 - 분기
	if(rePlnQu != ""){
		$("#plnQu").val(rePlnQu);
	}
	// 유형 - 공사유형(전체)
	if(reCntrkTy != ""){
		$("#cntrkTy").val(reCntrkTy).prop("selected", true);
	}
	// 유형 - 집행부서(전체)
	if(reChpsnPsitn != ""){
		$("#chpsnPsitn").val(reChpsnPsitn);
	}
	// 유형 - 읍명동(전체)
	if(reCntrkLcAdres != ""){
		$("#cntrkLcAdres").val(reCntrkLcAdres);
	}
}


// 공사 계획정보 상세정보 조회하기
function aj_selectConstructionPlan(keyId){
	poiListPlan = '';
	ui.loadingBar("show");
	var form = $("#searchPlanForm")[0];
	var formData = new FormData(form);

	if(rePageChk){
		document.searchPlanForm.plnYear.value = rePlnYear;			// 검색된(초기 null) 년도;
		document.searchPlanForm.plnQu.value = rePlnQu;				// 검색된(초기 null) 분기;
		document.searchPlanForm.cntrkTy.value = reCntrkTy;			// 검색된(초기 null) 공사유형;
		document.searchPlanForm.chpsnPsitn.value = reChpsnPsitn;	// 검색된(초기 null) 집행부서;
		document.searchPlanForm.cntrkLcAdres.value = reCntrkLcAdres;// 검색된(초기 null) 읍명동;
		document.searchPlanForm.cntrkNm.value = reCntrkNm;			// 검색된(초기 null) 공사명;
		document.searchPlanForm.pageIndex.value = $("#searchPlanForm #pageIndex").val();			// 검색된(초기 null) 공사명;
	} else {
		formData.set('plnYear', rePlnYearDtl);
		formData.set('plnQu', rePlnQuDtl);
		formData.set('cntrkTy', reCntrkTyDtl);
		formData.set('chpsnPsitn', reChpsnPsitnDtl);
		formData.set('cntrkLcAdres', reCntrkLcAdresDtl);
		formData.set('cntrkNm', reCntrkNmDtl);
		formData.set('pageIndex', rePageIndexDtl);
	}
	formData.append('cntrkPlnId', keyId);	

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/selectConstructionPlan.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#divConstructionPlan").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사 계획정보 수정 페이지 호출 처리
function aj_updateConstructionPlanView(keyId){
	ui.loadingBar("show");

	var formData = new FormData();
	formData.append('cntrkPlnId', keyId);
	formData.append('rePlnYear', rePlnYearDtl);
	formData.append('rePlnQu', rePlnQuDtl);
	formData.append('reCntrkTy', reCntrkTyDtl);
	formData.append('reChpsnPsitn', reChpsnPsitnDtl);
	formData.append('reCntrkLcAdres', reCntrkLcAdresDtl);
	formData.append('reCntrkNm', reCntrkNmDtl);
	formData.append('rePageIndex', rePageIndexDtl);


	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/updateConstructionPlanView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#divConstructionPlan").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사 계획정보 수정 처리
function aj_updateConstructionPlan(form){
	var keyId = '';
	ui.loadingBar("show");
	var formData = new FormData(form);
	if($("#rChk1_1").is(":checked")){
		keyId = "Y";
	}else{
		keyId = "N";
	}
	formData.append('cntrkPrrngPrcuseAt', keyId);

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/updateConstructionPlan.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				//destroy();
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사 계획정보 삭제 처리
function aj_deleteConstructionPlan(form, param){

	ui.loadingBar("show");
	var formData = new FormData(form);
	formData.append('cntrkPlnId', param);

	formData.append('plnYear', rePlnYearDtl);
	formData.append('plnQu', rePlnQuDtl);
	formData.append('cntrkTy', reCntrkTyDtl);
	formData.append('chpsnPsitn', reChpsnPsitnDtl);
	formData.append('cntrkLcAdres', reCntrkLcAdresDtl);
	formData.append('cntrkNm', reCntrkNmDtl);
	formData.append('pageIndex', rePageIndexDtl);

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/deleteConstructionPlan.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}


// 공사 계획정보 등록하기 화면으로 이동
function aj_insertConstructionPlanView(){
	ui.loadingBar("show");
	var formData = new FormData();

	formData.append('plnYear', rePlnYear);
	formData.append('plnQu', rePlnQu);
	formData.append('cntrkTy', reCntrkTy);
	formData.append('chpsnPsitn', reChpsnPsitn);
	formData.append('cntrkLcAdres', reCntrkLcAdres);
	formData.append('cntrkNm', reCntrkNm);
	formData.append('pageIndex', $("#searchPlanForm #pageIndex").val());

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/insertConstructionPlanView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#divConstructionPlan").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				// destroy();
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

// 공사 계획정보 등록 처리
function aj_insertConstructionPlan(form){

	ui.loadingBar("show");
	var formData = new FormData(form);
	if($("#rChk1_1").is(":checked")){
		keyId = "Y";
	}else{
		keyId = "N";
	}
	formData.append('cntrkPrrngPrcuseAt', keyId);

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/insertConstructionPlan.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

function positionCallback(pointGeom, address){
	$("#cntrkLcAdres").val(address);
	$("#geom").val(pointGeom);
}

// 검색 처리
function fn_select_list(){
	document.searcPlanhForm.pageIndex.value = 1;
	//$('#divConstructionPlan input[name="pageIndex"]').val(1);
	aj_selectConstructionPlanList($("#searcPlanhForm")[0]);
}



// 페이징 처리
function fn_selectPlan_linkPage(pageNo){

	document.searchPlanForm.pageIndex.value = pageNo;		// 선택한 페이지 번호
	aj_selectConstructionPlanList($("#searchPlanForm")[0]);
}



//공사계획정보 호출
function aj_selectConstructionPlanListPage(form){
	ui.loadingBar("show");
	var	formData = new FormData(form);

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/selectConstructionPlanList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				var inPlnYear = cwp.inPlnYear, inPlnQu = cwp.inPlnQu, inCntrkTy = cwp.inCntrkTy, inChpsnPsitn = cwp.inChpsnPsitn,
								inCntrkLcAdres = cwp.inCntrkLcAdres, inCntrkNm = cwp.inCntrkNm;

				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				// 조회 영역에 있는 값 넣어주기
				$("#plnYear").val(inPlnYear);
				$("#plnQu").val(inPlnQu);
				$("#cntrkTy").val(inCntrkTy);
				$("#chpsnPsitn").val(inChpsnPsitn);
				$("#cntrkLcAdres").val(inCntrkLcAdres);
				$("#cntrkNm").val(inCntrkNm);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//레이어 선택 상세보기
function spaceClickListener(e){
	var gid ;
	if (dtmap.mod === '3D'){
		gid=e.id;
	}else{
		gid=e.id;
	}
	aj_selectConstructionPlan(gid);
    dtmap.vector.select(e.id);
}


