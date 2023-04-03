/**
 * - 업무 / 시설관리 / 상수도 시설 / 유량계
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("wtlFlowPs.js");
	console.log("유량계");
});

// 유량계 옵션 설정
function selectWtlFlowPsSearchOption(){
	console.log("selectWtlFlowPsSearchOption()");
	
	 ui.loadingBar("show");
	// 속성검색 조건 세팅
	$("#lSrchOptions").load("/job/fcmr/wsfc/wflp/getWtlFlowPsListSrchOpView.do", function () {
		toastr.success("/job/fcmr/wsfc/wflp/getWtlFlowPsListSrchOpView.do", "페이지🙂호🙂출🙂");
		
		//옵션 값 세팅
		getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동		
		getCmmCodeData("OGC-048", "#lSrchOptions select[name=mof_cde]");	//유량계형식	
		
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
                {key: "ftr_cde", label: "지형지물부호"},
                {key: "ftr_idn", label: "관리번호"},
                {key: "hjd_cde", label: "읍면동"},
                {key: "mng_cde", label: "관리기관"},
                {key: "sht_num", label: "도엽번호"},
                {key: "ist_ymd", label: "설치일자"},
                {key: "gag_cde", label: "유량계종류"},
                {key: "mof_cde", label: "유량계형식"},
                {key: "std_dip", label: "관경"},
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
	            	selectWtlFlowPsList(this.page.selectPage+1);
	            }
	        },
	        body: {
	        	// 데이터 행의 click 이벤트를 정의합니다. 이벤트 변수 및 this 프로퍼티는 아래 onclick 함수를 참고하세요
	        	onClick: function () {
	                console.log(this.item);
	                alert(this.item.hjd_cde);
	                getFlowDetailView(this.item);
	            }
	        }
			
		});
		
		 ui.loadingBar("hide");
	});
	
}

//소방시설 목록 조회
function selectWtlFlowPsList(page) {
	console.log("selectWtlFlowPsList(page)");
	console.log("page>>>"+page);
	
    var options;
    options = {
        typeNames: 'wtl_flow_ps' + "",
        perPage : 10,
        page : page
    }
    
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function (data) {
        //그리드 데이터 전처리
        const list = [];

        var total = data.totalFeatures;
        var totalPages = Math.ceil(total/10);
        
        if(total>0){
        	$("#bottomPopup .bbs-list-num").html("조회결과:"+total+"건");
        }
        
        for (let i = 0; i < data.features.length; i++) {
        	/* 그리드에서 한글로 나타내기 하드코딩 start */
        	const codeMap = {
        			  "SA117": "유량계",
        			  "4183025000": "양평읍",
        			  "4183040000" : "용문면",
        			  "4183031000" : "강상면",
        			  "4183032000" : "강하면",
        			  "4183033000" : "양서면",
        			  "4183034000" : "용문면",
        			  "4183035000" : "서종면",
        			  "GAG004": "구역유량계",
        			  "MOF100": "월트만식"
        			};

        			data.features.forEach(feature => {
        			  if (feature.properties.ftr_cde in codeMap) {
        			    feature.properties.ftr_cde = codeMap[feature.properties.ftr_cde];
        			  }
        			  if (feature.properties.hjd_cde in codeMap) {
        			    feature.properties.hjd_cde = codeMap[feature.properties.hjd_cde];
        			  }
        			  if (feature.properties.gag_cde in codeMap) {
        			    feature.properties.gag_cde = codeMap[feature.properties.gag_cde];
        			  }
        			  if (feature.properties.mof_cde in codeMap) {
        			    feature.properties.mof_cde = codeMap[feature.properties.mof_cde];
        			  }
        			});
        	/* 그리드에서 한글로 나타내기 하드코딩 end */

        	/* 읍면동별 검색하기 하드코딩 start */
   			const hjd_cde = $("select[name='hjd_cde']").val();					// 선택한 읍면동 value
   			const gag_cde = $("select[name='gag_cde']").val();					// 선택한 유량계종류 value
 			const mof_cde = $("select[name='mof_cde']").val();					// 선택한 유량계형식 value
			
   			const hjdMap = {													// value별 읍면동 name
			  "4183040000": "용문면",
			  "4183025000": "양평읍",
			};
			const gagMap = {													// value별 유량계종류 name
			  "GAG004": "구역유량계",
			};
			const mofMap = {													// value별 유량계형식 name
			  "MOF100": "월트만식"
			};
			
			// 전체선택 || 읍면동, 유량계종류, 유량계형식별 옵션선택
			if ((!hjd_cde || data.features[i].properties.hjd_cde === hjdMap[hjd_cde]) && 
			    (!gag_cde || data.features[i].properties.gag_cde === gagMap[gag_cde]) &&
			    (!mof_cde || data.features[i].properties.mof_cde === mofMap[mof_cde])) {
			  const { id, properties } = data.features[i];
			  list.push({...properties, ...{id: id}});
			}
			/* 읍면동별 검색하기 하드코딩 end */
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

//상세 페이지 로드
function getFlowDetailView(){
	console.log("getFlowDetailView()");	
	
	ui.openPopup("rightSubPopup");
	var container = "#rightSubPopup";
    $(container).load("/job/fcmr/wsfc/wflp/getFlowDetailView.do", function () {
        toastr.success("/job/fcmr/wsfc/wflp/getFlowDetailView.do", "유량계 상세 페이지🙂호🙂출🙂");
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside",
        });
    });
	
}