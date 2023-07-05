// 업소정보 표출
function aj_selectBusinessInfo(pnu){
	ui.loadingBar("show");
	$.ajax({
		type : "POST",
		url : "/geo/bsi/selectBussinessInfo.do",
		data : {
			"pnu": pnu
		},
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#rightPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}
// 좌표값을 통한 pnu 획득
function aj_getPnuByLonLat(lon, lat){
	var pnu = "";
	
	$.ajax({
		type : "POST",
		url : "/geo/lgsr/getPnuByLonLat.do",
		data : {
			"lon": lon,
			"lat": lat
		},
		dataType : "json",
		async: false,
		success : function(returnData, status){
			if(returnData.pnu != null){
				pnu = returnData.pnu.pnu;				
			}
		}
	});
	
	return pnu;
}

// pnu를 통해 지적정보 조회
function getLandRegisterByPnu(pnu){
	var landRegister;
	var crs = dtmap.mod == '3D' ? "4326" : "5179";
	
	$.ajax({
		type : "POST",
		url : "/geo/lgsr/getLandRegisterByPnu.do",
		data : {
			"pnu": pnu,
			"crs": crs
		},
		dataType : "json",
		async: false,
		success : function(returnData, status){
			landRegister = returnData;
		}
	});
	
	return landRegister;
}

// 행정구역별 조사정보 목록 호출
function aj_selectAdministrationZoneList(frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	
	$.ajax({
		type : "POST",
		url : "/geo/emi/selectAdministrationZoneList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$(".lnb-territory").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 행정구역별 조사정보 등록화면 호출
function aj_insertAdministrationZoneView(){
	ui.loadingBar("show");
	ui.openPopup("leftPopup","insertAdministrationZoneView");
	
	$.ajax({
		type : "POST",
		url : "/geo/emi/insertAdministrationZoneView.do",
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
			$(".scroll-y").mCustomScrollbar({
				scrollbarPosition:"outside"
			});
			ui.loadingBar("hide"); 
		}
	});
}

// 조사정보 목록 호출
function aj_selectExaminationInfoList(frm, param1, param2){
	ui.loadingBar("show");
	ui.openPopup("leftPopup","insertAdministrationZoneView");
	var formData = new FormData(frm);
	if(param1 != ''){
		formData.append("code2", param1);
	}
	$.ajax({
		type : "POST",
		url : "/geo/emi/selectExaminationInfoList.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {				
				$("#leftPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			$(".scroll-y").mCustomScrollbar({
				scrollbarPosition:"outside"
			});
			ui.loadingBar("hide"); 
		}
	});
}

//조사정보 호출
function aj_selectExaminationInfo(frm, param1, param2){
	ui.loadingBar("show");
	
	var formData = new FormData(frm);
	if(param1 != ''){
		formData.append("pnu", param1);
	}
	
	$.ajax({
		type : "POST",
		url : "/geo/emi/selectExaminationInfo.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				$("#rightSubPopup").empty();
				$("#rightSubPopup").html(returnData);
//				if(param2 == "left"){
//					$(".sub-popup-body").removeClass("survey-information-body").addClass("territory-info-body detail");
//				}else if(param2 == "right"){
//					$(".examinationBtn").html("");
//					$(".sub-popup-body").removeClass("territory-info-body detail").addClass("survey-information-body");
//				}
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			}
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

//조사정보 수정화면 호출
function aj_updateExaminationInfoView(frm, param1){
	ui.loadingBar("show");
	
	var formData = new FormData(frm);
	formData.append("pnu", param1);
	
	$.ajax({
		type : "POST",
		url : "/geo/emi/updateExaminationInfoView.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: true,
	    beforeSend: function() {
	      ui.loadingBar("show");  	// ajax 요청 전에 로딩바 표시
	    },
		success : function(returnData, status){
			if(status == "success") {
				$("#rightSubPopup").empty();
				$("#rightSubPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 지도 설정 정보 조회
function aj_selectMapSettingInfo(){
	$.ajax({
		type : "POST",
		url : "/geo/map/selectMapSettingInfo.do",
		dataType : "html",
		async: false,
		success : function(returnData, status){
			if(status == "success") {	
				$(".lnb-setting").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}
