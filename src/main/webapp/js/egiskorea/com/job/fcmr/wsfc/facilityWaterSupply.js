/**
 * - 업무 / 시설관리 / 상수도 시설
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){
	//console.log("facilityWaterSupply.js");
	//console.log("상수도시설");
});

//상수도시설 분기
function getWaterSupplyFacility(name){
	//console.log("getWaterSupplyFacility(name)");
		
	if(name){
		if(name == "wtlFirePs"){			//소방시설
			selectWtlFirePsListView();
		}else if(name == "wtlPipeLm"){		//상수관로
			selectWtlPipeLmListView();
		}else if(name == "wtlFlowPs"){		//유량계
			selectWtlFlowPsListView();
		}else if(name == "wtlManhPs"){		//상수맨홀
			selectWtlManhPsListView();
		}else if(name == "wtlPipePs"){		//상수관로심도
			toastr.error("작업중", "상수관로심도");
			return;
		}else if(name == "wtlPrgaPs"){		//수압계
			selectWtlPrgaPsListView();
		}else if(name == "wtlServPs"){		//배수지
			selectWtlServPsListView();
		}else if(name == "wtlSplyLs"){		//급수관로
			toastr.error("작업중", "급수관로");
			return;
		}else if(name == "wtlValvPs"){		//변류시설
			toastr.error("작업중", "변류시설");
			return;
		}else{
			alert("잘못된 호출")
			return;
		}
		
	}
}

//////////////////
//목록 화면 조회

//소방시설 목록 화면 조회
function selectWtlFirePsListView(){
	//console.log("selectWtlFirePsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlFirePsListView.do", function () {
        //toastr.success("/job/fcmr/wsfc/selectWtlFirePsListView.do", "페이지🙂호🙂출🙂");
    	wtlFirePsListProcess();
		ui.loadingBar("hide");
    });
}

//유량계 목록 화면 조회
function selectWtlFlowPsListView(){
	//console.log("selectWtlFlowPsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/fcmr/wsfc/selectWtlFlowPsListView.do", function () {
        //toastr.success("/job/fcmr/wsfc/selectWtlFlowPsListView.do", "페이지🙂호🙂출🙂");
    	wtlFlowPsListProcess();
		ui.loadingBar("hide");
    });
}