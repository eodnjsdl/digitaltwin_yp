;(function() {	
	initGrphSymbol();
});
var grphLayerList;

var grphLayerListArray=[];
//그리기 도구 ICON심볼 이미지 등록
function initGrphSymbol(){ 
	// POI에 사용될 Icon 관리용 객체인 Symbol 생성
	var symbol= Module.getSymbol();
	
	// POI Icon 생성 
	var grphIconImageURLList = [
		"/images/symbol/1_s.png",
		"/images/symbol/2_s.png",
		"/images/symbol/3_s.png",
		"/images/symbol/4_s.png",
		"/images/symbol/5_s.png",
		"/images/symbol/6_s.png",
		"/images/symbol/7_s.png",
		"/images/symbol/8_s.png",
		"/images/symbol/9_s.png",
		"/images/symbol/10_s.png",
		"/images/symbol/11_s.png",
		"/images/symbol/12_s.png",
		"/images/symbol/13_s.png",
		"/images/symbol/14_s.png",
		"/images/symbol/15_s.png",
		"/images/symbol/16_s.png",
		"/images/symbol/17_s.png",
		"/images/symbol/18_s.png",
		"/images/symbol/19_s.png",
		"/images/symbol/20_s.png",
		"/images/symbol/21_s.png",
		"/images/symbol/22_s.png",
		"/images/symbol/23_s.png",
		"/images/symbol/24_s.png",
		"/images/symbol/25_s.png",
		"/images/symbol/26_s.png",
		"/images/symbol/27_s.png",
		"/images/symbol/28_s.png",
		"/images/symbol/29_s.png",
		"/images/symbol/30_s.png",
		"/images/symbol/31_s.png",
		"/images/symbol/32_s.png",
		"/images/symbol/33_s.png",
		"/images/symbol/34_s.png",
		"/images/symbol/35_s.png",
		];
	
	for (var i=0, len=grphIconImageURLList.length; i<len; i+=1) {
		createIcons(grphIconImageURLList[i], i+1+"_s");
	}

    $.ajax({
      type: "POST",
      url: "/cmt/grph/getImageMarker.do",
      data: null,
      dataType: "html",
      async: false,
      success: (data, status) => {
         var data = JSON.parse(data);
         data =data.data;
         for (var i=0, len=data.length; i<len; i+=1) {
        	 createIcons(data[i].img, data[i].mkrId);
     	}
      },
      complete: function () {
      },
    });

	grphLayerList = new Module.JSLayerList(true);
	Module.XDRenderData();
}

//그리기 도구 3D
function createGrph3D(stringJson,id){
	const geojsonArray = JSON.parse(stringJson);
	grphLayerListArray.push(id);
	
    for(var i=0;i<geojsonArray.features.length;i++){
      	const feature = geojsonArray.features[i];
      	//포인트
      	if(feature.geometry.type=="Point"){
      		if(feature.properties.type=="Text"){
      			createText3DGeoJson(feature,id+"1");
      		}else if(feature.properties.type=="Marker"){
      			createIcon3DGeoJson(feature,id+"2");
      		}else if(feature.properties.type=="Circle"){
      			createCircle3DGeoJson(feature,id+"3");
      		}else{
      			createPoint3DGeoJson(feature,id+"1");
      		}
      		
      	}
      	//라인
      	else if(feature.geometry.type=="LineString"){
      		createLine3DGeoJson(feature,id+"6");
    	}
    	//폴리곤
    	else if(feature.geometry.type=="Polygon"){
    		createPolygon3DGeoJson(feature,id+"6");
      	}
      	//예외
    	else{
			console.log('예외-지오메트리타입 혹은 형식 에러');
    	}
    }
};

//geoJson으로 3D 엔진에 Point 그리기
function createPoint3DGeoJson(feature,id){
	//좌표 변환
	var coord =feature.geometry.coordinates;
		coord = proj4("EPSG:5179", "EPSG:4326", [coord[0],coord[1]]);
	var vPointArr = new Module.Collection();
    var alt = Module.getMap().getTerrHeightFast(coord[0],coord[1]);
	var position = new Module.JSVector3D(coord[0],coord[1],alt);
	vPointArr.add(position);
	//스타일
	var pro =feature.properties;
	var object = Module.createPoint('point');
	
	var strokeColor = feature.properties.pointColor;
	strokeColor=strokeColor.split('rgb(');
	strokeColor=strokeColor[1].split(')');
	strokeColor=strokeColor[0].split(',');
	var strokeColorR = parseInt(strokeColor[0]);
	var strokeColorG = parseInt(strokeColor[1]);
	var strokeColorB = parseInt(strokeColor[2]);
	var lineColor= new Module.JSColor(255,strokeColorR,strokeColorG,strokeColorB);
	
	var fillColor = feature.properties.pointColor;
	fillColor=fillColor.split('rgb(');
	fillColor=fillColor[1].split(')');
	fillColor=fillColor[0].split(',');
	var fillColorR = parseInt(fillColor[0]);
	var fillColorG = parseInt(fillColor[1]);
	var fillColorB = parseInt(fillColor[2]);
	var fillColor= new Module.JSColor(255,fillColorR,fillColorG,fillColorB);
	var size =parseInt(pro.pointSize)*2;
	if(size>50){size=50};	
	
	object.setFontStyle( "맑은고딕",
			size, 
			 100, fillColor, lineColor);
	object.setPosition(vPointArr.pop());
	switch(pro.shapeType){
	case "Circle":
		var txt = '●';
		break
	case "Rectangle":
		var txt = '■';	
		break;
	case "Triangle" :
		var txt = '▲';
		break;
	case "Star" :
		var txt = '★';
		break;
	case "Cross" :
		var txt = '+';
		break;
	case "X" :
		var txt = 'X';
		break;
	}
	object.setText(txt);
	var layer = grphLayerList.createLayer("grphlayer"+id, 6);
	layer.setMaxDistance(GLOBAL.MaxDistance);
	// 오브젝트 추가
	layer.addObject(object, 0);
}

//geoJson으로 3D 엔진에 원 그리기
function createCircle3DGeoJson(feature,id){
	//좌표 변환
	var coord =feature.geometry.coordinates;
		coord = proj4("EPSG:5179", "EPSG:4326", [coord[0],coord[1]]);
	var vPointArr = new Module.Collection();
	//ELT_PLANE 오브젝트는 굳이 높이 값을 줄 필요가 없다
    /*var alt = Module.getMap().getTerrHeightFast(coord[0],coord[1]);*/
	var position = new Module.JSVector3D(coord[0],coord[1],0);
	vPointArr.add(position);

	var pro =feature.properties;
	var object = Module.createPoint('point');

	var strokeOpacity = feature.properties.strokeOpacity;
	strokeOpacity = strokeOpacity/100 * 255;

	var strokeColor = feature.properties.strokeColor;
	strokeColor=strokeColor.split('rgb(');
	strokeColor=strokeColor[1].split(')');
	strokeColor=strokeColor[0].split(',');
	var strokeColorR = parseInt(strokeColor[0]);
	var strokeColorG = parseInt(strokeColor[1]);
	var strokeColorB = parseInt(strokeColor[2]);
	var lineColor= new Module.JSColor(strokeOpacity,strokeColorR,strokeColorG,strokeColorB);	
	
	var fillColor = feature.properties.fillColor;
	fillColor=fillColor.split('rgb(');
	fillColor=fillColor[1].split(')');
	fillColor=fillColor[0].split(',');
	var fillColorR = parseInt(fillColor[0]);
	var fillColorG = parseInt(fillColor[1]);
	var fillColorB = parseInt(fillColor[2]);
	var fillColor= new Module.JSColor(255,fillColorR,fillColorG,fillColorB);
	
	var strokeWidth = feature.properties.strokeWidth;
	strokeWidth = parseInt(strokeWidth);


	var object = new Module.createPolygon("polygon");
	var polygonStyle = new Module.JSPolygonStyle();
	polygonStyle.setFill(true);
	polygonStyle.setFillColor(fillColor);
	polygonStyle.setOutLine(true);
	polygonStyle.setOutLineWidth(strokeWidth);
	polygonStyle.setOutLineColor(lineColor);
	object.setStyle(polygonStyle);

	object.setCircle(vPointArr.pop(),feature.properties.circleRadius , 20);

	var layer = grphLayerList.createLayer("grphlayer"+id, Module.ELT_PLANE);
	layer.setMaxDistance(GLOBAL.MaxDistance);
	// 오브젝트 추가
	layer.addObject(object, 0);
}


//geoJson으로 3D 엔진에 TEXT 그리기
function createText3DGeoJson(feature,id){
	//좌표 변환
	var coord =feature.geometry.coordinates;
		coord = proj4("EPSG:5179", "EPSG:4326", [coord[0],coord[1]]);
	var vPointArr = new Module.Collection();
    var alt = Module.getMap().getTerrHeightFast(coord[0],coord[1]);
	var position = new Module.JSVector3D(coord[0],coord[1],alt);
	vPointArr.add(position);
	//스타일
	var pro =feature.properties;
	var object = Module.createPoint('point');
	
	var strokeColor = feature.properties.strokeColor;
	strokeColor=strokeColor.split('rgb(');
	strokeColor=strokeColor[1].split(')');
	strokeColor=strokeColor[0].split(',');
	var strokeColorR = parseInt(strokeColor[0]);
	var strokeColorG = parseInt(strokeColor[1]);
	var strokeColorB = parseInt(strokeColor[2]);
	var lineColor= new Module.JSColor(255,strokeColorR,strokeColorG,strokeColorB);
	
	var fillColor = feature.properties.fillColor;
	fillColor=fillColor.split('rgb(');
	fillColor=fillColor[1].split(')');
	fillColor=fillColor[0].split(',');
	var fillColorR = parseInt(fillColor[0]);
	var fillColorG = parseInt(fillColor[1]);
	var fillColorB = parseInt(fillColor[2]);
	var fillColor= new Module.JSColor(255,fillColorR,fillColorG,fillColorB);
	
	object.setFontStyle( pro.fontFamily,
			pro.fontSize, 
			 300, fillColor, lineColor);
	object.setPosition(vPointArr.pop());
	object.setText(pro.text);
	var layer = grphLayerList.createLayer("grphlayer"+id, 6);
	layer.setMaxDistance(GLOBAL.MaxDistance);

	layer.addObject(object, 0);
}

//geoJson으로 3D 엔진에 ICON 그리기
function createIcon3DGeoJson(feature,id){
	//좌표 변환
	var coord =feature.geometry.coordinates;
		coord = proj4("EPSG:5179", "EPSG:4326", [coord[0],coord[1]]);
	var vPointArr = new Module.Collection();
    var alt = Module.getMap().getTerrHeightFast(coord[0],coord[1]);
	var position = new Module.JSVector3D(coord[0],coord[1],alt);
	vPointArr.add(position);
	
	
	// POI에 사용될 Icon 관리용 객체인 Symbol 생성
	var symbol= Module.getSymbol();
	// 심볼 이름 
	var iconName = feature.properties.sid;
	
	if(symbol.getIcon(iconName)==null){
		var imgsrc = feature.properties.src;
		// POI Icon 생성
		var icon = createIcons(imgsrc, iconName);
	}else{
		var icon = symbol.getIcon(iconName);
	}
	var scale = parseInt(feature.properties.scale);
	
	var object = Module.createPoint('icon');
	object.setPosition(vPointArr.pop());
	object.setIcon(icon);
	var layer = grphLayerList.createLayer("grphlayer"+id, 6);
	layer.setMaxDistance(GLOBAL.MaxDistance);

	layer.addObject(object, 0);
}

//geoJson으로 3D 엔진에 라인 그리기
function createLine3DGeoJson(feature,id){
	//좌표 변환
	var coord = transformGeoJsonArr(feature);
	var vPointArr = new Module.Collection();
	for(var i=0;i<coord.length;i++){
    /*var alt = Module.getMap().getTerrHeightFast(coord[i][0],coord[i][1])*/;
	var position = new Module.JSVector3D(coord[i][0],coord[i][1],0);
	vPointArr.add(position);
	}

	var strokeOpacity = feature.properties.strokeOpacity;
	strokeOpacity = strokeOpacity/100 * 255;

	var strokeColor = feature.properties.strokeColor;
	strokeColor=strokeColor.split('rgb(');
	strokeColor=strokeColor[1].split(')');
	strokeColor=strokeColor[0].split(',');
	var strokeColorR = parseInt(strokeColor[0]);
	var strokeColorG = parseInt(strokeColor[1]);
	var strokeColorB = parseInt(strokeColor[2]);
	var lineColor= new Module.JSColor(strokeOpacity,strokeColorR,strokeColorG,strokeColorB);	

	var strokeWidth = feature.properties.strokeWidth;
	strokeWidth = parseInt(strokeWidth);

	var object = new Module.createLineString("line");

	object.setUnionMode(true);
	if(feature.properties.strokeLineDash=="DOT"||feature.properties.strokeLineDash=="DASHED"||
			feature.properties.strokeLineDash=="DASH-DOTTED"||feature.properties.strokeLineDash=="DASH-DOUBLE-DOTTED"){
	object.SetLineType(4);
	object.SetDashType(6);
	}
	
	if(feature.properties.strokeStartArrow||feature.properties.strokeEndArrow){
		object.SetLineType(3);
	}
	
	if(feature.properties.strokeStartArrow&&feature.properties.strokeEndArrow){
		object.SetLineType(3);
	}
	
	var lineStyle = new Module.JSPolyLineStyle();
			
	lineStyle.setColor(lineColor);
	lineStyle.setWidth(strokeWidth);
	object.setStyle(lineStyle);	
			
	object.setCoordinates(vPointArr);
	var layer = grphLayerList.createLayer("grphlayer"+id, Module.ELT_3DLINE);
	layer.setMaxDistance(GLOBAL.MaxDistance);
	// 오브젝트 추가
	layer.addObject(object, 0);
}


//geoJson으로 3D 엔진에 폴리곤 그리기
function createPolygon3DGeoJson(feature,id){
	//좌표 변환
	var coord = transformGeoJsonArr2(feature);
	var vPointArr = new Module.Collection();
	for(var i=0;i<coord.length;i++){
	//ELT_PLANE 오브젝트는 굳이 높이 값을 줄 필요가 없다
    /*var alt = Module.getMap().getTerrHeightFast(coord[i][0],coord[i][1]);*/
	var position = new Module.JSVector3D(coord[i][0],coord[i][1],0);
	vPointArr.add(position);
	}
	
	var strokeOpacity = feature.properties.strokeOpacity;
	strokeOpacity = strokeOpacity/100 * 255;

	var strokeColor = feature.properties.strokeColor;
	strokeColor=strokeColor.split('rgb(');
	strokeColor=strokeColor[1].split(')');
	strokeColor=strokeColor[0].split(',');
	var strokeColorR = parseInt(strokeColor[0]);
	var strokeColorG = parseInt(strokeColor[1]);
	var strokeColorB = parseInt(strokeColor[2]);
	var lineColor= new Module.JSColor(strokeOpacity,strokeColorR,strokeColorG,strokeColorB);	
	

	var fillColor = feature.properties.fillColor;
	fillColor=fillColor.split('rgb(');
	fillColor=fillColor[1].split(')');
	fillColor=fillColor[0].split(',');
	var fillColorR = parseInt(fillColor[0]);
	var fillColorG = parseInt(fillColor[1]);
	var fillColorB = parseInt(fillColor[2]);
	var fillColor= new Module.JSColor(strokeOpacity,fillColorR,fillColorG,fillColorB);
	
	var strokeWidth = feature.properties.strokeWidth;
	strokeWidth = parseInt(strokeWidth);
	
	var object = new Module.createPolygon("polygon");

	var polygonStyle = new Module.JSPolygonStyle();

	polygonStyle.setFill(true);
	polygonStyle.setFillColor(fillColor);		
	
	polygonStyle.setOutLine(true);
	polygonStyle.setOutLineColor(lineColor);
	
	object.setStyle(polygonStyle);	
			
	object.setCoordinates(vPointArr);
	var layer = grphLayerList.createLayer("grphlayer"+id, Module.ELT_PLANE);
	layer.setMaxDistance(GLOBAL.MaxDistance);
	// 오브젝트 추가
	layer.addObject(object, 0);
}


/* 아이콘 객체(JSIcon) 생성 후 Symbol에 추가 */
function createIcons(_url, _iconName) {
	
	var img = new Image();
	
	// POI 이미지 로드
	img.onload = function(){
		
		// canvas를 통해 이미지 데이터 생성
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
		
		// Symbol에 새 아이콘 추가
		var bResult = Module.getSymbol().insertIcon(_iconName, imageData, canvas.width, canvas.height);

	};
	img.src = _url;
}


//좌표변환 5179->4326
function transformGeoJsonArr(geojson){
	var coord =geojson.geometry.coordinates;
	for(var i=0; i<coord.length;i++){
		coord[i] = proj4("EPSG:5179", "EPSG:4326", [coord[i][0],coord[i][1]]);
	}
	return coord;
}

//좌표변환 5179->4326
function transformGeoJsonArr2(geojson){
	var coord =geojson.geometry.coordinates[0];
	for(var i=0; i<coord.length;i++){
		coord[i] = proj4("EPSG:5179", "EPSG:4326", [coord[i][0],coord[i][1]]);
	}
	return coord;
}

function removeGrphLayer(){
	for(var i = 0; i < grphLayerListArray.length; i++){
		if(grphLayerList.nameAtLayer('grphlayer'+grphLayerListArray[i]+'1')!=null){
			grphLayerList.delLayerAtName('grphlayer'+grphLayerListArray[i]+'1');
		}
		if(grphLayerList.nameAtLayer('grphlayer'+grphLayerListArray[i]+'2')!=null){
			grphLayerList.delLayerAtName('grphlayer'+grphLayerListArray[i]+'2');
		}
		if(grphLayerList.nameAtLayer('grphlayer'+grphLayerListArray[i]+'3')!=null){
			grphLayerList.delLayerAtName('grphlayer'+grphLayerListArray[i]+'3');
		}
		if(grphLayerList.nameAtLayer('grphlayer'+grphLayerListArray[i][i]+'5')!=null){
			grphLayerList.delLayerAtName('grphlayer'+grphLayerListArray[i]+'5');
		}
		if(grphLayerList.nameAtLayer('grphlayer'+grphLayerListArray[i]+'6')!=null){
			grphLayerList.delLayerAtName('grphlayer'+grphLayerListArray[i]+'6');
		}
	}
	grphLayerListArray=[];
}

function removeGrphLayerIndividual(id){
	delArr(id);
	if(grphLayerList.nameAtLayer('grphlayer'+id+'1')!=null){
		grphLayerList.delLayerAtName('grphlayer'+id+'1');
	}
	if(grphLayerList.nameAtLayer('grphlayer'+id+'2')!=null){
		grphLayerList.delLayerAtName('grphlayer'+id+'2');
	}
	if(grphLayerList.nameAtLayer('grphlayer'+id+'3')!=null){
		grphLayerList.delLayerAtName('grphlayer'+id+'3');
	}
	if(grphLayerList.nameAtLayer('grphlayer'+id+'5')!=null){
		grphLayerList.delLayerAtName('grphlayer'+id+'5');
	}
	if(grphLayerList.nameAtLayer('grphlayer'+id+'6')!=null){
		grphLayerList.delLayerAtName('grphlayer'+id+'6');
	}
}

function delArr(id){
	if(grphLayerListArray.length!=0){
		for(var i = 0; i < grphLayerListArray.length; i++) {
			if(grphLayerListArray[i] === id)  {
				grphLayerListArray.splice(i, 1);
			 i--;
			}
		}
	}
}

//틸트 적용 커스텀 _박규호
function setTiltCustom(_targetTilt) {

    if (_targetTilt < -90.0 || _targetTilt > 90.0) {
        return;
    }
    
    var map = Module.getMap();
    var screenCenterX = parseInt(window.innerWidth * 0.5);
    var screenCenterY = parseInt(window.innerHeight * 0.5);
    var mapCenter = map.ScreenToMapPointEX(new Module.JSVector2D(screenCenterX, screenCenterY));
    
    var camera = Module.getViewCamera();
    var targetTilt = _targetTilt * (Math.PI / 180.0);
    var distance = map.GetPointDistance(mapCenter, camera.getLocation(), false);
    var t = distance * Math.cos(targetTilt);
    var cameraPosition = map.getPositionByAngleDistance3D(mapCenter, t, camera.getDirect()+180.0);
    var altitude = distance * Math.sin(targetTilt);
    cameraPosition.Altitude += altitude;
    
    camera.look(cameraPosition, mapCenter);
}

//geojson bbox 생성_박규호 
function  customfromGeoJSON(geojson, grphcId) {
	const map1 = new ol.Map();
	const format = new ol.format.GeoJSON();
    const features = format.readFeatures(geojson).map((feature) => {
      const cloned = feature.clone();
      cloned.set("grphcId", grphcId);
      if (feature.get("type") == "Circle") {
        const geometry = cloned.getGeometry();
        cloned.setGeometry(
          new ol.geom.Circle(
            geometry.getCoordinates(),
            feature.get("circleRadius")
          )
        );
      }
      return cloned;
    });
    
    var source = new ol.source.Vector();
    source.addFeatures(features);
    const view = map1.getView();
    const max = [];
    for (let i = 0, len = features.length; i < len; i++) {
      const feature = features[i];
      const extent = feature.getGeometry().getExtent();
      if (i == 0) {
        max[0] = extent[0];
        max[1] = extent[1];
        max[2] = extent[2];
        max[3] = extent[3];
      } else {
        if (max[0] > extent[0]) max[0] = extent[0];
        if (max[1] > extent[1]) max[1] = extent[1];
        if (max[2] < extent[2]) max[2] = extent[2];
        if (max[3] < extent[3]) max[3] = extent[3];
      }
    }
    
    var coordMin = proj4("EPSG:5179", "EPSG:4326", [max[0], max[1]]);
    var coordMax = proj4("EPSG:5179", "EPSG:4326", [max[2], max[3]]);

    var json = {
      boundary: {
        min: new Module.JSVector2D(coordMin[0]-0.01, coordMin[1]-0.01), // 좌하단
        max: new Module.JSVector2D(coordMax[0]+0.01, coordMax[1]+0.01), // 우상단
      },
      animation:false,
      complete: function () {
    	  var alt = Module.getViewCamera().getAltitude();
          if (alt < 600) {
            //bbox가 너무 작으므로 지도가 너무 확대되서 어쩔 수 없이 체크 후 고도값 설정 _박규호
            Module.getViewCamera().setAltitude(600);
          }
      },
    };
    Module.getViewCamera().moveLonLatBoundarybyJson(json); // 성공 시 success 반환 실패 시 실패 오류 반환
}