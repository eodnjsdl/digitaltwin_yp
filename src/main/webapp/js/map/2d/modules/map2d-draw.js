window.map2d = window.map2d || {}
map2d.draw = (function () {

    let _layer;
    let _source;
    let _draw;
    let _snap;
    let _modify;
    let _select;
    let _translate;
    let _drawOptions;
    let _buffer;
    let _snapLayer;
    let _snapSource;
    const _snapCollection = new ol.Collection([], {unique: true});

    const DEFAULT_TYPE = 'Polygon'
    const ORI_GEOM_KEY = '_ori_geom'

    function init() {
        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            zIndex: 999,
            style: map2d.vector.style,
            isDefault: true
        });

        _source.on('addfeature', onAddFeature);
        _source.on('removefeature', onRemoveFeature);

        map2d.map.addLayer(_layer);
    }

    function onAddFeature(e) {
        _snapCollection.push(e.feature);
    }

    function onRemoveFeature(e) {
        _snapCollection.remove(e.feature);
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
     *
     * @example 편집 예제
     * const feature = dtmap.vector.getFeature(featureId); //편집대상 피쳐검색
     * dtmap.draw.clear(); //그리기 소스 및 스냅레이어 초기화
     * dtmap.draw.active({type:'Modify'}); //그리기 편집 활성화 'Modify' 'Translate'
     * dtmap.draw.addFeatures(feature); //편집 대상 피쳐 추가
     *
     * //스냅레이어 설정
     * dtmap.draw.setSnapLayer('digitaltwin:lsmd_cont_ldreg_41830');
     *
     * //스냅레이어 클리어
     * dtmap.draw.clearSnapLayer();
     *
     * //편집 완료된 결과 받기
     * dtmap.draw.writeGeoJson(); //결과 GeoJson String 리턴
     *
     * //버퍼 적용하기
     * dtmap.draw.setBuffer(10); //적용
     *
     * dtmap.draw.setBuffer(0); //해제
     *
     */
    function active(options) {
        // dispose();
        map2d.setInteraction(this, true);
        _drawOptions = parseOption(options);
        if (_drawOptions.type === 'Modify') {
            createModify();
        } else if (_drawOptions.type === 'Translate') {
            createTranslate();
        } else {
            createDraw(_drawOptions);
        }
        createSnap();


    }

    function createDraw(options) {
        if (!_draw) {
            let geomFunction;
            let drawType = 'Circle';
            let {type} = options;
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
    }

    function createSnap() {
        if (!_snap) {
            _snap = new ol.interaction.Snap({
                features: _snapCollection
            });
            map2d.map.addInteraction(_snap);
        }
    }

    function createModify() {
        createSelect();
        if (!_modify) {
            _modify = new ol.interaction.Modify({
                features: _select.getFeatures(),
            });
            map2d.map.addInteraction(_modify);
        }
    }

    function createTranslate() {
        createSelect();
        if (!_translate) {
            _translate = new ol.interaction.Translate({
                features: _select.getFeatures(),
            });
            map2d.map.addInteraction(_translate);
        }


    }

    function createSelect() {
        if (!_select) {
            _select = new ol.interaction.Select({
                filter: function (feature, layer) {
                    return layer === _layer;
                },
                style: selectStyleFunction
            });
            map2d.map.addInteraction(_select);
            // _select.on('select', onSelect)
            map2d.map.on('pointermove', onPointerMove);
        }
    }

    function selectStyleFunction(feature, resolution) {
        const style = map2d.vector.style(feature, resolution);


        const fill = new ol.style.Fill({
            color: 'rgba(255,0,0,0.01)'
        });
        const stroke = new ol.style.Stroke({
            color: 'rgba(255,0,0,0.2)',
            width: 3
        });
        const selectStyle = new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: 'rgba(255,255,255,0.51)'
                }),
                stroke: stroke,
                radius: 5
            }),
            fill: fill,
            stroke: stroke
        });
        if (style instanceof Array) {
            return [...style, selectStyle]
        } else {
            return [style, selectStyle]
        }
    }

    function onSelect(e) {
        map2d.map.getTargetElement().style.cursor = '';
    }

    function onPointerMove(e) {
        map2d.map.getTargetElement().style.cursor = '';
        let hit = map2d.map.hasFeatureAtPixel(e.pixel);
        if (hit) {
            const selected = _select.getFeatures().getArray()[0];
            if (selected) {
                return;
            }
            const find = map2d.map.getFeaturesAtPixel(e.pixel)[0];
            if (selected === find) {
                return;
            }
            hit = hit && _source.hasFeature(find);
            map2d.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
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
            map2d.map.un('pointermove', onPointerMove);
            _select.un('select', onSelect);
            _select = undefined;
        }

    }

    function clear() {
        _source.clear();
        clearSnapLayer();
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
            dtmap.trigger('drawend', {geometry: e.feature.getGeometry(), feature: e.feature, origin: e});
        })
    }


    function writeWKT(index) {
        const format = new ol.format.WKT();
        const features = removePrivateProperty(_source.getFeatures());
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

    function removePrivateProperty(feature) {
        if (!feature) {
            return;
        }

        if (feature instanceof Array) {
            const ary = [];
            for (let i = 0; i < feature.length; i++) {
                const f = removePrivateProperty(feature[i]);
                if (f) {
                    ary.push(f);
                }
            }
            return ary;
        } else {
            const cloned = feature.clone();
            cloned.unset('_style');
            cloned.unset('_selected');
            return cloned;
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
        if (geom instanceof ol.geom.Circle) {
            geom = ol.geom.Polygon.fromCircle(geom);
        }

        const parser = new jsts.io.OL3Parser();
        const jstsGeom = parser.read(geom);
        const buffered = jstsGeom.buffer(buffer);
        return parser.write(buffered);
    }

    function readGeoJson(json, style) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }

        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(json).map((feature) => {

            // cloned.set("grphcId", grphcId);
            if (feature.get("type") === "Circle") {
                const geometry = feature.getGeometry();
                feature.setGeometry(
                    new ol.geom.Circle(
                        geometry.getCoordinates(),
                        feature.get("circleRadius")
                    )
                );
            }
            if (style) {
                feature.set('style', style);
            }
            return feature;
        });
        _source.addFeatures(features);
    }

    function writeGeoJson() {
        let features = _source.getFeatures();
        if (features.length === 0) {
            return;
        }

        const format = new ol.format.GeoJSON();
        features = features.map((feature) => {
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

    function getSnapLayer() {
        if (_snapLayer) {
            return _snapLayer.get('name');
        }
    }

    /**
     * 스냅 레이어 설정
     * 성능을 고려해 줌레벨 16부터 가시화 됨
     * @param {string} name 레이어 서비스 명
     */
    function setSnapLayer(name) {
        clearSnapLayer();

        if (!_snapSource) {
            _snapSource = new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                loader: function (extent, resolution, projection, success, failure) {
                    dtmap.wfsGetFeature({
                        typeNames: name,
                        bbox: extent,
                        cql: '1=1',
                        crs: dtmap.crs
                    }).then(function (json) {
                        const features = _snapSource.getFormat().readFeatures(json);
                        _snapSource.addFeatures(features);
                    })
                },
                strategy: ol.loadingstrategy.bbox
            });
            _snapSource.on('addfeature', onAddFeature);
            _snapSource.on('removefeature', onRemoveFeature);
        }

        if (!_snapLayer) {
            _snapLayer = new ol.layer.Vector({
                source: _snapSource,
                zIndex: 998,
                minZoom: 16,
            });
            _snapLayer.set('name', name);
            map2d.map.addLayer(_snapLayer);
        }


    }

    function clearSnapLayer() {
        if (_snapSource) {
            _snapSource.clear();
            _snapSource = undefined;
        }

        if (_snapLayer) {
            map2d.map.removeLayer(_snapLayer);
            _snapLayer = undefined;
        }
    }

    function addFeatures(features) {
        if (!features) {
            return;
        }
        if (features instanceof Array) {
            _source.addFeatures(features);
        } else {
            _source.addFeature(features);
            _select.getFeatures().push(features);
        }
    }

    let module = {
        init: init,
        active: active,
        dispose: dispose,
        writeWKT: writeWKT,
        writeGeoJson: writeGeoJson,
        readGeoJson: readGeoJson,
        getGeometry: getGeometry,
        setBuffer: setBuffer,
        getSnapLayer: getSnapLayer,
        setSnapLayer: setSnapLayer,
        clearSnapLayer: clearSnapLayer,
        addFeatures: addFeatures,
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