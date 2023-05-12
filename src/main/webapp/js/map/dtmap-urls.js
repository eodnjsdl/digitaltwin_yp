window.dtmap = window.dtmap || {};
/**
 * http://10.165.2.30       [운영] 행정
 * http://10.20.30.81       [운영] LX
 * http://203.228.54.54     [개발] 행정
 * http://203.228.54.47     [개발] LX
 * @type {{}}
 */
dtmap.urls = (function () {
    let url = 'http://203.228.54.47';
    let url2 = 'http://203.228.54.47:8086';

    let urls = {
        BASE: url,
        xdServer: url + '/xdServer',
        xdGeoServer: url2 + '/gis',
        xdGeoUrl: url + '/geoUrl',
        emapBase: url + '/extEmap/openapi/Gettile.do',
        emapAirProxy: url + '/extEmap/openapi/proxy/proxyTile.jsp',
        emapAir: 'http://210.117.198.120:8081/o2map/services',
        EMAP_KEY: undefined,
        set: set
    }

    function set(options) {
        for (let key in options) {
            if (key === 'set') continue;
            if (urls.hasOwnProperty(key)) {
                urls[key] = options[key];
            }
        }
    }

    return urls;
})()