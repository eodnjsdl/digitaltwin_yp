window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Layer = (function () {


    function Layer(options) {
        let {id, layerNm, table, store, visible} = options;
        this.id = id;
        this.layerNm = layerNm;
        this.table = table;
        this.store = store;
        this.visible = visible;
        this.minLevel = 0;
        this.maxLevel = 15;

        this.instance = this.createInstance(options);
    }

    Layer.prototype.createInstance = function () {
    }

    Layer.prototype.setVisible = function (visible) {
        this.instance.setVisible(visible);
        this.visible = visible;
    }
    Layer.prototype.getName = function () {
        if (!this.instance) {
            return;
        }
        return this.instance.getName();
    }


    return Layer;
})();