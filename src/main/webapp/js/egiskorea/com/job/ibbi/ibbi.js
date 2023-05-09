/**
 * 관내업소정보조회 js
 */

SEARCHOBJ= {
	propertySearch: null,
	spaceSearch:null,
};

$(document.body).ready(function () {
	initGrid();
    setData(0);
    dtmap.off('select');
   dtmap.on('select',spaceClickListener );
});


//관내업소정보조회 기본 틀 추가
function initGrid(){
	this.target = new ax5.ui.grid();
    this.target.setConfig({
        target: $('[data-ax5grid="bbs-grid"]'),
        showLineNumber: true,
        sortable: true, // 모든 컬럼에 정렬 아이콘 표시
        multiSort: true, // 다중 정렬 여부
        header: {
            align: "center"
        },
        body: {
            align: "center",
            onClick: function () {
            	fn_pageDetail(this.item.no, this.item.gid);
            }
        },
        page: {
            navigationItemCount: 9,
            display: true,
			firstIcon: '|<',
			prevIcon: '<',
			nextIcon: '>',
			lastIcon: '>|',
            onChange: function () {
                setData(this.page.selectPage);
            }
        },
        columns: [
        	{key: "opnn_svc_nm", label: "업소구분"},
        	{key: "mng_no", label: "관리번호"},
        	{key: "bplc_nm", label: "사업장명"},
        	{key: "bsn_stae_nm", label: "영업상태"},
        	{key: "bizc_se_nm", label: "업태구분명"},
        	{key: "lc_zip", label: "소재지 우편번호"},
        	{key: "lc_all_adr", label: "소재지 주소"},
        	{key: "rdn_zip", label: "도로명 우편번호"},
        	{key: "rdn_all_adr", label: "도로명 주소"}
    	],
    });
}
//관내업소정보조회 조회 기능
function setData(_pageNo){

	options={
		typeNames: 'yp_bssh_info', //WFS 레이어명
		page  : _pageNo+1,
		perPage : 100,
		filter : cqlList
	};

	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var lc_all_adr = SEARCHOBJ.propertySearch.searchLcAllAdr;
		var opnn_svc_nm = SEARCHOBJ.propertySearch.searchOpnnSvcNm;
		var bplc_nm = SEARCHOBJ.propertySearch.searchBplcNm;

		var cqlList = [];

		if(lc_all_adr!=''){cqlList.push("lc_all_adr like "+lc_all_adr+" ")}
		if(opnn_svc_nm!=''){cqlList.push("opnn_svc_nm = "+opnn_svc_nm+" ")}
		if(bplc_nm!=''){cqlList.push("bplc_nm like "+bplc_nm+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="inBusinessEstaInfoSelect"]:checked').val();
        if (type === 'extent') {
        	options.bbox = SEARCHOBJ.spaceSearch.bbox;
        } else {
        	options.geometry = SEARCHOBJ.spaceSearch.geometry;
        }
	}
	

	//조회
	var gridList =this;	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function (data) {

		$(".bbs-list-num").empty();
		$(".bbs-list-num").html("조회결과 : <strong>"+data.totalFeatures+"</strong>건");

		   var list = [];
		   for(i =0;i<data.features.length;i++){
		      const {id, properties} = data.features[i];
		       list.push({...properties, ...{id: id}});
		   } 
	         
		gridList.target.setData({
		  list: list,
		  page: {
		   currentPage: _pageNo || 0,
		   pageSize: 100,
		    totalElements: data.totalFeatures,
		    totalPages: Math.ceil(data.totalFeatures/100)
		  }
		});
		dtmap.vector.clear();
		dtmap.vector.readGeoJson(data, function (feature) {
		/**
		* 스타일 콜백 예시
		*/
		let properties = feature.getProperties();
		    return {
		        marker: {
		            src: '/images/poi/faciRese_poi.png'
		            },
		            label: {
		                text: properties.bplc_nm
		            }
		        }
		});
		dtmap.vector.fit();
	  })
}
//관내업소정보조회 상세보기
function fn_pageDetail(no, gid){
	dtmap.vector.clearSelect() 
	dtmap.vector.select('yp_bssh_info.'+gid);
	ui.openPopup("rightSubPopup");

	var formData = new FormData();
	if(no != ''){
		formData.append('no', no);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ibbi/selectInBusinessEstaInfo.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").html(returnData);
				//그리드에 행전체 선택되게 수정
				var gridGid = gid;
				var gridList = window.target.list;
			
				for(var i=0; i<gridList.length; i++){
					//console.log(gridList[i]);
					var grid = gridList[i];
					if(gridGid == grid.gid){
						var dindex = grid.__index;
						window.target.clearSelect();
						window.target.focus(dindex);		
						//[참고 사항]
						//FACILITY.Ax5UiGrid.focus(-1); 	: 포커스 해제
						//FACILITY.Ax5UiGrid.select(숫자); 	: 사용해도 되는데 스크롤 이동이 안됨
					}
				}
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}
	});
}
//관내업소정보조회 엑셀다운로드
$("#ibbiExcelDownload").on("click", function(){
	var $container = $("#container");
	var $target = $container.find('[data-ax5grid="attr-grid-excel"]');	//가상의 ax5uigrid 공간에 처리 
	$target.css('display', 'none');

	this.gridAll = new ax5.ui.grid();
	this.gridAll.setConfig({
		target:  $target,
		sortable: true,
		multipleSelect: false,
		header: {
			align: "center"
		},
		columns: [
			{key: "gid",			label: "GID",			width: '*'},
			{key: "no", 	label: "번호",			width: '*'},
			{key: "pnu", 	label: "행정구역코드",			width: '*'},
			{key: "opnn_svc_nm", 	label: "개방서비스명",			width: '*'},
			{key: "opnn_svc_id", 	label: "개방서비스ID",			width: '*'},
			{key: "opnn_gm_grp_cd", 	label: "개방자치단체코드",			width: '*'},
        	{key: "mng_no", 		label: "관리번호",			width: '*'},
        	{key: "aupm_de", 		label: "인허가일자",			width: '*'},
        	{key: "aupm_canl_de", 		label: "인허가취소일자",			width: '*'},
        	{key: "bsn_stae_se_cd", 		label: "영업상태구분코드",			width: '*'},
        	{key: "bsn_stae_nm", 		label: "영업상태명",			width: '*'},
        	{key: "deal_bsn_stae_cd", 		label: "상세영업상태코드",			width: '*'},
        	{key: "deal_bsn_stae_nm", 		label: "상세영업상태명",			width: '*'},
        	{key: "cbiz_de", 		label: "폐업일자",			width: '*'},
        	{key: "sobs_de", 		label: "휴업일자",			width: '*'},
        	{key: "sobs_end_de", 		label: "휴업종료일자",			width: '*'},
        	{key: "relc_de", 		label: "재개업일자",			width: '*'},
        	{key: "lc_tlp", 		label: "소재지전화",			width: '*'},
        	{key: "lc_ar", 		label: "소재지면적",			width: '*'},
        	{key: "lc_zip", 		label: "소재지우편번호",			width: '*'},
        	{key: "lc_all_adr", 		label: "소재지전체주소",			width: '*'},
        	{key: "rdn_all_adr", 		label: "도로명전체주소",			width: '*'},
        	{key: "rdn_zip", 		label: "도로명우편번호",			width: '*'},
        	{key: "bplc_nm", 		label: "사업장명",			width: '*'},
        	{key: "last_updt_pnttm", 		label: "최종수정시점",			width: '*'},
        	{key: "data_updt_se", 		label: "데이터갱신구분",			width: '*'},
        	{key: "data_updt_de", 		label: "데이터갱신일자",			width: '*'},
        	{key: "bsn_stae_nm", 	label: "영업상태",			width: '*'},
        	{key: "bizc_se_nm", 	label: "업태구분명",			width: '*'},
        	{key: "lon", 		label: "위도",			width: '*'},
        	{key: "lat", 		label: "경도",			width: '*'},
        	{key: "geomText", 		label: "GEOMETRY",			width: '*'},
		],
		body: {
			align: "center"
		}
	})

	options={
		typeNames: 'yp_bssh_info', //WFS 레이어명
		sortBy : 'gid',
		sortOrder : 'DESC',
	};

	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var lc_all_adr = SEARCHOBJ.propertySearch.searchLcAllAdr;
		var opnn_svc_nm = SEARCHOBJ.propertySearch.searchOpnnSvcNm;
		var bplc_nm = SEARCHOBJ.propertySearch.searchBplcNm;

		var cqlList = [];

		if(lc_all_adr!=''){cqlList.push("lc_all_adr like "+lc_all_adr+" ")}
		if(opnn_svc_nm!=''){cqlList.push("opnn_svc_nm = "+opnn_svc_nm+" ")}
		if(bplc_nm!=''){cqlList.push("bplc_nm like "+bplc_nm+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="inBusinessEstaInfoSelect"]:checked').val();
        if (type === 'extent') {
        	options.bbox = SEARCHOBJ.spaceSearch.bbox;
        } else {
        	options.geometry = SEARCHOBJ.spaceSearch.geometry;
        }
	}

	

	// 엑셀파일 날짜_시간
	var today = new Date(); 
	let year = dateNum(today.getFullYear());		// 년도
	let month = dateNum(today.getMonth() + 1, 2);	// 월
	let date = dateNum(today.getDate(), 2);			// 날짜
	let hours = dateNum(today.getHours(), 2);		// 시
	let minutes = dateNum(today.getMinutes(), 2);	// 분
	let seconds = dateNum(today.getSeconds(), 2);	// 초

	var todayDate = year+month+date+'_'+hours+minutes+seconds;
	var gridList = this;
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		// 그리드 데이터 전처리
		const list = [];
		for (let i = 0; i < data.features.length; i++) {
			// 좌표 처리
			data.features[i].properties.geomObj = data.features[i].geometry;
			
			// GEOMETRY 처리
			data.features[i].properties.geomText = data.features[i].geometry.type + ' (' + data.features[i].geometry.coordinates[0] + ' ' + data.features[i].geometry.coordinates[1] + ')';
			
			const {id, properties} = data.features[i];
			list.push({...properties, ...{id: id}});
		}
		
		// gird 적용
		gridList.gridAll.setData(list);
		
		//엑셀 export
		gridList.gridAll.exportExcel("관내업소정보조회_" + todayDate + ".xls");
	});

});

function readGeoJSON(data) {
    if (!data.crs || !data.features || data.features.length === 0) {
        return;
    }
    var crs = data.crs.properties.name;
    if (crs.includes('urn:ogc:def:crs:EPSG::')) {
        crs = crs.replace('urn:ogc:def:crs:EPSG::', 'EPSG:');
    }
    var format = new ol.format.GeoJSON();
    return format.readFeatures(data, {
        dataProjection: crs,
        featureProjection: map2d.map.getView().getProjection()
    });
}

//관내업소정보조회 검색조회
function fn_search_List(){
	
	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;

	if($('#ibbi-prop').hasClass('on')){
		SEARCHOBJ.propertySearch = {};
		SEARCHOBJ.propertySearch.searchLcAllAdr= $("#emdKorNm").val() || '';
		SEARCHOBJ.propertySearch.searchOpnnSvcNm = $("#opnnSvcNmSearch").val() || '';
		SEARCHOBJ.propertySearch.searchBplcNm = $("#bplcNmSearch").val() || '';
	}else if($('#ibbi-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="inBusinessEstaInfoSelect"]:checked').val();
		
		if (type === 'extent') {
			SEARCHOBJ.spaceSearch.bbox = dtmap.getExtent();
		} else {
			if(dtmap.mod == '2D'){
				if(dtmap.draw.source.getFeatures().length > 0){
					SEARCHOBJ.spaceSearch.geometry = dtmap.draw.getGeometry();
				}else{
					alert("영역지정 안되었습니다");
					return false;
				}
			}else if(dtmap.mod == '3D'){
				SEARCHOBJ.spaceSearch.geometry = dtmap.draw.getGeometry();
			}
		}

	}
	
}

//레이어 선택 상세보기
function spaceClickListener(e){
	var gid ;
	var no;
	
	if (dtmap.mod === '3D'){
		gid=e.properties.gid;
		no = e.properties.no
	}else{
		gid=e.property.gid;
		no = e.property.no
	}
    fn_pageDetail(no, gid);
    dtmap.vector.select(e.id);
}

