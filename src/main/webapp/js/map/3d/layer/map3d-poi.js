window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.POI = (function () {

    function POI(options) {
        map3d.layer.Layer.call(this, options)

        let {table} = options;
        this.table = table;

    }

    map3d.inherits(POI, map3d.layer.Layer);

    /**
     * @override map3d.layer.Layer
     *
     * @param options
     * @returns {XDWorld.JSLayer}
     */
    POI.prototype.createInstance = function (options) {
        if (this.table && !this.layerNm) {
            return createObjectPOI.call(this, options);
        } else {
            return createTilePOI.call(this, options);
        }
    }

    /**
     * User POI 레이어
     */
    //layerNm, layerId, tblNm
    function createObjectPOI(options) {
        let {id, table} = options;
        let layer = map3d.userLayers.createObjectLayer({name: id, type: Module.ELT_3DPOINT});
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

                        drawPoi({
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
        this.serviceType = 'user';
        return layer;
    }


    function drawPoi(options) {
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

                    drawPoi(options);

                    point.setText(String(options.text));
                    point.setImage(imageData, this.width, this.height);
                }

                point.setHighlight(false);

                options.layer.setMaxDistance(map3d.config.maxDistance);
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
            options.layer.setMaxDistance(map3d.config.maxDistance);
            options.layer.addObject(point, 0);
        }

    }

    /**
     * Service POI 레이어
     */
    function createTilePOI(options) {
        let {layerNm} = options;
        //Module.ELT_3DPOINT = 5
        map3d.serviceLayers.createXDServerLayer({
            name: layerNm,
            url: dtmap.urls.xdServer,
            type: Module.ELT_3DPOINT
        });
        //poi icon 표출
        let layer = map3d.serviceLayers.nameAtLayer(layerNm);
        layer.tile_load_ratio = 1000;
        this.serviceType = 'service';
        return layer;
    }

    return POI;
})()