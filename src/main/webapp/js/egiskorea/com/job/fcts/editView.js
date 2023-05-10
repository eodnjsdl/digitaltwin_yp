/**
 * - 공간정보 편집도구
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("editView.js");
	//console.log("공간정보 편집도구");
	
	
	dtmap.draw.setBuffer(0);	//버퍼 적용 초기화
	
});

//functions

//공간정보 편집도구
function geoEditBindEvents(obj) {
	//console.log("geoEditBindEvents(obj)");
	//console.log(obj);
	
	/*if(obj.id){
		var id = obj.id;
		var detailData = getGridDetailData(id);
		//console.log(detailData);
		if(detailData){
			var geomObj = detailData.geomObj;
			
			if(geomObj){
				var x = geomObj.coordinates[0];
				var y = geomObj.coordinates[1];
				
				$(".space-edit-tool .edit-x").val(x);
				$(".space-edit-tool .edit-y").val(y);
			}
		}
		
	}*/
	
	const that = obj;

    // 닫기
    $(".space-edit-tool .editView-popup-close").on("click", function () {
    	//그리기 해제
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
    	clearSpaceEditTool();	//초기화
    });

    // 스냅
    $(".edit-btn-snap").on("click", function () {
        const featureType = $("[name=edit-snap-target]", that.selector).val();
        //console.log("featureType>>"+featureType);
        if (featureType) {
        	var layerName = "digitaltwin:"+featureType;
        	dtmap.draw.setSnapLayer(layerName);
        } else {
            alert("스냅할 대상을 선택하여 주십시오.");
        }
    });

    // 객체 추가
    $(".edit-btn-add").on("click", function () {
    	//console.log("객체추가");
        let type = null;
        if (that.geometryType == "point" || that.geometryType == "multipoint") {
            type = "Point";
        } else if (
            that.geometryType == "linestring" ||
            that.geometryType == "multilinestring"
        ) {
            type = "LineString";
        } else if (
            that.geometryType == "polygon" ||
            that.geometryType == "multipolygon"
        ) {
            type = "Polygon";
        } else {
            console.log(`지원되지 않는 공간 타입입니다.`);
        }

        if (type) {

        	if(type == "Point"){
        		dtmap.draw.active({type: 'Point', once: true});
        		dtmap.on('drawend', _onDrawEnd_pointGeom);
        	}else if(type == "LineString"){
        		dtmap.draw.active({type: 'LineString', once: true});
        		dtmap.on('drawend', _onDrawEnd_lineGeom);
        	}else if(type == "Polygon"){
        		dtmap.draw.active({type: 'Polygon', once: true});
        		dtmap.on('drawend', _onDrawEnd_polygonGeom);
        	}
        }
    });

    // 객체 수정
    $(".edit-btn-modify").on("click", function () {
        // cmmUtil.modifyEditGeometry();
        toastr.warning("cmmUtil.modifyEditGeometry();", "객체 수정 모드");
    });

    // 객체 삭제
    $(".edit-btn-remove").on("click", function () {
        if (confirm("객체를 삭제하시겠습니까?")) {
            // cmmUtil.removeEditGeometry();
        	dtmap.draw.clear();
            //toastr.warning("cmmUtil.removeEditGeometry();", "객체 삭제 모드");
        }
    });

    // 좌표 추가
    $(".edit-add-coordinate").on("click", function () {
    	/*
        const xNode = $(".edit-x", that.selector);
        const yNode = $(".edit-y", that.selector);
        if (xNode.val() && yNode.val()) {
            const format = new ol.format.WKT();
            const x = xNode.val();
            const y = yNode.val();
            const point = new ol.geom.Point([x, y]);
            const wkt = format.writeGeometry(
                point.transform("EPSG:4326", store.getPrj())
            );
            // cmmUtil.addEditGeometry(wkt);
            toastr.warning("cmmUtil.addEditGeometry(wkt);", "객체 추가");
        } else {
            if (!xNode.val()) {
                xNode.focus();
            } else if (!yNode.val()) {
                yNode.focus();
            }
            alert("좌표를 입력하여 주십시오.");
        }
        */
    	///////////////
    	const xNode = $(".edit-x", that.selector);
        const yNode = $(".edit-y", that.selector);
    	
        if (xNode.val() && yNode.val()) {
            const format = new ol.format.WKT();
            const x = xNode.val();
            const y = yNode.val();
            const point = new ol.geom.Point([x, y]);
            const wkt = format.writeGeometry(
                point.transform("EPSG:4326", "EPSG:5179")
            );
            
            //console.log(wkt);

            //임시 공간에 포인트 WKT 저장
            $(".pointTempGeomWKT").val(wkt);

            //화면에 임시 포인트(점) 표시
            /*dtmap.vector.addPoint({
        	  id: 'tempPoint',
        	  coordinates: [x, y],
        	  crs: 'EPSG:4326',
        	});*/
           
        } else {
            if (!xNode.val()) {
                xNode.focus();
            } else if (!yNode.val()) {
                yNode.focus();
            }
            alert("좌표를 입력하여 주십시오.");
        }
    });

    // 적용
    $(".edit-btn-apply").on("click", function () {
    	//console.log(".edit-btn-apply");
    	
    	let geom = ""
    		
    	if (
    		that.geometryType == "point" || 
    		that.geometryType == "multipoint"
    	) {
    		 geom = $(".pointTempGeomWKT").val();
        } else if (
            that.geometryType == "linestring" ||
            that.geometryType == "multilinestring"
        ) {
        	geom = $(".lineTempGeomWKT").val();
        } else if (
            that.geometryType == "polygon" ||
            that.geometryType == "multipolygon"
        ) {
        	geom = $(".polygonTempGeomWKT").val();
        } else {
            console.log(`지원되지 않는 공간 타입입니다.`);
        }
    	
    	if(!geom){
    		alert("입력된 좌표값이 없습니다");
    		return false;
    	}
        
        //위경도 좌표계에 있는 좌표를 등록 페이지에 적용
        /*var xObj = $(".space-edit-tool .edit-x").val();
        var yObj = $(".space-edit-tool .edit-y").val();
        
        if(xObj == "" || yObj == ""){
        	alert("적용할 좌표가 없습니다.");
        	return false;
        }
        
        var xObj = parseFloat(xObj);
		var yObj = parseFloat(yObj);
        
    	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
    		
			$(".txt-geometry-address").val(result["address"]);
			const format = new ol.format.WKT();
			const point = new ol.geom.Point([xObj, yObj]);
			//console.log(point);
			const wkt = format.writeGeometry(point);
			$("input[name=geom]").val(wkt);
			
			clearSpaceEditTool();	//초기화
		});*/
    	
    	const formatWKT = new ol.format.WKT();
		let geometry = formatWKT.readGeometry(geom);
		
		let coordinate = null;
		//console.log(geometry);
		
        if (geometry instanceof ol.geom.Point) {
            coordinate = geometry.getCoordinates();
        } else if (geometry instanceof ol.geom.MultiPoint) {
            coordinate = geometry.getPoint(0).getCoordinates();
        } else if (geometry instanceof ol.geom.LineString) {
            coordinate = geometry.getCoordinateAt(0.5);
        } else if (geometry instanceof ol.geom.MultiLineString) {
            coordinate = geometry.getLineString(0).getCoordinateAt(0.5);
        } else if (geometry instanceof ol.geom.Polygon) {
            coordinate = ol.extent.getCenter(geometry.getExtent());
        } else if (geometry instanceof ol.geom.MultiPolygon) {
            coordinate = ol.extent.getCenter(geometry.getPolygon(0).getExtent());
        } else {
            console.log(`정의되지 않은 공간 타입입니다.`);
        }
        
        reverseGeocoding(coordinate[0], coordinate[1]).done((result) => {
        	
        	$(".txt-geometry-address").val(result["address"]);
			//const format = new ol.format.WKT();
			//const point = new ol.geom.Point(coordinate[0], coordinate[1]);
			//console.log(point);
			//const wkt = format.writeGeometry(point);
			
			//console.log(geom);
			$("input[name=geom]").val(geom);
			
			clearSpaceEditTool();	//초기화
	     });
        
    });
    
}

//점 그리기 좌표 처리(위경도 좌표계에 표시)
function _onDrawEnd_pointGeom(e){
	//console.log("_onDrawEnd_pointGeom(e)");
	//console.log(e);
	
	dtmap.draw.dispose();	//그리기 해제
	
	var geom = e.geometry;
	
	//포인트 WKT 저장
	const format = new ol.format.WKT();
    let pointWKT = format.writeGeometry(geom);
	
	var pointTempGeomWKT = pointWKT;

	$(".pointTempGeomWKT").val(pointTempGeomWKT);
	
	dtmap.off('drawend', _onDrawEnd_pointGeom);	//이벤트 해제
}

//선 그리기 좌표 처리 
function _onDrawEnd_lineGeom(e){
	//console.log("_onDrawEnd_lineGeom(e)");
	//console.log(e);
	
	dtmap.draw.dispose();	//그리기 해제
	
	var geom = e.geometry;
	
	const format = new ol.format.WKT();
    let lineWKT = format.writeGeometry(geom);
    
    if(lineWKT.toLowerCase().indexOf("multi") == -1){	//multi 가 없으면 text 수정  : MULTILINESTRING(( ~ )) 형태로 변경
    	 lineWKT = "MULTI" + lineWKT;
    	 lineWKT = lineWKT.replaceAll('(', '((');
    	 lineWKT = lineWKT.replaceAll(')', '))');
    }
    
    var lineTempGeomWKT = lineWKT;

    $(".lineTempGeomWKT").val(lineTempGeomWKT);

    dtmap.off('drawend', _onDrawEnd_lineGeom); //이벤트 해제
}

//면 그리기 좌표 처리 
function _onDrawEnd_polygonGeom(e){
	//console.log("_onDrawEnd_polygonGeom(e)");
	//console.log(e);
	
	dtmap.draw.dispose();	//그리기 해제
	
	var geom = e.geometry;
	
	const format = new ol.format.WKT();
    let polygonWKT = format.writeGeometry(geom);
    
    if(polygonWKT.toLowerCase().indexOf("multi") == -1){	//multi 가 없으면 text 수정  : MULTIPOLYGON((( ~ ))) 형태로 변경
    	polygonWKT = "MULTI" + polygonWKT;
    	polygonWKT = polygonWKT.replaceAll('((', '(((');
    	polygonWKT = polygonWKT.replaceAll('))', ')))');
    }
    
    var polygonTempGeomWKT = polygonWKT;
    $(".polygonTempGeomWKT").val(polygonTempGeomWKT);
	
	dtmap.off('drawend', _onDrawEnd_polygonGeom); //이벤트 해제
}


//공간정보 편집도구
function clearSpaceEditTool(){
    
	dtmap.draw.dispose();		//그리기 포인트 삭제
	
    //스냅레이어 클리어
    dtmap.draw.clearSnapLayer();
    
    if($(".space-edit-tool").hasClass("opened")){
    	$(".space-edit-tool").removeClass("opened");
    }
    
    $(".space-edit-tool").empty();
}