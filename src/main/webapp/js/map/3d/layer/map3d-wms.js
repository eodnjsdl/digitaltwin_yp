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
        let {id, store, table} = options;
        let opt = Object.assign({}, {
            url: dtmap.urls.xdGeoUrl + "/wms?",
            layer: store + ':' + table,
            minimumlevel: options.minimumlevel,
            maximumlevel: options.maximumlevel,
            tileSize: options.tileSize,
            crs: options.crs,
            parameters: options.parameters,
        }, WMS_OPT)

        let layer = serviceList.createWMSLayer(id);
        layer.setWMSProvider(opt);
        layer.setBBoxOrder(true);
        layer['type_'] = 'service';
        // layerMap.set(id, layer)
        return layer;
    }

    return WMS;
})()