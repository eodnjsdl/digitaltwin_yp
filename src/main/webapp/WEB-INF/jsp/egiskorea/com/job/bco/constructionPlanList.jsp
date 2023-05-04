<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- 공사계획 정보 -->
<script src="/js/egiskorea/com/job/bco/cwp.js"></script>
<!-- 공사예정정보 -->
<!--<script src="/js/egiskorea/com/job/bco/cws.js"></script>-->
<!-- 공사정보 조회 -->
<!--<script src="/js/egiskorea/com/job/bco/cwi.js"></script>-->

<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>

<script type="text/javascript">
    var rePageChk = true;
    // 시기 - 년도
    var rePlnYear = "<c:out value='${searchVO.plnYear}'></c:out>";
    // 시기 - 분기
    var rePlnQu = "<c:out value='${searchVO.plnQu}'></c:out>";
    // 유형 - 공사유형(전체)
    var reCntrkTy = "<c:out value='${searchVO.cntrkTy}'></c:out>";
    // 유형 - 집행부서(전체)
    var reChpsnPsitn = "<c:out value='${searchVO.chpsnPsitn}'></c:out>";
    // 유형 - 읍명동(전체)
    var reCntrkLcAdres = "<c:out value='${searchVO.cntrkLcAdres}'></c:out>";

    // 유형 - 공사명
    var reCntrkNm = "<c:out value='${searchVO.cntrkNm}'></c:out>";

    var poiListPlan = ${poiList};

    var codeList = ${clCodeList};

    var html = "";
    for (var i = 0; i < codeList.resultList.length; i++) {
        html += "<option value='" + codeList.resultList[i].codeId + "'>" + codeList.resultList[i].codeIdNm + "</option>"
    }
    $("#cntrkTy").append(html);

    callSelectOptions();

    //Poi 추가
    dtmap.vector.clear();
    for (let i = 0; i < poiListPlan.resultList.length; i++) {
        console.log(poiListPlan);
        let poi = poiListPlan.resultList[i];
        dtmap.vector.addPoint({
            id: poi.cntrkPlnId,
            coordinates: [Number(poi.lon), Number(poi.lat)],
            crs: 'EPSG:5179',
            properties: poi,
            style: {
                label: {
                    column: 'cntrkNm'
                },
                marker: {
                    src: './images/poi/constructionPlan_poi.png'
                }
            }
        })
    }
    dtmap.vector.fit();

</script>
<!-- 업무 > 공간정보활용 > 사업공유관리 -->
<!-- <div class="popup-panel popup-left work-01-01" style="left: 320px;width: 515px;height: 807px;"> -->
<div class="popup-header" id="headerConstructionPlan">사업공유관리</div>
<div class="popup-body">
    <div class="left-popup-body">
        <div class="tabBoxDepth1-wrap">
            <div class="tabBoxDepth1">
                <ul>
                    <li data-tab="constructionPlan" class="on">
                        <button id="constructionPlan" type="button" class="inner-tab leftPopup"
                                data-tab="constructionPlan">공사계획정보
                        </button>
                    </li>
                    <li data-tab="constructionSchedule">
                        <button id="constructionSchedule" type="button" class="inner-tab leftPopup"
                                data-tab="constructionSchedule">공사예정정보
                        </button>
                    </li>
                    <li data-tab="constructionInquiry">
                        <button id="constructionInquiry" type="button" class="inner-tab leftPopup"
                                data-tab="constructionInquiry">공사정보 조회
                        </button>
                    </li>
                </ul>
            </div>
            <!-- 공사계획정보 -->
            <div class="tab-cont constructionPlan on" id="divConstructionPlan">
                <form:form name="searchPlanForm" id="searchPlanForm" method="post"
                           onsubmit="fn_selectPlan_linkPage(1); return false;">
                    <input type="hidden" name="pageIndex" id="pageIndex"
                           value="<c:out value='${searchVO.pageIndex}' />">
                    <div class="srch-box">
                        <div class="srch-default">
                            <table class="srch-tbl">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">시기</th>
                                        <%-- <td>
                                            <div class="form-row">
                                                <div class="col"><div class="datapicker-group"><input type="text" id="srchStrtDate" name="srchStrtDate" class="datepicker" value="<c:out value='${searchVO.srchStrtDate}'></c:out>"></div></div>
                                                <div class="col-auto form-dash">~</div>
                                                <div class="col"><div class="datapicker-group"><input type="text" id="srchEndDate" name="srchEndDate" class="datepicker" autocomplete="off" value="<c:out value='${searchVO.srchEndDate}'></c:out>"></div></div>
                                            </div>
                                        </td>  --%>
                                    <td>
                                        <select name="plnYear" id="plnYear" class="form-select w-auto"
                                                style="width: 49.5%;">
                                            <option value="">전체</option>
                                        </select>
                                        <select name="plnQu" id="plnQu" class="form-select w-auto"
                                                style="width: 49.5%;">
                                            <option value="">전체</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" class="align-top">유형</th>
                                    <td>
                                        <div class="form-row">
                                            <div class="col">
                                                <select class="form-select" id="cntrkTy" name="cntrkTy">
                                                    <option value="">전체</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select" id="chpsnPsitn" name="chpsnPsitn">
                                                    <option value="">집행부서</option>
                                                    <option value="건설과">건설과</option>
                                                    <option value="토지과">토지과</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <select class="form-select" id="cntrkLcAdres" name="cntrkLcAdres">
                                                    <option value="">전체</option>
                                                    <c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
                                                        <option value="<c:out value='${emdList.emdKorNm}'></c:out>">
                                                            <c:out value="${emdList.emdKorNm}"></c:out></option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">공사명</th>
                                    <td><input type="text" class="form-control" placeholder="공사명을 입력해주세요." id="cntrkNm"
                                               name="cntrkNm" value="<c:out value='${searchVO.cntrkNm}' />"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="btn-wrap">
                            <div>
                                <button type="button" class="btn type01 search" name="cplSearch">조회</button>
                            </div>
                        </div>
                    </div>
                </form:form>
                <div class="bbs-top">
                    <div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"></c:out></strong>건</div>
                    <div><a class="btn bi-write" target="_blank" id="cwpRegist">등록</a></div>
                </div>
                <div class="bbs-list-wrap" style="height: 456px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
                    <div class="bbs-default">
                        <div class="bbs-list-head">
                            <table class="bbs-list">
                                <colgroup>
                                    <%-- <col style="width: 10%;"> --%>
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <thead>
                                <tr>
                                    <!-- <th scope="col">
                                        <span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
                                    </th> -->
                                    <th scope="col">공사유형</th>
                                    <th scope="col">집행부서</th>
                                    <th scope="col">집행시기</th>
                                    <th scope="col">공사명</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="scroll-y">
                            <table class="bbs-list">
                                <colgroup>
                                    <%-- <col style="width: 10%;"> --%>
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <c:forEach items="${resultList}" var="cpList" varStatus="status">
                                    <tr name="tdCwpDtl" id="tdCwpDtl" data-cpi='<c:out value="${cpList.cntrkPlnId}" />'
                                        data-lon='<c:out value="${cpList.lon}" />'
                                        data-lat='<c:out value="${cpList.lat}" />'>
                                            <%-- <td>
                                                <span class="form-checkbox">
                                                    <span>
                                                        <input type="checkbox" name="ipCpChecBox" id="<c:out value='${cpList.cntrkPlnId}'></c:out>" data-cpi='<c:out value="${cpList.cntrkPlnId}"></c:out>'>
                                                        <label for="<c:out value='${cpList.cntrkPlnId}'></c:out>"></label>
                                                    </span>
                                                </span>
                                            </td> --%>
                                        <c:forEach items="${codeList}" var="codeList" varStatus="status">
                                            <c:if test="${cpList.cntrkTy eq codeList.codeId}">
                                                <td><c:out value="${codeList.codeIdNm}"></c:out></td>
                                            </c:if>
                                        </c:forEach>
                                        <td><c:out value="${cpList.chpsnPsitn}"></c:out></td>
                                        <td><c:out value="${cpList.plnYear}"></c:out>년 <c:out
                                                value="${cpList.plnQu}"></c:out></td>
                                        <td><c:out value="${cpList.cntrkNm}"></c:out></td>
                                    </tr>
                                </c:forEach>
                                <c:if test="${fn:length(resultList) == 0}">
                                    <tr>
                                        <td colspan="4">데이터가 없습니다.</td>
                                    </tr>
                                </c:if>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pagination">
                        <ui:pagination paginationInfo="${paginationInfo}" type="pagination"
                                       jsFunction="fn_selectPlan_linkPage"/>
                    </div>
                    <!-- <div class="pagination">
                        <a href="javascript:void(0);" class="first" title="처음"></a>
                        <a href="javascript:void(0);" class="prev" title="이전"></a>
                        <strong class="current">1</strong>
                        <a href="javascript:void(0);">2</a>
                        <a href="javascript:void(0);">3</a>
                        <a href="javascript:void(0);">4</a>
                        <a href="javascript:void(0);">5</a>
                        <a href="javascript:void(0);" class="next" title="다음"></a>
                        <a href="javascript:void(0);" class="last" title="마지막"></a>
                    </div> -->

                    <!-- <div class="btn-wrap"><div><button type="button" class="btn basic bi-delete2">선택삭제</button></div></div> -->
                </div>
            </div>
            <!-- //공사계획정보 -->
        </div>
    </div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사업공유관리')"></button>
<button type="button" class="popup-close" title="닫기" onclick="removeLayer(); destroy();"></button>
<button type="button" class="popup-reset" class="초기화" onclick="leftPopupOpen('constructionPlan')"></button>
<button type="button" class="popup-left-toggle" title="접기"></button>
<!-- </div> -->
<!-- //업무 > 공간정보활용 > 사업공유관리 -->