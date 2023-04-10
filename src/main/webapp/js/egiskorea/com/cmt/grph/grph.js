// 그리기 도구 목록
function aj_selectGraphicInfoList() {
    new GraphicTool(1);
}

// 그리기 도구 페이지 링크
function fn_selectGraphicLinkPage(pageIndex) {
    var data = $(".searchForm", this.selector).serialize();
    var pageIndexSplit = data.split('&', 1);
    data = data.replace(pageIndexSplit, 'pageIndex=' + pageIndex);
    removeGrphLayer();
    new GraphicTool(pageIndex, data);
}

/**
 * 그래픽 도구
 */
class GraphicTool {
    /**
     * 생성자
     * @param {number} pageIndex 페이지 번호
     */
    constructor(pageIndex, data) {
        this.selector = "#rightPopup";
        this.render(data, pageIndex);
    }

    /**
     * 표시
     * @param {Object} data 검색 조건
     * @param {number} pageIndex 페이지 번호
     */
    render(data, pageIndex) {
        data = data || `sortKind=newest&pageIndex=${pageIndex}`;
        $.ajax({
            type: "POST",
            url: "/cmt/grph/selectGraphicInfoList.do",
            data: data,
            dataType: "html",
            async: false,
            success: (returnData, status) => {
                if (status == "success") {
                    $("#rightPopup").html(returnData);
                    this.bindEvents();
                } else {
                    toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                    return;
                }
            },
            complete: function () {
            },
        });
    }

    /**
     * 이벤트 연결
     */
    bindEvents() {
        const that = this;

        // 검색
        $(".btn-search", that.selector).on("click", function () {
            const data = $(".searchForm", that.selector).serialize();
            removeGrphLayer();
            that.render(data);
        });
        $("[name=searchWrd]", that.selector).on("keydown", function (event) {
            if (event.keyCode == 13) {
                $(".btn-search", that.selector).trigger("click");
            }
        });

        // 등록
        $(".btn-register", that.selector).on("click", function () {
            if (dtmap.mod === '2D') {
                new GraphicToolEditor();
            } else {
                return alert("해당 기능은 2D에서 가능합니다.");
            }

        });

        // 검색 순서 변경
        $("[name=sortKind]", that.selector).on("change", function () {
            const data = $(".searchForm", that.selector).serialize();
            that.render(data);
        });

        // 전체선택/전체해제
        $(".graphic_check_all", that.selector).on("change", function () {
            const node = $(this);
            if (node.is(":checked")) {
                $(".bbs-list .graphic_check:not(:checked)", that.selector).trigger(
                    "click"
                );
            } else {
                $(".bbs-list .graphic_check:checked", that.selector).trigger("click");
            }
        });

        // 그리기 표시
        $(".bbs-list .graphic_check", that.selector).on("change", function () {
            const node = $(this);
            const id = node.attr("data-graphic-id");
            if (node.is(":checked")) {
                $.post(`/cmt/grph/selectGraphicInfo.do?grphcId=${id}`)
                    .done((response) => {
                        const result = JSON.parse(response)["result"];
                        const geojson = result["geojson"].replaceAll("&quot;", '"');
                        dtmap.vector.readGeoJson(geojson, function (feature) {
                            feature.set('grphcId', id);
                            return feature.get('style');
                        });
                    })
                    .fail(() => {
                        alert("그리기 정보를 가져오는 실패했습니다.");
                    });
            } else {
                dtmap.vector.removeFeatureByFilter(function (obj, prop) {
                    return prop["grphcId"] === id
                })
            }
        });

        // 편집
        $(".bbs-list .graphic_a", that.selector).on("click", function () {
            const node = $(this);
            const id = node.attr("data-graphic-id");
            new GraphicToolEditor(id);
        });
    }
}

/**
 * 그래픽 도구 편집
 */
class GraphicToolEditor {
    /**
     * 생성자
     * @param {string} id 그래픽 아이디
     */
    constructor(id) {
        this.selector = "#rightPopup";
        this.id = id;
        this.feature = null;
        this.render();
    }

    /**
     * 표시
     */
    render() {
        //요구사항으로 3D는 로딩없이 시작_박규호
        // if (app2D) {
        //     loadingShowHide("show");
        // }
        if (dtmap.mod !== '2D') {
            return toastr.warning("해당 기능은 2D에서 가능합니다.");
        }

        let pageIndex = $("[name=pageIndex]", this.selector).val();
        let searchCl = $("[name=searchCl]", this.selector).val();
        let searchCnd = $("[name=searchCnd]", this.selector).val();
        let searchWrd = $("[name=searchWrd]", this.selector).val();
        let sortKind = $("input[name='sortKind']:checked").val();

        console.log(sortKind);
        let url = null;

        // 등록 or 수정 화면 불러오기
        if (this.id) {
            url = "/cmt/grph/updateGraphicInfoView.do";
        } else {
            url = "/cmt/grph/insertGraphicInfoView.do";
        }

        $.ajax({
            type: "POST",
            url: url,
            data: {
                pageIndex: pageIndex,
                searchCl: searchCl,
                searchCnd: searchCnd,
                searchWrd: searchWrd,
                sortKind: sortKind
            },
            dataType: "html",
            async: false,
            success: (returnData, status) => {
                if (status == "success") {
                    $("#rightPopup").html(returnData);
                    this.initUi();
                    this.bindEvents();
                } else {
                    toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                    return;
                }
            },
            complete: () => {
                // 수정일 경우 그래픽정보 가져옴
                if (this.id) {
                    $.post(`/cmt/grph/selectGraphicInfo.do?grphcId=${this.id}`)
                        .done((response) => {
                            const result = JSON.parse(response)["result"];
                            const geojson = result["geojson"].replaceAll("&quot;", '"');

                            $("[name=cl_id]", this.selector).val(result["clId"]);
                            $("[name=sj]", this.selector).val(result["sj"]);
                            $(`[name=pnrsAt][value=${result["pnrsAt"]}]`, this.selector).prop(
                                "checked",
                                true
                            );
                            dtmap.vector.clear();
                            dtmap.draw.clear();
                            dtmap.draw.readGeoJson(geojson)
                        })
                        .fail(() => {
                            alert("그리기 정보를 가져오는 실패했습니다.");
                            dtmap.vector.clear();
                            dtmap.draw.clear();

                        });
                } else {
                    // if (app2D) {
                    //     loadingShowHide("hide");
                    // }
                }
            },
        });
    }

    /**
     * UI 초기화
     */
    initUi() {
        const that = this;

        // 스크롤 적용
        $(".drawingTabPoint .scroll-y", that.selector).mCustomScrollbar({
            scrollbarPosition: "outside",
        });

        // 점 색상
        $(".drawingTabPoint .pointColor", that.selector).minicolors({
            control: "hue",
            defaultValue: "rgba(255, 0, 0)",
            format: "rgb",
            theme: "default",
            opacity: false,
            swatches: [],
        });

        // 선 색상
        $(".drawingTabLine .strokeColor", that.selector).minicolors({
            control: "hue",
            defaultValue: "rgba(255, 0, 0)",
            format: "rgb",
            theme: "default",
            opacity: false,
            swatches: [],
        });

        // 선 투명도
        const lineStrokeOpacity = $(
            ".drawingTabLine .strokeOpacity",
            that.selector
        );
        $(".drawingTabLine .strokeOpacitySlider", that.selector).slider({
            value: 20,
            min: 0,
            max: 100,
            step: 1,
            range: "min",
            create: function () {
                lineStrokeOpacity.val($(this).slider("value") + "%");
            },
            slide: function (event, ui) {
                lineStrokeOpacity.val(ui.value + "%");
                if (that.feature) {
                    that.feature.set("strokeOpacity", ui.value);
                }
            },
        });

        // 선 두께
        const lineStrokeWidth = $(".drawingTabLine .strokeWidth", that.selector);
        $(".drawingTabLine .strokeWidthSlider", that.selector).slider({
            value: 3,
            min: 1,
            max: 50,
            step: 1,
            range: "min",
            create: function () {
                lineStrokeWidth.val($(this).slider("value"));
            },
            slide: function (event, ui) {
                lineStrokeWidth.val(ui.value);
                if (that.feature) {
                    that.feature.set("strokeWidth", ui.value);
                }
            },
        });

        // 다각형 선 색상
        $(".drawingTabPolygon .strokeColor", that.selector).minicolors({
            control: "hue",
            defaultValue: "rgba(255, 0, 0)",
            format: "rgb",
            theme: "default",
            opacity: false,
            swatches: [],
        });

        // 다각형 선 투명도
        const polygonStrokeOpacity = $(
            ".drawingTabPolygon .strokeOpacity",
            that.selector
        );
        $(".drawingTabPolygon .strokeOpacitySlider", that.selector).slider({
            value: 20,
            min: 0,
            max: 100,
            step: 1,
            range: "min",
            create: function () {
                polygonStrokeOpacity.val($(this).slider("value") + "%");
            },
            slide: function (event, ui) {
                polygonStrokeOpacity.val(ui.value + "%");
                if (that.feature) {
                    that.feature.set("strokeOpacity", ui.value);
                }
            },
        });

        // 다각형 선 두께
        const polygonStrokeWidth = $(
            ".drawingTabPolygon .strokeWidth",
            that.selector
        );
        $(".drawingTabPolygon .strokeWidthSlider", that.selector).slider({
            value: 3,
            min: 1,
            max: 50,
            step: 1,
            range: "min",
            create: function () {
                polygonStrokeWidth.val($(this).slider("value"));
            },
            slide: function (event, ui) {
                polygonStrokeWidth.val(ui.value);
                if (that.feature) {
                    that.feature.set("strokeWidth", ui.value);
                }
            },
        });

        // 다각형 면 색상
        $(".drawingTabPolygon .fillColor", that.selector).minicolors({
            control: "hue",
            defaultValue: "rgba(255, 0, 0)",
            format: "rgb",
            theme: "default",
            opacity: false,
            swatches: [],
        });

        // 다각형 면 투명도
        const polygonFillOpacity = $(
            ".drawingTabPolygon .fillOpacity",
            that.selector
        );
        $(".drawingTabPolygon .fillOpacitySlider", that.selector).slider({
            value: 80,
            min: 0,
            max: 100,
            step: 1,
            range: "min",
            create: function () {
                polygonFillOpacity.val($(this).slider("value") + "%");
            },
            slide: function (event, ui) {
                polygonFillOpacity.val(ui.value + "%");
                if (that.feature) {
                    that.feature.set("fillOpacity", ui.value);
                }
            },
        });

        // 문자 색상
        $(".drawingTabText .fillColor", that.selector).minicolors({
            control: "hue",
            defaultValue: "rgba(255, 0, 0)",
            format: "rgb",
            theme: "default",
            opacity: false,
            swatches: [],
        });

        // 문자 선 색상
        $(".drawingTabText .strokeColor", that.selector).minicolors({
            control: "hue",
            defaultValue: "rgba(0, 0, 255)",
            format: "rgb",
            theme: "default",
            opacity: false,
            swatches: [],
        });

        // 문자 크기
        const fontSize = $(".drawingTabText .fontSize", that.selector);
        $(".drawingTabText .fontSizeSlider", that.selector).slider({
            value: 26,
            min: 10,
            max: 50,
            step: 1,
            range: "min",
            create: function () {
                fontSize.val($(this).slider("value") + "px");
            },
            slide: function (event, ui) {
                fontSize.val(ui.value + "px");
                if (that.feature) {
                    that.feature.set("fontSize", ui.value);
                }
            },
        });
    }

    /**
     * 이미지 연결
     */
    bindEvents() {
        const that = this;

        // 도형 그리기
        $("[name=drawing]", that.selector).on("click", function () {
            const node = $(this);
            const type = node.val();
            that.draw(type);
        });

        // 점 색상
        $(".drawingTabPoint .pointColor", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("pointColor", $(this).val());
            }
        });

        // 점 모양
        $(".drawingTabPoint .pointShape", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("shapeType", $(this).val());
            }
        });

        // 점 크기
        $(".drawingTabPoint .pointSize", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("pointSize", $(this).val());
            }
        });

        // 심볼 선택
        $(".drawingTabPoint .symbol-group button", that.selector).on(
            "click",
            function () {
                const node = $(this);
                that.resetSymbolActived();
                node.addClass("active");
                if (that.feature) {
                    that.feature.set("sid", $("img", node).attr("data-id"));
                    that.feature.set("src", $("img", node).attr("src"));
                }
            }
        );

        // 심볼 크기 비율
        $(".drawingTabPoint .markerScale", that.selector).on("change", function () {
            if (
                that.feature &&
                $(".symbol-group button.active", that.selector).length > 0
            ) {
                that.feature.set("scale", $(this).val());
            }
        });

        // 심볼 직접 등록
        $(".drawingTabPoint .drawing-file", that.selector).on("change", function () {
                const node = $(this);
                const files = node.prop("files");
                if (files.length > 0) {
                    const acceptTypes = [
                        "image/png",
                        "image/jpeg",
                        "image/jpg",
                        "image/bmp",
                    ];
                    const file = files[0];
                    const type = file.type.toLowerCase();
                    if (acceptTypes.includes(type)) {
                        that.resetSymbolActived();
                        const fileReader = new FileReader();
                        fileReader.addEventListener("load", () => {
                                const base64 = fileReader.result;
                                const params = {
                                    mkrNm: file.name,
                                    img: base64,
                                };
                                $.post("/cmt/grph/insertImageMarker.do", params)
                                    .done((response) => {
                                        const result = JSON.parse(response);
                                        if (result["result"]) {
                                            let tag = ``;
                                            tag += `<li class="active">`;
                                            tag += `<span>`;
                                            tag += `  <label><img src="${base64}" data-id="${result["mkrId"]}" alt="${file.name}"> ${file.name}</label>`;
                                            tag += `</span>`;
                                            //tag += `<button type="button" data-id="${result["mkrId"]}" class="symbol-delete"></button>`;
                                            tag += `</li>`;
                                            const liNode = $(tag);
                                            $(".custom-container", that.selector).append(liNode);
                                            liNode.trigger("click");
                                        } else {
                                            alert(`마커 저장에 실패했습니다.`);
                                            console.log(result["errorMsg"]);
                                        }
                                    })
                                    .fail(() => {
                                        alert(`마커 저장에 실패했습니다.`);
                                    });
                            },
                            false
                        );
                        fileReader.readAsDataURL(file);
                    } else {
                        alert(`이미지 파일만 등록 가능합니다. (${acceptTypes.join()})`);
                    }
                }
            }
        );

        // 직접 등록 심볼 선택
        $(".drawingTabPoint .custom-container", that.selector).on("click", "li", function () {
                const node = $(this);
                that.resetSymbolActived();
                node.addClass("active");
                if (that.feature) {
                    that.feature.set("sid", $("img", node).attr("data-id"));
                    that.feature.set("src", $("img", node).attr("src"));
                }
            }
        );

        // 심볼 크기 비율
        $(".drawingTabPoint .customScale", that.selector).on("change", function () {
            if (
                that.feature &&
                $(".custom-container li.active", that.selector).length
            ) {
                that.feature.set("scale", $(this).val());
            }
        });

        // 심볼 삭제
        $(".drawingTabPoint .custom-container", that.selector).on("click", "li button.symbol-delete", function () {
                if (confirm(`선택하신 심볼을 삭제하시겠습니까?`)) {
                    const node = $(this);
                    const id = node.attr("data-id");
                    $.post("/cmt/grph/deleteImageMarker.do", {mkrId: id})
                        .done((response) => {
                            const result = JSON.parse(response);
                            if (result["result"]) {
                                node.parent().remove();
                            } else {
                                alert(`마커 삭제에 실패했습니다.`);
                                console.log(result["errorMsg"]);
                            }
                        })
                        .fail(() => {
                            alert(`마커 삭제에 실패했습니다.`);
                        });
                }
            }
        );

        // 선 색상
        $(".drawingTabLine .strokeColor", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("strokeColor", $(this).val());
            }
        });

        // 선 모양
        $(".drawingTabLine .strokeLineDash", that.selector).on("change", function () {
                if (that.feature) {
                    that.feature.set("strokeLineDash", $(this).val());
                }
            }
        );

        // 선 시작화살표
        $(".drawingTabLine .strokeStartArrow", that.selector).on("click", function () {
                if (that.feature) {
                    that.feature.set("strokeStartArrow", $(this).is(":checked"));
                }
            }
        );

        // 선 끝화살표
        $(".drawingTabLine .strokeEndArrow", that.selector).on("click", function () {
                if (that.feature) {
                    that.feature.set("strokeEndArrow", $(this).is(":checked"));
                }
            }
        );

        // 면 - 선 색상
        $(".drawingTabPolygon .strokeColor", that.selector).on("change", function () {
                if (that.feature) {
                    that.feature.set("strokeColor", $(this).val());
                }
            }
        );

        // 면 - 선 모양
        $(".drawingTabPolygon .strokeLineDash", that.selector).on("change", function () {
                if (that.feature) {
                    that.feature.set("strokeLineDash", $(this).val());
                }
            }
        );

        // 면 색상
        $(".drawingTabPolygon .fillColor", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("fillColor", $(this).val());
            }
        });

        // 글자 색상
        $(".drawingTabText .fillColor", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("fillColor", $(this).val());
            }
        });

        // 글자 테두리 색상
        $(".drawingTabText .fillColor", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("fillColor", $(this).val());
            }
        });

        // 글꼴
        $(".drawingTabText .font", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("fontFamily", $(this).val());
            }
        });

        // 굵게
        $(".drawingTabText .fontBold", that.selector).on("click", function () {
            if (that.feature) {
                that.feature.set("fontBold", $(this).is(":checked"));
            }
        });

        // 기울기
        $(".drawingTabText .fontItalic", that.selector).on("click", function () {
            if (that.feature) {
                that.feature.set("fontItalic", $(this).is(":checked"));
            }
        });

        // 정렬
        $(".drawingTabText [name=textAlign]", that.selector).on("click", function () {
                if (that.feature) {
                    that.feature.set("textAlign", $(this).val());
                }
            }
        );

        // 문자
        $(".drawingTabText .text", that.selector).on("change", function () {
            if (that.feature) {
                that.feature.set("text", $(this).val());
            }
        });

        // 등록
        $(".btn_save", that.selector).on("click", function () {
            that.save();
        });

        // 취소
        $(".btn_cancel", that.selector).on("click", function () {
            const data = $(".searchForm", this.selector).serialize();
            that.cancel(data);
            // if (app2D == false || app2D == null) {
            //     removeGrphLayer();
            // }
        });

        // 삭제
        $(".btn_remove", that.selector).on("click", function () {
            if (confirm(`그리기 내용을 삭제하시겠습니까?`)) {
                that.remove();
                // if (app2D == false || app2D == null) {
                //     removeGrphLayer();
                // }

            }
        });
    }

    /**
     * 그리기
     * @param {string} type 타입
     */
    draw(type) {
        dtmap.draw.active({type: type});

        // const yMap = app2D.getYMap();
        // const module = yMap.getModule("drawingTool");
        if (type == "Translate") {
            // module.translate(
            //     "select",
            //     (event) => {
            //         if (event.selected.length > 0) {
            //             this.feature = event.selected[0];
            //             this.setStyleUi();
            //         } else {
            //             this.feature = null;
            //             this.resetUi();
            //         }
            //     },
            //     () => {
            //         this.feature = null;
            //         this.resetUi();
            //     }
            // );
            this.resetUi();
        } else if (type == "Modify") {
            // module.modify(
            //     "select",
            //     (event) => {
            //         if (event.selected.length > 0) {
            //             this.feature = event.selected[0];
            //             this.setStyleUi();
            //         } else {
            //             this.feature = null;
            //             this.resetUi();
            //         }
            //     },
            //     () => {
            //         this.feature = null;
            //         this.resetUi();
            //     }
            // );
            this.resetUi();
        } else {
            this.feature = null;
            // module.draw(type, "drawend", (event) => {
            //     const feature = event.feature;
            //     const properties = this.getStyle(type);
            //     feature.setProperties(properties);
            // });
            const that = this;
            dtmap.off('draw');
            dtmap.on('drawend', function (e) {
                const feature = e.feature;
                const properties = that.getStyle(type);
                feature.setProperties({style: properties});
            });

            this.setUi(type);
        }

    }

    /**
     * UI 초기화
     */
    resetUi() {
        $(".tabBoxDepth2 li button").prop("disabled", false);
        $(".tab-cont .row_point", this.selector).show();
        $(".tab-cont .row_marker", this.selector).show();
    }

    /**
     * 타입에 따라 UI 설정
     * @param {string} type 타입
     */
    setUi(type) {
        // 전체 스타일 비활성화
        $(".tabBoxDepth2 li button").prop("disabled", false);
        if (type == "Point") {
            $(".tabBoxDepth2 li[data-tab=drawingTabPoint] button").trigger("click");
            $(".tab-cont .row_point", this.selector).show();
            $(".tab-cont .row_marker", this.selector).hide();
        } else if (type == "Marker") {
            $(".tabBoxDepth2 li[data-tab=drawingTabPoint] button").trigger("click");
            $(".tab-cont .row_point", this.selector).hide();
            $(".tab-cont .row_marker", this.selector).show();
        } else if (type == "LineString") {
            $(".tabBoxDepth2 li[data-tab=drawingTabLine] button").trigger("click");
        } else if (type == "Rectangle") {
            $(".tabBoxDepth2 li[data-tab=drawingTabPolygon] button").trigger("click");
        } else if (type == "Triangle") {
            $(".tabBoxDepth2 li[data-tab=drawingTabPolygon] button").trigger("click");
        } else if (type == "Polygon") {
            $(".tabBoxDepth2 li[data-tab=drawingTabPolygon] button").trigger("click");
        } else if (type == "Circle") {
            $(".tabBoxDepth2 li[data-tab=drawingTabPolygon] button").trigger("click");
        } else if (type == "Text") {
            $(".tabBoxDepth2 li[data-tab=drawingTabText] button").trigger("click");
        } else {
            console.log(`${type} 지원되지 않는 타입입니다.`);
        }
        $(".tabBoxDepth2 li button").prop("disabled", true);
    }

    /**
     * 스타일로 UI 설정
     */
    setStyleUi() {
        const type = this.feature.get("type");
        this.resetUi();
        this.setUi(type);
        if (type == "Point") {
            this.setPointStyle(this.feature);
        } else if (type == "Marker") {
            this.setMarkerStyle(this.feature);
        } else if (type == "LineString") {
            this.setLineStyle(this.feature);
        } else if (type == "Rectangle") {
            this.setPolygonStyle(this.feature);
        } else if (type == "Triangle") {
            this.setPolygonStyle(this.feature);
        } else if (type == "Polygon") {
            this.setPolygonStyle(this.feature);
        } else if (type == "Circle") {
            this.setPolygonStyle(this.feature);
        } else if (type == "Text") {
            this.setTextStyle(this.feature);
        } else {
            console.log(`${type} 지원되지 않는 타입입니다.`);
        }
    }

    /**
     * 심볼 활성화 초기화
     */
    resetSymbolActived() {
        $(".drawingTabPoint .symbol-group button", this.selector).removeClass(
            "active"
        );
        $(".custom-container li", this.selector).removeClass("active");
    }

    /**
     * 스타일 가져오기
     * @param {string} type 타입
     * @returns 스타일
     */
    getStyle(type) {
        let style = null;
        if (type == "Point") {
            style = this.getPointStyle();
        } else if (type == "Marker") {
            style = this.getMarkerStyle();
        } else if (type == "LineString") {
            style = this.getLineStyle();
        } else if (type == "Rectangle") {
            style = this.getPolygonStyle();
        } else if (type == "Triangle") {
            style = this.getPolygonStyle();
        } else if (type == "Polygon") {
            style = this.getPolygonStyle();
        } else if (type == "Circle") {
            style = this.getPolygonStyle();
        } else if (type == "Text") {
            style = this.getTextStyle();
        } else {
            console.log(`${type} 지원되지 않는 타입입니다.`);
        }
        style["type"] = type;
        return style;
    }

    /**
     * 점 스타일 설정
     * @param {ol.Feature} feature 공간객체
     */
    setPointStyle(feature) {
        const selector = `${this.selector} .drawingTabPoint`;
        $(".pointColor", selector).minicolors("value", feature.get("pointColor"));
        $(".pointShape", selector).val(feature.get("shapeType"));
        $(".pointSize", selector).val(feature.get("pointSize"));
    }

    /**
     * 점 스타일 가져오기
     * @returns 스타일
     */
    getPointStyle() {
        const selector = `${this.selector} .drawingTabPoint`;
        const pointColor = $(".pointColor", selector).val();
        const shapeType = $(".pointShape", selector).val();
        const pointSize = $(".pointSize", selector).val();
        return {
            fill: {
                color: pointColor,
                opacity: 1
            },
            stroke: {
                color: pointColor,
                width: 1
            },
            shape: shapeType,
            radius: pointSize
        };
    }

    /**
     * 마커 스타일 설정
     * @param {ol.Feature} feature 공간객체
     */
    setMarkerStyle(feature) {
        const selector = `${this.selector} .drawingTabPoint`;
        const symbol = $(
            `.symbol-group button img[data-id=${feature.get("sid")}]`,
            selector
        );
        const custom = $(
            `.custom-container li img[data-id=${feature.get("sid")}]`,
            selector
        );
        if (symbol.length > 0) {
            symbol.trigger("click");
            $(".markerScale", selector).val(feature.get("scale"));
        } else if (custom.length > 0) {
            custom.trigger("click");
            $(".customScale", selector).val(feature.get("scale"));
        }
    }

    /**
     * 마커 스타일 가져오기
     * @returns 스타일
     */
    getMarkerStyle() {
        const selector = `${this.selector} .drawingTabPoint`;
        const symbol = $(".symbol-group button.active", selector);
        const custom = $(".custom-container li.active", selector);
        let sid, src, scale;
        if (symbol.length > 0) {
            sid = $("img", symbol).attr("data-id");
            src = $("img", symbol).attr("src");
            scale = $(".markerScale", selector).val();
        } else if (custom.length > 0) {
            sid = $("img", custom).attr("data-id");
            src = $("img", custom).attr("src");
            scale = $(".customScale", selector).val();
        } else {
            console.log(`선택된 심볼이 없습니다.`);
        }
        return {
            marker: {
                src: src,
                anchor: [0.5, 0.5],
                scale: scale,
                sid: sid
            }
        };
    }

    /**
     * 선 스타일 설정
     * @param {ol.Feature} feature 공간객체
     */
    setLineStyle(feature) {
        const selector = `${this.selector} .drawingTabLine`;
        $(".strokeColor", selector).minicolors("value", feature.get("strokeColor"));
        $(".strokeLineDash", selector).val(feature.get("strokeLineDash"));
        $(".strokeOpacitySlider", selector).slider(
            "value",
            feature.get("strokeOpacity")
        );
        $(".strokeOpacity", selector).val(`${feature.get("strokeOpacity")}%`);
        $(".strokeWidthSlider", selector).slider(
            "value",
            feature.get("strokeWidth")
        );
        $(".strokeWidth", selector).val(feature.get("strokeWidth"));
        $(".strokeStartArrow", selector).prop(
            "checked",
            feature.get("strokeStartArrow")
        );
        $(".strokeEndArrow", selector).prop(
            "checked",
            feature.get("strokeEndArrow")
        );
    }

    /**
     * 선 스타일 가져오기
     * @returns 스타일
     */
    getLineStyle() {
        const selector = `${this.selector} .drawingTabLine`;
        const strokeColor = $(".strokeColor", selector).val();
        const strokeLineDash = $(".strokeLineDash", selector).val();
        const strokeOpacity = $(".strokeOpacitySlider", selector).slider("value");
        const strokeWidth = $(".strokeWidth", selector).val();
        const strokeStartArrow = $(".strokeStartArrow", selector).is(":checked");
        const strokeEndArrow = $(".strokeEndArrow", selector).is(":checked");

        return {
            stroke: {
                color: strokeColor,
                opacity: (100 - strokeOpacity) / 100,
                width: strokeWidth,
                lineDash: strokeLineDash,
                startArrow: strokeStartArrow,
                endArrow: strokeEndArrow
            }
        };
    }

    /**
     * 면 스타일 설정
     * @param {ol.Feature} feature 공간객체
     */
    setPolygonStyle(feature) {
        const selector = `${this.selector} .drawingTabPolygon`;
        $(".strokeColor", selector).minicolors("value", feature.get("strokeColor"));
        $(".strokeLineDash", selector).val(feature.get("strokeLineDash"));
        $(".strokeOpacitySlider", selector).slider(
            "value",
            feature.get("strokeOpacity")
        );
        $(".strokeOpacity", selector).val(`${feature.get("strokeOpacity")}%`);
        $(".strokeWidthSlider", selector).slider(
            "value",
            feature.get("strokeWidth")
        );
        $(".strokeWidth", selector).val(feature.get("strokeWidth"));
        $(".strokeStartArrow", selector).prop(
            "checked",
            feature.get("strokeStartArrow")
        );
        $(".strokeEndArrow", selector).prop(
            "checked",
            feature.get("strokeEndArrow")
        );
        $(".fillColor", selector).minicolors("value", feature.get("fillColor"));
        $(".fillOpacitySlider", selector).slider(
            "value",
            feature.get("fillOpacity")
        );
        $(".fillOpacity", selector).val(`${feature.get("fillOpacity")}%`);
    }

    /**
     * 면 스타일 가져오기
     * @returns 스타일
     */
    getPolygonStyle() {
        const selector = `${this.selector} .drawingTabPolygon`;
        const strokeColor = $(".strokeColor", selector).val();
        const strokeLineDash = $(".strokeLineDash", selector).val();
        const strokeOpacity = $(".strokeOpacitySlider", selector).slider("value");
        const strokeWidth = $(".strokeWidth", selector).val();
        const fillColor = $(".fillColor", selector).val();
        const fillOpacity = $(".fillOpacitySlider", selector).slider("value");
        return {
            fill: {
                color: fillColor,
                opacity: (100 - fillOpacity) / 100
            },
            stroke: {
                color: strokeColor,
                opacity: (100 - strokeOpacity) / 100,
                width: strokeWidth,
                lineDash: strokeLineDash,
            }
        };
    }

    /**
     * 문자 스타일 설정
     * @param {ol.Feature} feature 공간객체
     */
    setTextStyle(feature) {
        const selector = `${this.selector} .drawingTabText`;
        $(".fillColor", selector).minicolors("value", feature.get("fillColor"));
        $(".strokeColor", selector).minicolors("value", feature.get("strokeColor"));
        $(".font", selector).val(feature.get("fontFamily"));
        $(".fontSizeSlider", selector).slider("value", feature.get("fontSize"));
        $(".fontSize", selector).val(`${feature.get("fontSize")}%`);
        $(".fontBold", selector).prop("checked", feature.get("fontBold"));
        $(".fontItalic", selector).prop("checked", feature.get("fontItalic"));
        $(`[name=textAlign][value=${feature.get("textAlign")}]`, selector).prop(
            "checked",
            true
        );
        $(".text", selector).val(feature.get("text"));
    }

    /**
     * 문자 스타일 가져오기
     * @returns 스타일
     */
    getTextStyle() {
        const selector = `${this.selector} .drawingTabText`;
        const fillColor = $(".fillColor", selector).val();
        const strokeColor = $(".strokeColor", selector).val();
        const fontFamily = $(".font", selector).val();
        const fontSize = $(".fontSizeSlider", selector).slider("value");
        const fontBold = $(".fontBold", selector).is(":checked");
        const fontItalic = $(".fontItalic", selector).is(":checked");
        const textAlign = $("[name=textAlign]:checked", selector).val();
        const text = $(".text", selector).val() || "문자";
        return {
            text: {
                fill: {
                    color: fillColor
                },
                stroke: {
                    color: strokeColor,
                    width: 2
                },
                fontSize: fontSize,
                fontFamily: fontFamily,
                bold: fontBold,
                italic: fontItalic,
                textAlign: textAlign,
                text: text
            }
        };
    }

    /**
     * 저장
     * @returns 성공 or 실패
     */
    save() {
        const clId = $("[name=cl_id]", this.selector).val();
        const sj = $("[name=sj]", this.selector).val();
        const pnrsAt = $("[name=pnrsAt]:checked", this.selector).val();
        let geojson = null;
        if (!sj) {
            alert(`제목을 입력하여 주십시오.`);
            $("[name=sj]", this.selector).focus();
            return;
        }

        if (dtmap.mod === '2D') {
            // const yMap = app2D.getYMap();
            // const module = yMap.getModule("drawingTool");
            // const count = module.getCount();
            // if (count == 0) {
            //     alert(`그리기 객체를 등록하여 주십시오.`);
            //     return;
            // }
            // geojson = module.toGeoJSON();
            geojson = dtmap.draw.writeGeoJson();

            if (!geojson) {
                toastr.warning(`그리기 객체를 등록하여 주십시오.`);
                return;
            }
        } else {
            return toastr.warning('해당 기능은 2D에서 가능합니다.');

        }

        if (confirm(`그리기 내용을 저장하시겠습니까?`)) {
            let url = null;
            const params = {clId, sj, geojson, pnrsAt};

            if (this.id) {
                url = "/cmt/grph/updateGraphicInfo.do";
                params["grphcId"] = this.id;
            } else {
                url = "/cmt/grph/insertGraphicInfo.do";
            }
            $.post(url, params)
                .done((response) => {
                    const result = JSON.parse(response);
                    if (result["result"]) {
                        toastr.success(`그리기가 저장 되었습니다.`);
                        // if (app2D) {
                        // const yMap = app2D.getYMap();
                        // const module = yMap.getModule("drawingTool");
                        // module.reset();
                        // } else {
                        // }
                        dtmap.draw.clear();
                        dtmap.draw.dispose();
                        new GraphicTool(1);
                    } else {
                        toastr.error(`그리기 저장에 실패했습니다.`);
                        console.log(result["errorMsg"]);
                    }
                })
                .fail(() => {
                    toastr.error(`그리기 저장에 실패했습니다.`);
                });
        }
    }

    /**
     * 취소
     */
    cancel(data) {
        // if (app2D) {
        //     const yMap = app2D.getYMap();
        //     const module = yMap.getModule("drawingTool");
        //     module.reset();
        // } else {
        // }
        dtmap.draw.clear();
        dtmap.draw.dispose();
        new GraphicTool(pageIndex, data);
    }

    /**
     * 삭제
     */
    remove() {
        const url = "/cmt/grph/deleteGraphicInfo.do";
        $.post(url, {grphcId: this.id})
            .done((response) => {
                const result = JSON.parse(response);
                if (result["result"]) {
                    alert(`그리기가 삭제 되었습니다.`);
                    // if (app2D) {
                    //     const yMap = app2D.getYMap();
                    //     const module = yMap.getModule("drawingTool");
                    //     module.reset();
                    // } else {
                    // }
                    dtmap.draw.clear();
                    dtmap.draw.dispose();
                    new GraphicTool(1);
                } else {
                    alert(`그리기 삭제에 실패했습니다.`);
                    console.log(result["errorMsg"]);
                }
            })
            .fail(() => {
                alert(`그리기 삭제에 실패했습니다.`);
            });
    }
}

