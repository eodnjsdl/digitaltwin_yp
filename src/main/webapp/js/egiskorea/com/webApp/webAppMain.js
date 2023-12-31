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

//행정구역별 조사정보 등록화면 호출
function webApp_insertAdministrationZoneView(){
	ui.loadingBar("show");
	ui.openPopup("leftPopup","insertAdministrationZoneView");
	
	$.ajax({
		type : "POST",
		url : "/webApp/emi/insertAdministrationZoneView.do",
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

//조사정보 목록 호출 (웹앱용)
function webApp_selectExaminationInfoList(frm, param1){
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
				$('.lnb-search-webApp #searchKeyword').val('');
	        	$(".lnb-search-webApp .search-list").empty();
	        	
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

//속성정보 호출 (웹앱용)
function webApp_selectExaminationInfo(frm, param1){
	ui.loadingBar("show");
	ui.openPopup("leftSubPopup","emiInfo");		// 속성정보 웹앱용 popup
	
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
				$("#leftSubPopup").empty();
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

//속성정보 수정화면 호출 (웹앱용)
function webApp_updateExaminationInfoView(frm, param1){
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

//	form.action = "/webApp/emi/selectExaminationInfoListDownload.do";
//	form.submit();
	var url = "/webApp/emi/selectExaminationInfoListDownload.do?pnu=" + form.pnu.value;
	location.href = url;

	var downloadTimer = setInterval(function() {
		clearInterval(downloadTimer);
		ui.loadingBar("hide");
    }, 1000 );
}

// 속성정보에서 수정 클릭시 (조사정보 웹앱용 popup)
function webApp_leftSubPopupOpen(leftName, param1){
	var leftSubWidth = "";
	var leftSubHeigth = "";
	var leftSubTop = "";
	var leftSubLeft = "";
	
	switch(leftName){	
		// 조사정보 속성정보
		case "examinationInfo" 		: leftSubTop = "127px"; leftSubLeft = "440px"; leftSubWidth = "530"; leftSubHeigth = "745"; webApp_selectExaminationInfo($("#tmpForm")[0], param1); break;
		// 조사정보 속성정보 수정화면
		case "examinationInfoView" 	: leftSubTop = "127px"; leftSubLeft = "440px"; leftSubWidth = "530"; leftSubHeigth = "745"; webApp_updateExaminationInfoView($("#tmpForm")[0], param1); break;
	}
	
	$("#leftSubPopup").addClass("opened");
	
	$(".scroll-y").mCustomScrollbar({
		scrollbarPosition:"outside"
	});
}