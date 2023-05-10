<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="lnb-header"><h2 class="tit">레이어</h2></div>
<div class="lnb-body">
    <div class="srch-box marB5">
        <form action="">
            <div class="form-row">
                <div class="col"><input type="text" name="searchKeyword" class="form-control" placeholder="레이어명 검색"
                                        onkeypress="javascript:if(event.keyCode===13) aj_selectLayerList('left');">
                </div>
                <div class="col-auto">
                    <button type="button" class="btn type01 search" onclick="aj_selectLayerList('left');">검색</button>
                </div>
            </div>
        </form>
    </div>

    <div class="btn-wrap justify-content-end marT5 marB10">
        <button type="button" id="layerManagement" class="btn basic bi-setting layer-mng leftPopup"
                data-popup="left-layer-mng">레이어관리
        </button>
    </div>

    <div class="scroll-y">
        <ul class="layer-list">
            <c:forEach var="result" items="${resultList}" varStatus="status">
            <c:if test="${result.lyrCl ne ctgr}">
            <c:if test="${!status.first}">
        </ul>
        </li>
        </c:if>

        <li id="ctgr_<c:out value="${result.lyrCl}"/>">
											<span class="form-checkbox">
												<c:if test="${result.lyrClNm ne '정사영상'}">
                                                    <input type="checkbox"
                                                           name="chk_ctgr_<c:out value="${result.lyrCl}"/>"
                                                           id="chk_ctgr_<c:out value="${result.lyrCl}"/>">
                                                </c:if>
												<label for="chk_ctgr_<c:out value="${result.lyrCl}"/>"
                                                       data-title="<c:out value="${result.lyrClNm}"/>"><c:out
                                                        value="${result.lyrClNm}"/></label>
											</span>
            <button type="button" class="layer-toggle close" title="접기"></button>
            <ul class="layer-list-dep2">

                </c:if>

                <li title="<c:out value="${result.dataName}"/>">
											<span class="form-checkbox">
												<input type="checkbox"
                                                       id="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>"
                                                       name="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>"
                                                       data-layer="<c:out value="${result.shpDataStoreName}"/>:<c:out value="${result.shpTableName}"/>"
                                                       data-shpType="<c:out value="${result.shpDataType}"/>"
                                                       data-desc="<c:out value="${result.dataDesc}"/>"
                                                       <c:if test="${result.dataType eq 'I' or result.dataType eq 'D' or result.dataType eq 'L' or result.dataType eq 'G'}">class="only3d"</c:if>>
													
												<label for="layer_<c:out value="${result.dataType}"/>_<c:out value="${result.dataid}"/>"
                                                       data-title="<c:out value="${result.dataName}"/>"><c:out
                                                        value="${result.dataName}"/></label>
											</span>
                    <div>
                        <c:if test="${result.dataType eq 'S'}">
                            <button type="button" class="layer-btn layer-detail" data-popup="left-layer-info"
                                    title="정보"></button>
                        </c:if>
                        <c:if test="${result.emplyrId ne 'SYSTEM'}">
                            <button type="button" class="layer-btn layer-delete" title="삭제"
                                    onclick="aj_deleteLayerListInfo(this)"></button>
                        </c:if>
                    </div>
                </li>

                <c:if test="${status.last}">
            </ul>
        </li>
        </c:if>
        <c:set var="ctgr" value="${result.lyrCl}"/>
        </c:forEach>
        <c:if test="${fn:length(resultList) == 0}">
            <li class="noData">
                <p>검색 결과가 없습니다.</p>
            </li>
        </c:if>
        </ul>


    </div>

</div>

<div class="lnb-util">
    <button type="button" class="manualBtn" title="도움말"></button>
    <button type="button" class="lnb-resetBtn" title="초기화"></button>
    <button type="button" class="lnb-close" title="닫기"></button>
</div>
<script>
    $(document).ready(function () {
        //슬라이더바
        var handle = $("#custom-handle");
        $(".slider-box .slider").slider({
            value: 100,
            min: 0,
            max: 100,
            step: 10,
            range: "min",
            create: function () {
                handle.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                handle.text(ui.value);
                setPlanetTransparency(ui.value);
            },
            change: function (event, ui) {
            }
        });

        // 레이어 관리 버튼 활성화 체크
        if ($(".layerMng-body").closest("#leftPopup").hasClass("opened")) {
            $("button.layer-mng").addClass("active");
        }

        // 레이어 정보 상세보기 클릭 event
        $(".layer-list .layer-detail").click(function () {
            var layerId = $(this).closest("li").find(".form-checkbox input[type='checkbox']").attr("id").split("_")[2];

            $(".layer-list li").find(".active").removeClass("active");
            $(this).closest("li").addClass("active").siblings().removeClass("active");
            ui.openPopup('leftPopup', 'layerInfo');
            aj_updateLayerInfoView(layerId);
            if (!$(this).closest("li").find("input[type='checkbox']").prop("checked")) {
                $(this).closest("li").find("input[type='checkbox']").click();
            }
        });

        // 레이어 메뉴 토글 event
        $(".layer-list .layer-toggle").click(function () {
            $(this).find(".open").removeClass("open").addClass("close");

            if ($(this).hasClass("close")) {
                $(this).removeClass("close").addClass("open").attr("title", "펼치기");
                $(this).next(".layer-list-dep2").slideUp(200);

            } else if ($(this).hasClass("open")) {
                $(this).removeClass("open").addClass("close").attr("title", "접기");
                $(this).next(".layer-list-dep2").slideDown(200);
            }
        });

        // 레이어관리 button event
        $(".lnb-layer .layer-mng").on("click", function () {
            $(this).addClass("active");
            ui.openPopup("leftPopup", "layerManagement");
            aj_selectLayerManagementList();
        });

        // 팝업창 닫기 event
        $(".lnb-layer .lnb-close").click(function () {
            $(".lnb-layer").stop().fadeOut(100);
            $("#lnb li[data-menu]").removeClass("on");
            $('#leftPopup.opened').removeClass('opened');
        });

        // 초기화 button event
        $("#side .lnb-layer .lnb-resetBtn").click(function () {
            dtmap.layer.clear();
            $('.lnb-layer [name="searchKeyword"]').val(null);
            aj_selectLayerList('left', true);
        });
        $('.layer-list :checkbox').on('change', function (e) {
            const visible = this.checked;
            const $this = $(this);
            const $ul = $this.closest('ul');

            if ($ul.hasClass('layer-list')) {
                //상위버튼
                const $li = $this.closest('li');
                $li.find('ul input[type="checkbox"]').each(function (i, v) {
                    $(v).prop('checked', visible).change();
                });

            } else {
                //하위버튼
                const id = $this.attr('id');
                let layerNm = $this.data('layer');
                const title = $this.data('title');
                const desc = $this.data('desc');
                const shpType = $this.data('shptype');

                if (desc) {
                    layerNm = desc;
                }

                let type = dtmap.mod === '3D' ? LAYER_TYPE[id.split('_')[1]] : 'WMS';
                let layerId = id.split('_')[2];
                let only3d = id.split('_')[3];

                if (only3d && dtmap.mod !== '3D') {
                    console.warn('3D지도에서만 사용 가능합니다.');
                    toastr.warning("3D지도에서만 사용 가능합니다.");
                }
                const findLayer = store.facility
                    .getData()
                    .find((layer) => layer["tblNm"] === layerNm.split(':')[1]);

                dtmap.showLayer({
                    id: layerId,
                    type: type,
                    layerNm: layerNm,
                    title: title,
                    visible: visible,
                    shpType: shpType,
                    // sld : 'http://124.49.110.155:8080/lyr/lyi/sld?lyrId='+layerId
                    sldBody: findLayer.styleInfo

                });
                console.log('[레이어]', layerNm, visible ? 'on' : 'off')
            }

        })

    });

    // 개인별 레이어 목록 항목 제거
    function aj_deleteLayerListInfo(btn) {
        const $li = $(btn).closest("li");
        const $checkbox = $li.find('input[type="checkbox"]');
        const id = $checkbox.attr('id');
        const dataId = id.split("_")[2];
        const type = dtmap.mod === '3D' ? LAYER_TYPE[id.split('_')[1]] : 'WMS';
        if (!confirm("레이어를 목록에서 제거하시겠습니까?")) {
            return;
        }

        dtmap.showLayer({
            id: dataId,
            type: type,
            visible: false
        });

        $.ajax({
            type: "POST",
            url: "/lyr/lym/deleteLayerListInfo.do",
            data: {
                dataid: dataId
            },
            dataType: "json",
            async: false,
            success: function (returnData, status) {
                if (returnData.result === "success") {
                    toastr.success("레이어를 목록에서 성공적으로 제거하였습니다.");
                    aj_selectLayerList("left");

                    $(".scroll-y").mCustomScrollbar({
                        scrollbarPosition: "outside"
                    });
                } else if (returnData.result === "fail") {
                    toastr.error("레이어를 목록에서 제거하는 데 실패하였습니다.");
                }
            }, complete: function () {
                ui.loadingBar("hide");
            }
        });
    }
</script>
						