/**
 * 지도 좌표
 */
class MapCoordinates {
  /**
   * 생성
   * @param {YMap} yMap 양평 지도
   */
  constructor(yMap) {
    this.yMap = yMap;
    this.map = this.yMap.getMap();
    this.element = $(".map-util .coordinates");
    this.center = [0, 0];
    this.bindEvents();
  }

  /**
   * 소멸자
   */
  destroy() {
    this.unbindEvents();
    this.element = null;
    this.center = null;
    this.map = null;
    this.yMap = null;
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    // 위치
    this.map.on("moveend", this.showCoordinate);

    // 위치 창
    $(".coordi-header > div", this.element).bind(
      "click",
      { yMap: this.yMap, center: this.center, element: this.element },
      this.showPanel
    );

    // 좌표계 변경
    $(".coordi-projection", this.element).bind(
      "change",
      { center: this.center, element: this.element },
      this.changeProjection
    );

    // 위치 적용
    $(".btn-apply", this.element).bind(
      "click",
      { yMap: this.yMap, element: this.element },
      this.move
    );
  }

  /**
   * 이벤트 연결 해제
   */
  unbindEvents() {
    // 위치
    this.map.un("moveend", this.showCoordinate);

    // 위치 창
    $(".coordi-header > div", this.element).unbind("click", this.showPanel);

    // 좌표계 변경
    $(".coordi-projection", this.element).bind("change", this.changeProjection);

    // 위치 적용
    $(".btn-apply", this.element).bind("click", this.move);
  }

  /**
   * 좌표 표시
   * @param {MapEvent} event 지도 이벤트
   */
  showCoordinate(event) {
    const map = event.map;
    const element = $(".map-util .coordinates");
    const center = cmmUtil.getMapCenterLonLat();
    const node = $(".coordi-header", element);
    $(".x", node).text(center[0].toFixed(8));
    $(".y", node).text(center[1].toFixed(8));
  }

  /**
   * 창 표시
   * @param {jQuery.Event} event 이벤트
   */
  showPanel(event) {
	const data = event.data;
    const yMap = data["yMap"];
    const center = data["center"];
    const element = data["element"];
    const map = yMap.getMap();
    const projection = map.getView().getProjection();
    const coordinates = ol.proj.toLonLat(map.getView().getCenter(), projection);
    center[0] = coordinates[0];
    center[1] = coordinates[1];

    const x = Math.abs(3600 * (ol.math.modulo(center[0] + 180, 360) - 180));
    const precision = Math.pow(10, 0);
    let degLon = Math.floor(x / 3600);
    let minLon = Math.floor((x - degLon * 3600) / 60);
    let secLon = x - degLon * 3600 - minLon * 60;
    secLon = Math.ceil(secLon * precision) / precision;
    if (secLon >= 60) {
      secLon = 0;
      minLon += 1;
    }
    if (minLon >= 60) {
      minLon = 0;
      degLon += 1;
    }
    $(".lon-degree").val(degLon);
    $(".lon-minute").val(minLon);
    $(".lon-second").val(secLon);

    const y = Math.abs(3600 * (ol.math.modulo(center[1] + 180, 360) - 180));
    let degLat = Math.floor(y / 3600);
    let minLat = Math.floor((y - degLat * 3600) / 60);
    let secLat = y - degLat * 3600 - minLat * 60;
    secLat = Math.ceil(secLat * precision) / precision;
    if (secLat >= 60) {
      secLat = 0;
      minLat += 1;
    }
    if (minLat >= 60) {
      minLat = 0;
      degLat += 1;
    }
    $(".lat-degree").val(degLat);
    $(".lat-minute").val(minLat);
    $(".lat-second").val(secLat);

    $(".lon-hdms", element).val(
      ol.coordinate.degreesToStringHDMS("", center[0])
    );
    $(".lat-hdms", element).val(
      ol.coordinate.degreesToStringHDMS("", center[1])
    );

    $(".coordi-projection", this.element).trigger("change");
  }

  /**
   * 좌표계 변경
   * @param {jQuery.Event} event 이벤트
   */
  changeProjection(event) {
    const data = event.data;
    const center = data["center"];
    const element = data["element"];

    const node = $(this);
    const projection = node.val();

    const point = new ol.geom.Point(center);
    point.transform("EPSG:4326", projection);

    const coordinates = point.getCoordinates();
    $(".coordi-x", element).val(coordinates[0]);
    $(".coordi-y", element).val(coordinates[1]);
  }

  /**
   * 좌표계 변경
   * @param {jQuery.Event} event 이벤트
   */
  move(event) {
	if(app2D){
    const data = event.data;

    const yMap = data["yMap"];
    const element = data["element"];
    const map = yMap.getMap();

    const node = $(".coordi-projection", element);
    const projection = node.val();

    const x = $(".coordi-x", element).val();
    const y = $(".coordi-y", element).val();
    const center = [parseFloat(x), parseFloat(y)];
    const point = new ol.geom.Point(center);
    point.transform(projection, map.getView().getProjection().getCode());

    map.getView().setCenter(point.getCoordinates());
	}else{
		
	}
  }
}
