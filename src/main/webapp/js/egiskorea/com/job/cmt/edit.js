/**
 * 공간정보 편집도구
 */
class EditingTool {
  /**
   * 생성자
   * @param {string} geometryType 공간 타입
   * @param {ol.geom.Geometry} 공간 정보
   * @param {Function} onApply 적용 시 실행할 함수
   */
  constructor(geometryType, geometry, onApply) {
    this.selector = ".space-edit-tool";
    this.geometryType = geometryType.toLowerCase();
    this.onApply = onApply;
    this.load();
    if (geometry) {
      this.addGeometry(geometry);
    }
  }

  /**
   * 초기화
   */
  reset() {
    cmmUtil.resetMap();
    $(this.selector).empty();
    $(this.selector).hide();
  }

  /**
   * 페이지 불러오기
   */
  load() {
    loadingShowHide("show");
    $(this.selector).load("/job/fcts/editView.do", () => {
      this.initUi();
      this.bindEvents();
      this.loadSnap();
      $(this.selector).show();
      loadingShowHide("hide");
    });
  }

  /**
   * 공간정보 추가
   * @param {ol.geom.Geometry} geometry 공간정보
   */
  addGeometry(geometry) {
    const format = new ol.format.WKT();
    const wkt = format.writeGeometry(geometry);
    cmmUtil.addEditGeometry(wkt);
  }

  /**
   * UI 초기화
   */
  initUi() {
    if (!(this.geometryType == "point" || this.geometryType == "multipoint")) {
      $(".tr_coordinate", this.selector).hide();
    }
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 닫기
    $(".popup-close", that.selector).on("click", function () {
      that.reset();
    });

    // 스냅
    $(".edit-btn-snap", that.selector).on("click", function () {
      const featureType = $("[name=edit-snap-target]", that.selector).val();
      if (featureType) {
        cmmUtil.highlightSnapLayer(featureType);
      } else {
        alert("스냅할 대상을 선택하여 주십시오.");
      }
    });

    // 객체 추가
    $(".edit-btn-add", that.selector).on("click", function () {
      let type = null;
      if (that.geometryType == "point" || that.geometryType == "multipoint") {
        type = "Point";
      } else if (
        that.geometryType == "linestring" ||
        that.geometryType == "multilinestring"
      ) {
        type = "LineString";
      } else if (
        that.geometryType == "polygon" ||
        that.geometryType == "multipolygon"
      ) {
        type = "Polygon";
      } else {
        console.log(`지원되지 않는 공간 타입입니다.`);
      }

      if (type) {
        cmmUtil.drawEditGeometry(type);
      }
    });

    // 객체 수정
    $(".edit-btn-modify", that.selector).on("click", function () {
      cmmUtil.modifyEditGeometry();
    });

    // 객체 삭제
    $(".edit-btn-remove", that.selector).on("click", function () {
      if (confirm("공간정보를 삭제하시겠습니다.")) {
        cmmUtil.removeEditGeometry();
      }
    });

    // 좌표 추가
    $(".edit-add-coordinate", that.selector).on("click", function () {
      const xNode = $(".edit-x", that.selector);
      const yNode = $(".edit-y", that.selector);
      if (xNode.val() && yNode.val()) {
        const format = new ol.format.WKT();
        const x = xNode.val();
        const y = yNode.val();
        const point = new ol.geom.Point([x, y]);
        const wkt = format.writeGeometry(
          point.transform("EPSG:4326", store.getPrj())
        );
        cmmUtil.addEditGeometry(wkt);
      } else {
        if (!xNode.val()) {
          xNode.focus();
        } else if (!yNode.val()) {
          yNode.focus();
        }
        alert("좌표를 입력하여 주십시오.");
      }
    });

    // 적용
    $(".edit-btn-apply", that.selector).on("click", function () {
      const wkt = cmmUtil.getEditGeometry();
      if (wkt) {
        const format = new ol.format.WKT();
        let geometry = format.readGeometry(wkt);
        if (that.geometryType.indexOf("multi") >= 0) {
          if (geometry instanceof ol.geom.Point) {
            geometry = new ol.geom.MultiPoint([geometry.getCoordinates()]);
          } else if (geometry instanceof ol.geom.LineString) {
            geometry = new ol.geom.MultiLineString([geometry]);
          } else if (geometry instanceof ol.geom.Polygon) {
            geometry = new ol.geom.MultiPolygon([geometry]);
          }
        }
        if (that.onApply) {
          that.reset();
          that.onApply(geometry);
        }
      } else {
        alert(`공간정보를 입력하여 주십시오.`);
      }
    });
  }

  /**
   * 스냅 대상 불러오기
   */
  loadSnap() {
    let tag = ``;
    tag += `<option value="">시설물</option>`;
    store["facility"].getData().forEach((item) => {
      const name = item["tblNm"].toLowerCase();
      const title = item["lyrNm"];
      tag += `<option value="${name}">${title}</option>`;
    });
    $("[name=edit-snap-target]", this.selector).html(tag);
  }
}
