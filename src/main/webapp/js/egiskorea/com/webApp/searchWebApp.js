// 행정구역별 조사정보 목록 호출 (웹앱용)
function webApp_selectAdministrationZoneList(frm){
	ui.loadingBar("show");
	var formData = new FormData(frm);
	$.ajax({
		type : "POST",
		url : "/webApp/emi/selectWebAppAdministrationZoneList.do",
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
		url : "/webApp/emi/selectWebAppExaminationInfoList.do",
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