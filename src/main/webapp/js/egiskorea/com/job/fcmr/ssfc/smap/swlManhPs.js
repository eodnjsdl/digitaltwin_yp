/**
 * - 업무 / 시설관리 / 하수도시설 / 하수맨홀
 * 
 * @returns
 */

$(document).ready(function(){
	//console.log("swlManhPs.js");
	//console.log("하수맨홀");
});

// 하수맨홀 목록 페이지 호출
function swlManhPsProcess() {
	//console.log('swlManhPsProcess()');
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	// 속성검색 옵션
	getCmmCodeData('YPE001', '#lSrchOptions select[name=hjd_cde]');		// 읍면동
	getCmmCodeData('OGC-013', '#lSrchOptions select[name=smu_cde]');	// 하수맨홀용도
	getCmmCodeData('OGC-001', '#lSrchOptions select[name=for_cde]');	// 시설물형태
	getCmmCodeData('OGC-002', '#lSrchOptions select[name=som_cde]');	// 맨홀종류
	
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
			{key: "ftr_idn",		label: "관리번호",			width: 150},
			{key: "hjd_cde_nm",		label: "읍면동",			width: 120},
			{key: "ist_ymd", 		label: "설치일자",			width: 150},
			{key: "smu_cde_nm",		label: "하수맨홀용도",		width: 110},
			{key: "for_cde_nm",		label: "시설물형태",		width: 100},
			{key: "man_dip",		label: "하수맨홀구경",		width: 110},
			{key: "ivt_cde_nm", 	label: "인버트유무",		width: 100},
			{key: "lad_cde_nm", 	label: "사다리설치유무",		width: 120},
			{key: "mos_hsl",		label: "하수맨홀고도",		width: 110},
			{key: "lms_hsl",		label: "하수맨홀저고",		width: 110},
			{key: "cst_cde_nm",		label: "이상상태",			width: 100}
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
            	selectSwlManhPsList(this.page.selectPage + 1);	// 페이지 이동
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				//console.log(this.item.id);
				selectSwlManhPs(this.item.id);	// 상세보기
			}
		}
	});
	selectSwlManhPsList(1);
}

// 하수맨홀 목록 조회
function selectSwlManhPsList(page) {
	//console.log('selectSwlManhPsList(page)');
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	// 검색 조건
	var options;
	
	if ($(".groundwaterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		const filters = [];
		
		var hjdCde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var smuCde = $("#lSrchOptions select[name=smu_cde] option:selected").val();	// 하수맨홀용도
		var forCde = $("#lSrchOptions select[name=for_cde] option:selected").val();	// 시설물형태
		var somCde = $("#lSrchOptions select[name=som_cde] option:selected").val();	// 맨홀종류
		
		if (hjdCde) {
			filters.push("hjd_cde" + " = " + hjdCde);
		}
		if (smuCde) {
			filters.push("smu_cde" + " = " + smuCde);
		}
		if (forCde) {
			filters.push("for_cde" + " = " + forCde);
		}
		if (somCde) {
			filters.push("som_cde" + " = " + somCde);
		}
		
		options = {
			typeNames	: "swl_manh_ps" + "",
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
			typeNames	: 'swl_manh_ps' + "",
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
	    	// 하수맨홀용도 코드 처리
	    	var smu_cde = data.features[i].properties.smu_cde;
	    	data.features[i].properties.smu_cde_nm = getCmmCodeDataArray("OGC-013", smu_cde);
	    	// 시설물형태 코드 처리
	    	var for_cde = data.features[i].properties.for_cde;
	    	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
	    	// 맨홀종류 코드 처리
	    	var som_cde = data.features[i].properties.som_cde;
	    	data.features[i].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
	    	// 뚜껑재질 코드 처리
	    	var sbc_cde = data.features[i].properties.sbc_cde;
	    	data.features[i].properties.sbc_cde_nm = getCmmCodeDataArray("OGC-014", sbc_cde);
	    	// 인버트유무 코드 처리
	    	var ivt_cde = data.features[i].properties.ivt_cde;
	    	data.features[i].properties.ivt_cde_nm = getCmmCodeDataArray("OGC-015", ivt_cde);
	    	// 사다리설치유무 코드 처리
	    	var lad_cde = data.features[i].properties.lad_cde;
	    	data.features[i].properties.lad_cde_nm = getCmmCodeDataArray("OGC-016", lad_cde);
	    	// 이상상태 코드 처리
	    	var cst_cde = data.features[i].properties.cst_cde;
	    	data.features[i].properties.cst_cde_nm = getCmmCodeDataArray("OGC-010", cst_cde);
			
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
                    src: '/images/poi/swlManhPs_poi.png'
                },
                label: {
                    text: ''
                }
            }
        });
        dtmap.vector.fit();
	});
}

// 하수맨홀 상세정보 조회
function selectSwlManhPs(id) {
	//console.log('selectSwlManhPs(id)');
	//console.log('id >>> ' + id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	
	const typeName	= idArray[0];
	if(typeName != "swl_manh_ps"){
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
        typeNames	: 'swl_manh_ps' + "",
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
    	// 하수맨홀용도 코드 처리
    	var smu_cde = data.features[0].properties.smu_cde;
    	data.features[0].properties.smu_cde_nm = getCmmCodeDataArray("OGC-013", smu_cde);
    	// 시설물형태 코드 처리
    	var for_cde = data.features[0].properties.for_cde;
    	data.features[0].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
    	// 맨홀종류 코드 처리
    	var som_cde = data.features[0].properties.som_cde;
    	data.features[0].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
    	// 뚜껑재질 코드 처리
    	var sbc_cde = data.features[0].properties.sbc_cde;
    	data.features[0].properties.sbc_cde_nm = getCmmCodeDataArray("OGC-014", sbc_cde);
    	// 인버트유무 코드 처리
    	var ivt_cde = data.features[0].properties.ivt_cde;
    	data.features[0].properties.ivt_cde_nm = getCmmCodeDataArray("OGC-015", ivt_cde);
    	// 사다리설치유무 코드 처리
    	var lad_cde = data.features[0].properties.lad_cde;
    	data.features[0].properties.lad_cde_nm = getCmmCodeDataArray("OGC-016", lad_cde);
    	// 이상상태 코드 처리
    	var cst_cde = data.features[0].properties.cst_cde;
    	data.features[0].properties.cst_cde_nm = getCmmCodeDataArray("OGC-010", cst_cde);
		
    	// 좌표 처리
		data.features[0].properties.geomObj = data.features[0].geometry;
		
		var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectSwlManhPsDetail(detailData);	//상세 페이지에 데이터 전달
    });
}

// 하수맨홀 상세보기 페이지 호출
function selectSwlManhPsDetail(detailData) {
	//console.log('selectSwlManhPsDetail(detailData)');
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("하수맨홀 상세보기 오류");
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
		url:"/job/fcmr/ssfc/selectSwlManhPsDetail.do",
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

// 하수맨홀 등록 페이지 호출
function insertSwlManhPsView(){
	//console.log("insertSwlManhPsView()");
	
	dtmap.vector.clearSelect();		// 선택 해제
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
	$(container).load("/job/fcmr/ssfc/insertSwlManhPsView.do", function () {
		$(".scroll-y").mCustomScrollbar({
			scrollbarPosition: "outside",
		});
		
		getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	// 읍면동
		getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	// 관리기관
		getCmmCodeData("OGC-013", "#rightSubPopup select[name=smu_cde]");	// 하수맨홀용도 코드
		getCmmCodeData("OGC-001", "#rightSubPopup select[name=for_cde]");	// 시설물형태 코드
		getCmmCodeData("OGC-002", "#rightSubPopup select[name=som_cde]");	// 맨홀종류 코드
		getCmmCodeData("OGC-014", "#rightSubPopup select[name=sbc_cde]");	// 뚜껑재질 코드
		getCmmCodeData("OGC-015", "#rightSubPopup select[name=ivt_cde]");	// 인버트유무 코드
		getCmmCodeData("OGC-016", "#rightSubPopup select[name=lad_cde]");	// 사다리설치유무 코드
		getCmmCodeData("OGC-010", "#rightSubPopup select[name=cst_cde]");	// 이상상태 코드

		ui.loadingBar("hide");
	});
}

// 하수맨홀 등록 저장
function insertSwlManhPs() {
	//필수 값 체크
	const ftr_cde = $("#insertSwlManhPsFrm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertSwlManhPsFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#insertSwlManhPsFrm input[name=ang_dir]").val()
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
	const params = $("#insertSwlManhPsFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertSwlManhPsFrm input[name=geom]").val();
    
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    feature.setGeometry(geometry);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_manh_ps", geojson: geojson};
    
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
            
            cancelInsertSwlManhPs();	//창닫기
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

// 하수맨홀 수정 페이지 호출
function updateSwlManhPsView(id) {
	//console.log("updateSwlManhPsView(id)");
	//console.log('id >>> ' + id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	if (!detailData && detailData == null) {
		alert("하수맨홀 상세정보 오류");
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
		url:"/job/fcmr/ssfc/updateSwlManhPsView.do",
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

// 하수맨홀 수정
function updateSwlManhPs() {
	//필수 값 체크
	const geom = $("#updateSwlManhPsFrm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#updateSwlManhPsFrm input[name=ang_dir]").val()
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
	const params = $("#updateSwlManhPsFrm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#updateSwlManhPsFrm input[name=geom]").val();
    
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    feature.setGeometry(geometry);
    
	//id값 추가 
	const id = $("#updateSwlManhPsFrm input[name=id]").val();
	feature.setId(id);

    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data		= {dataId: "swl_manh_ps", geojson: geojson};
    
    //등록
    ui.loadingBar("show");
	
    $.post("/job/fcts/updateFacility.do", data)
	.done((response) => {
		const result = JSON.parse(response);
		if (result["result"]) {
			alert("수정 완료 되었습니다.");

			var page = $(".hiddenPage").val();
			selectSwlManhPsList(page);
			
			cancelUpdateSwlManhPs();
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

// 하수맨홀 삭제
function deleteSwlManhPs(id) {
	if (confirm("삭제하시겠습니까? (복구할 수 없습니다.)")) {
		ui.loadingBar("show");

		const formData = new FormData();
		formData.append("dataId", 'swl_manh_ps' + "");
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

				selectSwlManhPsList(1);	//첫페이지 조회
				closeSwlManhPsPopup();	//창닫기
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

function closeSwlManhPsPopup() {
	dtmap.draw.dispose();			// 마우스에 파란점 제거
	dtmap.draw.clear();				// 지도에 파란점 제거
	dtmap.vector.clearSelect();		// 선택 해제
	
	ui.closeSubPopup();				// 팝업 닫기
}

// 하수맨홀 엑셀 저장
function swlManhPsExcel() {
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
			{key: "smu_cde_nm",		label: "하수맨홀용도",		width: '*'},
			{key: "for_cde_nm",		label: "시설물형태",		width: '*'},
			{key: "man_dip",		label: "하수맨홀구경",		width: '*'},
			{key: "ivt_cde_nm", 	label: "인버트유무",		width: '*'},
			{key: "lad_cde_nm", 	label: "사다리설치유무",		width: '*'},
			{key: "mos_hsl",		label: "하수맨홀고도",		width: '*'},
			{key: "lms_hsl",		label: "하수맨홀저고",		width: '*'},
			{key: "cst_cde_nm",		label: "이상상태",			width: '*'}
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
		var smuCde = $("#lSrchOptions select[name=smu_cde] option:selected").val();	// 하수맨홀용도
		var forCde = $("#lSrchOptions select[name=for_cde] option:selected").val();	// 시설물형태
		var somCde = $("#lSrchOptions select[name=som_cde] option:selected").val();	// 맨홀종류
		
		if (hjdCde) {
			filters.push("hjd_cde" + " = " + hjdCde);
		}
		if (smuCde) {
			filters.push("smu_cde" + " = " + smuCde);
		}
		if (forCde) {
			filters.push("for_cde" + " = " + forCde);
		}
		if (somCde) {
			filters.push("som_cde" + " = " + somCde);
		}
		
		options = {
			typeNames	: "swl_manh_ps" + "",
			filter		: filters,
			sortBy		: 'gid',
	        sortOrder	: 'DESC'
		};
	} else if ($(".groundwaterSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

		options = {
			typeNames	: 'swl_manh_ps' + "",
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
	    	// 하수맨홀용도 코드 처리
	    	var smu_cde = data.features[i].properties.smu_cde;
	    	data.features[i].properties.smu_cde_nm = getCmmCodeDataArray("OGC-013", smu_cde);
	    	// 시설물형태 코드 처리
	    	var for_cde = data.features[i].properties.for_cde;
	    	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
	    	// 맨홀종류 코드 처리
	    	var som_cde = data.features[i].properties.som_cde;
	    	data.features[i].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
	    	// 뚜껑재질 코드 처리
	    	var sbc_cde = data.features[i].properties.sbc_cde;
	    	data.features[i].properties.sbc_cde_nm = getCmmCodeDataArray("OGC-014", sbc_cde);
	    	// 인버트유무 코드 처리
	    	var ivt_cde = data.features[i].properties.ivt_cde;
	    	data.features[i].properties.ivt_cde_nm = getCmmCodeDataArray("OGC-015", ivt_cde);
	    	// 사다리설치유무 코드 처리
	    	var lad_cde = data.features[i].properties.lad_cde;
	    	data.features[i].properties.lad_cde_nm = getCmmCodeDataArray("OGC-016", lad_cde);
	    	// 이상상태 코드 처리
	    	var cst_cde = data.features[i].properties.cst_cde;
	    	data.features[i].properties.cst_cde_nm = getCmmCodeDataArray("OGC-010", cst_cde);
        	
        	// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
        	const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
        //엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_하수맨홀.xls");
	});
}