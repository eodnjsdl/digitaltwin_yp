/**
 * @Class Name : map_event.js
 * @Description : 지도 이벤트 js
 * @
 * @  수정일     	      수정자              		수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.11.09    최초생성
 *
 * @author 스마트융합사업본부 김선옥
 * @since 2021.11.09 
 * @version 1.0
 * @see
 */
/*************************************************************** 지도 기본 기능 *************************************************************************/
$(document).ready(function(){
	// 지도 기본 
	$(document).on("click", ".map-control .ctrl-btn", function(){
		if(mapType == "3D") {
			if($(this).hasClass("reset")){ // 초기화
				$(".map-control .ctrl-btn").removeClass("active");			
				clearAnalysis();
				removeAllPop();
				//setInitialLoc();
			} else if($(this).hasClass("scaleUp")){ // 확대
				zoomCtrl("in");
			} else if($(this).hasClass("scaleDown")){ // 축소
				zoomCtrl("out");
			} else if($(this).hasClass("distance")){ // 거리 측정
				if($(this).hasClass("active")){					
					GLOBAL.circleLayer.removeAll();
					setMouseState(87);
				} else{
					setMouseState(6);
				}
			} else if($(this).hasClass("measure")){ // 면적 측정
				if($(this).hasClass("active")){
					GLOBAL.circleLayer.removeAll();
					setMouseState(88);					
				} else{
					setMouseState(6);
				}
			} else if($(this).hasClass("location")){ // 위치 측정
				if($(this).hasClass("active")){				
					//setMouseState(6);
				} else{
					setMouseState(6);
				}
			} else if($(this).hasClass("compass")){ // 정북방향 보기
				viewNorth();
			} else if($(this).hasClass("globe")){ // 초기 위치로
				setInitialLoc();
			} else if($(this).hasClass("radius")){ //반경측정
				if($(this).hasClass("active")){		
					setMouseState(89);				
				}else{
					GLOBAL.circleLayer.removeAll();
					setMouseState(6);
				}	
			}
		}
	});
});

/*************************************************************** 화면 크기 변경 *************************************************************************/
$(window).resize(function () {
	if(typeof(Module) != "undefined"){
		resizeMap();
		validDragSdis();
	}
});

function resizeMap() {
	var width = document.getElementById("container").offsetWidth;
	var height = document.getElementById("container").offsetHeight;
	
	if(typeof(Module) != "undefined"){
		Module.Resize(width, height);
		Module.XDRenderData();	
	}
}

/*************************************************************** 선택영역 마우스 오버시에 지도 클릭 및 드래그 허용 *************************************************************************/
function validDragSdis() {
	var validDiv = document.getElementById("canvas");

	validDiv.onmouseover = function() {
		Module.XDIsMouseOverDiv(false);
	};

	validDiv.onmouseout = function() {
		Module.XDIsMouseOverDiv(true);
	};
}

/*************************************************************** 초기 지구본으로 이동 *************************************************************************/
function mapHome(){
	GLOBAL.Camera.setLocation(new Module.JSVector3D(127.00000034669984, 38.00000101737018, 19134411.000000004));
	GLOBAL.Camera.setTilt(90);
	GLOBAL.Camera.setDirect(0);
}

/*********************************************************** 지도 네비게이션 컨트롤 *********************************************************************/
function setNavigationVisible() {
	if (GLOBAL.Navigation == null) {
		return;
	}

	GLOBAL.Navigation.setNaviVisible(Module.JS_VISIBLE_OFF); // AUTO : 자동으로 뜨도록, OFF : 끄기
}

/*********************************************************** 분석 기능 *********************************************************************/
$(document).on("click", ".anal-remove-btn", function(){
	var idx = $(this).attr("id").replace("removeBtn", "");
	
	$(this).remove();
	
	if (Module.XDGetMouseState() == 87){
		deleteObject("distance", "ANAL_DIST_" + idx);		
	} else if (Module.XDGetMouseState() == 88){
		deleteObject("area", idx);
	}
});

// 측정 추가
function addPoint(e) {
	if(Module.XDGetMouseState() == 87){		
		let partDistance = e.dDistance,
		totalDistance = e.dTotalDistance;
		
		if (partDistance == 0 && totalDistance == 0) { // 처음 말풍선
			m_objcount = 0;
			createPOI("distance", new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(255, 204, 198, 0.8)", "Start", true);
		} else { 
			if(e.dDistance < 0.01) {
				return;
			} else if(e.dDistance > 0.01){ // 중간 거리
				createPOI("distance", new Module.JSVector3D(e.dMidLon, e.dMidLat, e.dMidAlt), "rgba(255, 255, 0, 0.8)",  e.dDistance, false);
			}
			
			// 포인트별 말풍선
			createPOI("distance", new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(25, 204, 198, 0.8)", e.dTotalDistance, true);
		}
	} else if (Module.XDGetMouseState() == 88){
		createPOI("area", new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(255, 255, 255, 0.8)", e.dArea);
	} else if (Module.XDGetMouseState() == 89){			
		createPOI("area", new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(255, 255, 255, 0.8)", e.dTotalDistance, false);
	}
}

// 측정 종료
function endPoint(e) {
	if (Module.XDGetMouseState() == 87){
		m_mercount++;
	} else if (Module.XDGetMouseState() == 88){
		m_argrcount++;
	}
}

// 분석 결과 오브젝트별 삭제
function deleteObject(_type, _key) {
	if(_type == "distance"){
		Module.XDClearDistanceObject(_key);
		
		// 오브젝트 삭제
		let layerList = new Module.JSLayerList(true);
		let layer = layerList.nameAtLayer("MEASURE_POI");
		let list = layer.getObjectKeyList();
		
		let key = _key.replace(/[^0-9]/g, '') + "_POI_";	// [생성순서]_POI_ 형태로 객체 생성
		
		let strlist = list.split(",");
		strlist.forEach((item, index) => {
			if (item.indexOf(key) !== -1) {
				layer.removeAtKey(item)						// 키값으로 레이어에 들어간 오브젝트 삭제
			}
		});		
	} else if(_type == "area"){
		Module.XDClearAreaObject("ANAL_AREA_POLYGON_" + _key);
		GLOBAL.Layer.removeAtKey("POI" + _key);
	}
}

/* 분석내용 출력 POI 생성 */
function createPOI(_mode, _position, _color, _value, _balloonType) {

	// POI 아이콘 이미지를 그릴 Canvas 생성
	var drawCanvas = document.createElement('canvas');
    drawCanvas.width = _mode != "alt" ? (_mode == "area" ? 200 : 100) : 200;
	drawCanvas.height = 100;
	
	// 아이콘 이미지 데이터 반환
	var imageData = drawIcon(_mode, drawCanvas, _color, _value, _balloonType);
	var nIndex = GLOBAL.nIndex;
	
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("MEASURE_POI");
	
	if(_mode == "distance"){
			let Symbol = Module.getSymbol();
	
			let layerList = new Module.JSLayerList(true);
			let layer = layerList.nameAtLayer("MEASURE_POI");
			
			poi = Module.createPoint(m_mercount + "_POI_" + m_objcount);
			poi.setPosition(_position);		// 위치 설정
			poi.setImage(imageData, drawCanvas.width, drawCanvas.height);				// 아이콘 설정
			layer.addObject(poi, 0);
			m_objcount++;
	} else if (_mode == "alt") {
		// 심볼에 아이콘 이미지 등록
		if (GLOBAL.Symbol.insertIcon("Icon"+nIndex, imageData, drawCanvas.width, drawCanvas.height)) {
			
			// 등록한 아이콘 객체 반환
			var icon = GLOBAL.Symbol.getIcon("Icon"+nIndex);
		
			// JSPoint 객체 생성
			var poi = Module.createPoint("POI"+nIndex);
			
			poi.setPosition(_position);		// 위치 설정
			poi.setIcon(icon);				// 아이콘 설정
			
			// 레이어에 오브젝트 추가
			layer.addObject(poi, 0);
			// 인덱스 값 상승
			GLOBAL.nIndex++;
		}
	} else if(_mode == "area"){ 
			var oldIcon = layer.keyAtObject("POI" + m_argrcount);
				// 기존 아이콘 삭제
			if(oldIcon){
				// 아이콘을 참조 중인 POI 삭제
				layer.removeAtKey("POI" + m_argrcount);
				// 아이콘을 심볼에서 삭제
				GLOBAL.Symbol.deleteIcon(oldIcon.getIcon().getId());
			}

		// 심볼에 아이콘 이미지 등록
			
			if (GLOBAL.Symbol.insertIcon("Icon" + m_argrcount, imageData, drawCanvas.width, drawCanvas.height)) {
				
			// 등록한 아이콘 객체 반환
			var areaIcon = GLOBAL.Symbol.getIcon("Icon" + m_argrcount);
			
			// JSPoint 객체 생성
			var areaPoi = Module.createPoint("POI" + m_argrcount);
		
			areaPoi.setPosition(_position);			// 위치 설정
			areaPoi.setIcon(areaIcon);				// 아이콘 설정
			
			GLOBAL.POI = areaPoi;
				
			// 레이어에 오브젝트 추가
			layer.addObject(areaPoi, 0);
			
		}
	}
}
/* 아이콘 이미지 데이터 반환 */
function drawIcon(_mode, _canvas, _color, _value, _balloonType) {
	// 컨텍스트 반환 및 배경 초기화
	var ctx = _canvas.getContext('2d'),
		width = _canvas.width,
		height = _canvas.height;
	ctx.clearRect(0, 0, width, height);

	if (_mode == "distance") {

		// 배경 Draw Path 설정 후 텍스트 그리기
		if (_balloonType) {
			drawBalloon(ctx, height * 0.5, width, height, 5, height * 0.25, _color);
			setText(_mode, ctx, width * 0.5, height * 0.2, _value);
		} else {
			drawRoundRect(ctx, 0, height * 0.3, width, height * 0.25, 5, _color);
			setText(_mode, ctx, width * 0.5, height * 0.5, _value);
		}
	} else if (_mode == "area") {

		// 배경 Draw Path 설정 후 텍스트 그리기
		drawBalloon(ctx, height * 0.5, width, height, 5, height * 0.25, _color);
		setText(_mode, ctx, width * 0.5, height * 0.2, _value);
	} else if (_mode == "alt") {
		// 배경과 높이 값 텍스트 그리기
		if (_balloonType == -1) {
			drawRoundRect(ctx, 50, 20, 100, 20, 5, _color); // 오브젝트 높이 값이 유효하지 않는 경우

		} else {
			drawRoundRect(ctx, 50, 5, 100, 35, 5, _color); // 오브젝트 높이 값이 유효한 경우
			setText(_mode, ctx, width * 0.5, height * 0.2, '지면고도 : ' + setKilloUnit(_balloonType, 0.001, 0));
		}
		setText(_mode, ctx, width * 0.5, height * 0.2 + 15, '해발고도 : ' + setKilloUnit(_value, 0.001, 0));

		// 위치 표시 점 그리기
		drawDot(ctx, width, height);
	}


	return ctx.getImageData(0, 0, _canvas.width, _canvas.height).data;
}

/* 위치 표시 점 그리기 */
function drawDot(ctx, width, height) {
			
	ctx.beginPath();			
    ctx.lineWidth = 6;
    ctx.arc(width*0.5, height*0.5, 2, 0, 2*Math.PI, false);    
	ctx.closePath();
			
	ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
	ctx.fill();
	ctx.lineWidth = 8;
	ctx.strokeStyle = "rgba(255, 255, 0, 0.8)";
	ctx.stroke();
}


/* 말풍선 이미지 그리기 */
function drawBalloon(ctx, marginBottom, width, height, barWidth, barHeight, color) {
	
	var wCenter = width * 0.5,
		hCenter = height * 0.5;
	
	// 말풍선 형태의 Draw Path 설정
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, height-barHeight-marginBottom);
	ctx.lineTo(wCenter-barWidth, height-barHeight-marginBottom);
	ctx.lineTo(wCenter, height-marginBottom);
	ctx.lineTo(wCenter+barWidth, height-barHeight-marginBottom);
	ctx.lineTo(width, height-barHeight-marginBottom);
	ctx.lineTo(width, 0);		
	ctx.closePath();
			
	// 말풍선 그리기
	ctx.fillStyle = color;
    ctx.fill(); 
}

/* 둥근 사각형 배경 그리기 */
function drawRoundRect(ctx, x, y, width, height, radius, color) {
			
	if (width < 2 * radius) 	radius = width * 0.5;
	if (height < 2 * radius) 	radius = height * 0.5;
		
	ctx.beginPath();
	ctx.moveTo(x+radius, y);
	ctx.arcTo(x+width, y, x+width, y+height, radius);
	ctx.arcTo(x+width, y+height, x, y+height, radius);
	ctx.arcTo(x, y+height, x, y, radius);
	ctx.arcTo(x, y, x+width, y, radius);
	ctx.closePath();
	
	// 사각형 그리기
	ctx.fillStyle = color;
    ctx.fill(); 
	
	return ctx;
}

/* 텍스트 그리기 */
function setText(_mode, _ctx, _posX, _posY, _value) {
	var strText = _value;
	var fontSize = 16;
	var fontColor = "#000";

	if (_mode == "distance") {
		// 텍스트 문자열 설정
		if (typeof _value == 'number') {
			strText = setKilloUnit(_value, 0.001, 0);
		} else {
			strText = _value;
		}
	} else if (_mode == "area") {
		// 텍스트 문자열 설정
		strText = setTextComma(_value.toFixed(2)) + '㎡';
		
	} else if (_mode == "alt") {
		fontSize = 12;
		fontColor = "#fff";
	}


	// 텍스트 스타일 설정
	_ctx.font = "bold " + fontSize + "px sans-serif";
	_ctx.textAlign = "center";
	_ctx.fillStyle = fontColor;

	// 텍스트 그리기
	_ctx.fillText(strText, _posX, _posY);
}

/* m/km 텍스트 변환 */
function setKilloUnit(_text, _meterToKilloRate, _decimalSize){
	if (_decimalSize < 0){
		_decimalSize = 0;
	}
	if (typeof _text == "number") {
		if (_text < 1.0/(_meterToKilloRate*Math.pow(10,_decimalSize))) {
			_text = _text.toFixed(1).toString()+'m';
		} else {
			_text = (_text*_meterToKilloRate).toFixed(2).toString()+'㎞';
		}
	}
	return _text;
}

// 텍스트 콤마
function setTextComma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}


/* 분석 내용 초기화 */
function clearAnalysis(msg, type) {
	// 실행 중인 분석 내용 초기화
	
	var layerList = new Module.JSLayerList(true);
	var layer = layerList.nameAtLayer("MEASURE_POI");
	var circle = layerList.nameAtLayer("MEASURE_CIRCLE");

	// var symbol = GLOBAL.Symbol;
	if (layer == null) {
		return;
	}


	//펜 기능 켜져있을 때
	if ($('#UserDrawCanvas').html() != undefined && $('#UserDrawCanvas').css('display') != 'none') {
		XD_UserDraw.finish();

		$('.tool-btn.pen').removeClass('active');
	}

	var i, len,
		icon, poi, areaIcon, areaPoi;

	// 등록된 아이콘 리스트 삭제
	areaPoi = layer.keyAtObject("POI");

	if(areaPoi){
		// 아이콘을 참조 중인 POI 삭제
		layer.removeAtKey("POI");
		areaIcon = areaPoi.getIcon();
		// 아이콘을 심볼에서 삭제
		GLOBAL.Symbol.deleteIcon(areaIcon.getId());
		// GLOBAL.Symbol.deleteIcon("POI");
	}

	for (i=0, len=layer.getObjectCount(); i<len; i++) {

		poi = layer.keyAtObject("POI"+i);
		
		if(poi != null){
			icon = poi.getIcon();
			
			// 아이콘을 참조 중인 POI 삭제
			layer.removeAtKey("POI"+i);
			
			// 아이콘을 심볼에서 삭제
			GLOBAL.Symbol.deleteIcon(icon.getId());
			// GLOBAL.Symbol.deleteIcon("POI"+i);
		}		
	}
	
	
	GLOBAL.Layer.removeAll();
	// POI 오브젝트 삭제
	
	layer.removeAll();

	// 반경 오브젝트 삭제	
	
	circle.removeAll();

	
	// POI, Icon 키 지정 인덱스 초기화
	GLOBAL.nIndex = 0;
	

	if (type == "reset") {
		// 폴리곤 객체 전체 삭제
		if(typeof(OLOAD) != "undefined" && OLOAD.m_center_Polygon != null){
			OLOAD.m_center_Polygon.removeAllObject();
			
			var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
			var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
			
			if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
			if(lineLayer != null) { lineLayer.removeAll(); }
		}
		
		// 건물편집 객체 전체 삭제
		M_EDITBUILDING.buildingManager.ClearLibraryObject();
	}

	Module.XDClearCircleMeasurement(); // 반경 분석내용 삭제
	Module.XDClearDistanceMeasurement();	// 거리측정 분석 내용 삭제
	Module.XDClearAreaMeasurement();		// 면적측정 분석 내용 삭제
	Module.XDRenderData();

	if (msg != "noGrab") Module.XDSetMouseState(6);

	// 마우스, 키보드 상태 초기화
	GLOBAL.Control.setMouseRotMode(true); // 회전 가능
	GLOBAL.Control.setKeyRotMode(true);
	GLOBAL.Control.setMousePanMode(true); // 위치 이동
	GLOBAL.Control.setKeyPanMode(true);
	GLOBAL.Control.setMouseZoomMode(true); // 확대 축소
	GLOBAL.Control.setKeyZoomMode(true);
	//GLOBAL.Camera.setMoveMode(false); // 1인칭
	
	// 분석기능 삭제버튼 삭제
	$(".anal-remove-btn").remove();	
	
	m_mercount = 0;
	m_objcount = 0;
	m_argrcount = 0;
	removeBtnPosArr = [];
}

/**************************************************************** Zoom In/Out 제어 **************************************************************************/
function zoomCtrl(state){
	var vLocation = GLOBAL.Camera.getCenterPoint();
	var lon = vLocation.Longitude;
	var lat = vLocation.Latitude;

	if(state == 'in'){
		GLOBAL.Camera.ZoomIn()
	}else if(state == 'out'){
		GLOBAL.Camera.ZoomOut()
	}
}

/************************************************************** 위치 초기화 *****************************************************************/
let m_refresh = true; // true - 새로고침, false - 초기화 버튼

function setInitialLoc(){
	var vTargetPos = new Module.JSVector3D(m_pos.init[0], m_pos.init[1], m_pos.init[2]);
	var camera = GLOBAL.Camera;
	
	if($("body").hasClass("hanam") || $("body").hasClass("gimpo") || $("body").hasClass("uijeongbu")){		
		var center = new Module.JSVector3D(m_pos.init[0], m_pos.init[1], m_pos.init[2]);
		GLOBAL.Camera.moveLookAt(center, 40, 0, 800);
	} else{
		if(m_refresh){ // 페이지 로드 시
			//mapHome();
			
			setTimeout(function(){
				if(baseLocation == null) {
					camera.moveLonLatAlt(m_pos.init[0], m_pos.init[1], m_pos.init[2], true);
				} else {
					camera.moveLonLatAlt(baseLocation[0], baseLocation[1], m_pos.init[2], true);
				}
			}, 1000);
			
			m_refresh = false;
		}  else{ // 초기화 버튼 클릭 시 
			if(baseLocation == null) {
				camera.moveOval(vTargetPos, m_pos.init[3], m_pos.init[4], 1);
			} else {
				var vTargetPos = new Module.JSVector3D(baseLocation[0], baseLocation[1], m_pos.init[2]);
				camera.moveOval(vTargetPos, m_pos.init[3], m_pos.init[4], 1);
			}	
		}
	}
	
	getCameraLocation();
} 
/************************************************************ 아이콘 객체 생성 **************************************************************/
function createIcon(_url, _iconName) {
	var img = new Image();

	// POI 이미지 로드
	img.onload = function(){

		// canvas를 통해 이미지 데이터 생성
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = _iconName.indexOf("marker") < 0 ? img.height : img.height * 1.8;

		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);

		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		// Symbol에 새 아이콘 추가
		var bResult = GLOBAL.SymbolSearch.insertIcon(_iconName, imageData, canvas.width, canvas.height); // _iconName = 'icon'
		
		// 아이콘 선택 버튼 추가
		if (bResult) {
			GLOBAL.SelectIconName = _iconName
		}
	};
	
	img.src = _url;
}

/************************************************************ Point 객체 생성 **************************************************************/
function createPoint(_vPosition, _iconName, _key) {
	removePoint(_iconName);
	// Symbol에서 iconName으로 Icon 객체 반환
	var icon = GLOBAL.SymbolSearch.getIcon(_iconName);

	if (icon == null || GLOBAL.LayerSearch == null) {
		return;
	}

	// JSPoint 객체 생성
	var poi = Module.createPoint(_key);
	poi.setPosition(_vPosition);	// 위치 설정
	poi.setIcon(icon);				// 아이콘 설정

	// 레이어에 오브젝트 추가
	GLOBAL.LayerSearch.addObject(poi, 0);
}

/************************************************************ Point 객체 제거 **************************************************************/
function removePoint(_iconName){
	if (GLOBAL.LayerSearch == null){
		return;
	}
	// 입력 POI 모두 삭제
	GLOBAL.LayerSearch.removeAll();
	Module.XDRenderData();
}

/***************************************************** 지도 제어 시 인터페이스 위치 조절 ***************************************************************/
function moveViewInfo(e){	
	$.each($(".anal-remove-btn"), function (index, item) {
		var poiIndex = Number($(this).attr("id").replace("removeBtn", ""));
		var lon = removeBtnPosArr[poiIndex].lon;
		var lat = removeBtnPosArr[poiIndex].lat;
		var alt = removeBtnPosArr[poiIndex].alt;
		var position = Module.getMap().MapToScreenPointEX(new Module.JSVector3D(lon, lat, alt));
		var x;
		var y;
		
		if(Module.XDGetMouseState() == 87){
			x = position.x + 70 - _minusW;
			y = position.y + 14 - _minusH;
		} else if(Module.XDGetMouseState() == 88){
			x = position.x + 119 - _minusW;
			y = position.y + 12 - _minusH;
		}
		
		
		$(this).css("left", x);
		$(this).css("top", y);
		
		Module.SetViewInfo(true);
		Module.SetViewInfoPosition(x, y);
	});
}		

/***************************************************** 지형 투명도 설정 ***************************************************************/
function setPlanetTransparency(value){
	Module.XDESetPlanetTransparecny(value / 100);
}

/****************************************************************** 정북방향 보기 *****************************************************************************/
function viewNorth(){
	if(app2D == null){
		// 카메라 정북 방향으로 
		GLOBAL.Camera.setDirect(0);
		
		// 화면 갱신
		Module.XDRenderData();
	}
}

/****************************************************************** 방향 표출 *****************************************************************************/
function getCameraDirect(e){
	var o = document.getElementById("compass");

	if(o == null) return;

	var angle = 0;

	if(e.dCameraHeadAngle == null){ // 키보드 컨트롤
		angle = GLOBAL.Camera.getDirect().toFixed(5) * (-1);
	} else{ // 마우스 컨트롤
		angle = -e.dCameraHeadAngle
	}

	o.style.transform = "rotate(" + angle + "deg)";
}

/************************************************************** 카메라 *****************************************************************/
function getCameraLocation(){
	var vPosition = Module.getViewCamera().getLocation();
	// 카메라 좌표 표출
	$(".coordinates .x").html(vPosition.Longitude.toFixed(8));
	$(".coordinates .y").html(vPosition.Latitude.toFixed(8));
	
	//도분초 변환_박규호
	var rx = vPosition.Longitude;
	var xd = Math.floor(rx)
	var xm = Math.floor((rx % 1)*60);
	var xs = Math.round((((rx % 1)*60)%1)*60);
    $(".lon-degree").val(xd);
    $(".lon-minute").val(xm);
    $(".lon-second").val(xs);
	$(".lon-hdms").val(xd+"° "+xm+"′ "+xs+ "″");
	
	var ry = vPosition.Latitude;
	var yd = Math.floor(ry)
	var ym = Math.floor((ry % 1)*60);
	var ys = Math.round((((ry % 1)*60)%1)*60);
    $(".lat-degree").val(yd);
    $(".lat-minute").val(ym);
    $(".lat-second").val(ys);
    $(".lat-hdms").val(yd+"° "+ym+"′ "+ys+ "″");
	

}
// 위치 적용_박규호
$(document).on("click", ".btn-apply", function(){
	 if(app2D==false || app2D==null){
		 
		 var x = parseFloat($(".coordi-x").val());
		 var y = parseFloat($(".coordi-y").val());
		 if(isNaN(x) || isNaN(y)){
			 return alert("빈칸을 채워주세요");
		 }
		 
		 //이동시 4326
		 var tp =$(".coordi-projection option:selected").val();
		 if(tp!='EPSG:4326'){
		 var coord =proj4($(".coordi-projection option:selected").val(),"EPSG:4326",[x,y]);
		 }else{
			 var coord = [x,y];
		 }
		 Module.getViewCamera().moveLonLatAlt(coord[0], coord[1], Module.getViewCamera().getAltitude(),false);
	 }
});
//중심좌표 변환 2D/3D호환_박규호
function onchangeCoor(){
		var x = parseFloat($(".coordinates .x").html());
		var y = parseFloat($(".coordinates .y").html());
		var transCoord = proj4("EPSG:4326", $(".coordi-projection option:selected").val(), [x,y]);
		$(".coordi-x").val(transCoord[0]);
		$(".coordi-y").val(transCoord[1]);
}

/************************************************************** 파이프 *****************************************************************/
// 파이프 로드
function loadPipe(_path, _file, _color) {
	Module.ReadPipeSHP(
		_path, // 파일 url
		_file, // 파일 이름
		3, // 파이프 둥글기. 3으로 고정
		100000.0, // 파이프 흐름 표시 화살표
		0.0, // 고도
		_color, _color, // 파이프 시작 색상, 끝색상
		0.5, // 파이프 반경
		20 // 파이프 데이터 좌표계. 20으로 고정
	);
	
	var layerList = new Module.JSLayerList(true);
	var layer = null;
	
	layer = layerList.nameAtLayer(_file);
}

/************************************************************** 시설물 *****************************************************************/
// 양평 지하시설물 로드
function loadUnderFac(fac){
	//console.log(fac + " 로드");
	var path = serverUrl + "/siteData/yangpyeong/yp_fac";
	var color = new Module.JSColor(0, 0, 0, 0);
	var ghostSymbolMap = Module.getGhostSymbolMap();
	var symbolId = "";
	
	switch(fac){
		// 상수관로
		case "WTL_MANH_PSZ" : 
			loadPipe(path, "WTL_PIPE_LMZ", new Module.JSColor(255, 0, 0, 255));
			if(WTL_MANH_PSZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "WTL_MANH_PSZ", basePath: path, file: "WTL_MANH_PSZ"}); 
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_MANH_PSZ.geojson","WTL_MANH_PSZ");
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_VALV_PSZ.geojson","WTL_VALV_PSZ");
			}
			break;
		// 하수관로
		case "SWL_MANH_PSZ" :
			loadPipe(path, "SWL_PIPE_LMZ", new Module.JSColor(255, 170, 102, 179)); 
			if(SWL_MANH_PSZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "SWL_MANH_PSZ", basePath: path, file: "SWL_MANH_PSZ"});
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/SWL_MANH_PSZ.geojson","SWL_MANH_PSZ");
			}
			break;
		// 천연가스관로
		case "VALV_PSZ" :
			loadPipe(path, "UFL_GPIP_LMZ", new Module.JSColor(255, 217, 201, 0)); 
			if(VALV_PSZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "VALV_PSZ", basePath: path, file: "VALV_PSZ"});
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_GVAL_PSZ.geojson","UFL_GVAL_PSZ");
			}
			break;
		// 통신관로
		case "UFL_KMAN_PSZ" : 
			loadPipe(path, "UFL_KPIP_LSZ", new Module.JSColor(255, 238, 73, 73)); 
			if(UFL_KMAN_PSZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "UFL_KMAN_PSZ", basePath: path, file: "UFL_KMAN_PSZ"});
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_KMAN_PSZ.geojson","UFL_KMAN_PSZ");
			}
			break;
		// 전력지중관로
		case "UFL_BMAN_PSZ" : 
			loadPipe(path, "UFL_BPIP_LMZ", new Module.JSColor(255, 217, 201, 0)); 
			if(UFL_BMAN_PSZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "UFL_BMAN_PSZ", basePath: path, file: "UFL_BMAN_PSZ"});
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_BMAN_PSZ.geojson","UFL_BMAN_PSZ");
			}
			break;
		// 농업용공공관정
		case "FAR_PMAN_LMZ" : 
			if(FAR_PMAN_LMZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "FAR_PMAN_LMZ", basePath: path, file: "FAR_PMAN_LMZ"});
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/FAR_PMAN_LMZ.geojson","FAR_PMAN_LMZ");
				
				var layerList = new Module.JSLayerList(true);
				var layerpoi = layerList.createLayer("FAR_PMAN_LMZ_poi", Module.ELT_3DPOINT);
				setTimeout(function(){
					layerpoi.setVisible(true);
				},100);
			}
			break;
		// 지하수개발
		case "GRW_DMAN_LMZ" : 
			if(GRW_DMAN_LMZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "GRW_DMAN_LMZ", basePath: path, file: "GRW_DMAN_LMZ"}); 
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRW_DMAN_LMZ.geojson","GRW_DMAN_LMZ");
				
				var layerList = new Module.JSLayerList(true);
				var layerpoi = layerList.createLayer("GRW_DMAN_LMZ_poi", Module.ELT_3DPOINT);
				setTimeout(function(){
					layerpoi.setVisible(true);
				},100);
			}
			break;
		// 지하수이용시설
		case "GRU_FMAN_LMZ" : 
			if(GRU_FMAN_LMZ == null) {
				ghostSymbolMap.addGhostSymbolBy3DSbyJson({id: "GRU_FMAN_LMZ", basePath: path, file: "GRU_FMAN_LMZ"}); 
			} else {
				loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRU_FMAN_LMZ.geojson","GRU_FMAN_LMZ");
				
				var layerList = new Module.JSLayerList(true);
				var layerpoi = layerList.createLayer("GRU_FMAN_LMZ_poi", Module.ELT_3DPOINT);
				setTimeout(function(){
					layerpoi.setVisible(true);
				},100);
			}
			break;
	}
}

// 시설 로드
function loadFacility(_url, layerName) {
	// 포인트 데이터 로드
	$.getJSON(_url, function(_data) {
		
		// 고스트 심볼 레이어 생성
		var layerList = new Module.JSLayerList(true);
		var layer = layerList.createLayer(layerName, Module.ELT_GHOST_3DSYMBOL);
		
		layer.setMaxDistance(GLOBAL.MaxDistance);
		layer.setVisible(true);
		
		var modelKey = null;
		if (this.url.indexOf("MAN") != -1) {
			modelKey = layer.getName();
		} else if (this.url.indexOf("VAL") != -1) {
			modelKey = "VALV_PSZ";
		} else {
			return;
		}

		var modelSize = Module.getGhostSymbolMap().getGhostSymbolSize(modelKey);
		
		var features = _data.features;
		for (var i=0; i<features.length; i++) {
			var feature = features[i];
			var position_tm = feature.geometry.coordinates;

			//console.log(feature);
			//console.log(position_tm);

			// 좌표 변환
			var position_2d = Module.getProjection().convertProjection(
				20,
				new Module.JSVector2D(position_tm[0], position_tm[1]),
				13
			);

			var object = Module.createGhostSymbol("object_"+layer.getObjectCount());
			object.setGhostSymbol(modelKey);
			
			if (modelKey == "VALV_PSZ") {
				object.setBasePoint(0, -modelSize.height*0.5, 0);
				object.setPosition(new Module.JSVector3D(position_2d.x, position_2d.y, position_tm[2]));		
			} else if (modelKey == "FAR_PMAN_LMZ" || modelKey == "GRW_DMAN_LMZ" || modelKey == "GRU_FMAN_LMZ") {
				Alpha = 0; Red = 0; Green = 0; Blue = 0;
				if(modelKey == "FAR_PMAN_LMZ") {Alpha = 1; Red = 34; Green = 177; Blue = 76;};	// 농업
				if(modelKey == "GRW_DMAN_LMZ") {Alpha = 1; Red = 63; Green = 72; Blue = 204;};	// 지하개발
				if(modelKey == "GRU_FMAN_LMZ") {Alpha = 1; Red = 255; Green = 242; Blue = 0;};	// 지하이용
				var dia = 1.0;
				var dep = 1.0;
				dia = feature.properties["구경"]*1/100;
				dep = feature.properties["심도"]*1+2;
							
				object.setScale(new Module.JSSize3D(dia, dep, dia));
				object.setPosition(new Module.JSVector3D(position_tm[0], position_tm[1], position_tm[2]-dep/2+2));
				
				
				var layerList = new Module.JSLayerList(true);
				var layerpoi = layerList.nameAtLayer(modelKey+"_poi");
				layerpoi.setMaxDistance(GLOBAL.MaxDistance);
				var size = 10;
				var canvas = document.createElement('canvas');
				canvas.width = 10;
				canvas.height = 10;
				var ctx = canvas.getContext('2d');
				ctx.beginPath(); 
				ctx.arc(3, 3, 3, 0, 2*Math.PI);
				ctx.fillStyle = "rgba("+Red+", "+Green+", "+Blue+", "+Alpha+")";
				ctx.fill();

	
				// 이미지 POI 생성
				var poi_with_image = Module.createPoint("POI_WITH_IMAGE"+layerpoi.getObjectCount());
				poi_with_image.setPosition(new Module.JSVector3D(position_tm[0], position_tm[1], position_tm[2]));
				poi_with_image.setImage(ctx.getImageData(0, 0, size, size).data, size, size);
				
				layerpoi.addObject(poi_with_image, 0);
				layerpoi.setVisible(false);
			}
			else {
				object.setBasePoint(0, modelSize.height*0.10, 0);
				object.setScale(new Module.JSSize3D(1.0, 2.0, 1.0));
				object.setPosition(new Module.JSVector3D(position_2d.x, position_2d.y, position_tm[2]));		
			}	
				
			layer.addObject(object, 0);
		}
	});
}


// 가로등
function loadLamp(){
	var path = serverUrl + "/siteData/yangpyeong/lamp/3ds";
	var color = new Module.JSColor(0, 0, 0, 0);
	var ghostSymbolMap = Module.getGhostSymbolMap();
	var symbolId = "";
	
	if(SL251 == null) {
		ghostSymbolMap.addGhostSymbolBy3DS("SL251", path, "SL251");	
	} else {
		setTimeout(function(){
	        Module.XDEMapCreateLayer("SL251", serverUrl + "/siteData/yangpyeong/lamp/lampLayer", 0, true, false, true, 22, 0, 15);

	        var layerList=new Module.JSLayerList(false);
	        var layer = layerList.nameAtLayer("SL251");
	        layer.setUserTileLoadCallback(function(_layerName, _tile, _data){
	            var data =  decodeURI(_data);
	            insertTileGhostSymbol(_tile, data,"SL251","#FFD950",true);
	        })
	        
	        layer.setVisible(true);
		},100);
	}
	
}

function insertTileGhostSymbol(_tile, _csvData,symbolName,groupColor,visibleType){
	// console.log("tile : ", _tile);
	// console.log("_csvData : ", _csvData);
	// console.log("symbolName : ", symbolName);
	// console.log("groupColor : ", groupColor);
	// console.log("visibleType : ", visibleType);

    let id, lon, lat, level, name;
    let strArray = _csvData.split(",");

    for (let item of strArray) {
        let itemArray = item.split(":");
        if (itemArray[0] == "id") id = itemArray[1];
        else if (itemArray[0] == "lon") lon = parseFloat(itemArray[1]);
        else if (itemArray[0] == "lat") lat = parseFloat(itemArray[1]);
        else if (itemArray[0] == "level") level = parseInt(itemArray[1]);
        else if (itemArray[0] == "name") name = itemArray[1];
    }
    
    var altitude = symbolName != "SL251" ? Module.getMap().getTerrHeightFast(lon, lat) : Module.getMap().getTerrHeightFast(lon, lat) + 5;
    var scale = symbolName != "SL251" ? new Module.JSSize3D(1.0, 1.0, 1.0) : new Module.JSSize3D(3.0, 3.0, 3.0);
    
    var point = Module.createPoint(visibleType.toString());
    point.setPosition(new Module.JSVector3D(lon, lat, altitude));
   
    // 고스트 심볼 오브젝트 생성	
    var ghostSymbol = Module.createGhostSymbol(id.toString().trim());
    ghostSymbol.setGhostSymbol(symbolName);
    ghostSymbol.setPosition(new Module.JSVector3D(lon, lat, altitude));
    ghostSymbol.setScale(scale);
    
    point.setText(name);
    point.setVisibleRange(true,userSetup.vidoQlityLevel,GLOBAL.MaxDistance);

    _tile.addObject(ghostSymbol);
    _tile.addObject(point);

}

/***************************************************** 좌표계 변환 ***************************************************************/
/* posX : lon, poxY : lat, 
*  ogCoordinate : original Coordinate, 		// 원본 좌표계(입력좌표계)
*  cvsCoordinate : conversion Coordinate	// 변환 좌표계(출력 좌표계)
*  ex) 26 : 5179, 13 : 4326
*/
function TransformCoordinate(posX, posY, ogCoordinate, cvsCoordinate) {   

	// 입력 좌표계 인덱스
	var projectIndex_input = ogCoordinate;

	// 출력 좌표계 인덱스
	var projectIndex_output = cvsCoordinate;

	// 변환할 좌표
	var vPosition = new Module.JSVector2D(posX, posY);

	// 좌표변환 실행
	var vResult = GLOBAL.Projection.convertProjection(projectIndex_input, vPosition, projectIndex_output);

	// 결과출력
	return vResult;
}



/***************************************************** poi 라인 표출 ***************************************************************/
/* Point LinePoi 객체 생성 */
function createLinePoi(_layer, _longitude, _latitude, _altitude, _imageSrc, _lineColor, text) {
	
	// POI 이미지 로드
	var img = new Image();
	img.onload = function() {

		// 이미지 로드 후 캔버스에 그리기
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		
		// 이미지 POI 생성
		var point = Module.createPoint("POI_"+_layer.getObjectCount());
		point.setPosition(new Module.JSVector3D(_longitude, _latitude, _altitude));
		point.setImage(ctx.getImageData(0, 0, this.width, this.height).data, this.width, this.height);
		
		// POI 수직 라인 설정
		point.setPositionLine(100.0, _lineColor);
        
        // 텍스트 설정
		point.setText(text);
        //point.setTextMargin(0, -5);
		
		_layer.addObject(point, 0);
    };
    img.src = _imageSrc
    
}

function createLinePoi2(options) {
	// 라인 흰색 고정
	options.lineColor = new Module.JSColor(255, 255, 255);
	
	// 이미지 형태
	if(options.type != "C"){		
		// POI 이미지 로드
		var img = new Image();
		img.onload = function() {
			// 이미지 로드 후 캔버스에 그리기
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			
			ctx.width = img.width;
			ctx.height = img.height;
			ctx.drawImage(img, 0, 0);
			
			// z값 구해서 넣기
			var alt = Module.getMap().getTerrHeightFast(Number(options.lon), Number(options.lat));
			var point;
			var pointNm = "";
			
			// 이미지 POI 생성 및 Key값 지정
			if(options.layerKey != undefined && options.layer2Key == undefined){
				pointNm = options.layerKey.toString();
			}else if(options.layer2Key != undefined){
				pointNm = options.layerKey.toString() +  "_"  + options.layer2Key.toString();
			}else{
				pointNm = "POI_" + options.layer.getObjectCount();
			}
			
			point = Module.createPoint(pointNm);
			
			var imageData = ctx.getImageData(0, 0, this.width, this.height).data;
			
			point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));
			
			// POI 수직 라인 설정
			if(options.alt != undefined){
				point.setPositionLine(5.0 + alt, options.lineColor);
			}else{
				point.setPositionLine(30.0 + alt, options.lineColor);
			}
			
			// 텍스트 설정
			//point.setTextMargin(0, -5);
			
			// 하이라이트 POI 등록
			if(options.highlight != undefined){  
				if(options.highlight){
					var bResult = GLOBAL.Symbol.insertIcon(pointNm, imageData, ctx.width, ctx.height);
					
					if (bResult) {
						options.layer.keyAtObject(pointNm.replaceAll("_on", "")).setHighlightIcon(GLOBAL.Symbol.getIcon(pointNm));
					}
				}
			} else { 
				var imgUrl = options.markerImage;
				
				imgUrl = imgUrl.split(".")[0] + imgUrl.split(".")[1] + "_on." + imgUrl.split(".")[2];
				
				options.markerImage = imgUrl;
				options.highlight = true;
				options.layerKey = pointNm + "_on";
				
				createLinePoi2(options);
				
				point.setText(String(options.text));
				point.setImage(imageData, this.width, this.height);
			}
			
			point.setHighlight(false);
			
			options.layer.setMaxDistance(GLOBAL.MaxDistance);
			options.layer.addObject(point, 0);			
		};
		img.src = options.markerImage;
	} else { // 원형
		// 이미지 로드 후 캔버스에 그리기
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		
		ctx.width = 30;
		ctx.height = 30;
		ctx.clearRect(0, 0, ctx.width, ctx.height);
							
		var x = ctx.width / 2;
		var y = ctx.height / 2;
							
		if(options.poiColor.indexOf("#") >= 0){
			var hex = options.poiColor;
			var red = parseInt(hex[1]+hex[2],16);
			var green = parseInt(hex[3]+hex[4],16);
			var blue = parseInt(hex[5]+hex[6],16);
			
			options.poiColor = "rgba(" + red + "," + green + "," + blue + ", 255)";
		}
		
		// 동그라미 마커 이미지 그리기
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, 2*Math.PI, false);
		ctx.fillStyle = options.poiColor;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'white';
		ctx.stroke();
		
		// z값 구해서 넣기
		var alt = Module.getMap().getTerrHeightFast(Number(options.lon), Number(options.lat));
		var point ='';
		
		// 이미지 POI 생성 및 Key값 지정
		if(options.layerKey){
			point = Module.createPoint(options.layerKey.toString());
		}else{
			point = Module.createPoint("POI_"+options.layer.getObjectCount());
		}
		
		point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));
		point.setImage(ctx.getImageData(0, 0, ctx.width, ctx.height).data, ctx.width, ctx.height);
		
		// POI 수직 라인 설정
		point.setPositionLine(30.0 + alt, options.lineColor);
		
		// 텍스트 설정
		point.setText(String(options.text));
		//point.setTextMargin(0, -5);
		options.layer.setMaxDistance(GLOBAL.MaxDistance);
		options.layer.addObject(point, 0);
	}
    
}

function removePoi(){
	var layerList = new Module.JSLayerList(true);
	layerList.delLayerAtName("POI_TEST");
}
function setCameraMove_3D(lon,lat){
	//GLOBAL.Camera.setLocation(new Module.JSVector3D(Number(lon), Number(lat), 1000));
	//GLOBAL.Camera.setTilt(90);
	//GLOBAL.Camera.setDirect(0);
	
	var alt = 120;
	var location = new Module.JSVector3D(lon, lat, alt);
	GLOBAL.Camera.moveLookAt(location, Module.getViewCamera().getTilt(), GLOBAL.Camera.getDirect(), alt * 20);
}

function setCameraMoveLonLat_3D(lon,lat){
	//GLOBAL.Camera.setLocation(new Module.JSVector3D(Number(lon), Number(lat), 1000));
	var alt = 120;
	var location = new Module.JSVector3D(lon, lat, alt);
	GLOBAL.Camera.moveLookAt(location, Module.getViewCamera().getTilt(), GLOBAL.Camera.getDirect(), alt * 20);
}

function setCameraMoveLonLatAlt_3D(lon,lat,alt,dit){
	//GLOBAL.Camera.setLocation(new Module.JSVector3D(Number(lon), Number(lat), 1000));
	//var alt = 200;
	var location = new Module.JSVector3D(lon, lat, alt);
	var tilt = Module.getViewCamera().getTilt();
	
	if(tilt < 9) {
		tilt = 9;
	}
	
	GLOBAL.Camera.moveLookAt(location, tilt, GLOBAL.Camera.getDirect(), alt * 20);
}

function setCameraMoveLLAT(lon,lat,alt,tilt){
	var vTargetPos = new Module.JSVector3D(lon, lat, alt);
	//GLOBAL.Camera.move(vTargetPos, tilt, 1, 1);
	GLOBAL.Camera.move(vTargetPos, Module.getViewCamera().getTilt(), 1, 1);
}


function createCirclePolygon(center, radius, segment) {
	// 폴리곤을 추가 할 레이어 생성
	var layerList = new Module.JSLayerList(true);
	if(GLOBAL.LayerId.RadiusLayerId != null){
		layerList.nameAtLayer(GLOBAL.LayerId.RadiusLayerId).removeAll();
		GLOBAL.LayerId.RadiusLayerId = null;
	}
	GLOBAL.LayerId.RadiusLayerId = "COLOR_POLYGONS";
	//var layer = layerList.createLayer(GLOBAL.LayerId.RadiusLayerId , Module.ELT_POLYHEDRON);
	var layer = layerList.createLayer(GLOBAL.LayerId.RadiusLayerId , Module.ELT_PLANE);
	
	
	// 폴리곤 객체 생성
	var polygon = Module.createPolygon("POLYGON_0");
	
	/*var color1 = new Module.JSColor(80, 51, 153, 204);
	var color2 = new Module.JSColor(100, 51, 153, 204);*/
	
	var color1 = new Module.JSColor(80, 255, 228, 0);
	var color2 = new Module.JSColor(100, 255, 228, 0);
	
	if($("button[name=M_UNDG_FCTY_SECT]").parent().hasClass("on")) {
		layer = layerList.createLayer(GLOBAL.LayerId.RadiusLayerId , Module.ELT_POLYHEDRON);
		color1 = new Module.JSColor(255, 255, 127, 0);
		color2 = null;
	}
	
	// 폴리곤 색상 설정
	var polygonStyle = new Module.JSPolygonStyle();
	polygonStyle.setFill(true);
	polygonStyle.setFillColor(color1);
	if (color2 != null) {
		polygonStyle.setOutLine(true);
		polygonStyle.setOutLineWidth(3.2);
		polygonStyle.setOutLineColor(color2);
	} else {
		polygonStyle.setOutLine(false);
		polygonStyle.setOutLineWidth(0);
	}
	polygon.setStyle(polygonStyle);

	// 버텍스 폴리곤 형태 설정
	polygon.setCircle(center, Number(radius), Number(segment));
	
	// 레이어에 객체 추가
	layer.addObject(polygon, 0);
	layer.setMaxDistance(GLOBAL.MaxDistance);
}

// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
function removeLayer3D(){
	var layerList = new Module.JSLayerList(false);
	
	// 마우스 모드 변경
	if(layerList.nameAtLayer("building_object")) { // 3D 객체 선택 모드
		if(layerList.nameAtLayer("building_object").getVisible()) {
			Module.XDSetMouseState(6);
		}
    } else {  // 지도 이동 모드
    	Module.XDSetMouseState(Module.MML_MOVE_GRAB);
    }
	
	// 지도위에 뿌려진 마커 제거
	removePoint(GLOBAL.SelectIconName);
	
	// 레이어 생성
	layerList = new Module.JSLayerList(true);
	// poi 레이어
	if(GLOBAL.LayerId.PoiLayerId != null){
		var layer = layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId);
		if(layer != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
			GLOBAL.LayerId.PoiLayerId = null;
		}
		
	}
	// Line 레이어
	if(GLOBAL.LayerId.LineLayerId != null){
		var layer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
		if(layer != null){
			layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId).removeAll();
			GLOBAL.LayerId.LineLayerId = null;
		}
		
	}
	// PolygonLayer
	if(GLOBAL.LayerId.PolygonLayerId != null){
		var layer = layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId);
		if(layer != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PolygonLayerId).removeAll();
			GLOBAL.LayerId.PolygonLayerId = null;
		}
		
	}
	
	// poi 레이어 하위탭
	if(GLOBAL.LayerId.LowPoiLayerId != null){
		var layer = layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId);
		if(layer != null){
			layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId).removeAll();
			GLOBAL.LayerId.LowPoiLayerId = null;
		}
		
	}	
	// 반경검색 반경표출
	if(GLOBAL.LayerId.RadiusLayerId != null){
		var layer = layerList.nameAtLayer(GLOBAL.LayerId.RadiusLayerId);
		if(layer != null){
			layerList.nameAtLayer(GLOBAL.LayerId.RadiusLayerId).removeAll();
			GLOBAL.LayerId.RadiusLayerId = null;
		}
	}
	
	// WMS 레이어
	if(GLOBAL.layerWMS != null) {
		delWMSLayer(GLOBAL.layerWMS)
		GLOBAL.layerWMS = null
	}
	
	Module.XDRenderData();
}
//wfs 로 3d객체만들기
function createLayerWfS(layerName,layerBox) {
	
	if(layerBox != null){	//데이터내보내기에서만든 3d 객체 있을시 삭제
		delWfSLayer(layerBox)
	}
	
    var uurl = geo_url+'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=digitaltwin%3A'+layerName+'&srsname=EPSG:4326&outputFormat=application%2Fjson';
    
    $.get(uurl, function(data) {
//        console.log(data);
        
        var result = data.features
        for(var i=0; i<result.length; i++){
        	if(result[i].geometry.type == "MultiPolygon"){      		

        		cmmUtil.createMultiPolygon(result[i])
        		GLOBAL.layerBox = "POLYGON_LAYER"
        	}else if(result[i].geometry.type == "Point"){
        		cmmUtil.createMultiPoint(result[i])
        		
        		GLOBAL.layerBox = "POI"
        	}else if(result[i].geometry.type == "MultiLineString"){
        		cmmUtil.createMultiLine(result[i])
        		GLOBAL.layerBox = "MultiLineString"
        	}
        }
        
    });
	
}

function delWfSLayer(layerBox){//데이터내보내기에서만든 3d 객체 있을시 삭제
	
	 let layerList = new Module.JSLayerList(true);      // 레이어 리스트 반환(true : OCTREE, false: TILE)
	 layerList.delLayerAtName(layerBox)          
	
}
function delWMSLayer(layerWMS){//데이터내보내기에서만든 3d 객체 있을시 삭제
	
	let layerList = new Module.JSLayerList(false);		// 레이어 리스트 반환(true : OCTREE, false: TILE)
	wmslayer = layerList.nameAtLayer(layerWMS);
	if(wmslayer != null)	wmslayer.clearWMSCache();	// WMS 출력 된 이미지 삭제
	layerList.delLayerAtName(layerWMS) 				// WMS 삭제
}

//imgPOI 
function createImagePoi(_longitude, _latitude, _altitude, _imageSrc, count, _layer) {
	
	// POI 이미지 로드
	var img = new Image();
	img.onload = function() {

		// 이미지 로드 후 캔버스에 그리기
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		
		// 이미지 POI 생성
		var point = Module.createPoint("POI_"+count);
		point.setPosition(new Module.JSVector3D(_longitude, _latitude, _altitude));
		point.setImage(ctx.getImageData(0, 0, this.width, this.height).data, this.width, this.height);
		
		// POI 수직 라인 설정
		//point.setPositionLine(5, new Module.JSColor(0, 0, 255));
		point.setPositionLine(30.0 + _altitude, new Module.JSColor(0, 0, 255));
		
        //point.setTextMargin(0, -5);
		
		_layer.setMaxDistance(GLOBAL.MaxDistance);
		_layer.addObject(point, 0);
    };
    img.src = _imageSrc
    
}

/***************************************************** 카메라 ***************************************************************/
// 카메라 이동
function moveCamera(_landRegister, _type) {
	
	var lat = parseFloat(_landRegister.landRegister.lat);
	var lon = parseFloat(_landRegister.landRegister.lon);
	var alt = Module.getMap().getTerrHeightFast(lon, lat);
	var default_alt = 500;
	var area = parseFloat(_landRegister.landRegister.area);
	var dis = 10000;

	if(_type == "ldpl") { //필지
		default_alt = 40;
		if(area > 100000) {
			default_alt = 300;
			if(!$('#rightPopup').hasClass('opened')) {
				lon -= 0.016;
			} else {
				lon += 0.016;
			}
		} else if(area > 4000) {
			default_alt = 60;
			if(!$('#rightPopup').hasClass('opened')) {
				lon -= 0.004;
			} else {
				lon += 0.0025;
			}
		} else if(area > 2000) {
			if(!$('#rightPopup').hasClass('opened')) {
				lon -= 0.0035;
			} else {
				lon += 0.002;
			}
		} else if(area > 1000) {
			if(!$('#rightPopup').hasClass('opened')) {
				lon -= 0.0025;
			} else {
				lon += 0.0015;
			}
		} else {
			if(!$('#rightPopup').hasClass('opened')) {
				lon -= 0.0022;
			} else {
				lon += 0.001;
			}
		}
	} else if(_type == "li") { //리
		lon -= (_landRegister.landRegister.lon / 4000);
	}
	
	var location = new Module.JSVector3D(lon, lat, alt);
	GLOBAL.Camera.moveLookAt(location, Module.getViewCamera().getTilt(), 0, default_alt * 20);
	
}

// 즐겨찾기 기본 화면 이동
function BaseLocationMoveCamera(_location) {
	GLOBAL.Camera.setDirect(0);
	GLOBAL.Camera.setTilt(90);
	GLOBAL.Camera.moveLonLatAlt(_location[0], _location[1], m_pos.init[2], true);
}

/***************************************************** 벽면 ***************************************************************/
// 팬스 생성
function createVerticalPlane(_coordinates){
	
	// 레이어 생성
	var layerList = new Module.JSLayerList(true);
	
	if(!layerList.nameAtLayer("LINE_LAYER") && !layerList.nameAtLayer("COLOR_POLYGON_LAYER")) {
		var lineLayer = layerList.createLayer("LINE_LAYER", Module.ELT_SKY_LINE);
		var colorPolygonlayer = layerList.createLayer("COLOR_POLYGON_LAYER", Module.ELT_POLYHEDRON);
	} else {
		var lineLayer = layerList.nameAtLayer("LINE_LAYER");
		var colorPolygonlayer = layerList.nameAtLayer("COLOR_POLYGON_LAYER");
	}
	
	lineLayer.setMaxDistance(GLOBAL.MaxDistance);
	colorPolygonlayer.setMaxDistance(GLOBAL.MaxDistance);
	
	// 레이어 객체 초기화
	colorPolygonlayer.removeAll();
	lineLayer.removeAll();
	
	// 폴리곤 생성
	var colorPolygon = Module.createColorPolygon("TEST_VERTICAL_POLYGON");
	var baseLine = Module.createLineString("TEST_BASE_LINE");
	
	// 좌표 리스트 생성
	var coordinates = new Module.JSVec3Array();
	var parts = new Module.Collection();
	
	for (var i=0; i<_coordinates.length; i++) {
		var alt = Module.getMap().getTerrHeightFast(_coordinates[i][0], _coordinates[i][1]);
		coordinates.push( new Module.JSVector3D(_coordinates[i][0], _coordinates[i][1], alt + userSetup.vertclPynHeight));
	}
	parts.add(_coordinates.length);
	
	// 라인 설정
	baseLine.setPartCoordinates(coordinates, parts);
	
	// 폴리곤 수직 벽면 형태 정의
	colorPolygon.SetVerticalPlane(coordinates, parts, -userSetup.vertclPynHeight, new Module.JSColor(150, userSetup.vertclPynColorR, userSetup.vertclPynColorG, userSetup.vertclPynColorB),
			new Module.JSColor(255, userSetup.vertclPynColorR, userSetup.vertclPynColorG, userSetup.vertclPynColorB));
	colorPolygon.SetCullMode(1);
	
	// 라인 스타일
	var lineStyle = new Module.JSPolyLineStyle();
    lineStyle.setWidth(userSetup.vertclPynThick);
    lineStyle.setColor(new Module.JSColor(userSetup.vertclPynColorR, userSetup.vertclPynColorG, userSetup.vertclPynColorB));
	baseLine.setStyle(lineStyle);
	
	// 객체 추가
	colorPolygonlayer.addObject(colorPolygon, 0);
	lineLayer.addObject(baseLine, 0);
}
//지적/건물 wms클릭 이벤트
function cilckCadastralMap(data){
	
	var query = encodeURIComponent("bd_mgt_sn like '"+data.pnu+"%'")
	var uurl = geo_url+'/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=digitaltwin%3Atgd_spbd_buld&srsname=EPSG:5179&maxFeatures=50&outputFormat=application%2Fjson&cql_filter='+query+'';
	//console.log('uurl : ', uurl);

    $.ajax({
       url: uurl,
       type: "get",
       dataType: "json",
       async: true,
       success: getResultWfsSuccess
	});
    function getResultWfsSuccess(result){
		cilckCadastralMap2(data);

    	var count = result.features.length
    	if (count != 0) {
			let tag = ``;
			tag += `<li><p class="tit" id="buildcount">`;
			tag += `<span id="build">`;
			tag +=`건물 (<strong >${count}건</strong>)</span></p>`;
			tag += `<ul class="dep2" id="build">`
			for (var i=0; i<result.features.length; i++){
				var bulData = result.features[i].properties
				var bsi_int_sn = bulData.bsi_int_sn;
				var umd = data.addr;
				var bun = bulData.buld_mnnm;
				var bun_dc = bulData.buld_nm_dc;
				var subBun = bulData.lnbr_slno;
				var doro = data.roadAddr;
				var bulName = bulData.pos_bul_nm;
				var jibun = data.jibun;

				tag += `<li data-id="${bsi_int_sn}" data-jibun="${jibun}" data-buld_mnnm="${bun}" data-buld_nm_dc="${bun_dc}" data-lnbr_slno="${subBun}"  data-buld_nm="${bulName}" data-addr="${umd}" data-doro="${doro}"><a href="javascript:void(0);" >${bun}-${subBun}</a></li>`
			}
			tag += `</ul>`;
			$(".building-list", this.selector).append(tag);
    	}
    }
}
function cilckCadastralMap2(data){
	let tag = ``;
	var jimok = data.jibun.charAt(data.jibun.length - 1); //열
	var jibun = data.jibun.slice(0, -1); //문자
	var addr = data.addr;
	var roadAddr = data.roadAddr ? data.roadAddr : '';

	tag += `<li><p class="tit" id="jijukcount">`;
	tag += `<span id="jijuk">`;
	tag +=`지적 (<strong >1건</strong>)</span></p>`;
	tag += `<ul class="dep2 land_buld_jijuk" id="jijuk"><li data-id="${data.gid}" data-pnu="${data.pnu}" data-bbox="${data.bbox}" data-jibun="${jibun}" data-jimok="${jimok}" data-addr="${addr}" data-road="${roadAddr}"><a href="javascript:void(0);" >${jibun}</a></li></ul>`;
	$(".building-list", this.selector).append(tag);
}
function mapMove3d(data){
	if(GLOBAL.layerBox != null){
		delWfSLayer(GLOBAL.layerBox)
		GLOBAL.layerBox = null
	}
	
	var bboxData = data.bbox
	cmmUtil.createMultiPolygon(data.features[0])
	GLOBAL.layerBox = "POLYGON_LAYER"
	GLOBAL.Camera.moveLonLatAlt(bboxData[0], bboxData[1], 500, true);	
	GLOBAL.Camera.setTilt(90);
}

/**************************************************** 지하시설단면도 ***************************************************************/

/**
 * 3d object 생성 
 * @param map<?>(geom)
 * 
 */
function make3dObject(data){
//	console.log("make3dObject")
//	console.log(data.geom)
//	console.log(data.centerPoint)
	
	var	geoType = data.geom.split("(")
	
	if(geoType[0] == "POINT" || geoType[0] == "Point"){
		makePoinObject(data)
		GLOBAL.layerBox = "POI"
	}else if(geoType[0] == "MULTILINESTRING"|| geoType[0] == "MultiLineString"){
		makeLineObject(data)
		GLOBAL.layerBox = "MultiLineString"
	}else if(geoType[0] == "MULTIPOLYGON" || geoType[0] == "POLYGON"){
		makePolygonObject(data)
		GLOBAL.layerBox = "POLYGON_LAYER"
	}
}
function makePoinObject(data){
	
	var geom = data.geom.split("(")[1].split(")")[0].split(" ")
	var lon = parseFloat(geom[0]);
    var lat = parseFloat(geom[1]);
    var alt = Module.getMap().getTerrHeightFast(lon, lat);
    //		var pointCount = 0;
    var width = 120;
    var height = 30;
    var _position = new Module.JSVector3D(lon, lat, alt);

    var layerList = new Module.JSLayerList(true);
    var layer = layerList.createLayer("POI", Module.ELT_3DPOINT);
    layer.setMaxDistance(GLOBAL.MaxDistance);

    var drawCanvas = document.createElement("canvas");
    drawCanvas.width = width;
    drawCanvas.height = height;

    var ctx = drawCanvas.getContext("2d");

    var dotSize = 10;
    cmmUtil.drawDot(
      ctx,
      drawCanvas.width,
      drawCanvas.height,
      dotSize * 0.5,
      "rgba(255,0, 0, 0.7)",
      4,
      "rgba(1, 0, 0, 50)"
    );

    ctx.fillStyle = "rgba(255,0, 0, 0.7)";
    ctx.fill();

    var imageData = ctx.getImageData(0, 0, width, height).data;

    var poi = Module.createPoint("POINT-"+GLOBAL.layerCount );
    poi.setPosition(_position);
    poi.setImage(imageData, width, height);
    poi.addScreenPosition(0, -height * 0.5 + dotSize * 0.5);

    layer.addObject(poi, 0);
    GLOBAL.layerCount++
}
function makeLineObject(data){
	
	var layerList = new Module.JSLayerList(true);
	var lineLayer = layerList.createLayer("MultiLineString", Module.ELT_3DLINE);
	var type = data.geom.split("((")[0]
	var geomList = data.geom.split("((")[1].split("))")[0].split(",")
	
	var lineStringArray = [];	

	for(var i=0; i<geomList.length;i++) {
		var x = parseFloat(geomList[i].split(" ")[0])
		var y = parseFloat(geomList[i].split(" ")[1])
		var z = Module.getMap().getTerrHeightFast(x, y);
		
		lineStringArray.push( [x, y, z+2] );
		
	}
	
	let object_option = {
		coordinates: {
			coordinate: lineStringArray,						// 정점 배열
			style: "XYZ"
			// style에 따른 배열 관계
			// "XY" = [x, y],[x, y],[..]
			// "XYZ" = [x, y, z],[x, y, z],[...]
			// "XYZARRAY" = [x, y, z, x, y, z ...]
			// "JSVector3D" = JSVector3D 인스턴스
		},
		type: 0,											// 실선 생성 		
		union: true,										// 지형 결합 유무
		depth: true,										// 오브젝트 겹침 유무
		color: new Module.JSColor(100, 255, 0, 0),			// ARGB 설정
		width: 3											// 선 굵기
	};
	
	let line = Module.createLineString(
			"MultiLineString_"+GLOBAL.layerCount);
	
	console.log(line.createbyJson(object_option));
	
	lineLayer.addObject(line, 0);
	lineLayer.setMaxDistance(GLOBAL.MaxDistance);
    
    GLOBAL.layerCount++
}
function makePolygonObject(data){
	
	
	var layerList = new Module.JSLayerList(true);
	
	var polygonLayer = layerList.createLayer("POLYGON_LAYER", Module.ELT_PLANE);
	var type, geomList ;
	if(data.geom.split("(")[0]== "POLYGON"){
		type = data.geom.split("((")[0]
		geomList = data.geom.split("((")[1].split("))")[0].split(",")
	}else{
		type = data.geom.split("(((")[0]
		geomList = data.geom.split("(((")[1].split(")))")[0].split(",")
	}
//	type = data.geom.split("(((")[0]
//	geomList = data.geom.split("(((")[1].split(")))")[0].split(",")

    var polygonVertex = new Module.JSVec3Array();

    var part = new Module.Collection();
    part.add(geomList.length);
    
	for(var i=0; i<geomList.length;i++) {
		var x = parseFloat(geomList[i].split(" ")[0])
		var y = parseFloat(geomList[i].split(" ")[1])
		var z = Module.getMap().getTerrHeightFast(x, y);
		
		polygonVertex.push(new Module.JSVector3D(x, y, 100))
		
	}
    let polygon = Module.createPolygon(
      "POLYGON_"+GLOBAL.layerCount 
    );
    // 폴리곤 색상 설정
    var polygonStyle = new Module.JSPolygonStyle();
    polygonStyle.setOutLine(true);
    polygonStyle.setOutLineWidth(2.0);
    polygonStyle.setOutLineColor(new Module.JSColor(100, 255, 0, 0));
    polygonStyle.setFill(true);
    polygonStyle.setFillColor(new Module.JSColor(100, 5, 153, 204));

    polygon.setStyle(polygonStyle);

    polygon.setPartCoordinates(polygonVertex, part);

    polygonLayer.setMaxDistance(GLOBAL.MaxDistance);
    polygonLayer.addObject(polygon, 0);
    GLOBAL.layerCount++  
}

/*************************************************************** 카메라 위치 바운더리 설정 *************************************************************************/
function setCameraBoundary(){

	Module.getViewCamera().setLimitRectAlt(m_pos.extent[0], m_pos.extent[1], m_pos.extent[2], m_pos.extent[3], m_pos.extent[4]);
}

function createSelect3dObjectBuffer (geom,radius,layer){
	  
	 if(radius){
		 $.ajax({
			 type : "POST",
			 url : "/anls/span/create3DBuffers.do",
			 data: {
				 "geom" : geom,
				 "radius" : radius
			 },
			 dataType:"json",
			 async: false,
			 success : create3DBuffers
		 });
		 function create3DBuffers(data){
			 
			 
			 var layerList = new Module.JSLayerList(true);
	
			var polygonLayer = layerList.createLayer("POLYGON_LAYER", Module.ELT_PLANE);
			var type, geomList ;
			if(data.geom.split("(")[0]== "POLYGON"){
				type = data.geom.split("((")[0]
				geomList = data.geom.split("((")[1].split("))")[0].split(",")
			}else{
				type = data.geom.split("(((")[0]
				geomList = data.geom.split("(((")[1].split(")))")[0].split(",")
			}
		//	type = data.geom.split("(((")[0]
		//	geomList = data.geom.split("(((")[1].split(")))")[0].split(",")
		
		    var polygonVertex = new Module.JSVec3Array();
		
		    var part = new Module.Collection();
		    part.add(geomList.length);
		    
			for(var i=0; i<geomList.length;i++) {
				var x = parseFloat(geomList[i].split(" ")[0])
				var y = parseFloat(geomList[i].split(" ")[1])
				var z = Module.getMap().getTerrHeightFast(x, y);
				
				polygonVertex.push(new Module.JSVector3D(x, y, z))
				
			}
		    let polygon = Module.createPolygon(
		      "POLYGON_"+GLOBAL.layerCount 
		    );
		    // 폴리곤 색상 설정
		    var polygonStyle = new Module.JSPolygonStyle();
		    polygonStyle.setOutLine(true);
		    polygonStyle.setOutLineWidth(2.0);
		    polygonStyle.setOutLineColor(new Module.JSColor(100, 255, 0, 0));
		    polygonStyle.setFill(true);
		    polygonStyle.setFillColor(new Module.JSColor(100, 5, 153, 204));
		
		    polygon.setStyle(polygonStyle);
		
		    polygon.setPartCoordinates(polygonVertex, part);
		
		    polygonLayer.setMaxDistance(GLOBAL.MaxDistance);
		    polygonLayer.addObject(polygon, 0);
		    GLOBAL.layerCount++  
					 
				 }
	 }else{
		 
	 }
	 
}
function removeAllLayer(){
	removeAnalysis()
	removeLayer3D()
}

/**************************************************** 지하시설단면도 ***************************************************************/

function createLine(x,y) {
	
	//배열 생성
	let object_option = null;
	let coordinates = {
			coordinate : [[x.Longitude, x.Latitude, x.Altitude], [y.Longitude, y.Latitude, y.Altitude]],
			style : "XYZ"
	}
	
	let data = {
			coordinates: coordinates,
			type: 0,											// 실선 생성 		
			union: true,										// 지형 결합 유무
			depth: true,										// 오브젝트 겹침 유무
			color: new Module.JSColor(255, 98, 163, 195),			// ARGB 설정
			width: 7,											// 선 굵기
		}
	
	//레이어 생성
	var layerList = new Module.JSLayerList(true);
	
	if(!layerList.nameAtLayer("Line_Option")) {
		var layer = layerList.createLayer("Line_Option", Module.ELT_3DLINE);
	} else {
		var layer = layerList.nameAtLayer("Line_Option");
	}
	
	layer.removeAll();
	
	let line = Module.createLineString("UNDG_LINE");
	
	line.createbyJson(data);
	
	layer.addObject(line, 0);
}

/**************************************************** 라인생성 ***************************************************************/

function createLineArr() {
	
	//배열 생성
	
	var arr = GLOBAL.Map.getInputPoints();
	var coordinate = [];
	
	for(var i = 0; i < arr.count(); i++) {
		
		point = [];
		point.push(arr.get(i).Longitude);
		point.push(arr.get(i).Latitude);
		point.push(arr.get(i).Altitude);
		coordinate.push(point);
		
	}
	
	let coordinates = {
			coordinate : coordinate,
			style : "XYZ"
	}
	
	let data = {
			coordinates: coordinates,
			type: 0,											// 실선 생성 		
			union: false,										// 지형 결합 유무
			depth: false,										// 오브젝트 겹침 유무
			color: new Module.JSColor(255, 255, 255, 0),			// ARGB 설정
			width: 1,											// 선 굵기
		}
	
	//레이어 생성
	var layerList = new Module.JSLayerList(true);
	
	if(!layerList.nameAtLayer("Line_Arr_Option")) {
		var layer = layerList.createLayer("Line_Arr_Option", Module.ELT_3DLINE);
		layer.setMaxDistance(GLOBAL.MaxDistance);
	} else {
		var layer = layerList.nameAtLayer("Line_Arr_Option");
		layer.setMaxDistance(GLOBAL.MaxDistance);
		layer.removeAll();
	}
	
	let line = Module.createLineString("UNDG_Arr_LINE");
	
	line.createbyJson(data);
	
	layer.addObject(line, 0);
	
	Module.getMap().clearInputPoint();
	//Module.XDSetMouseState(1);
}

