/**
 * SUBJECT : 편입토지분석
 * AUTHOR :
 * LAST UPDATE :
 * COMMENT :
 */
var M_PRCL_ANLS = {
    wkt: null,
    facility: store["facility"].getData(),
    selector: "#parcelPopup",
    drawStyle: {
        fill: {
            color: 'rgba(255,128,128,0.28)'
        },
        stroke: {
            color: '#FF8080',
            width: 4
        },
    },

    init: function () {
        loadSearchTarget();
        bindEvents();
        $(".tabBoxDepth1 ul li button:first", M_PRCL_ANLS.selector).trigger("click");
        $(".scroll-y").mCustomScrollbar({
            scrollbarPosition: "outside"
        });
    },

    destroy: function () {

    },

    display: function () {

    },

}

/**
 * 시설물 데이터
 */
function loadSearchTarget() {
    let tag = ``;
    let dataTag = ``;
    tag += `<option value="">시설물</option>`;
    M_PRCL_ANLS.facility.forEach((item) => {
        const name = item["tblNm"].toLowerCase();
        const title = item["lyrNm"];
        tag += `<option value="${name}">${title}</option>`;
        dataTag += `<tr>`;
        dataTag += `  <td class="align-center">`;
        dataTag += `    <span class="form-checkbox"><span>`;
        dataTag += `      <input type="checkbox" name="download-feature-type" data-type="${name}" id="download-feature-type-${name}">`;
        dataTag += `      <label for="download-feature-type-${name}"></label>`;
        dataTag += `    </span></span>`;
        dataTag += `  </td>`;
        dataTag += `  <td>${title}</td>`;
        dataTag += `</tr>`;
    });
    $("[name=standard-search-target]", M_PRCL_ANLS.selector).html(tag);
    $(".data-list tbody", M_PRCL_ANLS.selector).html(dataTag);
}

/**
 * 선택 이벤트
 */
function onFacSelect(e) {
    if (e.id) {
        dtmap.vector.select(e.id);
    } else {
        toastr.warning("현재 화면에 검색영역이 존재하지 않습니다.");
    }
}

/**
 * 초기화
 */
function reset() {
    // $("#download-search-area-extent", M_PRCL_ANLS.selector).prop("checked", true);
    // $("#download-search-area-extent", M_PRCL_ANLS.selector).trigger("change");
    $(".area-search-buffer", M_PRCL_ANLS.selector).val(0);
    $("[name=standard-search-target]", M_PRCL_ANLS.selector).val("");
    $(".facility-search-buffer", M_PRCL_ANLS.selector).val(0);
    $("[name=download-type]:first", M_PRCL_ANLS.selector).trigger("click");
    $("[name=download-feature-type-all]", M_PRCL_ANLS.selector).prop("checked", false);
    $("[name=download-feature-type]", M_PRCL_ANLS.selector).prop("checked", false);
}

/**
 * 이벤트 연결
 */
function bindEvents() {
    // const that = this;
    // 검색 기준 변경
    $(".tabBoxDepth1 ul li button", M_PRCL_ANLS.selector).on("click", function () {
        dtmap.clear();
        dtmap.off('select');
        var parent = $(this).parent();
        parent.addClass("on").siblings().removeClass("on");
        $("." + parent.data("tab")).addClass("on").siblings().removeClass("on");
        const id = parent.attr("data-id");
        $(".data-write tbody tr.tr_toggle", M_PRCL_ANLS.selector).hide();
        $(`.data-write tbody tr.${id}`, M_PRCL_ANLS.selector).show();
        // if (id === "tr_area") {
        //     $("[name=download-search-area]:checked", M_PRCL_ANLS.selector).trigger(
        //         "change"
        //     );
        // }
    });
    // 검색영역지정 변경 (현재화면영역, 사용자정의)
    // $("[name=download-search-area]", M_PRCL_ANLS.selector).on("change", function () {
    //     dtmap.clear();
    //     const node = $(this);
    //     const value = node.val();
    //     if (value === "extent") {
    //         $(".tr_search_area", M_PRCL_ANLS.selector).hide();
    //         $(".th_search_area_span", M_PRCL_ANLS.selector).attr("rowspan", 2);
    //         // cmmUtil.drawClear();
    //     } else {
    //         $(".tr_search_area", M_PRCL_ANLS.selector).show();
    //         $(".th_search_area_span", M_PRCL_ANLS.selector).attr("rowspan", 3);
    //         $("[name=download-search-drawing]:first", M_PRCL_ANLS.selector).trigger(
    //             "click"
    //         );
    //     }
    // });
    // 사용자 정의 검색 조건
    $("[name=download-search-drawing]", M_PRCL_ANLS.selector).on("click", function () {
        dtmap.clear();
        const node = $(this);
        const value = node.val();
        let type;
        switch (Number(value)) {
            case 1:
                type = 'Point';
                break;
            case 2:
                type = 'LineString';
                break;
            case 3:
                type = 'Box';
                break;
            case 4:
                type = 'Circle';
                break;
        }
        dtmap.draw.active({type: type, once: true});
    });
    //시설물기준 - 검색영역지정 selectBox
    $("#facilitySelectList").on("change", function () {
        dtmap.vector.clear();
        const node = $(this);
        const layer = node.val();
        var promise = dtmap.wfsGetFeature({
            typeNames: layer, //WFS 레이어명
            bbox: dtmap.getExtent()
        });
        promise.then(function (data) {
            dtmap.vector.readGeoJson(data, M_PRCL_ANLS.drawStyle);
        });
    });
    //시설물기준 - 지도에서 선택
    $(".btn-select-map", M_PRCL_ANLS.selector).off().on("click", function () {
        dtmap.clear();
        $("#facilitySelectList").trigger("change");
        const type = $("[name=standard-search-target]", M_PRCL_ANLS.selector).val();
        if (type.length !== 0) {
            dtmap.off('select', onFacSelect);
            dtmap.on("select", onFacSelect);
        } else {
            toastr.warning("검색영역을 지정해 주세요.");
        }
    });
    //시설물 선택 이벤트리스너

    // 초기화
    $(".btn_reset", M_PRCL_ANLS.selector).on("click", function () {
        reset();
        dtmap.clear();
        dtmap.draw.setBuffer(0); // 버퍼해제
    });
    // 전체 선택 / 해제
    $("[name=download-feature-type-all]", M_PRCL_ANLS.selector).on(
        "change",
        function () {
            const node = $(this);
            $("[name=download-feature-type]", M_PRCL_ANLS.selector).prop(
                "checked",
                node.is(":checked")
            );
        }
    );
    //set buffer
    $(".area-search-buffer", M_PRCL_ANLS.selector).on("keyup", function (event) {
        // if (event.keyCode == "13") {
        //     $(".facility-spatial-search", that.container).trigger("click");
        // }
        dtmap.draw.setBuffer(Number(this.value));
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

}




$(function () {




});