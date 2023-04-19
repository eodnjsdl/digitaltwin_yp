/**
 * - 업무 / 시설관리 / 하수도 시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	console.log("facilitySewerSupply.js");
	console.log("하수도시설");
});

//functions

//상수도시설 분기
function getSewerSupplyFacility(name){
	//console.log("getWaterSupplyFacility(name)");
		
	if(name){
		if(name == "swlConnLs"){			//하수연결관
			selectSwlConnLsListView();
			return;
		}else if(name == "swlDeptPs"){		//하수관거심도
			toastr.error("작업중", "하수관거심도");
			return;
		}else if(name == "swlDranPs"){		//하수처리장
			toastr.error("작업중", "하수처리장");
			return;
		}else if(name == "swlManhPs"){		//하수맨홀
			toastr.error("작업중", "하수맨홀");
			return;
		}else if(name == "swlPipeAs"){		//면형하수관거
			toastr.error("작업중", "면형하수관거");
			return;
		}else if(name == "swlPipeLm"){		//하수관거
			toastr.error("작업중", "하수관거");
			return;
		}else if(name == "swlPumpPs"){		//하수펌프장
			toastr.error("작업중", "하수펌프장");
			return;
		}else if(name == "swlSideLs"){		//측구
			toastr.error("작업중", "측구");
			return;
		}else if(name == "swlSpewPs"){		//토구
			toastr.error("작업중", "토구");
			return;
		}else if(name == "swlSpotPs"){		//물받이
			toastr.error("작업중", "물받이");
			return;
		}else if(name == "swlVentPs"){		//환기구
			toastr.error("작업중", "환기구");
			return;
		}else{
			alert("잘못된 호출")
			return;
		}
		
	}
}

//////////////////
//목록 화면 조회

//하수연결관 목록 화면 조회
function selectSwlConnLsListView(){
	//console.log("selectSwlConnLsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/ssfc/selectSwlConnLsListView.do", function () {
    	swlConnLsListProcess();
		ui.loadingBar("hide");
    });
}

