/**
 * 분석 UI 호출 객체
 */
const analysis = {
    container: '#container',
    $element: undefined,
    current: undefined,
    checkId: function (id) {
        if (dtmap.mod === "2D") {
            if (id === 'M_ROV_ANLS' ||
                id === 'M_SUHN_ANLS' ||
                id === 'M_VSBL_ANLS' ||
                id === 'M_SLOPE' ||
                id === 'M_AI_IMAGE' ||
                id === 'M_TPPH_SECT' ||
                id === 'M_DGUF_ANLS') {
                toastr.warning("3D지도에서만 사용 가능합니다.");
                this.current = undefined
                return false;
            } else {
                return true;
            }
        } else if (dtmap.mod === "3D") {
            // if (ci === 'M_UNDG_FCTY_SECT') {
//					toastr.warning("2D에서 가능합니다.");
//					module.current =undefined
//					checked = false
//					return checked;
//             } else if (ci === 'M_SPCE_ANLS') {
//					toastr.warning("2D에서 가능합니다.");
//					module.current =undefined
//					checked = false
//					return checked;
//             }
            return true;
        }
    },
    load: function (id) {
        ui.initPopup("");
        const fileHtml = '/appModule/' + id + '/' + id + '.html';
        const fileCss = '/appModule/' + id + '/' + id + '.css';
        const fileJs = '/appModule/' + id + '/' + id + '.js';
        const $container = $(this.container)
        const $element = $(`<div id="${id}"></div>`);
        $element.load(fileHtml, function () {
            $.loadCSS(fileCss, function () {
                $.getScript(fileJs, function () {
                    eval(id).init();
                });
            });
        })
        this.$element = $element;
        $container.append($element);
    },
    close: function () {
        if (this.current) {
            const module = eval(this.current);
            if (module && module.destroy) {
                module.destroy();
            }
            this.$element.remove();
            this.$element = undefined;
            this.current = undefined;
        }
    },
    open: function (id, container) {
        this.close();
        if (!this.checkId(id)) {
            return false;
        }
        this.current = id;
        this.load(id, container);
        return true;
    }
}

/*
$(document).ready(function () {
    var bldngObjOnOff = false;

    var chkBul = false;
    var chk3D = 0;

    // 조망권, 일조권, 가시권 선택 시 일반건물 레이어 가시화
    $(document).on("click", ".lnb-analysis li button", function () {
        // if(app2D == undefined){
        // 	var layerList = new Module.JSLayerList(false);
        // 	var layer = layerList.nameAtLayer("building_object");
        // }
        if ($(this).html().indexOf("조망권") >= 0
            || $(this).html().indexOf("일조권") >= 0
            || $(this).html().indexOf("가시권") >= 0) {

            // Module.XDSetMouseState(1);

// 			if(app2D == undefined){
// 				if(layer != undefined){
// //					if(layer.getVisible()){
// //						if(bldngObjOnOff){
// //							bldngObjOnOff = true;
// //						} else {
// //							bldngObjOnOff = false;
// //						}
// //					} else {
// //						bldngObjOnOff = false;
// //						layer.setVisible(true);
// //					}
// 				} else {
// //					bldngObjOnOff = false;
//
// 					Module.XDEMapCreateLayer("building_object", xdServer, 0, true, true, false, 9, 0, 14);
// 					Module.setVisibleRange("building_object", userSetup.vidoQlityLevel, GLOBAL.MaxDistance);
// 					layer = new Module.JSLayerList(false).nameAtLayer("building_object");
// 					layer.simple_real3d = true; //심플모드
//
// //					if(chkBul == false && chk3D > 0) {
// //						layer.setAlpha(0);
// //					} else {
// //						layer.setAlpha(255)
// //					}
// 				}
// 			}
        } else {
//			if(layer != undefined){
//				layer.setVisible(bldngObjOnOff);
//			}

            // if(chkBul == true || chk3D > 0) {
            // 	layer.setVisible(true);
            // }
        }

        // if(!$(this).parent().hasClass("on")) {
        // 	var layerList = new Module.JSLayerList(false);
        // 	var layer = layerList.nameAtLayer("building_object");
        // 	if(layer != undefined) {
        // 		layerList.delLayerAtName("building_object");
        // 		//layer.setVisible(false);
        // 	}
        // }
    });

    // 분석 기능 종료 시 일반건물 레이어 비가시화
    $(document).on("click", ".lnb-analysis .lnb-close, #lnb li, .map-tool button, .side-btn.territory", function () {
        // if(app2D==undefined) {
        // 	var layerList = new Module.JSLayerList(false);
        // 	var layer = layerList.nameAtLayer("building_object");
        //
        // 	if(chkBul){
        // 		layer.setVisible(true);
        // 	} else {
        // 		layerList.delLayerAtName("building_object");
        // 	}
        // }
    });
});*/

jQuery.loadCSS = function (url, callback) {
    if (!$('link[href="' + url + '"]').length) {
        $('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
    }
    callback();
}



