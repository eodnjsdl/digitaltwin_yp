window.Module = window.Module || {};
window.map3d = (function () {
    let _isInit = false;
    let _isLoaded = $.Deferred();
    let _container;
    let _camera;
    let _curInteraction;

    function init() {
        if (_isInit) {
            return _isLoaded;
        }

        _container = document.getElementById(map3d.config.target);
        window.addEventListener('resize', resize);

        $.when.apply($, [loadScript(), getMapSetting()]).then(function () {
            //XDWorld Option 설정
            Module.TOTAL_MEMORY = map3d.config.totalMemory;
            Module.getNavigation().setNaviVisible(Module.JS_VISIBLE_OFF);
            //Module.Start 이전에 호출해야함.
            Module.SetResourceServerAddr(dtmap.urls.xdServer + "/images/poi/");
            //배경 지도, DEM 설정부
            Module.XDESetDemUrlLayerName(dtmap.urls.xdServer, "dem_yp_5m");
            Module.XDESetSatUrlLayerName(dtmap.urls.xdServer, "tile_yp_25cm");


            //XDWorld 시작
            Module.initialize({
                container: _container
            });

            // 이전버전 초기화 소스
            // var canvas = document.createElement("canvas");
            // canvas.id = "canvas"; // id가 canvas가 아닐경우 에러발생
            // canvas.width = container_.clientWidth;
            // canvas.height = container_.clientHeight;
            // container_.append(canvas);
            // Module.canvas = canvas
            // canvas.addEventListener('contextmenu', function (e) {
            //     e.preventDefault();
            // })
            // Module.Start(container_.clientWidth, container_.clientHeight)

            //초기 카메라설정
            let {center, limitRect, limitAlt, limitCamera} = map3d.config;
            _camera = Module.getViewCamera();
            _camera.limit = {
                altitude: {
                    enable: true,
                    min: 150,
                    max: limitAlt
                },
                bound: {
                    enable: true,
                    min: {
                        lon: limitRect[0],
                        lat: limitRect[1]
                    },
                    max: {
                        lon: limitRect[2],
                        lat: limitRect[3]
                    }
                }
            }
            // let centerVec = new Module.JSVector3D(center[0], center[1], center[2]);
            // _camera.setLocation(centerVec);
            _camera.moveLonLatAlt(center[0], center[1], center[2], false)
            // goHome();

            //3D 확장 모듈 초기화
            initModules();
            _isInit = true;
            _isLoaded.resolve(true);
        })

        return _isLoaded;
    }

    // 지도 세팅 정보 불러오기
    function getMapSetting() {
        return $.ajax({
            type: "POST",
            url: "/geo/map/MapSetting.do",
            dataType: "json",
            async: false,
            success: function (data, status) {
                if (status === "success") {
                    map3d.config.set(data.result);
                } else {
                    toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                    return;
                }
            }, complete: function () {
            }
        });
    }

    //확장 모듈 초기화
    function initModules() {
        map3d.layer.init();
        map3d.compass.init();
        map3d.overlay.init();
        map3d.location.init();
        map3d.measure.init();
        map3d.vector.init();
    }

    //window resize Event
    function resize() {
        if (!_isInit) {
            return;
        }
        Module.Resize(_container.clientWidth, _container.clientHeight)
    }


    //엔진 스크립트 로드
    function loadScript() {
        let promise = $.Deferred();
        var tm = (new Date()).getTime();	// 캐싱 방지

        var file = "../engine/XDWorldEM.asm.js?tm=" + tm;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', file, true);
        xhr.onload = function () {

            var script = document.createElement('script');
            script.innerHTML = xhr.responseText;
            document.body.appendChild(script);

            // 2. XDWorldEM.html.mem 파일 로드
            setTimeout(function () {
                (function () {

                    var memoryInitializer = "../engine/XDWorldEM.html.mem?tm=" + tm;
                    var xhr = Module['memoryInitializerRequest'] = new XMLHttpRequest();
                    xhr.open('GET', memoryInitializer, true);
                    xhr.responseType = 'arraybuffer';
                    xhr.onload = function (e) {

                        // 3. XDWorldEM.js 파일 로드
                        var url = "../engine/XDWorldEM.js?tm=" + tm;
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.onload = function () {
                            var script = document.createElement('script');
                            script.innerHTML = xhr.responseText;
                            document.body.appendChild(script);
                            //Load End 시점
                            promise.resolve(true);
                        };
                        xhr.send(null);
                    };
                    xhr.send(null);
                })();
            }, 1);
        };
        xhr.send(null);
        return promise;
    }

    /**
     * export function
     */

    /**
     * 확대
     */
    function zoomIn() {
        if (_camera) {
            _camera.ZoomIn();
        }
    }

    /**
     * 축소
     */
    function zoomOut() {
        if (_camera) {
            _camera.ZoomOut();
        }
    }

    /**
     * 중심 좌표 반환 (높이는 카메라의 높이)
     * @returns {(number|*)[x,y,z]}
     */
    function getCenter() {
        let center = _camera.getCenterPoint();
        return [center.Longitude, center.Latitude, _camera.getAltitude()];
    }

    /**
     * 중심좌표로 이동
     * @param center
     * @param altitude
     */
    function setCenter(center, altitude) {
        var alt = Module.getMap().getTerrHeightFast(center[0], center[1]);
        let centerVec = new Module.JSVector3D(center[0], center[1], alt);
        _camera.moveLookAt(centerVec, 30, 0, altitude * 1.6);
    }

    /**
     * 3D맵 DIV 보이기
     * @returns {Promise}
     */
    function show() {
        if (!_isInit) {
            init();
        }
        _container.style.display = 'block';
        return _isLoaded
    }

    /**
     * 3D맵 DIV 숨기기
     */
    function hide() {
        if (!_isInit) {
            return;
        }
        _container.style.display = 'none';
    }

    /**
     * 레이어 가시화
     * @param options
     * @return {map3d.layer.Layer}
     */
    function showLayer(options) {
        let {id, visible} = options;
        let layer = map3d.layer.getById(id);
        if (!layer) {
            layer = map3d.layer.addLayer(options);
        }
        map3d.layer.setVisible(id, visible);
        return layer;
    }

    function clearInteraction() {
        if (_curInteraction) {
            if (_curInteraction.clear) {
                _curInteraction.clear();
            }
            _curInteraction.dispose();
            _curInteraction = undefined;
        }
    }

    function setInteraction(interaction) {
        clearInteraction();
        _curInteraction = interaction;
    }


    /**
     * 지도 데이터 초기화
     */
    function clear() {
        clearInteraction();
        $('.ctrl-group>button').removeClass('active');
    }


    /**
     * 초기영역으로 이동
     */
    function goHome() {
        let {center} = map3d.config;
        let centerVec = new Module.JSVector3D(center[0], center[1], center[2]);
        _camera.move(centerVec, 80, 0, 800);
    }

    /**
     * 배경지도 설정
     * @param name
     */
    function setBaseLayer(name) {
        let url;
        if (name === 'emap') {
            url = dtmap.urls.emapBase + '?apikey=' + dtmap.urls.EMAP_KEY + '&layer=korean_map&style=korean&tilematrixset=EPSG%3A5179&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=L{02z}&TileCol={x}&TileRow={y}'
        } else if (name === 'air') {
            // url = dtmap.urls.emapAirProxy + '?URL=' + dtmap.urls.emapAir + '%3Fapikey=' + dtmap.urls.EMAP_KEY + '%26layer=AIRPHOTO%26style=_null%26tilematrixset=NGIS_AIR%26Service=WMTS%26Request=GetTile%26Version=1.0.0%26Format=image%252Fjpg%26TileMatrix={z}%26TileCol={x}%26TileRow={y}'
            return Module.WMTS().clear();
        }

        let wmts = Module.WMTS();
        wmts.provider = {
            url: url,
            tileExtent: {
                min: new Module.JSVector2D(-200000.98, -28086425.6),
                max: new Module.JSVector2D(31886425.6, 4000000.0)
            },
            projection: "EPSG:5179",
            tileSize: 256,
            resolutions: [2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],		// 레벨별 해상도
            matrixIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],	// 타일 레벨 정의 (resolutions과 매칭)
            serviceLevel: {
                min: 3,
                max: 20
            }
        }
        wmts.quality = "middle";	// wmts 이미지 품질
        wmts.zeroLevel = 2;			// wmts 이미지 LOD

    }

    const module = {
        init: init,
        show: show,
        hide: hide,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        setCenter: setCenter,
        getCenter: getCenter,
        showLayer: showLayer,
        setInteraction: setInteraction,
        clearInteraction: clearInteraction,
        clear: clear,
        goHome: goHome,
        setBaseLayer: setBaseLayer
    }

    Object.defineProperties(module, {
        'container': {
            get: function () {
                return _container;
            }
        },
        'canvas': {
            get: function () {
                return _container.getElementsByTagName('canvas').canvas;
            }
        },
        'camera': {
            get: function () {
                return _camera;
            }
        },
        'isInit': {
            get: function () {
                return _isInit;
            }
        },
        'isLoaded': {
            get: function () {
                return _isLoaded;
            }
        },
        'crs': {
            get: function () {
                return 'EPSG:4326'
            }
        },
        'userLayers': {
            get: function () {
                return this.layer.userLayers;
            }
        },
        'serviceLayers': {
            get: function () {
                return this.layer.serviceLayers;
            }
        }
    });

    return module;
}())
map3d.inherits = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};

