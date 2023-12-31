window.map3d = window.map3d || {}
map3d.draw = (function () {
    let _type;
    let _buffer = 0;
    let _bufferLayer;
    let BUFFER_LAYER_KEY = 'BUFFER_POLYGON_LAYER';
    let _isDown = false;
    let _isDrag = false;

    function init() {

    }

    function active(options) {
        map3d.setInteraction(this);
        let {type} = options;

        _type = type.toUpperCase();
        let state;
        if (_type === 'POINT') {
            state = Module.MML_INPUT_POINT
        } else if (_type === 'LINESTRING') {
            state = Module.MML_INPUT_LINE
        } else if (_type === 'BOX') {
            state = Module.MML_INPUT_RECT
        } else if (_type === 'CIRCLE') {
            state = Module.MML_INPUT_CIRCLE
        } else if (_type === 'POLYGON') {
            state = Module.MML_INPUT_AREA
        } else {
            state = Module.MML_SELECT_POINT
        }
        Module.XDSetMouseState(state);
        getBufferLayer();
        map3d.canvas.addEventListener('mousedown', onMouseDown);
        map3d.canvas.addEventListener('mouseup', onMouseUp);
        map3d.canvas.addEventListener('mousemove', onMouseMove);
    }

    function dispose() {
        Module.XDSetMouseState(Module.MML_SELECT_POINT);
        map3d.canvas.removeEventListener('mousedown', onMouseDown);
        map3d.canvas.removeEventListener('mouseup', onMouseUp);
        map3d.canvas.removeEventListener('mousemove', onMouseMove);
        removeBufferLayer();
    }

    function clear() {
        Module.getMap().clearInputPoint();
        if (_bufferLayer) {
            _bufferLayer.removeAll();
        }
    }

    function getCoordinates() {
        let coords = [];
        let list = Module.getMap().getInputPointList();
        for (let i = 0; i < list.count; i++) {
            let vec = list.item(i);
            coords.push([vec.Longitude, vec.Latitude
                // , vec.Altitude
            ]);
        }
        return coords;
    }

    function addGeometry(geom) {
        if (geom instanceof ol.geom.Point) {
            _type = 'POINT';
        } else if (geom instanceof ol.geom.LineString) {
            _type = 'LINESTRING';
        } else if (geom instanceof ol.geom.Polygon) {
            _type = 'POLYGON';
        }
        const coordinates = geom.getFlatCoordinates();
        for (let i = 0; i < coordinates.length; i += 2) {
            Module.getMap().addInputPoint(coordinates[i], coordinates[i + 1]);
        }
    }

    function writeGeoJson() {
        let feature = new ol.Feature({
            geometry: getGeometry()
        });
        let format = new ol.format.GeoJSON();
        return format.writeFeatures([feature]);
    }

    function readGeoJson(json, style) {

        dtmap.util.readGeoJson(json).map((feature) => {
            if (typeof style === 'function') {
                feature.set('_style', style);
            } else {
                feature.set('style', style);
            }
            const geom = feature.getGeometry();
            addGeometry(geom);
            return feature;
        });
    }

    function writeWKT() {
        const geom = getGeometry();
        const format = new ol.format.WKT();
        return format.writeGeometry(geom);
    }

    /**
     * 도형 반환
     * OpenLayers Geometry 타입으로 리턴
     * @returns {ol.geom.Geometry}
     */
    function getGeometry() {
        let coords = getCoordinates();
        if (coords === undefined || coords.length === 0) {
            return;
        }

        let geom;
        if (_type === 'POINT') {
            //point
            geom = new ol.geom.Point(coords[0])
        } else if (_type === 'LINESTRING') {
            //line
            if (coords.length < 2) {
                return;
            }
            geom = new ol.geom.LineString(coords);
        } else if (_type === 'BOX' || _type === 'CIRCLE' || _type === 'POLYGON') {
            //polygon
            if (coords.length < 3) {
                return;
            }
            geom = new ol.geom.Polygon([coords]);
        }

        return dtmap.util.getBufferGeometry(geom, _buffer);
    }

    function setBuffer(buffer) {
        _buffer = buffer;
        drawBuffer();
    }

    function getBuffer() {
        return _buffer;
    }

    function drawBuffer() {
        if (_bufferLayer) {
            _bufferLayer.removeAll();
        }

        if (_buffer <= 0 || isNaN(_buffer)) {
            return;
        }

        const geom = getGeometry();
        if (!geom) {
            return;
        }

        const coordinates = geom.getCoordinates();
        // 폴리곤 생성을 위해 3D 좌표로 변환
        var buffer3D = new Module.JSVec3Array();
        for (var i = 0; i < coordinates.length; i++) {
            const coords = coordinates[i]
            for (let j = 0; j < coords.length; j++) {
                buffer3D.push(new Module.JSVector3D(coords[j][0], coords[j][1], 100.0));

            }
        }

        // 폴리곤 생성
        var polygon = Module.createPolygon("BUFFER_POLYGON");

        // 폴리곤 색상 설정
        var polygonStyle = new Module.JSPolygonStyle();
        polygonStyle.setFill(true);
        polygonStyle.setFillColor(new Module.JSColor(100, 255, 255, 0));
        polygonStyle.setOutLine(true);
        polygonStyle.setOutLineWidth(1.0);
        polygonStyle.setOutLineColor(new Module.JSColor(100, 255, 0, 0));
        polygon.setStyle(polygonStyle);

        // 폴리곤 형상 설정
        var part = new Module.Collection();
        part.add(buffer3D.count());
        polygon.setPartCoordinates(buffer3D, part);


        // 레이어에 추가
        _bufferLayer.addObject(polygon, 0);
    }

    function getBufferLayer() {

        // 폴리곤을 저장할 레이어 반환
        _bufferLayer = map3d.userLayers.nameAtLayer(BUFFER_LAYER_KEY);
        if (_bufferLayer == null) {
            _bufferLayer = map3d.userLayers.createLayer(BUFFER_LAYER_KEY, Module.ELT_PLANE);
        }
    }

    function removeBufferLayer() {
        map3d.userLayers.delLayerAtName(BUFFER_LAYER_KEY)
        _bufferLayer = undefined;
    }

    function onMouseDown(e) {
        if (e.button !== 0) {
            return;
        }
        _isDown = true;
        if (_type === 'POINT') {
            Module.getMap().clearInputPoint();
        }

        if (_bufferLayer) {
            _bufferLayer.removeAll();
        }
        dtmap.trigger('drawstart', {geometry: getGeometry(), origin: e});
    }

    function onMouseUp(e) {
        if (e.button !== 0) {
            return;
        }

        if (!_isDrag || (_type === 'BOX' || _type === 'CIRCLE')) {
            drawBuffer();
            const geom = getGeometry();
            if (geom) {

                dtmap.trigger('drawend', {geometry: geom, origin: e});
            }
        }
        _isDown = false;
        _isDrag = false;
    }

    function onMouseMove(e) {
        if (_isDown) {
            _isDrag = true;
        }
    }


    function getSnapLayer() {
        console.warn('3D 지도에서 지원하지 않는 기능입니다.');
    }

    function setSnapLayer() {
        console.warn('3D 지도에서 지원하지 않는 기능입니다.');
    }

    function clearSnapLayer() {
        console.warn('3D 지도에서 지원하지 않는 기능입니다.');
    }

    let module = {
        init: init,
        active: active,
        dispose: dispose,
        writeGeoJson: writeGeoJson,
        readGeoJson: readGeoJson,
        writeWKT: writeWKT,
        getGeometry: getGeometry,
        setBuffer: setBuffer,
        getBuffer: getBuffer,
        getSnapLayer: getSnapLayer,
        setSnapLayer: setSnapLayer,
        clearSnapLayer: clearSnapLayer,
        addGeometry: addGeometry,
        clear: clear
    };
    return module;

}());