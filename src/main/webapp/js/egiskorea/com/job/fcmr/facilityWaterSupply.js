/**
 * - 업무 / 시설관리 / 상수도 시설
 * 
 * @returns
 */

//전역변수
var baseGrid = null;

//jqeury
$(document).ready(function(){
	console.log("facilityWaterSupply.js");
	console.log("상수도시설");
	
	
	
});

//functions

//상수도 관리 목록 조회
function getWtlFacilityList(){
	console.log("getWtlFacilityList()");
     
     var $container = $("#container");
     var $target = $container.find('#bottomPopup .facility-select')
     
     let list = [	//DB 처리 필요?
      {value: "WtlFirePs", title: "소방시설"},
      {value: "WtlPipeLm", title: "상수관로"},
      {value: "WtlFlowPs", title: "유량계"},
      {value: "WtlManhPs", title: "상수맨홀"},
      {value: "WtlPipePs", title: "상수관로심도"},
      {value: "WtlPrgaPs", title: "수압계"},
      {value: "WtlServPs", title: "배수지"},
      {value: "wtlSplyLs", title: "급수관로"},
      {value: "wtlValvPs", title: "변류시설"}
     ];
     
     $target.empty();
     
     var options="";
     for (let i = 0; i < list.length; i++) {
    	 //console.log(list[i]);
    	 options += "<option value='"+list[i].value+"'>"+list[i].title+"</option>";
     }
     
     $target.append(options);
     
     //이벤트 추가
     $target.on('change', function() {
    	 getWaterSupplyFacility(this.value);
	 });
     
     //첫번째 항목 강제 실행
     $("#bottomPopup .facility-select option:eq(0)").trigger('change');	
     
}


//상수도시설 분기
function getWaterSupplyFacility(name){
	console.log("getWaterSupplyFacility(name)");
		
	if(name){
		if(name == "WtlFirePs"){			//소방시설
			selectWtlFirePsSearchOption();
			selectWtlFirePsList(1);	
		}else if(name == "WtlPipeLm"){		//상수관로
			
		}else if(name == "WtlFlowPs"){		//유량계
			
		}else if(name == "WtlManhPs"){		//상수맨홀
			
		}else if(name == "WtlPipePs"){		//상수관로심도
			
		}else if(name == "WtlPrgaPs"){		//수압계
			
		}else if(name == "WtlServPs"){		//배수지
			
		}else if(name == "wtlSplyLs"){		//급수관로
			
		}else if(name == "wtlValvPs"){		//변류시설
			
		}else{
			alert("잘못된 호출")
			return;
		}
		
	}
}

/////////
//소방시설

//소방시설 옵션 설정
function selectWtlFirePsSearchOption(){
	console.log("selectWtlFirePsSearchOption()");
	
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
	            navigationItemCount: 9,
	            height: 30,
	            display: true,
	            firstIcon: '|<',
	            prevIcon: '<',
	            nextIcon: '>',
	            lastIcon: '>|',
	            onChange: function () {
	            	//alert(this.page.selectPage);
	            	selectWtlFirePsList(this.page.selectPage+1);
	            }
	        }
			
		});
		
	});
	
}

//소방시설 목록 조회
function selectWtlFirePsList(page) {
	console.log("selectWtlFirePsList(page)");
	console.log("page>>>"+page);
	
    var options;
    options = {
        typeNames: 'wtl_fire_ps' + "",
        //perPage : 10,
        page : page
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
        //그리드 데이터 전처리
        const list = [];
        for (let i = 0; i < data.features.length; i++) {
            const {id, properties} = data.features[i];
            list.push({...properties, ...{id: id}});
        }
        //grid.setData(list);
        console.log("page>>"+page);
        baseGrid.setData(
        	{	
        		list: list,
        		page: {
        			currentPage : page-1,
        			pageSize:10,
        			totalElements: 500,
        			totalPages:50
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






