<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    var inputFileList = new Array();
    var objPtInfoview = {};
    objPtInfoview.exIdx = $('input:checkbox[name=potoCheck]').length;
    objPtInfoview.fileCnt = 0;
    objPtInfoview.changeUploadMode = false;

    $(document).ready(function () {
        initPhotoInfoView();
        bindEventPhotoInfoView();
        readFilePhotoInfoView();
        checkPhotoFileCnt();
    });

    //사진파일 갯수 조회
    function checkPhotoFileCnt() {
        var deferred = $.Deferred();
        var formData = new FormData($('#updateFormPoto')[0]);
        $.ajax({
            url: "/cmt/pti/selectCntPhotoFile.do",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (result) {
                objPtInfoview.fileCnt = result.resultFileSize;
                deferred.resolve(objPtInfoview.fileCnt);
            },
            error: function (result) {
            }
        });
        return deferred;
    }

    function bindEventPhotoInfoView() {
        // 사진정보 목록조회
        $(".btn-wrap .bi-cancel").on("click", function () {
            $(this).addClass("active");
            //rightPopupOpen('potoInfo');
            aj_selectPotoInfoView(null, $("#updateFormPoto")[0]);
        });
        // 사진정보 수정
        $(".btn-wrap .bi-edit").on("click", function () {
            // dtmap.vector.clear();
            aj_updatePotoInfo($("#updateFormPoto")[0]);
            objPtInfoview.changeUploadMode = false;
        });

        $(".bi-location").on("click", aj_selectphotoLocation);

        // 사진정보 선택삭제
        $(".btn-wrap .left .bi-delete2").on("click", function () {
            if ($("input[name='potoCheck']:checked").length > 0) {
                if (confirm("선택된 사진정보를 삭제하시겠습니까?") == true) {    //확인
                    $('input:checkbox[name=potoCheck]').each(function () {
                        if (this.checked) {//checked 처리된 항목의 값
                            var idx = $('input:checkbox[name=potoCheck]').index(this);
                            var sn = $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().children()[3].value;
                            if (sn == '') {
                                inputFileList.splice(idx - objPtInfoview.exIdx, 1);
                                $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().empty();
                                $("input[name='potoAll']").prop("checked", false);
                            } else {
                                var fileSn = $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().children()[3].value;
                                $('input:checkbox[name=potoCheck]').eq(idx).parent().parent().parent().parent().empty();
                                // console.log($('#atchmnflId').val());
                                aj_deletePoto($('#atchmnflId').val(), fileSn);
                            }
                        }
                    });
                } else {   //취소
                    return false;
                }
            } else {
                toastr.warning('선택된 사진이 없습니다.');
            }
        });

        $('#potoAll').on("click", function () {
            if ($("input[name='potoAll']").prop("checked")) {
                $("input[name='potoCheck']").prop("checked", true);
            } else {
                $("input[name='potoCheck']").prop("checked", false);
            }
        });

    }

    function initPhotoInfoView() {
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
                    src: '/images/poi/poto_poi.png'
                },
                label: {
                    text: sj
                }
            }
        });
        dtmap.vector.select(feature.getId());
        cmmUtil.reverseGeocoding(pointX, pointY).done((result) => {
            $("#loc_poto").val(result["address"]);
        });
    }

    function readFilePhotoInfoView() {
        var fileTarget = $('#file');
        fileTarget.on('change', function (e) {
            objPtInfoview.changeUploadMode = true;
            var cur = $(".form-file input[type='file']").val();
            var file = e.target.files;
            var filesArr = Array.prototype.slice.call(file);
            filesArr.forEach(function (f) {
                inputFileList.push(f);
                var temp = parseInt($("input[name='potoCheck']:last").val()) + 1;
                if ($("input[name='potoCheck']").length == 0) {
                    temp = 0;
                }
                $('#potoImgUpdateList').append(`
                                            <tr>
                                                <td class="align-center"><span class="form-checkbox"><span>
                                                    <input type="checkbox" name="potoCheck" id="potoCheck` + temp + `" value="` + temp + `">
                                                    <label for="potoCheck` + temp + `"></label></span></span></td>
                                                <td class="text-overflow">` + f.name + `</td>
                                                <td><input type="text" class="form-control" name="fileCn_new"></td>
                                                <input type="hidden" name="fileSn" />
                                            </tr>`);
            });
            $(".upload-name").val(cur);
        });
    }

</script>
<!-- top > 사진정보 > 수정 -->
<div class="popup-header">사진정보</div>
<div class="popup-body">

    <div class="tool-popup-body">
        <form:form name="updateFormPoto" id="updateFormPoto" method="post" onsubmit="updateFormPoto(); return false;">
            <input type="hidden" name="phtoId" id="potoId" value="<c:out value='${result.phtoId}' />">
            <input type="hidden" id="atchmnflId" name="atchmnflId" value="<c:out value='${result.atchmnflId}' />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <h3 class="cont-tit"></h3>
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
                        <td colspan="3"><input type="text" class="form-control" name="sj"
                                               value="<c:out value="${result.sj}" />"></td>
                    </tr>
                    <tr>
                        <th scope="row">작성자</th>
                        <td colspan="3"><c:out value="${result.userNm}"/></td>
                    </tr>
                    <tr>
                        <th scope="row">등록일</th>
                        <td><c:out value="${result.regDt}"/></td>
                        <th scope="row">수정일</th>
                        <td><c:out value="${result.modfDt}"/></td>
                    </tr>
                    <tr>
                        <th scope="row">공유</th>
                        <td colspan="3">
                                <span class="form-radio text group">
                                    <span><input type="radio" name="pnrsAt" id="share1-1" value="0"
                                                 <c:if test="${result.pnrsAt == '0'}">checked</c:if>><label
                                            for="share1-1">공유함</label></span>
                                    <span><input type="radio" name="pnrsAt" id="share1-2" value="1"
                                                 <c:if test="${result.pnrsAt == '1'}">checked</c:if>><label
                                            for="share1-2">공유안함</label></span>
                                </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">위치</th>
                        <td colspan="3"><input type="text" class="form-control" id="loc_poto" style="width: 215px;"
                                               readonly>
                            <button type="button" class="btn type01 bi-location">지도에서 선택</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사진등록</th>
                        <td colspan="3">
                            <div class="form-file">
                                <input type="file" id="file" multiple accept=".png, .jpg, .jpeg"><input
                                    class="upload-name" value="파일선택">
                                <label for="file">파일찾기</label>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="cont-tit">사진 목록</h3>
            <div class="data-default" style="height: 397px;">
                <table class="data-list">
                    <colgroup>
                        <col style="width: 10%;">
                        <col style="width: 40%;">
                        <col style="width: auto;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">
                            <span class="form-checkbox"><span><input type="checkbox" name="potoAll" id="potoAll"><label
                                    for="potoAll"></label></span></span>
                        </th>
                        <th scope="col">파일</th>
                        <th scope="col">설명</th>
                    </tr>
                    </thead>
                </table>
                <div class="scroll-y">
                    <table class="data-list">
                        <colgroup>
                            <col style="width: 10%;">
                            <col style="width: 40%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody id="potoImgUpdateList">
                        <c:forEach var="resultFile" items="${resultFile}" varStatus="status">
                            <tr>
                                <td class="align-center"><span class="form-checkbox"><span><input type="checkbox"
                                                                                                  name="potoCheck"
                                                                                                  value="<c:out value="${status.index}" />"
                                                                                                  id="potoCheck<c:out value="${status.index}" />"><label
                                        for="potoCheck<c:out value="${status.index}" />"></label></span></span></td>
                                <td class="text-overflow"><c:out value="${resultFile.orignlFileNm}"/></td>
                                <td><input type="text" class="form-control" name="fileCn"
                                           value="<c:out value="${resultFile.fileCn}"/>"></td>
                                <input type="hidden" name="fileSn" value="<c:out value="${resultFile.fileSn}"/>">
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="position-bottom btn-wrap">
                <div class="position-absolute left">
                    <button type="button" class="btn basic bi-delete2">선택삭제</button>
                </div>
                <div>
                    <button type="button" class="btn basic bi-edit">수정</button>
                    <button type="button" class="btn basic bi-cancel">취소</button>
                </div>
            </div>
            <input type="hidden" id="wkt" name="wkt" value="${result.wkt}">
        </form:form>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사진정보')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 사진정보 > 수정 -->