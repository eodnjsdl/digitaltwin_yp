window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Point = (function () {
    const DEFAULT_POI_COLOR = '#d04545';

    function Point(options) {
        map3d.layer.Geometry.call(this, options)
        this.imageMap = new Map();
        this.depth = 1;
    }

    map3d.inherits(Point, map3d.layer.Geometry);

    /**
     * @override map3d.layer.Layer
     * @returns {XDWorld.JSLayer}
     */
    Point.prototype.createInstance = function () {
        return map3d.userLayers.createObjectLayer({
            name: this.id,
            type: Module.ELT_3DPOINT
        });
    }

    /**
     *
     * @param otions
     */
    Point.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);
        const id = this.genId(options.id);

        const {coordinates, style} = options;
        const lon = coordinates[0];
        const lat = coordinates[1];

        const point = Module.createPoint(id);
        // z값 구해서 넣기
        const alt = Module.getMap().getTerrHeightFast(Number(lon), Number(lat));
        point.setPosition(new Module.JSVector3D(lon, lat, alt));
        // Polygon 수직 라인 설정
        point.setPositionLine(30.0 + alt, new Module.JSColor(255, 255, 255));
        // 텍스트 설정
        if (style.label) {
            point.setText(String(style.label.text));
        }

        if (style.marker) {
            // 이미지 형태
            drawMarker(id, style, point, this.imageMap);
        } else {
            // 원형
            drawVector(id, style, point, this.imageMap);

        }
        this.instance.setMaxDistance(map3d.config.maxDistance);
        this.instance.addObject(point, 0);
        return point;

    }

    Point.prototype.setHighLight = async function (id) {

        const obj = this.get(id);
        const img = this.imageMap.get(id);
        if (!obj || !img) {
            return;
        }
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
        obj.setImage(data, img.width, img.height);


    }

    function drawMarker(id, style, point, imageMap) {
        // 이미지 로드
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
            imageMap.set(id, {
                data: imgData,
                width: img.width,
                height: img.height
            })
        };
        img.src = style.marker.src;
    }

    function drawVector(id, style, point, imageMap) {
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
        imageMap.set(id, {
            data: imgData,
            width: ctx.width,
            height: ctx.height
        })
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

    return Point;
}());