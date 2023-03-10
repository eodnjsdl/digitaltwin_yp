window.map3d = window.map3d || {}
map3d.draw = (function () {
    let _type;

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

    function getCoordinates() {
        let coords = [];
        let list = Module.getMap().getInputPointList();
        for (let i = 0; i < list.count; i++) {
            let vec = list.item(i);
            coords.push([vec.Longitude, vec.Latitude, vec.Altitude]);
        }
        return coords;
    }

    function writeGeoJson() {
        let feature = new ol.Feature({
            geometry: getGeometry()
        });
        let format = new ol.format.GeoJSON();

        return format.writeFeatures([feature]);


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

    function writeWKT() {
        const geom = getGeometry();
        const format = new ol.format.WKT();
        return format.writeGeometry(geom);
    }

    function getGeometry() {
        let coords = getCoordinates();
        let geom;
        if (_type === 'POINT') {
            //point
            geom = new ol.geom.Point(coords[0])
        } else if (_type === 'LINESTRING') {
            //line
            geom = new ol.geom.LineString(coords);
        } else if (_type === 'BOX' || _type === 'CIRCLE') {
            //polygon
            geom = new ol.geom.Polygon([coords]);
        }
        return geom;
    }


    let module = {
        init: init,
        active: active,
        dispose: dispose,
        writeGeoJson: writeGeoJson,
        readGeoJson: readGeoJson,
        writeWKT: writeWKT,
        clear: clear
    };
    return module;

}());