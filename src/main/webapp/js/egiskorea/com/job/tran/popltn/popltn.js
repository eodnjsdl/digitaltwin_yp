$(document).ready(function(){
		console.log("selectPopulationInfoList.jsp");
		console.log("교통분석 - 인구정보");
		
		//검색 조건 세팅
		getCmmCodeData("YPE001", "#pplSearchForm select#liCd");	//읍면동
		getPplBaseYYMMList();
		
		initPplLegal();
		
		$("#pplShowType").on('change', function() {
			console.log("pplShowType>>"+this.value);
			var showType = this.value;
			if(showType == "legal"){
				//console.log("법정동 경계");
				if($(".pplInfoLegalType").css("display") == "none"){
					$(".pplInfoLegalType").show();
				}
				$(".pplInfoGridType").hide();
				
				initPplLegal();
				
			}else if(showType == "grid"){
				//console.log("격자");
				if($(".pplInfoGridType").css("display") == "none"){
					$(".pplInfoGridType").show();
				}
				
				$(".pplInfoLegalType").hide();
			}else{
				console.log("인구정보 선택 오류");
			}
		});
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
     * 기준 연월 기본 세팅
     */
	function getPplBaseYYMMList(){
		console.log("getPplBaseYYMMList()");
		var today = new Date();
		
		for(var i=0; i<12; i++){
			
			var dYear = today.getFullYear();
			var dMonth = ('0' + (today.getMonth() + 1)).slice(-2);
			
			var dVal = dYear+""+dMonth;
			var dYM  = dYear+"년 "+dMonth+"월";

			var dhml = "<option value='"+dVal+"'>"+ dYM +"</option>";
			$("#pplBaseYYMM").append(dhml);
			//console.log('dYM>>'+dYM);
			
			var dMonth = today.setMonth(today.getMonth()-1);
			var dDate = new Date(dMonth);
			today = dDate;
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
        /* const labels = this.list.map((item) => {
            return item["name"];
        });
        const data = this.list.map((item) => {
            return item["value"];
        }); */
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
function selectPplInfoList(){
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
		    toastr.success("조회 성공.");
		    result = data.resultList;
		    legalData(result);
		}, error: function() {
		    toastr.error("정보를 불러오지 못하였습니다.");
		}
	    });
	    
	    // 법정동 경계 데이터 설정
	    function legalData(result) {
		let totalCount = 0;
		let legalListHml = "";
		let dataType = $("#pplGender").val();
		let typeSelector; 
		switch (dataType) {
		case 'all' :
		    typeSelector = '.allPopltnCnt';
		    break;
		case 'm' :
		    typeSelector = '.malePopltnCnt';
		    break;
		case 'w' :
		    typeSelector = '.femalePopltnCnt';
		    break;
		}
		for(let i = 0; i < result.length; i++) {
		    totalCount += result[i].allPopltnCnt;
		    legalListHml += "<tr>";
		    legalListHml += "<td>" + result[i].codeNm + "</td>";
		    legalListHml += "<td>" + result[i].allPopltnCnt + "</td>";
		    let rate = Math.floor(result[i].allPopltnCnt / totalCount * 100);
		    legalListHml += "<td>" + rate + "%</td>";
		    legalListHml += "</tr>";
		    $("#pplInfoLegalList").html(legalListHml);
		}
		$('.pplInfoLegalType .bbs-list-num').html("조회결과 : <strong>" + totalCount + "</strong>명")
		//차트 그리기
		populationRenderChart(result);
	    }
	    
	} else {
	    // 격자 데이터 ajax. pplShowType = grid
	    toastr.error("미구현");
	}
}