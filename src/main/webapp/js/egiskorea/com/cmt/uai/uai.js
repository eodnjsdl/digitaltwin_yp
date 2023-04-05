/**
 * 2d 통합행정정보.
 */
$(document).ready(function () {

    // cmmUtil.resetMap();

});

function _onDrawEnd_krasInfo(e) {
    var geom = e.geometry;
    var coord = geom.getFlatCoordinates();
    reverseUaiGeo(parseFloat(coord[0]), parseFloat(coord[1]));
}

function aj_krasInfo() {
    dtmap.draw.active({type: 'Point', once: true});
    dtmap.on('drawend', _onDrawEnd_krasInfo);


    // if (!is3dInit) {
    //     ui.loadingBar('show')
    //     call3D(false);
	//
    //     is3dInit = true;
    // }
    // ;
    // if (app2D) {
    //     cmmUtil.resetMap();
	//
    //     const yMap = app2D.getYMap();
    //     const select = yMap.getModule("select");
    //     select.on("Point", "drawend", (event) => {
    //         const feature = event.feature;
    //         const geometry = cmmUtil.toMapProjection(feature.getGeometry());
    //         const position = geometry.getCoordinates();
    //         reverseUaiGeo(parseFloat(position[0]), parseFloat(position[1]));
    //     }, true);
    // }
}

function reverseUaiGeo(pointx, pointy) {
    // var vPosition = new Module.JSVector2D(pointx, pointy);
    // 좌표변환 실행
    // var vResult = Module.getProjection().convertProjection(26, vPosition, 13); // 5179 -> 4326
    var transCoord = proj4(dtmap.crs, "EPSG:4326", [pointx,pointy]);
    var pnu = aj_getPnuByLonLat(transCoord[0], transCoord[1]);
    if (pnu != "") {
        var landRegister = getLandRegisterByPnu(pnu);
        landRegister.landRegister ?
            dtmap.vector.readWKT(landRegister.landRegister.geometry,  landRegister.landRegister)
            : toastr.error("geometry 값이 존재하지 않습니다.");
        // rightPopupOpen("landRegister", pnu, null, true);
        ui.openPopup("rightPopup", "krasInfo");
        aj_selectLandRegister(pnu);
        // dtmap.vector.readWKT(landRegister.landRegister.geometry,  landRegister.landRegister);
        // cmmUtil.highlightGeometry(landRegister.landRegister.geometry);
    } else {
        toastr.error("조회된 결과가 없습니다.");
    }
}

// 토지대장 표출
function aj_selectLandRegister(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectLandRegister.do",
        data: {
            "pnu": pnu
        },
        dataType: "html",
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

// 건축물대장 표출
function aj_selectBuildingRegister(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectBuildingRegister.do",
        data: {
            "pnu": pnu
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                $(".scroll-y").mCustomScrollbar({
                    scrollbarPosition: "outside"
                });
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 토지이용현황 표출
function aj_selectLandUseStatus(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectLandUseStatus.do",
        data: {
            "pnu": pnu
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                $(".scroll-y").mCustomScrollbar({
                    scrollbarPosition: "outside"
                });
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 공시지가 표출
function aj_selectOfficiallyAnnouncedLandPrice(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectOfficiallyAnnouncedLandPrice.do",
        data: {
            "pnu": pnu
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                $(".scroll-y").mCustomScrollbar({
                    scrollbarPosition: "outside"
                });
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 개별주택가격 표출
function aj_selectIndividualizationHousePrice(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectIndividualizationHousePrice.do",
        data: {
            "pnu": pnu
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                $(".scroll-y").mCustomScrollbar({
                    scrollbarPosition: "outside"
                });
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

// 인허가 표출
function aj_selectAuthorizationPermission(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectAuthorizationPermission.do",
        data: {
            "pnu": pnu
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                $(".scroll-y").mCustomScrollbar({
                    scrollbarPosition: "outside"
                });
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

//토지대장 표출
function aj_selectLandRegisterTest(pnu) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/uai/selectLandRegister.do",
        data: {
            "pnu": pnu,
            searchSet: "1"
        },
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                $(".scroll-y").mCustomScrollbar({
                    scrollbarPosition: "outside"
                });
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}

//토지대장 검색
function aj_selectLandRegisterSearch() {

    var mntn = $("#mntn").is(":checked") ? "2" : "1";
    var pnu = $('#li').val() + mntn + $('#mainAdr').val().padStart(4, '0') + $('#subAdr').val().padStart(4, '0');

    var landRegister = getLandRegisterByPnu(pnu);

    if (landRegister.landRegister == null) {
        toastr.error("조회된 결과가 없습니다.");
        return;
    } else {
        var coordinates = OLOAD.setPosition(landRegister.landRegister.geometry, "MULTIPOLYGON", 0);
        moveCamera(landRegister, "ldpl");

        // 펜스 생성
        createVerticalPlane(coordinates.coordinates);
        OLOAD.loadCenterData(landRegister);

        ui.loadingBar("show");
        $.ajax({
            type: "POST",
            url: "/cmt/uai/selectLandRegister.do",
            data: {
                "pnu": pnu,
                searchSet: "1"
            },
            dataType: "html",
            async: false,
            success: function (returnData, status) {
                if (status == "success") {
                    $("#rightPopup .tabBoxDepth1-wrap").html(returnData);

                    $(".scroll-y").mCustomScrollbar({
                        scrollbarPosition: "outside"
                    });
                } else {
                    toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                    return;
                }
            }, complete: function () {
                ui.loadingBar("hide");
            }
        });
    }
}

