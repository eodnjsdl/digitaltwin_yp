window.map2d = window.map2d || {}
map2d.location = (function () {

    let source = new ol.source.Vector();


    /**
     * 위치 정보
     */
    function run() {
        once("Point", "drawend", true).done((event) => {
            const feature = event.feature;
            const coordinate = feature.getGeometry().getCoordinates();
            const lonlat = ol.proj.toLonLat(coordinate, "EPSG:5179");
            reverseGeocoding(coordinate[0], coordinate[1]).done((result) => {
                let tag = createTag(lonlat, result);
                addOverlay(feature, tag);
            });
        });

    }

    function createTag(lonlat, result) {
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
        return tag;
    }

    function addOverlay(feature, tag) {
        const node = $(tag);
        const element = node[0];
        const popup = new ol.Overlay({
            position: feature.getGeometry().getCoordinates(),
            element: element,
        });
        map2d.map.addOverlay(popup);
        onCloserClick(element, popup);
    }

    function onCloserClick(element, popup) {
        $(".ol-popup-closer", element).on("click", () => {
            map2d.map.removeOverlay(popup);
        });
        $(".location").removeClass('active');
    }

    /**
     * 상호작용 추가
     * @param {String} type 타입
     * @param {Object} opts 옵션
     */
    function addInteraction(type, opts) {
        const options = $.extend({
            source: source,
            type: type
        }, opts);
        const interaction = new ol.interaction.Draw(options);
        map2d.measure.clearInteraction();
        map2d.measure.setInteractions([interaction]);
        return interaction;
    }


    /**
     * 초기화 overlay
     */
    function resetOverlay() {
        const overlays = map2d.map.getOverlays();
        for (let i = overlays.getLength() - 1; i >= 0; i--) {
            const overlay = overlays.item(i);
            map2d.map.removeOverlay(overlay);
        }
    }

    /**
     * 한번 실행 - 위치
     * @param {string} type 타입
     * @param {string} eventType 이벤트 타입
     * @param {boolean} isRemove 삭제 여부
     * @param {Object} options 옵션
     * @returns
     */
    function once(type, eventType, isRemove, options) {
        const deferred = $.Deferred();
        const interaction = addInteraction(type, options);
        if (eventType) {
            interaction.once(eventType, (event) => {
                deferred.resolve(event);
                map2d.measure.clearInteraction();
                if (isRemove) {
                    setTimeout(() => {
                        source.clear();
                    }, 100);
                }
            });
        }
        return deferred;
    }


    function reverseGeocoding(x, y) {
        const deferred = $.Deferred();
        const format = new ol.format.WKT();

        var position_5174 = proj4("EPSG:5179", "EPSG:5174", [x, y]); //5179좌표에서 5174로 변경

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
    }

    let module = {
        run: run
        , addInteraction: addInteraction
        , resetOverlay: resetOverlay
    };
    return module;

}());