/**
 * - 업무 / 교통분석 / 버스노선정보
 * 
 * @returns
 */

$(document).ready(function(){
	//console.log("busRouteInfo.js");
	//console.log("버스노선정보");
});

//전역 변수
var TFCANALS = {
	Ax5UiGrid :	null,			//Ax5UiGrid 변수
	spaceSearchOption : {},		//공간검색 조건 옵션 변수
}

// 버스노선정보 분기
function getBusRouteInformation(info) {
	//console.log("getBusRouteInformation(info)");
	dtmap.off('select');
	
	if (info) {
		if (info == "busRoute") {			// 버스노선
			selectBusRouteListView();
			return;
		} else if (info == "busSttn") {		// 버스정류소
			selectBusSttnListView();
			return;
		} else {
			alert("잘못된 호출");
			return;
		}
	}
}

// 지도 아이콘(객체) 클릭시 이벤트
function onBusSelectEventListener(e) {
	//console.log("onBusSelectEventListener(e)");
	//console.log(e);
	if(e){
		//2d/3d 같이 사용 id 값만 
		var id = e.id; //피쳐 아이디
		
		if(id){
			var idArray = id.split(".");
			//console.log(idArray);
			const featureType	= idArray[0];
			if(featureType == "tgd_bus_route_info"){			// 버스 노선
				selectBusRoute(id);
			}else if(featureType == "ol_uid"){					// 버스 노선 - 경유 정류소
				return false;
			}else if(featureType == "tgd_bus_sttn_info"){		// 버스 정류소
				selectBusSttn(id);
			}else{
				alert("지도 객체 선택 오류");
				return false;
			}
		}
	}
}

// 버스 노선 목록 조회
function selectBusRouteListView() {
	//console.log("selectBusRouteListView()");
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/tran/brin/selectBusRouteListView.do", function() {
    	getBusRouteEmdData();
    	getBusRouteList();
    	
		ui.loadingBar("hide");
    });
}

//버스정류소 목록 화면 조회
function selectBusSttnListView(){
	
	ui.loadingBar("show");
	
	var baseContainer = "#bottomPopup";
    $(baseContainer).load("/job/tran/brin/selectBusSttnListView.do", function () {
    	getBusSttnEmdData();
    	getBusSttn();
    	
		ui.loadingBar("hide");
    });
}