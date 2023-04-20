window.map2d = window.map2d || {}
map2d.vector = (function () {


    /**
     * @typedef StyleOption
     * @property {FillOption} [fill] 채움색 옵션
     * @property {StrokeOption} [stroke] 선색 옵션
     * @property {number} [radius] 점일경우 점의 반경
     * @property {MarkerOption} [marker] 마커 옵션
     * @property {LabelOption} [label] 라벨링 옵션
     */

    /**
     * @typedef FillOption
     * @property {string} color
     * @property {number} opacity
     */
    const DEFAULT_FILL = {
        color: 'rgba(255,255,255)',
        opacity: 0.4
    }

    /**
     * @typedef StrokeOption
     * @property {string} [color]
     * @property {number} [opacity=1]
     * @property {number} [width=3]
     * @property {string} [lineDash="solid"]
     * @property {boolean} [startArrow=false]
     * @property {boolean} [endArrow=false]
     */
    const DEFAULT_STROKE = {
        color: 'rgb(0,139,255)',
        opacity: 1,
        width: 3,
        lineDash: 'solid',
        startArrow: false,
        endArrow: false
    }

    const DEFAULT_RADIUS = 8

    /**
     * @typedef MarkerOption
     * @property {number[]} [anchor=[0.5,0.5]]
     * @property {number} [scale=1]
     * @property {number} [opacity=1]
     */
    const DEFAULT_MARKER = {
        anchor: [0.5, 1],
        scale: 1,
        opacity: 1
    }

    /**
     * @typedef LabelOption
     * @property {boolean} [bold=false]
     * @property {boolean} [italic=false]
     * @property {number} [fontSize=26]
     * @property {string} [fontFamily='sans-serif']
     * @property {string} [textAlign='center]]
     * @property {number} [offsetY=15]
     * @property {FillOption} [fill]
     * @property {StrokeOption} [stroke]
     *
     */
    const DEFAULT_LABEL = {
        bold: false,
        italic: false,
        fontSize: 14,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        textBaseline: "bottom",
        offsetY: 15,
        fill: {
            color: '#ffffff',
            opacity: 1
        },
        stroke: {
            color: '#000000',
            opacity: 1,
            width: 3,
            lineDash: 'solid',
            startArrow: false,
            endArrow: false
        }
    }

    const SELECTED_COLOR = '#4ff5ff'

    let _source;
    let _layer;

    function init() {

        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            style: styleFunction,
            isDefault: true,
            zIndex: 999
        });
        map2d.map.addLayer(_layer);
        _source.on('change', onSourceChange)

    }

    /**
     * Point 추가
     * @param options
     * @param {number} [options.id]
     * @param {number[]} options.coordinate
     * @param {string} options.crs
     * @param {string} [options.text]
     * @param {string} [options.column]
     * @param {string} [options.img]
     * @param {object} [options.properties]
     */
    function addPoint(options) {
        if (options.crs) {
            if (options.crs !== map2d.crs) {
                options.coordinate = ol.proj.transform(options.coordinate, options.crs, map2d.crs);
            }
        }

        const geom = new ol.geom.Point(options.coordinate);
        const feature = new ol.Feature({
            geometry: geom
        });
        if (options.id) {
            feature.setId(options.id)
        }
        if (options.style) {
            feature.set('style', options.style);
        }
        if (options.properties) {
            feature.setProperties(options.properties);
        }
        _source.addFeature(feature);
    }


    /**
     * 피쳐 선택
     * @param id 피쳐ID
     * @param [multi=false] 다중선택
     */
    function select(id, multi) {
        if (!multi) {
            clearSelect();
        }


        let feature = getFeature(id);
        if (feature) {
            // const center = feature.getGeometry().getCoordinates();
            const extent = feature.getGeometry().getExtent();
            const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
            feature.set('_selected', true);
            map2d.view.setCenter(center);
        }
    }

    function getFeature(id) {
        return _source.getFeatureById(id);
    }

    function clearSelect() {
        _source.getFeatures().forEach(function (f) {
            f.unset('_selected');
        });
    }

    function clear() {
        if (_source) {
            _source.clear();
        }
    }

    function dispose() {
        map2d.map.remove(_layer);
    }

    function onSourceChange() {
        if (_layer) {
            //피쳐가 있으면 show / 없으면 레이어 hide
            _layer.setVisible(this.getFeatures().length > 0)
        }
    }

    function fit() {
        if (_source && _source.getFeatures().length > 0) {
            map2d.view.fit(_source.getExtent());
        }
    }

    /**
     * 스타일 관련 함수
     */


    function styleFunction(feature, resolution) {
        let styleOpt = feature.get('style') || {};
        // if (typeof styleOpt === 'function') {
        //     styleOpt = styleOpt(feature);
        // }
        const styleFnc = feature.get('_style');
        if (styleFnc && typeof styleFnc === 'function') {
            styleOpt = styleFnc(feature);
        }

        const selected = feature.get('_selected');
        const geom = feature.getGeometry();
        const fill = fillStyle(_.merge({}, DEFAULT_FILL, styleOpt.fill), selected);
        const stroke = strokeStyle(_.merge({}, DEFAULT_STROKE, styleOpt.stroke), selected);
        const style = new ol.style.Style({
            zIndex: styleOpt.zIndex ? styleOpt.zIndex : (selected ? 9999 : undefined)
        });

        if (styleOpt.label) {
            //텍스트
            if (styleOpt.label.column) {
                styleOpt.label.text = feature.get(styleOpt.label.column);
            }
            style.setText(textStyle(_.merge({}, DEFAULT_LABEL, styleOpt.label)));
        }

        if (geom instanceof ol.geom.Polygon || geom instanceof ol.geom.MultiPolygon) {
            style.setFill(fill);
            style.setStroke(stroke);
            return style;
        } else if (geom instanceof ol.geom.LineString || geom instanceof ol.geom.MultiLineString) {
            style.setStroke(stroke)
            return [style,
                ...lineStyle(feature, resolution, _.merge({}, DEFAULT_STROKE, styleOpt.stroke))]
        } else if (geom instanceof ol.geom.Circle) {
            style.setFill(fill);
            style.setStroke(stroke);
            return style;
        } else if (geom instanceof ol.geom.Point || geom instanceof ol.geom.MultiPoint) {
            if (styleOpt.marker && styleOpt.marker.src) {
                //마커
                style.setImage(markerStyle(_.merge({}, DEFAULT_MARKER, styleOpt.marker), selected));
            } else if (styleOpt.text) {
                style.setText(textStyle(_.merge({}, DEFAULT_LABEL, styleOpt.text)));
            } else {
                //포인트
                style.setImage(pointStyle(fill, stroke, styleOpt.radius || DEFAULT_RADIUS, styleOpt.shape));
            }

            return style;
        }
    }

    function fillStyle(options, selected) {
        const rgb = ol.color.asArray(options.color);
        return new ol.style.Fill({
            color: ol.color.asString([rgb[0], rgb[1], rgb[2], options.opacity])
        })
    }

    function strokeStyle(options, selected) {
        const rgb = ol.color.asArray(selected ? SELECTED_COLOR : options.color);
        return new ol.style.Stroke({
            color: ol.color.asString([rgb[0], rgb[1], rgb[2], options.opacity]),
            width: options.width,
            lineDash: getLineDash(options.lineDash, options.width)
        })
    }

    function pointStyle(fill, stroke, radius, shape) {
        if (shape === "Rectangle") {
            return new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                radius: radius,
                points: 4,
                angle: Math.PI / 4,
            })
        } else if (shape === "Triangle") {
            return new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 3,
                radius: radius,
                angle: 0,
            })
        } else if (shape === "Star") {
            return new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 5,
                radius: radius,
                radius2: 4,
                angle: 0,
            })
        } else if (shape === "Cross") {
            return new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: radius,
                radius2: 0,
                angle: 0,
            })
        } else if (shape === "X") {
            return new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: radius,
                radius2: 0,
                angle: Math.PI / 4,
            })
        } else {
            return new ol.style.Circle({
                radius: radius,
                fill: fill,
                stroke: stroke
            })
        }
    }

    function markerStyle(options, selected) {
        return new ol.style.Icon({
            anchor: options.anchor,
            scale: options.scale,
            src: options.src,
            opacity: options.opacity,
            color: selected ? SELECTED_COLOR : undefined
        })
    }

    function textStyle(options) {
        return new ol.style.Text({
            font: getFont(options),
            text: options.text,
            fill: fillStyle(options.fill),
            stroke: strokeStyle(options.stroke),
            textAlign: options.textAlign,
            textBaseline: options.textBaseline,
            offsetY: options.offsetY
        })
    }

    function lineStyle(feature, resolution, options) {
        let styles = [];
        const geom = feature.getGeometry();
        const coords = geom.getCoordinates();
        if (options.startArrow) {
            styles = styles.concat(arrowStyle(coords[1], coords[0], resolution, options))
        }

        if (options.endArrow) {
            styles = styles.concat(arrowStyle(coords[coords.length - 2], coords[coords.length - 1], resolution, options))
        }

        return styles;
    }

    function getFont(options) {
        let font = ``;

        if (options.bold) {
            font += ` bold`;
        }
        if (options.italic) {
            font += ` italic`;
        }
        const fontSize = options.fontSize;
        font += ` ${fontSize}px`;
        const fontFamily = options.fontFamily;
        font += ` ${fontFamily} `;
        return font;
    }

    function getLineDash(type, width) {
        type = type || 'SOLID';
        width = width || 1;
        let lineDash = []; //solid
        let t = type.toUpperCase();
        if (t === "DOT") {
            lineDash = [width * 2, width * 2];
        } else if (t === "DASHED") {
            lineDash = [width * 6, width * 2];
        } else if (t === "DASH-DOTTED") {
            lineDash = [width * 6, width * 2, width * 2, width * 2];
        } else if (t === "DASH-DOUBLE-DOTTED") {
            lineDash = [
                width * 6,
                width * 2,
                width * 2,
                width * 2,
                width * 2,
                width * 2,
            ];
        } else if (t === 'SOLID') {
            lineDash = undefined;
        } else {
            lineDash = undefined;
            console.warn(`지원되지 않는 선 패턴입니다.`);
        }
        return lineDash;
    }

    function arrowStyle(start, end, resolution, options) {
        const styles = [];
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const rotation = Math.atan2(dy, dx);
        const offset = options.width * 2 * resolution;
        const line1 = new ol.geom.LineString([
            end,
            [end[0] - offset, end[1] + offset],
        ]);
        line1.rotate(rotation, end);
        const line2 = new ol.geom.LineString([
            end,
            [end[0] - offset, end[1] - offset],
        ]);
        line2.rotate(rotation, end);
        styles.push(
            new ol.style.Style({
                geometry: line1,
                stroke: strokeStyle(options),
            })
        );
        styles.push(
            new ol.style.Style({
                geometry: line2,
                stroke: strokeStyle(options),
            })
        )
        return styles;
    }

    function readWKT(wkt, properties) {
        const feature = dtmap.util.readWKT(wkt, properties);
        _source.addFeature(feature);
        return feature;
    }

    function writeWKT() {
        const features = _source.getFeatures();
        return dtmap.util.writeWKT(features)
    }

    function readGeoJson(json, style) {
        const features = dtmap.util.readGeoJson(json).map((feature) => {
            if (typeof style === 'function') {
                feature.set('_style', style);
            } else {
                feature.set('style', style);
            }
            return feature;
        });
        _source.addFeatures(features);
    }

    function writeGeoJson() {
        const features = _source.getFeatures();
        return dtmap.util.writeGeoJson(features);
    }

    function addFeatures(features, style) {
        if (style) {
            features.map((f) => {
                f.set('style', style)
            })
        }
        _source.addFeatures(features)
    }

    function addFeature(feature, style, crs) {
        if (style) {
            feature.set('style', style);
        }
        _source.addFeature(feature)
    }

    function removeFeatureByFilter(filter) {
        const features = _source
            .getFeatures()
            .filter(function (feature) {
                return filter(feature, feature.getProperties());
            });
        features.forEach((feature) => {
            _source.removeFeature(feature);
        });
    }

    let module = {
        init: init,
        addPoint: addPoint,
        addFeature: addFeature,
        addFeatures: addFeatures,
        clear: clear,
        clearSelect: clearSelect,
        dispose: dispose,
        fit: fit,
        readWKT: readWKT,
        readGeoJson: readGeoJson,
        select: select,
        writeGeoJson: writeGeoJson,
        removeFeatureByFilter: removeFeatureByFilter,
        getFeature: getFeature
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
        },
        'style': {
            get: function () {
                return styleFunction;
            }
        },
        'DEFAULT_STYLE': {
            get: function () {
                return {
                    fill: DEFAULT_FILL,
                    stroke: DEFAULT_STROKE,
                    marker: DEFAULT_MARKER,
                    point: DEFAULT_RADIUS,
                    text: DEFAULT_LABEL
                }
            }
        }
    })
    return module;
}())