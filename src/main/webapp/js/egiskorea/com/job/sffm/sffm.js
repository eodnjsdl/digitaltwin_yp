$(document.body).ready(function(){
    $.datepicker.setDefaults({
        changeYear: true,
        changeMonth: true,
        yearRange: 'c-30:c'
    });

})

// 시설물 변경
$("#safeFacilityType").change(function() {
    ui.closeSubPopup();
    dtmap.draw.setBuffer(0);    //버퍼 영역 초기화
    dtmap.draw.dispose();		//그리기 포인트 삭제
    dtmap.draw.clear();			//그리기 초기화

    if(this.value == "lamp") {
        
        SFFMspitalYN = '';
        aj_selectSafetyFacilitiesMngList();
    } else {
       
        CCTVspitalYN = '';
        aj_selectCctvList($("#searchForm")[0]);
    }
});

//지도에서 선택 _ 주소 및 경위도 위치 가져오기
function fn_getLocation() {
	dtmap.off('select');//레이어 선택 이벤트 해제
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.on('drawend', onDrawEnd);
}
function onDrawEnd(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
    var modPosition;
    if(dtmap.mod=='2D'){
        modPosition = ol.proj.transform([position[0],position[1]],'EPSG:5179','EPSG:4326');
    }else{
        modPosition = position;
    }
    $('#lon').val(modPosition[0].toFixed(7));
    $('#lat').val(modPosition[1].toFixed(7));
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#adres").val("경기도 양평군 "+result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#geom").val(wkt);
	});
    dtmap.on('select',spaceClickListener );
}

//레이어 선택 상세보기
function spaceClickListener(e){
	var gid ;
	if (dtmap.mod === '3D'){
		gid=e.property.gid;
	}else{
		gid=e.property.gid;
	}
    fn_pageDetail(gid);
    dtmap.vector.select(e.id);
}


