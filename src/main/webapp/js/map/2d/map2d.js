window.dtmap = window.dtmap || {}
dtmap.map2d = (function () {
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

    const DEFAULT = {
        target: 'map2D',
        projection: 'EPSG:5179',
        center: [999028.8152684278, 1943589.1358372485],
        zoom: 17,
        minZoom: 6,
        maxZoom: 19
    }
    let isInit_ = false, container_, canvas_;
    let map, view

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
        let options = Object.assign({}, DEFAULT, dtmap.config.map2d) || {};
        container_ = document.getElementById(options.target)
        view = new ol.View({
            projection: options.projection,
            center: options.center,
            zoom: options.zoom,
            minZoom: options.minZoom,
            maxZoom: options.maxZoom,
            constrainResolution: true,
        });
        map = new ol.Map({
            target: container_,
            layers: [
                // new ol.layer.Tile({
                //     source : new ol.source.OSM()
                // })
            ],
            interactions: defaultInteractions(),
            controls: [],
            view: view,
        });
        initModules();
        isInit_ = true;
    }

    function initModules() {
        let modules = dtmap.map2d.modules;
        for (let key in modules) {
            if (modules[key].init && typeof modules[key].init === 'function') {
                modules[key].init();
            }
        }
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
    function getZoom() {
    }

    function setZoom() {
    }

    function getCenter() {
        console.log('2d getCenter');
    }

    function setCenter() {
        console.log('2d setCenter');
    }

    function getExtent() {
    }

    function setExtent() {
    }

    function reset() {
    }

    function dispose() {
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

    const module = {
        init: init,
        show: show,
        hide, hide,
        getZoom: getZoom,
        setZoom: setZoom,
        getCenter: getCenter,
        setCenter: setCenter,
        getExtent: getExtent,
        setExtent: setExtent,
        reset: reset,
        dispose: dispose,
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

