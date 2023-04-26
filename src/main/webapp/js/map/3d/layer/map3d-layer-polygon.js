window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Polygon = (function () {
    // var RED = new Module.JSColor(255, 0, 0);
    // var BLUE = new Module.JSColor(0, 0, 255);
    // var YELLOW = new Module.JSColor(255, 255, 0);
    // var WHITE = new Module.JSColor(255, 255, 255);
    // var POLYGON_FILLCOLOR = new Module.JSColor(100, 255, 0, 0);


    function Polygon(options) {
        map3d.layer.Geometry.call(this, options);
        this.depth = 3;
    }

    map3d.inherits(Polygon, map3d.layer.Geometry);

    /**
     * @override map3d.layer.Layer
     * @returns {XDWorld.JSLayer}
     */
    Polygon.prototype.createInstance = function () {
        //라벨레이어 추가
        this.labelLayer = map3d.userLayers.createObjectLayer({
            name: this.id + '_label',
            type: Module.ELT_POLYHEDRON
        });

        return map3d.userLayers.createObjectLayer({
            name: this.id,
            type: Module.ELT_PLANE
        });
    }


    /**
     *
     * @param {object} options
     * @param {string} [options.id] 객체 아이디값
     * @param {ol.geom.Polygon} options.geometry ol 지오메트리
     * @param {object} [options.properties] 속성정보
     * @param {styleOptions} [options.style] 스타일옵션
     */
    Polygon.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);

        const id = this.genId(options.id);
        let geometry = options.geometry;
        const style = options.style;
        const type = style.renderType || '2D'
        let object

        if (geometry instanceof ol.geom.Circle) {
            geometry = circleToPolygon(geometry);
        }

        if (type.toUpperCase() === '3D') {
            // if (true) {
            object = addPolygon3D.call(this, id, geometry, style);
        } else {
            object = addPolygon2D.call(this, id, geometry, style);
        }


        if (!object) {
            return console.warn('map3d.layer.Polygon', 'Polygon 추가 실패');
        }

        //프로퍼티 설정
        this.setProperties(object, options.properties);

    }


    Polygon.prototype.removeById = function (id) {
        map3d.layer.Geometry.prototype.removeById.call(this, id);
        // this.instance.removeAtKey(id+'_LINE');

    }

    function addPolygon3D(id, geometry, style) {
        let vertex = new Module.JSVec3Array();
        let parts = new Module.Collection();
        if (geometry instanceof ol.geom.MultiPolygon) {
            const polygons = geometry.getPolygons();
            for (let i = 0; i < polygons.length; i++) {
                computeVertexPart(polygons[i], vertex, parts);
            }
        } else {
            computeVertexPart(geometry, vertex, parts);
        }

        const object = Module.createColorPolygon(id);
        const fill = new map3d.Color(style.fill);
        const stroke = new map3d.Color(style.stroke);
        // 폴리곤 수직 벽면 형태 정의
        object.SetVerticalPlane(
            vertex,
            parts,
            -map3d.config.vertclPynHeight,
            fill.toJSColor(),
            stroke.toJSColor()
        );
        object.SetCullMode(1);

        this.instance.addObject(object, 0);

        if (style.label) {
            this.createLabel({
                id: id,
                coordinates: dtmap.util.centroid(geometry),
                style: {
                    label: style.label,
                    marker: style.marker,
                    offsetHeight: style.label.offsetHeight
                }
            })
        }


        // const lineObject = Module.createLineString(id + '_LINE');
        // // 라인 설정
        // lineObject.setPartCoordinates(vertex, parts);
        //
        // // 라인 스타일
        // const lineStyle = new Module.JSPolyLineStyle();
        // lineStyle.setWidth(Number(style.stroke.width) + 2);
        // lineStyle.setColor(stroke.toJSColor());
        // lineObject.setStyle(lineStyle);
        // const lineDash = style.stroke?.lineDash || 'SOLID'
        // if (lineDash === "DOT" ||
        //     lineDash === "DASHED" ||
        //     lineDash === "DASH-DOTTED" ||
        //     lineDash === "DASH-DOUBLE-DOTTED") {
        //     lineObject.SetLineType(4);
        //     lineObject.SetDashType(6);
        // }
        // this.instance.addObject(lineObject, 0);

        // this.instance.setMaxDistance(map3d.config.maxDistance);

        return object;
    }

    function addPolygon2D(id, geometry, style) {
        let vertex = [];
        let parts = [];
        if (geometry instanceof ol.geom.MultiPolygon) {
            const polygons = geometry.getPolygons();
            for (let i = 0; i < polygons.length; i++) {
                computeVertexPart(polygons[i], vertex, parts, style.renderType);
            }
        } else {
            computeVertexPart(geometry, vertex, parts, style.renderType);
        }

        const fill = new map3d.Color(style.fill);
        const stroke = new map3d.Color(style.stroke);
        let object = Module.createPolygon(id);
        object.createbyJson({
            coordinates: {
                coordinate: vertex,
                parts: parts,
            },
            style: {
                fill: fill.toJSColor(),
                stroke: stroke.toJSColor(),
            },
        });
        this.instance.addObject(object, 0);

        if (style.label) {
            this.createLabel({
                id: id,
                coordinates: dtmap.util.centroid(geometry),
                style: {
                    label: style.label,
                    marker: style.marker,
                    offsetHeight: style.label.offsetHeight
                }
            })
        }

        return object;

    }


    function computeVertexPart(polygon, vertex, part, renderType) {
        const coordinates = polygon.getCoordinates();
        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            for (let j = 0; j < coord.length; j++) {
                const xy = coord[j];
                let alt = 0
                if (renderType === '3D') {
                    alt = Module.getMap().getTerrHeightFast(xy[0], xy[1]);
                }
                vertex.push(new Module.JSVector3D(xy[0], xy[1], alt + map3d.config.vertclPynHeight))
            }
            if (part.add) {
                part.add(coord.length);
            } else {
                part.push(coord.length-1);
            }
        }
    }

    function circleToPolygon(geometry) {
        let circle = geometry.clone();
        circle.transform(map3d.crs, 'EPSG:3857');
        circle.setRadius(geometry.getRadius());
        const polygon = ol.geom.Polygon.fromCircle(circle);
        polygon.transform('EPSG:3857', map3d.crs);

        return polygon;
    }

    return Polygon;
}());