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


        // $('.colorPicker', '#layerInfoForm').minicolors({
        //     control: "hue",
        //     format: "hex",
        //     theme: "default",
        //     opacity: false,
        //     swatches: []
        // });

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
            max: 22,
            step: 1,
            values: [6, 22],
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
        const selector = $("#layerInfoForm");
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

        $('.style-fill-color', selector).on('change', function () {
            const node = $(this);
            if (that.type !== 'A') {
                return;
            }

            that.rule['polygon'] = _.merge(that.rule['polygon'], {
                'fill': {
                    fill: node.val()
                }
            })
        });
        $('.style-fill-color-opacity', selector).on('change', function () {
            const node = $(this);
            if (that.type !== 'A') {
                return;
            }
            that.rule['polygon'] = _.merge(that.rule['polygon'], {
                'fill': {
                    'fill-opacity': node.val()
                }
            });
        });
        $('.style-stroke-color', selector).on('change', function () {
            const node = $(this);
            if (that.type === 'P') {
                return;
            }
            const style = that.type === 'L' ? 'line' : 'polygon'
            that.rule[style] = _.merge(that.rule[style], {
                'stroke': {
                    'stroke': node.val()
                }
            });
        });
        $('[name=stroke-width]', selector).on('change', function () {
            const node = $(this);
            if (that.type === 'P') {
                return;
            }
            const style = that.type === 'L' ? 'line' : 'polygon'
            that.rule[style] = _.merge(that.rule[style], {
                'stroke': {
                    'stroke-width': node.val()
                }
            });
        });
        $('[name=stroke-dasharray]', selector).on('change', function () {
            const node = $(this);
            if (that.type === 'P') {
                return;
            }
            const style = that.type === 'L' ? 'line' : 'polygon'
            that.rule[style] = _.merge(that.rule[style], {
                'stroke': {
                    'stroke-dasharray': node.val()
                }
            });
        });

        //라벨 - 폰트
        $('[name="font-family"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'font': {
                    'font-family': node.val()
                }
            });
        });

        //라벨 - 폰트 크기
        $('[name="font-size"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'font': {
                    'font-size': node.val()
                }
            });
        });

        //라벨 - 폰트스타일
        $('[name="font-style"]', selector).on('change', function () {
            that.rule['text'] = _.merge(that.rule['text'], {
                'font': {
                    'font-style': this.checked ? 'italic' : 'normal'
                }
            });
        });

        //라벨 - 폰트 두께
        $('[name="font-weight"]', selector).on('change', function () {
            that.rule['text'] = _.merge(that.rule['text'], {
                'font': {
                    'font-weight': this.checked ? 'bold' : 'normal'
                }
            });
        });

        //라벨 - 글씨색
        $('[name="text-fill"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'fill': {
                    fill: node.val()
                }
            });
        });

        //라벨 - 배경색
        $('[name="halo-fill"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'halo': {
                    fill: {
                        fill: node.val()
                    }
                }
            });
        });

        //라벨 - 배경두께
        $('[name="halo-radius"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'halo': {
                    radius: node.val()
                }
            });
        });

        //라벨 - 앵커X
        $('[name="anchor-x"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'anchor': {
                    anchorPointX: node.val()
                }
            });
        });

        //라벨 - 앵커Y
        $('[name="anchor-y"]', selector).on('change', function () {
            const node = $(this);
            that.rule['text'] = _.merge(that.rule['text'], {
                'anchor': {
                    anchorPointY: node.val()
                }
            });
        });

        //라벨 - 사용여부
        $('[name="text-useat"]', selector).on('change', function () {
            that.getTextStyle();
            that.rule['text']['useAt'] = this.checked;
        })

        //기본정보 - 표출
        $('[name="eprssAt"]', '#layerInfoForm').on('change', function () {
            const node = $(this);
            const label = node.closest('tr').find('td:eq(1)').text()
            that.rule['text'] = _.merge(that.rule['text'], {
                'label': label
            });
        });

        // 테두리
        $("#style_stroke_checkbox").on("change", function () {
            if (that.type !== 'A') {
                return;
            }
            const node = $(this);
            if (node.prop("checked")) {
                that.rule["polygon"]["stroke"] = that.getStroke();
            } else {
                that.rule["polygon"]["stroke"] = undefined
            }
        });

        // 채우기
        $("#style_fill_checkbox").on("change", function () {
            if (that.type !== 'A') {
                return;
            }
            const node = $(this);
            if (node.prop("checked")) {
                that.rule["polygon"]['fill'] = that.getFill();
            } else {
                that.rule["polygon"]['fill'] = undefined;

            }
        });


    },

    getFill() {
        const selector = $("#layerInfoForm");
        const useFill = $('#style_fill_checkbox', selector).prop('checked');
        let fill;
        if (useFill) {
            $('[name="fill"]', selector).val();
            fill = {
                'fill': $(".style-fill-color", selector).minicolors("value"),
                'fill-opacity': $(".style-fill-color-opacity", selector).val()
            }

        }
        return fill;
    },
    getStroke() {
        const selector = $("#layerInfoForm");
        const useStroke = $('#style_stroke_checkbox', selector).prop('checked');
        let stroke;
        if (useStroke) {
            stroke = {
                'stroke': $(".style-stroke-color", selector).minicolors("value"),
                'stroke-width': $("[name=stroke-width]", selector).val(),
                'stroke-dasharray': $("[name=stroke-dasharray]", selector).val()
            }
        }
        return stroke;
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
            'font-style': $('[name="font-style"]', selector).prop('checked') ? 'italic' : 'normal',
            'font-weight': $('[name="font-weight"]', selector).prop('checked') ? 'bold' : 'normal',

        }

        const fill = {
            'fill': $('[name="text-fill"]', selector).val()
        }

        const halo = {
            'fill': {'fill': $('[name="halo-fill"]', selector).val()},
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


        this.rule['text'] = _.merge(this.rule['text'], {
            font: font,
            halo: halo,
            fill: fill,
            label: label,
            anchor: {
                anchorPointX: $('[name="anchor-x"]', selector).val(),
                anchorPointY: $('[name="anchor-y"]', selector).val()
            }
        })
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
                    this.setStroke(stroke);
                } else if (this.rule["polygon"]) {
                    let stroke = this.rule["polygon"]["stroke"];
                    $("#style_stroke_checkbox").prop("checked", stroke ? true : false);
                    if (stroke) {
                        stroke = _.merge({'stroke': "#ff0000"}, stroke);
                        this.setStroke(stroke);
                    }
                    let fill = this.rule["polygon"]["fill"];
                    $("#style_fill_checkbox").prop("checked", fill ? true : false);

                    if (fill) {
                        fill = _.merge({'fill': "#0000ff", 'fill-opacity': 1}, fill);
                        this.setFill(fill);
                    } else {
                        $(".style-fill-color-opacity").slider('value', 1);
                    }
                }
                const text = this.rule["text"]
                if (text) {
                    this.setTextValue(text);
                    this.rule["text"]['useAt'] = true;
                    $('[name="text-useat"]').prop('checked', 'checked')

                }
            } else {
                console.log("규칙 목록이 없습니다.");
            }
        } else {
            console.log("스타일이 없습니다.");
        }
    }
    ,

    /**
     * 값 목록 설정
     * @param {Object} obj 스타일
     */
    setValues(obj) {
        return;
        const that = this;
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
    setStroke(stroke) {
        const selector = $("#layerInfoForm");
        $(".style-stroke-color", selector).minicolors("value", stroke['stroke'] || '#ff0000');
        $("[name=stroke-width]", selector).val(stroke['stroke-width'] || 1);
        $("[name=stroke-dasharray]", selector).val(stroke['stroke-dasharray']);
    },
    setFill(fill) {
        const selector = $("#layerInfoForm");
        $(".style-fill-color", selector).minicolors("value", fill['fill'] || '#ffffff');
        $(".style-fill-color-opacity").slider('value', fill['fill-opacity'] || 1);
    },

    setTextValue(text) {
        const that = this;
        const selector = $(".layerLabel");
        const font = text['font'];
        $('[name="font-family"]', selector).val(font['font-family']);
        $('[name="font-size"]', selector).val(font['font-size']);
        $('[name="font-style"]', selector).prop('checked', font['font-style'] === 'italic');
        $('[name="font-weight"]', selector).prop('checked', font['font-weight'] === 'bold');

        const fill = text['fill'];
        $('[name="text-fill"]', selector).minicolors('value', fill['fill']);

        const halo = text['halo'];
        $('[name="halo-fill"]', selector).minicolors('value', halo['fill']['fill']);
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
    rgbToHex(rgbType) {
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
    },
    hexToRGB(str) {
        if (str.indexOf("#") >= 0) {
            let red = parseInt(str[1] + str[2], 16);
            let green = parseInt(str[3] + str[4], 16);
            let blue = parseInt(str[5] + str[6], 16);

            return "rgb(" + red + "," + green + "," + blue + ")";
        }
        return str;
    }
};
