<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    $(document).ready(function () {
        eventBindByUpdateFvrtView();
    });

    function eventBindByUpdateFvrtView() {
        // 즐겨찾기 목록조회
        $(".btn-wrap .bi-cancel").on("click", function () {
            $(this).addClass("active");
            //     rightPopupOpen('favorites');

            aj_selectFavoritesInfoView(null, $("#updateFormFavorites")[0]);
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
            // if (app2D) {
            //     const yMap = app2D.getYMap();
            //     yMap.exportImage().done((data) => {
            //         $(".bookmark-basic img").attr("src", data);
            //     });
            // } else {
            //     // TO-DO 3D 지도 부분
            // }
        });
        // 즐겨찾기 수정
        $(".btn-wrap .bi-write2").on("click", function () {
            aj_updateFavorites($("#updateFormFavorites")[0]);
        });
    }

</script>
<!-- top > 즐겨찾기 -->
<div class="popup-header">즐겨찾기</div>
<div class="popup-body">
    <div class="tool-popup-body">
        <form:form name="updateFormFavorites" id="updateFormFavorites" method="post"
                   onsubmit="updateFormFavorites(); return false;">
            <input type="hidden" name="emplyrId" value="<c:out value='${emplyrId}' />">
            <input type="hidden" name="bkmkId" id="bkmkId" value="<c:out value="${result.bkmkId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">


            <h3 class="cont-tit">즐겨찾기 수정하기</h3>

            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 18%;">
                        <col style="width: auto;">
                        <col style="width: 18%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td colspan="3"><input type="text" class="form-control" name="bkmkNm"
                                               value="<c:out value="${result.bkmkNm}" />"></td>
                    </tr>
                    <tr>
                        <th scope="row">등록일</th>
                        <td><c:out value="${result.regDt}"/></td>
                        <th scope="row">수정일</th>
                        <td><c:out value="${result.modfDt}"/></td>
                    </tr>
                    <tr>
                        <th scope="row">기본화면</th>
                        <td colspan="3">
                                <span class="form-checkbox text">
                                    <span><input type="checkbox" name="ch_bass"
                                                 id="bass" ${result.bass == "y" ? "CHECKED" : ""}><label for="bass">기본화면으로 저장</label></span>
                                </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div class="cont" style="height: 500px;">
                                <div class="btn-wrap justify-content-end marT0 marB5">
                                    <button type="button" class="btn basic bi-save">현재위치 저장</button>
                                </div>
                                <div class="bookmark-basic"><img src="data:image:jpg;base64,<c:out value="${imgSrc}" />"
                                                                 alt=""></div>
                                <div class="marT10">
                                    <ul>
                                        <li id="fvrtCord"><span class="">중심위치 : </span> <c:out value="${result.xcord}"/>, <c:out
                                                value="${result.ycord}"/></li>
                                        <li id="fvrtZoom"><span class="">레벨 : </span> <c:out value="${result.cchLevel}"/></li>
                                            <%--                                            <li><span class="">배경지도 : </span> -</li>--%>
                                            <%--                                            <li><span class="">레이어 : </span> -</li>--%>
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
                    <button type="button" class="btn basic bi-write2">수정</button>
                    <button type="button" class="btn basic bi-cancel">취소</button>
                </div>
            </div>
        </form:form>
    </div>


</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('즐겨찾기')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 즐겨찾기 -->