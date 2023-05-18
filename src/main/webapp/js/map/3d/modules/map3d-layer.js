window.map3d = window.map3d || {};
map3d.layer = (function () {
    const TIME_OUT = 100 * 60 * 10; //레이어 삭제에 쓰이는 타임아웃
    let objectLayerList, tileLayerList;
    let layerMap = new Map();
    let timeOutMap = new Map();

    function init() {
        objectLayerList = Module.getObjectLayerList();
        tileLayerList = Module.getTileLayerList();
    }

    /**
     *
     * @param {object || map3d.layer.Layer}options
     * @returns {*}
     */
    function addLayer(options) {
        if (options instanceof map3d.layer.Layer) {
            let layer = options;
            if (getById(layer.id)) {
                throw new Error(layer.id + " 레이어가 이미 존재합니다.");
            }
            layerMap.set(layer.id, layer);
            return layer;
        } else {

            let {id, type} = options;
            if (getById(id)) {
                throw new Error(id + " 레이어가 이미 존재합니다.");
            }

            if (!type) {
                throw new Error("레이어 종류가 지정되지 않았습니다.");
            }
            let layer = createLayer(options);
            layerMap.set(id, layer);
            return layer;
        }
    }

    function createLayer(options) {
        let {type} = options;

        if (type === 'Image') {
            return new map3d.layer.Image(options);
        } else if (type === 'SHP') {
            return new map3d.layer.SHP(options);
        } else if (type === 'LOD') {
            return new map3d.layer.LOD(options);
        } else if (type === 'WMS') {
            return new map3d.layer.WMS(options);
        } else if (type === 'CSV') {
            return new map3d.layer.CSV(options);
        } else if (type === 'POI') {
            return new map3d.layer.POI(options);
        } else if (type === 'Facility') {
            return new map3d.layer.Facility(options);
        } else if (type === 'Graph') {
            let layer = new map3d.layer.Graph(options);
            layer.setData(GRAPH_DATA[options.layerNm]);
            return layer;
        } else if (type === 'Point') {
            return new map3d.layer.Point(options);
        } else if (type === 'Line') {
            return new map3d.layer.Line(options);
        } else if (type === 'Polygon') {
            return new map3d.layer.Polygon(options);
        }

    }

    /**
     * 레이어 삭제
     * @param id
     */
    function removeLayer(id) {
        let layer = getById(id);
        if (!layer) {
            return;
        }
        let list;
        if (layer.serviceType === 'user') {
            list = objectLayerList;
        } else {
            list = tileLayerList;
        }
        if (layer instanceof map3d.layer.Group) {
            for (let i = 0; i < layer.layers.length; i++) {
                list.delLayerAtName(layer.layers[i].getName());
            }
        } else {
            list.delLayerAtName(layer.getName());
        }
        layerMap.delete(id);
    }

    function setVisible(id, visible) {
        let layer = getById(id);
        if (visible) {
            let timeout = timeOutMap.get(id);
            if (timeout) {
                clearTimeout(timeout);
            }
            Module.setVisibleRange(id, map3d.config.vidoQlityLevel, map3d.config.maxDistance);
        } else {
            removeByTimeOut(id, layer);
        }
        layer.setVisible(visible);
        Module.XDRenderData();
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
        return layerMap.get(id);
    }

    function getByName(name) {
        let layer;
        layerMap.forEach(function (v, k) {
            if (v.id === name || v.layerNm === name) {
                layer = v;
            }
        })
        return layer;
    }

    function getLayers(){
        return Array.from(layerMap, function (entry) {
            return entry[1];
        });

    }

    function clear() {
        const targets = [];
        for (let [key, layer] of layerMap) {
            if (layer.isDefault) {
                continue;
            }
            targets.push(key);
        }

        for (let i = 0; i < targets.length; i++) {
            removeLayer(targets[i]);
        }
    }

    function refresh() {

    }


    let module = {
        init: init,
        addLayer: addLayer,
        removeLayer: removeLayer,
        setVisible: setVisible,
        getById: getById,
        getByName: getByName,
        getLayers : getLayers,
        refresh: refresh,
        clear: clear
    }

    Object.defineProperties(module, {
        'userLayers': {
            get: function () {
                return objectLayerList;
            }
        },
        'serviceLayers': {
            get: function () {
                return tileLayerList;
            }
        },
        'map': {
            get: function () {
                return layerMap;
            }
        }
    })
    return module;
}());