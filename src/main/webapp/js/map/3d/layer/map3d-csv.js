window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.CSV = (function () {


    /**
     * CSV 레이어
     */

    /**
     *
     * @param options
     * @returns {Promise<*>}
     * @constructor
     */
    function CSV(options) {
        map3d.layer.Layer.call(this, options);
        this.serviceType = 'service'
    }

    map3d.inherits(CSV, map3d.layer.Layer);

    /**
     * @override map3d.layer.Layer
     *
     * @param options
     * @returns {XDWorld.JSLayer}
     */
    CSV.prototype.createInstance = async function (options) {
        let resp = await getLayerInfo(this.id);
        let {mapsData} = resp;
        let {serverUrl} = dtmap.urls;
        if (mapsData.poiType === 0) { // 원형
            return loadCSV_colData(this.id, this.layerNm, serverUrl + mapsData.metaOutUrl, mapsData.poiColor, 0, 13);
        } else if (mapsData.poiType === 1) {  // 이미지
            return loadCSV_imgData(this.id, this.layerNm, serverUrl + mapsData.metaOutUrl, mapsData.poiIndex, 0, 13);
        }
    }


    function getLayerInfo(id) {
        return $.ajax({
            type: "POST",
            url: "/lyr/lyi/selectCsvLayerInfo.do",
            data: {
                "dataid": id
            },
            dataType: "json"
        });
    }

    //CSV 데이터(원형) 호출
    function loadCSV_colData(id, layerId, url, rgbaVal, min, max) {
        // CSV 데이터 POI 이미지 로드
        let poiImage = createPoiCircle(rgbaVal);

        // 4번째 파라미터 : POI 선택여부
        Module.XDEMapCreateLayer(layerId, url, 0, true, true, true, 22, min, max);

        // csv 타일 로드 콜백 함수 설정
        var layer = map3d.serviceLayers.nameAtLayer(layerId);

        layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
            var data = decodeURI(_data);
            addPoiToTile(_tile, data, poiImage, layerId);
        });
        return layer;
    }

    // CSV 데이터(이미지) 호출
    function loadCSV_imgData(id, layerId, geoUrl, imgIndex, min, max) {

        // csv 타일 레이어 로드
        // 4번째 파라미터 : POI 선택여부
        Module.XDEMapCreateLayer(layerId, geoUrl, 0, true, true, true, 22, min, max);

        // csv 타일 로드 콜백 함수 설정
        var layer = map3d.serviceLayers.nameAtLayer(layerId);

        // CSV 데이터 POI 이미지 로드
        loadImage("./images/symbol/" + String(imgIndex) + "_s.png", function (img) {
            layer.setUserTileLoadCallback(function (_layerName, _tile, _data) {
                var data = decodeURI(_data);
                addPoiToTile(_tile, data, img, layerId);
            });
        });

        return layer;
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

    return CSV;
})()