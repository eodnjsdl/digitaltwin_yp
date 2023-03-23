window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.POI = (function () {
    const DEFAULT_POI_COLOR = '#d04545';

    function POI(options) {
        map3d.layer.Layer.call(this, options)

        let {table} = options;
        this.table = table;
        this.imageMap = new Map();

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
    POI.prototype.add = function (options) {
        return drawPoi.call(this, {
            id: options.id,
            lon: options.coordinate[0],
            lat: options.coordinate[1],
            style: options.style
        });
    }

    POI.prototype.get = function (id) {
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

    POI.prototype.getExtent = function () {
        let extent = [180, 90, -180, -90];
        let list = this.instance.getObjects();
        for (let i = 0; i < list.length; i++) {
            let position = list[i].object.position;

            extent[0] = extent[0] > position.Longitude ? position.Longitude : extent[0];
            extent[1] = extent[1] > position.Latitude ? position.Latitude : extent[1];
            extent[2] = extent[2] < position.Longitude ? position.Longitude : extent[2];
            extent[3] = extent[3] < position.Latitude ? position.Latitude : extent[3];
        }
        return extent;
    }

    POI.prototype.setHighLight = async function (poi) {

        if (!poi) {
            return;
        }
        const id = poi.getId();
        const img = this.imageMap.get(id);
        const imgData = new ImageData(img.data, img.width, img.height);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.width = img.width;
        ctx.height = img.height;
        ctx.putImageData(imgData, 0, 0);
        // set composite mode
        ctx.globalCompositeOperation = "source-in";
        // draw color
        ctx.fillStyle = "rgba(79,245,255,1)";
        ctx.fillRect(0, 0, ctx.width, ctx.height);
        const sourcein = await createImageBitmap(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.putImageData(imgData, 0, 0);
        ctx.globalCompositeOperation = "darken";
        ctx.drawImage(sourcein, 0, 0);

        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        poi.setImage(data, img.width, img.height);


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
                            style: {
                                label: {
                                    text: list[i].text
                                },
                                marker: {
                                    src: "./images/poi/" + data.poiImg,
                                }
                            }
                        });
                    }
                }
            }
        });
    }


    /**
     *
     * @param options.style
     *
     * @return {*|tt}
     */
    function drawPoi(options) {
        let id;
        if (options.id === undefined) {
            id = this.id + "_" + this.instance.getObjectCount();
        } else {
            id = this.id + '_' + options.id;
        }
        const {lon, lat, style} = options;
        let point = Module.createPoint(id);
        // z값 구해서 넣기
        let alt = Module.getMap().getTerrHeightFast(Number(lon), Number(lat));
        point.setPosition(new Module.JSVector3D(lon, lat, alt));
        // POI 수직 라인 설정
        point.setPositionLine(30.0 + alt, new Module.JSColor(255, 255, 255));
        // 텍스트 설정
        if (style.label) {
            point.setText(String(style.label.text));
        }

        // 이미지 형태
        if (style.marker) {
            // POI 이미지 로드
            const img = new Image();
            const that = this;
            img.onload = function () {
                // 이미지 로드 후 캔버스에 그리기
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.width = img.width;
                ctx.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imgData = ctx.getImageData(0, 0, this.width, this.height).data;
                point.setImage(imgData, this.width, this.height);
                that.imageMap.set(id, {
                    data: imgData,
                    width: img.width,
                    height: img.height
                })
            };
            img.src = style.marker.src;
        } else { // 원형
            //스타일 옵션
            const radius = style.radius || 4;
            const fillColor = style.fill?.color || DEFAULT_POI_COLOR
            const strokeColor = style.stroke?.color || 'white';
            const strokeWidth = style.stroke?.width || 2;

            const size = Math.round(radius * 2) + strokeWidth;


            // 이미지 로드 후 캔버스에 그리기
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            ctx.width = size;
            ctx.height = size;

            ctx.clearRect(0, 0, ctx.width, ctx.height);

            const x = ctx.width / 2;
            const y = ctx.height / 2;


            // 동그라미 마커 이미지 그리기
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = hexToRGB(fillColor);
            ctx.fill();
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = strokeColor;
            ctx.stroke();
            const imgData = ctx.getImageData(0, 0, ctx.width, ctx.height).data;

            point.setImage(imgData, ctx.width, ctx.height);
            this.imageMap.set(id, {
                data: imgData,
                width: ctx.width,
                height: ctx.height
            })

        }
        this.instance.setMaxDistance(map3d.config.maxDistance);
        this.instance.addObject(point, 0);
        return point;
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

    function hexToRGB(hex) {
        if (hex.indexOf("#") >= 0) {
            let red = parseInt(hex[1] + hex[2], 16);
            let green = parseInt(hex[3] + hex[4], 16);
            let blue = parseInt(hex[5] + hex[6], 16);

            return "rgba(" + red + "," + green + "," + blue + ", 255)";
        }
        return hex;
    }

    return POI;
}());