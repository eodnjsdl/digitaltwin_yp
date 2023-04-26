/**
 * - 업무 / 시설관리 / 하수도 시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("facilitySewerSupply.js");
	//console.log("하수도시설");
});

//functions

//하수도시설 분기
function getSewerSupplyFacility(name){
	//console.log("getWaterSupplyFacility(name)");
	
	dtmap.draw.dispose();		//그리기 포인트 삭제
	dtmap.draw.clear();			//그리기 초기화
	
	if(name){
		if(name == "swlConnLs"){			//하수연결관
			selectSwlConnLsListView();
			return;
		}else if(name == "swlDeptPs"){		//하수관거심도
			selectSwlDeptPsListView();
			return;
		}else if(name == "swlDranPs"){		//하수처리장
			selectSwlDranPsListView();
			return;
		}else if(name == "swlManhPs"){		//하수맨홀
			selectSwlManhPsListView();
			return;
		}else if(name == "swlPipeAs"){		//면형하수관거
			selectSwlPipeAsListView();
			return;
		}else if(name == "swlPipeLm"){		//하수관거
			selectSwlPipeLmListView();
			return;
		}else if(name == "swlPumpPs"){		//하수펌프장
			selectSwlPumpPsListView();
			return;
		}else if(name == "swlSideLs"){		//측구
			selectSwlSideLsListView();
			return;
		}else if(name == "swlSpewPs"){		//토구
			selectSwlSpewPsListView();
			return;
		}else if(name == "swlSpotPs"){		//물받이
			selectSwlSpotPsListView();
			return;
		}else if(name == "swlVentPs"){		//환기구
			selectSwlVentPsListView();
			return;
		}else{
			alert("잘못된 호출")
			return;
		}
	}
}

//////////////////
//목록 화면 조회

// 하수연결관 목록 화면 조회
function selectSwlConnLsListView(){
	//console.log("selectSwlConnLsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/ssfc/selectSwlConnLsListView.do", function () {
    	swlConnLsListProcess();
		ui.loadingBar("hide");
    });
}

// 하수관거심도 목록 화면 조회
function selectSwlDeptPsListView() {
	//console.log('selectSwlDeptPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlDeptPsListView.do', function() {
    	swlDeptPsProcess();
    	ui.loadingBar("hide");
    });
}

// 하수처리장 목록 화면 조회
function selectSwlDranPsListView() {
	//console.log('selectSwlDranPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlDranPsListView.do', function() {
    	swlDranPsProcess();
    	ui.loadingBar("hide");
    });
}

// 하수맨홀 목록 화면 조회
function selectSwlManhPsListView() {
	//console.log('selectSwlManhPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlManhPsListView.do', function() {
    	swlManhPsProcess();
    	ui.loadingBar("hide");
    });
}

//면형하수관거 목록 화면 조회
function selectSwlPipeAsListView(){
	//console.log("selectSwlPipeAsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/ssfc/selectSwlPipeAsListView.do", function () {
    	swlPipeAsListProcess();
		ui.loadingBar("hide");
    });
}

// 하수관거 목록 화면 조회
function selectSwlPipeLmListView(){
	//console.log("selectSwlPipeLmListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/ssfc/selectSwlPipeLmListView.do", function () {
    	swlPipeLmProcess();
		ui.loadingBar("hide");
    });
}

// 하수펌프장 목록 화면 조회
function selectSwlPumpPsListView() {
	//console.log('selectSwlPumpPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlPumpPsListView.do', function() {
    	swlPumpPsProcess();
    	ui.loadingBar("hide");
    });
}

// 측구 목록 화면 조회
function selectSwlSideLsListView() {
	//console.log('selectSwlSideLsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlSideLsListView.do', function() {
    	swlSideLsProcess();
    	ui.loadingBar("hide");
    });
}

// 토구 목록 화면 조회
function selectSwlSpewPsListView() {
	//console.log('selectSwlSpewPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlSpewPsListView.do', function() {
    	swlSpewPsProcess();
    	ui.loadingBar("hide");
    });
}

// 물받이 목록 화면 조회
function selectSwlSpotPsListView() {
	//console.log('selectSwlSpotPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlSpotPsListView.do', function() {
    	swlSpotPsProcess();
    	ui.loadingBar("hide");
    });
}

// 환기구 목록 페이지 호출
function selectSwlVentPsListView() {
	//console.log('selectSwlVentPsListView()');
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load('/job/fcmr/ssfc/selectSwlVentPsListView.do', function() {
    	swlVentPsProcess();
    	ui.loadingBar("hide");
    });
}
