window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.LOD = (function () {

    /**
     *
     * @param options
     * @returns {*}
     * @constructor
     */
    function LOD(options) {
        map3d.layer.Layer.call(this, options);
        this.serviceType = 'service';
    }

    map3d.inherits(LOD, map3d.layer.Layer);
    /**
     * @override map3d.layer.Layer
     *
     * @param options
     * @returns {XDWorld.JSLayer}
     */
    LOD.prototype.createInstance = function (options) {
        Module.XDEMapCreateLayer(this.layerNm, dtmap.urls.xdServer, 0, false, this.visible, false, 20, this.minLevel, this.maxLevel);
        Module.setVisibleRange(this.layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        return map3d.serviceLayers.nameAtLayer(this.layerNm);
    }

    return LOD;
})()