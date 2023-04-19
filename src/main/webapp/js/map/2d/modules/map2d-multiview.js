window.map2d = window.map2d || {}
map2d.multiView = (function () {

    let _mapList = [];
    let _count;


    /**
     * 다중화면 활성화 함수
     *
     * @param {number} count 다중 화면 갯수 [2~4]
     */
    function active(count) {
        if (count < 1 || count > 4) {
            return console.warn(`${count}개 지도분할은 지원하지 않습니다.`, '지도분할은 2,3,4개 까지 지원합니다.');
        } else {
            dispose();
            for (let i = 1; i < count; i++) {
                _mapList.push(new SubMap('subMap_' + (i + 1)));
            }
            const target = map2d.map.getTarget();
            $(target).addClass('split-main-map');
            $(target).parent().addClass('split-map-' + count);
            map2d.map.updateSize();
            _count = count;
        }
    }

    function dispose() {
        for (let i = 0; i < _mapList.length; i++) {
            _mapList[i].dispose();
        }
        _mapList = [];
        const target = map2d.map.getTarget();
        $(target).removeClass('split-main-map');
        $(target).parent().removeClass('split-map-' + _count);
    }

    function syncView() {
        for (let i = 0; i < _mapList.length; i++) {
            _mapList[i].syncView();
        }
    }

    function asyncView() {
        for (let i = 0; i < _mapList.length; i++) {
            _mapList[i].asyncView();
        }
    }

    function SubMap(id) {
        this.id = id;
        this.element = undefined;
        this.view = undefined;
        this.map = undefined;
        this.createElement();
        this.createMap();
    }

    SubMap.prototype.createMap = function () {
        this.view = new ol.View({
            projection: map2d.view.getProjection(),
            center: map2d.view.getCenter(),
            zoom: map2d.view.getZoom(),
            minZoom: map2d.view.getMinZoom(),
            maxZoom: map2d.view.getMaxZoom(),
            constrainResolution: true,
        });
        this.map = new ol.Map({
            target: this.id,
            layers: [map2d.baseLayer.createGroup()],
            interactions: map2d.defaultInteractions(),
            controls: [],
            view: this.view
        });
        const that = this;
        setTimeout(function () {
            that.map.updateSize();
        })
    }
    SubMap.prototype.createElement = function () {
        this.element = document.createElement('div');
        this.element.id = this.id;
        this.element.className = 'split-sub-map';
        this.element.style.display = 'block';
        const mainTarget = map2d.map.getTarget();

        let sibling = mainTarget.nextElementSibling;
        while (sibling.className.indexOf('split-sub-map') !== -1) {
            sibling = sibling.nextElementSibling;
        }

        mainTarget.parentElement.insertBefore(this.element, sibling);
    }

    SubMap.prototype.syncView = function () {
        this.map.setView(map2d.view);
    }

    SubMap.prototype.asyncView = function () {
        this.view.setCenter(map2d.view.getCenter());
        this.view.setZoom(map2d.view.getZoom())
        this.map.setView(this.view);
    }
    SubMap.prototype.dispose = function () {
        this.map.setTarget(null);

        this.element.remove();
        this.element = undefined
        this.map = undefined;
        this.view = undefined;
    }


    let module = {
        active: active,
        dispose: dispose,
        syncView: syncView,
        asyncView: asyncView
    }

    Object.defineProperties(module, {
        'list': {
            get: function () {
                return _mapList;
            }
        }
    })

    return module;
}());