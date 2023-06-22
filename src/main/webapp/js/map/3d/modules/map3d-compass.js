window.map3d = window.map3d || {}
map3d.compass = (function () {

    let $element;

    function init() {
//        $element = $("span[name='compass']");
        $element = $("#compass");
        addEventListener();
    }

    function addEventListener() {
        let canvas = map3d.container.getElementsByTagName('canvas')[0];
        canvas.addEventListener("Fire_EventRotateCompass", rotateCompass);
    }


    // 나침반 방향 이벤트 설정
    function rotateCompass(e) {
        $element.css("transform", "rotate(" + e.dCameraHeadAngle + "deg)");
    }

    function setElement(e) {
        $element = e;
    }

    function reset() {
        $element.css("transform", "rotate(0deg)");

        // 카메라 정북 방향으로
        map3d.camera.setDirect(0);
        // 화면 갱신
        Module.XDRenderData();
    }

    let module = {
        init: init,
        reset: reset,
        setElement: setElement
    }

    Object.defineProperties(module, {
        'element': {
            get: function () {
                return $element;
            }
        }
    })

    return module;
}());