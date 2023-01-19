/**
 * 선택
 */
class Select {
  /**
   * 생성자
   * @param {YMap} yMap 양평 지도
   */
  constructor(yMap) {
    this.yMap = yMap;
    this.source = new ol.source.Vector();
    this.addLayer();
  }

  /**
   * 초기화
   */
  reset() {
    this.source.clear();
    this.yMap.clearInteraction();
  }

  /**
   * 레이어 추가
   */
  addLayer() {
    const layer = new ol.layer.Vector({
      source: this.source,
      zIndex: 2,
    });
    this.yMap.getMap().addLayer(layer);
  }

  /**
   * 상호작용 추가
   * @param {String} type 타입
   * @param {Object} opts 옵션
   */
  addInteraction(type, opts) {
    this.type = type;

    const options = $.extend(
      {
        source: this.source,
      },
      opts
    );
    if (this.type == "Rect") {
      options.type = "Circle";
      options.geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
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
   * 한번 실행
   * @param {string} type 타입
   * @param {string} eventType 이벤트 타입
   * @param {boolean} isRemove 삭제 여부
   * @param {Object} options 옵션
   * @returns
   */
  once(type, eventType, isRemove, options) {
    const deferred = $.Deferred();
    this.reset();
    const interaction = this.addInteraction(type, options);

    if (eventType) {
      interaction.once(eventType, (event) => {
        deferred.resolve(event);
        this.yMap.clearInteraction();
        if (isRemove) {
          setTimeout(() => {
            this.source.clear();
          }, 100);
        }
      });
    }
    return deferred;
  }

  /**
   * 실행
   * @param {string} type 타입
   * @param {string} eventType 이벤트 타입
   * @param {Function} handler 이벤트 핸들러
   * @param {boolean} isRemove 삭제 여부
   * @param {Object} options 옵션
   * @returns
   */
  on(type, eventType, handler, isRemove, options) {
    this.reset();
    const interaction = this.addInteraction(type, options);

    if (eventType) {
      interaction.on(eventType, (event) => {
    	if(handler) {
    		handler(event);
    	}
        if (isRemove) {
          setTimeout(() => {
            this.source.clear();
          }, 100);
        }
      });
    }
  }
}
