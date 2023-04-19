SEARCHOBJ= null;

$(document.body).ready(function () {
	initGrid();
    setData(0);
    //레이어 선택 핸들러
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
	// var adres = $("#emdKorNm").val();
	// var manage_se = $("#manageSeSearch").val();
	// var detail_prpos_se = $("#detailPrposSeSearch").val();
	// var fclts_sttus = $("#fcltsSttusSearch").val();

	var adres='', manage_se='', detail_prpos_se='', fclts_sttus='';

	if(SEARCHOBJ != null){
		adres = SEARCHOBJ.searchEmdKorNm;
		manage_se = SEARCHOBJ.searchManageSeSearch;
		detail_prpos_se = SEARCHOBJ.searchDetailPrposSeSearch;
		fclts_sttus = SEARCHOBJ.searchFcltsSttusSearch;

	}
	
	var cqlList = [];
	
	if(adres!=''){cqlList.push("adres like "+adres+" ")}
	if(manage_se!=''){cqlList.push("manage_se = "+manage_se+" ")}
	if(detail_prpos_se!=''){cqlList.push("detail_prpos_se = "+detail_prpos_se+" ")}
	if(fclts_sttus!=''){cqlList.push("fclts_sttus = "+fclts_sttus+" ")}
	
	var gridList =this;
	const promise = dtmap.wfsGetFeature({
		typeNames: 'tgd_agr_public_tbwll', //WFS 레이어명
		page  : _pageNo+1,
		perPage : 100,
		filter : cqlList
	});
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
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").manageSeSearch.value = lastManageSeSearch;
	document.getElementById("searchForm").detailPrposSeSearch.value = lastDetailPrposSeSearch;
	document.getElementById("searchForm").fcltsSttusSearch.value = lastFcltsSttusSearch;
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

//농업용공공관정 검색조회
function fn_search_List(){
	SEARCHOBJ = {};

	SEARCHOBJ.searchEmdKorNm= $('#emdKorNm').val() || '';
	SEARCHOBJ.searchManageSeSearch = $('#manageSeSearch').val() || '';
	SEARCHOBJ.searchDetailPrposSeSearch = $('#detailPrposSeSearch').val() || '';
	SEARCHOBJ.searchFcltsSttusSearch = $('#fcltsSttusSearch').val() || '';
}

//레이어 선택 상세보기
function spaceClickListener(e){
	var gid ;
	if (dtmap.mod === '3D'){
		gid=e.properties.gid;
	}else{
		gid=e.property.gid;
	}
    fn_pageDetail(gid);
    dtmap.vector.select(e.id);
}