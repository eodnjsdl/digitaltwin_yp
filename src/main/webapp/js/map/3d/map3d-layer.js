window.dtmap = window.dtmap || {};
dtmap.map3d = dtmap.map3d || {};
dtmap.map3d.modules = dtmap.map3d.modules || {}
dtmap.map3d.modules.layer = (function () {

    const LAYER_TYPE = {
        "S": 'shp', //shape
        "I": 'img', // image
        "D": '3ds', // 3ds
        "G": 'graph', // graph
        "L": 'wms', //
        "F": 'fac', // facility
        "C": 'csv', // csv
        "POI": 'poi', // poi
    }
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
    let createFunctions = {};
    let map3d = dtmap.map3d;
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
        createFunctions[LAYER_TYPE[type]](options);
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

        console.log('removeLayer', id, timeOutMap)
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

    /**
     *
     * @param options
     */
    function createWMS(options) {
        let {id, store, table} = options;
        let opt = Object.assign({}, {
            url: dtmap.urls.xdGeoUrl + "/wms?",
            layer: store + ':' + table,
            minimumlevel: options.minimumlevel,
            maximumlevel: options.maximumlevel,
            tileSize: options.tileSize,
            crs: options.crs,
            parameters: options.parameters,
        }, WMS_OPT)

        let layer = serviceList.createWMSLayer(id);
        layer.setWMSProvider(opt);
        layer.setBBoxOrder(true);
        layer['type_'] = 'service';
        layerMap.set(id, layer)
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

    /**
     *
     * @param options
     * @returns {string}
     */
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


        layer['type_'] = 'service';
        layerMap.set(id, layer);

        return 'service';
    }

    function loadIcon(name, url, callback) {
        var icon = Module.getSymbol().getIcon(name);
        if (icon != null) {
            if (callback && typeof callback === 'function') {
                callback(icon);
            }
        } else {
            // 이미지 관리 심볼 반환
            var symbol = Module.getSymbol();
            // 이미지 로드
            loadImage(url, function (img) {
                // 생성된 아이콘 이미지 콜백 반환
                if (symbol.insertIcon(name, img.data, img.width, img.height)) {
                    if (callback && typeof callback === 'function') {
                        callback(symbol.getIcon(name));
                    }
                }
            })

        }
    }


    /**
     * User POI 레이어
     */
    //layerNm, layerId, tblNm
    function createUserPOI(options) {
        let {id, table, layerNm} = options;
        let layer = userList.createLayer(id, Module.ELT_3DPOINT);
        $.ajax({
            type: "POST",
            url: "/lyr/lyi/selectLayerInfoList.do",
            data: {
                "lyrId": id,
                "tblNm": table
            },
            dataType: "json",
            async: false,
            success: function (data, status) {

                let list = data.layerInfoList;

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
                            markerImage: "./images/poi/" + data.poiImg,
                            lineColor: new Module.JSColor(255, 255, 255),
                            type: data.poiType,
                            poiColor: data.poiColor,

                        });
                    }
                }
            }
        });
        layer['type_'] = 'user';
        layerMap.set(id, layer);
    }

    function createLinePoi2(options) {
        // 라인 흰색 고정
        options.lineColor = new Module.JSColor(255, 255, 255);

        // 이미지 형태
        if (options.type !== "C") {
            // POI 이미지 로드
            var img = new Image();
            img.onload = function () {
                // 이미지 로드 후 캔버스에 그리기
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                ctx.width = img.width;
                ctx.height = img.height;
                ctx.drawImage(img, 0, 0);

                // z값 구해서 넣기
                var alt = Module.getMap().getTerrHeightFast(Number(options.lon), Number(options.lat));
                var point;
                var pointNm = "";

                // 이미지 POI 생성 및 Key값 지정
                if (options.layerKey !== undefined && options.layer2Key === undefined) {
                    pointNm = options.layerKey.toString();
                } else if (options.layer2Key !== undefined) {
                    pointNm = options.layerKey.toString() + "_" + options.layer2Key.toString();
                } else {
                    pointNm = "POI_" + options.layer.getObjectCount();
                }

                point = Module.createPoint(pointNm);

                var imageData = ctx.getImageData(0, 0, this.width, this.height).data;

                point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));

                // POI 수직 라인 설정
                if (options.alt !== undefined) {
                    point.setPositionLine(5.0 + alt, options.lineColor);
                } else {
                    point.setPositionLine(30.0 + alt, options.lineColor);
                }

                // 텍스트 설정
                //point.setTextMargin(0, -5);

                // 하이라이트 POI 등록
                if (options.highlight !== undefined) {
                    if (options.highlight) {
                        var bResult = Module.getSymbol().insertIcon(pointNm, imageData, ctx.width, ctx.height);

                        if (bResult) {
                            options.layer.keyAtObject(pointNm.replaceAll("_on", "")).setHighlightIcon(Module.getSymbol().getIcon(pointNm));
                        }
                    }
                } else {
                    var imgUrl = options.markerImage;

                    imgUrl = imgUrl.split(".")[0] + imgUrl.split(".")[1] + "_on." + imgUrl.split(".")[2];

                    options.markerImage = imgUrl;
                    options.highlight = true;
                    options.layerKey = pointNm + "_on";

                    createLinePoi2(options);

                    point.setText(String(options.text));
                    point.setImage(imageData, this.width, this.height);
                }

                point.setHighlight(false);

                options.layer.setMaxDistance(dtmap.map3d.config.maxDistance);
                options.layer.addObject(point, 0);
            };
            img.src = options.markerImage;
        } else { // 원형
            // 이미지 로드 후 캔버스에 그리기
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            ctx.width = 30;
            ctx.height = 30;
            ctx.clearRect(0, 0, ctx.width, ctx.height);

            var x = ctx.width / 2;
            var y = ctx.height / 2;

            if (options.poiColor.indexOf("#") >= 0) {
                var hex = options.poiColor;
                var red = parseInt(hex[1] + hex[2], 16);
                var green = parseInt(hex[3] + hex[4], 16);
                var blue = parseInt(hex[5] + hex[6], 16);

                options.poiColor = "rgba(" + red + "," + green + "," + blue + ", 255)";
            }

            // 동그라미 마커 이미지 그리기
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = options.poiColor;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'white';
            ctx.stroke();

            // z값 구해서 넣기
            var alt = Module.getMap().getTerrHeightFast(Number(options.lon), Number(options.lat));
            var point = '';

            // 이미지 POI 생성 및 Key값 지정
            if (options.layerKey) {
                point = Module.createPoint(options.layerKey.toString());
            } else {
                point = Module.createPoint("POI_" + options.layer.getObjectCount());
            }

            point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));
            point.setImage(ctx.getImageData(0, 0, ctx.width, ctx.height).data, ctx.width, ctx.height);

            // POI 수직 라인 설정
            point.setPositionLine(30.0 + alt, options.lineColor);

            // 텍스트 설정
            point.setText(String(options.text));
            //point.setTextMargin(0, -5);
            options.layer.setMaxDistance(dtmap.map3d.config.maxDistance);
            options.layer.addObject(point, 0);
        }

    }

    /**
     * Service POI 레이어
     */
    function createServicePOI(options) {
        let {id, layerNm} = options;
        //Module.ELT_3DPOINT = 5
        Module.XDEMapCreateLayer(layerNm, dtmap.urls.xdServer, 0, true, true, false, JS_LAYER_TYPE.ELT_3DPOINT, 0, 15);
        //poi icon 표출
        let layer = serviceList.nameAtLayer(layerNm);
        layer.tile_load_ratio = 1000;
        layer['type_'] = 'service';
        layerMap.set(id, layer)
    }


    /**
     * CSV 레이어
     */

    function createCSV(options) {
        let {id, layerNm} = options;
        $.ajax({
            type: "POST",
            url: "/lyr/lyi/selectCsvLayerInfo.do",
            data: {
                "dataid": id
            },
            dataType: "json",
            async: false,
            success: function (returnData, status) {
                var result = returnData.mapsData;
                let {serverUrl} = dtmap.urls;
                if (result.poiType === 0) { // 원형
                    loadCSV_colData(id, layerNm, serverUrl + result.metaOutUrl, result.poiColor, 0, 13);
                } else if (result.poiType === 1) {  // 이미지
                    loadCSV_imgData(id, layerNm, serverUrl + result.metaOutUrl, result.poiIndex, 0, 13);
                }
            }
        });
        return 'service';
    }

    //CSV 데이터(원형) 호출
    function loadCSV_colData(id, layerId, url, rgbaVal, min, max) {
        // CSV 데이터 POI 이미지 로드
        let poiImage = createPoiCircle(rgbaVal);

        // 4번째 파라미터 : POI 선택여부
        Module.XDEMapCreateLayer(layerId, url, 0, true, true, true, 22, min, max);

        // csv 타일 로드 콜백 함수 설정
        var layer = serviceList.nameAtLayer(layerId);

        layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
            var data = decodeURI(_data);
            addPoiToTile(_tile, data, poiImage, layerId);
        });
        layer['type_'] = 'service';
        layerMap.set(id, layer)
    }

    // CSV 데이터(이미지) 호출
    function loadCSV_imgData(id, layerId, geoUrl, imgIndex, min, max) {
        // CSV 데이터 POI 이미지 로드
        loadImage("./images/symbol/" + String(imgIndex) + "_s.png", function (img) {

            // csv 타일 레이어 로드
            // 4번째 파라미터 : POI 선택여부
            Module.XDEMapCreateLayer(layerId, geoUrl, 0, true, true, true, 22, min, max);

            // csv 타일 로드 콜백 함수 설정
            var layer = serviceList.nameAtLayer(layerId);

            layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
                var data = decodeURI(_data);
                addPoiToTile(_tile, data, img, layerId);
            });

            layer['type_'] = 'service';
            layerMap.set(id, layer);
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

    /* poi 이미지 생성 후 타일에 추가 */
    function addPoiToTile(_tile, _csvData, _poiImageData, _layerId) {
        var items = _csvData.split(",");
        var id = "", text = "", lon = "", lat = "", alt;

        for (var i = 0; i < items.length; i++) {
            var item = items[i].split(":");
            var key = item[0];
            var value = item[1];

            switch (key) {
                case "id"    :
                    id = value;
                    break;
                case "lon"    :
                    lon = value;
                    break;
                case "lat"    :
                    lat = value;
                    break;
                case "name" :
                    text = value;
                    break;
            }

            if (id !== "") {
                alt = Module.Map.getTerrHeightFast(Number(lon), Number(lat));
            }

            // POI 생성 후 타일에 추가
            var point = Module.createPoint(id.toString());
            point.setPosition(new Module.JSVector3D(Number(lon), Number(lat), Number(alt)));
            point.setImage(_poiImageData.data, _poiImageData.width, _poiImageData.height);//
            point.setPositionLine(30.0, new Module.JSColor(255, 255, 255));
            point.setText(text);

            _tile.addObject(point);
        }
    }

    function createSHP(options) {
        let {shpType} = options;
        if (shpType === 3 || shpType === 4) {
            return createUserPOI(options);
        } else {
            return createWMS(options);
        }

    }

    function createImg(options) {
        let {id, layerNm, visible} = options;

        Module.XDEMapCreateLayer(layerNm, dtmap.urls.xdServer, 0, false, visible, false, JS_LAYER_TYPE.ELT_KML_GROUND, 1, 15);
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        let layer = serviceList.nameAtLayer(layerNm);
        layer['type_'] = 'service';
        layerMap.set(id, layer)

    }

    function create3DS(options) {
        let {id, layerNm, visible} = options;

        Module.XDEMapCreateLayer(layerNm, dtmap.urls.xdServer, 0, false, visible, false, JS_LAYER_TYPE.ELT_MULTILPE, 0, 13);
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);

        let layer = serviceList.nameAtLayer(layerNm);
        layer['type_'] = 'service';
        layerMap.set(id, layer)
    }

    createFunctions['wms'] = createWMS;
    createFunctions['wfs'] = createWFS;
    createFunctions['poi'] = createServicePOI;
    createFunctions['csv'] = createCSV;
    createFunctions['shp'] = createSHP;
    createFunctions['img'] = createImg;
    createFunctions['3ds'] = create3DS;
    let module = {
        init: init,
        addLayer: addLayer,
        removeLayer: removeLayer,
        setVisible: setVisible,
        getById: getById
    }
    return module;
})();