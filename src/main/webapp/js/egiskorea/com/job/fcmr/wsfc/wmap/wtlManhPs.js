/**
 * - 업무 / 시설관리 / 상수도 시설 / 상수맨홀
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlManhPs.js");
	console.log("상수맨홀");
});

// 상수맨홀 목록 화면 조회
function selectWtlManhPsListView(){
	console.log("selectWtlManhPsListView()");
	
	// 목록 화면 조회
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlManhPsListView.do", function () {
    	/* 토스트 메시지 start */
        toastr.success("/job/fcmr/wsfc/selectWtlManhPsListView.do", "페이지🙂호🙂출🙂");
        /* 토스트 메시지 end */
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        // 옵션 값 세팅
        getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-002", "#lSrchOptions select[name=som_cde]");	//맨홀종류	
        getCmmCodeData("OGC-006", "#lSrchOptions select[name=mhs_std]");	//맨홀형태	
		
		// grid 기본 세팅
		var $container = $("#container");
	    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]')
	    $target.css('height', 'inherit');
		
	    FACILITY.Ax5UiGrid = null;	//ax5uigrid 전역 변수 
	    
	    FACILITY.Ax5UiGrid = new ax5.ui.grid();
		
	    FACILITY.Ax5UiGrid.setConfig({
			target:  $target,
	        sortable: true,
	        multipleSelect: false,
	        columns: [
//	            {key: "gid", 				label: "아이디",			width:200},
//	            {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
//	            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
	            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
//	            {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
	            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//	            {key: "sht_num", 			label: "도엽번호",			width:'*'},
//	            {key: "mng_cde", 			label: "관리기관code",		width:'*'},
	            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
	            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
	            {key: "dpg_std", 			label: "규격",			width:'*'},
//	            {key: "som_cde", 			label: "맨홀종류code",		width:'*'},
	            {key: "som_cde_nm", 		label: "맨홀종류",			width:'*'},
//	            {key: "mhs_cde", 			label: "맨홀형태code",		width:'*'},
	            {key: "mhs_cde_nm", 		label: "맨홀형태",			width:'*'},
//	            {key: "cnt_num", 			label: "공사번호",			width:100},
//	            {key: "sys_chk", 			label: "대장초기화여부",	width:100},
	            {key: "ang_dir", 			label: "방향각",			width:100},
//	            {key: "org_idn", 			label: "기관관리번호",		width:100},
//	            {key: "geom", 				label: "공간정보",			width:100}
	        ],
	        page: {
	            navigationItemCount: 10,
	            height: 30,
	            display: true,
	            firstIcon: '|<',
	            prevIcon: '<',
	            nextIcon: '>',
	            lastIcon: '>|',
	            onChange: function () {
	            	selectWtlManhPsList(this.page.selectPage+1);
	            }
	        },
	        body: {
	        	// 데이터 행의 click 이벤트를 정의
	        	onClick: function () {
	        		selectWtlManhPsDetail(this.item);	// 상수맨홀 상세 페이지 로드
	            }
	        }
			
		});
        
    	// 목록 조회  - 1 page
		selectWtlManhPsList(1);
		
		ui.loadingBar("hide");
    });
	
}

// 상수맨홀 목록 조회
function selectWtlManhPsList(page) {
//	console.log("selectWtlManhPsList(page)");
//	console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const dpg_std 		=	$("#lSrchOptions input[name=dpg_std]").val();				//규격
	const som_cde 		=	$("#lSrchOptions select[name=som_cde]").val();				//맨홀종류
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + " = " + hjd_cde); 
	}

	if(dpg_std){
		filters.push("dpg_std" + " = " + dpg_std);
	}
	
	if(som_cde){
		filters.push("som_cde" + " = " + som_cde);
	}
	
    var options;
    options = {
            typeNames	: 'wtl_manh_ps' + "",
            filter 		: filters,
            perPage 	: 10,
            page 		: page
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
        // 그리드 데이터 전처리
        const list = [];

        var total = data.totalFeatures;
        var totalPages = Math.ceil(total/10);
        
        // 총합 화면 처리
        if(total>0){
        	$("#bottomPopup .bbs-list-num").html("조회결과:"+total+"건");
        }
        
        //데이터 코드 변환
        for (let i = 0; i < data.features.length; i++) {
        	
        	//지형지물부호 코드 변경
        	var ftr_cde = data.features[i].properties.ftr_cde;
        	//data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("SA-001", ftr_cde);
        	data.features[i].properties.ftr_cde_nm = "상수맨홀";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//맨홀종류 코드 변경
        	var som_cde = data.features[i].properties.som_cde;
        	data.features[i].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
        	
        	//맨홀형태 코드 변경
        	var mhs_cde = data.features[i].properties.mhs_cde;
        	data.features[i].properties.mhs_cde_nm = getCmmCodeDataArray("OGC-006", mhs_cde);
            
            //좌표 처리
        	/*var geomType 	= data.features[i].geometry.type;
        	var geomCoord	= data.features[i].geometry.coordinates[0]+" "+data.features[i].geometry.coordinates[1];
        	
        	var dd = geomType+"("+ geomCoord +")";
        	data.features[i].properties.geom = geomType+"("+ geomCoord +")"*/;
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
       
        FACILITY.Ax5UiGrid.setData(
        	{	
        		list: list,
        		page: {
        			currentPage : page-1,
        			pageSize:10,
        			totalElements: total,
        			totalPages:totalPages
        		}
        	}	
        );
    });
}

// 상수맨홀 상세정보 조회
function selectWtlManhPsDetail(detailData){
	console.log("getWtlManhPsDetail(detailData)");
	console.log(detailData);

	ui.loadingBar("show");
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}

	$.ajax({
		url:"/job/fcmr/wsfc/selectWtlManhPsDetail.do",
		type: "POST",
		//data: JSON.stringify(detailData),
		data: formData,
		dataType: 'html',
		//contentType: "application/json; charset=utf-8",
		contentType: false,
        processData: false,
		success:function(result) {
			//console.log(result);
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			$(container).html(result);
		}
		,error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		, complete : function(){
			ui.loadingBar("hide");
		}
	});
	
}

// 상수맨홀 등록 화면 조회
function insertWtlManhPsView(){
	console.log("insertWtlManhPsView()");
	
	// 팝업 변수 설정
	ui.loadingBar("show");
	$("#rightSubPopup").addClass("div-failcity-detail");
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
	
	/* 팝업 load 함수 start */
    $(container).load("/job/fcmr/wsfc/insertWtlManhPsView.do", function () {
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-002", "#lSrchOptions select[name=som_cde]");	//맨홀종류	
        getCmmCodeData("OGC-006", "#lSrchOptions select[name=mhs_cde]");	//맨홀형태	
        
		ui.loadingBar("hide");
    });
    /* 팝업 load 함수 end */
}

// 상수맨홀 수정 화면 조회
function updateWtlManhPsView(id){
	console.log("updateWtlManhPsView()");
	console.log("id>"+id);
	
	var detailData = null;
	if( FACILITY.Ax5UiGrid){
		var list =  FACILITY.Ax5UiGrid.list;
		
		for(var i=0; i<list.length; i++){
			if(list[i].id == id){
				detailData = list[i];
			}
		}
	}
	
	if(!detailData && detailData == null){
		alert("상수맨홀 상세보기 오류");
		return false;
	}
    
    var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외, 여기서 id 값 까지 포함 되서 파라미터 완성
			formData.append(key, detailData[key]);
		}
	}
	
	$.ajax({
		url:"/job/fcmr/wsfc/updateWtlManhPsView.do",
		type: "POST",
		//data: JSON.stringify(detailData),
		data: formData,
		dataType: 'html',
		//contentType: "application/json; charset=utf-8",
		contentType: false,
        processData: false,
		success:function(result) {
			//console.log(result);
			
			// 팝업 변수 설정
			$("#rightSubPopup").addClass("div-failcity-detail");	
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			$(container).html(result);
			
		}
		,error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		, complete : function(){
			ui.loadingBar("hide");
		}
	});
}