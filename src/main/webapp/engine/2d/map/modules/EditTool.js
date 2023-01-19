/**
 * 편집 도구
 */
class EditTool {
  /**
   * 생성자
   * @param {YMap} yMap 양평 지도
   */
  constructor(yMap) {
    this.yMap = yMap;
    this.map = this.yMap.getMap();
    this.source = new ol.source.Vector();
    this.addLayer();
  }

  /**
   * 초기화
   */
  reset() {
    if (this.snapLayer) {
      this.yMap.getMap().removeLayer(this.snapLayer);
      this.snapLayer = null;
    }
    this.source.clear();
    this.yMap.clearInteraction();
  }

  /**
   * 레이어 추가
   */
  addLayer() {
    const layer = new ol.layer.Vector({
      source: this.source,
      zIndex: 30,
      style: new ol.style.Style({
        fill: new ol.style.Fill({ color: "rgba(255, 94, 0, 0)" }),
        stroke: new ol.style.Stroke({
          color: "rgba(255, 94, 0, 0.6)",
          width: 5,
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({ color: "rgba(255, 94, 0, 1)" }),
        }),
      }),
    });
    this.yMap.getMap().addLayer(layer);
  }

  /**
   * 스냅 레이어 등록
   */
  addSnapLayer(typename) {
    const source = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: function (extent) {
        const params = {
          service: "WFS",
          version: "1.1.0",
          request: "GetFeature",
          typename: `${typename}`,
          outputFormat: "application/json",
          bbox: extent.join(","),
          srsName: store.getPrj(),
        };
        return "/gis/wfs?" + $.param(params);
      },
      strategy: ol.loadingstrategy.bbox,
    });
    this.snapLayer = new ol.layer.Vector({
      source: source,
      zIndex: 3,
    });
    this.yMap.getMap().addLayer(this.snapLayer);
  }

  /**
   * 그리기 상호작용 추가
   * @param {string} type 타입
   */
  addDrawInteraction(type) {
    this.type = type;

    const options = {
      source: this.source,
      type: type,
    };

    const interactions = [];
    const interaction = new ol.interaction.Draw(options);
    interactions.push(interaction);

    if (this.snapLayer) {
      interactions.push(
        new ol.interaction.Snap({ source: this.snapLayer.getSource() })
      );
    }

    this.yMap.setInteractions(interactions);
    return interaction;
  }

  /**
   * 편집 상호작용 추가
   */
  addModifyInteraction() {
    const interactions = [];
    const interaction = new ol.interaction.Modify({ source: this.source });
    interactions.push(interaction);

    if (this.snapLayer) {
      interactions.push(
        new ol.interaction.Snap({ source: this.snapLayer.getSource() })
      );
    }

    this.yMap.setInteractions(interactions);
  }

  /**
   * 스냅
   * @param {string} typename 객체 타입
   */
  snap(typename) {
    if (this.snapLayer) {
      this.yMap.getMap().removeLayer(this.snapLayer);
    }
    this.addSnapLayer(typename);
  }

  /**
   * 추가
   * @param {string} type 타입
   * @returns
   */
  add(type) {
    const deferred = $.Deferred();
    this.clear();

    const interaction = this.addDrawInteraction(type);

    interaction.once("drawend", (event) => {
      deferred.resolve(event);
      this.yMap.clearInteraction();
    });

    return deferred;
  }

  /**
   * 편집
   */
  modify() {
    this.addModifyInteraction();
  }

  /**
   * 도형 삭제
   */
  clear() {
    this.source.clear();
  }

  /**
   * 도형 추가
   * @param {ol.geom.Geometry} geometry 공간 정보
   */
  addGeometry(geometry) {
    this.clear();
    this.source.addFeature(new ol.Feature(geometry));
  }

  getGeometry() {
    const features = this.source.getFeatures();
    if (features.length > 0) {
      return features[0].getGeometry();
    }
  }
}
