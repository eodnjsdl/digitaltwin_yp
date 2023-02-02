window.dtmap = window.dtmap || {};
dtmap.map2d = dtmap.map2d || {};
dtmap.map2d.config = (function () {
    let config = {
        target: 'map2D', //element Id
        projection: 'EPSG:5179', //좌표계
        center: [999028.8152684278, 1943589.1358372485], //중심점
        zoom: 17, //줌레벨
        minZoom: 6, //최소 줌
        maxZoom: 19, // 최대줌
        set: set
    }

    function set(options) {
        for (let key in options) {
            if (key === 'set') continue;
            if (config.hasOwnProperty(key)) {
                config[key] = options[key];
            }
        }
    }

    return config;
}())