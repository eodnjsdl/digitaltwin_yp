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
        return map3d.userLayers.createObjectLayer({
            name: this.id,
            type: Module.ELT_POLYHEDRON
        });
    }


    Polygon.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);
        //TODO Polygon 객체 생성 구현 필요
        console.warn(this, 'Polygon 객체 생성 미구현');

        const id = this.genId(options.id);
        let {coordinates, properties} = options;
        properties = properties || {};

        var polygonVertex = new Module.JSVec3Array();
        coordinates = coordinates[0];
        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            for (let j = 0; j < coord.length; j++) {
                const xy = coord[j];
                if (i === 0) {
                    map3d.setCenter(xy, 800);
                }

                let alt = Module.getMap().getTerrHeightFast(xy[0], xy[1]);
                polygonVertex.push(new Module.JSVector3D(xy[0], xy[1], 100))
            }
        }

        let object = Module.createPolygon(id);

        // 폴리곤 색상 설정
        var polygonStyle = new Module.JSPolygonStyle();
        polygonStyle.setFill(true);
        polygonStyle.setFillColor(new Module.JSColor(100, 255, 0, 0));
        polygonStyle.setOutLine(true);
        polygonStyle.setOutLineWidth(2.0);
        polygonStyle.setOutLineColor(new Module.JSColor(255, 0, 0));
        object.setStyle(polygonStyle);

        var part = new Module.Collection();
        part.add(coordinates.length - 1);

        object.setPartCoordinates(polygonVertex, part);

        //프로퍼티 설정
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                if (key === 'geometry') {
                    return;
                }
                const value = properties[key];
                if (value) {
                    object.setProperty(key, value);
                }
            })
        }

        this.instance.addObject(object, 0);
        this.instance.setMaxDistance(map3d.config.maxDistance);

    }


    function createVerticalPlane(_coordinates){

        // 레이어 생성
        var layerList = new Module.JSLayerList(true);

        if(!layerList.nameAtLayer("LINE_LAYER") && !layerList.nameAtLayer("COLOR_POLYGON_LAYER")) {
            var lineLayer = layerList.createLayer("LINE_LAYER", Module.ELT_SKY_LINE);
            var colorPolygonlayer = layerList.createLayer("COLOR_POLYGON_LAYER", Module.ELT_POLYHEDRON);
        } else {
            var lineLayer = layerList.nameAtLayer("LINE_LAYER");
            var colorPolygonlayer = layerList.nameAtLayer("COLOR_POLYGON_LAYER");
        }

        lineLayer.setMaxDistance(GLOBAL.MaxDistance);
        colorPolygonlayer.setMaxDistance(GLOBAL.MaxDistance);

        // 레이어 객체 초기화
        colorPolygonlayer.removeAll();
        lineLayer.removeAll();

        // 폴리곤 생성
        var colorPolygon = Module.createColorPolygon("TEST_VERTICAL_POLYGON");
        var baseLine = Module.createLineString("TEST_BASE_LINE");

        // 좌표 리스트 생성
        var coordinates = new Module.JSVec3Array();
        var parts = new Module.Collection();

        for (var i=0; i<_coordinates.length; i++) {
            var alt = Module.getMap().getTerrHeightFast(_coordinates[i][0], _coordinates[i][1]);
            coordinates.push( new Module.JSVector3D(_coordinates[i][0], _coordinates[i][1], alt + userSetup.vertclPynHeight));
        }
        parts.add(_coordinates.length);

        // 라인 설정
        baseLine.setPartCoordinates(coordinates, parts);

        // 폴리곤 수직 벽면 형태 정의
        colorPolygon.SetVerticalPlane(coordinates, parts, -userSetup.vertclPynHeight, new Module.JSColor(150, userSetup.vertclPynColorR, userSetup.vertclPynColorG, userSetup.vertclPynColorB),
            new Module.JSColor(255, userSetup.vertclPynColorR, userSetup.vertclPynColorG, userSetup.vertclPynColorB));
        colorPolygon.SetCullMode(1);

        // 라인 스타일
        var lineStyle = new Module.JSPolyLineStyle();
        lineStyle.setWidth(userSetup.vertclPynThick);
        lineStyle.setColor(new Module.JSColor(userSetup.vertclPynColorR, userSetup.vertclPynColorG, userSetup.vertclPynColorB));
        baseLine.setStyle(lineStyle);

        // 객체 추가
        colorPolygonlayer.addObject(colorPolygon, 0);
        lineLayer.addObject(baseLine, 0);
    }

    return Polygon;
}());