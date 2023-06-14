<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>국토조사앱</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="/images/common/favicon.ico"/>

    <script src="/js/com/jquery/jquery-3.4.1.min.js"></script>

    <!-- jquery-ui -->
    <script src="/js/com/jquery-ui/jquery-ui.js"></script>
    <link rel="stylesheet" href="/js/com/jquery-ui/jquery-ui.css">

    <!-- mCustomScrollbar -->
    <script src="/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
    <link rel="stylesheet" href="/js/plugin/mCustomScrollbar/jquery.mCustomScrollbar.css">

    <!-- rangeslider -->
    <script src="/js/plugin/rangeslider/rangeslider.js"></script>
    <link rel="stylesheet" href="/js/plugin/rangeslider/rangeslider.css">

    <!-- colorPicker -->
    <script src="/js/plugin/colorPicker/jquery.minicolors.min.js"></script>
    <link rel="stylesheet" href="/js/plugin/colorPicker/jquery.minicolors.css">

    <!-- chart.js -->
    <script src="/js/plugin/chart/chart.js"></script>
    <!-- toastr 2.1.4 stylesheet -->
    <link rel="stylesheet" type="text/css" href="/js/plugin/toastr-2.1.4/toastr.css">
    <!-- toastr 2.1.4 -->
    <script type="text/javascript" src="/js/plugin/toastr-2.1.4/toastr.js"></script>
    <script type="text/javascript" src="/js/util/toast-confirm.js"></script>
    <!-- ui -->
    <script src="/js/ui/ui.js"></script>

    <!-- ax5 grid css -->
    <link rel="stylesheet" href="/js/plugin/ax5grid/ax5grid.css">

    <!-- common stylesheet -->
    <link rel="stylesheet" href="/css/com/common.css">
    <link rel="stylesheet" href="/css/map.css">

	<!-- webApp -->
    <link rel="stylesheet" href="/css/webApp/webAppMain.css">

    <!-- jspdf 6.7.0 -->
    <script src="/engine/plugin/v6.7.0/jspdf.umd.min.js"></script>
    <script src="/engine/plugin/v6.7.0/jspdf.plugin.autotable.min.js"></script>

    <!-- ax5 grid -->
    <script src="/js/plugin/ax5grid/ax5core.min.js"></script>
    <script src="/js/plugin/ax5grid/ax5grid.min.js"></script>

    <!-- lightbox2-2.11.4 -->
    <link href="/js/plugin/lightbox2-2.11.4/dist/css/lightbox.css" rel="stylesheet">
    <script type="text/javascript" src="/js/plugin/lightbox2-2.11.4/dist/js/lightbox.js"></script>

    <!-- jquery.table2excel -->
    <script src="/js/plugin/jquery.table2excel/jquery.table2excel.min.js"></script>

    <!-- font 맑은고딕: stre.js (지도저장기능 수행 시) -->
    <script src="/engine/plugin/v6.7.0/malgun.js"></script>

    <!-- 2d -->
    <link rel="stylesheet" href="/css/map2d.css">
    <link rel="stylesheet" href="/css/splitmap.css">

    <script src="/engine/dt_info.js"></script>

    <!-- DTMAP Plugin -->
    <link rel="stylesheet" href="/js/map/lib/openlayers/ol.css">
    <script src="/js/map/lib/proj4/proj4.js"></script>
    <script src="/js/map/lib/openlayers/ol.js"></script>
    <script src="/js/map/lib/jsts/jsts.min.js"></script>
    <script src="/js/map/lib/lodash/lodash.min.js"></script>
    <script src="/js/map/lib/html2canvas/html2canvas.min.js"></script>
    <script src="/js/map/lib/eventEmitter/EventEmitter.min.js"></script>
    <script src="/js/map/lib/rbush/rbush.min.js"></script>
    <script src="/js/map/lib/gifler/gifler.min.js"></script>

    <!-- DTMAP -->
    <script src="/js/map/dtmap.js"></script>
    <script src="/js/map/dtmap-tooltip.js"></script>
    <script src="/js/map/dtmap-config.js"></script>

    <%--    <script src="/js/map/dtmap-urls.${domain}.js"></script>--%>
    <script src="/js/map/dtmap-urls.localhost.js"></script>
    <script src="/js/map/dtmap-util.js"></script>

    <!-- 2D Map js -->
    <script src="/js/map/2d/map2d.js"></script>
    <script src="/js/map/2d/config.js"></script>
    <script src="/js/map/2d/modules/map2d-baselayer.js"></script>
    <script src="/js/map/2d/modules/map2d-layer.js"></script>
    <script src="/js/map/2d/modules/map2d-measure.js"></script>
    <script src="/js/map/2d/modules/map2d-location.js"></script>
    <script src="/js/map/2d/modules/map2d-draw.js"></script>
    <script src="/js/map/2d/modules/map2d-vector.js"></script>
    <script src="/js/map/2d/modules/map2d-multiview.js"></script>

    <!-- 3D Map js -->
    <script src="/js/map/3d/map3d.js"></script>
    <script src="/js/map/3d/config.js"></script>
    <script src="/js/map/3d/modules/map3d-layer.js"></script>
    <script src="/js/map/3d/modules/map3d-color.js"></script>
    <script src="/js/map/3d/modules/map3d-compass.js"></script>
    <script src="/js/map/3d/modules/map3d-measure.js"></script>
    <script src="/js/map/3d/modules/map3d-overlay.js"></script>
    <script src="/js/map/3d/modules/map3d-location.js"></script>
    <script src="/js/map/3d/modules/map3d-draw.js"></script>
    <script src="/js/map/3d/modules/map3d-vector.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-base.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-group.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-wms.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-wfs.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-poi.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-geom.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-point.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-line.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-polygon.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-csv.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-lod.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-img.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-shp.js"></script>
    <script src="/js/map/3d/layer/map3d-layer-facility.js"></script>

    <!-- 양평 레이어 상수 -->
    <script src="/js/map/yp-layer.js"></script>

    <!-- 공통 파일 -->
    <script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>

    <!-- 통합행정정보 -->
    <script src="/js/egiskorea/com/cmt/uai/uai.js"></script>
    <!-- 지적/건물 -->
    <script src="/js/egiskorea/com/cmt/ldbd/selectLdbdList.js"></script>
    <!-- 내보내기 -->
    <script src="/js/egiskorea/com/cmt/dwld/dwld.js"></script>
    <!-- 메모저장 -->
    <script src="/js/egiskorea/com/cmt/mmi/mmi.js"></script>
    <!-- 사진정보 -->
    <script src="/js/egiskorea/com/cmt/pti/pti.js"></script>
    <!-- 즐겨찾기 -->
    <script src="/js/egiskorea/com/cmt/fvrt/fvrt.js"></script>
    <!-- 지도저장 -->
    <script src="/js/egiskorea/com/cmt/stre/stre.js"></script>
    <!-- 그리기 -->
    <script src="/js/egiskorea/com/cmt/grph/grph.js"></script>
    <!-- 드론영상 -->
    <script src="/js/egiskorea/com/cmt/dron/dron.js"></script>
    <!-- 3D레이어 -->

    <!-- 배경지도 -->
    <script src="/js/egiskorea/com/bcrn/bcrn.js"></script>
    <!-- 화면분할 -->
    <script src="/js/egiskorea/com/cmt/mltv/mltv.js"></script>

    <!-- 업무 -->
    <script src="/js/egiskorea/com/job/job.js"></script>
    <script src="/js/egiskorea/com/job/cmt/cmt.js"></script>
    <script src="/js/egiskorea/com/job/wrpp/wrpp.js"></script>
    <script src="/js/egiskorea/com/job/swg/swg.js"></script>

    <!-- 분석 -->
    <script src="/js/egiskorea/com/anls/anls.js"></script>

    <!-- 지적 정보 -->
    <script src="/js/egiskorea/com/geo/geographic.js"></script>

    <!-- 레이어 -->
    <script src="/js/egiskorea/com/sach/sach.js"></script>
    <!-- 레이어 -->
    <script src="/js/egiskorea/com/lyr/layer.js"></script>
    <script src="/js/egiskorea/com/lyr/lyr.js"></script>
    <!-- 주제도 -->
    <script src="/js/egiskorea/com/tm/thematicMap.js"></script>

</head>
<body oncontextmenu="return false" class="<c:out value='${loginVO.id}'/>">
<form:form name="tmpForm" id="tmpForm" action="/" method="post">
    <input type="hidden" name="pageIndex" id="pageIndex" value="1">
</form:form>
<div id="wrap" style="background: black; min-width: 768px;" >

	<!-- container -->
    <div id="container">
        <!-- header -->
        <h1 class="logo"><a href="/webApp/main.do"></a></h1>
                <div class="util-box" style="right: 10px">
            <div class="user" style="width: 137px; border-radius: 0px 0px 10px 10px;"><c:out value="${loginVO.name}"/>님
                <button type="button" class="logout-btn" style="margin-right: 5px;" data-name="로그아웃"
                        onClick="location.href='/uat/uia/logoutAction.do'"></button>
            </div>
        </div>
        <!-- //header -->
        
        <!-- 지도영역 -->
        <div id="map2D" class="main-map"></div>
        <div id="map3D" style="width: 100%; height:100%; display:none; user-select:none"></div>

        <!-- map-aside -->
        <div id="map-aside">
            <div class="map-control">
                <ul>
                    <li>
                        <button type="button" class="ctrl-btn compass" data-name="나침반"><span
                                style="transform: rotate(0deg);"></span></button>
                    </li>
                    <li>
                        <button type="button" class="ctrl-btn reset" data-name="초기화"></button>
                        <button type="button" class="ctrl-btn globe" data-name="위치 초기화"></button>
                    </li>
                    <li>
                        <button type="button" class="ctrl-btn integrated-info" data-popup="rightPopup"
                                data-name="통합행정정보"></button>
                        <button type="button" class="ctrl-btn building" data-popup="rightPopup"
                                data-name="지적/건물"></button>
                    </li>
                    <li class="ctrl-group">
                        <button type="button" class="ctrl-btn location" data-name="위치"></button>
                        <button type="button" class="ctrl-btn distance" data-name="거리"></button>
                        <button type="button" class="ctrl-btn measure" data-name="면적"></button>
                        <button type="button" class="ctrl-btn radius" data-name="반경"></button>
                        <%--			            <button type="button" class="ctrl-btn setting" data-popup="rightPopup"  data-name="설정"></button>--%>
                    </li>
                    <li>
                        <button type="button" class="ctrl-btn scaleUp" data-name="확대"></button>
                        <button type="button" class="ctrl-btn scaleDown" data-name="축소"></button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- //map-aside -->

        <!-- side -->
        <div id="side">
            <div id="lnb">
                <ul>
                	<li data-menu="webApp-search" class="">
                        <button type="button" class="lnb-btn">검색</button>
                    </li>
                    <li data-menu="lnb-territory" class="">
                        <button type="button" class="lnb-btn">국토조사</button>
                    </li>
                </ul>
                <div class="map-type">
				    <span class="knobs">
				        <span><input type="radio" name="mapType" value="2D" id="mapType2D" checked=""><label
                                for="mapType2D">2D</label></span>
				        <span><input type="radio" name="mapType" value="3D" id="mapType3D"><label
                                for="mapType3D">3D</label></span>
				    </span>
                </div>
            </div>

            <!-- 검색 -->
            <div class="webApp-search lnb-cont">
                <%@ include file="/WEB-INF/jsp/egiskorea/com/cmm/search.jsp" %>
            </div>
            <!-- //검색 -->

            <!-- 국토조사 -->
            <div class="lnb-territory lnb-cont">
            </div>
            <!-- //국토조사 -->

        </div>
        <!-- //side -->

        <!-- 팝업 메뉴 전체 -->
        <!-- 팝업 메뉴 기본틀 -->
        <!-- left popup-panel -->
        <div id="leftPopup" class="popup-panel popup-left popup-draggable">
        </div>
        <!-- //left popup-panel -->

        <!-- left-sub popup-panel -->
        <div id="leftSubPopup" class="popup-panel popup-sub popup-draggable">
        </div>
        <!-- //left-sub popup-panel -->

        <!-- right popup-panel -->
        <div id="rightPopup" class="popup-panel popup-right popup-draggable">
        </div>
        <!-- //right popup-panel -->

        <!-- right-sub popup-panel -->
        <div id="rightSubPopup" class="popup-panel popup-sub popup-draggable">
        </div>
        <!-- //right-sub popup-panel -->

        <!-- bottom popup-panel -->
        <div id="bottomPopup" class="popup-panel popup-bottom" style="width: calc(100% - 391px);">
        </div>
        <!-- //bottom popup-panel -->

        <!-- bbs popup-panel -->
        <div id="bbsPopup" class="popup-panel popup-bbs">
        </div>
        <!-- //bbs popup-panel -->
        <!-- //팝업 메뉴 기본틀 -->

        <!-- 팝업 메뉴 예외 틀 -->
        <!-- 사용자정보 조회 및  수정 -->
        <div id="userInfoUdt" class="popup-panel popup-sub userInfoUdt">
        </div>
        <!-- 사용자정보 조회 및  수정 -->
        <!-- //팝업 메뉴 예외 틀 -->

        <!-- //팝업 메뉴 전체 -->

        <!-- 사용자 매뉴얼 -->
        <!-- //사용자 매뉴얼 -->


        <!-- 팝업 가림판 -->
        <div class="popup-overlay"></div>
        <!-- //팝업 가림판 -->

        <!-- 마우스 오른쪽 선택 팝업 -->
        <div id="contextMenu" class="context hide" style="top: 400px;left: 400px;">
            <a href="#" class="c01">통합행정정보</a>
            <a href="#" class="c02">지적/건물</a>
            <a href="#" class="c03">사진등록</a>
            <a href="#" class="c04">메모등록</a>
            <a href="#" class="c05">위치정보</a>
            <a href="#" class="c06">지도저장</a>
            <a href="#" class="c07">3D전환</a>
        </div>
        <!-- //마우스 오른쪽 선택 팝업 -->

        <!-- 업무 > 공간정보활용 > 공간정보 편집도구 -->
        <div class="popup-panel popup-sub space-edit-tool" style="top: 80px;left: 320px;width: 385px;height: 200px;">
        </div>
        <!-- //업무 > 공간정보활용 > 공간정보 편집도구 -->

    </div>
    <!-- //container -->
</div>

<div id="toastMsg"></div>

<!-- //wrap -->
<script type="text/javascript">

    // check cookie
    checkCookiePopup();

    dtmap.config.EMAP_KEY = `<spring:message code="Gis.baro2map.key"/>`;
    /**
     * 초기 지도 선택 가능
     * dtmap.init('2D');
     * dtmap.init('3D');
     */
    dtmap.init('2D');
    /**
     * 초기화 UI
     */
    ui.init();

    $(document).ready(function () {
        setMainUI();
        _setMainUIAction();
        _setMainUIEvent();
    })

    //set menu 2D or 3D
    function setMainUI() {
        //set topmenu - 지도설정
        var _html2dTop4 = `<li><button type="button" id="backgroundMapInfo" data-popup="rightPopup">배경지도</button></li>
						<li><button type="button" id="multiView" data-popup="rightPopup">화면분할</button></li>
						<li><button type="button" id="favorites" data-popup="rightPopup">즐겨찾기</button></li>`;
        var _html3dTop4 = `<li><button type="button" id="backgroundMapInfo" data-popup="rightPopup">배경지도</button></li>
						<li><button type="button" id="setting" data-popup="rightPopup">지도설정</button></li>
						<li><button type="button" id="favorites" data-popup="rightPopup">즐겨찾기</button></li>`;
        var mod = dtmap.mod;
        var html1 = mod === '2D' ? _html2dTop4 : _html3dTop4;
        $("#tmnMapSetting").html(html1);
        //컨텍스트메뉴 변경
        if(mod === '2D') {
            $("#contextMenu .c08").removeClass("c08").addClass("c07");
            $("#contextMenu .c07")[0].text = "3D전환";
        } else {
            $("#contextMenu .c07").removeClass("c07").addClass("c08");
            $("#contextMenu .c08")[0].text = "2D전환";
        }
    }

    function checkCookiePopup() {
        if (document.cookie.indexOf("popup=hide") < 0) {
            $(".basic-popup").show();
        } else {
            $(".basic-popup").hide();
        }
    }

    function _setMainUIAction() {
        $('.GNB').on('mouseenter', function () {
            $('.GNB li ul').stop().slideDown(300);
        }).on('mouseleave', function () {
            $('.GNB li ul').stop().slideUp(300);
        });
        // div draggable
        $('.basic-popup').draggable({
            containment: "#container",
            scroll: false,
            start: function () {
                $(this).css({transform: "none", top: $(this).offset().top + "px", left: $(this).offset().left + "px"});
            }
        });
    }

    function _setMainUIEvent() {
        $(".coordi-header > div").on("click", function () {
            $(".coordinates").toggleClass("active");
        });
        $(".legend-panel .legend-close").on("click", function () {
            $(".legend-panel").removeClass("opened");
        });
        $(".basic-popup .basic-close").on("click", function () {
            $(".basic-popup").hide();
        });
        $("#popup01").on("click", function () {
            closePop();
            $(this).parents(".basic-popup").hide();
        });
    }

    function closePop() {
        if (document.popupForm.expiredays.checked) {
            setCookie("popup", "hide", 1);
        }
    }

    function setCookie(cookieName, cookieValue, expireDate) {
        var today = new Date();
        today.setDate(today.getDate() + parseInt(expireDate));
        document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";";
    }

</script>

</body>
</html>