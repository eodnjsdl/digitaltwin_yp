/**
 * - 업무 / 시설관리 / 하수도시설 / 하수관거
 * 
 * @returns
 */

$(document).ready(function(){
	//console.log("swlPipeLm.js");
	//console.log("하수관거");
});

// 하수관거 목록 페이지 호출
function swlPipeLmProcess() {
	//console.log('swlPipeLmProcess()');
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	// 속성검색 옵션
	getCmmCodeData('YPE001', '#lSrchOptions select[name=hjd_cde]');		// 읍면동
	getCmmCodeData('OGC-017', '#lSrchOptions select[name=sba_cde]');	// 하수관용도
	getCmmCodeData('OGC-003', '#lSrchOptions select[name=mop_cde]');	// 관재질
	
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
			{key: "hjd_cde_nm",		label: "읍면동",			width: 100},
			{key: "ist_ymd", 		label: "설치일자",			width: 100},
			{key: "sba_cde_nm",		label: "하수관용도",		width: 120},
			{key: "mop_cde_nm",		label: "관재질",			width: 150},
			{key: "lit_cde_nm",		label: "규모",			width: 100},
			{key: "for_cde_nm", 	label: "시설물형태",		width: 100},
			{key: "std_dip", 		label: "관경",			width: 100},
			{key: "byc_len",		label: "연장",			width: 100},
			{key: "beg_dep",		label: "시점깊이",			width: 100},
			{key: "end_dep",		label: "종점깊이",			width: 100},
			{key: "sbk_hsl",		label: "시점관저고",		width: 100},
			{key: "sbl_hsl",		label: "종점관저고",		width: 100}
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
            	selectSwlPipeLmList(this.page.selectPage + 1);	// 페이지 이동
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				//console.log(this.item.id);
				selectSwlPipeLm(this.item.id);	// 상세보기
			}
		}
	});
	selectSwlPipeLmList(1);
}

// 하수관거 목록 조회
function selectSwlPipeLmList(page) {
	//console.log('selectSwlPipeLmList(page)');
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	// 검색 조건
	var options;
	
	if ($(".groundwaterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		const filters = [];
		
		var hjd_cde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var sba_cde = $("#lSrchOptions select[name=sba_cde] option:selected").val();	// 하수관용도
		var mop_cde = $("#lSrchOptions select[name=mop_cde] option:selected").val();	// 관재질
		const std_dip_min = $("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
		const std_dip_max = $("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
		
		if (hjd_cde) {
			filters.push("hjd_cde" + " = " + hjd_cde);
		}
		if (sba_cde) {
			filters.push("sba_cde" + " = " + sba_cde);
		}
		if (mop_cde) {
			filters.push("mop_cde" + " = " + mop_cde);
		}
		if(std_dip_min && std_dip_max){
			filters.push("std_dip" + " >= " + std_dip_min);
			filters.push("std_dip" + " <= " + std_dip_max);
		}else if(std_dip_min){
			filters.push("std_dip" + " >= " + std_dip_min);
		}else if(std_dip_max){
			filters.push("std_dip" + " <= " + std_dip_max);
		}
		
		options = {
			typeNames	: "swl_pipe_lm" + "",
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
			typeNames	: 'swl_pipe_lm' + "",
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
	    	// 하수관용도 코드 처리
	    	var sba_cde = data.features[i].properties.sba_cde;
	    	data.features[i].properties.sba_cde_nm = getCmmCodeDataArray("OGC-017", sba_cde);
	    	// 관재질 코드 처리
	    	var mop_cde = data.features[i].properties.mop_cde;
	    	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
	    	// 규모 코드 처리
	    	var lit_cde = data.features[i].properties.lit_cde;
	    	data.features[i].properties.lit_cde_nm = getCmmCodeDataArray("OGC-018", lit_cde);
	    	// 시설물형태 코드 처리
	    	var for_cde = data.features[i].properties.for_cde;
	    	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
	    	// 시점맨홀지형지물부호 코드 처리
	    	var bom_cde = data.features[i].properties.bom_cde;
	    	data.features[i].properties.bom_cde_nm = getCmmCodeDataArray("FTR-001", bom_cde);
	    	// 종점맨홀지형지물부호 코드 처리
	    	var eom_cde = data.features[i].properties.eom_cde;
	    	data.features[i].properties.eom_cde_nm = getCmmCodeDataArray("FTR-001", eom_cde);
			
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
            	stroke: {
                    color: '#FF3333',
                    width: 4
                }
            }
        });
        dtmap.vector.fit();
	});
}

// 하수관거 상세정보 조회
function selectSwlPipeLm(id) {
	//console.log('selectSwlPipeLm(id)');
	//console.log('id >>> ' + id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	
	const typeName	= idArray[0];
	if(typeName != "swl_pipe_lm"){
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
        typeNames	: 'swl_pipe_lm' + "",
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
    	// 하수관용도 코드 처리
    	var sba_cde = data.features[0].properties.sba_cde;
    	data.features[0].properties.sba_cde_nm = getCmmCodeDataArray("OGC-017", sba_cde);
    	// 관재질 코드 처리
    	var mop_cde = data.features[0].properties.mop_cde;
    	data.features[0].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
    	// 규모 코드 처리
    	var lit_cde = data.features[0].properties.lit_cde;
    	data.features[0].properties.lit_cde_nm = getCmmCodeDataArray("OGC-018", lit_cde);
    	// 시설물형태 코드 처리
    	var for_cde = data.features[0].properties.for_cde;
    	data.features[0].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
    	// 시점맨홀지형지물부호 코드 처리
    	var bom_cde = data.features[0].properties.bom_cde;
    	data.features[0].properties.bom_cde_nm = getCmmCodeDataArray("FTR-001", bom_cde);
    	// 종점맨홀지형지물부호 코드 처리
    	var eom_cde = data.features[0].properties.eom_cde;
    	data.features[0].properties.eom_cde_nm = getCmmCodeDataArray("FTR-001", eom_cde);
		
    	// 좌표 처리
		data.features[0].properties.geomObj = data.features[0].geometry;
		
		var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectSwlPipeLmDetail(detailData);	//상세 페이지에 데이터 전달
    });
}

// 하수관거 상세보기 페이지 호출
function selectSwlPipeLmDetail(detailData) {
	//console.log('selectSwlPipeLmDetail(detailData)');
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("하수관거 상세보기 오류");
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
		url:"/job/fcmr/ssfc/selectSwlPipeLmDetail.do",
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

// 하수관거 등록 페이지 호출
function insertSwlPipeLmView(){
	//console.log("insertSwlPipeLmView()");
	
	dtmap.vector.clearSelect();		// 선택 해제
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/ssfc/insertSwlPipeLmView.do", function () {
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
		
		getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	// 읍면동
		getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	// 관리기관
		getCmmCodeData("OGC-017", "#rightSubPopup select[name=sba_cde]");	// 하수관용도 코드
		getCmmCodeData("OGC-003", "#rightSubPopup select[name=mop_cde]");	// 관재질 코드
		getCmmCodeData("OGC-018", "#rightSubPopup select[name=lit_cde]");	// 규모 코드
		getCmmCodeData("OGC-001", "#rightSubPopup select[name=for_cde]");	// 시설물형태 코드
		getCmmCodeData("FTR-001", "#rightSubPopup select[name=bom_cde]");	// 시점맨홀지형지물부호 코드
		getCmmCodeData("FTR-001", "#rightSubPopup select[name=eom_cde]");	// 종점맨홀지형지물부호 코드

		ui.loadingBar("hide");
	});
}

// 하수관거 등록 저장
function insertSwlPipeLm() {
	//필수 값 체크
	const ftr_cde = $("#insertSwlPipeLmFrm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertSwlPipeLmFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const std_dip = $("#insertSwlPipeLmFrm input[name=std_dip]").val()
    if (std_dip) {
        const regexp = /^[0-9]*$/;
        var r = regexp.test(std_dip);
        if(!r){
        	alert("관경은 정수만 입력 가능합니다.")
        	return false;
        }
    }

	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertSwlPipeLmFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertSwlPipeLmFrm input[name=geom]").val();
    
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    feature.setGeometry(geometry);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_pipe_lm", geojson: geojson};
    
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
            
            cancelInsertSwlPipeLm();	//창닫기
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

// 하수관거 수정 페이지 호출
function updateSwlPipeLmView(id) {
	//console.log("updateSwlPipeLmView(id)");
	//console.log('id >>> ' + id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	console.log(detailData)
	
	if (!detailData && detailData == null) {
		alert("하수관거 상세정보 오류");
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
		url:"/job/fcmr/ssfc/updateSwlPipeLmView.do",
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
		},
		error : function(request,status,error) {
			console.log("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
		},
		complete : function() {
			ui.loadingBar("hide");
		}
	});
}

// 하수관거 수정
function updateSwlPipeLm() {
	//필수 값 체크
	const geom = $("#updateSwlPipeLmFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const std_dip = $("#updateSwlPipeLmFrm input[name=std_dip]").val()
    if (std_dip) {
        const regexp = /^[0-9]*$/;
        var r = regexp.test(std_dip);
        if(!r){
        	alert("관경은 정수만 입력 가능합니다.")
        	return false;
        }
    }
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#updateSwlPipeLmFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#updateSwlPipeLmFrm input[name=geom]").val();
    
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    feature.setGeometry(geometry);
    
	//id값 추가 
	const id = $("#updateSwlPipeLmFrm input[name=id]").val();
	feature.setId(id);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_pipe_lm", geojson: geojson};
    
    // 수정
    ui.loadingBar("show");
	
    $.post("/job/fcts/updateFacility.do", data)
	.done((response) => {
		const result = JSON.parse(response);
		if (result["result"]) {
			alert("수정 완료 되었습니다.");

			var page = $(".hiddenPage").val();
			selectSwlPipeLmList(page);
			
			cancelUpdateSwlPipeLm();
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

// 하수관거 삭제
function deleteSwlPipeLm(id) {
	if (confirm("삭제하시겠습니까? (복구할 수 없습니다.)")) {
		ui.loadingBar("show");

		const formData = new FormData();
		formData.append("dataId", 'swl_pipe_lm' + "");
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

				selectSwlPipeLmList(1);	//첫페이지 조회
				closeSwlPipeLmPopup();	//창닫기
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

function closeSwlPipeLmPopup() {
	dtmap.draw.dispose();			// 마우스에 파란점 제거
	dtmap.draw.clear();				// 지도에 파란점 제거
	dtmap.vector.clearSelect();		// 선택 해제
	
	ui.closeSubPopup();				// 팝업 닫기
}

// 하수관거 엑셀 저장
function swlPipeLmExcel() {
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
        	{key: "hjd_cde_nm",		label: "읍면동",			width: '*'},
			{key: "ist_ymd", 		label: "설치일자",			width: '*'},
			{key: "sba_cde_nm",		label: "하수관용도",		width: '*'},
			{key: "mop_cde_nm",		label: "관재질",			width: '*'},
			{key: "lit_cde_nm",		label: "규모",			width: '*'},
			{key: "for_cde_nm", 	label: "시설물형태",		width: '*'},
			{key: "std_dip", 		label: "관경",			width: '*'},
			{key: "byc_len",		label: "연장",			width: '*'},
			{key: "beg_dep",		label: "시점깊이",			width: '*'},
			{key: "end_dep",		label: "종점깊이",			width: '*'},
			{key: "sbk_hsl",		label: "시점관저고",		width: '*'},
			{key: "sbl_hsl",		label: "종점관저고",		width: '*'}
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
		
		var hjd_cde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var sba_cde = $("#lSrchOptions select[name=sba_cde] option:selected").val();	// 하수관용도
		var mop_cde = $("#lSrchOptions select[name=mop_cde] option:selected").val();	// 관재질
		const std_dip_min = $("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
		const std_dip_max = $("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
		
		if (hjd_cde) {
			filters.push("hjd_cde" + " = " + hjd_cde);
		}
		if (sba_cde) {
			filters.push("sba_cde" + " = " + sba_cde);
		}
		if (mop_cde) {
			filters.push("mop_cde" + " = " + mop_cde);
		}
		if(std_dip_min && std_dip_max){
			filters.push("std_dip" + " >= " + std_dip_min);
			filters.push("std_dip" + " <= " + std_dip_max);
		}else if(std_dip_min){
			filters.push("std_dip" + " >= " + std_dip_min);
		}else if(std_dip_max){
			filters.push("std_dip" + " <= " + std_dip_max);
		}
		
		options = {
			typeNames	: "swl_pipe_lm" + "",
			filter		: filters,
			sortBy		: 'gid',
	        sortOrder	: 'DESC'
		};
	} else if ($(".groundwaterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'swl_pipe_lm' + "",
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
	    	// 하수관용도 코드 처리
	    	var sba_cde = data.features[i].properties.sba_cde;
	    	data.features[i].properties.sba_cde_nm = getCmmCodeDataArray("OGC-017", sba_cde);
	    	// 관재질 코드 처리
	    	var mop_cde = data.features[i].properties.mop_cde;
	    	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
	    	// 규모 코드 처리
	    	var lit_cde = data.features[i].properties.lit_cde;
	    	data.features[i].properties.lit_cde_nm = getCmmCodeDataArray("OGC-018", lit_cde);
	    	// 시설물형태 코드 처리
	    	var for_cde = data.features[i].properties.for_cde;
	    	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
	    	// 시점맨홀지형지물부호 코드 처리
	    	var bom_cde = data.features[i].properties.bom_cde;
	    	data.features[i].properties.bom_cde_nm = getCmmCodeDataArray("FTR-001", bom_cde);
	    	// 종점맨홀지형지물부호 코드 처리
	    	var eom_cde = data.features[i].properties.eom_cde;
	    	data.features[i].properties.eom_cde_nm = getCmmCodeDataArray("FTR-001", eom_cde);
        	
        	// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
        //엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_하수관거.xls");
	});
}