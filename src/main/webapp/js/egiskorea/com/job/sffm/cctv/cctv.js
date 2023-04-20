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

	console.log(SEARCHOBJ);
	
}

//cctv 엑셀다운로드 버튼
$("#cctvExcelDownload").on("click", function(){
	let formName = this.dataset.formName;

	let url = '/job/cctv/' + formName + 'Download.do';
	
	$("form[name='"+ formName + "']").attr('onsubmit', '');
	$("form[name='"+ formName + "']").attr('action', url);
	$("form[name='"+ formName + "']").submit();
	$("form[name='"+ formName + "']").attr('onsubmit', 'fn_select_list(); return false;');
	$("form[name='"+ formName + "']").attr('action', '');
});



