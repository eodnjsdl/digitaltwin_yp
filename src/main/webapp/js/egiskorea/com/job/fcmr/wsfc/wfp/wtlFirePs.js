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

/////////
//소방시설

//소방시설 옵션 설정
function selectWtlFirePsSearchOption(){
	console.log("selectWtlFirePsSearchOption()");
	
	 ui.loadingBar("show");
	//속성검색 조건 세팅
	$("#lSrchOptions").load("/job/fcmr/wsfc/wfp/getWtlFirePsListSrchOpView.do", function () {
		toastr.success("/job/fcmr/wsfc/wfp/getWtlFirePsListSrchOpView.do", "페이지🙂호🙂출🙂");
		
		//옵션 값 세팅
		getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동
		getCmmCodeData("OGC-048", "#lSrchOptions select[name=mof_cde]");	//소화전형식	
		$(".groundwaterProperty .facility-attribute-search").attr("onclick", "selectWtlFirePsList('1');");	//검색 버튼 변경
		
		/////////////////
		
		//grid 기본 세팅
		var $container = $("#container");
	    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]')
	    $target.css('height', 'inherit');
		
	    baseGrid = null;	//axgrid 전역 변수 
	    
		baseGrid = new ax5.ui.grid();
		
		baseGrid.setConfig({
			target:  $target,
	        sortable: true,
	        multipleSelect: false,
	        columns: [
	            //{key: "gid", 				label: "아이디",			width:200},
	            //{key: "ftr_cde", 			label: "지형지물부호코드",	width:100},
	            {key: "ftr_cde_nm", 		label: "지형지물부호",		width:'*'},
	            {key: "ftr_idn", 			label: "관리번호",			width:'*'},
	            {key: "hjd_cde", 			label: "읍면동",			width:'*'},
	            {key: "mng_cde", 			label: "관리기관",			width:'*'},
	            {key: "sht_num", 			label: "도엽번호",			width:'*'},
	            {key: "ist_ymd", 			label: "설치일자",			width:'*'},
	            {key: "hom_num", 			label: "수용가번호",		width:'*'},
	            {key: "mof_cde", 			label: "소화전형식",		width:'*'},
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
	        	// 데이터 행의 click 이벤트를 정의합니다. 이벤트 변수 및 this 프로퍼티는 아래 onclick 함수를 참고하세요
	        	onClick: function () {
	                //console.log(this.item);
	                //alert("아이디:"+this.item.gid);
	                
	                getWtlFirePsDetail(this.item);	//소방 시설 상세 페이지 로드
	            }
	        }
			
		});
		
		 ui.loadingBar("hide");
	});
	
}

//소방시설 목록 조회
function selectWtlFirePsList(page) {
	//console.log("selectWtlFirePsList(page)");
	//console.log("page>>>"+page);
	
	//검색 조건
	const filters = [];
	
	const hjd_cde 		=	$("#lSrchOptions select[name=hjd_cde]").val();				//읍면동
	const mof_cde 		=	$("#lSrchOptions select[name=mof_cde]").val();				//소화전형식
	const std_dip_min 	=	$("#lSrchOptions input[name=std_dip_min]").val();			//관경 최소 값
	const std_dip_max 	=	$("#lSrchOptions input[name=std_dip_max]").val();			//관경 최대 값
	
	//console.log("hjd_cde>>"+hjd_cde);
	//console.log("mof_cde>>"+mof_cde);
	//console.log("std_dip_min>>"+std_dip_min);
	//console.log("std_dip_max>>"+std_dip_max);
	
	let filterString = "";
	
	if(hjd_cde){
		filters.push("hjd_cde" + "=" + hjd_cde+"00"); 
	}
	
	if(mof_cde){
		filters.push("mof_cde" + "=" +"'"+ mof_cde +"'");
	}
	
	if(std_dip_min && std_dip_max){
		filters.push("std_dip" + " BETWEEN " + std_dip_min +" AND " + std_dip_max);
	}else if(std_dip_min){
		filters.push("std_dip" + ">=" + std_dip_min);
	}else if(std_dip_max){
		filters.push("std_dip" + "<=" + std_dip_max);
	}
	
	//console.log("filters>>>");
	//console.log(filters)

	var filter = "";
	
	if(filters.length>0){
		for(var i=0; i<filters.length; i++){
			if(i < (filters.length-1) ){
				filter += filters[i]+"&&";
			}else{
				filter += filters[i];
			}
		}
	}
	
	//console.log(filter);
	
    var options;
    options = {
        typeNames	: 'wtl_fire_ps' + "",
        filter 		: filter,
        perPage 	: 10,
        page 		: page
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
        //그리드 데이터 전처리
        const list = [];
        //console.log("data.features.length>>>"+data.features.length);
        var total = data.totalFeatures;
        var totalPages = Math.ceil(total/10);
        
        //console.log("total>>>"+total);
        //console.log("totalPages>>>"+totalPages);
        if(total>0){
        	$("#bottomPopup .bbs-list-num").html("조회결과:"+total+"건");
        }
        
        for (let i = 0; i < data.features.length; i++) {
        	
        	//지형지물부호 코드 변경
        	//console.log(data.features[i].properties);
        	var ftr_cde = data.features[i].properties.ftr_cde;
        	//console.log(ftr_cde);
        	if(ftr_cde == "SA119"){
        		//console.log(ftr_cde+">>>"+"급수탑");
        		data.features[i].properties.ftr_cde_nm = "급수탑";
        	}else if(ftr_cde == "SA118"){
        		//console.log(ftr_cde+">>>"+"소화전");
        		data.features[i].properties.ftr_cde_nm = "소화전";
        	}
        	
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
function getWtlFirePsDetail(detailData){
	console.log("getWtlFirePsDetail(detailData)");
	console.log(detailData);

	ui.loadingBar("show");
	
	$.ajax({
		url:"/job/fcmr/wsfc/wfp/getWtlFirePsDetail.do",
		type: "POST",
		data: JSON.stringify(detailData),
		dataType: 'html',
		contentType: "application/json; charset=utf-8",
        processData: false,
		success:function(result) {
			console.log(result);
			
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
	
    /*$(container).load("/job/fcmr/base/getWtlFirePsDetail.do", function () {
    	
    	
        toastr.success("/job/fcmr/base/getWtlFirePsDetail.do", "페이지🙂호🙂출🙂");
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
        
        if(categoryName){
        	selectFacilityDetail(categoryName);
        }
    	
    });*/
	
	
}








