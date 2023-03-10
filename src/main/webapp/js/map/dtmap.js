window.dtmap = window.dtmap || {}
window.dtmap = (function () {

    let cur_mode = '2D';

    /**
     * 지도 초기화 함수
     * @param {string} [mode='2D'] '2D', '3D' 지도 종류
     */
    function init(mode) {
        if (mode !== undefined) {
            if (['2D', '3D'].includes(mode.toUpperCase())) {
                cur_mode = mode.toUpperCase();
            } else {
                throw new Error('입력값을 확인해주세요, "2D", "3D" 지도만 지원합니다.');
            }
        }

        getModule().show();
        getModule(true).hide();
    }

    function call(fName, ...params) {
        let fnc = getModule()[fName]
        if (fnc && typeof fnc === 'function') {
            fnc.call(dtmap, ...params);
        } else {
            throw new Error(cur_mode + '지도에서 지원하지 않는 기능입니다.');
        }
    }

    function getModule(reverse) {
        if (reverse) {
            return cur_mode === '2D' ? map3d : map2d;
        } else {

            return cur_mode === '2D' ? map2d : map3d;
        }
    }

    /**
     * export function
     */

    async function switchMap(mod) {
        if (cur_mode === mod) {
            return;
        }

        if (cur_mode === '2D') {
            cur_mode = '3D';
            map2d.hide();
            await map3d.show();

            //2D->3D 위치 동기화
            let center = map2d.getCenter();
            center = ol.proj.transform(center, map2d.crs, map3d.crs);
            map3d.setCenter(center, dtmap.util.zoomToAlt(map2d.view.getZoom()));

        } else {
            cur_mode = '2D'
            map2d.show();
            map3d.hide();

            //3D->2D 위치 동기화
            let vector = map3d.getCenter();
            let center = [vector[0], vector[1]];
            center = ol.proj.transform(center, map3d.crs, map2d.crs);
            map2d.setCenter(center, dtmap.util.altToZoom(vector[2]));

        }
    }

    function zoomIn() {
        call('zoomIn');
    }

    function zoomOut() {
        call('zoomOut');
    }

    function setCenter(center) {
        call('setCenter', center);
    }

    function showLayer(options) {
        let {id, type, visible, table, store, shpType, layerNm} = options;

        call('showLayer', {
            type: type,
            id: id,
            visible: visible,
            table: table,
            store: store,
            shpType: shpType,
            layerNm: layerNm
        });
    }

    function setInteraction(mod, options) {
        call('setInteraction', mod, options);
    }

    function clear() {
        call('clear');
    }

    function goHome() {
        call('goHome');
    }

    function setBaseLayer(name) {
        call('setBaseLayer', name)
    }

    const module = {
        init: init,
        goHome: goHome,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        switchMap: switchMap,
        setCenter: setCenter,
        showLayer: showLayer,
        setInteraction: setInteraction,
        setBaseLayer: setBaseLayer,
        clear: clear,
        test: call
    }

    Object.defineProperties(module, {
        'mod': {
            get: function () {
                return cur_mode;
            }
        },
        'draw': {
            get: function () {
                return getModule().draw;
            }
        },
        'measure': {
            get: function () {
                return getModule().measure;
            }
        },
        'location': {
            get: function () {
                return getModule().location;
            }
        }
    })

    return module
}());