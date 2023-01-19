/**
 * @Class Name : map_layer.js
 * @Description : 지도 레이어 js 
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

/*
 XDEMapCreateLayer(string layername, string url, int port, bool select, bool visible, bool userLayer, int _iType, int _iMinLevel, int _iMaxLevel)
- 1. layername : 레이어 이름 (XDServer의 xml에 설정한 Layer 태그의 name 값을 입력합니다)
- 2. url : 데이터를 서비스하는 url
- 3. port : 현재 사용하고 있지 않습니다. port 번호는 url과 함께 붙여서 호출해주세요!
- 4. select : 레이어 선택 가능 여부
- 5. visible : 레이어 가시 여부
- 6. userLayer : 현재 사용하지 않습니다 기본으로 false 값 입력 부탁드립니다!
- 7. iType : 레이어 타입 번호 
	- 5 : POI
	- 9 : 건물(Real3D)
	- 10 : 하이브리드 이미지
	- 19 : 포인트 클라우드
	- 20 : 드론 LOD
	- 21 : 파이프
	- 22 : CSV
- 8. iMinLevel : 타일 레이어의 최소 레벨
- 9. iMaxLevel : 타일 레이어의 최대 레벨	 
 */

// 실서버
// 행정망
//var serverUrl = "http://10.165.2.30/";
//var xdServer = "http://10.165.2.30/xdServer";
//var geoServer = "http://10.165.2.30/geoServer";
//var geo_url = "http://10.165.2.30/geoUrl";

// LX망
//var serverUrl = "http://10.20.30.81";
//var xdServer = "http://10.20.30.81/xdServer";
//var geoServer = "http://10.20.30.81/geoServer";
//var geo_url = "http://10.20.30.81/geoUrl";

// 개발서버
// 행정망
//var serverUrl = "http://203.228.54.54/";
//var xdServer = "http://203.228.54.54/xdServer";
//var geoServer = "http://203.228.54.54/geoServer";
//var geo_url = "http://203.228.54.54/geoUrl";

// LX망
var serverUrl = "http://203.228.54.47";
var xdServer = "http://203.228.54.47/xdServer";
var geoServer = "http://203.228.54.47/geoServer";
var geo_url = "http://203.228.54.47/geoUrl";


var storageId = "digitaltwin";
var imageLoading = false; // true - 로딩 됨, false - 로딩 안 됨

/*********************************************************** 레이어 초기 세팅 **********************************************************************/
function initLayer(){
	//vwrold 지도 최신화
	Module.SetMobileMode(2);
	Module.getMap().setTerrLODRatio(1.0); // 정사영상 하이브리드 요청에 과부하를 줄여줌

	// 리
	store.addLayerId("tgd_scco_li");
	// 읍면동 
	store.addLayerId("tgd_scco_emd");
	// 시군구 경계
	store.addLayerId("tgd_scco_sig");
	
	onOffLayer2D("S", "139", true);
	onOffLayer2D("S", "138", true);
	onOffLayer2D("S", "140", true);
	
	loadWMS_3D("layer_S_139", storageId + ":tgd_scco_li", "");
	loadWMS_3D("layer_S_138", storageId + ":tgd_scco_emd", "");
	loadWMS_3D("layer_S_140", storageId + ":tgd_scco_sig", "");
}

/*********************************************************** 레이어 초기화 **********************************************************************/
$(document).ready(function(){
	$(document).on("click", ".map-tool-list li button", function(){
		// 필지 면적 객체 삭제
		if(typeof(OLOAD) != "undefined" && OLOAD.m_center_Polygon != null){
			OLOAD.m_center_Polygon.removeAllObject();

			var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
			var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER"); 
			
			if(colorPolygonLayer != null) { colorPolygonLayer.removeAll(); } 
			if(lineLayer != null) { lineLayer.removeAll(); }
		}
		//3D일때만 상단메뉴 두번클릭시 오른쪽탭끄기 문제시 삭제하겠음_박규호
		if(app2D==false || app2D==null){
			removeGrphLayer();
			var classCheck= $(this.parentElement).attr('class');
			if(classCheck.indexOf('active')){
				$('.popup-close').trigger('click');
			}
		}

	});
});

/***************************************************** GeoServer WMS ******************************************************/
//WMS 레이어 호출
function loadWMS_3D(layerId, layerNm, crs) {
	let strUrl, strLayer, strCrs, strVersion;
	let numMinlevel, numMaxlevel, numTileSize;
	let bBox, bProxy;

	// 초기화
	strUrl = strLayer = strCrs = strVersion = "";
	numMinlevel = numMaxlevel = numTileSize = 0;
	bBox = bProxy = true;
	crs = crs == "" ? "4326" : crs;

	// WMS UI 데이터 입력
	strUrl = geo_url + "/wms?";
	strLayer = layerNm;
	strCrs = "EPSG:" + crs;							// [Default EPSG:4326] SRS도 CRS값 적용
	numMinlevel = 7;		// [Default 0]
	numMaxlevel = 16;		// [Default 15]
	numTileSize = "756";		// [Default 256]

	// Parameters UI 데이터 입력
	strVersion = "1.1.1";

	// WMS Option 데이터 입력
	bBox = true;
	bProxy = false;

	let slopeoption = {
		url: strUrl,
		layer: strLayer,
		minimumlevel: numMinlevel,
		maximumlevel: numMaxlevel,
		tileSize: numTileSize,
		crs: strCrs,
		parameters: {
			version: strVersion,
			// parameters 정보
			// 기본 파라미터 Default list(기본 적용)
			// SERVICE=WMS
			// REQUEST=GetMap
			// FORMAT=image/png
			// VERSION=1.1.0
			// TRANSPARENT=TRUE
			// 그외 추가 파라미터는 Key:value로 입력 시 URL 구성요소로 입력
			// 예제
			//enablePickFeatures: true, 추가 후 URL enablePickFeatures=true& 추가
		}
	};

	let layerList = new Module.JSLayerList(false);		// 레이어 리스트 반환(true : OCTREE, false: TILE)
	let wmslayer = layerList.createWMSLayer(layerId);	// WMS 레이어 생성

	try {
		wmslayer.setWMSProvider(slopeoption);				// WMS 레이어 정보 셋팅
		wmslayer.setBBoxOrder(bBox);
	} catch (e) {
		// console.error(e);
	}
	// setBBoxOrder	[Default false]
	// Request URL에서 BBOX 좌표 위치 설정
	// TRUE  적용 시{ minx, miny, maxx, maxy} : BBOX=229675.631739,	433847.818064,	232773.044569,	437761.304661
	// FALSE 적용 시{ miny, minx, maxy, maxx} : BBOX=433847.818064, 229675.631739,	437761.304661,	232773.044569

	if (bProxy == true) {
		Module.SetProxy("");			// 적용할 프폭시 Server URL(공용)
		wmslayer.setProxyRequest(true);	// 프록시 서버 사용 API
	}
}

/***************************************************** GeoServer WFS ******************************************************/
//WFS 레이어 호출
function loadWFS_3D(layerNm, imgUrl) {
	Module.SetProxy("./proxy.do?url=");
	
	var layerList = new Module.JSLayerList(false);
	var layer = layerList.createWFSLayer(layerNm, 0);
	var url = geo_url + "/wfs?";
	
	// 프록시 사용 지정
	layer.setProxyRequest(true);
	
	// 이 곳에 테스트 중인 wms url을 설정하십시오
	layer.setConnectionWFS(url, 0, "");
	layer.setLevelWFS(7);
	layer.setLayersWFS(layerNm);
	// layer.setWFSPointName("dstDaegu:keycode"); // WFS 데이터 중 POI 텍스트 값으로
	// 출력할 속성 명칭
	layer.setWFSPointPositionLine(true);	// POI 의 수직 라인 생성
	layer.setWMSVersion("1.0.0");
	layer.setRequestFeatureCount(1000);
	// Default 값은 false
	// - false로 설정한 경우 : 최소위도, 최소경도, 최대위도, 최대경도
	// - true로 설정한 경우 : 최소경도, 최소위도, 최대경도, 최대위도
	layer.setBBoxOrder(true);
	
	// WFS 포인트 로드 시 디폴트로 출력할 POI 이미지 지정
	loadIcon(layerNm + "_poi", imgUrl, function(_icon) {
		layer.setWFSPointDefaultIcon(_icon);
	});
	
	// 레이어 가시범위 지정
	Module.setVisibleRange(layerNm, userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
}

/* 포인트 이미지 로드 */
function loadIcon(_iconName, _url, _callback) {

	var icon = Module.getSymbol().getIcon(_iconName);
	if (icon != null) {
		_callback(icon);
	} else {
		 // 이미지 관리 심볼 반환
		var symbol = Module.getSymbol();

		 // 이미지 로드
		var img = new Image();
		img.onload = function() {
	
			 // canvas를 통해 이미지 데이터 생성
			var canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
	
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
	
			var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	
			 // 생성된 아이콘 이미지 콜백 반환
			if (symbol.insertIcon(_iconName, imageData, canvas.width, canvas.height)) {
				_callback(symbol.getIcon(_iconName));
			}
		};
		img.src = _url;
	}   
}

/***************************************************** 3D POI ******************************************************/
// 3D POI 조회 
function loadPOI_3D(layerNm, layerId, tblNm) {
	$.ajax({
		type : "POST",
		url : "/lyr/lyi/selectLayerInfoList.do",
		data : {
			"lyrId" : layerId,
			"tblNm" : tblNm
		},
		dataType : "json",
		async: false,
		success : function(returnData, status){
			var layerList = new Module.JSLayerList(true);
			var layer = layerList.createLayer(layerNm, Module.ELT_3DPOINT);
			var layerInfoList = returnData.layerInfoList;
			
			if(layerInfoList != null){
				for(i=0; i < layerInfoList.length; i++) {
					if(layerInfoList[i].lon != "Infinity"
						&& layerInfoList[i].lat != "Infinity"){						
						var options = {
								layer : layer,
								lon : layerInfoList[i].lon,
								lat : layerInfoList[i].lat,
								text : layerInfoList[i].text,
								markerImage : "./images/poi/" + returnData.poiImg,  
								lineColor : new Module.JSColor(255, 255, 255),
								type : returnData.poiType,
								poiColor : returnData.poiColor,
						}
						
						createLinePoi2(options);
					}	
			    }
			}
		}
	});
}

/***************************************************** CSV ******************************************************/
function loadCsv(layerNm, layerId) {
	var poiType, poiIndex, poiColor;
	var dataid = layerId;
	
	$.ajax({
		type : "POST",
		url : "/lyr/lyi/selectCsvLayerInfo.do",
		data : {
			"dataid" : layerId
		},
		dataType : "json",
		async: false,
		success : function(returnData, status){
			var result = returnData.mapsData;
			
			if(result.poiType == 0){ // 원형
				loadCSV_colData(layerNm, serverUrl + result.metaOutUrl, result.poiColor, 0, 13);
			} else if(result.poiType == 1){  // 이미지
				loadCSV_imgData(layerNm, serverUrl + result.metaOutUrl, result.poiIndex, 0, 13);
			}
		}
	});
}

//CSV 데이터(원형) 호출
function loadCSV_colData(layerId, geoUrl, rgbaVal, min, max){
	// CSV 데이터 POI 이미지 로드
	GLOBAL.POI_image = createPoiCircle(rgbaVal);
	
	// 4번째 파라미터 : POI 선택여부
	Module.XDEMapCreateLayer(layerId, geoUrl, 0, true, true, true, 22, min, max);
	
	// csv 타일 로드 콜백 함수 설정
	var layerList = new Module.JSLayerList(false);
	var layer = layerList.nameAtLayer(layerId);
	
	layer.setUserTileLoadCallback(function(_layerName, _tile, _data) {
		var data = decodeURI(_data);
		
		insertTileObjects(_tile, data, GLOBAL.POI_image, layerId);
	});
}

// CSV 데이터(이미지) 호출
function loadCSV_imgData(layerId, geoUrl, imgIndex, min, max){
	// CSV 데이터 POI 이미지 로드
	createPoiImage(layerId, "./images/symbol/" + String(imgIndex) + "_s.png", function(_image) {
 
		// csv 타일 레이어 로드
		// 4번째 파라미터 : POI 선택여부
		Module.XDEMapCreateLayer(layerId, geoUrl, 0, true, true, true, 22, min, max);

		// csv 타일 로드 콜백 함수 설정
		var layerList = new Module.JSLayerList(false);
		var layer = layerList.nameAtLayer(layerId);
		
		layer.setUserTileLoadCallback(function(_layerName, _tile, _data) {
			var data = decodeURI(_data);

			insertTileObjects(_tile, data, _image, layerId);
		});
	});
}

/* POI 원형 생성 */
function createPoiCircle(rgbaVal) {

	/* POI로 표시 할 점 이미지 생성 */
	var drawCanvas = document.createElement('canvas');
	
	var ctx = drawCanvas.getContext('2d');
	ctx.width = 30;
	ctx.height = 30;
	ctx.clearRect(0, 0, ctx.width, ctx.height);
						
	var x = ctx.width / 2;
	var y = ctx.height / 2;
						
	// 동그라미 마커 이미지 그리기
	ctx.beginPath();
	ctx.arc(x, y, 4, 0, 2*Math.PI, false);
	ctx.fillStyle = rgbaVal;
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'white';
	ctx.stroke();
						
	// 그린 마커 이미지 데이터를 레이어 ID를 사용해 저장
	return {
		data : ctx.getImageData(0, 0, ctx.width, ctx.height).data,
		width : ctx.width,
		height : ctx.height
	}
}

/* POI 이미지 생성 */
function createPoiImage(_iconName, _src, _callback) {

	// 1. 이미지 관리를 수행하는 JSSymbol 객체 반환
    var symbol = Module.getSymbol();

	// 2. 베이스 이미지 로드
	var img = new Image();
	img.onload = function() {

		// 3. canvas를 통해 베이스 이미지 바탕 생성
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		
		// 이미지 데이터 반환
		if (_callback) {
			_callback( {
				data : ctx.getImageData(0, 0, canvas.width, canvas.height).data,
				width : canvas.width,
				height : canvas.height
			})
		}
		
	};
	
	img.src = _src;
}

/* poi 이미지 생성 후 타일에 추가 */
function insertTileObjects(_tile, _csvData, _poiImageData, _layerId) {
	var items = _csvData.split(",");
	var id = "", text = "", lon = "", lat = "", alt;
	var options;
	
	for(var i = 0; i < items.length; i++){
		var item = items[i].split(":");
		var key = item[0];
		var value = item[1];
		
		switch(key){
			case "id" 	: id = value; 	break;
			case "lon" 	: lon = value; 	break;
			case "lat"	: lat = value; 	break;
			case "name" : text = value; break;
		}
	}
	
	if(id != ""){
		alt = Module.Map.getTerrHeightFast(Number(lon), Number(lat));
	}
	
	// POI 생성 후 타일에 추가
	var point = Module.createPoint(id.toString());
	point.setPosition(new Module.JSVector3D(Number(lon), Number(lat), Number(alt)));
	point.setImage(_poiImageData.data, _poiImageData.width, _poiImageData.height);//
	point.setPositionLine(30.0, new Module.JSColor(255, 255, 255));
	point.setText(text);

	_tile.addObject(point);
}