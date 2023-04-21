/**
 * 업무 > 시설관리 > 교량
 */

/**
 * 교량 목록 불러오기
 * @returns
 */
function selectBridgeListView() {
    $('#bottomPopup').load('/job/fcmr/tpfc/selectBridgeListView.do', function () {
	// 공간검색 옵션 초기화
	FACILITY.spaceSearchOption = {};
	// 읍면동 geom정보 초기화
	var geom = {};
	// excel 옵션
	var excelOptions;
	// 그리드시작
	callBridgeGrid();
    });
    
}

/**
 * 테이블 불러오기
 * @returns
 */
function callBridgeGrid() {
    setBridgeListGrid();
    getWfsBridgeListData();
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setBridgeListGrid() {
    this.target = new ax5.ui.grid();
    this.target.setConfig({
	target: $('[data-ax5grid="bridgeListGrid"]'),
	showLineNumber: true,
	sortable: true,
	multiSort: true,
	header: {
		align: "center"
	},
	body: {
		align: "center",
		onClick: function() {
			selectBridgeDetailView(this.item.gid);
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
		    setBridgeListData(this.page.selectPage, geom);
		}
	},
	columns: [
	    {key: "sig_cd",		label: "시군구코드",		width: 250},
	    {key: "kor_bri_nm",		label: "교량명(한글)",		width: 250},
	    {key: "opert_de",		label: "작업일시",			width: 250},
	    {key: "bridge_sn",		label: "교량 일련번호",		width: 250}
	],
    });
}

/**
 * grid 테이블 데이터 설정 전
 * wfs로 읍면동 데이터 가져오기 ---- ** 중요
 * @returns
 */
function getWfsBridgeListData() {
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
    	    return setBridgeListData(0, geom);
    	}
    });
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo, geom
 * @returns
 */
function setBridgeListData(_pageNo, geom) {
    var gridList = this;
    
    // wfs 옵션값 담을 변수
    var options;
    if ($('.bridgeProperty').hasClass('on')) {
	// 검색 필터
	let filters = 'sig_cd = 41830';
	let korBriNm = $('#korBriNm').val();
	if (korBriNm != '') {
	    korBriNm = "'%" + korBriNm + "%'";
	    filters += ' and kor_bri_nm like ' + korBriNm;
	}
	
	options = {
		typeNames: 'tgd_spot_bridge',
		perPage: 10,
		page: _pageNo + 1,
		sortBy : 'gid',
		sortOrder : 'DESC',
		cql : filters
	}
	
	excelOptions = {
		typeNames: 'tgd_spot_bridge',
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
    } else if ($('.bridgeSpace').hasClass('on')) {
	const $parent = $(".facility-spatial-search").closest('.search-area');
        const type = $parent.find('input[name="rad-facility-area"]:checked').val();
	
	options = {
		typeNames: 'tgd_spot_bridge',
		perPage: 10,
		page: _pageNo + 1,
		sortBy : 'gid',
		sortOrder : 'DESC',
	}
	
	// 엑셀 다운로드를 위한 옵션
	excelOptions = {
		typeNames: 'tgd_spot_bridge',
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
	    const {id, properties} = data.features[i];
	    list.push({...properties, ...{id: id}});
	}

	gridList.target.setData({
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
		// properties에 id 값이 랜덤으로 생성되서, gid와 동일하게 변경해줌
		// wfs. + gid
		let getGid = properties.gid;
		feature.setId('tgd_spot_bridge.' + getGid);					
		// --------------------------------------------------
		return {
			marker: {
				src: '/images/poi/bridge_poi.png' 
				},
				label: {
					text: properties.kor_bri_nm
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
function selectBridgeDetailView(gid) {
    dtmap.vector.clearSelect();
    dtmap.vector.select('tgd_spot_bridge.' + gid);
    
    ui.openPopup("rightSubPopup");
    ui.loadingBar("show");
    var formData = new FormData();
	
    if (gid != '') {
	formData.append('gid', gid);
    }
	
    $.ajax({
	data : formData,
	type : "POST",
	url : '/job/fcmr/tpfc/selectBridgeInfo.do',
	dataType : "html",
	processData : false,
	contentType : false,
	async: false,
	success : function(data, status) {
	    if (status == "success") {		
		$("#rightSubPopup").append(data);
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
function selectBridgeWithFilters() {
    $('#korBriNm').on('keyup', function () {
	    if (event.keyCode == 13) {
		setBridgeListData(0, geom);
	    }
	});
    $('.brdge .search').on('click', function() {
	setBridgeListData(0, geom);
    });
}

/**
 * 엑셀 다운로드
 * @returns
 */
function downloadExcelBridge() {
    ui.loadingBar("show");
    // 엑셀 다운로드를 위한 grid 생성
    var excelGrid = new ax5.ui.grid();
	excelGrid.setConfig({
	target: $('[data-ax5grid="attr-grid-excel"]'),
	columns: [
	    {key: "sig_cd",		label: "시군구코드",		},
	    {key: "kor_bri_nm",		label: "교량명(한글)",		},
	    {key: "opert_de",		label: "작업일시",			},
	    {key: "bridge_sn",		label: "교량 일련번호",		}
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
	excelGrid.exportExcel("EXPORT_교량.xls");
	$('[data-ax5grid="attr-grid-excel"]').empty();
	ui.loadingBar("hide");
    }); 
}

/**
 * 객체 선택 시 상세보기
 * @param e
 * @returns
 */
function onSelectBridgeEventListener(e) {
    let id = e.id;
    if (id) {
	id = id.split('.')[1];
	selectBridgeDetailView(id);
    } else {
	toastr.error("객체 선택 오류입니다.");
	return false;
    }
}