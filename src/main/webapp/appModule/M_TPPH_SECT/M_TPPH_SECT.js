/**
 * SUBJECT : 지형단면도 (3d)
 * AUTHOR : 이푸름
 * LAST UPDATE : 2022.2.11
 * COMMENT :
 */

var M_TPPH_SECT = {

    init: function () {
        var chartCanvas = '<canvas id="chart"></canvas>'
        $("#chartBox").append(chartCanvas)
        $("#M_TPPH_SECT").attr("onmouseover", "M_TPPH_SECT.setMouseOverDiv(true)");
        $("#M_TPPH_SECT").attr("onmouseout", "M_TPPH_SECT.setMouseOverDiv(false)");

        $("#tpphClickBtn").off().on("click", function () {
            toastr.info("지도에 분석할 두 지점을 선택하세요.");
            dtmap.draw.active({type: 'LineString', once: true});
        });
        $("#tpphMoveBtn").off().on("click", function () {
            dtmap.draw.dispose();
        });
        dtmap.off('drawend', this.onDrawEnd);
        dtmap.on('drawend', this.onDrawEnd);

    },
    setMouseState: function (_state) {
        Module.XDSetMouseState(_state);
    },
    setMouseOverDiv: function (_set) {
        Module.XDIsMouseOverDiv(_set);
    },

    /*destroy*/
    destroy: function () {
        if (M_TPPH_SECT.CHART != null) {
            var layerList = new Module.JSLayerList(true);
            var lineLayer = layerList.nameAtLayer("CROSS_SECTION_LINE");

            lineLayer.removeAll();
            var pointLayer = layerList.nameAtLayer("CROSS_SECTION_POINT");
            pointLayer.removeAll();
            M_TPPH_SECT.CHART = null
            Module.XDSetMouseState(1);
            $("#chart").remove();
        }
        dtmap.off('drawend', this.onDrawEnd);
    },

    onDrawEnd: function () {
        // 마우스 입력 점 반환
        var map = Module.getMap();
        var inputPoints = map.getInputPoints();

        if (inputPoints.count() >= 2) {

            // 입력한 직선을 10m 간격으로 분절하는 좌표 리스트 반환
            var pathPoints = map.GetPathIntervalPositions(inputPoints, 10, false);

            // 각 좌표의 고도(단면) 반환
            var crossSections = getCrossSections(pathPoints);

            // 단면 경로 및 지점 출력
            displayCrossSectionsOnChart(crossSections);

            // 단면 라인 출력
            displaycrossSectionsOnMap(crossSections);

            // 마우스 입력 점 초기화
            map.clearInputPoint();
        }
    }

}


/* 각 좌표의 고도(단면) 반환 */
function getCrossSections(_pathPoints) {

    var pointCount = _pathPoints.count();
    if (pointCount < 2) {
        return;
    }

    var result = {
        positions: [],	// 지점 위치
        drone: [],	// 드론 LOD 고도
        dem: []	// 지형 고도
    };

    var map = Module.getMap();
    var layerList = new Module.JSLayerList(false);
    var layer = layerList.nameAtLayer("tile_LOD_yangp");

    for (var i = 0; i < pointCount; i++) {

        // 고도 값을 계산 할 경위도 좌표 반환
        var position = _pathPoints.get(i);
        result.positions.push(position);

        // DEM 고도 반환
        result.dem.push(map.getTerrHeightFast(position.Longitude, position.Latitude));

        // 레이어와의 충돌지점 반환
        if (layer != null) {

            // 지면과 수직한 라인을 만들어 드론LOD 객체와의 충돌지점 반환
            var pickPosition = layer.getPickInfoAtView(
                new Module.JSVector3D(position.Longitude, position.Latitude, 10000.0),
                new Module.JSVector3D(position.Longitude, position.Latitude, -10000.0)
            );

            if (pickPosition == null) {
                result.drone.push(0);	// 충돌 점이 없는 경우 고도 값 0으로 처리
            } else {
                result.drone.push(pickPosition.position.Altitude);
            }
        }
    }

    return result;
}

/* 단면 정보 차트 출력 */
function displayCrossSectionsOnChart(_crossSections) {

    // 차트 라벨 생성
    var labels = [];
    for (var i = 0; i < _crossSections.positions.length; i++) {
//		labels.push((i*M_TPPH_SECT.PATH_SLICE_DISTANCE).toString());
        labels.push((i * 10).toString());
    }

    // 차트 출력
    if (M_TPPH_SECT.CHART == null) {

        // 차트 생성
        M_TPPH_SECT.CHART = new Chart(
            document.getElementById('chart'),
            {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "drone",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(219, 88, 116)',
                        data: _crossSections.drone,
                    }, {
                        label: "dem",
                        backgroundColor: 'rgb(0, 191, 48)',
                        borderColor: 'rgb(2, 173, 45)',
                        data: _crossSections.dem,
                    }]
                }
            }
        );

    } else {

        // 차트 갱신
        M_TPPH_SECT.CHART.data = {
            labels: labels,
            datasets: [{
                label: "drone",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(219, 88, 116)',
                data: _crossSections.drone,
            }, {
                label: "dem",
                backgroundColor: 'rgb(0, 191, 48)',
                borderColor: 'rgb(2, 173, 45)',
                data: _crossSections.dem,
            }]
        };
        M_TPPH_SECT.CHART.update();
    }
}

/* 단면 위치 정보 출력 */
function displaycrossSectionsOnMap(_crossSections) {

    var layerList = new Module.JSLayerList(true);

    // 포인트 레이어 생성
    var pointLayer = layerList.nameAtLayer("CROSS_SECTION_POINT");
    if (pointLayer == null) {
        pointLayer = layerList.createLayer("CROSS_SECTION_POINT", Module.ELT_3DPOINT);
        pointLayer.setMaxDistance(map3d.config.maxDistance);
    } else {
        pointLayer.removeAll();
    }

    // 표시 좌표 리스트 생성
    var positions = [];
    for (var i = 0; i < _crossSections.positions.length; i++) {

        var lineAltitude = _crossSections.dem[i];
        if (_crossSections.drone[i] > lineAltitude) {
            lineAltitude = _crossSections.drone[i];
        }

        positions.push([
            _crossSections.positions[i].Longitude,
            _crossSections.positions[i].Latitude,
            lineAltitude + 2.0
        ])
    }

    // 지정한 간격으로 POI 표시
    for (var i = 0; i < _crossSections.positions.length; i++) {

        // 각 지점의 단면 위치를 POI로 표시
        var point = Module.createPoint("CROSS_SECTION_POINT_" + i);
        point.setPosition(new Module.JSVector3D(positions[i][0], positions[i][1], positions[i][2]));
        point.setText((i * 10) + "m");
        pointLayer.addObject(point, 0);
    }

    // 라인 레이어 생성
    var lineLayer = layerList.nameAtLayer("CROSS_SECTION_LINE");
    if (lineLayer == null) {
        lineLayer = layerList.createLayer("CROSS_SECTION_LINE", Module.ELT_3DLINE);
        lineLayer.setMaxDistance(map3d.config.maxDistance);
    } else {
        lineLayer.removeAll();
    }

    // 구간 표시 라인 생성
    var line = Module.createLineString("CROSS_SECTION_LINE");
    line.createbyJson({
        coordinates: {
            coordinate: positions,
            style: "XYZ"
        },
        color: new Module.JSColor(255, 255, 0, 0),			// ARGB 설정
        width: 3
    });

    lineLayer.addObject(line, 0);
}

$(function () {
    $(".scroll-y").mCustomScrollbar({
        scrollbarPosition: "outside"
    });


    //분석 popup 접기/펼치기
    $(".small-popup .popup-toggle").each(function () {
        $(this).click(function () {
            $(this).parent().toggleClass("fold");

            if ($(this).parent().hasClass("fold")) {
                $(this).attr("title", "펼치기");
            } else {
                $(this).attr("title", "접기");
            }
        });
    });
});