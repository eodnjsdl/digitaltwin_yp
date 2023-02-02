window.dtmap = window.dtmap || {}
dtmap.config = function () {
    let EMAP_KEY;

    /**
     *
     * 지도 초기 가시화 설정 및 환경 설정
     *
     */

    const map2d = {
        target: 'map2D', //element Id
        projection: 'EPSG:5179', //좌표계
        center: [999028.8152684278, 1943589.1358372485], //중심점
        zoom: 17, //줌레벨
        minZoom: 6, //최소 줌
        maxZoom: 19 // 최대줌
    }

    const map3d = {
        target: 'map3D',
        center: [127.48846105923461, 37.49131546088355, 1720.3767651356757, 90, 0], // 초기 위치
        extent: [127.20319512097201, 37.154772955203785, 127.78725858822045, 37.60045538734813, 75000], // 바운더리
        limitRect: [112.74833937665129, 31.194128336558973, 143.98027170605687, 43.065487303850254, 20000000], //제한 영역
        limitAlt: 150, //제한고도
        limitCamera: true,
        totalMemory: 256 * 1024 * 1024,
        userSetting: {
            vertclPynColorR : 0,
            vertclPynColorG : 0,
            vertclPynColorB : 0,
            vertclPynThick : 0,
            vertclPynHeight : 0,
            tpgrphTrnsprc : 0,
            vidoQlityLevel : 0
        }
    }


    const module = {
        EMAP_KEY: EMAP_KEY,
        map2d: map2d,
        map3d: map3d,
        xdStorage : 'digitaltwin'
    }
    return module
}()