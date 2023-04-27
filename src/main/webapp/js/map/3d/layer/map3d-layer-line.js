window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Line = (function () {

    function Line(options) {
        map3d.layer.Geometry.call(this, options);
        this.depth = 2;
    }

    map3d.inherits(Line, map3d.layer.Geometry);

    /**
     * @override map3d.layer.Layer
     * @returns {XDWorld.JSLayer}
     */
    Line.prototype.createInstance = function () {
        //라벨레이어 추가
        this.labelLayer = map3d.userLayers.createObjectLayer({
            name: this.id + ':Label',
            type: Module.ELT_POLYHEDRON
        });

        return map3d.userLayers.createObjectLayer({
            name: this.id,
            type: Module.ELT_3DLINE
        });
    }

    /**
     *
     * @param {object} options
     * @param {string} [options.id] 객체 아이디값
     * @param {ol.geom.LineString} options.geometry ol 지오메트리
     * @param {object} [options.properties] 속성정보
     * @param {number} [options.scale=2] 스케일값
     * @param {styleOptions} [options.style] 스타일옵션
     */
    Line.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);

        const id = this.genId(options.id);
        let geometry = options.geometry;

        if (geometry instanceof ol.geom.MultiLineString) {
            //TODO MultiLineString 처리
            //임시로 첫 라인만 그리도록 처리
            geometry = geometry.getLineString(0);
        }

        const style = options.style;
        const type = style.renderType || '2D'
        let object;
        if (type.toUpperCase() === 'PIPE') {
            object = addPipe.call(this, id, geometry, style);
        } else {
            object = addLine.call(this, id, geometry, style);
        }
        if (!object) {
            return console.warn('map3d.layer.Line', 'Line 추가 실패');
        }

        //프로퍼티 설정
        this.setProperties(object, options.properties);
    }


    function addPipe(id, geometry, style) {
        const coordinates = computeHeight(geometry.getCoordinates());
        const vec3Array = new Module.Collection();

        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            vec3Array.add(new Module.JSVector3D(coord[0], coord[1], coord[2]))
        }

        const stroke = new map3d.Color(style.stroke);
        const radius = Number(style.stroke.width) || 1;
        // 파이프 옵션
        const startColor = stroke.toJSColor(), // 파이프 시작 색상
            endColor = stroke.toJSColor(), // 파이프 끝 색상
            segment = 10; // 파이프 단면 세그먼트

        // 파이프 생성
        const object = Module.createPipe(id);
        object.create(
            vec3Array,
            startColor,
            endColor,
            segment,
            radius,
            radius / 2.0
        );

        // if (style.stroke.startArrow || style.stroke.endArrow) {
        //     object.SetLineType(3);
        // }
        //
        // if (style.stroke.startArrow && style.stroke.endArrow) {
        //     object.SetLineType(3);
        // }

        // 파이프 오브젝트를 레이어에 추가
        this.instance.addObject(object, 0);

        // 간소화 출력 거리 설정
        // object.setSimplifyRange(object.getExtent() * 2.0);

        if (style.label) {
            this.createLabel({
                id: id,
                coordinates: geometry.getCoordinateAt(0.5),
                style: {
                    label: style.label,
                    marker: style.marker,
                    offsetHeight: style.label.offsetHeight
                }
            })
        }
        return object;
    }

    function addLine(id, geometry, style) {
        const coordinates = computeHeight(geometry.getCoordinates());
        const stroke = new map3d.Color(style.stroke);

        const object = Module.createLineString(id);
        object.createbyJson({
            coordinates: {
                coordinate: coordinates,
                style: "XYZ",
            },
            color: stroke.toJSColor(), // ARGB 설정
            width: Number(style.stroke.width),
            union: true,
        });

        if (style.stroke.lineDash === "DOT" ||
            style.stroke.lineDash === "DASHED" ||
            style.stroke.lineDash === "DASH-DOTTED" ||
            style.stroke.lineDash === "DASH-DOUBLE-DOTTED") {
            object.SetLineType(4);
            object.SetDashType(6);
        }

        if (style.stroke.startArrow || style.stroke.endArrow) {
            object.SetLineType(3);
        }

        if (style.stroke.startArrow && style.stroke.endArrow) {
            object.SetLineType(3);
        }

        if (style.label) {
            this.createLabel({
                id: id,
                coordinates: geometry.getCoordinateAt(0.5),
                style: {
                    label: style.label,
                    marker: style.marker,
                    offsetHeight: style.label.offsetHeight
                }
            })
        }

        this.instance.addObject(object, 0);
        return object;
    }


    function computeHeight(coordinates) {
        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            if (!coord[2]) {
                let alt = Module.getMap().getTerrHeightFast(coord[0], coord[1]);
                coordinates[i][2] = alt;
            }
        }
        return coordinates;
    }


    return Line;
}());