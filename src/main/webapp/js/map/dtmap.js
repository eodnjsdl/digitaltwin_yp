window.dtmap = window.dtmap || {}
window.dtmap = (function () {

    let _cur_mode = '2D';
    let _eventEmitter = new EventEmitter();

    /**
     * 지도 초기화 함수
     * @param {string} [mode='2D'] '2D', '3D' 지도 종류
     */
    function init(mode) {

        if (mode !== undefined) {
            if (['2D', '3D'].includes(mode.toUpperCase())) {
                _cur_mode = mode.toUpperCase();
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
            return fnc.call(dtmap, ...params);
        } else {
            throw new Error(_cur_mode + '지도에서 지원하지 않는 기능입니다.');
        }
    }

    function getMap(reverse) {
        if (reverse) {
            return _cur_mode === '2D' ? map3d : map2d;
        } else {

            return _cur_mode === '2D' ? map2d : map3d;
        }
    }

    /**
     * export function
     */

    async function switchMap(mod) {
        if (_cur_mode === mod) {
            return;
        }

        if (_cur_mode === '2D') {
            _cur_mode = '3D';
            map2d.hide();
            await map3d.show();

            //2D->3D 위치 동기화
            let center = map2d.getCenter();
            center = ol.proj.transform(center, map2d.crs, map3d.crs);
            map3d.setCenter(center, dtmap.util.zoomToAlt(map2d.view.getZoom()));

        } else {
            _cur_mode = '2D'
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

    function getExtent() {
        return call('getExtent');
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
     * @param {object} options
     * @param {string | string[]}options.typeNames 레이어 명
     * @param {number} [options.perPage=10] 한 페이지당 피쳐 개수
     * @param {number} [options.page=1] 페이지 번호
     * @param {ol.geom.Geometry} [options.geometry] intersects 도형 (우선)
     * @param {number[]} [bbox] 검색 영역 [minX, minY, maxX, maxY] (geometry 있을경우 수행안함)
     * @return {json} GeoJSON
     */
    function wfsGetFeature(options) {
        let perPage = options.perPage || 10;
        let page = options.page || 1;
        if (options.typeNames instanceof Array) {
            options.typeNames = options.typeNames.join(",");
        }


        // let filter;
        // if (options.geometry) {
        //     filter = new ol.format.filter.intersects('geom', options.geometry);
        // } else if (options.bbox) {
        //     filter = new ol.format.filter.bbox('geom', options.bbox);
        // }

        let cql = '1=1';
        // if (filter) {
        //     cql += ' AND (' + filter + ')'
        // }
        if (options.geometry) {
            cql += ' AND INTERSECT(geom, ' + bbox.toString() + ",'" + dtmap.crs + "'" + ')';
        } else if (options.bbox) {
            cql += ' AND BBOX(geom, ' + bbox.toString() + ",'" + dtmap.crs + "'" + ')';
        }


        let params = {
            request: 'GetFeature',
            outputFormat: 'application/json',
            srsName: getMap().crs,
            typeNames: options.typeNames,
            maxFeatures: perPage,
            startIndex: (page - 1) * perPage,
            cql: cql,
            sortBy: options.sortBy ? options.sortBy : 'gid'
        }

        // const featureRequest = new ol.format.WFS().writeGetFeature(params);
        // let data = new XMLSerializer().serializeToString(featureRequest);
        return $.ajax({
            url: '/gis/wfs',
            method: 'post',
            // contentType: "application/json",
            data: params
        })
    }

    function on(type, listener) {
        return _eventEmitter.addListener(type, listener);
    }

    function once(type, listener) {
        return _eventEmitter.addOnceListener(type, listener);
    }

    function off(type, listener) {
        if (listener) {
            return _eventEmitter.removeListener(type, listener);
        } else {
            return _eventEmitter.removeEvent(type);
        }
    }

    function trigger(type, data) {
        return _eventEmitter.trigger(type, [data]);
    }


    const module = {
        init: init,
        goHome: goHome,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        switchMap: switchMap,
        setCenter: setCenter,
        getExtent: getExtent,
        showLayer: showLayer,
        setBaseLayer: setBaseLayer,
        clearInteraction: clearInteraction,
        clear: clear,
        wfsGetFeature: wfsGetFeature,
        on: on,
        once: once,
        off: off,
        trigger: trigger
    }

    Object.defineProperties(module, {
        'mod': {
            get: function () {
                return _cur_mode;
            }
        },
        'crs': {
            get: function () {
                return getMap().crs;
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
        'layer': {
            get: function () {
                return getMap().layer;
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