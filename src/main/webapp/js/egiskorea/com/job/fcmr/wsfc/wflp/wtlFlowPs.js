/**
 * - 업무 / 시설관리 / 상수도 시설 / 유량계
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlFlowPs.js");
	console.log("유량계");
});

// 유량계 목록 화면 조회
function selectWtlFlowPsListView(){
	console.log("selectWtlFlowPsListView()");
	
	// 목록 화면 조회
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlFlowListView.do", function () {
    	/* 토스트 메시지 start */
        toastr.success("/job/fcmr/wsfc/selectWtlFlowListView.do", "페이지🙂호🙂출🙂");
        /* 토스트 메시지 end */
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        // 옵션 값 세팅
		getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동		
		getCmmCodeData("OGC-141", "#lSrchOptions select[name=gag_cde]");	//유량계종류	
		getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//유량계형식	
		
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
	            //{key: "gid", 				label: "아이디",			width:200},
	            {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
	            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
	            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
	            {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
	            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
	            {key: "mng_cde", 			label: "관리기관code",		width:'*'},
	            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
	            {key: "sht_num", 			label: "도엽번호",			width:'*'},
	            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
	            {key: "gag_cde", 			label: "유량계종류code",	width:'*'},
	            {key: "gag_cde_nm", 		label: "유량계종류",		width:'*'},
	            {key: "mof_cde", 			label: "유량계형식code",	width:'*'},
	            {key: "mof_cde_nm", 		label: "유량계형식",		width:'*'},
	            {key: "std_dip", 			label: "관경",			width:'*'},
	            //{key: "prc_nam", 			label: "제작회사명",		width:100},
	            //{key: "pip_cde", 			label: "관로지형지물부호",	width:100},
	            //{key: "pip_idn", 			label: "관로관리번호",		width:100},
	            //{key: "cnt_num", 			label: "공사번호",			width:100},
	            //{key: "sys_chk", 			label: "대장초기화여부",	width:100},
	            //{key: "ang_dir", 			label: "방향각",			width:100},
	            //{key: "geom", 			label: "공간정보",			width:100}
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
	            	selectWtlFlowPsList(this.page.selectPage+1);
	            }
	        },
	        body: {
	        	// 데이터 행의 click 이벤트를 정의
	        	onClick: function () {
	        		getWtlFlowPsDetail(this.item);	// 유량계 상세 페이지 로드
	            }
	        }
			
		});
        
    	// 목록 조회  - 1 page
		selectWtlFlowPsList(1);
		
		ui.loadingBar("hide");
    });
	
}

// 유량계 목록 조회
function selectWtlFlowPsList(page) {
//	console.log("selectWtlFlowPsList(page)");
//	console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const gag_cde 		=	$("#lSrchOptions select[name=gag_cde]").val();				//유량계종류
	const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//유량계형식
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + " = " + hjd_cde+"00"); 
	}
	
	if(gag_cde){
		filters.push("gag_cde" + " = " + gag_cde); 
	}
	
	if(mof_cde){
		filters.push("mof_cde" + " = " + mof_cde);
	}
	
    var options;
    options = {
            typeNames	: 'wtl_flow_ps' + "",
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
        	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("SA-001", ftr_cde);
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("tgd_scco_emd", hjd_cde);
        	
        	//유량계 종류 코드 변경
        	var gag_cde = data.features[i].properties.gag_cde;
        	data.features[i].properties.gag_cde_nm = getCmmCodeDataArray("OGC-141", gag_cde);
        	
        	//유량계 형식 코드 변경
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-041", mof_cde);
            
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

//소방시설 상세정보 조회
function getWtlFlowPsDetail(detailData){
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
		url:"/job/fcmr/wsfc/getWtlFlowPsDetail.do",
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

// 유량계 등록 화면 조회
function insertWtlFlowPsView(){
	console.log("insertWtlFlowPsView()");
	
	ui.loadingBar("show");
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlFlowPsView.do", function () {
        toastr.success("/job/fcmr/wsfc/insertWtlFlowPsView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
		
		ui.loadingBar("hide");
    });
	
}

//유량계 수정 화면 조회
function updateWtlFlowPsView(){

			/* 유량계 상세페이지에 들어갈 내용 start */
			let tag = ``;
			/* 유량계 상세페이지에 들어갈 내용 end */
			
		    const element = $(tag);				// container에 삽입할 요소
			
		    // 팝업 변수 설정
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			
			/* 팝업 load 함수 start */
		    $(container).load("/job/fcmr/wsfc/updateWtlFlowPsView.do", function () {
		    	getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동
		    	getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
				getCmmCodeData("OGC-141", "#lSrchOptions select[name=gag_cde]");	//유량계종류	
				getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//유량계형식
		    	
				$(container).append(element);	// container에 요소 추가하기
		    });
		    /* 팝업 load 함수 end */
}