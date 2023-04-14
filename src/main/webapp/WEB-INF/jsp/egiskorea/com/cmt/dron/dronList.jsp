<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script>

    $(document).ready(function () {
        eventBindByDronList();
        initLayerByDronList();
    });

    function initLayerByDronList() {
        const ids = [];
        const sj = [];

        dtmap.vector.clear();
        <c:forEach  items="${resultList}" var="item">
            dtmap.vector.addPoint({
                id : ${item.dronePicId},
                coordinate : [Number('${item.xcord}'),Number('${item.ycord}')],
                crs : 'EPSG:5179',
                text: '${item.sj}',
                img : './images/poi/poto_poi.png',
            })
        </c:forEach>
    }


    function eventBindByDronList() {
        // 드론정보 등록페이지 이동
        $(".dron_wirte").on("click", function () {
            $(this).addClass("active");
            // rightPopupOpen('insertDronInfo', $("#searchFormDronList")[0]);
            ui.openPopup("rightPopup");
            aj_insertDronInfoView($("#searchFormDronList")[0]);
        });
    }

    // 드론정보 목록 조회
    function fn_select_dron_list() {
        document.searchFormDronList.pageIndex.value = 1;
        aj_selectDronInfo($("#searchFormDronList")[0], "");
    }

    // 드론정보 목록 페이지이동
    function fn_select_dron_linkPage(pageNo) {
        document.searchFormDronList.pageIndex.value = pageNo;
        aj_selectDronInfo($("#searchFormDronList")[0], "");
    }

    //드론정보 상세조회
    function selectDronInfoView(id) {
//         rightPopupOpen('selectDronInfoView');
        ui.openPopup("rightPopup");
        aj_selectDronInfoView(id, $("#searchFormDronList")[0]);
    }

</script>
<div class="popup-header">드론영상</div>
<div class="popup-body">

    <div class="tool-popup-body">
        <form:form name="searchFormDronList" id="searchFormDronList" method="post"
                   onsubmit="fn_select_dron_list(); return false;">
            <input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
            <div class="srch-box">
                <div class="form-row">
                    <div class="col-auto">
                        <select class="form-select" name="searchCnd">
                            <option value="0" <c:if test="${searchVO.searchCnd == '0'}">selected="selected"</c:if>>제목
                            </option>
                            <option value="1" <c:if test="${searchVO.searchCnd == '1'}">selected="selected"</c:if>>작성자
                            </option>
                        </select>
                    </div>
                    <div class="col"><input type="text" name="searchWrd" class="form-control"
                                            value="<c:out value="${searchVO.searchWrd}"/>"></div>
                    <div class="col-auto">
                        <button type="submit" class="btn type01 search">조회</button>
                    </div>
                </div>
            </div>

            <div class="btn-wrap justify-content-end">
                <div><a href="javascript:void(0);" class="btn bi-write dron_wirte">등록</a></div>
            </div>

            <div class="bbs-top marT10">
                <div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"/></strong>건</div>
                <div class="list-sort">
                    <span class="form-radio text group">
                        <span><input type="radio" name="sortKind" id="rChk3-1" checked value="0"
                                     <c:if test="${searchVO.sortKind == '0'}">checked</c:if>><label
                                for="rChk3-1">제목순</label></span>
                        <span><input type="radio" name="sortKind" id="rChk3-2" value="1"
                                     <c:if test="${searchVO.sortKind == '1'}">checked</c:if>><label
                                for="rChk3-2">최신순</label></span>
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
                            <col style="width: 15%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">촬영일</th>
                            <th scope="col">등록일</th>
                            <th scope="col">작성자</th>
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
                            <col style="width: 15%;">
                        </colgroup>
                        <tbody>

                        <c:forEach items="${resultList}" var="result" varStatus="status">
                            <tr onclick="javascript:selectDronInfoView('<c:out value="${result.dronePicId}"/>');">
                                <td><c:out value="${(result.pageIndex-1) * result.pageUnit + status.count}"/></td>
                                <td class="subject align-left"><a><c:out value="${result.sj}"/></a></td>
                                <td><c:out value="${result.grfDe}"/></td>
                                <td><c:out value="${result.regDt}"/></td>
                                <td><c:out value="${result.userNm}"/></td>

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

            <%--                <div class="pagination">--%>
            <%--                    <a href="javascript:void(0);" class="first" title="처음"></a>--%>
            <%--                    <a href="javascript:void(0);" class="prev" title="이전"></a>--%>
            <%--                    <strong class="current">1</strong>--%>
            <%--                    <a href="javascript:void(0);">2</a>--%>
            <%--                    <a href="javascript:void(0);">3</a>--%>
            <%--                    <a href="javascript:void(0);">4</a>--%>
            <%--                    <a href="javascript:void(0);">5</a>--%>
            <%--                    <a href="javascript:void(0);" class="next" title="다음"></a>--%>
            <%--                    <a href="javascript:void(0);" class="last" title="마지막"></a>--%>
            <%--                </div>--%>
            <div class="pagination">
                <ui:pagination paginationInfo="${paginationInfo}" type="pagination"
                               jsFunction="fn_select_dron_linkPage"/>
            </div>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('드론영상')"></button>
<button type="button" class="popup-close" title="닫기"></button>

<!-- //top > 드론영상 -->