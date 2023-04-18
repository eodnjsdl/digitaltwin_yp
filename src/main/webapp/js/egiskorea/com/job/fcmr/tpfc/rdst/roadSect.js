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
	toastr.success("/job/fcmr/tpfc/selectRoadSectListView.do", "페이지🙂호🙂출🙂");
	
	callRoadSectGrid();
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
    // 검색 조건 - cql filter
    /**
     * xml filter와 cql filter의 값이 다르게 나옴
     * cql filter 사용 - wdr_rd_cd
     */
    let filters = 'sig_cd = 41830 and wdr_rd_cd = 3';
    
    let emdKorNm = $("#emdKorNm").val();				// 읍면동
    let roadBtVal = $("input[name=roadBtVal]").val();			// 도로폭
    let rn = $("input[name=rn]").val();					// 도로명
    if (emdKorNm != '' && emdKorNm != '41830') {
	emdKorNm = "'" + emdKorNm + "%'";
	filters += ' and rbp_cn like ' + emdKorNm;
    }; 
    if (roadBtVal != '') {
	filters += ' and road_bt = ' + roadBtVal;
    }; 
    if (rn != '') {
	rn = "'%" + rn + "%'";
	filters += ' and rn like ' + rn;
    };
    
    var gridList = this;
    const promise = dtmap.wfsGetFeature({
	typeNames: 'tgd_sprd_manage',
	perPage: 10,
	page: _pageNo + 1,
	sortBy : 'gid',
	orderBy : 'DESC',
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



