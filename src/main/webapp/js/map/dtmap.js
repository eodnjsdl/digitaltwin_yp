window.dtmap = window.dtmap || {}
window.dtmap = (function () {

    let cur_mode = '2D';

    //TODO 2d 3d 레이어 목록 따로 관리

    function init() {
        dtmap.map2d.init();
    }

    function call(fName, params) {
        let fnc = getModule()[fName]
        if (fnc && typeof fnc === 'function') {
            fnc.call(dtmap, params);
        }
    }

    function getModule() {
        if (cur_mode === '2D') {
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

    async function switchMap(mod) {
        if (cur_mode === mod) {
            return;
        }
        let {map2d, map3d} = dtmap;

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


    function showLayer(options) {
        let {id, visible, table, store, shpType, layerNm} = options;
        let type = id.split('_')[1];
        let layerId = id.split('_')[2];
        let only3d = id.split('_')[3];


        if (cur_mode === '2D' && only3d) {
            throw new Error('3D에서만 사용가능한 레이어입니다.');
        }

        call('showLayer', {
            type: type,
            id: layerId,
            visible: visible,
            table: table,
            store: store,
            shpType: shpType,
            layerNm: layerNm
        });
    }


    const module = {
        init: init,
        switchMap: switchMap,
        setCenter: setCenter,
        showLayer: showLayer
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