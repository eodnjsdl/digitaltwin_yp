// 국토조사
window.ui = (function () {

	function init() {
		_territoryEvent();
	}
	
})

//국토조사 메뉴 선택
function _territoryEvent() {
	/**
	 *  Left Menu
	 */
	let $leftSide = $('#side');
	let $leftBar = $('#lnb');
	let $rightPopup = $("#rightPopup");
	let $mapControl = $('.map-control');

	$leftBar.on('click', 'li', function () {
		let $this = $(this);
		let menu = $this.attr('data-menu');
		ui.initPopup("");
		//분석 팝업 초기화
		analysis.close();
		$("#lnbAnalysis").find(".on").removeClass("on");
		$(".lnb-dep2").find(".on").removeClass("on");
		$this.toggleClass("on").siblings().removeClass("on");
		$leftSide.find(".lnb-list").removeClass("on");
		if ($this.hasClass('on')) {
			if(menu === "lnb-layer") {
				$leftSide.find('.' + menu).stop().fadeIn(100);
				$leftSide.find(".lnb-layer input[name='searchKeyword']").val("");
				dtmap.mod === '2D' ? aj_selectLayerList("left") : aj_selectLayerList("top");
			} else {
				$leftSide.find('.grp2').stop().fadeOut(100);
				$leftSide.find('.' + menu).stop().fadeIn(100);
				//메뉴 선택시 바로 실행되는 메뉴
				switch (menu) {
					case "lnb-search" :
						aj_search();
						break;
					// case "lnb-layer" :
					// 	$leftSide.find(".lnb-layer input[name='searchKeyword']").val("");
					// 	dtmap.mod === '2D' ? aj_selectLayerList("left") : aj_selectLayerList("top");
					// 	break;
					case "lnb-theme" :
						aj_selectThematicMapList();
						break;
					//국토조사
					case "lnb-territory" :
						aj_selectAdministrationZoneList($("#tmpForm")[0]);
						break;
//						//국토조사 웹앱
//						case "lnb-territory-webApp" :
//							aj_selectAdministrationZoneList($("#tmpForm")[0]);
//							break;
//						case "webApp-search" :
//							console.log("webApp");
//							break;

				}
			} 
		} else {
			if(menu === "lnb-layer") {
				$leftSide.find('.' + menu).stop().fadeOut(100);
			} else {
				$leftSide.find('.grp2').stop().fadeOut(100);
			}
		}
		clearMap();	//맵에 있는 오브젝트 클리어
	});

	// 2D/3D 버튼
	$leftBar.on('click', 'input[name="mapType"]', function (e) {
		if (e.target.value === '3D') {
			ui.loadingBar('show');
			map3d.isLoaded.then(function () {
				ui.loadingBar('hide');
			})
		}

		//측정기능 OFF
		$mapControl.find('.location, .distance, .measure, .radius').removeClass('active');
		dtmap.clearInteraction();

		//팝업 close
		initPopup("");
		//분석 팝업 초기화
		analysis.close();
		$("#lnbAnalysis").find(".on").removeClass("on");
		//좌측 메뉴 close
		$(".lnb-cont").css("display", "none");
		$("#lnb li[data-menu]").removeClass("on");
		//마우스  오른쪽 팝업
		$(".context").addClass("hide");

		dtmap.switchMap(e.target.value);

		setMainUI();

	});
}