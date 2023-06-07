window.map2d = window.map2d || {}
map2d.overlay = (function () {

    const _list = [];

    function init() {
    }

    function clear() {
    }

    function dispose() {
    }

    function add(options) {
        const popup = new Overlay({
            element: document.getElementById('popup'),
        });
        popup.setPosition(coordinate);
        map2d.map.addOverlay(popup);
        _list.push(popup);
    }

    let module = {
        init: init,
        clear: clear,
        dispose: dispose,
    }

    Object.defineProperties(module, {})

    return module;
}());