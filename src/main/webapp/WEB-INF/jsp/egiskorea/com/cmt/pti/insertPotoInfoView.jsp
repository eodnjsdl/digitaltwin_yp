<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script>
    // 사진정보 목록조회
    $(".btn-wrap .bi-cancel").on("click", function () {
        $(this).addClass("active");
//         rightPopupOpen('potoInfo');
        aj_selectPotoInfoList($("#insertFormPoto")[0]);
    });
    // 사진정보 등록
    $(".btn-wrap .bi-write2").on("click", function () {

        // 미입력 관련 VALIDATE
        var sj = $("#sj").val();
        var wkt = $("#wkt").val();
        var fileLength = $("#potoImgInsertList td").length;

        if (sj == '') {
            alert("제목을 입력해주세요.");
            return;
        } else if (wkt == '' || wkt == undefined) { // 위치 유무 체크
            alert("위치를 지정해주세요.");
            return;
        } else if (fileLength == 0) { //파일이 유무 체크
            alert("파일을 선택해주세요.");
            return;
        } else {
            aj_insertPotoInfo($("#insertFormPoto")[0]);
        }
    });

    //지도에서 선택
    $(".top-pti-body .bi-location").on("click", aj_selectphotoLocation);

    // 사진정보 선택삭제
    $(".btn-wrap .left .bi-delete2").on("click", function () {
        if ($("input[name='potoCheck']:checked").length > 0) {
            var temp = $("input[name='potoCheck']:checked");
            $('input:checkbox[name=potoCheck]').each(function () {
                if (this.checked) {//checked 처리된 항목의 값
                    idx = $('input:checkbox[name=potoCheck]').index(this);
                    inputFileList.splice(idx, 1);
                }
            });
            $("input[name='potoCheck']:checked").parent().parent().parent().parent().remove();
            $("input[name='potoAll']").prop("checked", false);

        } else {
            alert('선택된 사진이 없습니다.');
        }
    });

    $('#potoAll').on("click", function () {
        if ($("input[name='potoAll']").prop("checked")) {
            $("input[name='potoCheck']").prop("checked", true);
        } else {
            $("input[name='potoCheck']").prop("checked", false);
        }
    });
    var inputFileList = new Array();

</script>
<!-- top > 사진정보 -->
<div class="popup-header">사진정보</div>
<div class="popup-body">

    <div class="tool-popup-body top-pti-body">
        <form:form name="insertFormPoto" id="insertFormPoto" method="post" onsubmit="insertFormPoto(); return false;">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">

            <h3 class="cont-tit">사진 등록하기</h3>
            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 22%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="form-control" name="sj" id="sj"></td>
                    </tr>
                    <tr>
                        <th scope="row">공유</th>
                        <td>
                                <span class="form-radio text group">
                                    <span><input type="radio" name="pnrsAt" id="share1-1" value="0" checked=""><label
                                            for="share1-1">공유함</label></span>
                                    <span><input type="radio" name="pnrsAt" id="share1-2" value="1"><label
                                            for="share1-2">공유안함</label></span>
                                </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">위치</th>
                        <td><input type="text" class="form-control" id="loc" style="width: 207px;">
                            <button type="button" class="btn type01 bi-location">지도에서 선택</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사진등록</th>
                        <td>
                            <div class="form-file">
                                <input type="file" id="file" multiple accept=".png, .jpg, .jpeg"><input
                                    class="upload-name" value="파일선택">
                                <label for="file">파일찾기</label>
                            </div>
                            <script>
                                $(document).ready(function () {
                                    var fileTarget = $('#file');
                                    fileTarget.on('change', function (e) {
                                        var cur = $(".form-file input[type='file']").val();
                                        var file = e.target.files;
                                        var filesArr = Array.prototype.slice.call(file);
                                        filesArr.forEach(function (f) {
                                            inputFileList.push(f);
                                            //var temp = $("input[name='potoCheck']").length;
                                            var temp = parseInt($("input[name='potoCheck']:last").val()) + 1;
                                            if ($("input[name='potoCheck']").length == 0) {
                                                temp = 0;
                                            }
                                            $('#potoImgInsertList').append(`
                                            <tr>
                                                <td class="align-center"><span class="form-checkbox"><span>
                                                    <input type="checkbox" name="potoCheck" id="potoCheck` + temp + `" value="` + temp + `">
                                                    <label for="potoCheck` + temp + `"></label></span></span></td>
                                                <td class="text-overflow">` + f.name + `</td>
                                                <td><input type="text" class="form-control" name="fileCn"></td>
                                            </tr>`);
                                        });
                                        $(".upload-name").val(cur);
                                    });
                                });
                            </script>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="cont-tit">사진 목록</h3>
            <div class="data-default" style="height:468px;">
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
                        <tbody id="potoImgInsertList">

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="position-bottom btn-wrap">
                <div class="position-absolute left">
                    <button type="button" class="btn basic bi-delete2">선택삭제</button>
                </div>
                <div>
                    <button type="button" class="btn basic bi-write2">등록</button>
                    <button type="button" class="btn basic bi-cancel">취소</button>
                </div>
            </div>
            <input type="hidden" id="wkt" name="wkt">
        </form:form>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사진정보')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<!-- //top > 사진정보 -->
