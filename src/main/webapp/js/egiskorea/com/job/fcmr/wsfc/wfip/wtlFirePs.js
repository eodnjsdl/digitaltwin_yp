/**
 * - 업무 / 시설관리 / 상수도 시설 / 소방시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("wtlFirePs.js");
	//console.log("소방시설");
	
});

//functions

//초기화
function wtlFirePsInit(){
	
	//등록, 상세, 수정 팝업 창 닫기
	if($("#rightSubPopup").hasClass("opened")){
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
        clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	arrangeAddBtnMode();	//등록 버튼 제어

	FACILITY.Ax5UiGrid.focus(-1);	//grid 선택창 초기화
}


////////////////////
//목록 조회

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
        		//this.self.select(this.dindex);	//행 선택 되게 수정
        		selectWtlFirePs(this.item.id);	//소방 시설 상세 페이지 로드
            }
        }
		
	});
    
	//목록 조회  - 1 page
	selectWtlFirePsList(1);
	
}


//소방시설 목록 조회
function selectWtlFirePsList(page) {
	//console.log("selectWtlFirePsList(page)");
	//console.log("page>>>"+page);
	
	wtlFirePsInit();	//초기화
		
	//공간 검색 / 사용자 정의 일 경우 이외에는  그리기 영역 지우기
	if($(".groundwaterSpace").hasClass("on")){
		const geomSrchType = $(".facility-spatial-search").closest('.search-area').find('input[name="rad-facility-area"]:checked').val();
		//console.log(geomSrchType);
		if(geomSrchType != "custom"){
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 영역 초기화
		}
	}
		
	//페이지 변수세팅
	if(page){
		$("#wtlFirePsListPage").val(page);
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
	    
	    options = {
	        typeNames	: 'wtl_fire_ps' + "",
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
            typeNames: "wtl_fire_ps",
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

//////////////
//상세정보 보회

//소방시설 상세정보 조회
function selectWtlFirePs(id){
	//console.log("selectWtlFirePs(id)");
	//console.log(id);
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
        clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	//console.log(idArray);
	const typeName	= idArray[0];
	
	if(typeName != "wtl_fire_ps"){
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
        typeNames	: 'wtl_fire_ps' + "",
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
    	
    	//관리기관 코드 변경
    	var mng_cde = data.features[0].properties.mng_cde;
    	data.features[0].properties.mng_cde_nm = getCmmCodeDataArray("MNG-001", mng_cde);
    	
    	//읍면동 코드 변경
    	var hjd_cde = data.features[0].properties.hjd_cde;
    	data.features[0].properties.hjd_cde_nm = getCmmCodeDataArray("YPE001", hjd_cde);
    	
    	//소화전 형식 코드 변경
    	var mof_cde = data.features[0].properties.mof_cde;
    	data.features[0].properties.mof_cde_nm = getCmmCodeDataArray("OGC-048", mof_cde);
        
        //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
    	data.features[0].properties.geomObj = data.features[0].geometry;
    	
    	var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectWtlFirePsView(detailData);	//상세 페이지에 데이터 전달
    	
    });

}

//상세 정보 페이지 불러 오기
function selectWtlFirePsView(detailData){
	//console.log("selectWtlFirePsView(detailData)");
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("소방시설 상세보기 오류");
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
			
			dtmap.vector.select(detailData.id);	//지도에  표시
			
			//그리드에 행전체 선택되게 수정
			//console.log(detailData);
			var gid = detailData.gid;
			var gridList = FACILITY.Ax5UiGrid.list;
			
			for(var i=0; i<gridList.length; i++){
				//console.log(gridList[i]);
				var grid = gridList[i];
				if(gid == grid.gid){
					var dindex = grid.__index;
					FACILITY.Ax5UiGrid.clearSelect();
					FACILITY.Ax5UiGrid.focus(dindex);		
					//[참고 사항]
					//FACILITY.Ax5UiGrid.focus(-1); 	: 포커스 해제
					//FACILITY.Ax5UiGrid.select(숫자); 	: 사용해도 되는데 스크롤 이동이 안됨
				}
			}

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

//소방시설 등록 화면 조회
function insertWtlFirePsView(){
	//console.log("insertWtlFirePsView()");
	
	if(dtmap.mod == "3D"){
		alert('3d 에서 사용할 수 없습니다');
		arrangeAddBtnMode();
		return false;
	}
	
	////////////////////
	// 초기화 (지도)
    dtmap.draw.dispose();
    dtmap.draw.clear();
    
    dtmap.vector.clearSelect();	//선택 해제
   
    FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
    
    //공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
        clearSpaceEditTool();	//공간정보 편집창 닫기
    }
    /////////////////
	
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlFirePsView.do", function () {
        //toastr.success("/job/fcmr/wsfc/insertWtlFirePsView.do", "페이지🙂호🙂출🙂");
        
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
	//console.log("insertWtlFirePs()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const ftr_cde = $("#insertWtlFirePsForm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertWtlFirePsForm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#insertWtlFirePsForm input[name=ang_dir]").val()
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
	const params = $("#insertWtlFirePsForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertWtlFirePsForm input[name=geom]").val();
    
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
    const data = {dataId: "wtl_fire_ps", geojson: geojson};
    
    
    ////////////
    //등록
    
    //등록 시작
    ui.loadingBar("show");
   
    $.post("/job/fcts/insertFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("등록 되었습니다.");
            
            var $container = $("#container");
    	    var $target = $container.find('#bottomPopup .facility-select');
    	    $target.trigger("change");
            
            cancelInsertWtlFirePs(); 	//창닫기
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

//소방시설 수정 화면 조회
function updateWtlFirePsView(id){
	//console.log("updateWtlFirePsView()");
	//console.log("id>"+id);
	
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
	//console.log("updateWtlFirePs()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const geom = $("#rightSubPopup input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}
	
	//값 체크
	const ang_dir = $("#updateWtlFirePsForm input[name=ang_dir]").val()
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
    
    //3d일때는 wfs 조회시 위경도 좌표계로 오기 때문에 변경해줘서 업데이트 진행
    //만약 공간정보 feature 넣지 않으면 공간정보데이터 빈값으로 업데이트진행
    if(dtmap.mod == "3D"){	
    	const geometry5179 = geometry.transform("EPSG:4326", "EPSG:5179")
    	geometry = geometry5179;
    }
    
    feature.setGeometry(geometry);
    
    //id값 추가 
    const id = $("#rightSubPopup input[name=id]").val();
    feature.setId(id);
    
    //console.log(feature);
    
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
            
            var page = $("#wtlFirePsListPage").val();
            selectWtlFirePsList(page);
            
            selectWtlFirePs(id);	//list함수에서 초기화로 인해 name=id 값은 조회 안됨
                    	
        	$(".popup-panel .update-wtlFirePs-popup-close").trigger("click");
            
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


//소방시설 삭제
function deleteWtlFirePs(id){
	//console.log("deleteWtlFirePs(id)");
	//console.log(id);
	
	if (confirm("삭제하시겠습니까?(복구할 수 없습니다)")) {
		
		ui.loadingBar("show");
        const formData = new FormData();
        formData.append("dataId", 'wtl_fire_ps' + "");
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
                
                //var page = $("#wtlFirePsListPage").val();
                selectWtlFirePsList(1);	//첫페이지 조회
                
                cancelSelectWtlFirePs();//창닫기
                
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
function downloadExcelWtlFirePs() {
	//console.log("downloadExcelWtlFirePs()");
	
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
            {key: "hom_num", 			label: "수용가번호",		width:'*'},
            {key: "mof_cde", 			label: "소화전형식code",	width:'*'},
            {key: "mof_cde_nm", 		label: "소화전형식",		width:'*'},
            {key: "fir_dip", 			label: "소화전구경",		width:'*'},
            {key: "std_dip", 			label: "관경",			width:'*'},
            //{key: "sup_hit", 			label: "급수탑높이",		width:100},
            //{key: "sys_chk", 			label: "대장초기화여",		width:100},
            //{key: "ang_dir", 			label: "방향각",			width:100},
            //{key: "geom", 			label: "공간정보",			width:100}
        ],

	});


	////////////////
	//검색 옵션
	
	var options;
	if($(".groundwaterProperty").hasClass("on")){		//속성 검색
		//console.log("속성 검색 조건");
		
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
	    
	    options = {
	        typeNames	: 'wtl_fire_ps' + "",
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
            typeNames: "wtl_fire_ps",
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
        FACILITY.Ax5UiGridAll.setData(list);
        
      	//엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_소방시설.xls");
    });

}
