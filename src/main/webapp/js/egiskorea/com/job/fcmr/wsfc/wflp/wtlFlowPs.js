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
		/* 토스트 메시지 start */
		toastr.success("/job/fcmr/wsfc/wflp/getWtlFlowPsListSrchOpView.do", "페이지🙂호🙂출🙂");
		/* 토스트 메시지 start */
		
		//옵션 값 세팅
		getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동		
		getCmmCodeData("OGC-141", "#lSrchOptions select[name=gag_cde]");	//유량계종류	
		getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//유량계형식	
		
		//grid 기본 세팅
		var $container = $("#container");
	    var $target = $container.find('#baseGridDiv [data-ax5grid="attr-grid"]')
	    $target.css('height', 'inherit');
		
	    baseGrid = null;								//axgrid 전역 변수 
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
	        	onClick: function () {					// 데이터 행의 click 이벤트 정의
	                getFlowDetailView(this.item);
	            }
	        }
			
		});
		 ui.loadingBar("hide");
	});
	
}

//유량계 목록 조회
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
        			  "4183034000" : "옥천면",
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
//			if ((!hjd_cde || data.features[i].properties.hjd_cde === hjdMap[hjd_cde]) && 
//			    (!gag_cde || data.features[i].properties.gag_cde === gagMap[gag_cde]) &&
//			    (!mof_cde || data.features[i].properties.mof_cde === mofMap[mof_cde])) {
			  const { id, properties } = data.features[i];
			  list.push({...properties, ...{id: id}});
//			}
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
function getFlowDetailView(item){
	var item = item;	// 받아온 데이터
	if(item.prc_nam == null){	// 제작회사명 null 값 처리
		item.prc_nam = "-";
	}
	if(item.cnt_num == null){	// 공사번호 null 값 처리
		item.cnt_num = "-";
	}
    
    var options;		// wfsGetFeature 파라미터 설정
    options = {
        typeNames: 'wtl_flow_ps' + "",
    }
    
    /* 리버스 지오코딩에 필요한 콜백함수 start */
    const promise = dtmap.wfsGetFeature(options);
    promise.then(function(data) {
    	var coordinates = data.features[item.gid].geometry.coordinates;								// body 클릭시 해당 좌표
    	var reverseGeoResult = reverseGeocoding(coordinates[0],coordinates[1]).done((result)=> {	// 콜백함수 start
			// 리버스 지오코딩(위치 주소화) 결과 정리
    		var mntn = result.mntnYn == "2" ? "산 " : "";												// 임야대장일 경우 "산"
    		var reverseGeoResultStr = result.emdKorNm + " " + result.liKorNm + " " + mntn
			+ parseInt(result.lnbrMnnm).toString() + "-" + parseInt(result.lnbrSlno).toString();
			
			/* 유량계 상세페이지에 들어갈 내용 start */
			let tag = `<div class="popup-body">
			<div class="data-write-wrap" style="height: 377px;">
				<div class="scroll-y">
					<div class="data-default">
						<table class="data-detail">
							<colgroup>
								<col style="width: 23%;">
								<col style="width: auto;">
								<col style="width: 23%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">지형지물부호</th>
									<td>` + item.ftr_cde + `</td>
									<th scope="row">관리번호</th>
									<td>` + item.ftr_idn + `</td>
								</tr>
								<tr>
									<th scope="row">행정읍면동</th>
									<td>` + item.hjd_cde + `</td>
									<th scope="row">관리기관</th>
									<td>` + item.mng_cde + `</td>
								</tr>
								<tr>
									<th scope="row">도엽번호</th>
									<td>` + item.sht_num + `</td>
									<th scope="row">설치일자</th>
									<td>` + item.ist_ymd + `</td>
								</tr>
								<tr>
									<th scope="row">유량계종류</th>
									<td>` + item.gag_cde + `</td>
									<th scope="row">유량계형식</th>
									<td>` + item.mof_cde + `</td>
								</tr>
								<tr>
									<th scope="row">관경(mm)</th>
									<td>` + item.std_dip + `</td>
									<th scope="row">제작회사명</th>
									<td>` + item.prc_nam + `</td>
								</tr>
								<tr>
									<th scope="row">관로지형지물부호</th>
									<td>` + item.pip_cde + `</td>
									<th scope="row">관로관리번호</th>
									<td>` + item.pip_idn + `</td>
								</tr>
								<tr>
									<th scope="row">공사번호</th>
									<td>` + item.cnt_num + `</td>
									<th scope="row">방향각</th>
									<td>` + item.ang_dir + `</td>
								</tr>
								<tr>
								    <th scope="row">위치</th>
								    <td colspan="3">
								        <div class="form-row">
								            <div class="col">
								                <input type="text" class="form-control txt-geometry-address" value="` + reverseGeoResultStr + `" readonly="readonly">
								            </div>
								            <div class="col-auto">
								                <button type="button" class="btn type01 bi-location btn-select-map" data-popup="space-edit-tool"></button>
								            </div>
								        </div>
								    </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap justify-content-end">
					<div><button type="button" class="btn basic bi-edit" onclick="getFlowUpdateView()">수정</button> <button type="button" class="btn basic bi-delete">삭제</button></div>
				</div>
			</div>`;
			/* 유량계 상세페이지에 들어갈 내용 end */
			
		    const element = $(tag);				// container에 삽입할 요소
			
		    // 팝업 변수 설정
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			
			/* 팝업 load 함수 start */
		    $(container).load("/job/fcmr/wsfc/wflp/getFlowDetailView.do", function () {
				$(container).append(element);	// container에 요소 추가하기
				
				/* 토스트 메시지 start */
//		        toastr.success("/job/fcmr/wsfc/wflp/getFlowDetailView.do", "유량계 상세 페이지🙂호🙂출🙂");
//		        $(".scroll-y").mCustomScrollbar({
//		            scrollbarPosition: "outside",
//		        });
		        /* 토스트 메시지 end */
		    });
		    /* 팝업 load 함수 end */
    	});																							// 콜백함수 end
    });
    /* 리버스 지오코딩에 필요한 콜백함수 end */
}

//수정 페이지 로드
function getFlowUpdateView(){

			/* 유량계 상세페이지에 들어갈 내용 start */
			let tag = ``;
			/* 유량계 상세페이지에 들어갈 내용 end */
			
		    const element = $(tag);				// container에 삽입할 요소
			
		    // 팝업 변수 설정
			ui.openPopup("rightSubPopup");
			var container = "#rightSubPopup";
			
			/* 팝업 load 함수 start */
		    $(container).load("/job/fcmr/wsfc/wflp/getFlowUpdateView.do", function () {
		    	getEmdKorNmCode("#lSrchOptions select[name=hjd_cde]");				//읍면동
				getCmmCodeData("OGC-141", "#lSrchOptions select[name=gag_cde]");	//유량계종류	
				getCmmCodeData("OGC-041", "#lSrchOptions select[name=mof_cde]");	//유량계형식
		    	
				$(container).append(element);	// container에 요소 추가하기
		    });
		    /* 팝업 load 함수 end */
}