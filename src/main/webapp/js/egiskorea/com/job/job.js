// popup-sub 취소버튼
$(document).on("click", ".closeSub", function(){		
	ui.closeSubPopup();

	// removePoint(GLOBAL.NomalIcon);
	// toastr.warning("객체 선택 해제하기", "객체 선택 해제하기");
});

//생성된어 있는 POI, Line, Polygon 레이어가 있을때 지워주기
function removeLayer(){
	var mapType = $('input:radio[name="mapType"]:checked').val();
	if(mapType == "2D"){
		//alert("레이어 삭제.");	removeLayer2D();		
	}else{
		removeLayer3D();
	}
}

// 레이어 지우기
function cleanMap() {
	if(SFFM.Layer != null) {
		SFFM.Layer.removeAll();
	}
	if(CCTV.Layer != null) {
		CCTV.Layer.removeAll();
	}
	if(WLRE.Layer != null) {
		WLRE.Layer.removeAll();
	}
}

// 지하수관리 > 농업용공공관정(기본) 목록 호출
var ugagFlag = '';
var ugdvFlag = '';
var ugufFlag = '';
var ugagUi = '';
var ugdvUi = '';
var ugufUi = '';
function aj_selectUnderWaterMngList(form, searchType){
	
	ui.loadingBar("show");

	var spitalSearch = '';
	var	formData = new FormData(form);

	if(form == $("#tmpForm")[0]){
		ugagFlag = '';
		ugdvFlag = '';
		ugufFlag = '';
		ugagUi = '';
		ugdvUi = '';
		ugufUi = '';
	}

	// 공간검색
	if(searchType == 'spital' && ugagFlag == 'true') {
		// spitalSearch = cmmUtil.spitalSearch('underWaterAgri');
	} else if (searchType == 'spital' && ugagFlag == 'false') {
		spitalSearch = lastSpitalSearch;
	}
	formData.set("spitalSearch", spitalSearch);

	$.ajax({
		type : "POST",
		url : "/job/ugtm/selectUnderWaterAgriList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bottomPopup").html(returnData);

				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				if(ugagUi == 'true'){
					$(".groundwaterProperty").removeClass("on");
					$(".groundwaterSpace").addClass("on");
					$("input[name=underWaterAgriSelect]:eq("+(lastSelect-1)+")").attr("checked", true);
					if(lastSelect == 2){
						$(".spaceArea").show();
						$("input[name=underWaterAgriAreaDrawing]:eq("+(lastDraw-1)+")").attr("checked", true);
					}
					$("#bufferCnt").val(lastBufferCnt);
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

// 신재생에너지 > 태양광발전소(기본) 목록 호출
var rnenFlag = '';
var rnenUi = '';
function aj_selectRenewableEnergyList(form, searchType){
	ui.loadingBar("show");

	if(form == $("#tmpForm")[0]){
		rnenFlag = '';
		rnenUi = '';
	}

	var spitalSearch = '';
	var	formData = new FormData(form);

	// 공간검색
	if(searchType == 'spital' && rnenFlag == 'true') {
		// spitalSearch = cmmUtil.spitalSearch('renewableEnergy');
	} else if (searchType == 'spital' && rnenFlag == 'false') {
		spitalSearch = lastSpitalSearch;
	}
	formData.set("spitalSearch", spitalSearch);

	$.ajax({
		type : "POST",
		url : "/job/rnen/selectRenewableEnergyList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bottomPopup").html(returnData);

				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				if(rnenUi == 'true'){
					$(".energyProperty").removeClass("on");
					$(".energySpace").addClass("on");
					$("input[name=renewableEnergySelect]:eq("+(lastSelect-1)+")").attr("checked", true);
					if(lastSelect == 2){
						$(".spaceArea").show();
						$("input[name=renewableEnergyAreaDrawing]:eq("+(lastDraw-1)+")").attr("checked", true);
					}
					$("#bufferCnt").val(lastBufferCnt);
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

// 안전시설물관리 > 가로등관리(기본) 목록 호출
var SFFMspitalYN = '';
function aj_selectSafetyFacilitiesMngList(form, searchType){
	ui.loadingBar("show");

	var searchInstlDe = $('#sffm-search-instl-de').val();
	var searchAdres = $('#sffm-search-adres').val();
	var searchManageNo = $('#sffm-search-manage-no').val();
	var sffmBuffer2 = $('#sffmBuffer2').val();
	var checked = $('#sffmCrimianlChkBox').is(':checked');
	var checkedSpital = $('#rChk1-2_sffm').is(':checked');
	var checkedSpital2 = $('input[name=sffmAreaDrawing]:checked').val();
	var spitalSearch = '';
	var sffmBuffer = '0';

	if(searchInstlDe == null) {
		searchInstlDe = '';
	}
	if(searchAdres == null) {
		searchAdres = '';
	}
	if(searchManageNo == null) {
		searchManageNo = '';
	}
	if(sffmBuffer2 == undefined) {
		sffmBuffer2 = 0;
	} else if(isNaN(sffmBuffer2)) {
		alert("반경을 숫자로 입력하여 주세요.");
		ui.loadingBar("hide");
		return
	}

	var	formData = new FormData(form);
	// 공간검색
	if(searchType == 'spital' || SFFMspitalYN == 'spital') {
		searchInstlDe = '';
		searchAdres = '';
		searchManageNo = '';

		if(formData.get("pageIndex") == 1 && spitalSearch == '') {
			sffmBuffer = $('#sffmBuffer').val();
			// spitalSearch = cmmUtil.spitalSearch('sffm');
		} else if(searchType == 'spital') {
			sffmBuffer = $('#sffmBuffer').val();
			// spitalSearch = cmmUtil.spitalSearch('sffm');
		} else {
			spitalSearch = spitalSearch;
			sffmBuffer = sffmBuffer;
		}
	}

	// 버퍼값 예외처리
	if(Number.isInteger(parseInt(sffmBuffer))) {
	} else {
		ui.loadingBar("hide");
		alert("공간검색 범위를 숫자로 입력하여주세요.")
		return;
	}

	if(spitalSearch != null) {
		formData.append("searchInstlDe", searchInstlDe);
		formData.append("searchAdres", searchAdres);
		formData.append("searchManageNo", searchManageNo);
		formData.append("spitalSearch", spitalSearch);
		formData.append("sffmBuffer", sffmBuffer);

		$.ajax({
			type : "POST",
			url : "/job/sffm/selectSafetyFacilLampMngList.do",
			data : formData,
			dataType : "html",
			processData : false,
			contentType : false,
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					$("#bottomPopup").html(returnData);

					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside"
					});

					$('#sffm-search-instl-de').val(searchInstlDe);
					$('#sffm-search-adres').val(searchAdres);
					$('#sffm-search-manage-no').val(searchManageNo);
					$('#sffmBuffer2').val(sffmBuffer2);

					if(checked) {
						$("input:checkbox[id='sffmCrimianlChkBox']").prop("checked", true);
					}

					if(searchType == 'spital' || SFFMspitalYN == 'spital') {
						$("#sffm-prop").removeClass("on");
						$("#sffm-space").addClass("on");
						$(".safetyFacilityProperty").removeClass("on");
						$(".safetyFacilitySpace").addClass("on");

						if(checkedSpital) {
							$('#rChk1-1_sffm').prop("checked", false);
							$('#rChk1-2_sffm').prop("checked", true);

							setTimeout(function(){
								$("input[name=sffmAreaDrawing]").attr('disabled', false);
								$("#sffmBuffer").prop('readonly', false);
							}, 300);

							if(checkedSpital2 == '1') {
								$('#aChk1_sffm').prop("checked", true);
							} else if(checkedSpital2 == '2') {
								$('#aChk2_sffm').prop("checked", true);
							} else if(checkedSpital2 == '3') {
								$('#aChk3_sffm').prop("checked", true);
							} else if(checkedSpital2 == '4') {
								$('#aChk4_sffm').prop("checked", true);
							}

							$('#sffmBuffer').val(sffmBuffer);
						}
					}

					// POI 호출
					// SFFM.selectSffmPOIList(searchInstlDe, searchAdres, searchManageNo, spitalSearch, sffmBuffer);
					// 공간검색 영역 저장
					// SFFM.spitalSearch = spitalSearch;
					// SFFM.sffmBuffer = sffmBuffer;
				}else{
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	} else {
		ui.loadingBar("hide");
	}
}

//안전시설물관리 > CCTV관리(기본) 목록 호출
var CCTVspitalYN = '';
function aj_selectCctvList(form, searchType){
	var searchGbn = $("#cctv-search-selbox option:selected").text();
	ui.loadingBar("show");

	var searchDeviceid = $('#cctv-search-deviceid').val();
	var searchLabel = $('#cctv-search-label').val();
	var cctvBuffer2 = $('#cctvBuffer2').val();
	var checked = $('#cctvCrimianlChkBox').is(':checked');
	var checkedSpital = $('#rChk1-2_cctv').is(':checked');
	var checkedSpital2 = $('input[name=cctvAreaDrawing]:checked').val();
	var spitalSearch = '';
	var cctvBuffer = '0';

	if(searchDeviceid == null) {
		searchDeviceid = '';
	}
	if(searchGbn == '전체') {
		searchGbn = '';
	}
	if(searchLabel == null) {
		searchLabel = '';
	}
	if(cctvBuffer2 == undefined) {
		cctvBuffer2 = 0;
	} else if(isNaN(cctvBuffer2)) {
		alert("반경을 숫자로 입력하여 주세요.");
		ui.loadingBar("hide");
		return
	}

	var	formData = new FormData(form);
	// 공간검색
	if(searchType == 'spital' || CCTVspitalYN == 'spital') {
		searchDeviceid = '';
		searchGbn = '';
		searchLabel = '';

		if(formData.get("pageIndex") == 1 && spitalSearch == '') {
			cctvBuffer = $('#cctvBuffer').val();
			// spitalSearch = cmmUtil.spitalSearch('cctv');
		} else if(searchType == 'spital') {
			cctvBuffer = $('#cctvBuffer').val();
			// spitalSearch = cmmUtil.spitalSearch('cctv');
		} else {
			spitalSearch = spitalSearch;
			cctvBuffer = cctvBuffer;
		}
	}

	// 버퍼값 예외처리
	if(Number.isInteger(parseInt(cctvBuffer))) {
	} else {
		ui.loadingBar("hide");
		alert("공간검색 범위를 숫자로 입력하여주세요.")
		return;
	}

	if(spitalSearch != null) {
		formData.append("searchDeviceid", searchDeviceid);
		formData.append("searchGbn", searchGbn);
		formData.append("searchLabel", searchLabel);
		formData.append("spitalSearch", spitalSearch);
		formData.append("cctvBuffer", cctvBuffer);

		$.ajax({
			type : "POST",
			url : "/job/cctv/selectCctvList.do",
			data : formData,
			dataType : "html",
			processData : false,
			contentType : false,
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					$("#bottomPopup").html(returnData);

					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside"
					});

					$("#cctv-search-selbox").val(searchGbn).prop("selected", true);
					$('#cctv-search-deviceid').val(searchDeviceid);
					$('#cctv-search-gbn').val(searchGbn);
					$('#cctv-search-label').val(searchLabel);
					$('#cctvBuffer2').val(cctvBuffer2);

					if(checked) {
						$("input:checkbox[id='cctvCrimianlChkBox']").prop("checked", true);
					}

					if(searchType == 'spital' || CCTVspitalYN == 'spital') {
						$("#cctv-prop").removeClass("on");
						$("#cctv-space").addClass("on");
						$(".safetyFacilityProperty").removeClass("on");
						$(".safetyFacilitySpace").addClass("on");

						if(checkedSpital) {
							$('#rChk1-1_cctv').prop("checked", false);
							$('#rChk1-2_cctv').prop("checked", true);

							setTimeout(function(){
								$("input[name=cctvAreaDrawing]").attr('disabled', false);
								$("#cctvBuffer").prop('readonly', false);
							}, 300);

							if(checkedSpital2 == '1') {
								$('#aChk1_cctv').prop("checked", true);
							} else if(checkedSpital2 == '2') {
								$('#aChk2_cctv').prop("checked", true);
							} else if(checkedSpital2 == '3') {
								$('#aChk3_cctv').prop("checked", true);
							} else if(checkedSpital2 == '4') {
								$('#aChk4_cctv').prop("checked", true);
							}

							$('#cctvBuffer').val(cctvBuffer);
						}
					}
					// CCTV.getCode(searchGbn, 'search');
					// // POI 호출
					// CCTV.selectCctvPOIList(searchDeviceid, searchGbn, searchLabel, spitalSearch, cctvBuffer);
					// // 공간검색 영역 저장
					// CCTV.spitalSearch = spitalSearch;
					// CCTV.cctvBuffer = cctvBuffer;
				}else{
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	} else {
		ui.loadingBar("hide");
	}
}

//교통시설 목록 호출 > 기본적으로 도로구간 호출
function aj_selectTransportationFacilityList(form, searchType){
	//cmmUtil.drawClear();
	ui.loadingBar("show");

	var spatialSearch = '';
	var bufferCnt = '0';

//	debugger;
	// 공간검색
	if(searchType == 'spatial') {
		// spatialSearch = cmmUtil.spitalSearch('trfc');
		bufferCnt = $('#bufferCnt').val();
	}

	var	formData = new FormData(form);
	formData.set("spatialSearch", spatialSearch);

	// 버퍼값 예외처리
	if(Number.isInteger(parseInt(bufferCnt))) {
	} else {
		ui.loadingBar("hide");
		alert("공간검색 범위를 숫자로 입력하여주세요.")
		return;
	}

	$.ajax({
		type : "POST",
		url : "/job/trfc/selectTransportationFacilityList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bottomPopup").html(returnData);

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

var WLREspitalYN = '';
// 복지시설 목록 호출
function aj_selectWelfareFacilityList(form, searchType){
	ui.loadingBar("show");

	var searchFcltySe = $("#wlre-search-fclty-se option:selected").text();

	if(searchFcltySe == '전체')
		searchFcltySe = '';
	var code = $("#wlre-search-fclty-se option:selected").val();

	var searchFcltyNm = $('#wlre-search-fclty-nm').val();
	var searchRnAdres = $('#wlre-search-rn-adres').val();
	var spitalSearch = '';
	var wlreBuffer = '0';

	var chk = $("input[name=wlreSelect]:checked").val(); //현재화면영역 or 사용자 정의
	var chk2 = $("input[name=wlreAreaDrawing]:checked").val(); //obj 타입

	// 속성검색
	if(searchFcltySe == null) {
		searchFcltySe = '';
	}
	if(searchFcltyNm == null) {
		searchFcltyNm = '';
	}
	if(searchRnAdres == null) {
		searchRnAdres = '';
	}

	var	formData = new FormData(form);
	// 공간검색
	if(searchType == 'spital' || WLREspitalYN == 'spital') {
		searchFcltySe = '';
		searchFcltyNm = '';
		searchRnAdres = '';

		if(formData.get("pageIndex") == 1 && WLRE.spitalSearch == '') {
			wlreBuffer = $('#wlreBuffer').val();
			// spitalSearch = cmmUtil.spitalSearch('wlre');
		} else if(searchType == 'spital') {
			wlreBuffer = $('#wlreBuffer').val();
			// spitalSearch = cmmUtil.spitalSearch('wlre');
		} else {
			spitalSearch = WLRE.spitalSearch;
			wlreBuffer = WLRE.wlreBuffer;
		}
	}

	// 버퍼값 예외처리
	if(Number.isInteger(parseInt(wlreBuffer))) {

	} else {
		ui.loadingBar("hide");
		alert("공간검색 범위를 숫자로 입력하여주세요.")
		return;
	}

	if(spitalSearch != null) {
		formData.append("searchFcltySe", searchFcltySe);
		formData.append("searchFcltyNm", searchFcltyNm);
		formData.append("searchRnAdres", searchRnAdres);
		formData.append("spitalSearch", spitalSearch);
		formData.append("wlreBuffer", wlreBuffer);

		$.ajax({
			type : "POST",
			url : "/job/wlre/selectWelfareList.do",
			data : formData,
			dataType : "html",
			processData : false,
			contentType : false,
			async: false,
			success : function(returnData, status){
				if(status == "success") {
					//console.log(returnData);
					$("#bottomPopup").html(returnData);

					$(".scroll-y").mCustomScrollbar({
						scrollbarPosition:"outside"
					});

//					$('#wlre-search-fclty-se').val(searchFcltySe);

					$("#wlre-search-fclty-se").val(searchFcltySe).prop("selected", true);
					$('#searchName option[value=userID]').prop('selected', 'selected').change();
					$('#wlre-search-fclty-nm').val(searchFcltyNm);
					$('#wlre-search-rn-adres').val(searchRnAdres);

					//시설구분코드 불러오기
					WLRE.getCode(searchFcltySe, 'search');
					// POI 호출
					WLRE.selectWlrePOIList(searchFcltySe, searchFcltyNm, searchRnAdres, spitalSearch, wlreBuffer);
					// 공간검색 영역 저장
					WLRE.spitalSearch = spitalSearch;
					WLRE.wlreBuffer = wlreBuffer;
				}else{
					toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}
		});
	} else {
		ui.loadingBar("hide");
	}


	//공간검색 유지
	if(spitalSearch != ''){
		$(".waterProperty").removeClass("on");
		$(".waterSpace").addClass("on");
		$("li[data-tab='waterProperty']").removeClass("on");
		$("li[data-tab='waterSpace']").addClass("on");

		$("input[id=rChk1-"+chk+"]").prop("checked", true); // 현재화면영역 or 사용자 정의
		$("input[id=aChk"+chk2+"]").prop("checked", true); // obj 타입

		$("#wlreBuffer").val(wlreBuffer); // 경계로부터 - m단위로 재 변환
	}
//	$("#wlre-search-fclty-se").val(searchFcltySe).prop("selected", true);
}

var SPOR_SPITAL_YN = ''; // 페이징을 위한 공간검색 변수
var SPOR_BUFFER = '';

// 체육시설 목록 호출
function aj_selectPhysicalEducationFacilityList(form,type){

	if(!$('#mapType3D').prop("checked")) {
		const yMap = app2D.getYMap();

		if($('#rChk1-2').is(":checked") && yMap.getModule("highlight").getFeatures("sky").length != 1 && $('.waterSpace').hasClass("on")) {
			 alert("영역을 선택해주세요.");
			 return;
		}
	}

	//공간검색여부확인
	if(type == null || type == undefined){
		SPOR_SPITAL_YN = '';
	}

	ui.loadingBar("show");

	var	formData = new FormData(form);

	//읍면동
	var sporSearchAdres = $('input[name=sporSearchAdres]').val();
	//시설명
	var sporSearchAlsfc_nm = $('input[name=sporSearchAlsfc_nm]').val();
	var sports_fcty_tp_cd = $("#sports_fcty_tp_cd option:selected").val();
	var sports_oper_mthd_cd = $("#sports_oper_mthd_cd option:selected").val();

	if(sports_fcty_tp_cd == undefined || sports_fcty_tp_cd == 'all'){
		sports_fcty_tp_cd = "";
	}
	if(sports_oper_mthd_cd == undefined || sports_oper_mthd_cd == 'all'){
		sports_oper_mthd_cd = '';
	}
	// 경계로 부터 ~범위
	var sportsBuffer = '0';
	var sporSpitalSearch = '';

	if(sporSearchAdres == undefined && sporSearchAlsfc_nm == undefined){
		sporSearchAdres = ""
		sporSearchAlsfc_nm = ""
	}

	//공간검색일때
	if(type == 'spital' && type != null && type != undefined || SPOR_SPITAL_YN != '') {
		$("#sporSearchAdres").val('');
		$("#sporSearchAlsfc_nm").val('');

		var chk = $("input[name=sportsSelect]:checked").val(); //현재화면영역 or 사용자 정의
		var chk2 = $("input[name=sportsAreaDrawing]:checked").val(); //obj 타입

		sportsBuffer = $('#sportsBuffer').val();


//		if(formData.get("pageIndex") == 1 && SPOR_SPITAL_YN == '') {
		if(SPOR_SPITAL_YN == '' || type == 'spital') {
			// sporSpitalSearch = cmmUtil.spitalSearch('sports');

			var buffer = $("#sportsBuffer").val();
			if(buffer && buffer > 0) {
				// const wkt = cmmUtil.getSelectFeatureWKT();
				if(wkt) {
					// cmmUtil.showBufferGeometry(wkt, buffer);
				}
			}
			$(".areaSrchTool").show();

		} else {
			sporSpitalSearch = SPOR_SPITAL_YN;
			sportsBuffer = SPOR_BUFFER;
		}
	}

	formData.append('sports_fcty_tp_cd', sports_fcty_tp_cd);
	formData.append('sports_oper_mthd_cd',sports_oper_mthd_cd);
	formData.append("sporSearchAdres", sporSearchAdres);
	formData.append("sporSearchAlsfc_nm", sporSearchAlsfc_nm);
	formData.append("sporSpitalSearch", sporSpitalSearch.toString());
	formData.append("sportsBuffer", sportsBuffer);

	$.ajax({
		type: "POST",
		url : "/job/spor/selectSportsList.do",
		dataType : "html",
		async:false,
		processData : false,
		contentType : false,
		data : formData,
		success : function(returnData, status){

			if(status == "success") {
				$("#bottomPopup").html("");
				$("#bottomPopup").html(returnData);

				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});

			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}

			$('#sporSearchAdres').val(sporSearchAdres);
			$('#sporSearchAlsfc_nm').val(sporSearchAlsfc_nm);
			$("#sports_oper_mthd_cd").val(sports_oper_mthd_cd).prop("selected", true);

			// POI 가시화
			sportsPOIList(sporSearchAdres, sporSearchAlsfc_nm, sporSpitalSearch, sportsBuffer,sports_fcty_tp_cd,sports_oper_mthd_cd);

		},error: function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		},
		complete : function(){
			ui.loadingBar("hide");
		}
	});

	SPOR_SPITAL_YN = sporSpitalSearch; //공간정보
	SPOR_BUFFER = sportsBuffer; //버퍼

	//공간검색 유지
	if(SPOR_SPITAL_YN != ''){
		$(".waterProperty").removeClass("on");
		$(".waterSpace").addClass("on");
		$("li[data-tab='waterProperty']").removeClass("on");
		$("li[data-tab='waterSpace']").addClass("on");

		$("input[id=rChk1-"+chk+"]").prop("checked", true); // 현재화면영역 or 사용자 정의
		$("input[id=aChk"+chk2+"]").prop("checked", true); // obj 타입

		if(chk == '2'){
			$(".areaSrchTool").show();
		}else{
			$(".areaSrchTool").hide();
		}

		$("#sportsBuffer").val(parseInt(SPOR_BUFFER)); // 경계로부터 - m단위로 재 변환
	}
}

//bottomPopup 호출
function aj_selectBottomPopup(popupUrl){
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : popupUrl,
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bottomPopup").html(returnData);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

// leftPopup 호출
function aj_selectLeftPopup(popupUrl){
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/selectConstructionWorkPlanList.do",
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//공사계획정보 호출
function aj_selectConstructionPlanList(form){

	ui.loadingBar("show");
	var	formData = new FormData(form);

	$.ajax({
		type : "POST",
		url : "/job/bco/cwp/selectConstructionPlanList.do",
		data : formData,
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

// 공사예정 정보 호출
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

//공사정보 조회 호출
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
				
			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}       

// 대기오염 목록 호출
function aj_selectAtmospherePollutionList(form){

	var	formData = new FormData(form);

	$.ajax({
		type : "POST",
		url : "/job/appt/selectAtmospherePollutionList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#leftPopup").html(returnData);

				/**
				 * 대기오염 api
				 * stationName : 현재 양평군에는 양평읍/용문명만 존재.
				 * dataTerm : 기본적으로 month로 해서 최신 데이터 표출
				 * pageNo : 현재 측정소가 2군데라서 리스트가 높이만큼 차지 않아서 페이징은 따로 필요 없을듯 하다.
				 * numOfRows : daily는 총 22건. 100정도로 잡으면 될듯하다. month는 700건으로 설정. 3month는 2200건으로 설정. 그래야 전체 데이터를 가져옴. 기본조회는 month로
				 * returnType : json형태로 받아서 js에서 처리하기 위함.
				 * ver : 버전. 1.0 ~ 1.3까지 있으며 미세먼지, 초미세먼지 데이터 가져올지 여부를 따짐. 버전 1.3을 사용해서 미세먼지(PM10)와 초미세먼지(PM2.5) 데이터를 가져온다.
				 */

				// 1달치. 과거 데이터 조회용
				// 개발서버
				var yangPyeongEup = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%9A%A9%EB%AC%B8%EB%A9%B4&dataTerm=month&pageNo=1&numOfRows=2200&returnType=json&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&ver=1.3";
				var yongMunMyeon = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%96%91%ED%8F%89%EC%9D%8D&dataTerm=month&pageNo=1&numOfRows=2200&returnType=json&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&ver=1.3";

				// 실서버
				// 행정망
				//var yangPyeongEup = "http://10.165.2.30/intApi/extApi/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%9A%A9%EB%AC%B8%EB%A9%B4&dataTerm=month&pageNo=1&numOfRows=2200&returnType=json&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&ver=1.3";
				//var yongMunMyeon = "http://10.165.2.30/intApi/extApi/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%96%91%ED%8F%89%EC%9D%8D&dataTerm=month&pageNo=1&numOfRows=2200&returnType=json&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&ver=1.3";

				// LX망
				//var yangPyeongEup = "http://10.20.30.81/extApi/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%9A%A9%EB%AC%B8%EB%A9%B4&dataTerm=month&pageNo=1&numOfRows=2200&returnType=json&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&ver=1.3";
				//var yongMunMyeon = "http://10.20.30.81/extApi/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EC%96%91%ED%8F%89%EC%9D%8D&dataTerm=month&pageNo=1&numOfRows=2200&returnType=json&serviceKey=%2FtZiNcupfrj0b6%2FXcT2dYskTc8VVSHBB14BWjuq9FmrCMSfJHr4AdJwGBHGCYzG4O5hrjl1Alvd1Hu%2FbqqKDIA%3D%3D&ver=1.3";

				// 대기오염 리스트 가져오기
				apptList(yangPyeongEup, yongMunMyeon);

				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});

			}else{
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			// ui.loadingBar("hide");
		}
	});

}

// 시설예약관리
var highChk = '';
function aj_selectFaciReseMngList(form){
	
	ui.loadingBar("show");
	var	formData = new FormData(form);

	if(form == $("#tmpForm")[0]){
		highChk = 'yes';
		var today = new Date();
		var nowYear = today.getFullYear();
		var nowMonth = ('0' + (today.getMonth() + 1)).slice(-2);
		var nowDay = ('0' + today.getDate()).slice(-2);
		var srchYM = nowYear+"-"+nowMonth
		formData.append('srchYM', srchYM);
	}
	
	$.ajax({
		type : "POST",
		url : "/job/fcrm/selectFaciReseMngList.do",
		data : formData,
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

// 관내업소정보조회
var ibbiFlag = '';
var ibbiUi = '';
function aj_selectInBusinessEstaInfoList(form, searchType){
	ui.loadingBar("show");

	if(form == $("#tmpForm")[0]){
		ibbiFlag = '';
		ibbiUi = '';
	}

	var spitalSearch = '';
	// 	// spitalSearch = cmmUtil.spitalSearch('inBusinessEstaInfo');
	// } else if (searchType == 'spital' && ibbiFlag == 'false') {
	// 	spitalSearch = lastSpitalSearch;
	// }
	// formData.set("spitalSearch", spitalSearch);

	var formData = new FormData(form);


	$.ajax({
		type : "POST",
		url : "/job/ibbi/selectInBusinessEstaInfoList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#bottomPopup").html(returnData);

				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				if(ibbiUi == 'true'){
					$(".busiProperty").removeClass("on");
					$(".busiSpace").addClass("on");
					$("input[name=inBusinessEstaInfoSelect]:eq("+(lastSelect-1)+")").attr("checked", true);
					if(lastSelect == 2){
						$(".spaceArea").show();
						$("input[name=inBusinessEstaInfoAreaDrawing]:eq("+(lastDraw-1)+")").attr("checked", true);
					}
					$("#bufferCnt").val(lastBufferCnt);
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
 * 시설관리 공통
 * @param {string} className 시설관리 메뉴 명
 */
function aj_facility(className) {
  const container = "#bottomPopup";
  $(container).load("/job/fcts/facilities.do", () => {
    $(".scroll-y").mCustomScrollbar({
      scrollbarPosition: "outside",
    });
    if(className == "WaterSupplyFacility") {
		new WaterSupplyFacility(container);
    }
	 else if(className == "SewerSupplyFacility") {
		  new SewerSupplyFacility(container);
	  }
  });
}

// 업무 > 상세조회 닫기버튼 (마우스모드 6으로 초기화)
function cancelMode(){
	// setTimeout(function(){
	// 	Module.XDSetMouseState(6);
	// }, 100);

	//toastr.warning("객체 선택 해제하기", "객체 선택 해제하기");

}


/**
 * 공유재산 실태조사 목록 조회
 * @returns
 */
function aj_selectPbprtAccdtList() {
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/job/publnd/selectPbprtAccdtList.do",
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status) {
			if (status == "success") {		
				$('#bottomPopup').html("");
				$("#bottomPopup").html(returnData);
				
				$(".scroll-y").mCustomScrollbar({
					scrollbarPosition:"outside"
				});
				
			} else { 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide");
		}
	});
}

//시설예약관리 - 지도 아이콘(객체) 클릭시 이벤트
function onFaciReseMngSelectEventListener(e){
	//console.log("onFaciReseMngSelectEventListener(e)");
	//console.log(e);
	if(e){
		
		//[참고 자료]
		//2D 이벤트 데이터
	    // {
	    //     id : 'wtl_fire_ps.8',        // 피쳐 아이디
	    //     feature : ol.Feature,        // ol Feature 객체
	    //     geometry : ol.geom.Geometry, //ol geometry 객체
	    //     property : {}                // 속성정보
	    // }
	    //3D 이벤트 데이터
	    // {
	    //     id : 'wtl_fire_ps.8',        // 피쳐 아이디
	    //     object : JSObejct3D,         // JSObejct3D 객체
	    //     property : {}                // 속성정보
	    // }
		
		if(dtmap.mod == "2D"){
			//console.log("2d");
			
			if(e.property.facMenuNm){
				var facMenuNm = e.property.facMenuNm;
				if(facMenuNm != "faciReseMng"){
					console.log("facMenuNm>>>"+facMenuNm);
					console.log("시설예약관리 에러");
					return false;
				}
			}else{
				console.log("이벤트 콜백 에러");
				return false;
			}
		    
		    var gid = e.id;
		    var rsrvsn = e.property.rsrvsn;
		    aj_selectFaciReseMng(gid, rsrvsn);
			
		}else if(dtmap.mod == "3D"){
			//console.log("3d");
			
			//if(e.properties.facMenuNm){
			//	var facMenuNm = e.properties.facMenuNm;
			if(e.property.facMenuNm){
				var facMenuNm = e.property.facMenuNm;
				if(facMenuNm != "faciReseMng"){
					console.log("facMenuNm>>>"+facMenuNm);
					console.log("시설예약관리 에러");
					return false;
				}
			}else{
				console.log("이벤트 콜백 에러");
				return false;
			}
			
			var gid = e.id;
			gid = gid.replace("faciReseMng","");
		    //var rsrvsn = e.properties.rsrvsn;
		    var rsrvsn = e.property.rsrvsn;
		    aj_selectFaciReseMng(gid, rsrvsn);
			
		}else{
			console.log("2D/3D 오류");
			return false;
		}
		
	}
}

//uhh add...
/**
 * 인구정보 목록 조회
 * @returns
 */
function aj_selectPopulationInfoList() {
	
	ui.loadingBar("show");
	
	$.ajax({
		type : "POST",
		url : "/job/tral/selectPopulationInfoList.do",
		//data : formData,
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

//uhh add... end