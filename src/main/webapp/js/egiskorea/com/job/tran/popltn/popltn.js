$(document).ready(function(){
    //검색 조건 세팅
    getCmmCodeData("YPE001", "#pplSearchForm select#liCd");	//읍면동
    
    // 화면기본세팅 - 양평군 전체 인구 정보 조회
    getAllPopulationInfo();
    
    // 검색 기준 년월 - 대상지역이 변경될 때마다 호출
    getPplBaseYYMMList();
		
    initPplLegal();
	
    $("#pplShowType").on('change', function() {
//	console.log("pplShowType>>"+this.value);
	var showType = this.value;
	if(showType == "legal"){
	    if ($(".pplInfoLegalType").css("display") == "none") {
		$(".pplInfoLegalType").show();
	    }
	    $(".pplInfoGridType").hide();
	    initPplLegal();
	} else if (showType == "grid") {
	    if($(".pplInfoGridType").css("display") == "none") {
		$(".pplInfoGridType").show();
	    }
	$(".pplInfoLegalType").hide();
	} else {
	    toastr.error("인구정보 선택 오류");
	}
    });
    
    $('#pplInfoSearch').on('click', function () {
	selectPplInfoList();
    });
    
    // 대상지역이 변경될 때마다 호출
    $('#liCd').on('change', function () {
	$('#pplBaseYYMM').empty();
	getPplBaseYYMMList();
    })
});
	
//functions

/**
* 법정도 경계 초기화
*/
function initPplLegal(){
    
}
	
/**
* 격자 경계 초기화
*/
function initPplGrid(){
	
}

/**
 * 양평군 전체 인구 정보 조회
 * @returns
 */
function getAllPopulationInfo() {
    $.ajax({
	url : "/job/tran/popltn/selectAllPopulationInfoList.do",
	type : 'post',
	dataType: 'json',
	success: function(data) {
	    result = data.resultList;
	    legalData(result);
	}, error: function() {
	    toastr.error("정보를 불러오지 못하였습니다.");
	}
    });
}

/**
* 기준 연월 기본 세팅 로드 및 세팅 함수 연결
*/
function getPplBaseYYMMList() {
    // data
    let data = $("#pplSearchForm").serialize();
    
    $.ajax({
	data: data,
	url : "/job/tran/popltn/selectStandardYmList.do",
	type : 'post',
	dataType: 'json',
	success: function(data) {
	    result = data.resultList;
	    setPplBaseYYMMList(result);
	}, error: function() {
	    toastr.error("정보를 불러오지 못하였습니다.");
	}
    });
    
    /**
     * 기준 연월 기본 세팅
     * @param result
     * @returns
     */
    function setPplBaseYYMMList(result) {
	for (let i = 0; i < result.length; i++) {
	    let data = result[i];
	    let addHtml = '<option value="' + data + '">' + data + '</option>';
	    $('#pplBaseYYMM').append(addHtml);
	}
    }
}
	
/**
* 분석결과 차트 표시
*/
function populationRenderChart(result){
    // 캔버스 처리
    const canvas = $(`<canvas class="analysis-chart2" width="370" height="220"></canvas>`);
    $(".graph-box2", this.selector).html(canvas);
    const ctx = canvas[0].getContext("2d");
       
    // 데이터 세팅
    var labels 	= [];
    var data 	= [];
        
    if(result){
	for(var i=0; i<result.length; i++){
	    labels.push(result[i].codeNm);
	    data.push(result[i].allPopltnCnt);
        }
    } else {
	console.log("그래프 데이터 오류");
       	return false;
    }
    
    //차트 그리기
    const datasets = [
        {
            data: data,
            borderColor: "rgba(0, 0, 255, 1)",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
        },
    ];
    new Chart(ctx, {
        type: "bar",
        data: {labels, datasets},
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            let label = "";
                                label += `\r\n`+context.raw+`명`;
                                return label;
                        },
                    },
                },
            },
        },
        plugins: [
            {
        	id: "custom_canvas_background_color",
        	beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext("2d");
                ctx.save();
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
        	},
            },
            ],
    });
}
	
/**
* 인구 정보 조회 및 차트 데이터 전달
*/
function selectPplInfoList() {
	// ajax 전달 데이터
	let data = $("#pplSearchForm").serialize();
	let pplShowType = $("#pplShowType").val();
	if (pplShowType == 'legal') {
	    // 법정동 경계 데이터 ajax. pplShowType = legal
	    // 그래프 데이터 전달 변수 result
	    let result;
	    $.ajax({
		data: data,
		url : "/job/tran/popltn/selectMyeonPopulationInfoList.do",
		type : 'post',
		dataType: 'json',
		success: function(data) {
		    result = data.resultList;
		    legalData(result);
		}, error: function() {
		    toastr.error("정보를 불러오지 못하였습니다.");
		}
	    });
	} else {
	    // 격자 데이터 ajax. pplShowType = grid
	    toastr.error("미구현");
	}
}

/**
 * 법정동 경계 데이터 설정 
 * @param result
 * @returns
 */
function legalData(result) {
	let totalCount = 0;
	let legalListHml = "";
	let dataType = $("#pplGender").val();
	
	for(let i = 0; i < result.length; i++) {
	    if (dataType == 'all') {
		totalCount += result[i].allPopltnCnt;
	    } else if (dataType == 'm') {
		totalCount += result[i].malePopltnCnt;
	    } else if (dataType == 'w') {
		totalCount += result[i].femalePopltnCnt;
	    }
	}
	for(let i = 0; i < result.length; i++) {
	    legalListHml += "<tr>";
	    legalListHml += "<td>" + result[i].codeNm + "</td>";
	    let rate = '';
	    // 총인구, 남자, 여자 분류
	    if (dataType == 'all') {
		legalListHml += "<td>" + result[i].allPopltnCnt + "</td>";
		rate = Math.round(result[i].allPopltnCnt / totalCount * 100);
		} else if (dataType == 'm') {
		    legalListHml += "<td>" + result[i].malePopltnCnt + "</td>";
		    rate = Math.round(result[i].malePopltnCnt / totalCount * 100);
		} else if (dataType == 'w') {
		    legalListHml += "<td>" + result[i].femalePopltnCnt + "</td>";
		    rate = Math.round(result[i].femalePopltnCnt / totalCount * 100);
		}
	    legalListHml += "<td>" + rate + "%</td>";
	    legalListHml += "</tr>";
	    $("#pplInfoLegalList").html(legalListHml);
	}
	let totalCountFormat = new Intl.NumberFormat().format(totalCount);
	$('.pplInfoLegalType .bbs-list-num').html("조회결과 : <strong>" + totalCountFormat + "</strong>명")
	//차트 그리기
	populationRenderChart(result);
}