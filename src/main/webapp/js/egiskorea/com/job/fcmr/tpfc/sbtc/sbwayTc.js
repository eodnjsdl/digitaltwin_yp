/**
 * 업무 > 시설관리 > 지하철 선로
 */

/**
 * 지하철 선로 목록 불러오기
 * @returns
 */
function selectSubwayTrackListView() {
    $('#bottomPopup').load('/job/fcmr/tpfc/selectSubwayTrackListView.do', function () {
	toastr.success("/job/fcmr/tpfc/selectSubwayTrackListView.do", "페이지🙂호🙂출🙂");
	
	callSubwayTrackGrid();
    });
    
}

/**
 * 테이블 불러오기
 * @returns
 */
function callSubwayTrackGrid() {
    setSubwayTrackListGrid();
    setSubwayTrackListData(0);
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setSubwayTrackListGrid() {
    this.target = new ax5.ui.grid();
    this.target.setConfig({
	target: $('[data-ax5grid="subwayTrackListGrid"]'),
	showLineNumber: true,
	sortable: true,
	multiSort: true,
	header: {
		align: "center"
	},
	body: {
		align: "center",
		onClick: function() {
			selectSubwayTrackDetailView(this.item.gid);
		}
	},
	page: {
		navigationItemCount: 9,
		display: true,
		onChange: function () {
		    setSubwayTrackListData(this.page.selectPage);
		}
	},
	columns: [
	    {key: "sig_cd",		label: "시군구코드",		width: 250},
	    {key: "kor_sbr_nm",		label: "지하철노선명(한글)",		width: 250},
	    {key: "opert_de",		label: "작업일시",			width: 250},
	    {key: "sub_rlw_sn",		label: "지하철노선 일련번호",		width: 250}
	],
    });
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setSubwayTrackListData(_pageNo) {
    
    var gridList = this;
    
    // 검색 필터
    let filters = 'sig_cd = 41830';
    let korSbrNm = $('#korSbrNm').val();
    if (korSbrNm != '') {
	korSbrNm = "'%" + korSbrNm + "%'";
	filters += ' and kor_sbr_nm like ' + korSbrNm;
    }
    
 // 철도역사 - wms -> sortBy, orderBy, clq(sig_cd = 41830 -- 양평군) 필수
    const promise = dtmap.wfsGetFeature({
	typeNames: 'tgd_spsb_rlway',
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
		feature.setId('tgd_spsb_rlway.' + getGid);					
		// --------------------------------------------------
		return {
			marker: {
				src: '/images/poi/subwayTrack_poi.png' 
				},
				label: {
					text: properties.kor_sbr_nm
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
function selectSubwayTrackDetailView(gid) {
    dtmap.vector.clearSelect();
    dtmap.vector.select('tgd_spsb_rlway.' + gid);
    
    ui.openPopup("rightSubPopup");
    ui.loadingBar("show");
    var formData = new FormData();
	
    if (gid != '') {
	formData.append('gid', gid);
    }
	
    $.ajax({
	data : formData,
	type : "POST",
	url : '/job/fcmr/tpfc/selectSubwayTrackInfo.do',
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

function selectSubwayTrackWithFilters() {
    $('#korSbrNm').on('keyup', function () {
	    if (event.keyCode == 13) {
		setSubwayTrackListData(0);
	    }
	});
    $('.sbwayTc .search').on('click', function() {
	setSubwayTrackListData(0);
    });
};
