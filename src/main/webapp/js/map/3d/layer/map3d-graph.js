window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Graph = (function () {

    /**
     *
     * @param options
     * @returns {*}
     * @constructor
     */
    function Graph(options) {
        map3d.layer.Layer.call(this);
        this.serviceType = 'user';
        this.graphType = options.graphType;

    }

    map3d.inherits(Graph, map3d.layer.Layer);
    /**
     * @override map3d.layer.Layer
     *
     * @param options
     * @returns {XDWorld.JSLayer}
     */
    Graph.prototype.createInstance = function (options) {
        this.instance = map3d.userLayers.createLayer(this.layerNm, Module.ELT_GRAPH);
    }
    Graph.prototype.setData = function (data) {

    }
    return Graph;
})()