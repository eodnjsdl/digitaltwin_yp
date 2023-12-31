/**
 * - 업무 / 시설관리 / 교통시설
 * 
 * @returns
 */

/**
 * 도로구간 목록 불러오기
 * @returns
 */
function selectRoadSectListView() {
	// 팝업 닫기
	ui.closeSubPopup();
	
	$('#bottomPopup').load('/job/fcmr/tpfc/selectRoadSectListView.do', function () {
		// 공간검색 옵션 초기화
		FACILITY.spaceSearchOption = {};
		// 읍면동 geom정보 초기화
		var geom = {};
		// excel 옵션
		var excelOptions;
		// 그리드시작
		callRoadSectGrid();
	});
	
}

/**
 * 테이블 불러오기
 * @returns
 */
function callRoadSectGrid() {
	setRoadSectListGrid();
	getWfsRoadSectListData();
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setRoadSectListGrid() {
	FACILITY.Ax5UiGrid = null;	// ax5uigrid 전역 변수 
	FACILITY.Ax5UiGrid = new ax5.ui.grid();
	FACILITY.Ax5UiGrid.setConfig({
		target: $('[data-ax5grid="roadSectListGrid"]'),
		showLineNumber: true,
		sortable: true,
		multiSort: true,
		header: {
			align: "center"
		},
		body: {
			align: "center",
			onClick: function() {
				selectRoadSectDetailView(this.item);
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
				setRoadSectListData(this.page.selectPage, geom);
			}
		},
		columns: [
			{key: "sig_cd",			label: "시군구",				width: "*"},
			{key: "rds_man_no",		label: "도로구간일련번호",		width: "*"},
			{key: "rn",				label: "도로명(한글)",			width: "*"},
			{key: "eng_rn",			label: "도로명(영문)",			width: "*"},
			{key: "ntfc_de",		label: "고시일자",				width: "*"},
			{key: "wdr_rd_cd",		label: "광역도로구분",			width: "*"},
			{key: "rbp_cn",			label: "기점",				width: "*"},
			{key: "rep_cn",			label: "종점",				width: "*"},
			{key: "road_bt",		label: "도로폭",				width: "*"},
			{key: "road_lt",		label: "도로길이",				width: "*"}
			]
	});
}

/**
 * grid 테이블 데이터 설정 전
 * wfs로 읍면동 데이터 가져오기 ---- ** 중요
 * @returns
 */
function getWfsRoadSectListData() {
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
			return setRoadSectListData(0, geom);
		}
	});
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo, geom
 * @returns
 */
function setRoadSectListData(_pageNo, geom) {
	// 팝업 닫기
	ui.closeSubPopup();
	
	//grid 선택창 초기화
	FACILITY.Ax5UiGrid.focus(-1);
	
	dtmap.on('select', onSelectRoadSectEventListener);
	
	// wfs 옵션값 담을 변수
	var options;
	
	// 검색 조건 - cql filter
	// 속성 검색 활성화 시 옵션, 필터
	if ($('.roadSectProperty').hasClass('on')) {
		let filters = 'sig_cd = 41830 and wdr_rd_cd = 3';
		
		let roadBtVal = $("input[name=roadBtVal]").val();			// 도로폭
		let rn = $("input[name=rn]").val();					// 도로명
		if (roadBtVal != '') {
			filters += ' and road_bt = ' + roadBtVal;
		}; 
		if (rn != '') {
			rn = "'%" + rn + "%'";
			filters += ' and rn like ' + rn;
		};
		
		options = {
				typeNames: 'tgd_sprd_manage',
				perPage: 10,
				page: _pageNo + 1,
				sortBy : 'gid',
				sortOrder : 'DESC',
				cql : filters
		}
		
		excelOptions = {
				typeNames: 'tgd_sprd_manage',
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
			} else {
				toastr.error("해당 지역에 검색 결과가 없습니다. 전체 결과를 표시합니다.", "읍면동 조회");
			}
		}
		// 해당 읍면동 코드를 찾아 geometry 값 설정
		function findEmdCd(geom, emdCd) {
			if (geom == null) {
				return;
			}
			for (let i = 0; i < geom.length; i++) {
				if (geom[i].emdCd == emdCd) {
					return geom[i].geometry;
				} 
			}
		}
		// else if 공간 검색 활성화
	} else if ($('.roadSectSpace').hasClass('on')) {
		const $parent = $(".facility-spatial-search").closest('.search-area');
		const type = $parent.find('input[name="rad-facility-area"]:checked').val();
		
		options = {
				typeNames: 'tgd_sprd_manage',
				perPage: 10,
				page: _pageNo + 1,
				sortBy : 'gid',
				sortOrder : 'DESC',
		}
		
		// 엑셀 다운로드를 위한 옵션
		excelOptions = {
				typeNames: 'tgd_sprd_manage',
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
/////////////////////////////////////////////////////////////////////////////////////////
	// 그리드 데이터
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		$('.bbs-list-num strong').empty();
		if (data.totalFeatures > 0) {
			let totalCnt = dataCountFormat(data.totalFeatures);
			$("#bottomPopup .bbs-list-num strong").text(totalCnt);
		} else {
			$("#bottomPopup .bbs-list-num strong").text('0');
			toastr.error("검색 결과가 없습니다.");
		}
		
		var list = [];
		for (let i = 0; i < data.features.length; i++) {
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
				// marker: {
				//     	src: '/images/poi/roadSection_poi.png',
				//     	anchor: [0, 0], //이미지 중심위치 (0~1 [x,y] 비율값 [0,0] 좌상단 [1,1] 우하단)
				//     },
				label: {
					text: properties.rn,
					//3D POI 수직 막대길이
					offsetHeight : 10
				},
			}
		});
		dtmap.vector.fit();
	});
}
/**
 * 테이블 데이터 상세보기
 * @param item
 * @returns
 */
function selectRoadSectDetailView(item) {
	let gid = item.gid;
	let rdsManNo = item.rds_man_no;
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
		url : '/job/fcmr/tpfc/selectRoadSectDtlInfo.do',
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
				
				dtmap.vector.select('tgd_sprd_manage.' + gid);
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
function selectRoadSectWithFilters() {
	$('#roadBtVal, #rn').on('keyup', function () {
		if (event.keyCode == 13) {
			setRoadSectListData(0, geom);
		}
	});
	$('.roadSect .search').on('click', function() {
		setRoadSectListData(0, geom);
	});
}

/**
 * 엑셀 다운로드
 * @returns
 */
function downloadExcelRoadSect() {
	ui.loadingBar("show");
	// 엑셀 다운로드를 위한 grid 생성
	var excelGrid = new ax5.ui.grid();
	excelGrid.setConfig({
		target: $('[data-ax5grid="attr-grid-excel"]'),
		columns: [
			{key: "sig_cd",			label: "시군구",			},
			{key: "rds_man_no",		label: "도로구간일련번호",	},
			{key: "rn",				label: "도로명(한글)",		},
			{key: "eng_rn",			label: "도로명(영문)",		},
			{key: "ntfc_de",		label: "고시일자",			},
			{key: "wdr_rd_cd",		label: "광역도로구분",		},
			{key: "rbp_cn",			label: "기점",			},
			{key: "rep_cn",			label: "종점",			},
			{key: "road_bt",		label: "도로폭",			},
			{key: "road_lt",		label: "도로길이",			}
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
		excelGrid.exportExcel("EXPORT_도로구간.xls");
		$('[data-ax5grid="attr-grid-excel"]').empty();
		ui.loadingBar("hide");
	}); 
}

/**
 * 객체 선택 시 상세보기
 * @param e
 * @returns
 */
function onSelectRoadSectEventListener(e) {
	let item = e.property;
	if (item) {
		selectRoadSectDetailView(item);
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