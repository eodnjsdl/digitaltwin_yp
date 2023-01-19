/**
 * 지도 표시
 */
class Highlight {
  /**
   * 생성자
   * @param {YMap} yMap 양평 지도
   */
  constructor(yMap) {
    this.yMap = yMap;
    this.map = this.yMap.getMap();
    this.source = new ol.source.Vector();
    this.layer = this.createLayer();

    this.map.on("click", (event) => {
      const findInteraction = this.map
        .getInteractions()
        .getArray()
        .find((interaction) => {
          if (interaction instanceof ol.interaction.Draw) {
            return true;
          } else if (interaction instanceof ol.interaction.Modify) {
            return true;
          } else if (interaction instanceof ol.interaction.Snap) {
            return true;
          } else if (interaction instanceof ol.interaction.Select) {
            return true;
          } else if (interaction instanceof ol.interaction.Translate) {
            return true;
          } else {
            return false;
          }
        });

      if (!findInteraction) {
        const features = this.map.getFeaturesAtPixel(event.pixel, {
          layerFilter: (layer) => {
            return layer == this.layer;
          },
        });
        if (features && features.length > 0) {
          const findFeature = features.find((feature) => feature.onClick);
          if (findFeature) {
            findFeature.onClick(findFeature);
          }
        }
      }
    });
  }

  /**
   * 초기화
   */
  reset() {
    this.source.clear();
  }

  /**
   * 레이어 생성
   */
  createLayer() {
    const layer = new ol.layer.Vector({
      source: this.source,
      zIndex: 100,
      style: function (feature) {
        const type = feature.get("type");
        if (type == "search") {
          const properties = feature.getProperties();
          const alphabet = properties["alphabet"];
          const style = new ol.style.Style({
            image: new ol.style.Icon({
              imgSize: [22, 31],
              anchor: [0.5, 0.5],
              src: "/images/icon-pin.png",
            }),
          });
          if (alphabet) {
            style.setText(
              new Text({
                fill: new Fill({ color: "#46a0e6" }),
                offsetY: -2,
                font: "600 13px Malgun Gothic",
                textAlign: "center",
                text: alphabet,
              })
            );
          }
          return style;
        } else if (type == "coordinate") {
          return new ol.style.Style({
            image: new ol.style.RegularShape({
              fill: new ol.style.Fill({ color: "#ff0000" }),
              stroke: new ol.style.Stroke({ color: "#ff0000", width: 5 }),
              points: 4,
              radius: 10,
              radius2: 0,
              angle: 0,
            }),
          });
        } else {
          let colors = null;
          if (type == "sky") {
            colors = {
              fill: "rgba(51, 153, 204, 0.2)",
              stroke: "rgba(51, 153, 204, 0.6)",
              circle: "rgba(51, 153, 204, 1)",
            };
          } else if (type == "yellow") {
            colors = {
              fill: "rgba(255, 255, 0, 0.2)",
              stroke: "rgba(255, 255, 0, 0.6)",
              circle: "rgba(255, 255, 0, 1)",
            };
          } else if (type == "orange") {
            colors = {
              fill: "rgba(255, 94, 0, 0.2)",
              stroke: "rgba(255, 94, 0, 0.6)",
              circle: "rgba(255, 94, 0, 1)",
            };
          } else if (type == "orange_stroke") {
            colors = {
              fill: "rgba(255, 94, 0, 0)",
              stroke: "rgba(255, 94, 0, 0.6)",
              circle: "rgba(255, 94, 0, 1)",
            };
          } else if (type == "red") {
            colors = {
              fill: "rgba(255, 0, 0, 0.2)",
              stroke: "rgba(255, 0, 0, 0.6)",
              circle: "rgba(255, 0, 0, 1)",
            };
          } else if (type == "red_stroke") {
            colors = {
              fill: "rgba(255, 0, 0, 0)",
              stroke: "rgba(255, 0, 0, 0.6)",
              circle: "rgba(255, 0, 0, 1)",
            };
          } else if (type == "red_stroke") {
            colors = {
              fill: "rgba(255, 0, 0, 0)",
              stroke: "rgba(255, 0, 0, 0.6)",
              circle: "rgba(255, 0, 0, 1)",
            };
          } else {
            console.log("지원되지 않는 타입입니다.");
          }

          if (feature.get("icon")) {
            if (
              feature.getGeometry() instanceof ol.geom.Point ||
              feature.getGeometry() instanceof ol.geom.MultiPoint
            ) {
              const src = feature.get("selected")
                ? feature.get("icon").replace(".png", "_on.png")
                : feature.get("icon");
              const style = new ol.style.Style({
                image: new ol.style.Icon({
                  anchor: [0.5, 1],
                  src: src,
                }),
              });
              if (feature.get("text")) {
                style.setText(
                  new ol.style.Text({
                    font: `normal 14px 'Noto Sans KR'`,
                    offsetY: 6,
                    fill: new ol.style.Fill({ color: "#fff" }),
                    stroke: new ol.style.Stroke({ color: "#000", width: 2 }),
                    text: feature.get("text"),
                  })
                );
              }
              return style;
            } else {
              const geometry = feature.getGeometry();
              let coordinate = null;
              if (geometry instanceof ol.geom.LineString) {
                coordinate = geometry.getCoordinateAt(0.5);
              } else if (geometry instanceof ol.geom.MultiLineString) {
                coordinate = geometry.getLineString(0).getCoordinateAt(0.5);
              } else if (geometry instanceof ol.geom.Polygon) {
                coordinate = ol.extent.getCenter(geometry.getExtent());
              } else if (geometry instanceof ol.geom.MultiPolygon) {
                coordinate = ol.extent.getCenter(
                  geometry.getPolygon(0).getExtent()
                );
              }

              const styles = [];
              styles.push(
                new ol.style.Style({
                  fill: new ol.style.Fill({ color: colors["fill"] }),
                  stroke: new ol.style.Stroke({
                    color: colors["stroke"],
                    width: 5,
                  }),
                  image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({ color: colors["circle"] }),
                  }),
                })
              );

              if (coordinate) {
                const src = feature.get("selected")
                  ? feature.get("icon").replace(".png", "_on.png")
                  : feature.get("icon");
                const style = new ol.style.Style({
                  image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: src,
                  }),
                });
                if (feature.get("text")) {
                  style.setText(
                    new ol.style.Text({
                      font: `normal 14px 'Noto Sans KR'`,
                      offsetY: 6,
                      fill: new ol.style.Fill({ color: "#fff" }),
                      stroke: new ol.style.Stroke({ color: "#000", width: 2 }),
                      text: feature.get("text"),
                    })
                  );
                }
                styles.push(style);
              }

              return styles;
            }
          } else {
            return new ol.style.Style({
              fill: new ol.style.Fill({ color: colors["fill"] }),
              stroke: new ol.style.Stroke({
                color: colors["stroke"],
                width: 5,
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({ color: colors["circle"] }),
              }),
            });
          }
        }
      },
    });
    this.map.addLayer(layer);
    return layer;
  }

  /**
   * 공간객체 목록 추가
   * @param {string} type 타입
   * @param {Array.<ol.Feature>} features 공간 객체 목록
   */
  addFeatures(type, features, onClick) {
    let arr = [];
    features.forEach((item) => {
      const feature = item.clone();
      feature.setId(item.getId());
      feature.set("type", type);
      feature.onClick = onClick;
      arr.push(feature);
    });
    this.source.addFeatures(arr);
  }

  /**
   * 공간객체 목록 반환
   * @param {String} type 타입
   * @returns
   */
  getFeatures(type) {
    return this.source
      .getFeatures()
      .filter((feature) => feature.get("type") == type);
  }

  /**
   * 공간객체 추가
   * @param {string} type 타입
   * @param {ol.Feature} feature 공간 객체
   */
  addFeature(type, feature) {
    const obj = feature.clone();
    obj.set("type", type);
    this.source.addFeature(obj);
  }

  /**
   * 소스 초기화
   * @param {string} type 타입
   */
  clearSource(type) {
    const source = this.source;
    const features = this.source
      .getFeatures()
      .filter((feature) => feature.get("type") == type);
    features.forEach((feature) => {
      source.removeFeature(feature);
    });
  }

  /**
   * 선택 초기화
   * @param {String} type 타입
   */
  clearSelected(type) {
    const features = this.source
      .getFeatures()
      .filter((feature) => feature.get("type") == type);
    features.forEach((feature) => {
      if (feature.get("selected")) {
        feature.unset("selected");
      }
    });
  }

  /**
   * 이동
   * @param {string} type 타입
   */
  move(type) {
    const features = this.source
      .getFeatures()
      .filter((feature) => feature.get("type") == type);
    util.gis.moveFeatures(this.map, features);
  }
}
