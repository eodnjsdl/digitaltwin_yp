/**
 * 시설물 선택
 */
class SelectFacility {
  constructor(yMap) {
    this.yMap = yMap;
    this.layer = null;
    this.interaction = null;
  }

  /**
   * 초기화
   */
  reset() {
    if (this.layer) {
      this.yMap.getMap().removeLayer(this.layer);
      this.layer = null;
    }
    this.yMap.clearInteraction();
  }

  /**
   * 레이어 추가
   */
  addLayer(typename) {
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
    this.layer = new ol.layer.Vector({
      source: source,
      zIndex: 3,
    });
    this.yMap.getMap().addLayer(this.layer);
  }

  /**
   * 상호작용 추가
   */
  addInteraction() {
    this.interaction = new ol.interaction.Select({
      layers: [this.layer],
    });
    this.yMap.getMap().addInteraction(this.interaction);
  }

  /**
   * 실행
   * @param {String} typename 객체 타입
   * @param {Function} handler 객체 선택 시 실행할 함수
   */
  active(typename, handler) {
    if (this.layer) {
      this.yMap.getMap().removeLayer(this.layer);
    }
    this.addLayer(typename);
    this.addInteraction();

    if (handler) {
      this.interaction.on("select", (event) => {
        handler(event);
      });
    }
  }
}
