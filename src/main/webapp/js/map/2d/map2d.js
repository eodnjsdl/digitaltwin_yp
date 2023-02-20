window.map2d = (function () {
    /**
     * UTM-K
     */
    proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");

    proj4.defs("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");

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

    let isInit_ = false, container_;
    let map, view;
    let layerList = [];

    /**
     * 2D 지도 초기화
     * @param options
     * @param {String} options.target
     * @param {String} options.projection
     * @param {Array.<number>} options.center
     * @param {number} options.zoom
     * @param {number} options.minZoom
     * @param {number} options.maxZoom
     */
    function init() {
        if (isInit_) {
            return;
        }
        let config = map2d.config;
        container_ = document.getElementById(config.target)
        view = new ol.View({
            projection: config.projection,
            center: config.center,
            zoom: config.zoom,
            minZoom: config.minZoom,
            maxZoom: config.maxZoom,
            constrainResolution: true,
        });
        map = new ol.Map({
            target: container_,
            layers: [],
            interactions: defaultInteractions(),
            controls: [],
            view: view,
        });
        initModules();
        isInit_ = true;
    }

    function initModules() {
        map2d.baseLayer.init();
        map2d.measure.init();
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
        view.setZoom(view.getZoom() + 1);
    }

    function zoomOut() {
        view.setZoom(view.getZoom() - 1);
    }

    function getCenter() {
        return view.getCenter();
    }

    function setCenter(center, zoom) {
        view.setCenter(center);
        if (zoom) {
            view.setZoom(zoom);
        }
    }

    function getExtent() {
        return view.calculateExtent()
    }

    function setExtent(extent) {
        view.fit(extent);
    }

    function showLayer(options) {
        let {id, visible} = options;
        let layer = map2d.layer.getById(id);
        if (!layer) map2d.layer.addLayer(options);
        map2d.layer.setVisible(id, visible);
    }


    function clear() {
    }

    function show() {
        if (!isInit_) {
            init();
        }
        container_.style.display = 'block';
    }

    function hide() {
        if (!isInit_) {
            return;
        }
        container_.style.display = 'none';
    }

    function setInteraction(mod) {
        switch (mod) {
            case 'distance':
                map2d.measure.addInteraction('LineString');
                break;
            case 'area' :
                map2d.measure.addInteraction('Polygon');
                break;
            case 'radius':
                map2d.measure.addInteraction('Circle');
                break;
            default :
                map2d.measure.clearInteraction();
                break;
        }
    }

    /**
     * 초기영역으로 이동
     */
    function goHome() {
        let {center, zoom} = map2d.config;
        view.setCenter(center);
        view.setZoom(zoom);

    }

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
        showLayer: showLayer,
        clear: clear,
        goHome: goHome,
        setBaseLayer: setBaseLayer,
        setInteraction: setInteraction,
    }
    Object.defineProperties(module, {
        'map': {
            get: function () {
                return map;
            }

        },
        'view': {
            get: function () {
                return view;
            }
        },
        'extent': {
            get: function () {
                return view.calculateExtent();
            }
        },
        'crs': {
            get: function () {
                return view.getProjection().getCode();
            }
        },
        'container': {
            get: function () {
                return container_;
            }
        },
        'isInit': {
            get: function () {
                return isInit_;
            }
        }
    });
    return module;
}())

