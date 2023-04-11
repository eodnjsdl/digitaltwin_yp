/**
 * - 업무 / 시설관리 / 상수도 시설 / 소방시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlFirePs.js");
	console.log("소방시설");
	
});

//functions

//소방시설 리스트 로드 이후 처리
function wtlFirePsListProcess(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",
    });
    
    //옵션 값 세팅
	getCmmCodeData("YPE001", 	"#lSrchOptions select[name=hjd_cde]");	//읍면동	
	getCmmCodeData("OGC-048", 	"#lSrchOptions select[name=mof_cde]");	//소화전형식	
	
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
            //{key: "gid", 				label: "아이디",			width:200},
            //{key: "ftr_cde", 			label: "지형지물부호code",	width:'*'},
            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
            //{key: "hjd_cde", 			label: "읍면동code",		width:'*'},
            {key: "hjd_cde_nm", 		label: "읍면동",			width:'*'},
            //{key: "mng_cde", 			label: "관리기관code",		width:'*'},
            {key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
            {key: "sht_num", 			label: "도엽번호",			width:'*'},
            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
            {key: "hom_num", 			label: "수용가번호",		width:'*'},
            //{key: "mof_cde", 			label: "소화전형식code",	width:'*'},
            {key: "mof_cde_nm", 		label: "소화전형식",		width:'*'},
            {key: "fir_dip", 			label: "소화전구경",		width:'*'},
            {key: "std_dip", 			label: "관경",			width:'*'},
            //{key: "sup_hit", 			label: "급수탑높이",		width:100},
            //{key: "sys_chk", 			label: "대장초기화여",		width:100},
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
            	selectWtlFirePsList(this.page.selectPage+1);
            }
        },
        body: {
        	onClick: function () {
        		//console.log(this);
        		selectWtlFirePs(this.item.id);	//소방 시설 상세 페이지 로드
            }
        }
		
	});
    
	//목록 조회  - 1 page
	selectWtlFirePsList(1);
	
}


//소방시설 목록 조회
function selectWtlFirePsList(page) {
	console.log("selectWtlFirePsList(page)");
	console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//소화전형식
	const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
	const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + " = " + hjd_cde); 
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
        typeNames	: 'wtl_fire_ps' + "",
        filter 		: filters,
        perPage 	: 10,
        page 		: page
    }
    
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
        
        console.log(data.features);
        
        //데이터 코드 변환
        for (let i = 0; i < data.features.length; i++) {
        	
        	//지형지물부호 코드 변경
        	var ftr_cde = data.features[i].properties.ftr_cde;
        	data.features[i].properties.ftr_cde_nm = getCmmCodeDataArray("SA-001", ftr_cde);
        	
        	//관리기관 코드 변경
        	var mng_cde = data.features[i].properties.mng_cde;
        	data.features[i].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
        	
        	//읍면동 코드 변경
        	var hjd_cde = data.features[i].properties.hjd_cde;
        	data.features[i].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
        	
        	//소화전 형식 코드 변경
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-048", mof_cde);
            
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
            
            if (ftr_cde == 'SA118' ) {			//급수탑
                return {
                    marker: {
                        src: '/images/poi/waterTower_poi.png'
                    },
                    label: {
                        text: ''
                    }
                }
            } else if (ftr_cde == 'SA119' ) {		//소화전
                return {
                    marker: {
                        src: '/images/poi/hydrant_poi.png'
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

//소방시설 상세정보 조회
function selectWtlFirePs(id){
	console.log("selectWtlFirePs(detailData)");
	console.log(id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if(!detailData && detailData == null){
		alert("소방시설 상세보기 오류");
		return false;
	}
	
	//파라미터 정리
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){	//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}
	
	ui.loadingBar("show");
	
	$.ajax({
		url:"/job/fcmr/wsfc/selectWtlFirePs.do",
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
			
			dtmap.vector.select(id);	//지도 에 geom 데이터 활성화
		}
		,error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		, complete : function(){
			ui.loadingBar("hide");
		}
	});
	
}

//소방시설 등록 화면 조회
function insertWtlFirePsView(){
	console.log("insertWtlFirePsView()");
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlFirePsView.do", function () {
        toastr.success("/job/fcmr/wsfc/insertWtlFirePsView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
       
        getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	//읍면동	
        getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	//관리기관
		getCmmCodeData("OGC-048", "#rightSubPopup select[name=mof_cde]");	//소화전형식
        
		ui.loadingBar("hide");
    });
	
}

//소방시설 등록 
function insertWtlFirePs(){
	console.log("insertWtlFirePs()");
	//toastr.error("insertWtlFirePs()", "소방시설 등록 작업중");
	//return false;
	/////////
	//유효성 체크
	
	//필수 값 체크
	
	//값 체크
	
	/*if (!this.feature.getGeometry()) {
		
        alert("위치를 등록하여 주십시오.");
        return false;
    }*/
	
	//console.log($("#insertWtlFirePsForm input[name=ist_ymd]").val());
		
	var feature = new ol.Feature();
	const params = $("#insertWtlFirePsForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
    
    //console.log(params);
    
    //const wkt = cmmUtil.getEditGeometry();
    //geom 테스트
    const wkt = $("#rightSubPopup input[name=geom]").val();
    
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

    console.log(feature);
    
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    
    const data = {dataId: "wtl_fire_ps", geojson: geojson};
    

    /*if (warnColumns.length > 0) {
        const titles = warnColumns.map((column) => column["title"]);
        alert(`[${titles.join()}] 필수입니다.`);
    } else if (validColumns.length > 0) {
        const titles = validColumns.map((column) => column["title"]);
        alert(`[${titles.join()}] 정수만 입력 가능합니다.`);
    } else {*/
    
    ui.loadingBar("show");
   
    $.post("/job/fcts/insertFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("등록 되었습니다.");
            /*if (this.onSave) {
                this.onSave();
            }
            this.destroy();*/
            
            selectWtlFirePsList(1);	//다시 목록 로드
            
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

//소방시설 수정 화면 조회
function updateWtlFirePsView(id){
	console.log("updateWtlFirePsView()");
	console.log("id>"+id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if(!detailData && detailData == null){
		alert("소방시설 상세보기 오류");
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
		url:"/job/fcmr/wsfc/updateWtlFirePsView.do",
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

//소방시설 수정 
function updateWtlFirePs(){
	console.log("updateWtlFirePs()");
	 $(".popup-panel .update-wtlFirePs-popup-close").trigger("click");
	//유효성 체크
	
	//업데이트 데이터 처리
	
	//form 데이터 처리
	var feature = new ol.Feature();
	const params = $("#updateWtlFirePsForm").serializeArray();
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
    
    console.log(feature);
    
    //파리미터 작업
    const format 	= new ol.format.GeoJSON();
    const geojson 	= format.writeFeature(feature);
    const data 		= {dataId: "wtl_fire_ps", geojson: geojson};

    //수정진행
    ui.loadingBar("show");
   
    $.post("/job/fcts/updateFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("수정 완료 되었습니다.");
            
            //다시 상세 페이지 이동
            var id = $("input[name=id]").val();
        	selectWtlFirePs(id);	
            
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

