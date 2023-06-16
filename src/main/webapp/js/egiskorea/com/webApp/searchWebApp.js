// 행정구역별 조사정보 목록 호출 (웹앱용)
function webApp_selectAdministrationZoneList(frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	$.ajax({
		type : "POST",
		url : "/webApp/emi/selectAdministrationZoneList.do",
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

//조사정보 목록 호출 (웹앱용)
function webApp_selectExaminationInfoList(frm, param1, param2){
	ui.loadingBar("show");
	ui.openPopup("leftPopup","insertAdministrationZoneView");
	var formData = new FormData(frm);
	if(param1 != ''){
		formData.append("code2", param1);
	}
	$.ajax({
		type : "POST",
		url : "/webApp/emi/selectExaminationInfoList.do",
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

//조사정보 호출 (웹앱용)
function webApp_selectExaminationInfo(frm, param1, param2){
	ui.loadingBar("show");
	
	var formData = new FormData(frm);
	if(param1 != ''){
		formData.append("pnu", param1);
	}
	
	$.ajax({
		type : "POST",
		url : "/webApp/emi/selectExaminationInfo.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {	
				$("#" + param2 + "SubPopup").html(returnData);
				if(param2 == "left"){
					$(".sub-popup-body").removeClass("survey-information-body").addClass("territory-info-body detail");
				}else if(param2 == "right"){
					$(".examinationBtn").html("");
					$(".sub-popup-body").removeClass("territory-info-body detail").addClass("survey-information-body");
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

//조사정보 수정화면 호출 (웹앱용)
function webApp_updateExaminationInfoView(frm, param1, param2){
	ui.loadingBar("show");
	
	var formData = new FormData(frm);
	formData.append("pnu", param1);
	
	$.ajax({
		type : "POST",
		url : "/webApp/emi/updateExaminationInfoView.do",
		data : formData,
		dataType : "html",
		processData : false,
		contentType : false,
		async: false,
		success : function(returnData, status){
			if(status == "success") {	
				$("#leftSubPopup").html(returnData);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

// 액셀 다운로드 (웹앱용)
function webApp_fn_download_excelData(form, pnu){
	if(pnu == "all"){
		if(form.code2.value == ""){
			toastr.warning("데이터 건수가 많아 이용할 수 없습니다.\n리 단위로 조사정보를 저장해주십시요.");
			return false;
		}else{
			form.pnu.value = "";			
		}
	}else{
		form.pnu.value = pnu;
	}
	document.cookie = "fileDownload=TRUE";
	ui.loadingBar("show");
	form.action = "/geo/emi/selectExaminationInfoListDownload.do";
	form.submit();
	var downloadTimer = setInterval(function() {
    	clearInterval(downloadTimer);
		ui.loadingBar("hide");
    }, 1000 );
}