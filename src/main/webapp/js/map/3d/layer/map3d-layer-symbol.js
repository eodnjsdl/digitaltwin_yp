window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Symbol = (function () {

    function Symbol(options) {
        let {id, layerNm} = options;
        let layer = map3d.layer.userLayers.createLayer(layerNm, Module.ELT_GHOST_3DSYMBOL);


    }

    return Symbol;
})()