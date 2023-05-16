/**
 * 레이어 내보내기
 */
function aj_dataDownload() {
    new DataDownlad();
}

/**
 * 데이터 내보내기
 */
class DataDownlad {
    /**
     * 생성자
     */
    constructor() {
        this.selector = "#rightPopup";
        this.render();
        this.wkt = null;

        this.drawStyle = {
            fill: {
                color: 'rgba(255,128,128,0.28)'
            },
            stroke: {
                color: '#FF8080',
                width: 4
            },
        }
    }

    /**
     * 표시
     */
    render() {
        ui.loadingBar("show");
        $.ajax({
            type: "POST",
            url: "/cmt/dwld/dataDownloadView.do",
            dataType: "html",
            async: false,
            success: (returnData, status) => {
                if (status === "success") {
                    $("#rightPopup").html(returnData);
                    this.facility = store["facility"].getData();
                    this.loadSearchTarget();
                    this.bindEvents();
                    $(".tabBoxDepth1 ul li button:first", this.selector).trigger("click");
                } else {
                    toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                    return;
                }
            },
            complete: function () {
                ui.loadingBar("hide");
            },
        });
    }

    /**
     * 초기화
     */
    reset() {
        // if (app2D) {
        //   cmmUtil.resetMap();
        // } else {
        //   Module.XDSetMouseState(1);
        //   var layerList = new Module.JSLayerList(true);
        //   layerList.delLayerAtName("POLYGON_LAYER");
        //   layerList.delLayerAtName("POI");
        //   layerList.delLayerAtName("MultiLineString");
        // }
        $("#download-search-area-extent", this.selector).prop("checked", true);
        $("#download-search-area-extent", this.selector).trigger("change");
        $(".area-search-buffer", this.selector).val(0);
        $("[name=standard-search-target]", this.selector).val("");
        $(".facility-search-buffer", this.selector).val(0);
        $("[name=download-type]:first", this.selector).trigger("click");
        $("[name=download-feature-type-all]", this.selector).prop("checked", false);
        $("[name=download-feature-type]", this.selector).prop("checked", false);
    }

    /**
     * 검색 대상 불러오기
     */
    loadSearchTarget() {
        // 데이터 및 필드 관리 테이블 구성 후 변경 예정
        let tag = ``;
        let dataTag = ``;
        tag += `<option value="">시설물</option>`;
        this.facility.forEach((item) => {
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
        $("[name=standard-search-target]", this.selector).html(tag);
        $(".data-list tbody", this.selector).html(dataTag);
    }

    /**
     * 이벤트 연결
     */
    bindEvents() {
        const that = this;
        // 검색 기준 변경
        $(".tabBoxDepth1 ul li button", that.selector).on("click", function () {
            dtmap.clear();
            dtmap.off('select');
            var parent = $(this).parent();
            const id = parent.attr("data-id");
            const mod = dtmap.mod;
            if (id === "tr_facility" && mod === "3D") {
                toastr.warning("2D지도에서만 사용 가능합니다.");
                return;
            }
            parent.addClass("on").siblings().removeClass("on");
            $("." + parent.data("tab")).addClass("on").siblings().removeClass("on");
            $(".data-write tbody tr.tr_toggle", that.selector).hide();
            $(`.data-write tbody tr.${id}`, that.selector).show();
            if (id === "tr_area") {
                $("[name=download-search-area]:checked", that.selector).trigger(
                    "change"
                );
            }
        });
        // 검색영역지정 변경 (현재화면영역, 사용자정의)
        $("[name=download-search-area]", that.selector).on("change", function () {
            dtmap.clear();
            const node = $(this);
            const value = node.val();
            if (value === "extent") {
                $(".tr_search_area", that.selector).hide();
                $(".th_search_area_span", that.selector).attr("rowspan", 2);
                // cmmUtil.drawClear();
            } else {
                $(".tr_search_area", that.selector).show();
                $(".th_search_area_span", that.selector).attr("rowspan", 3);
                $("[name=download-search-drawing]:first", that.selector).trigger(
                    "click"
                );
            }
        });
        // 사용자 정의 검색 조건
        $("[name=download-search-drawing]", that.selector).on("click", function () {
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
                dtmap.vector.readGeoJson(data, that.drawStyle);
            });
        });
        //시설물기준 - 지도에서 선택
        $(".btn-select-map", that.selector).off().on("click", function () {
                dtmap.clear();
                $("#facilitySelectList").trigger("change");
                const type = $("[name=standard-search-target]", that.selector).val();
                if (type.length !== 0) {
                    dtmap.off('select', that.onFacSelect);
                    dtmap.on("select", that.onFacSelect);
                } else {
                    toastr.warning("검색영역을 지정해 주세요.");
                }
            });
        //시설물 선택 이벤트리스너


        // 초기화
        $(".btn_reset", that.selector).on("click", function () {
            that.reset();
            dtmap.clear();
            dtmap.draw.setBuffer(0); // 버퍼해제
        });
        // 전체 선택 / 해제
        $("[name=download-feature-type-all]", that.selector).on(
            "change",
            function () {
                const node = $(this);
                $("[name=download-feature-type]", that.selector).prop(
                    "checked",
                    node.is(":checked")
                );
            }
        );
        // 내보내기
        $(".btn_downlaod", that.selector).on("click", function () {
            that.download();
            dtmap.off('select', that.onFacSelect);
        });
        //set buffer
        $(".area-search-buffer", that.selector).on("keyup", function (event) {
            // if (event.keyCode == "13") {
            //     $(".facility-spatial-search", that.container).trigger("click");
            // }
            dtmap.draw.setBuffer(Number(this.value));
        });
    }

    /**
     * 선택 이벤트
     */
    onFacSelect(e) {
        if (e.id) {
            dtmap.vector.select(e.id);
        } else {
            toastr.warning("현재 화면에 검색영역이 존재하지 않습니다.");
        }
    }

    /**
     * 다운로드
     */
    download() {
        ui.loadingBar("show");
        const that = this;
        const downParam = {};
        const type = $(".tabBoxDepth1 ul li.on", this.selector).attr("data-id");
        const searchArea = $(
            "[name=download-search-area]:checked",
            this.selector
        ).val();
        const featureTypes = $(
            "[name=download-feature-type]:checked",
            this.selector
        );
        let geometry, wkt;
        if (featureTypes.length > 0) {
            if (type === "tr_area") {
                //현재화면영역
                if (searchArea === "extent") {
                    dtmap.clear();
                    const buffer = Number($(".area-search-buffer", this.selector).val() || 0);
                    const extent = dtmap.getExtent();
                    geometry = ol.geom.Polygon.fromExtent(extent);
                    geometry = dtmap.util.getBufferGeometry(geometry, buffer);
                    dtmap.draw.addGeometry(geometry, this.drawStyle);
                    wkt = dtmap.draw.writeWKT();

                }  //사용자정의
                else if (searchArea === "custom") {
                    if(dtmap.vector.writeGeoJson()) {
                        dtmap.clear();
                        toastr.warning("새로운 검색영역을 지정해주세요.");
                        ui.loadingBar("hide");
                        return;
                    }
                    geometry = dtmap.draw.getGeometry();
                    wkt = dtmap.draw.writeWKT();
                } else {
                    toastr.warning("정의되지 않은 검색영역지정 타입입니다.");
                    ui.loadingBar("hide");
                }
            } //시설물기준
            else if (type === "tr_facility") {
                const selected = dtmap.vector.getSelected();
                if (selected && selected.length > 0) {
                    const buffer = Number($(".facility-search-buffer", this.selector).val() || 0);
                    const feature = selected[0];
                    geometry = feature.getGeometry();
                    geometry = dtmap.util.getBufferGeometry(geometry, buffer);
                    dtmap.draw.addGeometry(geometry, this.drawStyle);
                    wkt = dtmap.draw.writeWKT()
                    $("#facilitySelectList").trigger("change");
                } else {
                    toastr.error("지도에서 시설물을 선택해 주세요.");
                    ui.loadingBar("hide");
                    return;
                }
            } else {
                toastr.warning("정의되지 않은 검색 기준입니다.");
                ui.loadingBar("hide");
            }

            if (wkt) {
                downParam["wkt"] = wkt;
            } else {
                toastr.warning("검색영역을 지정하여 주십시오.");
                ui.loadingBar("hide");
                return;
            }

            downParam["dataIds"] = featureTypes
                .toArray()
                .map((featureType) => {
                    return $(featureType).attr("data-type");
                })
                .join();
            downParam["type"] = $("[name=download-type]:checked").val();
            dtmap.wfsGetFeature({
                typeNames: downParam["dataIds"].split(","),
                geometry: geometry
            }).then(function (e) {
                if (e.totalFeatures > 0) {
                    dtmap.vector.readGeoJson(e);
                    that._fileDownload(downParam);
                } else {
                    // dtmap.clear();
                    toastr.warning(`데이터가 존재하지 않습니다.`);
                    ui.loadingBar("hide");
                }
            })
        } else {
            toastr.warning(`데이터를 선택하여 주세요.`);
            ui.loadingBar("hide");
            return;
        }
    }

    _fileDownload(params) {
        const that = this;
        // window.location.href = "/cmt/dwld/dataDownload.do?" + $.param(params);
        var url = "/cmt/dwld/dataDownload.do?" + $.param(params);
        const req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onload = function () {
            const arrayBuffer = req.response;
            if (arrayBuffer) {
                var blob = new Blob([arrayBuffer], {type: "application/octetstream"});
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = params.dataIds + "_" + cmmUtil.getTime() + ".zip";
                link.click();
                ui.loadingBar("hide");
                that._disposeDrawGraphics();
            }
        };
        req.send();
    }

    _disposeDrawGraphics() {
        dtmap.draw.dispose();
        $('.drawing-obj span input:checked').prop("checked", false);
    }

}
