window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Point = (function () {
    const DEFAULT_POI_COLOR = '#d04545';

    function Point(options) {
        map3d.layer.Geometry.call(this, options);
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
            type: Module.ELT_POLYHEDRON
        });
    }
    Point.prototype.createPoint = function (options) {
        const id = options.id;
        const coordinates = options.coordinates;
        const style = options.style || {};
        const lon = coordinates[0];
        const lat = coordinates[1];

        const object = Module.createPoint(id);
        // z값 구해서 넣기
        const alt = Module.getMap().getTerrHeightFast(Number(lon), Number(lat));
        object.setPosition(new Module.JSVector3D(lon, lat, alt));
        // 수직 라인 설정
        if (style.offsetHeight) {
            object.setPositionLine(style.offsetHeight + alt, new Module.JSColor(255, 255, 255));
        }
        // 텍스트 설정
        if (style.label) {
            drawLabel(id, style, object);
        }

        if (style.marker) {
            // 이미지 형태
            drawMarker(id, style, object);
        } else if (style.text) {
            //텍스트
            drawText(id, style, object);
        } else if (style.fill || style.stroke) {
            // 원형
            drawVector(id, style, object);
        }
        this.setProperties(object, options.properties);
        return object;
    };

    /**
     *
     * @param otions
     */
    Point.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);
        const id = this.genId(options.id)
        let geometry = options.geometry;

        if (geometry instanceof ol.geom.MultiPoint) {
            //TODO MultiPoint 처리
            //임시로 첫 포인트만 그리도록 처리
            geometry = geometry.getPoint(0);
        }

        const coordinates = geometry.getCoordinates();
        const object = this.createPoint({...options, coordinates});


        // const style = options.style || {};
        // const lon = coordinates[0];
        // const lat = coordinates[1];
        //
        // const object = Module.createPoint(id);
        // // z값 구해서 넣기
        // const alt = Module.getMap().getTerrHeightFast(Number(lon), Number(lat));
        // object.setPosition(new Module.JSVector3D(lon, lat, alt));
        // // Polygon 수직 라인 설정
        // object.setPositionLine(30.0 + alt, new Module.JSColor(255, 255, 255));
        // // 텍스트 설정
        // if (style.label) {
        //     object.setText(String(style.label.text));
        // }
        //
        // if (style.marker) {
        //     // 이미지 형태
        //     drawMarker(id, style, object);
        // } else if (style.text) {
        //     //텍스트
        //     drawText(id, style, object);
        // } else {
        //     // 원형
        //     drawVector(id, style, object);
        // }
        // this.setProperties(object, options.properties);

        //프로퍼티 설정
        this.instance.setMaxDistance(map3d.config.maxDistance);
        this.instance.addObject(object, 0);


        return object;

    }

    function drawMarker(id, style, point) {
        const src = style.marker.src;
        const symbol = Module.getSymbol();
        const icon = symbol.getIcon(id);
        if (icon) {
            point.setIcon(icon);
        } else {

            // 이미지 로드
            const img = new Image();
            const that = this;
            img.onload = function () {
                // 이미지 로드 후 캔버스에 그리기
                const width = img.width * (style.marker.scale || 1);
                const height = img.height * (style.marker.scale || 1);

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

                const imgData = ctx.getImageData(0, 0, width, height).data;


                // Symbol에 새 아이콘 추가
                symbol.insertIcon(id, imgData, width, height);
                const icon = symbol.getIcon(id);
                point.setIcon(icon);
            };
            img.src = style.marker.src;
        }
    }

    function drawVector(id, style, point) {
        //스타일 옵션
        const radius = Number(style.radius || 4);

        const fill = fillStyle(style.fill);
        const stroke = strokeStyle(style.stroke);
        let shapeRender;
        if (style.shape === "Rectangle") {
            shapeRender = new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                radius: radius,
                points: 4,
                angle: Math.PI / 4,
            })
        } else if (style.shape === "Triangle") {
            shapeRender = new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 3,
                radius: radius,
                angle: 0,
            })
        } else if (style.shape === "Star") {
            shapeRender = new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 5,
                radius: radius,
                radius2: 4,
                angle: 0,
            })
        } else if (style.shape === "Cross") {
            shapeRender = new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: radius,
                radius2: 0,
                angle: 0,
            })
        } else if (style.shape === "X") {
            shapeRender = new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: radius,
                radius2: 0,
                angle: Math.PI / 4,
            })
        } else {
            shapeRender = new ol.style.Circle({
                radius: radius,
                fill: fill,
                stroke: stroke
            })
        }
        const canvas = shapeRender.getImage(1);
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        point.setImage(imgData, canvas.width, canvas.height);
    }

    function fillStyle(options) {
        const rgb = ol.color.asArray(options.color);
        return new ol.style.Fill({
            color: ol.color.asString([rgb[0], rgb[1], rgb[2], options.opacity])
        })
    }

    function strokeStyle(options) {
        const rgb = ol.color.asArray(options.color);
        return new ol.style.Stroke({
            color: ol.color.asString([rgb[0], rgb[1], rgb[2], options.opacity]),
            width: options.width,
            lineDash: getLineDash(options.lineDash, options.width)
        })
    }


    function getLineDash(type, width) {
        type = type || 'SOLID';
        width = width || 1;
        let lineDash = []; //solid
        let t = type.toUpperCase();
        if (t === "DOT") {
            lineDash = [width * 2, width * 2];
        } else if (t === "DASHED") {
            lineDash = [width * 6, width * 2];
        } else if (t === "DASH-DOTTED") {
            lineDash = [width * 6, width * 2, width * 2, width * 2];
        } else if (t === "DASH-DOUBLE-DOTTED") {
            lineDash = [
                width * 6,
                width * 2,
                width * 2,
                width * 2,
                width * 2,
                width * 2,
            ];
        } else if (t === 'SOLID') {
            lineDash = undefined;
        } else {
            lineDash = undefined;
            console.warn(`지원되지 않는 선 패턴입니다.`);
        }
        return lineDash;
    }

    function drawText(id, style, object) {
        const fillColor = new map3d.Color(style.text.fill);
        const strokeColor = new map3d.Color(style.text.stroke);

        object.setFontStyle(style.text.fontFamily, style.text.fontSize, style.text.bold ? 800 : 300, fillColor.toJSColor(), strokeColor.toJSColor());
        object.setText(style.text.text);
    }

    function drawLabel(id, style, object) {
        const fillColor = new map3d.Color(style.label.fill);
        const strokeColor = new map3d.Color(style.label.stroke);

        object.setFontStyle(style.label.fontFamily, style.label.fontSize, style.label.bold ? 800 : 300, fillColor.toJSColor(), strokeColor.toJSColor());
        object.setText(style.label.text);
    }

    return Point;
}());