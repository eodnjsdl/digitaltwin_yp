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
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
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
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return false;
            }
        },
        complete : function() {
            loadingBar("hide");
        }
    });
}
