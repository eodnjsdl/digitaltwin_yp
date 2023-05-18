<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<style>
    .liData {
        margin-left: 1rem;
    }

    #trrcSlider {
        /*width: 7.5rem;*/
        width: 185px;
    }
</style>
<script>
    $(document).ready(function () {
        //드론 LOD 레이어 정보
        const LOD_INFO = {
            '강상면': [
                {kr: "병산리", en: "byeongsanri", layer: "lod_byeongsanri", minLevel: 12, maxLevel: 12},
                {kr: "송학리", en: "songhakri", layer: "lod_songhakri", minLevel: 12, maxLevel: 12},
                {kr: "교평리", en: "gyopyeongri", layer: "lod_gyopyeongri", minLevel: 12, maxLevel: 12},
                {kr: "신화리", en: "shinhwari", layer: "lod_shinhwari", minLevel: 12, maxLevel: 12},
                {kr: "화양리", en: "hwayangri", layer: "lod_hwayangri", minLevel: 12, maxLevel: 12},
                {kr: "대석리", en: "daeseokri", layer: "lod_daeseokri", minLevel: 12, maxLevel: 12},
            ],
            '강하면': [
                {kr: "운심리", en: "unsimri", layer: "lod_unsimri", minLevel: 12, maxLevel: 12},
                {kr: "왕창리", en: "wangchangri", layer: "lod_wangchangri", minLevel: 12, maxLevel: 12},
                {kr: "전수리", en: "jeonsuli", layer: "lod_jeonsuli", minLevel: 12, maxLevel: 12},
            ],
            '개군면': [
                {kr: "구미리", en: "gumiri", layer: "lod_gumiri", minLevel: 12, maxLevel: 12},
                {kr: "공세리", en: "gongseli", layer: "lod_gongseli", minLevel: 12, maxLevel: 12},
                {kr: "자연리", en: "jayeonli", layer: "lod_jayeonli", minLevel: 12, maxLevel: 12},
                {kr: "향리", en: "hyangri", layer: "lod_hyangri", minLevel: 12, maxLevel: 12},
                {kr: "주읍리", en: "jueupri", layer: "lod_jueupri", minLevel: 12, maxLevel: 12},
                {kr: "상자포리", en: "sangjapori", layer: "lod_sangjapori", minLevel: 12, maxLevel: 12},
            ],
            '단월면': [
                {kr: "부안리", en: "buanri", layer: "buanri", minLevel: 12, maxLevel: 12}
            ],
            '서종면': [
                {kr: "서후리", en: "seohuri", layer: "lod_seohuri", minLevel: 12, maxLevel: 12},
                {kr: "정배리", en: "jeongbaeli", layer: "lod_jeongbaeli", minLevel: 12, maxLevel: 12},
            ],
            '양동면': [
                {kr: "쌍학리", en: "ssanghakri", layer: "lod_ssanghakri", minLevel: 12, maxLevel: 12},
                {kr: "석곡리", en: "seokgokri", layer: "lod_seokgokri", minLevel: 12, maxLevel: 12},
                {kr: "매월리", en: "maewolli", layer: "lod_maewolli", minLevel: 12, maxLevel: 12},
                {kr: "고송리", en: "gosongli", layer: "lod_gosongli", minLevel: 12, maxLevel: 12},
            ],
            '양서면': [
                {kr: "양수리", en: "yangsuri", layer: "lod_yangsuri", minLevel: 12, maxLevel: 12},
                {kr: "대심리", en: "daesimri", layer: "lod_daesimri", minLevel: 12, maxLevel: 12},
                {kr: "복포리", en: "bokpori", layer: "lod_bokpori", minLevel: 12, maxLevel: 12},
                {kr: "청계리", en: "cheonggyeri", layer: "lod_cheonggyeri", minLevel: 12, maxLevel: 12},

            ],
            '양평읍': [
                {kr: "양근리", en: "yanggeunri", layer: "lod25", minLevel: 12, maxLevel: 12},
                {kr: "공흥리", en: "gongheungri", layer: "lod_gongheungri", minLevel: 12, maxLevel: 12},
                {kr: "백안리", en: "baekanri", layer: "lod_baekanri", minLevel: 12, maxLevel: 12},
                {kr: "도곡리", en: "dogokri", layer: "lod_dogokri", minLevel: 12, maxLevel: 12},
                {kr: "대흥리", en: "daeheungri", layer: "lod_daeheungri", minLevel: 12, maxLevel: 12},
                {kr: "봉성리", en: "bongseongri", layer: "lod_bongseongri", minLevel: 12, maxLevel: 12},
                {kr: "원덕리", en: "wondeokri", layer: "lod_wondeokri", minLevel: 12, maxLevel: 12},
                {kr: "회현리", en: "hoehyeonli", layer: "lod_hoehyeonli", minLevel: 12, maxLevel: 12},
                {kr: "창대리", en: "changdaeri", layer: "lod_changdaeri", minLevel: 12, maxLevel: 12},
            ],
            '옥천면': [
                {kr: "옥천리", en: "okcheonri", layer: "lod_okcheonri", minLevel: 12, maxLevel: 12},
                {kr: "용천리", en: "yongcheonri", layer: "lod_yongcheonri", minLevel: 12, maxLevel: 12},
                {kr: "신복리", en: "sinbogli", layer: "lod_sinbogli", minLevel: 12, maxLevel: 12},
                {kr: "아신리", en: "asinli", layer: "lod_asinli", minLevel: 12, maxLevel: 12},


            ],
            '용문면': [

                {kr: "마룡리", en: "maryongri", layer: "lod_maryongri", minLevel: 12, maxLevel: 12},
                {kr: "화전리", en: "hwajeonri", layer: "lod_hwajeonri", minLevel: 12, maxLevel: 12},
                {kr: "삼성리", en: "samseongri", layer: "lod_samseongri", minLevel: 12, maxLevel: 12},
                {kr: "다문리", en: "damunri", layer: "lod_damunri", minLevel: 12, maxLevel: 12},
                {kr: "연수리", en: "yeonsuri", layer: "lod_yeonsuri", minLevel: 12, maxLevel: 12},
                {kr: "금곡리", en: "geumgokri", layer: "lod_geumgokri", minLevel: 12, maxLevel: 12},
                {kr: "광탄리", en: "gwangtanri", layer: "lod_gwangtanri", minLevel: 12, maxLevel: 12},
                {kr: "망능리", en: "mangneungri", layer: "lod_mangneungri", minLevel: 12, maxLevel: 12},
                {kr: "중원리", en: "jungwonri", layer: "lod_jungwonri", minLevel: 12, maxLevel: 12},
                {kr: "조현리", en: "chohyunri", layer: "lod_chohyunri", minLevel: 12, maxLevel: 12},
                {kr: "덕촌리", en: "deokchonri", layer: "lod_deokchonri", minLevel: 12, maxLevel: 12},
                {kr: "오촌리", en: "ohchonri", layer: "lod_ohchonri", minLevel: 12, maxLevel: 12},
                {kr: "신점리", en: "sinjeomri", layer: "lod_sinjeomri", minLevel: 12, maxLevel: 12},
            ],
            '지평면': [
                {kr: "송현리", en: "songhyeonri", layer: "lod_songhyeonri", minLevel: 12, maxLevel: 12},
                {kr: "월산리", en: "wolsanri", layer: "lod_wolsanri", minLevel: 12, maxLevel: 12},
                {kr: "망미리", en: "mangmili", layer: "lod_mangmili", minLevel: 12, maxLevel: 12},
                {kr: "무왕리", en: "muwangri", layer: "lod_muwangri", minLevel: 12, maxLevel: 12},
                {kr: "일신리", en: "ilsinli", layer: "lod_ilsinli", minLevel: 12, maxLevel: 12},
                {kr: "수곡리", en: "sugokri", layer: "lod_sugokri", minLevel: 12, maxLevel: 12},
            ],
            '청운면': [
                {kr: "용두리", en: "yongduri", layer: "lod_yongduri", minLevel: 12, maxLevel: 12},
                {kr: "여물리", en: "yeomulri", layer: "lod_yeomulri", minLevel: 12, maxLevel: 12},
                {kr: "비룡리", en: "biryongri", layer: "lod_biryongri", minLevel: 12, maxLevel: 12},
                {kr: "가현리", en: "gahyunri", layer: "lod_gahyunri", minLevel: 12, maxLevel: 12},
                {kr: "갈운리", en: "galunli", layer: "lod_galunli", minLevel: 12, maxLevel: 12},
                {kr: "도원리", en: "dowonri", layer: "lod_dowonri", minLevel: 12, maxLevel: 12},
                {kr: "다대리", en: "dadaeri", layer: "lod_dadaeri", minLevel: 12, maxLevel: 12},
            ],
        }

        // 지형투명도 > 투명도
        const tpgrphTrnsprc = $('#tpgrphTrnsprc').val();
        $(".top.slider-box .top.trrc-value").val(tpgrphTrnsprc);


        $(".top.slider-box .top.trrc-slider").slider({
            range: "min",
            min: 0,
            max: 100,
            value: tpgrphTrnsprc,
            step: 1,
            slide: function (event, ui) {
                if (dtmap.mod === '2D') {
                    event.preventDefault();
                } else {
                    $(".top.slider-box .top.trrc-value").val(ui.value);
                    $(".slider-box .trrc-value").val(ui.value);
                    $('#mapsettingTrrcSlider > div > div').attr('style', 'width: ' + ui.value + '%');
                    $('#mapsettingTrrcSlider > div > span').attr('style', 'left: ' + ui.value + '%');
                    map3d.config.tpgrphTrnsprc = Number(ui.value);
                    setPlanetTransparency(map3d.config.tpgrphTrnsprc);
                }
            },
            change: function () {
                if (dtmap.mod === '2D') {
                    toastr.warning("3D지도에서만 사용 가능합니다.");
                    event.preventDefault();
                } else {
                    updateUserSetup();
                }
            }
        });

        // 레이어 메뉴 토글 event
        $(".layer-list .layer-toggle").click(function () {
            $(this).find(".open").removeClass("open").addClass("close");

            if ($(this).hasClass("close")) {
                $(this).removeClass("close").addClass("open").attr("title", "펼치기");
                $(this).next(".layer-list-dep2").slideUp(200);
                $(this).parent(".riDiv").next(".riCheckBox").slideUp(200);

            } else if ($(this).hasClass("open")) {
                $(this).removeClass("open").addClass("close").attr("title", "접기");
                $(this).next(".layer-list-dep2").slideDown(200);
                $(this).parent(".riDiv").next(".riCheckBox").slideDown(200);
            }
        });

        // 팝업창 닫기 event
        $(".lnb-layer .lnb-close").click(function () {
            $(".lnb-layer").stop().fadeOut(100);
            $("#lnb li[data-menu]").removeClass("on");
            $('#leftPopup.opened').removeClass('opened');
        });

        // 초기화 button event
        $("#side .lnb-layer .lnb-resetBtn").click(function () {
            dtmap.layer.clear();
            $('.lnb-layer [name="searchKeyword"]').val(null);
            aj_selectLayerList('top', true);
        });

        $('.layer-list').on('change', ':checkbox', function (e) {
            const visible = this.checked;
            const $this = $(this);
            const $ul = $this.closest('ul');

            if ($ul.hasClass('layer-list')) {
                //상위버튼
                const $li = $this.closest('li');
                $li.find('ul input[type="checkbox"]').each(function (i, v) {
                    $(v).prop('checked', visible).change();
                });

            } else {
                //하위버튼
                const id = $this.attr('id');
                let layerNm = $this.attr('name');
                const title = $this.closest('span').find('label').data('title');
                const desc = $this.data('desc');
                const shpType = $this.data('shptype');

                if (desc) {
                    layerNm = desc;
                }

                let type = dtmap.mod === '3D' ? LAYER_TYPE[id.split('_')[1]] : 'WMS';
                // let layerId = id.split('_')[2];
                let only3d = id.split('_')[3];

                if (only3d && dtmap.mod !== '3D') {
                    console.warn("3D지도에서만 사용 가능합니다.");
                    toastr.warning("3D지도에서만 사용 가능합니다.");
                }

                if (type === 'TDS') {
                    showFacility(id, visible);
                } else {
                    dtmap.showLayer({
                        id: id,
                        type: type,
                        layerNm: layerNm,
                        title: title,
                        visible: visible,
                        shpType: shpType,
                        // sld : 'http://124.49.110.155:8080/lyr/lyi/sld?lyrId='+layerId
                        // sldBody: findLayer.styleInfo

                    });
                }
                console.log('[레이어]', layerNm, visible ? 'on' : 'off');
                checkSiblings($this);
            }
        })

        //초기화
        // $(".popup-right.opened .lnb-resetBtn").click(function () {
        // 레이어 전체 비활성화
        // if (app2D) {
        //     var layers = store.layerIds;
        //     var yMap = app2D.getYMap();
        //
        //     for (var i = 0; i < layers.length; i++) {
        //         if (layers[i] != "tgd_scco_sig") {
        //             yMap.removeWMSLayer(layers[i]);
        //             store.removeLayerId(layers[i]);
        //
        //             i--;
        //         }
        //     }
        // } else {
        //     dronChkCount = 0;
        //     modelObjChk = false;
        //     landmarkObjChk = false;
        //     var userlayerFalse = new Module.JSLayerList(false);
        //     var falseCount = userlayerFalse.count();
        //     for (var i = 0; i < falseCount; i++) {
        //         if (userlayerFalse.indexAtLayer(i).getName() != "layer_S_140") { // 법정구역시군구 제외
        //             if (userlayerFalse.indexAtLayer(i).getVisible()) {
        //                 userlayerFalse.indexAtLayer(i).setVisible(false);
        //             }
        //         }
        //     }
        //     var userlayerTrue = new Module.JSLayerList(true);
        //     var trueCount = userlayerTrue.count();
        //     for (var i = 0; i < trueCount; i++) {
        //         if (userlayerTrue.indexAtLayer(i).getVisible()) {
        //             userlayerTrue.indexAtLayer(i).setVisible(false);
        //         }
        //     }
        // }
        // $('#rightPopup [name="searchKeyword"]').val(null);
        // aj_selectLayerList('top', true);
        // });

        //팝업창 오픈 시  레이어 가시화여부 체크
        // layerChecked();

        //3차원 영상 면 > 리 정보 조회
        myeonList();

        function checkSiblings($target) {
            const node = $target.closest('ul').find('li :checkbox');
            let checked = true;
            node.each((i, v) => {
                checked &&= v.checked;
            })
            if (checked) {
                //전체 체크
                const $li = $target.closest('ul').closest('li')
                $li.find(':checkbox:eq(0)').prop('checked', 'checked')
            }
        }

        function myeonList() {

            $('#ctgr_025 > ul.layer-list-dep2 > li').each(function (i, v) {
                const $this = $(v);
                const id = $this.find('input')[0].id;
                const key = v.title.trim();
                const liList = LOD_INFO[key];
                const ulTag = '<ul class="riCheckBox" title="' + key + '"' + (i !== 0 ? 'style="display:none;"' : '') + '></ul>'
                const $ul = $(ulTag)
                $(v).append($ul);
                if (liList) {
                    for (let j = 0; j < liList.length; j++) {
                        const li = liList[j];
                        const liId = id + '_' + j;
                        let liTag = "";
                        liTag += '<li  style="display: inline-block; padding: 2px;" title="' + key + ' ' + li.kr + '" class="liData">';
                        liTag += '<span class="form-checkbox" style="width: unset;">';
                        liTag += '<input type="checkbox" id="' + liId + '" name="' + li.layer + '" class="only3d" title="' + li.kr + '" data-desc="' + li.layer + '">';
                        liTag += '<label for="' + liId + '" data-title="' + li.kr + '">' + li.kr + '</label></span></li>';
                        $ul.append(liTag)
                    }
                }
            });
        }


        // const serverUrl = dtmap.urls.BASE;
        const serverUrl = 'http://203.228.54.47';

        const symbolMap = {};

        // 3D 레이어 on/off
        function showFacility(id, visible) {
            let layerList = new Module.JSLayerList(false);
            const layerTitle = $("label[for='" + id + "']").html();
            const layerCtgr = $("#" + id).parents("ul").siblings(".form-checkbox").find("label").html();
            const chkCnt = $("#" + id).closest(".layer-list-dep2").find("input[type='checkbox']:checked").length;


            if (layerCtgr === "양평지하시설물") {
                layerList = new Module.JSLayerList(true);

                if (layerTitle === "상수관로") {
                    if (visible === true) {
                        loadUnderFac("WTL_MANH_PSZ");
                    } else {
                        layerList.delLayerAtName("WTL_PIPE_LMZ");
                        layerList.delLayerAtName("WTL_VALV_PSZ");
                        layerList.delLayerAtName("WTL_MANH_PSZ");
                    }
                } else if (layerTitle === "하수관로") {
                    if (visible === true) {
                        loadUnderFac("SWL_MANH_PSZ");
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/SWL_MANH_PSZ.geojson", "SWL_MANH_PSZ");
                    } else {
                        layerList.delLayerAtName("SWL_PIPE_LMZ");
                        layerList.delLayerAtName("SWL_MANH_PSZ");
                    }
                } else if (layerTitle === "천연가스관로") {
                    if (visible === true) {
                        loadUnderFac("VALV_PSZ");
                    } else {
                        layerList.delLayerAtName("UFL_GPIP_LMZ");
                        layerList.delLayerAtName("UFL_GVAL_PSZ");
                    }
                } else if (layerTitle === "통신관로") {
                    if (visible === true) {
                        loadUnderFac("UFL_KMAN_PSZ");
                    } else {
                        layerList.delLayerAtName("UFL_KPIP_LSZ");
                        layerList.delLayerAtName("UFL_KMAN_PSZ");
                    }
                } else if (layerTitle === "전력지중관로") {
                    if (visible === true) {
                        loadUnderFac("UFL_BMAN_PSZ");
                    } else {
                        layerList.delLayerAtName("UFL_BPIP_LMZ");
                        layerList.delLayerAtName("UFL_BMAN_PSZ");
                    }
                } else if (layerTitle === "농업용공공관정") {
                    if (visible === true) {
                        loadUnderFac("FAR_PMAN_LMZ");
                    } else {
                        layerList.delLayerAtName("FAR_PMAN_LMZ");
                        layerList.delLayerAtName("FAR_PMAN_LMZ_poi");
                    }
                } else if (layerTitle === "지하수개발") {
                    if (visible === true) {
                        loadUnderFac("GRW_DMAN_LMZ");
                    } else {
                        layerList.delLayerAtName("GRW_DMAN_LMZ");
                        layerList.delLayerAtName("GRW_DMAN_LMZ_poi");
                    }
                } else if (layerTitle === "지하수이용시설") {
                    if (visible === true) {
                        loadUnderFac("GRU_FMAN_LMZ");
                    } else {
                        layerList.delLayerAtName("GRU_FMAN_LMZ");
                        layerList.delLayerAtName("GRU_FMAN_LMZ_poi");
                    }
                }

                if (visible && chkCnt === 1) {
                    //alert("지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.");
                    // const msgTxt = "지하시설물은 지형투명도를 낮게 설정해야 식별이 용이합니다.";
                    // showMsg(msgTxt);
                }
            } else {
                if (layerTitle === "가로등") {
                    if (visible === true) {
                        loadLamp();
                    } else {
                        layerList.delLayerAtName("SL251");
                    }
                }
            }

            Module.XDRenderData();
        }

        /************************************************************** 파이프 *****************************************************************/
        // 파이프 로드
        function loadPipe(_path, _file, _color) {
            Module.ReadPipeSHP(
                _path, // 파일 url
                _file, // 파일 이름
                3, // 파이프 둥글기. 3으로 고정
                100000.0, // 파이프 흐름 표시 화살표
                0.0, // 고도
                _color, _color, // 파이프 시작 색상, 끝색상
                0.5, // 파이프 반경
                20 // 파이프 데이터 좌표계. 20으로 고정
            );

            const layerList = new Module.JSLayerList(true);
            let layer = null;

            layer = layerList.nameAtLayer(_file);
        }

        /************************************************************** 시설물 *****************************************************************/
        // 양평 지하시설물 로드
        function loadUnderFac(fac) {
            console.log(fac);
            //console.log(fac + " 로드");
            const path = serverUrl + "/siteData/yangpyeong/yp_fac";
            const color = new Module.JSColor(0, 0, 0, 0);
            const ghostSymbolMap = Module.getGhostSymbolMap();
            const symbolId = "";

            switch (fac) {
                // 상수관로
                case "WTL_MANH_PSZ" :
                    loadPipe(path, "WTL_PIPE_LMZ", new Module.JSColor(255, 0, 0, 255));
                    if (!symbolMap['WTL_MANH_PSZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "WTL_MANH_PSZ",
                            basePath: path,
                            file: "WTL_MANH_PSZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_MANH_PSZ.geojson", "WTL_MANH_PSZ");
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_VALV_PSZ.geojson", "WTL_VALV_PSZ");
                    }
                    break;
                // 하수관로
                case "SWL_MANH_PSZ" :
                    loadPipe(path, "SWL_PIPE_LMZ", new Module.JSColor(255, 170, 102, 179));
                    if (!symbolMap['SWL_MANH_PSZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "SWL_MANH_PSZ",
                            basePath: path,
                            file: "SWL_MANH_PSZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/SWL_MANH_PSZ.geojson", "SWL_MANH_PSZ");
                    }
                    break;
                // 천연가스관로
                case "VALV_PSZ" :
                    loadPipe(path, "UFL_GPIP_LMZ", new Module.JSColor(255, 217, 201, 0));
                    if (!symbolMap['VALV_PSZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "VALV_PSZ",
                            basePath: path,
                            file: "VALV_PSZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_GVAL_PSZ.geojson", "UFL_GVAL_PSZ");
                    }
                    break;
                // 통신관로
                case "UFL_KMAN_PSZ" :
                    loadPipe(path, "UFL_KPIP_LSZ", new Module.JSColor(255, 238, 73, 73));
                    if (!symbolMap['UFL_KMAN_PSZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "UFL_KMAN_PSZ",
                            basePath: path,
                            file: "UFL_KMAN_PSZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_KMAN_PSZ.geojson", "UFL_KMAN_PSZ");
                    }
                    break;
                // 전력지중관로
                case "UFL_BMAN_PSZ" :
                    loadPipe(path, "UFL_BPIP_LMZ", new Module.JSColor(255, 217, 201, 0));
                    if (!symbolMap['UFL_BMAN_PSZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "UFL_BMAN_PSZ",
                            basePath: path,
                            file: "UFL_BMAN_PSZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_BMAN_PSZ.geojson", "UFL_BMAN_PSZ");
                    }
                    break;
                // 농업용공공관정
                case "FAR_PMAN_LMZ" :
                    if (!symbolMap['FAR_PMAN_LMZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "FAR_PMAN_LMZ",
                            basePath: path,
                            file: "FAR_PMAN_LMZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/FAR_PMAN_LMZ.geojson", "FAR_PMAN_LMZ");

                        var layerList = new Module.JSLayerList(true);
                        var layerpoi = layerList.createLayer("FAR_PMAN_LMZ_poi", Module.ELT_3DPOINT);
                        setTimeout(function () {
                            layerpoi.setVisible(true);
                        }, 100);
                    }
                    break;
                // 지하수개발
                case "GRW_DMAN_LMZ" :
                    if (!symbolMap['GRW_DMAN_LMZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "GRW_DMAN_LMZ",
                            basePath: path,
                            file: "GRW_DMAN_LMZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRW_DMAN_LMZ.geojson", "GRW_DMAN_LMZ");

                        var layerList = new Module.JSLayerList(true);
                        var layerpoi = layerList.createLayer("GRW_DMAN_LMZ_poi", Module.ELT_3DPOINT);
                        setTimeout(function () {
                            layerpoi.setVisible(true);
                        }, 100);
                    }
                    break;
                // 지하수이용시설
                case "GRU_FMAN_LMZ" :
                    if (!symbolMap['GRU_FMAN_LMZ']) {
                        ghostSymbolMap.addGhostSymbolBy3DSbyJson({
                            id: "GRU_FMAN_LMZ",
                            basePath: path,
                            file: "GRU_FMAN_LMZ"
                        });
                    } else {
                        loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRU_FMAN_LMZ.geojson", "GRU_FMAN_LMZ");

                        var layerList = new Module.JSLayerList(true);
                        var layerpoi = layerList.createLayer("GRU_FMAN_LMZ_poi", Module.ELT_3DPOINT);
                        setTimeout(function () {
                            layerpoi.setVisible(true);
                        }, 100);
                    }
                    break;
            }
        }

        // 시설 로드
        function loadFacility(_url, layerName) {
            // 포인트 데이터 로드
            $.getJSON(_url, function (_data) {

                // 고스트 심볼 레이어 생성
                var layerList = new Module.JSLayerList(true);
                const layer = layerList.createLayer(layerName, Module.ELT_GHOST_3DSYMBOL);

                layer.setMaxDistance(map3d.config.maxDistance);
                layer.setVisible(true);

                let modelKey = null;
                if (this.url.indexOf("MAN") !== -1) {
                    modelKey = layer.getName();
                } else if (this.url.indexOf("VAL") !== -1) {
                    modelKey = "VALV_PSZ";
                } else {
                    return;
                }

                const modelSize = Module.getGhostSymbolMap().getGhostSymbolSize(modelKey);

                const features = _data.features;
                for (let i = 0; i < features.length; i++) {
                    const feature = features[i];
                    const position_tm = feature.geometry.coordinates;

                    //console.log(feature);
                    //console.log(position_tm);

                    // 좌표 변환
                    const position_2d = Module.getProjection().convertProjection(
                        20,
                        new Module.JSVector2D(position_tm[0], position_tm[1]),
                        13
                    );

                    const object = Module.createGhostSymbol("object_" + layer.getObjectCount());
                    object.setGhostSymbol(modelKey);

                    if (modelKey === "VALV_PSZ") {
                        object.setBasePoint(0, -modelSize.height * 0.5, 0);
                        object.setPosition(new Module.JSVector3D(position_2d.x, position_2d.y, position_tm[2]));
                    } else if (modelKey === "FAR_PMAN_LMZ" || modelKey === "GRW_DMAN_LMZ" || modelKey === "GRU_FMAN_LMZ") {
                        Alpha = 0;
                        Red = 0;
                        Green = 0;
                        Blue = 0;
                        if (modelKey === "FAR_PMAN_LMZ") {
                            Alpha = 1;
                            Red = 34;
                            Green = 177;
                            Blue = 76;
                        }
                        // 농업
                        if (modelKey === "GRW_DMAN_LMZ") {
                            Alpha = 1;
                            Red = 63;
                            Green = 72;
                            Blue = 204;
                        }
                        // 지하개발
                        if (modelKey === "GRU_FMAN_LMZ") {
                            Alpha = 1;
                            Red = 255;
                            Green = 242;
                            Blue = 0;
                        }
                        // 지하이용
                        let dia = 1.0;
                        let dep = 1.0;
                        dia = feature.properties["구경"] * 1 / 100;
                        dep = feature.properties["심도"] * 1 + 2;

                        object.setScale(new Module.JSSize3D(dia, dep, dia));
                        object.setPosition(new Module.JSVector3D(position_tm[0], position_tm[1], position_tm[2] - dep / 2 + 2));


                        var layerList = new Module.JSLayerList(true);
                        const layerpoi = layerList.nameAtLayer(modelKey + "_poi");
                        layerpoi.setMaxDistance(map3d.config.maxDistance);
                        const size = 10;
                        const canvas = document.createElement('canvas');
                        canvas.width = 10;
                        canvas.height = 10;
                        const ctx = canvas.getContext('2d');
                        ctx.beginPath();
                        ctx.arc(3, 3, 3, 0, 2 * Math.PI);
                        ctx.fillStyle = "rgba(" + Red + ", " + Green + ", " + Blue + ", " + Alpha + ")";
                        ctx.fill();


                        // 이미지 POI 생성
                        const poi_with_image = Module.createPoint("POI_WITH_IMAGE" + layerpoi.getObjectCount());
                        poi_with_image.setPosition(new Module.JSVector3D(position_tm[0], position_tm[1], position_tm[2]));
                        poi_with_image.setImage(ctx.getImageData(0, 0, size, size).data, size, size);

                        layerpoi.addObject(poi_with_image, 0);
                        layerpoi.setVisible(false);
                    } else {
                        object.setBasePoint(0, modelSize.height * 0.10, 0);
                        object.setScale(new Module.JSSize3D(1.0, 2.0, 1.0));
                        object.setPosition(new Module.JSVector3D(position_2d.x, position_2d.y, position_tm[2]));
                    }

                    layer.addObject(object, 0);
                }
            });
        }


        // 가로등
        function loadLamp() {
            const path = serverUrl + "/siteData/yangpyeong/lamp/3ds";
            const color = new Module.JSColor(0, 0, 0, 0);
            const ghostSymbolMap = Module.getGhostSymbolMap();
            const symbolId = "";

            if (!symbolMap['SL251']) {
                ghostSymbolMap.addGhostSymbolBy3DS("SL251", path, "SL251");
            } else {
                setTimeout(function () {
                    Module.XDEMapCreateLayer("SL251", serverUrl + "/siteData/yangpyeong/lamp/lampLayer", 0, true, false, true, 22, 0, 15);

                    const layerList = new Module.JSLayerList(false);
                    const layer = layerList.nameAtLayer("SL251");
                    layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
                        const data = decodeURI(_data);
                        insertTileGhostSymbol(_tile, data, "SL251", "#FFD950", true);
                    })

                    layer.setVisible(true);
                }, 100);
            }

        }

        function insertTileGhostSymbol(_tile, _csvData, symbolName, groupColor, visibleType) {
            // console.log("tile : ", _tile);
            // console.log("_csvData : ", _csvData);
            // console.log("symbolName : ", symbolName);
            // console.log("groupColor : ", groupColor);
            // console.log("visibleType : ", visibleType);

            let id, lon, lat, level, name;
            let strArray = _csvData.split(",");

            for (let item of strArray) {
                let itemArray = item.split(":");
                if (itemArray[0] === "id") id = itemArray[1];
                else if (itemArray[0] === "lon") lon = parseFloat(itemArray[1]);
                else if (itemArray[0] === "lat") lat = parseFloat(itemArray[1]);
                else if (itemArray[0] === "level") level = parseInt(itemArray[1]);
                else if (itemArray[0] === "name") name = itemArray[1];
            }

            const altitude = symbolName !== "SL251" ? Module.getMap().getTerrHeightFast(lon, lat) : Module.getMap().getTerrHeightFast(lon, lat) + 5;
            const scale = symbolName !== "SL251" ? new Module.JSSize3D(1.0, 1.0, 1.0) : new Module.JSSize3D(3.0, 3.0, 3.0);

            const point = Module.createPoint(visibleType.toString());
            point.setPosition(new Module.JSVector3D(lon, lat, altitude));

            // 고스트 심볼 오브젝트 생성
            const ghostSymbol = Module.createGhostSymbol(id.toString().trim());
            ghostSymbol.setGhostSymbol(symbolName);
            ghostSymbol.setPosition(new Module.JSVector3D(lon, lat, altitude));
            ghostSymbol.setScale(scale);

            point.setText(name);
            point.setVisibleRange(true, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

            _tile.addObject(ghostSymbol);
            _tile.addObject(point);

        }

        // 고스트 심볼 생성
        map3d.canvas.removeEventListener("Fire_GhostSymbolRegistComplete", onGhostSymbolRegistComplete);
        map3d.canvas.addEventListener("Fire_GhostSymbolRegistComplete", onGhostSymbolRegistComplete);

        function onGhostSymbolRegistComplete(e) {
            symbolMap[e.strGhostSymbolKey] = true;
            if (e.strGhostSymbolKey === "VALV_PSZ") {  // 천연가스관로
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "VALV_PSZ.jpg");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_GVAL_PSZ.geojson", "UFL_GVAL_PSZ");

            } else if (e.strGhostSymbolKey === "WTL_MANH_PSZ") { // 상수관로
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "WTL_MANH_PSZ.png");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_MANH_PSZ.geojson", "WTL_MANH_PSZ");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/WTL_VALV_PSZ.geojson", "WTL_VALV_PSZ");

            } else if (e.strGhostSymbolKey === "SWL_MANH_PSZ") { // 하수관로
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "SWL_MANH_PSZ.png");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/SWL_MANH_PSZ.geojson", "SWL_MANH_PSZ");

            } else if (e.strGhostSymbolKey === "UFL_BMAN_PSZ") { // 전력지중관로
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "UFL_BMAN_PSZ.jpg");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_BMAN_PSZ.geojson", "UFL_BMAN_PSZ");

            } else if (e.strGhostSymbolKey === "UFL_KMAN_PSZ") { // 통신관로
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "UFL_KMAN_PSZ.jpg");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/UFL_KMAN_PSZ.geojson", "UFL_KMAN_PSZ");

            } else if (e.strGhostSymbolKey === "FAR_PMAN_LMZ") { // 농업용공공관정
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "FAR_PMAN_LMZ.png");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/FAR_PMAN_LMZ.geojson", "FAR_PMAN_LMZ");
                var layerList = new Module.JSLayerList(true);
                var layerpoi = layerList.createLayer("FAR_PMAN_LMZ_poi", Module.ELT_3DPOINT);
                setTimeout(function () {
                    layerpoi.setVisible(true);
                }, 100);

            } else if (e.strGhostSymbolKey === "GRW_DMAN_LMZ") { // 지하수개발
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "GRW_DMAN_LMZ.png");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRW_DMAN_LMZ.geojson", "GRW_DMAN_LMZ");
                var layerList = new Module.JSLayerList(true);
                var layerpoi = layerList.createLayer("GRW_DMAN_LMZ_poi", Module.ELT_3DPOINT);
                setTimeout(function () {
                    layerpoi.setVisible(true);
                }, 100);

            } else if (e.strGhostSymbolKey === "GRU_FMAN_LMZ") { // 지하수이용시설
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/yp_fac/", "GRU_FMAN_LMZ.png");
                loadFacility(serverUrl + "/siteData/yangpyeong/yp_fac/GRU_FMAN_LMZ.geojson", "GRU_FMAN_LMZ");
                var layerList = new Module.JSLayerList(true);
                var layerpoi = layerList.createLayer("GRU_FMAN_LMZ_poi", Module.ELT_3DPOINT);
                setTimeout(function () {
                    layerpoi.setVisible(true);
                }, 100);

            } else if (e.strGhostSymbolKey === "SL251") { // 가로등
                Module.getGhostSymbolMap().setGhostSymbolTexture(e.strGhostSymbolKey, serverUrl + "/siteData/yangpyeong/lamp/3ds/", "SL251.JPG");
                setTimeout(function () {
                    Module.XDEMapCreateLayer("SL251", serverUrl + "/siteData/yangpyeong/lamp/lampLayer", 0, true, false, true, 22, 0, 15);
                    const layerList = new Module.JSLayerList(false);
                    const layer = layerList.nameAtLayer("SL251");
                    layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
                        const data = decodeURI(_data);
                        insertTileGhostSymbol(_tile, data, "SL251", "#FFD950", true);
                    })

                    layer.setVisible(true);
                }, 100);

            }

            Module.XDRenderData();
        }
    });

</script>

<%--<div class="popup-header">3D 레이어</div>--%>
<%--<div class="popup-body">--%>

<div class="lnb-header"><h2 class="tit">3D 레이어</h2></div>
<div class="lnb-body">

    <div class="srch-box marB5">
        <form action="">
            <div class="form-row">
                <div class="col"><input type="text" name="searchKeyword" class="form-control" placeholder="레이어명 검색"
                                        onkeypress="javascript:if(event.keyCode===13) aj_selectLayerList('top');"></div>
                <div class="col-auto">
                    <button type="button" class="btn type01 search" onclick="aj_selectLayerList('top');">검색</button>
                </div>
            </div>
        </form>
    </div>

    <!-- 지형 투명도 -->
    <input id="tpgrphTrnsprc" type="hidden" value="${result.tpgrphTrnsprc}">
    <div class="tbl-list vertical-tbl" style="margin-bottom:1rem">
        <div class="items">
            <div id="tpgrphTrnsprcTerm" class="term">투명도</div>
            <div class="desc">
                <div class="top slider-box">
                    <div class="top slider">
                        <div id="trrcSlider" class="top slider-handle trrc-slider"></div>
                    </div>
                    <input type="text" class="top trrc-value" value="100" readonly>
                </div>
            </div>
        </div>
    </div>

    <%--    <div class="tool-popup-body tool-layer-body">--%>
    <%--        <div class="srch-box">--%>
    <%--            <form action="">--%>
    <%--                <div class="form-row">--%>
    <%--                    <div class="col"><input type="text" name="searchKeyword" class="form-control" placeholder="레이어명 검색"--%>
    <%--                                            onkeypress="javascript:if(event.keyCode==13) aj_selectLayerList('top');">--%>
    <%--                    </div>--%>
    <%--                    <div class="col-auto">--%>
    <%--                        <button type="button" class="btn type01 search" onclick="aj_selectLayerList('top');">검색</button>--%>
    <%--                    </div>--%>
    <%--                </div>--%>
    <%--            </form>--%>
    <%--        </div>--%>

    <div class="tabBoxDepth1">
        <ul>
            <li data-tab="layerTab2D" style="width: 50%;">
                <button id="layerTab2D" type="button" class="inner-tab leftPopup layerTab" style="width: 100%;"
                        data-tab="layerTab2D">2D 레이어
                </button>
            </li>
            <li data-tab="layerTab3D" class="on" style="width: 50%;">
                <button id="layerTab3D" type="button" class="inner-tab leftPopup layerTab" style="width: 100%;"
                        data-tab="layerTab3D">3D 레이어
                </button>
            </li>
        </ul>
    </div>

    <div class="scroll-y">
        <ul class="layer-list">
            <c:forEach var="result" items="${resultList}" varStatus="status">
            <c:if test="${result.lyrCl ne ctgr}">
            <c:if test="${!status.first}">
        </ul>
        </li>
        </c:if>

        <li id="ctgr_<c:out value="${result.lyrCl}"/>">

            <c:if test="${result.lyrCl ne '025' && result.lyrCl ne '060'}">
							<span class="form-checkbox">
								<c:if test="${result.lyrClNm ne '정사영상'}">
                                    <input type="checkbox" name="chk_ctgr_<c:out value="${result.lyrCl}"/>"
                                           id="chk_ctgr_<c:out value="${result.lyrCl}"/>_2">
                                </c:if>
								<label for="chk_ctgr_<c:out value="${result.lyrCl}"/>_2"
                                       data-title="<c:out value="${result.lyrClNm}"/>"><c:out
                                        value="${result.lyrClNm}"/></label>
							</span>
            </c:if>
            <c:if test="${result.lyrCl eq '025' || result.lyrCl eq '060'}">
							<span class="form-checkbox">
                                    ${result.lyrClNm }
                            </span>
            </c:if>

            <button type="button" class="layer-toggle close" title="접기"></button>
            <ul class="layer-list-dep2">
                </c:if>
                <c:if test="${result.lyrCl eq '060' }">
                    <li title="<c:out value="${result.dataName}"/>">
								<span class="form-checkbox">
									<input type="checkbox" id="layer_POI_<c:out value="${result.dataid}"/>_2"
                                           name="layer_POI_${result.dataid}"
                                           data-table="${result.shpTableName}" data-store="${result.shpDataStoreName}"
                                           data-shpType="${result.shpDataType}" data-desc="${result.dataDesc}"
                                           class="only3d">

									<label for="layer_POI_${result.dataid}_2"
                                           data-title="${result.dataName}">${result.dataName}</label>
								</span>
                    </li>
                </c:if>
                <c:if test="${result.lyrCl ne '060' }">

                    <c:if test="${result.lyrCl ne '025' }">
                        <li title="<c:out value="${result.dataName}"/>">
									<span class="form-checkbox">
										<input type="checkbox"
                                               id="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>_2"
                                               name="layer_${result.dataType}_${result.dataid}"
                                               data-table="${result.shpTableName}"
                                               data-store="${result.shpDataStoreName}"
                                               data-shpType="${result.shpDataType}" data-desc="${result.dataDesc}"
                                               class="only3d">

										<label for="layer_${result.dataType}_${result.dataid}_2"
                                               data-title="${result.dataName}">${result.dataName}</label>
									</span>
                        </li>
                    </c:if>

                    <c:if test="${result.lyrCl eq '025' }">
                        <li class="ctgr025" title="<c:out value="${result.dataName}"/>">
                            <input type="hidden"
                                   id="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>_2"
                                   name="layer_${result.dataType}_${result.dataid}"
                                   data-table="${result.shpTableName}" data-store="${result.shpDataStoreName}"
                                   data-shpType="${result.shpDataType}" data-desc="${result.dataDesc}"
                                   class="only3d">
                                <%-- <span>${result.dataName}</span> --%>
                            <div class="riDiv">
                                <c:if test="${result.dataName eq '강상면'}">
                                    <span>${result.dataName}</span>
                                    <button type="button" class="dep3 layer-toggle close" title="접기"></button>
                                </c:if>
                                <c:if test="${result.dataName ne '강상면'}">
                                    <span>${result.dataName}</span>
                                    <button type="button" class="dep3 layer-toggle open" title="펼치기"></button>
                                </c:if>
                            </div>
                        </li>
                    </c:if>
                </c:if>
                <c:if test="${status.last}">
            </ul>
        </li>
        </c:if>
        <c:set var="ctgr" value="${result.lyrCl}"/>
        </c:forEach>
        <c:if test="${fn:length(resultList) == 0}">
            <li class="noData">
                <p>검색 결과가 없습니다.</p>
            </li>
        </c:if>
        </ul>
    </div>
    <%--    </div>--%>
</div>

<div class="lnb-util">
    <button type="button" class="manualBtn" title="도움말"></button>
    <button type="button" class="lnb-resetBtn" title="초기화"></button>
    <button type="button" class="lnb-close" title="닫기"></button>
</div>
