window.map3d = window.map3d || {}
map3d.overlay = (function () {
    let _layer;
    let map = new Map();

    function init() {
        _layer = map3d.userLayers.createLayer("HTML_OBJEC_LAYER", Module.ELT_POLYHEDRON);//일반
        _layer.setMaxDistance(10000);
    }

    function add(options) {
        let {id, element, position, verticalAlign, horizontalAlign} = options;

        let object = Module.createHTMLObject(id);
        let complet = object.createbyJson({
            position: position,	// 위치 지점
            container: "container",	// div를 담을 Container 명칭 지정(명칭에 해당되는 div가 없다면 createHTMLObject 작업중 생성)
            canvas: map3d.canvas,	// 화면 사이즈 설정을 위한 canvas 설정
            element: element,	// 엔진 오브젝트와 연동할 HTML Element
            verticalAlign: verticalAlign ? verticalAlign : "middle",	// 수직 정렬 (top, middle, bottom, px 지원 )	|| 태그 미 설정 시 [Default top]
            horizontalAlign: horizontalAlign ? horizontalAlign : "center",	// 수평 정렬 (left, center, right, px 지원 )	|| 태그 미 설정 시 [Default left]
        });

        if (complet.result === 1) {
            _layer.addObject(object, 0);
            map.set(id, object);
        }

    }

    function getById(id) {
        return map.get(id);
    }

    function removeById(id) {
        let object = map.get(id);
        if (object) {
            _layer.removeAtObject(object);
        }
        map.delete(id);
    }

    function clear() {
        _layer.removeAll();
    }


    let module = {
        init: init,
        add: add,
        getById: getById,
        removeById: removeById,
        clear: clear

    };
    return module;
}());