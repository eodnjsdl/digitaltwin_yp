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
	            {key: "gid", 				label: "아이디"},
	            {key: "ftr_cde", 			label: "지형지물부호"},
	            {key: "ftr_idn", 			label: "관리번호"},
	            {key: "hjd_cde", 			label: "읍면동"},
	            {key: "mng_cde", 			label: "관리기관"},
	            {key: "sht_num", 			label: "도엽번호"},
	            {key: "ist_ymd", 			label: "설치일자"},
	            {key: "hom_num", 			label: "수용가번호"},
	            {key: "mof_cde", 			label: "소화전형식"},
	            {key: "fir_dip", 			label: "소화전구경"},
	            {key: "std_dip", 			label: "관경"},
	            {key: "sup_hit", 			label: "급수탑높이"},
	            {key: "sys_chk", 			label: "대장초기화여부"},
	            {key: "ang_dir", 			label: "방향각"},
	            {key: "geom", 				label: "공간정보"},
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
	                console.log(this.item);
	                alert("아이디:"+this.item.gid);
	            }
	        }
			
		});
		
		 ui.loadingBar("hide");
	});
	
}

//소방시설 목록 조회
function selectWtlFirePsList(page) {
	console.log("selectWtlFirePsList(page)");
	console.log("page>>>"+page);
	
    var options;
    options = {
        typeNames: 'wtl_fire_ps' + "",
        perPage : 10,
        page : page
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
        		data.features[i].properties.ftr_cde = "급수탑";
        	}else if(ftr_cde == "SA118"){
        		//console.log(ftr_cde+">>>"+"소화전");
        		data.features[i].properties.ftr_cde = "소화전";
        	}
        	
            const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
       
        //console.log("page>>"+page);
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



////////
//상수관로

///////
//유량계

///////
//상수맨홀

//////////
//상수관로심도

//////
//수압계

//////
//배수지

///////
//급수관로

///////
//변류시설






