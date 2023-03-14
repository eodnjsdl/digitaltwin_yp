$(document).ready(function () {

    /**
     * Right Tool Bar
     */
    let $mapControl = $('.map-control');
    //나침반
    $mapControl.on('click', '.ctrl-btn.compass', function (e) {
        if (dtmap.mod === '3D') map3d.compass.reset();
    });

    //새로고침
    $mapControl.on('click', '.reset', function (e) {
        dtmap.clear();
    });

    //위치 초기화
    $mapControl.on('click', '.globe', function (e) {
        dtmap.goHome();
    });

    // 2D/3D 버튼
    $mapControl.on('click', 'input[name="mapType"]', function (e) {
        if (e.target.value === '3D') {
            loadingBar('show');
            map3d.isLoaded.then(function () {
                loadingBar('hide');
            })
        }
        //측정기능 OFF
        $mapControl.find('.location, .distance, .measure, .radius').removeClass('active');
        dtmap.clearInteraction();

        //패널 close
        $leftSide.removeClass('on');
        $rightPopup.removeClass('opened');

        dtmap.switchMap(e.target.value);
    });

    //위치
    $mapControl.on('click', '.ctrl-btn.location', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.location.active();
        } else {
            dtmap.clearInteraction();
        }


    })

    //거리측정
    $mapControl.on('click', '.ctrl-btn.distance', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.measure.active('distance');
        } else {
            dtmap.clearInteraction();
        }


    });

    //면적측정
    $mapControl.on('click', '.ctrl-btn.measure', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.measure.active('area');
        } else {
            dtmap.clearInteraction();
        }


    })

    //반경측정
    $mapControl.on('click', '.ctrl-btn.radius', function (e) {
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.toggleClass('active');
        if ($this.hasClass('active')) {
            dtmap.measure.active('radius');
        } else {
            dtmap.clearInteraction();
        }
    })

    //확대
    $mapControl.on('click', '.ctrl-btn.scaleUp', function (e) {
        dtmap.zoomIn();
    })

    //축소
    $mapControl.on('click', '.ctrl-btn.scaleDown', function (e) {
        dtmap.zoomOut();
    })

});
