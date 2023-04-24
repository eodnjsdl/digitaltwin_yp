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

    /**
     * 지도 모드 전환
     * @param {string} mod '2D' || '3D'
     * @return {Promise<void>}
     */
    async function switchMap(mod) {
        if (_cur_mode === mod) {
            return;
        }

        if (_cur_mode === '2D') {
            _cur_mode = '3D';
            map2d.hide();
            map2d.clear();
            await map3d.show();

            //2D->3D 위치 동기화
            let center = map2d.getCenter();
            center = ol.proj.transform(center, map2d.crs, map3d.crs);
            map3d.setCenter(center, dtmap.util.zoomToAlt(map2d.view.getZoom()));

        } else {
            _cur_mode = '2D'
            map3d.hide();
            map3d.clear();
            map2d.show();

            //3D->2D 위치 동기화
            let vector = map3d.getCenter();
            let center = [vector[0], vector[1]];
            center = ol.proj.transform(center, map3d.crs, map2d.crs);
            map2d.setCenter(center, dtmap.util.altToZoom(vector[2]));

        }
    }

    /**
     * 줌인
     */
    function zoomIn() {
        call('zoomIn');
    }

    /**
     * 줌아웃
     */
    function zoomOut() {
        call('zoomOut');
    }

    /**
     * 중심점 가져오기
     * @return {number} [x,y] || [x,y,z]
     */
    function getCenter() {
        return call('getCenter');
    }

    /**
     * 중심점 설정하기
     * @param {number[]} center [x,y]
     */
    function setCenter(center) {
        call('setCenter', center);
    }

    /**
     * 지도 영역 가져오기
     * @return {number[]} [minX,minY,maxX,maxY]
     */
    function getExtent() {
        return call('getExtent');
    }

    /**
     * 레이어 가시화함수
     * @param options
     * @param {string} options.id 아이디
     * @param {string} options.type 종류
     * @param {boolean} options.visible 가시화 여부
     * @param {string} options.table
     * @param {string} options.store
     * @param {string} options.shpType (현행에서 쓰이던 인자 분석필요)
     * @param {string} options.layerNm 레이어 서비스 명
     *
     */

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

    /**
     * 지도 초기화
     * 레이어를 제외한 사용자가 지도에 추가한 객체들을 초기화함.
     */
    function clear() {
        call('clear');
    }

    /**
     * 초기위치 이동
     */
    function goHome() {
        call('goHome');
    }

    /**
     * 배경지도 설정함수
     * @param {string} name 배경지도 서비스명 'emap' || 'air'
     */
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
     * @param {number[]} [options.bbox] 검색 영역 [minX, minY, maxX, maxY] (geometry 있을경우 수행안함)
     * @param {string} [options.sortBy] 정렬 컬럼명
     * @param {string} [options.sortOrder='ASC'] 정렬 방식 'ASC', 'DESC
     * @param {string} [options.cql] cql 필터 (cql필터 가 있을경우 json request로 수행)         -> 필터방식은 둘중 택 1
     * @param {string | string[]} [options.filter] 필터 수식 (배열일 경우 and 연산으로 처리됨)   -> 필터방식은 둘중 택 1
     *        ' '공백 구분 문자로  "Key Expression Value" 형태로 작성해야함
     *        Key           - 컬럼명
     *        Expression    - 수식 ( = , < , <= , > , >= , like )
     *        Value         - 값
     *        ex)
     *          emd_kor_nm like 강하면
     *          gid >= 3
     *
     *          1. XML Filter 방식
     *          dtmap.wfsGetFeature({
     *              typeNames : 'wtl_fire_ps',
     *              page : 1,
     *              perPage : 10,
     *              sortBy : 'gid',
     *              orderBy : 'ASC',
     *              filter : ['gid > 10', 'gid < 20']
     *          })
     *
     *          2. CQL 방식
     *         dtmap.wfsGetFeature({
     *              typeNames : 'wtl_fire_ps',
     *              page : 1,
     *              perPage : 10,
     *              sortBy : 'gid',
     *              orderBy : 'DESC',
     *              cql : 'gid > 10 and gid < 20'
     *          })
     *
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
            srsName: options.crs || getMap().crs,
            featureTypes: options.typeNames,
            maxFeatures: maxFeatures,
            startIndex: startIndex,
            filter: filter
        });
        if (options.sortBy) {
            wfsSortBy(featureRequest, options);
        }

        return new XMLSerializer().serializeToString(featureRequest);
    }

    function getWFSFilter(options) {
        let ary = []

        if (options.filter) {
            const filter = parseFilter(options.filter);
            if (filter) {
                ary.push(filter);
            }
        }

        if (options.geometry) {
            let geom = options.geometry.clone();
            if (geom instanceof ol.geom.Circle) {
                geom = ol.geom.Polygon.fromCircle(geom);
            }
            ary.push(new ol.format.filter.intersects('geom', geom, options.crs || dtmap.crs));
        } else if (options.bbox) {
            ary.push(new ol.format.filter.bbox('geom', options.bbox,options.crs || dtmap.crs));
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
        if (data instanceof Array) {
            if (data.length === 0) {
                return;
            }
            const filters = [];
            for (let i = 0; i < data.length; i++) {
                filters.push(parseFilter(data[i]))
            }
            if (filters.length === 0) {
                return;
            } else if (filters.length === 1) {
                return filters[0];
            } else {
                return ol.format.filter.and(...filters);
            }
        }

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
                if (!v.startsWith('*') && !v.endsWith('*')) {
                    filter = ol.format.filter.like(k, '*' + v + '*');
                } else {
                    filter = ol.format.filter.like(k, v);
                }
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
        order.setHTML(options.sortOrder || 'ASC');
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
            srsName: options.crs || getMap().crs,
            typeNames: options.typeNames,
            maxFeatures: maxFeatures,
            startIndex: startIndex,
            cql_filter: cql === '1=1' ? undefined : cql,
            sortBy: options.sortBy ? options.sortBy : 'gid'
        }
    }

    /**
     * 지도 이벤트 리스너 등록
     * @param {string} type 이벤트 타입 'click', 'dbclick', 'drawstart', 'drawend', 'select'
     * @param {function} listener
     * @return {EventEmitter}
     */
    function on(type, listener) {
        return _eventEmitter.addListener(type, listener);
    }

    /**
     * 지도 이벤트 리스너 등록
     * 이벤트 1회 발생후 리스너는 삭제.
     * @param {string} type 이벤트 타입 'click', 'dbclick', 'drawstart', 'drawend', 'select'
     * @param {function} listener
     * @return {EventEmitter}
     */
    function once(type, listener) {
        return _eventEmitter.addOnceListener(type, listener);
    }

    /**
     * 지도 이벤트 리스너 삭제
     * @param {string} type 이벤트 타입 'click', 'dbclick', 'drawstart', 'drawend', 'select'
     * @param {function} listener
     * @return {EventEmitter}
     */
    function off(type, listener) {
        if (listener) {
            return _eventEmitter.removeListener(type, listener);
        } else {
            return _eventEmitter.removeEvent(type);
        }
    }

    /**
     * 지도 이벤트 발생
     * @param {string} type 이벤트 타입 'click', 'dbclick', 'drawstart', 'drawend', 'select'
     * @param {Any} data
     * @return {*}
     */
    function trigger(type, data) {
        return _eventEmitter.trigger(type, [data]);
    }

    /**
     * 지도 이미지 추출
     * 현재 지도화면을 base64 스트링으로 반환
     * @return {Promise}
     */
    function toImage() {
        const promise = $.Deferred();
        html2canvas(getMap().container).then(canvas => {
            promise.resolve(canvas.toDataURL());
        });
        return promise;
    }

    const module = {
        init: init,
        goHome: goHome,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        switchMap: switchMap,
        getCenter: getCenter,
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
        trigger: trigger,
        toImage: toImage
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