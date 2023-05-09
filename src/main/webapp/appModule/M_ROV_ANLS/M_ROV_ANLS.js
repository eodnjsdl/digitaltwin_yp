/**
 * SUBJECT : 조망
 * AUTHOR : 이푸름
 * LAST UPDATE : 2021.1.12
 * COMMENT :
 */
var M_ROV_ANLS = {
    jNum: 0,
    jomangMode: false,
    appid: null,
    init: function () {
//		M_ROV_ANLS.destroy();
        //조망권
        this.Map = Module.getMap();

        this.Control = Module.getControl();
        this.Camera = Module.getViewCamera();

        var layerList = new Module.JSLayerList(true);
        this.Jomang = layerList.createLayer("analyJomang", 0);
        this.Jomang.setMaxDistance(map3d.config.maxDistance);
        this.Layer = layerList.createLayer("analyJomang_POI", Module.ELT_3DPOINT);
    },


    /*destroy*/
    destroy: function () {
        M_ROV_ANLS.Jomang.removeAll()
        M_ROV_ANLS.jNum = 0;
        changeJomangMouseKeyboardState(false);
        disableJomang();
    },
    display: function () {

    }
}

$(function () {

    //분석 popup 접기/펼치기
    $(".small-popup .popup-toggle").each(function () {
        $(this).click(function () {
            $(this).parent().toggleClass("fold");

            if ($(this).parent().hasClass("fold")) {
                $(this).attr("title", "펼치기");
            } else {
                $(this).attr("title", "접기");
            }
        });
    });

    $("#jomangRgstr").on("click", function () {
        if ($("#jomangRgstr").html() == "등록") {
            enableJomang();
        } else {
            disableJomang();
        }
    });

});

//조망권 활성화
function enableJomang() {
    Module.XDSetMouseState(1);
    showJomangPoint();
    $(".analysis-view-list").css("display", "block");
    $("#jomangRgstr").css("display", "none");
    dtmap.on('click', registerJomangPoint);

}

//조망권 비활성화
function disableJomang() {
    // 거리, 면적, 높이 측정 외 마우스 상태 '이동'으로 변경
    changeJomangMouseKeyboardState(M_ROV_ANLS.jomangMode);
    dtmap.off('click', registerJomangPoint);

}

function resiCompJomang() {

    var pointCnt = M_ROV_ANLS.Jomang.getObjectCount();

    if (pointCnt > 5) {
        toastr.warning('조망점은 최대 5개만 선택할 수 있습니다.');
//		changeJomangMouseKeyboardState(false)
        return false;
    } else if (pointCnt == 0) {
        toastr.warning('조망점이 없습니다.');

    } else if (pointCnt == 5) {

    } else {
        $("#jomangRgstr").css("display", "block");
    }
//	changeJomangMouseKeyboardState(false)
}

//조망점 생성
function registerJomangPoint(e) {
    var jNum = M_ROV_ANLS.jNum
    if (M_ROV_ANLS.Map == null || M_ROV_ANLS.Layer == null) return;

    var lon = e.coordinate[0];
    var lat = e.coordinate[1];
    var alt = e.altitude;
    var image = getCircle(4);
    var layerName = "analyJomang";
    var pointCnt = M_ROV_ANLS.Jomang.getObjectCount();

    if (pointCnt > 4) {
        toastr.warning('조망점은 최대 5개만 선택할 수 있습니다.');
        disableJomang();
    } else {
        Module.getAddObject().Add3DPoint(layerName, "pos_" + jNum, lon, lat, alt, image.data, image.width, image.height, "조망점" + jNum);

        var html = "<li id=\"jomangPoint" + jNum + "\"><div class=\"cell th\">조망점" + jNum + "</div>";
        html += "<div class=\"cell td\">";
        html += "<button type=\"button\" onclick=\"moveJomangPoint(" + jNum + ",this)\" class=\"btn btn-sm type03\">이동</button> ";
        html += "<button type=\"button\" onclick=\"removeJomangPoint(" + jNum + ")\" class=\"btn btn-sm basic\">삭제</button>";
        html += "</div>";
        html += "</li>";

        $('#jomangList').append(html);

        M_ROV_ANLS.jNum++;
    }


    checkJomangListCnt();
}

//조망점 원형 생성
function getCircle(radius) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = radius * 4;
    canvas.height = radius * 4;
    var x = canvas.width / 2;
    var y = canvas.height / 2;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.stroke();

    return context.getImageData(0, 0, canvas.width, canvas.height);
}

//조망점 삭제
function removeJomangPoint(pointCnt) {
    changeJomangMouseKeyboardState(false);
    $("#jomangPoint" + pointCnt).remove();
    M_ROV_ANLS.Jomang.removeAtKey("pos_" + pointCnt);
    Module.XDRenderData();
    checkJomangListCnt();

    var pointCnt = M_ROV_ANLS.Jomang.getObjectCount();
    if (pointCnt < 5) {
        $("#jomangRgstr").css("display", "block");
    }

}

//조망점 모두삭제
function removeJomangAllPoint() {
    var pointCnt = M_ROV_ANLS.Jomang.getObjectCount();
    if (pointCnt == 0) {
        toastr.warning("삭제할 조망점이없습니다")
    }
    $('#jomangList>li button:last-child').each(function () {
        $(this).click();
        changeJomangMouseKeyboardState(false)

    });
    //위치초기화
    setInitialLoc();
    //조망권 비활성화 상태
    changeJomangMouseKeyboardState(false);
}

//조망점 이동
//var reCameraLocation
//var reCurrentLon,
//	reCurrentLat,
//	reCurrentAlt,
//	reCurrentTilt;
reSaveOk = false;

function moveJomangPoint(pointCnt, tag) {

    $("#jomangList .type03").css("background-color", "");

    M_ROV_ANLS.Camera.setLimitAltitude(0);

    jomangMode = true;
    changeJomangMouseKeyboardState(true);

    var point = M_ROV_ANLS.Jomang.keyAtObject("pos_" + pointCnt);

    if (point == null) return;

    var camera = M_ROV_ANLS.Camera;
    var vPosition = point.getPosition();
    var dir = parseInt(M_ROV_ANLS.Camera.getDirect().toFixed(5));

    vPosition.Altitude = vPosition.Altitude + 5;//미정

    if (reSaveOk == false) {
        reSaveOk = true;
        reCameraLocation = M_ROV_ANLS.Camera.getLocation();
        reCurrentLon = reCameraLocation.Longitude;
        reCurrentLat = reCameraLocation.Latitude;
        reCurrentAlt = reCameraLocation.Altitude;
        reCurrentDir = parseInt(M_ROV_ANLS.Camera.getDirect().toFixed(5));
        reCurrentTilt = parseInt(M_ROV_ANLS.Camera.getTilt().toFixed(5));
    }

    M_ROV_ANLS.Camera.setLocation(vPosition);
    M_ROV_ANLS.Camera.setTilt(10);
    M_ROV_ANLS.Camera.setLimitTilt(10);
    M_ROV_ANLS.Camera.setDirect(dir);

    $(tag).attr("style", "background-color:#1C77FF;")
}

//조망점 개수 확인
function checkJomangListCnt() {

    var pointCnt = M_ROV_ANLS.Jomang.getObjectCount();

    if (pointCnt > 0) { // 조망점이 1개 이상

        $("#jomangRgstr").css("display", "none")
        $(".analysis-view-list").css("display", "block");

    } else { // 조망점 0개

        $("#jomangRgstr").css("display", "block")
        $(".analysis-view-list").css("display", "none");
        M_ROV_ANLS.jNum = 0;
        changeJomangMouseKeyboardState(false)
    }

}

//조망권 마우스 상태 변경
function changeJomangMouseKeyboardState(jMode) {
    $("#jomangList .type03").css("background-color", "");
    if (jMode) { // 조망권 활성화 상태
        M_ROV_ANLS.Control.setMouseRotMode(true); // 회전 가능
        M_ROV_ANLS.Control.setKeyRotMode(true);
        M_ROV_ANLS.Control.setMousePanMode(false); // 위치 이동 금지
        M_ROV_ANLS.Control.setKeyPanMode(false);
        M_ROV_ANLS.Control.setMouseZoomMode(false); // 확대 축소 금지
        M_ROV_ANLS.Control.setKeyZoomMode(false);
        M_ROV_ANLS.Camera.setMoveMode(true); // 1인칭 회전
    } else { // 조망권 비활성화 상태
        M_ROV_ANLS.Control.setMouseRotMode(true); // 회전 가능
        M_ROV_ANLS.Control.setKeyRotMode(true);
        M_ROV_ANLS.Control.setMousePanMode(true); // 위치 이동 가능
        M_ROV_ANLS.Control.setKeyPanMode(true);
        M_ROV_ANLS.Control.setMouseZoomMode(true); // 확대 축소 가능
        M_ROV_ANLS.Control.setKeyZoomMode(true);
        M_ROV_ANLS.Camera.setMoveMode(false); // 3인칭 회전
    }
}

//조망권 보이기
function showJomangPoint() {
    M_ROV_ANLS.Jomang.setVisible(true);
}

//조망점 숨기기(삭제X)
function hideJomangPoint() {
    M_ROV_ANLS.Jomang.setVisible(false);

    vTargetPos = new Module.JSVector3D(reCurrentLon, reCurrentLat, reCurrentAlt);

    M_ROV_ANLS.Camera.move(vTargetPos, reCurrentTilt, reCurrentDir, 1);
}
