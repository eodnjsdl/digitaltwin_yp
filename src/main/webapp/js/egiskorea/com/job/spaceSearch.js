/** 업무에서 공간 검색 또는 좌표획득에 필요한 함수들을 정의 한다. **/

// 맵 지도 클릭지점 좌표값 리턴(클릭이벤트 등록/삭제) 
function getPositionPoint(callback){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		const yMap = app2D.getYMap();
		const select = yMap.getModule("select");
		select.once("Point", "drawend", true).done((event) => {
			const feature = event.feature;
			const lonlat = ol.proj.toLonLat(feature.getGeometry().getCoordinates());
			var position = ol.proj.transform(lonlat, 'EPSG:4326', 'EPSG:5179');
			callback(parseFloat(position[0]), parseFloat(position[1])); 
		});
	}else{
		Module.canvas.onclick = function(e) {	
			var Projection=Module.getProjection();
			var positionString = Module.GetClickPosition();
			var position = positionString.split("_");      
			var pointX = Number(position[0]); //x 좌표
			var pointY = Number(position[1]); //y 좌표
			var alt = Module.getMap().getTerrHeightFast(pointX,pointY);
			// 클릭이벤트 제거
			Module.canvas.onclick = "";
			var position = TransformCoordinate(pointX, pointY, 13, 26);
	
			callback(parseFloat(position.x), parseFloat(position.y), parseFloat(alt));     
		};
	}
}

// 맵 지도 클릭지점 point geom으로 리턴(클릭이벤트 등록/삭제) 
function getPositionGeom(callback){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		const yMap = app2D.getYMap();
		const select = yMap.getModule("select");
		select.once("Point", "drawend", true).done((event) => {
			const feature = event.feature;
			const lonlat = ol.proj.toLonLat(feature.getGeometry().getCoordinates());
			var position = ol.proj.transform(lonlat, 'EPSG:4326', 'EPSG:5179');
			callback("POINT("+parseFloat(position[0])+" "+parseFloat(position[1])+")"); 
		});
		
	}else{
		Module.canvas.onclick = function(e) {	
			var Projection=Module.getProjection();
			var positionString = Module.GetClickPosition();
			var position = positionString.split("_");      
			var pointX = Number(position[0]); //x 좌표
			var pointY = Number(position[1]); //y 좌표
			var alt = Module.getMap().getTerrHeightFast(pointX,pointY);
			// 클릭이벤트 제거
			Module.canvas.onclick = "";
			var position = TransformCoordinate(pointX, pointY, 13, 26);
			callback("POINT("+parseFloat(position.x)+" "+parseFloat(position.y)+")");     
		};
	}
}
