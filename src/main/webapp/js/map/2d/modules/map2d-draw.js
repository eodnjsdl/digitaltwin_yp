window.map2d = window.map2d || {}
map2d.draw = (function () {

    let _layer;
    let _source;
    let _draw;
    let _snap;
    let _modify;
    let _select;
    let _drawOptions;

    const DEFAULT_TYPE = 'Polygon'
    const DEFAULT_FILL = {
        color: '#ff0000',
        opacity: 1
    }
    const DEFAULT_STROKE = {
        color: '#ff0000',
        opacity: 1,
        width: 3,
        lineDash: 'solid',
        startArrow: false,
        endArrow: false
    }
    const DEFAULT_POINT = {
        radius: 3
    }
    const DEFAULT_MARKER = {
        anchor: [0.5, 0.5],
        scale: 1,
        opacity: 1,

    }
    const DEFAULT_TEXT = {
        bold: false,
        italic: false,
        fontSize: 26,
        fontFamily: 'sans-serif',
        textAlign: 'center'
    }

    function init() {
        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            name: 'drawLayer',
            zIndex: 3,
            style: styleFunction
        });
        map2d.map.addLayer(_layer);
    }

    /**
     * export 함수
     */

    /**
     * @typedef FillOption
     * @property {string} color
     * @property {number} opacity
     */

    /**
     * @typedef StrokeOption
     * @property {string} [color]
     * @property {number} [opacity=1]
     * @property {number} [width=3]
     * @property {string} [lineDash="solid"]
     * @property {boolean} [startArrow=false]
     * @property {boolean} [endArrow=false]
     */

    /**
     * @typedef MarkerOption
     * @property {number[]} [anchor=[0.5,0.5]]
     * @property {number} [scale=1]
     * @property {number} [opacity=1]
     */

    /**
     * @typedef TextOption
     * @property {boolean} [bold=false]
     * @property {boolean} [italic=false]
     * @property {number} [fontSize=26]
     * @property {string} [fontFamily='sans-serif']
     * @property {string} [textAlign='center]]
     *
     */

    /**
     * @param options {object}
     * @param [options.type="Polygon"] {string} 'Point', 'LineString', 'Polygon', 'Rectangle', 'Triangle', 'Box', 'Marker', 'Text'
     * @param {FillOption} [options.fill] 채움색 (type="LineString" 에서는 사용안함)
     * @param {StrokeOption} [options.stroke] 선색
     * @param {MarkerOption} [options.marker] 마커 (type="Marker" 일 경우에만 사용)
     * @param {TextOption} [options.text] 텍스트 (type="Text" 일 경우에만 사용)
     * @param {boolean} [options.once] 한번만 그리기 (도형 그릴때 기존 도형 삭제)
     */
    function active(options) {
        map2d.setInteraction(this);
        dispose();
        _drawOptions = parseOption(options);

        if (!_draw) {
            let geomFunction;
            let drawType = 'Circle';
            let {type} = _drawOptions;
            if (type === "Rectangle") {
                geomFunction = ol.interaction.Draw.createRegularPolygon(4);
            } else if (type === "Triangle") {
                geomFunction = ol.interaction.Draw.createRegularPolygon(3);
            } else if (type === "Box") {
                geomFunction = ol.interaction.Draw.createBox();
            } else if (type === 'Marker' || type === 'Text') {
                geomFunction = undefined;
                drawType = 'Point';
            } else {
                geomFunction = undefined;
                drawType = type;
            }

            _draw = new ol.interaction.Draw({
                source: _source,
                type: drawType,
                // style: styleFunction,
                geometryFunction: geomFunction
            });
            _draw.on('drawstart', onDrawStart);

            map2d.map.addInteraction(_draw);
        }

        if (!_snap) {
            _snap = new ol.interaction.Snap({source: _source});
            map2d.map.addInteraction(_snap);
        }

        if (!_modify) {
            _modify = new ol.interaction.Modify({source: _source});
            map2d.map.addInteraction(_modify);
        }
    }

    function dispose() {
        if (_draw) {
            map2d.map.removeInteraction(_draw);
            _draw = undefined;
        }

        if (_snap) {
            map2d.map.removeInteraction(_snap);
            _snap = undefined;
        }

        if (_modify) {
            map2d.map.removeInteraction(_modify);
            _modify = undefined;
        }

        if (_select) {
            map2d.map.removeInteraction(_select);
            _select = undefined;
        }
    }

    function writeGeoJson() {
        const format = new ol.format.GeoJSON();
        const features = _source.getFeatures().map((feature) => {
            const cloned = feature.clone();
            const geom = cloned.getGeometry();
            if (geom instanceof ol.geom.Circle) {
                cloned.setGeometry(new ol.geom.Point(geom.getCenter()));
                cloned.set('circleRadius', geom.getRadius());
                cloned.set('type', 'Circle')
            }
            return cloned;
        });
        return format.writeFeatures(features);
    }

    function readGeoJson(json) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }

        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(json).map((feature) => {
            const cloned = feature.clone();
            // cloned.set("grphcId", grphcId);
            if (feature.get("type") === "Circle") {
                const geometry = cloned.getGeometry();
                cloned.setGeometry(
                    new ol.geom.Circle(
                        geometry.getCoordinates(),
                        feature.get("circleRadius")
                    )
                );
            }
            return cloned;
        });
        _source.addFeatures(features);
    }

    function clear() {
        _source.clear();
    }


    /**
     * 스타일 관련 함수
     */

    function styleFunction(feature, resolution) {
        const options = feature.get('style');
        // console.log('render', feature.ol_uid, options.fill);
        const geom = feature.getGeometry();
        const fill = fillStyle(options.fill);
        const stroke = strokeStyle(options.stroke);
        const style = new ol.style.Style();
        if (geom instanceof ol.geom.Polygon) {
            style.setFill(fill);
            style.setStroke(stroke);
            return style;
        } else if (geom instanceof ol.geom.LineString) {
            style.setStroke(stroke)
            return [style,
                ...lineStyle(feature, resolution, options.stroke)]
        } else if (geom instanceof ol.geom.Circle) {
            style.setFill(fill);
            style.setStroke(stroke);
            return style;
        } else if (geom instanceof ol.geom.Point) {
            if (options.text) {
                //텍스트
                style.setText(textStyle(fill, stroke, options.text));
            } else if (options.marker) {
                //마커
                style.setImage(markerStyle(options.marker));
            } else {
                //포인트
                style.setImage(pointStyle(fill, stroke, options.marker));
            }

            return style;
        }

    }

    function fillStyle(options) {
        return new ol.style.Fill({
            color: options.color,
            opacity: options.opacity
        })
    }

    function strokeStyle(options) {
        return new ol.style.Stroke({
            color: options.color,
            opacity: options.opacity,
            width: options.width,
            lineDash: getLineDash(options.lineDash, options.width)
        })
    }

    function pointStyle(fill, stroke, options) {
        return new ol.style.Circle({
            radius: options.radius,
        })
    }

    function markerStyle(options) {
        return new ol.style.Icon({
            anchor: options.anchor,
            scale: options.scale,
            src: options.src,
            opacity: options.opacity,
        })
    }

    function textStyle(fill, stroke, options) {
        return new ol.style.Text({
            font: getFont(options),
            text: options.text,
            fill: fill,
            stroke: stroke,
            textAlign: options.textAlign,
        })
    }

    function lineStyle(feature, resolution, options) {
        const styles = [];
        const geom = feature.getGeometry();
        const coords = geom.getCoordinates();
        if (options.startArrow) {
            styles.concat(arrowStyle(coords[1], coords[0], resolution, options))
        }

        if (options.endArrow) {
            styles.concat(arrowStyle(coords[coords.length - 2], coords[coords.length - 1], resolution, options))
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


    function parseOption(options) {
        options = options || {};
        options.type = options.type || DEFAULT_TYPE;
        let {type} = options;
        options.fill = merge(DEFAULT_FILL, options.fill);
        options.stroke = merge(DEFAULT_STROKE, options.stroke);
        if (type === 'Polygon' || type === "Rectangle" || type === 'Triangle' || type === 'Box') {
            // options.fill = merge(DEFAULT_FILL, options.fill);
            // options.stroke = merge(DEFAULT_STROKE, options.stroke);
        } else if (type === 'LineString') {
            // options.fill = merge(DEFAULT_FILL, options.fill);
            // options.stroke = merge(DEFAULT_STROKE, options.stroke);
        } else if (type === 'Point') {
            // options.fill = merge(DEFAULT_FILL, options.fill);
            // options.stroke = merge(DEFAULT_STROKE, options.stroke);
            options.point = merge(DEFAULT_POINT, options.point);
        } else if (type === 'Marker') {
            options.marker = merge(DEFAULT_MARKER, options.marker);
        } else if (type === 'Text') {
            options.text = merge(DEFAULT_TEXT, options.text);
        }
        return options;
    }

    function merge(a, b) {
        return {...a, ...b}
    }

    function onDrawStart(e) {
        if (_drawOptions.once) {
            _source.clear();
        }
        e.feature.setProperties({style: _drawOptions});
        // console.log('set', e.feature.ol_uid, _drawOptions);
    }

    function writeWKT(index) {
        const format = new ol.format.WKT();
        const features = _source.getFeatures();
        if (index !== undefined) {
            const feature = features[index];
            if (!feature) {
                return;
            }
            return format.writeFeature(feature);


        } else {
            return format.writeFeatures(features);
        }


    }


    let module = {
        init: init,
        active: active,
        dispose: dispose,
        writeGeoJson: writeGeoJson,
        readGeoJson: readGeoJson,
        writeWKT: writeWKT,
        clear: clear
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
        'draw': {
            get: function () {
                return _draw;
            }
        }
    })

    return module;
}());