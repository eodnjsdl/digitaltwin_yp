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
        if (this.layerNm) {
            return createTilePOI.call(this, options);
        } else {
            return createObjectPOI.call(this, options);
        }
    }

    /**
     *
     * @param otions
     */
    POI.prototype.addPoi = function (options) {
        drawPoi.call(this, {
            id: options.id,
            lon: options.coordinate[0],
            lat: options.coordinate[1],
            text: options.text,
            img: options.img,
            lineColor: new Module.JSColor(255, 255, 255),
            // type: data.poiType,
            poiColor: options.poiColor,

        });
    }

    POI.prototype.getPoi = function (id) {
        let list = this.instance.getObjects();
        let poi;
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === id || list[i].key === this.id + '_' + id) {
                poi = list[i].object
                break;
            }
        }
        return poi;

    }

    /**
     * User POI 레이어
     */
    //layerNm, layerId, tblNm
    function createObjectPOI(options) {
        let {id, table} = options;
        let layer = map3d.userLayers.createObjectLayer({name: id, type: Module.ELT_3DPOINT});
        if (table) {
            getObjectList.call(this, id, table);
        }
        this.serviceType = 'user';
        return layer;
    }

    function getObjectList(id, table) {
        let that = this;
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

                        drawPoi.call(that, {
                            lon: list[i].lon,
                            lat: list[i].lat,
                            text: list[i].text,
                            img: "./images/poi/" + data.poiImg,
                            lineColor: new Module.JSColor(255, 255, 255),
                            type: data.poiType,
                            poiColor: data.poiColor,

                        });
                    }
                }
            }
        });
    }


    function drawPoi(options) {
        let id;
        if (options.id === undefined) {
            id = this.id + "_" + this.instance.getObjectCount();
        } else {
            id = this.id + '_' + options.id;
        }

        let point = Module.createPoint(id);
        // z값 구해서 넣기
        let alt = Module.getMap().getTerrHeightFast(Number(options.lon), Number(options.lat));
        point.setPosition(new Module.JSVector3D(options.lon, options.lat, alt));
        // POI 수직 라인 설정
        point.setPositionLine(30.0 + alt, options.lineColor);
        // 텍스트 설정
        point.setText(String(options.text));

        // 이미지 형태
        if (options.img) {
            // POI 이미지 로드
            var img = new Image();
            img.onload = function () {
                // 이미지 로드 후 캔버스에 그리기
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                ctx.width = img.width;
                ctx.height = img.height;
                ctx.drawImage(img, 0, 0);

                let imageData = ctx.getImageData(0, 0, this.width, this.height).data;
                point.setImage(imageData, this.width, this.height);
            };
            img.src = options.img;
        } else { // 원형
            // 이미지 로드 후 캔버스에 그리기
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            ctx.width = 30;
            ctx.height = 30;
            ctx.clearRect(0, 0, ctx.width, ctx.height);

            let x = ctx.width / 2;
            let y = ctx.height / 2;

            if (options.poiColor.indexOf("#") >= 0) {
                let hex = options.poiColor;
                let red = parseInt(hex[1] + hex[2], 16);
                let green = parseInt(hex[3] + hex[4], 16);
                let blue = parseInt(hex[5] + hex[6], 16);

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

            point.setImage(ctx.getImageData(0, 0, ctx.width, ctx.height).data, ctx.width, ctx.height);

        }
        this.instance.setMaxDistance(map3d.config.maxDistance);
        this.instance.addObject(point, 0);
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