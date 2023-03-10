window.map3d = window.map3d || {}
map3d.draw = (function () {
    let _mode;

    function init() {

    }

    function active(mode) {
        _mode = mode.toUpperCase();
        let state;
        if (_mode === 'POINT') {
            state = Module.MML_INPUT_POINT
        } else if (_mode === 'LINE') {
            state = Module.MML_INPUT_LINE
        } else if (_mode === 'BOX') {
            state = Module.MML_INPUT_RECT
        } else if (_mode === 'RADIUS') {
            state = Module.MML_INPUT_CIRCLE
        } else {
            state = Module.MML_MOVE_GRAB
        }
        Module.XDSetMouseState(state);
    }

    function dispose() {
        Module.XDSetMouseState(Module.MML_MOVE_GRAB);
    }

    function clear() {
        Module.getMap().clearInputPoint();
    }

    function writeGeoJson() {
        let coords = getCoordinates();
        let geom;
        if (_mode === 'POINT') {
            //point
            geom = new ol.geom.Point(coords[0])
        } else if (_mode === 'LINE') {
            //line
            geom = new ol.geom.LineString(coords);
        } else if (_mode === 'BOX' || _mode === 'RADIUS') {
            //polygon
            geom = new ol.geom.Polygon([coords]);
        }

        let feature = new ol.Feature({
            geometry: geom
        });
        let format = new ol.format.GeoJSON();

        return format.writeFeatures([feature]);


    }

    function getCoordinates() {
        let coords = [];
        let list = Module.getMap().getInputPointList();
        for (let i = 0; i < list.count; i++) {
            let vec = list.item(i);
            coords.push([vec.Longitude, vec.Latitude, vec.Altitude]);
        }
        return coords;
    }

    function readGeoJson(json) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        //TODO 필요시 개발
        const features = json.features;
        for (let i = 0; i < features.length; i++) {
            const f = features[i];
            const coordinates = f.geometry.coordinates;
            for (let j = 0; j < coordinates.length; j++) {
                Module.getMap().addInputPoint(coordinates[j][0], coordinates[j][1])
            }

        }

    }


    let module = {
        init: init,
        active: active,
        dispose: dispose,
        writeGeoJson: writeGeoJson,
        readGeoJson: readGeoJson,
        clear: clear
    };
    return module;

}());