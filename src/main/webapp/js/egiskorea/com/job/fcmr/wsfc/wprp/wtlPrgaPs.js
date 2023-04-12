/**
 * - 업무 / 시설관리 / 상수도 시설 / 수압계
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlPrgaPs.js");
	console.log("수압계");
});

// 수압계 목록 화면 조회
function selectWtlPrgaPsListView(){
	console.log("selectWtlPrgaPsListView()");
	
	// 목록 화면 조회
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlPrgaPsListView.do", function () {
    	/* 토스트 메시지 start */
        toastr.success("/job/fcmr/wsfc/selectWtlPrgaPsListView.do", "페이지🙂호🙂출🙂");
        /* 토스트 메시지 end */
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        // 옵션 값 세팅
        getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-137", "#lSrchOptions select[name=pga_cde]");	//수압계종류	
        getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//수압계형식
		
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
//	            {key: "pga_cde", 			label: "수압계종류code",	width:'*'},
	            {key: "pga_cde_nm", 		label: "수압계종류",		width:'*'},
//	            {key: "mof_cde", 			label: "수압계형식code",	width:'*'},
	            {key: "mof_cde_nm", 		label: "수압계형식",		width:'*'},
	            {key: "std_dip", 			label: "관경",			width:'*'},
//	            {key: "std_saf", 			label: "기준압력",			width:'*'},
//	            {key: "avg_saf", 			label: "평균압력",			width:'*'},
//	            {key: "msr_saf", 			label: "측정압력",			width:'*'},
	            {key: "srv_dip", 			label: "배수관_관경",		width:'*'},
//	            {key: "prc_nam", 			label: "제작회사명",		width:'*'},
//	            {key: "pip_cde", 			label: "관로지형지물부호",	width:'*'},
	            {key: "pip_idn", 			label: "관로관리번호",		width:'*'},
//	            {key: "cnt_num", 			label: "공사번호",			width:100},
//	            {key: "sys_chk", 			label: "대장초기화여부",	width:100},
//	            {key: "ang_dir", 			label: "방향각",			width:100},
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
	            	selectWtlPrgaPsList(this.page.selectPage+1);
	            }
	        },
	        body: {
	        	// 데이터 행의 click 이벤트를 정의
	        	onClick: function () {
	        		selectWtlPrgaPsDetail(this.item);	// 수압계 상세 페이지 로드
	            }
	        }
			
		});
        
    	// 목록 조회  - 1 page
		selectWtlPrgaPsList(1);
		
		ui.loadingBar("hide");
    });
	
}

// 수압계 목록 조회
function selectWtlPrgaPsList(page) {
//	console.log("selectWtlPrgaPsList(page)");
//	console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const pga_cde 		=	$("#lSrchOptions select[name=pga_cde]").val();				//수압계종류
	const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//수압계형식
	const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
	const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + " = " + hjd_cde); 
	}

	if(pga_cde){
		filters.push("pga_cde" + " = " + pga_cde);
	}
	
	if(mof_cde){
		filters.push("mof_cde" + " = " + mof_cde);
	}
	
	if(std_dip_min && std_dip_max){
		//filters.push("std_dip" + " BETWEEN " + std_dip_min +" AND " + std_dip_max);
		filters.push("std_dip" + " >= " + std_dip_min);
		filters.push("std_dip" + " <= " + std_dip_max);
	}else if(std_dip_min){
		filters.push("std_dip" + " >= " + std_dip_min);
	}else if(std_dip_max){
		filters.push("std_dip" + " <= " + std_dip_max);
	}
	
    var options;
    options = {
            typeNames	: 'wtl_prga_ps' + "",
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
        	data.features[i].properties.ftr_cde_nm = "수압계";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//수압계종류 코드 변경
        	var pga_cde = data.features[i].properties.pga_cde;
        	data.features[i].properties.pga_cde_nm = getCmmCodeDataArray("OGC-137", pga_cde);
        	
        	//수압계형식 코드 변경
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-041", mof_cde);
            
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

// 수압계 상세정보 조회
function selectWtlPrgaPsDetail(detailData){
	console.log("getWtlPrgaPsDetail(detailData)");
	console.log(detailData);

	ui.loadingBar("show");
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}

	$.ajax({
		url:"/job/fcmr/wsfc/selectWtlPrgaPsDetail.do",
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

// 수압계 등록 화면 조회
function insertWtlPrgaPsView(){
	console.log("insertWtlPrgaPsView()");
	
	// 팝업 변수 설정
	ui.loadingBar("show");
	$("#rightSubPopup").addClass("div-failcity-detail");
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
	
	/* 팝업 load 함수 start */
    $(container).load("/job/fcmr/wsfc/insertWtlPrgaPsView.do", function () {
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-137", "#lSrchOptions select[name=pga_cde]");	//수압계종류
        getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//수압계형식
        
		ui.loadingBar("hide");
    });
    /* 팝업 load 함수 end */
}

// 수압계 수정 화면 조회
function updateWtlPrgaPsView(id){
	console.log("updateWtlPrgaPsView()");
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
		alert("수압계 상세보기 오류");
		return false;
	}
    
    var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외, 여기서 id 값 까지 포함 되서 파라미터 완성
			formData.append(key, detailData[key]);
		}
	}
	
	$.ajax({
		url:"/job/fcmr/wsfc/updateWtlPrgaPsView.do",
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