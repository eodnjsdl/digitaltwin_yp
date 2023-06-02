/**
 * - 교통분석 / 교통분석 / 버스노선정보 / 버스정류소
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	var geom = {};
});

//전역 변수
var TRFICANALS={
	Ax5UiGrid :	null,			//Ax5UiGrid 변수
	spaceSearchOption:{},		//공간검색 조건 옵션 변수
}

//functions

//wfs로 읍면동 데이터 가져오기(grid 테이블 데이터 설정 전)
function getBusSttnEmdData(option) {
	
	// 읍면동 geometry 가져오기
    let emdCdVal = $("#lSrchOptions select[name=emdKorNm] option:selected").val();
	if (emdCdVal == '41830') {
		// 양평군일때 전체 검색
		cqlFilters = "emd_cd like '" + emdCdVal + "%'";
	} else {
		// 해당 읍면동 검색
		cqlFilters = 'emd_cd = ' + emdCdVal;
	}
	
	geomOptions = {
		typeNames: 'tgd_scco_emd',			// 법정구역읍면동 테이블
		sortBy : 'gid',
		sortOrder : 'DESC',
		cql : cqlFilters
	}
	
		
	// 전체(읍면동) geometry 값 가져오는 wfs 
	const promiseGeo = dtmap.wfsGetFeature(geomOptions);
	promiseGeo.then(function(data) {
		var geoArry = dtmap.util.readGeoJson(data);
		setEmdCd(geoArry);
		
		function setEmdCd(geoArry) {
			let geoInfo = [];
			let optionText = '';
			
			// geoArry[i].values_.emd_cd => 읍면동 코드. 
			for (let i = 0; i < geoArry.length; i++) {
				const info = {emdCd : geoArry[i].values_.emd_cd, geometry : geoArry[i].values_.geometry};
				geoInfo.push(info);
				
				// enter키로 조회시 태그 추가 방지
				if(option!=1) {
					optionText += '<option value="' + geoArry[i].values_.emd_cd + '">' + geoArry[i].values_.emd_kor_nm + '</option>';
				}
			}
			geom = geoInfo;
			
			// 읍면동  selectbox option
			$("#lSrchOptions select[name=emdKorNm]").append(optionText);
			
			return selectBusSttnList(1, geom);
    	}
    });
	
}

//초기화
function initBusSttn(){

	//경유노선조회 팝업 창 닫기
	if($("#rightSubPopup").hasClass("opened")){
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
        clearSpaceEditTool();	//공간정보 편집창 닫기
    }

	TRFICANALS.Ax5UiGrid.focus(-1);	//grid 선택창 초기화

}

////////////////////
//목록 조회

//버스정류소 리스트 로드 이후 처리
function getBusSttn(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",
    });

	//grid 기본 세팅
	var $container = $("#container");
    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]')
    $target.css('height', 'inherit');
	
    TRFICANALS.Ax5UiGrid = null;	//ax5uigrid 전역 변수 
    
    TRFICANALS.Ax5UiGrid = new ax5.ui.grid();
	
    TRFICANALS.Ax5UiGrid.setConfig({
		target:  $target,
        sortable: true,
        multipleSelect: false,
        columns: [
            {key: "sttn_id", 			label: "정류소아이디",		width:'*'},
            {key: "sttn_nm", 			label: "정류소명",			width:'*'},
            {key: "sttn_no", 			label: "정류소번호",		width:'*'},
            //{key: "area_nm", 			label: "지역명",			width:'*'},
            //{key: "cmptnc_cd", 		label: "관할코드",			width:'*'},
            //{key: "centr_cartrk_at", 	label: "중앙차로여부",		width:'*'},
            {key: "x_crdnt", 			label: "x좌표",			width:'*'},
            {key: "y_crdnt", 			label: "y좌표",			width:'*'},
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
            	selectBusSttnList(this.page.selectPage+1, geom);
            }
        },
        body: {
        	onClick: function () {
                
                //공간정보 편집도구 닫기
            	if($(".space-edit-tool").hasClass("opened")){
            		clearSpaceEditTool();
                }
        		selectBusSttn(this.item.id);	//정류소경유노선 조회 페이지 로드
            }
        },
	});
    
	//목록 조회  - 1 page
	selectBusSttnList(1);
	
}


//버스정류소 목록 조회
function selectBusSttnList(page, geom) {
	
	initBusSttn();	//초기화
		
	//공간 검색 / 사용자 정의 일 경우 이외에는  그리기 영역 지우기
	if($(".groundwaterSpace").hasClass("on")){
		const geomSrchType = $(".trafficAnalysis-spatial-search").closest('.search-area').find('input[name="rad-trafficAnalysis-area"]:checked').val();
		if(geomSrchType != "custom"){
			dtmap.draw.dispose();		//그리기 포인트 삭제
			dtmap.draw.clear();			//그리기 영역 초기화
		}
	}
		
	//페이지 변수세팅
	if(page){
		$("#tgdBusSttnInfoListPage").val(page);
	}else{
		alert("목록 페이지 오류");
		return false;
	}

	////////////////
	//검색 옵션
	
	var options;
	if($(".groundwaterProperty").hasClass("on")){		//속성 검색
		
		const filters = [];
		
		const sttn_nm		=	$("#lSrchOptions input[name=sttn_nm]").val();
		const sttn_no		=	$("#lSrchOptions input[name=sttn_no]").val();
		
		let filterString = "";
		
		if(sttn_nm){
			filters.push("sttn_nm" + " like " + sttn_nm); 
		}
		if(sttn_no){
			filters.push("sttn_no" + " = " + sttn_no); 
		}
	    
	    options = {
	        typeNames	: 'tgd_bus_sttn_info' + "",
	        filter 		: filters,
	        perPage 	: 10,
	        page 		: page,
	        sortBy		: 'sttn_id',
	        sortOrder	: 'DESC',
	        //sortOrder	: 'ASC'
	    };
	    
	    var emdCd = $("#lSrchOptions select[name=emdKorNm] option:selected").val();	// 읍면동
		if (emdCd != '41830') {
			let geo = findEmdCd(geom, emdCd);
		    if (geo != null) {
		    	options.geometry = geo;
		    }
		}
		
		function findEmdCd(geom, emdCd) {
		    for (let i = 0; i < geom.length; i++) {
		    	if (geom[i].emdCd == emdCd) {
		    		return geom[i].geometry;
		    	} 
		    }
		}
	    
	}else if($(".groundwaterSpace").hasClass("on")){		//공간 검색
		
		const $parent 	= $(".trafficAnalysis-spatial-search").closest('.search-area');
        const type 		= $parent.find('input[name="rad-trafficAnalysis-area"]:checked').val();

        options = {
            typeNames: "tgd_bus_sttn_info",
            perPage 	: 10,
	        page 		: page,
	        sortBy		: 'sttn_id',
	        sortOrder	: 'DESC',
        }
        
        if (type === 'extent') {
        	options.bbox 		= TRFICANALS.spaceSearchOption.bbox;
        } else {
        	options.geometry 	= TRFICANALS.spaceSearchOption.geometry;
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
        
        //데이터 코드 변환
        for (let i = 0; i < data.features.length; i++) { 
        	
        	//좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
        	data.features[i].properties.geomObj = data.features[i].geometry;
        	
        	const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        
        ///////////////
        
        //gird 적용
        TRFICANALS.Ax5UiGrid.setData(
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
        	
            return {
                marker: {
                    src: '/images/map/busSt_01_ico.png'
                },
                label: {
                	text: ''
                }
            }
            
        });

        dtmap.vector.fit();
       
    });
	
}

//////////////
//정류소경유노선

//정류소경유노선 조회
function selectBusSttn(id){
	
	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	const typeName	= idArray[0];
	
	if(typeName != "tgd_bus_sttn_info"){
		alert("정류소경유노선 조회 오류");
		return false;
	}
	
	const sttn_id 		= idArray[1];	
	if(sttn_id){
		filters.push("sttn_id" + " = " + sttn_id); 
	}else{
		alert("정류소경유노선 조회 오류");
		return false;
	}
	
	var options;
	options = {
		typeNames	: 'tgd_bus_sttn_info' + "",
		filter 		: filters,
	}
  
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function (data) {
	  	
	  	if(data.features.length != 1){
	  		alert("정류소경유노선 조회 오류")
	  		return false;
	  	}
	      	
	    //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
	  	data.features[0].properties.geomObj = data.features[0].geometry;
	  	
	  	var detailData = data.features[0].properties;
	  	detailData.id = id;
	  	
	  	selectBusSttnView(detailData);	//정류소경유노선 조회 페이지에 데이터 전달
	  	
	});
  
}

//정류소경유노선 조회 페이지 불러 오기
function selectBusSttnView(detailData){
	
	// zoom 변경
	if (dtmap.mod == "2D") {
		//map2d.view.setZoom(5);
	} else if (dtmap.mod == "3D") {
		var center = map3d.getCenter();
		center[2] = 57000;		// altitude 변경
		map3d.setCenter(center);
	}
	
	if(!detailData && detailData == null){
		alert("정류소경유노선 조회 오류");
		return false;
	}
	
	//파라미터 정리
	var formData = new FormData();
	
	for ( var key in detailData ) {
		if(detailData[key]){				//null 값이나 빈칸은 제외
			formData.append(key, detailData[key]);
		}
	}
	
	var sttn_id = detailData.sttn_id;
	var sttn_nm = detailData.sttn_nm;
	
	ui.loadingBar("show");
	
	// 정류소경유노선 조회
	$.ajax({
        url: "/job/tran/brin/selectBusSttn.do",
        type: "POST",
        data : {
			"sttnId" 			: sttn_id,
		},
        success: function(result) {
        	
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			$(container).html(result);
			
			$('#tgdBusSttnInfo').append(sttn_nm);
			$('#data-stNumb').val(sttn_id);
			
			dtmap.vector.select(detailData.id);	//지도에  표시
			
			//그리드에 행전체 선택
			var gridList = TRFICANALS.Ax5UiGrid.list;
			
			for(var i=0; i<gridList.length; i++){
				var grid = gridList[i];
				if(sttn_id == grid.sttn_id){
					var dindex = grid.__index;
					TRFICANALS.Ax5UiGrid.clearSelect();
					TRFICANALS.Ax5UiGrid.focus(dindex);
				}
			}
        }
        ,error: function(error) {
            console.log(error);
        }
        , complete : function(){
			ui.loadingBar("hide");
		}
    });

}

//속성 검색 조회 버튼
function searchBusSttnFilters() {
	$('.info-attribute-search').on('click', function() {
		getBusSttnEmdData(1);	// enter키로 조회시 태그 추가 방지
	});
}

/////////////////////////
//지도 아이콘(객체) 클릭시 이벤트
function onTrficAnalsSelectEventListener(e){
	//console.log("onTrficAnalsSelectEventListener(e)");
	//console.log(e);
	if(e){
		
		var id = e.id; //피쳐 아이디
		
		if(id){
			var idArray = id.split(".");
			const featureType	= idArray[0];
			
			if(featureType == "tgd_bus_sttn_info"){						//교통분석 - 버스노선정보
				selectBusSttn(id);
			}else{
				alert("지도 객체 선택 오류");
				return false;
			}
		}
	}
}
