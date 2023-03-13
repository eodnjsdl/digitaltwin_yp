// ################################################# 전역변수

var yangPyeongEupData, yongMunMyeonData, yPEMeasuringStation, yMMMeasuringStation;
var yangPyeongEupPm10Array = [];
var yangPyeongEupPm25Array = [];
var yangPyeongEupKhaiArray = [];
var yongMunMyeonPm10Array = [];
var yongMunMyeonPm25Array = [];
var yongMunMyeonKhaiArray = [];
var yangPyeongEupDateArray = [];
var yongMunMyeonDateArray = [];
var dateArray = [];
//* ypePm10Value : 양평읍 미세먼지
//* ypePm25Value : 양평읍 초미세먼지
//* ypeKhaiGrade : 양평읍 통합대기환경지수
//* ymmPm10Value : 용문면 미세먼지
//* ymmPm25Value : 용문면 초미세먼지
//* ymmKhaiGrade : 용문면 통합대기환경지수


// ################################################# 전역변수


// 상세보기
function aj_selectAtmospherePollution(ms) {
	
	$(".icon-btn.stats.appt").removeClass("active")
	$("."+ms).addClass("active")
	
	
	var poi = './images/poi/nomal_poi.png'
	// var layerList = new Module.JSLayerList(true);
//	var poiLayer = layerList.createLayer("Appt_Poi", Module.ELT_3DPOINT);
	
	// 생성되어 있는 POI 레이어가 있을때 지워주기
    // if(GLOBAL.LayerId.PoiLayerId != null){
	// 	  layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
	// 	  GLOBAL.LayerId.PoiLayerId = null;
	// 	  Module.XDRenderData();
	//   }
    
    // GLOBAL.LayerId.PoiLayerId = "Appt_Poi";
    // GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
//    apptPopupCloseEvent()
    
    
//	console.log(111)
//	debugger;
    
    
	if( ms == 'yangPyeongEup' ) {
		openYangPyeongEup();
		
//		debugger;
		var x = parseFloat( yPEMeasuringStation[0].dmY ); //x 좌표
		var y = parseFloat( yPEMeasuringStation[0].dmX ); //y 좌표
		
		var pointArray = ol.proj.transform([x,y],'EPSG:4326','EPSG:5179')
		var pointX = pointArray[0]
		var pointY = pointArray[1]
					
					
		// var position = TransformCoordinate(pointX, pointY, 26, 13);
		// var options = {
		// 		layer : GLOBAL.PoiLayer,
		// 		lon : position.x,
		// 		lat : position.y,
		// 		text : '양평읍', // 객체별 네이밍 체크
		// 		markerImage : poi, // 해당 마커 이미지 Url -- "./images/poi/cctv_water_level.png"
		// 		lineColor : new Module.JSColor(0, 0, 255)
		// }
		// createLinePoi2(options);
//		GLOBAL.Camera.setTilt(88.0);
//		GLOBAL.Camera.setLocation(new Module.JSVector3D(pointX , pointY , 1000));
// 		cmmUtil.setCameraMove(pointX, pointY);
	}
	
	if( ms == 'yongMunMyeon' ) {
		openYongMunMyeon();
		
		var x = parseFloat( yMMMeasuringStation[0].dmY ); //x 좌표
		var y = parseFloat( yMMMeasuringStation[0].dmX ); //y 좌표
		
		var pointArray = ol.proj.transform([x,y],'EPSG:4326','EPSG:5179')
		var pointX = pointArray[0]
		var pointY = pointArray[1]

		// var position = TransformCoordinate(pointX, pointY, 26, 13);
		// var options = {
		// 		layer : GLOBAL.PoiLayer,
		// 		lon : position.x,
		// 		lat : position.y,
		// 		text : '용문면', // 객체별 네이밍 체크
		// 		markerImage : poi, // 해당 마커 이미지 Url -- "./images/poi/cctv_water_level.png"
		// 		lineColor : new Module.JSColor(0, 0, 255)
		// }
		// createLinePoi2(options);
//		GLOBAL.Camera.setTilt(88.0);
//		GLOBAL.Camera.setLocation(new Module.JSVector3D(pointX , pointY , 1000));
// 		cmmUtil.setCameraMove(pointX, pointY);
	}
	
	/*
	// 양평읍 데이터
	$.each(yangPyeongEupData, function(index, value){

	    if(index%24 == 0){
	         console.log("index :" + index + ", value : " + value)
//	         yangPyeongEupPm10Array.push(value.pm10Value)
//	         yangPyeongEupPm25Array.push(value.pm25Value)
//	         yangPyeongEupKhaiArray.push(value.khaiGrade)
	         
	         var curruntDate = value.dataTime.substr(5, 5);
	         dateArray.push(curruntDate);
	    }
	    //console.log(index)
	})
	
	*/
}


// 양평읍 상세보기
var openYangPyeongEup = function(){
	
//		debugger;
	loadingBar("show");
	$(".popup-sub").removeClass("opened").html("");
	
	var formData = new FormData();
	
	$.ajax({
		type : "POST",
		url : "/job/appt/selectAtmospherePollution.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#container").append(returnData);
				
				var pm10ChartBtn = '<div class="marT5"><button type="button" class="btn basic bi-stats appt ypePm10Value">차트</button></div>'
				var pm25ChartBtn = '<div class="marT5"><button type="button" class="btn basic bi-stats appt ypePm25Value">차트</button></div>'
				var khaiGradeChartBtn = '<div class="marT5"><button type="button" class="btn basic bi-stats appt ypeKhaiGrade">차트</button></div>'
						
						
				$("#apptStationName").append(yPEMeasuringStation[0].stationName);
				$("#apptAddr").append(yPEMeasuringStation[0].addr);
				$("#apptPm10Value").append(yangPyeongEupData[0].pm10Value + '㎍/㎥ ' + pm10ChartBtn);
				$("#apptPm25Value").append(yangPyeongEupData[0].pm25Value + '㎍/㎥ ' + pm25ChartBtn);
				$("#apptKhaiGrade").append(yangPyeongEupData[0].khaiGrade + khaiGradeChartBtn);
				
				// 양평읍 데이터
				$.each(yangPyeongEupData, function(index, value){

					var today = new Date();
					
					// 현재시간
					var currentHour = today.getHours();
					
					var valueDateTime = value.dataTime.substr(11,2);
					
//					debugger;
				    if(currentHour == valueDateTime && value.pm10Value != '-'){
//			    	if(index%24 == 0){
//				         console.log("index :" + index + ", value : " + value)  
//				    	debugger;
				         yangPyeongEupPm10Array.push( Number( value.pm10Value ) )
				         yangPyeongEupPm25Array.push( Number( value.pm25Value ) )
				         yangPyeongEupKhaiArray.push( Number( value.khaiGrade ) )
				         yangPyeongEupDateArray.push( value.dataTime.substr(5, 5) );
				         
//				         console.log("index : " + index)
//				         console.log(value.pm10Value)
//				         console.log(value.pm25Value)
//				         console.log(value.khaiGrade)
//				         console.log(value.dataTime)
				    }
				    //console.log(index)
				})
				
				
				chartInit()
				
				
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingBar("hide"); 
		}
	});
		
	
}

// 용문면 상세보기
var openYongMunMyeon = function(){
	
//	debugger;
	loadingBar("show");
	$(".popup-sub").removeClass("opened").html("");
	
	var formData = new FormData();
	
	$.ajax({
		type : "POST",
		url : "/job/appt/selectAtmospherePollution.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#container").append(returnData);
				
				var pm10ChartBtn = '<div class="marT5"><button type="button" class="btn basic bi-stats appt ymmPm10Value">차트</button></div>'
				var pm25ChartBtn = '<div class="marT5"><button type="button" class="btn basic bi-stats appt ymmPm25Value">차트</button></div>'
				var khaiGradeChartBtn = '<div class="marT5"><button type="button" class="btn basic bi-stats appt ymmKhaiGrade">차트</button></div>'
				
				$("#apptStationName").append(yMMMeasuringStation[0].stationName);
				$("#apptAddr").append(yMMMeasuringStation[0].addr);
				$("#apptPm10Value").append(yongMunMyeonData[0].pm10Value + '㎍/㎥ ' + pm10ChartBtn);
				$("#apptPm25Value").append(yongMunMyeonData[0].pm25Value + '㎍/㎥ ' + pm25ChartBtn);
				$("#apptKhaiGrade").append(yongMunMyeonData[0].khaiGrade + khaiGradeChartBtn);
				
				// 용문면 데이터
				$.each(yongMunMyeonData, function(index, value){

				    if(index%24 == 0 && value.pm10Value != '-'){
//				         console.log("index :" + index + ", value : " + value) 
				         yongMunMyeonPm10Array.push(value.pm10Value)
				         yongMunMyeonPm25Array.push(value.pm25Value)
				         yongMunMyeonKhaiArray.push(value.khaiGrade)
				         yongMunMyeonDateArray.push( value.dataTime.substr(5, 5) );
				    }
				    //console.log(index)
				    
				})
				
				
				chartInit()
				
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			loadingBar("hide"); 
		}
	});
	
}






// 최초 init시
function apptList(ypeUrl, ymmUrl) {

	// datetimepicker
	jQuery.datetimepicker.setLocale('kr')
	jQuery(function(){
		
		jQuery('#apptDatepicker').datetimepicker({
			format:'Y-m-d',
			timepicker:false
		});
		
	});
	
	// 현재날짜 
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	// 필터링한 현재날짜 
	var dateString = year + '-' + month  + '-' + day;
	
	// 현재시간
	var currentHour = today.getHours();
	
	// 기준일시 표기
	$("#standardDateTime").append(dateString + ' ' + currentHour + ':00')
	
	loadingBar("show"); 
	
	// // 조회시 테이블 리스트 삭제
	// $(".appt-table.bbs-list tbody").empty();

	var dataList = "";
	// 양평읍
	$.ajax({
		type : "get",
		url : "/proxy.do?url=" + encodeURIComponent(ypeUrl),
	    dataType : 'json',
		success : function(data, status){
//			console.log('Air pollution 양평읍')
//			console.log(data)
			yangPyeongEupData = data.response.body.items;
			dataList += '<tr>'
			 dataList += '<td>양평읍</td>'
//			 dataList += '<td>' + yangPyeongEupData[0]. + '</td>'
			 dataList += '<td>' + yangPyeongEupData[0].pm10Value + '㎍/㎥</td>'
			 dataList += '<td>' + yangPyeongEupData[0].pm25Value + '㎍/㎥</td>'
			 dataList += '<td>' + yangPyeongEupData[0].khaiGrade + '  </td>'
			 dataList += '<td>'
			 dataList += '<button type="button" class="icon-btn stats appt yangPyeongEup" onclick="aj_selectAtmospherePollution(\'yangPyeongEup\')" title="대기관측소"></button>'
			 dataList += '</td>'
			 dataList += '</tr>'
					 
			// $(".appt-table.bbs-list tbody").append(dataList);
			
		}, complete : function(){
			// loadingBar("hide");

			// 용문면
			$.ajax({
				type : "get",
				url : "/proxy.do?url=" + encodeURIComponent(ymmUrl),
				dataType : 'json',
				success : function(data, status){
					// 조회시 테이블 리스트 삭제
					$(".appt-table.bbs-list tbody").empty();
//			console.log('Air pollution 용문면')
//			console.log(data)
					yongMunMyeonData = data.response.body.items;

					dataList += '<tr>'
					dataList +=  '<td>용문면</td>'
					dataList +=  '<td>' + yongMunMyeonData[0].pm10Value + '㎍/㎥</td>'
					dataList +=  '<td>' + yongMunMyeonData[0].pm25Value + '㎍/㎥</td>'
					dataList +=  '<td>' + yongMunMyeonData[0].khaiGrade + '  </td>'
					dataList +=  '<td><button type="button" class="icon-btn stats appt yongMunMyeon" onclick="aj_selectAtmospherePollution(\'yongMunMyeon\')" title="대기관측소"></button></td>'
					dataList += '</tr>'

					$(".appt-table.bbs-list tbody").append(dataList);

				}, complete : function(){
					loadingBar("hide");
				}
			});

		}
	});
	
	

	
	
	// 측정소 api
	//개발서버
	var measuringYPE = 'http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList?addr=%EA%B2%BD%EA%B8%B0&stationName=%EC%96%91%ED%8F%89%EC%9D%8D&pageNo=1&numOfRows=11&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&returnType=json';
	var measuringYMM = 'http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList?addr=%EA%B2%BD%EA%B8%B0&stationName=%EC%9A%A9%EB%AC%B8%EB%A9%B4&pageNo=1&numOfRows=11&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&returnType=json';
	
	// 실서버
	// 행정망
	//var measuringYPE = 'http://10.165.2.30/intApi/extApi/B552584/MsrstnInfoInqireSvc/getMsrstnList?addr=%EA%B2%BD%EA%B8%B0&stationName=%EC%96%91%ED%8F%89%EC%9D%8D&pageNo=1&numOfRows=11&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&returnType=json';
	//var measuringYMM = 'http://10.165.2.30/intApi/extApi/B552584/MsrstnInfoInqireSvc/getMsrstnList?addr=%EA%B2%BD%EA%B8%B0&stationName=%EC%9A%A9%EB%AC%B8%EB%A9%B4&pageNo=1&numOfRows=11&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&returnType=json';
	
	// LX망
	//var measuringYPE = 'http://10.20.30.81/extApi/B552584/MsrstnInfoInqireSvc/getMsrstnList?addr=%EA%B2%BD%EA%B8%B0&stationName=%EC%96%91%ED%8F%89%EC%9D%8D&pageNo=1&numOfRows=11&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&returnType=json';
	//var measuringYMM = 'http://10.20.30.81/extApi/B552584/MsrstnInfoInqireSvc/getMsrstnList?addr=%EA%B2%BD%EA%B8%B0&stationName=%EC%9A%A9%EB%AC%B8%EB%A9%B4&pageNo=1&numOfRows=11&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&returnType=json';
	
	
	// 양평읍
	$.ajax({
		type : "get",
		url : "/proxy.do?url=" + encodeURIComponent(measuringYPE),
	    dataType : 'json',
		success : function(data, status){
			yPEMeasuringStation = data.response.body.items;
		}, complete : function(){
			loadingBar("hide");
		}
	});
	
	
	// 용문면
	$.ajax({
		type : "get",
		url : "/proxy.do?url=" + encodeURIComponent(measuringYMM),
	    dataType : 'json',
		success : function(data, status){
			yMMMeasuringStation = data.response.body.items;
		}, complete : function(){
			loadingBar("hide");
		}
	});
	
	
} // function apptList



/**
 * 차트 표출
 * ypePm10Value : 양평읍 미세먼지
 * ypePm25Value : 양평읍 초미세먼지
 * ypeKhaiGrade : 양평읍 통합대기환경지수
 * ymmPm10Value : 용문면 미세먼지
 * ymmPm25Value : 용문면 초미세먼지
 * ymmKhaiGrade : 용문면 통합대기환경지수
 * 
 * 
 */
// 차트 apptChart

// 변수선언
var chartId, apptChart, apptOption;

function chartInit() {
	
	
	// 양평읍 미세먼지
	$(".ypePm10Value").on('click', function(e){
		
		initChart()
		
		var btnClassName = $(this).attr("class")
		chartBtnEvent(btnClassName)
		
//		console.log("ypePm10Value")
		
		apptOption = {
				  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      animation: false
		    }
		  },
			  xAxis: {
			    type: 'category',
			    data: yangPyeongEupDateArray
			  },
			  yAxis: {
			    type: 'value'
			  },
			  series: [
			    {
			      data: yangPyeongEupPm10Array,
			      type: 'line',
			      connectNulls: true
			    }
			  ]
		};
		
		apptChart.setOption(apptOption);
		
	})


	// 양평읍 초미세먼지
	$(".ypePm25Value").on('click', function(){
		
		initChart()
		var btnClassName = $(this).attr("class")
		chartBtnEvent(btnClassName)
		
		apptOption = {
				  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      animation: false
		    }
		  },
			  xAxis: {
			    type: 'category',
			    data: yangPyeongEupDateArray
			  },
			  yAxis: {
			    type: 'value'
			  },
			  series: [
			    {
			      data: yangPyeongEupPm25Array,
			      type: 'line',
			      connectNulls: true
			    }
			  ]
		};
		
		apptChart.setOption(apptOption);
		
	})


	// 양평읍 통합대기환경지수
	$(".ypeKhaiGrade").on('click', function(){
		
		initChart()
		var btnClassName = $(this).attr("class")
		chartBtnEvent(btnClassName)
		
		apptOption = {
				  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      animation: false
		    }
		  },
			  xAxis: {
			    type: 'category',
			    data: yangPyeongEupDateArray
			  },
			  yAxis: {
			    type: 'value'
			  },
			  series: [
			    {
			      data: yangPyeongEupKhaiArray,
			      type: 'line',
			      connectNulls: true
			    }
			  ]
		};
		
		apptChart.setOption(apptOption);
		
	})


	// 용문면 미세먼지
	$(".ymmPm10Value").on('click', function(){
		
		initChart()
		var btnClassName = $(this).attr("class")
		chartBtnEvent(btnClassName)
		
		apptOption = {
				  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      animation: false
		    }
		  },
			  xAxis: {
			    type: 'category',
			    data: yongMunMyeonDateArray
			  },
			  yAxis: {
			    type: 'value'
			  },
			  series: [
			    {
			      data: yongMunMyeonPm10Array,
			      type: 'line',
			      connectNulls: true
			    }
			  ]
		};
		
		apptChart.setOption(apptOption);
		
	})


	// 용문면 초미세먼지
	$(".ymmPm25Value").on('click', function(){
		
		initChart()
		var btnClassName = $(this).attr("class")
		chartBtnEvent(btnClassName)
		
		apptOption = {
			  tooltip: {
			    trigger: 'axis',
			    axisPointer: {
			      animation: false
			    }
			  },
			  xAxis: {
			    type: 'category',
			    data: yongMunMyeonDateArray
			  },
			  yAxis: {
			    type: 'value'
			  },
			  series: [
			    {
			      data: yongMunMyeonPm25Array,
			      type: 'line',
			      connectNulls: true
			    }
			  ]
		};
		
		apptChart.setOption(apptOption);
		
	})


	// 용문면 통합대기환경지수
	$(".ymmKhaiGrade").on('click', function(){
		
		initChart()
		var btnClassName = $(this).attr("class")
		chartBtnEvent(btnClassName)
		
		apptOption = {
				  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      animation: false
		    }
		  },
			  xAxis: {
			    type: 'category',
			    data: yongMunMyeonDateArray
			  },
			  yAxis: {
			    type: 'value'
			  },
			  series: [
			    {
			      data: yongMunMyeonKhaiArray,
			      type: 'line',
			      connectNulls: true
			    }
			  ]
		};
		
		apptChart.setOption(apptOption);
		
	})
	
	
	
	
	
}



function initChart() {
	
//	console.log("initChart")
//	debugger;
	var echarts_instance_id = $("#apptChart").attr("_echarts_instance_");
	
	if(echarts.getInstanceById(echarts_instance_id) == undefined) {
		
		chartId = document.getElementById("apptChart")
		apptChart = echarts.init(chartId)
		$("#apptChart > div").css('top', '-233px');
	}

	
}




function chartBtnEvent(className) {
	
	$(".bi-stats.appt").removeClass("active")
	$("."+className.replaceAll(" ", ".")).addClass("active")
		
}


function apptPopupCloseEvent() {
	
//	debugger;
	removeLayer()
	$(".icon-btn.stats.appt").removeClass("active")
	
}



