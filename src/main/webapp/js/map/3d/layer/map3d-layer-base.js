window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Layer = (function () {


    function Layer(options) {
        let {id, layerNm, title, visible, isDefault} = options;
        this.id = id;
        this.title = title;
        this.layerNm = layerNm;
        this.visible = visible;
        this.minLevel = 0;
        this.maxLevel = 15;
        this.isDefault = isDefault;
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
    Layer.prototype.dispose = function () {
        console.log('layer dispose');
    }


    return Layer;
})();