// 즐겨찾기 목록 호출
function aj_selectFavoritesList(frm) {
    ui.loadingBar("show");

    var formData = new FormData(frm);

    $.ajax({
        type: "POST",
        url: "/cmt/fvrt/selectFavoritesList.do",
        data: formData,
        dataType: "html",
        processData: false,
        contentType: false,
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup").html(returnData);
                $("input[name='sortKind']:radio").on("change", function () {
                    fn_select_favorites_list();
                });
                $("input:checkbox[id='favoritesOrder2']").prop("checked", true);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 즐겨찾기 등록화면 호출
function aj_insertFavoritesView(frm) {
    ui.loadingBar("show");
    var formData = new FormData(frm);

    $.ajax({
        type: "POST",
        url: "/cmt/fvrt/insertFavoritesView.do",
        data: formData,
        dataType: "html",
        processData: false,
        contentType: false,
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 즐겨찾기 수정화면 호출
function aj_updateFavoritesView(bkmkId, frm) {
    if (dtmap.mod === "2D") {
        ui.loadingBar("show");
        var formData = new FormData(frm);
        if (bkmkId != null) {
            formData.append('bkmkId', bkmkId);
        }
        $.ajax({
            type: "POST",
            url: "/cmt/fvrt/updateFavoritesView.do",
            data: formData,
            dataType: "html",
            processData: false,
            contentType: false,
            async: false,
            success: function (returnData, status) {
                if (status == "success") {
                    $("#rightPopup").html(returnData);

                } else {
                    toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                    return;
                }
            }, complete: function () {
                ui.loadingBar("hide");
            }
        });
    } else {
        return toastr.warning("해당 기능은 2D에서 가능합니다.");
    }
}

// 즐겨찾기 등록
function aj_insertFavorites(frm) {
    if (dtmap.mod === "2D") {
        // const yMap = app2D.getYMap();
        // var  centerx= yMap.getMap().getView().getCenter()[0] ;
        // var  centery= yMap.getMap().getView().getCenter()[1] ;
        // var  zoom  =  parseInt(yMap.getMap().getView().getZoom());
        var centerx = dtmap.getCenter()[0];
        var centery = dtmap.getCenter()[1];
        var zoom = parseInt(map2d.view.getZoom());
        var bass = $('#bass').is(':checked');
        if (bass) bass = 'y'
        else bass = 'n'
        var formData = new FormData(frm);
        formData.append("xcord", centerx);
        formData.append("ycord", centery);
        formData.append("cchLevel", zoom);
        formData.append("bass", bass);
        formData.append("ImgDataString", $(".bookmark-basic img").attr("src"));
        ui.loadingBar("show");
        $.ajax({
            type: "POST",
            url: "/cmt/fvrt/insertFavorites.do",
            data: formData,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            success: function (returnData, status) {
                if (returnData.result == "success") {
                    toastr.success("즐겨찾기를 성공적으로 등록하였습니다.");
                    // rightPopupOpen('favorites');
                    ui.openPopup("rightPopup");
                    aj_selectFavoritesList($("#tmpForm")[0]);
                } else if (returnData.result == "fail") {
                    toastr.error("즐겨찾기를 등록하는데 실패하였습니다.");
                    return;
                }
            }, complete: function () {
                ui.loadingBar("hide");
            }
        });
    } else {
        toastr.error("2D 모드에서 등록이 가능합니다.");
    }
}

// 즐겨찾기 수정
function aj_updateFavorites(frm) {
    if (dtmap.mod === "2D") {
        // var yMap = app2D.getYMap();
        // var centerx = yMap.getMap().getView().getCenter()[0];
        // var centery = yMap.getMap().getView().getCenter()[1];
        // var zoom = yMap.getMap().getView().getZoom();
        // var bass = $('#bass').is(':checked');
		var centerx = dtmap.getCenter()[0];
		var centery = dtmap.getCenter()[1];
		var zoom = parseInt(map2d.view.getZoom());
		var bass = $('#bass').is(':checked');
		if (bass) bass = 'y'
		else bass = 'n'
        var formData = new FormData(frm);
        formData.append("xcord", centerx);
        formData.append("ycord", centery);
        formData.append("cchLevel", zoom);
        formData.append("bass", bass);
        var src = $(".bookmark-basic img").attr("src");
        if (src == "data:image:jpg;base64,") {
            toastr.error("현재 위치가 수정되지 않았습니다.");
        }
        formData.append("ImgDataString", src);
        ui.loadingBar("show");
        $.ajax({
            type: "POST",
            url: "/cmt/fvrt/updateFavorites.do",
            data: formData,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            frm, frm,
            success: function (returnData, status) {
                if (returnData.result == "success") {
                    toastr.success("즐겨찾기를 성공적으로 수정하였습니다.");
                    // rightPopupOpen('favorites');
                    ui.openPopup("rightPopup");
                    aj_selectFavoritesList($("#tmpForm")[0]);
                    aj_selectFavoritesInfoView(null, this.frm);
                } else if (returnData.result == "fail") {
                    toastr.error("즐겨찾기를 수정하는 데 실패하였습니다.");
                    return;
                }
            }, complete: function () {
                ui.loadingBar("hide");
            }
        });
    } else {
        toastr.error("2D 모드에서 등록이 가능합니다.");
    }
}

/**
 * 즐겨찾기 상세
 * @param id
 */
function aj_selectFavoritesInfoView(bkmkId, frm) {
    ui.loadingBar("show");
    var formData = new FormData(frm);
    if (bkmkId != null) {
        formData.append('bkmkId', bkmkId);
    }
    $.ajax({
        type: "POST",
        url: "/cmt/fvrt/selectFavoritesView.do",
        data: formData,
        dataType: "html",
        processData: false,
        contentType: false,
        async: false,
        success: function (returnData, status) {

            if (status == "success") {
                $("#rightPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}


function aj_deleteFavoritesView(frm) {

    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/fvrt/deleteFavorites.do",
        data: {'bkmkId': frm},
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                toastr.success("즐겨찾기를 삭제하였습니다.");

                // rightPopupOpen('favorites');
                ui.openPopup("rightPopup");
                aj_selectFavoritesList($("#tmpForm")[0]);
            } else if (returnData.result == "fail") {
                toastr.error("즐겨찾기를 삭제하는 데 실패하였습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

