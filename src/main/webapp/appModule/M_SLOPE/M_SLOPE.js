/**
 * SUBJECT : 경사분석 
 * AUTHOR : 이푸름 
 * LAST UPDATE : 2021.1.12
 * COMMENT :
 */
var M_SLOPE = {
	a_layer:null,
	d_layer:null,
	slopeType:null,
	slopeCoord:null,
	slopeData:null,
	slopeLocation:null,
	slopeStart:false,
	jsonKey: null,
	jsonData: null,
	m_point: null,
	slopeUpload: [],
	isIncreaseAltitude : false,
	init:function() {
//		$("#analysisSlopeAre").show();

//		$("#closeSlopeBtn").on('click',function(e){
//
//			var moduleId = $("#analysisSlopeAre").parents("[id*=navs-analy]")[0].id.split("navs-analy-")[1];
//
//			IDE.MODULE.closeModule(moduleId);
//
//		});
		
		window.addEventListener("keydown",M_SLOPE.clickListener);
		canvas.addEventListener("mousedown",M_SLOPE.onmousedown);

//		$("#slopeFileUploadModal").mouseover(function() {
//			Module.XDIsMouseOverDiv(true);
//		})
//		.mouseout(function() {
//			Module.XDIsMouseOverDiv(false);
//		});

//		$("#slopeLegend").hide();

		M_SLOPE.a_layer = "angleSlopeLayer";
		M_SLOPE.d_layer = "directionSlopeLayer";

		Module.XDCreateLayer(9, M_SLOPE.a_layer);
		Module.XDCreateLayer(9, M_SLOPE.d_layer);

		var layerList = new Module.JSLayerList(true);

		var layer = layerList.nameAtLayer(M_SLOPE.a_layer);
		layer.setSelectable(false);

		layer = layerList.nameAtLayer(M_SLOPE.d_layer);
		layer.setSelectable(false);

		$("#analysisSlopeAre .noScroll").mouseover(function() {
			Module.XDIsMouseOverDiv(true);
		})
		.mouseout(function() {
			Module.XDIsMouseOverDiv(false);
		});

//		new PerfectScrollbar(document.getElementById('slopeLegend'));
		Module.setRemoveVertexMemory(false);
		M_SLOPE.slopeType = null;
		M_SLOPE.slopeCoord = null;
		M_SLOPE.slopeData = null;
		M_SLOPE.slopeLocation = null;
		//유형변경시 이벤트
		$("[name=slopeType]").on("change",function(){
			if($("select[name=slopeType]").val() == "DA"){
				var arrowResolTr = $("#M_SLOPE tbody tr")[2]
				arrowResolTr.style.display='none'
				var arrowColorTr = $("#M_SLOPE tbody tr")[3]
				arrowColorTr.style.display='none'
				$("#analysisResultDiv").css("display","none");
				$("#M_SLOPE .box2.tbl-default").css("display","none");
			}
			else{
				var arrowResolTr = $("#M_SLOPE tbody tr")[2]
				arrowResolTr.style.display='table-row'
				var arrowColorTr = $("#M_SLOPE tbody tr")[3]
				arrowColorTr.style.display='table-row'
				$("#analysisResultDiv").css("display","flex");
				$("#M_SLOPE .box2.tbl-default").css("display","block");
			}
			//영역 존재시 해당 타입으로 그리기
			var count = Module.getMap().getInputPointCount();
			if(count > 2 && M_SLOPE.slopeStart){
				M_SLOPE.runSlope();
			}
		});
		//다운로드버튼
		$("#slopeDownBtn").off().on("click",function(){
			var saveType = $("#selectDownLoadType").val();
			
//			if(saveType=='db'){
//				M_SLOPE.saveDB();
//			}else{
//				
//			}
			
			M_SLOPE.saveSlope(saveType);//현재 앱서버 부재로 pdf 다운만 가능
		})
		//그리드 간격 변경시
		$("#slopeGrid").on("change",function(){
			if($("#slopeGrid").val() == "" || parseInt($("#slopeGrid").val()) <= 0){
				$("#slopeGrid").val("1");
			}
			$("#slopeGrid").val(parseInt($("#slopeGrid").val()));
		});
		//햇
		$("#slopeDetail").on("change",function(){
			if($("#slopeDetail").val() == "" || parseInt($("#slopeDetail").val()) <= 0){
				$("#slopeDetail").val("1");
			}
			$("#slopeDetail").val(parseInt($("#slopeDetail").val()));
		});
//		M_SLOPE.fileLoad();
		
		/*var button = document.getElementById("slopeGridUp");
		button.onmousedown = function(e) {
			M_SLOPE.isIncreaseAltitude = true;
			setTimeout(function(se) {
				if(M_SLOPE.isIncreaseAltitude)	M_SLOPE.setNumUpDown(1,'slopeGrid');
			}, 1000);
		};
		button.onmouseout = button.onmouseup = function() {
			M_SLOPE.isIncreaseAltitude = false;
		};
		
		var button = document.getElementById("slopeGridDown");
		button.onmousedown = function(e) {
			M_SLOPE.isIncreaseAltitude = true;
			setTimeout(function(se) {
				if(M_SLOPE.isIncreaseAltitude)	M_SLOPE.setNumUpDown(-1,'slopeGrid');
			}, 1000);
		};
		button.onmouseout = button.onmouseup = function() {
			M_SLOPE.isIncreaseAltitude = false;
		};
		
		var button = document.getElementById("slopeDetailUp");
		button.onmousedown = function(e) {
			M_SLOPE.isIncreaseAltitude = true;
			setTimeout(function(se) {
				if(M_SLOPE.isIncreaseAltitude)	M_SLOPE.setNumUpDown(1,'slopeDetail');
			}, 1000);
		};
		button.onmouseout = button.onmouseup = function() {
			M_SLOPE.isIncreaseAltitude = false;
		};
		
		var button = document.getElementById("slopeDetailDown");
		button.onmousedown = function(e) {
			M_SLOPE.isIncreaseAltitude = true;
			setTimeout(function(se) {
				if(M_SLOPE.isIncreaseAltitude)	M_SLOPE.setNumUpDown(-1,'slopeDetail');
			}, 1000);
		};
		button.onmouseout = button.onmouseup = function() {
			M_SLOPE.isIncreaseAltitude = false;
		};*/
	},
	//초기화
	destroy:function() {
		M_SLOPE.closeTooltip();
		M_SLOPE.clearAll();
		M_SLOPE.clearArea();

		Module.XDEMapRemoveLayer(M_SLOPE.d_layer);
		Module.XDEMapRemoveLayer(M_SLOPE.a_layer);

		window.removeEventListener("keydown",M_SLOPE.clickListener);
		canvas.removeEventListener("mousedown",M_SLOPE.onmousedown);
		Module.setRemoveVertexMemory(true);
		M_SLOPE.slopeType = null;
		M_SLOPE.slopeCoord = null;
		M_SLOPE.slopeData = null;
		M_SLOPE.slopeLocation = null;
		M_SLOPE.slopeStart = false;
		//입력값 초기화
		Module.getMap().clearInputPoint();
	},
	display: function () {
		Module.XDSetMouseState(1);
	},
	//영역선택 버튼클릭시
	setRectangle:function(){
		M_SLOPE.clearAll();
		M_SLOPE.clearArea();
		M_SLOPE.showTooltip();
		Module.XDSetMouseState(22);
		$("#setArea").css("display","none");
		M_SLOPE.slopeStart = false;
	},
	//영역선택 버튼클릭시
	setArea:function(){
		M_SLOPE.clearAll();
		M_SLOPE.clearArea();
		M_SLOPE.showTooltip();
		Module.XDSetMouseState(24);
		$("#setArea").css("display","none");
		$("#resetArea").css("display","block");
		M_SLOPE.slopeStart = false;
	},
	//영역선택 버튼클릭시
	setCircle:function(){
		M_SLOPE.clearAll();
		M_SLOPE.clearArea();
		M_SLOPE.showTooltip();
		Module.XDSetMouseState(23);
		$("#setArea").css("display","none");
		M_SLOPE.slopeStart = false;
	},
	//선택완료버튼
	resetArea:function(){

//		var moduleId = $("#analysisSlopeAre").parents("[id*=navs-analy]")[0].id.split("navs-analy-")[1];

//		if(dtcApps.front == moduleId){
//		}
		var count = Module.getMap().getInputPointCount();
		if(count <3){
			toastr.warning("3개이상의 포인트가 선택되어야합니다.");
			Module.getMap().clearInputPoint();
			
		}
			M_SLOPE.closeTooltip();
			Module.XDSetMouseState(1);
			$("#resetArea").css("display","none");
			$("#setArea").css("display","block");
	},
	//영역선택시 지도 툴팁 show
	showTooltip:function(){
		var tooltip = "editSlopeSetArea";
		var mouseX;
		var mouseY;
		$(document).mousemove( function(e) {
		    mouseX = e.pageX;
		    mouseY = e.pageY;
		});
	    $('#'+tooltip).stop(false, true).show(1);
	    $("#canvas").on("mousemove",function() {
	        $('#'+tooltip).css({'top':mouseY + 15,'left':mouseX + 15});

	    });

	},
	closeTooltip:function(){
		var tooltip = "editSlopeSetArea";
        $("#canvas").off("mousemove");
        $("#canvas").off("mouseover");
        $(document).off("mousemove");
        $('#'+tooltip).hide();
	},
	clickListener:function( e) {
		if ( e.key == "Escape" ) {
			M_SLOPE.resetArea();
		}
	},
	clearArea:function() {
		//입력값 초기화
		Module.XDEClearMeasurement();
		Module.getMap().clearInputPoint();
	},
	clearAll:function() {
//		$("#slopeLegend").hide();
		$("#slopeLegend").css("display","none")
		//Module.XDEClearMeasurement();

		let slope = Module.getSlope()
		slope.clearAnalysisData();

		// 화면 갱신
		Module.XDRenderData();
//		//입력값 초기화
//		Module.getMap().clearInputPoint();


		Module.XDEMapRemoveLayer(M_SLOPE.d_layer);
		Module.XDEMapRemoveLayer(M_SLOPE.a_layer);

		Module.XDCreateLayer(9, M_SLOPE.d_layer);
		Module.XDCreateLayer(9, M_SLOPE.a_layer);

		var layerList = new Module.JSLayerList(true);

		var layer = layerList.nameAtLayer("directionSlopeLayer");
		layer.setSelectable(false);

		layer = layerList.nameAtLayer("angleSlopeLayer");
		layer.setSelectable(false);

		M_SLOPE.slopeType = null;
		M_SLOPE.slopeCoord = null;
		M_SLOPE.slopeData = null;
		M_SLOPE.slopeLocation = null;

		M_SLOPE.slopeStart = false;
	},
	runSlope:function(){

		M_SLOPE.resetArea();
		M_SLOPE.clearAll();

		var count = Module.getMap().getInputPointCount();
		var slopeGrid = $("#slopeGrid").val();
		var slopeColor = $("#slopeColor").val();
		var slopeDetail = $("#slopeDetail").val();
		M_SLOPE.slopeType =$("select[name=slopeType]").val();
		if(count == 0){
			toastr.warning("영역이 선택되지않았습니다.");
			return false;
		}
		if(count <3){
			toastr.warning("3개이상의 포인트가 선택되어야합니다");
			M_SLOPE.resetArea();
			M_SLOPE.clearAll();
			Module.getMap().clearInputPoint();
			return false;
		}
		if(slopeGrid == ""){
//			COMMON.toastr.warning("그리드 간격을 입력하여주세요.",'info',function(){});
			$("#slopeGrid").focus();
			return false;
		}
		if(M_SLOPE.slopeType == "DA"){
			if(slopeDetail == ""){
//				COMMON.toastr.warning("화살표 해상도를 입력하여주세요.",'info',function(){});
				$("#slopeDetail").focus();
				return false;
			}
		}
		M_SLOPE.slopeCoord = [];
		for(var i=0;i<count;i++){
			var data = Module.getMap().getInputPoints().get(i);
			var array = {lon : data.Longitude, lat : data.Latitude, alt : data.Altitude};

			M_SLOPE.slopeCoord.push(array);
		}

		M_SLOPE.closeTooltip();
//		COMMON.blockUIdiv("analysisSlopeAre","");
//		COMMON.blockUIdiv("MapContainer","분석중...");
//		console.log("runSlope");
		switch (M_SLOPE.slopeType) {
			case "A":
				//경사도
				M_SLOPE.executeAngle();
			break;
			case "D":
				//경사향
				M_SLOPE.executeDirection();
			break;
			case "DA":
				//경사향_화살표
				M_SLOPE.executeDirectionArrow();
			break;
			case "AD":
				//경사향도
				M_SLOPE.executeDirectionAngle();
			break;
		}

		var longitude = Module.getViewCamera().getLocation().Longitude.toFixed(5);
		var latitude = Module.getViewCamera().getLocation().Latitude.toFixed(5);

		M_SLOPE.slopeLocation = longitude + " " + latitude;
		
		$("#slopeLegend").css("display","block");
//		COMMON.unblockUIdiv("analysisSlopeAre");
//		COMMON.unblockUIdiv("MapContainer");

		Module.XDSetMouseState(1);
		M_SLOPE.slopeStart = true;
	},
	executeAngle:function() {
		let callback = M_SLOPE.createRTTPixel;
		let progress = M_SLOPE.nowProgress;
		let slope = Module.getSlope();

		var today = new Date();
		var year = M_SLOPE.leadingZeros(today.getFullYear(), 4); // 년도
		var month = M_SLOPE.leadingZeros(today.getMonth() + 1, 2);  // 월
		var date = M_SLOPE.leadingZeros(today.getDate(), 2);  // 날짜
		var hours = M_SLOPE.leadingZeros(today.getHours(), 2); // 시
		var minutes = M_SLOPE.leadingZeros(today.getMinutes(), 2);  // 분
		var date = year+month+date+hours+minutes;

		M_SLOPE.jsonKey = "a_key"+date;

		let slopeoption = {
			info: {
				layer: M_SLOPE.a_layer,
				key: M_SLOPE.jsonKey,
			},
			coordinates: {
				style: "JSVector3D",
				coordinate: Module.getMap().getInputPoints(),
			},
			analysis: {
				type: "TERRAIN_ANGLE",
				size: parseInt($("#slopeGrid").val()),
				image: true,
			},
			callback: callback,
			progress: progress,
		}

		slope.clearAnalysisData();
		//범례
		var colorMap = M_SLOPE.setColorLegendobject(2);

		let t_result = slope.analysisTerrainSlope(slopeoption);
		// 성공 시 success 반환 오류시 오류 메시지 반환
		//console.log(t_result);
		//M_SLOPE.viewOutputData(2);
		// 화면 갱신
		Module.XDRenderData();
		// 입력값 초기화
		//Module.getMap().clearInputPoint();
		M_SLOPE.setLegend(colorMap);
		
		var innerHtml = '평균경사도: '+ Math.round(slope.getAnalysisResult(M_SLOPE.jsonKey, 1, 0)* 100) / 100 + 'º';		
		$('#avgSlopeAngle').text(innerHtml);

	},
	executeDirection:function() {

		let callback = M_SLOPE.createRTTPixel;
		let progress = M_SLOPE.nowProgress;
		let slope = Module.getSlope();

		var today = new Date();
		var year = M_SLOPE.leadingZeros(today.getFullYear(), 4); // 년도
		var month = M_SLOPE.leadingZeros(today.getMonth() + 1, 2);  // 월
		var date = M_SLOPE.leadingZeros(today.getDate(), 2);  // 날짜
		var hours = M_SLOPE.leadingZeros(today.getHours(), 2); // 시
		var minutes = M_SLOPE.leadingZeros(today.getMinutes(), 2);  // 분
		var date = year+month+date+hours+minutes;

		M_SLOPE.jsonKey = "d_key"+date;

		let slopeoption = {
			info: {
				layer: M_SLOPE.d_layer,
				key: M_SLOPE.jsonKey,
			},
			coordinates: {
				style: "JSVector3D",
				coordinate: Module.getMap().getInputPoints(),
			},
			analysis: {
				type: "TERRAIN_DIRECTION",
				size: parseInt($("#slopeGrid").val()),
				image: true,
			},
			callback: callback,
			progress: progress,
		}

		slope.clearAnalysisData();
		var colorMap = M_SLOPE.setColorLegendobject(0);

		let t_result = slope.analysisTerrainSlope(slopeoption);
		// 성공 시 success 반환 오류시 오류 메시지 반환
		//console.log(t_result);
		M_SLOPE.viewOutputData(0);
		// 화면 갱신
		Module.XDRenderData();
		// 입력값 초기화
		//Module.getMap().clearInputPoint();
		M_SLOPE.setLegend(colorMap);
	},
	executeDirectionArrow:function() {
		let callback = M_SLOPE.createRTTArrow;
		let progress = M_SLOPE.nowProgress;
		let slope = Module.getSlope();

		var today = new Date();
		var year = M_SLOPE.leadingZeros(today.getFullYear(), 4); // 년도
		var month = M_SLOPE.leadingZeros(today.getMonth() + 1, 2);  // 월
		var date = M_SLOPE.leadingZeros(today.getDate(), 2);  // 날짜
		var hours = M_SLOPE.leadingZeros(today.getHours(), 2); // 시
		var minutes = M_SLOPE.leadingZeros(today.getMinutes(), 2);  // 분
		var date = year+month+date+hours+minutes;

		M_SLOPE.jsonKey = "da_key"+date;

		let slopeoption = {
			info: {
				layer: M_SLOPE.d_layer,
				key: M_SLOPE.jsonKey,
			},
			coordinates: {
				style: "JSVector3D",
				coordinate: Module.getMap().getInputPoints(),
			},
			analysis: {
				type: "TERRAIN_DIRECTION_SHAPE",
				size: parseInt($("#slopeGrid").val()),
				image: true,
			},
			shape: {
				size: parseInt($("#slopeDetail").val()),
				r: 0,
				g: 0,
				b: 0,
				a: 255,
			},
			callback: callback,
			progress: progress,
		}

		slope.clearAnalysisData();

		colorMap = M_SLOPE.setColorLegendobject(2);

		let t_result = slope.analysisTerrainSlope(slopeoption);
		// 성공 시 success 반환 오류시 오류 메시지 반환
		//console.log(t_result);
		M_SLOPE.viewOutputData(2);
		// 화면 갱신
		Module.XDRenderData();
		// 입력값 초기화
		//Module.getMap().clearInputPoint();
		$("#slopeLegend tbody").html("");
	},
	executeDirectionAngle:function() {
		let callback = M_SLOPE.createRTTPixel;
		let progress = M_SLOPE.nowProgress;
		let slope = Module.getSlope();

		var today = new Date();
		var year = M_SLOPE.leadingZeros(today.getFullYear(), 4); // 년도
		var month = M_SLOPE.leadingZeros(today.getMonth() + 1, 2);  // 월
		var date = M_SLOPE.leadingZeros(today.getDate(), 2);  // 날짜
		var hours = M_SLOPE.leadingZeros(today.getHours(), 2); // 시
		var minutes = M_SLOPE.leadingZeros(today.getMinutes(), 2);  // 분
		var date = year+month+date+hours+minutes;

		M_SLOPE.jsonKey = "ad_key"+date;

		let slopeoption = {
			info: {
				layer: M_SLOPE.d_layer,
				key: M_SLOPE.jsonKey,
			},
			coordinates: {
				style: "JSVector3D",
				coordinate: Module.getMap().getInputPoints(),
			},
			analysis: {
				type: "TERRAIN_DIRECTION_ANGLE",
				size: parseInt($("#slopeGrid").val()),
				image: true,
			},
			callback: callback,
			progress: progress,
		}

		slope.clearAnalysisData();

		colorMap = M_SLOPE.setColorLegendobject(3);

		let t_result = slope.analysisTerrainSlope(slopeoption);
		// 성공 시 success 반환 오류시 오류 메시지 반환
		//console.log(t_result);
		M_SLOPE.viewOutputData(3);
		// 화면 갱신
		Module.XDRenderData();
		// 입력값 초기화
		//Module.getMap().clearInputPoint();

		M_SLOPE.setLegend(colorMap);
	},
	createRTTPixel:function(..._args) {
		let width, height,
			r, g, b, a, color,
			x, y,
			data, pixelData, size;

		r = g = b = a = 0;
		width = _args[0];
		height = _args[1];
		size = width * height;
		data = pixelData = null;

		let c = document.createElement('canvas');
		c.width = width;
		c.height = height;

		let ctx = c.getContext('2d');

		data = HEAPU32.subarray(_args[2] / 4, _args[2] + size);
		pixelData = ctx.createImageData(width, height);

		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				color = data[size - ((y + 1) * width) + x];
				if (color != 0) {
					a = (color >> 24) & 0xff;
					r = (color >> 16) & 0xff;
					g = (color >> 8) & 0xff;
					b = color & 0xff;
				} else {
					r = g = b = a = 0;
				}
				pixelData.data[(((y * width) + x) * 4)] = r;		// red   color
				pixelData.data[(((y * width) + x) * 4) + 1] = g;  	// green color
				pixelData.data[(((y * width) + x) * 4) + 2] = b;  	// blue  color
				pixelData.data[(((y * width) + x) * 4) + 3] = a;	// alpha color
			}
		}

		ctx.putImageData(pixelData, 0, 0);
		M_SLOPE.slopeData = c;
		return ctx.getImageData(0, 0, width, height).data;
	},
	createRTTArrow:function(..._args) {
		let width, height, cols, rows, arrowlen,
			x, y, hlen, radians,
			size, data,
			r, g, b, a;

		width = _args[0];
		height = _args[1];
		cols = _args[3];
		rows = _args[4];
		arrowlen = _args[5];
		r = _args[6];
		g = _args[7];
		b = _args[8];
		a = _args[9];

		size = cols * rows;
		hlen = arrowlen >> 2;

		let c = document.createElement('canvas');
		c.width = width;
		c.height = height;

		let ctx = c.getContext('2d');

		data = HEAPU32.subarray((_args[2] >> 2), (_args[2] + size));

		for (let i = 1; i < rows - 1; i++) {
			for (let j = 1; j < cols - 1; j++) {

				if (data[i * cols + j] == 10000) continue;

				x = (j * arrowlen) + hlen;
				y = height - (i * arrowlen) - hlen;

				ctx.save();
				ctx.translate(x, y);
				radians = data[i * cols + j] * (Math.PI / 180);
				ctx.rotate(radians);
				ctx.translate(-x, -y);

				ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
				M_SLOPE.drawArrow(ctx, x, y, 0, 0, hlen, hlen, 0);
				ctx.restore();
			}
		}
		return ctx.getImageData(0, 0, width, height).data;
	},
	drawArrow:function(_ctx, _cx, _cy, _bx, _by, _width, _height, _mode) {
		
		var color = $("#slopeColor").val()
		var r = parseInt(color.substr(1,2), 16);
		var g = parseInt(color.substr(3,2), 16);
		var b = parseInt(color.substr(5,2), 16);
		
		let half_width = _width >> 1;
		let half_height = _height;
		let wing_len = (_width >> 2) - (_bx >> 2);
		_ctx.beginPath();
		_ctx.moveTo(_cx, _cy - half_height + _by);
		_ctx.lineTo(_cx - half_width + _bx, _cy);
		_ctx.lineTo(_cx - half_width + wing_len + _bx, _cy);
		_ctx.lineTo(_cx - half_width + wing_len + _bx, _cy + half_height - _by);
		_ctx.lineTo(_cx + half_width - wing_len - _bx, _cy + half_height - _by);
		_ctx.lineTo(_cx + half_width - wing_len - _bx, _cy);
		_ctx.lineTo(_cx + half_width - _bx, _cy);
		_ctx.lineTo(_cx, _cy - half_height + _by);
		_ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
		_ctx.fill();
	},
	// 진행 상태 함수
	nowProgress:function(..._args) {
		//console.log(_args);
	},
	// 결과값 반환
	viewOutputData:function(_type) {
		let slope = Module.getSlope();

		console.log(slope.getImageWidth(M_SLOPE.jsonKey));
		console.log(slope.getImageHeight(M_SLOPE.jsonKey));

		if (_type == 0) {
			console.log("direct avg : " + slope.getAnalysisResult(M_SLOPE.jsonKey, 0, 0));
			console.log("direct min : " + slope.getAnalysisResult(M_SLOPE.jsonKey, 0, 1));
			console.log("direct max : " + slope.getAnalysisResult(M_SLOPE.jsonKey, 0, 2));
		} else if (_type == 2) {
			console.log("angle avg : " + slope.getAnalysisResult(M_SLOPE.jsonKey, 1, 0));
			console.log("angle min : " + slope.getAnalysisResult(M_SLOPE.jsonKey, 1, 1));
			console.log("angle max : " + slope.getAnalysisResult(M_SLOPE.jsonKey, 1, 2));
		}

		// 범례별 면적 반환 (setColorLegend 갯수)
		console.log(" 0 : " + slope.getColorArea(M_SLOPE.jsonKey, 0));
		console.log(" 1 : " + slope.getColorArea(M_SLOPE.jsonKey, 1));
		console.log(" 2 : " + slope.getColorArea(M_SLOPE.jsonKey, 2));
		console.log(" 3 : " + slope.getColorArea(M_SLOPE.jsonKey, 3));
		console.log(" 4 : " + slope.getColorArea(M_SLOPE.jsonKey, 4));
		console.log(" 5 : " + slope.getColorArea(M_SLOPE.jsonKey, 5));
		console.log(" 6 : " + slope.getColorArea(M_SLOPE.jsonKey, 6));
		console.log(" 7 : " + slope.getColorArea(M_SLOPE.jsonKey, 7));
		console.log(" 8 : " + slope.getColorArea(M_SLOPE.jsonKey, 8));
		console.log(" 9 : " + slope.getColorArea(M_SLOPE.jsonKey, 9));
		console.log(" 10 : " + slope.getColorArea(M_SLOPE.jsonKey, 10));
		console.log(" 11 : " + slope.getColorArea(M_SLOPE.jsonKey, 11));
		console.log(" 12 : " + slope.getColorArea(M_SLOPE.jsonKey, 12));
		console.log(" 13 : " + slope.getColorArea(M_SLOPE.jsonKey, 13));
		console.log(" 14 : " + slope.getColorArea(M_SLOPE.jsonKey, 15));
	},
	setColorLegendobject:function(_type) {
		let alpha = Number(200);
		let TerrainType = "";
		let list = [];
		let colorMap = {};

		if (_type == 0) {
			// 경사향 설정
			//( 번호, 최소비교값,	최대비교값,	향정보,	범레색상 );
			// - 향정보
			//		- 0 : 북 	( 0 ~ 22.5, 337.6 ~ 360 )
			//		- 1 : 북동	( 22.6 ~ 67.5 )
			//		- 2 : 동	( 67.6 ~ 112.5 )
			//		- 3 : 남동	( 112.6 ~ 157.5 )
			//		- 4 : 남	( 157.6 ~ 202.5 )
			//		- 5 : 남서	( 202.6 ~ 247.5 )
			//		- 6 : 서	( 247.6 ~ 292.5 )
			//		- 7 : 북서	( 292.6 ~ 337.5 )
			// ps RTT 색상 값중 투명 처리를 위해서
			// if( red < 0.1 ( == 25 ) && green > 0.9 ( == 230 ) && blue > 0.9 ( == 230 ) ) 이면 지형 투명처리된다
			TerrainType = "TERRAIN_DIRECTION"
			list = [
				{ num: 0, direction: "N", a: alpha, r: 255, g: 0, b: 0 },		//북	( 0 ~ 22.5, 337.6 ~ 360 )
				{ num: 1, direction: "NE", a: alpha, r: 255, g: 166, b: 0 },	//북동	( 22.6 ~ 67.5 )
				{ num: 2, direction: "E", a: alpha, r: 255, g: 255, b: 0 },		//동	( 67.6 ~ 112.5 )
				{ num: 3, direction: "SE", a: alpha, r: 0, g: 255, b: 0 },		//남동	( 112.6 ~ 157.5 )
				{ num: 4, direction: "S", a: alpha, r: 0, g: 100, b: 100 },		//남	( 157.6 ~ 202.5 )	// if( backColor.r<0.1 && backColor.g>0.9 && backColor.b>0.9) backColor.a = 0.0; 임으로 잘 확인하자
				{ num: 5, direction: "SW", a: alpha, r: 0, g: 166, b: 255 },	//남서	( 202.6 ~ 247.5 )
				{ num: 6, direction: "W", a: alpha, r: 0, g: 0, b: 255 },		//서	( 247.6 ~ 292.5 )
				{ num: 7, direction: "NW", a: alpha, r: 255, g: 0, b: 255 },	//북서	( 292.6 ~ 337.5 )
			]
		} else if (_type == 2) {
			// 경사도 설정
			TerrainType = "TERRAIN_ANGLE"
			list = [
				{ num: 0, begin: 0, end: 10, a: alpha, r: 119, g: 147, b: 60 },
				{ num: 1, begin: 10, end: 15, a: alpha, r: 0, g: 176, b: 80 },
				{ num: 2, begin: 15, end: 20, a: alpha, r: 195, g: 214, b: 155 },
				{ num: 3, begin: 20, end: 25, a: alpha, r: 252, g: 213, b: 181 },
				{ num: 4, begin: 25, end: 30, a: alpha, r: 250, g: 192, b: 144 },
				{ num: 5, begin: 30, end: 35, a: alpha, r: 247, g: 150, b: 70 },
				{ num: 6, begin: 35, end: 40, a: alpha, r: 228, g: 108, b: 10 },
				{ num: 7, begin: 40, end: 90, a: alpha, r: 255, g: 0, b: 0 }
			]
		} else if (_type == 3) {
			// 경사향도 설정
			TerrainType = "TERRAIN_DIRECTION_ANGLE"
			list = [
				// 북
				{ num: 0, direction: "N", begin: 0.0, end: 10.0, a: alpha, r: 152, g: 181, b: 129 },
				{ num: 1, direction: "N", begin: 10.0, end: 20.0, a: alpha, r: 141, g: 196, b: 88 },
				{ num: 2, direction: "N", begin: 20.0, end: 100.0, a: alpha, r: 132, g: 214, b: 0 },
				// 북동
				{ num: 3, direction: "NE", begin: 0.0, end: 10.0, a: alpha, r: 114, g: 168, b: 114 },
				{ num: 4, direction: "NE", begin: 10.0, end: 20.0, a: alpha, r: 61, g: 171, b: 113 },
				{ num: 5, direction: "NE", begin: 20.0, end: 100.0, a: alpha, r: 0, g: 171, b: 68 },
				// 동
				{ num: 6, direction: "E", begin: 0.0, end: 10.0, a: alpha, r: 124, g: 142, b: 173 },
				{ num: 7, direction: "E", begin: 10.0, end: 20.0, a: alpha, r: 80, g: 120, b: 183 },
				{ num: 8, direction: "E", begin: 20.0, end: 100.0, a: alpha, r: 0, g: 104, b: 192 },
				// 남동
				{ num: 9, direction: "SE", begin: 0.0, end: 10.0, a: alpha, r: 140, g: 117, b: 160 },
				{ num: 10, direction: "SE", begin: 10.0, end: 20.0, a: alpha, r: 119, g: 71, b: 157 },
				{ num: 11, direction: "SE", begin: 20.0, end: 100.0, a: alpha, r: 108, g: 0, b: 163 },
				// 남
				{ num: 12, direction: "S", begin: 0.0, end: 10.0, a: alpha, r: 180, g: 123, b: 161 },
				{ num: 13, direction: "S", begin: 10.0, end: 20.0, a: alpha, r: 192, g: 77, b: 156 },
				{ num: 14, direction: "S", begin: 20.0, end: 100.0, a: alpha, r: 202, g: 0, b: 156 },
				// 남서
				{ num: 15, direction: "SW", begin: 0.0, end: 10.0, a: alpha, r: 203, g: 139, b: 143 },
				{ num: 16, direction: "SW", begin: 10.0, end: 20.0, a: alpha, r: 231, g: 111, b: 122 },
				{ num: 17, direction: "SW", begin: 20.0, end: 100.0, a: alpha, r: 255, g: 85, b: 104 },
				// 서
				{ num: 18, direction: "W", begin: 0.0, end: 10.0, a: alpha, r: 197, g: 165, b: 138 },
				{ num: 19, direction: "W", begin: 10.0, end: 20.0, a: alpha, r: 226, g: 166, b: 108 },
				{ num: 20, direction: "W", begin: 20.0, end: 100.0, a: alpha, r: 255, g: 171, b: 71 },
				// 북서
				{ num: 21, direction: "NW", begin: 0.0, end: 10.0, a: alpha, r: 189, g: 191, b: 137 },
				{ num: 22, direction: "NW", begin: 10.0, end: 20.0, a: alpha, r: 214, g: 219, b: 94 },
				{ num: 23, direction: "NW", begin: 20.0, end: 100.0, a: alpha, r: 244, g: 250, b: 0 }
			]
		}

		colorMap = {
			type: TerrainType,
			list: list
		}
		let slope = Module.getSlope();
		slope.insertColorMap(colorMap);
		return colorMap;
	},
	ExportJSON: function () {
		let slope = Module.getSlope();
		M_SLOPE.jsonData = slope.exportSlopeData(M_SLOPE.jsonKey); //성공
		console.log(M_SLOPE.jsonData)
		M_SLOPE.jsonData = JSON.parse(M_SLOPE.jsonData);
		console.log(M_SLOPE.jsonData)
	},
	ImportJSON: function () {
		console.log(M_SLOPE.jsonData)
		let slope = Module.getSlope();
		let str = slope.importSlopeData(M_SLOPE.jsonData, M_SLOPE.createRTTPixel, M_SLOPE.nowProgress);
		Module.XDRenderData();
		console.log(str)
	},
	getSlope: function () {
		let map = Module.getMap();
		let center = map.ScreenToMapPointEX(new Module.JSVector2D(M_SLOPE.m_point.x, M_SLOPE.m_point.y));
		console.log(center.Longitude, center.Latitude, center.Altitude);

		let slopeoption = {
			position: {
				"key": M_SLOPE.jsonKey,
				"lon": center.Longitude,
				"lat": center.Latitude
			}
		};

		let slope = Module.getSlope();
		let str = slope.getLonLatSlopeData(slopeoption);
		Module.XDRenderData();
		console.log(str);
		str = JSON.parse(str);
		console.log(str);

	},
	setLegend:function(colorMap){
		var html = "";
		var slope = Module.getSlope();
		var sum = 0;
		for(var i=0;i<colorMap.list.length;i++){
			sum += slope.getColorArea(M_SLOPE.jsonKey,i);
		}
		for(var i=0;i<colorMap.list.length;i++){
			var data = colorMap.list[i];
			html += "<tr>";
			if(colorMap.type == "TERRAIN_ANGLE"){
				html += "<th id='analSlopLegend"+i+"' style='width:120px; text-align:center;'>"+data.begin+"° ~ "+data.end+"°</th>";
			}
			if(colorMap.type == "TERRAIN_DIRECTION"){
				html += "<th id='analSlopLegend"+i+"' style='width:120px; text-align:center;'>"+data.direction+"</th>";
			}
			if(colorMap.type == "TERRAIN_DIRECTION_ANGLE"){
				html += "<th id='analSlopLegend"+i+"' style='width:120px; text-align:center;'>"+data.direction+" ("+data.begin+"° ~ "+data.end+"°)</th>";
			}

			html += "<th id='analSlopColorList"+i+"' style='background: rgb("+data.r+", "+data.g+", "+data.b+"); width: 40px;'></th>";
			html += "<th id='analSlopResultData"+i+"' style='width:80px; text-align:center;'>"+((slope.getColorArea(M_SLOPE.jsonKey, i)/ sum) * 100 ).toFixed(2)+"%</th>";
			html += "</tr>";
		}
		$("#slopeLegend tbody").html(html);
	},
	saveSlope:function(type){
		if(M_SLOPE.slopeType == null){
			toastr.warning("분석 후 저장할 수 있습니다.");
			return false;
		}
		var today = new Date();
		var year = M_SLOPE.leadingZeros(today.getFullYear(), 4); // 년도
		var month = M_SLOPE.leadingZeros(today.getMonth() + 1, 2);  // 월
		var date = M_SLOPE.leadingZeros(today.getDate(), 2);  // 날짜
		var hours = M_SLOPE.leadingZeros(today.getHours(), 2); // 시
		var minutes = M_SLOPE.leadingZeros(today.getMinutes(), 2);  // 분
		var date = year+month+date+hours+minutes;

		if(type == "db"){
			M_SLOPE.showSaveDB();
		}else if(type == "pdf"){
			M_SLOPE.savePDF(date);
		}else{
			//JSON
			var slope = Module.getSlope();
			M_SLOPE.jsonData = slope.exportSlopeData(M_SLOPE.jsonKey); //성공
			console.log(M_SLOPE.jsonData)
			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(M_SLOPE.jsonData));
			element.setAttribute('download', "digitalTwin_Slope_"+date+".js");

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);

			M_SLOPE.jsonData = JSON.parse(M_SLOPE.jsonData);
			console.log(M_SLOPE.jsonData)
		}
	},
	showSaveDB:function(){
		if ($("#slopeSaveInterface").css("display") == "block") {
			return;
		}

		// 현재 시간으로 프로젝트 이름 자동 지정
		var date = new Date();
		document.getElementById("slopeNameInput").value = "경사분석_" + date.getTime();

		// 프로젝트 리스트, 프로젝트 저장 인터페이스 스위칭
//		$("#slopeSaveInterface").fadeIn();
	},
	showListDB:function(){
		if ($("#slopeOpenSlope").css("display") == "block") {
			return;
		}
		M_SLOPE.loadSlopeList();
		// 프로젝트 리스트, 프로젝트 저장 인터페이스 스위칭
		$("#slopeOpenSlope").fadeIn();
	},
	saveDB:function(){

//		M_SLOPE.closeSlopeSaveInterface();

//		COMMON.blockUIdiv("MapContainer","경사분석 저장중...");
		var date = new Date();
		document.getElementById("slopeNameInput").value = "경사분석_" + date.getTime();
		var slope = Module.getSlope();
		M_SLOPE.jsonData = JSON.parse(slope.exportSlopeData(M_SLOPE.jsonKey));

		var formData = new FormData();

		formData.append("COORDINATE", JSON.stringify(M_SLOPE.slopeCoord));
		formData.append("SLOPE_TYPE", M_SLOPE.slopeType);
		formData.append("SLOPE_JSON", JSON.stringify(M_SLOPE.jsonData));
		formData.append("MID", "27");

		formData.append("SLOPE_NAME", document.getElementById("slopeNameInput").value);

		$.ajax({
			url: "/moduleHelper/slope/insertSlopeData.do",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			enctype: "multipart/form-data",
			success: function (result) {
//				COMMON.toastr.warning("경사분석이 저장되었습니다.","success",function(){
//					COMMON.unblockUIdiv("MapContainer");
//				});
			},
			error: function (xhr, status, thrown) {
				console.log("[Error] Failed Upload Project");
			},
		});
	},
	savePDF:function(date){
		let slope = Module.getSlope();
		
		var array = [];
		$("#slopeLegend tbody tr").each(function(index){
		    var color = [];
		    var text = $("#analSlopColorList"+index).css("background-color");
		    text = text.replace(/rgb/g,'').replace(/[\]([)]/g,'').split(",");
		    for(var i=0;i<text.length;i++){
		        color.push(parseInt(text[i]));
		    }
		    array.push([color,
		    	$("#analSlopLegend"+index).text(),
		    	$("#analSlopResultData"+index).text()]);
		});


		var doc = new jspdf.jsPDF('l', 'mm', [297,210]);
		var pageWidth = doc.internal.pageSize.getWidth();
		var pageHeight = doc.internal.pageSize.getHeight();

		doc.addFileToVFS('malgun.ttf', _fonts);
		doc.addFont('malgun.ttf','malgun', 'normal');
		doc.setFont('malgun');

		doc.setFontSize(10);
		doc.text(M_SLOPE.slopeLocation, 5 , pageHeight-5, 'left');
		doc.setFontSize(15);
		var slopeType = "";
		switch (M_SLOPE.slopeType) {
			case "A":
				slopeType = "경사도";
			break;
			case "D":
				slopeType = "경사향(색상)";
			break;
			case "DA":
				slopeType = "경사향(화살표)";
			break;
			case "AD":
				slopeType = "경사향도";
			break;
		}
		
		doc.text(slopeType+" 분석",pageWidth / 2, 10, 'center');
		doc.autoTable({
		  margin: { top: 5,left:5 },
		  body: array,
		  theme: 'grid',
		  tableWidth:60,
		  styles: {
		        halign: 'center'
		  },
		  columnStyles: {
		    0: {cellWidth: 5},
		  },
		  didParseCell : function (cell) {
		    if(cell.column.index == "0"){
		        cell.cell.styles.fillColor = cell.cell.raw;
		        cell.cell.text = "";
		    }
		  }
		});
		
		var avgAngle = Math.round(slope.getAnalysisResult(M_SLOPE.jsonKey, 1, 0)* 100) / 100;
		var angleHtml = '평균경사도: ' + avgAngle + 'º';
		console.log(angleHtml);
		console.log(doc);
		doc.text(angleHtml, 15, 80, 'left');
		
		doc.setFillColor(255,255,255);
		
		var dataWidth = M_SLOPE.slopeData.width;
		var dataHeight = M_SLOPE.slopeData.height;
		var numCal = 1;
		if(dataWidth > dataHeight){
			numCal = 210 / dataWidth;
		}else{
			numCal = 170 / dataHeight;
		}
		dataWidth = dataWidth * numCal;
		dataHeight = dataHeight * numCal;
		
		doc.addImage(M_SLOPE.slopeData.toDataURL(), 'PNG', 75 + ((210-dataWidth) / 2), 20 + ((170-dataHeight) / 2), dataWidth, dataHeight);

		doc.save("digitalTwin_Slope_"+date+".pdf");
	},
	openSlope:function(type){
		if(type == "db"){
			M_SLOPE.showListDB();
		}else{
			$("#slopeFileUploadModal").modal("show");
		}
	},
	setNumUpDown:function(num,obj){
		var value = parseInt($("#"+obj).val());
		value = value + num;
		$("#"+obj).val(value);
		
		if (M_SLOPE.isIncreaseAltitude) {
			setTimeout(function() {
				M_SLOPE.setNumUpDown(num,obj);
			}, 100);
		}
	},
	leadingZeros:function(n, digits) {

	    var zero = '';
	    n = n.toString();

	    if (n.length < digits) {
	        for (i = 0; i < digits - n.length; i++)
	            zero += '0';
	    }
	    return zero + n;
	},
	onmousedown:function (e) {
		M_SLOPE.m_point = e;
	},
	closeSlopeSaveInterface:function(){

		if ($("#slopeSaveInterface").css("display") == "none") {
			return;
		}

		// 프로젝트 리스트, 프로젝트 저장 인터페이스 스위칭
		$("#slopeSaveInterface").fadeOut();
	},
	closeSlopeListInterface:function(){

		if ($("#slopeOpenSlope").css("display") == "none") {
			return;
		}

		// 프로젝트 리스트, 프로젝트 저장 인터페이스 스위칭
		$("#slopeOpenSlope").fadeOut();
	},
	loadSlopeList: function () {

		var formData = new FormData();

		formData.append("MID", D_MEMBER.MID);

		$.ajax({
			url: "/moduleHelper/slope/getSlopeList.do",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			dataType: "json",
			enctype: "multipart/form-data",
			success: function (_data, _status, _xhr) {
				// 프로젝트 리스트 클리어
				document.getElementById("slopeList").innerHTML = "";

				var slopeListWrap = $("#slopeList");

				var slopeList = _data.slopeList;

				for (var i = 0; i < slopeList.length; i++) {
					// 프로젝트 로드 버튼 추가
					var reg_date = slopeList[i].reg_date;
					reg_date = reg_date.split(" ")[0];
					reg_date = reg_date.replaceAll("-",".");
					var html = "";
					html += "<tr>";
					html += "<td class='align-middle' id='slopeName_"+slopeList[i].slid+"'>"+slopeList[i].slope_name+"</td>";
					html += "<td class='align-middle'>"+reg_date+"</td>";
					html += "<td class='align-middle'>";
					html += "<button class='btn btn-outline-success btn-sm ladda-button' data-style='slide-left' data-size='s' onclick='M_SLOPE.loadSlope("+slopeList[i].slid+")'>";
					html += "<span class='lnr lnr-file-add'></span>&nbsp;&nbsp;Add";
					html += "</button>";
					html += "</td>";
					html += "<td class='align-middle'>";
					html += "<button class='btn btn-outline-primary btn-sm ladda-button' data-style='slide-left' data-size='s' onclick='M_SLOPE.modifySlope("+slopeList[i].slid+")'>";
					html += "<span class='lnr lnr-file-empty'></span>&nbsp;&nbsp;Mod";
					html += "</button>";
					html += "</td>";
					html += "<td class='align-middle'>";
					html += "<button class='btn btn-outline-danger btn-sm ladda-button' data-style='slide-left' data-size='s' onclick='M_SLOPE.deleteSlope("+slopeList[i].slid+")'>";
					html += "<span class='lnr lnr-trash'></span></span>&nbsp;&nbsp;Del";
					html += "</button>";
					html += "</td>";
					html += "</tr>";

					slopeListWrap.append(html);

				}
			},
			error: function (xhr, status, thrown) {
				console.log("[Error] Failed Load Project List");
			},
		});
	},
	loadSlope:function(slid){
//		M_SLOPE.clearAll();
//		M_SLOPE.clearArea();
//
//		Module.XDSetMouseState(24);
//		var formData = new FormData();
//		formData.append("MID", D_MEMBER.MID);
//		formData.append("SLID", slid);
//
//		$.ajax({
//			url: "/moduleHelper/slope/getSlopeInfo.do",
//			type: "POST",
//			data: formData,
//			processData: false,
//			contentType: false,
//			dataType: "json",
//			success: function (result) {
//				if(result.rs == "complete"){
//					var coordinate = result.SLOPE.coordinate;
//					var slope_json = result.SLOPE.slope_json;
//					coordinate = JSON.parse(coordinate);
//					slope_json = JSON.parse(slope_json);
//
//					Module.getViewCamera().setViewAt(coordinate[0].lon,coordinate[0].lat, 8000, 65, 0);
//
//					M_SLOPE.closeSlopeListInterface();
////					COMMON.blockUIdiv("analysisSlopeAre","");
////					COMMON.blockUIdiv("MapContainer","분석중...");
//
//					setTimeout(function(){
//
//						M_SLOPE.clearAll();
//						Module.getMap().getInputPoints().clear();
//
//
//						for(var i=0;i<coordinate.length;i++){
//							Module.getMap().addInputPoint(coordinate[i].lon,coordinate[i].lat)
//						}
//
//						/*var slope = Module.getSlope();
//						var str = slope.importSlopeData(slope_json, M_SLOPE.createRTTPixel, M_SLOPE.nowProgress);
//						Module.XDRenderData();
//						*/
////						$("[name=slopeType][value='"+result.SLOPE.slope_type+"']").prop("checked",true)
//						$("select[name=slopeType][value='"+result.SLOPE.slope_type+"']").attr("selected","selected")
//						M_SLOPE.runSlope();
//
//						Module.XDSetMouseState(1);
//					},2800);
//
//
//				}
//
//			}
//		});
	},
	deleteSlope:function(slid){
//		var deleteSlopeList = [];
//
//		deleteSlopeList.push(slid);
//
//		if(deleteSlopeList.length == 0){
//			COMMON.toastr.warning("삭제할 경사분석을 선택하여주세요.","warning",function(){
//				return false;
//			});
//			return false;
//		}
//		COMMON.confirm("삭제하시겠습니까?","warning",function(){
//
//			var formData = new FormData();
//			formData.append("MID", D_MEMBER.MID);
//			formData.append("SLID", deleteSlopeList);
//
//			$.ajax({
//				url: "/moduleHelper/slope/deleteSlopeInfo.do",
//				type: "POST",
//				data: formData,
//				processData: false,
//				contentType: false,
//				dataType: "json",
//				success: function (result) {
//					COMMON.toastr.warning("삭제되었습니다.","success",function(){
//						M_SLOPE.loadSlopeList();
//					});
//				}
//			});
//		},function(){
//			return false;
//		});
	},
	modifySlope:function(slid){
//
//		$("[id*=slopeName_] div input").each(function(){
//			//다른 프로젝트명 초기화
//		    var slopeName = $(this).attr('value');
//		    $($(this).parents('td')).text(slopeName);
//		});
//
//		var slopeName = $("#slopeName_"+slid).text();
//
//		var html = "<div class='input-group'>";
//		html += "<input type='text' class='form-control' style='padding:3px;height: 32px;' value='"+slopeName+"' >";
//		html += "<span class='input-group-append'>";
//		html += "<button class='btn btn-secondary' type='button' style='padding:3px;height: 32px;' onclick='M_SLOPE.updateSlopeInfo("+slid+")'>Save</button>";
//		html += "</span>";
//		html += "</div>";
//
//		$("#slopeName_"+slid).html(html);
	},
	updateSlopeInfo:function(slid){
//		var slopeName = $("#slopeName_"+slid+" input")[0].value;
//
//		var formData = new FormData();
//		formData.append("MID", D_MEMBER.MID);
//		formData.append("SLID", slid);
//		formData.append("slopeName", slopeName);
//
//		$.ajax({
//			url: "/moduleHelper/slope/updateSlopeInfo.do",
//			type: "POST",
//			data: formData,
//			processData: false,
//			contentType: false,
//			dataType: "json",
//			success: function (result) {
//				COMMON.toastr.warning("수정되었습니다.","success",function(){
//				    $("#slopeName_"+slid).text(slopeName);
//				});
//			}
//		});
	},
	fileLoad:function(){

//		var wizardInitScript = document.createElement('script');
//		wizardInitScript.src="./assets/vendor/libs/smartwizard/smartwizard.js";
//		wizardInitScript.id="slopeWizardjs";
//
//		var wizardInitCss = document.createElement('link');
//		wizardInitCss.href="./assets/vendor/libs/smartwizard/smartwizard.css";
//		wizardInitCss.type="text/css";
//		wizardInitCss.id="slopeWizardCss";
//		wizardInitCss.rel="stylesheet"
//
//		var dropzoneJs = document.createElement('script');
//		dropzoneJs.src="./assets/vendor/libs/dropzone/dropzone.js";
//		dropzoneJs.id="slopeDropzoneJs";
//
//		var dropzoneCss = document.createElement('link');
//		dropzoneCss.href="./assets/vendor/libs/dropzone/dropzone.css";
//		dropzoneCss.type="text/css";
//		dropzoneCss.id="slopeDropzoneCss";
//		dropzoneCss.rel="stylesheet"
//
//		document.head.appendChild(wizardInitCss);
//		document.body.appendChild(wizardInitScript);
//
//		document.head.appendChild(dropzoneCss);
//		document.body.appendChild(dropzoneJs);
//
//		setTimeout(function(){
//			var dropzoneFile=new Dropzone("#slopeFileDropzone",{
//				  url:'./ide/uploadFileLists.do',
//			      maxFilesize:     50000,
//			      filesizeBase:    1000,
//			      addRemoveLinks:  true,
//			      parallelUploads:1,
//			      maxFiles:1,
//			      paramName:"fileLists",
//			      autoQueue:false,
//			      createImageThumbnails:true,
//			      uploadMultiple:true,
//			      withCredentials:true,
//			      dictRemoveFile:'삭제',
//			      dictDefaultMessage:'PREVIEW',
//			      accept:function(file,done){
//
//			    	  var type=file.name.split("\.")[1];
//
//			    	  if (!["json","js"].includes(type.toLowerCase())) {
//
//			    		  dropzoneFile.removeFile(file);
//
//			    		  done("업로드할 수 없습니다.");
//
//			    	      COMMON.toastr.warning(type+"의 파일은 업로드할 수 없습니다","warning",function(){
//			    	    	  return false;
//			    	      });
//
//			    	      return false;
//
//			    	  }else{
//			    		  done();
//			    	  }
//			      },
//			      init:function(){
//			    	  this.on('addedfile',function(file){
//			    		  M_SLOPE.slopeUpload.push(file);
//			    	  }),
//			    	  this.on('removedfile',function(file){
//			    		  M_SLOPE.slopeUpload.remove(file);
//			    	  }),
//			    	  this.on('success',function(file,responseText){
//			    		  var result = JSON.parse(responseText);
//		    			  console.log(result);
//			    	  }),
//			    	  this.on("maxfilesexceeded", function(file) {
//			    	      COMMON.toastr.warning("하나의 파일만 업로드할 수 있습니다.","warning",function(){
//			    	    	  dropzoneFile.removeAllFiles();
//			    	    	  dropzoneFile.addFile(file);
//			    	    	  return false;
//			    	      });
//			        });
//			      }
//			 });
//
//		},100);
//
//        $("#closeSlopeFile").on('click',function(){
//    	    $("#slopeFileUploadModal").modal('hide');
//    	    setTimeout(function(){
//    	    	M_SLOPE.slopeFiledestory();
//    	    },100);
//        });
//
//        $("#nextSlopeFile").on("click", function() {
//        	M_SLOPE.uploadLibrary(M_SLOPE.slopeUpload);
//	    	M_SLOPE.slopeFiledestory();
//            return true;
//        });
	},
	slopeFiledestory:function(){
		Dropzone.forElement("#slopeFileDropzone").removeAllFiles();
	},
	uploadLibrary:function(file){

		M_SLOPE.clearAll();
		M_SLOPE.clearArea();

		var reader = new FileReader();
		reader.addEventListener('load', function() {

			var slope_json = reader.result;
			slope_json = JSON.parse(slope_json);
			var coordinate = slope_json.coordinates.coordinate;
			var analysis_type = "";

			switch (slope_json.analysis.type) {
			case "TERRAIN_ANGLE":
				//경사도
				analysis_type = "A";
			break;
			case "TERRAIN_DIRECTION":
				//경사향
				analysis_type = "D";
			break;
			case "TERRAIN_DIRECTION_SHAPE":
				//경사향_화살표
				analysis_type = "DA";
			break;
			case "TERRAIN_DIRECTION_ANGLE":
				//경사향도
				analysis_type = "AD";
			break;
		}

			Module.XDSetMouseState(24);

			Module.getViewCamera().setViewAt(coordinate[0][0],coordinate[0][1], 8000, 65, 0);

			$("#closeSlopeFile").click();

//			COMMON.blockUIdiv("analysisSlopeAre","");
//			COMMON.blockUIdiv("MapContainer","분석중...");

			setTimeout(function(){

				M_SLOPE.clearAll();
				Module.getMap().getInputPoints().clear();

				for(var i=0;i<coordinate.length;i++){
					Module.getMap().addInputPoint(coordinate[i][0],coordinate[i][1])
				}

				/*var slope = Module.getSlope();
				var str = slope.importSlopeData(slope_json, M_SLOPE.createRTTPixel, M_SLOPE.nowProgress);
				Module.XDRenderData();
				*/
				$("[name=slopeType][value='"+analysis_type+"']").prop("checked",true)
				M_SLOPE.runSlope();

				Module.XDSetMouseState(1);
			},2800);


		  });
		  reader.readAsText(file[0]);
	}

}

$("[name=slope-analysis-drawing]").on("click", function () {
    dtmap.clear();
    const node = $(this);
    const value = node.val();
    let type;
    switch (Number(value)) {
        case 1:
        	type = 'Box';
        	M_SLOPE.setRectangle();
            break;
        case 2:
        	type = 'Polygon';
        	M_SLOPE.setArea();
            break;
        case 3:
        	type = 'Circle';
        	M_SLOPE.setCircle();
            break;
    }
    //dtmap.draw.active({type: type, once: true});
})

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