$(document).ready(function () {
    /**
     *  Left Menu
     */
    let $leftSide = $('#side');
    let $leftBar = $('#lnb');
    $leftBar.on('click', 'li', function () {
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

    // 개인별 레이어 목록 호출
    function aj_selectLayerList(mode, reset = false) {
        var searchKeyword = mode === "left"
            ? $(".lnb-layer input[name='searchKeyword']").val()
            : $("#rightPopup input[name='searchKeyword']").val();

        loadingBar("show");
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
                if (status === "success") {
                    if (mode === "left") { // 좌측 메뉴 선택 시
                        $(".lnb-layer").html(returnData);
                        $(".lnb-layer input[name='searchKeyword']").val(searchKeyword);
                        $(".lnb-layer").fadeIn(100);
                    } else if (mode === "top") { // 상단 메뉴 선택 시
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
                    alert("ERROR!");
                    return;
                }
            }, complete: function () {
                loadingBar("hide");
            }
        });
    }


    // 주제도 목록 호출
    function aj_selectThematicMapList() {
        var searchKeyword = $(".lnb-theme input[name='searchKeyword']").val();

        $.ajax({
            type : "POST",
            url : "/com/tm/selectTMapList.do",
            data : {
                "searchKeyword" : searchKeyword
            },
            dataType : "html",
            async: false,
            beforeSend : function(jqXHR, settings) {
                loadingBar("show");
            },
            success : function(returnData, status){
                if (status == "success") {
                    $(".lnb-theme").html(returnData);
                    $(".lnb-theme input[name='searchKeyword']").val(searchKeyword);

                    if (!$(".lnb-theme .scroll-y").hasClass("mCustomScrollbar")) {
                        $(".scroll-y").mCustomScrollbar({
                            scrollbarPosition:"outside"
                        });
                    }
                } else {
                    alert("ERROR!");
                    return false;
                }
            },
            complete : function() {
                loadingBar("hide");
            }
        });
    }


    /**
     * Right Tool Bar
     */
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
            loadingBar('show');
            map3d.isLoaded.then(function () {
                loadingBar('hide');
            })
        }
        //측정기능 OFF
        $mapControl.find('.location, .distance, .measure, .radius').removeClass('active');
        dtmap.setInteraction('move');

        //패널 close
        $leftSide.removeClass('on');
        $rightPopup.removeClass('opened');

        dtmap.switchMap(e.target.value);
    });

    //위치
    $mapControl.on('click', '.ctrl-btn.location', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.setInteraction('location');
        } else {
            dtmap.setInteraction('move');
        }


    })

    //거리측정
    $mapControl.on('click', '.ctrl-btn.distance', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.setInteraction('distance');
        } else {
            dtmap.setInteraction('move');
        }


    });

    //면적측정
    $mapControl.on('click', '.ctrl-btn.measure', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.setInteraction('area');
        } else {
            dtmap.setInteraction('move');
        }


    })

    //반경측정
    $mapControl.on('click', '.ctrl-btn.radius', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.setInteraction('radius');
        } else {
            dtmap.setInteraction('move');
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

    /**
     * Top Menu
     */

    let $topMenu = $('.map-tool');
    let $rightPopup = $("#rightPopup");

    //배경지도
    $topMenu.on('click', '#backgroundMapInfo', function () {
        $.ajax({
            type: "POST",
            url: "/cmt/bm/selectBackgroundMapInfoList.do",
            dataType: "html",
            async: false,
            beforeSend: function (jqXHR, settings) {
                loadingBar("show");
            },
            success: function (returnData, status) {
                if (status === "success") {
                    $rightPopup.html(returnData);
                    $rightPopup.addClass('opened');
                    $rightPopup.css("width", "325").css("height", "430");
                } else {
                    alert("ERROR!");
                }
            },
            complete: function () {
                loadingBar("hide");
            }
        });
    });

    //3D레이어
    $topMenu.on('click', '#layerList', function () {
        aj_selectLayerList("top");
        $rightPopup.addClass("opened");
        $rightPopup.css("width", 250).css("height", 807);
    });

    //그리기
    $topMenu.on('click', '#graphicInfo', function () {
        $.ajax({
            type: "POST",
            url: "/cmt/grph/selectGraphicInfoList.do",
            // data: data,
            // dataType: "html",
            // async: false,
            success: (returnData, status) => {
                if (status === "success") {
                    $rightPopup.html(returnData);
                    $rightPopup.css("width", 480).css("height", 807);
                    $rightPopup.addClass('opened');
                    //이벤트 등록부
                    // this.bindEvents();
                } else {
                    alert("ERROR!");
                }
            },
            complete: function () {
            },
        });
    });

    /**
     * 공통
     */
    //팝업 닫기 버튼
    $(document).on('click', '.popup-panel .popup-close', function () {
        $(this).closest('.popup-panel').removeClass('opened');
    })


});

//임시
function layerChecked() {
}

/**
 * loading bar
 */
function loadingBar(type) {
    if (type === "show") {
        $('body').append('<div class="loadingWrapper" style="position:fixed ; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5); background-image:url(/images/common/loading.gif); background-position:center center; background-repeat:no-repeat; z-index: 10000;"></div>');
    } else if (type === "hide") {
        $('.loadingWrapper').remove();
    }
}

/**
 * datePicker
 */
function callDatePicker(){
    $( ".datepicker" ).datepicker({
        showOn: 'both',
        buttonImage: '/images/icon/form-calendar.svg',
    });
}
