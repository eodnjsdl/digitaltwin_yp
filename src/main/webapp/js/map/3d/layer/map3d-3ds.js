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
        map3d.layer.Layer.call(this);
        this.serviceType = 'service';
    }

    ol.inherits(TDS, map3d.layer.Layer);

    TDS.prototype.createInstance = function (options) {
        Module.XDEMapCreateLayer(this.layerNm, dtmap.urls.xdServer, 0, false, this.visible, false, Module.ELT_MULTILPE, 0, 13);
        Module.setVisibleRange(this.layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        this.instance = map3d.serviceLayers.nameAtLayer(this.layerNm);
    }

    return TDS;
})()