/**
 * - 업무 / 시설관리 / 상수도 시설 / 상수맨홀
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("wtlManhPs.js");
	//console.log("상수맨홀");
});

//functions

//초기화
function wtlManhPsInit(){
	
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

//상수맨홀 리스트 로드 이후 처리
function wtlManhPsListProcess(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",
    });
    
    //옵션 값 세팅
	getCmmCodeData("YPE001", "#lSrchOptions select[name=hjd_cde]");		//읍면동
    getCmmCodeData("MNG-001", "#lSrchOptions select[name=mng_cde]");	//관리기관
    getCmmCodeData("OGC-002", "#lSrchOptions select[name=som_cde]");	//맨홀종류	
    getCmmCodeData("OGC-006", "#lSrchOptions select[name=mhs_std]");	//맨홀형태	
	
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
//          {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
//          {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//          {key: "sht_num", 			label: "도엽번호",			width:'*'},
//          {key: "mng_cde", 			label: "관리기관code",		width:'*'},
            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
            {key: "dpg_std", 			label: "규격",			width:'*'},
//          {key: "som_cde", 			label: "맨홀종류code",		width:'*'},
            {key: "som_cde_nm", 		label: "맨홀종류",			width:'*'},
//          {key: "mhs_cde", 			label: "맨홀형태code",		width:'*'},
            {key: "mhs_cde_nm", 		label: "맨홀형태",			width:'*'},
//          {key: "cnt_num", 			label: "공사번호",			width:100},
//          {key: "sys_chk", 			label: "대장초기화여부",	width:100},
            {key: "ang_dir", 			label: "방향각",			width:100},
//          {key: "org_idn", 			label: "기관관리번호",		width:100},
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
            	selectWtlManhPsList(this.page.selectPage+1);
            }
        },
        body: {
        	onClick: function () {
        		//console.log(this);
        		this.self.select(this.dindex);	//행 선택 되게 수정
        		selectWtlManhPs(this.item.id);	//소방 시설 상세 페이지 로드
            }
        }
		
	});
    
	//목록 조회  - 1 page
	selectWtlManhPsList(1);
	
}


//상수맨홀 목록 조회
function selectWtlManhPsList(page) {
	//console.log("selectWtlManhPsList(page)");
	//console.log("page>>>"+page);
	
	//페이지 변수세팅
	if(page){
		$("#wtlManhPsListPage").val(page);
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
	    
	    options = {
	        typeNames	: 'wtl_manh_ps' + "",
	        filter 		: filters,
	        perPage 	: 10,
	        page 		: page,
	        sortBy		: 'gid',
	        sortOrder	: 'DESC',
	        //sortOrder	: 'ASC'
	    }
		
	}else if($(".groundwaterSpace").hasClass("on")){		//공간 검색
		//console.log("공간 검색 조건")
		
		const $parent 	= $(".facility-spatial-search").closest('.search-area');
        const type 		= $parent.find('input[name="rad-facility-area"]:checked').val();

        options = {
            typeNames: "wtl_manh_ps",
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
        if(total>=0){
        	$("#bottomPopup .bbs-list-num").html("조회결과:"+total+"건");
        }
        
        //console.log(data.features);
        
        //데이터 코드 변환
        for (let i = 0; i < data.features.length; i++) {
        	
        	//지형지물부호 코드 변경
        	var ftr_cde = data.features[i].properties.ftr_cde;
        	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("FTR-001", ftr_cde);
        	//data.features[i].properties.ftr_cde_nm = "상수맨홀";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//맨홀종류 코드 변경
        	var som_cde = data.features[i].properties.som_cde;
        	data.features[i].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
        	
        	//맨홀형태 코드 변경
        	var mhs_cde = data.features[i].properties.mhs_cde;
        	data.features[i].properties.mhs_cde_nm = getCmmCodeDataArray("OGC-006", mhs_cde);
            
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
            
            if (ftr_cde == 'SA100' ) {			//상수맨홀
                return {
                	marker: {
                        src: '/images/poi/wtlManhPs_poi.png'
                    },
                    label: {
                        text: ''
                    }
                }
            } else if (ftr_cde == 'SA911' ) {	//신축관실
                return {
                	marker: {
                        src: '/images/poi/wtlManhPs_poi.png'
                    },
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

//상수맨홀 상세정보 조회
function selectWtlManhPs(id){
	//console.log("selectWtlManhPs(id)");
	//console.log(id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	//console.log(idArray);
	const typeName	= idArray[0];
	
	if(typeName != "wtl_manh_ps"){
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
        typeNames	: 'wtl_manh_ps' + "",
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
    	//data.features[0].properties.ftr_cde_nm = "상수맨홀";
    	
    	//관리기관 코드 변경
    	var mng_cde = data.features[0].properties.mng_cde;
    	data.features[0].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
    	
    	//읍면동 코드 변경
    	var hjd_cde = data.features[0].properties.hjd_cde;
    	data.features[0].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
    	
    	//맨홀종류 코드 변경
    	var som_cde = data.features[0].properties.som_cde;
    	data.features[0].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
    	
    	//맨홀형태 코드 변경
    	var mhs_cde = data.features[0].properties.mhs_cde;
    	data.features[0].properties.mhs_cde_nm = getCmmCodeDataArray("OGC-006", mhs_cde);
        
        //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
    	data.features[0].properties.geomObj = data.features[0].geometry;
    	
    	var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectWtlManhPsView(detailData);	//상세 페이지에 데이터 전달
    	
    });

}

//상세 정보 페이지 불러 오기
function selectWtlManhPsView(detailData){
	//console.log("selectWtlManhPsView(detailData)");
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("상수맨홀 상세보기 오류");
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
		url:"/job/fcmr/wsfc/selectWtlManhPs.do",
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

//상수맨홀 등록 화면 조회
function insertWtlManhPsView(){
	//console.log("insertWtlManhPsView()");
	
	if(dtmap.mod == "3D"){
		alert('3d 에서 사용할 수 없습니다');
		arrangeAddBtnMode();
		return false;
	}
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlManhPsView.do", function () {
        toastr.success("/job/fcmr/wsfc/insertWtlManhPsView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
       
        getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	//읍면동	
        getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-002", "#rightSubPopup select[name=som_cde]");	//맨홀종류	
        getCmmCodeData("OGC-006", "#rightSubPopup select[name=mhs_cde]");	//맨홀형태
        
		ui.loadingBar("hide");
    });
	
}

//상수맨홀 등록 
function insertWtlManhPs(){
	//console.log("insertWtlManhPs()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const ftr_cde = $("#insertWtlManhPsForm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertWtlManhPsForm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#insertWtlManhPsForm input[name=ang_dir]").val()
    if (ang_dir) {
        const regexp = /^[0-9]*$/;
        var r = regexp.test(ang_dir);
        if(!r){
        	alert("방향각은 정수만 입력 가능합니다.")
        	return false;
        }
    }

	////////////
	// 파라미터 작업
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertWtlManhPsForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertWtlManhPsForm input[name=geom]").val();
    
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
    const data = {dataId: "wtl_manh_ps", geojson: geojson};
    
    
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
            //selectWtlManhPsList(1);		//다시 목록 로드
            cancelInsertWtlManhPs(); 	//창닫기
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

//상수맨홀 수정 화면 조회
function updateWtlManhPsView(id){
	//console.log("updateWtlManhPsView()");
	//console.log("id>"+id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if(!detailData && detailData == null){
		alert("상수맨홀 상세보기 오류");
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

//상수맨홀 수정 
function updateWtlManhPs(){
	//console.log("updateWtlManhPs()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const geom = $("#rightSubPopup input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#updateWtlManhPsForm input[name=ang_dir]").val()
    if (ang_dir) {
        const regexp = /^[0-9]*$/;
        var r = regexp.test(ang_dir);
        if(!r){
        	alert("방향각은 정수만 입력 가능합니다.")
        	return false;
        }
    }
	 
	///////////////
	//업데이트 데이터 처리	- 기존 update 사용 하기 위해 파라미터 작업
	 
	//form 데이터 처리
	var feature = new ol.Feature();
	const params = $("#updateWtlManhPsForm").serializeArray();
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
    const data 		= {dataId: "wtl_manh_ps", geojson: geojson};

    //수정진행
    ui.loadingBar("show");
   
    $.post("/job/fcts/updateFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("수정 완료 되었습니다.");
            
            var page = $("#wtlManhPsListPage").val();
            selectWtlManhPsList(page);
            
            var id = $("#rightSubPopup input[name=id]").val();
        	selectWtlManhPs(id);
        	
        	$(".popup-panel .update-wtlManhPs-popup-close").trigger("click");
            
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


//상수맨홀 삭제
function deleteWtlManhPs(id){
	//console.log("deleteWtlManhPs(id)");
	//console.log(id);
	
	if (confirm("삭제하시겠습니까?(복구할 수 없습니다)")) {
		
		ui.loadingBar("show");
        const formData = new FormData();
        formData.append("dataId", 'wtl_manh_ps' + "");
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
                
                //var page = $("#wtlManhPsListPage").val();
                selectWtlManhPsList(1);	//첫페이지 조회
                
                cancelSelectWtlManhPs();//창닫기
                
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
function downloadExcelWtlManhPs() {
	//console.log("downloadExcelWtlManhPs()");
	
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
//          {key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
//          {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
            {key: "hjd_cde", 			label: "읍면동code",		width:'*'},
            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
//          {key: "sht_num", 			label: "도엽번호",			width:'*'},
//          {key: "mng_cde", 			label: "관리기관code",		width:'*'},
            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
            {key: "dpg_std", 			label: "규격",			width:'*'},
            {key: "som_cde", 			label: "맨홀종류code",		width:'*'},
            {key: "som_cde_nm", 		label: "맨홀종류",			width:'*'},
            {key: "mhs_cde", 			label: "맨홀형태code",		width:'*'},
            {key: "mhs_cde_nm", 		label: "맨홀형태",			width:'*'},
//          {key: "cnt_num", 			label: "공사번호",			width:100},
//          {key: "sys_chk", 			label: "대장초기화여부",	width:100},
            {key: "ang_dir", 			label: "방향각",			width:100},
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
	    
	    options = {
	        typeNames	: 'wtl_manh_ps' + "",
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
            typeNames: "wtl_manh_ps",
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
        	//data.features[i].properties.ftr_cde_nm = "상수맨홀";
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//맨홀종류 코드 변경
        	var som_cde = data.features[i].properties.som_cde;
        	data.features[i].properties.som_cde_nm = getCmmCodeDataArray("OGC-002", som_cde);
        	
        	//맨홀형태 코드 변경
        	var mhs_cde = data.features[i].properties.mhs_cde;
        	data.features[i].properties.mhs_cde_nm = getCmmCodeDataArray("OGC-006", mhs_cde);
            
            //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        
        ///////////////
        
        //gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
      	//엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_상수맨홀.xls");
    });

}