<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    $(document).ready(function () {
        if ($('#favorites').parent().hasClass('active')) {
            if (app2D) {
                document.getElementById("write_FVRT").style.display = "block";
            } else {
                document.getElementById("write_FVRT").style.display = "none";
            }
        }
    });

    // 즐겨찾기 등록페이지 이동
    $(".tool-popup-body .bi-write").on("click", function () {
        if (dtmap.mod === "2D") {
            $(this).addClass("active");
            // rightPopupOpen('insertFavorites', $("#searchFormFavorites")[0]);
            ui.openPopup("rightPopup");
            aj_insertFavoritesView($("#searchFormFavorites")[0]);
        } else {
            return alert("해당 기능은 2D에서 가능합니다.");
        }

    });

    // 즐겨찾기 목록 조회
    function fn_select_favorites_list() {
        document.searchFormFavorites.pageIndex.value = 1;
        aj_selectFavoritesList($("#searchFormFavorites")[0], "");
    }

    // 즐겨찾기 목록 페이지이동
    function fn_select_favorites_linkPage(pageNo) {
        document.searchFormFavorites.pageIndex.value = pageNo;
        aj_selectFavoritesList($("#searchFormFavorites")[0], "");
    }

    $(".bbs-list #fav_btn").on("click", function () {
        var loc = $(this);
        var x = loc.attr("data-x");
        var y = loc.attr("data-y");
        var z = loc.attr("data-z");
        if (app2D) {
            var yMap = app2D.getYMap();
            yMap.map.getView().setCenter([Number(x), Number(y)]);
            yMap.map.getView().setZoom(Number(z));
        } else {
            var position = TransformCoordinate(parseFloat(x), parseFloat(y), 26, 13);
            setCameraMove_3D(position.x, position.y);
        }

    });

    //즐겨찾기 상세조회
    function selectFavoriteInfoView(id) {
        //rightPopupOpen('selectavoritesView');
        aj_selectFavoritesInfoView(id, $("#searchFormFavorites")[0]);
    }


</script>
<!-- top > 즐겨찾기 -->
<div class="popup-header">즐겨찾기</div>
<div class="popup-body">

    <div class="tool-popup-body">
        <form:form name="searchFormFavorites" id="searchFormFavorites" method="post"
                   onsubmit="fn_select_favorites_list(); return false;">
            <input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
            <div class="srch-box">
                <div class="form-row">
                    <div class="col"><input type="text" class="form-control" name="searchWrd"
                                            value="<c:out value="${searchVO.searchWrd}"/>"></div>
                    <div class="col-auto">
                        <button type="submit" class="btn type01 search">조회</button>
                    </div>
                </div>
            </div>

            <div class="btn-wrap justify-content-end">
                <div>
                    <button type="button" id="write_FVRT" class="btn bi-write">등록</button>
                </div>
            </div>

            <div class="bbs-top marT10">
                <div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"/></strong>건</div>
                <div class="list-sort">
                    <span class="form-radio text group">
                        <span><input type="radio" name="sortKind" id="favoritesOrder1" value="0"
                                     <c:if test="${searchVO.sortKind == '0'}">checked</c:if>/><label
                                for="favoritesOrder1">제목순</label></span>
                        <span><input type="radio" name="sortKind" id="favoritesOrder2" value="1"
                                     <c:if test="${searchVO.sortKind == '1'}">checked</c:if>/><label
                                for="favoritesOrder2">최신순</label></span>
                    </span>
                </div>
            </div>
        </form:form>
        <div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
            <div class="bbs-default">
                <div class="bbs-list-head">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 13%;">
                            <col style="width: auto;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">등록일</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="scroll-y">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 13%;">
                            <col style="width: auto;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                        </colgroup>
                        <tbody>
                        <c:forEach items="${resultList}" var="result" varStatus="status">
                            <c:set var="bass" value="${result.bass}"/>
                            <tr onclick="javascript:selectFavoriteInfoView('<c:out value="${result.bkmkId}"/>');">
                                <td><c:out value="${result.bkmkId}"/></td>
                                <td class="subject"><a class="badge-subject"><c:out value="${result.bkmkNm}"/>
                                    <c:if test="${bass eq 'y'}">
                                    <span class="badge basic">기본</span></a>
                                    </c:if>
                                </td>
                                <td><c:out value="${result.regDt}"/></td>
                                <td onclick="event.stopPropagation();">
                                    <button type="button" id="fav_btn" class="icon-btn location"
                                            data-x="<c:out value="${result.xcord}"/>"
                                            data-y="<c:out value="${result.ycord}"/>"
                                            data-z="<c:out value="${result.cchLevel}"/>" title="이동"></button>
                                    <button type="button" class="icon-btn edit" title="다시저장"
                                            onclick="aj_updateFavoritesView('<c:out
                                                    value="${result.bkmkId}"/>')"></button>
                                        <%--                                            <button type="button" class="btn basic bi-delete2" title="삭제" onclick="aj_deleteFavoritesView('<c:out value="${result.bkmkId}" />')">삭제</button>--%>

                                </td>
                            </tr>
                        </c:forEach>
                        <c:if test="${fn:length(resultList) == 0}">
                            <tr>
                                <td class="noData" colspan="5">데이터가 없습니다.</td>
                            </tr>
                        </c:if>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="pagination">
                <ui:pagination paginationInfo="${paginationInfo}" type="pagination"
                               jsFunction="fn_select_favorites_linkPage"/>
            </div>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('즐겨찾기')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 즐겨찾기 -->