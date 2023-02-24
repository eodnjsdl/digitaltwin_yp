window.map2d = window.map2d || {}
map2d.measure = (function () {
    const TYPE = {
        'distance': 'LineString',
        'area': 'Polygon',
        'radius': 'Circle'
    }
    let style;
    let startStyle;
    let labelStyle;
    let segmentStyle;
    let interaction;
    let _layer;
    let _source;

    function init() {
        createStyles();
        createLayer();
    }

    /**
     * 스타일 목록 생성
     */
    function createStyles() {
        // 기본 스타일
        style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(0, 0, 255, 0.3)",
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(255, 255, 0, 0.8)",
                width: 4,
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: "rgba(255, 255, 0, 0.8)",
                }),
            }),
        });

        // 시작 또는 면적 스타일
        startStyle = new ol.style.Style({
            text: new ol.style.Text({
                font: "14px 'Noto Sans KR'",
                fill: new ol.style.Fill({
                    color: "rgba(0, 0, 0, 1)",
                }),
                backgroundFill: new ol.style.Fill({
                    color: "rgba(255, 204, 198, 0.8)",
                }),
                padding: [3, 3, 3, 3],
                textBaseline: "bottom",
                offsetY: -15,
            }),
            image: new ol.style.RegularShape({
                radius: 8,
                points: 3,
                angle: Math.PI,
                displacement: [0, 8],
                fill: new ol.style.Fill({
                    color: "rgba(255, 204, 198, 0.8)",
                }),
            }),
        });

        // 라벨 스타일
        labelStyle = new ol.style.Style({
            text: new ol.style.Text({
                font: "14px 'Noto Sans KR'",
                fill: new ol.style.Fill({
                    color: "rgba(0, 0, 0, 1)",
                }),
                backgroundFill: new ol.style.Fill({
                    color: "rgba(34, 180, 172, 0.8)",
                }),
                padding: [3, 3, 3, 3],
                textBaseline: "bottom",
                offsetY: -15,
            }),
            image: new ol.style.RegularShape({
                radius: 8,
                points: 3,
                angle: Math.PI,
                displacement: [0, 8],
                fill: new ol.style.Fill({
                    color: "rgba(34, 180, 172, 0.8)",
                }),
            }),
        });

        // 구간 스타일
        segmentStyle = new ol.style.Style({
            text: new ol.style.Text({
                font: "14px 'Noto Sans KR'",
                fill: new ol.style.Fill({
                    color: "rgba(0, 0, 0, 1)",
                }),
                backgroundFill: new ol.style.Fill({
                    color: "rgba(255, 255, 0, 0.8)",
                }),
                padding: [2, 2, 2, 2],
                textBaseline: "bottom",
            }),
        });
    }


    /**
     * 스타일 목록 가져오기
     * @param {ol.Feature} feature 공간 객체
     * @returns 스타일 목록
     */
    function styleFunction(feature) {
        const isMeasure = feature.get("measure");
        if (!isMeasure) {
            return [];
        }

        const styles = [style];
        const geometry = feature.getGeometry();
        const type = feature.get("type");

        if (type === "LineString" && geometry instanceof ol.geom.LineString) {

            let sum = 0;
            geometry.forEachSegment(function (a, b) {
                const segment = new ol.geom.LineString([a, b]);
                const length = segment.getLength();
                const segmentLabel = formatLength(length);
                const segmentPoint = new ol.geom.Point(segment.getCoordinateAt(0.5));
                const _segmentStyle = segmentStyle.clone();
                _segmentStyle.setGeometry(segmentPoint);
                _segmentStyle.getText().setText(segmentLabel);
                styles.push(_segmentStyle);

                sum += length;
                const label = formatLength(sum);
                const point = new ol.geom.Point(segment.getLastCoordinate());
                const _labelStyle = labelStyle.clone();
                _labelStyle.setGeometry(point);
                _labelStyle.getText().setText(label);
                styles.push(_labelStyle);
            });

            const _startStyle = startStyle.clone();
            _startStyle.setGeometry(new ol.geom.Point(geometry.getFirstCoordinate()));
            _startStyle.getText().setText("Start");
            styles.push(_startStyle);
        } else if (type === "Polygon") {
            //const area = ol.sphere.getArea(geometry);
            const area = geometry.getArea();
            if (area > 0) {
                const label = formatArea(area);
                const point = geometry.getInteriorPoint();
                const _startStyle = startStyle.clone();
                _startStyle.setGeometry(point);
                _startStyle.getText().setText(label);
                styles.push(_startStyle);
            }
        } else if (type === "Circle") {
            const first = geometry.getFirstCoordinate();
            const last = geometry.getLastCoordinate();
            const lineString = new ol.geom.LineString([first, last]);

            //const length = ol.sphere.getLength(lineString);
            const length = lineString.getLength();
            const label = formatLength(length);
            const _startStyle = startStyle.clone();
            _startStyle.setGeometry(new ol.geom.Point(last));
            _startStyle.getText().setText(label);
            styles.push(_startStyle);

            const _style = style.clone();
            _style.setGeometry(new ol.geom.Point(first));
            styles.push(_style);

            const _lineStyle = style.clone();
            _lineStyle.setGeometry(lineString);
            styles.push(_lineStyle);
        }

        return styles;
    }


    /**
     * 레이어 추가
     */
    function createLayer() {
        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            name: 'measureLayer',
            style: styleFunction,
            zIndex: 3,
        });
        map2d.map.addLayer(_layer);
    }


    /**
     * 길이 포맷
     * @param {number} length 길이
     * @returns 포맷 적용된 길이
     */
    function formatLength(length) {
        let output;
        if (length > 1000) {
            output = Math.round((length / 1000) * 100) / 100 + " km";
        } else {
            output = Math.round(length * 100) / 100 + " m";
        }
        return output;
    }

    /**
     * 면적 포맷
     * @param {number} area 면적
     * @returns 포맷 적용된 면적
     */
    function formatArea(area) {
        let output;
        if (area > 100000) {
            output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
        } else {
            output = Math.round(area * 100) / 100 + " m\xB2";
        }
        return output;
    }


    /**
     * 상호작용 추가
     * @param {String} type 타입 `distance:거리, area:면적, radius:반경`
     */
    function active(type) {
        const drawType = TYPE[type];
        clearInteraction();
        interaction = new ol.interaction.Draw({
            source: _source,
            type: drawType,
            style: styleFunction,
        });

        map2d.map.addInteraction(interaction);

        interaction.on("drawstart", (e) => {
            e.feature.set("measure", true);
            e.feature.set("type", drawType);
        });
    }

    /**
     * 초기화 source
     */
    function clear() {
        _source.clear();
    }


    /**
     * 상호작용 초기화
     */
    function clearInteraction() {
        if (interaction) {
            map2d.map.removeInteraction(interaction);
            interaction = undefined;
        }
    }

    function dispose() {
        clear();
        clearInteraction();
    }

    let module = {
        init: init,
        active: active,
        clear: clear,
        dispose: dispose,
    }

    Object.defineProperties(module, {
        'source': {
            get: function () {
                return _source;
            }
        },
        'layer': {
            get: function () {
                return _layer;
            }
        }
    })

    return module;
}());