/**
 * 레이어 스타일
 */
const layerStyle = {
  /**
   * 불러오기
   * @param {string} layerName 레이어명
   */
  load: function (layerName) {
    this.layerName = layerName;
    const findLayer = store.facility
      .getData()
      .find((layer) => layer["tblNm"] === layerName);
    if (findLayer) {
      this.type = findLayer["lyrDtlKnd"];
      if (findLayer["styleInfo"]) {
        this.style = $.extend({}, util.sld.readSld(findLayer["styleInfo"]));
        this.rule = null;
        this.initUi();
        this.bindEvents();
        this.renderRules();
        $(".style_rules .div_rule_name:first").trigger("click");
        $(`[data-tab=layerStyle]`).show();
        $(`[data-tab=layerLabel]`).hide();
      } else {
        this.style = "";
        this.rule = null;
        $(`[data-tab=layerStyle]`).hide();
        $(`[data-tab=layerLabel]`).hide();
      }
    } else {
      console.log(`[${layerName}] 레이어 정보가 없습니다.`);
    }
  },

  /**
   * UI 초기화
   */
  initUi: function () {
    $(".toggle_style").hide();
    if (this.type === "P") {
      $(".style_point").show();
    } else if (this.type === "L") {
      $("#style_stroke_checkbox").prop("checked", true);
      $("#style_stroke_checkbox").prop("disabled", true);
      $(".style_stroke").show();
    } else if (this.type === "A") {
      $("#style_stroke_checkbox").prop("disabled", false);
      $(".style_stroke").show();
      $(".style_fill").show();
    } else {
      console.log(`${this.type} 정의되지 않은 공간 타입입니다.`);
    }

    // 선 색상
    $(".style-stroke-color").minicolors({
      control: "hue",
      format: "hex",
      theme: "default",
      opacity: false,
      swatches: [],
      change: (hex) => {
        if (this.rule) {
          if (this.rule["line"] && this.rule["line"]["stroke"]) {
            this.rule["line"]["stroke"]["stroke"] = hex;
          } else if (this.rule["polygon"]) {
            if (!this.rule["polygon"]["stroke"]) {
              this.rule["polygon"]["stroke"] = {};
            }
            this.rule["polygon"]["stroke"]["stroke"] = hex;
          }
        }
      },
    });

    // 면 색상
    $(".style-fill-color").minicolors({
      control: "hue",
      format: "hex",
      theme: "default",
      opacity: false,
      swatches: [],
      change: (hex) => {
        if (this.rule) {
          if (this.rule["polygon"]) {
            if (!this.rule["polygon"]["fill"]) {
              this.rule["polygon"]["fill"] = {};
            }
            this.rule["polygon"]["fill"]["fill"] = hex;
          }
        }
      },
    });

    // 유효 축척
    $(".style-scale").slider({
      range: true,
      min: 6,
      max: 19,
      step: 1,
      values: [6, 19],
      create: function () {
        const node = $(this);
        const values = node.slider("values");
        $(".value-num").val(values.join("-"));
      },
      slide: (event, ui) => {
        const values = ui.values;
        $(".value-num").val(values.join("-"));
        if (this.rule) {
          this.rule["maxScale"] = util.sld.getMaxScaleFromZoom(values[0]);
          this.rule["minScale"] = util.sld.getMinScaleFromZoom(values[1]);
        }
      },
    });
  },

  /**
   * 레이어명 가져오기
   * @returns 레이어명
   */
  getLayerName: function () {
    return this.layerName;
  },

  /**
   * 규칙 표시
   */
  renderRules: function () {
    const tags = this.style.rules.map((rule, index) => {
      let tag = ``;
      tag += `<tr>`;
      if (this.type === "P") {
        if (
          rule["point"] &&
          rule["point"]["graphic"] &&
          rule["point"]["graphic"]["externalGraphic"] &&
          rule["point"] &&
          rule["point"]["graphic"] &&
          rule["point"]["graphic"]["externalGraphic"]["href"]
        ) {
          const src = rule["point"]["graphic"]["externalGraphic"]["href"];
          tag += `  <td><span class="layer-symbol"><img src="./images/poi/${src}" style="width:29px;height:29px;" /></span></td>`;
        } else {
          tag += `  <td><span class="layer-symbol"><img src="./images/poi/icon1.png" style="width:29px;height:29px;" /></span></td>`;
        }
      } else if (this.type === "L") {
        const stroke = rule["line"]["stroke"];
        const strokeColor = stroke["stroke"] || "#ff0000";
        tag += `  <td><span class="layer-symbol stroke" style="background-color:${strokeColor};"></span></td>`;
      } else if (this.type === "A") {

        if (rule["polygon"] !== undefined) {
          const stroke = rule["polygon"]["stroke"] || {};
          const strokeColor = stroke["stroke"] || "#ff0000";
          const fill = rule["polygon"]["fill"] || {};
          const fillColor = fill["fill"] || "#ffffff";
          tag += `  <td><span class="layer-symbol rectangle" style="background-color:${fillColor};border:1px solid ${strokeColor};border-radius:1px;"></span></td>`;
        }
        if (rule["line"] !== undefined) {
          const stroke = rule["line"]["stroke"];
          const strokeColor = stroke["stroke"] || "#ff0000";
          tag += `  <td><span class="layer-symbol stroke" style="background-color:${strokeColor};"></span></td>`;
        }
      } else {
        console.log(`지원되지 않는 공간 타입입니다.`);
      }
      tag += `  <td>`;
      tag += `    <div class="d-flex align-items-center justify-content-between">`;
      tag += `      <div class="div_rule_name" data-index="${index}">${rule["name"]}</div>`;
      tag += `      <div>`;
      //tag += `        <button type="button" class="icon-btn sm add" title="추가"></button>`;
      //tag += `        <button type="button" class="icon-btn sm copy" title="복사"></button>`;
      //tag += `        <button type="button" class="icon-btn sm delete" title="삭제"></button>`;
      tag += `      </div>`;
      tag += `    </div>`;
      tag += `  </td>`;
      tag += `</tr>`;
      return tag;
    });
    $(".style_rules").html(tags.join(""));
  },

  /**
   * 이벤트 연결
   */
  bindEvents() {
    const that = this;

    // 이미지
    $(`.layerStyle .symbol-group button`).on("click", function () {
      const node = $(this);
      node.siblings().removeClass("active");
      node.addClass("active");
      if (
        that.rule["point"] &&
        that.rule["point"]["graphic"] &&
        that.rule["point"]["graphic"]["externalGraphic"] &&
        that.rule["point"] &&
        that.rule["point"]["graphic"] &&
        that.rule["point"]["graphic"]["externalGraphic"]["href"]
      ) {
        that.rule["point"]["graphic"]["externalGraphic"][
          "href"
        ] = node.find("img")[0].src;
      }
    });

    // 규칙 선택 시 스타일 표시
    $(".style_rules").on("click", ".div_rule_name", function () {
      const node = $(this);
      const trNode = node.closest("tr");
      trNode.siblings().removeClass("active");
      trNode.addClass("active");

      const index = node.attr("data-index");
      that.renderStyle(index);
    });

    // 입력 값 변경 시 스타일 변경
    $("input[name],select[name]").on("change", function () {
      const node = $(this);
      const name = node.attr("name");
      const val = node.val();
      if (that.rule) {
        if (that.rule["line"] && that.rule["line"]["stroke"]) {
          that.rule["line"]["stroke"][name] = val;
        } else if (that.rule["polygon"] && that.rule["polygon"]["stroke"]) {
          that.rule["polygon"]["stroke"][name] = val;
        }
      }
    });

    // 테두리
    $("#style_stroke_checkbox").on("change", function () {
      const node = $(this);
      if (that.rule["polygon"]) {
        if (node.prop("checked")) {
          if (!that.rule["polygon"]["stroke"]) {
            that.rule["polygon"]["stroke"] = {};
          }
          that.rule["polygon"]["stroke"]["stroke"] = $(
            ".style-stroke-color"
          ).minicolors("value");
          that.rule["polygon"]["stroke"]["stroke-width"] = $(
            "[name=stroke-width]"
          ).val();
          that.rule["polygon"]["stroke"]["stroke-dasharray"] = $(
            "[name=stroke-dasharray]"
          ).val();
        } else {
          if (that.rule["polygon"]["stroke"]) {
            delete that.rule["polygon"]["stroke"];
          }
        }
      }
    });

    // 채우기
    $("#style_fill_checkbox").on("change", function () {
      const node = $(this);
      if (that.rule["polygon"]) {
        if (node.prop("checked")) {
          if (!that.rule["polygon"]["fill"]) {
            that.rule["polygon"]["fill"] = {};
          }
          that.rule["polygon"]["fill"]["fill"] = $(
            ".style-fill-color"
          ).minicolors("value");
        } else {
          if (that.rule["polygon"]["fill"]) {
            delete that.rule["polygon"]["fill"];
          }
        }
      }
    });
  },

  /**
   * 스타일 표시
   * @param {number} index 인덱스
   */
  renderStyle(index) {
    if (this.style) {
      if (this.style["rules"] && this.style["rules"].length > 0) {
        this.rule = this.style["rules"][index];
        const minZoom = this.rule["maxScale"]
          ? util.sld.getZoomFromMaxScale(this.rule["maxScale"])
          : 6;
        const maxZoom = this.rule["minScale"]
          ? util.sld.getZoomFromMinScale(this.rule["minScale"])
          : 22;
        const values = [minZoom, maxZoom];
        $(".style-scale").slider("values", values);
        $(".value-num").val(values.join("-"));

        if (
          this.rule["point"] &&
          this.rule["point"]["graphic"] &&
          this.rule["point"]["graphic"]["externalGraphic"] &&
          this.rule["point"] &&
          this.rule["point"]["graphic"] &&
          this.rule["point"]["graphic"]["externalGraphic"]["href"]
        ) {
          const src = this.rule["point"]["graphic"]["externalGraphic"]["href"];
          const icon = src.split(".")[0];
          $(`.layerStyle .symbol-group img[data-icon=${icon}]`)
            .closest("button")
            .trigger("click");
        } else if(this.rule["mark"]) {
          const mark = this.rule["mark"];
          debugger;
        } else if (this.rule["line"]) {
          const stroke = this.rule["line"]["stroke"];
          this.setValues(stroke);
        } else if (this.rule["polygon"]) {
          const stroke = this.rule["polygon"]["stroke"];
          $("#style_stroke_checkbox").prop("checked", stroke ? true : false);
          this.setValues(stroke || { stroke: "#ff0000" });
          const fill = this.rule["polygon"]["fill"];
          $("#style_fill_checkbox").prop("checked", fill ? true : false);
          this.setValues(fill || { fill: "#0000ff" });
        }
      } else {
        console.log("규칙 목록이 없습니다.");
      }
    } else {
      console.log("스타일이 없습니다.");
    }
  },

  /**
   * 값 목록 설정
   * @param {Object} obj 스타일
   */
  setValues(obj) {
    const selector = $(".layerStyle");
    for (const [key, value] of Object.entries(obj)) {
      $(`[name=${key}]`, selector).closest("div.items").show();
      if (key === "stroke" || key === "fill") {
        $(`[name=${key}]`, selector).minicolors("value", value);
      } else {
        if ($(`[name=${key}]`, selector).length > 0) {
          $(`[name=${key}]`, selector).val(value);
        }
      }
    }
  },

  /**
   * 스타일 정보 가져오기
   * @returns 스타일 정보
   */
  getStyleInfo() {
    if (this.style) {
      return util.sld.writeSld(this.style);
    } else {
      return "";
    }
  },
};
