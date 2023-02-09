window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.TDS = (function () {

    /**
     *
     * @param options
     * @returns {*}
     * @constructor
     */
    function TDS(options) {
        let {id, layerNm, visible} = options;

        Module.XDEMapCreateLayer(layerNm, dtmap.urls.xdServer, 0, false, visible, false, JS_LAYER_TYPE.ELT_MULTILPE, 0, 13);
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        let layer = serviceList.nameAtLayer(layerNm);
        layer['type_'] = 'service';
        // layerMap.set(id, layer)
        return layer;
    }

    return TDS;
})()