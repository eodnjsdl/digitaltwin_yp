/**
 * 업무 > 시설관리 > 고가도로
 */

/**
 * 고가도로 목록 불러오기
 * @returns
 */
function selectOverpassListView() {
    $('#bottomPopup').load('/job/fcmr/tpfc/selectOverpassListView.do', function () {
	toastr.success("/job/fcmr/tpfc/selectOverpassListView.do", "페이지🙂호🙂출🙂");
	
	callOverpassGrid();
    });
    
}

/**
 * 테이블 불러오기
 * @returns
 */
function callOverpassGrid() {
    setOverpassListGrid();
    setOverpassListData(0);
}

/**
 * 테이블 기본 세팅
 * @returns
 */
function setOverpassListGrid() {
    this.target = new ax5.ui.grid();
    this.target.setConfig({
	target: $('[data-ax5grid="overpassListGrid"]'),
	showLineNumber: true,
	sortable: true,
	multiSort: true,
	header: {
		align: "center"
	},
	body: {
		align: "center",
		onClick: function() {
			selectOverpassDetailView(this.item.gid);
		}
	},
	page: {
		navigationItemCount: 9,
		display: true,
		onChange: function () {
		    setOverpassListData(this.page.selectPage);
		}
	},
	columns: [
	    {key: "sig_cd",		label: "시군구코드"},
	    {key: "kor_ove_nm",		label: "고가도로명(한글)"},
	    {key: "opert_de",		label: "작업일시"},
	    {key: "ove_sn",		label: "고가도로 일련번호"}
	],
    });
}

/**
 * 테이블 데이터 세팅
 * @param _pageNo
 * @returns
 */
function setOverpassListData(_pageNo) {
    
    var gridList = this;
    
 // 철도역사 - wms -> sortBy, orderBy, clq(sig_cd = 41830 -- 양평군) 필수
    const promise = dtmap.wfsGetFeature({
	typeNames: 'tgd_spot_overpass',
	page: _pageNo + 1,
	perPage: 10,
	sortBy : 'gid',
	sortOrder : 'DESC',
	filter : ['sig_cd = 41830']
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
    });
}

/**
 * 테이블 데이터 상세보기  ------ 미완성
 * @param gid
 * @returns
 */
function selectOverpassDetailView(gid) {
    ui.openPopup("rightSubPopup");
    ui.loadingBar("show");
    var formData = new FormData();
	
    if (gid != '') {
	formData.append('gid', gid);
    }
	
    $.ajax({
	data : formData,
	type : "POST",
	url : '/job/fcmr/tpfc/selectOverpassInfo.do',
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
