window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Vector = (function () {

    /**
     * OpenLayers Feature 또는 GeoJSON을
     * 3D로 가시화하는 레이어
     *
     * @param options
     * @returns {string}
     */
    function Vector(options) {
        map3d.layer.Group.call(this, options);
        this.pointLayer = undefined;
        this.lineLayer = undefined;
        this.polygonLayer = undefined;

        if (options.features) {
            this.addFeatures(features);
        }

        if (options.geoJson) {
            this.readGeoJson(options.geoJson)
        }
    }

    map3d.inherits(Vector, map3d.layer.Group);


    /**
     *
     * @param {ol.Feature[]} features OpenLayers Feature 배열
     * @param {string} crs 피쳐의 좌표계
     */
    Vector.prototype.addFeatures = function (features, crs) {
        for (let i = 0; i < features.length; i++) {
            this.addFeature(features[i], crs);
        }
    }

    /**
     *
     * @param {ol.Feature} feature OpenLayers Feature
     * @param {string} crs 피쳐의 좌표계
     */
    Vector.prototype.addFeature = function (feature, crs) {
        let f = feature.clone();
        f.setId(feature.getId() || ol.util.getUid(feature));
        let geometry = f.getGeometry();
        if (crs !== map3d.crs) {
            geometry.transform(ol.proj.get(crs), ol.proj.get(map3d.crs));
        }
        let object;
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            object = addPoint.call(this, f);
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            object = addLine.call(this, f)
        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon) {
            object = addPolygon.call(this, f);
        }
        return object;
    }

    Vector.prototype.readGeoJson = function (json) {
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(json);
        this.addFeatures(features, 'EPSG:5179');
    }

    Vector.prototype.clear = function () {
        if (this.pointLayer) {
            this.pointLayer.removeAll();
        }
        if (this.lineLayer) {
            this.lineLayer.removeAll();
        }
        if (this.polygonLayer) {
            this.polygonLayer.removeAll();
        }
    }

    Vector.prototype.removeFeature = function (id) {
        if (this.pointLayer) {
            this.pointLayer.instace.removeAtKey(id);
        }
        if (this.lineLayer) {
            this.lineLayer.removeAtKey(id);
        }
        if (this.polygonLayer) {
            this.polygonLayer.removeAtKey(id);
        }
    }

    function createPointLayer() {
        if (!this.pointLayer) {
            this.pointLayer = new map3d.layer.POI({id: this.id + '_PointLayer'});
            this.layers.push(this.pointLayer);
        }
    }

    function createLineLayer() {
        if (!this.lineLayer) {
            this.lineLayer = map3d.userLayers.createLayer(this.id + '_LineLayer', 0)
            this.layers.push(this.lineLayer);
        }
    }

    function createPolygonLayer() {
        if (!this.polygonLayer) {
            this.polygonLayer = map3d.userLayers.createLayer(this.id + '_Polygon', 0)
            this.layer.push(this.polygonLayer)
        }
    }

    function addPoint(feature) {
        createPointLayer.call(this);
        const coordinates = feature.getGeometry().getCoordinates();
        map3d.setCenter(coordinates, 800);

        return this.pointLayer.addPoi({
            coordinates: coordinates,
            img: feature.get('img')
        })
    }

    function addLine(feature) {
        createLineLayer.call(this);
        const coordinates = feature.getGeometry().getCoordinates()[0];
        const vec3Array = new Module.Collection();
        for (let i = 0; i < coordinates.length; i++) {
            let coord = coordinates[i];

            if (i === 0) {
                map3d.setCenter(coord, 800);
            }

            let alt = Module.getMap().getTerrHeightFast(coord[0], coord[1]);
            vec3Array.add(new Module.JSVector3D(coord[0], coord[1], alt))
        }

        // 파이프 옵션
        const startColor = new Module.JSColor(200, 0, 0, 255), // 파이프 시작 색상
            endColor = new Module.JSColor(200, 0, 0, 255), // 파이프 끝 색상
            segment = 10, // 파이프 단면 세그먼트
            radius = 5; // 파이프 단면 반지름

        // 파이프 생성
        const object = Module.createPipe(feature.getId());
        object.create(
            vec3Array,
            startColor,
            endColor,
            segment,
            radius,
            radius / 2.0
        );

        //프로퍼티 설정
        const properties = feature.getProperties();
        Object.keys(properties).forEach(function (key) {
            if (key === 'geometry') {
                return;
            }
            const value = properties[key];
            if (value) {
                object.setProperty(key, value);
            }
        })

        // 파이프 오브젝트를 레이어에 추가
        this.lineLayer.addObject(object, 0);

        // 간소화 출력 거리 설정
        object.setSimplifyRange(object.getExtent() * 2.0);
        return object;
    }

    function addPolygon(feature) {
        createPolygonLayer.call(this)
        //TODO 폴리곤
        return undefined;
    }


    return Vector;
})()