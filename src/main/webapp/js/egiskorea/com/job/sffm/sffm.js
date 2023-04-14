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
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.on('drawend', onDrawEnd);
}
function onDrawEnd(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
    console.log(position);
    var transformedPosition = ol.proj.transform([position[0],position[1]],'EPSG:5179','EPSG:4326');
    console.log(transformedPosition);
    $('#lon').val(transformedPosition[0].toFixed(7));
    $('#lat').val(transformedPosition[1].toFixed(7));
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	cmmUtil.reverseGeocoding(xObj, yObj).done((result)=>{
		$("#adres").val("경기도 양평군 "+result["address"]);
        console.log(result);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#geom").val(wkt);
	});
}


