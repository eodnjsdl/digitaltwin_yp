window.dtmap = window.dtmap || {}
window.dtmap = (function () {

    let cur_mode = '2d';


    function init(options) {
        dtmap.map2d.init();
        dtmap.map2d.baseLayer.init();
    }



    function call(fName, params) {
        let fnc = getModule()[fName]
        if (fnc && typeof fnc === 'function') {
            fnc.call(params)
        }
    }

    function getModule() {
        if (cur_mode === '2d') {
            return dtmap.map2d
        } else {
            return dtmap.map3d
        }
    }


    /**
     * export function
     * @param center
     */
    function setCenter(center) {
        call('setCenter', center);
    }

    function switchMap() {
        if (cur_mode === '2d') {
            cur_mode = '3d';
            //TODO 2d->3d 동기화
        } else {
            cur_mode = '2d'
            //TODO 3d->2d 동기화
        }
    }

    const module = {
        init: init,
        switchMap: switchMap,
        setCenter: setCenter
    }

    Object.defineProperties(module, {
        'mod': {
            get: function () {
                return cur_mode;
            }
        }
    })
    return module
}());