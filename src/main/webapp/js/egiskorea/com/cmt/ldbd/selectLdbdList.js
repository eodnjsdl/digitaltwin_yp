/**
 * 지적 / 건물 조회
 */
$(document).ready(function () {
    bindEvents();
});

function bindEvents() {
    //click 지적
    $("#rightPopup").on("click", ".land_buld_jijuk li", {}, function () {
        $("#emd,#jibun,#jimok,#road,#buildnm,#build-bon,#build-bu").html("");
        var html = "";
        const node = $(this);
        node.siblings().removeClass("active");
        $("#build li").removeClass("active");
        node.addClass("active");
        const id = node.attr("data-id");
        $("#jibun", ".ldbdList").html(node.attr("data-jibun"));
        $("#road", ".ldbdList").html(node.attr("data-road"));
        $("#jimok", ".ldbdList").html(node.attr("data-jimok"));
        var road = $.trim($('.land_buld_jijuk li').attr('data-road'));
        if (road === "undefined") {
            road = "-";
        }
        html += "<tr>";
        html += '    <td>읍면동(리)</td>               ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="emd">' + node.attr("data-addr") + '</sapn>     ';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>지번</td>                   ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="jibun">' + node.attr("data-jibun") + '</sapn>   ';
        html += '    </td>                       ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>지목</td>                   ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="jimok">' + node.attr("data-jimok") + '</sapn>   ';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>도로명</td>                  ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="road">' + road + '</sapn>    ';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        $("#build_item", ".ldbdList").html(html);
        _moveLdbd();
    });

    //click 건물
    $("#rightPopup").on("click", "#build li", {}, function () {
        $("#emd,#jibun,#jimok,#road,#buildnm,#build-bon,#build-bu").html("");
        var html = "";
        const node = $(this);
        node.siblings().removeClass("active");
        $(".land_buld_jijuk li").removeClass("active");
        node.addClass("active");
        const id = node.attr("data-id");
        $("#buildnm", ".ldbdList").html(node.attr("data-buld_nm"));
        $("#build-bon", ".ldbdList").html(node.attr("data-buld_mnnm"));
        $("#build-bu", ".ldbdList").html(node.attr("data-lnbr_slno"));
        var jibun = $.trim($('.land_buld_jijuk li').attr('data-jibun'));
        if (!jibun) {
            jibun = node.attr("data-jibun");
            if (jibun == 'null' && jibun == 'undefined') {
                jibun = '';
            }
        }
        var buildnm = $.trim(node.attr("data-buld_nm"));
        var buildDc = '';
        if (buildnm == 'null') {
            buildnm = "-";
        } else {
            var buld_nm_dc = $.trim(node.attr("data-buld_nm_dc"));
            buildDc = (buld_nm_dc != "null") ? '' + node.attr("data-buld_nm_dc") : '';
            buildnm = buildnm + buildDc;
        }
        var road = $.trim($('.land_buld_jijuk li').attr('data-road'));
        if (road == 'null' || road == 'undefined') {
            road = "-";
        }
        html += "<tr>";
        html += '    <td>읍면동(리)</td>               ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="emd">' + node.attr("data-addr") + '</sapn>     ';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>지번</td>                   ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="jibun">' + jibun + '</sapn>   ';
        html += '    </td>                       ';
        html += '  </tr>                           ';
        html += '    <td>도로명</td>                  ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="road">' + road + '</sapn>    ';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>건물명</td>                  ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="buildnm">' + buildnm + '</sapn> ';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>건물본번</td>                 ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="build-bon">' + node.attr("data-buld_mnnm") + '</sapn>';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        html += '  <tr>                            ';
        html += '    <td>건물부번</td>                 ';
        html += '    <td className="align-center"> ';
        html += '      <sapn id="build-bu">' + node.attr("data-lnbr_slno") + '</sapn>';
        html += '    </td>                         ';
        html += '  </tr>                           ';
        $("#build_item", ".ldbdList").html(html);
        _moveLdbd();
    });

    //click 위치이동
    $("#rightPopup").on("click", ".bi-location2", function () {
        _moveLdbd();
    });


}

function _moveLdbd() {
    var feature;
    var layer;
    if ($("#build li").attr('class') === "active") {
        feature = $("#build").data("feature");
        layer = 'tgd_spbd_buld';
    } else {
        feature = $("#jijuk").data("feature");
        layer = 'lsmd_cont_ldreg_41830';
    }
    var gid = feature.properties.gid;
    var cql = '';
    cql += "gid=" + gid + "";
    var promise = dtmap.wfsGetFeature({
        typeNames: layer, //WFS 레이어명
        cql: cql
    });
    promise.then(function (data) {
        var ftId = data.features[0].id;
        dtmap.vector.select(ftId);
    });
}

function _onDrawEnd_ldbdInfo(e) {
    var geom = e.geometry;
    var ldLayer = "lsmd_cont_ldreg_41830";
    var bdLayer = "tgd_spbd_buld";
    var totalCnt = 0;
    var ldStyle = {
        fill: {
            color: 'rgba(255,0,0,0.68)'
        },
        stroke: {
            color: '#FF0000',
            width: 4
        },
        label: {
            column: 'jibun'
        }
    };
    var bdStyle = {
        fill: {
            color: 'rgba(0,0,255,0.68)'
        },
        stroke: {
            color: '#0000FF',
            width: 4
        },
        label: {
            column: 'buld_nm'
        }
    };
    ui.openPopup("rightPopup");
    loadHtml();
    setLdbdLayer(geom, ldLayer, ldStyle).done(function (data) { //지적
        totalCnt += data.totalFeatures;
        setLdbdLayer(geom, bdLayer, bdStyle).done(function (data) {  //건물
            totalCnt += data.totalFeatures;
            $("#totalcount", ".ldbdList").html(
                `검색결과 (<strong >${totalCnt}건</strong>)`
            );
        });
    });
}

function aj_ldbdInfo() {
    dtmap.draw.active({type: 'Point', once: true});
    dtmap.once('drawend', _onDrawEnd_ldbdInfo);
}

function setLdbdLayer(geom, layerNm, style) {
    var deferred = $.Deferred();
    var promise = dtmap.wfsGetFeature({
        typeNames: layerNm, //WFS 레이어명
        geometry: geom
    });
    promise.then(function (data) {
        dtmap.vector.readGeoJson(data, style);
        setLdbdList(geom, data, layerNm);
        deferred.resolve(data);
    });
    return deferred;
}

function setLdbdList(geom, data, layerNm) {
    const position = geom.getCoordinates();
    var position_5174 = proj4(dtmap.crs, "EPSG:5174", [position[0], position[1]]); //5179좌표에서 5174로 변경
    var xObj = {'_5174': position_5174[0], '_5179': position[0]};
    var yObj = {'_5174': position_5174[1], '_5179': position[1]};
    let tag = ``;
    let addr;
    let road;
    let totalFeatures = data.totalFeatures;
    let properties;
    cmmUtil.reverseGeocoding5174(xObj, yObj).done((result) => {
        addr = result.emdKorNm + " " + result.liKorNm;
        road = result.roadAddress;
        for (let i = 0; i < data.features.length; i++) {
            properties = data.features[i].properties;
            if (layerNm === "lsmd_cont_ldreg_41830") {
                var jimok = properties.jibun.charAt(properties.jibun.length - 1); //열
                var jibun = properties.jibun.slice(0, -1); //문자
                tag += `<li><p class="tit" id="jijukcount">`;
                tag += `<span id="jijuk">`;
                tag += `지적 (<strong >${totalFeatures}건</strong>)</span></p>`;
                tag += `<ul class="dep2 land_buld_jijuk" id="jijuk"><li data-id="${properties.gid}" data-pnu="${properties.pnu}" data-bbox="${properties.bbox}" data-jibun="${jibun}" data-jimok="${jimok}" data-addr="${addr}" data-road="${road}"><a href="javascript:void(0);" >${jibun}</a></li></ul>`;
                $(".building-list", ".ldbdList").append(tag);
                $("#jijuk").data("feature", data.features[i]);
            } else if (layerNm === "tgd_spbd_buld") {
                var lnbrMnnm = result.lnbrMnnm;
                if (result.lnbrMnnm) {
                    lnbrMnnm = lnbrMnnm.replaceAll('0', '');
                }
                var lnbrSlno = result.lnbrSlno;
                if (result.lnbrSlno) {
                    lnbrSlno = lnbrSlno.replaceAll('0', '');
                }
                var jibun = lnbrMnnm + "-" + lnbrSlno;
                tag += `<li><p class="tit" id="buildcount">`;
                tag += `<span id="build">`;
                tag += `건물 (<strong >${totalFeatures}건</strong>)</span></p>`;
                tag += `<ul class="dep2" id="build"><li data-id="${properties.bsi_int_sn}" data-buld_mnnm="${properties.buld_mnnm}" data-buld_nm_dc="${properties.buld_nm_dc}" data-lnbr_slno="${properties.lnbr_slno}"  data-buld_nm="${properties.buld_nm}" data-addr="${addr}" data-jibun="${jibun}" data-road="${road}"><a href="javascript:void(0);" >${properties.buld_mnnm}-${properties.lnbr_slno}</a></li></ul>`;
                $(".building-list", ".ldbdList").append(tag);
                $("#build").data("feature", data.features[i]);
            }
        }
    });
}

function loadHtml(totalCnt) {
    ui.loadingBar("show");
    $.ajax({
        type: "POST",
        url: "/cmt/ldbd/selectLandBuilderList.do",
        dataType: "html",
        async: false,
        success: function (returnData, status) {
            if (status == "success") {
                $("#rightPopup").html(returnData);
            } else {
                toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                return;
            }
        }, complete: function () {
            ui.loadingBar("hide");
        }
    });
}
