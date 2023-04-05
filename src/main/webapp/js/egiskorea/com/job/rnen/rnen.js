$(document.body).ready(function () {
	initGrid();
    setData(0);       
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
	var eqp_lc = $("#emdKorNm").val();
	var bsns_se = $("#bsnsSeSearch").val();
	var prmisn_volm_min = $("#prmisnVolmASearch").val();
	var prmisn_volm_max = $("#prmisnVolmBSearch").val();
	var elcpwstn_nm = $("#elcpwstnNmSearch").val();
	
	var cqlList = [];
	
	if(eqp_lc!=''){cqlList.push("eqp_lc like "+eqp_lc+" ")}
	if(bsns_se!=''){cqlList.push("bsns_se = "+bsns_se+" ")}
	if(prmisn_volm_min!=''){cqlList.push("prmisn_volm > "+prmisn_volm_min+" ")}
	if(prmisn_volm_max!=''){cqlList.push("prmisn_volm < "+prmisn_volm_max+" ")}
	if(elcpwstn_nm!=''){cqlList.push("elcpwstn_nm like "+elcpwstn_nm+" ")}
	
	var gridList =this;
	const promise = dtmap.wfsGetFeature({
		typeNames: 'tgd_elcty_bsns_prmisn', //WFS 레이어명
		page  : _pageNo,
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
				toastr.success("단일 선택 POI 하이라트 및 지도이동");
				$("#rightSubPopup").append(returnData);
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
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").bsnsSeSearch.value = lastBsnsSeSearch;
	document.getElementById("searchForm").prmisnVolmASearch.value = lastPrmisnVolmASearch;
	document.getElementById("searchForm").prmisnVolmBSearch.value = lastPrmisnVolmBSearch;
	document.getElementById("searchForm").elcpwstnNmSearch.value = lastElcpwstnNmSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	let url = '/job/rnen/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;'); 
	$("form[name='"+ formName + "']").attr('action', '');
});