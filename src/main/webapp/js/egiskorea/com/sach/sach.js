let searchObj = null;

function aj_search() {
    // 최초 실행 시 한번만 생성
    if (!searchObj) {
        searchObj = new Search();
    }
}

/**
 * 검색
 */
class Search {
    /**
     * 생성자
     */
    constructor() {
        this.unity = new UnitySearch();
        this.address = new AddressSearch();
        this.spatial = new SpatialSearch();
        this.bindEvents();
    }

    /**
     * 이벤트 연결
     */
    bindEvents() {
        const that = this;

        // 검색 초기화
        $(".lnb-search .lnb-resetBtn").on("click", function () {
            // cmmUtil.resetMap();
            dtmap.clear();
            that.unity.reset();
            that.address.reset();
            that.spatial.reset();
        });

        // 닫기
        $(".lnb-search .lnb-close").on("click", function () {
            $(".lnb-search").stop().fadeOut(100);
            $("#lnb li[data-menu]").removeClass("on");
            // cmmUtil.resetMap();
            dtmap.clear();
        });
    }
}

/**
 * 통합 검색
 */
class UnitySearch {
    /**
     * 생성자
     */
    constructor() {
        this.selector = ".searchTotal";
        this.searchType = null;
        this.params = {listSize: 10, pageSize: 5};
        this.list = [];
        this.bindEvents();
        // this.load();
    }

    /**
     * 초기화
     */
    reset() {
        //키워드.
        $(".total-keyword", this.selector).val("");
        //검색갯수
        $(".bbs-list-num strong", this.selector).text(0);
        //검색 리스트.
        $(".search-list", this.selector).html("");
    }

    /**
     * 이벤트 연결
     */

    bindEvents() {
        const that = this;
        // 주소 검색
        $(".total-search", that.selector).on("click", function () {
            that.params["page"] = 0;
            that.params["pageIndex"] = 1;
            that.searchTotal();
        });

        $(".total-keyword", that.selector).on("keydown", function (event) {
            if (event.keyCode == "13") {
                $(".total-search", that.selector).trigger("click");
            }
        });

        // 목록 선택
        $(".search-list", this.selector).on("click", "li", function () {
            const node = $(this);
            node.siblings().removeClass("active");
            node.addClass("active");

            const sn = parseInt(node.attr("data-sn"));
            that.showFeature(sn);
        });

        $(".bi-excel", that.selector).on("click", function () {
            if (that.params["nm"]) {
                const form = $("#excel_form", that.selector)[0];
                $(".hidden-total-keyword", form).val(that.params["nm"]);
                form.setAttribute(
                    "action",
                    "/sach/Unty/selectUntyExcelListDownload.do"
                );
                form.submit();
            } else {
                toastr.warning("검색 결과가 존재하지 않습니다.");
            }
        });
    }

    searchTotal() {
        const that = this;
        const nm = $(".total-keyword", this.selector).val();
        if (nm == null || nm == "") {
            toastr.warning("검색어를 입력해 주세요.");
            return false;
        }

        this.params["nm"] = nm;
        ui.loadingBar("show");
        $.ajax({
            url: "/sach/Unty/searchTotal.do",
            type: "POST",
            data: this.params,
        }).done(function (res) {
            this.searchType = "total";
            const result = JSON.parse(res);
            that.createResults(result, that.searchTotal);
            ui.loadingBar("hide");
        });
    }

    /**
     * 결과 생성
     * @param {Object} result 검색 결과
     * @param {Function} search 검색 함수
     */
    createResults(result, search) {
        const that = this;
        const totalFeatures = result["paginationInfo"]["totalRecordCount"];
        this.params["total"] = totalFeatures;
        this.list = result["resultList"];
        $(".bbs-list-num strong", this.selector).text(totalFeatures);
        if (totalFeatures == 0) {
            $(".search-empty", this.selector).show();
            $(".searchResult-wrap", this.selector).hide();
        } else {
            const tags = this.list.map((item, index) => {
                let tag = ``;
                tag += `<li data-sn="${index}" >`;
                tag += `  <a href="javascript:void(0);">`;
                tag += `<p class="name">` + item["nm"] + `</p>`;
                tag += `  </a>`;
                tag += `</li>`;
                return tag;
            });
            $(".search-list", this.selector).html(tags.join(""));
            new Paging(`${this.selector} .pagination`, this.params, (page) => {
                this.params["page"] = page;
                this.params["pageIndex"] = page + 1;
                this.searchTotal();
            });
            $(".search-empty", this.selector).hide();
            $(".searchResult-wrap", this.selector).show();
        }
    }

    /**
     * 도형 표시
     * @param {number} sn 순번
     */
    showFeature(sn) {
        const wkt = this.list[sn]["wkt"];
        const nm = this.list[sn]["nm"];
        const reader = new ol.format.WKT();
        const feature = new ol.Feature(reader.readGeometry(wkt));
        feature.setId("this");
        const features = [];
        features.push(feature);
        const format = new ol.format.GeoJSON();
        const geojson = format.writeFeatures(features);
        dtmap.vector.clear();
        //지도에 GeoJSON 추가
        dtmap.vector.readGeoJson(geojson, function (feature) {
            return {
                marker: {
                    src: '/images/poi/nomal_poi.png'
                },
                label: {
                    text: nm
                }
            }
        });
        dtmap.vector.select(feature.getId());
        // cmmUtil.highlightGeometry(wkt, './images/poi/nomal_poi.png');
    }
}

/**
 * 주소 검색
 */
class AddressSearch {
    /**
     * 생성자
     */
    constructor() {
        this.selector = ".searchAddr";
        this.searchType = null;
        this.params = {listSize: 10, pageSize: 5};
        this.list = [];
        this.bindEvents();
        this.load();
    }

    /**
     * 초기화
     */
    reset() {
        $(".search-address-emd option:first", this.selector).prop("selected", true);
        $(".search-address-emd", this.selector).trigger("change");
        $(".search-road-emd option:first", this.selector).prop("selected", true);
        $(".search-road-emd", this.selector).trigger("change");
        $(".search-address-mnnm", this.selector).val("");
        $(".search-address-slno", this.selector).val("");
        $(".search-road-mnnm", this.selector).val("");
        $(".search-road-slno", this.selector).val("");
        $(".bbs-list-num strong", this.selector).text(0);
        $(".search-empty", this.selector).show();
        $(".search-list", this.selector).html("");
        $(".searchResult-wrap", this.selector).hide();
    }

    /**
     * 이벤트 연결
     */
    bindEvents() {
        const that = this;

        // 읍면동 선택 시 '리' 표시
        $(".search-address-emd", that.selector).on("change", function () {
            const node = $(this);
            const emdCd = node.val();
            that.loadLi(emdCd);
        });

        // 읍면동 선택 시 '도로명' 표시
        $(".search-road-emd", that.selector).on("change", function () {
            const node = $(this);
            const emdCd = node.val();
            that.loadRn(emdCd);
        });

        // 주소 검색
        $(".search-address-search", that.selector).on("click", function () {
            that.params["page"] = 0;
            that.params["pageIndex"] = 1;
            that.searchAddress();
        });
        $(".search-address-mnnm", that.selector).on("keydown", function (event) {
            if (event.keyCode == "13") {
                $(".search-address-search", that.selector).trigger("click");
            }
        });
        $(".search-address-slno", that.selector).on("keydown", function (event) {
            if (event.keyCode == "13") {
                $(".search-address-search", that.selector).trigger("click");
            }
        });

        // 도로명 주소 검색
        $(".search-road-search", that.selector).on("click", function () {
            that.params["page"] = 0;
            that.params["pageIndex"] = 1;
            that.searchRoadAddress();
        });
        $(".search-road-mnnm", that.selector).on("keydown", function (event) {
            if (event.keyCode == "13") {
                $(".search-road-search", that.selector).trigger("click");
            }
        });
        $(".search-road-slno", that.selector).on("keydown", function (event) {
            if (event.keyCode == "13") {
                $(".search-road-search", that.selector).trigger("click");
            }
        });

        // 목록 선택
        $(".search-list", this.selector).on("click", "li", function () {
            const node = $(this);
            node.siblings().removeClass("active");
            node.addClass("active");
            const sn = parseInt(node.attr("data-sn"));
            that.showFeature(sn);
        });
    }

    /**
     * 읍면동
     */
    load() {
        ui.loadingBar("show");
        store.emd.getData().done((features) => {
            const sorted = util.array.sort(features, "emd_kor_nm");
            const tags = sorted.map((feature) => {
                return `<option value="${feature.get("emd_cd")}">${feature.get(
                    "emd_kor_nm"
                )}</option>`;
            });
            $(".search-address-emd", this.selector).html(tags.join(""));
            $(".search-address-emd", this.selector).trigger("change");
            $(".search-road-emd", this.selector).html(tags.join(""));
            $(".search-road-emd", this.selector).trigger("change");
            ui.loadingBar("hide");
        });
    }

    /**
     * 리
     * @param {string} emdCd 읍면동코드
     */
    loadLi(emdCd) {
        ui.loadingBar("show");
        const filter = ol.format.filter.like("li_cd", `${emdCd}*`);
        util.gis
            .getFeature(["tgd_scco_li"], filter, null, null, [
                "gid",
                "li_cd",
                "li_kor_nm",
            ])
            .done((geojson) => {
                try {
                    const format = new ol.format.GeoJSON();
                    const features = format.readFeatures(geojson);
                    const sorted = util.array.sort(features, "li_kor_nm");
                    const tags = sorted.map((feature) => {
                        return `<option value="${feature.get("li_cd")}">${feature.get(
                            "li_kor_nm"
                        )}</option>`;
                    });
                    $(".search-address-li", this.selector).html(
                        `<option value="">선택</option>${tags.join("")}`
                    );
                } catch (error) {
                    console.log(`리 을 가져오는데 실패했습니다.`);
                } finally {
                    ui.loadingBar("hide");
                }
            });
    }

    /**
     * 도로명
     * @param {string} emdCd 읍면동코드
     */
    loadRn(emdCd) {
        ui.loadingBar("show");
        const filter = ol.format.filter.equalTo("emd_cd", emdCd);
        //util.gis.getFeature(["v_tgd_sprd_rn"], filter).done((geojson) => {
        util.gis
            .getFeature(["tgd_sprd_rn"], filter, null, null, [
                "gid",
                "rn_cd",
                "rn",
                "emd_cd",
            ])
            .done((geojson) => {
                try {
                    const format = new ol.format.GeoJSON();
                    const features = format.readFeatures(geojson);
                    const sorted = util.array.sort(features, "rn");
                    const tags = sorted.map((feature) => {
                        return `<option value="${feature.get("rn_cd")}">${feature.get(
                            "rn"
                        )}</option>`;
                    });
                    $(".search-road-rn", this.selector).html(
                        `<option value="">선택</option>${tags.join("")}`
                    );
                } catch (error) {
                    console.log(`도로명을 가져오는데 실패했습니다.`);
                } finally {
                    ui.loadingBar("hide");
                }
            });
        ui.loadingBar("hide");
    }

    /**
     * 주소 검색
     */
    searchAddress() {
        const emdCd = $(".search-address-emd", this.selector).val();
        const liCd = $(".search-address-li", this.selector).val();
        const mntn = $(".search-address-mntn", this.selector).is(":checked")
            ? "2"
            : "_";
        const mnnm = $(".search-address-mnnm", this.selector).val();
        const slno = $(".search-address-slno", this.selector).val();

        let pnu = "";
        if (liCd) {
            pnu += liCd;
        } else {
            pnu += emdCd + "__";
        }
        pnu += mntn;
        if (mnnm) {
            pnu += mnnm.padStart(4, "0");
        } else {
            pnu += "____";
        }
        if (slno) {
            pnu += slno.padStart(4, "0");
        } else {
            pnu += "____";
        }
        this.params["pnu"] = pnu;
        ui.loadingBar("show");
        $.post("/sach/adr/searchAddress.do", this.params)
            .done((response) => {
                this.searchType = "address";
                const result = JSON.parse(response);
                this.createResults(result, this.searchAddress);
                ui.loadingBar("hide");
            })
            .fail(() => {
                toastr.warning("주소 검색에 실패하였습니다.");
                ui.loadingBar("hide");
            });
    }

    /**
     * 도로명 주소 검색
     */
    searchRoadAddress() {
        const emdCd = $(".search-road-emd", this.selector).val();
        const rnCd = $(".search-road-rn", this.selector).val();
        const mnnm = $(".search-road-mnnm", this.selector).val();
        const slno = $(".search-road-slno", this.selector).val();

        if (rnCd) {
            this.params["rnCd"] = rnCd;
            this.params["emdCd"] = "";
        } else {
            this.params["rnCd"] = "";
            this.params["emdCd"] = emdCd.substring(5, 8);
        }
        this.params["mnnm"] = mnnm || "";
        this.params["slno"] = slno || "";

        ui.loadingBar("show");
        $.post("/sach/adr/searchRoadAddress.do", this.params)
            .done((response) => {
                this.searchType = "roadAddress";
                const result = JSON.parse(response);
                this.createResults(result, this.searchRoadAddress);
                ui.loadingBar("hide");
            })
            .fail(() => {
                toastr.warning("도로명 주소 검색에 실패하였습니다.");
                ui.loadingBar("hide");
            });
    }

    /**
     * 결과 생성
     * @param {Object} result 검색 결과
     * @param {Function} search 검색 함수
     */
    createResults(result, search) {
        const totalFeatures = result["paginationInfo"]["totalRecordCount"];
        this.params["total"] = totalFeatures;
        this.list = result["resultList"];
        $(".bbs-list-num strong", this.selector).text(totalFeatures);
        if (totalFeatures == 0) {
            $(".search-empty", this.selector).show();
            $(".searchResult-wrap", this.selector).hide();
        } else {
            const tags = this.list.map((item, index) => {
                let tag = ``;
                tag += `<li data-sn="${index}" >`;
                tag += `  <a href="javascript:void(0);">`;
                if (item["rn"]) {
                    let text = ``;
                    text += item["rn"] + ` `;
                    text += item["buldMnnm"];
                    text += parseInt(item["buldSlno"])
                        ? `-${parseInt(item["buldSlno"])}`
                        : ``;
                    tag += `<p class="addr road"><span class="cate">도로명</span>${text}</p>`;
                }
                if (item["emdKorNm"]) {
                    let text = ``;
                    text += item["emdKorNm"] + ` `;
                    text += item["liKorNm"] + ` `;
                    text += item["mntnYn"] == "2" ? `산 ` : ``;
                    text += parseInt(item["lnbrMnnm"]);
                    text += parseInt(item["lnbrSlno"])
                        ? `-${parseInt(item["lnbrSlno"])}`
                        : ``;
                    tag += `<p class="addr jibun"><span class="cate">지번</span>${text}</p>`;
                }
                tag += `  </a>`;
                tag += `</li>`;
                return tag;
            });
            $(".search-list", this.selector).html(tags.join(""));
            new Paging(`${this.selector} .pagination`, this.params, (page) => {
                this.params["page"] = page;
                this.params["pageIndex"] = page + 1;
                if (this.searchType == "address") {
                    this.searchAddress();
                } else {
                    this.searchRoadAddress();
                }
            });
            $(".search-empty", this.selector).hide();
            $(".searchResult-wrap", this.selector).show();
        }
    }

    /**
     * 도형 표시
     * @param {number} sn 순번
     */
    showFeature(sn) {
        const wkt = this.list[sn]["wkt"];
        let text = ``;
        if (this.list[sn]["rn"]) {
            text += this.list[sn]["rn"] + ` `;
            text += this.list[sn]["buldMnnm"];
            text += parseInt(this.list[sn]["buldSlno"])
                ? `-${parseInt(this.list[sn]["buldSlno"])}`
                : ``;
        } else {
            text += this.list[sn]["emdKorNm"] + ` `;
            text += this.list[sn]["liKorNm"] + ` `;
            text += this.list[sn]["mntnYn"] == "2" ? `산 ` : ``;
            text += parseInt(this.list[sn]["lnbrMnnm"]);
            text += parseInt(this.list[sn]["lnbrSlno"])
                ? `-${parseInt(this.list[sn]["lnbrSlno"])}`
                : ``;
        }
        const reader = new ol.format.WKT();
        const feature = new ol.Feature(reader.readGeometry(wkt));
        feature.setId("this");
        const features = [];
        features.push(feature);
        const format = new ol.format.GeoJSON();
        const geojson = format.writeFeatures(features);
        dtmap.vector.clear();
        dtmap.vector.readGeoJson(geojson, function (feature) {
            return {
                marker: {
                    src: '/images/poi/nomal_poi.png'
                },
                label: {
                    text: text
                }
            }
        });
        dtmap.vector.select(feature.getId());
    }
}

/**
 * 공간 검색
 */
class SpatialSearch {
    /**
     * 생성자
     */
    constructor() {
        this.selector = ".searchArea";
        this.facility = store["facility"].getData();
        this.params = {
            listSize: 10,
            pageSize: 5,
        };
        this.features = null;
        this.loadSearchTarget();
        this.bindEvents();
        $("[name=rad-search-area]:checked", this.selector).trigger("change");
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
     * 초기화
     */
    reset() {
        $("select", this.selector).val("");
        $("#rad-search-area-extent", this.selector).prop("checked", true);
        $("#rad-search-area-extent", this.selector).trigger("change");
        $(".area-search-buffer", this.selector).val(0);
        $(".facility-search-buffer", this.selector).val(0);
        $(".bbs-list-num strong", this.selector).text(0);
        $(".search-list", this.selector).empty();
    }

    /**
     * 검색 대상 불러오기
     */
    loadSearchTarget() {
        // 데이터 및 필드 관리 테이블 구성 후 변경 예정
        let tag = ``;
        tag += `<option value="">시설물</option>`;
        this.facility.forEach((item) => {
            const name = item["tblNm"].toLowerCase();
            const title = item["lyrNm"];
            tag += `<option value="${name}">${title}</option>`;
        });
        $("[name=area-search-target]", this.selector).html(tag);
        $("[name=facility-search-target]", this.selector).html(tag);
        $("[name=standard-search-target]", this.selector).html(tag);
    }

    /**
     * 이벤트 연결
     */
    bindEvents() {
        const that = this;
        // 검색 기준 변경
        $(".tabBoxDepth2 ul li", that.selector).on("click", function () {
            dtmap.clear();
            dtmap.off('select');
            // const node = $(this);
            // const id = node.attr("data-id");
            var totalFeatures = 0;
            that.params["total"] = totalFeatures;
            $(".bbs-list-num strong", this.selector).text(totalFeatures);
            $(".search-empty", this.selector).show();
            $(".searchResult-wrap", this.selector).hide();
        });

        // 검색영역지정 변경 (현재화면영역, 사용자정의)
        $("[name=rad-search-area]", that.selector).on("change", function (event) {
            dtmap.clear();
            const node = $(this);
            const value = node.val();
            if (value == "extent") {
                $(".space-search-area", that.selector).hide();
            } else {
                $(".space-search-area", that.selector).show();
                $("[name=rad-search-drawing]:first", that.selector).trigger("click");
            }
        });

        // 사용자 정의 검색 조건
        $("[name=rad-search-drawing]", that.selector).on("click", function () {
            // const node = $(this);
            // const type = node.val();
            // cmmUtil.spitalDraw(type);
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
        $("#standard-search-target").on("change", function () {
            dtmap.clear();
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

        // 공간검색 시설물기준 - 지도에서 선택
        $(".btn-select-map", that.selector).off().on("click", function () {
            $("#standard-search-target").trigger("change");
            const type = $("[name=standard-search-target]", that.selector).val();
            if (type.length !== 0) {
                dtmap.off('select', that.onFacSelect);
                dtmap.on("select", that.onFacSelect);
            } else {
                toastr.warning("검색영역을 지정해 주세요.");
            }
            // if (mapType == "2D") {
            //     if (type) {
            //         toastr.warning("기준시설물 지도상에 선택후 검색을 클릭 하세요.");
            //         cmmUtil.selectFacility(type);
            //     } else {
            //         toastr.warning("기준 시설물을 선택하여 주십시오.");
            //         $("[name=standard-search-target]", that.selector).focus();
            //     }
            // } else {
            //     if (type) {
            //         if (GLOBAL.layerBox != null) {
            //             delWfSLayer(GLOBAL.layerBox);
            //         }
            //         var layerList = new Module.JSLayerList(true);
            //         var layer = layerList.nameAtLayer("BUFFER_POLYGON_LAYER");
            //         if (layer != null) {
            //             layer.removeAll();
            //         }
            //
            //         Module.XDSetMouseState(6);
            //         Module.XDRenderData();
            //
            //         createLayerWfS(type, GLOBAL.layerBox);
            //     } else {
            //         toastr.warning("기준 시설물을 선택하여 주십시오.");
            //         $("[name=standard-search-target]", that.selector).focus();
            //     }
            // }
        });

        // 영역기준 검색
        $(".areaSearchArea .search", that.selector).on("click", function () {
            that.searchArea();
        });
        $(".area-search-buffer", that.selector).on("keyup", function (event) {
            dtmap.draw.setBuffer(Number(this.value));
            if (event.keyCode == "13") {
                $(".areaSearchArea .search", that.selector).trigger("click");
            }
        });

        // 시설물 기준 검색
        $(".addrSearchfacility .search", that.selector).on("click", function () {
            that.searchFacility();
        });
        $(".facility-search-buffer", that.selector).on("keydown", function (event) {
            dtmap.draw.setBuffer(Number(this.value));
            if (event.keyCode == "13") {
                $(".addrSearchfacility .search", that.selector).trigger("click");
            }
        });

        // 목록 선택
        $(".search-list", this.selector).on("click", "li", function () {
            const node = $(this);
            node.siblings().removeClass("active");
            node.addClass("active");
            const id = node.attr("data-id");
            that.showFeature(id);
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
     * 영역 검색
     */
    searchArea() {
        const featureType = $("[name=area-search-target]", this.selector).val();
        if (featureType) {
            const filter = this.getAreaFilter();
            if (filter) {
                this.params["featureType"] = featureType;
                this.params["filter"] = filter;
                this.params["page"] = 0;
                this.params["title"] = $(
                    "[name=area-search-target] option:selected",
                    this.selector
                ).text();
                this.search();
            } else {
                $("[name=rad-search-drawing]:first", this.selector).trigger("click");
                toastr.warning("검색영역을 선택하여 주십시오.");
            }
        } else {
            toastr.warning("검색대상을 선택하여 주십시오.");
            $("[name=area-search-target]", this.selector).focus();
        }
    }

    /**
     * 검색조건 가져오기
     * @returns {ol.format.filter.dwithin} 검색조건
     */
    getAreaFilter() {
        const format = new ol.format.WKT();
        let buffer = $(".area-search-buffer", this.selector).val();
        const searchAreaType = $(
            "[name=rad-search-area]:checked",
            this.selector
        ).val();
        let geometry = null;
        if (searchAreaType == "extent") {
            // const extent = cmmUtil.getMapExtent();
            // geometry = cmmUtil.toSystemProjection(
            //     cmmUtil.toPolygonFromExtent(extent)
            // );
            const extent = dtmap.getExtent();
            geometry = ol.geom.Polygon.fromExtent(extent);
            geometry = dtmap.util.getBufferGeometry(geometry, buffer);

        } else if (searchAreaType == "custom") {
            // const wkt = cmmUtil.getSelectFeatureWKT();
            // if (wkt) {
            //     geometry = format.readGeometry(wkt);
            // }
            geometry = dtmap.draw.getGeometry();
            // wkt = dtmap.draw.writeWKT();
        }
        if (geometry) {
            // const wkt = format.writeGeometry(geometry);
            // cmmUtil.showBufferGeometry(wkt, buffer);
            return ol.format.filter.dwithin("geom", geometry, buffer, dtmap.crs);
        } else {
            return null;
        }
    }

    /**
     * 시설물 검색
     */
    searchFacility() {
        dtmap.off('select', this.onFacSelect);
        const featureType = $("[name=facility-search-target]", this.selector).val();
        if (featureType) {
            const filter = this.getFacilityFilter();
            if (filter) {
                this.params["featureType"] = featureType;
                this.params["filter"] = filter;
                this.params["page"] = 0;
                this.params["listSize"] = 10;
                this.params["title"] = $(
                    "[name=facility-search-target] option:selected",
                    this.selector
                ).text();
                this.search();
            } else {
                toastr.error("지도에서 시설물을 선택해 주세요.");
            }
        } else {
            toastr.warning("검색대상을 선택하여 주십시오.");
            $("[name=area-search-target]", this.selector).focus();
        }
    }

    /**
     * 검색조건 가져오기
     * @returns {ol.format.filter.dwithin} 검색조건
     */
    getFacilityFilter() {

        const format = new ol.format.WKT();
        let buffer = $(".facility-search-buffer", this.selector).val();
        let geometry = null;

        const selected = dtmap.vector.getSelected();
        if (selected && selected.length > 0) {
            const feature = selected[0];
            geometry = feature.getGeometry();
            geometry = dtmap.util.getBufferGeometry(geometry, buffer);
            dtmap.draw.addGeometry(geometry, this.drawStyle);
        } else {
            // toastr.warning("검색 기준 시설물을 선택하여 주십시오.");
            ui.loadingBar("hide");
            return;
        }
        // let buffer = $(".facility-search-buffer", this.selector).val();
        // const wkt = cmmUtil.getSelectFeatureWKT();
        // let geometry = null;
        // if (wkt) {
        //     const format = new ol.format.WKT();
        //     geometry = format.readGeometry(wkt);
        //     cmmUtil.showBufferGeometry(wkt, buffer);
        // }
        if (geometry) {
            return ol.format.filter.dwithin("geom", geometry, buffer, dtmap.crs);
        } else {
            return null;
        }
    }

    /**
     * 검색
     */
    search() {
        const format = new ol.format.GeoJSON();
        const featureType = this.params["featureType"];
        const filter = this.params["filter"];
        const listSize = this.params["listSize"];
        const page = this.params["page"];
        ui.loadingBar("show");
        let param = {
            typeNames: "digitaltwin:" + featureType,
            // filter : filter,
            page: page + 1,
            perPage: listSize,
            sortBy: "gid"
        };
        const geometry = filter.geometry.clone();
        param.geometry = geometry;
        let totalFeatures = 0;
        var that = this;
        dtmap.wfsGetFeature(param).then(function (e) {
            that.features = e.features;
            dtmap.vector.clear();
            if (e.features.length === 0) {
                toastr.warning('검색결과가 없습니다.');
            }
            dtmap.vector.readGeoJson(e, function (feature) {

                let text = feature.get("label") ||
                    feature.get("ftr_idn") ||
                    feature.get("gid");

                return {
                    stroke: {
                        color: '#ff0000'
                    },
                    label: {
                        text: text.toString()
                    }
                }
            });
            // dtmap.vector.fit();
            that.createResults(e.totalFeatures, that.features);
        });
        dtmap.vector.clearSelect();
        ui.loadingBar("hide");
    }

    /**
     * 결과 생성
     * @param {number} totalFeatures 총 수
     * @param {Array.<numbeR>} features 도형 목록
     */
    createResults(totalFeatures, features) {
        this.params["total"] = totalFeatures;
        $(".bbs-list-num strong", this.selector).text(totalFeatures);

        if (totalFeatures == 0) {
            $(".search-empty", this.selector).show();
            $(".searchResult-wrap", this.selector).hide();
        } else {
            let tag = ``;
            features.forEach((feature) => {
                // const properties = feature.getProperties();
                const properties = feature.properties;
                let facility = this.facility.find((item) => {
                    const name = item["tblNm"].toLowerCase();
                    // return feature.getId().startsWith(name);
                    return feature.id.startsWith(name);
                });

                if (facility) {
                    const text =
                        properties["label"] ||
                        // properties[facility["lblField"]] ||
                        properties["ftr_idn"] ||
                        properties["gid"];
                    tag += `<li data-id="${feature.id}" ><a href="javascript:void(0);">[${
                        this.params["title"]
                    }] ${text}</a></li>`;
                } else {
                    console.log(
                        `데이터가 정의되지 않았습니다. Store에 데이터를 정의하여 주십시오.`
                    );
                }
            });
            $(".search-list", this.selector).html(tag);

            new Paging(`${this.selector} .pagination`, this.params, (page) => {
                this.params["page"] = page;
                this.search();
            });

            $(".search-empty", this.selector).hide();
            $(".searchResult-wrap", this.selector).show();
        }
    }

    /**
     * 도형 표시
     * @param {string} id 아이디
     */
    showFeature(id) {
        const findFeature = this.features.find((feature) => feature.id == id);
        dtmap.vector.select(findFeature.id);
        // const format = new ol.format.WKT();
        // const wkt = format.writeGeometry(findFeature.geometry);
        // cmmUtil.moveGeometry(wkt);
    }
}
