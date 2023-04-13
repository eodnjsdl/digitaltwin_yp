/**
 * - 공간정보 편집도구
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("editView.js");
	console.log("공간정보 편집도구");
	
});

//functions

//공간정보 편집도구
function geoEditBindEvents(obj) {
	console.log("geoEditBindEvents(obj)");
	console.log(obj);
	
	if(obj.id){
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
		
	}
	
	const that = obj;

    // 닫기
    $(".space-edit-tool .editView-popup-close").on("click", function () {
    	//그리기 해제
        dtmap.draw.dispose();
        dtmap.draw.clear();
        
        $(".space-edit-tool").hide();
        $(".space-edit-tool").empty();
        
    });

    // 스냅
    $(".edit-btn-snap").on("click", function () {
    	alert("스냅");
        const featureType = $("[name=edit-snap-target]", that.selector).val();
        console.log("featureType>>"+featureType);
        if (featureType) {
        	/*
        	* //스냅레이어 설정
            * dtmap.draw.setSnapLayer('digitaltwin:lsmd_cont_ldreg_41830');
            *
            * //스냅레이어 클리어
            * dtmap.draw.clearSnapLayer();
        	*/
        	var layerName = "digitaltwin:"+featureType;
        	dtmap.draw.setSnapLayer(layerName);
            
            //toastr.warning("cmmUtil.highlightSnapLayer(featureType);", "객체 스내핑 모드");
        } else {
            alert("스냅할 대상을 선택하여 주십시오.");
        }
    });

    // 객체 추가
    $(".edit-btn-add").on("click", function () {
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
        		dtmap.on('drawend', _onDrawEnd_wtlFirePsGeom);
        	}else if(type == "LineString"){
        		toastr.warning("그리기 LineString 작업중", "객체 그리기 모드");
        	}else if(type == "Polygon"){
        		toastr.warning("그리기 Polygon 작업중", "객체 그리기 모드");
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
            toastr.warning("cmmUtil.removeEditGeometry();", "객체 삭제 모드");
        }
    });

    // 좌표 추가
    $(".edit-add-coordinate").on("click", function () {
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
    });

    // 적용
    $(".edit-btn-apply").on("click", function () {
        
        //위경도 좌표계에 있는 좌표를 등록 페이지에 적용
        var xObj = $(".space-edit-tool .edit-x").val();
        var yObj = $(".space-edit-tool .edit-y").val();
        
        var xObj = parseFloat(xObj);
		var yObj = parseFloat(yObj);
        
    	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
			$(".txt-geometry-address").val(result["address"]);
			const format = new ol.format.WKT();
			const point = new ol.geom.Point([xObj, yObj]);
			const wkt = format.writeGeometry(point);
			$("input[name=geom]").val(wkt);
			
			$(".space-edit-tool").hide();
		});
        
    });
    
}

//위경도 좌표계에 표시
function _onDrawEnd_wtlFirePsGeom(e){
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	
	$(".space-edit-tool .edit-x").val(xObj);
	$(".space-edit-tool .edit-y").val(yObj);
}
