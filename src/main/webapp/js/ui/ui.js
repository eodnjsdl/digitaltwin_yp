window.ui = (function () {

    function init() {
        //일반동작
        _bindEvent();
        //LEFT메뉴영역
        _leftMenuEvent();
        //TOC영역
        _leftTocEvent();
        //지도제어툴바영역
        _rightToolEvent();
        //업무영역
        _workMenuEvent();
        _workTabEvent();
        //상단영역
        _asideMenuEvent();
        //지도 모드에 따라 메뉴 변경
        _changeMenu();
        
        //제이쿼리 캐시 제거
        jQuery.ajaxSetup({
        	cache: false
    	});
    }

    function _changeMenu() {
        var $container = $("#container");
        var $buttons = $container.find("button");
        $.each($buttons, function (k, v) {
            var $parent = $(this).parent();
            var mapType = $(this).data("maptype");
            if (mapType === undefined) return;
            $parent.css({display: "block"});
            if (dtmap.mod === "2D") {
                if (mapType === "3D") {
                    $parent.css({display: "none"});
                }
            } else if (dtmap.mod === "3D") {
                if (mapType === "2D") {
                    $parent.css({display: "none"});
                }
            }
        });
    }

    function _rightToolEvent() {
        /**
         * Right Tool Bar
         */
        let $leftSide = $('#side');
        let $rightPopup = $("#rightPopup");
        let $mapControl = $('.map-control');
        //나침반
        $mapControl.on('click', '.ctrl-btn.compass', function (e) {
            if (dtmap.mod === '3D') map3d.compass.reset();
        });

        //새로고침
        $mapControl.on('click', '.reset', function (e) {
            dtmap.clear();
        });

        //위치 초기화
        $mapControl.on('click', '.globe', function (e) {
            dtmap.goHome();
        });

        // 2D/3D 버튼
        $mapControl.on('click', 'input[name="mapType"]', function (e) {
            if (e.target.value === '3D') {
                ui.loadingBar('show');
                map3d.isLoaded.then(function () {
                    ui.loadingBar('hide');
                })
            }
            //측정기능 OFF
            $mapControl.find('.location, .distance, .measure, .radius').removeClass('active');
            dtmap.clearInteraction();

            //패널 close
            $leftSide.removeClass('on');
            $rightPopup.removeClass('opened');

            dtmap.switchMap(e.target.value);
            _changeMenu();

        });

        //위치
        $mapControl.on('click', '.ctrl-btn.location', function (e) {
            let $this = $(this);
            $this.siblings().removeClass('active');
            $this.toggleClass('active');
            if ($this.hasClass('active')) {
                dtmap.location.active();
            } else {
                dtmap.clearInteraction();
            }


        })

        //거리측정
        $mapControl.on('click', '.ctrl-btn.distance', function (e) {
            let $this = $(this);
            $this.siblings().removeClass('active');
            $this.toggleClass('active');
            if ($this.hasClass('active')) {
                dtmap.measure.active('distance');
            } else {
                dtmap.clearInteraction();
            }


        });

        //면적측정
        $mapControl.on('click', '.ctrl-btn.measure', function (e) {
            let $this = $(this);
            $this.siblings().removeClass('active');
            $this.toggleClass('active');
            if ($this.hasClass('active')) {
                dtmap.measure.active('area');
            } else {
                dtmap.clearInteraction();
            }


        })

        //반경측정
        $mapControl.on('click', '.ctrl-btn.radius', function (e) {
            let $this = $(this);
            $this.siblings().removeClass('active');
            $this.toggleClass('active');
            if ($this.hasClass('active')) {
                dtmap.measure.active('radius');
            } else {
                dtmap.clearInteraction();
            }
        })

        //확대
        $mapControl.on('click', '.ctrl-btn.scaleUp', function (e) {
            dtmap.zoomIn();
        })

        //축소
        $mapControl.on('click', '.ctrl-btn.scaleDown', function (e) {
            dtmap.zoomOut();
        })
    }

    function _leftTocEvent() {
        $(document).on('change', '.layer-list-dep2 :checkbox', function (e) {
            try {
                let visible = this.checked;
                let $this = $(this);
                let id = $this.attr('id');
                let table = $this.data('table');
                let store = $this.data('store');
                let shpType = $this.data('shptype');
                let desc = $this.data('desc');

                let type = dtmap.mod === '3D' ? LAYER_TYPE[id.split('_')[1]] : 'WMS';
                let layerId = id.split('_')[2];
                let only3d = id.split('_')[3];

                if (only3d && dtmap.mod !== '3D') {
                    console.warn('3D지도에서만 사용 가능합니다.');
                    toastr.warning("3D지도에서만 사용 가능합니다.");
                }

                //TODO 임시 DB화 후 삭제
                if (id === 'layer_F_89_2') {
                    desc = 'building_object';
                } else if (id === 'layer_F_118_2') {
                    desc = 'landmark';
                }

                dtmap.showLayer({
                    id: layerId,
                    type: type,
                    visible: visible,
                    table: table,
                    store: store,
                    shpType: shpType,
                    layerNm: desc
                });
            } catch (e) {
                console.log(e);
            }
        });
    }


    function _bindEvent() {
        /**
         *  popup draggable
         */
        $(".popup-draggable").draggable({
            containment: "#container",
            handle: ".popup-header"
        });

        /**
         * popup close button
         */
        $(document).on('click', '.popup-panel .popup-close', function () {
            $(this).closest('.popup-panel').removeClass('opened');
            // 초기화 (지도)
            dtmap.draw.dispose();
            dtmap.draw.clear();
            dtmap.vector.clear();
        });

    }

    /**
     * loading bar
     */
    function loadingBar(type, target) {
        var _target = $('body');
        var _position = "fixed";
        if (target !== undefined) {
            _target = target;
            _position = "absolute";
        }
        if (type === "show") {
            _target.append('<div class="loadingWrapper" style="position:' + _position + '; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5); background-image:url(/images/common/loading.gif); background-position:center center; background-repeat:no-repeat; z-index: 10000;"></div>');
        } else if (type === "hide") {
            $('.loadingWrapper').remove();
            $(".scroll-y").mCustomScrollbar({
                scrollbarPosition: "outside"
            });
        }
    }

    /**
     * datePicker
     */
    function callDatePicker() {
        $(".datepicker").datepicker({
            dateFormat: 'yy-mm-dd' //달력 날짜 형태
            , showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            , showMonthAfterYear: true // 월- 년 순서가아닌 년도 - 월 순서
            , changeYear: true //option값 년 선택 가능
            , changeMonth: true //option값  월 선택 가능
            , showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
            , monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 텍스트
            , monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'] //달력의 월 부분 Tooltip
            , dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] //달력의 요일 텍스트
            , dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 Tooltip
            , buttonImage: '/images/icon/form-calendar.svg' //버튼 이미지 경로
            , buttonText: "선택" //버튼 호버 텍스트
            , yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
        });
    }

    /**
     * close popup-sub
     */
    function closeSubPopup() {
        $(".popup-sub").removeClass("opened");
    }

    /**
     * 팝업 생성
     */
    function openPopup(area, name, direction, param2) {
        var _area = {};
        var _name = name !== undefined ? name : undefined;
        switch (area) {
            //좌측
            case "leftPopup" :
                _area.top = "unset";
                _area.right = "unset";
                _area.left = "320";
                _area.width = "515";
                _area.heigth = "807";
                break;
            //하단
            case "bottomPopup" :
                _area.top = "unset";
                _area.right = "unset";
                _area.left = "320";
                _area.width = "1600";
                _area.heigth = "378";
                break;
            //우측
            case "rightPopup" :
                _area.top = "unset";
                _area.right = "unset";
                _area.left = "unset";
                _area.width = "480";
                _area.heigth = "807";
                break;
            //우측 sub
            case "rightSubPopup" :
                _area.top = "80";
                _area.right = "80";
                _area.left = "unset";
                _area.width = "550";
                _area.heigth = "480";
                break;
        }
        initPopup(area);

        if(_name === "krasInfo") {
            _area.top = "unset";
            _area.right = "unset";
            _area.left = "unset";
            _area.width = "660";
            _area.heigth = "807";
        }
        else if(_name === "examinationInfo") {
            _area.top = "190";
            _area.right = "90";
            _area.left = "unset";
            _area.width = "620";
            _area.heigth = "642";
        }

        $("#" + area).css({
            "top": _area.top + "px",
            "right": _area.right + "px",
            "left": _area.left + "px",
            "width": _area.width + "px",
            "height": _area.heigth + "px"
        });
        $("#" + area).addClass("opened");
        // $(".scroll-y").mCustomScrollbar({
        //     scrollbarPosition: "outside"
        // });
    }

    /**
     * 팝업 초기화
     */
    function initPopup(area) {
        var arrAllPopupTy = ["leftPopup", "leftSubPopup", "rightSubPopup", "rightPopup", "bottomPopup"];
        var arrPopupTy = [];
        if (area.includes("left")) {
            arrPopupTy = ["bottomPopup", "rightSubPopup", "rightPopup"];
        } else if (area.includes("right")) {
            if(area === "rightSubPopup") arrPopupTy = ["leftPopup", "leftSubPopup", "rightSubPopup"];
            else arrPopupTy = ["leftPopup", "leftSubPopup", "rightSubPopup", "rightPopup"];
        } else if (area.includes("bottom")) {
            arrPopupTy = ["leftPopup", "leftSubPopup", "rightSubPopup", "rightPopup"];
        }
        $.each(arrPopupTy, function (key, value) {
            $("#" + value).removeClass("opened").html("");
        });

        // 초기화 (그리기)
        dtmap.draw.clear();
        dtmap.draw.dispose();

    }


    //업무영역 >> 좌측 메뉴 선택
    function _workMenuEvent() {
        $(".lnb-work .lnb-body button").on("click", function () {
            var name = $(this).data("popup");
            var classList = $(this).attr('class').split(/\s+/);
            var area = classList[0];
            ui.openPopup(area);
            switch (name) {

                // 업무 > 공간정보활용 > 사업공유관리
                case "constructionPlan" :
                    //공사계획정보 (first tab)
                    aj_selectConstructionPlanList($("#tmpForm")[0]);
                    break;

                // 업무 > 공간정보활용 > 지하수관리
                case "undergroundWaterManagement" :
                    aj_selectUnderWaterMngList($("#tmpForm")[0]);
                    break;

                // 업무 > 공간정보활용 > 신재생에너지
                case "renewableEnergy" :
                    aj_selectRenewableEnergyList($("#tmpForm")[0]);
                    break;

                // 업무 > 공간정보활용 > 안전시설물관리
                case "safetyFacilitiesManagement" :
                    aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]);
                    break;

                // 업무 > 공간정보활용 > 관내업소정보조회
                case "inBusinessEstaInfo" :
                    aj_selectInBusinessEstaInfoList($("#tmpForm")[0]);
                    break;

                // 업무 > 공간정보활용 > 대기오염
                case "atmospherePollution" :
                    aj_selectAtmospherePollutionList($("#tmpForm")[0]);
                    break;

                // 업무 > 시설관리 > 상수도시설
                case "waterSupplyFacility" :
                    //aj_facility("WaterSupplyFacility");
                    getWaterSupplyFacility("wtlFirePs");		//상수도 시설 소방시설
                    break;

                // 업무 > 시설관리 > 하수도시설
                case "sewerSupplyFacility" :
                    toastr.error("상수도시설의 기능을 참고해 주세요.", "리팩토링 작업대상입니다.");
                    $("#" + area).removeClass("opened");
                    return;

                    aj_facility("SewerSupplyFacility");
                    break;

                 // 업무 > 시설관리 > 교통시설
                case "transportationFacility" :
                    //aj_selectTransportationFacilityList($("#tmpForm")[0]);
                	getTransportationFacility("roadSection");	// 교통시설 - 도로구간
                    break;

                // 업무 > 시설관리 > 체육시설
                case "physicalEducationFacility" :
                	//aj_selectPhysicalEducationFacilityList($("#tmpForm")[0]);
                	getPhyEduFaciListView();
                    break;

                // 업무 > 시설관리 > 복지시설
                case "welfareFacility" :
                    //aj_selectWelfareFacilityList($("#tmpForm")[0]);
                	getWelFareFaciListView();
                    break;

                // 업무 > 시설관리 > 시설예약관리
                case "faciReseMng" :
                    toastr.error("상수도시설의 기능을 참고해 주세요.", "리팩토링 작업대상입니다.");
                    $("#" + area).removeClass("opened");
                    return;

                    aj_selectFaciReseMngList($("#tmpForm")[0]);
                    break;

                // 업무 > 공간정보활용 > workSample
                case "workSample" :
                    // toastr.success("샘플입니다.", "🙂🙂🙂");
                    _worksample();
                    break;
            }

        });
    }


    //workSample
    function _worksample() {
        var container = "#bottomPopup";
        $(container).load("/job/sample/page.do", function () {
            toastr.success("/job/sample/page.do.", "페이지🙂호🙂출🙂");
            $(".scroll-y").mCustomScrollbar({
                scrollbarPosition: "outside",
            });
        });

    }


//업무영역 >> 탭 선택
    function _workTabEvent() {
        // $(document).on("click", ".left-popup-body .inner-tab", function(){
        $(document).on("click", ".inner-tab", function () {
            var parent = $(this).parent();
            var tabName = $(this).data("tab");
            //set css
            parent.addClass("on").siblings().removeClass("on");
            $("." + parent.data("tab")).addClass("on").siblings().removeClass("on");
            //set event
            switch (tabName) {

                // 업무 > 사업공유관리 > 공사계획정보
                case "constructionPlan" :
                    aj_selectConstructionPlanList($("#tmpForm")[0]);
                    break;

                // 업무 > 사업공유관리 > 공사예정정보
                case "constructionSchedule"        :
                    aj_selectConstructionScheduleList($("#tmpForm")[0]);
                    break;

                // 업무 > 사업공유관리 > 공사정보조회
                case "constructionInquiry"            :
                    aj_selectConstructionInquiryList();
                    break;

                //업무 > 사업공유관리 > 공사정보 조회 > 속성조회
                case "constructionInfo01"            :
                    break;

                //업무 > 사업공유관리 > 공사정보 조회 > 공간조회
                case "constructionInfo02"            :
                    break;
            }
        });
    }

    //LEFT 메뉴 선택
    function _leftMenuEvent() {
        /**
         *  Left Menu
         */
        let $leftSide = $('#side');
        let $leftBar = $('#lnb');
        $leftBar.on('click', 'li', function () {
            _changeMenu();
            let $this = $(this);
            let menu = $this.attr('data-menu');
            $this.toggleClass("on").siblings().removeClass("on");
            $leftSide.find(".lnb-list").removeClass("on");
            if ($this.hasClass('on')) {
                $leftSide.find('.lnb-cont').stop().fadeOut(100);
                $leftSide.find('.' + menu).stop().fadeIn(100);
                switch (menu) {
                    case "lnb-search" :
                        //TODO 검색 메뉴
                        // aj_search();
                        break;
                    case "lnb-layer" :
                        $leftSide.find(".lnb-layer input[name='searchKeyword']").val("");
                        aj_selectLayerList("left");
                        break;
                    case "lnb-theme" :
                        //TODO 주제도 메뉴
                        aj_selectThematicMapList();
                        break; //주제도
                    case "lnb-work" :
                        //TODO 업무 메뉴
                        break;
                    case "lnb-analysis" :

                        break;
                }
            } else {
                $leftSide.find('.lnb-cont').stop().fadeOut(100);
            }
        });
    }

    //그리기 초기화
    function _initDrawEvent() {
        dtmap.off('drawend');
        dtmap.vector.clear();
        dtmap.draw.clear();
    }

    function _asideMenuEvent() {
        $("#map-aside .map-tool-list button").on("click", function () {
            var id = $(this).attr('id');
            var classList = $(this).attr('class').split(/\s+/);
            var area = classList[2];
            // ui.openPopup(area);
            _initDrawEvent();
            switch (id) {
                // aside menu > 통합행정정보
                case "krasInfo" :
                    initPopup(area);
                    toastr.success("지도에서 위치를 선택하세요. ", "통합행정정보");
                    aj_krasInfo();
                    break;

                // aside menu > 지적/건물
                case "landBuilding" :
                    initPopup(area);
                    toastr.success("지도에서 위치를 선택하세요. ", "지적/건물");
                    aj_ldbdInfo();
                    // aj_selectLandBuilderList();
                    break;

                // aside menu > 내보내기
                case "dwldInfo" :
                    ui.openPopup(area);
                    toastr.success("내보내기")
                    aj_dataDownload();
                    break;

                // aside menu > 메모정보
                case "memoInfo" :
                    ui.openPopup(area);
                    toastr.success("메모정보")
                    aj_selectMemoInfoList($("#tmpForm")[0]);
                    break;

                // aside menu > 사진정보
                case "potoInfo" :
                    ui.openPopup(area);
                    toastr.success("사진정보")
                    aj_selectPotoInfoList($("#tmpForm")[0]);
                    break;

                // aside menu > 즐겨찾기
                case "favorites" :
                    ui.openPopup(area);
                    toastr.success("즐겨찾기")
                    aj_selectFavoritesList($("#tmpForm")[0]);
                    break;

                // aside menu > 지도저장
                case "saveMap" :
                    ui.openPopup(area);
                    toastr.success("지도저장")
                    aj_saveMap();
                    break;

                // aside menu > 그리기도구
                case "graphicInfo" :
                    ui.openPopup(area);
                    toastr.success("그리기도구")
                    aj_selectGraphicInfoList();
                    break;

                // aside menu > 드론영상
                case "dronInfo" :
                    ui.openPopup(area);
                    toastr.success("드론영상")
                    aj_selectDronInfo($("#tmpForm")[0]);
                    break;

                // aside menu > 3D레이어
                case "layerList" :
                    ui.openPopup(area);
                    toastr.success("3D레이어")
                    aj_selectLayerList("top");
                    break;

                // aside menu > 배경지도
                case "backgroundMapInfo" :
                    ui.openPopup(area);
                    toastr.success("배경지도")
                    aj_selectBackgroundMapInfoList();
                    break;

            }
        });
    }

    const module = {
        init: init,
        loadingBar: loadingBar,
        callDatePicker: callDatePicker,
        closeSubPopup: closeSubPopup,
        openPopup: openPopup,
        initPopup: initPopup
    }

    return module;

}());


//TODO 정리

// 개인별 레이어 목록 호출
function aj_selectLayerList(mode, reset = false) {
    var searchKeyword = mode == "left"
        ? $(".lnb-layer input[name='searchKeyword']").val()
        : $("#rightPopup input[name='searchKeyword']").val();

    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/lyr/lym/selectLayerList.do",
        data: {
            "searchKeyword": searchKeyword,
            "mode": mode
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                if (mode == "left") { // 좌측 메뉴 선택 시
                    $(".lnb-layer").html(returnData);
                    $(".lnb-layer input[name='searchKeyword']").val(searchKeyword);
                } else if (mode == "top") { // 상단 메뉴 선택 시
                    $("#rightPopup").html(returnData);
                    $("#rightPopup input[name='searchKeyword']").val(searchKeyword);
                }

                if (!$(".lnb-layer .scroll-y").hasClass("mCustomScrollbar")) {
                    $(".scroll-y").mCustomScrollbar({
                        scrollbarPosition: "outside",
                        mouseWheel: {scrollAmount: 250}
                    });
                }
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}