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
     * @param {string} [options.cql] cql 필터 (cql필터 가 있을경우 json request로 수행)         -> 필터방식은 둘중 택 1
     * @param {string | string[]} [options.filter] 필터 수식 (배열일 경우 and 연산으로 처리됨)   -> 필터방식은 둘중 택 1
     *        ' '공백 구분 문자로  "Key Expression Value" 형태로 작성해야함
     *        Key           - 컬럼명
     *        Expression    - 수식 ( = , < , <= , > , >= , like )
     *        Value         - 값
     *        ex)
     *          emd_kor_nm like 강하면
     *          gid >= 3
     * @return {json} GeoJSON
     */
    function wfsGetFeature(options) {
        let data;
        if (options.cql) {
            data = getWFSParam(options);
        } else {
            data = getWFSParamXML(options);
        }
        return $.ajax({
            url: '/gis/wfs',
            method: 'post',
            // contentType: "application/json",
            data: data
        })
    }

    function getWFSParamXML(options) {
        if (typeof options.typeNames === 'string') {
            options.typeNames = [options.typeNames];
        }
        //페이지 정보 없을경우 모든피쳐 검색
        let startIndex;
        let maxFeatures;
        if (options.page || options.perPage) {
            maxFeatures = options.perPage || 10;
            startIndex = ((options.page || 1) - 1) * maxFeatures
        }
        let filter = getWFSFilter(options);

        const featureRequest = new ol.format.WFS().writeGetFeature({
            outputFormat: 'application/json',
            srsName: getMap().crs,
            featureTypes: options.typeNames,
            maxFeatures: maxFeatures,
            startIndex: startIndex,
            filter: filter
        });

        wfsSortBy(featureRequest, options);

        return new XMLSerializer().serializeToString(featureRequest);
    }

    function getWFSFilter(options) {
        let ary = []

        if (options.filter) {
            if (options.filter instanceof Array) {
                for (let i = 0; i < options.filter.length; i++) {
                    ary.push(parseFilter(options.filter[i]));
                }
            } else {
                ary.push(parseFilter(options.filter));
            }
        }

        if (options.geometry) {
            ary.push(new ol.format.filter.intersects('geom', options.geometry));
        } else if (options.bbox) {
            ary.push(new ol.format.filter.bbox('geom', options.bbox));
        }

        if (ary.length === 0) {
            return undefined;
        } else if (ary.length === 1) {
            return ary[0];
        } else {
            return ol.format.filter.and(...ary);
        }

    }

    function parseFilter(data) {
        const param = data.split(' ');
        const k = param[0];
        const e = param[1];
        const v = param[2];
        let filter;
        switch (e) {
            case '=':
                filter = ol.format.filter.equalTo(k, v);
                break;
            case '<':
                filter = ol.format.filter.lessThan(k, v);
                break;
            case '>':
                filter = ol.format.filter.greaterThan(k, v);
                break;
            case '<=':
                filter = ol.format.filter.lessThanOrEqualTo(k, v);
                break;
            case '>=':
                filter = ol.format.filter.greaterThanOrEqualTo(k, v);
                break;
            case 'like':
                filter = ol.format.filter.like(k, '*' + v + '*');
                break;
        }
        return filter
    }

    function wfsSortBy(featureRequest, options) {
        const ogcNS = 'http://www.opengis.net/ogc'
        featureRequest.setAttribute('xmlns:ogc', ogcNS)
        const doc = featureRequest.ownerDocument;
        const query = featureRequest.getElementsByTagName('Query')[0];
        const sortby = doc.createElementNS(ogcNS, 'ogc:SortBy');
        const sortProperty = doc.createElementNS(ogcNS, 'ogc:SortProperty');
        sortby.appendChild(sortProperty);
        const propertyName = doc.createElementNS(ogcNS, 'ogc:PropertyName');
        propertyName.setHTML(options.sortBy || 'gid');
        const order = doc.createElementNS(ogcNS, 'ogc:SortOrder');
        order.setHTML('ASC');
        sortProperty.appendChild(propertyName);
        sortProperty.appendChild(order);
        sortby.appendChild(sortProperty);
        query.appendChild(sortby);
    }

    function getWFSParam(options) {
        if (options.typeNames instanceof Array) {
            options.typeNames = options.typeNames.join(",");
        }
        //페이지 정보 없을경우 모든피쳐 검색
        let startIndex;
        let maxFeatures;
        if (options.page || options.perPage) {
            maxFeatures = options.perPage || 10;
            startIndex = ((options.page || 1) - 1) * maxFeatures
        }

        //cql 필터
        let cql = '1=1';
        if (options.geometry) {
            let wkt;
            if (options.geometry instanceof ol.geom.SimpleGeometry) {
                let geom = options.geometry.clone();
                const format = new ol.format.WKT();
                if (options.geometry instanceof ol.geom.Circle) {
                    geom = ol.geom.Polygon.fromCircle(options.geometry);
                }
                wkt = format.writeGeometry(geom);
            } else {
                wkt = options.geometry
            }
            cql += ' AND INTERSECTS(geom, ' + wkt + ')';
        } else if (options.bbox) {
            cql += ' AND BBOX(geom, ' + options.bbox.toString() + ",'" + dtmap.crs + "'" + ')';
        }

        if (options.cql) {
            cql += ' AND ' + options.cql;
        }

        return {
            version: '1.1.0',
            request: 'GetFeature',
            outputFormat: 'application/json',
            srsName: getMap().crs,
            typeNames: options.typeNames,
            maxFeatures: maxFeatures,
            startIndex: startIndex,
            cql_filter: cql === '1=1' ? undefined : cql,
            sortBy: options.sortBy ? options.sortBy : 'gid'
        }
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