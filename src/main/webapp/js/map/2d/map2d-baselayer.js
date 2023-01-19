window.dtmap = window.dtmap || {};
dtmap.map2d = dtmap.map2d || {};
dtmap.map2d.baseLayer = (function () {
    let layerGroup;
    let layers = [];


    //TODO 프로퍼티로 빼야함
    const KEY = '771DDEA74EC8BAFD59FAEDB539532215';
    // 실서버 행정망
    // const URL =`http://10.165.2.30/intEmap/extEmap/openapi/Gettile.do?apiKey=${dtmap.config.EMAP_KEY}`;
    // 실서버 LX망
    // const URL = `http://10.20.30.81/extEmap/openapi/Gettile.do?apiKey=${dtmap.config.EMAP_KEY}`;
    // 개발서버 행정망
    // const URL = `http://203.228.54.54/intEmap/extEmap/openapi/Gettile.do?apiKey=${dtmap.config.EMAP_KEY}`;
    // 개발서버 LX망
    const BASE_URL = 'http://203.228.54.47/extEmap/openapi/Gettile.do?apikey=' + KEY;
    const AIR_URL = 'http://210.117.198.120:8081/o2map/services';
    const PROXY_URL = "http://203.228.54.47/extEmap/openapi/proxy/proxyTile.jsp?apikey=" + KEY;

    const LAYER_OPT = {

        base: {
            visible: false,
            source: {
                url: BASE_URL,
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
                url: AIR_URL,
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
                    imageTile.getImage().src = PROXY_URL + "&URL=" + encodeURIComponent(src);
                }
            }
        }
    }

    function init() {
        if (layerGroup) {
            return;
        }
        layers = [
            createLayer('base'),
            createLayer('air')
        ]
        layerGroup = new ol.layer.Group({
            name: 'baseLayers',
            zIndex: 0,
            layers: layers
        });
        dtmap.map2d.map.addLayer(layerGroup)
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