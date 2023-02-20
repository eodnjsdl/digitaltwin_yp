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
        let layer = new this[type](options);
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
        var layers = map2d.map.getLayers().getArray().slice();
        var layer;
        for (var i = 0; i < layers.length; i++) {
            if(layers[i].get("id") === id) layer = layers[i];
        }
        return layer != undefined ? layer : undefined;
    }

    let module = {
        addLayer: addLayer,
        removeLayer: removeLayer,
        setVisible: setVisible,
        getById: getById
    }
    return module;
})()