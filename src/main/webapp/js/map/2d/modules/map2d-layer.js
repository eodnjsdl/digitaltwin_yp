window.map2d = window.map2d || {}
map2d.layer = (function () {

    const TIME_OUT = 100 * 60 * 10; //레이어 삭제에 쓰이는 타임아웃
    let timeOutMap = new Map();
    const layers = [];

    function addLayer(options) {
        let {id, type} = options;
        if (getById(id)) {
            throw new Error(id + " 레이어가 이미 존재합니다.");
        }
        if (!type) {
            throw new Error("레이어 종류가 지정되지 않았습니다.");
        }
        let layer = createLayer(options);
        layer.id = id;
        map2d.map.addLayer(layer);
        layers.push(layer);
        return layer;
    }

    function removeLayer(id) {
        let layer = getById(id)
        if (!layer) {
            return;
        }
        map2d.map.removeLayer(layer);
        layers.splice(layers.indexOf(layer), 1);
    }

    function getVisible(id) {
        let layer = getById(id);
        if (layer) {
            return layer.getVisible();
        }
    }

    function setVisible(id, visible) {
        let layer = getById(id);
        if (visible) {
            let timeout = timeOutMap.get(id);
            if (timeout) {
                clearTimeout(timeout);
            }
        } else {
            removeByTimeOut(id, layer);
        }
        layer.setVisible(visible);
    }

    function getZIndex(id) {
        let layer = getById(id);
        if (layer) {
            return layer.getZIndex();
        }
    }

    function setZIndex(id, zIndex) {
        let layer = getById(id);
        if (layer) {
            return layer.setZIndex(zIndex);
        }
    }

    //레이어 가시화 OFF 10분후 삭제
    function removeByTimeOut(id, layer) {
        let timeout = setTimeout(function () {
            if (layer.visible) {
                removeByTimeOut(id, layer)
            } else {
                removeLayer(id);
            }
            timeOutMap.delete(id);
        }, TIME_OUT);
        timeOutMap.set(id, timeout);
    }

    function getById(id) {
        let layers = map2d.map.getLayers().getArray().slice();
        let layer;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].get("id") === id) layer = layers[i];
        }
        return layer;
    }


    function createLayer(options) {
        let {type} = options;
        if (type === 'WMS') {
            return createWMS(options);
        } else if (type === 'TMS') {

        }

    }

    function createWMS(options) {
        const {id, title, layerNm} = options;
        const layer = new ol.layer.Image({
            id: id,
            title: title,
            zIndex: options.zIndex,
            // extent: ol.proj.transformExtent(extent, bbox.crs.$, gis.map.Instance.getView().getProjection()),
            source: new ol.source.ImageWMS({
                url: '/gis/wms',
                params: {
                    VERSION: '1.1.1',
                    LAYERS: layerNm,
                    SLD: options.sld,
                    SLD_BODY: options.sldBody
                },
                // projection: ol.proj.get(e.srs),
                ratio: 1,
                crossOrigin: 'anonymous',
                serverType: 'geoserver',
                imageLoadFunction: function (tile, src) {
                    const index = src.indexOf("SLD_BODY");
                    if (index >= 0) {
                        const sldBody = src.substring(index, src.indexOf("&", index));
                        const imageSrc = src.replace(sldBody, "");
                        const body = decodeURIComponent(sldBody.replace("SLD_BODY=", ""));
                        iconToBase64(body).then((xml) => {
                            fetch(imageSrc, {
                                method: "POST",
                                body: xml,
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        return response.blob();
                                    }
                                })
                                .then(function (blob) {
                                    const objectUrl = URL.createObjectURL(blob);
                                    tile.getImage().src = objectUrl;
                                });
                        })
                    } else {
                        tile.getImage().src = src;
                    }
                }
            }),
        });
        return layer;
    }


    function iconToBase64(sld) {
        const promise = $.Deferred();
        const promises = [];
        const xml = $.parseXML(sld);
        $(xml).find("se\\:ExternalGraphic")
            .toArray()
            .forEach((element) => {
                const p = $.Deferred();
                const onlineResource = $(element).find("se\\:OnlineResource");
                const src = onlineResource.attr("xlink:href");
                util.sld.getBase64(src).then(function (data) {
                    onlineResource.remove();
                    $(element).append(`<se:InlineContent encoding="base64">${data.replace("data:image/png;base64,", "")}</se:InlineContent>`);
                    p.resolve();
                })
                promises.push(p)
            });

        Promise.all(promises).then(() => {
            promise.resolve(new XMLSerializer().serializeToString(xml));
        });
        return promise;
    }

    function clear() {
        let layers = map2d.map.getLayers().getArray().slice();
        let targets = [];
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].get("isDefault")) {
                continue;
            }
            targets.push(layers[i]);
        }

        for (let i = 0; i < targets.length; i++) {
            map2d.map.removeLayer(targets[i]);
        }
    }

    function getLayers() {
        return layers;
    }

    function refresh() {
        layers.forEach((layer) => {
            const source = layer.getSource();
            if (source instanceof ol.source.Image) {
                source.updateParams({
                    _: Date.now()
                });
            }
        })
    }

    let module = {
        addLayer: addLayer,
        removeLayer: removeLayer,
        getVisible: getVisible,
        setVisible: setVisible,
        getZIndex: getZIndex,
        setZIndex: setZIndex,
        clear: clear,
        refresh: refresh,
        getLayers: getLayers,
        getById: getById
    }
    return module;
}());