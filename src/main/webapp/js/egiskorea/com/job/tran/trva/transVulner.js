//jquery
$(document).ready(function(){
	//console.log("selectTransportationVulnerabilityList.jsp");
	console.log("교통분석 - 대중교통 취약 분석");
	
	//검색 조건 세팅
	getCmmCodeData("YPE001", "#trvaSearchForm select[name=searchArea]");	//읍면동
	
	getTransVulnerBaseYMList();	//기준연월 세팅
	setTrvaEmdGeomData();		//읍면동 공간정보 데이터 세팅
	
	//닫기버튼
	$("#tranCloseBtn").on('click', function () {
		dtmap.layer.clear();
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
	
	/////////////////////////////////////////
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
						trvaListHml +=	"<td>"+resultListEmd[i].totalVal+"</td>";
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
						trvaListHml +=	"<td>"+resultListLi[i].totalVal+"</td>";
						trvaListHml +=	"</tr>";
					}
					
				}else{
					trvaListHml +=	"<tr><td colspin='4'>조회결과가 없습니다</td></tr>";
				}
				
				$("#trvaInfoList").html(trvaListHml);
				
				//범위 처리
				var resultRangeList = returnData.resultRangeList;
				console.log("resultRangeList>>");
				console.log(resultRangeList);
				
				getJenks2(resultType, resultRangeList);
				
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	}); 
	
	///////////////////////
	//지도 작업
	
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
			
            const point = new ol.geom.Point([centerPos[0]-0.05,centerPos[1]]);
			
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
	
	
	//지도 그리기
	dtmap.vector.clear();
	
	if(dtmap.mod == '2D'){
		
		/*dtmap.showLayer({
			id: "li_popltn_info",
			type: "WMS",
			layerNm: "digitaltwin:tgd_li_popltn_info",
			title: "인구정보",
			visible: true,
			cql : "length(li_cd) = '8'",
			//sldBody : sld
		});*/
		
		
		
		
		
	}else if(dtmap.mod == '3D'){
		
		console.log("3d 격자 불러 오기");
		
		//dtmap.clear();
		
		var data = $("#trvaSearchForm").serialize();
		console.log(data);
		
		var formData = new FormData($("#trvaSearchForm")[0]);
		 
		ui.loadingBar("show");
		
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
					//var liList = returnData.resultListAllLi;
					var gridList = returnData.resultListAllGrid;
					//console.log(gridList);
					/* var geomCenterPos = returnData.geomCenterPos;
					if(geomCenterPos){
						var geomcenter = geomCenterPos.geomcenter;
						//console.log(geomcenter);
						
						const formatWKT = new ol.format.WKT();
						let geometryCenter = formatWKT.readGeometry(geomcenter);
						//console.log(geometryCenter);
						
						//dtmap.getCenter();
						
						console.log("-----------------------------")
						console.log(geometryCenter.getCoordinates());
												
						if(gridList){	
							
							if(dtmap.mod == '2D'){
								console.log("2D");
								
								//중심점 이동 및 zoom 설정
					            var options = {
					            		zoom : 13	
					            }
								
								dtmap.setCenter(
									[geometryCenter.getCoordinates()[0]-5000, geometryCenter.getCoordinates()[1]]
									, options
								);
								
							}else if(dtmap.mod == '3D'){
								console.log("3D");
								
								geometryCenter.setCoordinates([geometryCenter.getCoordinates()[0]-5000, geometryCenter.getCoordinates()[1]])
								
								var tranPoint = geometryCenter.transform("EPSG:5179", "EPSG:4326");
								var center = tranPoint.flatCoordinates;
								center.push(20000);	// 고도 추가(zoom 역할)
									
								dtmap.setCenter(center);
							}
							
							
						}else{
							
							console.log(dtmap.mod);
							
							if(dtmap.mod == '2D'){
								console.log("2D");
								
								//중심점 이동 및 zoom 설정
					            var options = {
					            		//zoom : 11	
					            		zoom : 13	
					            }
								
								dtmap.setCenter(
									[geometryCenter.getCoordinates()[0]-19500, geometryCenter.getCoordinates()[1]]
									, options
								);
								
							}else if(dtmap.mod == '3D'){
								console.log("3D");
								
								geometryCenter.setCoordinates([geometryCenter.getCoordinates()[0]-19500, geometryCenter.getCoordinates()[1]])
								
								var tranPoint = geometryCenter.transform("EPSG:5179", "EPSG:4326");
								console.log(tranPoint);
								
								var center = tranPoint.flatCoordinates;
								center.push(70000);	// 고도 추가(zoom 역할)
								console.log(center);
									
								dtmap.setCenter(center);
							}
							
						} 
						
					} */
					
					//console.log(liList);
					//console.log(gridList);
					
					/* for(var i=0; i<liList.length; i++){
						var liCd = liList[i].liCd;
						var geom = liList[i].geom;
						
						var style1 = { 
							fill: {
			                	//color: 'rgba(46,161,255,0.68)'
			                	color: 'rgba(46,161,255,0.88)'
			                },
			                stroke: {
			                    //color: '#89dfff',
			                    //color: '#FF3333',
			                    color: '#FFFFFF',
			                    width: 1
			                },
						}
						
						const formatWKT = new ol.format.WKT();
						let geometry1 = formatWKT.readGeometry(geom);
						
						
						dtmap.vector.addPolygon({
							  id: liCd,
							  coordinates: geometry1.getCoordinates(),
							  //crs: 'EPSG:4326',
							  crs: 'EPSG:5179',
							  style: style1 //스타일 옵션 (벡터 스타일옵션 참고)
						}); 
						
					}  */
					
					if(gridList){
						for(var i=0; i<gridList.length; i++){ 
							var gridId = gridList[i].gridId;
							var geom = gridList[i].geom;
							
							var style2 = { 
								fill: {
				                	//color: 'rgba(46,161,255,0.68)'
				                	color: 'rgba(255,255,0,0.68)'
				                },
				                stroke: {
				                    //color: '#89dfff',
				                    //color: '#FF3333',
				                    color: '#FFFFFF',
				                    width: 1
				                },
							}
							
							const formatWKT = new ol.format.WKT();
							let geometry2 = formatWKT.readGeometry(geom);

							/* if(dtmap.mod == "2D"){
								console.log("2D--->");								
								console.log(geometry2.getCoordinates());								
								
								dtmap.vector.addPolygon({
									  id: gridId,
									  coordinates: geometry2.getCoordinates(),
									  //crs: 'EPSG:4326',
									  crs: 'EPSG:5179',
									  style: style2 //스타일 옵션 (벡터 스타일옵션 참고)
								}); 
								
							}else */ if(dtmap.mod == "3D"){
								//console.log("3D--->");								
								//console.log(geometry2.getCoordinates());
								
								dtmap.vector.addPolygon({
									  //id: gridId,
									  coordinates: geometry2.getCoordinates(),
									  crs: 'EPSG:5179',
									  style: style2 //스타일 옵션 (벡터 스타일옵션 참고)
								}); 
							}
						 } 
					}
					
					///////////////////
					
					/* var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
					
					var dCql = ""; 
					if(emdCd){
						dCql = "emd_cd like '"+emdCd+"%'";
					}
					//console.log(dCql);
					dtmap.layer.clear();	
					//dtmap.layer.removeLayer('layer_trva_emd_area');
					
					dtmap.showLayer({
		                    id: 'layer_trva_emd_area',
		                    type: 'WMS',
		                    layerNm: 'digitaltwin:tgd_scco_emd',
		                    title: 'test',
		                    visible: true,
		                    shpType: 6,
		                    cql : "emd_cd like '"+emdCd+"%'",
		                    //sldBody: findLayer.styleInfo
		            }); */
		
				}else{
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		}); 
		
		
	}
	
	ui.loadingBar("hide");
	
	//버스 노선/정류장 체크박스 온
	
	//dtmap.vector.clear();
	/*$(".trvaInfoLegend input[type=checkbox][name=trva_bus_route]").prop("checked", true);		
	$(".trvaInfoLegend input[type=checkbox][name=trva_bus_route]").change();		
	$(".trvaInfoLegend input[type=checkbox][name=trva_bus_sttn]").prop("checked", true);		
	$(".trvaInfoLegend input[type=checkbox][name=trva_bus_sttn]").change(); */	
	
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
	console.log("getJenks2(data)");
	//console.log(data);
	
	let totalValArray = [];
	
	for (let i = 0; i < data.length; i++) {
		totalValArray.push(data[i].totalVal);
	}
	
	//console.log(totalValArray);
	let geo = new geostats(totalValArray);

	if(totalValArray.length < 20000){
		geo.getClassJenks(5);
		//geo.getClassEqInterval(5);
		//geo.getClassQuantile(5);
	}else{
		alert('natural breaks 개수 20000개 초과');
		return false;
	}
	
	//범례 값 처리
	
	var ranges = geo.ranges;
	console.log(ranges)
	
	var trvaInfoLegendHtml = "";
	
	let wmsStyleArray =  new Array();	//wms 스타일 목록 
	
	//let color 			= ['#ffffff', '#ffbfbf', '#ff8080', '#ff4040', '#ff0000'];
	let color 			= ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#000000'];
	
	let propertyName	= '';
	if(resultType == "emd"){
		propertyName	= 'emd_total_val';
	}else if(resultType = "li"){
		propertyName	= 'li_total_val';
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
			//styleInfo.color = '#ffffff';
			//styleInfo.color = '#52E252';
			console.log("aaaaaaaaaa");
		}
	
		wmsStyleArray.push(styleInfo);
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
	console.log(xmlString);
	
	var emdCd = $("#trvaSearchForm select[name=searchArea]").val();
	emdCd = emdCd.slice(0,8);
	
	dtmap.layer.clear();	
	dtmap.showLayer({
            id: 'layer_trva_grid_area',
            type: 'WMS',
            layerNm: 'digitaltwin:tgd_pbtrnsp_frglty_anals',
            title: 'test',
            visible: true,
            shpType: 6,
            cql : "li_cd like '"+emdCd+"%'",
            sldBody: xmlString
    });
	
}


function getWmsStyleXml(style) {
	console.log("getWmsStyleXml(style)");
	console.log(style);
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
		console.log(range[i].color);
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
		//xml += `<se:SvgParameter name="fill-opacity">0.7</se:SvgParameter>`;
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