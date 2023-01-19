/**
 * 그리기 도구
 */
class DrawingTool {
  /**
   * 생성자
   * @param {YMap} yMap 양평 지도
   */
  constructor(yMap) {
    this.yMap = yMap;
    this.map = this.yMap.getMap();
    this.source = new ol.source.Vector();
    this.layer = this.createLayer();
    this.map.addLayer(this.layer);
  }

  /**
   * 초기화
   */
  reset() {
    this.source.clear();
    this.yMap.clearInteraction();
  }

  /**
   * 레이어 생성
   * @returns 레이어
   */
  createLayer() {
    const layer = new ol.layer.Vector({
      source: this.source,
      zIndex: 90,
      style: function (feature, resolution) {
        const style = new ol.style.Style();
        const type = feature.get("type");
        if (type == "Point") {
          const shapeType = feature.get("shapeType");
          const pointSize = parseInt(feature.get("pointSize"), 10);
          const fill = new ol.style.Fill({
            color: feature.get("pointColor"),
          });
          const stroke = new ol.style.Stroke({
            color: feature.get("pointColor"),
          });
          if (shapeType === "Circle") {
            style.setImage(
              new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: pointSize,
              })
            );
          } else if (shapeType === "Rectangle") {
            style.setImage(
              new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                radius: pointSize,
                points: 4,
                angle: Math.PI / 4,
              })
            );
          } else if (shapeType === "Triangle") {
            style.setImage(
              new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 3,
                radius: pointSize,
                rotation: Math.PI / 4,
                angle: 0,
              })
            );
          } else if (shapeType === "Star") {
            style.setImage(
              new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 5,
                radius: pointSize,
                radius2: 4,
                angle: 0,
              })
            );
          } else if (shapeType === "Cross") {
            style.setImage(
              new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: pointSize,
                radius2: 0,
                angle: 0,
              })
            );
          } else if (shapeType === "X") {
            style.setImage(
              new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: pointSize,
                radius2: 0,
                angle: Math.PI / 4,
              })
            );
          } else {
            console.log(`지원되지 않는 도형 타입입니다.`);
          }
        } else if (type == "Marker") {
          style.setImage(
            new ol.style.Icon({
              anchor: [0.5, 0.5],
              scale: parseFloat(feature.get("scale")),
              src: feature.get("src"),
              opacity: 1,
            })
          );
        } else if (type == "LineString") {
          style.setStroke(
            new ol.style.Stroke({
              color: util.style.getColor(
                feature.get("strokeColor"),
                feature.get("strokeOpacity")
              ),
              lineDash: util.style.getLineDash(
                feature.get("strokeLineDash"),
                feature.get("strokeWidth")
              ),
              width: feature.get("strokeWidth"),
            })
          );
        } else if (
          ["Rectangle", "Triangle", "Polygon", "Circle"].includes(type)
        ) {
          style.setStroke(
            new ol.style.Stroke({
              color: util.style.getColor(
                feature.get("strokeColor"),
                feature.get("strokeOpacity")
              ),
              lineDash: util.style.getLineDash(
                feature.get("strokeLineDash"),
                feature.get("strokeWidth")
              ),
              width: feature.get("strokeWidth"),
            })
          );
          style.setFill(
            new ol.style.Fill({
              color: util.style.getColor(
                feature.get("fillColor"),
                feature.get("fillOpacity")
              ),
            })
          );
        } else if (type == "Text") {
          style.setText(
            new ol.style.Text({
              font: util.style.getFont(feature),
              text: feature.get("text"),
              fill: new ol.style.Fill({
                color: feature.get("fillColor"),
              }),
              stroke: new ol.style.Stroke({
                color: feature.get("strokeColor")
              }),
              textAlign: feature.get("textAlign"),
            })
          );
        } else {
          console.log(`지원되지 않는 타입입니다.`);
        }

        if (type == "LineString") {
          const styles = [];
          styles.push(style);

          const coordinates = feature.getGeometry().getCoordinates();
          if (feature.get("strokeStartArrow")) {
            util.style.addArrowStyles(
              styles,
              feature,
              resolution,
              coordinates[1],
              coordinates[0]
            );
          }
          if (feature.get("strokeEndArrow")) {
            util.style.addArrowStyles(
              styles,
              feature,
              resolution,
              coordinates[coordinates.length - 2],
              coordinates[coordinates.length - 1]
            );
          }

          return styles;
        } else {
          return style;
        }
      },
    });
    return layer;
  }

  /**
   * 그리기 상호작용 추가
   * @param {type} type 타입
   * @returns 그리기 상호작용
   */
  addInteraction(type) {
    this.type = type;

    const options = {
      source: this.source,
    };

    if (this.type == "Marker" || this.type == "Text") {
      options.type = "Point";
    } else if (this.type == "Rectangle") {
      options.type = "Circle";
      options.geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
    } else if (this.type == "Triangle") {
      options.type = "Circle";
      options.geometryFunction = ol.interaction.Draw.createRegularPolygon(3);
    } else if (this.type == "Box") {
      options.type = "Circle";
      options.geometryFunction = ol.interaction.Draw.createBox();
    } else {
      options.type = type;
    }

    const interaction = new ol.interaction.Draw(options);
    this.yMap.setInteractions([interaction]);
    return interaction;
  }

  /**
   * 이동 상호작용 추가
   * @param {Function} deleteCallback 삭제 시 함수
   * @returns 선택 상호작용
   */
  addTranslateInteraction(deleteCallback) {
    const select = new ol.interaction.Select({
      layers: [this.layer],
      hitTolerance: 10,
    });
    const modify = new ol.interaction.Translate({
      features: select.getFeatures(),
    });
    this.yMap.setInteractions([select, modify]);
    $("body")
      .unbind("keydown")
      .bind("keydown", (event) => {
        if (
          event.keyCode == "46" &&
          select &&
          select.getFeatures().getLength() > 0
        ) {
          const feature = select.getFeatures().item(0);
          select.getFeatures().clear();
          this.source.removeFeature(feature);
          if (deleteCallback) {
            deleteCallback();
          }
        }
      });
    return select;
  }

  /**
   * 선택 및 수정 상호작용 추가
   * @param {Function} deleteCallback 삭제 시 함수
   * @returns 선택 상호작용
   */
  addModifyInteraction(deleteCallback) {
    const select = new ol.interaction.Select({
      layers: [this.layer],
      hitTolerance: 10,
    });
    const snap = new ol.interaction.Snap({ source: this.source });
    const modify = new ol.interaction.Modify({
      features: select.getFeatures(),
    });
    this.yMap.setInteractions([select, snap, modify]);
    $("body")
      .unbind("keydown")
      .bind("keydown", (event) => {
        if (
          event.keyCode == "46" &&
          select &&
          select.getFeatures().getLength() > 0
        ) {
          const feature = select.getFeatures().item(0);
          select.getFeatures().clear();
          this.source.removeFeature(feature);
          if (deleteCallback) {
            deleteCallback();
          }
        }
      });
    return select;
  }

  /**
   * 그리기
   * @param {string} type 타입
   * @param {string} eventType 이벤트 타입
   * @param {Function} callback 이벤트 타입에 따라 실행할 함수
   */
  draw(type, eventType, callback) {
    this.yMap.clearInteraction();
    const interaction = this.addInteraction(type);

    if (eventType && callback) {
      interaction.on(eventType, (event) => {
        callback(event);
      });
    }
  }

  /**
   * 이동
   * @param {string} eventType 이벤트 타입
   * @param {Function} callback 이벤트 타입에 따라 실행할 함수
   * @param {Function} deleteCallback 삭제 시 함수
   */
  translate(eventType, callback, deleteCallback) {
    this.yMap.clearInteraction();
    const interaction = this.addTranslateInteraction(deleteCallback);

    if (eventType && callback) {
      interaction.on(eventType, (event) => {
        callback(event);
      });
    }
  }

  /**
   * 편집
   * @param {string} eventType 이벤트 타입
   * @param {Function} callback 이벤트 타입에 따라 실행할 함수
   * @param {Function} deleteCallback 삭제 시 함수
   */
  modify(eventType, callback, deleteCallback) {
    this.yMap.clearInteraction();
    const interaction = this.addModifyInteraction(deleteCallback);

    if (eventType && callback) {
      interaction.on(eventType, (event) => {
        callback(event);
      });
    }
  }

  /**
   * 그래픽 아이디로 공간객체 삭제
   * @param {string} grphcId 그래픽 아이디
   */
  removeByGraphicId(grphcId) {
    const source = this.source;
    const features = this.source
      .getFeatures()
      .filter((feature) => feature.get("grphcId") == grphcId);
    features.forEach((feature) => {
      source.removeFeature(feature);
    });
  }

  /**
   * 공간객체 수 가져오기
   * @returns 공간객체 수
   */
  getCount() {
    return this.source.getFeatures().length;
  }

  /**
   * GeoJSON 으로 변환
   * @returns GeoJSON
   */
  toGeoJSON() {
    const format = new ol.format.GeoJSON();
    const features = this.source.getFeatures().map((feature) => {
      const cloned = feature.clone();
      if (feature.get("type") == "Circle") {
        const geometry = cloned.getGeometry();
        cloned.setGeometry(new ol.geom.Point(geometry.getCenter()));
        cloned.set("circleRadius", geometry.getRadius());
      }
      return cloned;
    });
    return format.writeFeatures(features);
  }

  /**
   * GeoJSON에서 공간 객체 가져와서 표시
   * @param {string} geojson GeoJSON
   * @param {string} grphcId 그래픽 아이디
   */
  fromGeoJSON(geojson, grphcId) {
    const format = new ol.format.GeoJSON();
    const features = format.readFeatures(geojson).map((feature) => {
      const cloned = feature.clone();
      cloned.set("grphcId", grphcId);
      if (feature.get("type") == "Circle") {
        const geometry = cloned.getGeometry();
        cloned.setGeometry(
          new ol.geom.Circle(
            geometry.getCoordinates(),
            feature.get("circleRadius")
          )
        );
      }
      return cloned;
    });
    this.source.addFeatures(features);
    util.gis.moveFeatures(this.map, features);
  }
}
