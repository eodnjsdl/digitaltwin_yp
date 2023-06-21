<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    $(document).ready(function () {
        initUpdateMemoInfo();
        bindEventUpdateMemoInfo();
    });

    function bindEventUpdateMemoInfo() {
        // 메모정보 목록조회
        $(".btn-wrap .bi-cancel").on("click", function(){
            $(this).addClass("active");
            //rightPopupOpen('memoInfo');
            aj_selectMemoInfoView(null,$("#updateFormMemo")[0]);
        });
        // 메모정보 수정
        $(".btn-wrap .bi-edit").on("click", function(){
            // 미입력 관련 VALIDATE
            var sj = $("#sj").val();
            var loc_memo = $("#loc_memo").val();
            if (sj == '') {
                toastr.warning("제목을 입력해 주세요.");
                return;
            } else if (loc_memo == '' || loc_memo == undefined) { // 위치 유무 체크
                toastr.warning("위치를 지정해 주세요.");
                return;
            } else {
                aj_updateMemoInfo($("#updateFormMemo")[0]);
            }
        });
        $(".top-memo-body .bi-location").on("click", aj_selectMemoLocation);
    }

    function initUpdateMemoInfo() {
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
            $("#loc_memo").val(result["address"]);
        });
    }

</script>
<!-- top > 메모정보 > 수정  -->
    <div class="popup-header">메모정보</div>
    <div class="popup-body">

        <div class="tool-popup-body top-memo-body">		
            <form:form name="updateFormMemo" id="updateFormMemo" method="post" onsubmit="updateFormMemo(); return false;">
                <input type="hidden" name="memoId" value="<c:out value='${result.memoId}' />">
                <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
                <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
                <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
                <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <h3 class="cont-tit">메모 수정하기</h3>
            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 20%;">
                        <col style="width: 30%;">
                        <col style="width: 20%;">
                        <col style="width: 30%;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">제목</th>
                            <td colspan="3"><input type="text" class="form-control" id="sj" name="sj" value="<c:out value="${result.sj}" />"></td>
                        </tr>
                        <tr>
                            <th scope="row">작성자</th>
                            <td colspan="3"><c:out value="${result.userNm}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">등록일</th>
                            <td><c:out value="${result.regDt}" /></td>
                            <th scope="row">수정일</th>
                            <td><c:out value="${result.modfDt}" /></td>
                        </tr>
                        <tr>
                            <th scope="row">공유</th>
                            <td colspan="3">
                                <span class="form-radio text group">
                                    <span><input type="radio" name="pnrsAt" id="share1-1" value="Y" <c:if test="${result.pnrsAt == 'Y'}">checked</c:if>><label for="share1-1">공유함</label></span>
                                    <span><input type="radio" name="pnrsAt" id="share1-2" value="N" <c:if test="${result.pnrsAt == 'N'}">checked</c:if>><label for="share1-2">공유안함</label></span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">위치</th>
                            <td colspan="3"><input type="text" class="form-control w-65p" id="loc_memo" readonly> <button type="button" class="btn type01 bi-location">지도에서 선택</button></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div class="cont">
                                    <textarea name="memoCn" id="" class="form-control" style="height: 100%;"><c:out value="${result.memoCn}" /></textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                <div><button type="button" class="btn basic bi-edit">저장</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
            </div>
            <input type="hidden" id="wkt" name="wkt" value="${result.wkt}">
            </form:form>		
        </div>
    </div>
    <button type="button" class="manualBtn" title="도움말" onclick="manualTab('메모정보')"></button>
    <button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 메모정보 > 수정  -->