<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- 공사계획 정보 -->
<%--<script src="/js/egiskorea/com/job/bco/cwp.js"></script>--%>
<!-- 공사예정정보 -->
<%--<script src="/js/egiskorea/com/job/bco/cws.js"></script>--%>
<!-- 공사정보 조회 -->
<script src="/js/egiskorea/com/job/bco/cwi.js"></script>

<%--<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>--%>

<script type="text/javascript">

    // ui.callDatePicker();

    var rePlnYear = "<c:out value='${searchVO.plnYear}'></c:out>"||'';
    // 시기 - 분기
    var rePlnQu = "<c:out value='${searchVO.plnQu}'></c:out>"||'';
    // 유형 - 공사유형(전체)
    var reCntrkTy = "<c:out value='${searchVO.cntrkTy}'></c:out>"||'';
    // 유형 - 집행부서(전체)
    var reChpsnPsitn = "<c:out value='${searchVO.chpsnPsitn}'></c:out>"||'';
    // 유형 - 읍명동(전체)
    var reCntrkLcAdres = "<c:out value='${searchVO.cntrkLcAdres}'></c:out>"||'';
    // 유형 - 공사명
    var reCntrkNm = "<c:out value='${searchVO.cntrkNm}'></c:out>"||'';
    // 유형 - 담당자
    var reChpsnNm = "<c:out value='${searchVO.chpsnNm}'></c:out>"||'';

    // 공간조회 - 년도
    var rePlnYearSp = "<c:out value='${searchVO.plnYearSp}'></c:out>"||'';
    // 공간조회 - 분기
    var rePlnQuSp = "<c:out value='${searchVO.plnQuSp}'></c:out>"||'';
    // 공간조회 - 위치
    var reCntrkLcAdresSp = "<c:out value='${searchVO.cntrkLcAdresSp}'></c:out>"||'';

    // 공간조회 - 반경
    var reRadius = "<c:out value='${searchVO.radius}'></c:out>"||'';

    var geomSp = "<c:out value='${searchVO.geomSp}'></c:out>"||'';

    // 페이징 번호
    var rePageIndex = "<c:out value='${searchVO.pageIndex}'></c:out>"||'';

    var rePageType = "<c:out value='${searchVO.pageType}'></c:out>"||'';
    // 마커표출 리스트
    var poiListInquiry = ${poiList};

    // 년도 분기 값 세팅
    constructionInquiryOptions();

    function setType(type) {
        rePageType = type;
        cwi.uiType = type;
    }

    //Poi 추가
    dtmap.vector.clear();
    for (let i = 0; i < poiListInquiry.resultList.length; i++) {
        let poi = poiListInquiry.resultList[i];
        var poi_id = ""+poi.cntrkPrrngId;
        dtmap.vector.addPoint({
            id: poi_id,
            coordinates: [Number(poi.lon), Number(poi.lat)],
            crs: 'EPSG:5179',
            properties: poi,
            style: {
                label: {
                    column: 'cntrkNm',
                },
                marker: {
                    src: './images/poi/constructionSchedule_poi.png'
                }
            }
        })
    }
    dtmap.vector.fit();
</script>

<!-- 업무 > 공간정보활용 > 사업공유관리 -->
<!-- <div class="popup-panel popup-left work-01-01" style="left: 320px;width: 515px;height: 807px;"> -->
<div class="popup-header">사업공유관리</div>
<div class="popup-body">
    <div class="left-popup-body">
        <div class="tabBoxDepth1-wrap">
            <div class="tabBoxDepth1">
                <ul>
                    <li data-tab="constructionPlan">
                        <button id="constructionPlan" type="button" class="inner-tab leftPopup"
                                data-tab="constructionPlan">공사계획정보
                        </button>
                    </li>
                    <li data-tab="constructionSchedule">
                        <button id="constructionSchedule" type="button" class="inner-tab leftPopup"
                                data-tab="constructionSchedule">공사예정정보
                        </button>
                    </li>
                    <li data-tab="constructionInquiry" class="on">
                        <button id="constructionInquiry" type="button" class="inner-tab leftPopup"
                                data-tab="constructionInquiry">공사정보 조회
                        </button>
                    </li>
                </ul>
            </div>
            <!-- 공사정보 조회 -->
            <div class="tab-cont constructionInquiry on" id="divConstructionInquiry">

                <div class="tabBoxDepth2-wrap marB20">
                    <div class="tabBoxDepth2">
                        <ul>
                            <li data-tab="constructionInfo01" name="constructionInquiry01">
                                <button type="button" class="inner-tab" data-tab="constructionInfo01"
                                        onclick="setType('type01');">속성조회
                                </button>
                            </li>
                            <li data-tab="constructionInfo02" name="constructionInquiry02">
                                <button type="button" class="inner-tab" data-tab="constructionInfo02"
                                        onclick="setType('type02');">공간조회
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-cont constructionInfo01">
                        <form:form name="searchInquiryForm" id="searchInquiryForm" method="post"
                                   onsubmit="fn_selectInquiry_linkPage(1); return false;">
                        <input type="hidden" name="pageIndex" id="pageIndex"
                               value="<c:out value='${searchVO.pageIndex}' />">
                        <div class="srch-default">
                            <table class="srch-tbl">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: auto;">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th scope="row">시기</th>
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
                                                    <c:forEach items="${codeList}" var="codeList" varStatus="status">
                                                    <c:if test="${cpList.cntrkTy eq codeList.codeId}">
                                    <td><c:out value="${codeList.codeIdNm}"></c:out></td>
                                    </c:if>
                                    <option value="<c:out value='${codeList.codeId}'></c:out>"><c:out
                                            value="${codeList.codeIdNm}"></c:out></option>
                                    </c:forEach>
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
                                    <option value="<c:out value='${emdList.emdKorNm}'></c:out>"><c:out
                                            value="${emdList.emdKorNm}"></c:out></option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-4"><input type="text" class="form-control" name="chpsnNm" id="chpsnNm"
                                                  placeholder="담당자명" value="<c:out value='${searchVO.chpsnNm}' />">
                        </div>
                        <div class="col-8"><input type="text" class="form-control" name="cntrkNm" id="cntrkNm"
                                                  placeholder="공사명을 입력해주세요."
                                                  value="<c:out value='${searchVO.cntrkNm}' />"></div>
                    </div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
                <div class="btn-wrap">
                    <div>
                        <button type="submit" class="btn type01 search" name="cwiSearch" id="cwiSearch">조회</button>
                    </div>
                </div>
                </form:form>
            </div>

            <div class="tab-cont constructionInfo02">
                <form:form name="searchInquiryForm2" id="searchInquiryForm2" method="post"
                           onsubmit="fn_selectInquiry_linkPage(1); return false;">
                    <input type="hidden" name="pageIndex" id="pageIndex2"
                           value="<c:out value='${searchVO.pageIndex}' />">
                    <div class="srch-default">
                        <table class="srch-tbl">
                            <colgroup>
                                <col style="width: 15%;">
                                <col style="width: auto;">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">시기</th>
                                <!-- <td>
                                    <div class="form-row">
                                        <div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="from datepicker"></div></div>
                                        <div class="col-auto form-dash">~</div>
                                        <div class="col"><div class="datapicker-group"><input type="text" id="" name="" class="to datepicker" autocomplete="off"></div></div>
                                    </div>
                                </td> -->
                                <td>
                                    <select name="plnYearSp" id="plnYearSp" class="form-select w-auto"
                                            style="width: 49.5%;">
                                        <option value="">전체</option>
                                    </select>
                                    <select name="plnQuSp" id="plnQuSp" class="form-select w-auto"
                                            style="width: 49.5%;">
                                        <option value="">전체</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="align-top">위치</th>
                                <td>
                                    <div class="form-row">
                                        <div class="col"><input type="text" class="form-control" name="cntrkLcAdresSp"
                                                                id="cntrkLcAdresSp" readonly></div>
                                        <div class="col-auto">
                                            <button type="button" class="btn type01 bi-location" id="getInquiryPosition"
                                                    name="getInquiryPosition">지도에서 선택
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="align-top">반경</th>
                                <td><input type="text" class="form-control w-100 " placeholder="0" name="radius"
                                           id="radius"> <sub>m</sub></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
                        <div>
                            <button type="button" class="btn type01 search" name="cwiSearch02" id="cwiSearch02">조회
                            </button>
                        </div>
                    </div>
                    <input type="hidden" name="pageType" id="pageType" value="<c:out value='${searchVO.pageType}' />">
                    <input type="hidden" name="geomSp" id="geomSp" value="">
                </form:form>
            </div>
        </div>


        <div class="bbs-top">
            <div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"></c:out></strong>건</div>
        </div>
        <div class="bbs-list-wrap" style="height: 432px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
            <div class="bbs-default">
                <div class="bbs-list-head">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 20%;">
                            <col style="width: 25%;">
                            <col style="width: 20%;">
                            <col style="width: auto;">
                        </colgroup>
                        <thead>
                        <tr>
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
                            <col style="width: 20%;">
                            <col style="width: 25%;">
                            <col style="width: 20%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                        <c:forEach items="${resultList}" var="cwiList" varStatus="status">
                            <tr name="tdCwiDtl" data-cwiid='<c:out value="${cwiList.cntrkPrrngId}" ></c:out>'
                                data-lon='<c:out value="${cwiList.lon}" ></c:out>'
                                data-lat='<c:out value="${cwiList.lat}" ></c:out>'>
                                <c:forEach items="${codeList}" var="codeList" varStatus="status">
                                    <c:if test="${cwiList.cntrkTy eq codeList.codeId}">
                                        <td><c:out value="${codeList.codeIdNm}"></c:out></td>
                                    </c:if>
                                </c:forEach>
                                <td><c:out value="${cwiList.chpsnPsitn}"></c:out></td>
                                <td><c:out value="${cwiList.plnYear}"></c:out>년 <c:out
                                        value="${cwiList.plnQu}"></c:out></td>
                                <td><c:out value="${cwiList.cntrkNm}"></c:out></td>
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
                               jsFunction="fn_selectInquiry_linkPage"/>
            </div>
        </div>
    </div>
    <!-- //공사정보 조회 -->
</div>
</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사업공유관리')"></button>
<button type="button" class="popup-close" title="닫기" onclick="removeLayer(); /*destroy();*/"></button>
<button type="button" class="popup-reset" class="초기화" onclick="removeInquiryPage()"></button>
<button type="button" class="popup-left-toggle" title="접기"></button>
<!-- </div> -->
<!-- //업무 > 공간정보활용 > 사업공유관리 -->		