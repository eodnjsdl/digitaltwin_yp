window.map2d = window.map2d || {}
map2d.draw = (function () {

    let _layer;
    let _source;
    let _draw;
    let _snap;
    let _modify;
    let _select;
    let _drawOptions;
    let _buffer;

    const DEFAULT_TYPE = 'Polygon'
    const ORI_GEOM_KEY = '_ori_geom'

    function init() {
        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            name: 'drawLayer',
            zIndex: 3,
            style: map2d.vector.style,
            isDefault: true
        });
        map2d.map.addLayer(_layer);
    }

    /**
     * export 함수
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
        // dispose();
        map2d.setInteraction(this);
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
            _draw.on('drawend', onDrawEnd);
            map2d.map.addInteraction(_draw);
        }

        if (!_snap) {
            _snap = new ol.interaction.Snap({source: _source});
            window.test = _snap;
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

    function clear() {
        _source.clear();
    }

    function parseOption(options) {
        options = options || {};
        options.type = options.type || DEFAULT_TYPE;
        let {type} = options;
        const DEFAULT = map2d.vector.DEFAULT_STYLE;
        options.fill = merge(DEFAULT.fill, options.fill);
        options.stroke = merge(DEFAULT.storke, options.stroke);
        if (type === 'Polygon' || type === "Rectangle" || type === 'Triangle' || type === 'Box') {
            //none
        } else if (type === 'LineString') {
            //none
        } else if (type === 'Point') {
            options.point = merge(DEFAULT.point, options.point);
        } else if (type === 'Marker') {
            options.marker = merge(DEFAULT.marker, options.marker);
        } else if (type === 'Text') {
            options.text = merge(DEFAULT.text, options.text);
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
        dtmap.trigger('drawstart', {geometry: e.feature.getGeometry(), origin: e});
    }

    function onDrawEnd(e) {
        updateGeometry(e.feature);
        setTimeout(function () {
            dtmap.trigger('drawend', {geometry: e.feature.getGeometry(), origin: e});
        })
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

    /**
     * 도형 반환
     * @param {number} [index=0] 도형 인덱스
     */
    function getGeometry(index) {
        index = index === undefined ? 0 : index;
        let feature = _source.getFeatures()[index];
        let geom = feature.getGeometry();
        return geom;
    }

    function setBuffer(value) {
        _buffer = value;
        const features = _source.getFeatures();
        for (let i = 0; i < features.length; i++) {
            const feature = features[i];
            updateGeometry(feature);
        }
    }

    //지오메트리 버퍼 업데이트
    function updateGeometry(feature) {
        if (_buffer <= 0 || isNaN(_buffer)) {
            const geom = feature.get(ORI_GEOM_KEY);
            if (geom) {
                feature.setGeometry(geom);
            }
            feature.unset(ORI_GEOM_KEY);
        } else {
            const geom = feature.get(ORI_GEOM_KEY) || feature.getGeometry();
            const buffered = getBufferGeom(geom, _buffer);
            feature.set(ORI_GEOM_KEY, geom);
            feature.setGeometry(buffered);
        }
    }

    function getBufferGeom(geom, buffer) {
        const parser = new jsts.io.OL3Parser();
        const jstsGeom = parser.read(geom);
        const buffered = jstsGeom.buffer(buffer);
        return parser.write(buffered);
    }

    function setSnap(source) {


    }


    let module = {
        init: init,
        active: active,
        dispose: dispose,
        writeWKT: writeWKT,
        getGeometry: getGeometry,
        setBuffer: setBuffer,
        clear: clear,
        setSnap: setSnap
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