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
        map3d.layer.Layer.call(this, options);
        this.serviceType = 'service';
    }

    ol.inherits(Image, map3d.layer.Layer);


    Image.prototype.createInstance = function (options) {
        Module.XDEMapCreateLayer(this.layerNm, dtmap.urls.xdServer, 0, false, visible, false, Module.ELT_KML_GROUND, 1, 15);
        Module.setVisibleRange(this.layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        this.instance = map3d.layer.serviceLayers.nameAtLayer(this.layerNm);
    }

    return Image;
})()