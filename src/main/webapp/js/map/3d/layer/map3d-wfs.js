window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.WFS = (function () {
    /**
     * WFS 레이어
     */
    const WFS_OPT = {
        proxy: true,
        level: 7,
        pointPositionLine: true,
        featureCount: 1000,
        bboxOrder: true
    }

    /**
     *
     * @param options
     * @returns {string}
     */
    function WFS(options) {
        let {id, layerNm} = options;
        let layer = serviceList.createWFSLayer(layerNm, 0);
        let opt = Object.assign({}, {
            proxy: options.proxy,
            level: options.level,
            pointPositionLine: options.pointPositionLine,
            featureCount: options.featureCount,
            bboxOrder: options.bboxOrder,
        }, WFS_OPT);

        layer.setProxyRequest(opt.proxy);
        // 이 곳에 테스트 중인 wms url을 설정하십시오
        layer.setConnectionWFS(dtmap.config.xdGeoUrl + "/wfs?", 0, "");
        layer.setLevelWFS(opt.level);
        layer.setLayersWFS(layerNm);
        // 출력할 속성 명칭
        layer.setWFSPointPositionLine(opt.pointPositionLine);	// POI 의 수직 라인 생성
        layer.setWMSVersion("1.0.0");
        layer.setRequestFeatureCount(opt.featureCount);
        // Default 값은 false
        // - false로 설정한 경우 : 최소위도, 최소경도, 최대위도, 최대경도
        // - true로 설정한 경우 : 최소경도, 최소위도, 최대경도, 최대위도
        layer.setBBoxOrder(opt.bboxOrder);

        // WFS 포인트 로드 시 디폴트로 출력할 POI 이미지 지정
        loadIcon(layerNm + "_poi", options.imgUrl, function (_icon) {
            layer.setWFSPointDefaultIcon(_icon);
        });

        // 레이어 가시범위 지정
        Module.setVisibleRange(layerNm, map3d.config.vidoQlityLevel, map3d.config.maxDistance);


        layer['type_'] = 'service';
        // layerMap.set(id, layer);
        return layer;
    }

    function loadIcon(name, url, callback) {
        var icon = Module.getSymbol().getIcon(name);
        if (icon != null) {
            if (callback && typeof callback === 'function') {
                callback(icon);
            }
        } else {
            // 이미지 관리 심볼 반환
            var symbol = Module.getSymbol();
            // 이미지 로드
            loadImage(url, function (img) {
                // 생성된 아이콘 이미지 콜백 반환
                if (symbol.insertIcon(name, img.data, img.width, img.height)) {
                    if (callback && typeof callback === 'function') {
                        callback(symbol.getIcon(name));
                    }
                }
            })

        }
    }

    return WFS;
})()