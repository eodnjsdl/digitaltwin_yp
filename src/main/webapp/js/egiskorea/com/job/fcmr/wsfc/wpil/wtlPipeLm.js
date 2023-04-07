/**
 * - 업무 / 시설관리 / 상수도 시설 / 상수관로
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlPipeLm.js");
	console.log("상수관로");
});

// 상수관로 목록 화면 조회
function selectWtlPipeLmListView(){
	console.log("selectWtlPipeLmListView()");
	
	// 목록 화면 조회
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlPipeListView.do", function () {
    	/* 토스트 메시지 start */
        toastr.success("/job/fcmr/wsfc/selectWtlPipeListView.do", "페이지🙂호🙂출🙂");
        /* 토스트 메시지 end */
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        // 옵션 값 세팅
		getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동		
		getCmmCodeData("OGC-004", "#lSrchOptions select[name=saa_cde]");	//관용도	
		getCmmCodeData("OGC-003", "#lSrchOptions select[name=mop_cde]");	//관재질
		
		// grid 기본 세팅
		var $container = $("#container");
	    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]')
	    $target.css('height', 'inherit');
		
	    baseGrid = null;	//ax5uigrid 전역 변수 
	    
		baseGrid = new ax5.ui.grid();
		
		baseGrid.setConfig({
			target:  $target,
	        sortable: true,
	        multipleSelect: false,
	        columns: [
//	            {key: "gid", 				label: "아이디",			width:200},
//	            {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
	            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
	            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
//	            {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
	            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
	            {key: "mng_cde", 			label: "관리기관code",		width:'*'},
	            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
	            {key: "sht_num", 			label: "도엽번호",			width:'*'},
	            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
//	            {key: "saa_cde", 			label: "관용도code",		width:'*'},
	            {key: "saa_cde_nm", 		label: "관용도",			width:'*'},
//	            {key: "mop_cde", 			label: "관재질code",		width:'*'},
	            {key: "mop_cde_nm", 		label: "관재질",			width:'*'},
	            {key: "std_dip", 			label: "관경",			width:'*'},
	            {key: "byc_len", 			label: "연장",			width:'*'},
	            {key: "jht_cde", 			label: "접합종류code",		width:'*'},
	            {key: "jht_cde_nm", 		label: "접합종류",			width:'*'},
//	            {key: "low_dep", 			label: "최저깊이",			width:100},
//	            {key: "hgh_dep", 			label: "최고깊이",			width:100},
//	            {key: "cnt_num", 			label: "공사번호",			width:100},
//	            {key: "sys_chk", 			label: "대장초기화여부",	width:100},
//	            {key: "pip_lbl", 			label: "관라벨",			width:100},
//	            {key: "iqt_cde", 			label: "탐사구분",			width:100},
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
	            	selectWtlPipeLmList(this.page.selectPage+1);
	            }
	        },
	        body: {
	        	// 데이터 행의 click 이벤트를 정의
	        	onClick: function () {
	        		getWtlPipeLmDetail(this.item);	// 상수관로 상세 페이지 로드
	            }
	        }
			
		});
        
    	// 목록 조회  - 1 page
		selectWtlPipeLmList(1);
		
		ui.loadingBar("hide");
    });
	
}

// 상수관로 목록 조회
function selectWtlPipeLmList(page) {
//	console.log("selectWtlPipeLmList(page)");
//	console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const saa_cde 		=	$("#lSrchOptions select[name=saa_cde]").val();				//관용도
	const mop_cde 		=	$("#lSrchOptions select[name=mop_cde]").val();				//관재질
	const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
	const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + " = " + hjd_cde+"00"); 
	}
	
	if(saa_cde){
		filters.push("saa_cde" + " = " + saa_cde);
	}
	
	if(mop_cde){
		filters.push("mop_cde" + " = " + mop_cde);
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
            typeNames	: 'wtl_pipe_lm' + "",
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
        	data.features[i].properties.ftr_cde_nm = "상수관로";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("tgd_scco_emd", hjd_cde);
        	
        	//관용도 코드 변경
        	var saa_cde = data.features[i].properties.saa_cde;
        	data.features[i].properties.saa_cde_nm = getCmmCodeDataArray("OGC-004", saa_cde);
        	
        	//관재질 코드 변경
        	var mop_cde = data.features[i].properties.mop_cde;
        	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);
            
            //좌표 처리
        	var geomType 	= data.features[i].geometry.type;
        	var geomCoord	= data.features[i].geometry.coordinates[0]+" "+data.features[i].geometry.coordinates[1];
        	
        	var dd = geomType+"("+ geomCoord +")";
        	//list.push(data.features[i].geometry_name, geomType+"("+ geomCoord +")" );
        	data.features[i].properties.geom = geomType+"("+ geomCoord +")";
        	//data.features[i].properties.geom = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
       
        baseGrid.setData(
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

// 상수관로 상세정보 조회
function getWtlPipeLmDetail(detailData){
	console.log("getWtlFlowPsDetail(detailData)");
	console.log(detailData);

	ui.loadingBar("show");
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}

	$.ajax({
		url:"/job/fcmr/wsfc/getWtlPipeLmDetail.do",
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

// 상수관로 등록 화면 조회
function insertWtlPipeLmView(){
	// 팝업 변수 설정
	ui.loadingBar("show");
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
	
	/* 팝업 load 함수 start */
    $(container).load("/job/fcmr/wsfc/insertWtlPipeLmView.do", function () {
    	getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동
    	getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
		getCmmCodeData("OGC-004", "#lSrchOptions select[name=saa_cde]");	//관용도	
		getCmmCodeData("OGC-003", "#lSrchOptions select[name=mop_cde]");	//관재질
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
		ui.loadingBar("hide");
    });
    /* 팝업 load 함수 end */
}

// 상수관로 수정 화면 조회
function updateWtlPipeLmView(){
    // 팝업 변수 설정
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
	
	/* 팝업 load 함수 start */
    $(container).load("/job/fcmr/wsfc/updateWtlPipeLmView.do", function () {
		
	    getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동
	    getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
		getCmmCodeData("OGC-004", "#lSrchOptions select[name=saa_cde]");	//관용도	
		getCmmCodeData("OGC-003", "#lSrchOptions select[name=mop_cde]");	//관재질
	    
    });
    /* 팝업 load 함수 end */
}