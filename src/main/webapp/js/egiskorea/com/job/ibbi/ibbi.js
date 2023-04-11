$(document.body).ready(function () {
	initGrid();
    setData(0);       
});
//관내업소정보조회 기본 틀 추가
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
            	fn_pageDetail(this.item.no);
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
        	{key: "opnn_svc_nm", label: "업소구분"},
        	{key: "mng_no", label: "관리번호"},
        	{key: "bplc_nm", label: "사업장명"},
        	{key: "bsn_stae_nm", label: "영업상태"},
        	{key: "bizc_se_nm", label: "업태구분명"},
        	{key: "lc_zip", label: "소재지 우편번호"},
        	{key: "lc_all_adr", label: "소재지 주소"},
        	{key: "rdn_zip", label: "도로명 우편번호"},
        	{key: "rdn_all_adr", label: "도로명 주소"}
    	],
    });
}
//관내업소정보조회 조회 기능
function setData(_pageNo){
	var lc_all_adr = $("#emdKorNm").val();
	var opnn_svc_nm = $("#opnnSvcNmSearch").val();
	var bplc_nm = $("#bplcNmSearch").val();
	
	var cqlList = [];

	if(lc_all_adr!=''){cqlList.push("lc_all_adr like "+lc_all_adr+" ")}
	if(opnn_svc_nm!=''){cqlList.push("opnn_svc_nm = "+opnn_svc_nm+" ")}
	if(bplc_nm!=''){cqlList.push("bplc_nm like "+bplc_nm+" ")}
	
	var gridList =this;	
	const promise = dtmap.wfsGetFeature({
		typeNames: 'yp_bssh_info', //WFS 레이어명
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
		            src: '/images/poi/faciRese_poi.png'
		            },
		            label: {
		                text: properties.bplc_nm
		            }
		        }
		});
		dtmap.vector.fit();
	  })
}
//관내업소정보조회 상세보기
function fn_pageDetail(no){
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";

	var formData = new FormData();
	if(no != ''){
		formData.append('no', no);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/ibbi/selectInBusinessEstaInfo.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				toastr.success("단일 선택 POI 하이라트 및 지도이동");
				$("#rightSubPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}
	});
}
//관내업소정보조회 엑셀다운로드
$("#ibbiExcelDownload").on("click", function(){
	let formName = this.dataset.formName;
	document.getElementById("searchForm").emdKorNm.value = lastEmdKorNm;
	document.getElementById("searchForm").opnnSvcNmSearch.value = lastOpnnSvcNmSearch;
	document.getElementById("searchForm").bplcNmSearch.value = lastBplcNmSearch;
	document.getElementById("searchForm").spitalSearch.value = lastSpitalSearch;
	document.getElementById("searchForm").bufferCnt.value = lastBufferCnt;
	
	let url = '/job/ibbi/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;'); 
	$("form[name='"+ formName + "']").attr('action', '');
});