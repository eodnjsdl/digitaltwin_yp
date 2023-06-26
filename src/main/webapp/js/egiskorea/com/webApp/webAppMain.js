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
				$(".lnb-territory-webApp").html(returnData);				// 국토조사 웹앱용 popup
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
	ui.openPopup("leftPopup","insertAdministrationZoneView");		// 조사정보 웹앱용 popup
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
				$("#leftPopup").html(returnData);					// 조사정보 웹앱용 popup
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
					// 속성정보 팝업창 닫기
					$(".sub-popup-body").removeClass("survey-information-body").addClass("territory-info-body detail");
				}else if(param2 == "right"){
					// 수정, 액셀저장, 삭제 버튼 지우기
					$(".examinationBtn").html("");
					// 속성정보 팝업창 닫기
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
	    async: true,  				// 비동기 요청으로 설정 (기본값)
	    beforeSend: function() {
	      ui.loadingBar("show");  	// AJAX 요청 전에 로딩바를 표시
	    },
		success : function(returnData, status){
			if(status == "success") {	
				$("#leftSubPopup").html(returnData);				// 조사정보 웹앱용 popup
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
			ui.loadingBar("hide"); 
		}
	});
}

//액셀 다운로드 (웹앱용)
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
//  form.action = "/geo/emi/selectExaminationInfoListDownload.do";
//  form.submit();
	location.href = "/geo/emi/selectExaminationInfoListDownload.do";
	var downloadTimer = setInterval(function() {
    	clearInterval(downloadTimer);
		ui.loadingBar("hide");
//		var token = cmmUtil.getCookie("fileDownload");
//        if(token == "FALSE") {
//        	clearInterval(downloadTimer);
//			ui.loadingBar("hide");
//        }
    }, 1000 );
}