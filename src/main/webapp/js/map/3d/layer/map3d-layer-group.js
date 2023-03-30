window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Group = (function () {


    function Group(options) {
        let {id, visible, layerNm} = options;
        this.id = id;
        this.layers = [];
        this.visible = visible;
        this.layerNm = layerNm;
        this.minLevel = 0;
        this.maxLevel = 15;
    }

    map3d.inherits(Group, map3d.layer.Layer);

    Group.prototype.setVisible = function (visible) {

        this.layers.forEach((function (layer) {
            layer.instance.setVisible(visible);
        }))
        this.visible = visible;
    }

    Group.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    }

    Group.prototype.removeLayer = function (name) {
        let index;
        for (let i = 0; i < this.layers.length; i++) {
            let layer = this.layers[i];
            if (layer.getName() === name) {
                index = i;
                if (layer.serviceType === 'user') {
                    map3d.userLayers.delLayerAtName(name);
                } else {
                    map3d.serviceLayers.delLayerAtName(name);
                }
                break;
            }
        }
        if (index) {
            this.layers.splice(index, 1);
        }
    }

    Group.prototype.getLayer = function (name) {
        let result;
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].getName() === name) {
                result = this.layers[i]
                break;
            }
        }
        return result;
    }

    Group.prototype.getName = function () {
        return this.layerNm;
    }

    return Group;

}())