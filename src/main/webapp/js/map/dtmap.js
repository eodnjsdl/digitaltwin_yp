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

        getMap().show();
        getMap(true).hide();
    }

    function call(fName, ...params) {
        let fnc = getMap()[fName]
        if (fnc && typeof fnc === 'function') {
            fnc.call(dtmap, ...params);
        } else {
            throw new Error(cur_mode + '지도에서 지원하지 않는 기능입니다.');
        }
    }

    function getMap(reverse) {
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

    function clearInteraction() {
        call('clearInteraction');
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


    /**
     * WFS GetFeature 호출함수
     * @param options
     * @param {string | string[]}options.typeNames 레이어 명
     * @param [options.perPage=10] 한 페이지당 피쳐 개수
     * @param [options.page=1] 페이지 번호
     * @param [options.sortBy] 검색 정렬 컬럼명
     * @return {json} GeoJSON
     */
    function wfsGetFeature(options) {
        let perPage = options.perPage || 10;
        let page = options.page || 1;
        if (typeof options.typeNames === 'string') {
            options.typeNames = [options.typeNames]
        }
        let params = {
            outputFormat: 'application/json',
            srsName: getMap().crs,
            featureTypes: options.typeNames,
            maxFeatures: perPage,
            startIndex: (page - 1) * perPage,
            sortBy: options.sortBy,
        }
        const featureRequest = new ol.format.WFS().writeGetFeature(params);
        let data = new XMLSerializer().serializeToString(featureRequest);
        return $.ajax({
            url: '/gis/wfs',
            method: 'post',
            contentType: "text/plain;charset=UTF-8",
            data: data
        })
    }

    const module = {
        init: init,
        goHome: goHome,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        switchMap: switchMap,
        setCenter: setCenter,
        showLayer: showLayer,
        setBaseLayer: setBaseLayer,
        clearInteraction: clearInteraction,
        clear: clear,
        wfsGetFeature: wfsGetFeature,
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
                return getMap().draw;
            }
        },
        'measure': {
            get: function () {
                return getMap().measure;
            }
        },
        'location': {
            get: function () {
                return getMap().location;
            }
        },
        'vector': {
            get: function () {
                return getMap().vector;
            }
        }
    })

    return module
}());