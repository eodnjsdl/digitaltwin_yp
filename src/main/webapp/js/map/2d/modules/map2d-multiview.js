window.map2d = window.map2d || {}
map2d.multiView = (function () {

    let _mapList = [];
    let _count;
    let _mainSelector;

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
            createSync();
            for (let i = 1; i < count; i++) {
                _mapList.push(new SubMap('subMap_' + (i + 1)));
            }
            const target = map2d.map.getTarget();
            $(target).addClass('split-main-map');
            $(target).parent().addClass('split-map-' + count);
            map2d.map.updateSize();
            _mainSelector = new BaseSelector(map2d.map);
            _count = count;
        }
    }

    function createSync() {
        const _html = `<div class="btn_sync_01"><button type="button" id="btnSync" class="btn_sync_02" value="async"></button></div>`;
        $("#container").append(_html);
    }

    function dispose() {
        for (let i = 0; i < _mapList.length; i++) {
            _mapList[i].dispose();
        }
        _mapList = [];
        const target = map2d.map.getTarget();
        $(target).removeClass('split-main-map');
        $(target).parent().removeClass('split-map-' + _count);
        const $target = $(".btn_sync_01");
        if ($target) $target.remove();
        map2d.map.updateSize();

        if (_mainSelector) {
            _mainSelector.dispose();
            _mainSelector = undefined;
        }
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
        this.selector = undefined;
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
        this.selector = new BaseSelector(this.map);
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
        this.selector.dispose();
        this.element.remove();
        this.element = undefined
        this.map = undefined;
        this.view = undefined;
    }


    function BaseSelector(map) {
        this.element = undefined;
        this.map = map;
        this.target = map.getTargetElement();

        const layers = map.getLayers().getArray();
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].get('title') === '배경지도') {
                this.baseLayers = layers[i];
            }
        }

        this.createElement();
    }

    BaseSelector.prototype.createElement = function () {
        const select = document.createElement('select');
        select.className = 'base-layer-select form-control';
        const layers = this.baseLayers.getLayersArray();
        let html = ''
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const title = layer.get('title');
            const name = layer.get('name');
            const visible = layer.getVisible();
            html += `<option value="${title}" ${visible ? 'selected' : ''}>${name}</option>`;
        }
        select.innerHTML = html;

        select.onchange = onSelectChange.bind(this);
        this.target.appendChild(select)
        this.element = select;
    }

    BaseSelector.prototype.setBaseLayer = function (title) {
        const layers = this.baseLayers.getLayersArray();
        for (let i = 0; i < layers.length; i++) {
            const v = layers[i];
            if (v.get('title') === title) {
                v.setVisible(true);
            } else {
                v.setVisible(false);
            }
        }
    }
    BaseSelector.prototype.dispose = function () {
        this.element.remove();
    }

    //분할창 배경지도 선택 change event
    function onSelectChange(e) {
        this.setBaseLayer(e.target.value);
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