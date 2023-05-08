<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    $(document).ready(function () {
        eventBindByInsertFvrtView();
        initInsertFavtView();
    });

    function initInsertFavtView() {
        const promise = dtmap.toImage();
        promise.then(function (data) {
            $(".bookmark-basic img").attr("src", data);
            var centerx = dtmap.getCenter()[0];
            var centery = dtmap.getCenter()[1];
            var zoom = map2d.view.getZoom();
            var _coordiHtml = '';
            _coordiHtml += '<span class="">중심위치 : </span>';
            _coordiHtml += ' ' + centerx + ", " + centery;
            var _zoomiHtml = '';
            _zoomiHtml += '<span class="">레벨 : </span>';
            _zoomiHtml += ' ' + zoom;
            $("#fvrtCord").empty().append(_coordiHtml);
            $("#fvrtZoom").empty().append(_zoomiHtml);
        });
    }

    function eventBindByInsertFvrtView() {
        // 즐겨찾기 목록조회
        $(".btn-wrap .bi-cancel").on("click", function () {
            $(this).addClass("active");
//         rightPopupOpen('favorites');
            aj_selectFavoritesList($("#insertFormFavorites")[0]);
        });
        // 즐겨찾기 등록
        $(".btn-wrap .bi-write2").on("click", function () {
            // 미입력 관련 VALIDATE
            var sj = $("#bkmkNm").val();
            if (sj == '') {
                toastr.warning("제목을 입력해 주세요.");
                return;
            } else {
                aj_insertFavorites($("#insertFormFavorites")[0]);
            }
        });
        // 현재 화면 저장
        $(".btn-wrap .bi-save").on("click", function () {
            const promise = dtmap.toImage();
            promise.then(function (data) {
                $(".bookmark-basic img").attr("src", data);
                var  centerx= dtmap.getCenter()[0] ;
                var  centery= dtmap.getCenter()[1] ;
                var zoom = map2d.view.getZoom();
                var _coordiHtml = '';
                _coordiHtml += '<span class="">중심위치 : </span>';
                _coordiHtml+= ' ' + centerx + ", " + centery;
                var _zoomiHtml = '';
                _zoomiHtml += '<span class="">레벨 : </span>';
                _zoomiHtml += ' ' + zoom;
                $("#fvrtCord").empty().append(_coordiHtml);
                $("#fvrtZoom").empty().append(_zoomiHtml);
            });
        });
    }

</script>

<!-- top > 즐겨찾기 -->
<div class="popup-header">즐겨찾기</div>
<div class="popup-body">

    <div class="tool-popup-body">
        <form:form name="insertFormFavorites" id="insertFormFavorites" method="post"
                   onsubmit="insertFormFavorites(); return false;">
            <input type="hidden" name="emplyrId" value="<c:out value='${emplyrId}' />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">

            <h3 class="cont-tit marT0">즐겨찾기 등록하기</h3>
            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 22%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="form-control" id="bkmkNm" name="bkmkNm"></td>
                    </tr>
                    <tr>
                        <th scope="row">기본화면</th>
                        <td>
                                <span class="form-checkbox text">
                                    <span><input type="checkbox" name="ch_bass" id="bass"><label
                                            for="bass">기본화면으로 저장</label></span>
                                </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="cont" style="height: 310px;">
                                <div class="btn-wrap justify-content-end marT0 marB5">
                                    <button type="button" class="btn basic bi-save">현재위치 저장</button>
                                </div>
                                <div class="bookmark-basic"><img src="data:image:jpg;base64,<c:out value="${imgSrc}" />" alt=""></div>
                                <div class="marT10">
                                    <ul>
                                        <li id="fvrtCord"></li>
                                        <li id="fvrtZoom"></li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                <div>
                    <button type="button" class="btn basic bi-write2">등록</button>
                    <button type="button" class="btn basic bi-cancel">취소</button>
                </div>
            </div>
        </form:form>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('즐겨찾기')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 즐겨찾기 -->