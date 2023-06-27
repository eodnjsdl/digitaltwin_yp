//jquery
$(document).ready(function(){
	//console.log("selectTransportationVulnerabilityList.jsp");
	//console.log("교통분석 - 대중교통 취약 분석");
	
	if(dtmap.mod == '3D'){
		$(".travInfoListDiv").css("max-height", "700px");
		$(".travInfoListDiv").css("height", "700px");
		$(".scroll-y").mCustomScrollbar({
		    scrollbarPosition: "outside",
		});
	}		
	
	//검색 조건 세팅
	getCmmCodeData("YPE001", "#trvaSearchForm select[name=searchArea]");	//읍면동
	
	getTransVulnerBaseYMList();	//기준연월 세팅
	setTrvaEmdGeomData();		//읍면동 공간정보 데이터 세팅
	
	//닫기버튼
	$("#tranCloseBtn").on('click', function () {
		dtmap.layer.clear();
		
		if(dtmap.layer.userLayers){
			if (dtmap.layer.userLayers.nameAtLayer('li_trans_vulner_info_graph')) {
				dtmap.layer.userLayers.delLayerAtName('li_trans_vulner_info_graph');
			}else{
				console.log("레이어 삭제 오류");
			}
		}
		
	});
	
	//리셋 버튼
	$("#tranResetBtn").on('click', function () {
		dtmap.layer.clear();
		
		if(dtmap.layer.userLayers){
			if (dtmap.layer.userLayers.nameAtLayer('li_trans_vulner_info_graph')) {
				dtmap.layer.userLayers.delLayerAtName('li_trans_vulner_info_graph');
			}else{
				console.log("레이어 삭제 오류");
			}
		}
		
		$("#trvaSearchForm select[name=searchArea]").find("option:first").prop("selected", true);
		$("#trvaSearchForm select[name=stdrYm]").find("option:first").prop("selected", true);
		selectTransVulnerList();
		
	});
	
	//버스노선 체크 박스 처리
	$(".trvaInfoLegend input[type=checkbox][name=trva_bus_route]").change(function() {
		//console.log("checkbox - trva_bus_route");
		//console.log($(this).is(':checked'));
		
		if($(this).is(':checked')){
			var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
			emdCd = emdCd.slice(0,8);
			onMapBusRoteInfo(emdCd);
		}else{
			offMapBusRoteInfo();
		}
	});
	
	//버스정류장 체크 박스 처리
	$(".trvaInfoLegend input[type=checkbox][name=trva_bus_sttn]").change(function() {
		//console.log("checkbox - trva_bus_sttn");
		//console.log($(this).is(':checked'));
		
		if($(this).is(':checked')){
			var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
			emdCd = emdCd.slice(0,8);
			onMapBusSttnInfo(emdCd);
		}else{
			offMapBusSttnInfo();
		}
	});
	
	initTransVulner();
	
	
	
});

//전역 변수
var TRANSVUNLER={
	EMDGEOMARRAY :	[],			//읍면동 공간정보 목록
	BUSROUTEIDARRAY : [],		//버스노선 목록
	BUSSTTNIDARRAY : []			//버스정류소 목록
}

//functions
/**
 * 대중교통 취약분석 초기화
 */
function initTransVulner(){
	
	selectTransVulnerList();
}


/**
 * 기준 연월
 */
function getTransVulnerBaseYMList(){
	//console.log("getTransVulnerBaseYMList()");
	
	$.ajax({
		type : "POST",
		url : "/job/tran/trva/getTransVulnerBaseYMList.do",
		//data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				//console.log(returnData);
				
				var baseYmList = returnData.baseYmList;
				
				if(baseYmList){
					for(var i=0; i<baseYmList.length; i++){
						var stdrYm = baseYmList[i].stdrYm;
						
						var dYear 	= stdrYm.slice(0,4)+"년";
						var dMonth 	= stdrYm.slice(-2) +"월";

						var dhml = "<option value='"+stdrYm+"'>"+ dYear+" "+dMonth +"</option>";
						$("#trvaSearchForm select[name=stdrYm]").append(dhml);
						
					}
					
				}else{
					console.log("기준연월 데이터 조회 오류");
					return false;
				}
				
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

/**
* 대중교통 취약 분석 조회
*/
function selectTransVulnerList(){
	//console.log("selectTransVulnerList()");

	/////////
	//목록 조회
	var formData = new FormData($("#trvaSearchForm")[0]);
	
	ui.loadingBar("side");
	
	$.ajax({
		type : "POST",
		url : "/job/tran/trva/selectTransportationVulnerabilityList.do",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		//contentType: "application/json; charset=utf-8",
		async: false,
		success : function(returnData, status){
	
			if(status == "success") {
				//console.log(returnData);
				
				//목록 처리
				var resultType = returnData.resultType;
				var trvaListHml = "";
				if(resultType == "emd"){
					
					var resultListEmd = returnData.resultListEmd;
					
					for(var i=0; i<resultListEmd.length; i++){
						trvaListHml +=	"<tr>";
						trvaListHml +=	"<td>"+resultListEmd[i].emdNm+"</td>";
						trvaListHml +=	"<td>"+resultListEmd[i].emdArRelimp+"</td>";
						trvaListHml +=	"<td>"+resultListEmd[i].empPopltnRelimp+"</td>";
						trvaListHml +=	"<td>"+resultListEmd[i].rank+"</td>";
						//trvaListHml +=	"<td>"+resultListEmd[i].totalVal+"</td>";
						trvaListHml +=	"</tr>";
					}
					
				}else if(resultType == "li"){
					
					var resultListLi = returnData.resultListLi;
					
					for(var i=0; i<resultListLi.length; i++){
						trvaListHml +=	"<tr>";
						trvaListHml +=	"<td>"+resultListLi[i].liNm+"</td>";
						trvaListHml +=	"<td>"+resultListLi[i].liArRelimp+"</td>";
						trvaListHml +=	"<td>"+resultListLi[i].liPopltnRelimp+"</td>";
						trvaListHml +=	"<td>"+resultListLi[i].rank+"</td>";
						//trvaListHml +=	"<td>"+resultListLi[i].totalVal+"</td>";
						trvaListHml +=	"</tr>";
					}
					
				}else{
					trvaListHml +=	"<tr><td colspin='4'>조회결과가 없습니다</td></tr>";
				}
				
				$("#trvaInfoList").html(trvaListHml);
				
				//범위 처리
				var resultRangeList = returnData.resultRangeList;
				//console.log("resultRangeList>>");
				//console.log(resultRangeList);
				
				//지도 이동
				var centerPos = moveTranVulnerCenterPos();
				
				if(dtmap.mod == '2D'){
					getJenks2(resultType, resultRangeList);
					
					//버스 노선/정류장 체크박스 온
					dtmap.vector.clear();
					$(".trvaInfoLegend input[type=checkbox][name=trva_bus_route]").prop("checked", true);		
					$(".trvaInfoLegend input[type=checkbox][name=trva_bus_route]").change();		
					$(".trvaInfoLegend input[type=checkbox][name=trva_bus_sttn]").prop("checked", true);		
					$(".trvaInfoLegend input[type=checkbox][name=trva_bus_sttn]").change(); 
					
				}else if(dtmap.mod == '3D'){
					draw3DGraphMap(resultType, returnData, centerPos);
				}
				
				
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	}); 
	
		
	
}

//읍면동 공간정보 데이터 세팅
function setTrvaEmdGeomData(){
	//console.log("setTrvaEmdGeomData()");	
	
	 const geomOptions = {
    		typeNames: 'tgd_scco_emd',
    		sortBy : 'gid',
    		sortOrder : 'DESC',
   	}
   	
   	// 전체(읍면동) geometry 값 가져오는 wfs 
   	const promiseGeo = dtmap.wfsGetFeature(geomOptions);
   	promiseGeo.then(function(data) {
   		//console.log(data);
   		var geoArry = dtmap.util.readGeoJson(data);
   		//console.log(geoArry);
		
   		let geoEmdArray =  new Array();
			 
		for (let i = 0; i < geoArry.length; i++) {
			
			var info = new Object();
			info.emdCd 		= geoArry[i].values_.emd_cd;
			info.geometry 	= geoArry[i].values_.geometry;

			let geometry = info.geometry;
			let coordinate = null;

	  		if (geometry instanceof ol.geom.Polygon) {
	  			coordinate = ol.extent.getCenter(geometry.getExtent());
	  		}else if(geometry instanceof ol.geom.MultiPolygon) {
	            coordinate = ol.extent.getCenter(geometry.getPolygon(0).getExtent());
	  		}
	  		
	  		if(coordinate){
	  			info.centerPos = coordinate;
	  		}
			
			geoEmdArray.push(info);
		}

		TRANSVUNLER.EMDGEOMARRAY = geoEmdArray;
		//console.log(TRANSVUNLER.EMDGEOMARRAY);
		
   	});	
	
}

//읍면동 공간정보 조회
function getTrvaEmdGeomData(emdCd){
	//console.log("getTrvaEmdGeomData(emdCd)");
	//console.log(emdCd);
	
	if(emdCd){
		const geom =  TRANSVUNLER.EMDGEOMARRAY;
		
		for (let i = 0; i < geom.length; i++) {
	    	if (geom[i].emdCd == emdCd) {
	    		return geom[i].geometry;
	    	} 
	    }
	}else{
		//console.log("잘못된 코드 호출");
		return false; 
	}
	
}


//읍면동 공간정보 조회
function getTrvaEmdGeomCenterPos(emdCd){
	//console.log("getTrvaEmdGeomCenterPos(emdCd)");
	//console.log(emdCd);
	
	if(emdCd){
		const geom =  TRANSVUNLER.EMDGEOMARRAY;
		
		for (let i = 0; i < geom.length; i++) {
	    	if (geom[i].emdCd == emdCd) {
	    		return geom[i].centerPos;
	    	} 
	    }
	}else{
		//console.log("잘못된 코드 호출");
		return false; 
	}
	
}

//////////////////

//버스노선 조회(읍면동) 및 맵에 표시
function onMapBusRoteInfo(emdCd){
	//console.log("onMapBusRoteInfo()");
	//console.log(emdCd);
	
	var options = {
		typeNames	: "tgd_bus_route_info" + "",
		sortBy		: 'route_id',
		sortOrder	: 'DESC',
		visible		: false
	};
	
	if(emdCd){
			//emdCd += "0";
			let geo = getTrvaEmdGeomData(emdCd);
			if (geo != null) {
				options.geometry = geo;
			}
		}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {

        TRANSVUNLER.BUSROUTEIDARRAY = [];
        var features = data.features;
        for(var i=0; i<features.length; i++){
        	TRANSVUNLER.BUSROUTEIDARRAY.push(features[i].id);
        }
        
        //지도에 그리기
        dtmap.vector.readGeoJson(data, function(feature) {
        	
	          	// 스타일 콜백 
	 			let properties = feature.getProperties();
	 			let route_ty = properties['route_ty'];
	 			let route_nm_color;
	 			
	 			// 색상 확인 필요
	 			if (route_ty == 11) {				// 직행좌석형시내버스: bus_gg-03_ico
	 				route_nm_color = '#e60012';
	 			} else if (route_ty == 12) {		// 좌석형시내버스: bus_gg-02_ico
	 				route_nm_color = '#0068b7';
	 			} else if (route_ty == 13) {		// 일반형시내버스: bus_gg-01_ico
	 				route_nm_color = '#33CC99';
	 			} else if (route_ty == 14) {		// 광역급행형시내버스: bus_gg-01_ico -> 일반형시내버스(일반좌석버스)
	 				route_nm_color = '#006896';
	 			} else if (route_ty == 15) {		// 따복형시내버스: bus_gg-06_ico
	 				route_nm_color = '#bb2266';
	 			} else if (route_ty == 16) {		// 경기순환버스: bus_gg-03_ico
	 				route_nm_color = '#e60012';
	 			} else if (route_ty == 21) {		// 직행좌석형농어촌버스: bus_gg-01_ico
	 				route_nm_color = '#33CC99';
	 			} else if (route_ty == 22) {		// 좌석형농어촌버스: bus_gg-01_ico
	 				route_nm_color = '#33CC99';
	 			} else if (route_ty == 23) {		// 일반형농어촌버스: bus_gg-01_ico
	 				route_nm_color = '#33CC99';
	 			} else if (route_ty == 30) {		// 마을버스: bus_gg-08_ico
	 				route_nm_color = '#ffc600';
	 			} else if (route_ty == 41) {		// 고속형시외버스: bus_gg-06_ico -> 따복버스
	 				route_nm_color = '#a800ff';
	 			} else if (route_ty == 42) {		// 좌석형시외버스: bus_gg-06_ico -> 따복버스
	 				route_nm_color = '#a800ff';
	 			} else if (route_ty == 43) {		// 일반형시외버스: bus_gg-06_ico -> 따복버스
	 				route_nm_color = '#a800ff';
	 			} else if (route_ty == 51) {		// 리무진공항버스: bus_gg-05_ico -> 굿모닝글자버스
	 				route_nm_color = '#00a0e9';
	 			} else if (route_ty == 52) {		// 좌석형공항버스: bus_gg-05_ico -> 굿모닝글자버스
	 				route_nm_color = '#00a0e9';
	 			} else if (route_ty == 53) {		// 일반형공항버스: bus_gg-05_ico -> 굿모닝글자버스
	 				route_nm_color = '#00a0e9';
	 			} else {
	 				route_nm_color = '#44516A';
	 			}
	 		
	 			return {
	 				stroke: {
	 					color: route_nm_color,
	 					width: 4
	 				},
	 				radius: 10,
	 				label: {
	 					//column: 'route_nm'
	 				}
	 			}
        	
        });
         
	});
	
	
}

//버스노선 맵에서 제거
function offMapBusRoteInfo(){
	//console.log("offMapBusRoteInfo()");
	
	var busRouteIds = TRANSVUNLER.BUSROUTEIDARRAY;
	
	if(busRouteIds){
		for(var i=0; i<busRouteIds.length; i++){
			//console.log(busRouteIds[i]);
			dtmap.vector.removeFeatureById(busRouteIds[i]);
		}
	}else{
		console.log("지도에 데이터 없음");
		return false;
	}

}

/////////////////

//버스정류장 조회(읍면동) 및 맵 표시
function onMapBusSttnInfo(emdCd){
	//console.log("onMapBusSttnInfo()");
	//console.log(emdCd);
	
	var options = {
        typeNames	: 'tgd_bus_sttn_info' + "",
        sortBy		: 'sttn_id',
        sortOrder	: 'DESC',
    };
	
	if(emdCd){
			//emdCd += "0";
			let geo = getTrvaEmdGeomData(emdCd);
			if (geo != null) {
			    options.geometry = geo;
			}
		}
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		//console.log(data);
		
		TRANSVUNLER.BUSSTTNIDARRAY = [];
        var features = data.features;
        for(var i=0; i<features.length; i++){
        	TRANSVUNLER.BUSSTTNIDARRAY.push(features[i].id);
        }
       
        //지도에 표시
        dtmap.vector.readGeoJson(data);
       
	});
	
}

//버스정류장 맵에서 제거
function offMapBusSttnInfo(){
	//console.log("offMapBusSttnInfo()");
	
	var busSttnIds = TRANSVUNLER.BUSSTTNIDARRAY;
	
	if(busSttnIds){
		for(var i=0; i<busSttnIds.length; i++){
			//console.log(busSttnIds[i]);
			dtmap.vector.removeFeatureById(busSttnIds[i]);
		}
	}else{
		console.log("지도에 데이터 없음");
		return false;
	}
	
}

//natural breaks 값 구하는 함수
function getJenks2(resultType, data) {
	//console.log("getJenks2(data)");
	//console.log(data);
	
	let totalValArray = [];
	
	for (let i = 0; i < data.length; i++) {
		totalValArray.push(data[i].totalVal);
	}
	
	//console.log(totalValArray);
	let geo = new geostats(totalValArray);

	if(totalValArray.length < 20000){
		geo.getClassJenks2(5);
		//geo.getClassEqInterval(5);
		//geo.getClassQuantile(5);
	}else{
		alert('natural breaks 개수 20000개 초과');
		return false;
	}
	
	//범례 값 처리
	var ranges = geo.ranges;
	//console.log(ranges)
	
	var trvaInfoLegendHtml = "";
	
	let wmsStyleArray =  new Array();	//wms 스타일 목록 
	
	let color 			= ['#ffffff', '#ffbfbf', '#ff8080', '#ff4040', '#ff0000'];
	//let color 			= ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#000000'];
	
	let propertyName	= '';
	if(resultType == "emd"){
		propertyName	= 'emd_total_value';
	}else if(resultType = "li"){
		propertyName	= 'li_total_value';
	}else{
		console.log("resultType 오류");
		return false;
	}
	
	for(var i=0; i<ranges.length; i++){
		
		var strArray = ranges[i].replaceAll(" ", "").split("-");

		trvaInfoLegendHtml += "<li>";
		trvaInfoLegendHtml += "<span class='rg lv0"+(i+1)+"'></span>";
		trvaInfoLegendHtml += "<label>";
		trvaInfoLegendHtml += "<input type=text value='"+strArray[0]+"' readonly>-";
		trvaInfoLegendHtml += "<input type=text value='"+strArray[1]+"' readonly>";
		trvaInfoLegendHtml += "</label>";
		trvaInfoLegendHtml += "</li>";
		
		var styleInfo = new Object();
		
		//스타일 저장
		styleInfo.name			=	ranges[i];
		styleInfo.title			=	ranges[i];
		styleInfo.PropertyName	=	propertyName;
		styleInfo.min			=	strArray[0];
		styleInfo.max			=	strArray[1];
		if(color[i]){
			styleInfo.color	= color[i];
		}else{
			styleInfo.color = '#ffffff';
			//styleInfo.color = '#52E252';
		}
	
		wmsStyleArray.push(styleInfo);
	}
	
	if($(".trvaInfoLegend").css("display") == "none"){
		$(".trvaInfoLegend").show();
	}
	
	$(".trvaInfoLegend ol").html(trvaInfoLegendHtml);

	//wms 호출
	let layerNm 	= 'tgd_pbtrnsp_frglty_anals';
		
	//console.log("------------")
	//console.log(wmsStyleArray);
	
	let style = {
			layerNm	: layerNm,
			name	: layerNm,
			range	: wmsStyleArray
	};
	
	let xmlString = getWmsStyleXml(style);
	//console.log("xmlString>>");
	//console.log(xmlString);
	
	var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
	emdCd = emdCd.slice(0,8);
	
	drawWmsGridLayer(emdCd, xmlString);	//2D 그리드 그리기
}

//geoserver wms grid 표현
function drawWmsGridLayer(emdCd, sld){
	//console.log("drawWmsGridLayer(emdCd, sld)");
	
	dtmap.layer.clear();	
	
	dtmap.showLayer({
            id: 'layer_trva_grid_area',
            type: 'WMS',
            layerNm: 'digitaltwin:tgd_pbtrnsp_frglty_anals',
            title: 'test',
            visible: true,
            shpType: 6,
            cql : "li_cd like '"+emdCd+"%'",
            sldBody: sld
    });
	
}

//geoserver sld 스타일 xml 만들기 
function getWmsStyleXml(style) {
	//console.log("getWmsStyleXml(style)");
	//console.log(style);
	let layerNm = style.layerNm;
	let name	= style.name;
	let range	= style.range;
	
	if( !(layerNm && name && range) ){
		console.log("wms Style 오류");
		return false;
	}
	
	let xml = ``;
	xml += `<?xml version="1.0" encoding="UTF-8"?>`;
	xml += `<StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" `;
	xml += `xmlns:se="http://www.opengis.net/se" `;
	xml += `xmlns:ogc="http://www.opengis.net/ogc" `;
	xml += `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" `;
	xml += `xmlns:xlink="http://www.w3.org/1999/xlink" `;
	xml += `xsi:schemaLocation="http://www.opengis.net/sld `;
	xml += `http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" version="1.1.0">`;
	xml += `<sld:NamedLayer>`;
	xml += `<se:Name>${layerNm}</se:Name>`;
	xml += `<sld:UserStyle>`;
	xml += `<se:Name>${name}</se:Name>`;
	xml += `<se:FeatureTypeStyle>`;
	for (let i = 0; i < range.length; i ++) {
		//console.log(range[i].color);
		xml += `<se:Rule>`;
		xml += `<se:Name>${range[i].name}</se:Name>`;
		xml += `<se:Description>`;
		xml += `<se:Title>${range[i].title}</se:Title>`;
		xml += `</se:Description>`;
		xml += `<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">`;
		xml += `<ogc:And>`;
		xml += `<ogc:PropertyIsGreaterThanOrEqualTo>`;
		xml += `<ogc:PropertyName>${range[i].PropertyName}</ogc:PropertyName>`;
		xml += `<ogc:Literal>${range[i].min}</ogc:Literal>`;
		xml += `</ogc:PropertyIsGreaterThanOrEqualTo>`;
		xml += `<ogc:PropertyIsLessThanOrEqualTo>`;
		xml += `<ogc:PropertyName>${range[i].PropertyName}</ogc:PropertyName>`;
		xml += `<ogc:Literal>${range[i].max}</ogc:Literal>`;
		xml += `</ogc:PropertyIsLessThanOrEqualTo>`;
		xml += `</ogc:And>`;
		xml += `</ogc:Filter>`;
		xml += `<se:PolygonSymbolizer>`;
		xml += `<se:Fill>`
		xml += `<se:SvgParameter name="fill">${range[i].color}</se:SvgParameter>`;
		xml += `<se:SvgParameter name="fill-opacity">0.7</se:SvgParameter>`;
		xml += `</se:Fill>`;
		/*xml += `<se:Stroke>`;
		xml += `<se:SvgParameter name="stroke">#ffffff</se:SvgParameter>`;
		xml += `<se:SvgParameter name="stroke-width">0</se:SvgParameter>`;
		xml += `<se:SvgParameter name="stroke-opacity">0</se:SvgParameter>`;
		xml += `</se:Stroke>`*/
		xml += `</se:PolygonSymbolizer>`;
		xml += `</se:Rule>`;
	};
	xml += `</se:FeatureTypeStyle>`;
	xml += `</sld:UserStyle>`;
	xml += `</sld:NamedLayer>`;
	xml += `</StyledLayerDescriptor>`;
	
	return xml;
}

//3D 맵에 취약점 데이터 그래프 그리기
function draw3DGraphMap(resultType, returnData, centerPos) {
	//console.log("draw3DGraphMap(resultType, returnData, centerPos)");
	//console.log(resultType);
	//console.log(returnData);
	//console.log(centerPos);
	
	//배경 맵 불러오기
	let options = {};
	if(resultType == "emd"){
		//console.log("emd");
		
		options = {
				typeNames: 'tgd_scco_emd',
				sortBy : 'gid',
				sortOrder : 'DESC',
		}
		
	}else if(resultType == "li"){
		//console.log("li");
		
		var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
		emdCd = emdCd.slice(0,8);
		
		options = {
				typeNames: 'tgd_scco_li',
				sortBy : 'gid',
				sortOrder : 'DESC',
				cql : "li_cd like '"+emdCd+"%'",
		}
		
	}
	
	dtmap.vector.clear();
	
	ui.loadingBar('show');
	
	const promise = dtmap.wfsGetFeature(options);
	promise.then(function(data) {
		dtmap.vector.readGeoJson(data, function (feature) {
			let properties = feature.getProperties();
			return {
				fill : {
				      opacity : 0.7
				    }
			}
		});
		ui.loadingBar('hide');
	});
	
	///////////////////////////////////
	
	var dataSetList = [];
	
	if(resultType == "emd"){
		
		var resultListEmd = returnData.resultListEmd;
		
		for(var i=0; i<resultListEmd.length; i++){
			var info = new Object();
			info.FieldName 	= resultListEmd[i].emdNm;
			
			if(
				typeof resultListEmd[i].emdArRelimp == 'string'
				|| typeof resultListEmd[i].emdArRelimp == 'string'
			){
				info.Data 	= [
					parseFloat(resultListEmd[i].emdArRelimp)
					, parseFloat(resultListEmd[i].empPopltnRelimp)
				];
			}else{
				info.Data 	= [
					resultListEmd[i].emdArRelimp
					, resultListEmd[i].empPopltnRelimp
				];
			}
			
			//console.log(typeof resultListEmd[i].emdArRelimp);
			//console.log(typeof resultListEmd[i].empPopltnRelimp);

			dataSetList.push(info);
		}
		
	}else if(resultType == "li"){
		
		var resultListLi = returnData.resultListLi;
		
		for(var i=0; i<resultListLi.length; i++){
			var info = new Object();
			info.FieldName 	= resultListLi[i].liNm;
			
			if(
				typeof resultListLi[i].liArRelimp == 'string'
				|| typeof resultListLi[i].liPopltnRelimp == 'string'
			){
				info.Data 	= [
					parseFloat(resultListLi[i].liArRelimp)
					, parseFloat(resultListLi[i].liPopltnRelimp)
				];
			}else{
				info.Data 	= [
					resultListLi[i].liArRelimp
					, resultListLi[i].liPopltnRelimp
				];
			}
			//console.log(typeof resultListLi[i].liArRelimp);
			//console.log(typeof resultListLi[i].liPopltnRelimp);
			
			dataSetList.push(info);
		}
	}
	
	//console.log("dataSetList>>>");
	//console.log(dataSetList);
	
	//그래프 그리기
	if(dtmap.layer.userLayers){
		if (dtmap.layer.userLayers.nameAtLayer('li_trans_vulner_info_graph')) {
			dtmap.layer.userLayers.delLayerAtName('li_trans_vulner_info_graph');
		}
	}
		
	var layer = Module.getObjectLayerList().createObjectLayer({
	    name: "li_trans_vulner_info_graph", // 필수
	    type: Module.ELT_GRAPH, // 필수
	    visible: true, // 옵션 (default : true)
	    selectable: false, // 옵션 (default : true)
	    minDistance: 100.0, // 옵션 (default : 0.0)
	    maxDistance: 200000.0, // 옵션 (default : 3000.0)
	});
	
	// 그래프 오브젝트 생성
	var graph = Module.createBarGraph("Graph");
	
	// 범례 추가
	//graph.insertLegend("Legend1", "면적비중", new Module.JSColor(200, 255, 0, 0));
	graph.insertLegend("Legend1", "면적비중", new Module.JSColor(200, 144, 237, 125));
	graph.insertLegend("Legend2", "인구비중", new Module.JSColor(200, 255, 255, 0));
	
	// 그래프 객체에 데이터 추가
	for (var i=0, len=dataSetList.length; i<len; i++) {
		
		// 데이터 전송 객체 생성
		var data = new Module.Collection();
		
		// 데이터 값 입력
		for (var j=0, subLen=dataSetList[i].Data.length; j<subLen; j++) {
			//console.log(dataSetList[i].Data[j]);
			data.add(dataSetList[i].Data[j]*100);
			//data.add(dataSetList[i].Data[j]);
		}
		
		// 데이터 셋 명칭, 데이터 값으로 데이터 셋 입력
		graph.insertDataSet(dataSetList[i].FieldName, data);
		
		// 그래프 데이터 셋 이름 출력 옵션 설정
		graph.setDataSetNameFont(dataSetList[i].FieldName, "sans-serif");	// 폰트 이름
		graph.setDataSetNameTextSize(dataSetList[i].FieldName, 12);	// 텍스트 크기
		graph.setDataSetNameTextColor(dataSetList[i].FieldName, new Module.JSColor(255, 0, 0, 0), new Module.JSColor(255, 255, 255, 255));	// 텍스트 색상
	}
	
	// 그래프 y축 최대, 최소 값 범위 설정
	//graph.setValueRange(0.0, 1.0, 0.1);
	graph.setValueRange(0, 100, 10);
	
	// 단위 표시 텍스트 설정
	graph.setUnitText("비중x100");
	
	// 바 상승 애니메이션 속도 설정
	graph.setAnimationSpeed(0.1);
	
	// 데이터 셋 이름과 그래프 바 간 간격 설정
	graph.setDataSetNameInterval(400);
	
	// 그래프 바닥 평면 두께 설정
	graph.setFloorDepth(150);
	graph.setFloorColor(new Module.JSColor(150, 250, 250, 250));
	
	var center = null;
	
	let posOptions = {
			tilt : 30
	}
	
	// 그래프 생성
	if(centerPos){
		graph.setLegendBoxSize(new Module.JSSize3D(500, 150, 300));
		graph.create(new Module.JSVector3D(centerPos[0], centerPos[1], 350.0),
				 new Module.JSSize2D(13000, 7000),
				 0);
		const point = new ol.geom.Point([centerPos[0] - 0.04, centerPos[1] + 0.03]);
		center = point.flatCoordinates;
		
	}else{
		graph.setLegendBoxSize(new Module.JSSize3D(500, 150, 300));
		graph.create(new Module.JSVector3D(127.48846106, 37.49131546, 350.0),
				 new Module.JSSize2D(13000, 7000),
				 0);
		
		const point = new ol.geom.Point([127.48846106 - 0.04, 37.49131546 + 0.03]);
		center = point.flatCoordinates;
		
	}
	
	center.push(18000);	// 고도 추가(zoom 역할)
	dtmap.setCenter(center, posOptions);
	
	layer.addObject(graph, 0);
	
}

//취약지 중심지 이동
function moveTranVulnerCenterPos() {
	//중심점 이동
	var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
	emdCd = emdCd.slice(0,8);
	
	var centerPos = getTrvaEmdGeomCenterPos(emdCd);
	//console.log("centerPos>>");		
	//console.log(centerPos);		
		
	
	if(centerPos){
		if(dtmap.mod == '2D'){
			//console.log("2D");
			
			//중심점 이동 및 zoom 설정
            var options = {
            		//zoom : 11	
            		zoom : 13	
            }
			
			dtmap.setCenter(
				[centerPos[0]-5000, centerPos[1]]
				, options
			);
			
		}else if(dtmap.mod == '3D'){
			//console.log("3D");
			
            const point = new ol.geom.Point([centerPos[0]-0.05, centerPos[1]]);
			
			var center = point.flatCoordinates;
			center.push(22000);	// 고도 추가(zoom 역할)
				
			dtmap.setCenter(center);
		}
	}else{
		if(dtmap.mod == '2D'){
			//console.log("2D");
			
			//중심점 이동 및 zoom 설정
            var options = {
            		zoom : 11	
            		//zoom : 13	
            }
			
			dtmap.setCenter(
				[994028.8151566336, 1943589.1357401803]
				, options
			);
			
		}else if(dtmap.mod == '3D'){
			//console.log("3D");
			
            const point = new ol.geom.Point([127.48846106, 37.49131546]);
			
			var center = point.flatCoordinates;
			center.push(22000);	// 고도 추가(zoom 역할)
				
			dtmap.setCenter(center);
		}
	}
	
	return centerPos;
	
}

