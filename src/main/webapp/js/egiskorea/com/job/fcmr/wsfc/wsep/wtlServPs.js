/**
 * - 업무 / 시설관리 / 상수도 시설 / 배수지
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlServPs.js");
	console.log("배수지");
});

// 배수지 목록 화면 조회
function selectWtlServPsListView(){
	console.log("selectWtlServPsListView()");
	
	// 목록 화면 조회
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlServPsListView.do", function () {
    	/* 토스트 메시지 start */
        toastr.success("/job/fcmr/wsfc/selectWtlServPsListView.do", "페이지🙂호🙂출🙂");
        /* 토스트 메시지 end */
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        // 옵션 값 세팅
        getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-001", "#lSrchOptions select[name=sag_cde]");	//관리방법	
        getCmmCodeData("OGC-134", "#lSrchOptions select[name=scw_cde]");	//배수지제어방법
		
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
//	            {key: "gid", 				label: "아이디",			width:'*'},
//	            {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
//	            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
	            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
//	            {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
	            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//	            {key: "mng_cde", 			label: "관리기관code",		width:'*'},
	            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
	            {key: "fns_ymd", 			label: "준공일자",			width:'*'},
	            {key: "srv_nam", 			label: "배수지명",			width:'*'},
	            {key: "pur_nam", 			label: "정수장명",			width:'*'},
	            {key: "gai_ara", 			label: "부지면적",			width:'*'},
//	            {key: "sag_cde", 			label: "관리방법code",		width:'*'},
//	            {key: "sag_cde_nm", 		label: "관리방법",			width:'*'},
//	            {key: "srv_vol", 			label: "시설용량",			width:'*'},
//	            {key: "hgh_wal", 			label: "최고수위",			width:'*'},
	            {key: "low_wal", 			label: "최저수위",			width:'*'},
//	            {key: "isr_vol", 			label: "배수지유입량",		width:'*'},
//	            {key: "sup_are", 			label: "급수지역",			width:'*'},
	            {key: "sup_pop", 			label: "급수인구",			width:'*'},
	            {key: "scw_cde", 			label: "배수지제어방법code",width:'*'},
	            {key: "scw_cde_nm", 		label: "배수지제어방법",	width:'*'},
//	            {key: "cnt_num", 			label: "공사번호",			width:'*'},
//	            {key: "sys_chk", 			label: "대장초기화여부",	width:'*'},
//	            {key: "org_idn", 			label: "기관관리번호",		width:'*'},
//	            {key: "geom", 				label: "공간정보",			width:'*'}
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
	            	selectWtlServPsList(this.page.selectPage+1);
	            }
	        },
	        body: {
	        	// 데이터 행의 click 이벤트를 정의
	        	onClick: function () {
	        		selectWtlServPsDetail(this.item);	// 배수지 상세 페이지 로드
	            }
	        }
			
		});
        
    	// 목록 조회  - 1 page
		selectWtlServPsList(1);
		
		ui.loadingBar("hide");
    });
	
}

// 배수지 목록 조회
function selectWtlServPsList(page) {
//	console.log("selectWtlServPsList(page)");
//	console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const srv_nam 		=	$("#lSrchOptions select[name=srv_nam]").val();				//배수지명
	const sag_cde 		=	$("#lSrchOptions select[name=sag_cde]").val();				//관리방법
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + " = " + hjd_cde); 
	}

	if(srv_nam){
		filters.push("srv_nam" + " = " + srv_nam);
	}
	
	if(sag_cde){
		filters.push("sag_cde" + " = " + sag_cde);
	}
	
    var options;
    options = {
            typeNames	: 'wtl_serv_ps' + "",
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
        	data.features[i].properties.ftr_cde_nm = "배수지";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//배수지종류 코드 변경
        	var sag_cde = data.features[i].properties.sag_cde;
        	data.features[i].properties.sag_cde_nm = getCmmCodeDataArray("OGC-001", sag_cde);
        	
        	//배수지형식 코드 변경
        	var scw_cde = data.features[i].properties.scw_cde;
        	data.features[i].properties.scw_cde_nm = getCmmCodeDataArray("OGC-134", scw_cde);
            
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

// 배수지 상세정보 조회
function selectWtlServPsDetail(detailData){
	console.log("getWtlServPsDetail(detailData)");
	console.log(detailData);

	ui.loadingBar("show");
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}

	$.ajax({
		url:"/job/fcmr/wsfc/selectWtlServPsDetail.do",
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

// 배수지 등록 화면 조회
function insertWtlServPsView(){
	console.log("insertWtlServPsView()");
	
	// 팝업 변수 설정
	ui.loadingBar("show");
	$("#rightSubPopup").addClass("div-failcity-detail");
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
	
	/* 팝업 load 함수 start */
    $(container).load("/job/fcmr/wsfc/insertWtlServPsView.do", function () {
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-001", "#lSrchOptions select[name=sag_cde]");	//관리방법
        getCmmCodeData("OGC-134", "#lSrchOptions select[name=scw_cde]");	//배수지제어방법
        
		ui.loadingBar("hide");
    });
    /* 팝업 load 함수 end */
}

// 배수지 수정 화면 조회
function updateWtlServPsView(id){
	console.log("updateWtlServPsView()");
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
		alert("배수지 상세보기 오류");
		return false;
	}
    
    var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외, 여기서 id 값 까지 포함 되서 파라미터 완성
			formData.append(key, detailData[key]);
		}
	}
	
	$.ajax({
		url:"/job/fcmr/wsfc/updateWtlServPsView.do",
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