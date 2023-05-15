window.map2d = window.map2d || {}
map2d.location = (function () {

    let _map = new Map();

    /**
     * 지도 클릭 이벤트
     * @param e
     */
    function onMapClick(e) {
        atCoordinate(e.coordinate);
    }

    function atCoordinate(coord) {
        const lonlat = ol.proj.transform(coord, map2d.crs, 'EPSG:4326');
        reverseGeocoding(coord).done((result) => {
            let html = printHTML(lonlat, result);
            addOverlay(coord, html);
        })
    }

    function printHTML(lonlat, result) {
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

    function addOverlay(coord, html) {
        clear();
        let $element = $(html);
        let id = ol.util.getUid({});
        const overlay = new ol.Overlay({
            id: id,
            position: coord,
            element: $element[0],
        });

        //Closer Event
        $element.on('click', '.ol-popup-closer', function () {
            removeOverlay(id);
        });

        map2d.map.addOverlay(overlay);
        _map.set(id, overlay);
    }

    function removeOverlay(id) {
        let overlay = _map.get(id);
        if (overlay) {
            map2d.map.removeOverlay(overlay);
            _map.delete(id);
        }
    }

    function reverseGeocoding(coordinate) {
        const deferred = $.Deferred();
        const format = new ol.format.WKT();
        const coord_5179 = map2d.crs === 'EPSG:5179' ? coordinate : ol.proj.transform(coordinate, map2d.crs, 'EPSG:5179');
        const point_5179 = new ol.geom.Point(coord_5179);
        const wkt_5179 = format.writeGeometry(point_5179);

        const coord_5174 = ol.proj.transform(coordinate, map2d.crs, 'EPSG:5174');
        const point_5174 = new ol.geom.Point(coord_5174);
        const wkt_5174 = format.writeGeometry(point_5174);

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
                console.error("주소 정보를 가져오는데 실패했습니다.");
            });
        return deferred;
    }

    /**
     * 위치 정보 활성화
     */
    function active() {
        map2d.setInteraction(this);
        map2d.map.on('click', onMapClick);
    }

    /**
     * 위치정보 삭제
     */
    function clear() {
        _map.forEach(function (v, k) {
            map2d.map.removeOverlay(v);
        })
        _map.clear();
    }

    /**
     * 위치정보 비활성화
     */
    function dispose() {
        clear();
        map2d.map.un('click', onMapClick);
    }

    let module = {
        active: active,
        clear: clear,
        dispose: dispose,
        atCoordinate: atCoordinate,
    };
    return module;

}());