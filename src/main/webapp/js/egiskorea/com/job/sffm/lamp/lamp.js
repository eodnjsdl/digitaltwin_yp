/**
 * 안전시설물관리 > 가로등관리 js
 */
SEARCHOBJ= {
	propertySearch: null,
	spaceSearch:null,
};

$(document.body).ready(function(){
	initGrid();
	setData();
	dtmap.off('select');
	dtmap.on('select',spaceClickListener );
})

//가로등관리 기본그리드 생성
function initGrid(){
	this.target = new ax5.ui.grid();
	
	this.target.setConfig({
		target: $('[data-ax5grid="attr-grid"]'),
		sortable: true, // 모든 컬럼에 정렬 아이콘 표시
		multipleSelect: false, // 다중 정렬 여부
		header:{
			align:"center"
		},
		body : {
			align:"center",
			onClick : function(){
				fn_pageDetail(this.item.gid);
			}
		},
		page: {
			navigationItemCount: 10,
			height: 30,
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
			{key: "manage_no",  label: "관리번호", width: 200},
			{key: "adres", label: "주소", width: 400},
			{key: "instl_de", label: "설치일자"},
			{key: "strtlgt_cnt", label: "가로등수"},
			{key: "stdde", label: "기준일"},
		],
	});

}

//가로등관리 조회기능
function setData(_pageNo){

	var options = {
		typeNames: 'tgd_strtlgt_status', //WFS 레이어명
		page : (_pageNo||0)+1,
		perPage : 100,
		sortBy : 'gid',
		sortOrder : 'DESC',
	}

	//검색 옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색

		var instlDe = SEARCHOBJ.propertySearch.searchInstlDe;
		var adres = SEARCHOBJ.propertySearch.searchAdres;
		var manageNo = SEARCHOBJ.propertySearch.searchManageNo;

		var cqlList = [];
	
		if(instlDe.trim().length >= 1){cqlList.push("instl_de"+" like "+instlDe);}
		if(adres.trim().length >= 1){cqlList.push("adres"+" like "+adres);}
		if(manageNo.trim().length >=1){cqlList.push("manage_no"+" like "+manageNo);}

		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="sffmSelect"]:checked').val();
        if (type === 'extent') {
        	options.bbox = SEARCHOBJ.spaceSearch.bbox;
        } else {
        	options.geometry = SEARCHOBJ.spaceSearch.geometry;
        }
	}
	

	//조회
	var gridList = this;
	const promise = dtmap.wfsGetFeature(options);

	promise.then(function(data){
		$("#bottomPopup").find(".bbs-list-num strong").text(data.totalFeatures);
		var list = [];
		for(i =0;i<data.features.length;i++){
			const {id, properties} = data.features[i];
			 list.push({...properties, ...{id: id}});
		 } 

		 gridList.target.setData({
			list : list,
			page : {
				currentPage : _pageNo || 0,
				pageSize : 100,
				totalElements : data.totalFeatures,
				totalPages : Math.ceil(data.totalFeatures/100)
			}
		 })

		 dtmap.vector.clear();
		 dtmap.vector.readGeoJson(data, function (feature) {
		 /**
		 * 스타일 콜백 예시
		 */
		 let properties = feature.getProperties();
			 return {
				 marker: {
					 src: '/images/poi/street_lamp.png'
					 },
					 label: {
						 text: properties.manage_no
					 }
				 }
		 });
		 dtmap.vector.fit();

	})

}

//가로등관리 등록페이지 호출
function fn_insert(){
	ui.loadingBar("show");
	ui.openPopup("rightSubPopup");
	// $(".popup-sub").removeClass("opened").html("");

	$.ajax({
		type : "POST",
		url : "/job/sffm/insertSafetyFacilLampMngView.do",
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
			ui.loadingBar("hide");
		}
	});
}

//가로등관리 상세페이지 호출
function fn_pageDetail(gid){
	dtmap.vector.clearSelect(); 
	dtmap.vector.select('tgd_strtlgt_status.'+gid);
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/sffm/selectSafetyFacilLampMng.do",
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

//가로등관리 수정페이지 호출
function fn_update(gid){

	$("#rightSubPopup").empty();

	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/sffm/updateSafetyFacilLampMngView.do",
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
		},error : function (request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		} , complete : function(){
			
		}
	});
}

//가로등 검색 조회 버튼
function fn_search_List(e){
	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;
	if($('#sffm-prop').hasClass('on')){

		SEARCHOBJ.propertySearch={};
		SEARCHOBJ.propertySearch.searchManageNo= $('#sffm-search-manage-no').val() || '';
		SEARCHOBJ.propertySearch.searchInstlDe = $('#sffm-search-instl-de').val() || '';
		SEARCHOBJ.propertySearch.searchAdres = $('#sffm-search-adres').val() || '';
	}else if($('#sffm-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="sffmSelect"]:checked').val();

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

//가로등엑셀다운로드 버튼
$("#lampExcelDownload").on("click", function(){

	var $container = $("#container");
    var $target = $container.find('[data-ax5grid="attr-grid-excel"]');	//가상의 ax5uigrid 공간에 처리 
    // $target.css('display', 'none');
    
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
			{key: "manage_no",		label: "관리번호",		width: '*'},
			{key: "adres", 		label: "주소",		width: '*'},
			{key: "instl_de",		label: "설치일자",			width: '*'},
			{key: "strtlgt_cnt",			label: "가로등수",			width: '*'},
			{key: "lat",			label: "위도",			width: '*'},
			{key: "lon",			label: "경도",			width: '*'},
			{key: "stdde",		label: "기준일",			width: '*'},
			{key: "geomText",		label: "GEOMETRY",			width: '*'},
			{key: "alttd",		label: "고도",		width: '*'},
		],
		body: {
			align: "center"
		}
	})

    // 검색 조건
	
	var options = {
		typeNames: 'tgd_strtlgt_status', //WFS 레이어명
		sortBy : 'gid',
		sortOrder : 'DESC',
	}
	
	//검색 옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색

		var instlDe = SEARCHOBJ.propertySearch.searchInstlDe;
		var adres = SEARCHOBJ.propertySearch.searchAdres;
		var manageNo = SEARCHOBJ.propertySearch.searchManageNo;

		var cqlList = [];

		if(instlDe.trim().length >= 1){cqlList.push("instl_de"+" like "+instlDe);}
		if(adres.trim().length >= 1){cqlList.push("adres"+" like "+adres);}
		if(manageNo.trim().length >=1){cqlList.push("manage_no"+" like "+manageNo);}

		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
		const type 		= $parent.find('input[name="sffmSelect"]:checked').val();
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
		gridList.gridAll.exportExcel("가로등관리_" + todayDate + ".xls");
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