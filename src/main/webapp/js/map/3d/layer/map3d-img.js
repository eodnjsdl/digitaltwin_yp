window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Image = (function () {

    /**
     *
     * @param options
     * @returns {*}
     * @constructor
     */
    function Image(options) {
        let {id, layerNm, visible} = options;

        Module.XDEMapCreateLayer(layerNm, dtmap.urls.xdServer, 0, false, visible, false, JS_LAYER_TYPE.ELT_KML_GROUND, 1, 15);
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        let layer = serviceList.nameAtLayer(layerNm);
        layer['type_'] = 'service';
        // layerMap.set(id, layer)
        return layer;
    }

    return Image;
})()