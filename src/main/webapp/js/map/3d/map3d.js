window.Module = window.Module || {}; //xd 객체 선언
window.dtmap = window.dtmap || {}
dtmap.map3d = (function () {
    let isInit_ = false, container_, canvas_;
    let XDWorld;
    const DEFAULT = {
        target: 'map3D',
        totalMemory: 256 * 1024 * 1024
    }

    function init() {
        if (isInit_) {
            return;
        }
        let options = Object.assign({}, DEFAULT, dtmap.config.map3d) || {};

        window.addEventListener('resize', resize);

        createCanvas(options.target);

        loadScript().then(function () {
            //XDWorld Option 설정
            XDWorld.TOTAL_MEMORY = options.totalMemory;
            XDWorld.canvas = canvas_;

            //XDWorld 시작
            XDWorld.Start(container_.clientWidth, container_.clientHeight);

            initModules();
            isInit_ = true;
        });
    }

    function initModules() {
        let modules = dtmap.map3d.modules;
        for (let key in modules) {
            if (modules[key].init && typeof modules[key].init === 'function') {
                modules[key].init();
            }
        }
    }

    //window resize Event
    function resize() {
        if (!isInit_) {
            return;
        }
        XDWorld.Resize(container_.clientWidth, container_.clientHeight)
    }

    //캔버스 생성
    function createCanvas(target) {
        container_ = document.getElementById(target)
        canvas_ = document.createElement('canvas');
        // Canvas id, Width, height 설정
        canvas_.id = "canvas"; // id가 canvas가 아닐경우 에러발생
        canvas_.width = container_.clientWidth;
        canvas_.height = container_.clientHeight;

        // Canvas 스타일 설정
        canvas_.style.position = "fixed";
        canvas_.style.top = "0px";
        canvas_.style.left = "0px";

        canvas_.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        container_.appendChild(canvas_);
    }

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
                            XDWorld = Module;
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

    function getCenter() {

    }

    function setCenter() {
        console.log('3d setCenter');
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
        hide: hide,
        setCenter: setCenter,
        getCenter: getCenter
    }

    Object.defineProperties(module, {
        'map': {
            get: function () {
                return XDWorld.getMap();
            }
        },
        'container': {
            get: function () {
                return container_;
            }
        },
        'canvas': {
            get: function () {
                return canvas_;
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

