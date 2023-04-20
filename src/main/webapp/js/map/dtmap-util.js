window.dtmap = window.dtmap || {};
window.dtmap.util = (function () {


    const altitudes = [3261870, 3261870, 3261870, 3261870, 3261870, 3261870, 3261870, 2258000, 976670, 564200, 267000, 145500, 70100, 35280, 17750, 8950, 4350, 2150, 1100, 600]

    function altToZoom(alt) {
        var closest = altitudes.reduce(function (prev, curr) {
            return (Math.abs(curr - alt) < Math.abs(prev - alt) ? curr : prev);
        });
        let zoom = altitudes.indexOf(closest)
        return zoom === zoom < 6 ? 6 : zoom;
    }

    function zoomToAlt(zoom) {
        return altitudes[Math.round(zoom)];
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

    let module = {
        altToZoom: altToZoom,
        zoomToAlt: zoomToAlt,
        readWKT: readWKT,
        writeWKT: writeWKT,
        readGeoJson: readGeoJson,
        writeGeoJson: writeGeoJson
    }
    return module;
}());