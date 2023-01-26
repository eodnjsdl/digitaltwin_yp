window.dtmap = window.dtmap || {};
dtmap.config = dtmap.config || {};

/**
 * http://10.165.2.30       [운영] 행정
 * http://10.20.30.81       [운영] LX
 * http://203.228.54.54     [개발] 행정
 * http://203.228.54.47     [개발] LX
 * @type {{}}
 */
dtmap.config.url = (function () {
    var url = 'http://10.165.2.30';

    return {
        BASE: url,
        xdServer: url + '/xdServer',
        xdGeoServer: url + '/geoserver',
        xdGeoUrl: url + '/geoUrl',
        emapBase: url + '/extEmap/openapi/Gettile.do',
        emapAirProxy: url + '/extEmap/openapi/proxy/proxyTile.jsp',
        emapAir: 'http://210.117.198.120:8081/o2map/services'
    }
})()