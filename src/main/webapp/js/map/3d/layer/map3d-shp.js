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
        map3d.layer.Layer.call(this, options);
        let {shpType} = options;
        this.shpType = shpType;
    }

    ol.inherits(SHP, map3d.layer.Layer);

    SHP.prototype.createInstance = function (options) {
        if (this.shpType === 3 || this.shpType === 4) {
            map3d.layer.POI.prototype.createInstance.call(this, options);
        } else {
            map3d.layer.WMS.prototype.createInstance.call(this, options);
        }
    }


    return SHP;
})()