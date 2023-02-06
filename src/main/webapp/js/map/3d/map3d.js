window.Module = window.Module || {}; //xd 객체 선언
window.dtmap = window.dtmap || {}
dtmap.map3d = (function () {
    let isInit_ = false, isLoaded_ = $.Deferred(), container_, canvas_;
    let camera;

    function init() {
        if (isInit_) {
            return isLoaded_;
        }
        let {config} = dtmap.map3d;
        container_ = document.getElementById(config.target);
        window.addEventListener('resize', resize);

        $.when.apply($, [loadScript(), getMapSetting()]).then(function () {
            //XDWorld Option 설정
            Module.TOTAL_MEMORY = config.totalMemory;
            Module.getNavigation().setNaviVisible(Module.JS_VISIBLE_OFF);
            //Module.Start 이전에 호출해야함.
            Module.SetResourceServerAddr("/images/poi/");
            //배경 지도, DEM 설정부
            Module.XDESetDemUrlLayerName(dtmap.urls.xdServer, "dem_yp_5m");
            Module.XDESetSatUrlLayerName(dtmap.urls.xdServer, "tile_yp_25cm");


            //XDWorld 시작
            Module.initialize({
                container: container_
            });

            //초기 카메라설정
            camera = Module.getViewCamera();
            let {center, limitRect, limitAlt, limitCamera} = config;
            let centerVec = new Module.JSVector3D(center[0], center[1], center[2]);
            camera.setLimitRectAlt(limitRect[0], limitRect[1], limitRect[2], limitRect[3], limitRect[4]);
            camera.setLimitAltitude(limitAlt);
            camera.setLimitCamera(limitCamera);
            camera.setLocation(centerVec)
            camera.moveLookAt(centerVec, 90, 0, 800);


            //3D 확장 모듈 초기화
            initModules();
            isInit_ = true;
            isLoaded_.resolve(true);
        })

        return isLoaded_;
    }

    // 지도 세팅 정보 불러오기
    function getMapSetting() {
        return $.ajax({
            type: "POST",
            url: "/geo/map/MapSetting.do",
            dataType: "json",
            async: false,
            success: function (data, status) {
                if (status == "success") {
                    dtmap.map3d.config.set(data.result);
                } else {
                    alert("ERROR!");
                    return;
                }
            }, complete: function () {
            }
        });
    }

    //확장 모듈 초기화
    function initModules() {
        let modules = dtmap.map3d.modules;
        for (let key in modules) {
            if (modules[key].init && typeof modules[key].init === 'function') {
                modules[key].init();
                dtmap.map3d[key] = modules[key];
            }
        }
        dtmap.map3d.modules = undefined;
        delete dtmap.map3d.modules;
    }

    //window resize Event
    function resize() {
        if (!isInit_) {
            return;
        }
        Module.Resize(container_.clientWidth, container_.clientHeight)
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
     * 중심 좌표 반환 (높이는 카메라의 높이)
     * @returns {(number|*)[x,y,z]}
     */
    function getCenter() {
        let center = camera.getCenterPoint();
        return [center.Longitude, center.Latitude, camera.getAltitude()];
    }

    /**
     * 중심좌표로 이동
     * @param center
     * @param altitude
     */
    function setCenter(center, altitude) {
        var alt = Module.getMap().getTerrHeightFast(center[0], center[1]);
        let centerVec = new Module.JSVector3D(center[0], center[1], alt);
        camera.moveLookAt(centerVec, 30, 0, altitude * 1.6);
    }

    /**
     * 3D맵 DIV 보이기
     * @returns {*}
     */
    function show() {
        if (!isInit_) {
            init();
        }
        container_.style.display = 'block';
        return isLoaded_
    }

    /**
     * 3D맵 DIV 숨기기
     */
    function hide() {
        if (!isInit_) {
            return;
        }
        container_.style.display = 'none';
    }

    function showLayer(options) {
        let {id, visible} = options;
        let layer = dtmap.map3d.layer.getById(id);
        if (!layer) {
            dtmap.map3d.layer.addLayer(options);
        }
        dtmap.map3d.layer.setVisible(id, visible);

    }

    const module = {
        init: init,
        show: show,
        hide: hide,
        setCenter: setCenter,
        getCenter: getCenter,
        showLayer: showLayer
    }

    Object.defineProperties(module, {
        'container': {
            get: function () {
                return container_;
            }
        },
        'canvas': {
            get: function () {
                return container_.getElementsByTagName('canvas');
            }
        },
        'isInit': {
            get: function () {
                return isInit_;
            }
        },
        'crs': {
            get: function () {
                return 'EPSG:4326'
            }
        }
    });

    return module;
}())

