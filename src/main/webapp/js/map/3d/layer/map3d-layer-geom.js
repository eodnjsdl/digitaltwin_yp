window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Geometry = (function () {

    function Geometry(options) {
        map3d.layer.Layer.call(this, options)
        this.tree = new rbush();
        this.properties = {};
        this.serviceType = 'user';
        this.depth = 1;
    }

    map3d.inherits(Geometry, map3d.layer.Layer);


    /**
     *
     * @param options
     * @param options.coordinates
     */
    Geometry.prototype.add = function (options) {
        //Extent 업데이트
        const {geometry} = options;
        const extent = [Infinity, Infinity, -Infinity, -Infinity];
        const flatCoords = geometry.getFlatCoordinates();

        for (let i = 0; i < flatCoords.length / 2; i += 2) {
            extendXY(extent, flatCoords[i], flatCoords[i + 1]);
        }

        this.tree.insert({
            minX: extent[0],
            minY: extent[1],
            maxX: extent[2],
            maxY: extent[3]
        });
    }

    Geometry.prototype.genId = function (id) {
        if (id === undefined) {
            id = this.id + "_" + this.instance.getObjectCount();
        }
        return id;
    }

    Geometry.prototype.get = function (id) {
        let list = this.instance.getObjects();
        let object;
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === id || list[i].key === this.id + '_' + id) {
                object = list[i].object
                break;
            }
        }
        return {object: object, properties: this.properties[id]};
    }

    Geometry.prototype.getExtent = function () {
        const data = this.tree.data;
        return [data.minX, data.minY, data.maxX, data.maxY];
    }

    Geometry.prototype.clear = function () {
        this.instance.removeAll();
        this.tree.clear();
        this.properties = {};
    }


    Geometry.prototype.setProperties = function (object, properties) {
        if (!properties || !(properties instanceof Object)) {
            return;
        }
        this.properties[object.getId()] = properties;
        //프로퍼티 설정
        /*Object.keys(properties).forEach(function (key) {
            if (key === 'geometry') {
                return;
            }
            const value = properties[key];
            if (value) {
                object.setProperty(key, value);
            }
        })*/
    }

    Geometry.prototype.removeById = function (id) {
        this.instance.removeAtKey(id);
        this.properties[id] = undefined;
    }

    function flatDeep(arr, depth = 1) {
        return depth > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, depth - 1) : val), [])
            : arr.slice();
    }

    function extendXY(extent, x, y) {
        extent[0] = Math.min(extent[0], x);
        extent[1] = Math.min(extent[1], y);
        extent[2] = Math.max(extent[2], x);
        extent[3] = Math.max(extent[3], y);
        return extent;
    }

    return Geometry;
}());