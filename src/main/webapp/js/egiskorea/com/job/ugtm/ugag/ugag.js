/**
 * 지하수관리 > 농업용공공관정 js
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
//농업용공공관정 기본 틀 추가
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
			firstIcon: '|<',
			prevIcon: '<',
			nextIcon: '>',
			lastIcon: '>|',
            onChange: function () {
                setData(this.page.selectPage);
            }
        },
        columns: [
        	{key: "manage_se", label: "관리구분"},
        	{key: "fclty_nm", label: "시설명"},
        	{key: "adres", label: "주소"},
        	{key: "fclts_sttus", label: "시설상태"},
        	{key: "fclts_chck_de", label: "시설물점검일"},
        	{key: "prpos_se", label: "용도"},
        	{key: "detail_prpos_se", label: "세부용도"},
        	{key: "calbr", label: "구경 (㎜)"},
        	{key: "dph", label: "구경 (㎜)"},
        	{key: "wp_ablty", label: "양수능력 (㎥/일)"},
        	{key: "dscrgpp_calbr", label: "토출관구경 (㎥)"},
        	{key: "pump_stle_se", label: "펌프형태"},
        	{key: "pump_hrspw", label: "펌프마력 (hp)"},
        	{key: "manage_instt_nm", label: "관리기관"},
    	],
    });
}
//농업용공공관정 조회기능
function setData(_pageNo){

	options = {
		typeNames: 'tgd_agr_public_tbwll', //WFS 레이어명
		page  : _pageNo+1,
		perPage : 100,
		sortBy : 'gid',
		sortOrder : 'DESC',
	}

	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var adres = SEARCHOBJ.propertySearch.searchEmdKorNm;
		var manage_se = SEARCHOBJ.propertySearch.searchManageSeSearch;
		var detail_prpos_se = SEARCHOBJ.propertySearch.searchDetailPrposSeSearch;
		var fclts_sttus = SEARCHOBJ.propertySearch.searchFcltsSttusSearch;

		var cqlList = [];
		if(adres!=''){cqlList.push("adres like "+adres+" ")}
		if(manage_se!=''){cqlList.push("manage_se = "+manage_se+" ")}
		if(detail_prpos_se!=''){cqlList.push("detail_prpos_se = "+detail_prpos_se+" ")}
		if(fclts_sttus!=''){cqlList.push("fclts_sttus = "+fclts_sttus+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="underWaterAgriSelect"]:checked').val();
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
		            src: '/images/poi/underWaterAgri_poi.png'
		            },
		            label: {
		                text: properties.fclty_nm
		            }
		        }
		});
		dtmap.vector.fit();

  })
}
//농업용공공관정 등록페이지 열기
function fn_insert(){
	ui.openPopup("rightSubPopup");
	$.ajax({
		type : "POST",
		url : "/job/ugtm/insertUnderWaterAgriView.do",
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
//태양광발전소 상세보기 페이지 호출
function fn_pageDetail(gid){
	dtmap.vector.clearSelect(); 
	dtmap.vector.select('tgd_agr_public_tbwll.'+gid);
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterAgri.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#rightSubPopup").append(returnData);
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
					}
				}
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}
	});
} 
//농업용공공관정 상세 > 수정페이지 열기
function fn_update(gid){
	$("#rightSubPopup").empty();
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	$.ajax({
		type : "POST",
		url : "/job/ugtm/updateUnderWaterAgriView.do",
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
//농업용공공관정 엑셀다운로드 버튼
$("#ugagExcelDownload").on("click", function(){
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
			{key: "fclty_nm", 			label: "시설명",			width: '*'},
			{key: "devlop_year",		label: "개발년도",			width: '*'},
			{key: "manage_instt_nm",		label: "관리기관명",		width: '*'},
			{key: "prpos_se",			label: "용도구분",		width: '*'},
			{key: "detail_prpos_se",			label: "세부용도구분",		width: '*'},
			{key: "calbr",			label: "구경",		width: '*'},
			{key: "dph",			label: "심도",			width: '*'},
			{key: "wp_ablty",			label: "양수능력",			width: '*'},
			{key: "dscrgpp_calbr",		label: "토출관구경",		width: '*'},
			{key: "pump_stle_se",		label: "펌프형태구분",		width: '*'},
			{key: "pump_hrspw", 		label: "펌프마력",		width: '*'},
			{key: "fclts_sttus",		label: "시설물상태",		width: '*'},
			{key: "fclts_chck_de",		label: "시설물점검일자",		width: '*'},
			{key: "geomText",		label: "GEOMETRY",		width: '*'},
		],
		body: {
			align: "center"
		}
	})

    // 검색 조건
	options = {
		typeNames: 'tgd_agr_public_tbwll', //WFS 레이어명
		sortBy : 'gid',
		sortOrder : 'DESC',
	}
	
	//검색 옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var adres = SEARCHOBJ.propertySearch.searchEmdKorNm;
		var manage_se = SEARCHOBJ.propertySearch.searchManageSeSearch;
		var detail_prpos_se = SEARCHOBJ.propertySearch.searchDetailPrposSeSearch;
		var fclts_sttus = SEARCHOBJ.propertySearch.searchFcltsSttusSearch;

		var cqlList = [];
		if(adres!=''){cqlList.push("adres like "+adres+" ")}
		if(manage_se!=''){cqlList.push("manage_se = "+manage_se+" ")}
		if(detail_prpos_se!=''){cqlList.push("detail_prpos_se = "+detail_prpos_se+" ")}
		if(fclts_sttus!=''){cqlList.push("fclts_sttus = "+fclts_sttus+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="underWaterAgriSelect"]:checked').val();
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
		gridList.gridAll.exportExcel("농업용공공관정관리_" + todayDate + ".xls");
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
	
	var modPosition;
	if(dtmap.mod=='2D'){
        modPosition = position;
    }else{
        modPosition = ol.proj.transform([position[0],position[1]],'EPSG:4326','EPSG:5179');
    }
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#adres").val("경기도 양평군 "+result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([parseFloat(modPosition[0]), parseFloat(modPosition[1])]);
		const wkt = format.writeGeometry(point);
		$("#geom").val(wkt);
	});
	dtmap.on('select',spaceClickListener );//레이어 선택 이벤트
}

//농업용공공관정 검색조회
function fn_search_List(){
	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;

	if($('#ugag-prop').hasClass('on')){
		SEARCHOBJ.propertySearch = {};
		SEARCHOBJ.propertySearch.searchEmdKorNm= $('#emdKorNm').val() || '';
		SEARCHOBJ.propertySearch.searchManageSeSearch = $('#manageSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchDetailPrposSeSearch = $('#detailPrposSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchFcltsSttusSearch = $('#fcltsSttusSearch').val() || '';
	}else if($('#ugag-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="underWaterAgriSelect"]:checked').val();
		
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

