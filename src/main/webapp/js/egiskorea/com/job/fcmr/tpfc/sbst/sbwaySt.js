/**
 * 업무 > 시설관리 > 지하철 역사
 */

/**
 * 지하철 역사 목록 불러오기
 * @returns
 */
function selectSubwayStationListView() {
    $('#bottomPopup').load('/job/fcmr/tpfc/selectSubwayStationListView.do', function () {
	toastr.success("/job/fcmr/tpfc/selectSubwayStationListView.do", "페이지🙂호🙂출🙂");
	
	callSubwayStationGrid();
    });
    
}

/**
 * 테이블 불러오기
 * @returns
 */
function callSubwayStationGrid() {
    setSubwayStationListGrid();
    setSubwayStationListData(0);
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setSubwayStationListGrid() {
    this.target = new ax5.ui.grid();
    this.target.setConfig({
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
		onChange: function () {
		    setSubwayStationListData(this.page.selectPage);
		}
	},
	columns: [
	    {key: "sig_cd",		label: "시군구코드",		width: 250},
	    {key: "kor_sub_nm",		label: "지하철역사명(한글)",		width: 250},
	    {key: "opert_de",		label: "작업일시",			width: 250},
	    {key: "sub_sta_sn",		label: "지하철역사 일련번호",		width: 250}
	],
    });
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setSubwayStationListData(_pageNo) {
    
    var gridList = this;
 // 검색기능
    let filters = 'sig_cd = 41830';
    let korSubNm = $('#korSubNm').val();
    if (korSubNm != '') {
	korSubNm = "'%" + korSubNm + "%'";
	filters += ' and kor_sub_nm like ' + korSubNm;
    }
    
 // 철도역사 - wms -> sortBy, orderBy, clq(sig_cd = 41830 -- 양평군) 필수
    const promise = dtmap.wfsGetFeature({
	typeNames: 'tgd_spsb_statn',
	page: _pageNo + 1,
	perPage: 10,
	sortBy : 'gid',
	sortOrder : 'DESC',
	cql : filters
    });
    
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
		feature.setId('tgd_spsb_statn.' + getGid);					
		// --------------------------------------------------
		return {
			marker: {
				src: '/images/poi/subwayStation_poi.png' 
				},
				label: {
					text: properties.kor_sub_nm
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
    dtmap.vector.select('tgd_spsb_statn.' + gid);
    
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
		
		toastr.success("상세정보 호출 성공!");
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
		setSubwayStationListData(0);
	    }
	});
    $('.sbwaySt .search').on('click', function() {
	setSubwayStationListData(0);
    });
};
