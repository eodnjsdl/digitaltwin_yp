window.dtmap = window.dtmap || {}
window.dtmap = (function () {

    let cur_mode = '2d';

    function init() {
        dtmap.map2d.init();
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

        let {map2d, map3d} = dtmap;

        if (cur_mode === '2d') {
            cur_mode = '3d';
            //TODO 2d->3d 동기화
            map2d.hide();
            map3d.show();

        } else {
            cur_mode = '2d'
            //TODO 3d->2d 동기화
            map2d.show();
            map3d.hide();
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