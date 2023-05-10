window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.WMS = (function () {
    /**
     * WMS 레이어
     */
    const WMS_OPT = {
        minimumlevel: 7,
        maximumlevel: 16,
        tileSize: 256,
        crs: 'EPSG:4326',
        parameters: {
            VERSION: "1.1.0",
            SERVICE: 'WMS',
            REQUEST: 'GetMap',
            FORMAT: 'image/png'
        }
    }

    /**
     *
     * @param options
     */
    function WMS(options) {
        map3d.layer.Layer.call(this, options);
        this.serviceType = 'service';
    }

    map3d.inherits(WMS, map3d.layer.Layer);

    /**
     * @override map3d.layer.Layer
     *
     * @param options
     * @returns {XDWorld.JSLayer}
     */
    WMS.prototype.createInstance = function (options) {
        let opt = _.merge({}, {
            method : 'post',
            url: dtmap.urls.xdGeoServer + "/wms?",
            layer: options.layerNm,
            minimumlevel: options.minimumlevel,
            maximumlevel: options.maximumlevel,
            tileSize: options.tileSize,
            crs: options.crs,
            parameters: {
                VERSION : '1.1.1',
                SLD: options.sld,
                SLD_BODY : options.sldBody
            },
        }, WMS_OPT)

        let layer = map3d.serviceLayers.createWMSLayer(this.id);
        layer.setWMSProvider(opt);
        layer.setBBoxOrder(true);
        return layer;

    }

    return WMS;
})()