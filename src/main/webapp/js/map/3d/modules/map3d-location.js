window.map3d = window.map3d || {}
map3d.location = (function () {
    let _element;
    let _isActive = false;
    const OVERLAY_ID = 'LOCA_OVERLAY'

    function init() {
        _element = document.createElement('div');
        _element.classList.add('ol-popup3d');
        $(_element).on('click', '.ol-popup-closer', onCloserClick);
    }

    function active() {
        if (!_isActive) {
            map3d.setInteraction(this);
            map3d.canvas.addEventListener('click', onMouseDown);
            _isActive = true;
        }
    }

    function dispose() {
        if (_isActive) {
            map3d.canvas.removeEventListener('click', onMouseDown);
            map3d.overlay.removeById(OVERLAY_ID);
            _element.innerHTML = '';
            _isActive = false;
        }
    }

    function onMouseDown(e) {
        // 화면좌표 변환
        var position = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.x, e.y));

        var x = position.Longitude;
        var y = position.Latitude;
        var result = proj4("EPSG:4326", "EPSG:5179", [x, y]);

        let overlayObj = map3d.overlay.getById(OVERLAY_ID);
        if (overlayObj) {
            map3d.overlay.removeById(OVERLAY_ID);
            _element.innerHTML = ''; //html 초기화
        }

        map3d.overlay.add({
            id: OVERLAY_ID,
            element: _element,
            position: position,
            verticalAlign: 'bottom',
            horizontalAlign: 'center'
        });


        reverseGeocoding(result[0], result[1]).done((location) => {
            let html = `
            <a href="#" class="ol-popup-closer"></a>
            <div class="popup-content"></div>
            ${location['address'] ?
                `<div>주소 : ${location["address"]}</div>` : ''
            }
            ${location['roadAddress'] ?
                `<div>도로명주소 : ${location["roadAddress"]}</div>` : ''
            }
            경위도 : ${x.toFixed(4)},${y.toFixed(4)}
            `
            _element.innerHTML = html;
        });
    }

    function onCloserClick(e) {
        map3d.overlay.removeById(OVERLAY_ID);
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
                console.error("주소 정보를 가져오는데 실패했습니다.");
            });
        return deferred;
    }

    let module = {
        init: init,
        active: active,
        dispose: dispose
    };
    return module;

}());