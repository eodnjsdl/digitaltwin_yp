/**
 * - 업무 / 시설관리 / 하수도시설 / 토구
 * 
 * @returns
 */

$(document).ready(function(){
	//console.log("swlSpewPs.js");
	//console.log("토구");
});

// 토구 목록 페이지 호출
function swlSpewPsProcess() {
	//console.log('swlSpewPsProcess()');
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	// 속성검색 옵션
	getCmmCodeData('YPE001', '#lSrchOptions select[name=hjd_cde]');		// 읍면동
	getCmmCodeData('OGC-145', '#lSrchOptions select[name=vmt_cde]');	// 토구용도
	getCmmCodeData('OGC-001', '#lSrchOptions select[name=for_cde]');	// 시설물형태
	
	FACILITY.Ax5UiGrid = null;	// ax5uigrid 전역 변수 
    FACILITY.Ax5UiGrid = new ax5.ui.grid();
    FACILITY.Ax5UiGrid.setConfig({
		target: $target,
		sortable: true,
		multipleSelect: false,
		header: {
			align: "center"
		},
		columns: [
			{key: "ftr_idn",		label: "관리번호",			width: '*'},
			{key: "hjd_cde_nm",		label: "읍면동",			width: '*'},
			{key: "ist_ymd", 		label: "설치일자",			width: '*'},
			{key: "vmt_cde_nm",		label: "토구용도",			width: '*'},
			{key: "for_cde_nm",		label: "시설물형태",		width: '*'},
			{key: "spw_dip",		label: "원형토구내경",		width: '*'},
			{key: "spw_hol",		label: "각형토구가로길이",	width: '*'},
			{key: "spw_vel",		label: "각형토구세로길이",	width: '*'},
			{key: "spw_hsl", 		label: "토구표고",			width: '*'}
		],
		page: {
			navigationItemCount: 10,	// 보여지는 클릭 가능 페이지 번호
	 		height: 30,
			display: true,
			firstIcon: '&lt;&lt;',
			prevIcon: '&lt;',
			nextIcon: '&gt;',
			lastIcon: '&gt;&gt;',
            onChange: function() {
            	selectSwlSpewPsList(this.page.selectPage + 1);	// 페이지 이동
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				//console.log(this.item.id);
				selectSwlSpewPs(this.item.id);	// 상세보기
			}
		}
	});
	selectSwlSpewPsList(1);
}

// 토구 목록 조회
function selectSwlSpewPsList(page) {
	//console.log('selectSwlSpewPsList(page)');
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	//grid 선택창 초기화
	FACILITY.Ax5UiGrid.focus(-1);
	
	//공간 검색 / 사용자 정의 일 경우 이외에는  그리기 영역 지우기
	if($(".groundwaterSpace").hasClass("on")){
		const geomSrchType = $(".facility-spatial-search").closest('.search-area').find('input[name="rad-facility-area"]:checked').val();
		//console.log(geomSrchType);
		if(geomSrchType != "custom"){
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 영역 초기화
		}
	}
	
	// 검색 조건
	var options;
	
	if ($(".groundwaterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		const filters = [];
		
		var hjdCde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var vmtCde = $("#lSrchOptions select[name=vmt_cde] option:selected").val();	// 토구용도
		var forCde = $("#lSrchOptions select[name=for_cde] option:selected").val();	// 시설물형태
		
		if (hjdCde) {
			filters.push("hjd_cde" + " = " + hjdCde);
		}
		if (vmtCde) {
			filters.push("vmt_cde" + " = " + vmtCde);
		}
		if (forCde) {
			filters.push("for_cde" + " = " + forCde);
		}
		
		options = {
			typeNames	: "swl_spew_ps" + "",
			perPage		: 10,
			page		: page,
			filter		: filters,
			sortBy		: 'gid',
	        sortOrder	: 'DESC'
		};
	} else if ($(".groundwaterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'swl_spew_ps' + "",
			perPage		: 10,
			page		: page,
			sortBy		: 'gid',
			sortOrder	: 'DESC'
		}
		if (type === 'extent') {
			options.bbox 		= FACILITY.spaceSearchOption.bbox;
		} else {
			options.geometry 	= FACILITY.spaceSearchOption.geometry;
		}
	} else {
		alert("검색 오류");
	}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			// 지형지물부호 코드 처리
	    	var ftr_cde = data.features[i].properties.ftr_cde;
	    	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
	    	// 읍면동 코드 처리
	    	var hjd_cde = data.features[i].properties.hjd_cde;
	    	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
	    	// 관리기관 코드 처리
	    	var mng_cde = data.features[i].properties.mng_cde;
	    	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
	    	// 토구용도 코드 처리
	    	var vmt_cde = data.features[i].properties.vmt_cde;
	    	data.features[i].properties.vmt_cde_nm = getCmmCodeDataArray("OGC-145", vmt_cde);
	    	// 시설물형태 코드 처리
	    	var for_cde = data.features[i].properties.for_cde;
	    	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
	    	// 배수구역지형지물부호 코드 처리
	    	var dra_cde = data.features[i].properties.dra_cde;
	    	data.features[i].properties.dra_cde_nm = getCmmCodeDataArray("FTR-001", dra_cde);
	    	// 처리구역지형지물부호 코드 처리
	    	var dsp_cde = data.features[i].properties.dsp_cde;
	    	data.features[i].properties.dsp_cde_nm = getCmmCodeDataArray("FTR-001", dsp_cde);
			
	    	// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		const format = new ol.format.GeoJSON();
        features = format.readFeatures(data);
		
		var total = data.totalFeatures;
		var totPge = Math.ceil(total / 10);
		
		if (total >= 0) {
        	$("#bottomPopup .bbs-list-num").html("조회결과: " + total + "건");
        }

		// gird 적용
        FACILITY.Ax5UiGrid.setData({
			list: list,
			page: {
				currentPage: page - 1,	// 현재 페이지
				pageSize: 10,			// 한 페이지의 데이터 갯수
				totalElements: total,	// 전체 데이터 갯수
				totalPages: totPge		// 전체 페이지 갯수
			}
		})
		
		// 지도 아이콘 작업
        dtmap.vector.clear();
        
        // 지도에 GeoJSON 추가
        dtmap.vector.readGeoJson(data, function(feature) {
            // 스타일 콜백 
        	let properties = feature.getProperties();
            
            return {
                marker: {
                    src: '/images/poi/swlSpewPs_poi.png'
                },
                label: {
                    text: ''
                }
            }
        });
        dtmap.vector.fit();
	});
}

// 토구 상세정보 조회
function selectSwlSpewPs(id) {
	//console.log('selectSwlSpewPs(id)');
	//console.log('id >>> ' + id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	
	const typeName	= idArray[0];
	if(typeName != "swl_spew_ps"){
		alert("상세보기 오류");
		return false;
	}
	
	const gid = idArray[1];
	if(gid){
		filters.push("gid" + " = " + gid); 
	}else{
		alert("상세보기 오류");
		return false;
	}
	
    var options;
    options = {
        typeNames	: 'swl_spew_ps' + "",
        filter 		: filters,
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
    	//console.log(data);
    	
    	if(data.features.length != 1){
    		alert("상세보기 오류")
    		return false;
    	}
    	
    	// 지형지물부호 코드 처리
    	var ftr_cde = data.features[0].properties.ftr_cde;
    	data.features[0].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
    	// 읍면동 코드 처리
    	var hjd_cde = data.features[0].properties.hjd_cde;
    	data.features[0].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
    	// 관리기관 코드 처리
    	var mng_cde = data.features[0].properties.mng_cde;
    	data.features[0].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
    	// 토구용도 코드 처리
    	var vmt_cde = data.features[0].properties.vmt_cde;
    	data.features[0].properties.vmt_cde_nm = getCmmCodeDataArray("OGC-145", vmt_cde);
    	// 시설물형태 코드 처리
    	var for_cde = data.features[0].properties.for_cde;
    	data.features[0].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
    	// 배수구역지형지물부호 코드 처리
    	var dra_cde = data.features[0].properties.dra_cde;
    	data.features[0].properties.dra_cde_nm = getCmmCodeDataArray("FTR-001", dra_cde);
    	// 처리구역지형지물부호 코드 처리
    	var dsp_cde = data.features[0].properties.dsp_cde;
    	data.features[0].properties.dsp_cde_nm = getCmmCodeDataArray("FTR-001", dsp_cde);
		
    	// 좌표 처리
		data.features[0].properties.geomObj = data.features[0].geometry;
		
		var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectSwlSpewPsDetail(detailData);	//상세 페이지에 데이터 전달
    });
}

// 토구 상세보기 페이지 호출
function selectSwlSpewPsDetail(detailData) {
	//console.log('selectSwlSpewPsDetail(detailData)');
	//console.log(detailData);
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
		clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	if(!detailData && detailData == null){
		alert("토구 상세보기 오류");
		return false;
	}
	
	//파라미터 정리
	var formData = new FormData();
	for (var key in detailData) {
		if (detailData[key]) {		//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}
	
	ui.loadingBar("show");
	
	$.ajax({
		url:"/job/fcmr/ssfc/selectSwlSpewPsDetail.do",
		type: "POST",
		data: formData,
		dataType: 'html',
		contentType: false,
        processData: false,
		success: function(result) {
			//console.log(result);
			
			ui.openPopup("rightSubPopup");
			
			var container = "#rightSubPopup";
			$(container).html(result);
			
			//그리드에 행전체 선택되게 수정
			var gid = detailData.gid;
			var gridList = FACILITY.Ax5UiGrid.list;
			
			for (var i = 0; i < gridList.length; i++) {
				//console.log(gridList[i]);
				var grid = gridList[i];
				if (gid == grid.gid) {
					var dindex = grid.__index;
					FACILITY.Ax5UiGrid.clearSelect();
					FACILITY.Ax5UiGrid.focus(dindex);		
				}
			}
			
			dtmap.vector.select(detailData.id);	//지도에  표시
		},
		error : function(request,status,error) {
			console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		},
		complete : function() {
			ui.loadingBar("hide");
		}
	});
}

// 토구 등록 페이지 호출
function insertSwlSpewPsView(){
	//console.log("insertSwlSpewPsView()");
	
	if(dtmap.mod == "3D"){
		alert('3d 에서 사용할 수 없습니다');
		arrangeAddBtnMode();
		return false;
	}
	
	// 초기화
	dtmap.draw.dispose();				// 마우스에 파란점 제거
	dtmap.draw.clear();					// 지도에 파란점 제거
	dtmap.vector.clearSelect();			// 선택 해제
	FACILITY.Ax5UiGrid.clearSelect();	// 그리드 선택 해제
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
		clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/ssfc/insertSwlSpewPsView.do", function () {
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
		
		getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	// 읍면동
		getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	// 관리기관
		getCmmCodeData("OGC-145", "#rightSubPopup select[name=vmt_cde]");	// 토구용도 코드
		getCmmCodeData("OGC-001", "#rightSubPopup select[name=for_cde]");	// 시설물형태 코드

		ui.loadingBar("hide");
	});
}

// 토구 등록 저장
function insertSwlSpewPs() {
	//필수 값 체크
	const ftr_cde = $("#insertSwlSpewPsFrm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const dra_cde = $("#insertSwlSpewPsFrm select[name=dra_cde]").val();
	if(dra_cde == "" || dra_cde == null){
		alert("배수구역지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const dsp_cde = $("#insertSwlSpewPsFrm select[name=dsp_cde]").val();
	if(dsp_cde == "" || dsp_cde == null){
		alert("처리구역지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertSwlSpewPsFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#insertSwlSpewPsFrm input[name=ang_dir]").val()
    if (ang_dir) {
        const regexp = /^[0-9]*$/;
        var r = regexp.test(ang_dir);
        if(!r){
        	alert("방향각은 정수만 입력 가능합니다.")
        	return false;
        }
    }

	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertSwlSpewPsFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertSwlSpewPsFrm input[name=geom]").val();
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    feature.setGeometry(geometry);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_spew_ps", geojson: geojson};
    
    //등록
    ui.loadingBar("show");
   
    $.post("/job/fcts/insertFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("등록되었습니다.");
            
            // 화면 reset
            var $container = $("#container");
            var $target = $container.find('#bottomPopup .facility-select');
            $target.trigger("change");
            
            cancelInsertSwlSpewPs();	//창닫기
        } else {
            alert(`등록에 실패했습니다.`);
            console.log(result["errorMsg"]);
        }
        ui.loadingBar("hide");
    })
    .fail(() => {
        alert(`등록에 실패했습니다.`);
        ui.loadingBar("hide");
    });
}

// 토구 수정 페이지 호출
function updateSwlSpewPsView(id) {
	//console.log("updateSwlSpewPsView(id)");
	//console.log('id >>> ' + id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	if (!detailData && detailData == null) {
		alert("토구 상세정보 오류");
		return false;
	}
	
	//파라미터 처리
    var formData = new FormData();
	for (var key in detailData) {
		if (detailData[key]) {	//null 값이나 빈칸은 제외, 여기서 id 값 까지 포함되서 파라미터 완성
			formData.append(key, detailData[key]);
		}
	}
	
	ui.loadingBar("show");
	
    $.ajax({
		url:"/job/fcmr/ssfc/updateSwlSpewPsView.do",
		type: "POST",
		data: formData,
		dataType: 'html',
		contentType: false,
        processData: false,
		success: function(result) {
			//console.log(result);
			
			ui.openPopup("rightSubPopup");
			$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
			
			var container = "#rightSubPopup";
			$(container).html(result);
		},
		error : function(request,status,error) {
			console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		},
		complete : function() {
			ui.loadingBar("hide");
		}
	});
}

// 토구 수정
function updateSwlSpewPs() {
	//필수 값 체크
	const geom = $("#updateSwlSpewPsFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	const dra_cde = $("#updateSwlSpewPsFrm select[name=dra_cde]").val();
	if(dra_cde == "" || dra_cde == null){
		alert("배수구역지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const dsp_cde = $("#updateSwlSpewPsFrm select[name=dsp_cde]").val();
	if(dsp_cde == "" || dsp_cde == null){
		alert("처리구역지형지물부호는 필수 값입니다.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#updateSwlSpewPsFrm input[name=ang_dir]").val()
    if (ang_dir) {
        const regexp = /^[0-9]*$/;
        var r = regexp.test(ang_dir);
        if(!r){
        	alert("방향각은 정수만 입력 가능합니다.")
        	return false;
        }
    }
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#updateSwlSpewPsFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#updateSwlSpewPsFrm input[name=geom]").val();
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
	//3d일때는 wfs 조회시 위경도 좌표계로 오기 때문에 변경해줘서 업데이트 진행
	//만약 공간정보 feature 넣지 않으면 공간정보데이터 빈값으로 업데이트진행
	if(dtmap.mod == "3D"){	
		const geometry5179 = geometry.transform("EPSG:4326", "EPSG:5179");
		geometry = geometry5179;
	}
	
    feature.setGeometry(geometry);
    
	//id값 추가 
	const id = $("#updateSwlSpewPsFrm input[name=id]").val();
	feature.setId(id);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_spew_ps", geojson: geojson};
    
    //등록
    ui.loadingBar("show");
	
    $.post("/job/fcts/updateFacility.do", data)
	.done((response) => {
		const result = JSON.parse(response);
		if (result["result"]) {
			alert("수정 완료 되었습니다.");

			var page = $(".hiddenPage").val();
			selectSwlSpewPsList(page);
			
			cancelUpdateSwlSpewPs();	// 상세보기로 이동
		} else {
			alert(`수정 실패했습니다.`);
			console.log(result["errorMsg"]);
		}
		ui.loadingBar("hide");
	})
	.fail(() => {
		alert(`등록 실패했습니다.`);
		ui.loadingBar("hide");
	});
}

// 토구 삭제
function deleteSwlSpewPs(id) {
	if (confirm("삭제하시겠습니까? (복구할 수 없습니다.)")) {
		ui.loadingBar("show");

		const formData = new FormData();
		formData.append("dataId", 'swl_spew_ps' + "");
		formData.append("ids", id);

		$.ajax({
			url: "/job/fcts/deleteFacility.do",
			type: "post",
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
		})
		.done((response) => {
			const result = JSON.parse(response);
			if (result["result"]) {
				alert("삭제되었습니다.");

				selectSwlSpewPsList(1);		//첫페이지 조회
				cancelSwlSpewPsDetail();	//창닫기
			} else {
				alert(`삭제에 실패했습니다.`);
				console.log(result["errorMsg"]);
			}
			ui.loadingBar("hide");
		})
		.fail(() => {
			alert(`삭제에 실패했습니다.`);
			ui.loadingBar("hide");
		});
	}
}

// 토구 엑셀 저장
function swlSpewPsExcel() {
	var $container = $("#container");
    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid-excel"]');	//가상의 ax5uigrid 공간에 처리 
    $target.css('display', 'none');
    
	FACILITY.Ax5UiGridAll = null;	//Ax5UiGridAll 전역 변수 
    FACILITY.Ax5UiGridAll = new ax5.ui.grid();
    FACILITY.Ax5UiGridAll.setConfig({
		target:  $target,
        sortable: true,
        multipleSelect: false,
        header: {
			align: "center"
		},
        columns: [
        	{key: "ftr_idn",		label: "관리번호",			width: '*'},
			{key: "hjd_cde_nm",		label: "읍면동",			width: '*'},
			{key: "ist_ymd", 		label: "설치일자",			width: '*'},
			{key: "vmt_cde_nm",		label: "토구용도",			width: '*'},
			{key: "for_cde_nm",		label: "시설물형태",		width: '*'},
			{key: "spw_dip",		label: "원형토구내경",		width: '*'},
			{key: "spw_hol",		label: "각형토구가로길이",	width: '*'},
			{key: "spw_vel",		label: "각형토구세로길이",	width: '*'},
			{key: "spw_hsl", 		label: "토구표고",			width: '*'}
		],
		body: {
			align: "center"
		}
    });
    
	// 검색 조건
	var options;
	
	if ($(".groundwaterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		const filters = [];
		
		var hjdCde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var vmtCde = $("#lSrchOptions select[name=vmt_cde] option:selected").val();	// 토구용도
		var forCde = $("#lSrchOptions select[name=for_cde] option:selected").val();	// 시설물형태
		
		if (hjdCde) {
			filters.push("hjd_cde" + " = " + hjdCde);
		}
		if (vmtCde) {
			filters.push("vmt_cde" + " = " + vmtCde);
		}
		if (forCde) {
			filters.push("for_cde" + " = " + forCde);
		}
		
		options = {
			typeNames	: "swl_spew_ps" + "",
			filter		: filters,
			sortBy		: 'gid',
	        sortOrder	: 'DESC'
		};
	} else if ($(".groundwaterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'swl_spew_ps' + "",
			sortBy		: 'gid',
			sortOrder	: 'DESC'
		}
		if (type === 'extent') {
			options.bbox 		= FACILITY.spaceSearchOption.bbox;
		} else {
			options.geometry 	= FACILITY.spaceSearchOption.geometry;
		}
	} else {
		alert("검색 오류");
	}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			// 지형지물부호 코드 처리
	    	var ftr_cde = data.features[i].properties.ftr_cde;
	    	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
	    	// 읍면동 코드 처리
	    	var hjd_cde = data.features[i].properties.hjd_cde;
	    	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
	    	// 관리기관 코드 처리
	    	var mng_cde = data.features[i].properties.mng_cde;
	    	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
	    	// 토구용도 코드 처리
	    	var vmt_cde = data.features[i].properties.vmt_cde;
	    	data.features[i].properties.vmt_cde_nm = getCmmCodeDataArray("OGC-145", vmt_cde);
	    	// 시설물형태 코드 처리
	    	var for_cde = data.features[i].properties.for_cde;
	    	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
	    	// 배수구역지형지물부호 코드 처리
	    	var dra_cde = data.features[i].properties.dra_cde;
	    	data.features[i].properties.dra_cde_nm = getCmmCodeDataArray("FTR-001", dra_cde);
	    	// 처리구역지형지물부호 코드 처리
	    	var dsp_cde = data.features[i].properties.dsp_cde;
	    	data.features[i].properties.dsp_cde_nm = getCmmCodeDataArray("FTR-001", dsp_cde);
        	
        	// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
        //엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_토구.xls");
	});
}