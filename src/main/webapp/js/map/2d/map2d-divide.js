window.dtmap = window.dtmap || {}
dtmap.map2d.divide = (function () {

    let mainMap = dtmap.map2d.map;
    let map2, map3, map4;
    let divideCnt = 0;


    function init() {

        map2 = createMap();
        map3 = createMap();
        map4 = createMap();

    }

    function createMap() {

    }

    let module = {
        init: init
    }
    return module;


}());