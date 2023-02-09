window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.SHP = (function () {


    /**
     * SHP 레이어
     *
     * @param options
     * @returns {*}
     * @constructor
     */
    function SHP(options) {
        let {shpType} = options;
        if (shpType === 3 || shpType === 4) {
            return map3d.layer.POI(options);
        } else {
            return map3d.layer.WMS(options);
        }

    }
    return SHP;
})()