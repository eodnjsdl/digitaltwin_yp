<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- top > 드론영상 -->
<script>

    $(".bi-write2").on("click", function () {
        aj_insertDronInfo($("#insertFormDron")[0]);
    });

    $(".btn-wrap .bi-cancel").on("click", function () {
        $(this).addClass("active");
        aj_selectDronInfo($("#insertFormDron")[0]);
    });

    //드론정보 목록조회
    $(".btn-wrap .bi-list").on("click", function () {
        $(this).addClass("active");
        aj_selectDronInfo($("#selectDronInfoViewForm")[0], "");
    });

    var inputFileList = new Array();

</script>

<div class="popup-header">드론영상</div>
<div class="popup-body">

    <div class="tool-popup-body">
        <form:form name="insertFormDron" id="insertFormDron" method="post" onsubmit="insertFormDron(); return false;">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">

            <h3 class="cont-tit">드론영상 등록하기</h3>
            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 20%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="form-control" name="sj"></td>
                    </tr>
                    <tr>
                        <th scope="row">촬영일</th>
                        <td>
                            <div class="datapicker-group"><input type="text" id="potogrfDe" name="potogrfDe"
                                                                 class="datepicker" autocomplete="off"></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="attach-group">

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="border-top-0">파일첨부</th>
                        <td class="border-top-0">
                            <div class="form-file">
                                <input type="file" id="file" accept=".gif,.png,.jpg,.mp4"><input class="upload-name"
                                                                                                 value=".gif,.png,.jpg,.mp4 파일선택">
                                <label for="file">파일찾기</label>
                            </div>
                            <script>
                                $(document).ready(function () {
                                    var fileTarget = $('#file');

                                    fileTarget.on('change', function (e) { // 값이 변경되면

                                        var cur = $(".form-file input[type='file']").val();
                                        $(".upload-name").val(cur);
                                        var file = e.target.files;
                                        var filesArr = Array.prototype.slice.call(file);
                                        filesArr.forEach(function (f) {
                                            inputFileList.push(f);
                                        });
                                    });

                                });
                            </script>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td><textarea name="cn" id="cn" class="form-control"></textarea></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                <div class="position-absolute left">
                    <button type="button" class="btn basic bi-list">목록</button>
                </div>
                <div>
                    <button type="button" class="btn basic bi-write2">등록</button>
                    <button type="button" class="btn basic bi-cancel">취소</button>
                </div>
            </div>
        </form:form>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('드론영상')"></button>
<button type="button" class="popup-close" title="닫기"></button>

<!-- //top > 드론영상 -->