/**
 * - 업무 / 시설관리 / 교통시설
 * 
 * @returns
 */
$(document).ready(function() {
	console.log("facilityTransportation.js");
	console.log("교통시설");
});

// 교통시설 분기
function getTransportationFacility(name) {
	console.log("getTransportationFacility()");
	$('#bottomPopup').empty();
	
	switch (name) {
	case "roadSection" : 				// 도로구간
	    selectRoadSectListView();
	    break;
	case "railRoadTrack" :				// 철도선로
	    toastr.error("엑셀다운로드 작업 필요", "철도선로");
	    selectRailroadTrackListView();
	    break;
	case "railRoadStation" :			// 철도역사
	    toastr.error("엑셀다운로드 작업 필요", "철도역사");
	    selectRailroadStationListView();
	    break;
	case "subwayTrack" :				// 지하철선로
	    toastr.error("엑셀다운로드 작업 필요", "지하철선로");
	    selectSubwayTrackListView();
	    break;
	case "subwayStation" :				// 지하철역사
	    toastr.error("엑셀다운로드 작업 필요", "지하철역사");
	    selectSubwayStationListView();
	    break;
	case "bridge" :					// 교량
	    toastr.error("엑셀다운로드 작업 필요", "교량");
	    selectBridgeListView();
	    break;
	case "overpass" :				// 고가도로
	    toastr.error("엑셀다운로드 작업 필요", "고가도로");
	    selectOverpassListView();
	    break;
	case "tunnel" :					// 터널
	    toastr.error("엑셀다운로드 작업 필요", "터널");
	    selectTunnelListView();
	    break;
	default :
	    toastr.error("잘못된 호출입니다.", "오류");
	    break;
	}
}

function setScrollbar() {
    $(".scroll-y").mCustomScrollbar({
	scrollbarPosition:"outside"
    });
}