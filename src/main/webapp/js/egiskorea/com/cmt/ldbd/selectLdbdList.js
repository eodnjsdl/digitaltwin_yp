/**
 * 지적 / 건물 조회
 */
$(document).ready(function () {
    bindEvents();
});

function bindEvents() {
    //click 지적
    $("#rightPopup").on("click", ".land_buld_jijuk li", {}, function (e) {
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
        _moveLdbd(e);
    });

    //click 건물
    $("#rightPopup").on("click", "#build li", {}, function (e) {
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
        _moveLdbd(e);
    });

    //click 위치이동
    $("#rightPopup").on("click", ".bi-location2", function () {
        _moveLdbd();
    });


}

function _moveLdbd(e) {

    var gid;
    var layer;
    if ($("#buildFirstLi li").hasClass("active")) {
        gid = e.target.dataset.gid;
        layer = 'tgd_spbd_buld';
    } else {
        gid = e.target.dataset.id;
        layer = 'digitaltwin:lsmd_cont_ldreg_41830';
    }
    // var gid = feature.get("gid");
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
    var ldLayer = "digitaltwin:lsmd_cont_ldreg_41830";
    var bdLayer = "tgd_spbd_buld";
    var totalCnt = 0;
    var ldStyle = {
        fill: {
            color: '#FFC080',
            opacity: 0.6
        },
        stroke: {
            color: '#FF8000',
            width: 4
        },
        label: {
            column: 'jibun'
        },
        renderType: '3D'
    };
    var bdStyle = {
        fill: {
            color: '#90C0E8',
            opacity: 0.6
        },
        stroke: {
            color: '#2080D0',
            width: 4
        },
        label: {
            column: 'buld_nm'
        },
        renderType: '3D'
    };
    ui.openPopup("rightPopup");
    loadHtml();
    dtmap.vector.clear();
    setLdbdLayer(geom, ldLayer, ldStyle).done(function (data) { //지적
        totalCnt += data.totalFeatures;
        setLdbdLayer(geom, bdLayer, bdStyle).done(function (data) {  //건물
            totalCnt += data.totalFeatures;
            $("#totalcount", ".ldbdList").html(
                `총 검색결과 (<strong >${totalCnt}건</strong>)`
            );
        });
    });
}

function _onContext_ldbdInfo(geom) {
    var ldLayer = "digitaltwin:lsmd_cont_ldreg_41830";
    var bdLayer = "tgd_spbd_buld";
    var totalCnt = 0;
    var ldStyle = {
        fill: {
            color: '#FFC080',
            opacity: 0.6
        },
        stroke: {
            color: '#FF8000',
            width: 4
        },
        label: {
            column: 'jibun'
        },
        renderType: '3D'
    };
    var bdStyle = {
        fill: {
            color: '#90C0E8',
            opacity: 0.6
        },
        stroke: {
            color: '#2080D0',
            width: 4
        },
        label: {
            column: 'buld_nm'
        },
        renderType: '3D'
    };
    ui.openPopup("rightPopup");
    loadHtml();
    dtmap.vector.clear();
    setLdbdLayer(geom, ldLayer, ldStyle).done(function (data) { //지적
        totalCnt += data.totalFeatures;
        setLdbdLayer(geom, bdLayer, bdStyle).done(function (data) {  //건물
            totalCnt += data.totalFeatures;
            $("#totalcount", ".ldbdList").html(
                `총 검색결과 (<strong >${totalCnt}건</strong>)`
            );
        });
    });
    dtmap.draw.dispose();
}

function aj_ldbdInfo(active) {
    dtmap.vector.clear();
    dtmap.off('drawend', _onDrawEnd_ldbdInfo);
    if (active) {
        if (map2d.view.getZoom() < 19) {
            toastr.success("그리기: Point", "지도에서 위치를 클릭하세요. ");
            dtmap.draw.active({type: 'Point'});
        } else if (map2d.view.getZoom() >= 19) {
            toastr.success("그리기: Box", "지도에서 도형을 그려주세요. ");
            dtmap.draw.active({type: 'Box'});
        }
        dtmap.on('drawend', _onDrawEnd_ldbdInfo);
    }
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
    let addr;
    let road;
    let tag = ``;
    let features = dtmap.util.readGeoJson(data);
    let totalFeatures = features.length;
    var promises = [];
    var _result = [];
    for (let i = 0; i < totalFeatures; i++) {
        const position = dtmap.util.centroid(features[i].getGeometry())
        var position_5174 = proj4(dtmap.crs, "EPSG:5174", [position[0], position[1]]); //5179좌표에서 5174로 변경
        var xObj = {'_5174': position_5174[0], '_5179': position[0]};
        var yObj = {'_5174': position_5174[1], '_5179': position[1]};
        var request = cmmUtil.reverseGeocoding5174(xObj, yObj).done((result) => {
            _result.push({
                'result': result,
                'properties': data.features[i].properties,
                'feature': features[i]
            });
        });
        promises.push(request);
    }
    $.when.apply($, promises).done(function (e) {
        if (_result.length === 0) return;
        $.each(_result, function (k, v) {
            var is_last_item = (k == (_result.length - 1));
            addr = v.result.emdKorNm + " " + v.result.liKorNm;
            road = v.result.roadAddress;
            if (layerNm === "digitaltwin:lsmd_cont_ldreg_41830") {
                var jimok = v.properties.jibun.charAt(v.properties.jibun.length - 1); //열
                var jibun = v.properties.jibun.slice(0, -1); //문자
                if (k === 0) {
                    tag += `<li id="jijukFirstLi">`;
                    tag += `<p class="tit" id="jijukcount">`;
                    tag += `<span>`;
                    tag += `지적 (<strong >${totalFeatures}건</strong>)</span></p>`;
                    tag += `<ul class="dep2 land_buld_jijuk" id="jijuk">`;
                }
                tag += `<li data-id="${v.properties.gid}" data-pnu="${v.properties.pnu}"
                            data-bbox="${v.properties.bbox}" data-jibun="${jibun}"
                            data-jimok="${jimok}" data-addr="${addr}" data-road="${road}">
                            <a href="javascript:void(0);" data-id="${v.properties.gid}">${jibun}</a></li>`;
                if (is_last_item) tag += `</li></ul>`;
                $("#jijuk").data("feature", v.feature);
            } else if (layerNm === "tgd_spbd_buld") {
                var lnbrMnnm = v.result.lnbrMnnm;
                if (v.result.lnbrMnnm) {
                    lnbrMnnm = lnbrMnnm.replaceAll('0', '');
                }
                var lnbrSlno = v.result.lnbrSlno;
                if (v.result.lnbrSlno) {
                    lnbrSlno = lnbrSlno.replaceAll('0', '');
                }
                var jibun = lnbrMnnm + "-" + lnbrSlno;
                if (k === 0) {
                    tag += `<li id="buildFirstLi">`;
                    tag += `<p class="tit" id="buildcount">`;
                    tag += `<span>`;
                    tag += `건물 (<strong >${totalFeatures}건</strong>)</span></p>`;
                    tag += `<ul class="dep2" id="build">`;
                }
                tag += `<li data-id="${v.properties.bsi_int_sn}" data-gid="${v.properties.gid}" data-buld_mnnm="${v.properties.buld_mnnm}" 
                            data-buld_nm_dc="${v.properties.buld_nm_dc}" data-lnbr_slno="${v.properties.lnbr_slno}"  
                            data-buld_nm="${v.properties.buld_nm}" data-addr="${addr}" data-jibun="${jibun}" 
                            data-road="${road}"><a href="javascript:void(0);" data-gid="${v.properties.gid}">
                            ${v.properties.buld_mnnm}-${v.properties.lnbr_slno}</a></li>`;
                if (is_last_item) tag += `</li></ul>`;
                $("#build").data("feature", v.feature);
            }
        });
        $(".building-list", ".ldbdList").append(tag);
    })
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
