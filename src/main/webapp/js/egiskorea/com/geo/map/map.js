// 지도 세팅
function MapSetting() {
	$.ajax({
		type : "POST",
		url : "/geo/map/MapSetting.do",
		dataType : "json",
		async: false,
		success : function(returnData, status){
			if(status == "success") {
				userSetup.vertclPynColorR = returnData.result.vertclPynColorR;
				userSetup.vertclPynColorG = returnData.result.vertclPynColorG;
				userSetup.vertclPynColorB = returnData.result.vertclPynColorB;
				userSetup.vertclPynThick = returnData.result.vertclPynThick;
				userSetup.vertclPynHeight = returnData.result.vertclPynHeight;
				userSetup.tpgrphTrnsprc = returnData.result.tpgrphTrnsprc;
				userSetup.vidoQlityLevel = returnData.result.vidoQlityLevel;
				
				setPlanetTransparency(returnData.result.tpgrphTrnsprc);
			}else{ 
				toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
				return;
			} 
		}, complete : function(){
		}
	});
}

