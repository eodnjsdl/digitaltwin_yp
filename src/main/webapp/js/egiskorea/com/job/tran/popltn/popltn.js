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
	let area = $('select[name="liCd"]').val();
	if (area == 'all') {
	    getAllPopulationInfo();
	}
	selectPplInfoList();
    });
    
    // 대상지역이 변경될 때마다 호출
    $('#liCd').on('change', function () {
	$('#pplBaseYYMM').empty();
	getPplBaseYYMMList();
    });
    
    // 초기화 버튼
    $('#populationReset').on('click', function () {
	aj_selectPopulationInfoList();
    });
    
    // 닫기 버튼
    $('#popltnCloseBtn').on('click', function () {
	dtmap.layer.clear();
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
 * 양평군 전체 인구 정보 조회
 * @returns
 */
function getAllPopulationInfo() {
    ui.loadingBar('show');
    $.ajax({
	url : "/job/tran/popltn/selectAllPopulationInfoList.do",
	type : 'post',
	dataType: 'json',
	success: function(data) {
	    result = data.resultList;
	    legalData(result);
	    getLayer();
	    ui.loadingBar('hide');
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
	    let dataFormat = data.substring(0, 4) + data.substring(5, 7);
	    let addHtml = '<option value="' + dataFormat + '">' + data + '</option>';
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
    ui.loadingBar('show');
    // ajax 전달 데이터
    let data = $("#pplSearchForm").serialize();
    let pplShowType = $("#pplShowType").val();
    // 법정동 경계 데이터 ajax. pplShowType = legal
    if (pplShowType == 'legal') {
	// formdata에 리 옵션 값 'all' 일 때, 전체 조회
	if (data.includes('liCd=all')) {
	    getAllPopulationInfo();
	} else {
	    // 레이어 호출 - cql 옵션 세팅
	    let liCode = $('#liCd').val().slice(0, 8);
	    let filter = "li_cd like " + "'" + liCode + "%'";
	    let options = {
		    cql : filter
	    };
	    $.ajax({
		data: data,
        	url : "/job/tran/popltn/selectMyeonPopulationInfoList.do",
        	type : 'post',
        	dataType: 'json',
        	success: function(data) {
        	    let result = data.resultList;
        	    // 데이터 세팅
        	    legalData(result);
        	    // 레이어 호출
        	    getLayer(options);
        	    getJenks(result);
        	    ui.loadingBar('hide');
        	}, error: function() {
        	    toastr.error("정보를 불러오지 못하였습니다.");
        	}
	    });
	}
	// 격자 데이터 ajax. pplShowType = grid
    } else {
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

// wms 레이어 호출
function getLayer(options) {
    dtmap.layer.clear();
    let cql;
    if (options != undefined) {
	cql = options.cql;
    }
    const layerNm = 'digitaltwin:tgd_li_popltn_info';
    let id = 'popltn_Layer';
    let type = 'WMS'
    let title = '인구정보'
    let visible = true;
    let shpType = 6;
    
    dtmap.showLayer({
        id: id,
        type: type,
        layerNm: layerNm,
        title: title,
        visible: visible,
        cql : cql
    });
}

function getJenks(data) {
    let popltn = [];
    for (let i = 0; i < data.length; i++) {
	popltn.push(data[i].allPopltnCnt);
    }
    let geo = new geostats(popltn);
    let jenks = geo.getClassJenks(5);
    console.log("geo.ranges---------");
    console.log(geo.ranges);
}

//================== db data =======================
function getGeomData() {
    ui.loadingBar('show');
    
    $.ajax({
	url : "job/tran/popltn/selectAllPopulationInfoGeomList.do",
	type : 'post',
	dataType : 'json',
	success : function(data) {
	    let result = data.resultList;
	    geomPrcss(result);
	    ui.loadingBar('hide');
	}, error : function() {
	    toastr.error("데이터 호출 실패.");
	}
    });
}

function geomPrcss(data) {
    console.log(data);
    const formatWKT = new ol.format.WKT();
    for (let i = 0; i < data.length; i++) {
	let geom = data[i].geom; // geom 데이터
	let geometry = formatWKT.readGeometry(geom);
	let geomGetter = geometry.flatCoordinates
	let coordArr =[]; 
	    coordArr.push(coordArrFomatter(geomGetter, 2));
	    console.log(coordArr);
	    popltnAddPolygon(coordArr, i);
    }
    
    
    ui.loadingBar('hide');
}

function coordArrFomatter(coord, size) {
    const arr = [];
	    
    for (let i = 0; i < coord.length; i += size) {
	arr.push(coord.slice(i, i + size));
    }

    return arr;
}

function popltnAddPolygon(coordinates, id) {
    let style = {
	    fill : {
		      color : '#dddddd',
		      opacity : 0.3
		    }
    };
    dtmap.vector.addPolygon({
	id : 'test_popltn_' + id,
	coordinates : coordinates,
	crs : 'EPSG:5179',
	style : style
    })
}


//================== db data =======================
