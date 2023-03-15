//
// $(document).ready(function () {
//     asideEvent();
// });
//
// function _asideEvent(){
//     $("#map-aside button").on("click", function() {
//         var name = $(this).data("popup");
//         var mapType = $(this).data("maptype");
//         var classList = $(this).attr('class').split(/\s+/);
//         var area = classList[2];
//         ui.openPopup(area);
//     });
// }


// $(document).ready(function () {
//
//     /**
//      * Top Menu (aside)
//      */
//
//     let $topMenu = $('.map-tool');
//     let $rightPopup = $("#rightPopup");
//
//     //배경지도
//     $topMenu.on('click', '#backgroundMapInfo', function () {
//         $.ajax({
//             type: "POST",
//             url: "/cmt/bm/selectBackgroundMapInfoList.do",
//             dataType: "html",
//             async: false,
//             beforeSend: function (jqXHR, settings) {
//                 ui.loadingBar("show");
//             },
//             success: function (returnData, status) {
//                 if (status === "success") {
//                     $rightPopup.html(returnData);
//                     $rightPopup.addClass('opened');
//                     $rightPopup.css("width", "325").css("height", "430");
//                 } else {
//                     toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
//                 }
//             },
//             complete: function () {
//                 ui.loadingBar("hide");
//             }
//         });
//     });
//
//     //3D레이어
//     $topMenu.on('click', '#layerList', function () {
//         aj_selectLayerList("top");
//         $rightPopup.addClass("opened");
//         $rightPopup.css("width", 250).css("height", 807);
//     });
//
//     //그리기
//     $topMenu.on('click', '#graphicInfo', function () {
//         $.ajax({
//             type: "POST",
//             url: "/cmt/grph/selectGraphicInfoList.do",
//             // data: data,
//             // dataType: "html",
//             // async: false,
//             success: (returnData, status) => {
//                 if (status === "success") {
//                     $rightPopup.html(returnData);
//                     $rightPopup.css("width", 480).css("height", 807);
//                     $rightPopup.addClass('opened');
//                     //이벤트 등록부
//                     // this.bindEvents();
//                 } else {
//                     toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
//                 }
//             },
//             complete: function () {
//             },
//         });
//     });
//
// });
