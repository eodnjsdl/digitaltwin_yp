/**
 * 업무 > 시설관리 > 지하철 역사
 */

/**
 * 지하철 역사 목록 불러오기
 * @returns
 */
function selectSubwayStationListView() {
	// 팝업 닫기
	ui.closeSubPopup();
	
	$('#bottomPopup').load('/job/fcmr/tpfc/selectSubwayStationListView.do', function () {
		// 공간검색 옵션 초기화
		FACILITY.spaceSearchOption = {};
		// 읍면동 geom정보 초기화
		var geom = {};
		// excel 옵션
		var excelOptions;
		// 그리드시작
		callSubwayStationGrid();
	});
	
}

/**
 * 테이블 불러오기
 * @returns
 */
function callSubwayStationGrid() {
	setSubwayStationListGrid();
	getWfsSubwayStationListData();
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setSubwayStationListGrid() {
	FACILITY.Ax5UiGrid = null;	// ax5uigrid 전역 변수 
	FACILITY.Ax5UiGrid = new ax5.ui.grid();
	FACILITY.Ax5UiGrid.setConfig({
		target: $('[data-ax5grid="subwayStationListGrid"]'),
		showLineNumber: true,
		sortable: true,
		multiSort: true,
		header: {
			align: "center"
		},
		body: {
			align: "center",
			onClick: function() {
				selectSubwayStationDetailView(this.item.gid);
			}
		},
		page: {
			navigationItemCount: 9,
			display: true,
			firstIcon: '««',
			prevIcon: '«',
			nextIcon: '»',
			lastIcon: '»»',
			onChange: function () {
				setSubwayStationListData(this.page.selectPage, geom);
			}
		},
		columns: [
			{key: "sig_cd",			label: "시군구코드",			width: "*"},
			{key: "kor_sub_nm",		label: "지하철역사명(한글)",		width: "*"},
			{key: "opert_de",		label: "작업일시",				width: "*"},
			{key: "sub_sta_sn",		label: "지하철역사 일련번호",		width: "*"}
			],
	});
}

/**
 * grid 테이블 데이터 설정 전
 * wfs로 읍면동 데이터 가져오기 ---- ** 중요
 * @returns
 */
function getWfsSubwayStationListData() {
	// 현재 함수로 검색해야함 -> setRoadSectListData(0); ===> getWfsRoadSectListData();로 변경 
	
	// 읍면동 geometry 가져오기 *********
	let emdCd = '';
	let emdCdVal = $('#emdKorNm').val();
	let cqlFilters = 'emd_cd = ' + emdCd;
	
	// val() 값이 41830 일 때 => 양평군 일때, like 검색
	if (emdCdVal == '41830') {
		cqlFilters = "emd_cd like '" + emdCdVal + "%'";
	} else { // val() 값이 41830+++ 일때 읍면동 일치 검색
		emdCd = emdCdVal;
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
			// geoArry[i].values_.emd_cd => 읍면동 코드. 
			for (let i = 0; i < geoArry.length; i++) {
				const info = {emdCd : geoArry[i].values_.emd_cd, geometry : geoArry[i].values_.geometry};
				geoInfo.push(info);
			}
			geom = geoInfo;
			// return 으로 grid 세팅하는 함수에 geom 넘겨주기.
			return setSubwayStationListData(0, geom);
		}
	});
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setSubwayStationListData(_pageNo, geom) {
	// 팝업 닫기
	ui.closeSubPopup();
	
	//grid 선택창 초기화
	FACILITY.Ax5UiGrid.focus(-1);
	
	dtmap.on('select', onSelectSubwayStationEventListener);
	
	// wfs 옵션값 담을 변수
	var options;
	
	// 검색기능
	if ($('.subwayStationProperty').hasClass('on')) {
		let filters = 'sig_cd = 41830';
		let korSubNm = $('#korSubNm').val();
		if (korSubNm != '') {
			korSubNm = "'%" + korSubNm + "%'";
			filters += ' and kor_sub_nm like ' + korSubNm;
		}
		options = {
				typeNames: 'tgd_spsb_statn',
				page: _pageNo + 1,
				perPage: 10,
				sortBy : 'gid',
				sortOrder : 'DESC',
				cql : filters
		}
		
		excelOptions = {
				typeNames: 'tgd_spsb_statn',
				sortBy : 'gid',
				sortOrder : 'DESC',
				cql : filters
		}
		
		let emdCd = $('#emdKorNm').val();
		if (emdCd != '41830') {
			let geo = findEmdCd(geom, emdCd); 
			if (geo != null) {
				options.geometry = geo;
				excelOptions.geometry = geo;
			}
		}
		// 해당 읍면동 코드를 찾아 geometry 값 설정
		function findEmdCd(geom, emdCd) {
			for (let i = 0; i < geom.length; i++) {
				if (geom[i].emdCd == emdCd) {
					return geom[i].geometry;
				} 
			}
		}
		// else if 공간 검색 활성화
	} else if ($('.subwayStationSpace').hasClass('on')) {
		const $parent = $(".facility-spatial-search").closest('.search-area');
		const type = $parent.find('input[name="rad-facility-area"]:checked').val();
		
		options = {
				typeNames: 'tgd_spsb_statn',
				page: _pageNo + 1,
				perPage: 10,
				sortBy : 'gid',
				sortOrder : 'DESC'
		}
		
		// 엑셀 다운로드를 위한 옵션
		excelOptions = {
				typeNames: 'tgd_spsb_statn',
				sortBy : 'gid',
				sortOrder : 'DESC',
		}
		
		if (type === 'extent') {
			options.bbox 		= FACILITY.spaceSearchOption.bbox;
			excelOptions.bbox 	= FACILITY.spaceSearchOption.bbox;
		} else {
			options.geometry 	= FACILITY.spaceSearchOption.geometry;
			excelOptions.geometry 	= FACILITY.spaceSearchOption.geometry;
		}
		dtmap.draw.dispose();	
	} else {
		toastr.error("검색 오류");
	}
	
	
	// 철도역사 - wms -> sortBy, orderBy, clq(sig_cd = 41830 -- 양평군) 필수
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		$('.bbs-list-num strong').empty();
		if (data.totalFeatures > 0) {
			$("#bottomPopup .bbs-list-num strong").text(data.totalFeatures);
		} else {
			$("#bottomPopup .bbs-list-num strong").text('0');
			toastr.error("검색 결과가 없습니다.");
		}
		
		var list = [];
		for (let i = 0; i < data.features.length; i++) {
			// properties에 id 값이 랜덤으로 생성되서, gid와 동일하게 변경해줌
			// wfs. + gid
			let wfsId = data.features[i].id.split('.')[0] + '.';
			data.features[i].id = wfsId + data.features[i].properties.gid;
			const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		FACILITY.Ax5UiGrid.setData({
			list: list,
			page: {
				currentPage: _pageNo || 0,
				pageSize: 10,
				totalElements: data.totalFeatures,
				totalPages: Math.ceil(data.totalFeatures / 10)
			}
		});
		
		dtmap.vector.clear();
		dtmap.vector.readGeoJson(data, function (feature) {
			let properties = feature.getProperties();
			return {
				marker: {
					src: '/images/poi/subwayStation_poi.png',
					anchor: [0, 0] //이미지 중심위치 (0~1 [x,y] 비율값 [0,0] 좌상단 [1,1] 우하단)
				},
				label: {
					text: properties.kor_sub_nm,
					//3D POI 수직 막대길이
					offsetHeight : 10
				}
			}
		});
		dtmap.vector.fit();
	});
}

/**
 * 테이블 데이터 상세보기
 * @param gid
 * @returns
 */
function selectSubwayStationDetailView(gid) {
	dtmap.vector.clearSelect();
	
	ui.openPopup("rightSubPopup");
	ui.loadingBar("show");
	var formData = new FormData();
	
	if (gid != '') {
		formData.append('gid', gid);
	}
	
	$.ajax({
		data : formData,
		type : "POST",
		url : '/job/fcmr/tpfc/selectSubwayStationInfo.do',
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(data, status) {
			if (status == "success") {		
				$("#rightSubPopup").append(data);
				
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
				
				dtmap.vector.select('tgd_spsb_statn.' + gid);
			} else { 
				toastr.error("ERROR!");
				return;
			} 
		}
	});
	ui.loadingBar("hide");
}

/**
 * 검색 조건으로 조회
 * @returns
 */
function selectSubwayStationWithFilters() {
	$('#korSubNm').on('keyup', function () {
		if (event.keyCode == 13) {
			setSubwayStationListData(0, geom);
		}
	});
	$('.sbwaySt .search').on('click', function() {
		setSubwayStationListData(0, geom);
	});
};

/**
 * 엑셀 다운로드
 * @returns
 */
function downloadExcelSubwayStation() {
	ui.loadingBar("show");
	// 엑셀 다운로드를 위한 grid 생성
	var excelGrid = new ax5.ui.grid();
	excelGrid.setConfig({
		target: $('[data-ax5grid="attr-grid-excel"]'),
		columns: [
			{key: "sig_cd",			label: "시군구코드",		},
			{key: "kor_sub_nm",		label: "지하철역사명(한글)",	},
			{key: "opert_de",		label: "작업일시",			},
			{key: "sub_sta_sn",		label: "지하철역사 일련번호",	}
			]
	});
	
	// 엑셀 그리드 데이터 추가
	const excelPromise = dtmap.wfsGetFeature(excelOptions);
	excelPromise.then(function(data) {
		var list = [];
		for (let i = 0; i < data.features.length; i++) {
			const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		excelGrid.setData(list);
		excelGrid.exportExcel("EXPORT_지하철역사.xls");
		$('[data-ax5grid="attr-grid-excel"]').empty();
		ui.loadingBar("hide");
	}); 
}

/**
 * 객체 선택 시 상세보기
 * @param e
 * @returns
 */
function onSelectSubwayStationEventListener(e) {
	let id = e.id;
	if (id) {
		id = id.split('.')[1];
		selectSubwayStationDetailView(id);
	} else {
		toastr.error("객체 선택 오류입니다.");
		return false;
	}
}

/**
 * 팝업 종료 시, vector 제거
 * @returns
 */
function closeView() {
//    if ($('#rightSubPopup').hasClass('opened')) {
//	dtmap.vector.clearSelect();
//	ui.closeSubPopup();
//    } else {
//	dtmap.vector.clear();
//    }
	// 지도 clear
	clearMap();
	
	// 등록, 상세, 수정 팝업 창 닫기
	if ($("#rightSubPopup").hasClass("opened")) {
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
}