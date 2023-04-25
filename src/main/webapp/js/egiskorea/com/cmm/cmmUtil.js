var cmmUtil = {

    /**
     * 좌표로 주소 가져오기 (EPSG:5179)
     * @param {number} x X 좌표
     * @param {number} y Y 좌표
     */
    reverseGeocoding: function (x, y) {
        const deferred = $.Deferred();
        const format = new ol.format.WKT();

        var position_5174 = proj4(dtmap.crs, "EPSG:5174", [x, y]); //5179좌표에서 5174로 변경

        const point_5174 = new ol.geom.Point([position_5174[0], position_5174[1]]);
        const wkt_5174 = format.writeGeometry(point_5174);

        const point_5179 = new ol.geom.Point([x, y]);
        const wkt_5179 = format.writeGeometry(point_5179);

        //$.post("/gis/reverseGeocoding.do", { wkt: wkt }
        $.post("/gis/reverseGeocoding5174.do", {wkt5174: wkt_5174, wkt5179: wkt_5179})
            .done((response) => {
                const result = JSON.parse(response)["result"];
                if (result["emdKorNm"]) {
                    let address = ``;
                    address += result["emdKorNm"] + ` `;
                    address += result["liKorNm"] + ` `;
                    address += result["mntnYn"] == "2" ? `산 ` : ``;
                    address += parseInt(result["lnbrMnnm"]);
                    address += parseInt(result["lnbrSlno"])
                        ? `-${parseInt(result["lnbrSlno"])}`
                        : ``;
                    result["address"] = address;
                }
                if (result["rn"]) {
                    let roadAddress = ``;
                    roadAddress += result["rn"] + ` `;
                    roadAddress += result["buldMnnm"];
                    roadAddress += parseInt(result["buldSlno"])
                        ? `-${parseInt(result["buldSlno"])}`
                        : ``;
                    result["roadAddress"] = roadAddress;
                }
                deferred.resolve(result);
            })
            .fail(() => {
                alert("주소 정보를 가져오는데 실패했습니다.");
            });
        return deferred;
    },

    /**
     * @description 좌표로 주소 가져오기 (5174 주소검색)
     * @author 플랫폼개발부문 DT솔루션 이준호
     * @date 2022.07.26
     * @param {object} x x._5174, x._5179 좌표
     * @param {object} y y._5174, y._5159 좌표
     */
    reverseGeocoding5174: function (x, y) {

        //console.log('xObj : ', x);
        //console.log('yObj : ', y);

        const deferred = $.Deferred();
        const format = new ol.format.WKT();

        const point_5174 = new ol.geom.Point([x._5174, y._5174]);
        const wkt_5174 = format.writeGeometry(point_5174);

        const point_5179 = new ol.geom.Point([x._5179, y._5179]);
        const wkt_5179 = format.writeGeometry(point_5179);

        $.post("/gis/reverseGeocoding5174.do", {wkt5174: wkt_5174, wkt5179: wkt_5179})
            .done((response) => {
                const result = JSON.parse(response)["result"];
                if (result["emdKorNm"]) {
                    let address = ``;
                    address += result["emdKorNm"] + ` `;
                    address += result["liKorNm"] + ` `;
                    address += result["mntnYn"] == "2" ? `산 ` : ``;
                    address += parseInt(result["lnbrMnnm"]);
                    address += parseInt(result["lnbrSlno"])
                        ? `-${parseInt(result["lnbrSlno"])}`
                        : ``;
                    result["address"] = address;
                }
                if (result["rn"]) {
                    let roadAddress = ``;
                    roadAddress += result["rn"] + ` `;
                    roadAddress += result["buldMnnm"];
                    roadAddress += parseInt(result["buldSlno"])
                        ? `-${parseInt(result["buldSlno"])}`
                        : ``;
                    result["roadAddress"] = roadAddress;
                }
                deferred.resolve(result);
            })
            .fail(() => {
                alert("주소 정보를 가져오는데 실패했습니다.");
            });
        return deferred;
    },

    /**
     * Geometry를 WKT로 변경 (2D)
     * @param {ol.geom.Geometry} geometry 공간정보
     * @returns {string} WKT
     */
    toWKT: function (geometry) {
        const format = new ol.format.WKT();
        return format.writeGeometry(geometry);
    },

    /**
     * 선택 그리기 공간객체 WKT 가져오기
     * @returns {string} WKT
     */
    getSelectFeatureWKT: function () {
        const geom = dtmap.draw.getGeometry();
        if (geom) {
            return this.toWKT(geom);
        } else {
            return null;
        }
        const yMap = app2D.getYMap();
        const module = yMap.getModule("highlight");
        const features = module.getFeatures("sky");
        if (features.length > 0) {
            const feature = features[0];
            let geometry = feature.getGeometry().clone();
            if (geometry instanceof ol.geom.Circle) {
                geometry = ol.geom.Polygon.fromCircle(geometry);
            }
            return this.toWKT(this.toSystemProjection(geometry));
        } else {
            return null;
        }
    },

    /**
     * 버퍼 공간 정보 표시 (버퍼가 0 이상인 경우만 표시)
     * @param {string} wkt WKT
     * @param {number} buffer 버퍼
     */
    showBufferGeometry: function (wkt, buffer) {
        var deferred = $.Deferred();
        // const yMap = app2D.getYMap();
        // const highlight = yMap.getModule("highlight");
        // highlight.clearSource("yellow");
        if (buffer > 0) {
            const format = new ol.format.WKT();
            const geom = format.readGeometry(wkt);
            const bufferedGeom = this.toJstsGeometry(geom).buffer(buffer);
            const feature = new ol.Feature(this.toOlGeometry(bufferedGeom));
            feature.setId('BF');
            dtmap.vector.addFeature(feature, {
                fill: {
                    color: '#FF8080',
                    opacity: 0.2
                },
                stroke: {
                    color: '#FF0000'
                },
                radius: 0,
                zIndex: 9999

            }, 'EPSG:5179')
            deferred.resolve(feature);
            // highlight.addFeatures("yellow", [
            //     new ol.Feature(this.toOlGeometry(bufferedGeom)),
            // ]);
        }
        return deferred;
    },

    /**
     * JSTS 공간 정보로 변경
     * @param {ol.geom.Geometry} geometry Openlayers 공간정보
     * @returns JSTS 공간정보
     */
    toJstsGeometry: function (geometry) {
        const format = new jsts.io.OL3Parser();
        return format.read(geometry);
    },

    /**
     * Openlayers 공간 정보로 변경
     * @param {geometry} geometry JSTS 공간정보
     * @returns Openlayers 공간정보
     */
    toOlGeometry: function (geometry) {
        const format = new jsts.io.OL3Parser();
        return format.write(geometry);
    },

    //이미지 확대
    zoomInImage: function (src) {
        var html = "";
        html += "<img src='" + src + "' id='zoomActionImg' alt='이미지' data-action='zoom'/>"
        $("#wrap").append(html);
        $("#zoomActionImg").click();
        $("#zoomActionImg").on("click", function () {
            $(".zoom-img-wrap").remove();
            $("#zoomActionImg").remove();
            $(".zoom-overlay").remove();
            $(".webmaster").removeClass("zoom-overlay-transitioning zoom-overlay-open");
        });
    },

    _leadingZeros: function (n, digits) {
        var zero = '';
        n = n.toString();
        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    },

    //현재 날짜+시간
    getTime: function () {
        var today = new Date();
        var year = this._leadingZeros(today.getFullYear(), 4); // 년도
        var month = this._leadingZeros(today.getMonth() + 1, 2);  // 월
        var date = this._leadingZeros(today.getDate(), 2);  // 날짜
        var hours = this._leadingZeros(today.getHours(), 2); // 시
        var minutes = this._leadingZeros(today.getMinutes(), 2);  // 분
        return year + month + date + hours + minutes;
    },

    // 쿠키 조회
    getCookie: function (cookie_name) {
        var x, y;
        var val = document.cookie.split(';');
        for (var i = 0; i < val.length; i++) {
            x = val[i].substr(0, val[i].indexOf('='));
            y = val[i].substr(val[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x == cookie_name) {
                return y;
            }
        }
    },

    commonnessCodeList: function (code, target) {
        if (code == "") {
            $("#" + target).html("<option value=\"\">리선택</option>");
        } else {
            ui.loadingBar("show");
            $.ajax({
                type: "POST",
                url: "/com/cmm/commonnessCodeList.do",
                data: {
                    "code": code,
                    "codeId": "YPLI",
                    "returnType": "select",
                    "addClass": "dataManageRi"
                },
                dataType: "html",
                async: false,
                success: function (returnData, status) {
                    if (status == "success") {
                        $("#" + target).html("");
                        $("#" + target).append("<option value=\"\">리선택</option>").append(returnData);
                    } else {
                        toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                        return;
                    }
                }, complete: function () {
                    ui.loadingBar("hide");
                }
            });
        }
    },


};
