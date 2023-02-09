window.map3d = window.map3d || {};
map3d.modules = map3d.modules || {}
map3d.modules.layer = (function () {

    const JS_LAYER_TYPE = {
        ELT_POLYHEDRON: 0, //다면체
        ELT_PLANE: 1, //평면
        ELT_PIPE: 2, //관(실린더)
        ELT_BILLBOARD: 3, //빌보드
        ELT_3DLINE: 4,// 3차원 선
        ELT_3DPOINT: 5, // 심볼 텍스트
        ELT_3DS_SYMBOL: 6, // 3차원 심볼
        ELT_GHOST_3DSYMBOL: 7, //유령 심볼
        ELT_TERRAIN: 8, //지형
        ELT_MULTILPE: 9, //다용도
        ELT_KML_GROUND: 10, //KML
        ELT_TERRAIN_IMAGE: 11, //지형 영상
        ELT_PICTOMETRY: 12, //픽토 메트리
        ELT_WATER: 13, //Water 가시화
        ELT_SKY_LINE: 102, //RTT 미적용 3차원 선
        ELT_TYPOON: 112, //태풍 가시화
        ELT_GRAPH: 113, //차트 가시화
    }
    const TIME_OUT = 100 * 60 * 10; //레이어 삭제에 쓰이는 타임아웃
    let userList, serviceList;
    let layerMap = new Map();
    let timeOutMap = new Map();

    function init() {
        userList = new Module.JSLayerList(true);
        serviceList = new Module.JSLayerList(false);
    }

    /**
     * 레이어 추가
     * @param options
     */
    function addLayer(options) {
        let {id, type} = options;
        if (getById(id)) {
            throw new Error(id + " 레이어가 이미 존재합니다.");
        }

        if (!type) {
            throw new Error("레이어 종류가 지정되지 않았습니다.");
        }
        let layer = map3d.layer[type](options);
        layerMap.set(id, layer);
    }

    /**
     * 레이어 삭제
     * @param id
     */
    function removeLayer(id) {
        let layer = getById(id)
        if (!layer) {
            return;
        }
        let list;
        if (layer['type_'] === 'user') {
            list = userList;
        } else {
            list = serviceList;
        }
        list.delLayerAtName(layer.getName());
        layerMap.delete(id);
    }

    function setVisible(id, visible) {
        let layer = getById(id);
        if (visible) {
            let timeout = timeOutMap.get(id);
            if (timeout) {
                clearTimeout(timeout);
            }
            Module.setVisibleRange(id, map3d.config.vidoQlityLevel, map3d.config.maxDistance);
        } else {
            removeByTimeOut(id, layer);
        }
        layer.setVisible(visible);
        Module.XDRenderData();
    }

    //레이어 가시화 OFF 10분후 삭제
    function removeByTimeOut(id, layer) {
        let timeout = setTimeout(function () {
            if (layer.getVisible()) {
                removeByTimeOut(id, layer)
            } else {
                removeLayer(id);
            }
            timeOutMap.delete(id);

        }, TIME_OUT);
        timeOutMap.set(id, timeout);
    }

    function getById(id) {
        return layerMap.get(id);
    }

    let module = {
        init: init,
        addLayer: addLayer,
        removeLayer: removeLayer,
        setVisible: setVisible,
        getById: getById
    }
    return module;
})();