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
        store.facility.loadAll().then(() => {
            const findLayer = store.facility
                .getData()
                .find((layer) => layer["tblNm"] === layerName);
            if (findLayer) {
                this.type = findLayer["lyrDtlKnd"];
                $(`[name="text-useat"]`).prop('checked', false);
                if (findLayer["styleInfo"]) {
                    this.style = $.extend({}, util.sld.readSld(findLayer["styleInfo"]));
                    this.rule = null;
                    this.initUi();
                    this.bindEvents();
                    this.renderRules();
                    $(".style_rules .div_rule_name:first").trigger("click");
                    $(`[data-tab=layerStyle]`).show();
                } else {
                    this.style = "";
                    this.rule = null;
                    $(`[data-tab=layerStyle]`).hide();

                }
            } else {
                console.log(`[${layerName}] 레이어 정보가 없습니다.`);
            }
        })
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

        //투명도 슬라이더
        $(".style-fill-color-opacity").slider({
            range: "min",
            min: 0,
            max: 1,
            value: 1,
            step: 0.05,
            create: (event, ui) => {
                const node = $(event.target);
                const value = node.closest('.drawing-slider-box').find('input[name="fill-opacity"]').val()
                node.slider('value', value);
            },
            change: (event, ui) => {
                const $handle = $(ui.handle);
                const $box = $handle.closest('.drawing-slider-box');
                $box.find(".value-num").val(ui.value);
                $box.find('input[name="fill-opacity"]').val(ui.value);
                if (this.rule) {
                    this.rule["polygon"] = this.rule["polygon"] || {};
                    this.rule["polygon"]["fill"] = this.rule["polygon"]["fill"] || {};
                    this.rule["polygon"]["fill"]["fill-opacity"] = ui.value;
                }
            }
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
                const $handle = $(ui.handle);
                $handle.closest('.drawing-slider-box').find(".value-num").val(values.join("-"));
            },
            slide: (event, ui) => {
                const values = ui.values;
                const $handle = $(ui.handle);
                $handle.closest('.drawing-slider-box').find(".value-num").val(values.join("-"));
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
            if (rule.name === 'Label') {
                return;
            }

            let tag = ``;
            tag += `<tr>`;
            const point = rule['point'];
            const polygon = rule['polygon'];
            const line = rule['line'];

            if (point) {
                if (
                    point &&
                    point["graphic"] &&
                    point["graphic"]["externalGraphic"] &&
                    point &&
                    point["graphic"] &&
                    point["graphic"]["externalGraphic"]["href"]
                ) {
                    const src = point["graphic"]["externalGraphic"]["href"];
                    tag += `  <td><span class="layer-symbol"><img src="./images/poi/${src}" style="width:29px;height:29px;" /></span></td>`;
                } else {
                    tag += `  <td><span class="layer-symbol"><img src="./images/poi/icon1.png" style="width:29px;height:29px;" /></span></td>`;
                }
            }

            if (polygon) {
                const stroke = polygon["stroke"] || {};
                const strokeColor = stroke["stroke"] || "#ff0000";
                const fill = polygon["fill"] || {};
                const fillColor = fill["fill"] || "#ffffff";
                tag += `  <td><span class="layer-symbol rectangle" style="background-color:${fillColor};border:1px solid ${strokeColor};border-radius:1px;"></span></td>`;
            }

            if (line) {
                const stroke = line["stroke"] || {};
                const strokeColor = stroke["stroke"] || "#ff0000";
                tag += `  <td><span class="layer-symbol stroke" style="background-color:${strokeColor};"></span></td>`;
            }


            /* if (this.type === "P") {
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
                 const stroke = rule["line"]["stroke"] || {};
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
             }*/
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
            const icon = node.find("img").attr("data-icon");
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
                    ] = `${icon}.png`;
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
            console.log(name);
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
                    that.rule["polygon"]["fill"]["fill"] = $(".style-fill-color").minicolors("value");
                    that.rule["polygon"]["fill"]["fill-opacity"] = $(".style-fill-color-opacity").val();
                } else {
                    if (that.rule["polygon"]["fill"]) {
                        delete that.rule["polygon"]["fill"];
                    }
                }
            }
        });


    },
    getTextStyle() {
        const selector = $(".layerLabel");
        const useAt = $('input[name="text-useat"]', selector).prop('checked');
        if (!useAt) {
            return;
        }
        const font = {
            'font-family': $('[name="font-family"]', selector).val(),
            'font-size': $('[name="font-size"]', selector).val(),
            'font-style': $('[name="font-style"]', selector).val(),
            'font-weight': $('[name="font-weight"]', selector).val(),

        }

        const fill = {
            'fill': rgbToHex($('[name="text-fill"]', selector).val())
        }

        const halo = {
            'fill': {'fill': rgbToHex($('[name="halo-fill"]', selector).val())},
            'radius': $('[name="halo-radius"]', selector).val(),
        }

        let label
        $('.data-write tr', '#layerInfoForm').each(function (i, v) {
            const colum = $(v).find('td:eq(1)').text();
            const checked = $(v).find('[name="eprssAt"]').prop('checked');
            if (checked) {
                label = colum;
            }
        });

        function rgbToHex(rgbType) {
            /*
            ** 컬러값과 쉼표만 남기고 삭제하기.
            ** 쉼표(,)를 기준으로 분리해서, 배열에 담기.
            */
            var rgb = rgbType.replace(/[^%,.\d]/g, "").split(",");

            rgb.forEach(function (str, x, arr) {

                /* 컬러값이 "%"일 경우, 변환하기. */
                if (str.indexOf("%") > -1) str = Math.round(parseFloat(str) * 2.55);

                /* 16진수 문자로 변환하기. */
                str = parseInt(str, 10).toString(16);
                if (str.length === 1) str = "0" + str;

                arr[x] = str;
            });

            return "#" + rgb.join("");
        }

        return {
            font: font,
            halo: halo,
            fill: fill,
            label: label,
            anchor: {
                anchorPointX: $('[name="anchor-x"]', selector).val(),
                anchorPointY: $('[name="anchor-y"]', selector).val()
            }
        }
    },
    /**
     * 스타일 표시
     * @param {number} index 인덱스
     */
    renderStyle(index) {
        if (this.style) {
            if (this.style["rules"] && this.style["rules"].length > 0) {
                this.rule = this.style["rules"][index];
                const minZoom = this.rule["maxScale"] ? util.sld.getZoomFromMaxScale(this.rule["maxScale"]) : 6;
                const maxZoom = this.rule["minScale"] ? util.sld.getZoomFromMinScale(this.rule["minScale"]) : 22;
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
                } else if (this.rule["mark"]) {
                    const mark = this.rule["mark"];
                } else if (this.rule["line"]) {
                    const stroke = this.rule["line"]["stroke"];
                    this.setValues(stroke);
                } else if (this.rule["polygon"]) {
                    let stroke = this.rule["polygon"]["stroke"];
                    $("#style_stroke_checkbox").prop("checked", stroke ? true : false);
                    stroke = stroke || {'stroke': "#ff0000"};
                    this.setValues(stroke);
                    let fill = this.rule["polygon"]["fill"];
                    $("#style_fill_checkbox").prop("checked", fill ? true : false);
                    fill = fill || {'fill': "#0000ff", 'fill-opacity': 1};
                    this.setValues(fill);
                    $(".style-fill-color-opacity").slider("value", fill['fill-opacity']);
                }
                const text = this.rule["text"]
                if (text) {
                    this.setTextValue(text);
                    $('[name="text-useat"]').prop('checked', 'checked')

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

    setTextValue(text) {
        const selector = $(".layerLabel");
        const font = text['font'];
        $('[name="font-family"]', selector).val(font['font-family']);
        $('[name="font-size"]', selector).val(font['font-size']);
        $('[name="font-style"]', selector).val(font['font-style']);
        $('[name="font-weight"]', selector).val(font['font-weight']);

        const fill = text['fill'];
        $('[name="text-fill"]', selector).minicolors('value', hexToRGB(fill['fill']));

        const halo = text['halo'];
        $('[name="halo-fill"]', selector).minicolors('value', hexToRGB(halo['fill']['fill']));
        $('[name="halo-radius"]', selector).val(halo['radius']);
        const label = text['label'];

        $('.data-write tr', '#layerInfoForm').each(function (i, v) {
            const colum = $(v).find('td:eq(1)').text();
            if (colum === label) {
                $(v).find('[name="eprssAt"]').prop('checked', 'checked');
            }

        })

        const anchor = text['anchor'];
        $('[name="anchor-x"]', selector).val(anchor['anchorPointX']);
        $('[name="anchor-y"]', selector).val(anchor['anchorPointY'])

        function hexToRGB(str) {
            if (str.indexOf("#") >= 0) {
                let red = parseInt(str[1] + str[2], 16);
                let green = parseInt(str[3] + str[4], 16);
                let blue = parseInt(str[5] + str[6], 16);

                return "rgb(" + red + "," + green + "," + blue + ")";
            }
            return str;
        }
    },


    /**
     * 스타일 정보 가져오기
     * @returns 스타일 정보
     */
    getStyleInfo() {
        if (this.style) {
            this.rule['text'] = this.getTextStyle();
            return util.sld.writeSld(this.style);
        } else {
            return "";
        }
    },
};
