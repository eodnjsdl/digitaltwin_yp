/**
 * - 업무 / 시설관리 / 하수도시설 / 측구
 * 
 * @returns
 */

$(document).ready(function(){
	//console.log("swlSideLs.js");
	//console.log("측구");
});

// 측구 목록 페이지 호출
function swlSideLsProcess() {
	//console.log('swlSideLsProcess()');
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	// 속성검색 옵션
	getCmmCodeData('YPE001', '#lSrchOptions select[name=hjd_cde]');		// 읍면동
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
			{key: "ftr_idn",		label: "관리번호",			width: '*'},
			{key: "hjd_cde_nm",		label: "읍면동",			width: '*'},
			{key: "ist_ymd", 		label: "설치일자",			width: '*'},
			{key: "aeg_cde_nm",		label: "촉구구분",			width: '*'},
			{key: "byc_len",		label: "연장",			width: '*'},
			{key: "mop_cde_nm",		label: "관재질",			width: '*'}
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
            	selectSwlSideLsList(this.page.selectPage + 1);	// 페이지 이동
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				//console.log(this.item.id);
				selectSwlSideLs(this.item.id);	// 상세보기
			}
		}
	});
	selectSwlSideLsList(1);
}

// 측구 목록 조회
function selectSwlSideLsList(page) {
	//console.log('selectSwlSideLsList(page)');
	
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
		
		var hjd_cde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var mop_cde = $("#lSrchOptions select[name=mop_cde] option:selected").val();	// 관재질
		
		if (hjd_cde) {
			filters.push("hjd_cde" + " = " + hjd_cde);
		}
		if (mop_cde) {
			filters.push("mop_cde" + " = " + mop_cde);
		}
		
		options = {
			typeNames	: "swl_side_ls" + "",
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
			typeNames	: 'swl_side_ls' + "",
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
	    	// 촉구구분 코드 처리
	    	var aeg_cde = data.features[i].properties.aeg_cde;
	    	data.features[i].properties.aeg_cde_nm = getCmmCodeDataArray("OGC-054", aeg_cde);
	    	// 관재질 코드 처리
	    	var mop_cde = data.features[i].properties.mop_cde;
	    	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
			
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
            return {
            	stroke: {
                    color: '#FF3333',
                    width: 4
                },
                radius: 10,
                label: {
                    column: 'aeg_cde_nm'
                }
            }
        });
        dtmap.vector.fit();
	});
}

// 측구 상세정보 조회
function selectSwlSideLs(id) {
	//console.log('selectSwlSideLs(id)');
	//console.log('id >>> ' + id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	
	const typeName	= idArray[0];
	if(typeName != "swl_side_ls"){
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
        typeNames	: 'swl_side_ls' + "",
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
    	// 촉구구분 코드 처리
    	var aeg_cde = data.features[0].properties.aeg_cde;
    	data.features[0].properties.aeg_cde_nm = getCmmCodeDataArray("OGC-054", aeg_cde);
    	// 관재질 코드 처리
    	var mop_cde = data.features[0].properties.mop_cde;
    	data.features[0].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
		
    	// 좌표 처리
		data.features[0].properties.geomObj = data.features[0].geometry;
		
		var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectSwlSideLsDetail(detailData);	//상세 페이지에 데이터 전달
    });
}

// 측구 상세보기 페이지 호출
function selectSwlSideLsDetail(detailData) {
	//console.log('selectSwlSideLsDetail(detailData)');
	//console.log(detailData);
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
		clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	if(!detailData && detailData == null){
		alert("측구 상세보기 오류");
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
		url:"/job/fcmr/ssfc/selectSwlSideLsDetail.do",
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

// 측구 등록 페이지 호출
function insertSwlSideLsView(){
	//console.log("insertSwlSideLsView()");
	
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
	$(container).load("/job/fcmr/ssfc/insertSwlSideLsView.do", function () {
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
		
		getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	// 읍면동
		getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	// 관리기관
		getCmmCodeData("OGC-054", "#rightSubPopup select[name=aeg_cde]");	// 촉구구분 코드
		getCmmCodeData("OGC-003", "#rightSubPopup select[name=mop_cde]");	// 관재질 코드

		ui.loadingBar("hide");
	});
}

// 측구 등록 저장
function insertSwlSideLs() {
	//필수 값 체크
	const ftr_cde = $("#insertSwlSideLsFrm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertSwlSideLsFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertSwlSideLsFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertSwlSideLsFrm input[name=geom]").val();
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    feature.setGeometry(geometry);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_side_ls", geojson: geojson};
    
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
            
            cancelInsertSwlSideLs();	//창닫기
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

// 측구 수정 페이지 호출
function updateSwlSideLsView(id) {
	//console.log("updateSwlSideLsView(id)");
	//console.log('id >>> ' + id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	if (!detailData && detailData == null) {
		alert("측구 상세정보 오류");
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
		url:"/job/fcmr/ssfc/updateSwlSideLsView.do",
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

// 측구 수정
function updateSwlSideLs() {
	//필수 값 체크
	const geom = $("#updateSwlSideLsFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#updateSwlSideLsFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#updateSwlSideLsFrm input[name=geom]").val();
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
	const id = $("#updateSwlSideLsFrm input[name=id]").val();
	feature.setId(id);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_side_ls", geojson: geojson};
    
    //등록
    ui.loadingBar("show");
	
    $.post("/job/fcts/updateFacility.do", data)
	.done((response) => {
		const result = JSON.parse(response);
		if (result["result"]) {
			alert("수정 완료 되었습니다.");

			var page = $(".hiddenPage").val();
			selectSwlSideLsList(page);
			
			cancelUpdateSwlSideLs();	// 상세보기로 이동
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

// 측구 삭제
function deleteSwlSideLs(id) {
	if (confirm("삭제하시겠습니까? (복구할 수 없습니다.)")) {
		ui.loadingBar("show");

		const formData = new FormData();
		formData.append("dataId", 'swl_side_ls' + "");
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

				selectSwlSideLsList(1);		//첫페이지 조회
				cancelSwlSideLsDetail();	//창닫기
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

// 측구 엑셀 저장
function swlSideLsExcel() {
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
			{key: "aeg_cde_nm",		label: "촉구구분",			width: '*'},
			{key: "byc_len",		label: "연장",			width: '*'},
			{key: "mop_cde_nm",		label: "관재질",			width: '*'}
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
		var mop_cde = $("#lSrchOptions select[name=mop_cde] option:selected").val();	// 관재질
		
		if (hjd_cde) {
			filters.push("hjd_cde" + " = " + hjd_cde);
		}
		if (mop_cde) {
			filters.push("mop_cde" + " = " + mop_cde);
		}
		
		options = {
			typeNames	: "swl_side_ls" + "",
			filter		: filters,
			sortBy		: 'gid',
	        sortOrder	: 'DESC'
		};
	} else if ($(".groundwaterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'swl_side_ls' + "",
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
	    	// 촉구구분 코드 처리
	    	var aeg_cde = data.features[i].properties.aeg_cde;
	    	data.features[i].properties.aeg_cde_nm = getCmmCodeDataArray("OGC-054", aeg_cde);
	    	// 관재질 코드 처리
	    	var mop_cde = data.features[i].properties.mop_cde;
	    	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
			
        	// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
        //엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_측구.xls");
	});
}