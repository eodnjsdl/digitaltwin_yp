window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Polygon = (function () {

    function Polygon(options) {
        map3d.layer.Geometry.call(this, options);
        this.depth = 3;
    }

    map3d.inherits(Polygon, map3d.layer.Geometry);

    /**
     * @override map3d.layer.Layer
     * @returns {XDWorld.JSLayer}
     */
    Polygon.prototype.createInstance = function () {
        return map3d.userLayers.createObjectLayer({
            name: this.id,
            type: Module.ELT_3D_PYLON
        });
    }


    Polygon.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);
    }


    return Polygon;
}());