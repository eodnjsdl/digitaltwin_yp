/**
 * 안전시설물관리 > cctv 관리 js
 */
$(document.body).ready(function(){
	getCode('', 'search');
	initGrid();
	setData();
	
})

function getCode(value, type){
	
	$.ajax({
		url:"/job/cctv/getCode.do",
		type: "POST",
		dataType: 'json',
		success:function(result) {
			var data = result.resultList;
			var html = '';
			
			for(i=0; i<data.length; i++) {
				html += '<option value='+ data[i].codeNm +'>'+ data[i].codeNm +'</option>';
			}
			if(type == 'search') {
				$("#cctv-search-selbox").append(html);
			} else {
				$("#cctv-insert-selbox").html(html);
			} 
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
	var selbox = $('#cctv-search-selbox').val() || '';
	var deviceid = $('#cctv-search-deviceid').val() || '';
	var label = $('#cctv-search-label').val() || '';

	/*return new ol.format.filter.and( new ol.format.filter.like('label', `*${data.cctvSearchLabel}*`)
	, new ol.format.filter.like('deviceid', `*${data.cctvSearchDeviceid}*`)
	, new ol.format.filter.like('gbn', `*${data.cctvSearchSelbox}*`));*/

	var cqlList = [];
	if(selbox.trim().length >=1){cqlList.push("gbn like "+selbox+" ");}
	if(deviceid.trim().length >=1){cqlList.push("deviceid like "+deviceid+" ");}
	if(label.trim().length >=1){cqlList.push("label like "+label+" ");}

	var gridList = this;
	const promise = dtmap.wfsGetFeature({
		typeNames: 'tgd_cctv_status_new', //WFS 레이어명
		page : (_pageNo||0)+1,
		perPage : 100,
		filter : cqlList
	});

	promise.then(function(data){
		$("#bottomPopup").find(".bbs-list-num strong").text(data.totalFeatures);

		toastr.success("페이징된 POI 추가 및 지도 BBOX 이동");
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
		            src: '/images/poi/street_lamp.png'
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
//cctv관리 상세페이지 열기
function fn_pageDetail(gid){


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

