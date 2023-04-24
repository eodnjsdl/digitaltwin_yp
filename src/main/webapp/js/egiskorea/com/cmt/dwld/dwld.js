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
                if (status == "success") {
                    $("#rightPopup").html(returnData);
                    this.facility = store["facility"].getData();
                    this.loadSearchTarget();
                    this.bindEvents();
                    $(".tabBoxDepth1 ul li:first", this.selector).trigger("click");
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
        $(".tabBoxDepth1 ul li", that.selector).on("click", function () {
            dtmap.clear();
            dtmap.off('select');
            const node = $(this);
            const id = node.attr("data-id");
            $(".data-write tbody tr.tr_toggle", that.selector).hide();
            $(`.data-write tbody tr.${id}`, that.selector).show();
            if (id == "tr_area") {
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
            if (value == "extent") {
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
            var style = {
                fill: {
                    color: 'rgba(255,128,128,0.28)'
                },
                stroke: {
                    color: '#FF8080',
                    width: 4
                }
            };
            var promise = dtmap.wfsGetFeature({
                typeNames: layer, //WFS 레이어명
                bbox: dtmap.getExtent()
            });
            promise.then(function (data) {
                dtmap.vector.readGeoJson(data, style);
            });
        });
        //시설물기준 - 지도에서 선택
        $(".btn-select-map", that.selector)
            .off()
            .on("click", function () {
                const type = $("[name=standard-search-target]", that.selector).val();
                if (type.length !== 0) {
                    dtmap.on("select", (event) => {
                        var _feature = event.feature;
                        if (_feature) {
                            dtmap.vector.select(event.id);
                            const format = new ol.format.WKT();
                            const wkt = format.writeGeometry(_feature.getGeometry());
                            that.wkt = wkt;
                        } else {
                            toastr.warning("현재 화면에 검색영역이 존재하지 않습니다.");
                        }
                    });
                } else {
                    toastr.warning("검색영역을 지정해 주세요.");
                }
            });
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
     * 다운로드
     */
    download() {
        ui.loadingBar("show");
        const that = this;
        const params = {};
        const type = $(".tabBoxDepth1 ul li.on", this.selector).attr("data-id");
        const searchArea = $(
            "[name=download-search-area]:checked",
            this.selector
        ).val();
        const featureTypes = $(
            "[name=download-feature-type]:checked",
            this.selector
        );
        const param = {};
        if (featureTypes.length > 0) {
            if (type == "tr_area") {
                //현재화면영역
                if (searchArea == "extent") {
                    dtmap.clear();
                    params["buffer"] = $(".area-search-buffer", this.selector).val() || 0;
                    const extent = dtmap.getExtent();
                    const geometry = ol.geom.Polygon.fromExtent(extent);
                    params["wkt"] = cmmUtil.toWKT(geometry);
                    const format = new ol.format.WKT();
                    const geom = format.readGeometry(params["wkt"]);
                    const bufferedGeom = cmmUtil.toJstsGeometry(geom).buffer(Number(params["buffer"]));
                    const feature = new ol.Feature(cmmUtil.toOlGeometry(bufferedGeom));
                    const format2 = new ol.format.GeoJSON();
                    const geojson = format2.writeFeature(feature);
                    dtmap.draw.readGeoJson(geojson, {
                        fill: {
                            color: 'rgba(255,128,128,0.28)'
                        },
                        stroke: {
                            color: '#FF8080',
                            width: 4
                        },
                    });
                    const wkt = dtmap.draw.writeWKT();
                    if (wkt) {
                        params["wkt"] = wkt;
                    } else {
                        toastr.warning("검색 영역을 지정하여 주십시오.");
                        ui.loadingBar("hide");
                        return;
                    }
                    param.geometry = dtmap.draw.getGeometry();
                }  //사용자정의
                else if (searchArea == "custom") {
                    const wkt = dtmap.draw.writeWKT();
                    params["buffer"] = $(".area-search-buffer", this.selector).val() || 0;
                    if (wkt) {
                        params["wkt"] = wkt;
                    } else {
                        toastr.warning("검색 영역을 지정하여 주십시오.");
                        ui.loadingBar("hide");
                        return;
                    }
                    if (typeof dtmap.draw.getGeometry() !== 'undefined') {
                        param.geometry = dtmap.draw.getGeometry();
                    }
                } else {
                    toastr.warning("정의되지 않은 검색영역지정 타입입니다.");
                    ui.loadingBar("hide");
                }
            } //시설물기준
            else if (type == "tr_facility") {
                const wkt = this.wkt;
                if (wkt) {
                    params["wkt"] = wkt;
                    $("#facilitySelectList").trigger("change");
                    param.geometry = dtmap.vector.readWKT(wkt).get('geometry');
                } else {
                    toastr.warning("검색 기준 시설물을 선택하여 주십시오.");
                    ui.loadingBar("hide");
                    return;
                }
                params["buffer"] = $(".facility-search-buffer", this.selector).val() || 0;
            } else {
                toastr.warning("정의되지 않은 검색 기준입니다.");
                ui.loadingBar("hide");
            }
            params["dataIds"] = featureTypes
                .toArray()
                .map((featureType) => {
                    return $(featureType).attr("data-type");
                })
                .join();
            params["type"] = $("[name=download-type]:checked").val();
            param.typeNames = params["dataIds"].split(",");
            dtmap.wfsGetFeature(param).then(function (e) {
                if (e.totalFeatures > 0) {
                    dtmap.vector.readGeoJson(e);
                    that._fileDownload(params);
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
        // window.location.href = "/cmt/dwld/dataDownload.do?" + $.param(params);
        var url = "/cmt/dwld/dataDownload.do?" + $.param(params);
        const req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.onload = function() {
            const arrayBuffer = req.response;
            if (arrayBuffer) {
                var blob = new Blob([arrayBuffer], { type: "application/octetstream" });
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download= params.dataIds + "_" + cmmUtil.getTime() + ".zip";
                link.click();
                ui.loadingBar("hide");
            }
        };
        req.send();
    }

}
