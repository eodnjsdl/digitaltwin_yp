window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.WMS = (function () {
    /**
     * WMS 레이어
     */
    const WMS_OPT = {
        minimumlevel: 7,
        maximumlevel: 16,
        tileSize: '756',
        crs: 'EPSG:4326',
        parameters: {
            version: "1.1.1",
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
        let {store, table} = options;
        let opt = Object.assign({}, {
            url: dtmap.urls.xdGeoServer + "/wms?",
            layer: options.layerNm,
            minimumlevel: options.minimumlevel,
            maximumlevel: options.maximumlevel,
            tileSize: options.tileSize,
            crs: options.crs,
            parameters: options.parameters,
        }, WMS_OPT)

        let layer = map3d.serviceLayers.createWMSLayer(this.id);
        layer.setWMSProvider(opt);
        layer.setBBoxOrder(true);
        return layer;

    }

    return WMS;
})()