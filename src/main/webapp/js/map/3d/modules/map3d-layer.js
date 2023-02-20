window.map3d = window.map3d || {};
map3d.modules = map3d.modules || {}
map3d.modules.layer = (function () {
    const TIME_OUT = 100 * 60 * 10; //레이어 삭제에 쓰이는 타임아웃
    let userList, serviceList;
    let layerMap = new Map();
    let timeOutMap = new Map();

    function init() {
        userList = new Module.JSLayerList(true);
        serviceList = new Module.JSLayerList(false);
    }

    /**
     *
     * @param options
     * @returns {*}
     */
    function addLayer(options) {
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

    function createLayer(options) {
        let {type} = options;

        if (type === 'Image') {
            return new map3d.layer.Image(options);
        } else if (type === 'SHP') {
            return new map3d.layer.SHP(options);
        } else if (type === 'TDS') {
            return new map3d.layer.TDS(options);
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
        }

    }

    /**
     * 레이어 삭제
     * @param id
     */
    function removeLayer(id) {
        let layer = getById(id)
        if (!layer) {
            return;
        }
        let list;
        if (layer.serviceType === 'user') {
            list = userList;
        } else {
            list = serviceList;
        }
        list.delLayerAtName(layer.getName());
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

    let module = {
        init: init,
        addLayer: addLayer,
        removeLayer: removeLayer,
        setVisible: setVisible,
        getById: getById
    }

    Object.defineProperties(module, {
        'userLayers': {
            get: function () {
                return userList;
            }
        },
        'serviceLayers': {
            get: function () {
                return serviceList;
            }
        }
    })
    return module;
})();