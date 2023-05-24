window.map2d = window.map2d || {};
map2d.config = (function () {
    let config = {
        target: 'map2D', //element Id
        projection: 'EPSG:5179', //좌표계
        extent : [982850.492470957, 1929803.45921341, 1030749.12996284, 1963477.22301901],
        center: [999028.8152684278, 1943589.1358372485], //중심점
        zoom: 17, //줌레벨
        minZoom: 12, //최소 줌
        maxZoom: 22, // 최대줌
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
}());