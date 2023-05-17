// 개인별 레이어 목록 호출
function aj_selectLayerList(mode, reset = false) {
    var searchKeyword = $(".lnb-layer input[name='searchKeyword']").val();

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
                $(".lnb-layer").html(returnData);
                $(".lnb-layer input[name='searchKeyword']").val(searchKeyword);

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

// 레이어 목록 관리 호출
function aj_selectLayerManagementList() {
    var searchCondition = $("#leftPopup select[name='searchCondition']").val();
    var searchKeyword = $("#leftPopup input[name='searchKeyword']").val();

    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/lyr/lym/selectLayerManagementList.do",
        data: {
            "searchCondition": searchCondition,
            "searchKeyword": searchKeyword
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#leftPopup").html(returnData);
                $("#leftPopup select[name='searchCondition']").val(searchCondition);
                $("#leftPopup input[name='searchKeyword']").val(searchKeyword);
                $(".layer-list .layer-list-dep2 li").removeClass("active");

                if (!$(".layerListMng .scroll-y").hasClass("mCustomScrollbar")) {
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

// 레이어 등록 관리 호출
function aj_insertDataConversionView() {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/lyr/dtcv/insertDataConversionView.do",
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#leftPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 레이어 정보 수정 화면 표출
function aj_updateLayerInfoView(layerId) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/lyr/lyi/updateLayerInfoView.do",
        data: {
            lyrId: layerId
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#layerManagement").removeClass("active");
                $("#leftPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}