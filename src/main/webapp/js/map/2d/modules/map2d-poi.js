window.map2d = window.map2d || {}
map2d.poi = (function () {

    let _source;
    let _layer;

    function init() {

        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source
        });
        map2d.map.addLayer(_layer);
        _source.on('change', onSourceChange)

    }

    /**
     * Poi 추가
     * @param options
     * @param {number} [options.id]
     * @param {number[]} options.coordinate
     * @param {string} options.crs
     * @param {string} options.text
     * @param {string} options.img
     * @param {object} [options.properties]
     */
    function addPoi(options) {
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

        feature.setProperties(options.properties);

        feature.setStyle(styleFunction.bind(options));


        _source.addFeature(feature);
    }

    /**
     * Poi 삭제
     * @param {string} id
     */
    function removePoi(id) {

    }

    function select(id) {
        let feature = _source.getFeatureById(id);
        if (feature) {
            const coords = feature.getGeometry().getCoordinates();
            feature.set('_selected', true);
            map2d.view.setCenter(coords);
        }
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

    function styleFunction(feature, resolution) {
        let selected = feature.get('_selected');
        let image = new ol.style.Icon({
            anchor: [0.5, 1],
            src: this.img,
            color: selected ? '#4ff5ff' : undefined
        })

        let text = new ol.style.Text({
            text: this.text,
            font: "14px 'Noto Sans KR'",
            fill: new ol.style.Fill({
                color: '#ffffff'
            }),
            stroke: new ol.style.Stroke({
                color: '#000000',
                width: 2
            }),
            offsetY: 15,
            textAlign: "center",
            textBaseline: "bottom",
        })
        return new ol.style.Style({
            image: image,
            text: text,
            zIndex: selected ? 9999 : undefined
        })
    }

    let module = {
        init: init,
        addPoi: addPoi,
        removePoi: removePoi,
        select: select,
        clear: clear,
        dispose: dispose
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
        }
    })
    return module;
}())