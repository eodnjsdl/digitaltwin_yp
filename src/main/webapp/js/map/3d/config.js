window.map3d = window.map3d || {};
map3d.config = (function () {
    let config = {
        target: 'map3D',
        center: [127.48846105923461, 37.49131546088355, 1720.3767651356757, 90, 0], // 초기 위치
        extent: [127.20319512097201, 37.154772955203785, 127.78725858822045, 37.60045538734813], // 바운더리
        limitRect: [112.74833937665129, 31.194128336558973, 143.98027170605687, 43.065487303850254], //제한 영역
        limitAlt: 75000, //제한고도
        limitCamera: true,
        totalMemory: 256 * 1024 * 1024,
        maxDistance: 60000,

        //사용자 설정부
        vertclPynColorR: 0,
        vertclPynColorG: 0,
        vertclPynColorB: 0,
        vertclPynThick: 0,
        vertclPynHeight: 0,
        tpgrphTrnsprc: 0,
        vidoQlityLevel: 0,
        set: set
    }

    function set(options) {
        for (let key in options) {
            if (key === 'set') continue;
            if (config.hasOwnProperty(key)) {
                config[key] = options[key];
            }
        }
    }

    return config
})();