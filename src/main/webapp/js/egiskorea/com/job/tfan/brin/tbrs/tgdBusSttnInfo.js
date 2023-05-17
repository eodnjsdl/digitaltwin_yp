/**
 * - 교통분석 / 교통분석 / 버스노선정보 / 버스정류소
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	
});

//functions

//초기화
function tgdBusSttnInfoInit(){

	//등록, 상세, 수정 팝업 창 닫기
	if($("#rightSubPopup").hasClass("opened")){
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
	
	//공간정보 편집도구 닫기
	if($(".space-edit-tool").hasClass("opened")){
        clearSpaceEditTool();	//공간정보 편집창 닫기
    }
	
	arrangeTrficAnalsAddBtnMode();	//등록 버튼 제어

	TRFICANALS.Ax5UiGrid.focus(-1);	//grid 선택창 초기화

}


////////////////////
//목록 조회

//버스정류소 리스트 로드 이후 처리
function tgdBusSttnInfoListProcess(){
	
	$(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside",
    });
    
    //옵션 값 세팅
	getTrficAnalsCmmCodeData("YPE001", 	"#lSrchOptions select[name=hjd_cde]");	//읍면동	
	
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
            //{key: "geom", 			label: "공간정보",			width:'*'}
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
            	selectTgdBusSttnInfoList(this.page.selectPage+1);
            }
        },
        body: {
        	onClick: function () {
        		//this.self.select(this.dindex);	//행 선택 되게 수정
                
                //공간정보 편집도구 닫기
            	if($(".space-edit-tool").hasClass("opened")){
            		clearSpaceEditTool();
                }
        		selectTgdBusSttnInfo(this.item.id);	//정류소경유노선 조회 페이지 로드
            }
        },
	});
    
	//목록 조회  - 1 page
	selectTgdBusSttnInfoList(1);
	
}


//버스정류소 목록 조회
function selectTgdBusSttnInfoList(page) {

	tgdBusSttnInfoInit();	//초기화
		
	//공간 검색 / 사용자 정의 일 경우 이외에는  그리기 영역 지우기
	if($(".groundwaterSpace").hasClass("on")){
		const geomSrchType = $(".trafficAnalysis-spatial-search").closest('.search-area').find('input[name="rad-trafficAnalysis-area"]:checked').val();
		//console.log(geomSrchType);
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
		//console.log("속성 검색 조건");
		
		const filters = [];
		
		const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
		const sttn_nm		=	$("#lSrchOptions input[name=sttn_nm]").val();
		const sttn_no		=	$("#lSrchOptions input[name=sttn_no]").val();
		
		let filterString = "";
		
		if(hjd_cde){
			filters.push("geom" + " = " + hjd_cde); 
		}
		if(sttn_nm){
			filters.push("sttn_nm" + " = " + sttn_nm); 
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
	    }
		
	}else if($(".groundwaterSpace").hasClass("on")){		//공간 검색
		//console.log("공간 검색 조건")
		
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
        
        //console.log(data.features);
        
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
                    src: '/images/poi/subwayStation_poi.png'
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
//상세정보 보회

//정류소경유노선 조회
function selectTgdBusSttnInfo(id){
	//console.log("selectTgdBusSttnInfo(id)");
	//console.log(id);

	//검색 조건
	const filters = [];
	
	var idArray = id.split(".");
	//console.log(idArray);
	const typeName	= idArray[0];
	
	if(typeName != "tgd_bus_sttn_info"){
		alert("상세보기 오류");
		return false;
	}
	
	const sttn_id 		= idArray[1];	
	if(sttn_id){
		filters.push("sttn_id" + " = " + sttn_id); 
	}else{
		alert("상세보기 오류");
		return false;
	}
	
	var options;
	options = {
		typeNames	: 'tgd_bus_sttn_info' + "",
		filter 		: filters,
	}
  
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function (data) {
	  	//console.log(data);
	  	
	  	if(data.features.length != 1){
	  		alert("상세보기 오류")
	  		return false;
	  	}
	      	
	    //좌표 처리  geometry로 변수명을 정하면 기존것과 충돌 발생
	  	data.features[0].properties.geomObj = data.features[0].geometry;
	  	
	  	var detailData = data.features[0].properties;
	  	detailData.id = id;
	  	
	  	selectTgdBusSttnInfoView(detailData);	//상세 페이지에 데이터 전달
	  	
	});
  
}

//상세 정보 페이지 불러 오기
function selectTgdBusSttnInfoView(detailData){
	//console.log("selectTgdBusSttnInfoView(detailData)");
	//console.log(detailData);
	
	if(!detailData && detailData == null){
		alert("정류소경유노선 오류");
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
        url: "/job/tfan/brin/selectTbdThrghRouteInfo.do",
        type: "POST",
        data : {
			"sttnId" 			: sttn_id,
		},
        success: function(result) {
        	
        	console.log(result);
        	
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			$(container).html(result);
			
			$('#tgdBusSttnInfo').append(sttn_nm + " (" + sttn_id + ")");
			
			dtmap.vector.select(detailData.id);	//지도에  표시
			
			//그리드에 행전체 선택되게 수정
			//console.log(detailData);
			var gridList = TRFICANALS.Ax5UiGrid.list;
			
			for(var i=0; i<gridList.length; i++){
				//console.log(gridList[i]);
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