window.map3d = window.map3d || {}
map3d.vector = (function () {
    const DEFAULT_POINT = {
        fill: {
            color: '#4854d3'
        },
        stroke: {
            color: 'white',
            width: 2
        },
        radius: 5
    }

    const DEFAULT_LINE = {
        stroke: {
            color: '#4854d3',
            width: 3
        },
        radius: 5
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
                type: 'Point'
            });
        }

        if (!_lineLayer) {
            _lineLayer = map3d.layer.addLayer({
                id: 'Vector_Line',
                type: 'Line'
            })
        }

        if (!_polygonLayer) {
            _polygonLayer = map3d.layer.addLayer({
                id: 'Vector_Polygon',
                type: 'Polygon'
            })
        }
        Module.getOption().selectColor = new Module.JSColor(255, 79, 245, 255);
    }

    function select(id) {
        const layer = getLayerByFeatureId(id);
        if (!layer) {
            return;
        }
        const obj = layer.get(id);
        if (obj.getSelectable()) {
            Module.getMap().setSelectObject(obj);
        }
        const camera = map3d.camera;
        camera.moveLookAt(obj.getPosition(), camera.getTilt(), camera.getDirect(), 800);

        // layer.setHighLight(id);
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

    function addFeatures(features, crs, style) {
        for (let i = 0; i < features.length; i++) {
            addFeature(features[i], crs, style);
        }
    }

    function addFeature(feature, crs, style) {
        const f = feature.clone();
        f.setId(feature.getId() || ol.util.getUid(feature));
        let geometry = f.getGeometry();
        if (crs !== map3d.crs) {
            geometry.transform(ol.proj.get(crs), ol.proj.get(map3d.crs));
        }
        const id = feature.getId();
        const param = {
            id: id,
            coordinates: geometry.getCoordinates(),
            properties: feature.getProperties(),
            style: getStyleOption(feature, style)
        }
        let object;
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            object = _pointLayer.add(param);
            _featureTypeMap.set(id, TYPE.POINT);
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            object = _lineLayer.add(param);
            _featureTypeMap.set(id, TYPE.Line);
        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon) {
            object = _polygonLayer.add(param);
            _featureTypeMap.set(id, TYPE.Polygon);
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
            styleOpt = style || {};
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

        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon) {


        }
        return styleOpt;

    }

    let module = {
        init: init,
        readGeoJson: readGeoJson,
        addFeatures: addFeatures,
        getFeature: getFeature,
        select: select,
        clear: clear,
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