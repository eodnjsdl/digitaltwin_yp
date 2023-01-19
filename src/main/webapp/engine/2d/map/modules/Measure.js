/**
 * 측정
 */
class Measure {
  /**
   * 생성자
   * @param {YMap} yMap 양평 지도
   */
  constructor(yMap) {
    this.yMap = yMap;

    this.type = null;
    this.style = null;
    this.labelStyle = null;

    this.source = new ol.source.Vector();
    this.createStyles();
    this.addLayer();
  }

  /**
   * 초기화
   */
  reset() {
    this.source.clear();
  }

  /**
   * 스타일 목록 생성
   */
  createStyles() {
    // 기본 스타일
    this.style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: "rgba(0, 0, 255, 0.3)",
      }),
      stroke: new ol.style.Stroke({
        color: "rgba(255, 255, 0, 0.8)",
        width: 4,
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: "rgba(255, 255, 0, 0.8)",
        }),
      }),
    });

    // 시작 또는 면적 스타일
    this.startStyle = new ol.style.Style({
      text: new ol.style.Text({
        font: "14px 'Noto Sans KR'",
        fill: new ol.style.Fill({
          color: "rgba(0, 0, 0, 1)",
        }),
        backgroundFill: new ol.style.Fill({
          color: "rgba(255, 204, 198, 0.8)",
        }),
        padding: [3, 3, 3, 3],
        textBaseline: "bottom",
        offsetY: -15,
      }),
      image: new ol.style.RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 8],
        fill: new ol.style.Fill({
          color: "rgba(255, 204, 198, 0.8)",
        }),
      }),
    });

    // 라벨 스타일
    this.labelStyle = new ol.style.Style({
      text: new ol.style.Text({
        font: "14px 'Noto Sans KR'",
        fill: new ol.style.Fill({
          color: "rgba(0, 0, 0, 1)",
        }),
        backgroundFill: new ol.style.Fill({
          color: "rgba(34, 180, 172, 0.8)",
        }),
        padding: [3, 3, 3, 3],
        textBaseline: "bottom",
        offsetY: -15,
      }),
      image: new ol.style.RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 8],
        fill: new ol.style.Fill({
          color: "rgba(34, 180, 172, 0.8)",
        }),
      }),
    });

    // 구간 스타일
    this.segmentStyle = new ol.style.Style({
      text: new ol.style.Text({
        font: "14px 'Noto Sans KR'",
        fill: new ol.style.Fill({
          color: "rgba(0, 0, 0, 1)",
        }),
        backgroundFill: new ol.style.Fill({
          color: "rgba(255, 255, 0, 0.8)",
        }),
        padding: [2, 2, 2, 2],
        textBaseline: "bottom",
      }),
    });
  }

  /**
   * 스타일 목록 가져오기
   * @param {ol.Feature} feature 공간 객체
   * @returns 스타일 목록
   */
  getStyles(feature) {
    const styles = [this.style];
    const geometry = feature.getGeometry();
    const type = feature.get("type");

    if (type === "LineString" && geometry instanceof ol.geom.LineString) {
      const labelStyle = this.labelStyle;
      const formatLength = this.formatLength.bind(this);
      const segmentStyle = this.segmentStyle;

      let sum = 0;
      geometry.forEachSegment(function (a, b) {
        const segment = new ol.geom.LineString([a, b]);

        //const length = ol.sphere.getLength(segment);
        const length = segment.getLength();
        const segmentLabel = formatLength(length);
        const segmentPoint = new ol.geom.Point(segment.getCoordinateAt(0.5));
        const cloneSegmentStyle = segmentStyle.clone();
        cloneSegmentStyle.setGeometry(segmentPoint);
        cloneSegmentStyle.getText().setText(segmentLabel);
        styles.push(cloneSegmentStyle);

        sum += length;
        const label = formatLength(sum);
        const point = new ol.geom.Point(segment.getLastCoordinate());
        const cloneLabelStyle = labelStyle.clone();
        cloneLabelStyle.setGeometry(point);
        cloneLabelStyle.getText().setText(label);
        styles.push(cloneLabelStyle);
      });

      const startStyle = this.startStyle.clone();
      startStyle.setGeometry(new ol.geom.Point(geometry.getFirstCoordinate()));
      startStyle.getText().setText("Start");
      styles.push(startStyle);
    } else if (type === "Polygon") {
      //const area = ol.sphere.getArea(geometry);
      const area = geometry.getArea();
      if (area > 0) {
        const label = this.formatArea(area);
        const point = geometry.getInteriorPoint();
        const style = this.startStyle.clone();
        style.setGeometry(point);
        style.getText().setText(label);
        styles.push(style);
      }
    } else if (type === "Circle") {
      const first = geometry.getFirstCoordinate();
      const last = geometry.getLastCoordinate();
      const lineString = new ol.geom.LineString([first, last]);

      //const length = ol.sphere.getLength(lineString);
      const length = lineString.getLength();
      const label = this.formatLength(length);
      const startStyle = this.startStyle.clone();
      startStyle.setGeometry(new ol.geom.Point(last));
      startStyle.getText().setText(label);
      styles.push(startStyle);

      const style = this.style.clone();
      style.setGeometry(new ol.geom.Point(first));
      styles.push(style);

      const lineStyle = this.style.clone();
      lineStyle.setGeometry(lineString);
      styles.push(lineStyle);
    }

    return styles;
  }

  /**
   * 레이어 추가
   */
  addLayer() {
    const getStyles = this.getStyles.bind(this);
    const layer = new ol.layer.Vector({
      source: this.source,
      style: getStyles,
      zIndex: 3,
    });
    this.yMap.getMap().addLayer(layer);
  }

  /**
   * 상호작용 추가
   * @param {String} type 타입 `LineString:거리, Polygon:면적, Circle:반경`
   */
  addInteraction(type) {
    this.type = type;

    const getStyles = this.getStyles.bind(this);
    const interaction = new ol.interaction.Draw({
      source: this.source,
      type: this.type,
      style: getStyles,
    });
    this.yMap.setInteractions([interaction]);

    interaction.on("drawstart", (event) => {
      event.feature.set("type", type);
    });
  }

  /**
   * 길이 포맷
   * @param {number} length 길이
   * @returns 포맷 적용된 길이
   */
  formatLength(length) {
    let output;
    if (length > 1000) {
      output = Math.round((length / 1000) * 100) / 100 + " km";
    } else {
      output = Math.round(length * 100) / 100 + " m";
    }
    return output;
  }

  /**
   * 면적 포맷
   * @param {number} area 면적
   * @returns 포맷 적용된 면적
   */
  formatArea(area) {
    let output;
    if (area > 100000) {
      output = Math.round((area / 1000000) * 100) / 100 + " km\xB2";
    } else {
      output = Math.round(area * 100) / 100 + " m\xB2";
    }
    return output;
  }
}
