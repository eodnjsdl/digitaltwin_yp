/**
 * 시설물
 */
class Facility {
  /**
   * 생성자
   */
  constructor() {
    this.container = container;
  }

  /**
   * 공간객체 타입 가져오기
   * @returns 공간객체
   */
  getFeatureType() {
    return this.featureType;
  }

  /**
   * 공간 타입 가져오기
   * @returns
   */
  getGeometryType() {
    return this.geometryType;
  }

  /**
   * 컬럼 목록 가져오기
   * @returns 컬럼 목록
   */
  getColumns() {
    return this.columns;
  }

  /**
   * 아이콘 가져오기
   * @returns 아이콘 목록
   */
  getIcons() {
    return this.icons;
  }
}

/**
 * 시설물 공통
 */
class FacilityCommon {
  /**
   * 생성자
   * @param {string} container 컨테이너
   */
  constructor(container) {
    this.container = container;
    this.title = null;
    this.featureType = null;
    this.icons = null;
    this.columns = null;
    this.codes = {};
    this.params = {
      listSize: 10,
      pageSize: 5,
      filter: null,
    };
    this.detail = null;
  }

  /**
   * UI 초기화
   */
  initUi() {
    // 제목 표시
    $(".popup-header", this.container).text(this.title);
    $("#bottomPopup .manualBtn").attr("onclick", 'manualTab("' + this.title.replace('관리', '시설') + '")');

    // 시설물 목록 표시
    this.renderFacility();
  }

  /**
   * 시설물 표시
   */
  renderFacility() {
    const tag = this.list.map(
      (item) => `<option value="${item["value"]}">${item["title"]}</option>`
    );
    $(".facility-select", this.container).html(tag);
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 초기화
    $(".popup-reset", that.container).on("click", function () {
      $(".facility-select", that.container).trigger("change");
    });

    // 접기/펼치기
    $(".popup-bottom-toggle", that.container).on("click", function () {
      const node = $(this);
      const divNode = node.closest("div.popup-panel");
      if (divNode.is(".fold")) {
        node.attr("title", "펼치기");
        divNode.removeClass("fold");
      } else {
        node.attr("title", "접기");
        divNode.addClass("fold");
      }
    });

    // 시설물 선택
    $(".facility-select", that.container).on("change", function () {
      cmmUtil.drawClear();
      const node = $(this);
      const val = node.val();
      const obj = that.getObjByName(val);
      const featureType = obj.getFeatureType();
      const geometryType = obj.getGeometryType();
      const columns = obj.getColumns();
      that.icons = obj.getIcons();
      that.params = {
        listSize: 10,
        pageSize: 5,
        filter: null,
      };
      that.loadCodes(columns).done(() => {
        if (that.detail) {
          that.detail.destroy();
          this.detail = null;
        }
        that.renderSearch(columns);
        that.loadFacility(featureType, geometryType, columns);
      });
    });

    // 검색영역지정 변경 (현재화면영역, 사용자정의)
    $("[name=rad-facility-area]", that.container).on("change", function () {
      const node = $(this);
      const value = node.val();
      if (value == "extent") {
        $(".space-facility-area", that.container).hide();
      } else {
        $(".space-facility-area", that.container).show();
        $("[name=rad-facility-drawing]:first", that.container).trigger("click");
      }
    });

    // 사용자 정의 검색 조건
    $("[name=rad-facility-drawing]", that.container).on("click", function () {
      const node = $(this);
      const value = node.val();
      that.searchDrawing(value);
    });

    // 속성 검색
    $(".facility-attribute-search", that.container).on("click", function () {
      that.searchAttribute();
      cmmUtil.drawClear();
    });
    /*$(".std_dip_max", that.container).on("keydown", function (event) {
	  if (event.keyCode == "13") {
	    $(".facility-attribute-search", that.container).trigger("click");
	  }
	});*/
    $("input[name='srv_nam']", that.container).on("keydown", function (event) {
    	if (event.keyCode == "13") {
    		$(".facility-attribute-search", that.container).trigger("click");
    	}
    });

    // 공간 검색
    $(".facility-spatial-search", that.container).on("click", function () {
      that.searchArea();
    });
    $(".area-facility-buffer", that.container).on("keydown", function (event) {
  	  if (event.keyCode == "13") {
  	    $(".facility-spatial-search", that.container).trigger("click");
  	  }
  	});
    
    // 등록
    $(".btn_add", that.container).on("click", function () {
      const title = $(
        ".facility-select option:selected",
        that.container
      ).text();
      that.detail = new FacilityDetail(
        "add",
        that.featureType,
        that.geometryType,
        title,
        that.columns,
        null,
        that.codes,
        () => {
          that.search();
        },
        () => {
          that.highlightFeatures(that.features);
        }
      );
    });

    // 엑셀
    $(".btn_excel", that.container).on("click", function () {
      that.excel();
    });

    // 삭제
    $(".btn_remove", that.container).on("click", function () {
      const checked = $(".grid-check:checked", that.container);
      if (checked.length > 0) {
        if (confirm(`선택하신 시설물을 삭제하시겠습니까?`)) {
          const formData = new FormData();
          formData.append("dataId", that.featureType);
          const ids = checked.toArray().map((element) => {
            return $(element).attr("data-fid");
          });
          formData.append("ids", ids.join(","));

          loadingShowHide("show");
          $.ajax({
            url: "/job/fcts/deleteFacility.do",
            type: "post",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
            .done((response) => {
              const result = JSON.parse(response);
              if (result["result"]) {
                alert("삭제 되었습니다.");
                that.params["page"] = 0;
                that.search();
              } else {
                alert(`삭제에 실패했습니다.`);
                console.log(result["errorMsg"]);
              }
              loadingShowHide("hide");
            })
            .fail(() => {
              alert(`삭제에 실패했습니다.`);
              loadingShowHide("hide");
            });
        }
      } else {
        alert("선택된 시설물이 없습니다. 삭제할 시설물을 체크하여 주십시오.");
      }
    });

    // 전체 선택/해제
    $(that.container).on("change", ".grid-check-all", function () {
      const node = $(this);
      const checked = node.is(":checked");
      $(".grid-check", that.container).prop("checked", checked);
    });

    // 공간 객체 선택 시 위치이동 및 상세보기
    $(".bbs-list-body table tbody", that.container).on(
      "click",
      "tr",
      function () {
        const node = $(this);
        node.siblings().removeClass("active");
        node.addClass("active");
        const id = node.attr("data-fid");
        that.showFeature(id);
        that.openDetail(id);
      }
    );

    // 3D poi클릭 이벤트 (상세보기)
	canvas.addEventListener("Fire_EventSelectedObject", function(e) {
		var fid = e.objKey;
		if(e.layerName == ("swgWrpp_POI")){ // 상수도시설, 하수도시설	
			setHighlight(e);
			const node = $('[data-fid="'+fid+'"]');
	        node.siblings().removeClass("active");
	        node.addClass("active");
	        const id = node.attr("data-fid");
	        that.showFeature(id);
	        that.openDetail(id);
	        
	        // POI 하이라이트 표시
			if(e.layerName.indexOf("swgWrpp_POI") >= 0){
				var layerList = new Module.JSLayerList(true);
				var layer = layerList.nameAtLayer(e.layerName);
				for(var i = 0; i < layer.getObjectCount(); i++) {
					var point = layer.indexAtObject(i);
					if(point.getId().replace("_on", "") == e.objKey){
						point.setHighlight(true);
					} else {
						point.setHighlight(false);
					}
				}
			}
		}
	});
	
  }

  /**
   * 코드 목록
   * @param {Array.<Object>} columns 컬럼 목록
   * @returns 코드 목록
   */
  loadCodes(columns) {
    const deferred = $.Deferred();
    const promises = [];

    const emdColumns = columns.filter((column) => column["type"] == "emd");
    emdColumns.forEach(() => {
      promises.push(store["emd"].getData());
    });

    const codeColumns = columns.filter(
      (column) => column["type"] == "code" && !column["codeData"]
    );
    codeColumns.forEach((column) => {
      promises.push(util.code.load(column["code"]));
    });

    columns.forEach((column) => {
      if (column["type"] == "code" && column["codeData"]) {
        this.codes[column["column"]] = [...column["codeData"]];
      }
    });

    Promise.all(promises).then((response) => {
      let index = 0;
      emdColumns.forEach((column) => {
        const codes = response[index++].map((feature) => {
          return {
            value: feature.get("emd_cd") + "00",
            text: feature.get("emd_kor_nm"),
          };
        });
        this.codes[column["column"]] = codes;
      });
      codeColumns.forEach((column) => {
        const codes = response[index++].map((code) => {
          return {
            value: code["code"],
            text: code["codeNm"],
          };
        });
        this.codes[column["column"]] = codes;
      });
      deferred.resolve();
    });
    return deferred;
  }

  /**
   * 속성검색 조건 표시
   */
  renderSearch(columns) {
    const tags = columns
      .filter((column) => column["search"])
      .map((column) => {
        const search = column["search"];
        if (search instanceof Object) {
          return this.getSearchTag(
            search["type"],
            column["column"],
            search["title"],
            column["step"]
          );
        } else {
          return this.getSearchTag(
            column["type"],
            column["column"],
            column["title"],
            column["step"]
          );
        }
      });
    $(".srch-tbl tbody", this.container).html(tags.join(""));
  }

  /**
   * 속성 검색 태그 가져오기
   * @param {string} type 타입
   * @param {string} name 이름
   * @param {string} title 제목
   * @param {number} step 단계
   * @returns
   */
  getSearchTag(type, name, title, step) {
    let tag = ``;
    if (type == "text") {
      tag += `<tr>`;
      tag += `  <td colspan="2">`;
      tag += `    <input type="text" name="${name}" class="form-control" onkeyup="inputKeyup()" placeholder="${title}" />`;
      tag += `  </td>`;
      tag += `</tr>`;
    } else if (type == "year") {
      tag += `<tr>`;
      tag += `  <th scope="row">${title}</th>`;
      tag += `  <td>`;
      tag += `    <select name="${name}" class="form-select">`;
      tag += `<option value="">선택</option>`;
      const now = new Date();
      const year = now.getFullYear();
      for (let i = year; i >= 1900; i--) {
        tag += `<option value="${i}">${i}년</option>`;
      }
      tag += `    </select>`;
      tag += `  </td>`;
      tag += `</tr>`;
    } else if (type == "code" || type == "emd") {
      tag += `<tr>`;
      tag += `  <th scope="row">${title}</th>`;
      tag += `  <td>`;
      tag += `    <select name="${name}" class="form-select">`;
      tag += this.getOptionsTag(name);
      tag += `    </select>`;
      tag += `  </td>`;
      tag += `</tr>`;
    } else if (type == "number") {
      const stepTag = step ? `step="${step}"` : "";
      tag += `<tr>`;
      tag += `  <th scope="row">${title}</th>`;
      tag += `  <td>`;
      tag += `    <input type="number" name="${name}_min" ${stepTag} class="form-control" value="" style="width:68px" />`;
      tag += `    <input type="number" name="${name}_max" ${stepTag} class="form-control" value="" onkeyup="inputKeyup()" style="width:68px" />`;
      tag += `  </td>`;
      tag += `</tr>`;
    } else {
      console.log(`지원되지 않는 검색 타입 입니다.`);
    }
    return tag;
  }

  /**
   * option 태그 목록 가져오기
   * @param {string} name 컬럼명
   * @returns option 태그 목록
   */
  getOptionsTag(name) {
    const tags = this.codes[name].map((code) => {
      return `<option value="${code["value"]}">${code["text"]}</option>`;
    });
    return `<option value="">선택</option>${tags.join("")}`;
  }

  /**
   * 시설물 불러오기
   * @param {string} featureType 공간객체 타입
   * @param {string} geometryType 공간 타입
   * @param {Array.<Object>} columns 컬럼 목록
   */
  loadFacility(featureType, geometryType, columns) {
    this.params["featureType"] = featureType;
    this.params["page"] = 0;
    this.featureType = featureType;
    this.geometryType = geometryType;
    this.columns = columns;
    this.search();
  }

  /**
   * 검색 영역 그리기
   * @param {string} type 타입
   */
  searchDrawing(type) {
    cmmUtil.spitalDraw(type);
  }

  /**
   * 속성 검색
   */
  searchAttribute() {
    const params = this.params;
    const filter = this.getAttributeFilter();
    params["filter"] = filter;
    params["page"] = 0;
    this.search();
  }

  /**
   * 속성 검색조건 가져오기
   * @returns {ol.format.filter} 검색조건
   */
  getAttributeFilter() {
    const filters = this.columns
      .filter((column) => column["search"])
      .filter((column) => {
        let val = null;
        if (column["type"] == "number") {
          const min = $(
            `.srch-tbl [name=${column["column"]}_min]`,
            this.container
          ).val();
          const max = $(
            `.srch-tbl [name=${column["column"]}_max]`,
            this.container
          ).val();
          val = min || max;
        } else {
          val = $(`.srch-tbl [name=${column["column"]}]`, this.container).val();
        }
        return val;
      })
      .map((column) => {
        const search = column["search"];
        const type = column["type"];
        const name = column["column"];
        let val = null;
        if (column["type"] == "number") {
          const min = $(
            `.srch-tbl [name=${column["column"]}_min]`,
            this.container
          ).val();
          const max = $(
            `.srch-tbl [name=${column["column"]}_max]`,
            this.container
          ).val();
          val = [min, max];
        } else {
          val = $(`.srch-tbl [name=${column["column"]}]`, this.container).val();
        }
        if (search instanceof Object) {
          if (search.getFilter) {
            return search.getFilter(name, val);
          } else {
            console.log(`getFilter 를 지정하여 주십시오.`);
          }
        } else {
          if (type == "text") {
            return ol.format.filter.like(name, `*${val}*`);
          } else if (type == "code") {
            return ol.format.filter.equalTo(name, val);
          } else if (type == "emd") {
            return ol.format.filter.equalTo(name, val);
          } else if (type == "number") {
            if (parseInt(val[0]) && parseInt(val[1])) {
              return ol.format.filter.between(
                name,
                parseInt(val[0]),
                parseInt(val[1])
              );
            } else if (parseInt(val[0])) {
              return ol.format.filter.greaterThanOrEqualTo(
                name,
                parseInt(val[0])
              );
            } else if (parseInt(val[1])) {
              return ol.format.filter.lessThanOrEqualTo(name, parseInt(val[1]));
            }
          } else {
            console.log(`지원되지 않는 검색 타입 입니다.`);
            return null;
          }
        }
      });

    if (filters.length == 1) {
      return filters[0];
    } else if (filters.length > 1) {
      return ol.format.filter.and(...filters);
    } else {
      return null;
    }
  }

  /**
   * 영역 검색
   */
  searchArea() {
    const params = this.params;
    const filter = this.getAreaFilter();
    if (filter) {
      params["filter"] = filter;
      params["page"] = 0;
      this.search();
    } else {
      $("[name=rad-facility-drawing]:first", this.container).trigger("click");
      alert("검색 영역을 지정하여 주십시오.");
    }
  }

  /**
   * 공간 검색조건 가져오기
   * @returns {ol.format.filter.dwithin} 검색조건
   */
  getAreaFilter() {
    const format = new ol.format.WKT();
    let buffer = $(".area-facility-buffer", this.container).val();
    const searchAreaType = $(
      "[name=rad-facility-area]:checked",
      this.container
    ).val();

    let geometry = null;
    if (searchAreaType == "extent") {
      const extent = cmmUtil.getMapExtent();
      geometry = cmmUtil.toSystemProjection(
        cmmUtil.toPolygonFromExtent(extent)
      );
    } else {
      const wkt = cmmUtil.getSelectFeatureWKT();
      if (wkt) {
        geometry = format.readGeometry(wkt);
      } else {
        return null;
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
   * 검색
   */
  search() {
    loadingShowHide("show");
    const featureType = this.params["featureType"];
    const filter = this.params["filter"];
    const listSize = this.params["listSize"];
    const page = this.params["page"];
    util.gis
      .getFeature([featureType], filter, listSize, page)
      .done((geojson) => {
        const format = new ol.format.GeoJSON();

        this.features = format.readFeatures(geojson);
        this.features.forEach((feature) => {
          feature.setGeometry(
            cmmUtil.toMapProjection(feature.getGeometry().clone())
          );
        });
        this.renderGridBody(this.features);
        this.renderGridHead();
        this.renderTotalCount(geojson.totalFeatures);

        this.params["total"] = geojson.totalFeatures;
        new Paging(`${this.container} .pagination`, this.params, (page) => {
          this.params["page"] = page;
          this.search();
        });

        this.highlightFeatures(this.features);
        loadingShowHide("hide");
        createLineArr();
      });
  }

  /**
   * 공간객체 목록 표시
   * @param {Array.<ol.Feature>} features 공간객체 목록
   */
  highlightFeatures(features) {
    const format = new ol.format.GeoJSON();
    cmmUtil.clearHighlight();

    if (this.icons) {
      if (this.icons.length == 1) {
        cmmUtil.highlightFeatures(
          format.writeFeatures(features),
          this.icons[0]["icon"],
          {
            notClear: true,
            onClick: (feature) => {
              this.openDetail(feature.getId());
              this.showFeature(feature.getId());
            },
          }
        );
      } else {
        this.icons.forEach((icon) => {
          const arr = [];
          features.forEach((feature) => {
            if (feature.get("ftr_cde") == icon["ftrCde"]) {
              arr.push(feature);
            }
          });
          if (arr.length > 0) {
            cmmUtil.highlightFeatures(format.writeFeatures(arr), icon["icon"], {
              notClear: true,
              onClick: (feature) => {
                this.openDetail(feature.getId());
                this.showFeature(feature.getId());
              },
            });
          }
        });
      }
    } else {
      cmmUtil.highlightFeatures(format.writeFeatures(features), null, {
        notClear: true,
        onClick: (feature) => {
          this.openDetail(feature.getId());
          this.showFeature(feature.getId());
        },
      });
    }
  }

  /**
   * 상세보기
   * @param {string} id 공간객체 아이디
   */
  openDetail(id) {
    const findFeature = this.features.find((feature) => feature.getId() == id);
    if (findFeature) {
      const title = $(
        ".facility-select option:selected",
        this.container
      ).text();
      this.detail = new FacilityDetail(
        "view",
        this.featureType,
        this.geometryType,
        title,
        this.columns,
        findFeature,
        this.codes,
        () => {
          this.search();
        },
        () => {
          this.highlightFeatures(this.features);
        }
      );
    }
  }

  /**
   * 엑셀 다운로드
   */
  excel() {
    const featureType = this.params["featureType"];
    const filter = this.params["filter"];
    const title = $(".facility-select option:selected", this.container).text();
    const data = encodeURIComponent(
      util.gis.getFeatureData([featureType], filter)
    );
    const columns = this.columns
      .filter((column) => column["visible"])
      .map((item) => {
        const { column, title, type, codeData, code } = item;
        return { column, title, type, codeData, code };
      });
    const columnsString = encodeURIComponent(JSON.stringify(columns));
    window.location.href = `/job/fcts/excel.do?title=${title}&columns=${columnsString}&data=${data}`;
  }

  /**
   * 총 건 수 표시
   * @param {number} totalCount 총 건 수
   */
  renderTotalCount(totalCount) {
    $(".bbs-list-num", this.container).html(`조회결과 : ${totalCount || 0}건`);
  }

  /**
   * 그리드 제목 표시
   */
  renderGridHead() {
    let tag = ``;
    /*
    tag += `<th scope="col" width="36">`;
    tag += `  <span class="form-checkbox"><span>`;
    tag += `    <input type="checkbox" id="grid-check-all" class="grid-check-all">`;
    tag += `    <label for="grid-check-all"></label>`;
    tag += `  </span></span>`;
    tag += `</th>`;
    */
    const thArray = this.columns.map((item, index) => {
      if (item["visible"]) {
        const width =
          $(
            `.bbs-list-body table tbody tr:first td:eq(${index})`
          ).outerWidth() || "";
        return `<th scope="col" width="${width}">${item["title"]}</th>`;
      } else {
        return ``;
      }
    });
    tag += thArray.join("");
    $(".bbs-list-head table thead tr", this.container).html(tag);
  }

  /**
   * 그리드 내용 표시
   * @param {Array.<Feature>} features 도형 목록
   */
  renderGridBody(features) {
    const tag = features.map((feature, index) => {
      const properties = feature.getProperties();
      let trTag = `<tr data-fid="${feature.getId()}">`;
      /*
      trTag += `<td width="36"><span class="form-checkbox"><span>`;
      trTag += `  <input type="checkbox" id="grid-check-${index}" class="grid-check" data-fid="${feature.getId()}">`;
      trTag += `  <label for="grid-check-${index}"></label>`;
      trTag += `</span></span></td>`;
      */
      const tdArray = this.columns.map((item) => {
        const align = item["align"] ? `align-${item["align"]}` : ``;
        const val = properties[item["column"]];
        if (item["visible"]) {
          if (item["format"]) {
            return this.getTdTag(item["isOnEdit"], item["format"](val));
          } else if (item["type"] == "emd" || item["type"] == "code") {
            const value = this.getCodeValue(item["column"], val, align);
            return this.getTdTag(item["isOnEdit"], value, align);
          } else {
            return this.getTdTag(item["isOnEdit"], val, align);
          }
        } else {
          return ``;
        }
      });
      trTag += tdArray.join("");
      trTag += `</tr>`;
      return trTag;
    });
    if (tag.length > 0) {
      $(".bbs-list-body table tbody", this.container).html(tag.join(""));
    } else {
      const colspan = $(".bbs-list-body table thead th", this.container).length;
      $(".bbs-list-body table tbody", this.container).html(
        `<td class="noData" colspan="#{colspan}">데이터가 없습니다.</td>`
      );
    }
  }

  /**
   * 코드 값 가져오기
   * @param {string} column 컬럼
   * @param {string} val 코드
   * @returns 코드 값
   */
  getCodeValue(column, val) {
    if (this.codes[column]) {
      const find = this.codes[column].find((code) => code["value"] == val);
      if (find) {
        return find["text"];
      } else {
        return val;
      }
    } else {
      return val;
    }
  }

  /**
   * TD 태그 가져오기
   * @param {boolean} isOnEdit 수정 여부
   * @param {Object} val 값
   * @param {string} align 정렬 클래스
   * @returns
   */
  getTdTag(isOnEdit, val, align) {
    const className = isOnEdit ? `isOnEdit` : ``;
    return `<td class="${className} ${align}" style="word-break: break-all;">${
      val || val == 0 ? val : ""
    }</td>`;
  }

  /**
   * 도형 표시
   * @param {string} id 아이디
   */
  showFeature(id) {
    const findFeature = this.features.find((feature) => feature.getId() == id);
    const format = new ol.format.WKT();
    cmmUtil.moveGeometry(format.writeGeometry(findFeature.getGeometry()));
    console.log('findFeature : ', findFeature);
    if (app2D) {
      //여기 POI 하이라이트 구현 되어야 함.
      var yMap = app2D.getYMap();
      var feature = yMap.getFeature(id); //POI id를 통해 feature 객체 조회
      var ftrCde = feature.get('ftr_cde');
      var icon = null;
      
      if(this.icons == undefined ) {
    	  return;
      } else if (this.icons.length > 0) {
          cmmUtil.setPoiHighlightRemove(); //기존 활성화 되어 있는 아이콘 모두 비활성화 해주기.
          var icon = null;
          if (this.icons.length == 1) {
            icon = this.icons[0].icon;
          } else {
            var obj = this.icons.find((data) => data.ftrCde == ftrCde);
            icon = obj.icon;
          }
          feature.set('icon', icon);
          yMap.poiIconHighlight(feature, 'on'); //POI 아이콘 하이라이트 해주기.
        }
    } else {
      cmmUtil.wrppSwg_sethigh(id);
    }
  }
}

/**
 * 시설물 상세
 */
class FacilityDetail {
  /**
   *
   * @param {string} mode 모드 `add`, `view`, `edit`
   * @param {string} featureType 공간객체 타입
   * @param {string} geometryType 공간 타입
   * @param {string} title 제목
   * @param {Array.<Object>} columns 속성 목록
   * @param {ol.Feature|undefined} feature 공간객체
   * @param {Object} codes 코드 목록
   * @param {Function} onSave 저장 시 실행할 함수
   * @param {Function} onClose 닫기 시 실행할 함수
   */
  constructor(
    mode,
    featureType,
    geometryType,
    title,
    columns,
    feature,
    codes,
    onSave,
    onClose
  ) {
    this.mode = mode;
    this.modeObj = null;
    this.featureType = featureType;
    this.geometryType = geometryType;
    this.title = title;
    this.columns = columns;
    this.feature = feature || new ol.Feature();
    this.codes = codes;
    this.onSave = onSave;
    this.onClose = onClose;
    this.properties = this.feature.getProperties();
    this.editingTool = null;

    if (mode == "add") {
      this.modeObj = new FacilityDetailAdd();
      this.properties = this.modeObj.getProperties(columns);
    } else if (mode == "view") {
      this.modeObj = new FacilityDetailView();
    } else if (mode == "edit") {
      this.modeObj = new FacilityDetailEdit();
    }

    this.address = "";
    if (mode == "view") {
      this.getAddress(feature.getGeometry()).done((result) => {
        if (result["address"]) {
          this.address = result["address"];
        }
        this.element = this.render();
        this.bindEvents();
      });
    } else {
      this.element = this.render();
      this.bindEvents();
    }
  }

  /**
   * 소멸자
   */
  destroy() {
    cmmUtil.resetMap();
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    this.address = null;
    this.modeObj = null;
    if (this.editingTool) {
      this.editingTool.reset();
      this.editingTool = null;
    }
    this.properties = null;
    if (this.onClose) {
      this.onClose();
      this.onClose = null;
    }
    this.onSave = null;
    this.codes = null;
    this.feature = null;
    this.columns = null;
    this.title = null;
    this.geometryType = null;
    this.featureType = null;
    this.modeObj = null;
    this.mode = null;
  }

  /**
   * 주소 가져오기
   * @param {ol.geom.Geometry} geometry 공간정보
   * @returns 주소
   */
  getAddress(geometry) {
    let coordinate = null;
    if (geometry instanceof ol.geom.Point) {
      coordinate = geometry.getCoordinates();
    } else if (geometry instanceof ol.geom.MultiPoint) {
      coordinate = geometry.getPoint(0).getCoordinates();
    } else if (geometry instanceof ol.geom.LineString) {
      coordinate = geometry.getCoordinateAt(0.5);
    } else if (geometry instanceof ol.geom.MultiLineString) {
      coordinate = geometry.getLineString(0).getCoordinateAt(0.5);
    } else if (geometry instanceof ol.geom.Polygon) {
      coordinate = ol.extent.getCenter(geometry.getExtent());
    } else if (geometry instanceof ol.geom.MultiPolygon) {
      coordinate = ol.extent.getCenter(geometry.getPolygon(0).getExtent());
    } else {
      console.log(`정의되지 않은 공간 타입입니다.`);
    }
    return cmmUtil.reverseGeocoding(coordinate[0], coordinate[1]);
  }

  /**
   * 표시
   * @returns
   */
  render() {
    $(".div-failcity-detail").remove();

    let tag = ``;
    tag += `<div class="popup-panel popup-sub div-failcity-detail opened">`;
    tag += `<div class="popup-header">${this.modeObj.getTitle(
      this.title
    )}</div>`;
    tag += `  <div class="popup-body">`;
    tag += `    <div class="sub-popup-body">`;
    tag += `      <div class="data-write-wrap" style="height: 100%;">`;
    tag += `        <div class="scroll-y"><form>`;
    tag += `          <div class="data-default">`;
    tag += `            <table class="data-write">`;
    tag += `              <colgroup>`;
    tag += `                <col style="width: 23%;">`;
    tag += `                <col style="width: auto;">`;
    tag += `                <col style="width: 23%;">`;
    tag += `                <col style="width: auto;">`;
    tag += `              </colgroup>`;
    tag += `              <tbody>`;
    const columns = this.columns.filter((column) => column["isView"] != false);
    let index = 0;
    columns.forEach((column) => {
      if (index % 2 == 0) {
        tag += `<tr>`;
      }
      tag += `<th scope="row">${column["title"]}</th>`;
      const colspan =
        index % 2 == 0 && index == columns.length - 1 ? `colspan="3"` : "";
      tag += `<td ${colspan}>`;
      tag += this.modeObj.getTag(
        column,
        this.properties[column["column"]],
        this.codes
      );
      tag += `</td>`;
      if (index % 2 == 1 || index == columns.length - 1) {
        tag += `</tr>`;
      }
      index++;
    });
    tag += `            <tr>`;
    tag += `              <th scope="row">위치</th>`;
    tag += `                <td colspan="3">`;
    tag += `                  <div class="form-row">`;
    tag += `                    <div class="col"><input type="text" class="form-control txt-geometry-address" value="${this.address}" readonly="readonly"></div>`;
    if (
      (this.mode == "add" && app2D != null) ||
      (this.mode == "edit" && app2D != null)
    ) {
      tag += `                    <div class="col-auto"><button type="button" class="btn type01 bi-location btn-select-map" data-popup="space-edit-tool">지도에서 선택</button></div>`;
    }
    tag += `                  </div>`;
    tag += `                </td>`;
    tag += `            </tr>`;
    tag += `              </tbody>`;
    tag += `            </table>`;
    tag += `          </div>`;
    tag += `        </form></div>`;
    const align = this.mode == "add" ? `` : `justify-content-end`;
    tag += `        <div class="position-bottom btn-wrap ${align}">`;
    tag += this.modeObj.getButtons();
    tag += `        </div>`;
    tag += `      </div>`;
    tag += `    </div>`;
    tag += `  </div>`;
    tag += `  <button type="button" class="popup-close btn-close" title="닫기" onclick="cancelMode();"></button>`;
    tag += `</div>`;
    tag += `</div>`;
    const element = $(tag);
    $("#container").append(element);

    // 스크롤 적용
    $(".scroll-y", this.selector).mCustomScrollbar({
      scrollbarPosition: "outside",
    });

    // 날짜 적용
    $(".datepicker", element).datepicker({
      showOn: "both",
      buttonImage: "/images/icon/form-calendar.svg",
      dateFormat: "yymmdd",
    });

    return element;
  }

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 닫기
    $(".btn-close", that.element).on("click", function () {
      that.destroy();
    });

    // 취소
    $(".btn_cancel", that.element).on("click", function () {
      if (that.mode == "edit") {
        that.mode = "view";
        that.modeObj = new FacilityDetailView();
        that.element = that.render();
        that.bindEvents();
      } else {
        that.destroy();
      }
    });

    // 편집
    $(".btn_edit", that.element).on("click", function () {
      that.mode = "edit";
      that.modeObj = new FacilityDetailEdit();
      that.element = that.render();
      that.bindEvents();
    });

    // 지도에서 선택
    $(".btn-select-map", that.element).on("click", function () {
      that.editingTool = new EditingTool(
        that.geometryType,
        that.feature.getGeometry(),
        (geometry) => {
          that.feature.setGeometry(geometry);
          that.getAddress(geometry).done((result) => {
            if (result["address"]) {
              this.address = result["address"];
            } else {
              this.address = "";
            }
            $(".txt-geometry-address", that.selector).val(this.address);
          });

          const format = new ol.format.WKT();
          cmmUtil.highlightGeometry(format.writeGeometry(geometry));

          that.editingTool = null;
        }
      );
    });

    // 등록
    $(".btn_add", that.element).on("click", function () {
      that.add();
    });

    // 저장
    $(".btn_save", that.element).on("click", function () {
      that.save();
    });

    // 삭제
    $(".btn_delete", that.element).on("click", function () {
      if (confirm("삭제하시겠습니까?")) {
        that.remove();
      }
    });
  }

  /**
   * 등록
   */
  add() {
    if (!this.feature.getGeometry()) {
      alert("위치를 등록하여 주십시오.");
      return false;
    }

    const params = $("form", this.element).serializeArray();
    params.forEach((param) => {
      if (param.value) {
        this.feature.set(param.name, param.value);
      }
    });

    const warnColumns = this.columns.filter((column) => {
      if (column["required"] && !this.feature.get(column["column"])) {
        return true;
      }
    });

    const validColumns = this.columns.filter((column) => {
      if (column["valid"]) {
        if (column["valid"] == "int") {
          const value = this.feature.get(column["column"]);
          if (value) {
            const regexp = /^[0-9]*$/;
            return !regexp.test(value);
          }
        }
      }
    });

    const format = new ol.format.GeoJSON();
    const geojson = format.writeFeature(this.feature);
    const data = { dataId: this.featureType, geojson: geojson };

    if (warnColumns.length > 0) {
      const titles = warnColumns.map((column) => column["title"]);
      alert(`[${titles.join()}] 필수입니다.`);
    } else if (validColumns.length > 0) {
      const titles = validColumns.map((column) => column["title"]);
      alert(`[${titles.join()}] 정수만 입력 가능합니다.`);
    } else {
      loadingShowHide("show");
      $.post("/job/fcts/insertFacility.do", data)
        .done((response) => {
          const result = JSON.parse(response);
          if (result["result"]) {
            alert("등록 되었습니다.");
            if (this.onSave) {
              this.onSave();
            }
            this.destroy();
          } else {
            alert(`등록에 실패했습니다.`);
            console.log(result["errorMsg"]);
          }
          loadingShowHide("hide");
        })
        .fail(() => {
          alert(`등록에 실패했습니다.`);
          loadingShowHide("hide");
        });
    }
  }

  /**
   * 저장
   */
  save() {
    if (!this.feature.getGeometry()) {
      alert("위치를 등록하여 주십시오.");
      return false;
    }

    const params = $("form", this.element).serializeArray();
    params.forEach((param) => {
      if (param.value) {
        this.feature.set(param.name, param.value);
      }
    });

    const warnColumns = this.columns.filter((column) => {
      if (column["required"] && !this.feature.get(column["column"])) {
        return true;
      }
    });

    const validColumns = this.columns.filter((column) => {
      if (column["valid"]) {
        if (column["valid"] == "int") {
          const value = this.feature.get(column["column"]);
          if (value) {
            const regexp = /^[0-9]*$/;
            return !regexp.test(value);
          }
        }
      }
    });

    const format = new ol.format.GeoJSON();
    const geojson = format.writeFeature(this.feature);
    const data = { dataId: this.featureType, geojson: geojson };

    if (warnColumns.length > 0) {
      const titles = warnColumns.map((column) => column["title"]);
      alert(`[${titles.join()}] 필수입니다.`);
    } else if (validColumns.length > 0) {
      const titles = validColumns.map((column) => column["title"]);
      alert(`[${titles.join()}] 정수만 입력 가능합니다.`);
    } else {
      loadingShowHide("show");
      $.post("/job/fcts/updateFacility.do", data)
        .done((response) => {
          const result = JSON.parse(response);
          if (result["result"]) {
            alert("수정 되었습니다.");
            if (this.onSave) {
              this.onSave();
            }
            $(".btn_cancel", this.element).trigger("click");
          } else {
            alert(`수정에 실패했습니다.`);
            console.log(result["errorMsg"]);
          }
          loadingShowHide("hide");
        })
        .fail(() => {
          alert(`수정에 실패했습니다.`);
          loadingShowHide("hide");
        });
    }
  }

  /**
   * 삭제
   */
  remove() {
    loadingShowHide("show");
    const formData = new FormData();
    formData.append("dataId", this.featureType);
    formData.append("ids", this.feature.getId());

    $.ajax({
      url: "/job/fcts/deleteFacility.do",
      type: "post",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
    })
      .done((response) => {
        const result = JSON.parse(response);
        if (result["result"]) {
          alert("삭제 되었습니다.");
          if (this.onSave) {
            this.onSave();
          }
          this.destroy();
        } else {
          alert(`삭제에 실패했습니다.`);
          console.log(result["errorMsg"]);
        }
        loadingShowHide("hide");
      })
      .fail(() => {
        alert(`삭제에 실패했습니다.`);
        loadingShowHide("hide");
      });
  }
}

/**
 * 시설물 등록
 */
class FacilityDetailAdd {
  /**
   * 기본 값 가져오기
   * @param {Array.<Object>} columns 컬럼 목록
   * @returns 속성 목록
   */
  getProperties(columns) {
    const properties = {};
    columns
      .filter((column) => column["default"])
      .forEach((column) => {
        properties[column["column"]] = column["default"];
      });
    return properties;
  }

  /**
   * 제목 가져오기
   * @param {string} title 제목
   * @returns 포맷된 제목
   */
  getTitle(title) {
    return `${title} 등록하기`;
  }

  /**
   * Tag 가져오기
   * @param {Object} column 컬럼
   * @param {Object} value 값
   * @param {Object} codes 코드 목록
   * @returns
   */
  getTag(column, value, codes) {
    const readonly = column["isEdit"] == false ? `readonly="readonly"` : "";
    const maxLength = column["maxLength"]
      ? `maxLength="${column["maxLength"]}"`
      : ``;
    const min = column["min"] ? `min="${column["min"]}"` : ``;
    const max = column["max"] ? `max="${column["max"]}"` : ``;
    const step = column["step"] ? `step="${column["step"]}"` : ``;
    const type = column["type"];
    if (type == "number") {
      return `<input type="number" name="${
        column["column"]
      }" class="form-control" value="${
        value || value == 0 ? value : ""
      }" ${readonly} ${min} ${max} ${step} />`;
    } else if (type == "text") {
      return `<input type="text" name="${
        column["column"]
      }" class="form-control" value="${
        value || ""
      }" ${readonly} ${maxLength} />`;
    } else if (type == "code" || type == "emd") {
      let tag = ``;
      tag += `<select name="${column["column"]}" class="form-select" ${readonly} >`;
      tag += this.getOptionsTag(
        column["column"],
        codes,
        value,
        column["required"]
      );
      tag += `</select>`;
      return tag;
    } else if (type == "date") {
      return `<input type="text" name="${
        column["column"]
      }" class="form-control datepicker" value="${value || ""}" ${readonly} />`;
    } else {
      console.log(`${type} 지원되지 않는 타입입니다.`);
      return ``;
    }
  }

  /**
   * option 태그 목록 가져오기
   * @param {string} name 컬럼명
   * @param {Object} codes 코드 목록
   * @param {Object} value 값
   * @param {boolean} required 필수 여부
   * @returns option 태그 목록
   */
  getOptionsTag(name, codes, value, required) {
    const tags = codes[name].map((code) => {
      const selected = code["value"] == value ? `selected="selected"` : ``;
      return `<option value="${code["value"]}" ${selected}>${code["text"]}</option>`;
    });
    if (required) {
      return `${tags.join("")}`;
    } else {
      return `<option value="">선택</option>${tags.join("")}`;
    }
  }

  /**
   * 버튼 가져오기
   * @returns
   */
  getButtons() {
    let tag = ``;
    tag += `<div>`;
    tag += `  <button type="button" class="btn basic bi-edit btn_add">등록</button>`;
    tag += `  <button type="button" class="btn basic bi-cancel btn_cancel">취소</button>`;
    tag += `</div>`;
    return tag;
  }
}

/**
 * 시설물 보기
 */
class FacilityDetailView {
  /**
   * 제목 가져오기
   * @param {string} title 제목
   * @returns 포맷된 제목
   */
  getTitle(title) {
    return `${title} 상세보기`;
  }

  /**
   * Tag 가져오기
   * @param {Object} column 컬럼
   * @param {Object} value 값
   * @param {Object} codes 코드 목록
   * @returns
   */
  getTag(column, value, codes) {
    const type = column["type"];
    if (column["format"]) {
      return column["format"](value);
    } else if (type == "code" || type == "emd") {
      const findCode = codes[column["column"]].find(
        (code) => code["value"] == value
      );
      if (findCode) {
        return findCode["text"];
      } else {
        return value || "";
      }
    } else {
      return value || "";
    }
  }

  /**
   * 버튼 가져오기
   * @returns
   */
  getButtons() {
    let tag = ``;
    tag += `<div>`;
    tag += `  <button type="button" class="btn basic bi-edit btn_edit">수정</button>`;
    tag += `  <button type="button" class="btn basic bi-delete2 btn_delete">삭제</button>`;
    tag += `  <button type="button" class="btn basic bi-cancel btn_cancel">취소</button>`;
    tag += `</div>`;
    return tag;
  }
}

/**
 * 시설물 편집
 */
class FacilityDetailEdit {
  /**
   * 제목 가져오기
   * @param {string} title 제목
   * @returns 포맷된 제목
   */
  getTitle(title) {
    return `${title} 수정하기`;
  }

  /**
   * Tag 가져오기
   * @param {Object} column 컬럼
   * @param {Object} value 값
   * @param {Object} codes 코드 목록
   * @returns
   */
  getTag(column, value, codes) {
    const readonly = column["isEdit"] == false ? `readonly="readonly"` : "";
    const maxLength = column["maxLength"]
      ? `maxLength="${column["maxLength"]}"`
      : ``;
    const min = column["min"] ? `min="${column["min"]}"` : ``;
    const max = column["max"] ? `max="${column["max"]}"` : ``;
    const step = column["step"] ? `step="${column["step"]}"` : ``;
    const type = column["type"];
    if (column["isEdit"] == false) {
      if (column["format"]) {
        return column["format"](value);
      } else if (type == "code" || type == "emd") {
        const findCode = codes[column["column"]].find(
          (code) => code["value"] == value
        );
        if (findCode) {
          return findCode["text"];
        } else {
          return value || "";
        }
      } else {
        return value || value == 0 ? value : "";
      }
    } else {
      if (type == "number") {
        return `<input type="number" name="${
          column["column"]
        }" class="form-control" value="${
          value || value == 0 ? value : ""
        }" ${readonly} ${min} ${max} ${step} />`;
      } else if (type == "text") {
        return `<input type="text" name="${
          column["column"]
        }" class="form-control" value="${
          value || ""
        }" ${readonly} ${maxLength} />`;
      } else if (type == "code" || type == "emd") {
        let tag = ``;
        tag += `<select name="${column["column"]}" class="form-select" ${readonly} >`;
        tag += this.getOptionsTag(
          column["column"],
          codes,
          value,
          column["required"]
        );
        tag += `</select>`;
        return tag;
      } else if (type == "date") {
        return `<input type="text" name="${
          column["column"]
        }" class="form-control datepicker" value="${
          value || ""
        }" ${readonly} />`;
      } else {
        console.log(`${type} 지원되지 않는 타입입니다.`);
        return ``;
      }
    }
  }

  /**
   * option 태그 목록 가져오기
   * @param {string} name 컬럼명
   * @param {Object} codes 코드 목록
   * @param {Object} value 값
   * @param {boolean} required 필수 여부
   * @returns option 태그 목록
   */
  getOptionsTag(name, codes, value, required) {
    const tags = codes[name].map((code) => {
      const selected = code["value"] == value ? `selected="selected"` : ``;
      return `<option value="${code["value"]}" ${selected}>${code["text"]}</option>`;
    });
    if (required) {
      return `${tags.join("")}`;
    } else {
      return `<option value="">선택</option>${tags.join("")}`;
    }
  }

  /**
   * 버튼 가져오기
   * @returns
   */
  getButtons() {
    let tag = ``;
    tag += `<div>`;
    tag += `  <button type="button" class="btn basic bi-write2 btn_save">수정완료</button>`;
    tag += `  <button type="button" class="btn basic bi-cancel btn_cancel">취소</button>`;
    tag += `</div>`;
    return tag;
  }
}

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

function inputKeyup() {
	if (event.keyCode == "13") {
	  $(".facility-attribute-search").trigger("click");
    }
}