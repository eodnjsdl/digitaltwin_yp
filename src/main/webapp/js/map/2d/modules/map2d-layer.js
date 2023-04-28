window.map2d = window.map2d || {}
map2d.layer = (function () {

    const TIME_OUT = 100 * 60 * 10; //레이어 삭제에 쓰이는 타임아웃
    let timeOutMap = new Map();

    function addLayer(options) {
        let {id, type} = options;
        if (getById(id)) {
            throw new Error(id + " 레이어가 이미 존재합니다.");
        }
        if (!type) {
            throw new Error("레이어 종류가 지정되지 않았습니다.");
        }
        let layer = createLayer(options);
        map2d.map.addLayer(layer);
        return layer;
    }

    function removeLayer(id) {
        let layer = getById(id)
        if (!layer) {
            return;
        }
        map2d.map.removeLayer(layer);
    }

    function setVisible(id, visible) {
        let layer = getById(id);
        if (visible) {
            let timeout = timeOutMap.get(id);
            if (timeout) {
                clearTimeout(timeout);
            }
        } else {
            removeByTimeOut(id, layer);
        }
        layer.setVisible(visible);
    }

    //레이어 가시화 OFF 10분후 삭제
    function removeByTimeOut(id, layer) {
        let timeout = setTimeout(function () {
            if (layer.visible) {
                removeByTimeOut(id, layer)
            } else {
                removeLayer(id);
            }
            timeOutMap.delete(id);
        }, TIME_OUT);
        timeOutMap.set(id, timeout);
    }

    function getById(id) {
        let layers = map2d.map.getLayers().getArray().slice();
        let layer;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].get("id") === id) layer = layers[i];
        }
        return layer;
    }


    function createLayer(options) {
        let {type} = options;
        if (type === 'WMS') {
            return createWMS(options);
        } else if (type === 'TMS') {

        }

    }

    function createWMS(options) {
        const {id, title, layerNm} = options;
        const layer = new ol.layer.Image({
            id: id,
            title: title,
            zIndex: options.zIndex || 1,
            // extent: ol.proj.transformExtent(extent, bbox.crs.$, gis.map.Instance.getView().getProjection()),
            source: new ol.source.ImageWMS({
                url: '/gis/wms',
                params: {
                    version: '1.1.0',
                    layers: layerNm
                },
                // projection: ol.proj.get(e.srs),
                ratio: 1,
                crossOrigin: 'anonymous',
                serverType: 'geoserver',
            }),
        });
        return layer;
    }

    function clear() {
        let layers = map2d.map.getLayers().getArray().slice();
        let targets = [];
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].get("isDefault")) {
                continue;
            }
            targets.push(layers[i]);
        }

        for (let i = 0; i < targets.length; i++) {
            map2d.map.removeLayer(targets[i]);
        }
    }

    let module = {
        addLayer: addLayer,
        removeLayer: removeLayer,
        setVisible: setVisible,
        clear: clear,
        getById: getById
    }
    return module;
}());