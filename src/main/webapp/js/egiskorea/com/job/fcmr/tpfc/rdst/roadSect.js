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
    $('#bottomPopup').load('/job/fcmr/tpfc/selectRoadSectListView.do', function () {
	callRoadSectGrid();
	selectRoadSectionExcelListDownload();
    });
    
}

/**
 * 테이블 불러오기
 * @returns
 */
function callRoadSectGrid() {
    setRoadSectListGrid();
    setRoadSectListData(0);
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setRoadSectListGrid() {
    this.target = new ax5.ui.grid();
    this.target.setConfig({
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
		    selectRoadSectDetailView(this.item.gid);
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
		    setRoadSectListData(this.page.selectPage);
		}
	},
	columns: [
	    {key: "sig_cd",		label: "시군구",		width: 100},
	    {key: "rds_man_no",		label: "도로구간일련번호",	width: 100},
	    {key: "rn",			label: "도로명(한글)",	width: 100},
	    {key: "eng_rn",		label: "도로명(영문)",	width: 180},
	    {key: "ntfc_de",		label: "고시일자",		width: 100},
	    {key: "wdr_rd_cd",		label: "광역도로구분",	width: 100},
	    {key: "rbp_cn",		label: "기점",		width: 150},
	    {key: "rep_cn",		label: "종점",		width: 150},
	    {key: "road_bt",		label: "도로폭",		width: 100},
	    {key: "road_lt",		label: "도로길이",		width: 100}
	],
    });
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setRoadSectListData(_pageNo) {
    // wfs 옵션값 담을 변수
    var options;
    
    // 검색 조건 - cql filter
    // 속성 검색 활성화 시 옵션, 필터
    if ($('.roadSectProperty').hasClass('on')) {
	let filters = 'sig_cd = 41830 and wdr_rd_cd = 3';
	
//    let emdKorNm = $("#emdKorNm").val().split(',')[0];			// 읍면동
	let roadBtVal = $("input[name=roadBtVal]").val();			// 도로폭
	let rn = $("input[name=rn]").val();					// 도로명
//    if (emdKorNm != '' && emdKorNm != '41830') {
//	emdKorNm = "'" + emdKorNm + "%'";
//	filters += ' and rbp_cn like ' + emdKorNm;
//    }; 
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
	if (type === 'extent') {
    		options.bbox 		= FACILITY.spaceSearchOption.bbox;
	} else {
    		options.geometry 	= FACILITY.spaceSearchOption.geometry;
	}
		
    } else {
	toastr.error("검색 오류");
    }
/////////////////////////////////////////////////////////////////////////////////////////
    // 그리드 데이터
    var gridList = this;
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
	    feature.setId('tgd_sprd_manage.' + getGid);
	    // --------------------------------------------------
	    return {
	        marker: {
	            src: '/images/poi/roadSection_poi.png'
	            },
	            label: {
	                text: properties.rn
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
function selectRoadSectDetailView(gid) {
    dtmap.vector.clearSelect(); 
    dtmap.vector.select('tgd_sprd_manage.' + gid);
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
		setRoadSectListData(0);
	    }
	});
    $('.roadSect .search').on('click', function() {
	setRoadSectListData(0);
    });
};

/**
 * 엑셀 다운로드 (전체 다운로드만 가능)
 * @returns
 */
function selectRoadSectionExcelListDownload() {
    $('#selectRoadSectExcelListDownload').on('click', function (e) {
	let url = "/job/fcmr/tpfc/";
	let urlName = e.target.id;
	url += urlName + ".do";
	let emdKorNm = $('#emdKorNm').val().split(',')[1];
	    if (emdKorNm == null || emdKorNm == '') {
		emdKorNm = '41830';
	    }
	
	$("form[name='searchFormExcel']").append('<input type="hidden" name="emdKorNm" value=' + emdKorNm + '>');
	$("form[name='searchFormExcel']").attr('onsubmit', '');
	$("form[name='searchFormExcel']").attr('action', url);
	$("form[name='searchFormExcel']").submit();
	$("form[name='searchFormExcel']").attr('action', '');
	$("form[name='searchFormExcel'] input[name='emdKorNm']").remove();
	
	return false;
    })
}

/**
 * 객체 선택 시 상세보기
 * @param e
 * @returns
 */
function onSelectRoadSectEventListener(e) {
    let id = e.id
    console.log(e.id.split('.')[1]);
    if (id) {
	selectRoadSectDetailView(id);
    } else {
	toastr.error("객체 선택 오류입니다.");
	return false;
    }
}