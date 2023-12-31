<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- top > 드론영상 -->
<script>

    var inputFileList = new Array();

    $(document).ready(function () {
        bindEventInsertDronInfoView();
        initInsertDronList();
        changeImage();
    });

    //지도에서 선택
    $(".top-drone-body .bi-location").on("click", aj_selectDronLocation);

    function bindEventInsertDronInfoView() {
        $(".bi-write2").on("click", function () {
            // 미입력 관련 VALIDATE
            var sj = $("#sj").val();
            var potogrfDe = $("#potogrfDe").val();
            var loc_dron = $("#loc_dron").val();
            var file = $(".upload-name").val();

            if (sj == '') {
                toastr.warning("제목을 입력해 주세요.");
                return;
            } else if (potogrfDe == '' || potogrfDe == undefined) { // 촬영일 유무 체크
                toastr.warning("촬영일을 지정해 주세요.");
                return;
            } else if (loc_dron == '' || loc_dron == undefined) { // 위치 유무 체크
                toastr.warning("위치를 지정해 주세요.");
                return;
            } else if (file == '' || file == undefined) { //파일이 유무 체크
                toastr.warning("파일을 선택해 주세요.");
                return;
            } else {
                aj_insertDronInfo($("#insertFormDron")[0]);
            }
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
    }

    function initInsertDronList() {
        var fileTarget = $('#file');
        fileTarget.on('change', function (e) {
            inputFileList = [];
            var cur = $(".form-file input[type='file']").val();
            $(".upload-name").val(cur);
            var file = e.target.files;
            var filesArr = Array.prototype.slice.call(file);
            filesArr.forEach(function (f) {
                inputFileList.push(f);
            });
        });
    }

    function changeImage() {
        $('#file').on('input', function (e) {
            if (!this.files || !this.files[0]) return;
            var that = this;
            const FR = new FileReader();
            FR.addEventListener("load", function (evt) {
                if (that.files[0].type === 'image/jpeg') {
                    $('#droneImg').attr('src', evt.target.result);
                    $("#droneMp4Tr").hide();
                    $("#droneImgTr").show();
                } else if (that.files[0].type === 'video/mp4') {
                    $('#droneMp4').attr('src', evt.target.result);
                    $("#droneImgTr").hide();
                    $("#droneMp4Tr").show();
                }
            });
            FR.readAsDataURL(this.files[0]);
        });
    }


</script>


<div class="popup-header">드론영상</div>
<div class="popup-body">

    <div class="tool-popup-body top-drone-body">
        <form:form name="insertFormDron" id="insertFormDron" method="post" onsubmit="insertFormDron(); return false;">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <input type="hidden" id="xcord" name="xcord">
            <input type="hidden" id="ycord" name="ycord">

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
                        <td><input type="text" class="form-control" id="sj" name="sj"></td>
                    </tr>
                    <tr>
                        <th scope="row">촬영일</th>
                        <td>
                            <div class="datapicker-group"><input type="text" id="potogrfDe" name="potogrfDe"
                                                                 class="datepicker" autocomplete="off" readonly></div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">위치</th>
                        <td><input type="text" class="form-control w-70p" id="loc_dron" readonly> <button type="button" class="btn type01 bi-location">지도에서 선택</button></td>
                    </tr>

                        <%--                    <tr>--%>
                        <%--                        <td colspan="2">--%>
                        <%--                            <div class="attach-group">--%>

                        <%--                            </div>--%>
                        <%--                        </td>--%>
                        <%--                    </tr>--%>
                        <%--                    --%>

                    <tr id="droneImgTr" style="display: none;">
                        <td colspan="2">
                            <div class="attach-group">
                                <div id="droneImgArea">
                                    <img id="droneImg" src=''/>
                                    <input type="hidden" name="orignlFileNm"
                                           value="">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr id="droneMp4Tr" style="display: none;">
                        <td colspan="2">
                            <div class="attach-group">
                                <video id="droneMp4" controls>
<%--                                    <source id="droneMp4" type="video/mp4"--%>
<%--                                            src='<c:url value='/cmm/fms/FileDown.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>'>--%>
                                </video>
                                <canvas id="video-canvas"></canvas>
                            </div>
                        </td>

                    </tr>

                    <tr>
                        <th scope="row" class="border-top-0">파일첨부</th>
                        <td class="border-top-0">
                            <div class="form-file">
                                <input type="file" id="file" accept="image/gif, image/jpeg, image/png, video/mp4">
                                <input class="upload-name" placeholder="gif, png, jpg, mp4 파일선택" value="">
                                <label for="file">파일찾기</label>
                            </div>
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