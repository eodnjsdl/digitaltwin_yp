/**
 * - 업무 / 시설관리 / 교통시설
 */
// 교통시설 분기
function getTransportationFacility(name) {
	$('#bottomPopup').empty();
	
	switch (name) {
	case "roadSection" : 				// 도로구간
	    selectRoadSectListView();
	    break;
	case "railroadTrack" :				// 철도선로
	    selectRailroadTrackListView();
	    break;
	case "railroadStation" :			// 철도역사
	    selectRailroadStationListView();
	    break;
	case "subwayTrack" :				// 지하철선로
	    selectSubwayTrackListView();
	    break;
	case "subwayStation" :				// 지하철역사
	    selectSubwayStationListView();
	    break;
	case "bridge" :					// 교량
	    selectBridgeListView();
	    break;
	case "overpass" :				// 고가도로
	    selectOverpassListView();
	    break;
	case "tunnel" :					// 터널
	    selectTunnelListView();
	    break;
	default :
	    toastr.error("잘못된 호출입니다.", "오류");
	    break;
	}
}

function onFacilityTpfcSelectEventListener() {
    dtmap.off('select');
}