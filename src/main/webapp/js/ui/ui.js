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
            switch (menu) {
                case "lnb-search" :
                    aj_search();
                    break;
                case "lnb-layer" :
                    $leftSide.find(".lnb-layer input[name='searchKeyword']").val("");
                    aj_selectLayerList("left");
                    break;
                case "lnb-theme" :
                    aj_selectThematicMapList();
                    break; //주제도
                case "lnb-work" :

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
        var searchKeyword = mode == "left"
            ? $(".lnb-layer input[name='searchKeyword']").val()
            : $("#rightPopup input[name='searchKeyword']").val();

        loadingShowHide("show");
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
                        $(".lnb-layer").fadeIn(100);
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
                    alert("ERROR!");
                    return;
                }
            }, complete: function () {
                loadingShowHide("hide");
            }
        });
    }


    /**
     * Right Tool Bar
     */
    let $mapControl = $('.map-control');

    // 2D/3D 버튼
    $mapControl.on('click', 'input[name="mapType"]', function (e) {
        dtmap.switchMap(e.target.value)
    });


    /**
     * loading bar
     */
    function loadingShowHide(type) {
        if (type == "show") {
            $('body').append('<div class="loadingWrapper" style="position:fixed ; top:0; left:0; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5); background-image:url(/images/common/loading.gif); background-position:center center; background-repeat:no-repeat; z-index: 10000;"></div>');
        } else if (type == "hide") {
            $('.loadingWrapper').remove();
        }
    }

    //임시
    $(document).on('click', '#layerList', function () {
        aj_selectLayerList("top");
        $("#rightPopup").addClass("opened");
        $("#rightPopup").css("width", 250).css("height", 807);
    });

});

//임시
function layerChecked() {
}

