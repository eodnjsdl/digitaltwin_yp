/** 공사예정 정보 **/

var poiScheduleInfo = {
			inPlnYear : null,
			inPlnQu : null,
			inCntrkTy : null,
			inChpsnPsitn : null,
			inCntrkLcAdres : null,
			inCntrkNm : null,
			layerId : "TBD_CNTRK_PRRNG_INFO",
			ordLayerId : "TBD_CNTRK_PRRNG_ODR_INFO",
			LineLayerId : "TBD_CNTRK_PRRNG_ODR_INF",
			layerTextKey : "cntrkNm",
			imgUrl : "./images/poi/constructionSchedule_poi.png"

}

// 이벤트 등록
$(document).ready(function(){
	//TODO GIS
	// 레이어 생성
	// var layerList = new Module.JSLayerList(true);
	// GLOBAL.PoiLayer = layerList.createLayer(poiScheduleInfo.ordLayerId, Module.ELT_3DPOINT);
	// layerList.createLayer(poiScheduleInfo.LineLayerId, Module.ELT_3DLINE);
	/*loadScript('/js/egiskorea/com/cmm/cmmUtil.js');*/

	// 공사 예정 정보 > 조회버튼 클릭 이벤트
	$("button[name='cwsSearch']").unbind('click').bind('click',function(){
		document.searchScheduleForm.pageIndex.value = "1";			// 선택한 페이지 번호
		aj_selectConstructionScheduleList($("#searchScheduleForm")[0]);
	});

	// 공사 예정 정보 > 등록버튼 클릭 이벤트
	$("#cwsRegist").unbind('click').bind('click',function(){
		//destroy();				// 표출된 레이어 삭제
		poiListSchedule = '';	// poi표출리스트 리셋
		aj_insertConstructionScheduleView();
	});

	// 공사 예정 정보 > 등록페이지  > 공사 계획조회 클릭 이벤트
	$("#btnConstSchedule").unbind('click').bind('click',function(){
		if(cws.insertResult){alert("이미 등록되어 있습니다.");return;}
		//destroy();
		aj_selectInnerConstructionPlan($("#tmpForm")[0]);
	});
	// 공사 예정 정보 > 등록페이지  > 공사 계획조회 클릭 이벤트
	$("#btnUpdataConstSchedule").unbind('click').bind('click',function(){
		aj_selectInnerConstructionPlan($("#tmpForm")[0]);
	});

	// 공사 예정 정보 > 수정페이지 > 취소 버튼 클릭 이벤트
	$("#btnCwsUpdateCancel").unbind('click').bind('click',function(){
		//aj_selectConstructionScheduleList($("#tmpForm")[0]);
		//destroy();
		aj_selectConstructionSchedule($(this).data('cwsid'));

	});
	// 공사 예정 정보 > 상세페이지 > 취소 버튼 클릭 이벤트
	$("#btnCwsDtlCancel").unbind('click').bind('click',function(){
		aj_selectConstructionScheduleList($("#dtlScheduleForm")[0]);
		//destroy();
	});
	// 공사 예정 정보 > 등록페이지 > 목록 버튼 클릭 이벤트
	$("#btnCwsCancel").unbind('click').bind('click',function(){
		//destroy();
		aj_selectConstructionScheduleList($("#insertScheduleForm")[0]);

	});

	// 공사 예정 정보 > 등록페이지 > 등록 버튼 클릭 이벤트
	$("#btnCwsRegist").unbind('click').bind('click',function(){
		aj_selectConstructionScheduleList($("#tmpForm")[0]);
	});

	// 공사 예정 정보 > 상세 페이지 이동 이벤트 처리 이벤트
	$("tr[name='tdCwsDtl']").unbind('click').bind('click',function(){
		// cmmUtil.setPoiHighlight(poiScheduleInfo.layerId, $(this).data('cwsid'));
		// cmmUtil.setCameraMove($(this).data('lon'), $(this).data('lat'));
		aj_selectConstructionSchedule($(this).data('cwsid'));

	});

	// 공사 예정 정보> 등록페이지 > 공사계획 정보 조회 > 조회 버튼 이벤트
	$("button[name='cplSearchInner']").unbind('click').bind('click',function(){
		fn_select_constructionScheduleInner($("#innerSearchForm")[0]);
	});


	// 공사 예정 정보 > 등록페이지 > 공사계획 정보 조회 > 체크박스 하나만 선택되도록 처리 이벤트
	$("input[name='innerChkbox']").unbind('click').bind('click',function(){
		$("input[name='innerChkbox']").prop("checked", false);
		$(this).prop("checked", true);
	});

	// 공사 예정 정보 > 등록페이지 > 공사계획 정보 조회 > 선택 버튼 처리 이벤트
	$("button[name='selectCheck']").unbind('click').bind('click',function(){
		var checkedId = $("input[name='innerChkbox']:checked").attr("id");
		//callDefaultOptions();
		// 선택 여부 확인
		if(checkedId == undefined){alert("체크박스를 선택해주세요"); return false;}
		$("#cntrkTy").val($('#'+checkedId)[0].dataset.cntrkty); 						// 공사유형
		$("#cntrkNm").val($('#'+checkedId)[0].dataset.cntrknm);							// 공사명
		$("#chpsnPsitn").val($('#'+checkedId)[0].dataset.chpsnpsitn);					// 담당부서
		$("#chpsnNm").val($('#'+checkedId)[0].dataset.chpsnnm);							// 이름
		$("#frstRegisterId").val($('#'+checkedId)[0].dataset.frstregisterid);			// 아이디
		$("#cntrkLcAdresNomal").val($('#'+checkedId)[0].dataset.cntrklcadres);				// 주소
		$("#chpsnCttpc").val($('#'+checkedId)[0].dataset.chpsncttpc);					// 전화번호
		$("#cntrkOtl").val($('#'+checkedId)[0].dataset.cntrkotl);						// 공사 개요
		$("#plnYear").val($('#'+checkedId)[0].dataset.plnyear).prop("selected", true);	// 년도
		$("#plnQu").val($('#'+checkedId)[0].dataset.plnqu).prop("selected", true);		// 분기
		$("#position").val("point("+$('#'+checkedId)[0].dataset.lon+" "+$('#'+checkedId)[0].dataset.lat+")");
		//$("#cntrkOdr").prop('disabled',false);										// 차수정보 수정가능하게 속성정보 변경

		$("#innerConstructionPlan").remove();
	});

	// 공사 예정 정보 > 등록페이지 > 차수별 공사정보 > 지도 에서 선택 처리 이벤트(좌표값 획득, poi마커 표출)
	$("#getPositionNomal").unbind('click').bind('click',function(){
		//destroy();
		// cmmUtil.getPositionGeom(positionNomalCallback);
	});

	// 공사 예정 정보 > 수정페이지 > 차수별 공사정보 > 지도 에서 선택 처리 이벤트(좌표값 획득, poi마커 표출)
	$("#getPositionNomalUp").unbind('click').bind('click',function(){
		//destroy();
		// cmmUtil.getPositionGeom(positionNomalUpCallback);
	});

	// 공사 예정 정보 > 등록페이지 > 차수별 공사정보 > 지도 에서 선택 처리 이벤트(좌표값 획득, poi마커 표출)
	$("#getPositionLocation").unbind('click').bind('click',function(){
		if(cws.insertVisible){
			//destroy();
			if($("#rChk1_1").is(":checked")){
				// cmmUtil.getPositionGeom(positionCallback);
			}else{
				// cmmUtil.drawLine(positionCallback);
				//alert("구간 기능 개발중");
			}
		}else{
			alert("기본정보가 등록되어 있어야지만 사용이 가능합니다.");
		}
	});

	// 공사 예정 정보 > 수정페이지 > 지도 에서 선택 처리 이벤트(좌표값 획득, poi마커 표출)
	$("#updateGetPositionLocation").unbind('click').bind('click',function(){
		destroy("startPoint");
		if($("#rChk2_1").is(":checked")){
			// cmmUtil.getPositionGeom(updatePositionCallback);
		}else{
			//alert("구간 기능 개발중");
			// cmmUtil.drawLine(updatePositionCallback);
		}

	});



	// 공사 예정 정보 > 상세페이지 > 수정페이지 이동 처리 이벤트
	$("#btnCwsUpdate").unbind('click').bind('click',function(){
		//destroy(); orderListSchedule = '';
		aj_updateConstructionScheduleView($(this).data('cwsid'));
	});

	// 공사 예정 정보 > 상세페이지 >  차수정보 차수 셀렉트박스 처리 이벤트
	$("#cntrkOdrDtl").unbind('change').bind('change',function(){
		if($(this).val() != ''){
			for(var i=0; i < orderListSchedule.length; i++ ){
				if($(this).val() == orderListSchedule[i].cntrkOdr){
					//cmmUtil.setCameraMove(orderListSchedule[i].lon , orderListSchedule[i].lat);
					// cmmUtil.setCameraMovelonlatAlt(orderListSchedule[i].lon , orderListSchedule[i].lat, false, 80, 45);
				}
			}
			aj_selectConstructionScheduleOderInfo($(this).data("cntrkprrngid"), $(this).val(), false);
		}
	});

	// 공사 예정 정보 > 수정페이지 >  차수정보 차수 셀렉트박스 처리 이벤트
	$("#updateCntrkOdr").unbind('change').bind('change',function(){
		if($(this).val() != ''){
			var visible = false;
			if(orderListInfo != ''){
				for(var i = 0; i < orderListInfo.length; i++){
					if($(this).val() == orderListInfo[i].cntrkOdr){
						//cmmUtil.setCameraMove(orderListInfo[i].lon , orderListInfo[i].lat);
						// cmmUtil.setCameraMovelonlatAlt(orderListInfo[i].lon , orderListInfo[i].lat, false, 80, 45);
						visible = true;
					}
				}
			}
			if(visible){
				aj_selectConstructionScheduleOderInfo($(this).data("cntrkprrngid"), $(this).val(), true);
			}else{
				$("#updataOdrForm input[name='cntrkLcAdres']").val('');				// 공사 위치 주소
				$("#cntrkBeginDe").val('');					// 공사 시작날짜
				$("#cntrkEndDe").val('');						// 공사 종료날짜
				$("#updataOdrForm input[name='geom']").val("");
				// 상세코드값 지우기
				$('th[name="thFastRow"]').empty();
				$('td[name="tdFastRow"]').empty();
				$('tr[name="odrRowCode"]').remove();
			}
		}
	});

	// 공사 예정 정보 > 상세페이지 >  차수정보 체크박스 이벤트
	$("input[name='ordChkAll']").unbind('change').bind('change',function(){
		if($(this).is(":checked")){
		    $("input[name='ordCkbox']").prop('checked',true);
		}

		if(!$(this).is(":checked")){
		    $("input[name='ordCkbox']").prop('checked',false);
		}

	});


	// 공사 예정 정보 > 수정페이지 > 차수정보 변경 이벤트
/*	$("#updataNomalForm select[name='cntrkOdr']").unbind('change').bind('change',function(){
		var html = '';
		for(var i=1; i <= Number($(this).val()); i++ ){
			html += "<option value='"+[i]+"'>"+[i]+"차</option>"
		}

		$("#updataOdrForm select[name='cntrkOdr']").empty();
		$("#updataOdrForm select[name='cntrkOdr']").append(html);

	});*/

	// 공사 예정 정보 > 수정 페이지 > 공사내역 셀렉트박스 변경 이벤트
	$("#updataOdrForm select[name='cntrkDtls']").unbind('change').bind('change',function(){
		aj_selectConstructionScheduleDtlCode($(this).val());
	});

	// 공사 예정 정보 > 등록 페이지 > 공사내역 셀렉트박스 변경 이벤트
	$("#insertOdrForm select[name='cntrkDtls']").unbind('change').bind('change',function(){
		aj_selectConstructionScheduleDtlCode($(this).val());
	});


	// poi 표출 리스트 확인후 값이 있을때 poi생성
	// if(Number(poiListSchedule.resultCnt) != 0){
		//cmmUtil.setPointLayer(poiListSchedule.resultList, poiScheduleInfo.layerTextKey, poiScheduleInfo.layerId, poiScheduleInfo.imgUrl);
		// if(poiListSchedule != ''){
			//setPointLayer();
			// cmmUtil.setPointLayer(poiListSchedule.resultList, poiScheduleInfo.layerId, "cntrkPrrngId", "cntrkNm", poiScheduleInfo.imgUrl, (feature) => {
				//$(`.bbs-list tr[data-cwsid='${feature.getId()}']`).trigger('click');
				// aj_selectConstructionSchedule(`${feature.getId()}`);
			// });
		// }
	// }

});

//TODO GIS
//POILsyrt를 추가해준다.
// function setPointLayer(){
// 	var mapType = $('input:radio[name="mapType"]:checked').val();
// 	if(mapType == "2D"){
// 		//alert("2D환경 POI마커는 개발중입니다!");
// 	}else{
// 		// POI 오브젝트를 추가 할 레이어 생성
// 		var layerList = new Module.JSLayerList(true);
//
// 		// 생성된어 있는 POI 레이어가 있을때 지워주기
// 		if(GLOBAL.LayerId.PoiLayerId != null){
// 			layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId).removeAll();
// 			GLOBAL.LayerId.PoiLayerId = null;
// 			Module.XDRenderData();
// 		}
//
// 		// POI 레이어 이름은 각 해당 테이블명
// 		GLOBAL.LayerId.PoiLayerId = poiScheduleInfo.layerId;
// 		GLOBAL.PoiLayer = layerList.createLayer(GLOBAL.LayerId.PoiLayerId, Module.ELT_3DPOINT);
//
// 		// POI 설정
// 		for(var i = 0; i < poiListSchedule.resultList.length; i++){
// 			var pointX = Number(poiListSchedule.resultList[i].lon); //x 좌표
// 			var pointY = Number(poiListSchedule.resultList[i].lat); //y 좌표
// 			var position = TransformCoordinate(pointX, pointY, 26, 13);
// 			var options = {
// 					layer : GLOBAL.PoiLayer,
// 					lon : position.x,
// 					lat : position.y,
// 					text : poiListSchedule.resultList[i].cntrkNm,
// 					markerImage : poiScheduleInfo.imgUrl, // 해당 마커 이미지 Url
// 					lineColor : new Module.JSColor(0, 0, 255)
// 			}
// 			createLinePoi2(options);
// 		}
// 	}
// }

//페이징 처리
function fn_selectSchedule_linkPage(pageNo){
	// 조회영역에 있는 값들 가져오기
/*	cwp.inPlnYear = $("#plnYear").val();
	cwp.inPlnQu = $("#plnQu").val();
	cwp.inCntrkTy = $("#cntrkTy").val();
	cwp.inChpsnPsitn = $("#chpsnPsitn").val();
	cwp.inCntrkLcAdres = $("#cntrkLcAdres").val();
	cwp.inCntrkNm = $("#cntrkNm").val();*/

	document.searchScheduleForm.pageIndex.value = pageNo;			// 선택한 페이지 번호
	// document.searchScheduleForm.plnYear.value = rePlnYear;			// 검색된(초기 null) 년도;
	// document.searchScheduleForm.plnQu.value = rePlnQu;				// 검색된(초기 null) 분기;
	// document.searchScheduleForm.cntrkTy.value = reCntrkTy;			// 검색된(초기 null) 공사유형;
	// document.searchScheduleForm.chpsnPsitn.value = reChpsnPsitn;	// 검색된(초기 null) 집행부서;
	// document.searchScheduleForm.cntrkLcAdres.value = reCntrkLcAdres;// 검색된(초기 null) 읍명동;
	// document.searchScheduleForm.cntrkNm.value = reCntrkNm;			// 검색된(초기 null) 공사명;

	aj_selectConstructionScheduleList($("#searchScheduleForm")[0]);
}

// 사업공유관리 > 공사예정정보 > 등록하기 > 공사계획정보 조회  selectInnerConstructionPlan 페이징 검색 처리
function fn_select_constructionScheduleInner(){
	document.innerSearchForm.pageIndex.value = 1;
	//$('#divConstructionPlan input[name="pageIndex"]').val(1);
	aj_selectInnerConstructionPlan($("#innerSearchForm")[0]);
}

// 공사예정정보 > 등록페이지 > 공사계획정보 조회 페이지 > 페이징처리
function fn_select_constructionScheduleInnerPage(pageNo){
	//$('#divConstructionPlan input[name="pageIndex"]').val(pageNo);
	$("#innerSearchForm")[0].pageIndex.value = pageNo;
	aj_selectInnerConstructionPlan($("#innerSearchForm")[0]);
}

//공사예정 정보 > 등록페이지 > 차수 Option 정보 처리 1~10까지.
function callDefaultOptions(){
	// 차수 입력
	var html ='';
	for(var i=1; i < 11; i++){
		html += "<option value='"+[i]+"'>"+[i]+"차</option>";
	}
	$("#cntrkOdr").empty();
	$("#cntrkOdr").append(html);

	$("#cntrkOdr2").empty();
	$("#cntrkOdr2").append(html);
}

//공사예정 정보 > 수정페이지 > 차수 Option 정보 처리 1~10까지.
function updataDefaultOptions(){
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
	}
	// 1~4분기 설정
	for(var i = 1; i < 5; i++ ){
		var plnQuValue = i + "분기";
		$("#plnQu").append('<option value="'+plnQuValue+'">'+plnQuValue+'</option>');
	}
	// 검색/수정시 셀렉트박스 값 유지를위한 처리 내용
	// 시기 - 년도
	if(upPlnYear != ""){
		$("#plnYear").val(upPlnYear);
	}
	// 시기 - 분기
	if(upPlnQu != ""){
		$("#plnQu").val(upPlnQu);
	}

	// 공사유형
	$("#cntrkTy").val(upCntrkTy).prop("selected", true);

	// 담당과
	$("#chpsnPsitn").val(upChpsnPsitn).prop("selected", true);

	// 차수 입력
	var html ='', html2 ='';
	for(var i=1; i < 11; i++){
		html += "<option value='"+[i]+"'>"+[i]+"차</option>";
	}
	$("#cntrkOdr").append(html);

	for(var i=1; i <= Number(reCntrkOdr); i++){
		html2 += "<option value='"+[i]+"'>"+[i]+"차</option>";
	}
	$("#updataOdrForm select[name='cntrkOdr']").append(html2);

	// 입력된 차수정보 선택 처리 )
	if(reCntrkOdr != ""){
		$("#cntrkOdr").val(reCntrkOdr).prop("selected", true);
	}

	$("#updataOdrForm input[name='cntrkLcAdres']").val(orderInfo.cntrkLcAdres);
	// 공사위치 주소 정보 넣기

}


// 공사예정 정보 시기 Option 정보 생성및 조회값이 있을때 처리
function callSelectOptions(){
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
	}
	// 1~4분기 설정
	for(var i = 1; i < 5; i++ ){
		var plnQuValue = i + "분기";
		$("#plnQu").append('<option value="'+plnQuValue+'">'+plnQuValue+'</option>');
	}
	// 검색/수정시 셀렉트박스 값 유지를위한 처리 내용
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
}

// 공사예정 정보 > 등록페이지 > 공사계획정보 조회(초기 세팅및 검색시 세팅)
function callSelectOptionsInner(){
	// 시기 년도 최초 시작년도 세팅값
	var startYear = 2010;
	// 현재 년도
	var date = new Date();
	var year = date.getFullYear();
	var count = (year - startYear) + 2;	// 기준년도 부터 + 1Y

	// 최초 시작년도 부터 현재로부터 + 1Y
	for(var i = 0; i < count; i++ ){
		var years = startYear + i;
		$("#plnYearInner").append('<option value="'+years+'">'+years+'</option>');
	}
	// 1~4분기 설정
	for(var i = 1; i < 5; i++ ){
		var plnQuValue = i + "분기";
		$("#plnQuInner").append('<option value="'+plnQuValue+'">'+plnQuValue+'</option>');
	}
	// 검색/수정시 셀렉트박스 값 유지를위한 처리 내용
	// 시기 - 년도
	if(rePlnYearInner != ""){
		$("#plnYearInner").val(rePlnYearInner);
	}
	// 시기 - 분기
	if(rePlnQuInner != ""){
		$("#plnQuInner").val(rePlnQuInner);
	}
	// 유형 - 공사유형(전체)
	if(reCntrkTyInner != ""){
		$("#cntrkTyInner").val(reCntrkTyInner);
	}
	// 유형 - 집행부서(전체)
	if(reChpsnPsitnInner != ""){
		$("#chpsnPsitnInner").val(reChpsnPsitnInner);
	}
	// 유형 - 읍명동(전체)
	if(reCntrkLcAdresInner != ""){
		$("#cntrkLcAdresInner").val(reCntrkLcAdresInner);
	}
}


//공사예정 정보 > 수정페이지 > 차수별 공사정보 세팅
function setDtlOrderInfo(type){
	if(orderInfo != ''){
		// 공사 구간 처리(위치/구간)
		if(orderInfo.cntrkSctnTy == "POINT"){
			$("#rChk2_1").prop('checked', true);
		}else{
			$("#rChk2_2").prop('checked', true);
		}

		$("#odrCntrkLcAdres").val(orderInfo.cntrkLcAdres);				// 공사 위치 주소
		$("#cntrkBeginDe").val(orderInfo.cntrkBeginDe);					// 공사 시작날짜
		$("#cntrkEndDe").val(orderInfo.cntrkEndDe);						// 공사 종료날짜


		// 공사내역 공통 코드 상세 내역 표출
		var html = '', option ='',optionOdr ='';

		// 등록된 셀렉트값 지정
		$("select[name='cntrkDtls']").val(orderInfo.cntrkDtls).prop("selected", true);



		// 공사내역 칸수 조절
		$("th[name='thRow']").attr('rowspan',codeDtlList.length);
		$("td[name='tdRow']").attr('rowspan',codeDtlList.length);

		// 상세코드값 지우기
		$('th[name="thFastRow"]').empty();
		$('td[name="tdFastRow"]').empty();
		$('tr[name="odrRowCode"]').remove();

		// 상세 코드값 적용
		if(type){
			// 차수정보 차수 셀렉트박스 선택
			$("#updateCntrkOdr").val(orderInfo.cntrkOdr).prop("selected", true);
			for(var i=0; i< codeDtlList.length; i++){

				var codeValue = dtlCodechk(codeDtlList[i].code);
				if(i != 0){
					html += '<tr name="odrRowCode">';
					html += '	<th scope="row" class="no-bg border-left align-left">'+codeDtlList[i].codeNm+'</th>';
					html += '	<td class="align-center"><input type="text" class="form-control" data-code ="'+codeDtlList[i].code+'" name="dtlCode" value="'+codeValue+'"></td>'
					html += '</tr>';
				}else{
					$('th[name="thFastRow"]').text(codeDtlList[i].codeNm);
					$('td[name="tdFastRow"]').append('<input type="text" class="form-control" data-code ="'+codeDtlList[i].code+'" name="dtlCode" value="'+codeValue+'">');
				}
			}
		}else{
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
		}

		if(html != ''){
			$("#tbCwsOrdInfo").append(html);
		}
	}
}

function dtlCodechk(chk){
	var rechk = '';
	if(dtlListCode.length != 0){
		for(var j=0; j < dtlListCode.length; j++){
			if(orderInfo.cntrkOdr == dtlListCode[j].cntrkOdr){
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
function orderListInfoChk(){
	var count = $("#updataNomalForm select[name='cntrkOdr']").val();
	var chk = false;
	for(var i=0; i < orderListInfo.length; i++){
		if( Number(orderListInfo[i].cntrkOdr) > Number(count)){
			chk = true;
		}
	}
	return chk;
}


// 공사예정 정보 > 등록페이지 > 기본정보 등록후 차수별 공사정보 세팅
function odrCwsSetOptions(data){
	cws.cntrkPrrngId = data.cntrkPrrngId;
	var html = '', option ='',optionOdr ='';
	// 공사내역 칸수 조절
	$("th[name='thRow']").attr('rowspan',data.codeDtlList.length);
	$("td[name='tdRow']").attr('rowspan',data.codeDtlList.length);

	for(var i=0; i< data.codeList.length; i++){
		option += '<option value="'+data.codeList[i].codeId+'">'+data.codeList[i].codeIdNm+'</option>';
	}
	// 셀렉트박스에 옵션값 추가
	$("select[name='cntrkDtls']").append(option);
	// 등록된 셀렉트값 지정
	$("select[name='cntrkDtls']").val(data.codeDtlList[0].codeId).prop("selected", true);

	cws.cntrkOdr = parseInt(data.searchVO.cntrkOdr);
	for(var i=1; i <= parseInt(data.searchVO.cntrkOdr); i++){
		optionOdr += '<option value="'+[i]+'">'+[i]+'차</option>';
	}
	$("select[name='cntrkOdr']").append(optionOdr);
	$("#cntrkPrrngId").val(data.cntrkPrrngId);

	// 기본정보 차수 셀렉트 막기
	$("#insertNomalForm select[name='cntrkOdr']").prop('disabled',true);

	// 공사 내역 상세정보 표출
	setConstructionInfo(data);
}

// 공사 내역 상세정보 표출
function setConstructionInfo(data){
	var html ='';
	// 공사내역 칸수 조절
	$("th[name='thRow']").attr('rowspan',data.codeDtlList.length);
	$("td[name='tdRow']").attr('rowspan',data.codeDtlList.length);

	// 상세코드값 지우기
	$('th[name="thFastRow"]').empty();
	$('td[name="tdFastRow"]').empty();
	$('tr[name="odrRowCode"]').remove();

	// 상세 코드값 적용
	for(var i=0; i< data.codeDtlList.length; i++){
		if(i != 0){
			html += '<tr name="odrRowCode">';
			html += '	<th scope="row" class="no-bg border-left align-left">'+data.codeDtlList[i].codeNm+'</th>';
			html += '	<td class="align-center"><input type="text" class="form-control" data-code ="'+data.codeDtlList[i].code+'" name="dtlCode"></td>'
			html += '</tr>';
		}else{
			$('th[name="thFastRow"]').text(data.codeDtlList[i].codeNm);
			$('td[name="tdFastRow"]').append('<input type="text" class="form-control" data-code ="'+data.codeDtlList[i].code+'" name="dtlCode">');
		}


	}
	if(html != ''){
		$("#tbCwsOrdInfo").append(html);
	}
}

// 공사 예정 정보 > 등록페이지 > 지도에서 선택 이벤트 콜백 처리
function positionNomalCallback(pointGeom, address){
	$("#insertNomalForm input[name='cntrkLcAdres']").val(address);
	$("#insertNomalForm input[name='geom']").val(pointGeom);
}
//공사 예정 정보 > 수정페이지 > 지도에서 선택 이벤트 콜백 처리
function positionNomalUpCallback(pointGeom, address){
	$("#updataNomalForm input[name='cntrkLcAdres']").val(address);
	$("#updataNomalForm input[name='geom']").val(pointGeom);
}
function positionCallback(pointGeom, address){
	$("#insertOdrForm input[name='cntrkLcAdres']").val(address);
	$("#insertOdrForm input[name='geom']").val(pointGeom);
}
function updatePositionCallback(pointGeom, address){
	$("#updataOdrForm input[name='cntrkLcAdres']").val(address);
	$("#updataOdrForm input[name='geom']").val(pointGeom);
}
// 페이지 구분자 : pageType
// 공사 예정 정보 > 등록페이지 > 차수별 공사정보 하단 (등록된 차수정보 표출 및 등록된 공사차수 선택 안되게 처리함).
// 공사 예정 정보 > 상세페이지 > 차수별 공사정보 하단 (삭제 이후 갱신처리).
function setInsertOdrInfo(data, pageType){

	var html = '', tagetNm = '';
	if(pageType == "odrDtlPage"){ // 상세 페이지
		$("tbody[name='tbodyOdrInfo']").empty();
		$("select[name='cntrkOdr']").empty();
		if(data.length == 0){
			html = '<tr><td colspan="4">데이터가 없습니다.</td></tr>';
		}else{
			for(var i=0; i<data.length; i++){
				html += "<tr data-cntrkPrrngId='"+data[i].cntrkPrrngId+"' >";
				html += '   <td><span class="form-checkbox"><span><input type="checkbox" name="ordCkbox" id="ordCkbox'+data[i].cntrkOdr+'" data-odr="'+data[i].cntrkOdr+'"><label for="ordCkbox'+data[i].cntrkOdr+'"></label></span></span></td>';
				html += "	<td>"+data[i].cntrkOdr+" 차</td>";
				html +=	"	<td>"+data[i].cntrkLcAdres+"</td>";
				html +=	"	<td>"+data[i].cntrkBeginDe+"~"+data[i].cntrkEndDe+"</td>";
				html += "</tr>";
				$("select[name='cntrkOdr']").append("<option value='"+data[i].cntrkOdr+"'>"+data[i].cntrkOdr+"차</option>");
			}
		}
		tagetNm = "tbodyOdrInfo";
	}else if(pageType == "odrInsertPage"){ // 등록페이지
		$("tbody[name='tbodyOdrInfo']").empty();
		if(data.length  == 0){
			html = '<tr data-cntrkOdr = ""><td colspan="3">데이터가 없습니다.</td></tr>';
		}else{
			for(var i=0; i<data.length; i++){
				html += "<tr data-cntrkOdr = "+data[i].cntrkOdr+">";
				html += "	<td>"+data[i].cntrkOdr+" 차</td>";
				html +=	"	<td>"+data[i].cntrkLcAdres+"</td>";
				html +=	"	<td>"+data[i].cntrkBeginDe+"~"+data[i].cntrkEndDe+"</td>";
				html += "</tr>";
				$("select option[value='"+data[i].cntrkOdr+"']").prop('disabled',true);
			}
		}
		tagetNm = "tbodyOdrInfo";
	}else if(pageType == "odrUpdatePage"){ // 수정페이지

		orderListInfo = data; // 수정페이지 차수리스트 정보
		$("tbody[name='tbodyOdrUpdateInfo']").empty(); // 기존 차수정보 지우기

		// 차수정보 표출
		if(data.length == 0){
			html = '<tr><td colspan="4">데이터가 없습니다.</td></tr>';
		}else{
			for(var i=0; i<data.length; i++){
				html += "<tr data-cntrkPrrngId='"+data[i].cntrkPrrngId+"' >";
				html += '   <td><span class="form-checkbox"><span><input type="checkbox" name="ordCkbox" id="ordCkbox'+data[i].cntrkOdr+'" data-odr="'+data[i].cntrkOdr+'"><label for="ordCkbox'+data[i].cntrkOdr+'"></label></span></span></td>';
				html += "	<td>"+data[i].cntrkOdr+" 차</td>";
				html +=	"	<td>"+data[i].cntrkLcAdres+"</td>";
				html +=	"	<td>"+data[i].cntrkBeginDe+"~"+data[i].cntrkEndDe+"</td>";
				html += "</tr>";
			}
		}
		tagetNm = "tbodyOdrUpdateInfo";
	}

	$("tbody[name='"+tagetNm+"']").append(html);


}

/******************************************************** 아작스 호출 영역 ************************************************************/
// 공사예정 정보 > 리스트 표출(공사 예정 정보 리스트 페이지)
function aj_selectConstructionScheduleList(form){

	ui.loadingBar("show");
	var	formData = new FormData(form);

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/selectConstructionScheduleList.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}
// --------------------------------------------------------- 상세 --------------------------------------------------
//공사예정 정보 > 상세정보페이지 이동 (상세 내역 조회하기)
function aj_selectConstructionSchedule(keyId){
	dtmap.vector.select(keyId);
//	poiListScheduleDtl = poiListSchedule;		// poi표출 list백업
	poiListSchedule = ''; 						// js로드시 해당값이 있을경우 poi표출하므로 백업처리후 리스트 초기화
	ui.loadingBar("show");
	var formData = new FormData();
	formData.append('cntrkPrrngId', keyId);
/*	formData.append('plnYear', rePlnYear);
	formData.append('plnQu', rePlnQu);
	formData.append('cntrkTy', reCntrkTy);
	formData.append('chpsnPsitn', reChpsnPsitn);
	formData.append('cntrkLcAdres', reCntrkLcAdres);
	formData.append('cntrkNm', reCntrkNm);
	formData.append('pageIndex', rePageIndex);*/
	if(rePageChk){
		formData.append('plnYear', rePlnYear);
		formData.append('plnQu', rePlnQu);
		formData.append('cntrkTy', reCntrkTy);
		formData.append('chpsnPsitn', reChpsnPsitn);
		formData.append('cntrkLcAdres', reCntrkLcAdres);
		formData.append('cntrkNm', reCntrkNm);
		formData.append('pageIndex', rePageIndex);
	}else{
		formData.append('plnYear', rePlnYearDtl);
		formData.append('plnQu', rePlnQuDtl);
		formData.append('cntrkTy', reCntrkTyDtl);
		formData.append('chpsnPsitn', reChpsnPsitnDtl);
		formData.append('cntrkLcAdres', reCntrkLcAdresDtl);
		formData.append('cntrkNm', reCntrkNmDtl);
		formData.append('pageIndex', rePageIndexDtl);
	}

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/selectConstructionSchedule.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#divConstructionSchedule").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				setDtlOrderInfo();
				if(orderListSchedule.length != 0){
					// cmmUtil.setOdrLayers(poiScheduleInfo.ordLayerId, poiScheduleInfo.LineLayerId, poiScheduleInfo.imgUrl, orderListSchedule);
				}else{
					// destroy("lowPoint");
				}

				// 마우스 상태 설정
				// Module.XDSetMouseState(Module.MML_SELECT_POINT);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

// 공사예정 정보 > 상세정보페이지 > 차수정보 조회 처리
// 공사예정 정보 > 수정정보페이지 > 차수정보 조회 처리
function aj_selectConstructionScheduleOderInfo(cntrkPrrngId, orderId, type){

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
				orderInfo = dataList.orderList;	// 차수정보 리스트
				codeDtlList = dataList.codeDtlList;	// 공사내역 상세
				setDtlOrderInfo(type);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사예정 정보 > 상세정보페이지 > 차수정보 삭제 처리
function aj_deleteConstructionScheduleOrder(objParams, type){
	 $.ajax({
		 url 		 : "/job/bco/cws/deleteConstructionScheduleOrder.do",
         dataType	 :   "json",
         contentType :   "application/x-www-form-urlencoded; charset=UTF-8",
         type        :   "post",
         data        :   objParams,
     	success: function(data, status) {
			if(status == "success") {
				orderListSchedule = data.odrList;
				setInsertOdrInfo(data.odrList, type);
				// cmmUtil.setOdrLayers(poiScheduleInfo.ordLayerId, poiScheduleInfo.LineLayerId, poiScheduleInfo.imgUrl, orderListSchedule);	// 차수정보 표출
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	 });
}

//공사예정 정보 > 상세정보페이지 > 예정정보 삭제 처리(예정정보 테이블, 차수테이블 삭제)
function aj_deleteConstructionSchedule(cntrkPrrngId){

	var	formData = new FormData();
	formData.append('cntrkPrrngId', cntrkPrrngId);
	formData.append('plnYear', rePlnYearDtl);
	formData.append('plnQu', rePlnQuDtl);
	formData.append('cntrkTy', reCntrkTyDtl);
	formData.append('chpsnPsitn', reChpsnPsitnDtl);
	formData.append('cntrkLcAdres', reCntrkLcAdresDtl);
	formData.append('cntrkNm', reCntrkNmDtl);
	formData.append('pageIndex', rePageIndexDtl);

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/deleteConstructionSchedule.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//--------------------------------------------------------- 수정 --------------------------------------------------
//공사 예정 정보 > 상세페이지 > 수정페이지로 이동
function aj_updateConstructionScheduleView(keyId){
	ui.loadingBar("show");
	var formData = new FormData();
	formData.append('cntrkPrrngId', keyId);
	formData.append('plnYear', rePlnYearDtl);
	formData.append('plnQu', rePlnQuDtl);
	formData.append('cntrkTy', reCntrkTyDtl);
	formData.append('chpsnPsitn', reChpsnPsitnDtl);
	formData.append('cntrkLcAdres', reCntrkLcAdresDtl);
	formData.append('cntrkNm', reCntrkNmDtl);
	formData.append('pageIndex', rePageIndexDtl);

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/updateConstructionScheduleView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#divConstructionSchedule").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				//cmmUtil.setOdrLayers(poiScheduleInfo.ordLayerId, poiScheduleInfo.LineLayerId, poiScheduleInfo.imgUrl, orderListInfo);

			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}


//공사예정 정보 > 수정페이지 > 기본정보 갱신 처리
function aj_updateConstructionScheduleNomal(form){
	var formData = new FormData(form);
	if($("#rChk1_1").is(":checked")){
		keyId = "Y";
	}else{
		keyId = "N";
	}

	formData.append('pnrsAt', keyId);
	//formData.append('plnYear', $("#plnYear").val());
	//formData.append('plnQu', $("#plnQu").val());
	//formData.append('chpsnPsitn', $("#chpsnPsitn").val());

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/updateConstructionScheduleNomal.do",
		data: formData,
		processData : false,
		contentType : false,
		async: false,
		success: function(data, status) {
			if(status == "success") {
				var dataList = JSON.parse(data);
				//setConstructionInfo(dataList);

				// 변경된 기본정보 차수 -> 차수별 공사정보 차수에 적용
				var html = '', odrHtml='';
				for(var i=1; i <= Number(dataList.searchVO.cntrkOdr); i++ ){
					html += "<option value='"+[i]+"'>"+[i]+"차</option>"
				}

				$("#updataOdrForm select[name='cntrkOdr']").empty();
				$("#updataOdrForm select[name='cntrkOdr']").append(html);

				// 기존 차수리스트 표출 내역 지우기
				$("tbody[name='tbodyOdrUpdateInfo']").empty();
				orderListInfo = dataList.odrList;
				// 조회된 차수리스트 표출하기
				if(dataList.odrList != ''){
					var data = dataList.odrList;
					for(var i=0; i<data.length; i++){
						odrHtml += "<tr data-cntrkPrrngId='"+data[i].cntrkPrrngId+"' >";
						odrHtml += '    <td style="width: 36px;"><span class="form-checkbox"><span><input type="checkbox" name="ordCkbox" id="ordCkbox'+data[i].cntrkOdr+'" data-odr="'+data[i].cntrkOdr+'"><label for="ordCkbox'+data[i].cntrkOdr+'"></label></span></span></td>';
						odrHtml += "	<td style='width: 15%;'>"+data[i].cntrkOdr+" 차</td>";
						odrHtml += "	<td style='width: auto;'>"+data[i].cntrkLcAdres+"</td>";
						odrHtml += "	<td style='width: auto;'>"+data[i].cntrkBeginDe+"~"+data[i].cntrkEndDe+"</td>";
						odrHtml += "</tr>";
					}

				}else{
					odrHtml = '<td colspan="4">데이터가 없습니다.</td>';
				}

				$("tbody[name='tbodyOdrUpdateInfo']").append(odrHtml);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	})
}
//--------------------------------------------------------- 등록 --------------------------------------------------
var dataList = '';
// 공사예정 > 등록페이지/수정페이지 > 공사내역 공통상세코드 정보 조회
function aj_selectConstructionScheduleDtlCode(codeId){
	//ui.loadingBar("show");
	var formData = new FormData();
	formData.append('codeId', codeId);
	$.ajax({
		type : "POST",
		url : "/job/bco/cws/selectConstructionScheduleDtlCode.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success: function(data, status) {
			if(status == "success") {
				dataList = JSON.parse(data);
				setConstructionInfo(JSON.parse(data));
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	})
}

// 공사예정 정보 > 등록 페이지로 이동 처리
function aj_insertConstructionScheduleView(){
	ui.loadingBar("show");
	var formData = new FormData();
	formData.append('PlnYear', rePlnYear);
	formData.append('PlnQu', rePlnQu);
	formData.append('cntrkTy', reCntrkTy);
	formData.append('chpsnPsitn', reChpsnPsitn);
	formData.append('cntrkLcAdres', reCntrkLcAdres);
	formData.append('cntrkNm', reCntrkNm);
	formData.append('pageIndex', rePageIndex);

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/insertConstructionScheduleView.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#divConstructionSchedule").html(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

// 공사 계획정보 > 등록페이지 > 공사계획 조회 (innerPopup 호출)
function aj_selectInnerConstructionPlan(form){
	ui.loadingBar("show");
	var	formData = new FormData(form);

	formData.append('cntrkPrrngPrcuseAt', "Y");

	$.ajax({
		type : "POST",
		url : "/job/bco/cws/selectInnerConstructionPlan.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				//$("#rightSubPopup").append(returnData);
				if($("#innerConstructionPlan")[0] != undefined){
					$("#innerConstructionPlan").remove();
				}
				$("#innerConstructionPL").append(returnData);
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사예정 > 등록페이지 > 기본정보 등록 처리및 (공통코드, 공통상세코드 정보 조회)
function aj_insertConstructionScheduleNomal(form){
	//ui.loadingBar("show");
	var formData = new FormData(form);
	if($("#rChk2_1").is(":checked")){
		keyId = "Y";
	}else{
		keyId = "N";
	}

	formData.append('pnrsAt', keyId);
	//formData.append('plnYear', $("#plnYear").val());
	//formData.append('plnQu', $("#plnQu").val());
	//formData.append('chpsnPsitn', $("#chpsnPsitn").val());

	$.ajax({
		type:"post",
		url: "/job/bco/cws/insertConstructionScheduleNomal.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success: function(data, status) {
			if(status == "success") {
				var dataList = JSON.parse(data);
				cws.insertVisible = true;
				cws.insertResult = true;
				odrCwsSetOptions(dataList);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	})
}

//공사예정 정보 > 등록페이지 > 차수정보 등록 처리, 등록 되어있는 차수정보 조회
//공사예정 정보 > 수정페이지 > 차수정보 등록 처리, 등록 되어있는 차수정보 조회
function aj_insertConstructionScheduleOdr(form, type){
	//ui.loadingBar("show");
	var keyId = '';
	var	formData = new FormData(form);
	if(type == "odrInsertPage"){
		if($("#rChk1_1").is(":checked")){
			keyId = "POINT";
		}else{
			keyId = "LINE";
		}
	}else if(type == "odrUpdatePage"){
		if($("#rChk2_1").is(":checked")){
			keyId = "POINT";
		}else{
			keyId = "LINE";
		}
	}
	if(keyId == ''){return;}
	formData.append('cntrkSctnTy', keyId);

	$.ajax({
		type:"post",
		url: "/job/bco/cws/insertConstructionScheduleOdr.do",
		data: formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success: function(data, status) {
			if(status == "success") {
				var dataList = JSON.parse(data);
				setInsertOdrInfo(dataList.odrList, type);
				orderListInfo = dataList.odrList;
				setPointLayer();					// 기본정보 마커 표출
				// cmmUtil.setOdrLayers(poiScheduleInfo.ordLayerId, poiScheduleInfo.LineLayerId, poiScheduleInfo.imgUrl, dataList.odrList);	// 차수정보 표출
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사예정 정보 > 등록페이지 > 차수정보 등록 처리, 등록 되어있는 차수정보 조회
//공사예정 정보 > 수정페이지 > 차수정보 등록 처리, 등록 되어있는 차수정보 조회
function aj_insertConstructionScheduleOdr2(dtlCodeArray, type){

	$.ajax({
		type:"post",
		url: "/job/bco/cws/insertConstructionScheduleOdr2.do",
		type : "POST",
		//data   : {list : JSON.stringify(dtlCodeArray)},
		//data   : {list : dtlCodeArray},
		data   : dtlCodeArray,
		dataType : "json",
		traditional: true,
		//contentType : "application/json; charset=UTF-8",
		async: false,
		success: function(data, status) {
			if(status == "success") {
				//var dataList = JSON.parse(data);

				setInsertOdrInfo(data.odrList, type);
				orderListInfo = data.odrList;
				//setPointLayer();					// 기본정보 마커 표출
				// cmmUtil.setOdrLayers(poiScheduleInfo.ordLayerId, poiScheduleInfo.LineLayerId, poiScheduleInfo.imgUrl, data.odrList);	// 차수정보 표출
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사예정 정보 > 수정페이지 > 차수정보 수정 처리, 등록 되어있는 차수정보 조회
function aj_updateConstructionScheduleOdr(dtlCodeArray, type){

	ui.loadingBar("show");
	$.ajax({
		type:"post",
		url: "/job/bco/cws/updateConstructionScheduleOdr.do",
		data: dtlCodeArray,
		dataType : "json",
		traditional: true,
		async: false,
		success: function(data, status) {
			if(status == "success") {
				//var dataList = JSON.parse(data);
				setInsertOdrInfo(data.odrList, type);
				orderListInfo = data.odrList;
				// cmmUtil.setOdrLayers(poiScheduleInfo.ordLayerId, poiScheduleInfo.LineLayerId, poiScheduleInfo.imgUrl, data.odrList);	// 차수정보 표출
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

function removeSchedulePage(){
	//destroy();
	// 페이지 초기화
	leftPopupOpen('constructionSchedule');
}

//TODO GIS
//설정되어 있는 정보값들을 초기화 한다.
// function destroy(type){
// 	var mapType = $('input:radio[name="mapType"]:checked').val();
// 	if (mapType == "2D") {
//
// 	}else{
//
// 		// 레이어 생성
// 	    var layerList = new Module.JSLayerList(true);
// 	    cmmUtil.drawClear();
// 	    if(GLOBAL.StartPoint){
//  			GLOBAL.StartPoint = false;
//  			removePoint(GLOBAL.NomalIcon);
//  		}
// 	    // 지도에서 선택 레이어 삭제처리
// 	    if( type == "startPoint"){
// 	    	 Module.XDRenderData();
// 	    	return false;
// 	    }
//
// 		// 차수 라인레이어 삭제
// 		if(GLOBAL.LayerId.LineLayerId != null){
// 		 	var layer = layerList.nameAtLayer(GLOBAL.LayerId.LineLayerId);
// 		 	if(layer.getObjectCount() > 0){
// 		 		layer.removeAll();
// 				GLOBAL.LayerId.LineLayerId = null;
// 			}
//
// 		}
//
// 		// 차수 정보 poi 삭제
// 		if(GLOBAL.LayerId.LowPoiLayerId != null){
// 		 	var layer = layerList.nameAtLayer(GLOBAL.LayerId.LowPoiLayerId);
// 		 	if(layer.getObjectCount() > 0){
// 		 		layer.removeAll();
// 				GLOBAL.LayerId.LowPoiLayerId = null;
// 			}
// 		}
// 		 // 지도에서 선택 레이어 삭제처리
// 	    if( type == "lowPoint"){
// 	    	Module.XDRenderData();
// 	    	return false;
// 	    }
// 		// 공사예정정보 기본 정보 리스트 poi 삭제
// 		if(GLOBAL.LayerId.PoiLayerId != null){
// 		 	var layer = layerList.nameAtLayer(GLOBAL.LayerId.PoiLayerId);
// 		 	if(layer.getObjectCount() > 0){
// 		 		layer.removeAll();
// 				GLOBAL.LayerId.PoiLayerId = null;
// 			}
// 		}
// 		Module.XDRenderData();
//
//
//
// 		// 생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
// 		//removeLayer3D();
// 	}
// }
