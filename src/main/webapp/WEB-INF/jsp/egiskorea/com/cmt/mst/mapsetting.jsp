<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<div class="lnb-setting lnb-cont">
    <div class="lnb-header"><h2 class="tit">설정</h2></div>
    <div class="lnb-body">
        <div class="scroll-y">
            <ul class="setting-list">
                <li class="vertical-polygon"><span class="cont-tit">수직폴리곤</span>
                    <button type="button" class="setting-toggle close" title="접기"></button>
                    <div class="box3">
                        <div class="tbl-list vertical-tbl">
                            <div class="items">
                                <div class="term">두께</div>
                                <div class="desc">
                                    <div class="slider-box">
                                        <div class="slider">
                                            <div class="slider-handle slider-width"></div>
                                        </div>
                                        <input type="text" class="value-num" readonly name="width">
                                    </div>
                                </div>
                            </div>
                            <div class="items">
                                <div class="term">높이</div>
                                <div class="desc">
                                    <div class="slider-box">
                                        <div class="slider">
                                            <div class="slider-handle slider-height"></div>
                                        </div>
                                        <input type="text" class="alt-value" value="20" readonly name="height">
                                    </div>
                                </div>
                            </div>
                            <div class="items">
                                <div class="term">색상</div>
                                <div class="desc"><input type="text" class="colorPicker"></div>

                            </div>
                        </div>
                    </div>
                </li>
                <li class="map-transparency"><span class="cont-tit">지형투명도</span>
                    <button type="button" class="setting-toggle close" title="접기"></button>
                    <div class="box3">
                        <div class="tbl-list vertical-tbl">
                            <div class="items">
                                <div class="term">투명도</div>
                                <div class="desc">
                                    <div class="slider-box">
                                        <div class="slider">
                                            <div class="slider-handle slider-transparency"></div>
                                        </div>
                                        <input type="text" class="value-num" readonly name="transparency">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="ex-text">*지하시설물 가시화시 지형투명도를 설정</p>
                    </div>
                </li>
                <li class="map-quality"><span class="cont-tit">영상품질</span>
                    <button type="button" class="setting-toggle close" title="접기"></button>
                    <div class="box3">
                        <div class="tbl-list vertical-tbl">
                            <div class="items">
                                <div class="term">레벨</div>
                                <div class="desc">
                                    <div class="slider-box">
                                        <div class="slider">
                                            <div class="slider-handle slider-quality"></div>
                                        </div>
                                        <input type="text" class="value-num" readonly name="quality">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="ex-text">*드론영상 가시화시 영상품질 설정</p>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    <div class="lnb-util">
        <button type="button" class="popup-close" title="닫기"></button>
    </div>
</div>
<script>
    $(document).ready(function () {

        const $container = $('.lnb-setting');
        const $poly = $container.find('.vertical-polygon');
        const $trans = $container.find('.map-transparency');
        const $quality = $container.find('.map-quality');

        $poly.find('input[name="width"]').val(map3d.config.vertclPynThick);
        $poly.find('input[name="height"]').val(map3d.config.vertclPynHeight);
        $trans.find('input[name="transparency"]').val(map3d.config.tpgrphTrnsprc);
        $quality.find('input[name="quality"]').val(map3d.config.vidoQlityLevel);

        // 수직폴리곤 > 두께
        $poly.find(".slider-width").slider({
            range: "min",
            min: 1,
            max: 10,
            value: map3d.config.vertclPynThick,
            step: 1,
            slide: function (event, ui) {
                $poly.find('input[name="width"]').val(ui.value);
                map3d.config.vertclPynThick = Number(ui.value);
            },
            change: function () {
                updateUserSetup();
                // reloadVerticalPlane();
            }
        });

        // 수직폴리곤 > 높이
        $poly.find(".slider-height").slider({
            range: "min",
            min: 1,
            max: 100,
            value: map3d.config.vertclPynHeight,
            step: 1,
            slide: function (event, ui) {
                $poly.find('input[name="height"]').val(ui.value);
                map3d.config.vertclPynHeight = Number(ui.value);
            },
            change: function () {
                updateUserSetup();
                // reloadVerticalPlane();
            }

        });

        // 지형투명도 > 투명도
        $trans.find(".slider-transparency").slider({
            range: "min",
            min: 0,
            max: 100,
            value: map3d.config.tpgrphTrnsprc,
            step: 1,
            slide: function (event, ui) {
                $trans.find('input[name="transparency"]').val(ui.value);
                map3d.config.setTransparency(Number(ui.value));
            },
            change: function () {
                updateUserSetup();
            }
        });

        // 영상품질 > 레벨
        $quality.find(".slider-quality").slider({
            range: "min",
            min: 0.1,
            max: 2,
            value: map3d.config.vidoQlityLevel,
            step: 0.1,
            slide: function (event, ui) {
                $quality.find('input[name="quality"]').val(ui.value);
                map3d.config.vidoQlityLevel = Number(ui.value);
            },
            change: function () {
                updateUserSetup();
                // reloadDroneLayer();
            }
        });

        // $container.find(".slider-box .value-num").val($(".slider-box .slider-handle").slider("value"));

        // colorpicker
        $container.find('.colorPicker').minicolors({
            control: 'hue',
            defaultValue: 'rgb(' + [map3d.config.vertclPynColorR, map3d.config.vertclPynColorG, map3d.config.vertclPynColorB].join(',') + ')',
            format: 'rgb',
            theme: 'default',
            opacity: false,
            swatches: [],
            hide: function () {
                const vertclPynColor = $container.find('.colorPicker').val().substring(4, $container.find('.colorPicker').val().length - 1).split(",");
                console.log('hide');
                map3d.config.vertclPynColorR = Number(vertclPynColor[0]);
                map3d.config.vertclPynColorG = Number(vertclPynColor[1]);
                map3d.config.vertclPynColorB = Number(vertclPynColor[2]);

                updateUserSetup();
                // reloadVerticalPlane();
            }
        });

        // 접기/펴기
        $container.find(".setting-list .setting-toggle").click(function () {
            const $this = $(this);
            $this.find(".open").removeClass("open").addClass("close");

            if ($this.hasClass("close")) {
                $this.removeClass("close").addClass("open").attr("title", "펼치기");
                $this.next(".box3").slideUp(200);

            } else if ($this.hasClass("open")) {
                $this.removeClass("open").addClass("close").attr("title", "접기");
                $this.next(".box3").slideDown(200);
            }
        });

        // 닫기
        $container.find(".lnb-setting .lnb-close").on("click", function () {
            $(".lnb-setting").stop().fadeOut(100);
            $(".side-util li[data-menu]").removeClass("on");
            $('#leftPopup.opened').removeClass('opened');
            $('.popup-sub.opened').removeClass('opened');
        });


        // 사용자 설정 업데이트
        function updateUserSetup() {
            $.ajax({
                type: "POST",
                url: "/geo/map/updateMapSettingInfo.do",
                dataType: "json",
                data: {
                    vertclPynThick: map3d.config.vertclPynThick,
                    vertclPynHeight: map3d.config.vertclPynHeight,
                    vertclPynColorR: map3d.config.vertclPynColorR,
                    vertclPynColorG: map3d.config.vertclPynColorG,
                    vertclPynColorB: map3d.config.vertclPynColorB,
                    tpgrphTrnsprc: map3d.config.tpgrphTrnsprc,
                    vidoQlityLevel: map3d.config.vidoQlityLevel
                },
                success: function (returnData, status) {
                    if (status === "success") {

                    } else {
                        toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                        return;
                    }
                }, complete: function () {
                }
            });
        }

        // 드론영상 레이어 리로드
        function reloadDroneLayer() {
            var layerList = new Module.JSLayerList(false);

            for (var i = 0; i < ypLiLod.length; i++) {
                for (var j = 0; j < ypLiLod[i].length; j++) {
                    var layer = layerList.nameAtLayer("lod_" + ypLiLod[i][j]);

                    if (layer != null) {
                        if (layer.getVisible()) {
                            layer.lod_object_detail_ratio = map3d.config.vidoQlityLevel;
                        }
                    }
                }
            }

            var layer = layerList.nameAtLayer("lod25");

            if (layer != null) {
                if (layer.getVisible()) {
                    layer.lod_object_detail_ratio = map3d.config.vidoQlityLevel;
                }
            }
        }

        // 수직폴리곤 리로드
        function reloadVerticalPlane() {
            var layer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");

            if (layer != null && mapType === "3D") {
                if (layer.getObjectCount() !== 0) {
                    var landRegister = getLandRegisterByPnu(OLOAD.m_centerKey)

                    OLOAD.m_center_Polygon.removeAllObject();

                    var colorPolygonLayer = new Module.JSLayerList(true).nameAtLayer("COLOR_POLYGON_LAYER");
                    var lineLayer = new Module.JSLayerList(true).nameAtLayer("LINE_LAYER");

                    if (colorPolygonLayer != null) {
                        colorPolygonLayer.removeAll();
                    }
                    if (lineLayer != null) {
                        lineLayer.removeAll();
                    }

                    if (landRegister != null) {
                        var coordinates = OLOAD.setPosition(landRegister.landRegister.geometry, "MULTIPOLYGON", 0);

                        createVerticalPlane(coordinates.coordinates);
                        OLOAD.loadCenterData(landRegister);
                    }
                }
            }
        }
    });
</script>
