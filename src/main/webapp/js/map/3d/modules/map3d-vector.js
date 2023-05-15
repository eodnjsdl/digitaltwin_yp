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
        }
    }
    const TYPE = {
        POINT: 'Point',
        LINE: 'Line',
        POLYGON: 'Polygon'
    }

    let _source, _pointLayer, _lineLayer, _polygonLayer;

    function init() {
        if (!_pointLayer) {
            _pointLayer = map3d.layer.addLayer({
                id: 'Vector_Point',
                type: 'Point',
                visible: true,
                isDefault: true
            });
        }

        if (!_lineLayer) {
            _lineLayer = map3d.layer.addLayer({
                id: 'Vector_Line',
                type: 'Line',
                visible: true,
                isDefault: true
            })
        }

        if (!_polygonLayer) {
            _polygonLayer = map3d.layer.addLayer({
                id: 'Vector_Polygon',
                type: 'Polygon',
                visible: true,
                isDefault: true
            })
        }
        _source = new ol.source.Vector();
        Module.getOption().selectColor = new Module.JSColor(255, 79, 245, 255);
    }

    function select(id, options) {
        options = options || {};
        const multi = options.multi === undefined ? false : options.multi;
        const move = options.move === undefined ? true : options.move;
        if (!multi) {
            clearSelect();
        }
        const obj = getObject3D(id);
        if (!obj) {
            return;
        }
        const object3d = obj.object;
        if (!object3d || !object3d.getSelectable()) {
            return;
        }

        Module.getMap().setSelectObject(object3d);

        if (move) {
            map3d.setCenter([object3d.position.Longitude, object3d.position.Latitude]);
        }
        let feature = _source.getFeatureById(id);
        if (feature) {
            feature.set('_selected', true);
            Module.XDRenderData();
        }
        // layer.setHighLight(id);
    }

    function unselect(id) {
        const obj = getObject3D(id);
        if (!obj) {
            return;
        }
        const object3d = obj.object;
        if (!object3d || !object3d.getSelectable()) {
            return;
        }

        debugger;
    }

    function getSelected() {
        const features = _source
            .getFeatures()
            .filter(function (feature) {
                return feature.get('_selected') ? feature : undefined;
            });
        return features;
    }


    function clearSelect() {
        Module.getMap().clearSelectObj();
        _source.getFeatures().forEach(function (f) {
            f.unset('_selected');
        });
    }

    function clear() {
        _pointLayer.clear();
        _lineLayer.clear();
        _polygonLayer.clear();
        _source.clear();
    }

    function dispose() {
        clear();
        _pointLayer.dispose();
        _lineLayer.dispose();
        _polygonLayer.dispose();
    }

    function getExtent() {
        return _source.getExtent();
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
        if (json.features.length === 0) {
            return;
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
        addFeatures(features, style);
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
        return addFeature(feature);
    }

    function addFeatures(features, style) {
        for (let i = 0; i < features.length; i++) {
            addFeature(features[i], style);
        }
    }

    function addFeature(feature, style) {
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
        const styleOpt = getStyleOption(f, style);
        const geometry = f.getGeometry();
        const param = {
            id: f.getId(),
            geometry: geometry,
            style: styleOpt,
            properties: f.getProperties(),
        }
        let object;
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            object = _pointLayer.add(param);
            f.set('_type', TYPE.POINT);
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            object = _lineLayer.add(param);
            f.set('_type', TYPE.LINE);
        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon || geometry instanceof ol.geom.Circle) {
            object = _polygonLayer.add(param);
            f.set('_type', TYPE.POLYGON)
        }
        _source.addFeature(f);
        return object;
    }

    function addPoint(options) {
        const geom = dtmap.util.createGeometry('Point', options);
        const feature = dtmap.util.createFeature(geom, options);
        return addFeature(feature, options.style, options.crs);
    }

    function addLine(options) {
        const geom = new ol.geom.LineString(options.coordinates);
        const feature = dtmap.util.createFeature(geom, options);
        return addFeature(feature, options.style, options.crs);
    }

    function addPolygon(options) {
        const geom = new ol.geom.Polygon(options.coordinates);
        const feature = dtmap.util.createFeature(geom, options);
        return addFeature(feature, options.style, options.crs);
    }


    function getLayerFromFeature(feature) {
        const type = feature.get('_type');
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
        return _source.getFeatureById(id);
    }

    function getObject3D(id) {
        const feature = _source.getFeatureById(id);
        const layer = getLayerFromFeature(feature);
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
            styleOpt = _.merge({}, feature.get('style'), style);
        }
        if (styleOpt.label) {
            styleOpt.label = _.merge({}, DEFAULT_LABEL, styleOpt.label);
            if (styleOpt.label.column) {
                styleOpt.label.text = feature.get(styleOpt.label.column);
            }
        }
        const geometry = feature.getGeometry();
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            if (!styleOpt.marker) {
                styleOpt = _.merge({}, DEFAULT_POINT, styleOpt);
            }
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            styleOpt = _.merge({}, DEFAULT_LINE, styleOpt);

        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon || geometry instanceof ol.geom.Circle) {
            styleOpt = _.merge({}, DEFAULT_POLYGON, styleOpt);

        }
        return styleOpt;

    }

    function removeFeature(feature) {
        const layer3d = getLayerFromFeature(feature);
        if (layer3d) {
            layer3d.removeById(feature.getId());
            _source.removeFeature(feature);
        }
    }

    function removeFeatureById(id) {
        const feature = _source.getFeatureById(id);
        if (feature) {
            const layer3d = getLayerFromFeature(feature);
            layer3d.removeById(id);
            _source.removeFeature(feature);
        }
    }

    function removeFeatureByFilter(filter) {
        const features = _source
            .getFeatures()
            .filter(function (feature) {
                return filter(feature);
            });
        features.forEach((feature) => {
            removeFeature(feature);
        });
    }

    let module = {
        init: init,
        readWKT: readWKT,
        readGeoJson: readGeoJson,
        removeFeature: removeFeature,
        removeFeatureById: removeFeatureById,
        removeFeatureByFilter: removeFeatureByFilter,
        addFeature: addFeature,
        addFeatures: addFeatures,
        addPoint: addPoint,
        addLine: addLine,
        addPolygon: addPolygon,
        getFeature: getFeature,
        getObject3D: getObject3D,
        getSelected: getSelected,
        select: select,
        unselect: unselect,
        clear: clear,
        clearSelect: clearSelect,
        dispose: dispose,
        fit: fit
    }

    return module;
}());