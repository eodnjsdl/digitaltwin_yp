/**
 * 안전시설물관리 > 가로등관리 js
 */
$(document.body).ready(function(){
	initGrid();
	setData();
})

//가로등관리 기본그리드 생성
function initGrid(){
	this.target = new ax5.ui.grid();
	// var $container = $("#container");
	// var $target = $container.find('#sampleGridDiv [data-ax5grid="attr-grid"]')
	// $target.css('height', 'inherit');
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

	var instlDe = $('#sffm-search-instl-de').val() || '';
	var adres = $('#sffm-search-adres').val() || '';
	var manageNo = $('#sffm-search-manage-no').val() || '';
	var cqlList = [];

	if(instlDe.trim().length >= 1){cqlList.push("instl_de"+" like "+instlDe);}
	if(adres.trim().length >= 1){cqlList.push("adres"+" like "+adres);}
	if(manageNo.trim().length >=1){cqlList.push("manage_no"+" like "+manageNo);}
	
	var gridList = this;
	const promise = dtmap.wfsGetFeature({
		typeNames: 'tgd_strtlgt_status', //WFS 레이어명
		page : _pageNo+1,
		perPage : 100,
		sortBy : 'gid',
		sortOrder : 'DESC',
		filter : cqlList
	});

	promise.then(function(data){
		toastr.success("지도 BBOX 이동");
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
//가로등관리 등록페이지 열기
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

//가로등관리 상세페이지
function fn_pageDetail(gid){

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
				toastr.success("단일 선택 POI 하이라트 및 지도이동");
				$("#rightSubPopup").append(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}
	});
}

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


//가로등엑셀다운로드 버튼
$("#lampExcelDownload").on("click", function(){
	let formName = this.dataset.formName;
	document.getElementById("searchForm").instlDe.value = lastEmdKorNm;
	document.getElementById("searchForm").adres.value = lastAllvlBsrckSeSearch;
	document.getElementById("searchForm").manageNo.value = lastPrposSeSearch;
	
	let url = '/job/sffm/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;');
	$("form[name='"+ formName + "']").attr('action', '');
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