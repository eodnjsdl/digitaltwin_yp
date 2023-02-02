window.dtmap = window.dtmap || {};
dtmap.map3d = dtmap.map3d || {};
dtmap.map3d.modules = dtmap.map3d.modules || {}
dtmap.map3d.modules.layer = (function () {

    const TYPE = [
        "I", // image
        "D", // 3ds
        "G", // graph
        "L", //
        "F", // facility
        "C", // csv
        "POI", // poi
    ];
    let userList, serviceList;
    let layerIdTypeMap = {};
    let createFunctions = {};
    let map3d = dtmap.map3d;

    function init() {
        userList = new Module.JSLayerList(true);
        serviceList = new Module.JSLayerList(false);
    }

    function addLayer(options) {
        let type = options.type;
        if (!type) {
            return;
        }
        let id = options.id;
        layerIdTypeMap[id] = createFunctions[type](options);
    }

    function removeLayer(options) {

    }

    function show(id) {
        let list = getList(id);
        if (!list) {
            return;
        }
        list.setVisible(id, true);
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);
    }

    function hide(id) {
        let list = getList(id);
        if (!list) {
            return;
        }
        list.setVisible(id, false);
    }

    function getList(id) {
        let type = layerIdTypeMap[id];
        if (!type) {
            return;
        }
        if (type === 'service') {
            return serviceList;
        } else {
            return userList;
        }
    }

    function getById(id) {

    }

    /**
     * WMS 레이어
     */
    const WMS_OPT = {
        minimumlevel: 7,
        maximumlevel: 16,
        tileSize: '756',
        crs: 'EPSG:4326',
        parameters: {
            version: "1.1.1",
        }
    }

    function createWMS(options) {
        let opt = Object.assign({}, {
            url: dtmap.config.urls.xdGeoUrl + "/wms?",
            layer: options.layerNm,
            minimumlevel: options.minimumlevel,
            maximumlevel: options.maximumlevel,
            tileSize: options.tileSize,
            crs: options.crs,
            parameters: options.parameters,
        }, WMS_OPT)

        let layer = serviceList.createWMSLayer(options.id);
        layer.setWMSProvider(opt);
        layer.setBBoxOrder(true);
        return 'service';
    }

    /**
     * WFS 레이어
     */
    const WFS_OPT = {
        proxy: true,
        level: 7,
        pointPositionLine: true,
        featureCount: 1000,
        bboxOrder: true
    }

    function createWFS(options) {
        let id = options.id
        let layerNm = options.layerNm
        let layer = serviceList.createWFSLayer(layerNm, 0);
        let opt = Object.assign({}, {
            proxy: options.proxy,
            level: options.level,
            pointPositionLine: options.pointPositionLine,
            featureCount: options.featureCount,
            bboxOrder: options.bboxOrder,
        }, WFS_OPT);

        layer.setProxyRequest(opt.proxy);
        // 이 곳에 테스트 중인 wms url을 설정하십시오
        layer.setConnectionWFS(dtmap.config.xdGeoUrl + "/wfs?", 0, "");
        layer.setLevelWFS(opt.level);
        layer.setLayersWFS(layerNm);
        // 출력할 속성 명칭
        layer.setWFSPointPositionLine(opt.pointPositionLine);	// POI 의 수직 라인 생성
        layer.setWMSVersion("1.0.0");
        layer.setRequestFeatureCount(opt.featureCount);
        // Default 값은 false
        // - false로 설정한 경우 : 최소위도, 최소경도, 최대위도, 최대경도
        // - true로 설정한 경우 : 최소경도, 최소위도, 최대경도, 최대위도
        layer.setBBoxOrder(opt.bboxOrder);

        // WFS 포인트 로드 시 디폴트로 출력할 POI 이미지 지정
        loadIcon(layerNm + "_poi", options.imgUrl, function (_icon) {
            layer.setWFSPointDefaultIcon(_icon);
        });

        // 레이어 가시범위 지정
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);
        return 'service';
    }

    function loadIcon(_iconName, _url, _callback) {

        var icon = Module.getSymbol().getIcon(_iconName);
        if (icon != null) {
            _callback(icon);
        } else {
            // 이미지 관리 심볼 반환
            var symbol = Module.getSymbol();

            // 이미지 로드
            var img = new Image();
            img.onload = function () {

                // canvas를 통해 이미지 데이터 생성
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                // 생성된 아이콘 이미지 콜백 반환
                if (symbol.insertIcon(_iconName, imageData, canvas.width, canvas.height)) {
                    _callback(symbol.getIcon(_iconName));
                }
            };
            img.src = _url;
        }
    }


    /**
     * POI 레이어
     */
    //layerNm, layerId, tblNm
    function createPOI(options) {
        let id = options.id;
        $.ajax({
            type: "POST",
            url: "/lyr/lyi/selectLayerInfoList.do",
            data: {
                "lyrId": id,
                "tblNm": options.tblNm
            },
            dataType: "json",
            async: false,
            success: function (returnData, status) {
                let layer = userList.createLayer(options.layerNm, Module.ELT_3DPOINT);
                let list = returnData.layerInfoList;

                if (list != null) {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].lon === "Infinity" || list[i].lat === "Infinity") {
                            continue;
                        }

                        createLinePoi2({
                            layer: layer,
                            lon: list[i].lon,
                            lat: list[i].lat,
                            text: list[i].text,
                            markerImage: "./images/poi/" + returnData.poiImg,
                            lineColor: new Module.JSColor(255, 255, 255),
                            type: returnData.poiType,
                            poiColor: returnData.poiColor,

                        });
                    }
                }
            }
        });
        return 'user';
    }


    /**
     * CSV 레이어
     */

    function createCSV(layerNm, layerId) {
        var poiType, poiIndex, poiColor;
        var dataid = layerId;

        $.ajax({
            type: "POST",
            url: "/lyr/lyi/selectCsvLayerInfo.do",
            data: {
                "dataid": layerId
            },
            dataType: "json",
            async: false,
            success: function (returnData, status) {
                var result = returnData.mapsData;

                if (result.poiType === 0) { // 원형
                    loadCSV_colData(layerNm, serverUrl + result.metaOutUrl, result.poiColor, 0, 13);
                } else if (result.poiType === 1) {  // 이미지
                    loadCSV_imgData(layerNm, serverUrl + result.metaOutUrl, result.poiIndex, 0, 13);
                }
            }
        });
        return 'service';
    }

    //CSV 데이터(원형) 호출
    function loadCSV_colData(layerId, geoUrl, rgbaVal, min, max) {
        // CSV 데이터 POI 이미지 로드
        GLOBAL.POI_image = createPoiCircle(rgbaVal);

        // 4번째 파라미터 : POI 선택여부
        Module.XDEMapCreateLayer(layerId, geoUrl, 0, true, true, true, 22, min, max);

        // csv 타일 로드 콜백 함수 설정
        var layer = serviceList.nameAtLayer(layerId);

        layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
            var data = decodeURI(_data);

            insertTileObjects(_tile, data, GLOBAL.POI_image, layerId);
        });
    }

    // CSV 데이터(이미지) 호출
    function loadCSV_imgData(layerId, geoUrl, imgIndex, min, max) {
        // CSV 데이터 POI 이미지 로드
        loadImage(layerId, "./images/symbol/" + String(imgIndex) + "_s.png", function (_image) {

            // csv 타일 레이어 로드
            // 4번째 파라미터 : POI 선택여부
            Module.XDEMapCreateLayer(layerId, geoUrl, 0, true, true, true, 22, min, max);

            // csv 타일 로드 콜백 함수 설정
            var layerList = new Module.JSLayerList(false);
            var layer = layerList.nameAtLayer(layerId);

            layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
                var data = decodeURI(_data);

                insertTileObjects(_tile, data, _image, layerId);
            });
        });
    }

    /* POI 원형 생성 */
    function createPoiCircle(rgbaVal) {

        /* POI로 표시 할 점 이미지 생성 */
        var drawCanvas = document.createElement('canvas');

        var ctx = drawCanvas.getContext('2d');
        ctx.width = 30;
        ctx.height = 30;
        ctx.clearRect(0, 0, ctx.width, ctx.height);

        var x = ctx.width / 2;
        var y = ctx.height / 2;

        // 동그라미 마커 이미지 그리기
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = rgbaVal;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // 그린 마커 이미지 데이터를 레이어 ID를 사용해 저장
        return {
            data: ctx.getImageData(0, 0, ctx.width, ctx.height).data,
            width: ctx.width,
            height: ctx.height
        }
    }

    /* POI 이미지 생성 */
    function loadImage(src, callback) {
        var img = new Image();
        img.onload = function () {

            // 3. canvas를 통해 베이스 이미지 바탕 생성
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            // 이미지 데이터 반환
            if (callback && typeof callback === 'function') {
                callback({
                    data: imageData,
                    width: canvas.width,
                    height: canvas.height
                })
            }

        };

        img.src = src;
    }

    createFunctions['wms'] = createWMS;
    createFunctions['wfs'] = createWFS;
    createFunctions['poi'] = createPOI;
    createFunctions['csv'] = createCSV;
    let module = {
        init: init,
        show: show,
        hide: hide,
        addLayer: addLayer
    }
    return module;
})();