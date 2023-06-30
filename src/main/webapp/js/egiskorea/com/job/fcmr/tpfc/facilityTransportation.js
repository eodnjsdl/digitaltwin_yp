/**
 * - 업무 / 시설관리 / 교통시설
 */
// 교통시설 분기
function getTransportationFacility(name) {
	$('#bottomPopup').empty();
	onFacilityTpfcSelectEventListener();
	
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

/**
 * 팝업 종료 시, vector 제거
 * @returns
 */
function closeView() {
	// 지도 clear
	clearMap();
	
	// 등록, 상세, 수정 팝업 창 닫기
	if ($("#rightSubPopup").hasClass("opened")) {
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
}

function cancleView() {
	ui.closeSubPopup();
	
	dtmap.vector.clearSelect();
	
	FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
}

/**
 * 숫자 표기 1천 단위 ',' 추가
 * @param number
 * @returns
 */
function dataCountFormat(number) {
	let formatNum = new Intl.NumberFormat().format(number);
	
	return formatNum;
}