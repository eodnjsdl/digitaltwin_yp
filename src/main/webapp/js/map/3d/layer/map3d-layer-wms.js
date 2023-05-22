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
        this.tileSize = options.tileSize || 256
        this.crs = options.crs;
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
        let opt = parseOptions.call(this, options);
        let layer = map3d.serviceLayers.createWMSLayer(this.id);
        layer.setWMSProvider(opt);
        layer.setBBoxOrder(true);
        return layer;

    }
    WMS.prototype.updateParams = function (options) {
        let opt = parseOptions.call(this, options);
        this.instance.setWMSProvider(opt);
        this.instance.clearWMSCache();
        Module.XDRenderData();
    }

    function parseOptions(options) {
        let wmsParam = parseWMSOption(options);
        return _.merge({}, {
            method: 'post',
            url: dtmap.urls.xdGeoServer + "/wms?",
            layer: this.layerNm,
            minimumlevel: this.minLevel,
            maximumlevel: this.maxLevel,
            tileSize: this.tileSize,
            crs: this.crs,
            parameters: wmsParam,
        }, WMS_OPT)
    }

    function parseWMSOption(options) {
        let wmsParam = {
            VERSION: '1.1.1',
            REQUEST: 'GetMap',
        }
        if (options.sld) {
            wmsParam['SLD'] = options.sld
        }
        // 엔진 기능 미제공으로 주석처리
        // if(options.sldBody){
        //     wmsParam['SLD_BODY'] = options.sldBody
        // }
        if (options.cql) {
            wmsParam['CQL_FILTER'] = encodeURIComponent(options.cql);
        }
        return wmsParam
    }

    return WMS;
})()