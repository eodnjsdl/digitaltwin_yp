window.ui = (function () {

    function init() {
        //일반동작
        _bindEvent();
        //상단영역
        _topMenuEvent();
        //RIGHT 지도제어툴바영역
        _rightToolEvent();
        //LEFT메뉴영역
        _leftMenuEvent();
        //좌측 메뉴 >> 공간정보
        _spaceMenuEvent();
        //좌측 메뉴 >> 공간정보 활용 >> 사업공유관리 
        _spaceTabEvent();
        //좌측 메뉴 >> 시설관리 
        _facilityMenuEvent();
        //좌측 메뉴 >> 교통분석
        _trafficMenuEvent();
        //좌측 메뉴 >> 행정자산 
        _administrativeMenuEvent();
        //좌측 메뉴 >> 분석
        _analysisMenuEvent();

        //제이쿼리 캐시 제거
        jQuery.ajaxSetup({
            cache: false
        });
        // set toast option
        _setToastOption();

        _selectEvent();	//지도 선택 이벤트 초기화
    }

    function _setToastOption() {
        toastr.options = {
            "positionClass": "toast-bottom-right"
        };
    }

    //일반동작
    function _bindEvent() {
        /** popup draggable **/
        $(".popup-draggable").draggable({
            containment: "#container",
            handle: ".popup-header"
        });
        /** popup close button **/
        $(document).on('click', '.popup-panel .popup-close', function () {
            dtmap.clear();
            $(this).closest('.popup-panel').removeClass('opened');
            if (dtmap.mod === "2D") map2d.multiView.dispose();
        });

        //LEFT 메뉴 닫기 버튼
        $(".lnb-util .lnb-close").click(function () {
        	//console.log(".lnb-util .lnb-close");
        	$(".popup-close").trigger("click");	//시설관리 하위 메뉴 팝업 닫기 버튼 동작
        	
            ($(this).parent().parent()).stop().fadeOut(100);
            $("#lnb li[data-menu]").removeClass("on");
            _initDrawEvent();
            if (dtmap.mod === "2D") map2d.multiView.dispose();
        });

        $(document).on('click', '.lnb-dep2 button', function (e) {
            $(".lnb-dep2").find(".on").removeClass("on");
            $(this).parent().addClass("on");
        });

        function handleCreateContextMenu(event) {
            // 기본 Context Menu가 나오지 않게 차단
            event.preventDefault();
            const ctxMenu = $(".context");
            ctxMenu.removeClass("hide");
            ctxMenu.css("top", event.pageY + 'px');
            ctxMenu.css("left", event.pageX + 'px');
        }

        function handleClearContextMenu(event) {
            const ctxMenu = $(".context");
            ctxMenu.addClass("hide");
        }

        var canvas_2d = document.getElementById("map2D");
        // 이벤트 바인딩
        canvas_2d.addEventListener('contextmenu', handleCreateContextMenu, false);
        canvas_2d.addEventListener('click', handleClearContextMenu, false);
    }

    //상단 메뉴 
    function _topMenuEvent() {
        $(".util-box .GNB").on("click", "button", function () {
            //아이디 값으로 조회
            var id = $(this).attr('id');
            //data-popup로 팝업 위치 조회
            var area = $(this).attr('data-popup');
            //그리기 초기화
            _initDrawEvent();
            switch (id) {
                //정보공유
                // aside menu > 메모정보
                case "memoInfo" :
                    //위치에 맞는 팝업 오픈
                    ui.openPopup(area);
                    //메뉴별 실행 함수 실행
                    aj_selectMemoInfoList($("#tmpForm")[0]);
                    break;
                // aside menu > 사진정보
                case "potoInfo" :
                    ui.openPopup(area);
                    aj_selectPotoInfoList($("#tmpForm")[0]);
                    break;
                // aside menu > 그리기도구
                case "graphicInfo" :
                    ui.openPopup(area);
                    aj_selectGraphicInfoList();
                    break;

                //영상/지도
                // aside menu > 드론영상
                case "dronInfo" :
                    ui.openPopup(area);
                    aj_selectDronInfo($("#tmpForm")[0]);
                    break;
                // aside menu > 내보내기
                case "dwldInfo" :
                    ui.openPopup(area);
                    aj_dataDownload();
                    break;
                // aside menu > 지도저장
                case "saveMap" :
                    ui.openPopup(area, id);
                    aj_saveMap();
                    break;

                //게시판
                // aside menu > 게시판
                case "notice" :
                    ui.openPopup(area);
                    aj_selectNoticeList();
                    break;
                // aside menu > QnA
                case "qna" :
                    ui.openPopup(area);
                    aj_selectQnaList(1);
                    break;
                // aside menu > 운영지원
                case "opqna" :
                    ui.openPopup(area);
                    aj_selectOpQnaList(1);
                    break;

                //지도설정
                // aside menu > 배경지도
                case "backgroundMapInfo" :
                    ui.openPopup(area, id);
                    aj_selectBackgroundMapInfoList();
                    break;
                // aside menu > 화면 분할
                case "multiView" :
                    ui.openPopup(area, id);
                    initMultiViewList();
                    break;
                // aside menu > 설정 (3D 지도설정)
                case "setting" :
                    ui.openPopup(area, id);
                    aj_mapsetting();
                    break;
                // aside menu > 즐겨찾기
                case "favorites" :
                    ui.openPopup(area);
                    aj_selectFavoritesList($("#tmpForm")[0]);
                    break;
            }
        })
    }

    //RIGHT 메뉴 영역
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

        //통합행정정보
        $mapControl.on('click', '.integrated-info', function (e) {
            toastr.success("지도에서 위치를 선택하세요. ", "통합행정정보");
            $(".map-control button").removeClass("active");
            aj_krasInfo();
        });
        //지적/건물
        $mapControl.on('click', '.building', function (e) {
            toastr.success("지도에서 위치를 선택하세요. ", "지적/건물");
            $(".map-control button").removeClass("active");
            aj_ldbdInfo();
        });

        //위치
        $mapControl.on('click', '.ctrl-btn.location', function (e) {
            let $this = $(this);
            if ($this.hasClass('active')) {
                $("#rightPopup").removeClass("opened");
                $(".map-control button").removeClass("active");
                dtmap.clearInteraction();
            } else {
                dtmap.location.active();
                $(".map-control button").removeClass("active");
                $this.toggleClass('active');
            }
        })

        //거리측정
        $mapControl.on('click', '.ctrl-btn.distance', function (e) {
            let $this = $(this);
            if ($this.hasClass('active')) {
                $("#rightPopup").removeClass("opened");
                $(".map-control button").removeClass("active");
                dtmap.clearInteraction();
            } else {
                dtmap.measure.active('distance');
                $(".map-control button").removeClass("active");
                $this.toggleClass('active');
            }
        });

        //면적측정
        $mapControl.on('click', '.ctrl-btn.measure', function (e) {
            let $this = $(this);
            if ($this.hasClass('active')) {
                $("#rightPopup").removeClass("opened");
                $(".map-control button").removeClass("active");
                dtmap.clearInteraction();
            } else {
                dtmap.measure.active('area');
                $(".map-control button").removeClass("active");
                $this.toggleClass('active');
            }
        })

        //반경측정
        $mapControl.on('click', '.ctrl-btn.radius', function (e) {
            let $this = $(this);
            if ($this.hasClass('active')) {
                $("#rightPopup").removeClass("opened");
                $(".map-control button").removeClass("active");
                dtmap.clearInteraction();
            } else {
                dtmap.measure.active('radius');
                $(".map-control button").removeClass("active");
                $this.toggleClass('active');
            }
        })

        //설정
        // $mapControl.on('click', '.ctrl-btn.setting', function (e) {
        // 	let $this = $(this);
        //     if ($this.hasClass('active')) {
        //     	$("#rightPopup").removeClass("opened");
        //     	$(".map-control button").removeClass("active");
        //     }else {
        //         dtmap.clearInteraction();
        //         ui.openPopup($(this).data("popup"),"setting");
        //     	aj_mapsetting();
        //     	$(".map-control button").removeClass("active");
        //         $this.toggleClass('active');
        //     }
        // })

        //확대
        $mapControl.on('click', '.ctrl-btn.scaleUp', function (e) {
            dtmap.zoomIn();
        })

        //축소
        $mapControl.on('click', '.ctrl-btn.scaleDown', function (e) {
            dtmap.zoomOut();
        })
    }

    //LEFT 메뉴 선택
    function _leftMenuEvent() {
        /**
         *  Left Menu
         */
        let $leftSide = $('#side');
        let $leftBar = $('#lnb');
        let $rightPopup = $("#rightPopup");
        let $mapControl = $('.map-control');

        $leftBar.on('click', 'li', function () {
            ui.initPopup("");
            let $this = $(this);
            let menu = $this.attr('data-menu');
            $(".lnb-dep2").find(".on").removeClass("on");
            $this.toggleClass("on").siblings().removeClass("on");
            $leftSide.find(".lnb-list").removeClass("on");
            if ($this.hasClass('on')) {
                $leftSide.find('.lnb-cont').stop().fadeOut(100);
                $leftSide.find('.' + menu).stop().fadeIn(100);
                //메뉴 선택시 바로 실행되는 메뉴 
                switch (menu) {
                    case "lnb-search" :
                        //TODO 검색 메뉴
                        aj_search();
                        break;
                    case "lnb-layer" :
                        $leftSide.find(".lnb-layer input[name='searchKeyword']").val("");
                        aj_selectLayerList("left");
                        break;
                    case "lnb-theme" :
                        //TODO 주제도 메뉴
                        aj_selectThematicMapList();
                        break;
                    //국토조사
                    case "lnb-territory" :
                        aj_selectAdministrationZoneList($("#tmpForm")[0]);
                        break;
                }
            } else {
                $leftSide.find('.lnb-cont').stop().fadeOut(100);
            }
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
            //좌측 메뉴 close
            $(".lnb-cont").css("display", "none");
            $("#lnb li[data-menu]").removeClass("on");
            //마우스  오른쪽 팝업
            $(".context").addClass("hide");

            console.log(e);
            dtmap.switchMap(e.target.value);

            setMainUI();
            
            //상/하수도 공간정보 편집도구 창 닫기
            if($(".space-edit-tool").hasClass("opened")){	
            	$(".space-edit-tool").removeClass("opened");
            }
        });
    }

    // 좌측 메뉴 >> 공간정보 활용
    function _spaceMenuEvent() {
        $(".lnb-space .lnb-body").on("click", "button", function () {
            var name = $(this).attr("id");
            var area = $(this).data("popup");
            ui.openPopup(area);
            switch (name) {
                // 공간정보활용 > 사업공유관리
                case "constructionPlan" :
                    //공사계획정보 (first tab)
                    aj_selectConstructionPlanList($("#tmpForm")[0]);
                    break;

                // 공간정보활용 > 지하수관리
                case "undergroundWaterManagement" :
                    aj_selectUnderWaterMngList($("#tmpForm")[0]);
                    break;

                // 공간정보활용 > 신재생에너지
                case "renewableEnergy" :
                    aj_selectRenewableEnergyList($("#tmpForm")[0]);
                    break;

                // 공간정보활용 > 안전시설물관리
                case "safetyFacilitiesManagement" :
                    aj_selectSafetyFacilitiesMngList($("#tmpForm")[0]);
                    break;

                // 공간정보활용 > 관내업소정보조회
                case "inBusinessEstaInfo" :
                    aj_selectInBusinessEstaInfoList($("#tmpForm")[0]);
                    break;

                // 공간정보활용 > 대기오염
                case "atmospherePollution" :
                    aj_selectAtmospherePollutionList($("#tmpForm")[0]);
                    break;
            }

        });
    }

    //좌측 메뉴 >> 공간정보 활용  >> 사업공유 관리
    function _spaceTabEvent() {
        $(document).on("click", ".inner-tab", function () {
            var parent = $(this).parent();
            var tabName = $(this).data("tab");
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

    // 좌측 메뉴 >> 시설관리 활용
    function _facilityMenuEvent() {
        $(".lnb-facility .lnb-body").on("click", "button", function () {
            var name = $(this).attr("id");
            var area = $(this).data("popup");
            ui.openPopup(area);
            _selectEvent();	//지도 선택 이벤트 초기화
            switch (name) {
                //시설관리 > 상수도시설
                case "waterSupplyFacility" :
                    //aj_facility("WaterSupplyFacility");
                    dtmap.off('select', onFacilitySelectEventListener); //클릭 리스너 이벤트 삭제
                    getWaterSupplyFacility("wtlFirePs");		//상수도 시설 소방시설
                    break;

                //시설관리 > 하수도시설
                case "sewerSupplyFacility" :
                    //aj_facility("SewerSupplyFacility");
                    dtmap.off('select', onFacilitySelectEventListener); //클릭 리스너 이벤트 삭제
                    getSewerSupplyFacility("swlConnLs");		//하수도 시설 하수연결관
                    break;

                //시설관리 > 교통시설
                case "transportationFacility" :
                    //aj_selectTransportationFacilityList($("#tmpForm")[0]);
                    getTransportationFacility("roadSection");	// 교통시설 - 도로구간
                    break;

                //시설관리 > 체육시설
                case "physicalEducationFacility" :
                    //aj_selectPhysicalEducationFacilityList($("#tmpForm")[0]);
                    dtmap.off('select', onFacilitySelectEventListener); //클릭 리스너 이벤트 삭제
                    getPhyEduFaciListView();
                    break;

                //시설관리 > 복지시설
                case "welfareFacility" :
                    //TODO ↓↓↓↓↓↓↓↓↓↓↓
                    WLREspitalYN = '';
                    //aj_selectWelfareFacilityList($("#tmpForm")[0]);
                    dtmap.off('select', onFacilitySelectEventListener); //클릭 리스너 이벤트 삭제
                    getWelFareFaciListView();
                    break;

                //시설관리 > 시설예약관리
                case "faciReseMng" :
                    aj_selectFaciReseMngList($("#tmpForm")[0]);
                    break;
            }

        });
    }

    //좌측 메뉴 >> 교통분석
    function _trafficMenuEvent() {
        $(".lnb-traffic .lnb-body").on("click", "button", function () {
            var name = $(this).attr("id");
            var area = $(this).data("popup"); //팝업 위치명 넣어주세요  ex)rightPopup
            //ui.openPopup(area);
            switch (name) {
                // 교통분석 > 버스노선정보
                case "BusRouteInformation" :
                    toastr.error("버스노선정보");
                    break;
                // 교통분석 >  인구정보
                case "PopulationInformation" :
                    toastr.error("인구정보");
                    break;
                // 교통분석 > 대중교통 취약분석
                case "TransportationVulnerability" :
                    toastr.error("대중교통 취약분석");
                    break;
            }
        });
    }

    //좌측 메뉴 >> 행정자산
    function _administrativeMenuEvent() {
        $(".lnb-administrative .lnb-body").on("click", "button", function () {
            var name = $(this).attr("id");
            var area = $(this).data("popup"); //팝업 위치명 넣어주세요  ex)rightPopup
            ui.openPopup(area);
            switch (name) {
                // 행정자산 >  행정자산관리
                case "AdministrativeAsset" :
                    toastr.error("행정자산관리");
                    break;
                // 행정자산 > 공유지관리
                case "CoownedLand" :
                    toastr.error("공유지관리");
                    break;
                // 행정자산 > 공유재산 실태조사
                case "SurveyProperty" :
                    aj_selectPbprtAccdtList();
                    toastr.success("공유재산 실태조사");
                    break;
            }
        });
    }

    //좌측 메뉴 >> 분석
    function _analysisMenuEvent() {
        $(".lnb-analysis .lnb-body").on("click", "button", function () {
            var name = $(this).attr("id");
            var area = $(this).data("popup"); //팝업 위치명 넣어주세요  ex)rightPopup
            //ui.openPopup(area);
            switch (name) {
                // 분석 > AI영상분석(3D)
                case "M_AI_IMAGE" :
                    toastr.error("AI영상분석(3D)");
                    break;
                // 분석 > 조망권분석(3D)
                case "M_ROV_ANLS" :
                    toastr.error("조망권분석(3D)");
                    break;
                // 분석 > 경사분석(3D)
                case "M_SLOPE" :
                    toastr.error("경사분석(3D)");
                    break;
                // 분석 > 공간분석
                case "M_SPCE_ANLS" :
                    toastr.error("공간분석");
                    break;
                // 분석 > 일조권분석(3D)
                case "M_SUHN_ANLS" :
                    toastr.error("일조권분석(3D)");
                    break;
                // 분석 > 지형단면도분석(3D)
                case "M_TPPH_SECT" :
                    toastr.error("지형단면도분석(3D)");
                    break;
                // 분석 > 지하시설단면도
                case "M_UNDG_FCTY_SECT" :
                    toastr.error("지하시설단면도");
                    break;
                // 분석 > 가시권분석(3D)
                case "M_VSBL_ANLS" :
                    toastr.error("가시권분석(3D)");
                    break;
            }
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
        _initDrawEvent();
        $(".popup-sub").removeClass("opened");
    }

    /**
     * 팝업 생성
     */
    function openPopup(area, name) {
        var _area = {};
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
                //_area.width = "1600";	//가로길이 수정위해 주석
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
                _area.top = "50";
                _area.right = "70";
                _area.left = "unset";
                _area.width = "550";
                _area.heigth = "480";
                break;
            //게시판
            case "bbsPopup" :
                _area.top = "unset";
                _area.right = "unset";
                _area.left = "unset";
                _area.width = "unset";
                _area.heigth = "unset";
                break;
            default :
                _area.top = "unset";
                _area.right = "unset";
                _area.left = "unset";
                _area.width = "unset";
                _area.heigth = "unset";
                break;
        }

        initPopup(area);
        //기본 틀 크기와 다른 크기를 갖는 DIV 처리
        switch (name) {
            case "backgroundMapInfo":
                _area.width = "325";
                _area.heigth = "510";
                break;
            case "saveMap":
                _area.width = "325";
                _area.heigth = "750";
                break;
            case "krasInfo":
                _area.width = "660";
                _area.heigth = "750";
                break;
            case "setting":
                _area.width = "250";
                _area.heigth = "750";
                _area.right = "160";
                break;
            case "apptChart":
                _area.top = "80";
                _area.width = "400";
                _area.heigth = "520";
                _area.left = "870";
                break;
            case "insertAdministrationZoneView":
                _area.left = "80";
                _area.width = "550";
                _area.heigth = "807";
                break;
            case "layerManagement":
                _area.left = "360";
                _area.width = "550";
                _area.heigth = "807";
                break;
            case "multiView":
                _area.width = "290";
                _area.heigth = "110";
                break;
            case "emiInfo":
                _area.top = "80";
                _area.width = "550";
                _area.heigth = "807";
                break;
            case "layerInfo":
                _area.width = "515";
                _area.heigth = "807";
                break;

        }

        $("#" + area).css({
            "top": _area.top + "px",
            "right": _area.right + "px",
            "left": _area.left + "px",
            "width": _area.width + "px",
            "height": _area.heigth + "px"
        });
        $("#" + area).addClass("opened");
    }

    /**
     * 팝업 초기화
     */
    function initPopup(area) {
        var arrAllPopupTy = ["leftPopup", "rightSubPopup", "rightPopup", "bottomPopup", "bbsPopup"];
        var arrPopupTy = [];
        //서브일때만 부모 빼고 초기화
        if (area.includes("left")) {
            arrPopupTy = ["bottomPopup", "rightSubPopup", "rightPopup", "bbsPopup"];
        } else if (area.includes("right")) {
            if (area === "rightSubPopup")
                arrPopupTy = ["rightSubPopup", "bbsPopup"];
            else
                arrPopupTy = ["leftPopup", "rightSubPopup", "rightPopup", "bbsPopup"];
        } else if (area.includes("bottom")) {
            arrPopupTy = ["leftPopup", "rightSubPopup", "rightPopup", "bbsPopup"];
        } else if (area.includes("bbsPopup")) {
            arrPopupTy = arrAllPopupTy;
        } else {
            arrPopupTy = arrAllPopupTy;
        }
        $.each(arrPopupTy, function (key, value) {
            $("#" + value).removeClass("opened").html("");
        });
        //그리기 초기화
        _initDrawEvent();
    }

    //그리기 초기화
    function _initDrawEvent() {
        dtmap.off('drawend');
        // dtmap.vector.clear();
        dtmap.draw.clear();
    }

    //지도 선택 이벤트 초기화
    function _selectEvent() {
        dtmap.off('select', onFacilitySelectEventListener); 	//시설관리(시설예약관리제외)선택 리스너 이벤트 삭제
        dtmap.off('select', onFaciReseMngSelectEventListener); 	//시설예약관리 선택 이벤트 리스너 삭제
        dtmap.clear();
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

function clearMap() {
    dtmap.draw.dispose();
    dtmap.draw.clear();
    dtmap.vector.clear();
}

//팝업 오픈 실행 함수 
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

//사용자 정보 조회
function aj_userInfoPopupOpen(id) {
    ui.openPopup("userInfoUdt");
    $(".popup-overlay").show();
    $.ajax({
        type: "POST",
        url: "/com/usi/userInfoViewPopup.do",
        data: {
            userId: id
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#userInfoUdt").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
        }
    });
}

//공지사항
function aj_selectNoticeList(pageIndex, searchCnd, searchWrd) {
    $(".popup-overlay").show();
    $.ajax({
        type: "POST",
        url: "/com/noti/selectNoticeList.do",
        data: {
            pageIndex: pageIndex,
            searchCnd: searchCnd,
            searchWrd: searchWrd,
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#bbsPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
        }
    });
}

//qna
function aj_selectQnaList(pageIndex, searchCnd, searchWrd) {
    $(".popup-overlay").show();
    $.ajax({
        type: "POST",
        url: "/com/qna/selectQnaList.do",
        data: {
            pageIndex: pageIndex,
            searchCnd: searchCnd,
            searchWrd: searchWrd,
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#bbsPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
        }
    });
}

//운영지원
function aj_selectOpQnaList(pageIndex, searchCnd, searchWrd) {
    $(".popup-overlay").show();
    $.ajax({
        type: "POST",
        url: "/com/opqna/selectOpQnaList.do",
        data: {
            pageIndex: pageIndex,
            searchCnd: searchCnd,
            searchWrd: searchWrd,
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#bbsPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
        }
    });
}

//3D 지도 설정
function aj_mapsetting() {
    $.ajax({
        type: "POST",
        url: "/cmt/mst/selectMapsetting.do",
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }
    });
}