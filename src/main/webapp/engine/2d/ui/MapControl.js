/**
 * 지도 컨트롤
 */
class MapControl {
  /**
   * 생성자
   * @param {YMap} yMap 양평 지도
   * @param {Object} initLocation 초기 위치
   */
  constructor(yMap, initLocation) {
    this.yMap = yMap;
    this.initLocation = initLocation;
    this.element = $(".map-control");
    this.bindEvents();
  }

  /**
   * 소멸자
   */
  destroy() {
    this.unbindEvents();
    this.element = null;
    this.yMap = null;
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    // 초기화
    $(".reset", this.element).bind("click", this.yMap, this.reset);

    // 위치 초기화
    $(".globe", this.element).bind(
      "click",
      { yMap: this.yMap, initLocation: this.initLocation },
      this.resetLocation
    );

    // 위치 측정
    $(".location", this.element).bind("click", this.yMap, this.location);

    // 거리 측정
    $(".distance", this.element).bind("click", this.yMap, this.distance);

    // 면적 측정
    $(".measure", this.element).bind("click", this.yMap, this.measure);

    // 반경 측정
    $(".radius", this.element).bind("click", this.yMap, this.radius);

    // 확대
    $(".scaleUp", this.element).bind("click", this.yMap, this.zoomIn);

    // 축소
    $(".scaleDown", this.element).bind("click", this.yMap, this.zoomOut);
  }

  /**
   * 이벤트 연결 해제
   */
  unbindEvents() {
    // 초기화
    $(".reset", this.element).unbind("click", this.reset);

    // 위치 초기화
    $(".globe", this.element).unbind("click", this.resetLocation);

    // 위치 측정
    $(".location", this.element).unbind("click", this.location);

    // 거리 측정
    $(".distance", this.element).unbind("click", this.distance);

    // 면적 측정
    $(".measure", this.element).unbind("click", this.measure);

    // 반경 측정
    $(".radius", this.element).unbind("click", this.radius);

    // 확대
    $(".scaleUp", this.element).unbind("click", this.zoomIn);

    // 축소
    $(".scaleDown", this.element).unbind("click", this.zoomOut);
  }

  /**
   * 초기화
   * @param {jQuery.Event} event 이벤트
   */
  reset(event) {
    $(".map-control button").removeClass("active");

    const yMap = event.data;
    yMap.reset();
  }

  /**
   * 위치 초기화
   * @param {jQuery.Event} event 이벤트
   */
  resetLocation(event) {
    const data = event.data;
    const yMap = data["yMap"];
    const initLocation = data["initLocation"];
    yMap.move(initLocation["center"], initLocation["zoom"]);
  }

  /**
   * 위치 표시
   * @param {jQuery.Event} event 이벤트
   */
  location(event) {
    const yMap = event.data;
    yMap.clearInteraction();
    yMap.getModule("measure").reset();
    
    const select = yMap.getModule("select");
    select.once("Point", "drawend", true).done((event) => {
      const feature = event.feature;
      const coordinate = feature.getGeometry().getCoordinates();
      const lonlat = ol.proj.toLonLat(coordinate, "EPSG:5179");

      cmmUtil.reverseGeocoding(coordinate[0], coordinate[1]).done((result) => {
        let tag = ``;
        tag += `<div class="ol-popup">`;
        tag += `  <a href="#" class="ol-popup-closer"></a>`;
        tag += `  <div class="popup-content"></div>`;
        if (result["address"]) {
          tag += `  <div>주소 : ${result["address"]}</div>`;
        }
        if (result["roadAddress"]) {
          tag += `  <div>도로명주소 : ${result["roadAddress"]}<div>`;
        }
        tag += `경위도 : ${lonlat[0].toFixed(4)},${lonlat[1].toFixed(4)}`;
        tag += `</div>`;
        const node = $(tag);
        const element = node[0];
        const popup = new ol.Overlay({
          position: feature.getGeometry().getCoordinates(),
          element: element,
        });
        yMap.getMap().addOverlay(popup);

        $(".ol-popup-closer", element).on("click", () => {
          yMap.getMap().removeOverlay(popup);
        });
        $(".location").removeClass('active');
      });
    });
  }

  /**
   * 거리 측정
   * @param {jQuery.Event} event 이벤트
   */
  distance(event) {
    const yMap = event.data;
    yMap.clearInteraction();
    yMap.getModule("measure").reset();
    
    if($(this).is(".active")) {
    	yMap.getModule("measure").addInteraction("LineString");	
    }
  }

  /**
   * 면적 측정
   * @param {jQuery.Event} event 이벤트
   */
  measure(event) {
    const yMap = event.data;
    yMap.clearInteraction();
    yMap.getModule("measure").reset();

    if($(this).is(".active")) {
    	yMap.getModule("measure").addInteraction("Polygon");	
    }
    
  }

  /**
   * 반경 측정
   * @param {jQuery.Event} event 이벤트
   */
  radius(event) {
    const yMap = event.data;
    yMap.clearInteraction();
    yMap.getModule("measure").reset();

    if($(this).is(".active")) {
    	yMap.getModule("measure").addInteraction("Circle");
    }
    
  }

  /**
   * 확대
   * @param {jQuery.Event} event 이벤트
   */
  zoomIn(event) {
    const yMap = event.data;
    yMap.zoomIn();
  }

  /**
   * 축소
   * @param {jQuery.Event} event 이벤트
   */
  zoomOut(event) {
    const yMap = event.data;
    yMap.zoomOut();
  }
}
