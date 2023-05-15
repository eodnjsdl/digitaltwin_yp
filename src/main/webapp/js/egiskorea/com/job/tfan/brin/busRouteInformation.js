/**
 * - 교통분석 / 교통분석 / 버스정류소
 * 
 * @returns
 */

//jqeury
$(document).ready(function(){

});

//교통분석 분기
function getBusRouteInformation(name){
	//console.log("getBusRouteInformation(name)");
	
	dtmap.draw.dispose();		//그리기 포인트 삭제
	dtmap.draw.clear();			//그리기 초기화
	
	if(name){
		if(name == "tgdBusSttnInfo"){			//버스정류소
			selectTgdBusSttnInfoListView();
		}else{
			alert("잘못된 호출")
			return;
		}
	}
}

//////////////////
//목록 화면 조회

//버스정류소 목록 화면 조회
function selectTgdBusSttnInfoListView(){
	//console.log("selectTbdBusRsListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/tfan/brin/selectTgdBusSttnInfoListView.do", function () {
        //toastr.success("/job/tfan/brin/selectTgdBusSttnInfoListView.do", "페이지🙂호🙂출🙂");
    	tgdBusSttnInfoListProcess();
		ui.loadingBar("hide");
    });
}