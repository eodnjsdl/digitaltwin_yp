/**
 * @description 배경지도 팝업 함수
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.03.07
 */
function aj_selectBackgroundMapInfoList() {
    $.ajax({
        type : "POST",
        url : "/cmt/bm/selectBackgroundMapInfoList.do",
        dataType : "html",
        async: false,
        beforeSend : function(jqXHR, settings) {
            ui.loadingBar("show");
        },
        success : function(returnData, status) {
            if (status == "success") {
                $("#rightPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        },
        complete : function() {
            ui.loadingBar("hide");
        }
    });
}

/**
 * @description 기본 배경지도 정보 조회 하는 함수
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.04.12
 * @returns {object} mapServiceVO 배경지도 정보
 */
function aj_selectBackgroundMapBasicAtInfo() {

    var vo = null;

    $.ajax({
        type : 'GET',
        url : '/cmt/bm/selectBackgroundMapBasicAtInfo.do',
        dataType : "json",
        async: false,
        success : function(data) {
            if (data.callback == 'success') {
                vo = data.mapServiceVO; //기본배경지도 정보
            }
        },
        error : function(request, status, error) {
            console.log("code:" + request.status + "\nmessage:" + request.responseText + "\nerror:" + error);
        }
    });

    return vo;
}

/**
 * @description 배경지도 변경 함수
 * @Author 플랫폼개발부문 DT솔루션 이준호
 * @Date 2022.03.07
 * @param {string} serviceUrl 서비스주소(3D)
 * @param {string} serviceId 서비스ID(2D)
 * @param {string} bmCode 지도종류 코드 (1: 바로e맵(국토지리정보원)) 지도 종류에 따라 다르게 불러야 할 경우 bmCode 변수로 조건을 걸면 된다.
 */
function bgMapChage(serviceUrl, serviceId, bmCode) {

    /*if (serviceId == 'air') {
        Module.SetPlanetImageryType(02);
    } else if (serviceId == 'emap') {
        Module.SetPlanetImageryType(13);
    }

    return false;*/

    //3D 배경지도를 위한 옵션 전역 변수
    var XDWorldOption = {
        serverSetting: {
            url: '',
            tileExtent: {
                min: new Module.JSVector2D(-200000.98, -28086425.6),
                max: new Module.JSVector2D(31886425.6, 4000000.0)
            },
            projection: "EPSG:5179",
            tileSize: 256,
            resolutions: [2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],		// 레벨별 해상도
            matrixIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],	// 타일 레벨 정의 (resolutions과 매칭)
            serviceLevel: {
                min: 3,
                max: 20
            }
        },
        userSetting: {
            zeroLevel: 2,
            quality: "middle"
        }
    };

    XDWorldOption.serverSetting.url = serviceUrl;

    try {
        Module.getMap().changeBaseMap(XDWorldOption);
    } catch (e) {
        console.error(e);
    }
}

$(document).ready(function() {

    /**
     * @description 맵 변경시 이벤트
     * @Author 플랫폼개발부문 DT솔루션 이준호
     * @Date 2022.03.08
     */
    $(document).on('change', 'input[name="mapBgType"]:radio', function(){

        var serviceId = $(this).val(); //서비스ID
        var serviceUrl = $(this).data('service_url'); //서비스 주소
        var bmCode = $(this).data('bm_code');

        if (serviceUrl == '' || serviceUrl == null || typeof serviceUrl === undefined) {
            alert('3D 서비스주소 값이 없습니다. 서비스주소를 등록해주세요.')
            return false;
        }

        if (app2D) {
            const yMap = app2D.getYMap();
            const detialtype = "";
            const layers = yMap.map.getLayers().getArray();
            layers
                .filter((layer) => layer.get("type") == "backgroundMap")
                .forEach((layer) => {
                    this.detialtype = layer.get("detailtype");
                });
            yMap.changemap(serviceId); //2D 지도 변경
        } else {
        	bgMapChage(serviceUrl, serviceId, bmCode); //3D 지도 변경
        }
    });

    /**
     * 맵적용시 이벤트.
     */
    $(document).on('click', '#bg-apply', function() {

        var checked = $('.mapBgType').is(':checked');
        var serviceId = $('.mapBgType:checked').val(); //m_bgType값

        if (!checked) {
            alert('배경지도를 선택해주세요.');
            return false;
        }

        m_bgType = serviceId; //적용시 전역 배경타입 변수에 값 넣어주기.

        $(this).closest('#rightPopup').removeClass("opened");
        $('#backgroundMapInfo').parent('li').removeClass('active');
    });

    /**
     * 맵닫기시 이벤트.
     */
    $(document).on('click', '#bg-popup-close', function() {
        var checekdValue = $('.mapBgType:checked').val();

        if (checekdValue != m_bgType) { //이전 지도와 바꿀려고 한 지도 아이값가 다른경우
            var $mBgType = $('input[type=radio][class=mapBgType][value=' + m_bgType + ']');
            $mBgType.prop('checked', true);
            var serviceId = $mBgType.val(); //서비스ID
            var serviceUrl = $mBgType.data('service_url'); //서비스 주소
            var bmCode = $mBgType.data('bm_code');

            bgMapChage(serviceUrl, serviceId, bmCode); //3D 배경 지도 변경

            if (app2D) {
                const yMap = app2D.getYMap();
                yMap.changemap(serviceId); //2D 배경지도 변경
            }
        }

        $(this).parent().removeClass("opened");
    });
});

