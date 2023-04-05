$(document.body).ready(function () {
	initGrid();
    setData(0);       
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
	var adres = $("#emdKorNm").val();
	var allvl_bsrck_se = $("#allvlBsrckSeSearch").val();
	var prpos_se = $("#prposSeSearch").val();
	var detail_prpos_se = $("#detailPrposSeSearch").val();
	
	var cqlList = [];
	
	if(adres!=''){cqlList.push("adres like "+adres+" ")}
	if(allvl_bsrck_se!=''){cqlList.push("allvl_bsrck_se = "+allvl_bsrck_se+" ")}
	if(prpos_se!=''){cqlList.push("prpos_se = "+prpos_se+" ")}
	if(detail_prpos_se!=''){cqlList.push("detail_prpos_se = "+detail_prpos_se+" ")}

	
	var gridList =this;
	const promise = dtmap.wfsGetFeature({
		typeNames: 'tgd_ugrwtr_utlztn_fclty', //WFS 레이어명
		page  : _pageNo+1,
		perPage : 100,
		filter : cqlList
	});
	promise.then(function (data) {
		
		$(".bbs-list-num").empty();
		$(".bbs-list-num").html("조회결과 : <strong>"+data.totalFeatures+"</strong>건");

		toastr.success("페이징된 POI 추가 및 지도 BBOX 이동");
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