/**
 * - 업무 / 시설관리 / 상수도 시설 / 유량계
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("wtlFlowPs.js");
	//console.log("유량계");
});

//functions

////////////////////
//목록 조회

//유량계 리스트 로드 이후 처리
function wtlFlowPsListProcess(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",
    });
    
    //옵션 값 세팅
	getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
	getCmmCodeData("OGC-141", "#lSrchOptions select[name=gag_cde]");	//유량계종류	
	getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//유량계형식	
	
	//grid 기본 세팅
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
//          {key: "gid", 				label: "아이디",			width:200},
//          {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
//          {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//          {key: "mng_cde", 			label: "관리기관code",		width:'*'},
            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
            {key: "sht_num", 			label: "도엽번호",			width:'*'},
            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
//          {key: "gag_cde", 			label: "유량계종류code",	width:'*'},
            {key: "gag_cde_nm", 		label: "유량계종류",		width:'*'},
//          {key: "mof_cde", 			label: "유량계형식code",	width:'*'},
            {key: "mof_cde_nm", 		label: "유량계형식",		width:'*'},
            {key: "std_dip", 			label: "관경",			width:'*'},
//          {key: "prc_nam", 			label: "제작회사명",		width:100},
//          {key: "pip_cde", 			label: "관로지형지물부호",	width:100},
//          {key: "pip_idn", 			label: "관로관리번호",		width:100},
//          {key: "cnt_num", 			label: "공사번호",			width:100},
//          {key: "sys_chk", 			label: "대장초기화여부",	width:100},
//          {key: "ang_dir", 			label: "방향각",			width:100},
//          {key: "geom", 				label: "공간정보",			width:100}
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
        	onClick: function () {
        		//console.log(this);
        		selectWtlFlowPs(this.item.id);	//유량계 상세 페이지 로드
            }
        }
		
	});
    
	//목록 조회  - 1 page
	selectWtlFlowPsList(1);
	
}


//유량계 목록 조회
function selectWtlFlowPsList(page) {
	//console.log("selectWtlFlowPsList(page)");
	//console.log("page>>>"+page);
	
	//페이지 변수세팅
	if(page){
		$("#wtlFlowPsListPage").val(page);
	}else{
		alert("목록 페이지 오류");
		return false;
	}
	
	////////////////
	//검색 옵션
	
	var options;
	if($(".groundwaterProperty").hasClass("on")){		//속성 검색
		//console.log("속성 검색 조건");
		
		const filters = [];
		
		const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
		const gag_cde 		=	$("#lSrchOptions select[name=gag_cde]").val();				//유량계종류
		const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//유량계형식
		
		let filterString = "";
		
		if(hjd_cde){
			filters.push("hjd_cde" + " = " + hjd_cde); 
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
	        page 		: page,
	        sortBy		: 'gid',
	        sortOrder	: 'DESC'
	    }
		
	}else if($(".groundwaterSpace").hasClass("on")){		//공간 검색
		//console.log("공간 검색 조건")
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
        const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

        options = {
            typeNames: "wtl_flow_ps",
            perPage 	: 10,
	        page 		: page,
	        sortBy		: 'gid',
	        sortOrder	: 'DESC',
        }
        if (type === 'extent') {
        	options.bbox 		= FACILITY.spaceSearchOption.bbox;
        } else {
        	options.geometry 	= FACILITY.spaceSearchOption.geometry;
        }
		
	}else{
		alert("검색창 오류");
	}
	
	////////////////////////
	//조회
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
        //그리드 데이터 전처리
        const list = [];
        
        var total = data.totalFeatures;
        var totalPages = Math.ceil(total/10);
        
        //총합 화면 처리
        if(total>0){
        	$("#bottomPopup .bbs-list-num").html("조회결과:"+total+"건");
        }
        
        //console.log(data.features);
        
        //데이터 코드 변환
        for (let i = 0; i < data.features.length; i++) {
        	
        	//지형지물부호 코드 변경
        	var ftr_cde = data.features[i].properties.ftr_cde;
        	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
        	//data.features[i].properties.ftr_cde_nm = "유량계";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//유량계 종류 코드 변경
        	var gag_cde = data.features[i].properties.gag_cde;
        	data.features[i].properties.gag_cde_nm = getCmmCodeDataArray("OGC-141", gag_cde);
        	
        	//유량계 형식 코드 변경
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-041", mof_cde);
            
            //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        
        ///////////////
        
        //gird 적용
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
        
        ////////////
        //지도 아이콘 작업
        
        dtmap.vector.clear();
        
        //지도에 GeoJSON 추가
        dtmap.vector.readGeoJson(data, function (feature) {

            /**
             * 스타일 콜백 
             */
        	let properties = feature.getProperties();
            let ftr_cde = properties.ftr_cde;
            
            if (ftr_cde == 'SA117' ) {			//유량계
                return {
                    label: {
                        text: ''
                    }
                }
            }
        });

        dtmap.vector.fit();
       
    });
	
}

//////////////
//상세정보 보회

//유량계 상세정보 조회
function selectWtlFlowPs(id){
	//console.log("selectWtlFlowPs(id)");
	//console.log(id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	//console.log(idArray);
	const typeName	= idArray[0];
	
	if(typeName != "wtl_flow_ps"){
		alert("상세보기 오류");
		return false;
	}
	
	const gid 		= idArray[1];	
	if(gid){
		filters.push("gid" + " = " + gid); 
	}else{
		alert("상세보기 오류");
		return false;
	}
	
    var options;
    options = {
        typeNames	: 'wtl_flow_ps' + "",
        filter 		: filters,
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
    	//console.log(data);
    	
    	if(data.features.length != 1){
    		alert("상세보기 오류")
    		return false;
    	}
        	
    	//지형지물부호 코드 변경
    	var ftr_cde = data.features[0].properties.ftr_cde;
    	data.features[0].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
    	//data.features[0].properties.ftr_cde_nm = "유량계";
    	
    	//관리기관 코드 변경
    	var mng_cde = data.features[0].properties.mng_cde;
    	data.features[0].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
    	
    	//읍면동 코드 변경(wfs)
    	var hjd_cde = data.features[0].properties.hjd_cde;
    	data.features[0].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
    	
    	//유량계 종류 코드 변경
    	var gag_cde = data.features[0].properties.gag_cde;
    	data.features[0].properties.gag_cde_nm = getCmmCodeDataArray("OGC-141", gag_cde);
    	
    	//유량계 형식 코드 변경
    	var mof_cde = data.features[0].properties.mof_cde;
    	data.features[0].properties.mof_cde_nm = getCmmCodeDataArray("OGC-041", mof_cde);
        
        //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
    	data.features[0].properties.geomObj = data.features[0].geometry;
    	
    	var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectWtlFlowPsView(detailData);	//상세 페이지에 데이터 전달
    	
    });

}

//상세 정보 페이지 불러 오기
function selectWtlFlowPsView(detailData){
	//console.log("selectWtlFlowPsView(detailData)");
	//console.log(detailData);

	if(!detailData && detailData == null){
		alert("유량계 상세보기 오류");
		return false;
	}
	
	//파라미터 정리
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){				//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}
	
	ui.loadingBar("show");
	
	$.ajax({
		url:"/job/fcmr/wsfc/selectWtlFlowPs.do",
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
			
			dtmap.vector.select(detailData.id);	//지도에  표시
		}
		,error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		, complete : function(){
			ui.loadingBar("hide");
		}
	});
	
}

//////////////
//등록

//유량계 등록 화면 조회
function insertWtlFlowPsView(){
	//console.log("insertWtlFlowPsView()");
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlFlowPsView.do", function () {
        toastr.success("/job/fcmr/wsfc/insertWtlFlowPsView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
       
        getCmmCodeData("YPE001", "#rightSubPopup select[name=hjd_cde]");		//읍면동
        getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-141", "#rightSubPopup select[name=gag_cde]");	//유량계종류	
        getCmmCodeData("OGC-041", "#rightSubPopup select[name=mof_cde]");	//유량계형식
        
		ui.loadingBar("hide");
    });
	
}

//유량계 등록 
function insertWtlFlowPs(){
	//console.log("insertWtlFlowPs()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const ftr_cde = $("#insertWtlFlowPsForm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertWtlFlowPsForm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	const pip_cde = $("#insertWtlFlowPsForm select[name=pip_cde]").val();
	if(pip_cde == "" || pip_cde == null){
		alert("관로지형지물부호는 필수 값입니다.");
		return false;
	}

	////////////
	// 파라미터 작업
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertWtlFlowPsForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertWtlFlowPsForm input[name=geom]").val();
    
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    /*if (geometry.indexOf("multi") >= 0) {
        if (geometry instanceof ol.geom.Point) {
            geometry = new ol.geom.MultiPoint([geometry.getCoordinates()]);
        } else if (geometry instanceof ol.geom.LineString) {
            geometry = new ol.geom.MultiLineString([geometry]);
        } else if (geometry instanceof ol.geom.Polygon) {
            geometry = new ol.geom.MultiPolygon([geometry]);
        }
    }*/
    
    feature.setGeometry(geometry);

    //console.log(feature);
    
    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data = {dataId: "wtl_flow_ps", geojson: geojson};
    
    
    ////////////
    //등록
    
    //등록 시작
    ui.loadingBar("show");
   
    $.post("/job/fcts/insertFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("등록 되었습니다.");
            
            // 검색 후 등록
            var $container = $("#container");
    	    var $target = $container.find('#bottomPopup .facility-select');
    	    $target.trigger("change");
            //selectWtlFlowPsList(1);		//다시 목록 로드
            cancelInsertWtlFlowPs(); 	//창닫기
        } else {
            alert(`등록에 실패했습니다.`);
            console.log(result["errorMsg"]);
        }
        
        ui.loadingBar("hide");
    })
    .fail(() => {
        alert(`등록에 실패했습니다.`);
        ui.loadingBar("hide");
    });
    
}

////////////
//수정

//유량계 수정 화면 조회
function updateWtlFlowPsView(id){
	//console.log("updateWtlFlowPsView()");
	//console.log("id>"+id);

	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if(!detailData && detailData == null){
		alert("유량계 상세보기 오류");
		return false;
	}
    
	//파라미터 처리
    var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외, 여기서 id 값 까지 포함 되서 파라미터 완성
			formData.append(key, detailData[key]);
		}
	}
	
	//화면 조회
	$.ajax({
		url:"/job/fcmr/wsfc/updateWtlFlowPsView.do",
		type: "POST",
		//data: JSON.stringify(detailData),
		data: formData,
		dataType: 'html',
		//contentType: "application/json; charset=utf-8",
		contentType: false,
        processData: false,
		success:function(result) {
			//console.log(result);
			
			$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
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

//유량계 수정 
function updateWtlFlowPs(){
	//console.log("updateWtlFlowPs()");

	/////////
	//유효성 체크 
	
	//필수 값 체크
	const geom = $("#rightSubPopup input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	 
	///////////////
	//업데이트 데이터 처리	- 기존 update 사용 하기 위해 파라미터 작업
	 
	//form 데이터 처리
	var feature = new ol.Feature();
	const params = $("#updateWtlFlowPsForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });

    //geom 데이터 추가
    const wkt = $("#rightSubPopup input[name=geom]").val();
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    feature.setGeometry(geometry);
    
    //id값 추가 
    const id = $("#rightSubPopup input[name=id]").val();
    feature.setId(id);
    
    //console.log(feature);
    
    //파리미터 작업
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data 		= {dataId: "wtl_flow_ps", geojson: geojson};

    //수정진행
    ui.loadingBar("show");

    $.post("/job/fcts/updateFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("수정 완료 되었습니다.");
            
            var page = $("#wtlFlowPsListPage").val();
            selectWtlFlowPsList(page);
            
            var id = $("#rightSubPopup input[name=id]").val();
        	selectWtlFlowPs(id);
        	
        	$(".popup-panel .update-wtlFlowPs-popup-close").trigger("click");
            
        } else {
            alert(`수정 실패했습니다.`);
            console.log(result["errorMsg"]);
        }
        
        ui.loadingBar("hide");
    })
    .fail(() => {
        alert(`등록 실패했습니다.`);
        ui.loadingBar("hide");
    });
    
}


//유량계 삭제
function deleteWtlFlowPs(id){
	//console.log("deleteWtlFlowPs(id)");
	//console.log(id);

	if (confirm("삭제하시겠습니까?(복구할 수 없습니다)")) {
		
		ui.loadingBar("show");
        const formData = new FormData();
        formData.append("dataId", 'wtl_flow_ps' + "");
        formData.append("ids", id);

        $.ajax({
            url: "/job/fcts/deleteFacility.do",
            type: "post",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        })
        .done((response) => {
            const result = JSON.parse(response);
            if (result["result"]) {
                alert("삭제 되었습니다.");
                
                //var page = $("#wtlFlowPsListPage").val();
                selectWtlFlowPsList(1);	//첫페이지 조회
                
                cancelSelectWtlFlowPs();//창닫기
                
            } else {
                alert(`삭제에 실패했습니다.`);
                console.log(result["errorMsg"]);
            }
            ui.loadingBar("hide");
        })
        .fail(() => {
            alert(`삭제에 실패했습니다.`);
            ui.loadingBar("hide");
        });
    }
	
}

/////////////////////////////
//엑셀 다운로드 
function downloadExcelWtlFlowPs() {
	//console.log("downloadExcelWtlFlowPs()");
	
	var $container = $("#container");
	var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid-excel"]');	//가상의 ax5uigrid 공간에 처리 
	$target.css('display', 'none');
	
	FACILITY.Ax5UiGridAll = null;	//Ax5UiGridAll 전역 변수 

	FACILITY.Ax5UiGridAll = new ax5.ui.grid();
	
	FACILITY.Ax5UiGridAll.setConfig({
		target:  $target,
	    sortable: true,
	    multipleSelect: false,
	    columns: [
	//        {key: "gid", 				label: "아이디",			width:200},
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
				{key: "std_dip", 			label: "관경",				width:'*'},
	//        {key: "prc_nam", 			label: "제작회사명",		width:100},
	//        {key: "pip_cde", 			label: "관로지형지물부호",	width:100},
	//        {key: "pip_idn", 			label: "관로관리번호",		width:100},
	//        {key: "cnt_num", 			label: "공사번호",			width:100},
	//        {key: "sys_chk", 			label: "대장초기화여부",	width:100},
	//        {key: "ang_dir", 			label: "방향각",			width:100},
	//        {key: "geom", 			label: "공간정보",			width:100}
	    ],

	});


	////////////////
	//검색 옵션
	
	var options;
	if($(".groundwaterProperty").hasClass("on")){		//속성 검색
		//console.log("속성 검색 조건");
		
		const filters = [];
		
		const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
		const gag_cde 		=	$("#lSrchOptions select[name=gag_cde]").val();				//유량계종류
		const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//유량계형식

		let filterString = "";
		
		if(hjd_cde){
			filters.push("hjd_cde" + " = " + hjd_cde); 
		}
		
		if(gag_cde){
			filters.push("gag_cde" + " = " + gag_cde); 
		}
		
		if(mof_cde){
			filters.push("mof_cde" + " = " + mof_cde);
		}
	    
	    options = {
	        typeNames	: 'wtl_flow_ps' + "",
	        filter 		: filters,
	        sortBy		: 'gid',
	        sortOrder	: 'DESC',
	        //sortOrder	: 'ASC'
	    }
		
	}else if($(".groundwaterSpace").hasClass("on")){		//공간 검색
		//console.log("공간 검색 조건")
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
    const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

    options = {
        typeNames: "wtl_flow_ps",
	        sortBy		: 'gid',
	        sortOrder	: 'DESC',
    }
    if (type === 'extent') {
    	options.bbox 		= FACILITY.spaceSearchOption.bbox;
    } else {
    	options.geometry 	= FACILITY.spaceSearchOption.geometry;
    }
		
	}else{
		alert("검색창 오류");
	}
	
	////////////////////////
	//조회
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function (data) {
	    //그리드 데이터 전처리
	    const list = [];
	    //console.log(data.features);
	    
	    //데이터 코드 변환
	    for (let i = 0; i < data.features.length; i++) {
	    	
	    	//지형지물부호 코드 변경
			  var ftr_cde = data.features[i].properties.ftr_cde;
			  data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
			  //data.features[i].properties.ftr_cde_nm = "유량계";
			  
			  //관리기관 코드 변경
			  var mng_cde = data.features[i].properties.mng_cde;
			  data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
			  
			  //읍면동 코드 변경(wfs)
			  var hjd_cde = data.features[i].properties.hjd_cde;
			  data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
			  
			  //유량계 종류 코드 변경
			  var gag_cde = data.features[i].properties.gag_cde;
			  data.features[i].properties.gag_cde_nm = getCmmCodeDataArray("OGC-141", gag_cde);
			  
			  //유량계 형식 코드 변경
			  var mof_cde = data.features[i].properties.mof_cde;
			  data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-041", mof_cde);
	        
			  //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
			  data.features[i].properties.geomObj = data.features[i].geometry;
	    	
			  const {id, properties} = data.features[i];
	          list.push({...properties, ...{id: id}});
	    }
	    
	    ///////////////
	    
	    //gird 적용
	    FACILITY.Ax5UiGridAll.setData(list);
	    
	  	//엑셀 export
			FACILITY.Ax5UiGridAll.exportExcel("EXPORT_유량계.xls");
	});

}