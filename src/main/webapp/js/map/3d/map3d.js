window.Module = window.Module || {};
window.map3d = (function () {
    let isInit_ = false, isLoaded_ = $.Deferred(), container_;
    let camera_;
    let curInteraction;

    function init() {
        if (isInit_) {
            return isLoaded_;
        }

        container_ = document.getElementById(map3d.config.target);
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
                container: container_
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
            camera_ = Module.getViewCamera();
            let {center, limitRect, limitAlt, limitCamera} = map3d.config;
            let centerVec = new Module.JSVector3D(center[0], center[1], center[2]);
            camera_.setLimitRectAlt(limitRect[0], limitRect[1], limitRect[2], limitRect[3], limitRect[4]);
            camera_.setLimitAltitude(limitAlt);
            camera_.setLimitCamera(limitCamera);
            camera_.setLocation(centerVec)
            camera_.moveLookAt(centerVec, 90, 0, 800);


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
                    map3d.config.set(data.result);
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
        map3d.layer.init();
        map3d.compass.init();
        map3d.overlay.init();
        map3d.location.init();
        map3d.measure.init();
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
     * 확대
     */
    function zoomIn() {
        if (camera_) {
            camera_.ZoomIn();
        }
    }

    /**
     * 축소
     */
    function zoomOut() {
        if (camera_) {
            camera_.ZoomOut();
        }
    }

    /**
     * 중심 좌표 반환 (높이는 카메라의 높이)
     * @returns {(number|*)[x,y,z]}
     */
    function getCenter() {
        let center = camera_.getCenterPoint();
        return [center.Longitude, center.Latitude, camera_.getAltitude()];
    }

    /**
     * 중심좌표로 이동
     * @param center
     * @param altitude
     */
    function setCenter(center, altitude) {
        var alt = Module.getMap().getTerrHeightFast(center[0], center[1]);
        let centerVec = new Module.JSVector3D(center[0], center[1], alt);
        camera_.moveLookAt(centerVec, 30, 0, altitude * 1.6);
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

    /**
     * 레이어 가시화
     * @param options
     */
    function showLayer(options) {
        let {id, visible} = options;
        let layer = map3d.layer.getById(id);
        if (!layer) {
            map3d.layer.addLayer(options);
        }
        map3d.layer.setVisible(id, visible);
    }

    /**
     * 상호작용 설정
     * @param mod
     */
    function setInteraction(mod) {
        clearInteraction();
        switch (mod) {
            case 'distance':
                curInteraction = map3d.measure.distance;
                break;
            case 'area' :
                curInteraction = map3d.measure.area;
                break;
            case 'radius':
                curInteraction = map3d.measure.radius;
                break;
            case 'location':
                curInteraction = map3d.location;
                break;
            default :
                curInteraction = undefined;
                break;
        }

        if (curInteraction) {
            curInteraction.active();
        }

    }

    /**
     * 지도 데이터 초기화
     */
    function clear() {
        clearInteraction();
    }

    function clearInteraction() {
        if (curInteraction) {
            curInteraction.dispose();
            curInteraction = undefined;
        }
    }

    /**
     * 초기영역으로 이동
     */
    function goHome() {
        let {center} = map3d.config;
        let centerVec = new Module.JSVector3D(center[0], center[1], center[2]);
        camera_.setLocation(centerVec)
        camera_.moveLookAt(centerVec, 90, 0, 800);
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
        clear: clear,
        goHome: goHome
    }

    Object.defineProperties(module, {
        'container': {
            get: function () {
                return container_;
            }
        },
        'canvas': {
            get: function () {
                return container_.getElementsByTagName('canvas').canvas;
            }
        },
        'camera': {
            get: function () {
                return camera_;
            }
        },
        'isInit': {
            get: function () {
                return isInit_;
            }
        },
        'isLoaded': {
            get: function () {
                return isLoaded_;
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

