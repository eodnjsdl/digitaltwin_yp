/**
 * SUBJECT : ai영상분석 (3d)
 * AUTHOR : 이푸름 
 * LAST UPDATE : 2022.1.24
 * COMMENT :
 */

var M_AI_IMAGE = {
	global:{
		test:null,
		isn:null,
		itv:null,
		isnt:0,
		checkedVal:"3",
		ps:[
			["10", "20", "40", "70", "100"],
			["0", "15", "50", "68", "80", "95", "100"],
			["5", "25", "45", "95", "100"],
			["30", "60", "90", "100"],
			["5", "20", "30", "40", "50", "55", "70", "100"],
			["8", "15", "24", "38", "55", "78", "95", "100"],
			["9", "17", "25", "38", "47", "55", "62", "68", "72", "84", "96", "100"],
			["13", "19", "26", "35", "48", "59", "65", "79", "91", "100"],
			["5", "17", "29", "35", "46", "66", "82", "100"],
			["2", "9", "34", "44", "62", "78", "88", "100"]
		],
	},
	getAiSettingInfo:function(){
		$("#aiSettingModal").modal({backdrop:'static', keyboard:false});	
	},
	setAiSettingVal:function(){
		M_AI_IMAGE.global.checkedVal=$("input[name=AI_radio]:checked").val();
//		$("#aiSettingModal").modal('hide');	
	},
	closeAiAnalysis:function(){

		M_AI_IMAGE.analysis.reset();
		
		var moduleIdTxt = $("#moduleUITabContent div").attr('id');
		var moduleId = moduleIdTxt.trim().split("-")[2];
		
		IDE.MODULE.closeModule(moduleId);

//		$("#imageMclearnStart").hide();
		

	},
	setCheckbox: function(){//체크박스 리셋
		
		//라벨텍스트초기화
		var lbText = document.querySelectorAll('#AIVideoBox label')
		lbText.forEach(function(item){item.innerText=""})
		
		var checkSize = $("input[name='AI_check']").length
		//카운트 올리기
		for(var i=0; i<checkSize; i++){
			var checkId = $("input[name='AI_check']")[i].id
			var countClass = M_AI_IMAGE.detectLegend.legend[checkId].count 
			$("input[name='AI_check']")[i].nextElementSibling.innerHTML = M_AI_IMAGE.detectLegend.legend[checkId].name + "("+countClass+")"		
			
		}
		
		
	},
	detectLegend:{
		legend : {
			class_0 : {
				name : "건물(지붕형)",
				key : "building_roof",
				color : [252, 213, 180],
				hexColor : "#fcd5b4",
				count : 0,
				id: "class_0"
			},
			class_1 : {
				name : "건물(옥상형)",
				key : "building_roof",
				color : [250, 191, 143],
				hexColor : "#fabf8f",
				count : 0,
				id : "class_1"
			},
			class_12 : {
				name : "대",
				key : "empty",
				color : [49, 134, 155],
				hexColor : "#31869b",
				count : 0,
				id : "class_12"
			},
			class_15 : {
				name : "창고용지",
				key : "storage_site",
				color : [33, 89, 103],
				hexColor : "#215967",
				count : 0,
				id : "class_15"
			},
			class_11 : {
				name : "임야",
				key : "forest",
				color : [168, 232, 37],
				hexColor : "#a8e825",
				count : 0,
				id :"class_11"
			},
			class_5 : {
				name : "전,답",
				key : "farm",
				color : [196, 215, 155],
				hexColor : "#c4d79b",
				count : 0,
				id :"class_5"
			},
			class_14 : {
				name : "과수원",
				key : "fruit_garden",
				color : [216, 228, 188],
				hexColor : "#d8e4bc",
				count : 0,
				id :"class_14"
			},
			class_2 : {
				name : "비닐하우스(백)",
				key : "vinyl_house_white",
				color : [196, 189, 151],
				hexColor : "#c4bd97",
				count : 0,
				id : "class_2"
			},
			class_3 : {
				name : "비닐하우스(흑)",
				key : "vinyl_house_black",
				color : [148, 138, 84],
				hexColor : "#948a54",
				count : 0,
				id : "class_3"
			},
			class_4 : {
				name : "도로",
				key : "road",
				color : [242, 242, 242],
				hexColor : "#f2f2f2",
				count : 0,
				id : "class_4"
			},
			class_10 : {
				name : "주차장",
				key : "parking_area",
				color : [166, 166, 166],
				hexColor : "#a6a6a6",
				count : 0,
				id : "class_10"
			},
			class_13 : {
				name : "철도용지",
				key : "railroad_site",
				color : [217, 217, 217],
				hexColor : "#d9d9d9",
				count : 0,
				id : "class_13"
			},
			class_6 : {
				name : "하천",
				key : "river",
				color : [22, 54, 92],
				hexColor : "#16365c",
				count : 0,
				id :"class_6"
			},
			class_7 : {
				name : "유지",
				key : "site",
				color : [83, 141, 213],
				hexColor : "#538dd5",
				count : 0,
				id : "class_7"
			},
			class_8 : {
				name : "제방",
				key : "river_bank",
				color : [141, 180, 226],
				hexColor : "#8db4e2",
				count : 0,
				id : "class_8"
			},
			class_16 : {
				name : "염전",
				key : "salt",
				color : [197, 217, 241],
				hexColor : "#c5d9f1",
				count : 0,
				id : "class_16"
			},
			class_9 : {
				name : "묘지",
				key : "cemetery",
				color : [150, 54, 52],
				hexColor : "#963634",
				count : 0,
				id : "class_9"
			},
			class_others : {
				name : "기타",
				key : "others",
				color : [255, 255, 255],
				hexColor : "#ffffff",
				count : 0,
				id : "class_others"
			}
			
		},
		legendCountUp : function(_classNumber) {

			var legendInfo = this.legend["class_"+_classNumber];

			if (typeof legendInfo == 'undefined') {
				legendInfo = this.legend["class_others"];
			}

			legendInfo.count++;
		},
		getLegendColor : function(_classNumber) {

			var legendInfo = this.legend["class_"+_classNumber];
			if (typeof legendInfo == 'undefined') {
				legendInfo = this.legend["class_others"];
			}

			return legendInfo.color;
		},
		getLegendName : function(_classNumber) {

			var legendInfo = this.legend["class_"+_classNumber];
			if (typeof legendInfo == 'undefined') {
				legendInfo = this.legend["class_others"];
			}

			return legendInfo.name;
		},
		clearCount : function() {

			var data = [];

			for (var id in this.legend) {

				if (this.legend.hasOwnProperty(id)) {
					this.legend[id].count = 0;
				}
			}

			return data;
		},
		getLegendGraphData : function() {

			var data = [];

			for (var id in this.legend) {

				if (this.legend.hasOwnProperty(id)) {

					if (this.legend[id].count > 0) {
						data.push({
							label : this.legend[id].name,
							value : this.legend[id].count,
							color : this.legend[id].hexColor
						});
					}
				}
			}

			return data;
		},
		getLegendGraphHexColorList : function() {

			var colors = [];

			for (var id in this.legend) {

				if (this.legend.hasOwnProperty(id)) {

					if (this.legend[id].count > 0) {
						colors.push(this.legend[id].hexColor);
					}
				}
			}

			return colors;
		}
	},
		
	init:function() {
		
		//분석 시작 이벤트
		$("#startAianalysBtn").on('click',function(e){
			M_AI_IMAGE.analysis.start();
		})

		$("#resetAianalysBtn").on('click',function(e){
			M_AI_IMAGE.analysis.reset();
		});
		//검색값 변경
		$("input[name='AI_radio']").on('change',function(e){
			M_AI_IMAGE.setAiSettingVal();
		});

//			new PerfectScrollbar(document.getElementById('classifiedBody'),{
//				suppressScrollX:true
//			});
//	
		$("#aiImageReslt").mouseover(function() {
			Module.XDIsMouseOverDiv(true);
		})
		.mouseout(function() {
			Module.XDIsMouseOverDiv(false);
		});

		
	},
	destroy:function() {
		
//		$("#imageMclearnStart").hide();
		
		M_AI_IMAGE.analysis.reset();
//		DRAW=null;
		
		M_AI_IMAGE.isn = null
		M_AI_IMAGE.itv = null
		M_AI_IMAGE.isnt = 0
		M_AI_IMAGE.checkedVal = "3"
	},
	analysis:{
		start:function(){
			//초기화
			M_AI_IMAGE.analysis.reset();
			//프로그레스
			loadingShowHide("show");

			//초기화
			M_AI_IMAGE.global.isn=null;
			M_AI_IMAGE.global.itv=null;
			M_AI_IMAGE.global.isnt=0;
			
			//이미지스캐닝
			M_AI_IMAGE.analysis.imageScanning();
			
		},
		imageScanning:function(){
			
			setTimeout(function(){
			
		 	    if(M_AI_IMAGE.global.checkedVal == null || M_AI_IMAGE.global.checkedVal =='undefined'){
					M_AI_IMAGE.global.checkedVal=3;
				}
		 	    //분류 value
				M_AI_IMAGE.analysis.detectAI(parseInt(M_AI_IMAGE.global.checkedVal));

			},2000);
		},
		detectAI:function(an){
			
			var detect_type = "";

			switch(an) {
				case 1:
					detect_type = "gun";
				break;

				case 2:
					detect_type = "coco";
				break;

				case 3:
					detect_type = "bld";
				break;

				case 4:
					detect_type = "boat";
				break;
			}
			
			var captureCanvas = null;		// 캡쳐 이미지 저장 캔버스

			var canvasRect = Module.canvas.getBoundingClientRect();
			var canvasStyle = "";
			canvasStyle += "display:none;position:absolute;left:90px;top:0;zIndex:90;";
			
			var eParent = document.getElementById('container')
			var copyCanvas = document.createElement("canvas");
			copyCanvas.style = canvasStyle;
			copyCanvas.id = "copyCanvas";
			eParent.appendChild(copyCanvas);

			var ctx = copyCanvas.getContext('2d');
			copyCanvas.width = Module.canvas.width;
			copyCanvas.height = Module.canvas.height;

			ctx.drawImage(Module.canvas, 0, 0);
			//img 바이너리
			var dataUrl = Module.canvas.toDataURL("image/png");

			var imgFile = M_AI_IMAGE.UTIL.dataURLtoFile(dataUrl,'hello.png');
			
			var formData = new FormData();
			formData.append("file", imgFile);
			formData.append("return_type", "json");
			formData.append("detect_type", detect_type);

			$.ajax({
				url:"http://203.228.54.47/detectai",
//				url:"http://10.20.30.81/detectai", // LX 실서버
//				url:"http://10.165.2.30/detectai", // 양평 실서버
				type: "POST",
				dataType:"json",
				data: formData,
				processData: false,
				contentType: false,
				success:function(result) {
					
					console.log(result)
					var totalCnt=  result.response.length;				
					
					if(result.response.length == 0){
						alert("분석결과값이 없습니다. 화면조정후 다시 시도하세요.")
						loadingShowHide("hide");
						return false;
					}
					if(result.response.length > 0) {
						
						M_AI_IMAGE.analysis.markupMachineDetectResult(copyCanvas.width, copyCanvas.height, result);
					}
				}
			});
			
		},
		markupMachineDetectResult:async function(_imageWidth, _imageHeight, _result, _complateCallback){
			
			var result = _result.response;
			var splitCellCount = 10;

			// 결과 반환할 레이어
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("ML_RESULT_RECT");
		
			if (layer == null) {
				layer = layerList.createLayer("ML_RESULT_RECT", Module.ELT_SKY_LINE);
				layer.setMaxDistance(GLOBAL.MaxDistance);
				layer.setSelectable(false);
			} else {
				layer.removeAll();
			}

			var donutGraph = null;
			M_AI_IMAGE.detectLegend.clearCount();

			CINIT.createCanvas("imgcanvas");
			// 그리드 canvas 세팅
			var result = DRAW.OVERVIEW.createCanvas("gridCanvas");
			if( result == -1 ){
				console.log( "create overview cnavas error");
			}

			// result 2이면 새로 생성되기 떄문에 setGrid 해준다
			if( result > 1 ){
				DRAW.OVERVIEW.setGrid();
			}

			DRAW.CANVAS.ETC.initGrid();

			var gridCanvas = document.getElementById('gridCanvas');
			gridCanvas.style.position="absolute";
			gridCanvas.style.top="0";
			gridCanvas.style.left="0";
			gridCanvas.style.zIndex="100";

			DRAW.CANVAS.INIT.clearCanvas();
			DRAW.CANVAS.INIT.setCanvasSize( Module.canvas.width, Module.canvas.height);
	        DRAW.CANVAS.ETC.setColor( "rgba(255,255,255,0.7)", 1 );
			DRAW.CANVAS.LINE.setStyle( 1, "butt", "round" );
			
			DRAW.CANVAS.ETC.setVisible( "gridCanvas", true );

			// 그리드 단위로 결과 데이터 정렬
			var result = _result.response;
			result = this.sortDetectResult(splitCellCount, splitCellCount, result);

			var processIndex = 1;
//			$("#classifiedBody").empty();
			$("#aiImageReslt").show("slide", { direction: "down" }, 200);


			for (var i=0; i<splitCellCount; i++) {

				for (var j=0; j<splitCellCount; j++) {

					var cellResult = result[i][j].result;
					
					DRAW.CANVAS.INIT.clearRect( 0, 0, DRAW.CANVAS.CANVAS_MAIN.width, DRAW.CANVAS.CANVAS_MAIN.height);
					
					DRAW.CANVAS.ETC.drawGrid( splitCellCount, splitCellCount, 1 );
					DRAW.CANVAS.ETC.setColor( "rgba(255,255,255,0.7)", 0 );
					DRAW.CANVAS.ETC.drawGridRect( j, splitCellCount-i );
	
					for (var k=0; k<cellResult.length; k++) {

						var result_detections = cellResult[k].detections.split(" ");

						var line = this.createRectLine(
							"result_"+i+"_"+j+"_"+k,
							_imageWidth, _imageHeight,
							cellResult[k],
							M_AI_IMAGE.detectLegend.getLegendColor(result_detections[0])
						);

						
						//체크박스 해제된것 찾기
						var uncheckedDiv = document.querySelectorAll('input[name="AI_check"]:not(input[name="AI_check"]:checked)')
						var classId = M_AI_IMAGE.detectLegend.legend["class_"+result_detections[0]].id;
						//체크박스 선택되있고 아이디같을경우 tr늘려주기
						if(uncheckedDiv.length == 0){
							this.insertDetectPositionMoveButton(
									processIndex,
									_imageWidth, _imageHeight,
									result_detections[1], result_detections[2],
									cellResult[k].class,
									result_detections[0],
									cellResult[k].confidence
								);
								//카운팅
								M_AI_IMAGE.detectLegend.legendCountUp(result_detections[0]);
								
								// 레이어에 객체 추가
								layer.addObject(line, 0);

								processIndex++;
						}else{
							
							for(var z=0; z<uncheckedDiv.length; z++){
								if(uncheckedDiv[z].id != classId && $("#"+classId).is(':checked')){
									this.insertDetectPositionMoveButton(
											processIndex,
											_imageWidth, _imageHeight,
											result_detections[1], result_detections[2],
											cellResult[k].class,
											result_detections[0],
											cellResult[k].confidence
									);
									//카운팅
									M_AI_IMAGE.detectLegend.legendCountUp(result_detections[0]);
									
									// 레이어에 객체 추가
									layer.addObject(line, 0);
									
									processIndex++;
								}
							}
						}
					await sleep(70.0 * Math.random());
					}
				}


			}

			if (_complateCallback) {
				_complateCallback(_result);
			}

			setTimeout(function(){
			
				DRAW.CANVAS.ETC.setVisible( "gridCanvas" , false );

				loadingShowHide("hide");
				M_AI_IMAGE.setCheckbox();
				Module.XDRenderData();
				Module.XDIsMouseOverDiv(false);

			},2000);
			
			

		},
		sortDetectResult:function(_cellWidthNum, _cellHeightNum, _result){
			var resultCell = {};
			for (var i=0; i<_cellHeightNum; i++) {

				resultCell[i] = {};

				for (var j=0; j<_cellWidthNum; j++) {

					resultCell[i][j] = {
						result : []
					};
				}
			}

			for (var i=0; i<_result.length; i++) {

				var detections = _result[i].detections.split(" ");

				var cellIndex_x = parseInt( parseFloat(detections[1])*10.0 );
				var cellIndex_y = parseInt( parseFloat(detections[2])*10.0 );

				resultCell[cellIndex_y][cellIndex_x].result.push(_result[i]);
			}

			return resultCell;
		},
		createRectLine:function(_key, _imageWidth, _imageHeight, _data, _color){
			var line = Module.createLineString(_key);

			// 좌표 리스트 생성
			var result_detections = _data.detections.split(" ");

			var coordinates = this.getDetectionRectCoordinates(
				_imageWidth, _imageHeight,
				result_detections[1], result_detections[2],
				result_detections[3], result_detections[4]
			);

			var parts = new Module.Collection();
			parts.add(5);
			line.setPartCoordinates(coordinates, parts);

			var color = new Module.JSColor(255, _color[0], _color[1], _color[2]);

			var lineStyle = new Module.JSPolyLineStyle();
			lineStyle.setWidth(1.1);
			lineStyle.setColor(color);
			line.setStyle(lineStyle);

			return line;
		},
		getDetectionRectCoordinates:function(_imageWidth, _imageHeight, _centerX, _centerY, _width, _height){
			var coordinates = new Module.JSVec3Array();

			var center_x = parseFloat(_centerX) * _imageWidth;
			var center_y = parseFloat(_centerY) * _imageHeight;

			var halfWidth = (parseFloat(_width) * _imageWidth) / 2;
			var halfHeight = (parseFloat(_height) * _imageHeight) / 2;

			var screenPos_min_x = center_x - halfWidth;
			var screenPos_min_y = center_y - halfHeight;

			var screenPos_max_x = center_x + halfWidth;
			var screenPos_max_y = center_y + halfHeight;

			coordinates.push( this.screenToLonLatAlt(screenPos_min_x, screenPos_min_y, 2.0) );	// left-top
			coordinates.push( this.screenToLonLatAlt(screenPos_max_x, screenPos_min_y, 2.0) );	// right-top
			coordinates.push( this.screenToLonLatAlt(screenPos_max_x, screenPos_max_y, 2.0) );	// right-bottom
			coordinates.push( this.screenToLonLatAlt(screenPos_min_x, screenPos_max_y, 2.0) );	// left-bottom
			coordinates.push( this.screenToLonLatAlt(screenPos_min_x, screenPos_min_y, 2.0) );	// left-top

			return coordinates;
		},
		insertDetectPositionMoveButton:function(_index, _imageWidth, _imageHeight, _centerScreen_x, _centerScreen_y, _classType, _classNumber, _confidenct){
//			debugger
			var center = this.screenToLonLatAlt(parseFloat(_centerScreen_x)*_imageWidth, parseFloat(_centerScreen_y)*_imageHeight, 0.0);

			var className = M_AI_IMAGE.detectLegend.getLegendName(_classNumber);
			var classId = M_AI_IMAGE.detectLegend.legend["class_"+_classNumber].id;
			var perciseNum = (_confidenct*100).toFixed(0);

			var html = "";
			html += "<tr data-id="+classId+">\n";
			html += "	<td>"+_index+"</td>\n";
			html += "	<td>"+_classType+"</td>\n";
			html += "	<td>"+className+"</td>\n";
			html += "	<td>"+perciseNum+"%</td>\n";
			html += "	<td>\n"
			html += "		<button type=\"button\" class=\"icon-btn location sm\" onclick=\"M_AI_IMAGE.analysis.moveDetectPosition("+center.Longitude+","+center.Latitude+","+center.Altitude+");\">\n";
			html += "		</button>\n";
			html += "	</td>\n";
			html += "</tr>\n";

			$("#classifiedBody").append(html);
		},
		screenToLonLatAlt:function(_screenX, _screenY, _altitudeGap){

			if (_altitudeGap < 0.001) {
				return Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(_screenX, _screenY));
			}

			var pos = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(_screenX, _screenY));
			pos.Altitude += _altitudeGap;

			return pos;
		},
		moveDetectPosition:function(_lon, _lat, _alt, _color){
			var position = new Module.JSVector3D(_lon, _lat, _alt+150.0);

			// 카메라 위치 이동
			var camera = new Module.getViewCamera();
			//camera.setTilt(90.0);
			//camera.setLocation(position);
			camera.moveLookAt(position, Module.getViewCamera().getTilt(), GLOBAL.Camera.getDirect(), _alt * 25);

			// 위치 표시
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("ML_RESULT_SELECT_POSITION");
			if (layer == null) {
				layer = layerList.createLayer("ML_RESULT_SELECT_POSITION", Module.ELT_3DPOINT);
				layer.setMaxDistance(GLOBAL.MaxDistance);
				layer.setSelectable(false);
			} else {
				layer.removeAll();
			}

			var point = new Module.createPoint("point_"+layer.getObjectCount());
			position.Altitude = _alt;
			point.setPosition(position);
//			point.setText("O");

			layer.addObject(point, 0);
		},
		reset:function(){
			
			$("#copyCanvas").remove();
			$("#gridCanvas").remove();
			$("#classifiedBody").empty();

			//카운터 초기화
			M_AI_IMAGE.detectLegend.clearCount()
			
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.nameAtLayer("ML_RESULT_RECT");
			
			if (layer != null) {
				layer.removeAll();
			}

		}

	},
	UTIL:{
		dataURLtoFile:function(dataurl, fileName){
			var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

			while(n--){
				u8arr[n] = bstr.charCodeAt(n);
			}

			return new File([u8arr], fileName, {type:mime});
		}
	}
	
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

$(function(){
	$(".scroll-y").mCustomScrollbar({
	    scrollbarPosition:"outside"
	 });
	
	
	//분석 popup 접기/펼치기
	$(".small-popup .popup-toggle").each(function() {
		$(this).click(function(){
			$(this).parent().toggleClass("fold");
			
			if( $(this).parent().hasClass("fold") ){
				$(this).attr("title","펼치기");
			} else {			
				$(this).attr("title","접기");
			}
		});
	});
});