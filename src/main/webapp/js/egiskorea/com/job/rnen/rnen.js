/**
 * 신재생에너지 js
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

//태양광발전소 기본 틀 추가
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
        	{key: "eltgnr_se", label: "발전기구분"},
        	{key: "elcpwstn_nm", label: "발전소명"},
        	{key: "eqp_lc", label: "설치위치"},
        	{key: "prmisn_volm", label: "허가용량"},
        	{key: "bsns_se", label: "사업구분"},
    	],
    });	
}
//태양광발전소 조회 기능
function setData(_pageNo){

	options ={
		typeNames: 'tgd_elcty_bsns_prmisn', //WFS 레이어명
		page  : _pageNo+1,
		perPage : 100,
		sortBy : 'gid',
		sortOrder : 'DESC',
	}
	
	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var eqp_lc = SEARCHOBJ.propertySearch.searchEmdKorNm;
		var bsns_se = SEARCHOBJ.propertySearch.searchBsnsSeSearch;
		var prmisn_volm_min = SEARCHOBJ.propertySearch.searchPrmisnVolmASearch;
		var prmisn_volm_max = SEARCHOBJ.propertySearch.searchPrmisnVolmBSearch;
		var elcpwstn_nm = SEARCHOBJ.propertySearch.searchElcpwstnNmSearch;


		var cqlList = [];
	
		if(eqp_lc!=''){cqlList.push("eqp_lc like "+eqp_lc+" ")}
		if(bsns_se!=''){cqlList.push("bsns_se = "+bsns_se+" ")}
		if(prmisn_volm_min!=''){cqlList.push("prmisn_volm > "+prmisn_volm_min+" ")}
		if(prmisn_volm_max!=''){cqlList.push("prmisn_volm < "+prmisn_volm_max+" ")}
		if(elcpwstn_nm!=''){cqlList.push("elcpwstn_nm like "+elcpwstn_nm+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="renewableEnergySelect"]:checked').val();
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
	            src: '/images/poi/renewableEnergy_poi.png'
	            },
	            label: {
	                text: properties.elcpwstn_nm

	            }
	        }
	});
	dtmap.vector.fit();
  })
}
//태양광발전소 등록하기 페이지 호출
function fn_insert(){

	ui.openPopup("rightSubPopup");
	$.ajax({
		type : "POST",
		url : "/job/rnen/insertRenewableEnergyView.do",
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
		}
	});
}
//태양광발전소 상세보기 페이지 호출
function fn_pageDetail(gid){
	dtmap.vector.clearSelect(); 
	dtmap.vector.select('tgd_elcty_bsns_prmisn.'+gid);
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/rnen/selectRenewableEnergy.do",
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
//태양광발전소 상세 > 수정페이지 열기
function fn_update(gid){
	
	$("#rightSubPopup").empty();
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	$.ajax({
		type : "POST",
		url : "/job/rnen/updateRenewableEnergyView.do",
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
		}
	});
}
//신재생에너지 엑셀다운로드 버튼
$("#rnenExcelDownload").on("click", function(){
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
			{key: "eltgnr_se", label: "발전기구분",			width: '*'},
			{key: "elcpwstn_nm", label: "발전소명",			width: '*'},
			{key: "eqp_lc", label: "설치위치",			width: '*'},
			{key: "prmisn_volm", label: "허가용량",			width: '*'},
			{key: "bsns_se", label: "사업구분",			width: '*'},
			{key: "bsns_se", label: "사업구분",			width: '*'},
			{key: "geomText", label: "GEOMETRY",			width: '*'},
		],
		body: {
			align: "center"
		}
	})

	options ={
		typeNames: 'tgd_elcty_bsns_prmisn', //WFS 레이어명
		sortBy : 'gid',
		sortOrder : 'DESC',
	}
	
	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var eqp_lc = SEARCHOBJ.propertySearch.searchEmdKorNm;
		var bsns_se = SEARCHOBJ.propertySearch.searchBsnsSeSearch;
		var prmisn_volm_min = SEARCHOBJ.propertySearch.searchPrmisnVolmASearch;
		var prmisn_volm_max = SEARCHOBJ.propertySearch.searchPrmisnVolmBSearch;
		var elcpwstn_nm = SEARCHOBJ.propertySearch.searchElcpwstnNmSearch;


		var cqlList = [];
	
		if(eqp_lc!=''){cqlList.push("eqp_lc like "+eqp_lc+" ")}
		if(bsns_se!=''){cqlList.push("bsns_se = "+bsns_se+" ")}
		if(prmisn_volm_min!=''){cqlList.push("prmisn_volm > "+prmisn_volm_min+" ")}
		if(prmisn_volm_max!=''){cqlList.push("prmisn_volm < "+prmisn_volm_max+" ")}
		if(elcpwstn_nm!=''){cqlList.push("elcpwstn_nm like "+elcpwstn_nm+" ")}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="renewableEnergySelect"]:checked').val();
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
		gridList.gridAll.exportExcel("태양광발전소_" + todayDate + ".xls");
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
		$("#eqpLc").val("경기도 양평군 "+result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([parseFloat(modPosition[0]), parseFloat(modPosition[1])]);
		const wkt = format.writeGeometry(point);
		$("#geom").val(wkt);
	});
	dtmap.on('select',spaceClickListener );
}

function fn_search_List(){

	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;

	if($('#energy-prop').hasClass('on')){
		SEARCHOBJ.propertySearch = {};
		
		SEARCHOBJ.propertySearch.searchEmdKorNm= $('#emdKorNm').val() || '';
		SEARCHOBJ.propertySearch.searchBsnsSeSearch = $('#bsnsSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchPrmisnVolmASearch = $('#prmisnVolmASearch').val() || '';
		SEARCHOBJ.propertySearch.searchPrmisnVolmBSearch = $('#prmisnVolmBSearch').val() || '';
		SEARCHOBJ.propertySearch.searchElcpwstnNmSearch = $('#elcpwstnNmSearch').val() || '';
	}else if($('#energy-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="renewableEnergySelect"]:checked').val();
		
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
	if (dtmap.mod === '3D'){
		gid=e.property.gid;
	}else{
		gid=e.property.gid;
	}
    fn_pageDetail(gid);
    dtmap.vector.select(e.id);
}
