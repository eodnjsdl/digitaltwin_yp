window.map2d = (function () {
    /**
     * UTM-K
     */
    proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs ");

    proj4.defs("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43");

    /**
     * 중부원점 60만
     */
    proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);

    /**
     * 중부원점 60만 (axisOrientation 이 없으면 WMS 1.3.0 getMap이 정상적으로 수행이 안됨)
     */
    ol.proj.addProjection(new ol.proj.Projection({
        code: "EPSG:5179", units: "m", axisOrientation: "enu",
    }));
    ol.proj.addProjection(new ol.proj.Projection({
        code: "urn:x-ogc:def:crs:EPSG:5179", units: "m", axisOrientation: "neu",
    }));
    ol.proj.get('EPSG:4326').axisOrientation_ = 'enu';

    let _isInit = false;
    let _container;
    let _map;
    let _view;
    let _curInteraction;

    /**
     * 2D 지도 초기화
     */
    function init() {
        if (_isInit) {
            return;
        }
        let config = map2d.config;
        _container = document.getElementById(config.target)
        _container.style.display = 'block'; //초기화 할때 display none 일경우 오류발생
        _view = new ol.View({
            projection: config.projection,
            center: config.center,
            zoom: config.zoom,
            minZoom: config.minZoom,
            maxZoom: config.maxZoom,
            // resolutions: [
            //     70.5556966669489,
            //     35.27784833347445,
            //     17.638924166737226,
            //     7.05556966669489,
            //     3.527784833347445,
            //     0.17638924166737224,
            //     0.07055569666694889,
            //     0.03527784833347444,
            //     0.01763892416673722,
            //     0.00705556966669489
            // ],
            constrainResolution: true,
        });
        _map = new ol.Map({
            target: _container,
            layers: [],
            interactions: defaultInteractions(),
            controls: [
            //    new ol.control.ScaleLine()
            ],
            view: _view,
        });
        initModules();
        _isInit = true;
        _map.on('click', onClick);
        _map.on('dblclick', onDblClick);
        _map.on('contextmenu', onContextmenu);
        _map.on('moveend', onMoveEnd);
        _container.addEventListener('mousedown', onMouseDown);
        _container.addEventListener('mouseup', onMouseUp);
    }

    function onClick(e) {
        dtmap.trigger('click', e);
        if (_map.hasFeatureAtPixel(e.pixel)) {
            const feature = _map.getFeaturesAtPixel(e.pixel)[0];
            dtmap.trigger('select', {
                id: feature.getId(),
                property: feature.getProperties(),
                geometry: feature.getGeometry(),
                feature: feature,
                originalEvent: e.originalEvent
            });
        }

    }

    function onDblClick(e) {
        dtmap.trigger('dblclick', e);
    }

    function onContextmenu(e) {
        dtmap.trigger('contextmenu', e);
    }

    function onMoveEnd(e) {
        dtmap.trigger('moveend', {
            coordinate: _view.getCenter(),
            resolution: _view.getResolution(),
            altitude: dtmap.util.zoomToAlt(_view.getZoom()),
            zoom: _view.getZoom(),
            originalEvent: e
        });
    }

    function onMouseDown(e) {
        dtmap.trigger('mousedown', e);
    }

    function onMouseUp(e) {
        dtmap.trigger('mouseup', e);
    }

    function initModules() {
        map2d.baseLayer.init();
        map2d.measure.init();
        map2d.vector.init();
        map2d.draw.init();
    }

    /**
     * 기본 상호작용 목록
     */
    function defaultInteractions() {
        const interactions = ol.interaction.defaults();

        // 더블클릭 확대 막음. DrawEnd와 충돌남
        interactions.removeAt(1);
        return interactions;
    }

    /**
     * export function
     */
    function zoomIn() {
        _view.setZoom(_view.getZoom() + 1);
    }

    function zoomOut() {
        _view.setZoom(_view.getZoom() - 1);
    }

    function getCenter() {
        return _view.getCenter();
    }

    function setCenter(center, options) {
        _view.setCenter(center);
        if (options.zoom) {
            _view.setZoom(options.zoom);
        }
        if (options.resolution) {
            _view.setResolution(options.resolution)
        }
        if (options.scale) {
            let r = dtmap.util.scaleToResolution(options.scale);
            _view.setResolution(r);
        }
    }

    function getExtent() {
        return _view.calculateExtent()
    }

    function setExtent(extent) {
        _view.fit(extent);
    }

    function getResolution() {
        return _view.getResolution();
    }

    function setResolution(resolution) {
        return _view.setResolution(resolution);
    }

    /**
     *
     * @param options
     * @return {ol.Layer}
     */
    function showLayer(options) {
        let {id, visible} = options;
        let layer = map2d.layer.getById(id);
        if (!layer) {
            layer = map2d.layer.addLayer(options);
        }
        map2d.layer.setVisible(id, visible);
        return layer;
    }


    function clear() {
        clearInteraction();
        map2d.vector.clear();
        map2d.draw.clear();
        // map2d.layer.clear();
        $('.ctrl-group>button').removeClass('active');
    }

    function show() {
        if (!_isInit) {
            init();
        }
        _container.style.display = 'block';
    }

    function hide() {
        if (!_isInit) {
            return;
        }
        _container.style.display = 'none';
    }

    function clearInteraction(skipClear) {
        if (_curInteraction) {
            if (_curInteraction.clear && !skipClear) {
                _curInteraction.clear();
            }
            _curInteraction.dispose();
            _curInteraction = undefined;
        }
    }

    function setInteraction(interaction, skipClear) {
        clearInteraction(skipClear);
        _curInteraction = interaction;
    }


    /**
     * 초기영역으로 이동
     */
    function goHome() {
        let {center, zoom} = map2d.config;
        _view.setCenter(center);
        _view.setZoom(zoom);

    }

    /**
     * 배경지도 설정
     * @param name
     */
    function setBaseLayer(name) {
        map2d.baseLayer.setLayer(name);
    }

    const module = {
        init: init,
        show: show,
        hide: hide,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        getCenter: getCenter,
        setCenter: setCenter,
        getExtent: getExtent,
        setExtent: setExtent,
        getResolution: getResolution,
        setResolution: setResolution,
        showLayer: showLayer,
        clear: clear,
        goHome: goHome,
        setBaseLayer: setBaseLayer,
        setInteraction: setInteraction,
        clearInteraction: clearInteraction,
        defaultInteractions: defaultInteractions
    }
    Object.defineProperties(module, {
        'map': {
            get: function () {
                return _map;
            }

        },
        'view': {
            get: function () {
                return _view;
            }
        },
        'extent': {
            get: function () {
                return _view.calculateExtent();
            }
        },
        'crs': {
            get: function () {
                return _view.getProjection().getCode();
            }
        },
        'container': {
            get: function () {
                return _container;
            }
        },
        'isInit': {
            get: function () {
                return _isInit;
            }
        }
    });
    return module;
}());

