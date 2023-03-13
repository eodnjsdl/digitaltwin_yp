window.map3d = window.map3d || {}
map3d.poi = (function () {
    function init() {

    }
    /**
     * Poi 추가함수
     * @param options
     * @param {number} [options.id]
     * @param {number[]} options.coordinate
     * @param {string} options.text
     * @param {string} options.img
     * @param {object} [options.properties]
     */
    function addPoi(options) {

    }

    function removePoi(poi) {

    }

    function clear() {
    }

    function dispose() {
    }


    let module = {
        init: init,
        addPoi: addPoi,
        removePoi: removePoi,
        clear: clear,
        dispose: dispose
    }

    Object.defineProperties(module, {})
    return module;
}());