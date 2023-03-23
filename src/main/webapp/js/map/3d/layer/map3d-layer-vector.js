window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Vector = (function () {

    const DEFAULT_POINT = {
        fill: {
            color: '#4854d3'
        },
        stroke: {
            color: 'white',
            width: 2
        },
        radius: 5
    }

    const DEFAULT_LINE = {
        stroke: {
            color: '#4854d3',
            width: 3
        },
        radius: 5
    }

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
        this.source = new ol.source.Vector();

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
    Vector.prototype.addFeatures = function (features, crs, style) {
        for (let i = 0; i < features.length; i++) {
            this.addFeature(features[i], crs, style);
        }
        this.source.addFeatures(features);
    }

    /**
     *
     * @param {ol.Feature} feature OpenLayers Feature
     * @param {string} crs 피쳐의 좌표계
     */
    Vector.prototype.addFeature = function (feature, crs, style) {
        let f = feature.clone();
        let styleOpt = getStyleOption(feature, style);
        f.setId(feature.getId() || ol.util.getUid(feature));
        let geometry = f.getGeometry();
        if (crs !== map3d.crs) {
            geometry.transform(ol.proj.get(crs), ol.proj.get(map3d.crs));
        }
        let object;
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            object = addPoint.call(this, f, styleOpt);
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            object = addLine.call(this, f, styleOpt)
        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon) {
            object = addPolygon.call(this, f, styleOpt);
        }
        this.source.addFeature(feature);
        return object;
    }

    function getStyleOption(feature, style) {

        let styleOpt;
        if (style && typeof style === 'function') {
            styleOpt = style(feature);
        } else {
            styleOpt = style || {};
        }
        if (styleOpt.label) {
            if (styleOpt.label.column) {
                styleOpt.label.text = feature.get(styleOpt.label.column);
            }
        }
        const geometry = feature.getGeometry();
        if (geometry instanceof ol.geom.Point || geometry instanceof ol.geom.MultiPoint) {
            if (!styleOpt.marker) {
                styleOpt = {...DEFAULT_POINT, ...styleOpt};
            }
        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.MultiLineString) {
            styleOpt = {...DEFAULT_LINE, ...styleOpt};

        } else if (geometry instanceof ol.geom.Polygon || geometry instanceof ol.geom.MultiPolygon) {


        }
        return styleOpt;

    }

    Vector.prototype.readGeoJson = function (json, style) {
        let crs
        try {
            crs = json.crs.properties.name;
            if (crs.includes('urn:ogc:def:crs:EPSG::')) {
                crs = crs.replace('urn:ogc:def:crs:EPSG::', 'EPSG:');
            }
        } catch (e) {
            console.warn('GeoJSON에 좌표계 정보가 없습니다. EPSG:5179로 적용합니다.')
            crs = 'EPSG:5179';
        }
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(json, {
            dataProjection: crs,
            featureProjection: map3d.crs
        });
        this.addFeatures(features, map3d.crs, style);
    }

    Vector.prototype.clear = function () {
        if (this.pointLayer) {
            this.pointLayer.instance.removeAll();
        }
        if (this.lineLayer) {
            this.lineLayer.removeAll();
        }
        if (this.polygonLayer) {
            this.polygonLayer.removeAll();
        }

        if (this.source) {
            this.source.clear();
        }
    }

    Vector.prototype.removeFeature = function (id) {
        if (this.pointLayer) {
            this.pointLayer.instance.removeAtKey(id);
        }
        if (this.lineLayer) {
            this.lineLayer.removeAtKey(id);
        }
        if (this.polygonLayer) {
            this.polygonLayer.removeAtKey(id);
        }
    }

    Vector.prototype.getExtent = function () {
        return this.source.getExtent();
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

    function addPoint(feature, styleOpt) {
        createPointLayer.call(this);
        const coordinate = feature.getGeometry().getCoordinates();
        map3d.setCenter(coordinate, 800);

        return this.pointLayer.addPoi({
            coordinate: coordinate,
            style: styleOpt,
        })
    }

    function addLine(feature, styleOpt) {
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

    function addPolygon(feature, styleOpt) {
        createPolygonLayer.call(this)
        //TODO 폴리곤
        return undefined;
    }


    return Vector;
})()