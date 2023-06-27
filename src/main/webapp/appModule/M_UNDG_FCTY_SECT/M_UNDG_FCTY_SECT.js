/**
 * 지하시설단면도
 */
var M_UNDG_FCTY_SECT = {
    /**
     * 초기화
     */
    init() {
        this.selector = ".under-facility-analysis";
        this.rdls = {};
        this.facs = {
            wtl_pipe_lm: {
                title: "상수관로",
                color: "rgba(0, 128, 255, 1)",
                lowDep: "low_dep",
                higDep: "hgh_dep",
                avgDep: "",
                dip: "std_dip",
                dipType: "",
                dipHol: "",
                dipVel: "",
            },
            swl_pipe_lm: {
                title: "하수관로",
                color: "rgba(153, 0, 133, 1)",
                lowDep: "beg_dep",
                higDep: "end_dep",
                avgDep: "",
                dip: "std_dip",
                dipType: "for_cde",
                dipHol: "std_hol",
                dipVel: "std_vel",
            },
            ufl_bcon_lm: {
                title: "배전전력구",
                color: "rgba(165, 102, 255, 1)",
                lowDep: "",
                higDep: "",
                avgDep: "std_dep",
                // 관경의 수치값이 이상한듯하여 사용안함 (너비값이 0.2 ~ 66 까지 보임)
                dip: "",
                dipType: "",
                dipHol: "",
                dipVel: "",
            },
            ufl_bpip_lm: {
                title: "전력지중관로",
                color: "rgba(71, 200, 62, 1)",
                lowDep: "",
                higDep: "",
                avgDep: "std_dep",
                dip: "std_dip",
                dipType: "",
                dipHol: "",
                dipVel: "",
            },
            ufl_gpip_lm: {
                title: "천연가스배관",
                color: "rgba(255, 167, 167, 1)",
                lowDep: "",
                higDep: "",
                avgDep: "std_dep",
                dip: "std_dip",
                dipType: "",
                dipHol: "",
                dipVel: "",
            },
            ufl_kpip_ls: {
                title: "통신선로",
                color: "rgba(204, 114, 61, 1)",
                lowDep: "",
                higDep: "",
                avgDep: "std_dep",
                dip: "std_dip",
                dipType: "",
                dipHol: "",
                dipVel: "",
            },
        };
        this.geometry = null;
        this.features = null;
        this.bindEvents();
    },

    /**
     * 소멸자
     */
    destroy() {
        this.features = null;
        this.geometry = null;
        this.data = null;
        $(this.selector).remove();
        this.selector = null;
        dtmap.off('drawend', this.drawend);
    },

    /**
     * 이벤트 연결
     */
    bindEvents() {
        const that = this;

        // 접기/펼치기
        $(".popup-toggle", that.selector).on("click", function () {
            $(this).parent().toggleClass("fold");
            if ($(this).parent().hasClass("fold")) {
                $(this).attr("title", "펼치기");
            } else {
                $(this).attr("title", "접기");
            }
        });

        // 단면 위치 설정
        $(".btn-set-location", that.selector).on("click", function () {
            that.select();
        });

        // 다운로드
        $(".btn-download", that.selector).on("click", function () {
            that.download();
        });
    },

    /**
     * 단면위치 설정
     */
    select() {
        toastr.warning("지도에 분석할 두 지점을 선택하세요.");
        dtmap.draw.clear();
        dtmap.draw.active({
            type: 'LineString',
            once: true
        });
        dtmap.off('drawend', this.drawend);
        dtmap.on('drawend', this.drawend);
    },

    /**
     * 분석
     */
    analysis(geometry) {
        this.geometry = geometry;
        if (this.geometry) {
            const featureTypes = [];
            for (const [key, value] of Object.entries(this.facs)) {
                featureTypes.push(key);
            }
            dtmap.wfsGetFeature({
                typeNames: featureTypes,
                geometry: this.geometry,
                crs: 'EPSG:5179'
            }).then((e) => {
                const format = new ol.format.GeoJSON();
                this.features = format.readFeatures(e);
                this.renderChart();
                this.renderLegend();
            });
        }
    },

    /**
     * 차트 표시
     */
    renderChart() {
        const canvas = $(
            `<canvas class="analysis-chart" width="1270" height="218"></canvas>`
        );
        $(".chart-items", this.selector).html(canvas);

        const parser = new jsts.io.OL3Parser();
        const gLine = parser.read(this.geometry.clone());
        const len = gLine.getLength();

        const labels = [];
        for (let i = 0; i < len; i += 10) {
            labels.push(i);
        }
        const datasets = [];

        const start = gLine.getStartPoint();
        this.features.forEach((feature) => {
            const tableName = feature.getId().split(".")[0];
            const geometry = parser.read(feature.getGeometry().clone());
            const point = geometry.intersection(gLine);
            if (this.facs[tableName]) {
                const fac = this.facs[tableName];
                const radius = 5 + this.getDip(fac, feature);
                const dist = this.calcRoundDp1(
                    jsts.operation.distance.DistanceOp.distance(start, point)
                );
                const dep = this.getDep(fac, feature);
                let dataset = datasets.find(
                    (dataset) => dataset["label"] == fac["title"]
                );
                if (!dataset) {
                    dataset = {
                        label: fac["title"],
                        borderColor: fac.color,
                        backgroundColor: fac.color,
                        data: [],
                        order: 1,
                    };
                    datasets.push(dataset);
                }
                dataset["data"].push({
                    x: dist,
                    y: dep,
                    r: radius,
                });
            }
        });

        const highlightPoint = this.highlightPoint.bind(this);
        const ctx = canvas[0].getContext("2d");
        new Chart(ctx, {
            type: "bubble",
            data: {labels, datasets},
            options: {
                responsive: true,
                plugins: {
                    legend: false,
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context["label"]} : ${context["raw"]["y"]}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        min: 0,
                        max: len,
                    },
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 10,
                        reverse: true,
                    },
                },
            },
            plugins: [
                {
                    id: "myEventCatcher",
                    beforeEvent(chart, args) {
                        const event = args.event;
                        if (event.type === "mouseout") {
                            highlightPoint();
                        } else if (event.type === "mousemove") {
                            const fraction =
                                (event.x - chart.chartArea.left) /
                                (chart.chartArea.right - chart.chartArea.left);
                            if (fraction >= 0 && fraction <= 1) {
                                highlightPoint(fraction);
                            } else {
                                highlightPoint();
                            }
                        }
                    },
                },
            ],
        });
    },

    /**
     * 범례 표시
     */
    renderLegend() {
        const list = {};
        this.features.forEach((feature) => {
            const tableName = feature.getId().split(".")[0];
            if (!list[tableName] && this.facs[tableName]) {
                list[tableName] = this.facs[tableName];
            }
        });
        let tags = ``;
        for (const [key, value] of Object.entries(list)) {
            tags += `<li><span class="cate" style="background-color:${value["color"]}"></span>${value["title"]}</li>`;
        }
        $(".legend-items", this.selector).html(tags);
    },

    /**
     * 마우스 위치 지점 표시
     * @param {number} fraction 분수
     */
    highlightPoint(fraction) {
        if (this.geometry && fraction) {
            dtmap.vector.clear();
            dtmap.vector.addPoint({
                coordinates: this.geometry.getCoordinateAt(fraction),
                crs: 'EPSG:5179',
                style: {
                    fill: {
                        color: '#ff8828',
                        opacity: 0.5
                    },
                    stroke: {
                        color: '#a94e00'
                    },
                    radius: 10,
                    zIndex: 9999

                }
            });
        }
    },

    /**
     * Dep 값 가져오기
     *
     * @param {Object} fac
     * @param {ol.Feature} feature
     */
    getDep(fac, feature) {
        if (fac["avgDep"]) {
            return parseFloat(feature.get(fac["avgDep"]));
        } else if (fac["lowDep"] && fac["higDep"]) {
            const sum =
                parseFloat(feature.get(fac["lowDep"])) +
                parseFloat(feature.get(fac["higDep"]));
            return sum == 0 ? 0 : sum / 2;
        } else {
            return 0;
        }
    },

    /**
     * 관경 값 가져오기
     *
     * @param {Object} fac
     * @param {ol.Feature} feature
     */
    getDip(fac, feature) {
        if (fac["dipType"]) {
            // 하수 관거
            if (fac["dip"] == "FOR004" || fac["dip"] == "FOR024") {
                const sum =
                    parseFloat(feature.get(fac["dipHol"])) +
                    parseFloat(feature.get(fac["dipVel"]));
                return sum == 0 ? 0 : sum / 2;
            } else {
                return parseFloat(feature.get(fac["dip"])) / 100;
            }
        } else {
            if (fac["dip"]) {
                return parseFloat(feature.get(fac["dip"])) / 100;
            } else if (fac["dipHol"] || fac["dipVel"]) {
                const sum =
                    parseFloat(feature.get(fac["dipHol"])) +
                    parseFloat(feature.get(fac["dipVel"]));
                return sum == 0 ? 0 : sum / 2;
            } else {
                return 0;
            }
        }
    },

    /**
     * 소수 첫째점 자리 수까지 반올림
     * @param {number}} number
     */
    calcRoundDp1(number) {
        return Math.round(number * 10) / 10;
    },

    /**
     * 다운로드
     */
    download: function () {
        if ($(".analysis-chart", this.selector).length > 0) {
            const params = {};
            const format = new ol.format.WKT();
            const wkt = format.writeGeometry(this.geometry);

            const featureTypes = [];
            for (const [key, value] of Object.entries(this.facs)) {
                featureTypes.push(key);
            }
            params["dataIds"] = featureTypes.join();
            params["wkt"] = wkt;
            params["buffer"] = 0;
            params["type"] = "shape";
            window.location.href = "/cmt/dwld/dataDownload.do?" + $.param(params);
        } else {
            toastr.warning("다운로드는 분석 후 가능합니다.");
        }
    },

    drawend: function (e) {
        const geometry = e.geometry.clone();
        if (dtmap.crs === 'EPSG:4326') {
            geometry.transform('EPSG:4326', 'EPSG:5179');
        }

        if (geometry.getLength() < 10) {
            dtmap.draw.clear();
            toastr.warning("지하시설물횡단면은 10m 이상부터 분석 가능합니다.");
            return
        } else if (geometry.getLength() > 1000) {
            dtmap.draw.clear();
            toastr.warning("지하시설물횡단면은 최대 1km 까지 분석 가능합니다.");
            return
        } else {
            M_UNDG_FCTY_SECT.analysis(geometry);
            dtmap.draw.dispose();
            dtmap.off('drawend', M_UNDG_FCTY_SECT.drawend);
        }
    }
};
