/**
 * 지하수관리 > 지하수이용시설 js
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


//지하수이용시설 기본 틀 추가
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
            	fn_pageDetail(this.item.gid);
            }
        },
        page: {
            navigationItemCount: 9,
            display: true,
            onChange: function () {
                setData(this.page.selectPage);
            }
        },
        columns: [
        	{key: "manage_se", label: "관리구분"},
        	{key: "adres", label: "주소"},
        	{key: "prmisn_sttemnt_no", label: "허가신고번호"},
        	{key: "allvl_bsrck_se", label: "충적/암반"},
        	{key: "al", label: "표고(m)"},
        	{key: "devlop_year", label: "개발연도"},
        	{key: "prpos_se", label: "용도"},
        	{key: "detail_prpos_se", label: "세부용도"},
        	{key: "calbr", label: "구경 (㎜)"},
        	{key: "dph", label: "심도 (m)"},
        	{key: "wp_qty", label: "양수능력 (㎥/일)"},
        	{key: "dscrgpp_calbr", label: "토출관구경 (㎥)"},
        	{key: "yr_use_qty", label: "연사용량 (㎥)"},
        	{key: "pump_hrspw", label: "펌프마력 (hp)"},
    	],
    });
}
//지하수이용시설 조회 기능
function setData(_pageNo){

	options={
		typeNames: 'tgd_ugrwtr_utlztn_fclty', //WFS 레이어명
		page  : _pageNo+1,
		perPage : 100,
	}

	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var adres = SEARCHOBJ.propertySearch.searchEmdKorNm;
		var allvl_bsrck_se = SEARCHOBJ.propertySearch.searchAllvlBsrckSeSearch
		var prpos_se = SEARCHOBJ.propertySearch.searchPrposSeSearch;
		var detail_prpos_se = SEARCHOBJ.propertySearch.searchDetailPrposSeSearch;

		var cqlList = [];
	
		if(adres!=''){cqlList.push("adres like "+adres+" ")}
		if(allvl_bsrck_se!=''){cqlList.push("allvl_bsrck_se = "+allvl_bsrck_se+" ")}
		if(prpos_se!=''){cqlList.push("prpos_se = "+prpos_se+" ")}
		if(detail_prpos_se!=''){cqlList.push("detail_prpos_se = "+detail_prpos_se+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="underWaterUseFacilSelect"]:checked').val();
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
		            src: '/images/poi/underWaterUseFacil_poi.png'
		            },
		            label: {
		                text: properties.detail_prpos_se
		            }
		        }
		});
		dtmap.vector.fit();
  })
}
//지하수이용시설 등록페이지 열기
function fn_insert(){
	ui.openPopup("rightSubPopup");
	$.ajax({
		type : "POST",
		url : "/job/ugtm/insertUnderWaterUseFacilView.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			setYear();
		}
	});
}
//지하수이용시설  상세페이지 열기
function fn_pageDetail(gid){
	dtmap.vector.clearSelect(); 
	dtmap.vector.select('tgd_ugrwtr_utlztn_fclty.'+gid);

	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterUseFacil.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				toastr.success("단일 선택 POI 하이라트 및 지도이동");
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}
	});
}

//지하수이용시설  상세 > 수정페이지 열기
function fn_update(gid){
	$("#rightSubPopup").empty();

	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/updateUnderWaterUseFacilView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			setYear();
		}
	});
	
}
//지하수이용시설 엑셀다운로드 버튼
$("#ugufExcelDownload").on("click", function(){
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
			{key: "manage_se",			label: "관리구분",			width: '*'},
			{key: "adres",			label: "주소",			width: '*'},
			{key: "al", 			label: "표고",			width: '*'},
			{key: "devlop_year",		label: "개발년도",			width: '*'},
			{key: "allvl_bsrck_se",		label: "충적암반구분",			width: '*'},
			{key: "public_pvtesbl_se",		label: "공공사설구분",		width: '*'},
			{key: "prmisn_sttemnt_se",			label: "허가신고구분",		width: '*'},
			{key: "prmisn_sttemnt_no",			label: "허가신고번호",		width: '*'},
			{key: "prpos_se",			label: "용도구분",		width: '*'},
			{key: "detail_prpos_se",			label: "세부용도구분",		width: '*'},
			{key: "calbr",			label: "구경",			width: '*'},
			{key: "dph",			label: "심도",			width: '*'},
			{key: "wp_qty",		label: "양수량",		width: '*'},
			{key: "yr_use_qty",		label: "연사용량",		width: '*'},
			{key: "dscrgpp_calbr", 		label: "토출관구경",		width: '*'},
			{key: "pump_hrspw",		label: "펌프마력",		width: '*'},
			{key: "geomText",		label: "GEOMETRY",		width: '*'},
		],
		body: {
			align: "center"
		}
	})

	// 검색 조건
	options={
		typeNames: 'tgd_ugrwtr_utlztn_fclty', //WFS 레이어명
		sortBy : 'gid',
		sortOrder : 'DESC',
	}

	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var adres = SEARCHOBJ.propertySearch.searchEmdKorNm;
		var allvl_bsrck_se = SEARCHOBJ.propertySearch.searchAllvlBsrckSeSearch
		var prpos_se = SEARCHOBJ.propertySearch.searchPrposSeSearch;
		var detail_prpos_se = SEARCHOBJ.propertySearch.searchDetailPrposSeSearch;

		var cqlList = [];
	
		if(adres!=''){cqlList.push("adres like "+adres+" ")}
		if(allvl_bsrck_se!=''){cqlList.push("allvl_bsrck_se = "+allvl_bsrck_se+" ")}
		if(prpos_se!=''){cqlList.push("prpos_se = "+prpos_se+" ")}
		if(detail_prpos_se!=''){cqlList.push("detail_prpos_se = "+detail_prpos_se+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="underWaterUseFacilSelect"]:checked').val();
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
		gridList.gridAll.exportExcel("지하수이용시설_" + todayDate + ".xls");
	});
});

//지도에서 선택 _ 주소 및 경위도 위치 가져오기
function fn_getLocation() {
	dtmap.off('select');//레이어 선택 이벤트 해제
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.on('drawend', onDrawEnd);
}
function onDrawEnd(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#adres").val("경기도 양평군 "+result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#geom").val(wkt);
	});
	dtmap.on('select',spaceClickListener );
}

//지하수이용시설 검색조회
function fn_search_List(){

	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;

	if($('#uguf-prop').hasClass('on')){
		SEARCHOBJ.propertySearch = {};

		SEARCHOBJ.propertySearch.searchEmdKorNm= $('#emdKorNm').val() || '';
		SEARCHOBJ.propertySearch.searchAllvlBsrckSeSearch= $('#allvlBsrckSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchPrposSeSearch = $('#prposSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchDetailPrposSeSearch = $('#detailPrposSeSearch').val() || '';

	}else if($('#uguf-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="underWaterUseFacilSelect"]:checked').val();
		
		if (type === 'extent') {
			 var bbox = dtmap.getExtent();
			 SEARCHOBJ.spaceSearch.bbox = bbox;

		} else {
			if(dtmap.draw.source.getFeatures().length > 0){
				SEARCHOBJ.spaceSearch.geometry = dtmap.draw.getGeometry();
			}else{
				alert("영역지정 안되었습니다");
				return false;
			}
		}

	}
}

