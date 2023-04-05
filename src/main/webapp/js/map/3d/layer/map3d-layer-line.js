window.map3d = window.map3d || {};
map3d.layer = map3d.layer || {};
map3d.layer.Line = (function () {

    function Line(options) {
        map3d.layer.Geometry.call(this, options);
        this.depth = 2;
    }

    map3d.inherits(Line, map3d.layer.Geometry);

    /**
     * @override map3d.layer.Layer
     * @returns {XDWorld.JSLayer}
     */
    Line.prototype.createInstance = function () {
        return map3d.userLayers.createObjectLayer({
            name: this.id,
            type: Module.ELT_PIPE
        });
    }

    /**
     *
     * @param {object} options
     * @param {number[]} options.coordinates 좌표 배열
     * @param {object} [options.properties] 속성정보
     * @param {number} [options.scale=1] 스케일값
     */
    Line.prototype.add = function (options) {
        map3d.layer.Geometry.prototype.add.call(this, options);

        const id = this.genId(options.id);
        let {coordinates, properties} = options;
        properties = properties || {};
        const vec3Array = new Module.Collection();


        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            for (let j = 0; j < coord.length; j++) {
                const xy = coord[j];
                if (i === 0) {
                    map3d.setCenter(xy, 800);
                }

                let alt = Module.getMap().getTerrHeightFast(xy[0], xy[1]);
                vec3Array.add(new Module.JSVector3D(xy[0], xy[1], alt))
            }
        }


        // 파이프 옵션
        const startColor = new Module.JSColor(200, 0, 0, 255), // 파이프 시작 색상
            endColor = new Module.JSColor(200, 0, 0, 255), // 파이프 끝 색상
            segment = 10; // 파이프 단면 세그먼트

        let radius = 0.5;
        if (properties['std_dip'] && !isNaN(properties['std_dip'])) {
            radius = (properties['std_dip'] * 0.001) / 2;
            console.log(radius);
            radius = radius < 0.01 ? 0.01 : radius
        }
        radius *= options.scale || 2;

        // 파이프 생성
        const object = Module.createPipe(id);
        object.create(
            vec3Array,
            startColor,
            endColor,
            segment,
            radius,
            radius / 2.0
        );

        //프로퍼티 설정
        if (properties) {
            Object.keys(properties).forEach(function (key) {
                if (key === 'geometry') {
                    return;
                }
                const value = properties[key];
                if (value) {
                    object.setProperty(key, value);
                }
            })
        }
        // 파이프 오브젝트를 레이어에 추가
        this.instance.addObject(object, 0);

        // 간소화 출력 거리 설정
        // object.setSimplifyRange(object.getExtent() * 2.0);
        return object;
    }


    Line.prototype.setHighLight = async function (poi) {


    }


    return Line;
}());