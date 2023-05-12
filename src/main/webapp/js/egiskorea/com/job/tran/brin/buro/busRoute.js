/**
 * - 업무 / 교통분석 / 버스노선정보 / 버스노선
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("busRoute.js");
	//console.log("버스노선");
	
	var geom = {};
});

// wfs로 읍면동 데이터 가져오기(grid 테이블 데이터 설정 전)
function getBusRouteEmdData() {
	//console.log('getBusRouteEmdData()');
	
	// 읍면동 geometry 가져오기
    let emdCdVal = $("#lSrchOptions select[name=emdKorNm] option:selected").val();
	if (emdCdVal == '41830') {
		// 양평군일때 전체 검색
		cqlFilters = "emd_cd like '" + emdCdVal + "%'";
	} else {
		// 해당 읍면동 검색
		cqlFilters = 'emd_cd = ' + emdCdVal;
	}
	
	geomOptions = {
		typeNames: 'tgd_scco_emd',
		sortBy : 'gid',
		sortOrder : 'DESC',
		cql : cqlFilters
	}
	
	// 전체(읍면동) geometry 값 가져오는 wfs 
	const promiseGeo = dtmap.wfsGetFeature(geomOptions);
	promiseGeo.then(function(data) {
		var geoArry = dtmap.util.readGeoJson(data);
		setEmdCd(geoArry);
		
		function setEmdCd(geoArry) {
			let geoInfo = [];
			let optionText = '';
			
			// geoArry[i].values_.emd_cd => 읍면동 코드. 
			for (let i = 0; i < geoArry.length; i++) {
				const info = {emdCd : geoArry[i].values_.emd_cd, geometry : geoArry[i].values_.geometry};
				geoInfo.push(info);
				
				optionText += '<option value="' + geoArry[i].values_.emd_cd + '">' + geoArry[i].values_.emd_kor_nm + '</option>';
			}
			geom = geoInfo;
			
			// 읍면동  selectbox option
			$("#lSrchOptions select[name=emdKorNm]").append(optionText);
			
			return selectBusRouteList(1, geom);
    	}
    });
}

// 버스 노선 리스트 호출
function getBusRouteList() {
	//console.log("getBusRouteList()");
	
	// grid 기본 세팅
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]');
	$target.css('height', 'inherit');
	
	getCmmCodeData('ROUTETY', '#lSrchOptions select[name=route_ty]');		// 노선 유형
	
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
			{key: "route_id",			label: "노선 아이디",		width: '*'},
			{key: "route_nm", 			label: "노선 번호",			width: '*'},
			{key: "route_ty",			label: "노선 유형",			width: '*'},
			{key: "route_ty_nm",		label: "노선 유형명",		width: '*'},
			{key: "cdpnt_sttn_nm",		label: "기점정류소",		width: '*'},
			{key: "cdpnt_sttn_no",		label: "기점정류소 번호",		width: '*'},
			{key: "tmnl_sttn_nm",		label: "종점정류소",		width: '*'},
			{key: "tmnl_sttn_no",		label: "종점정류소 번호",		width: '*'}
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
            	selectBusRouteList(this.page.selectPage + 1, geom);	// 페이지 이동
            	$('.hiddenPage').val(this.page.selectPage + 1);
            }
		},
		body: {
			align: "center",
			onClick: function() {
				//this.self.select(this.dindex);
				//console.log(this.item.id);
				selectBusRoute(this.item.id);	// 상세보기
			}
		}
	});
}

// 버스 노선 목록 조회
function selectBusRouteList(page, geom) {
	//console.log('selectBusRouteList(page, geom)');
	
	// 팝업 닫기
	ui.closeSubPopup();
	
	//grid 선택창 초기화
	FACILITY.Ax5UiGrid.focus(-1);
	
	// 검색 조건
	var options;
	
	if ($(".busRouteInfoProperty").hasClass("on")) {
		//console.log("속성 검색 조건");
		
		// 속성 검색
		var filters = [];
		
		var route_ty = $("#lSrchOptions select[name=route_ty] option:selected").val();	// 노선유형
		if (route_ty) {
			filters.push("route_ty" + " = " + route_ty);
		}
		var route_id = $("input[name=route_id]").val();		// 노선아이디
		if (route_id) {
			filters.push("route_id" + " like " + route_id);
		}
		var route_nm = $("input[name=route_nm]").val();		// 노선번호
		if (route_nm) {
			filters.push("route_nm" + " like " + route_nm);
		}
		
		options = {
			typeNames	: "tgd_bus_route_info" + "",
			perPage		: 10,
			page		: page,
			filter		: filters,
			sortBy		: 'route_id',
			sortOrder	: 'DESC'
		};
		
		var emdCd = $("#lSrchOptions select[name=emdKorNm] option:selected").val();	// 읍면동
		if (emdCd != '41830') {
			let geo = findEmdCd(geom, emdCd);
		    if (geo != null) {
		    	options.geometry = geo;
		    }
		}
		
		function findEmdCd(geom, emdCd) {
		    for (let i = 0; i < geom.length; i++) {
		    	if (geom[i].emdCd == emdCd) {
		    		return geom[i].geometry;
		    	} 
		    }
		}
	} else if ($(".busRouteInfoSpace").hasClass("on")) {
		//console.log("공간 검색 조건");
		
		const $parent 	= $(".info-spatial-search").closest('.search-area');
		const type 		= $parent.find('input[name="rad-info-area"]:checked').val();

		options = {
				typeNames	: "tgd_bus_route_info" + "",
				perPage		: 10,
				page		: page,
				sortBy		: 'route_id',
				sortOrder	: 'DESC'
		};
		
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
			let route_ty = properties['route_ty'];
			let route_nm_color;
			// 색상 확인 필요
			if (route_ty == 11) {				// 직행좌석형시내버스
				route_nm_color = '#e60012';
			} else if (route_ty == 12) {		// 좌석형시내버스
				route_nm_color = '#0068b7';
			} else if (route_ty == 13) {		// 일반형시내버스
				route_nm_color = '#33CC99';
			} else if (route_ty == 14) {		// 광역급행형시내버스
				route_nm_color = '#006896';
			} else if (route_ty == 15) {		// 따복형시내버스
				route_nm_color = '#bb2266';
			} else if (route_ty == 16) {		// 경기순환버스
				route_nm_color = '#e60012';
			} else if (route_ty == 21) {		// 직행좌석형농어촌버스
				route_nm_color = '';
			} else if (route_ty == 22) {		// 좌석형농어촌버스
				route_nm_color = '';
			} else if (route_ty == 23) {		// 일반형농어촌버스
				route_nm_color = '';
			} else if (route_ty == 30) {		// 마을버스
				route_nm_color = '#ffc600';
			} else if (route_ty == 41) {		// 고속형시외버스
				route_nm_color = '#a800ff';
			} else if (route_ty == 42) {		// 좌석형시외버스
				route_nm_color = '#a800ff';
			} else if (route_ty == 43) {		// 일반형시외버스
				route_nm_color = '#a800ff';
			} else if (route_ty == 51) {		// 리무진공항버스
				route_nm_color = '#00a0e9';
			} else if (route_ty == 52) {		// 좌석형공항버스
				route_nm_color = '#00a0e9';
			} else if (route_ty == 53) {		// 일반형공항버스
				route_nm_color = '#00a0e9';
			} else {
				route_nm_color = '#ffffff';
			}

			return {
				stroke: {
					color: route_nm_color,
					width: 4
				},
				radius: 10,
				label: {
					column: 'route_nm',
				}
			}
        });
        dtmap.vector.fit();
	});
}

// 버스 노선 상세보기 조회
function selectBusRoute(id) {
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	
	const typeName	= idArray[0];
	if(typeName != "tgd_bus_route_info"){
		alert("상세보기 오류");
		return false;
	}
	
	const gid = idArray[1];
	if (gid) {
		filters.push("route_id" + " = " + gid); 
	} else {
		alert("상세보기 오류");
		return false;
	}
	
    var options;
    options = {
        typeNames	: 'tgd_bus_route_info' + "",
        filter 		: filters,
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
    	//console.log(data);
    	
    	if(data.features.length != 1){
    		alert("상세보기 오류")
    		return false;
    	}
    	
		var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectBusRouteDetail(detailData);	//상세 페이지에 데이터 전달
    });
}

// 버스 노선 상세보기 페이지 호출
function selectBusRouteDetail(detailData) {
	//console.log('selectBusRouteDetail(detailData)');
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("버스 노선 상세보기 오류");
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
		url:"/job/tran/brin/selectBusRoute.do",
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
			var route_id = detailData.route_id;
			var gridList = FACILITY.Ax5UiGrid.list;
			for (var i = 0; i < gridList.length; i++) {
				//console.log(gridList[i]);
				var grid = gridList[i];
				if (route_id == grid.route_id) {
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

// 속성 검색 조회 버튼
function searchBusRouteFilters() {
	$("input[name=routeId], input[name=routeNo]").on('keyup', function () {
		if (event.keyCode == 13) {
			selectBusRouteList(1, geom);
		}
	});
	
	$('.info-attribute-search').on('click', function() {
		selectBusRouteList(1, geom);
	});
}