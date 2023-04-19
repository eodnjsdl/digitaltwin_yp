/**
 * - 업무 / 시설관리 / 하수도 시설 / 환기구
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("swlVentPs.js");
	console.log("환기구");
});

// 환기구 목록 페이지 호출
function selectSwlVentPsListView() {
	console.log('selectSwlVentPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlVentPsListView.do', function() {
		toastr.success("/job/fcmr/ssfc/selectSwlVentPsListView.do", "페이지🙂호🙂출🙂");
		
		// grid 기본 세팅
		var $container = $("#container");
		var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
		$target.css('height', 'inherit');
		
		// 속성검색 옵션
		getCmmCodeData('YPE001', '#lSrchOptions select[name=hjd_cde]');		// 읍면동
		getCmmCodeData('OGC-003', '#lSrchOptions select[name=mop_cde]');	// 관재질
		getCmmCodeData('OGC-012', '#lSrchOptions select[name=mof_cde]');	// 흡출기형식
		getCmmCodeData('OGC-172', '#lSrchOptions select[name=hmp_cde]');	// 흡출기재질
		
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
				{key: "ftr_idn",		label: "관리번호",			width: 170},
				{key: "hjd_cde_nm", 	label: "읍면동",			width: 170},
				{key: "ist_ymd",		label: "설치일자",			width: 170},
				{key: "vnt_dip",		label: "환기구구경",		width: 170},
				{key: "mop_cde_nm",		label: "관재질",			width: 210},
				{key: "mof_cde_nm",		label: "흡출기형식",		width: 170},
				{key: "hmp_cde_nm",		label: "흡출기재질",		width: 210}
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
	            	selectSwlVentPsList(this.page.selectPage + 1);	// 페이지 이동
	            	$('.hiddenPage').val(this.page.selectPage + 1);
	            }
			},
			body: {
				align: "center",
				onClick: function() {
					//this.self.select(this.dindex);
					console.log(this.item.id);
					selectSwlVentPs(this.item.id);	// 상세보기
				}
			}
		});
	});
	
	selectSwlVentPsList(1);
	ui.loadingBar("hide");
}

// 환기구 목록 조회
function selectSwlVentPsList(page) {
	console.log('selectSwlVentPsList(page)');
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	// 검색 조건
	var options;
	
	if ($(".groundwaterProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		const filters = [];
		
		var hjdCde = $("#lSrchOptions select[name=hjd_cde] option:selected").val();	// 읍면동
		var mopCde = $("#lSrchOptions select[name=mop_cde] option:selected").val();	// 관재질
		var mofCde = $("#lSrchOptions select[name=mof_cde] option:selected").val();	// 흡출기형식
		var hmpCde = $("#lSrchOptions select[name=hmp_cde] option:selected").val();	// 흡출기재질
		
		if (hjdCde) {
			filters.push("hjd_cde" + " = " + hjdCde);
		}
		if (mopCde) {
			filters.push("mop_cde" + " = " + mopCde);
		}
		if (mofCde) {
			filters.push("mof_cde" + " = " + mofCde);
		}
		if (hmpCde) {
			filters.push("hmp_cde" + " = " + hmpCde);
		}
		
		options = {
			typeNames	: "swl_vent_ps" + "",
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
			typeNames	: 'swl_vent_ps' + "",
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
			// 읍면동 코드 처리
			var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	// 관재질 코드 처리
        	var mop_cde = data.features[i].properties.mop_cde;
        	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
        	// 흡출기형식 코드 처리
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-012", mof_cde);
        	// 흡출기재질 코드 처리
        	var hmp_cde = data.features[i].properties.hmp_cde;
        	data.features[i].properties.hmp_cde_nm = getCmmCodeDataArray("OGC-172", hmp_cde);
			
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
            let ftr_idn = properties.ftr_idn;
            
            return {
                marker: {
                    src: '/images/poi/swlVentPs_poi.png'
                },
                label: {
                    text: ''
                }
            }
        });
        dtmap.vector.fit();
	});
}

// 환기구 상세정보 조회
function selectSwlVentPs(id) {
	console.log('selectSwlVentPs(id)');
	console.log('id >>> ' + id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	
	const typeName	= idArray[0];
	if(typeName != "swl_vent_ps"){
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
        typeNames	: 'swl_vent_ps' + "",
        filter 		: filters,
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
    	//console.log(data);
    	
    	if(data.features.length != 1){
    		alert("상세보기 오류")
    		return false;
    	}
    	
    	// 읍면동 코드 처리
		var hjd_cde = data.features[0].properties.hjd_cde;
    	data.features[0].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
    	// 관재질 코드 처리
    	var mop_cde = data.features[0].properties.mop_cde;
    	data.features[0].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
    	// 흡출기형식 코드 처리
    	var mof_cde = data.features[0].properties.mof_cde;
    	data.features[0].properties.mof_cde_nm = getCmmCodeDataArray("OGC-012", mof_cde);
    	// 흡출기재질 코드 처리
    	var hmp_cde = data.features[0].properties.hmp_cde;
    	data.features[0].properties.hmp_cde_nm = getCmmCodeDataArray("OGC-172", hmp_cde);
    	// 지형지물부호 코드 처리
    	var ftr_cde = data.features[0].properties.ftr_cde;
    	data.features[0].properties.ftr_cde_nm = getCmmCodeDataArray("SA-001", ftr_cde);
    	// 관리기관 코드 처리
    	var mng_cde = data.features[0].properties.mng_cde;
    	data.features[0].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
		
    	// 좌표 처리
		data.features[0].properties.geomObj = data.features[0].geometry;
		
		var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectSwlVentPsDetail(detailData);	//상세 페이지에 데이터 전달
    });
}

// 환기구 상세보기 페이지 호출
function selectSwlVentPsDetail(detailData) {
	console.log('selectSwlVentPsDetail(detailData)');
	console.log('data >>> ' + detailData);
	
	if(!detailData && detailData == null){
		alert("환기구 상세보기 오류");
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
		url:"/job/fcmr/ssfc/selectSwlVentPsDetail.do",
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

// 환기구 등록 페이지 호출
function insertSwlVentPsView(){
	//console.log("insertSwlVentPsView()");
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/ssfc/insertSwlVentPsView.do", function () {
        toastr.success("/job/fcmr/ssfc/insertSwlVentPsView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
       
        getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	//읍면동	
        getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-003", "#rightSubPopup select[name=mop_cde]");	//관재질 코드
        getCmmCodeData("OGC-012", "#rightSubPopup select[name=mof_cde]");	//흡출기형식 코드
        getCmmCodeData("OGC-172", "#rightSubPopup select[name=hmp_cde]");	//흡출기재질 코드
        
		ui.loadingBar("hide");
    });
}

// 환기구 등록
function insertSwlVentPs(){
	console.log("insertSwlVentPs()");
}

// 환기구 수정 페이지 호출
function updateSwlVentPsView(id) {
	//console.log("insertSwlVentPsView()");
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if (!detailData && detailData == null) {
		alert("환기구 상세정보 오류");
		return false;
	}
	
	//파라미터 처리
    var formData = new FormData();
	
	for (var key in detailData) {
		if (detailData[key]) {	//null 값이나 빈칸은 제외, 여기서 id 값 까지 포함되서 파라미터 완성
			formData.append(key, detailData[key]);
			console.log(detailData[key])
		}
	}
	
	ui.loadingBar("show");
	
    $.ajax({
		url:"/job/fcmr/ssfc/updateSwlVentPsView.do",
		type: "POST",
		data: formData,
		dataType: 'html',
		contentType: false,
        processData: false,
		success: function(result) {
			//console.log(result);
			
			$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
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

// 환기구 수정
function updateSwlVentPs() {
	console.log("updateSwlVentPs()");
}

// 환기구 삭제
function deleteSwlVentPs(id) {
	console.log("deleteSwlVentPs()");
}

function closeSwlVentPsPopup() {
	dtmap.draw.dispose();			// 마우스에 파란점 제거
	dtmap.draw.clear();				// 지도에 파란점 제거
	dtmap.vector.clearSelect();		// 선택 해제
	
	ui.closeSubPopup();				// 팝업 닫기
}