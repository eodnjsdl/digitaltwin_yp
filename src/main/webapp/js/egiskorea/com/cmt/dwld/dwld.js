/**
 * 레이어 내보내기
 */
function aj_dataDownload() {
  new DataDownlad();
}

/**
 * 데이터 내보내기
 */
class DataDownlad {
  /**
   * 생성자
   */
  constructor() {
    this.selector = "#rightPopup";
    this.render();
  }

  /**
   * 표시
   */
  render() {
    loadingShowHide("show");
    $.ajax({
      type: "POST",
      url: "/cmt/dwld/dataDownloadView.do",
      dataType: "html",
      async: false,
      success: (returnData, status) => {
        if (status == "success") {
          $("#rightPopup").html(returnData);
          this.facility = store["facility"].getData();
          this.loadSearchTarget();
          this.bindEvents();
          $(".tabBoxDepth1 ul li:first", this.selector).trigger("click");
        } else {
          alert("ERROR!");
          return;
        }
      },
      complete: function () {
        loadingShowHide("hide");
      },
    });
  }

  /**
   * 초기화
   */
  reset() {
    if (app2D) {
      cmmUtil.resetMap();
    } else {
      Module.XDSetMouseState(1);
      var layerList = new Module.JSLayerList(true);
      layerList.delLayerAtName("POLYGON_LAYER");
      layerList.delLayerAtName("POI");
      layerList.delLayerAtName("MultiLineString");
    }
    $("#download-search-area-extent", this.selector).prop("checked", true);
    $("#download-search-area-extent", this.selector).trigger("change");
    $(".area-search-buffer", this.selector).val(0);
    $("[name=standard-search-target]", this.selector).val("");
    $(".facility-search-buffer", this.selector).val(0);
    $("[name=download-type]:first", this.selector).trigger("click");
    $("[name=download-feature-type-all]", this.selector).prop("checked", false);
    $("[name=download-feature-type]", this.selector).prop("checked", false);
  }

  /**
   * 검색 대상 불러오기
   */
  loadSearchTarget() {
    // 데이터 및 필드 관리 테이블 구성 후 변경 예정
    let tag = ``;
    let dataTag = ``;
    tag += `<option value="">시설물</option>`;
    this.facility.forEach((item) => {
      const name = item["tblNm"].toLowerCase();
      const title = item["lyrNm"];
      tag += `<option value="${name}">${title}</option>`;

      dataTag += `<tr>`;
      dataTag += `  <td class="align-center">`;
      dataTag += `    <span class="form-checkbox"><span>`;
      dataTag += `      <input type="checkbox" name="download-feature-type" data-type="${name}" id="download-feature-type-${name}">`;
      dataTag += `      <label for="download-feature-type-${name}"></label>`;
      dataTag += `    </span></span>`;
      dataTag += `  </td>`;
      dataTag += `  <td>${title}</td>`;
      dataTag += `</tr>`;
    });
    $("[name=standard-search-target]", this.selector).html(tag);
    $(".data-list tbody", this.selector).html(dataTag);
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 검색 기준 변경
    $(".tabBoxDepth1 ul li", that.selector).on("click", function () {
      const node = $(this);
      const id = node.attr("data-id");
      $(".data-write tbody tr.tr_toggle", that.selector).hide();
      $(`.data-write tbody tr.${id}`, that.selector).show();
      if (id == "tr_area") {
        $("[name=download-search-area]:checked", that.selector).trigger(
          "change"
        );
      }
      if (app2D) {
        cmmUtil.drawClear();
      } else {
        Module.XDSetMouseState(1);
        if (GLOBAL.layerBox != null) {
          delWfSLayer(GLOBAL.layerBox);
        }
      }
    });

    // 검색영역지정 변경 (현재화면영역, 사용자정의)
    $("[name=download-search-area]", that.selector).on("change", function () {
      const node = $(this);
      const value = node.val();
      if (value == "extent") {
        $(".tr_search_area", that.selector).hide();
        $(".th_search_area_span", that.selector).attr("rowspan", 2);
        cmmUtil.drawClear();
      } else {
        $(".tr_search_area", that.selector).show();
        $(".th_search_area_span", that.selector).attr("rowspan", 3);
        $("[name=download-search-drawing]:first", that.selector).trigger(
          "click"
        );
      }
    });

    // 사용자 정의 검색 조건
    $("[name=download-search-drawing]", that.selector).on("click", function () {
      const node = $(this);
      const type = node.val();
      cmmUtil.spitalDraw(type);
    });

    // 지도에서 선택
    $(".btn-select-map", that.selector)
      .off()
      .on("click", function () {
        const type = $("[name=standard-search-target]", that.selector).val();
        if (app2D) {
          if (type) {
            cmmUtil.selectFacility(type);
          } else {
            alert("기준 시설물을 선택하여 주십시오.");
            $("[name=standard-search-target]", that.selector).focus();
          }
        } else {
          if (type) {
            if (GLOBAL.layerBox != null) {
              delWfSLayer(GLOBAL.layerBox);
            }
            Module.XDSetMouseState(6);
            Module.XDRenderData();

            createLayerWfS(type, GLOBAL.layerBox);
          } else {
            alert("기준 시설물을 선택하여 주십시오.");
            $("[name=standard-search-target]", that.selector).focus();
          }
        }
      });

    // 초기화
    $(".btn_reset", that.selector).on("click", function () {
      that.reset();
    });

    // 전체 선택 / 해제
    $("[name=download-feature-type-all]", that.selector).on(
      "change",
      function () {
        const node = $(this);
        $("[name=download-feature-type]", that.selector).prop(
          "checked",
          node.is(":checked")
        );
      }
    );

    // 내보내기
    $(".btn_downlaod", that.selector).on("click", function () {
      that.download();
    });
  }

  /**
   * 다운로드
   */
  download() {
    const params = {};

    const featureTypes = $(
      "[name=download-feature-type]:checked",
      this.selector
    );
    if (featureTypes.length > 0) {
      const type = $(".tabBoxDepth1 ul li.on", this.selector).attr("data-id");
      if (type == "tr_area") {
        //영역기준
        const searchArea = $(
          "[name=download-search-area]:checked",
          this.selector
        ).val();
        if (searchArea == "extent") {
          //현재화면영역
          const extent = cmmUtil.getMapExtent();
          const geometry = cmmUtil.toSystemProjection(
            cmmUtil.toPolygonFromExtent(extent)
          );
          params["wkt"] = cmmUtil.toWKT(geometry);
        } else if (searchArea == "custom") {
          //사용자정의
          const wkt = cmmUtil.getSelectFeatureWKT();
          if (wkt) {
            params["wkt"] = wkt;
          } else {
            alert("검색 영역을 지정하여 주십시오.");
            return;
          }
        } else {
          console.log("정의되지 않은 검색영역지정 타입입니다.");
        }
        params["buffer"] = $(".area-search-buffer", this.selector).val() || 0;
      } else if (type == "tr_facility") {
        //시설물기준
        const wkt = cmmUtil.getSelectFeatureWKT();
        if (wkt) {
          params["wkt"] = wkt;
        } else {
          alert("검색 기준 시설물을 선택하여 주십시오.");
          return;
        }
        params["buffer"] =
          $(".facility-search-buffer", this.selector).val() || 0;
      } else {
        console.log("정의되지 않은 검색 기준입니다.");
      }
      params["dataIds"] = featureTypes
        .toArray()
        .map((featureType) => {
          return $(featureType).attr("data-type");
        })
        .join();
      params["type"] = $("[name=download-type]:checked").val();

      if (params["wkt"]) {
        cmmUtil.showBufferGeometry(params["wkt"], buffer);
      }

      loadingShowHide("show");
      const format = new ol.format.WKT();
      const geometry = format.readGeometry(params["wkt"]);
      const filter = ol.format.filter.dwithin("geom", geometry, params["buffer"], store.getPrj());
      util.gis.getFeature(params["dataIds"].split(","), filter, null, null, ["geom"]).done((geojson) => {
        cmmUtil.highlightFeatures(geojson);
        loadingShowHide("hide");
      });

      window.location.href = "/cmt/dwld/dataDownload.do?" + $.param(params);
    } else {
      alert(`내보내기할 데이터를 선택하여 주십시오.`);
      return;
    }
  }
}
