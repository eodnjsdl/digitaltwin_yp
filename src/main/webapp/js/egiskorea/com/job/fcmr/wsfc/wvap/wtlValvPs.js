/**
 * - 업무 / 시설관리 / 상수도 시설 / 변류시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("wtlValvPs.js");
	//console.log("변류시설");
	
});

//functions

//초기화
function wtlValvPsInit(){
	
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

//변류시설 리스트 로드 이후 처리
function wtlValvPsListProcess(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",
    });
    
    //옵션 값 세팅
	getCmmCodeData("YPE001", 	"#lSrchOptions select[name=hjd_cde]");	//읍면동	
	getCmmCodeData("MNG-001", 	"#lSrchOptions select[name=mng_cde]");	//관리기관코드	
	getCmmCodeData("OGC-031", 	"#lSrchOptions select[name=mof_cde]");	//변류형식	
	getCmmCodeData("OGC-007", 	"#lSrchOptions select[name=sae_cde]");	//제수변회전방향	
	getCmmCodeData("OGC-008", 	"#lSrchOptions select[name=mth_cde]");	//제수변구동방법	
	getCmmCodeData("OGC-001", 	"#lSrchOptions select[name=for_cde]");	//시설물형태	
	getCmmCodeData("OGC-010", 	"#lSrchOptions select[name=cst_cde]");	//이상상태	
	getCmmCodeData("OGC-011", 	"#lSrchOptions select[name=off_cde]");	//개폐번호	
	
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
            //{key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
            //{key: "sht_num", 			label: "도엽번호",			width:'*'},
            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
            //{key: "mof_cde", 			label: "변류형식code",		width:'*'},
            {key: "mof_cde_nm", 		label: "변류형식",			width:'*'},
            //{key: "mop_cde", 			label: "관재질",			width:'*'},
            {key: "std_dip", 			label: "관경",			width:'*'},
            //{key: "sae_cde", 			label: "제수변회전방향code",width:'*'},
            {key: "sae_cde_nm", 		label: "제수변회전방향",	width:'*'},
            {key: "tro_cnt", 			label: "제수변총회전수",	width:'*'},
            //{key: "cro_cnt", 			label: "제수변현회전수",	width:'*'},
            //{key: "mth_cde", 			label: "제수변구동방법code",width:'*'},
            {key: "mth_cde_nm", 		label: "제수변구동방법",	width:'*'},
            //{key: "for_cde", 			label: "시설물형태code",	width:'*'},
            {key: "for_cde_nm", 		label: "시설물형태",		width:'*'},
            {key: "val_std", 			label: "변실규격",			width:'*'},
            //{key: "val_saf", 			label: "설정압력",			width:'*'},
            //{key: "prc_nam", 			label: "제작회사명",		width:'*'},
            //{key: "pip_cde", 			label: "관로지형지물부호",	width:'*'},
            //{key: "pip_idn", 			label: "관로관리번호",		width:'*'},
            //{key: "cst_cde", 			label: "이상상태code",		width:'*'},
            {key: "cst_cde_nm", 		label: "이상상태",			width:'*'},
            //{key: "off_cde", 			label: "개폐여부code",		width:'*'},
            {key: "off_cde_nm", 		label: "개폐여부",			width:'*'},
            //{key: "cnt_num", 			label: "공사번호",			width:'*'},
            {key: "ang_dir", 			label: "방향각",			width:100},
            //{key: "sys_chk", 			label: "대장초기화여부",	width:'*'},
            //{key: "org_idn", 			label: "기관관리번호",		width:'*'},
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
            	selectWtlValvPsList(this.page.selectPage+1);
            }
        },
        body: {
        	onClick: function () {
        		//console.log(this);
        		selectWtlValvPs(this.item.id);	//소방 시설 상세 페이지 로드
            }
        }
		
	});
    
	//목록 조회  - 1 page
	selectWtlValvPsList(1);
	
}


//변류시설 목록 조회
function selectWtlValvPsList(page) {
	//console.log("selectWtlValvPsList(page)");
	//console.log("page>>>"+page);
	
	//페이지 변수세팅
	if(page){
		$("#wtlValvPsListPage").val(page);
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
		
		const ftr_cde 		=	$("#lSrchOptions select[name=ftr_cde]").val();				//소화전형식
		const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
		const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//읍면동
		const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
		const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
		const sae_cde 		=	$("#lSrchOptions select[name=sae_cde]").val();				//읍면동
		
		let filterString = "";
		
		if(ftr_cde){
			filters.push("ftr_cde" + " = " + ftr_cde); 
		}
		
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
	    
		if(sae_cde){
			filters.push("sae_cde" + " = " + sae_cde); 
		}
		
	    options = {
	        typeNames	: 'wtl_valv_ps' + "",
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
            typeNames: "wtl_valv_ps",
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
        	
        	//변류형식 코드 변경
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-031", mof_cde);
        	
        	//제수변회전방향 코드 변경
        	var sae_cde = data.features[i].properties.sae_cde;
        	data.features[i].properties.sae_cde_nm = getCmmCodeDataArray("OGC-007", sae_cde);
        	
        	//제수변구동방법 코드 변경
        	var mth_cde = data.features[i].properties.mth_cde;
        	data.features[i].properties.mth_cde_nm = getCmmCodeDataArray("OGC-008", mth_cde);
        	
        	//시설물형태 코드 변경
        	var for_cde = data.features[i].properties.for_cde;
        	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
        	
        	//이상상태 코드 변경
        	var cst_cde = data.features[i].properties.cst_cde;
        	data.features[i].properties.cst_cde_nm = getCmmCodeDataArray("OGC-010", cst_cde);
        	
        	//개폐여부 코드 변경
        	var off_cde = data.features[i].properties.off_cde;
        	data.features[i].properties.off_cde_nm = getCmmCodeDataArray("OGC-011", off_cde);
            
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
            
            if (ftr_cde == 'SA200' ) {			//상수제수변
                return {
                    marker: {
                        src: '/images/poi/stopValve_poi.png'
                    },
                    label: {
                        text: ''
                    }
                }
            } else if (ftr_cde == 'SA201' ) {		//상수역지변
                return {
                    marker: {
                        src: '/images/poi/nonreturnValve_poi.png'
                    },
                    label: {
                    	text: ''
                    }
                }
            } else if (ftr_cde == 'SA202' ) {		//상수이토변
                return {
                    marker: {
                        src: '/images/poi/drainValve_poi.png'
                    },
                    label: {
                    	text: ''
                    }
                }
            } else if (ftr_cde == 'SA203' ) {		//상수배기변
                return {
                    marker: {
                        src: '/images/poi/exhaustValve_poi.png'
                    },
                    label: {
                    	text: ''
                    }
                }
            } else if (ftr_cde == 'SA204' ) {		//상수감압변
                return {
                    marker: {
                        src: '/images/poi/prsRelifValve_poi.png'
                    },
                    label: {
                    	text: ''
                    }
                }
            } else if (ftr_cde == 'SA205' ) {		//상수안전변
                return {
                    marker: {
                        src: '/images/poi/safetyValve_poi.png'
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

//변류시설 상세정보 조회
function selectWtlValvPs(id){
	//console.log("selectWtlValvPs(id)");
	//console.log(id);
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	//console.log(idArray);
	const typeName	= idArray[0];
	
	if(typeName != "wtl_valv_ps"){
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
        typeNames	: 'wtl_valv_ps' + "",
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
    	
    	//변류형식 코드 변경
    	var mof_cde = data.features[0].properties.mof_cde;
    	data.features[0].properties.mof_cde_nm = getCmmCodeDataArray("OGC-031", mof_cde);
    	
    	//제수변회전방향 코드 변경
    	var sae_cde = data.features[0].properties.sae_cde;
    	data.features[0].properties.sae_cde_nm = getCmmCodeDataArray("OGC-007", sae_cde);
    	
    	//제수변구동방법 코드 변경
    	var mth_cde = data.features[0].properties.mth_cde;
    	data.features[0].properties.mth_cde_nm = getCmmCodeDataArray("OGC-008", mth_cde);
    	
    	//시설물형태 코드 변경
    	var for_cde = data.features[0].properties.for_cde;
    	data.features[0].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
    	
    	//이상상태 코드 변경
    	var cst_cde = data.features[0].properties.cst_cde;
    	data.features[0].properties.cst_cde_nm = getCmmCodeDataArray("OGC-010", cst_cde);
    	
    	//개폐여부 코드 변경
    	var off_cde = data.features[0].properties.off_cde;
    	data.features[0].properties.off_cde_nm = getCmmCodeDataArray("OGC-011", off_cde);

        
        //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
    	data.features[0].properties.geomObj = data.features[0].geometry;
    	
    	var detailData = data.features[0].properties;
    	detailData.id = id;
    	
    	selectWtlValvPsView(detailData);	//상세 페이지에 데이터 전달
    	
    });

}

//상세 정보 페이지 불러 오기
function selectWtlValvPsView(detailData){
	//console.log("selectWtlValvPsView(detailData)");
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("변류시설 상세보기 오류");
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
		url:"/job/fcmr/wsfc/selectWtlValvPs.do",
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

//변류시설 등록 화면 조회
function insertWtlValvPsView(){
	//console.log("insertWtlValvPsView()");
	
	if(dtmap.mod == "3D"){
		alert('3d 에서 사용할 수 없습니다');
		arrangeAddBtnMode();
		return false;
	}
	
	ui.loadingBar("show");
	
	$("#rightSubPopup").addClass("div-failcity-detail");	//날짜 css 때문	
	
	ui.openPopup("rightSubPopup");
	
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/insertWtlValvPsView.do", function () {
        toastr.success("/job/fcmr/wsfc/insertWtlValvPsView.do", "페이지🙂호🙂출🙂");
        
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
       
        getCmmCodeData("YPE001",  "#rightSubPopup select[name=hjd_cde]");	//읍면동	
        getCmmCodeData("MNG-001", "#rightSubPopup select[name=mng_cde]");	//관리기관
        getCmmCodeData("OGC-031", "#rightSubPopup select[name=mof_cde]");	//변류형식	
    	getCmmCodeData("OGC-007", "#rightSubPopup select[name=sae_cde]");	//제수변회전방향	
    	getCmmCodeData("OGC-008", "#rightSubPopup select[name=mth_cde]");	//제수변구동방법	
    	getCmmCodeData("OGC-001", "#rightSubPopup select[name=for_cde]");	//시설물형태	
    	getCmmCodeData("OGC-010", "#rightSubPopup select[name=cst_cde]");	//이상상태	
    	getCmmCodeData("OGC-011", "#rightSubPopup select[name=off_cde]");	//개폐여부
        
		ui.loadingBar("hide");
    });
	
}

//변류시설 등록 
function insertWtlValvPs(){
	//console.log("insertWtlValvPs()");
	
	/////////
	//유효성 체크 
	
	//필수 값 체크
	const ftr_cde = $("#insertWtlValvPsForm select[name=ftr_cde]").val();
	if(ftr_cde == "" || ftr_cde == null){
		alert("지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const pip_cde = $("#insertWtlValvPsForm select[name=pip_cde]").val();
	if(pip_cde == "" || pip_cde == null){
		alert("관로관리지형지물부호는 필수 값입니다.");
		return false;
	}
	
	const geom = $("#insertWtlValvPsForm input[name=geom]").val();
	if(geom == "" || geom == null){
		alert("위치를 등록하여 주십시오.");
		return false;
	}

	////////////
	// 파라미터 작업
	
	//항목 별 데이터 파라미터 처리	
	var feature = new ol.Feature();
	const params = $("#insertWtlValvPsForm").serializeArray();
    params.forEach((param) => {
        if (param.value) {
            feature.set(param.name, param.value);
        }
    });
 
    //공간 정보 처리
    const wkt = $("#insertWtlValvPsForm input[name=geom]").val();
    
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
    const data = {dataId: "wtl_valv_ps", geojson: geojson};
    
    
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
            //selectWtlValvPsList(1);		//다시 목록 로드
            cancelInsertWtlValvPs(); 	//창닫기
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

//변류시설 수정 화면 조회
function updateWtlValvPsView(id){
	//console.log("updateWtlValvPsView()");
	//console.log("id>"+id);
	
	//상세 정보 조회
	var detailData = getGridDetailData(id);
	
	if(!detailData && detailData == null){
		alert("변류시설 상세보기 오류");
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
		url:"/job/fcmr/wsfc/updateWtlValvPsView.do",
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

//변류시설 수정 
function updateWtlValvPs(){
	//console.log("updateWtlValvPs()");
	
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
	const params = $("#updateWtlValvPsForm").serializeArray();
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
    const data 		= {dataId: "wtl_valv_ps", geojson: geojson};

    //수정진행
    ui.loadingBar("show");
   
    $.post("/job/fcts/updateFacility.do", data)
    .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
            alert("수정 완료 되었습니다.");
            
            var page = $("#wtlValvPsListPage").val();
            selectWtlValvPsList(page);
            
            var id = $("#rightSubPopup input[name=id]").val();
        	selectWtlValvPs(id);
        	
        	$(".popup-panel .update-wtlValvPs-popup-close").trigger("click");
            
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


//변류시설 삭제
function deleteWtlValvPs(id){
	//console.log("deleteWtlValvPs(id)");
	//console.log(id);
	
	if (confirm("삭제하시겠습니까?(복구할 수 없습니다)")) {
		
		ui.loadingBar("show");
        const formData = new FormData();
        formData.append("dataId", 'wtl_valv_ps' + "");
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
                
                //var page = $("#wtlValvPsListPage").val();
                selectWtlValvPsList(1);	//첫페이지 조회
                
                cancelSelectWtlValvPs();//창닫기
                
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
function downloadExcelWtlValvPs() {
	//console.log("downloadExcelWtlValvPs()");
	
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
            //{key: "mng_cde", 			label: "관리기관code",		width:'*'},
            //{key: "mng_cde_nm", 		label: "관리기관",			width:'*'},
            //{key: "sht_num", 			label: "도엽번호",			width:'*'},
            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
            {key: "mof_cde", 			label: "변류형식code",		width:'*'},
            {key: "mof_cde_nm", 		label: "변류형식",			width:'*'},
            //{key: "mop_cde", 			label: "관재질",			width:'*'},
            {key: "std_dip", 			label: "관경",			width:'*'},
            {key: "sae_cde", 			label: "제수변회전방향code",width:'*'},
            {key: "sae_cde_nm", 		label: "제수변회전방향",	width:'*'},
            {key: "tro_cnt", 			label: "제수변총회전수",	width:'*'},
            //{key: "cro_cnt", 			label: "제수변현회전수",	width:'*'},
            {key: "mth_cde", 			label: "제수변구동방법code",width:'*'},
            {key: "mth_cde_nm", 		label: "제수변구동방법",	width:'*'},
            {key: "for_cde", 			label: "시설물형태code",	width:'*'},
            {key: "for_cde_nm", 		label: "시설물형태",		width:'*'},
            {key: "val_std", 			label: "변실규격",			width:'*'},
            //{key: "val_saf", 			label: "설정압력",			width:'*'},
            //{key: "prc_nam", 			label: "제작회사명",		width:'*'},
            //{key: "pip_cde", 			label: "관로지형지물부호",	width:'*'},
            //{key: "pip_idn", 			label: "관로관리번호",		width:'*'},
            {key: "cst_cde", 			label: "이상상태code",		width:'*'},
            {key: "cst_cde_nm", 		label: "이상상태",			width:'*'},
            {key: "off_cde", 			label: "개폐여부code",		width:'*'},
            {key: "off_cde_nm", 		label: "개폐여부",			width:'*'},
            //{key: "cnt_num", 			label: "공사번호",			width:'*'},
            {key: "ang_dir", 			label: "방향각",			width:100},
            //{key: "sys_chk", 			label: "대장초기화여부",	width:'*'},
            //{key: "org_idn", 			label: "기관관리번호",		width:'*'},
            //{key: "geom", 			label: "공간정보",			width:100}
        ],

	});


	////////////////
	//검색 옵션
	
	var options;
	if($(".groundwaterProperty").hasClass("on")){		//속성 검색
		//console.log("속성 검색 조건");
		
		const filters = [];
		
		const ftr_cde 		=	$("#lSrchOptions select[name=ftr_cde]").val();				//소화전형식
		const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
		const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//읍면동
		const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
		const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
		const sae_cde 		=	$("#lSrchOptions select[name=sae_cde]").val();				//읍면동
		
		let filterString = "";
		
		if(ftr_cde){
			filters.push("ftr_cde" + " = " + ftr_cde); 
		}
		
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
	    
		if(sae_cde){
			filters.push("sae_cde" + " = " + sae_cde); 
		}
	    
	    options = {
	        typeNames	: 'wtl_valv_ps' + "",
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
            typeNames: "wtl_valv_ps",
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
        	
        	//변류형식 코드 변경
        	var mof_cde = data.features[i].properties.mof_cde;
        	data.features[i].properties.mof_cde_nm = getCmmCodeDataArray("OGC-031", mof_cde);
        	
        	//제수변회전방향 코드 변경
        	var sae_cde = data.features[i].properties.sae_cde;
        	data.features[i].properties.sae_cde_nm = getCmmCodeDataArray("OGC-007", sae_cde);
        	
        	//제수변구동방법 코드 변경
        	var mth_cde = data.features[i].properties.mth_cde;
        	data.features[i].properties.mth_cde_nm = getCmmCodeDataArray("OGC-008", mth_cde);
        	
        	//시설물형태 코드 변경
        	var for_cde = data.features[i].properties.for_cde;
        	data.features[i].properties.for_cde_nm = getCmmCodeDataArray("OGC-001", for_cde);
        	
        	//이상상태 코드 변경
        	var cst_cde = data.features[i].properties.cst_cde;
        	data.features[i].properties.cst_cde_nm = getCmmCodeDataArray("OGC-010", cst_cde);
        	
        	//개폐여부 코드 변경
        	var off_cde = data.features[i].properties.off_cde;
        	data.features[i].properties.off_cde_nm = getCmmCodeDataArray("OGC-011", off_cde);
           
            //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        
        ///////////////
        
        //gird 적용
        FACILITY.Ax5UiGridAll.setData(list);
        
      	//엑셀 export
		FACILITY.Ax5UiGridAll.exportExcel("EXPORT_변류시설.xls");
    });

}
