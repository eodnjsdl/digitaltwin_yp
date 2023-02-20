window.map2d = window.map2d || {}
map2d.measure = (function () {

    let style;
    let startStyle;
    let labelStyle;
    let segmentStyle;
    let source = new ol.source.Vector();
    let interactions = [];

    function init() {
        _createStyles();
        _addLayer();
    }

    /**
     * 스타일 목록 생성
     */
    function _createStyles() {
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
    function _getStyles(feature) {
        const styles = [style];
        const geometry = feature.getGeometry();
        const type = feature.get("type");

        if (type === "LineString" && geometry instanceof ol.geom.LineString) {
            const _labelStyle = labelStyle;
            const formatLength = _formatLength.bind(this);
            const _segmentStyle = segmentStyle;

            let sum = 0;
            geometry.forEachSegment(function (a, b) {
                const segment = new ol.geom.LineString([a, b]);

                //const length = ol.sphere.getLength(segment);
                const length = segment.getLength();
                const segmentLabel = formatLength(length);
                const segmentPoint = new ol.geom.Point(segment.getCoordinateAt(0.5));
                const cloneSegmentStyle = _segmentStyle.clone();
                cloneSegmentStyle.setGeometry(segmentPoint);
                cloneSegmentStyle.getText().setText(segmentLabel);
                styles.push(cloneSegmentStyle);

                sum += length;
                const label = formatLength(sum);
                const point = new ol.geom.Point(segment.getLastCoordinate());
                const cloneLabelStyle = _labelStyle.clone();
                cloneLabelStyle.setGeometry(point);
                cloneLabelStyle.getText().setText(label);
                styles.push(cloneLabelStyle);
            });

            const _startStyle = startStyle.clone();
            _startStyle.setGeometry(new ol.geom.Point(geometry.getFirstCoordinate()));
            _startStyle.getText().setText("Start");
            styles.push(_startStyle);
        } else if (type === "Polygon") {
            //const area = ol.sphere.getArea(geometry);
            const area = geometry.getArea();
            if (area > 0) {
                const label = _formatArea(area);
                const point = geometry.getInteriorPoint();
                const style = startStyle.clone();
                style.setGeometry(point);
                style.getText().setText(label);
                styles.push(style);
            }
        } else if (type === "Circle") {
            const first = geometry.getFirstCoordinate();
            const last = geometry.getLastCoordinate();
            const lineString = new ol.geom.LineString([first, last]);

            //const length = ol.sphere.getLength(lineString);
            const length = lineString.getLength();
            const label = _formatLength(length);
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
    function _addLayer() {
        const getStyles = _getStyles.bind();
        const layer = new ol.layer.Vector({
            source: source,
            style: getStyles,
            zIndex: 3,
        });
        map2d.map.addLayer(layer);
    }


    /**
     * 초기화
     */
    function reset() {
        source.clear();
    }


    /**
     * 상호작용 추가
     * @param {String} type 타입 `LineString:거리, Polygon:면적, Circle:반경`
     */
    function addInteraction(type) {
        reset();
        const getStyles = _getStyles.bind();
        const interaction = new ol.interaction.Draw({
            source: source,
            type: type,
            style: getStyles,
        });
        _setInteractions([interaction]);
        interaction.on("drawstart", (e) => {
            e.feature.set("type", type);
        });
    }

    /**
     * 길이 포맷
     * @param {number} length 길이
     * @returns 포맷 적용된 길이
     */
    function _formatLength(length) {
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
    function _formatArea(area) {
        let output;
        if (area > 100000) {
            output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
        } else {
            output = Math.round(area * 100) / 100 + " m\xB2";
        }
        return output;
    }

    /**
     * 상호작용 초기화
     */
    function clearInteraction() {
        interactions.forEach((interaction) => {
            map2d.map.removeInteraction(interaction);
        });
        interactions = [];
    }

    /**
     * 상호 작용 목록 설정
     * @param {Array.<ol.interaction.Interaction>} interactions 상호작용 목록
     */
    function _setInteractions(_interactions) {
        clearInteraction();
        _interactions.forEach((interaction) => {
            map2d.map.addInteraction(interaction);
        });
        interactions = _interactions;
    }


    let module = {
        init: init
        , addInteraction: addInteraction
        , clearInteraction: clearInteraction
    }
    return module;


}());