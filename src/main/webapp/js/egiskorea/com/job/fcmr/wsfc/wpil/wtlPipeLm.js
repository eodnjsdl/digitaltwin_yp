/**
 * - 업무 / 시설관리 / 상수도 시설 / 상수관로
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("wtlPipeLm.js");
	//console.log("상수관로");
});

//functions

//초기화
function wtlPipeLmInit(){
	
	//등록, 상세, 수정 팝업 창 닫기
	if($("#rightSubPopup").hasClass("opened")){
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}

	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
    	$(".space-edit-tool").removeClass("opened");
        $(".space-edit-tool").empty();
    }
	
	arrangeAddBtnMode();	//등록 버튼
}


////////////////////
//목록 조회

//상수관로 리스트 로드 이후 처리
function wtlPipeLmListProcess(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",

    });
    
    //옵션 값 세팅
	getCmmCodeData("YPE001", 	"#lSrchOptions select[name=hjd_cde]");	//읍면동
	getCmmCodeData("OGC-004", 	"#lSrchOptions select[name=saa_cde]");	//관용도	
	getCmmCodeData("OGC-003", 	"#lSrchOptions select[name=mop_cde]");	//관재질	
	
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
//            {key: "gid", 				label: "아이디",			width:200},
//            {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
//            {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//            {key: "mng_cde", 			label: "관리기관code",		width:'*'},
//            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
//            {key: "sht_num", 			label: "도엽번호",			width:'*'},
//            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
//            {key: "saa_cde", 			label: "관용도code",		width:'*'},
            {key: "saa_cde_nm", 		label: "관용도",			width:'*'},
//            {key: "mop_cde", 			label: "관재질code",		width:'*'},
            {key: "mop_cde_nm", 		label: "관재질",			width:'*'},
            {key: "std_dip", 			label: "관경",			width:'*'},
            {key: "byc_len", 			label: "연장",			width:100},
//            {key: "jht_cde", 			label: "접합종류code",		width:100},
            {key: "jht_cde_nm", 		label: "접합종류",			width:100},
//            {key: "low_dep", 			label: "최저깊이",			width:100},
//            {key: "hgh_dep", 			label: "최고깊이",			width:100},
//            {key: "cnt_num", 			label: "공사번호",			width:100},
//            {key: "sys_chk", 			label: "대장초기화여부",	width:100},
//            {key: "pip_lbl", 			label: "관라벨",			width:100},
//            {key: "iqt_cde", 			label: "탐사구분",			width:100},
//            {key: "org_idn", 			label: "기관관리번호",		width:100},
//            {key: "geom", 			label: "공간정보",			width:100}
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
        	onClick: function () {
        		//console.log(this);
        		selectWtlPipeLm(this.item.id);	//상수관로  상세 페이지 로드
            }
        }
		
	});
    
	//목록 조회  - 1 page
	selectWtlPipeLmList(1);
	
}


//상수관로 목록 조회
function selectWtlPipeLmList(page) {
	//console.log("selectWtlPipeLmList(page)");
	//console.log("page>>>"+page);
	
	//페이지 변수세팅
	if(page){
		$("#wtlPipeLmListPage").val(page);
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
		const saa_cde 		=	$("#lSrchOptions select[name=saa_cde]").val();				//관용도
		const mop_cde 		=	$("#lSrchOptions select[name=mop_cde]").val();				//관재질
		const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
		const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
		
		let filterString = "";
		
		if(hjd_cde){
			filters.push("hjd_cde" + " = " + hjd_cde); 
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
	    
	    options = {
	        typeNames	: 'wtl_pipe_lm' + "",
	        filter 		: filters,
	        perPage 	: 10,
	        page 		: page,
	        sortBy		: 'gid',
	        sortOrder	: 'DESC',
	    }
		
	}else if($(".groundwaterSpace").hasClass("on")){		//공간 검색
		//console.log("공간 검색 조건")
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
        const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

        options = {
            typeNames: "wtl_pipe_lm",
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
    	//console.log(data);
    	
        //그리드 데이터 전처리
        const list = [];
        
        var total = data.totalFeatures;
        var totalPages = Math.ceil(total/10);
        
        //총합 화면 처리
        if(total>=0){
        	$("#bottomPopup .bbs-list-num").html("조회결과:"+total+"건");
        }
        
        //console.log(data.features);
        
        //데이터 코드 변환
        for (let i = 0; i < data.features.length; i++) {
        	
        	//지형지물부호 코드 변경
        	var ftr_cde = data.features[i].properties.ftr_cde;
        	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경(wfs)
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//관용도 코드 변경
        	var saa_cde = data.features[i].properties.saa_cde;
        	data.features[i].properties.saa_cde_nm = getCmmCodeDataArray("OGC-004", saa_cde);
        	
        	//관재질 코드 변경
        	var mop_cde = data.features[i].properties.mop_cde;
        	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);

        	//접합종류 코드 변경
        	var jht_cde = data.features[i].properties.jht_cde;
        	data.features[i].properties.jht_cde_nm = getCmmCodeDataArray("OGC-005", jht_cde);
        	
            //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        ////////////////
        
        const format = new ol.format.GeoJSON();

        features = format.readFeatures(data);
       
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

        	return {
                /*fill: {
                	color: 'rgba(46,161,255,0.68)'
                },*/
                stroke: {
                    //color: '#89dfff',
                    color: '#FF3333',
                    width: 4
                },
                /*radius: 10,
                label: {
                    column: 'sba_cde_nm'
                }*/
                
            }
        	
        });

        dtmap.vector.fit();
       
    });
	
}



//////////////
//상세정보 보회

//상수관로 상세정보 조회
function selectWtlPipeLm(id){
	//console.log("selectWtlPipeLm(id)");
	//console.log(id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	//console.log(idArray);
	const typeName	= idArray[0];
	
	if(typeName != "wtl_pipe_lm"){
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
        typeNames	: 'wtl_pipe_lm' + "",
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
    	
    	//읍면동 코드 변경
    	var hjd_cde = data.features[0].properties.hjd_cde;
    	data.features[0].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
    	
    	//관리기관 코드 변경
    	var mng_cde = data.features[0].properties.mng_cde;
    	data.features[0].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
    	
    	//관용도 코드 변경
    	var saa_cde = data.features[0].properties.saa_cde;
    	data.features[0].properties.saa_cde_nm = getCmmCodeDataArray("OGC-004", saa_cde);
    	
    	//관재질 코드 변경
    	var mop_cde = data.features[0].properties.mop_cde;
    	data.features[0].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);

    	//접합종류 코드 변경
    	var jht_cde = data.features[0].properties.jht_cde;
    	data.features[0].properties.jht_cde_nm = getCmmCodeDataArray("OGC-005", jht_cde);
    	
        //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
    	data.features[0].properties.geomObj = data.features[0].geometry;

    	var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectWtlPipeLmView(detailData);	//상세 페이지에 데이터 전달
    	
    });

}

//상세 정보 페이지 불러 오기
function selectWtlPipeLmView(detailData){
	//console.log("selectWtlPipeLmView(detailData)");
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("상수관로 상세보기 오류");
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
		url:"/job/fcmr/wsfc/selectWtlPipeLm.do",
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

//상수관로 등록 화면 조회
function insertWtlPipeLmView(){
	//console.log("insertWtlPipeLmView()");
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlPipeLmView.do", function () {
        toastr.success("/job/fcmr/wsfc/insertWtlPipeLmView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
       
        getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	//읍면동
    	getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	//관리기관
		getCmmCodeData("OGC-004", "#rightSubPopup select[name=saa_cde]");	//관용도	
		getCmmCodeData("OGC-003", "#rightSubPopup select[name=mop_cde]");	//관재질
		getCmmCodeData("OGC-005", "#rightSubPopup select[name=jht_cde]");	//접합종류
        
		ui.loadingBar("hide");
    });
	
}

//상수관로 등록 
function insertWtlPipeLm(){
	//console.log("insertWtlPipeLm()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const ftr_cde = $("#insertWtlPipeLmForm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertWtlPipeLmForm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}

	////////////
	// 파라미터 작업
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertWtlPipeLmForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertWtlPipeLmForm input[name=geom]").val();
    
    const formatWKT = new ol.format.WKT();
    let geometry = formatWKT.readGeometry(wkt);
    
    feature.setGeometry(geometry);

    //console.log(feature);
    
    //데이터 정리
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data = {dataId: "wtl_pipe_lm", geojson: geojson};
    
    ////////////
    //등록
    //console.log(data);
    
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
            //selectWtlPipeLmList(1);		//다시 목록 로드
            cancelInsertWtlPipeLm(); 	//창닫기
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

//상수관로 수정 화면 조회
function updateWtlPipeLmView(id){
	//console.log("updateWtlPipeLmView()");
	//console.log("id>"+id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if(!detailData && detailData == null){
		alert("상수관로 상세보기 오류");
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
		url:"/job/fcmr/wsfc/updateWtlPipeLmView.do",
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

//상수관로 수정 
function updateWtlPipeLm(){
	//console.log("updateWtlPipeLm()");
	
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
	const params = $("#updateWtlPipeLmForm").serializeArray();
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
    const data 		= {dataId: "wtl_pipe_lm", geojson: geojson};
    console.log(data);
    
    //수정진행
    ui.loadingBar("show");
   
    $.post("/job/fcts/updateFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("수정 완료 되었습니다.");
            
            var page = $("#wtlPipeLmListPage").val();
            selectWtlPipeLmList(page);
            
            var id = $("#rightSubPopup input[name=id]").val();
        	selectWtlPipeLm(id);
        	
        	$(".popup-panel .update-wtlPipeLm-popup-close").trigger("click");
            
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


//상수관로 삭제
function deleteWtlPipeLm(id){
	//console.log("deleteWtlPipeLm(id)");
	//console.log(id);
	
	if (confirm("삭제하시겠습니까?(복구할 수 없습니다)")) {
		
		ui.loadingBar("show");
        const formData = new FormData();
        formData.append("dataId", 'wtl_pipe_lm' + "");
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
                
                //var page = $("#wtlPipeLmListPage").val();
                selectWtlPipeLmList(1);	//첫페이지 조회
                
                cancelSelectWtlPipeLm();//창닫기
                
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
function downloadExcelWtlPipeLm() {
	//console.log("downloadExcelWtlPipeLm()");
	
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
//          {key: "gid", 				label: "아이디",			width:200},
          {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
          {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
          {key: "ftr_idn", 			label: "관리번호",			width:'*'},
          {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
          {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//          {key: "mng_cde", 			label: "관리기관code",		width:'*'},
//          {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
//          {key: "sht_num", 			label: "도엽번호",			width:'*'},
//          {key: "ist_ymd", 			label: "설치일자",			width:'*'},
          {key: "saa_cde", 			label: "관용도code",		width:'*'},
          {key: "saa_cde_nm", 		label: "관용도",			width:'*'},
          {key: "mop_cde", 			label: "관재질code",		width:'*'},
          {key: "mop_cde_nm", 		label: "관재질",			width:'*'},
          {key: "std_dip", 			label: "관경",			width:'*'},
          {key: "byc_len", 			label: "연장",			width:100},
          {key: "jht_cde", 			label: "접합종류code",		width:100},
          {key: "jht_cde_nm", 		label: "접합종류",			width:100},
//          {key: "low_dep", 			label: "최저깊이",			width:100},
//          {key: "hgh_dep", 			label: "최고깊이",			width:100},
//          {key: "cnt_num", 			label: "공사번호",			width:100},
//          {key: "sys_chk", 			label: "대장초기화여부",	width:100},
//          {key: "pip_lbl", 			label: "관라벨",			width:100},
//          {key: "iqt_cde", 			label: "탐사구분",			width:100},
//          {key: "org_idn", 			label: "기관관리번호",		width:100},
//          {key: "geom", 				label: "공간정보",			width:100}
        ],

	});


	////////////////
	//검색 옵션
	
	var options;
	if($(".groundwaterProperty").hasClass("on")){		//속성 검색
		//console.log("속성 검색 조건");
		
		const filters = [];
		
		const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
		const saa_cde 		=	$("#lSrchOptions select[name=saa_cde]").val();				//관용도
		const mop_cde 		=	$("#lSrchOptions select[name=mop_cde]").val();				//관재질
		const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
		const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
		
		let filterString = "";
		
		if(hjd_cde){
			filters.push("hjd_cde" + " = " + hjd_cde); 
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
	    
	    options = {
	        typeNames	: 'wtl_pipe_lm' + "",
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
            typeNames: "wtl_pipe_lm",
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
        	
        	//읍면동 코드 변경
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//관용도 코드 변경
        	var saa_cde = data.features[i].properties.saa_cde;
        	data.features[i].properties.saa_cde_nm = getCmmCodeDataArray("OGC-004", saa_cde);
        	
        	//관재질 코드 변경
        	var mop_cde = data.features[i].properties.mop_cde;
        	data.features[i].properties.mop_cde_nm = getCmmCodeDataArray("OGC-003", mop_cde);

        	//접합종류 코드 변경
        	var jht_cde = data.features[i].properties.jht_cde;
        	data.features[i].properties.jht_cde_nm = getCmmCodeDataArray("OGC-005", jht_cde);
            
            //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        
        ///////////////
        
        //gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
      	//엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_상수관로.xls");
    });

}
