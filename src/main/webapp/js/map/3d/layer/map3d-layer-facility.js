window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Facility = (function () {

    /**
     *
     * @param options
     * @returns {*}
     * @constructor
     */
    function Facility(options) {
        map3d.layer.Layer.call(this, options);
        this.serviceType = 'service';
    }

    map3d.inherits(Facility, map3d.layer.Layer);
    /**
     * @override map3d.layer.Layer
     *
     * @param options
     * @returns {XDWorld.JSLayer}
     */
    Facility.prototype.createInstance = function (options) {
        Module.XDEMapCreateLayer(this.layerNm, dtmap.urls.xdServer, 0, true, this.visible, false, Module.ELT_MULTILPE, 0, 14);
        Module.setVisibleRange(this.layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);
        // Module.ELT_MULTILPE
        return map3d.serviceLayers.nameAtLayer(this.layerNm);
    }

    Facility.prototype.get = function (id) {

    }

    return Facility;
})()