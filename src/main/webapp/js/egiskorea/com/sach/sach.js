let searchObj = null;
function aj_search() {
  // 최초 실행 시 한번만 생성
  if (!searchObj) {
    searchObj = new Search();
  }
}

/**
 * 검색
 */
class Search {
  /**
   * 생성자
   */
  constructor() {
    this.unity = new UnitySearch();
    this.address = new AddressSearch();
    this.spatial = new SpatialSearch();
    this.bindEvents();
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 검색 초기화
    $(".lnb-search .lnb-resetBtn").on("click", function () {
      cmmUtil.resetMap();
      that.unity.reset();
      that.address.reset();
      that.spatial.reset();
    });

    // 닫기
    $(".lnb-search .lnb-close").on("click", function () {
      $(".lnb-search").stop().fadeOut(100);
      $("#lnb li[data-menu]").removeClass("on");
      cmmUtil.resetMap();
    });
  }
}

/**
 * 통합 검색
 */
class UnitySearch {
  /**
   * 생성자
   */
  constructor() {
    this.selector = ".searchTotal";
    this.searchType = null;
    this.params = { listSize: 10, pageSize: 5 };
    this.list = [];
    this.bindEvents();
    // this.load();
  }

  /**
   * 초기화
   */
  reset() {
    //키워드.
    $(".total-keyword", this.selector).val("");
    //검색갯수
    $(".bbs-list-num strong", this.selector).text(0);
    //검색 리스트.
    $(".search-list", this.selector).html("");
  }

  /**
   * 이벤트 연결
   */

  bindEvents() {
    const that = this;
    // 주소 검색
    $(".total-search", that.selector).on("click", function () {
      that.params["page"] = 0;
      that.params["pageIndex"] = 1;
      that.searchTotal();
    });

    $(".total-keyword", that.selector).on("keydown", function (event) {
      if (event.keyCode == "13") {
        $(".total-search", that.selector).trigger("click");
      }
    });

    // 목록 선택
    $(".search-list", this.selector).on("click", "li", function () {
      const node = $(this);
      node.siblings().removeClass("active");
      node.addClass("active");

      const sn = parseInt(node.attr("data-sn"));
      that.showFeature(sn);
    });

    $(".bi-excel", that.selector).on("click", function () {
      if (that.params["nm"]) {
        const form = $("#excel_form", that.selector)[0];
        $(".hidden-total-keyword", form).val(that.params["nm"]);

        form.setAttribute(
          "action",
          "/sach/Unty/selectUntyExcelListDownload.do"
        );
        form.submit();
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  }

  searchTotal() {
    const that = this;
    const nm = $(".total-keyword", this.selector).val();
    if (nm == null || nm == "") {
      alert("검색 값이 비어있습니다.");
      return false;
    }

    this.params["nm"] = nm;
    ui.loadingBar("show");
    $.ajax({
      url: "/sach/Unty/searchTotal.do",
      type: "POST",
      data: this.params,
    }).done(function (res) {
      this.searchType = "total";
      const result = JSON.parse(res);
      that.createResults(result, that.searchTotal);
      ui.loadingBar("hide");
    });
  }

  /**
   * 결과 생성
   * @param {Object} result 검색 결과
   * @param {Function} search 검색 함수
   */
  createResults(result, search) {
    const that = this;
    const totalFeatures = result["paginationInfo"]["totalRecordCount"];
    this.params["total"] = totalFeatures;
    this.list = result["resultList"];
    $(".bbs-list-num strong", this.selector).text(totalFeatures);
    if (totalFeatures == 0) {
      $(".search-empty", this.selector).show();
      $(".searchResult-wrap", this.selector).hide();
    } else {
      const tags = this.list.map((item, index) => {
        let tag = ``;
        tag += `<li data-sn="${index}" >`;
        tag += `  <a href="javascript:void(0);">`;
        tag += `<p class="name">` + item["nm"] + `</p>`;
        // if (item["rn"]) {
        //   let text = ``;
        //   text += item["rn"] + ` `;
        //   text += item["buldMnnm"];
        //   text += parseInt(item["buldSlno"])
        //       ? `-${parseInt(item["buldSlno"])}`
        //       : ``;
        //   tag += `<p class="addr road"><span class="cate">도로명</span>${text}</p>`;
        // }
        // if (item["emdKorNm"]) {
        //   let text = ``;
        //   text += item["emdKorNm"] + ` `;
        //   text += item["liKorNm"] + ` `;
        //   text += item["mntnYn"] == "2" ? `산 ` : ``;
        //   text += parseInt(item["lnbrMnnm"]);
        //   text += parseInt(item["lnbrSlno"])
        //       ? `-${parseInt(item["lnbrSlno"])}`
        //       : ``;
        //   tag += `<p class="addr jibun"><span class="cate">지번</span>${text}</p>`;
        // }
        tag += `  </a>`;
        tag += `</li>`;
        return tag;
      });
      $(".search-list", this.selector).html(tags.join(""));

      new Paging(`${this.selector} .pagination`, this.params, (page) => {
        this.params["page"] = page;
        this.params["pageIndex"] = page + 1;
        this.searchTotal();
      });

      $(".search-empty", this.selector).hide();
      $(".searchResult-wrap", this.selector).show();
    }
  }
  /**
   * 도형 표시
   * @param {number} sn 순번
   */
  showFeature(sn) {
    const wkt = this.list[sn]["wkt"];
    //console.log(wkt);
    cmmUtil.highlightGeometry(wkt, './images/poi/nomal_poi.png');
  }
}

/**
 * 주소 검색
 */
class AddressSearch {
  /**
   * 생성자
   */
  constructor() {
    this.selector = ".searchAddr";
    this.searchType = null;
    this.params = { listSize: 10, pageSize: 5 };
    this.list = [];
    this.bindEvents();
    this.load();
  }

  /**
   * 초기화
   */
  reset() {
    $(".search-address-emd option:first", this.selector).prop("selected", true);
    $(".search-address-emd", this.selector).trigger("change");
    $(".search-road-emd option:first", this.selector).prop("selected", true);
    $(".search-road-emd", this.selector).trigger("change");
    $(".search-address-mnnm", this.selector).val("");
    $(".search-address-slno", this.selector).val("");
    $(".search-road-mnnm", this.selector).val("");
    $(".search-road-slno", this.selector).val("");
    $(".bbs-list-num strong", this.selector).text(0);
    $(".search-empty", this.selector).show();
    $(".search-list", this.selector).html("");
    $(".searchResult-wrap", this.selector).hide();
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 읍면동 선택 시 '리' 표시
    $(".search-address-emd", that.selector).on("change", function () {
      const node = $(this);
      const emdCd = node.val();
      that.loadLi(emdCd);
    });

    // 읍면동 선택 시 '도로명' 표시
    $(".search-road-emd", that.selector).on("change", function () {
      const node = $(this);
      const emdCd = node.val();
      that.loadRn(emdCd);
    });

    // 주소 검색
    $(".search-address-search", that.selector).on("click", function () {
      that.params["page"] = 0;
      that.params["pageIndex"] = 1;
      that.searchAddress();
    });
    $(".search-address-mnnm", that.selector).on("keydown", function (event) {
      if (event.keyCode == "13") {
        $(".search-address-search", that.selector).trigger("click");
      }
    });
    $(".search-address-slno", that.selector).on("keydown", function (event) {
      if (event.keyCode == "13") {
        $(".search-address-search", that.selector).trigger("click");
      }
    });

    // 도로명 주소 검색
    $(".search-road-search", that.selector).on("click", function () {
      that.params["page"] = 0;
      that.params["pageIndex"] = 1;
      that.searchRoadAddress();
    });
    $(".search-road-mnnm", that.selector).on("keydown", function (event) {
      if (event.keyCode == "13") {
        $(".search-road-search", that.selector).trigger("click");
      }
    });
    $(".search-road-slno", that.selector).on("keydown", function (event) {
      if (event.keyCode == "13") {
        $(".search-road-search", that.selector).trigger("click");
      }
    });

    // 목록 선택
    $(".search-list", this.selector).on("click", "li", function () {
      const node = $(this);
      node.siblings().removeClass("active");
      node.addClass("active");

      console.log('검색 목록 클릭');

      const sn = parseInt(node.attr("data-sn"));

      that.showFeature(sn);
    });
  }

  /**
   * 읍면동
   */
  load() {
    ui.loadingBar("show");
    store.emd.getData().done((features) => {
      const sorted = util.array.sort(features, "emd_kor_nm");
      const tags = sorted.map((feature) => {
        return `<option value="${feature.get("emd_cd")}">${feature.get(
          "emd_kor_nm"
        )}</option>`;
      });
      $(".search-address-emd", this.selector).html(tags.join(""));
      $(".search-address-emd", this.selector).trigger("change");
      $(".search-road-emd", this.selector).html(tags.join(""));
      $(".search-road-emd", this.selector).trigger("change");
      ui.loadingBar("hide");
    });
  }

  /**
   * 리
   * @param {string} emdCd 읍면동코드
   */
  loadLi(emdCd) {
    ui.loadingBar("show");
    const filter = ol.format.filter.like("li_cd", `${emdCd}*`);
    util.gis
      .getFeature(["tgd_scco_li"], filter, null, null, [
        "gid",
        "li_cd",
        "li_kor_nm",
      ])
      .done((geojson) => {
        try {
          const format = new ol.format.GeoJSON();
          const features = format.readFeatures(geojson);
          const sorted = util.array.sort(features, "li_kor_nm");
          const tags = sorted.map((feature) => {
            return `<option value="${feature.get("li_cd")}">${feature.get(
              "li_kor_nm"
            )}</option>`;
          });
          $(".search-address-li", this.selector).html(
            `<option value="">선택</option>${tags.join("")}`
          );
        } catch (error) {
          console.log(`리 을 가져오는데 실패했습니다.`);
        } finally {
          ui.loadingBar("hide");
        }
      });
  }

  /**
   * 도로명
   * @param {string} emdCd 읍면동코드
   */
  loadRn(emdCd) {
    ui.loadingBar("show");
    const filter = ol.format.filter.equalTo("emd_cd", emdCd);
    //util.gis.getFeature(["v_tgd_sprd_rn"], filter).done((geojson) => {
    util.gis
      .getFeature(["tgd_sprd_rn"], filter, null, null, [
        "gid",
        "rn_cd",
        "rn",
        "emd_cd",
      ])
      .done((geojson) => {
        try {
          const format = new ol.format.GeoJSON();
          const features = format.readFeatures(geojson);
          const sorted = util.array.sort(features, "rn");
          const tags = sorted.map((feature) => {
            return `<option value="${feature.get("rn_cd")}">${feature.get(
              "rn"
            )}</option>`;
          });
          $(".search-road-rn", this.selector).html(
            `<option value="">선택</option>${tags.join("")}`
          );
        } catch (error) {
          console.log(`도로명을 가져오는데 실패했습니다.`);
        } finally {
          ui.loadingBar("hide");
        }
      });
    ui.loadingBar("hide");
  }

  /**
   * 주소 검색
   */
  searchAddress() {
    const emdCd = $(".search-address-emd", this.selector).val();
    const liCd = $(".search-address-li", this.selector).val();
    const mntn = $(".search-address-mntn", this.selector).is(":checked")
      ? "2"
      : "_";
    const mnnm = $(".search-address-mnnm", this.selector).val();
    const slno = $(".search-address-slno", this.selector).val();

    let pnu = "";
    if (liCd) {
      pnu += liCd;
    } else {
      pnu += emdCd + "__";
    }
    pnu += mntn;
    if (mnnm) {
      pnu += mnnm.padStart(4, "0");
    } else {
      pnu += "____";
    }
    if (slno) {
      pnu += slno.padStart(4, "0");
    } else {
      pnu += "____";
    }

    this.params["pnu"] = pnu;

    ui.loadingBar("show");
    $.post("/sach/adr/searchAddress.do", this.params)
      .done((response) => {
        this.searchType = "address";
        const result = JSON.parse(response);
        this.createResults(result, this.searchAddress);
        ui.loadingBar("hide");
      })
      .fail(() => {
        alert("주소 검색에 실패하였습니다.");
        ui.loadingBar("hide");
      });
  }

  /**
   * 도로명 주소 검색
   */
  searchRoadAddress() {
    const emdCd = $(".search-road-emd", this.selector).val();
    const rnCd = $(".search-road-rn", this.selector).val();
    const mnnm = $(".search-road-mnnm", this.selector).val();
    const slno = $(".search-road-slno", this.selector).val();

    if (rnCd) {
      this.params["rnCd"] = rnCd;
      this.params["emdCd"] = "";
    } else {
      this.params["rnCd"] = "";
      this.params["emdCd"] = emdCd.substring(5, 8);
    }
    this.params["mnnm"] = mnnm || "";
    this.params["slno"] = slno || "";

    ui.loadingBar("show");
    $.post("/sach/adr/searchRoadAddress.do", this.params)
      .done((response) => {
        this.searchType = "roadAddress";
        const result = JSON.parse(response);
        this.createResults(result, this.searchRoadAddress);
        ui.loadingBar("hide");
      })
      .fail(() => {
        alert("도로명 주소 검색에 실패하였습니다.");
        ui.loadingBar("hide");
      });
  }

  /**
   * 결과 생성
   * @param {Object} result 검색 결과
   * @param {Function} search 검색 함수
   */
  createResults(result, search) {
    const totalFeatures = result["paginationInfo"]["totalRecordCount"];
    this.params["total"] = totalFeatures;
    this.list = result["resultList"];
    $(".bbs-list-num strong", this.selector).text(totalFeatures);

    if (totalFeatures == 0) {
      $(".search-empty", this.selector).show();
      $(".searchResult-wrap", this.selector).hide();
    } else {
      const tags = this.list.map((item, index) => {
        let tag = ``;
        tag += `<li data-sn="${index}" >`;
        tag += `  <a href="javascript:void(0);">`;
        if (item["rn"]) {
          let text = ``;
          text += item["rn"] + ` `;
          text += item["buldMnnm"];
          text += parseInt(item["buldSlno"])
            ? `-${parseInt(item["buldSlno"])}`
            : ``;
          tag += `<p class="addr road"><span class="cate">도로명</span>${text}</p>`;
        }
        if (item["emdKorNm"]) {
          let text = ``;
          text += item["emdKorNm"] + ` `;
          text += item["liKorNm"] + ` `;
          text += item["mntnYn"] == "2" ? `산 ` : ``;
          text += parseInt(item["lnbrMnnm"]);
          text += parseInt(item["lnbrSlno"])
            ? `-${parseInt(item["lnbrSlno"])}`
            : ``;
          tag += `<p class="addr jibun"><span class="cate">지번</span>${text}</p>`;
        }
        tag += `  </a>`;
        tag += `</li>`;
        return tag;
      });
      $(".search-list", this.selector).html(tags.join(""));

      new Paging(`${this.selector} .pagination`, this.params, (page) => {
        this.params["page"] = page;
        this.params["pageIndex"] = page + 1;
        if (this.searchType == "address") {
          this.searchAddress();
        } else {
          this.searchRoadAddress();
        }
      });

      $(".search-empty", this.selector).hide();
      $(".searchResult-wrap", this.selector).show();
    }
  }

  /**
   * 도형 표시
   * @param {number} sn 순번
   */
  showFeature(sn) {
    const wkt = this.list[sn]["wkt"];
    
    //wkt 5174좌표에서 5179로 변환
/*    const format = new ol.format.WKT();
    
    const feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:5174',
      featureProjection: 'EPSG:5179',
    });

    const wkt5179 = format.writeGeometry(feature.getGeometry());*/
    
	cmmUtil.highlightGeometry(wkt);
  }
}

/**
 * 공간 검색
 */
class SpatialSearch {
  /**
   * 생성자
   */
  constructor() {
    this.selector = ".searchArea";
    this.facility = store["facility"].getData();
    this.params = {
      listSize: 10,
      pageSize: 5,
    };
    this.features = null;
    this.loadSearchTarget();
    this.bindEvents();
    $("[name=rad-search-area]:checked", this.selector).trigger("change");
  }

  /**
   * 초기화
   */
  reset() {
    $("select", this.selector).val("");
    $("#rad-search-area-extent", this.selector).prop("checked", true);
    $("#rad-search-area-extent", this.selector).trigger("change");
    $(".area-search-buffer", this.selector).val(0);
    $(".facility-search-buffer", this.selector).val(0);
    $(".bbs-list-num strong", this.selector).text(0);
    $(".search-list", this.selector).empty();
  }

  /**
   * 검색 대상 불러오기
   */
  loadSearchTarget() {
    // 데이터 및 필드 관리 테이블 구성 후 변경 예정
    let tag = ``;
    tag += `<option value="">시설물</option>`;
    this.facility.forEach((item) => {
      const name = item["tblNm"].toLowerCase();
      const title = item["lyrNm"];
      tag += `<option value="${name}">${title}</option>`;
    });
    $("[name=area-search-target]", this.selector).html(tag);
    $("[name=facility-search-target]", this.selector).html(tag);
    $("[name=standard-search-target]", this.selector).html(tag);
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 검색영역지정 변경 (현재화면영역, 사용자정의)
    $("[name=rad-search-area]", that.selector).on("change", function (event) {
      const node = $(this);
      const value = node.val();
      if (value == "extent") {
        $(".space-search-area", that.selector).hide();
      } else {
        $(".space-search-area", that.selector).show();
        $("[name=rad-search-drawing]:first", that.selector).trigger("click");
      }
    });

    // 사용자 정의 검색 조건
    $("[name=rad-search-drawing]", that.selector).on("click", function () {
      const node = $(this);
      const type = node.val();

      cmmUtil.spitalDraw(type);
    });

    // 공간검색 기준 시설물 선택
    $(".btn-select-map", that.selector).on("click", function () {
      var type = $("[name=standard-search-target]", that.selector).val();
      if (mapType == "2D") {
        if (type) {
          alert("기준시설물 지도상에 선택후 검색을 클릭 하세요.");
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
          var layerList = new Module.JSLayerList(true);
          var layer = layerList.nameAtLayer("BUFFER_POLYGON_LAYER");
          if (layer != null) {
            layer.removeAll();
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

    // 영역기준 검색
    $(".areaSearchArea .search", that.selector).on("click", function () {
      that.searchArea();
    });
    $(".area-search-buffer", that.selector).on("keydown", function (event) {
	  if (event.keyCode == "13") {
	    $(".areaSearchArea .search", that.selector).trigger("click");
	  }
	});
    
    // 시설물 기준 검색
    $(".addrSearchfacility .search", that.selector).on("click", function () {
      that.searchFacility();
    });
    $(".facility-search-buffer", that.selector).on("keydown", function (event) {
  	  if (event.keyCode == "13") {
  	    $(".addrSearchfacility .search", that.selector).trigger("click");
  	  }
  	});

    // 목록 선택
    $(".search-list", this.selector).on("click", "li", function () {
      const node = $(this);
      node.siblings().removeClass("active");
      node.addClass("active");

      const id = node.attr("data-id");
      that.showFeature(id);
    });
  }

  /**
   * 영역 검색
   */
  searchArea() {
    const featureType = $("[name=area-search-target]", this.selector).val();
    if (featureType) {
      const filter = this.getAreaFilter();
      if (filter) {
        this.params["featureType"] = featureType;
        this.params["filter"] = filter;
        this.params["page"] = 0;
        this.params["title"] = $(
          "[name=area-search-target] option:selected",
          this.selector
        ).text();
        this.search();
      } else {
        $("[name=rad-search-drawing]:first", this.selector).trigger("click");
        alert("검색 영역을 지정하여 주십시오.");
      }
    } else {
      alert("검색대상을 선택하여 주십시오.");
      $("[name=area-search-target]", this.selector).focus();
    }
  }

  /**
   * 검색조건 가져오기
   * @returns {ol.format.filter.dwithin} 검색조건
   */
  getAreaFilter() {
    const format = new ol.format.WKT();
    let buffer = $(".area-search-buffer", this.selector).val();
    const searchAreaType = $(
      "[name=rad-search-area]:checked",
      this.selector
    ).val();
    let geometry = null;
    if (searchAreaType == "extent") {
      const extent = cmmUtil.getMapExtent();
      geometry = cmmUtil.toSystemProjection(
        cmmUtil.toPolygonFromExtent(extent)
      );
    } else if (searchAreaType == "custom") {
      const wkt = cmmUtil.getSelectFeatureWKT();
      if (wkt) {
        geometry = format.readGeometry(wkt);
      }
    }
    if (geometry) {
      const wkt = format.writeGeometry(geometry);
      cmmUtil.showBufferGeometry(wkt, buffer);
      return ol.format.filter.dwithin("geom", geometry, buffer, store.getPrj());
    } else {
      return null;
    }
  }

  /**
   * 시설물 검색
   */
  searchFacility() {
    const featureType = $("[name=facility-search-target]", this.selector).val();
    if (featureType) {
      const filter = this.getFacilityFilter();
      if (filter) {
        this.params["featureType"] = featureType;
        this.params["filter"] = filter;
        this.params["page"] = 0;
        this.params["listSize"] = 10;
        this.params["title"] = $(
          "[name=facility-search-target] option:selected",
          this.selector
        ).text();
        this.search();
      } else {
        alert("기준 시설물을 선택하여 주십시오.");
      }
    } else {
      alert("검색대상을 선택하여 주십시오.");
      $("[name=area-search-target]", this.selector).focus();
    }
  }

  /**
   * 검색조건 가져오기
   * @returns {ol.format.filter.dwithin} 검색조건
   */
  getFacilityFilter() {
    let buffer = $(".facility-search-buffer", this.selector).val();
    const wkt = cmmUtil.getSelectFeatureWKT();
    let geometry = null;
    if (wkt) {
      const format = new ol.format.WKT();
      geometry = format.readGeometry(wkt);
      cmmUtil.showBufferGeometry(wkt, buffer);
    }
    if (geometry) {
      return ol.format.filter.dwithin("geom", geometry, buffer, store.getPrj());
    } else {
      return null;
    }
  }

  /**
   * 검색
   */
  search() {
    const format = new ol.format.GeoJSON();
    const featureType = this.params["featureType"];
    const filter = this.params["filter"];
    const listSize = this.params["listSize"];
    const page = this.params["page"];
    loadingShowHide("show");
    util.gis
      .getFeature([featureType], filter, listSize, page)
      .done((geojson) => {
        const format = new ol.format.GeoJSON();
        this.features = format.readFeatures(geojson);
        this.features.forEach((feature) => {
          feature.setGeometry(
            cmmUtil.toMapProjection(feature.getGeometry().clone())
          );
          //          if(mapType == "3D"){
          //        	 var geoxy = feature.getGeometry().flatCoordinates
          //      	 	createImagePoi()
          //          }
        });
        this.createResults(geojson["totalFeatures"], this.features);

        cmmUtil.clearHighlight();

        let icons = null;
        let icon = null;
        if (featureType == "swl_dept_ps") {
          icon = "/images/poi/swlDeptPs_poi.png";
        } else if (featureType == "swl_dran_ps") {
          icon = "./images/poi/swlDranPs_poi.png";
        } else if (featureType == "swl_manh_ps") {
          icon = "./images/poi/swlManhPs_poi.png";
        } else if (featureType == "swl_pump_ps") {
          icon = "./images/poi/swlPumpPs_poi.png";
        } else if (featureType == "swl_spew_ps") {
          icon = "./images/poi/swlSpewPs_poi.png";
        } else if (featureType == "swl_spot_ps") {
          icon = "./images/poi/swlSpotPs_poi.png";
        } else if (featureType == "swl_vent_ps") {
          icon = "./images/poi/swlVentPs_poi.png";
        } else if (featureType == "wtl_fire_ps") {
          icons = [
            {
              ftrCde: "SA118",
              icon: "./images/poi/waterTower_poi.png",
            },
            {
              ftrCde: "SA119",
              icon: "./images/poi/hydrant_poi.png",
            },
          ];
        } else if (featureType == "wtl_manh_ps") {
          icons = [
            { ftrCde: "SA100", icon: "./images/poi/wtlManhPs_poi.png" },
            { ftrCde: "SA991", icon: "./images/poi/expansionJoint_poi.png" },
          ];
        } else if (featureType == "wtl_prga_ps") {
          icon = "./images/poi/wtlPrgaPs_poi.png";
        } else if (featureType == "wtl_serv_ps") {
          icon = "./images/poi/wtlServPs_poi.png";
        } else if (featureType == "wtl_valv_ps") {
          icons = [
            { ftrCde: "SA200", icon: "./images/poi/stopValve_poi.png" },
            { ftrCde: "SA201", icon: "./images/poi/nonreturnValve_poi.png" },
            { ftrCde: "SA202", icon: "./images/poi/drainValve_poi.png" },
            { ftrCde: "SA203", icon: "./images/poi/exhaustValve_poi.png" },
            { ftrCde: "SA204", icon: "./images/poi/prsRelifValve_poi.png" },
            { ftrCde: "SA205", icon: "./images/poi/safetyValve_poi.png" },
          ];
        } else if (featureType == "tgd_sprd_manage") {
          icon = "./images/poi/roadSection_poi.png";
        } else if (featureType == "tgd_sprl_rlway") {
          icon = "./images/poi/railroadTrack_poi.png";
        } else if (featureType == "tgd_sprl_statn") {
          icon = "./images/poi/railroadStation_poi.png";
        } else if (featureType == "tgd_spsb_rlway") {
          icon = "./images/poi/subwayTrack_poi.png";
        } else if (featureType == "tgd_spsb_statn") {
          icon = "./images/poi/subwayStation_poi.png";
        } else if (featureType == "tgd_spot_bridge") {
          icon = "./images/poi/bridge_poi.png";
        } else if (featureType == "tgd_spot_overpass") {
          icon = "./images/poi/overpass_poi.png";
        } else if (featureType == "tgd_spot_tunnel") {
          icon = "./images/poi/tunnel_poi.png";
        } else if (featureType == "tgd_cctv_status") {
          icon = "./images/poi/cctv_poi.png";
        }

        if (icons != null) {
          icons.forEach((icon) => {
            const arr = [];
            this.features.forEach((feature) => {
              if (feature.get("ftr_cde") == icon["ftrCde"]) {
                arr.push(feature);
              }
            });
            if (arr.length > 0) {
              cmmUtil.highlightFeatures(
                format.writeFeatures(arr),
                icon["icon"],
                {
                  notClear: true,
                  onClick: (feature) => {
                    this.showFeature(feature.getId());
                    //                    console.log(feature);
                  },
                }
              );
            }
          });
        } else if (icon != null) {
          cmmUtil.highlightFeatures(geojson, icon, {
            notClear: true,
            onClick: (feature) => {
              this.showFeature(feature.getId());
              //              console.log(feature);
            },
          });
        } else {
          cmmUtil.highlightFeatures(geojson, "./images/poi/icon1.png", {
            onClick: (feature) => {
              this.showFeature(feature.getId());
              //              console.log(feature);
            },
          });
        }

        // 3D에서 사용자 영역 그리기 도구 마우스 상태 변경을 위해 추가
        if (!app2D) {
          if ($("li[data-tab=areaSearchArea]").hasClass("on")) {
            //검색-공간검색-영역기준

            Module.XDSetMouseState(1);
          }
          if ($("li[data-tab=addrSearchfacility]").hasClass("on")) {
            //검색-공간검색-시설물기준

            var selectData = GLOBAL.selectObjectData;
            var type = selectData.features[0].geometry.type;
            var radius = $(".facility-search-buffer").val();
            var layerName = GLOBAL.SelectObject.split("-")[1];

            if (radius != "0") {
              // 폴리곤을 저장할 레이어 반환
              var map = Module.getMap();
              var line2D = new Module.JSVec2Array();
              var polygonLine3D = new Module.JSVec3Array();
              var polygonLine;

              var layerList = new Module.JSLayerList(true);
              var layer = layerList.nameAtLayer("BUFFER_POLYGON_LAYER");
              if (layer == null) {
                layer = layerList.createLayer(
                  "BUFFER_POLYGON_LAYER",
                  Module.ELT_PLANE
                );
              } else {
                layer.removeAll();
              }
              if (type == "Point") {
                var geom = selectData.features[0].geometry.coordinates;

                let center = new Module.JSVector3D(
                  parseFloat(geom[0]),
                  parseFloat(geom[1]),
                  Module.getMap().getTerrHeightFast(
                    parseFloat(geom[0]),
                    parseFloat(geom[1])
                  ) + 2
                );
                createCirclePolygon(center, radius, 100);

                return false;
              } else if (type == "MultiLineString") {
                var geom = selectData.features[0].geometry.coordinates[0];

                for (var i = 0; i < geom.length; i++) {
                  line2D.push(
                    new Module.JSVector2D(
                      parseFloat(geom[i][0]),
                      parseFloat(geom[i][1])
                    )
                  );
                }

                // 라인의 거리 100m 버퍼 폴리곤 좌표 반환
                polygonLine = map.getLineBuffer(line2D, parseFloat(radius));
              } else if (type == "MultiPolygon") {
                var geom = selectData.features[0].geometry.coordinates[0];
                for (var i = 0; i < geom[0].length; i++) {
                  line2D.push(
                    new Module.JSVector2D(
                      parseFloat(geom[0][i][0]),
                      parseFloat(geom[0][i][1])
                    )
                  );
                }

                // 라인의 거리 100m 버퍼 폴리곤 좌표 반환
                polygonLine = map.getLineBuffer(line2D, parseFloat(radius));
              }
              // 폴리곤 생성을 위해 3D 좌표로 변환

              for (var i = 0; i < polygonLine.count(); i++) {
                var z = Module.getMap().getTerrHeightFast(
                  polygonLine.get(i).x,
                  polygonLine.get(i).y
                );
                polygonLine3D.push(
                  new Module.JSVector3D(
                    polygonLine.get(i).x,
                    polygonLine.get(i).y,
                    z + 3
                  )
                );
              }

              // 폴리곤 생성
              var polygon = Module.createPolygon("BUFFER_POLYGON");

              // 폴리곤 색상 설정
              var polygonStyle = new Module.JSPolygonStyle();
              polygonStyle.setFill(true);
              polygonStyle.setFillColor(new Module.JSColor(80, 255, 228, 0));
              polygonStyle.setOutLine(true);
              polygonStyle.setOutLineWidth(3.2);
              polygonStyle.setOutLineColor(
                new Module.JSColor(100, 255, 228, 0)
              );
              polygon.setStyle(polygonStyle);

              // 폴리곤 형상 설정
              var part = new Module.Collection();
              part.add(polygonLine3D.count());
              polygon.setPartCoordinates(polygonLine3D, part);

              // 레이어에 추가
              layer.addObject(polygon, 0);
            }
          }
        }
      });
    loadingShowHide("hide");
  }

  /**
   * 결과 생성
   * @param {number} totalFeatures 총 수
   * @param {Array.<numbeR>} features 도형 목록
   */
  createResults(totalFeatures, features) {
    this.params["total"] = totalFeatures;
    $(".bbs-list-num strong", this.selector).text(totalFeatures);

    if (totalFeatures == 0) {
      $(".search-empty", this.selector).show();
      $(".searchResult-wrap", this.selector).hide();
    } else {
      let tag = ``;
      features.forEach((feature) => {
        const properties = feature.getProperties();
        let facility = this.facility.find((item) => {
          const name = item["tblNm"].toLowerCase();
          return feature.getId().startsWith(name);
        });

        if (facility) {
          const text =
            properties[facility["lblField"]] ||
            properties["ftr_idn"] ||
            properties["gid"] ||
              properties["label"]
          ;
          tag += `<li data-id="${feature.getId()}" ><a href="javascript:void(0);">[${
            this.params["title"]
          }] ${text}</a></li>`;
        } else {
          console.log(
            `데이터가 정의되지 않았습니다. Store에 데이터를 정의하여 주십시오.`
          );
        }
      });
      $(".search-list", this.selector).html(tag);

      new Paging(`${this.selector} .pagination`, this.params, (page) => {
        this.params["page"] = page;
        this.search();
      });

      $(".search-empty", this.selector).hide();
      $(".searchResult-wrap", this.selector).show();
    }
  }

  /**
   * 도형 표시
   * @param {string} id 아이디
   */
  showFeature(id) {
    const findFeature = this.features.find((feature) => feature.getId() == id);
    const format = new ol.format.WKT();
    const wkt = format.writeGeometry(findFeature.getGeometry());
    console.log('wkk ', wkt);
    cmmUtil.moveGeometry(wkt);
  }
}
