/**
 * SUBJECT : 편입토지분석
 * AUTHOR :
 * LAST UPDATE :
 * COMMENT :
 */
var M_PRCL_ANLS = (function () {

    let module = {
        wkt: null,
        facility: store['facility'].getData(),
        selector: '#parcelPopup',
        drawStyle: {
            fill: {
                color: 'rgba(255,128,128,0.28)'
            },
            stroke: {
                color: '#FF8080',
                width: 4
            },
        },

        init: function () {
            loadSearchTarget();
            bindEvents();
            $('.tabBoxDepth1 ul li button:first', M_PRCL_ANLS.selector).trigger("click");
            $('.scroll-y', M_PRCL_ANLS.selector).mCustomScrollbar({scrollbarPosition: 'outside'});
            dtmap.showLayer({
                id: 'parcel',
                type: 'WMS',
                layerNm: 'digitaltwin:lsmd_cont_ldreg_41830',
                title: '연속지적도',
                visible: true
            });

        },

        destroy: function () {
            dtmap.showLayer({id: 'parcel', visible: false})
            dtmap.off('drawend', onDrawEnd);
            dtmap.draw.clear();
            dtmap.draw.dispose();
            dtmap.vector.clear();
        },

        display: function () {

        },

    }


    /**
     * 시설물 데이터
     */
    function loadSearchTarget() {
        let tag = ``;
        let dataTag = ``;
        tag += `<option value="">시설물</option>`;
        M_PRCL_ANLS.facility.forEach((item) => {
            const name = item["tblNm"].toLowerCase();
            const title = item["lyrNm"];
            tag += `<option value="${name}">${title}</option>`;
            dataTag += `<tr>`;
            dataTag += `  <td class="align-center">`;
            dataTag += `    <span class="form-checkbox"><span>`;
            dataTag += `      <input type="checkbox" name="download-feature-type" data-type="${name}" id="download-feature-type-${name}">`;
            dataTag += `      <label for="download-feature-type-${name}"></label>`;
            dataTag += `    </span></span>`;
            dataTag += `  </td>`;
            dataTag += `  <td>${title}</td>`;
            dataTag += `</tr>`;
        });
        $("[name=standard-search-target]", M_PRCL_ANLS.selector).html(tag);
        $(".data-list tbody", M_PRCL_ANLS.selector).html(dataTag);
    }
    /**
     * 초기화
     */
    function reset() {
        // $("#download-search-area-extent", M_PRCL_ANLS.selector).prop("checked", true);
        // $("#download-search-area-extent", M_PRCL_ANLS.selector).trigger("change");
        $(".area-search-buffer", M_PRCL_ANLS.selector).val(0);
        $("[name=standard-search-target]", M_PRCL_ANLS.selector).val("");
        $(".facility-search-buffer", M_PRCL_ANLS.selector).val(0);
        $("[name=download-type]:first", M_PRCL_ANLS.selector).trigger("click");
        $("[name=download-feature-type-all]", M_PRCL_ANLS.selector).prop("checked", false);
        $("[name=download-feature-type]", M_PRCL_ANLS.selector).prop("checked", false);
        $(".bbs-list-wrap").hide();
        $(".guid-box").show();
    }

    /**
     * 이벤트 연결
     */
    function bindEvents() {

        // const that = this;
        // 검색 기준 변경
        $(".tabBoxDepth1 ul li button", M_PRCL_ANLS.selector).on("click", function () {
            dtmap.clear();
            dtmap.off('select');
            $("[name=download-search-drawing]:checked").prop("checked", false);
            var parent = $(this).parent();
            const id = parent.attr("data-id");
            const mod = dtmap.mod;
            if (id === "tr_facility" && mod === "3D") {
                toastr.warning("2D지도에서만 사용 가능합니다.");
                return;
            }
            parent.addClass("on").siblings().removeClass("on");
            $("." + parent.data("tab")).addClass("on").siblings().removeClass("on");
            $(".data-write tbody tr.tr_toggle", M_PRCL_ANLS.selector).hide();
            $(`.data-write tbody tr.${id}`, M_PRCL_ANLS.selector).show();


            const $div = $(M_PRCL_ANLS.selector).find('.result-list');
            $div.empty();
            $(".bbs-list-wrap").hide();
            $(".guid-box").show();


            // if (id === "tr_area") {
            //     $("[name=download-search-area]:checked", M_PRCL_ANLS.selector).trigger(
            //         "change"
            //     );
            // }
        });
        // 검색영역지정 변경 (현재화면영역, 사용자정의)
        // $("[name=download-search-area]", M_PRCL_ANLS.selector).on("change", function () {
        //     dtmap.clear();
        //     const node = $(this);
        //     const value = node.val();
        //     if (value === "extent") {
        //         $(".tr_search_area", M_PRCL_ANLS.selector).hide();
        //         $(".th_search_area_span", M_PRCL_ANLS.selector).attr("rowspan", 2);
        //         // cmmUtil.drawClear();
        //     } else {
        //         $(".tr_search_area", M_PRCL_ANLS.selector).show();
        //         $(".th_search_area_span", M_PRCL_ANLS.selector).attr("rowspan", 3);
        //         $("[name=download-search-drawing]:first", M_PRCL_ANLS.selector).trigger(
        //             "click"
        //         );
        //     }
        // });
        // 사용자 정의 검색 조건
        $("[name=download-search-drawing]", M_PRCL_ANLS.selector).on("click", function () {
            dtmap.clear();
            const node = $(this);
            const value = node.val();
            let type;
            switch (Number(value)) {
                case 1:
                    type = 'Point';
                    break;
                case 2:
                    type = 'LineString';
                    break;
                case 3:
                    type = 'Box';
                    break;
                case 4:
                    type = 'Polygon';
                    break;
                case 5:
                    type = 'Circle';
                    break;
            }
            dtmap.draw.active({type: type, once: true});
        });
        //시설물기준 - 검색영역지정 selectBox
        $("#facilitySelectList").on("change", function () {
            dtmap.vector.clear();
            const node = $(this);
            const layer = node.val();
            var promise = dtmap.wfsGetFeature({
                typeNames: layer, //WFS 레이어명
                bbox: dtmap.getExtent()
            });
            promise.then(function (data) {
                dtmap.vector.readGeoJson(data, M_PRCL_ANLS.drawStyle);
            });
        });
        //시설물기준 - 지도에서 선택
        $(".btn-select-map", M_PRCL_ANLS.selector).off().on("click", function () {
            dtmap.clear();
            $("#facilitySelectList").trigger("change");
            const type = $("[name=standard-search-target]", M_PRCL_ANLS.selector).val();
            if (type.length !== 0) {
                dtmap.off('select', onFacSelect);
                dtmap.once("select", onFacSelect);
            } else {
                toastr.warning("검색영역을 지정해 주세요.");
            }
        });
        //시설물 선택 이벤트리스너

        // 초기화
        $(".btn_reset", M_PRCL_ANLS.selector).on("click", function () {
            reset();
            dtmap.clear();
            dtmap.draw.setBuffer(0); // 버퍼해제
        });
        // 전체 선택 / 해제
        $("[name=download-feature-type-all]", M_PRCL_ANLS.selector).on(
            "change",
            function () {
                const node = $(this);
                $("[name=download-feature-type]", M_PRCL_ANLS.selector).prop(
                    "checked",
                    node.is(":checked")
                );
            }
        );
        //set buffer
        $(".area-search-buffer", M_PRCL_ANLS.selector).on("keyup", function (event) {
            // if (event.keyCode == "13") {
            //     $(".facility-spatial-search", that.container).trigger("click");
            // }
            dtmap.draw.setBuffer(Number(this.value));
        });

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
        $('.result-list', M_PRCL_ANLS.selector).on('click', 'tr', function (e) {
            const fid = $(this).data('fid');

            dtmap.vector.select(fid, {
                move: true
            })
        });
        $('.result-list', M_PRCL_ANLS.selector).on('mouseover', 'tr', function (e) {
            const fid = $(this).data('fid');

            dtmap.vector.select(fid, {
                move: false
            })
        });

        // $('.result-list', M_PRCL_ANLS.selector).on('mouseleave', 'tr', function (e) {
        //     const fid = $(this).data('fid');
        //
        //     dtmap.vector.unselect(fid)
        // });
        //dtmap 그리기이벤트
        dtmap.on('drawend', onDrawEnd)
    }

    /**
     * 선택 이벤트
     */
    function onFacSelect(e) {
        if (e.id) {
            dtmap.vector.select(e.id);
            const selected = dtmap.vector.getSelected();
            if (selected && selected.length > 0) {
                let buffer = Number($(M_PRCL_ANLS.selector).find(".facility-search-buffer").val() || 0);
                const feature = selected[0];
                let geometry = feature.getGeometry();
                if (geometry instanceof ol.geom.Point ||
                    geometry instanceof ol.geom.MultiPoint ||
                    geometry instanceof ol.geom.LineString ||
                    geometry instanceof ol.geom.MultiLineString) {
                    if (buffer === 0) {
                        buffer = 0.001;
                    }
                }
                geometry = dtmap.util.getBufferGeometry(geometry, buffer);
                compute(geometry);
            }
        } else {
            toastr.warning("현재 화면에 검색영역이 존재하지 않습니다.");
        }
    }

    function onDrawEnd(e) {
        const type = Number($("[name=download-search-drawing]:checked", M_PRCL_ANLS.selector).val());
        let buffer = Number($('.area-search-buffer', M_PRCL_ANLS.selector).val());
        if (type === 1 || type === 2) {
            if (buffer === 0) {
                buffer = 0.001;
            }
        }
        let geometry = e.geometry.clone();
        geometry = dtmap.util.getBufferGeometry(geometry, buffer);
        compute(geometry);

    }

    function compute(geom) {
        const maxCnt = 5000;
        dtmap.wfsGetFeature({
            typeNames: 'digitaltwin:lsmd_cont_ldreg_41830',
            geometry: geom
        }).then(function (data) {
            if(data.features.length > maxCnt) {
                toastr.warning(maxCnt + "건 이하로 다시 선택해 주세요.", "편입필지 분석 갯수 초과");
                return;
            }
            dtmap.draw.clear();
            dtmap.vector.clear();
            let features = dtmap.util.readGeoJson(data);
            let intersects = [];
            for (let i = 0; i < features.length; i++) {
                const intersect = getIntersects(geom, features[i]);
                if (intersect) {
                    intersects.push(intersect);
                }
            }

            let _name;
            let onTarget = $("#parcelPopup").find(".on").data("id");
            onTarget === "tr_area" ? _name = "parcel-area-type" : _name = "parcel-facility-type";
            let b = $("[name=" + _name + "]:checked").val() === "all" ? true : false;

            if (b) {
                //전체 포함되는 경우만
                intersects = intersects.filter((f) => {
                    return f.get('ratio') === 100;
                })
            }

            dtmap.vector.addFeatures(features);
            dtmap.vector.addFeatures(intersects, {
                fill: {
                    color: '#fde0dd',
                    opacity: 0.5
                },
                stroke: {
                    color: '#c51b8a',
                },
                label: {
                    column: 'jibun'
                }
            });
            printList(intersects);
        });
    }

    const jstsParser = new jsts.io.OL3Parser();

    function getIntersects(geom, feature) {
        try {
            if (geom instanceof ol.geom.Circle) {
                geom = ol.geom.Polygon.fromCircle(geom);
            }

            const oriGeom = feature.getGeometry().clone();
            const a = jstsParser.read(geom);
            const b = jstsParser.read(oriGeom);
            const result = a.intersection(b);
            const inGeom = jstsParser.write(result);
            const inFeature = new ol.Feature(inGeom);
            const inArea = inGeom.getArea();
            const oriArea = oriGeom.getArea();
            const ratio = (inArea / oriArea) * 100;
            inFeature.set('ratio', ratio);
            inFeature.set('area', inArea);
            inFeature.set('jibun', feature.get('jibun'));
            inFeature.set('oriArea', oriArea);
            inFeature.setId(feature.getId() + '_intersect');
            return inFeature;
        } catch (e) {
            // console.log(e);
        }
    }

    function printList(features) {
        let html = ``;
        let sumJijukArea = 0;
        let sumParcelArea = 0;
        const $div = $(M_PRCL_ANLS.selector).find('.result-list');
        $('.guid-box', M_PRCL_ANLS.selector).hide();
        $div.empty();
        if(features.length === 0) {
            html += `<tr>
                <td colspan="5">검색결과가 존재하지 않습니다.</td>
            </tr>`
        } else {
            for (let i = 0; i < features.length; i++) {
                const f = features[i];
                sumParcelArea += f.get("area");
                sumJijukArea += f.get("oriArea");
                let exceptVal = f.get('oriArea') - f.get('area');
                html += `<tr data-fid="${f.getId()}">
                <td>${f.get('jibun')}</td>
                <td>${f.get('oriArea').toFixed(2)}</td>
                <td>${f.get('area').toFixed(2)}</td>
                <td>${exceptVal.toFixed(2)}</td>
                <td>${f.get('ratio').toFixed(1)}</td>
            </tr>`
            }
        }
        $div.append(html);
        $(".bbs-list-wrap").show();
        $(".guid-box").hide();

        let infoHtml = ``;
        infoHtml += `
            <ul>
                <li>필지수:<a style="color:#1C77FF; font-weight: bold;"> ${features.length}건</a></li>
                <li>
                편입면적합계:<a style="color:#1C77FF; font-weight: bold;"> ${sumParcelArea.toFixed(2)}㎡</a>
                전체면적합계:<a style="color:#1C77FF; font-weight: bold;"> ${sumJijukArea.toFixed(2)}㎡</a></li>
            </ul>
        `;
        $("#parcelInfoArea").html(infoHtml);
    }

    return module;
}())