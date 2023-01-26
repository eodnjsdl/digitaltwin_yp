window.dtmap = window.dtmap || {};
dtmap.map3d = dtmap.map3d || {};
dtmap.map3d.modules = dtmap.map3d.modules || {};
dtmap.map3d.modules.baseLayer = (function () {
    let isInit_;

    function init() {
        if (isInit_) {
            return;
        }

        console.log('3D Map :: ', 'init BaseLayer');

        isInit_ = true;
    }

    const module = {init: init}
    return module;
})()