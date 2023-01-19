/**
 * @Class Name : map_init.js
 * @Description : 지도 초기설정 js 
 * @
 * @  수정일     	      수정자              		수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2021.06.21    최초생성
 *
 * @author 스마트융합사업본부 김선옥
 * @since 2021. 06.21
 * @version 1.0
 * @see
 */

/*******************************************************************************
 * 엔진 파일을 로드합니다. 파일은 asm.js파일, html.mem파일, js 파일 순으로 로드하며, 로드 시 버전
 * 명(engineVersion)을 적용합니다.
 ******************************************************************************/
var engineVersion = "v0.0.0.1";
;(function(){
	// 1. XDWorldEM.asm.js 파일 로드
	var tm = (new Date()).getTime();	// 캐싱 방지
	
	var file = "../engine/XDWorldEM.asm.js?tm="+tm;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', file, true);
	xhr.onload = function() {
		
		var script = document.createElement('script');
		script.innerHTML = xhr.responseText;
		document.body.appendChild(script);
	
		// 2. XDWorldEM.html.mem 파일 로드
		setTimeout(function() {
			(function() {
				
			    var memoryInitializer = "../engine/XDWorldEM.html.mem?tm="+tm;
				var xhr = Module['memoryInitializerRequest'] = new XMLHttpRequest();
			    xhr.open('GET', memoryInitializer, true);
			    xhr.responseType = 'arraybuffer';
			    xhr.onload =  function(e){
							
					// 3. XDWorldEM.js 파일 로드
			        var url = "../engine/XDWorldEM.js?tm="+tm;
					var xhr = new XMLHttpRequest();
					xhr.open('GET',url , true);
					xhr.onload = function(){
					   	var script = document.createElement('script');
					   	script.innerHTML = xhr.responseText;
						document.body.appendChild(script);
					};
					xhr.send(null);
				};
			    xhr.send(null);
			})();	
		}, 1);
	};
	xhr.send(null);

})();

/*******************************************************************************
 * 엔진파일 로드 후 Module 객체가 생성되며, Module 객체를 통해 API 클래스에 접근 할 수 있습니다. -
 * Module.postRun : 엔진파일 로드 후 실행할 함수를 연결합니다. - Module.canvas : 지도를 표시할 canvas
 * 엘리먼트를 연결합니다.
 ******************************************************************************/
var trueLayerList, falseLayerList;

var Module = {
	TOTAL_MEMORY: 256*1024*1024,
	postRun: [init],
	canvas: (function() {
		var canvas = document.getElementById("canvas"); 
		
		canvas.width = document.getElementById("container").offsetWidth;
		canvas.height = document.getElementById("container").offsetHeight;
		// 화면 저장을 위해 버퍼 설정이 필요합니다.
		var context = canvas.getContext("experimental-webgl", {
            preserveDrawingBuffer: true
        });
		
		return canvas;
	})()
};

var GLOBAL = {
		Symbol : null,
		SymbolSearch : null,
		Layer : null,
		LayerSearch : null,
		PoiLayer : null,
		circleLayer : null,
		locationLayer : null,
		LayerId : {
			PoiLayerId : null,
			LineLayerId : null,
			PolygonLayerId : null,
			LowPoiLayerId : null,
			RadiusLayerId : null
		},
		nIndex : 0,
		layerWMS : null,
		Graph : null, // 2d그래프
		Map : null,
		SelectIconName : "", // "icon"이라는  poi icon 이름 담는 변수
		NomalIcon : "", // "icon"이라는  poi icon 이름 담는 변수
		SelectObject : null,  
		Camera : null, // 카메라
		Navigation : null, // 네비게이션
		POPUP_DIV : null,
		Slope : null, 	// 경사도 분석 API 실행 객체
		SELECT_POINT_POS : {
			LON : null,
			LAT : null,
			ALT : null
		},
		Jomang: null,
		Analysis : null,
		mousePress : false,
		POI_image : null,
		Projection : null,
		POI : null,
		POINT_CLOUD : null,
		StartPoint : false,
		MaxDistance : 60000,
		CHART:null,
		layerBox: null,
		pipe: null,
		layerCount:0,
		selectObjectData :""
		
};

/**
 * @description 기본배경지도 여부에 따라 배경지도 초기화 해주는 함수.
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.03.17
 */
function backgroundMapInit() {

	var serviceId = mapServiceVO.serviceId;
	var serviceUrl = "";
//	if(groupId == 'GROUP_00000000000091'){
		serviceUrl = mapServiceVO.serviceUrl;
//	} else if(groupId == 'GROUP_00000000000000') {
//		serviceUrl = mapServiceVO.serviceUrlLx;
//	}
	
	
	var bmCode = mapServiceVO.bmCode;

	m_bgType = serviceId;
	bgMapChage(serviceUrl, serviceId, bmCode);
}

/* 엔진 로드 후 실행할 초기화 함수(Module.postRun) */
function init() {	

	Module.SetResourceServerAddr("/images/poi/");
	
	// 양평 지역만
	if(!($("body").hasClass("hanam") || $("body").hasClass("gimpo") || $("body").hasClass("uijeongbu"))){		
		//배경영상(정사영상)
		Module.XDESetDemUrlLayerName(xdServer, "dem_yp_5m");
		Module.XDESetSatUrlLayerName(xdServer,"tile_yp_25cm");
	}
	
	Module.getNavigation().setNaviVisible(Module.JS_VISIBLE_OFF);
	
	// 엔진 초기화 API 호출(필수)
//	Module.SetAPIKey("767B7ADF-10BA-3D86-AB7E-02816B5B92E9");
	//Module.XDESetDemUrlLayerName("http://218.235.89.19:5555", "YP");
	Module.Start(Module.canvas.clientWidth, Module.canvas.clientHeight);
	//Module.SetPlanetImageryType(02);
    Module.Map = Module.getMap();
   
    GLOBAL.Camera = Module.getViewCamera();
	GLOBAL.Projection = Module.getProjection();
	
	// 양평 지역만
	if(!($("body").hasClass("hanam") || $("body").hasClass("gimpo") || $("body").hasClass("uijeongbu"))){		
		//카메라 이동 제한_박규호
		Module.getViewCamera().setLocation(new Module.JSVector3D(m_pos.init[0], m_pos.init[1], m_pos.init[2]));
		Module.getViewCamera().setLimitRectAlt(112.74833937665129, 31.194128336558973, 143.98027170605687, 43.065487303850254, 20000000);
		Module.getViewCamera().setLimitCamera(true);
		Module.getViewCamera().setLimitAltitude(200);
		
//		backgroundMapInit(); //기본배경지도 여부에 따라 배경지도 변경해주기.
	} else{
		var ceneter = null;
		
		if($("body").hasClass("hanam")){
			m_pos.init = [127.21462513323925, 37.5391004833106, 25.750877398997545, 40];
			 document.title = "스마트시티 IN 하남 플랫폼";
			 $(".logo a").html("스마트시티 IN 하남 플랫폼");
		} else if($("body").hasClass("gimpo")){
			m_pos.init = [126.71554718443927, 37.61521979117524, 24.850063593126833, 40];
			document.title = "스마트시티 IN 김포 플랫폼";
			$(".logo a").html("스마트시티 IN 김포 플랫폼");
		} else if($("body").hasClass("uijeongbu")){	
			m_pos.init = [127.03384152042885, 37.73798555530981, 52.769907934591174, 40];
			document.title = "스마트시티 IN 의정부 플랫폼";
			$(".logo a").html("스마트시티 IN 의정부 플랫폼");
		}
		
		center = new Module.JSVector3D(m_pos.init[0], m_pos.init[1], m_pos.init[2]);
		GLOBAL.Camera.moveLookAt(center, 40, 0, 800);
		
		var layerList = new Module.JSLayerList(false);
		layerList.delLayerAtName("layer_S_140");
		
		// 지역  명칭 레이어(서울특별시, 광진구 등)
		Module.XDEMapCreateLayer("poi_bound", "http://xdworld.vworld.kr:8080", 8080, false, true, false, 5, 0, 15);		
//		
		// 건물 명칭 레이어(00빌딩 등)
//		Module.XDEMapCreateLayer("poi_base", "http://xdworld.vworld.kr:8080", 8080, false, true, false, 5, 0, 15);
		
//		 도로 명칭 레이어(경부고속도로, 월서로 등)
//		Module.XDEMapCreateLayer("poi_road", "http://xdworld.vworld.kr:8080", 8080, false, true, false, 5, 0, 15);
		
//		// 건물, 다리 레이어
		Module.XDEMapCreateLayer("facility_build", "xdworld.vworld.kr:8080", 8080, true, true, false, 9, 0, 15);
		Module.XDEMapCreateLayer("facility_bridge", "xdworld.vworld.kr:8080", 8080, false, true, false, 9, 0, 15);
//		
		Module.setVisibleRange("facility_build", 2.5, GLOBAL.MaxDistance);
		Module.setVisibleRange("facility_bridge", 2.5, GLOBAL.MaxDistance);
		
//		// 지역, 도로 구분 선
		Module.XDEMapCreateLayer("hybrid_bound", "xdworld.vworld.kr:8080", 8080, false, true, false, 10, 0, 10);
		Module.XDEMapCreateLayer("hybrid_road", "xdworld.vworld.kr:8080", 8080, false, false, false, 10, 0, 15);
		
	}
	
	initPage();
	initControl(Module.canvas); 
	initLayer();
	setScripts();
	
	setCameraBoundary();
	MapSetting();
	
	if(is3dBtn){
		if(app2D) {
			app2D.destroy();
			app2D = null;
		}
		//3d 위치 초기화
		setInitialLoc();		
	}
	
	
	if (coordinate2d != null) {
		var vPosition = new Module.JSVector2D(coordinate2d[0], coordinate2d[1]);

        // 좌표변환 실행
        var vResult = Module.getProjection().convertProjection(26, vPosition, 13); // 5179 -> 4326
        
        var pnu = aj_getPnuByLonLat(vResult.x, vResult.y);
        
        if(pnu != ""){        	
        	var landRegister = getLandRegisterByPnu(pnu);
        	
        	rightPopupOpen("landRegister", pnu, null, true);
        	cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
        } else{
        	 alert("조회된 결과가 없습니다.");
        }
        coordinate2d = null;
	}
	
	
	
	loadingShowHide('hide');
}

/* 관련 글로벌 객체 초기화 함수 */
function initPage() {

	// Map 객체 반환
	GLOBAL.Map = Module.getMap();
	// 아이콘 관리 심볼 생성
	GLOBAL.Symbol = Module.getSymbol();
	GLOBAL.SymbolSearch = Module.getSymbol();
	// 카메라 API 객체 생성
	GLOBAL.Camera = Module.getViewCamera();
	// 네비게이션 객체 생성
	GLOBAL.Navigation = Module.getNavigation();
	
	// 지도 이동
	GLOBAL.MML_MOVE_GRAB = Module.MML_MOVE_GRAB;
	
	// 거리 계산
	GLOBAL.MML_ANALYS_DISTANCE = Module.MML_ANALYS_DISTANCE;
	
	// 면적 계산
	GLOBAL.MML_ANALYS_AREA = Module.MML_ANALYS_AREA;
	
	// 높이 측정
	GLOBAL.MML_ANALYS_ALTITUDE = Module.MML_ANALYS_ALTITUDE;
	
	// 포인트 선택
	GLOBAL.MML_SELECT_POINT = Module.MML_SELECT_POINT;
	
	// 라인 입력상태
	//GLOBAL.MML_INPUT_LINE = Module.MML_INPUT_LINE;
	
	// 반경 입력상태
	GLOBAL.MML_ANALYS_AREA_CIRCLE = Module.MML_ANALYS_AREA_CIRCLE;
	
	
	
	/* 마우스 상태 변경 */
	GLOBAL.onEventAddDistancePoint = true;
	GLOBAL.onEventAddAreaPoint = true;
	GLOBAL.onEventAddAltitudePoint = true;
	GLOBAL.onEventAddSlopePoint = null;
	
	
	// 컨트롤 API 호출 객체 반환
	GLOBAL.Control = Module.getControl();
	
	// 분석 API 클래스 객체 반환(일조권, 가시권)
	GLOBAL.Analysis = Module.getAnalysis();
	
	// 분석 출력 POI 레이어 생성
	var layerList = new Module.JSLayerList(true);
	GLOBAL.Layer = layerList.createLayer("MEASURE_POI", Module.ELT_3DPOINT);
	GLOBAL.Layer.setMaxDistance(GLOBAL.MaxDistance);
	GLOBAL.Layer.setSelectable(false);
	
	//반경 원 레이어 생성
	GLOBAL.circleLayer = layerList.createLayer("MEASURE_CIRCLE", 6);
	GLOBAL.circleLayer.setMaxDistance(GLOBAL.MaxDistance);
	GLOBAL.circleLayer.setSelectable(false);
	GLOBAL.circleLayer.setEditable(true);
				
	
	// 콜백 함수 설정 지속적으로 사용
	let addresult = Module.getOption().callBackAddPoint(addPoint);				// 마우스 입력시 발생하는 콜백	
	let completeresult = Module.getOption().callBackCompletePoint(endPoint);	// 측정 종료(더블클릭) 시 발생하는 콜백
	
	Module.SetProxy("../engine/proxy.jsp?url=");

//	setNavigationVisible(); // 지도 네비게이션(회전,줌인,줌아웃) 기능 호출  -> OFF를 하더라도 일단 호출한 후에 안에서 OFF로 수정해야함.
//	setInitialLoc(); // 초기 위치 설정
	falseLayerList = new Module.JSLayerList(false);
	trueLayerList = new Module.JSLayerList(true);  
	initGrphSymbol();
	Module.XDSetMouseState(6); 
	Module.XDRenderData();
	
	// 기본 마커 표출
	var poilayerList = new Module.JSLayerList(true);
	GLOBAL.LayerSearch = poilayerList.createLayer("Poi_Layer", Module.ELT_3DS_SYMBOL);
	GLOBAL.LayerSearch.setMaxDistance(GLOBAL.MaxDistance);					// POI 레이어 MaxDistance 조정
	GLOBAL.NomalIcon = "NomalIcon";							
	createIcon('./images/poi/nomal_poi.png', GLOBAL.NomalIcon);						// poi 레이어 이미지 등록
}


/* 스크립트 로드 */
function setScripts(){
	var JSCanvas = loadScript("./engine/ide/management/JSCanvas.js");
    JSCanvas
	.then(function(value) {
	tcanvas.createCanvas("imgCanvas");
		var JSImage = loadScript("./engine/ide/management/JSImage.js");
		return JSImage;
	})
	.then(function(value) {
		var JSEngine = loadScript("./engine/ide/management/JSEngine.js");
		return JSEngine;
	})
	.then(function(value) {
		var JSControl = loadScript("./engine/ide/management/dt_control.js");
		return JSControl;
	})
	.then(function(value) {
		var JSData = loadScript("./engine/ide/management/dt_data.js");
		return JSData;
	})
	.finally(function() {
		console.log("Load Out Script OK");
		_loadStats = true;
	})	
}

function loadScript(_src) {
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = _src;
        script.onload = function(){
			resolve("Load : " + _src);
		}
        script.onerror = function(){
			reject("Error : " + _src);
		}
        document.head.append(script);
    });
}
function init3D(){
	// 기본 마커 표출
	var poilayerList = new Module.JSLayerList(true);
	GLOBAL.LayerSearch = poilayerList.createLayer("Poi_Layer", Module.ELT_3DS_SYMBOL);
	GLOBAL.LayerSearch.setMaxDistance(GLOBAL.MaxDistance);					// POI 레이어 MaxDistance 조정
	
	// 분석 출력 POI 레이어 생성
	var layerList = new Module.JSLayerList(true);
	GLOBAL.Layer = layerList.createLayer("MEASURE_POI", Module.ELT_3DPOINT);
	GLOBAL.Layer.setMaxDistance(GLOBAL.MaxDistance);
	GLOBAL.Layer.setSelectable(false);
		
	// 반경 원 레이어 생성
	GLOBAL.locationLayer = layerList.createLayer("MEASURE_LOCA", Module.ELT_POLYHEDRON);
	GLOBAL.locationLayer.setMaxDistance(GLOBAL.MaxDistance);
	GLOBAL.locationLayer.setSelectable(false);
	GLOBAL.locationLayer.setEditable(true);
	
	//로케이션 레이어 생성
	GLOBAL.circleLayer = layerList.createLayer("MEASURE_CIRCLE", 6);
	GLOBAL.circleLayer.setMaxDistance(GLOBAL.MaxDistance);
	GLOBAL.circleLayer.setSelectable(false);
	GLOBAL.circleLayer.setEditable(true);
	
	// 지역  명칭 레이어(서울특별시, 광진구 등)
	//Module.XDEMapCreateLayer("poi_bound", "http://xdworld.vworld.kr:8080", 8080, false, true, false, 5, 0, 15);
	
	// 건물 명칭 레이어(00빌딩 등)
	//Module.XDEMapCreateLayer("poi_base", "http://xdworld.vworld.kr:8080", 8080, false, true, false, 5, 0, 15);
	
	// 도로 명칭 레이어(경부고속도로, 월서로 등)
	//Module.XDEMapCreateLayer("poi_road", "http://xdworld.vworld.kr:8080", 8080, false, true, false, 5, 0, 15);
}
