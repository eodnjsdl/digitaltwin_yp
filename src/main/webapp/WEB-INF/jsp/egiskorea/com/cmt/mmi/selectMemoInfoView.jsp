<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>
    // 메모정보 목록조회
    $(".btn-wrap .bi-list").on("click", function () {

        $(this).addClass("active");
        aj_selectMemoInfoList($("#selectMemoInfoViewForm")[0]);
    });

    //메모정보 게시글 이동
    function selectMemoInfoView(id) {
        // rightPopupOpen('selectMemoInfoView',id, $("#selectMemoInfoViewForm")[0]);
        // ui.openPopup("rightPopup");
        aj_selectMemoInfoView(id, $("#selectMemoInfoViewForm")[0]);
    }

    //메모정보 수정페이지 이동
    $(".top-memo-body .btn-wrap .bi-edit").on("click", function () {
        $(this).addClass("active");
        <%--rightPopupOpen('updateMemoInfo', <c:out value="${result.memoId}" />, $("#updateDeleteMemoInfoForm")[0]);--%>
        // ui.openPopup("rightPopup");
        aj_updateMemoInfoView(<c:out value="${result.memoId}" />, $("#updateDeleteMemoInfoForm")[0]);

    });

    //메모정보 삭제
    $(".top-memo-body .btn-wrap .bi-delete").on("click", function () {
        if (confirm("메모정보를 삭제하시겠습니까?") == true) {    //확인
            aj_deleteMemoInfo($("#updateDeleteMemoInfoForm")[0]);
        } else {   //취소
            return false;
        }
    });


    $(function () {
        const wkt = "<c:out value="${result.wkt}" />";
        const sj = "<c:out value="${result.sj}" />";
        const id = "<c:out value="${result.memoId}" />";
        const reader = new ol.format.WKT();
        const feature = new ol.Feature(reader.readGeometry(wkt));
        feature.setId(id);
        const features = [];
        features.push(feature);
        const format = new ol.format.GeoJSON();
        const geojson = format.writeFeatures(features);
        // const feature = format.readFeatures(geojson);
        const geometry = reader.readGeometry(wkt);
        const pointX = geometry.flatCoordinates[0];
        const pointY = geometry.flatCoordinates[1];
        // dtmap.vector.clear();
        //지도에 GeoJSON 추가
        dtmap.vector.readGeoJson(geojson, function (feature) {
            return {
                marker: {
                    src: '/images/poi/memo_poi.png'
                },
                label: {
                    text: sj
                }
            }
        });
        dtmap.vector.select(feature.getId());
        cmmUtil.reverseGeocoding(pointX, pointY).done((result) => {
            $("#loc_memo").html(result["address"]);
        });

        // cmmUtil.highlightFeatures(geojson, "/images/poi/memo_poi.png");
        // const yMap = app2D.getYMap();
        // util.gis.moveFeatures(yMap.getMap(), feature);


        <%--if (app2D) {--%>
        <%--    const wkt = "<c:out value="${result.wkt}" />";--%>
        <%--    const reader = new ol.format.WKT();--%>
        <%--    const features = [];--%>
        <%--    features.push(new ol.Feature(reader.readGeometry(wkt)));--%>
        <%--    const format = new ol.format.GeoJSON();--%>
        <%--    const geojson = format.writeFeatures(features);--%>
        <%--    const feature = format.readFeatures(geojson);--%>
        <%--    const geometry = reader.readGeometry(wkt);--%>
        <%--    const pointX = geometry.flatCoordinates[0];--%>
        <%--    const pointY = geometry.flatCoordinates[1];--%>

        <%--    cmmUtil.highlightFeatures(geojson, "/images/poi/memo_poi.png");--%>
        <%--    cmmUtil.reverseGeocoding(pointX, pointY).done((result) => {--%>
        <%--        $("#loc_memo").html(result["address"]);--%>
        <%--    });--%>
        <%--    const yMap = app2D.getYMap();--%>
        <%--    util.gis.moveFeatures(yMap.getMap(), feature);--%>
        <%--} else {//상세정보 조회시 줌인--%>
        <%--    var list = ${gsonResultList};--%>
        <%--    if (list.wkt) {--%>
        <%--        var pointX = parseFloat(list.wkt.split(" ")[0].split("(")[1])--%>
        <%--        var pointY = parseFloat(list.wkt.split(" ")[1].split("(")[0])--%>
        <%--        var position = TransformCoordinate(pointX, pointY, 26, 13);--%>

        <%--        cmmUtil.reverseGeocoding(pointX, pointY).done((result) => {--%>
        <%--            $("#loc_memo").html(result["address"]);--%>
        <%--        });--%>

        <%--        setCameraMove_3D(position.x, position.y);--%>
        <%--    }--%>
        <%--}--%>


    });

</script>
<!-- top > 메모정보 > 상세 -->
<div class="popup-header">메모정보</div>
<div class="popup-body">
    <div class="tool-popup-body top-memo-body">
        <form:form name="selectMemoInfoViewForm" id="selectMemoInfoViewForm" action="/" method="post">
            <%--                 <input type="hidden" name="memoId" id="memoId" value="<c:out value="${result.memoId}" />"> --%>
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
        </form:form>

        <form:form name="updateDeleteMemoInfoForm" id="updateDeleteMemoInfoForm" action="/" method="post">
            <input type="hidden" name="memoId" id="memoId" value="<c:out value="${result.memoId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
        </form:form>

        <div class="bbs-detail-default">
            <table class="bbs-detail">
                <colgroup>
                    <col style="width: 20%;">
                    <col style="width: auto;">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row">제목</th>
                    <td><c:out value="${result.sj}"/></td>
                </tr>
                <tr>
                    <th scope="row">작성자</th>
                    <td><c:out value="${result.userNm}"/></td>
                </tr>
                <tr>
                    <th scope="row">등록일</th>
                    <td><c:out value="${result.regDt}"/></td>
                </tr>
                <tr>
                    <th scope="row">공유</th>
                    <td><c:if test="${result.pnrsAt == '0'}">공유</c:if><c:if
                            test="${result.pnrsAt == '1'}">공유안함</c:if></td>
                </tr>
                <tr>
                    <th scope="row">위치</th>
                    <td><span id="loc_memo"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="cont" style="height: 391px;">
                            <div class="scroll-y">
                                <c:out value="${result.memoCn}"/>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="position-bottom btn-wrap">
            <div>
                <button type="button" class="btn basic bi-list">목록</button>
            </div>
            <div class="position-absolute right">
                <button type="button" class="btn basic bi-edit" data-popup="top-popup04-update">수정</button>
                <button type="button" class="btn basic bi-delete">삭제</button>
            </div>
        </div>

        <div class="bbs-detail-util">
            <c:if test="${null ne result.prevSj}">
                <div class="items">
                    <div class="term">이전</div>
                    <div class="desc"><a href="javascript:selectMemoInfoView('<c:out value="${result.prevMemoId}" />')"><c:out
                            value="${result.prevSj}"/></a></div>
                </div>
            </c:if>
            <c:if test="${null ne result.nextSj}">
                <div class="items">
                    <div class="term">다음</div>
                    <div class="desc"><a
                            href="javascript:selectMemoInfoView('<c:out value="${result.nextMemoId}" />');"><c:out
                            value="${result.nextSj}"/></a></div>
                </div>
            </c:if>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('메모정보')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 메모정보 > 상세 -->