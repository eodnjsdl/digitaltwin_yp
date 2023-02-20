window.map3d = window.map3d || {}
map3d.measure = (function () {
    let _distance, _area, _radius;

    function init() {
        let canvas = map3d.container.getElementsByTagName('canvas')[0];
        _distance = new Distance(canvas);
        _area = new Area(canvas);
        _radius = new Radius(canvas);
    }

    function dummy() {
    }

    function Measure(canvas, type) {
        this.canvas = canvas
        this.type = type;
        this.layers = [];
        this.eventListeners = [];
        this.poiLayer = undefined;
        this.poiCount = 0;
        this.isActive = false;
    }

    Measure.prototype.setActive = function (active) {
        if (this.isActive === active) {
            return;
        }
        if (active) {
            this.active();
        } else {
            this.dispose();
        }
    }
    Measure.prototype.active = function () {
        this.isActive = true;
        this.createLayer();
        this.addEventListener();
        Module.getOption().SetDistanceMeasureLineDepthBuffer(false);	// WEBGL GL_DEPTH_TEST 설정
    }
    Measure.prototype.createLayer = function () {
        throw new Error("Method 'createLayer()' must be implemented.");
    }
    Measure.prototype.addEventListener = function () {
        let option = Module.getOption();
        option.callBackAddPoint(this.clickEvent.bind(this));   		// 마우스 입력시 발생하는 콜백 성공 시 success 반환 실패 시 실패 오류 반환
        option.callBackCompletePoint(this.dblClickEvent.bind(this));	// 측정 종료(더블클릭) 시 발생하는 콜백 성공 시 success 반환 실패 시 실패 오류 반환
    }
    Measure.prototype.clear = function () {
        this.layers.forEach(e => {
            e.removeAll();
        });
    }
    Measure.prototype.removeLayer = function () {
        let list = map3d.userLayers;
        this.layers.forEach(e => {
            e.removeAll();
            list.delLayerAtName(e.getName());
        });
        this.layers = [];
        this.poiLayer = undefined;
    }
    Measure.prototype.removeEventListener = function () {
        let option = Module.getOption();
        option.callBackAddPoint(dummy);		    // 마우스 입력시 발생하는 콜백 성공 시 success 반환 실패 시 실패 오류 반환
        option.callBackCompletePoint(dummy);	// 측정 종료(더블클릭) 시 발생하는 콜백 성공 시 success 반환 실패 시 실패 오류 반환
    }
    Measure.prototype.clickEvent = function (e) {

    }
    Measure.prototype.dblClickEvent = function (e) {

    }
    Measure.prototype.dispose = function () {
        Module.XDSetMouseState(Module.MML_MOVE_GRAB);
        Module.getOption().SetDistanceMeasureLineDepthBuffer(true);	// WEBGL GL_DEPTH_TEST 설정
        this.clear();
        this.removeLayer();
        this.removeEventListener();
        this.isActive = false;
    }


    function Distance(canvas) {
        Measure.call(this, canvas, 'distance');
    }

    map3d.inherits(Distance, Measure);
    Distance.prototype.active = function () {
        Measure.prototype.active.call(this);
        Module.XDSetMouseState(Module.MML_ANALYS_DISTANCE_STRAIGHT);
    }
    Distance.prototype.createLayer = function () {
        let list = map3d.userLayers;
        let layer = list.createLayer("Measure_Distance_POI", Module.ELT_3DPOINT);
        layer.setMaxDistance(20000.0);
        layer.setSelectable(false);
        this.layers.push(layer);
        this.poiLayer = layer;
    }
    Distance.prototype.clickEvent = function (e) {
        // e 구성요소
        // dMidLon, dMidLat, dMidAlt : 이전 입력 된 지점과 현재 지점을 중점(경위 고도)
        // dLon, dLat, dAlt : 현재 입력 된 지점(경위 고도)
        // dDistance		: 현재 점과 이전 점과의 길이
        // dTotalDistance	: 모든 점과의 길이

        let partDistance = e.dDistance,
            totalDistance = e.dTotalDistance;

        if (partDistance == 0 && totalDistance == 0) {
            this.poiCount = 0;	// POI 갯수 초기화
            createPOI.call(this, new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(255, 204, 198, 0.8)", "Start", true);
        } else {
            if (e.dDistance > 0.01) {
                createPOI.call(this, new Module.JSVector3D(e.dMidLon, e.dMidLat, e.dMidAlt), "rgba(255, 255, 0, 0.8)", e.dDistance, false);
            }
            createPOI.call(this, new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(255, 204, 198, 0.8)", e.dTotalDistance, true);
        }
    }
    Distance.prototype.dblClickEvent = function (e) {
        this.poiCount++;
    }
    Distance.prototype.clear = function () {
        Module.XDClearDistanceMeasurement();
        Measure.prototype.clear.call(this);
    }
    Distance.prototype.dispose = function () {
        Measure.prototype.dispose.call(this);
        this.poiLayer = undefined;
    }
    Distance.prototype.format = function (value) {
        // 텍스트 문자열 설정
        if (typeof value == 'number') {
            return setKilloUnit(value, 0.001, 0);
        } else {
            return value;
        }
    }

    function Area(canvas) {
        Measure.call(this, canvas, 'area');
    }

    map3d.inherits(Area, Measure);
    Area.prototype.active = function () {
        Measure.prototype.active.call(this);
        Module.XDSetMouseState(Module.MML_ANALYS_AREA);
    }
    Area.prototype.createLayer = function () {
        let list = map3d.userLayers;
        let layer = list.createLayer("Measure_Area_POI", Module.ELT_3DPOINT);
        layer.setMaxDistance(20000.0);
        layer.setSelectable(false);
        this.layers.push(layer);
        this.poiLayer = layer;
    }
    Area.prototype.clickEvent = function (e) {
        console.log('click', e);
        // e 구성요소
        // dLon, dLat, dAlt : 면적 중심 좌표(경위 고도)
        // dArea			: 면적 크기

        // POI가 존재 하면 삭제 후 생성
        let key = this.poiCount + "_POI";
        this.poiLayer.removeAtKey(key);

        createPOI.call(this, new Module.JSVector3D(e.dLon, e.dLat, e.dAlt), "rgba(255, 204, 198, 0.8)", e.dArea, true);
    }
    Area.prototype.dblClickEvent = function (e) {
        console.log('dblclick', e);
        this.poiCount++;
    }
    Area.prototype.clear = function () {
        Module.XDClearAreaMeasurement();
        Measure.prototype.clear.call(this);
    }
    Area.prototype.dispose = function () {
        Measure.prototype.dispose.call(this);
        this.poiLayer = undefined;
    }
    Area.prototype.format = function (value) {
        // 텍스트 문자열 설정
        return setTextComma(value.toFixed(2)) + '㎡';
    }

    function Radius(canvas) {
        Measure.call(this, canvas, 'radius');
        this.wallLayer = undefined;
        this.addRadius = addRadius.bind(this);
        this.canvas.addEventListener('Fire_EventAddRadius', this.addRadius);
    }

    map3d.inherits(Radius, Measure);
    Radius.prototype.active = function () {
        Measure.prototype.active.call(this);
        Module.XDSetMouseState(Module.MML_ANALYS_AREA_CIRCLE);
    }
    Radius.prototype.createLayer = function () {
        let list = map3d.userLayers;
        this.poiLayer = list.createLayer("Measure_Radius_POI", Module.ELT_3DPOINT);
        this.poiLayer.setMaxDistance(20000.0);
        this.poiLayer.setSelectable(false);
        this.layers.push(this.poiLayer);

        this.wallLayer = list.createLayer("Measure_wall", Module.ELT_POLYHEDRON);
        this.wallLayer.setMaxDistance(20000.0);
        this.wallLayer.setSelectable(false);
        this.wallLayer.setEditable(true);
        this.layers.push(this.wallLayer);
    }
    Radius.prototype.addEventListener = function (e) {
        // this.canvas.addEventListener('Fire_EventAddRadius', this.addRadius);
    }
    Radius.prototype.removeEventListener = function (e) {
        // this.canvas.removeEventListener('Fire_EventAddRadius', this.addRadius);

    }
    Radius.prototype.clear = function () {
        Module.XDClearCircleMeasurement();
        Measure.prototype.clear.call(this);
    }
    Radius.prototype.dispose = function () {
        Measure.prototype.dispose.call(this);
    }
    Radius.prototype.format = function (value) {
        // 텍스트 문자열 설정
        if (typeof value == 'number') {
            return setKilloUnit(value, 0.001, 0);
        } else {
            return value;
        }
    }

    function addRadius(e) {
        if (e.dTotalDistance > 0) {
            this.poiLayer.removeAll();
            // 반경 POI 오브젝트 생성
            createPOI.call(this, new Module.JSVector3D(e.dMidLon, e.dMidLat, e.dMidAlt), "rgba(255, 204, 198, 0.8)", e.dTotalDistance, true);
        }
    }

    /* 정보 표시 POI */
    function createPOI(_position, _color, _value, _balloonType) {
        // 매개 변수
        // _position : POI 생성 위치
        // _color : drawIcon 구성 색상
        // _value : drawIcon 표시 되는 텍스트
        // _balloonType : drawIcon 표시 되는 모서리 옵션(true : 각진 모서리, false : 둥근 모서리)

        // POI 아이콘 이미지를 그릴 Canvas 생성
        var drawCanvas = document.createElement('canvas');
        // 캔버스 사이즈(이미지 사이즈)
        drawCanvas.width = 100;
        drawCanvas.height = 100;

        // 아이콘 이미지 데이터 반환
        let imageData = drawIcon(drawCanvas, _color, this.format(_value), _balloonType);

        // POI 생성 과정
        let poi = Module.createPoint(this.poiCount + "_POI");
        poi.setPosition(_position);												// 위치 설정
        poi.setImage(imageData, drawCanvas.width, drawCanvas.height);			// 아이콘 설정
        this.poiLayer.addObject(poi, 0);												// POI 레이어 등록
    }


    /* 아이콘 이미지 데이터 반환 */
    function drawIcon(_canvas, _color, _value, _balloonType) {

        // 컨텍스트 반환 및 배경 초기화
        var ctx = _canvas.getContext('2d'),
            width = _canvas.width,
            height = _canvas.height
        ;
        ctx.clearRect(0, 0, width, height);

        // 배경 Draw Path 설정 후 텍스트 그리기
        if (_balloonType) {
            drawBalloon(ctx, height * 0.5, width, height, 5, height * 0.25, _color);
            setText(ctx, width * 0.5, height * 0.2, _value);
        } else {
            drawRoundRect(ctx, 0, height * 0.3, width, height * 0.25, 5, _color);
            setText(ctx, width * 0.5, height * 0.5, _value);
        }

        return ctx.getImageData(0, 0, _canvas.width, _canvas.height).data;
    }

    /* 말풍선 배경 그리기 */
    function drawBalloon(ctx,
                         marginBottom, width, height,
                         barWidth, barHeight,
                         color) {

        var wCenter = width * 0.5,
            hCenter = height * 0.5;

        // 말풍선 형태의 Draw Path 설정
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height - barHeight - marginBottom);
        ctx.lineTo(wCenter - barWidth, height - barHeight - marginBottom);
        ctx.lineTo(wCenter, height - marginBottom);
        ctx.lineTo(wCenter + barWidth, height - barHeight - marginBottom);
        ctx.lineTo(width, height - barHeight - marginBottom);
        ctx.lineTo(width, 0);
        ctx.closePath();

        // 말풍선 그리기
        ctx.fillStyle = color;
        ctx.fill();
    }

    /* 둥근 사각형 배경 그리기 */
    function drawRoundRect(ctx,
                           x, y,
                           width, height, radius,
                           color) {

        if (width < 2 * radius) radius = width * 0.5;
        if (height < 2 * radius) radius = height * 0.5;

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();

        // 사각형 그리기
        ctx.fillStyle = color;
        ctx.fill();

        return ctx;
    }

    /* 텍스트 그리기 */
    function setText(_ctx, _posX, _posY, _value) {

        // 텍스트 스타일 설정
        _ctx.font = "bold 16px sans-serif";
        _ctx.textAlign = "center";
        _ctx.fillStyle = "rgb(0, 0, 0)";

        // 텍스트 그리기
        _ctx.fillText(_value, _posX, _posY);
    }

    /* 단위 표현 */
    function setTextComma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    /* m/km 텍스트 변환 */
    function setKilloUnit(_text, _meterToKilloRate, _decimalSize) {
        if (_decimalSize < 0) {
            _decimalSize = 0;
        }
        if (typeof _text == "number") {
            if (_text < 1.0 / (_meterToKilloRate * Math.pow(10, _decimalSize))) {
                _text = _text.toFixed(1).toString() + 'm';
            } else {
                _text = (_text * _meterToKilloRate).toFixed(2).toString() + '㎞';
            }
        }
        return _text;
    }

    let module = {
        init: init
    };

    Object.defineProperties(module, {
        'distance': {
            get: function () {
                return _distance;
            }
        },
        'area': {
            get: function () {
                return _area;
            }
        },
        'radius': {
            get: function () {
                return _radius;
            }
        }
    })

    return module;
})();