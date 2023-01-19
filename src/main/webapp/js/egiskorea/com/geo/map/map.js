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
				alert("ERROR!");
				return;
			} 
		}, complete : function(){
		}
	});
}

