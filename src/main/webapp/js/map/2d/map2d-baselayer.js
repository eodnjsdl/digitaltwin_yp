window.map2d = window.map2d || {};
map2d.modules = map2d.modules || {}
map2d.modules.baseLayer = (function () {
    let layerGroup;
    let layers = [];
    let LAYER_OPT;

    function init() {
        if (layerGroup) {
            return;
        }
        initConfig();
        layers = [
            createLayer('base'),
            createLayer('air')
        ]
        layerGroup = new ol.layer.Group({
            name: 'baseLayers',
            zIndex: 0,
            layers: layers
        });
        map2d.map.addLayer(layerGroup)
    }

    function initConfig() {
        LAYER_OPT = {
            base: {
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

    function createLayer(name) {
        let opt = LAYER_OPT[name];
        return new ol.layer.Tile({
            name: name,
            visible: opt.visible,

            source: new ol.source.WMTS(opt.source),
        });
    }

    function setLayer(name) {
        layers.map((v) => {
            v.setVisible(v.get('name') === name);
        });
    }

    const module = {init: init, setLayer: setLayer}
    return module;
}());