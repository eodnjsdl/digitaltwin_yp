window.map3d = window.map3d || {}
map3d.vector = (function () {
    let _layer;

    function init() {
        _layer = new map3d.layer.Vector({
            id: 'vectorLayer'
        })
    }

    /**
     * Point 추가함수
     * @param options
     * @param {number} [options.id]
     * @param {number[]} options.coordinate
     * @param {string} options.crs
     * @param {string} [options.text]
     * @param {string} [options.column]
     * @param {string} options.img
     * @param {object} [options.properties]
     */
    function addPoint(options) {
        if (options.crs) {
            if (options.crs !== map3d.crs) {
                options.coordinate = ol.proj.transform(options.coordinate, options.crs, map3d.crs);
            }
        }
        _layer.addPoint(options);
    }

    function removeFeature(id) {
        _layer.removeFeature(id);
    }

    function select(id) {
        const poi = _layer.getPoi(id);
        if (poi) {
            poi.setHighlight(true);
            let camera = map3d.camera;
            camera.moveLookAt(poi.getPosition(), camera.getTilt(), camera.getDirect(), 800);
        }
        //TODO 하이라이트 기능 개발


        // const icon = poi.getIcon();
        // const {width, height} = icon.getNormalSize();
        //
        // const canvas = document.createElement('canvas');
        // const ctx = canvas.getContext('2d');
        // const ubuf = poi.getIcon().getImageData();
        //
        // if (Math.sqrt(ubuf.length / 4) !== width) {
        //     return;
        // }
        //
        // // const imageData = ctx.createImageData(width, height);
        // // for (let i = 0; i < ubuf.length; i += 4) {
        // //     imageData.data[i] = ubuf[i];
        // //     imageData.data[i + 1] = ubuf[i + 1]
        // //     imageData.data[i + 2] = ubuf[i + 2]
        // //     imageData.data[i + 3] = ubuf[i + 3]
        // // }
        // const imageData = new ImageData(new Uint8ClampedArray(ubuf), width, height);
        //
        // ctx.width = width;
        // ctx.height = height;
        // ctx.putImageData(imageData, 0, 0);
        // ctx.fillStyle = '#4ff5ff';
        // ctx.globalCompositeOperation = "color";
        // ctx.fillRect(0, 0, width, height);
        // ctx.globalCompositeOperation = "source-over";
        //
        // let newImageData = ctx.getImageData(0, 0, width, height).data;
        // poi.setImage(newImageData, width, height);

    }

    function clear() {
        _layer.clear();
    }

    function dispose() {
        console.log(_layer);
    }

    function fit() {
        let extent = _layer.getExtent();
        let min = new Module.JSVector2D(extent[0], extent[1]);
        let max = new Module.JSVector2D(extent[2], extent[3])
        Module.getViewCamera().moveLonLatBoundary(min, max);
    }


    let module = {
        init: init,
        addPoint: addPoint,
        removeFeature:removeFeature,
        select: select,
        clear: clear,
        dispose: dispose,
        fit: fit
    }

    Object.defineProperties(module, {
        'layer': {
            get: function () {
                return _layer;
            }
        }
    })
    return module;
}());