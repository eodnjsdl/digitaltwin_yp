window.map2d = window.map2d || {};
map2d.baseLayer = (function () {
    let _layerGroup;
    let LAYER_OPT;
    let _current = 'air';

    function init() {
        if (_layerGroup) {
            return;
        }
        initConfig();

        _layerGroup = createGroup();
        map2d.map.addLayer(_layerGroup)
    }

    function initConfig() {
        LAYER_OPT = {
            emap: {
                visible: false,
                source: {
                    url: dtmap.urls.emapBase + '?apikey=' + dtmap.urls.EMAP_KEY,
                    crossOrigin: "*",
                    projection: "EPSG:5179",
                    wrapX: true,
                    layer: "korean_map",
                    style: "korean",
                    format: "png",
                    matrixSet: "korean",
                    tileGrid: new ol.tilegrid.WMTS({
                        matrixIds: [
                            "L05",
                            "L06",
                            "L07",
                            "L08",
                            "L09",
                            "L10",
                            "L11",
                            "L12",
                            "L13",
                            "L14",
                            "L15",
                            "L16",
                            "L17",
                            "L18",
                            "L19",
                        ],
                        resolutions: [
                            2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16,
                            4.08, 2.04, 1.02, 0.51, 0.255,
                        ],
                        origin: [-200000, 4000000],
                    }),
                }
            },
            air: {
                visible: true,
                source: {
                    url: dtmap.urls.emapAir,
                    crossOrigin: "*",
                    projection: "EPSG:5179",
                    wrapX: true,
                    layer: "AIRPHOTO",
                    format: "image/jpg",
                    matrixSet: "NGIS_AIR",
                    tileGrid: new ol.tilegrid.WMTS({
                        matrixIds: [
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                        ],
                        resolutions: [
                            2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16,
                            4.08, 2.04, 1.02, 0.51, 0.255,
                        ],
                        origin: [-200000, 4000000],
                    }),
                    tileLoadFunction: function (imageTile, src) {
                        imageTile.getImage().src = dtmap.urls.emapAirProxy + '?apikey=' + dtmap.urls.EMAP_KEY + "&URL=" + encodeURIComponent(src);
                    }
                }
            }
        }

    }

    function createGroup() {
        return new ol.layer.Group({
            title: '배경지도',
            name: 'baseLayers',
            zIndex: 0,
            layers: [
                createLayer('emap'),
                createLayer('air')
            ],
            isDefault: true
        });
    }

    function createLayer(name) {
        let opt = LAYER_OPT[name];
        return new ol.layer.Tile({
            title: name,
            visible: opt.visible,
            extent: map2d.config.extent,
            source: new ol.source.WMTS(opt.source),
        });
    }

    function setLayer(name) {
        let layers = _layerGroup.getLayersArray();
        layers.map((v) => {
            if (v.get('title') === name) {
                _current = name;
                v.setVisible(true);
            } else {
                v.setVisible(false);
            }
        });
    }

    const module = {
        init: init,
        setLayer: setLayer,
        createGroup: createGroup
    }
    Object.defineProperties(module, {
        'current': {
            get: function () {
                return _current;
            }
        }
    })
    return module;
}());