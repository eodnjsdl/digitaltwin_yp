<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script>

    var inputFileList = new Array();

    $(document).ready(function () {
        bindEventUpdateDronInfoView();
        initUpdateDronList();
        callImage();
        // changeImage();
        setAddressByUpdateDron();
    });

    function setAddressByUpdateDron() {
        const id = "<c:out value="${result.dronePicId}" />";
        const pointX = ${result.xcord};
        const pointY = ${result.ycord};
        cmmUtil.reverseGeocoding(pointX, pointY).done((result) => {
            $("#loc_dron").val(result["address"]);
        });
    }

    function bindEventUpdateDronInfoView() {
        $(".btn-wrap .bi-edit").on("click", function () {
            dtmap.draw.clear();
            aj_updateDronInfo($("#updateFormDron")[0]);
        });
        $(".btn-wrap .bi-cancel").on("click", function () {
            aj_selectDronInfoView(null, $("#updateFormDron")[0]);
        });
        $(".top-drone-body .bi-location").on("click", aj_selectDronLocation);
    }

    function initUpdateDronList() {
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
        changeImage();
    }

    function callImage() {
        var _src = $("#droneImg").attr("src");
        $.ajax({
            type: "GET",
            url: _src,
            success: function (returnData, status) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#droneImg').attr('src', e.target.result);
                }
            }, complete: function () {
            }
        });
    }

    function changeImage() {
        $('#file').on('input', function (e) {
            if (!this.files || !this.files[0]) return;
            var that = this;
            const FR = new FileReader();
            FR.addEventListener("load", function (evt) {
                if (that.files[0].type.match('image')) {
                    $('#droneImg').attr('src', evt.target.result);
                    $("#droneMp4Tr").hide();
                    $("#droneImgTr").show();
                } else if (that.files[0].type.match('video')) {
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
        <form:form name="updateFormDron" id="updateFormDron" method="post" onsubmit="updateFormDron(); return false;">
            <input type="hidden" name="dronPicId" id="dronPicId" value="<c:out value="${result.dronePicId}" />">
            <input type="hidden" name="atchmnflId" id="atchmnflId" value="<c:out value="${result.atchmnflId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <input type="hidden" id="xcord" name="xcord" value="<c:out value='${result.xcord}' />">
            <input type="hidden" id="ycord" name="ycord" value="<c:out value='${result.ycord}' />">

            <h3 class="cont-tit">드론영상 수정하기</h3>
            <div class="bbs-write-default">
                <table class="bbs-write">
                    <colgroup>
                        <col style="width: 20%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td>
                            <input type="text" class="form-control" name="sj" value="<c:out value="${result.sj}"/>">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">촬영일</th>
                        <td>
                            <div class="datapicker-group"><input type="text" id="potogrfDe" name="potogrfDe"
                                                                 class="datepicker" autocomplete="off"
                                                                 value="<c:out value="${result.grfDe}"/>"></div>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">위치</th>
                        <td><input type="text" class="form-control w-70p" id="loc_dron" readonly> <button type="button" class="btn type01 bi-location">지도에서 선택</button></td>
                    </tr>

                    <c:forEach var="resultFile" items="${resultFile}" varStatus="status">
                        <c:set var="name" value="${resultFile.fileExtsn}"/>
                        <c:choose>
                            <c:when test="${fn:toLowerCase(name) eq 'png' || fn:toLowerCase(name) eq 'jpg' || fn:toLowerCase(name) eq 'gif' || fn:toLowerCase(name) eq 'jfif'}">
                                <tr id="droneImgTr">
                                    <td colspan="2">
                                        <div class="attach-group">
                                            <div id="droneImgArea">
                                                <img id="droneImg"
                                                     src='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>'
                                                />
                                                <input type="hidden" name="orignlFileNm" value="<c:out value="${resultFile.orignlFileNm}" />">
                                                <input type="hidden" id="fileSnByUpdateDron" name="fileSn" value="<c:out value='${resultFile.fileSn}' />">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </c:when>

                            <c:when test="${fn:toLowerCase(name) eq 'mp4'}">
                                <tr id="droneMp4Tr">
                                    <td colspan="2">
                                        <div class="attach-group">
                                            <video id="droneMp4" controls>
                                                <source type="video/mp4"
                                                        src='<c:url value='/cmm/fms/FileDown.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>'>
                                            </video>
                                            <canvas id="video-canvas"></canvas>
                                        </div>
                                    </td>
                                </tr>
                            </c:when>

                            <c:otherwise>
                                <tr>
                                    <td colspan="2">
                                        <div>
                                            <a>
                                                지원하지 않는 형식입니다.
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </c:otherwise>
                        </c:choose>


                        <tr>
                            <th scope="row" class="border-top-0">파일첨부</th>
                            <td class="border-top-0">
                                <div class="form-file">
                                    <input type="file" id="file"><input class="upload-name"
                                                                        value="<c:out value="${resultFile.orignlFileNm}"/>">
                                    <label for="file">파일찾기</label>
                                </div>
                            </td>
                        </tr>
                    </c:forEach>

                    <tr>
                        <th scope="row">내용</th>
                        <td><textarea name="cn" id="cn" class="form-control"><c:out
                                value="${result.cn}"/></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                    <%--                <div class="position-absolute left">--%>
                    <%--                    <button type="button" class="btn basic bi-list">목록</button>--%>
                    <%--                </div>--%>
                <div>
                    <button type="button" class="btn basic bi-edit">저장</button>
                    <button type="button" class="btn basic bi-cancel">취소</button>
                </div>
            </div>
        </form:form>
    </div>
</div>

<button type="button" class="manualBtn" title="도움말" onclick="manualTab('드론영상')"></button>
<button type="button" class="popup-close" title="닫기"></button>

<!-- //top > 드론영상 -->