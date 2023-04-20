/**
 * 업무 > 시설관리 > 교량
 */

/**
 * 교량 목록 불러오기
 * @returns
 */
function selectBridgeListView() {
    $('#bottomPopup').load('/job/fcmr/tpfc/selectBridgeListView.do', function () {
	callBridgeGrid();
	
	// 공간검색 옵션 초기화
	FACILITY.spaceSearchOption = {};
    });
    
}

/**
 * 테이블 불러오기
 * @returns
 */
function callBridgeGrid() {
    setBridgeListGrid();
    setBridgeListData(0);
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
		onChange: function () {
		    setBridgeListData(this.page.selectPage);
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
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setBridgeListData(_pageNo) {
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
	
	if (type === 'extent') {
    		options.bbox 		= FACILITY.spaceSearchOption.bbox;
	} else {
    		options.geometry 	= FACILITY.spaceSearchOption.geometry;
	}
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
		setBridgeListData(0);
	    }
	});
    $('.brdge .search').on('click', function() {
	setBridgeListData(0);
    });
};

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