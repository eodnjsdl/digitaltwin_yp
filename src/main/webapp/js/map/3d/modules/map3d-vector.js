window.map3d = window.map3d || {}
map3d.vector = (function () {
    const DEFAULT_FILL = {
        color: 'rgba(255,255,255)',
        opacity: 0.4
    }
    const DEFAULT_STROKE = {
        color: 'rgb(0,139,255)',
        width: 3
    }
    const DEFAULT_POINT = {
        fill: DEFAULT_FILL,
        stroke: DEFAULT_STROKE,
        radius: 5
    }


    const DEFAULT_LINE = {
        stroke: DEFAULT_STROKE,
        width: 3,
        radius: 5
    }

    const DEFAULT_POLYGON = {
        fill: DEFAULT_FILL,
        stroke: DEFAULT_STROKE
    }

    const TYPE = {
        POINT: 'Point',
        LINE: 'Line',
        POLYGON: 'Polygon'
    }

    let _pointLayer, _lineLayer, _polygonLayer;
    const _featureTypeMap = new Map();


    function init() {
        if (!_pointLayer) {
            _pointLayer = map3d.layer.addLayer({
                id: 'Vector_Point',
                type: 'Point',
                isDefault: true
            });
        }

        if (!_lineLayer) {
            _lineLayer = map3d.layer.addLayer({
                id: 'Vector_Line',
                type: 'Line',
                isDefault: true
            })
        }

        if (!_polygonLayer) {
            _polygonLayer = map3d.layer.addLayer({
                id: 'Vector_Polygon',
                type: 'Polygon',
                isDefault: true
            })
        }
        Module.getOption().selectColor = new Module.JSColor(255, 79, 245, 255);
    }

    function select(id, multi) {
        if (!multi) {
            clearSelect();
        }
        const layer = getLayerByFeatureId(id);
        if (!layer) {
            return;
        }
        const obj = layer.get(id);
        if (obj.getSelectable()) {
            Module.getMap().setSelectObject(obj);
        }
        const camera = map3d.camera;
        camera.moveLookAt(obj.position, camera.getTilt(), camera.getDirect(), 300);

        // layer.setHighLight(id);
    }

    function clearSelect() {
        Module.getMap().clearSelectObj();
    }

    function clear() {
        _pointLayer.clear();
        _lineLayer.clear();
        _polygonLayer.clear();
        _featureTypeMap.clear();
    }

    function dispose() {
        clear();
        _pointLayer.dispose();
        _lineLayer.dispose();
        _polygonLayer.dispose();
    }

    function getExtent() {
        const extent = [Infinity, Infinity, -Infinity, -Infinity];
        ol.extent.extend(extent, _pointLayer.getExtent());
        ol.extent.extend(extent, _lineLayer.getExtent());
        ol.extent.extend(extent, _polygonLayer.getExtent());
        return extent;
    }

    function fit() {
        const extent = getExtent();
        const width = computeDistance(extent[0], extent[1], extent[2], extent[3])
        const centerVec = new Module.JSVector3D((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2, width < 800 ? 800 : width);
        map3d.camera.move(centerVec, 90, 0, 0);
    }

    function computeDistance(lat1, lon1, lat2, lon2) {
        // generally used geo measurement function
        const R = 6378.137; // Radius of earth in KM
        const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d * 1000; // meters
    }

    function readGeoJson(json, style) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }

        let crs
        try {
            crs = json.crs.properties.name;
            if (crs.includes('urn:ogc:def:crs:EPSG::')) {
                crs = crs.replace('urn:ogc:def:crs:EPSG::', 'EPSG:');
            }
        } catch (e) {
            console.warn('GeoJSON에 좌표계 정보가 없습니다. EPSG:5179로 적용합니다.')
            crs = 'EPSG:5179';
        }
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(json, {
            dataProjection: crs,
            featureProjection: map3d.crs
        });
        addFeatures(features, map3d.crs, style);
    }

    function readWKT(wkt, properties) {
        if (!wkt) {
            return;
        }

        const format = new ol.format.WKT();
        const geometry = format.readGeometry(wkt);
        const feature = new ol.Feature();
        feature.setGeometry(geometry);

        if (properties && typeof properties === 'object') {
            if (properties.geometry) {
                delete properties.geometry
            }
            feature.setProperties(properties, true);
        }
        return addFeature(feature, 'EPSG:4326');
    }

    function addFeatures(features, crs, style) {
        for (let i = 0; i < features.length; i++) {
            addFeature(features[i], crs, style);
        }
    }

    function addFeature(feature, crs, style) {
        const f = feature.clone();
        f.setId(feature.getId() || ol.util.getUid(feature));

        if (f.get("type") === "Circle") {
            const geometry = f.getGeometry();
            f.setGeometry(
                new ol.geom.Circle(
                    geometry.getCoordinates(),
                    feature.get("circleRadius")
                )
            );
        }
        let geometry = f.getGeometry();
        if (crs !== map3d.crs) {
            geometry.transform(ol.proj.get(crs), ol.proj.get(map3d.crs));
        }
        const id = f.getId();
        const param = {
            id: id,
            geometry: geometry,
            style: getStyleOption(f, style),
            properties: f.getProperties(),
        }
        let object;
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            object = _pointLayer.add(param);
            _featureTypeMap.set(id, TYPE.POINT);
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            object = _lineLayer.add(param);
            _featureTypeMap.set(id, TYPE.LINE);
        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon || geometry instanceof ol.geom.Circle) {
            object = _polygonLayer.add(param);
            _featureTypeMap.set(id, TYPE.POLYGON);
        }
        return object;
    }

    function getLayerByFeatureId(id) {
        const type = _featureTypeMap.get(id);
        if (!type) {
            return;
        }
        if (type === TYPE.POINT) {
            return _pointLayer;
        } else if (type === TYPE.LINE) {
            return _lineLayer;
        } else if (type === TYPE.POLYGON) {
            return _polygonLayer;
        } else {
            return;
        }
    }

    function getFeature(id) {
        const layer = getLayerByFeatureId(id);
        if (!layer) {
            return;
        }

        return layer.get(id);
    }

    function getStyleOption(feature, style) {

        let styleOpt;
        if (style && typeof style === 'function') {
            styleOpt = style(feature);
        } else {
            styleOpt = {...feature.get('style'), ...style, ...{}};
        }
        if (styleOpt.label) {
            if (styleOpt.label.column) {
                styleOpt.label.text = feature.get(styleOpt.label.column);
            }
        }
        const geometry = feature.getGeometry();
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            if (!styleOpt.marker) {
                styleOpt = {...DEFAULT_POINT, ...styleOpt};
            }
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            styleOpt = {...DEFAULT_LINE, ...styleOpt};

        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon || geometry instanceof ol.geom.Circle) {
            styleOpt = {...DEFAULT_POLYGON, ...styleOpt};

        }
        return styleOpt;

    }

    function removeFeatureByFilter(filter) {
        let keys = []
        _featureTypeMap.forEach(function (v, k) {
            keys.push(k);
        });
        let features = [];
        keys.filter((v) => {
            const feature = getFeature(v);
            if (filter(feature, feature.properties)) {
                features.push(v);
            }
        })
        //
        features.forEach((v) => {
            const layer = getLayerByFeatureId(v);
            if (layer) {
                layer.removeById(v);
                _featureTypeMap.delete(v);
            }
        });
    }

    let module = {
        init: init,
        readWKT: readWKT,
        readGeoJson: readGeoJson,
        removeFeatureByFilter: removeFeatureByFilter,
        addFeatures: addFeatures,
        getFeature: getFeature,
        select: select,
        clear: clear,
        clearSelect: clearSelect,
        dispose: dispose,
        fit: fit
    }

    Object.defineProperties(module, {
        'layer': {
            get: function () {
                return _layer;
            }
        }
    })
    return module;
}());