window.map2d = window.map2d || {}
map2d.draw = (function () {

    let _layer;
    let _source;

    function init() {
        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            name: 'drawLayer',
            zIndex: 3,
        });
        map2d.map.addLayer(_layer);
    }

    function active(type) {

    }

    function dispose() {

    }

    function setStyle() {

    }

    let module = {
        init: init,
        active: active,
        dispose: dispose,
        setStyle: setStyle
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
}());