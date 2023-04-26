/**
 * 안전시설물관리 > cctv 관리 js
 */

SEARCHOBJ= {
	propertySearch: null,
	spaceSearch:null,
};

$(document.body).ready(function(){
	getCode('', 'search');
	initGrid();
	setData();
	dtmap.off('select');
	dtmap.on('select',spaceClickListener );
	
})

function getCode(value, type){
	
	$.ajax({
		url:"/job/cctv/getCode.do",
		type: "POST",
		dataType: 'json',
		async:false,
		success:function(result) {
			var data = result.resultList;
			var html = '';
			
			for(i=0; i<data.length; i++) {
				html += '<option value='+ data[i].codeNm +'>'+ data[i].codeNm +'</option>';
			}
			$("#cctv-"+type+"-selbox").append(html);
		}
	});
	
}

//cctv 관리 기본그리드 생성
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
			{key: "deviceid",  label: "기기ID", width: 200},
			{key: "gbn", label: "구분", width: 400},
			{key: "label", label: "명칭"},
		],
	})
}


function setData(_pageNo){
	
	var options = {
		typeNames: 'tgd_cctv_status_new', //WFS 레이어명
		page : (_pageNo||0)+1,
		perPage : 100,
		sortBy : 'gid',
		sortOrder : 'DESC',
	}

	//검색옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var gbn = SEARCHOBJ.propertySearch.searchGbn;
		var deviceid = SEARCHOBJ.propertySearch.searchDeviceId;
		var label = SEARCHOBJ.propertySearch.searchLabel;

		var cqlList = [];
		if(gbn.trim().length >=1){cqlList.push("gbn like "+gbn+" ");}
		if(deviceid.trim().length >=1){cqlList.push("deviceid like "+deviceid+" ");}
		if(label.trim().length >=1){cqlList.push("label like "+label+" ");}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="cctvSelect"]:checked').val();
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

		toastr.success("지도 BBOX 이동");
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
		 });
		 dtmap.vector.clear();
		dtmap.vector.readGeoJson(data, function (feature) {
		/**
		* 스타일 콜백 예시
		*/
		let properties = feature.getProperties();
		    return {
		        marker: {
		            src: '/images/poi/cctv_poi.png'
		            },
		            label: {
		                text: properties.deviceid
		            }
		        }
		});
		dtmap.vector.fit();

	})

}
//cctv관리 등록페이지 호출
function fn_insert(){
	ui.loadingBar("show");
	ui.openPopup("rightSubPopup");
	// $(".popup-sub").removeClass("opened").html("");

	$.ajax({
		type : "POST",
		url : "/job/cctv/insertSafetyFacilCctvMngView.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#rightSubPopup").append(returnData);
				getCode('', 'insert');
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}
//cctv관리 상세페이지 호출
function fn_pageDetail(gid){

	dtmap.vector.clearSelect() 
	dtmap.vector.select('tgd_cctv_status_new.'+gid);

	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/cctv/selectCctv.do",
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

//CCTV 수정페이지 호출
function fn_update(gid){

	$("#rightSubPopup").empty();

	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/cctv/updateSafetyFacilCctvMngView.do",
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
		} 
	});
}


//cctv 검색 조회 버튼
function fn_search_List(){

	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;

	if($('#cctv-prop').hasClass('on')){
		SEARCHOBJ.propertySearch = {};
		SEARCHOBJ.propertySearch.searchGbn= $('#cctv-search-selbox').val() || '';
		SEARCHOBJ.propertySearch.searchDeviceId = $('#cctv-search-deviceid').val() || '';
		SEARCHOBJ.propertySearch.searchLabel = $('#cctv-search-label').val() || '';
	}else if($('#cctv-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="cctvSelect"]:checked').val();
		
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


//cctv 엑셀다운로드 버튼
$("#cctvExcelDownload").on("click", function(){
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
			{key: "gbn",			label: "구분",			width: '*'},
			{key: "label", 			label: "명칭",			width: '*'},
			{key: "deviceid",		label: "기기",			width: '*'},
			{key: "channel",		label: "channel",		width: '*'},
			{key: "ptz_yn",			label: "ptz_yn",		width: '*'},
			{key: "talk_yn",			label: "talk_yn",		width: '*'},
			{key: "net_yn",			label: "net_yn",		width: '*'},
			{key: "lon",			label: "위도",			width: '*'},
			{key: "lat",			label: "경도",			width: '*'},
			{key: "preset1",		label: "preset1",		width: '*'},
			{key: "preset2",		label: "preset2",		width: '*'},
			{key: "preset3", 		label: "preset3",		width: '*'},
			{key: "preset4",		label: "preset4",		width: '*'},
			{key: "preset5",		label: "preset5",		width: '*'},
			{key: "preset6",		label: "preset6",		width: '*'},
			{key: "preset7",		label: "preset7",		width: '*'},
			{key: "preset8",		label: "preset8",		width: '*'},
			{key: "preset9",		label: "preset9",		width: '*'},
			{key: "preset10",		label: "preset10",		width: '*'},
			{key: "preset11",		label: "preset11",		width: '*'},
			{key: "preset12",		label: "preset12",		width: '*'},
			{key: "preset13", 		label: "preset13",		width: '*'},
			{key: "preset14",		label: "preset14",		width: '*'},
			{key: "preset15",		label: "preset15",		width: '*'},
			{key: "preset16",		label: "preset16",		width: '*'},
			{key: "preset17",		label: "preset17",		width: '*'},
			{key: "preset18",		label: "preset18",		width: '*'},
			{key: "preset19",		label: "preset19",		width: '*'},
			{key: "preset20",		label: "preset20",		width: '*'},
			{key: "angle",			label: "angle",			width: '*'},
			{key: "lgsr_adr",		label: "주소",			width: '*'},
			{key: "new_adr", 		label: "new_adr",		width: '*'},
			{key: "ip_adr",			label: "ip_adr",		width: '*'},
			{key: "instl_yy",		label: "istl_yy",		width: '*'},
			{key: "chan_yy",			label: "chan_yy",		width: '*'},
			{key: "geomText",			label: "geom",			width: '*'},

		],
		body: {
			align: "center"
		}
	})

    // 검색 조건
	var options = {
		typeNames: 'tgd_cctv_status_new', //WFS 레이어명
		sortBy : 'gid',
		sortOrder : 'DESC',
	}
	
	//검색 옵션
	if(SEARCHOBJ.propertySearch != null){//속성검색
		var gbn = SEARCHOBJ.propertySearch.searchGbn;
		var deviceid = SEARCHOBJ.propertySearch.searchDeviceId;
		var label = SEARCHOBJ.propertySearch.searchLabel;

		var cqlList = [];
		if(gbn.trim().length >=1){cqlList.push("gbn like "+gbn+" ");}
		if(deviceid.trim().length >=1){cqlList.push("deviceid like "+deviceid+" ");}
		if(label.trim().length >=1){cqlList.push("label like "+label+" ");}
	
		options.filter = cqlList;

	}else if(SEARCHOBJ.spaceSearch != null){//공간검색

		const $parent 	= $(".search-area");
        const type 		= $parent.find('input[name="cctvSelect"]:checked').val();
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
		gridList.gridAll.exportExcel("cctv관리" + todayDate + ".xls");
	});
});

}

