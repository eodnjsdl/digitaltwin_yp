window.dtmap = window.dtmap || {};
window.dtmap.util = (function () {
    const jstsParser = new jsts.io.OL3Parser();

    const altitudes = [3261870, 3261870, 3261870, 3261870, 3261870, 3261870, 3261870, 2258000, 976670, 564200, 267000, 145500, 70100, 35280, 17750, 8950, 4350, 2150, 1100, 600]

    function altToZoom(alt) {
        var closest = altitudes.reduce(function (prev, curr) {
            return (Math.abs(curr - alt) < Math.abs(prev - alt) ? curr : prev);
        });
        let zoom = altitudes.indexOf(closest)
        return zoom === zoom < 6 ? 6 : zoom;
    }

    function zoomToAlt(zoom) {
        let z = Math.round(zoom)
        if (z < 0) {
            z = 0;
        } else if (z > 19) {
            z = 19;
        }
        return altitudes[19];
    }

    function readWKT(wkt, properties) {
        if (!wkt) {
            return;
        }

        const format = new ol.format.WKT();
        const geometry = format.readGeometry(wkt);
        const feature = new ol.Feature();
        feature.setGeometry(geometry);
        if (properties && typeof properties === 'object') {
            if (properties.geometry) {
                delete properties.geometry
            }
            feature.setProperties(properties, true)
        }
        return feature;
    }


    function writeWKT(features) {
        if (!features || features.length === 0) {
            return;
        }
        const format = new ol.format.WKT();
        let targets = removePrivateProperty(features);

        targets = features.map((feature) => {
            const cloned = feature.clone();
            const geom = cloned.getGeometry();
            if (geom instanceof ol.geom.Circle) {
                cloned.setGeometry(ol.geom.Polygon.fromCircle(geom));
            }
            return cloned;
        })

        if (!features || features.length === 0) {
            return;
        }

        return format.writeFeatures(targets);
    }

    function readGeoJson(json) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }

        const format = new ol.format.GeoJSON();
        let crs
        try {
            crs = json.crs.properties.name;
            if (crs.includes('urn:ogc:def:crs:EPSG::')) {
                crs = crs.replace('urn:ogc:def:crs:EPSG::', 'EPSG:');
            }
        } catch (e) {
            console.warn(`GeoJSON에 좌표계 정보가 없습니다. ${dtmap.crs}로 적용합니다.`)
            crs = dtmap.crs;
        }
        const features = format.readFeatures(json, {
            dataProjection: crs,
            featureProjection: dtmap.crs
        }).map((feature) => {
            if (feature.get("type") === "Circle") {
                const geometry = feature.getGeometry();
                feature.setGeometry(
                    new ol.geom.Circle(
                        geometry.getCoordinates(),
                        feature.get("circleRadius")
                    )
                );
            }
            return feature;
        });
        return features;
    }

    function writeGeoJson(features) {
        if (!features || features.length === 0) {
            return;
        }
        const format = new ol.format.GeoJSON();
        let targets = removePrivateProperty(features);
        targets = targets.map((feature) => {
            const cloned = feature.clone();
            const geom = cloned.getGeometry();
            if (geom instanceof ol.geom.Circle) {
                cloned.setGeometry(new ol.geom.Point(geom.getCenter()));
                cloned.set('circleRadius', geom.getRadius());
                cloned.set('type', 'Circle')
            }
            return cloned;
        });
        return format.writeFeatures(targets);
    }

    function removePrivateProperty(feature) {
        if (!feature) {
            return;
        }

        if (feature instanceof Array) {
            const ary = [];
            for (let i = 0; i < feature.length; i++) {
                const f = removePrivateProperty(feature[i]);
                if (f) {
                    ary.push(f);
                }
            }
            return ary;
        } else {
            const cloned = feature.clone();
            cloned.unset('_style', true);
            cloned.unset('_selected', true);
            return cloned;
        }
    }


    function createFeature(geometry, options) {
        const feature = new ol.Feature({
            geometry: geometry
        });
        if (options.id) {
            feature.setId(options.id)
        }
        if (options.style) {
            feature.set('style', options.style);
        }
        if (options.properties) {
            feature.setProperties(options.properties);
        }
        return feature;
    }

    function createGeometry(type, options) {
        let geometry;
        if (type === 'Point') {
            geometry = new ol.geom.Point(options.coordinates);
        } else if (type === 'LineString') {
            geometry = new ol.geom.LineString(options.coordinates);
        } else if (type === 'Polygon') {
            geometry = new ol.geom.Polygon(options.coordinates);
        } else {
            throw new Error(`${options.type}은 지원하지 않는 형태입니다.`);
        }

        if (options.crs) {
            if (options.crs !== dtmap.crs) {
                geometry.transform(options.coordinate, options.crs, dtmap.crs);
            }
        }

        return geometry
    }

    function getBufferGeometry(geom, buffer) {
        let result;
        try {
            if (buffer <= 0 || isNaN(buffer)) {
                return geom;
            }

            if (geom instanceof ol.geom.Circle) {
                geom = ol.geom.Polygon.fromCircle(geom);
            }
            const flatCoords = geom.getFlatCoordinates();
            let isLonLat = false;//4326일 경우
            if ((flatCoords[0] < 180 && flatCoords[0] > -180) && (flatCoords[1] < 90 && flatCoords[1] > -90)) {
                isLonLat = true;
                geom.transform('EPSG:4326', 'EPSG:3857');
            }

            const jstsGeom = jstsParser.read(geom);
            const buffered = jstsGeom.buffer(buffer);
            result = jstsParser.write(buffered);

            if (isLonLat) {
                result.transform('EPSG:3857', 'EPSG:4326');
            }
        } catch (e) {
            //LineString 점 1개일 경우 에러 undefined 리턴
            result = undefined;
        }
        return result;
    }

    function centroid(geom) {
        const jstsGeom = jstsParser.read(geom);
        const result = jstsGeom.getCentroid();
        const coordinates = result.getCoordinates();
        return [coordinates[0].x, coordinates[0].y];

    }

    let module = {
        altToZoom: altToZoom,
        zoomToAlt: zoomToAlt,
        readWKT: readWKT,
        writeWKT: writeWKT,
        readGeoJson: readGeoJson,
        writeGeoJson: writeGeoJson,
        createGeometry: createGeometry,
        createFeature: createFeature,
        getBufferGeometry: getBufferGeometry,
        centroid: centroid
    }
    return module;
}());