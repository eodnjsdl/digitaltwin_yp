window.map2d = window.map2d || {}
map2d.measure = (function () {
    const TYPE = {
        'distance': 'LineString',
        'area': 'Polygon',
        'radius': 'Circle'
    }

    const LINE_STROKE = 'rgba(255,0,142,0.9)';
    const LINE_STROKE_DRAW = 'rgba(255,0,142,0.4)';
    const POLYGON_STROKE = 'rgba(0,88,255,0.9)';
    const POLYGON_STROKE_DRAW = 'rgba(0,88,255,0.4)';
    const POLYGON_FILL = 'rgba(0,88,255,0.1)';
    const CIRCLE_STROKE = 'rgba(98,0,255,0.9)';
    const CIRCLE_FILL = 'rgba(98,0,255,0.1)';

    let interaction;
    let _layer;
    let _source;
    let _mousePosition;

    function init() {
        createLayer();
    }


    /**
     * 스타일 목록 가져오기
     * @param {ol.Feature} feature 공간 객체
     * @returns 스타일 목록
     */
    function styleFunction(feature) {
        const isMeasure = feature.get("measure");
        if (!isMeasure) {
            return [];
        }

        const type = feature.get("type");
        if (type === "LineString") {
            return lineStyle(feature);
        } else if (type === "Polygon") {
            return polygonStyle(feature);
        } else if (type === "Circle") {
            return circleStyle(feature);
        }
    }

    function lineStyle(feature) {
        const isDrawing = feature.get('drawing');
        const style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: LINE_STROKE,
                width: 4,
            })
        })
        const nodeStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'white',
                }),
                stroke: new ol.style.Stroke({
                    color: LINE_STROKE,
                    width: 4,
                })
            }),
            geometry: function (feature) {
                // return the coordinates of the first ring of the polygon
                let coordinates = feature.getGeometry().getCoordinates();
                if (isDrawing) {
                    coordinates = coordinates.slice(0, coordinates.length - 1);
                }
                return new ol.geom.MultiPoint(coordinates);
            },
        })
        if (isDrawing) {
            return [
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: LINE_STROKE,
                        width: 4,
                    }),
                    geometry: function (feature) {
                        // return the coordinates of the first ring of the polygon
                        let coordinates = feature.getGeometry().getCoordinates();
                        if (coordinates.length > 2) {
                            coordinates = coordinates.slice(0, coordinates.length - 1);
                            return new ol.geom.LineString(coordinates);
                        }
                    },
                }),
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: LINE_STROKE_DRAW,
                        width: 4,
                    }),
                    geometry: function (feature) {
                        // return the coordinates of the first ring of the polygon
                        let coordinates = feature.getGeometry().getCoordinates();
                        if (coordinates.length > 2) {
                            coordinates = coordinates.slice(coordinates.length - 2, coordinates.length);
                        }
                        return new ol.geom.LineString(coordinates);
                    },
                }),
                nodeStyle
            ]
        } else {
            return [style, nodeStyle];
        }

    }

    function polygonStyle(feature) {
        const isDrawing = feature.get('drawing')
        return [
            new ol.style.Style({
                fill: new ol.style.Fill({
                    color: POLYGON_FILL
                }),
                stroke: new ol.style.Stroke({
                    color: (isDrawing ? POLYGON_STROKE_DRAW : POLYGON_STROKE),
                    width: 4,
                })
            }),
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: 'white',
                    }),
                    stroke: new ol.style.Stroke({
                        color: POLYGON_STROKE,
                        width: 4,
                    })
                }),
                geometry: function (feature) {
                    // return the coordinates of the first ring of the polygon
                    let coordinates = feature.getGeometry().getCoordinates()[0];
                    if (isDrawing) {
                        coordinates = coordinates.slice(0, coordinates.length - 1);
                    }
                    return new ol.geom.MultiPoint(coordinates);
                },
            }),
        ]
    }

    function circleStyle(feature) {
        const styles = [];
        const geometry = feature.getGeometry();
        const isDrawing = feature.get('drawing');
        const style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: CIRCLE_FILL,
            }),
            stroke: new ol.style.Stroke({
                color: CIRCLE_STROKE,
                width: 4,
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'white',
                }),
                stroke: new ol.style.Stroke({
                    color: CIRCLE_STROKE,
                    width: 4,
                }),
            }),
        });
        //default style
        styles.push(style)

        const first = geometry.getFirstCoordinate();
        let last;
        if (isDrawing) {
            last = geometry.getClosestPoint(_mousePosition.coordinate);
            feature.set('lastPoint', last);
        } else {
            last = feature.get('lastPoint');
        }
        const lineString = new ol.geom.LineString([first, last]);

        //const length = ol.sphere.getLength(lineString);
        const length = lineString.getLength();
        const label = formatLength(length);

        const centerStyle = style.clone();
        centerStyle.setGeometry(new ol.geom.Point(first));
        styles.push(centerStyle);

        const pointStyle = style.clone();
        pointStyle.setGeometry(new ol.geom.Point(last));
        styles.push(pointStyle);

        const lineStyle = style.clone();
        lineStyle.setGeometry(lineString);
        styles.push(lineStyle);
        return styles;
    }

    function lineLabel(feature) {
        const geometry = feature.getGeometry();
        const coordinates = geometry.getCoordinates();
        if (coordinates.length < 2) {
            return;
        }
        const length = geometry.getLength();
        const format = formatLength(length);
        const last = geometry.getLastCoordinate();
        const element = $(`<div class="measure-label"><span class="length">${format.value}</span><span>${format.unit}</span></div>`)[0];
        setOverlay(feature, coordinates.length - 2, element, last);
    }

    function polygonLabel(feature) {
        const geometry = feature.getGeometry();
        const coordinates = geometry.getCoordinates()[0];
        if (coordinates.length < 2) {
            return;
        }
        const area = geometry.getArea();
        const format = formatArea(area);
        const html = `<div class="measure-label">
                        <span class="area">${format.value}</span><span>${format.unit}</span>
                    </div>`
        const element = $(html)[0];

        const last = coordinates[coordinates.length - 2];
        setOverlay(feature, 0, element, last);
    }

    function circleLabel(feature) {
        const geometry = feature.getGeometry();
        const first = geometry.getFirstCoordinate();
        const last = feature.get('lastPoint');
        const lineString = new ol.geom.LineString([first, last]);
        const length = lineString.getLength();
        const format = formatLength(length);
        const element = $(`<div class="measure-label"><span class="radius">${format.value}</span><span>${format.unit}</span></div>`)[0];
        setOverlay(feature, 0, element, last);
    }

    function setOverlay(feature, index, element, position) {
        let overlays = feature.get('overlays') || [];
        let overlay = overlays[index];
        if (overlay) {
            overlay.setElement(element)
            overlay.setPosition(position)
        } else {
            overlay = new ol.Overlay({
                element: element,
                position: position,
                // stopEvent: false,
                positioning: 'center-center',
                offset: [0, -20]
            });
            map2d.map.addOverlay(overlay);
            overlays.push(overlay);
        }
        feature.set('overlays', overlays, true);
        console.log(overlays);
    }

    function updateLastOverlay(feature) {
        const type = feature.get("type");
        const overlays = feature.get('overlays');
        let overlay = overlays[overlays.length - 1];
        let header;
        if (type === "LineString") {
            map2d.map.removeOverlay(overlay);
            overlay = overlays[overlays.length - 2];
            header = '<span>총거리</span>'
        } else if (type === "Polygon") {
            header = '<span>총면적</span>'
        } else if (type === "Circle") {
            header = '<span>총반경</span>'
        }
        const $element = $(overlay.getElement());
        $element.prepend(header)
        $element.append('<a href="#" class="ol-popup-closer closer"></a>')
        $element.on('click', '.closer', function (e) {
            e.preventDefault()
            e.stopPropagation();
            _source.removeFeature(feature);
        });
    }

    /**
     * 레이어 추가
     */
    function createLayer() {
        _source = new ol.source.Vector();
        _layer = new ol.layer.Vector({
            source: _source,
            title: '_measure',
            style: styleFunction,
            isDefault: true,
            zIndex: 9999
        });
        _source.on('removefeature', function (e) {
            const feature = e.feature
            removeOverlays(feature);
        })
        map2d.map.addLayer(_layer);
    }


    /**
     * 길이 포맷
     * @param {number} length 길이
     * @returns 포맷 적용된 길이
     */
    function formatLength(length) {
        let output;
        if (length > 1000) {
            output = {
                value: Math.round((length / 1000) * 100) / 100, unit: "km"
            };
        } else {
            output = {
                value: Math.round(length * 100) / 100, unit: "m"
            };
        }
        return output;
    }

    /**
     * 면적 포맷
     * @param {number} area 면적
     * @returns 포맷 적용된 면적
     */
    function formatArea(area) {
        let output;
        if (area > 100000) {
            output = {value: Math.round((area / 1000000) * 100) / 100, unit: "km\xB2"};
        } else {
            output = {value: Math.round(area * 100) / 100, unit: "m\xB2"};
        }
        return output;
    }


    /**
     * 상호작용 추가
     * @param {String} type 타입 `distance:거리, area:면적, radius:반경`
     */
    function active(type) {
        map2d.setInteraction(this);
        const tooltip = (type !== 'radius' ? '더블' : '') + '클릭으로 종료'
        dtmap.tooltip.on();
        dtmap.tooltip.setHtml(`<span>${tooltip}</span>`);
        const drawType = TYPE[type];
        // clearInteraction();
        interaction = new ol.interaction.Draw({
            source: _source,
            type: drawType,
            style: styleFunction,
        });

        map2d.map.addInteraction(interaction);
        map2d.map.un('pointermove', onPointerMove);
        map2d.map.on('pointermove', onPointerMove);
        interaction.on("drawstart", (e) => {
            dtmap.tooltip.on();
            dtmap.tooltip.setHtml(`<span>${tooltip}</span>`);
            e.feature.set("measure", true);
            e.feature.set("drawing", true);
            e.feature.set("type", drawType);
            e.feature.on('change', onFeatureChange)
        });

        interaction.on('drawend', (e) => {
            dtmap.tooltip.off();
            e.feature.set("drawing", false);
            e.feature.un('change', onFeatureChange);
            updateLastOverlay(e.feature);
        })

    }

    function onPointerMove(e) {
        _mousePosition = e
    }

    function onFeatureChange(e) {
        const feature = e.target;
        const type = feature.get("type");
        if (type === "LineString") {
            return lineLabel(feature);
        } else if (type === "Polygon") {
            return polygonLabel(feature);
        } else if (type === "Circle") {
            return circleLabel(feature);
        }
    }

    /**
     * 초기화 source
     */
    function clear() {
        _source.clear();
    }

    function removeOverlays(feature) {
        const overlay = feature.get('overlays');
        if (overlay instanceof Array) {
            for (let i = 0; i < overlay.length; i++) {
                map2d.map.removeOverlay(overlay[i]);
            }
        } else {
            map2d.map.removeOverlay(overlay);
        }
    }


    /**
     * 상호작용 초기화
     */
    function clearInteraction() {
        if (interaction) {
            map2d.map.removeInteraction(interaction);
            map2d.map.un('pointermove', onPointerMove);
            interaction = undefined;
        }
    }

    function dispose() {
        clear();
        clearInteraction();
    }

    let module = {
        init: init,
        active: active,
        clear: clear,
        dispose: dispose,
    }

    Object.defineProperties(module, {
        'source': {
            get: function () {
                return _source;
            }
        },
        'layer': {
            get: function () {
                return _layer;
            }
        }
    })

    return module;
}());