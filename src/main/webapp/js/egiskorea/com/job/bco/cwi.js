/** 공사 정보 **/
var cwi ={
		uiType : 'type01',
		layerId : "TBD_CNTRK_PRRNG_INFO_INQUIRY",
		ordLayerId : "TBD_CNTRK_PRRNG_ODR_INFO_POI",
		LineLayerId : "TBD_CNTRK_PRRNG_ODR_INFO_LINE",
		layerTextKey : "cntrkNm",
		imgUrl : "./images/poi/constructionSchedule_poi.png",
		position : ''
}


// 이벤트 등록
$(document).ready(function(){
	//TODO GIS
	// 레이어 생성
	// var layerList = new Module.JSLayerList(true);
	// GLOBAL.PoiLayer = layerList.createLayer(cwi.ordLayerId, Module.ELT_3DPOINT);
	// layerList.createLayer(cwi.LineLayerId, Module.ELT_3DLINE);
	// 공사정보 조회 > 속성조회 조회버튼 클릭 이벤트
	// $("button[name='cwiSearch']").unbind('click').bind('click',function(){
	// 	document.searchInquiryForm.pageIndex.value = "1";			// 선택한 페이지 번호
	// 	aj_selectConstructionInquiryList($("#searchInquiryForm")[0]);
	// 	destroy();destroy("Polygon");
	// });
	

	// 공사정보 조회 > 공간조회 조회버튼 클릭 이벤트
	$("button[name='cwiSearch02']").unbind('click').bind('click',function(){
		if($("#cntrkLcAdresSp").val() == ''){alert('위치를 지정해주세요'); return false;}
		if(Number($("#radius").val()) <= 0){alert('반경을 입력 해주세요'); return false;}
		document.searchInquiryForm2.pageIndex.value = "1";			// 선택한 페이지 번호

		//TODO GIS
		// if(app2D){
		// 	var buffer = $("#radius").val();
		// 	if(buffer && buffer > 0) {
		// 		const wkt = $("#searchInquiryForm2 input[name='geomSp']").val();
		// 		if(wkt) {
		// 			cmmUtil.showBufferGeometry(wkt, buffer);
		// 		}
		// 	}
		// }else{
		// 	const wkt = $("#searchInquiryForm2 input[name='geomSp']").val();
		// 	cmmUtil.setRadius(wkt, $("#radius").val(), 100); // 좌표, 반경값, 표출할 점의 계수
		// }
		
		aj_selectConstructionInquirySpaceList($("#searchInquiryForm2")[0]);
		
		/*if(cwi.position != '' || cwi.position != undefined){
			debugger;
			cmmUtil.setRadius(cwi.position, $("#radius").val(), 100); // 좌표, 반경값, 표출할 점의 계수
			var buffer = $("#radius").val();
			if(buffer && buffer > 0) {
				const wkt = $("#searchInquiryForm2 input[name='geomSp']").val();
				if(wkt) {
					cmmUtil.showBufferGeometry(wkt, buffer);
				}
			}
			aj_selectConstructionInquirySpaceList($("#searchInquiryForm2")[0]);
		}*/
		
	});
	
	
	// 공사정보 조회 > 상세 페이지 이동 이벤트 처리 이벤트
	// $("tr[name='tdCwiDtl']").unbind('click').bind('click',function(){
	// 	//destroy();
	// 	cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));
	// 	cmmUtil.setPoiHighlight(cwi.layerId, $(this).data('cwiid'));
	// 	aj_selectConstructionInquiry($(this).data('cwiid'));
	//
	// });
	
	// 공사정보 조회 > 상세페이지 >  차수정보 차수 셀렉트박스 처리 이벤트
	$("#cntrkOdrDtlCwi").unbind('change').bind('change',function(){
		if($(this).val() != ''){
			for(var i=0; i < orderListInquiry.length; i++ ){
				if($(this).val() == orderListInquiry[i].cntrkOdr){
					// cmmUtil.setCameraMove(orderListInquiry[i].lon , orderListInquiry[i].lat);
				}
			}
			aj_selectConstructionInquiryOderInfo($(this).data("cntrkprrngid"), $(this).val());
		}
	});
	
	// 공사정보 조회 > 상세 페이지 > 목록 버튼 이벤트 처리
	$("#btnCwiCancel").unbind('click').bind('click',function(){
		//destroy();
		orderListInquiry = '';
		if($("#pageType").val() == "type01"){
			aj_selectConstructionInquiryList($("#dtlInfoInquiryForm")[0]);
		}else{
			aj_selectConstructionInquirySpaceList($("#dtlInfoInquiryForm")[0])
		}
		
	});
	
	// 공사정보 조회(공간조회) > 지도에서 선택 이벤트 처리
	$("#getInquiryPosition").unbind('click').bind('click',function(){
		// cmmUtil.getPositionGeom(inquiryPositionCallback);
		// 생성된어 있는 PolygonLayer 레이어가 있을때 지워주기
		destroy("Polygon");
	});
	
	// 공사정보조회 > 상세 페이지 > 차수정보 클릭시 지도 이동 처리
	$("tbody[name='tbodyOdrInfo'] tr").unbind('click').bind('click',function(){
		// cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));
	});
	
	
	// if(Number(poiListInquiry.resultCnt) != 0){
		//cmmUtil.setPointLayer(poiListSchedule.resultList, poiScheduleInfo.layerTextKey, poiScheduleInfo.layerId, poiScheduleInfo.imgUrl);
		// if(poiListInquiry != ''){
			//setPointLayerInquiry();
			// cmmUtil.setPointLayer(poiListInquiry.resultList, cwi.layerId, "cntrkPrrngId", "cntrkNm", cwi.imgUrl, (feature) => {
			// 	//$(`.bbs-list tr[data-cwiid='${feature.getId()}']`).trigger('click');
			// 	console.log('poiListInquiry.resultList : ', poiListInquiry.resultList);
			//
			// 	aj_selectConstructionInquiry(`${feature.getId()}`);
			// });
		// }
	// }else{
		// 생성된어 있는 POI 레이어가 있을때 지워주기
		// destroy("poi");
	// }
	
});

// 차수정보 관련된 POILayer 를 추가해준다.
function orderListLayer(){
	
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		//alert("2D환경 POI마커는 개발중입니다!");			
	}else{
		
		if(orderListInquiry.length == 0){ return;}
		
		//TODO GIS
		// 레이어 생성
		// var layerList = new Module.JSLayerList(true);
		// poi 레이어 있을떄 삭제 처리
		// if(GLOBAL.LayerId.PoiLayerId != null){
		// 	layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
		// 	GLOBAL.LayerId.PoiLayerId = null;
		// 	Module.XDRenderData();
		// }
		// // poi 레이어 있을떄 삭제 처리
		// if(GLOBAL.LayerId.LowPoiLayerId != null){
		// 	layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId).removeAll();
		// 	GLOBAL.LayerId.LowPoiLayerId = null;
		// 	Module.XDRenderData();
		// }
		// // Line 레이어 있을떄 삭제 처리
		// if(GLOBAL.LayerId.LineLayerId != null){
		// 	layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId).removeAll();
		// 	GLOBAL.LayerId.LineLayerId = null;
		// 	Module.XDRenderData();
		// }
		
		
				
		// POI 레이어 이름은 각 해당 테이블명
		GLOBAL.LayerId.LowPoiLayerId = cwi.ordLayerId;
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.LowPoiLayerId, Module.ELT_3DPOINT);
		

		// POI 설정
		for(var i = 0; i < orderListInquiry.length; i++){
			var pointX = Number(orderListInquiry[i].lon); //x 좌표
			var pointY = Number(orderListInquiry[i].lat); //y 좌표
			var position = TransformCoordinate(pointX, pointY, 26, 13);
			var options = {
					layer : GLOBAL.PoiLayer,
					lon : position.x,
					lat : position.y,
					alt : 15,
					text : orderListInquiry[i].cntrkOdr+"차",
					markerImage : cwi.imgUrl, // 해당 마커 이미지 Url 
					lineColor : new Module.JSColor(0, 0, 255)
			}
			createLinePoi2(options);
			
			// 라인 그리기
			if(orderListInquiry[i].cntrkSctnTy == "LINE"){
				GLOBAL.LayerId.LineLayerId = cwi.LineLayerId;
				var lineLayer = layerList.createLayer(GLOBAL.LayerId.LineLayerId, Module.ELT_3DLINE);
				
				var lineStringArray = [];
				var geom = orderListInquiry[i].geom.split("(");
				var extractionArray = geom[1].split(")");
				var secondExtArray = extractionArray[0].split(",");
				
				for(var j=0; j < secondExtArray.length; j++) {
					var position = TransformCoordinate(parseFloat(secondExtArray[j].split(" ")[0]), parseFloat(secondExtArray[j].split(" ")[1]), 26, 13);
					lineStringArray.push( [position.x, position.y, 1000 ] );
				}
				
				let lineOption = {
						coordinates: {
							coordinate: lineStringArray,						// 정점 배열
							style: "XYZ"
						},
						type: 0,											// 실선 생성 		
						union: true,										// 지형 결합 유무
						depth: true,										// 오브젝트 겹침 유무
						color: new Module.JSColor(255, 255, 0, 0),			// ARGB 설정
						width: 3											// 선 굵기
				}
					
				var odrLineString = "odrLineString"+i;
				let line = Module.createLineString(odrLineString);
				console.log(line.createbyJson(lineOption));

				//lineLayer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
				lineLayer.addObject(line, 0);
				lineLayer.setMaxDistance(GLOBAL.MaxDistance);
			}
		}	
	}
}

//POILayer 를 추가해준다.
function setPointLayerInquiry(){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		//alert("2D환경 POI마커는 개발중입니다!");			
	}else{
		//TODO GIS
		// POI 오브젝트를 추가 할 레이어 생성
		// var layerList = new Module.JSLayerList(true);
		
		// 생성된어 있는 POI 레이어가 있을때 지워주기
		if(GLOBAL.LayerId.PoiLayerId != null){
			layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
			GLOBAL.LayerId.PoiLayerId = null;
			Module.XDRenderData();
		}
				
		// POI 레이어 이름은 각 해당 테이블명
		GLOBAL.LayerId.PoiLayerId = cwi.layerId;
		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
		
		// POI 설정
		for(var i = 0; i < poiListInquiry.resultList.length; i++){
			var pointX = Number(poiListInquiry.resultList[i].lon); //x 좌표
			var pointY = Number(poiListInquiry.resultList[i].lat); //y 좌표
			var position = TransformCoordinate(pointX, pointY, 26, 13);
			var options = {
					layer : GLOBAL.PoiLayer,
					lon : position.x,
					lat : position.y,
					text : poiListInquiry.resultList[i].cntrkNm,
					markerImage : cwi.imgUrl, // 해당 마커 이미지 Url 
					lineColor : new Module.JSColor(0, 0, 255)
			}
			createLinePoi2(options);
		}	
	}
}



// 공사정보 조회 시기 Option 정보 생성및 조회값이 있을때 처리(초기, 조회, 페이징)
function constructionInquiryOptions(){
	// 시기 년도 최초 시작년도 세팅값
	var startYear = 2010;
	// 현재 년도  
	var date = new Date();
	var year = date.getFullYear();
	var count = (year - startYear) + 2;	// 기준년도 부터 + 1Y
	
	// 최초 시작년도 부터 현재로부터 + 1Y 
	for(var i = 0; i < count; i++ ){
		var years = startYear + i;
		$("#plnYear").append('<option value="'+years+'">'+years+'</option>');
		$("#plnYearSp").append('<option value="'+years+'">'+years+'</option>');
	}
	// 1~4분기 설정
	for(var i = 1; i < 5; i++ ){
		var plnQuValue = i + "분기";
		$("#plnQu").append('<option value="'+plnQuValue+'">'+plnQuValue+'</option>');
		$("#plnQuSp").append('<option value="'+plnQuValue+'">'+plnQuValue+'</option>');
	}
	// 검색/수정시 셀렉트박스 값 유지를위한 처리 내용
	// 속성조회
	// 시기 - 년도
	if(rePlnYear != ""){
		$("#plnYear").val(rePlnYear);
	}
	// 시기 - 분기
	if(rePlnQu != ""){
		$("#plnQu").val(rePlnQu);
	}
	// 유형 - 공사유형(전체)
	if(reCntrkTy != ""){
		$("#cntrkTy").val(reCntrkTy);
	}
	// 유형 - 집행부서(전체)
	if(reChpsnPsitn != ""){
		$("#chpsnPsitn").val(reChpsnPsitn);
	}
	// 유형 - 읍명동(전체)
	if(reCntrkLcAdres != ""){
		$("#cntrkLcAdres").val(reCntrkLcAdres);
	}
	
	// 공간조회
	if(rePlnYearSp != ""){
		$("#plnYearSp").val(rePlnYearSp);
	}
	// 공간조회 - 분기
	if(rePlnQuSp != ""){
		$("#plnQuSp").val(rePlnQuSp);
	}
	
	// 공간조회 - 위치
	if(reCntrkLcAdresSp != ""){
		$("#cntrkLcAdresSp").val(reCntrkLcAdresSp);
	}
	
	// 공간조회 - 반경
	if(reRadius != ""){
		$("#radius").val(reRadius);
	}
	
	// 공간조회 - 반경
	if(geomSp != ""){
		$("#searchInquiryForm2 input[name='geomSp']").val(geomSp);
	}
	// 속성조회 / 공간조회 탭처리
	if(rePageType != ""){
		if(rePageType == "type01"){
			cwi.uiType = "type01";
			$("li[name='constructionInquiry01']").addClass("on");
			$("li[name='constructionInquiry02']").removeClass("on");
			$(".constructionInfo01").addClass("on");
		}else{
			cwi.uiType = "type02";
			$("li[name='constructionInquiry02']").addClass("on");
			$("li[name='constructionInquiry01']").removeClass("on");
			$(".constructionInfo02").addClass("on");
		}
	}
	
	
}

// 공사정보 조회 > 상세페이지 > 차수별 공사정보 세팅
function setDtlOrderInfoInquiry(){
	
	if(orderInfoInquiry != ''){
		// 공사 구간 처리(위치/구간)
		var typeValue = '';
		if(orderInfoInquiry.cntrkSctnTy == "POINT"){
			typeValue = "위치";
		}else{
			typeValue = "구간";
		}
		
		$("#cntrkSctnTy").empty();
		$("#cntrkLcAdres").empty();
		$("#cntrkDays").empty();
		$("#cntrkDtls").empty();
		
		$("#cntrkSctnTy").append(typeValue);															// 공사 구간
		$("#cntrkLcAdres").append(orderInfoInquiry.cntrkLcAdres);										// 공사 위치 주소
		$("#cntrkDays").append(orderInfoInquiry.cntrkBeginDe +" ~ "+ orderInfoInquiry.cntrkEndDe);		// 공사 기간(날짜)
		
		
		// 공사내역 공통 코드 상세 내역 표출
		var html = '', option ='', optionOdr ='', code =''; 
		for(var i=0; i < codeList.length; i++){
			if(codeList.length != 0){
				if(codeList[i].codeId == orderInfoInquiry.cntrkDtls){
					$("span[name='cntrkDtls']").append(codeList[i].codeIdNm);
				}
				//code += '<option value="<c:out value='${codeList.codeId}' />">'+codeList.resultList[i].codeIdNm+'</option>';
			}
		}
		// 등록된 셀렉트값 지정
		$("select[name='cntrkDtls']").val(orderInfoInquiry.cntrkDtls).prop("selected", true);
		
		// 공사내역 칸수 조절
		$("th[name='thRow']").attr('rowspan',codeDtlList.length);
		$("td[name='tdRow']").attr('rowspan',codeDtlList.length);
		
		// 상세코드값 지우기
		$('th[name="thFastRow"]').empty();
		$('td[name="tdFastRow"]').empty();
		$('tr[name="odrRowCode"]').remove();
		
		// 상세 코드값 적용
		for(var i=0; i< codeDtlList.length; i++){
			var codeValue = dtlCodechk(codeDtlList[i].code);
			if(i != 0){
				html += '<tr name="odrRowCode">';
				html += '	<th scope="row" class="no-bg border-left align-left">'+codeDtlList[i].codeNm+'</th>';
				html += '	<td class="align-center">'+codeValue+'</td>'
				html += '</tr>';
			}else{
				$('th[name="thFastRow"]').text(codeDtlList[i].codeNm);
				$('td[name="tdFastRow"]').text(codeValue);
			}
		}
		if(html != ''){
			$("#tbCwiOrdInfo").append(html);
		}		
	}
	
}

function dtlCodechk(chk){
	var rechk = '';
	if(dtlListCode.length != 0){
		for(var j=0; j < dtlListCode.length; j++){
			if(orderInfoInquiry.cntrkOdr == dtlListCode[j].cntrkOdr){
				if(chk == dtlListCode[j].cntrkDph){
					if(dtlListCode[j].cntrkDtls == ''){
						rechk = "-";
					}else{
						rechk = dtlListCode[j].cntrkDtls;
					}					
					break;
				}
			}
		}
	}
	return rechk;
}
function inquiryPositionCallback(pointGeom, address, point){
	cwi.position = point;
	$("#searchInquiryForm2 input[name='cntrkLcAdresSp']").val(address);
	$("#searchInquiryForm2 input[name='geomSp']").val(pointGeom); 
	
}


//공사정보조회 > 페이징 처리
function fn_selectInquiry_linkPage(pageNo){
	
	if($("#searchInquiryForm2")[0].pageType.value == "type01"){ //공사정보조회 > 공간조회
		// 조회영역에 있는 값들 가져오기
		document.searchInquiryForm.pageIndex.value = pageNo;			// 선택한 페이지 번호
		// document.searchInquiryForm.plnYear.value = rePlnYear;			// 검색된(초기 null) 년도;
		// document.searchInquiryForm.plnQu.value = rePlnQu;				// 검색된(초기 null) 분기;
		// document.searchInquiryForm.cntrkTy.value = reCntrkTy;			// 검색된(초기 null) 공사유형;
		// document.searchInquiryForm.chpsnPsitn.value = reChpsnPsitn;		// 검색된(초기 null) 집행부서;
		// document.searchInquiryForm.cntrkLcAdres.value = reCntrkLcAdres;	// 검색된(초기 null) 읍명동;
		// document.searchInquiryForm.cntrkNm.value = reCntrkNm;			// 검색된(초기 null) 공사명;
		// document.searchInquiryForm.chpsnNm.value = reChpsnNm;			// 검색된(초기 null) 담당자명;

		aj_selectConstructionInquiryList($("#searchInquiryForm")[0]); //공사정보조회 > 속성조회
	}else{
		// 조회영역에 있는 값들 가져오기
		document.searchInquiryForm2.pageIndex.value = pageNo;					// 선택한 페이지 번호
		//document.searchInquiryForm2.plnYearSp.value = rePlnYearSp;				// 검색된(초기 null) 년도;
		//document.searchInquiryForm2.cntrkLcAdresSp.value = reCntrkLcAdresSp;	// 검색된(초기 null) 분기;
		//document.searchInquiryForm2.radius.value = reRadius;					// 검색된(초기 null) 반경;
		aj_selectConstructionInquirySpaceList($("#searchInquiryForm2")[0]);
	}
	
}



//공사정보 조회 > 리스트 표출(공사정보 조회 리스트 페이지)
function aj_selectConstructionInquiryList(form){
	$("#pageType").val('type01');
	ui.loadingBar("show");
	var	formData = new FormData(form);
	$.ajax({
		type : "POST",
		url : "/job/bco/cwi/selectConstructionInquiryList.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {	
				//var uiType = cwi.uiType;
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				/*if(uiType == "type01"){
					$(".constructionInfo02").removeClass("on");
					$("li[name='constructionInquiry02']").removeClass("on");
					$(".constructionInfo01").addClass("on");
					$("li[name='constructionInquiry01']").addClass("on");
				}else{
					$(".constructionInfo01").removeClass("on");
					$("li[name='constructionInquiry01']").removeClass("on");
					$(".constructionInfo02").addClass("on");
					$("li[name='constructionInquiry02']").addClass("on");
					cwi.uiType = uiType;
				}*/
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사정보 조회 > 공간 검색 리스트 표출(공사정보 조회 리스트 페이지)
function aj_selectConstructionInquirySpaceList(form){
	ui.loadingBar("show");
	$("#pageType").val('type02');
	var	formData = new FormData(form);
	//formData.append('pageType', 'type02');
	$.ajax({
		type : "POST",
		url : "/job/bco/cwi/aj_selectConstructionInquirySpaceList.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {	
				//var uiType = cwi.uiType;
				var position = cwi.position;
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				/*if(uiType == "type01"){
					$(".constructionInfo02").removeClass("on");
					$("li[name='constructionInquiry02']").removeClass("on");
					$(".constructionInfo01").addClass("on");
					$("li[name='constructionInquiry01']").addClass("on");
				}else{
					$(".constructionInfo01").removeClass("on");
					$("li[name='constructionInquiry01']").removeClass("on");
					$(".constructionInfo02").addClass("on");
					$("li[name='constructionInquiry02']").addClass("on");
					cwi.uiType = uiType;
				}*/
				cwi.position = position;
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사정보 조회 > 상세 표출(공사정보 조회 상세 페이지)
function aj_selectConstructionInquiry(keyId){
	dtmap.vector.select(keyId);
	ui.loadingBar("show");
	var formData = new FormData();
	formData.append('cntrkPrrngId', keyId);
	formData.append('plnYear', rePlnYear);
	formData.append('cntrkTy', reCntrkTy);
	formData.append('chpsnPsitn', reChpsnPsitn);
	formData.append('cntrkLcAdres', reCntrkLcAdres);
	formData.append('cntrkNm', reCntrkNm);
	formData.append('chpsnNm', reChpsnNm);
	
	formData.append('plnYearSp', rePlnYearSp);
	formData.append('plnQuSp', rePlnQuSp);
	formData.append('cntrkLcAdresSp', reCntrkLcAdresSp);
	formData.append('radius', reRadius);
	formData.append('pageIndex', rePageIndex);
	formData.append('geomSp', geomSp);
	formData.append('pageType', $("#pageType").val());
	
	$.ajax({
		type : "POST",
		url : "/job/bco/cwi/selectConstructionInquiry.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {		
				$("#divConstructionInquiry").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				setDtlOrderInfoInquiry();
				// cmmUtil.setOdrLayers(cwi.ordLayerId, cwi.LineLayerId, cwi.imgUrl, orderListInquiry);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}


//공사정보 조회 > 상세정보 페이지 > 차수정보 조회 처리
function aj_selectConstructionInquiryOderInfo(cntrkPrrngId, orderId){

	var	formData = new FormData();
	formData.append('cntrkPrrngId', cntrkPrrngId);
	formData.append('cntrkOdr', orderId);
	
	$.ajax({
		type:"post",
		url: "/job/bco/cws/selectConstructionScheduleOderInfo.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success: function(data, status) {
			if(status == "success") {		
				var dataList = JSON.parse(data);	
				orderInfoInquiry = dataList.orderList;
				codeDtlList = dataList.codeDtlList;
				setDtlOrderInfoInquiry();
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

function removeInquiryPage(){
	destroy('All'); 	
	// 페이지 초기화
	leftPopupOpen('constructionInquiry');
}

//TODO GIS
//설정되어 있는 정보값들을 초기화 한다.
// function destroy(val){
// 	var mapType = $('input:radio[name="mapType"]:checked').val();
// 	if (mapType == "2D") {
//
// 	}else{
// 		// 레이어 생성
// 	    var layerList = new Module.JSLayerList(true);
// 		// 반경검색 레이어 삭제
// 		if(val == "Polygon" ){
// 		   if(GLOBAL.LayerId.RadiusLayerId != null){
// 			   var layer = layerList.nameAtLayer(GLOBAL.LayerId.RadiusLayerId);
// 			   if(layer != null){
// 				   layer.removeAll();
// 				   GLOBAL.LayerId.RadiusLayerId = null;
// 			   }
// 		   }
// 		   // 지도에서 선택 레이어 삭제처리
// 		   cmmUtil.drawClear();
// 		   if(GLOBAL.StartPoint){
// 			   GLOBAL.StartPoint = false;
// 			   removePoint(GLOBAL.NomalIcon);
// 		   }
// 		}else{
// 			// 반경검색 레이어 삭제
// 			if(val == "All" ){
// 			   if(GLOBAL.LayerId.RadiusLayerId != null){
// 				   var layer = layerList.nameAtLayer(GLOBAL.LayerId.RadiusLayerId);
// 				   if(layer != null){
// 					   layer.removeAll();
// 					   GLOBAL.LayerId.RadiusLayerId = null;
// 				   }
// 			   }
// 			   // 지도에서 선택 레이어 삭제처리
// 			   cmmUtil.drawClear();
// 			   if(GLOBAL.StartPoint){
// 				   GLOBAL.StartPoint = false;
// 				   removePoint(GLOBAL.NomalIcon);
// 			   }
// 			}
// 			// 차수 라인레이어 삭제
// 			if(GLOBAL.LayerId.LineLayerId != null){
// 				var layer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
// 				if(layer != null){
// 					layer.removeAll();
// 					GLOBAL.LayerId.LineLayerId = null;
// 				}
// 			}
// 			// 공사정보 poi 삭제
// 			if(GLOBAL.LayerId.PoiLayerId != null){
// 				var layer = layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId);
// 				if(layer != null){
// 					layer.removeAll();
// 					GLOBAL.LayerId.PoiLayerId = null;
// 				}
// 			}
// 			// 차수 정보 poi 삭제
// 			if(GLOBAL.LayerId.LowPoiLayerId != null){
// 				var layer = layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId);
// 				if(layer != null){
// 					layer.removeAll();
// 					GLOBAL.LayerId.LowPoiLayerId = null;
// 				}
// 			}
// 		}
// 		 Module.XDRenderData();
//
// 		// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
// 		//removeLayer3D();
// 	}
// }
