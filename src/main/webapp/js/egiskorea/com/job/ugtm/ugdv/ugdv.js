/**
 * 지하수관리 > 지하수개발 js
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
//지하수개발 기본 틀 추가
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

//지하수개발 조회기능
function setData(_pageNo){
	
	options={
		typeNames: 'tgd_ugrwtr_devlop', //WFS 레이어명
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
        const type 		= $parent.find('input[name="underWaterDevelopSelect"]:checked').val();
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
		            src: '/images/poi/underWaterDevelop_poi.png'
		            },
		            label: {
		                text: properties.detail_prpos_se
		            }
		        }
		});
		dtmap.vector.fit();
  })
}
//지하수개발 등록페이지 열기
function fn_insert(){
	ui.openPopup("rightSubPopup");
	$.ajax({
		type : "POST",
		url : "/job/ugtm/insertUnderWaterDevelopView.do",
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
//지하수개발 상세페이지 열기
function fn_pageDetail(gid){
	dtmap.vector.clearSelect(); 
	dtmap.vector.select('tgd_ugrwtr_devlop.'+gid);
	ui.openPopup("rightSubPopup");
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterDevelop.do",
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
//지하수개발 상세 > 수정페이지 열기
function fn_update(gid){
	$("#rightSubPopup").empty();
	
	var formData = new FormData();
	if(gid != ''){
		formData.append('gid', gid);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ugtm/updateUnderWaterDevelopView.do",
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
//지하수개발 엑셀다운로드 버튼
$("#ugdvExcelDownload").on("click", function(){
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").allvlBsrckSeSearch.value = lastAllvlBsrckSeSearch;
	document.getElementById("searchForm").prposSeSearch.value = lastPrposSeSearch;
	document.getElementById("searchForm").detailPrposSeSearch.value = lastDetailPrposSeSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	let url = '/job/ugtm/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;');
	$("form[name='"+ formName + "']").attr('action', '');
});

//지도에서 선택 _ 주소 및 경위도 위치 가져오기
function fn_getLocation() {
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
}


//지하수개발 검색조회
function fn_search_List(){
	SEARCHOBJ.propertySearch = null;
	SEARCHOBJ.spaceSearch = null;

	if($('#ugdv-prop').hasClass('on')){

		SEARCHOBJ.propertySearch = {};
		SEARCHOBJ.propertySearch.searchEmdKorNm= $('#emdKorNm').val() || '';
		SEARCHOBJ.propertySearch.searchAllvlBsrckSeSearch= $('#allvlBsrckSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchPrposSeSearch = $('#prposSeSearch').val() || '';
		SEARCHOBJ.propertySearch.searchDetailPrposSeSearch = $('#detailPrposSeSearch').val() || '';

	}else if($('#ugdv-space').hasClass('on')){
		SEARCHOBJ.spaceSearch = {};
		const $parent = $('#bottomPopup').find('.search-area')
		const type = $parent.find('input[name="underWaterDevelopSelect"]:checked').val();
		
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
