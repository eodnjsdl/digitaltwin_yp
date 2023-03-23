<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<script>

    //수정
    $(".bi-edit").on("click", function () {

        $(this).addClass("active");
        <%--rightPopupOpen('updateDronInfo', <c:out value="${result.dronePicId}" />, $('#updateDeleteDronInfoForm')[0]);--%>
        // ui.openPopup 시 form 삭제됨 (기존로직)
        // ui.openPopup("rightPopup");
        aj_updateDronInfoView(
            <c:out value="${result.dronePicId}" />,
            $('#updateDeleteDronInfoForm')[0]
        );


    });

    //드론정보 목록조회
    $(".btn-wrap .bi-list").on("click", function () {
        $(this).addClass("active");
//     rightPopupOpen('dronInfo');
        ui.openPopup("rightPopup");
        aj_selectDronInfo($("#tmpForm")[0]);
    });

    $(".bi-download").on("click", function () {
        const src = $("#droneImgArea").children('img').attr("src")
        const fileNm = $("#droneImgArea").children()[1].value;
        var link = document.createElement("a");
        link.download = fileNm;
        link.href = src;
        link.click();
    });


    $(".bi-delete").on("click", function () {
        if (confirm("드론정보를 삭제하시겠습니까?") == true) {    //확인
            aj_deleteDronInfo($("#updateDeleteDronInfoForm")[0]);
        } else {   //취소
            return false;
        }
    });

    function selectDronInfoView(id) {
        // rightPopupOpen('selectDronInfoView', id, $('#selectDronInfoViewForm')[0]);
        ui.openPopup("rightPopup");
        aj_selectDronInfoView(id, $('#selectDronInfoViewForm')[0]);
//     aj_selectDronInfoView(id);
    }

    $(document).ready(function () {

        $("#main-video").css('z-index', 9998);

        $("#droneImg")

    });


</script>
<!-- top > 드론영상 > 상세 -->
<div class="popup-header">드론영상</div>
<div class="popup-body">
    <div class="tool-popup-body">
        <form:form name="selectDronInfoViewForm" id="selectDronInfoViewForm" action="/" method="post">
            <%--                 <input type="hidden" name="dronPicId" id="dronPicId" value="<c:out value="${result.dronePicId}" />"> --%>
            <input type="hidden" name="atchmnflId" id="atchmnflId" value="<c:out value="${result.atchmnflId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <input type="hidden" name="lastModfDt" value="<c:out value='${lastModfDt}' />">

        </form:form>

        <form:form name="updateDeleteDronInfoForm" id="updateDeleteDronInfoForm" action="/" method="post">
            <input type="hidden" name="dronPicId" id="dronPicId" value="<c:out value="${result.dronePicId}" />">
            <input type="hidden" name="atchmnflId" id="atchmnflId" value="<c:out value="${result.atchmnflId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <input type="hidden" name="lastModfDt" value="<c:out value='${lastModfDt}' />">

        </form:form>
        <div class="bbs-detail-default">
            <table class="bbs-detail">
                <colgroup>
                    <col style="width: 20%;">
                    <col style="width: auto;">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row">제목</th>
                    <td><c:out value="${result.sj}"/></td>
                </tr>
                <tr>
                    <th scope="row">작성자</th>
                    <td><c:out value="${result.userNm}"/></td>
                </tr>
                <tr>
                    <th scope="row">등록일</th>
                    <td><c:out value="${result.regDt}"/></td>
                </tr>
                <tr>
                    <th scope="row">촬영일</th>
                    <td><c:out value="${result.grfDe}"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="cont cont-download" style="height: 427px;">
                            <c:forEach var="resultFile" items="${resultFile}" varStatus="status">
                                <c:set var="name" value="${resultFile.fileExtsn}"/>
                            <c:choose>
                            <c:when test="${fn:toLowerCase(name) eq 'png' || fn:toLowerCase(name) eq 'jpg' || fn:toLowerCase(name) eq 'gif' || fn:toLowerCase(name) eq 'jfif'}">
                            <div class="attach-group">
                                <div id="droneImgArea">
                                    <img id="droneImg" src='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>'
                                         alt="파일이미지"/>
                                    <input type="hidden" name="orignlFileNm"
                                           value="<c:out value="${resultFile.orignlFileNm}" />">
                                </div>
                            </div>

                            <div class="position-bottom btn-wrap justify-content-end">
                                <div>
                                    <button type="button" class="btn basic bi-download">다운로드</button>
                                </div>
                            </div>
                            </c:when>

                            <c:when test="${fn:toLowerCase(name) eq 'mp4'}">
                            <div class="attach-group">
                                <video id="main-video" controls>
                                    <source type="video/mp4"
                                            src='<c:url value='/cmm/fms/FileDown.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>'>
                                </video>
                                <canvas id="video-canvas"></canvas>
                                </c:when>

                                <c:otherwise>
                                    <div>
                                        <a>
                                            지원하지 않는 형식입니다.
                                        </a>
                                    </div>

                                </c:otherwise>
                                </c:choose>

                                </c:forEach>
                            </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="position-bottom btn-wrap">
            <div>
                <button type="button" class="btn basic bi-list">목록</button>
            </div>
            <div class="position-absolute right">
                <button type="button" class="btn basic bi-edit" data-popup="top-popup10-update" title="배경지도">수정</button>
                <button type="button" class="btn basic bi-delete">삭제</button>
            </div>
        </div>

        <div class="bbs-detail-util">
            <c:if test="${null ne result.prevSj}">
                <div class="items">
                    <div class="term">이전</div>
                    <div class="desc"><a
                            href="javascript:selectDronInfoView('<c:out value="${result.prevDronId}" />');"><c:out
                            value="${result.prevSj}"/></a></div>
                </div>
            </c:if>
            <c:if test="${null ne result.nextSj}">
                <div class="items">
                    <div class="term">다음</div>
                    <div class="desc"><a
                            href="javascript:selectDronInfoView('<c:out value="${result.nextDronId}" />');"><c:out
                            value="${result.nextSj}"/></a></div>
                </div>
            </c:if>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('드론영상')"></button>
<button type="button" class="popup-close" title="닫기"></button>
</div>
<!-- //top > 드론영상 > 상세 -->


<!-- top > 드론영상 > 수정 -->
<div class="popup-panel popup-right top-popup10-update" style="width: 480px;height: 807px;">
    <div class="popup-header">드론영상</div>
    <div class="popup-body">

        <div class="tool-popup-body">
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
                        <td><input type="text" class="form-control" value="양평군청 일대 드론영상 입니다."></td>
                    </tr>
                    <tr>
                        <th scope="row">촬영일</th>
                        <td>
                            <div class="datapicker-group w-40p"><input type="text" class="datepicker"
                                                                       value="2020-05-20"></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="attach-group">
                                <img src="/images/thumb03.jpg" alt="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="border-top-0">파일첨부</th>
                        <td class="border-top-0">
                            <div class="form-file">
                                <input type="file" id="file"><input class="upload-name" value="파일선택">
                                <label for="file">파일찾기</label>
                            </div>
                            <script>
                                $(document).ready(function () {
                                    var fileTarget = $('#file');
                                    fileTarget.on('change', function () { // 값이 변경되면
                                        var cur = $(".form-file input[type='file']").val();
                                        $(".upload-name").val(cur);
                                    });
                                });
                            </script>
                        </td>
                    </tr>


                    <tr>
                        <th scope="row">내용</th>
                        <td><textarea name="" id="" class="form-control">양평군청 일대 드론영상1</textarea></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="position-bottom btn-wrap">
                <div class="position-absolute left">
                    <button type="button" class="btn basic bi-list">목록</button>
                </div>
                <div>
                    <button type="button" class="btn basic bi-edit">수정</button>
                    <button type="button" class="btn basic bi-delete">삭제</button>
                </div>
            </div>
        </div>

    </div>
    <button type="button" class="manualBtn" title="도움말" onclick="manualTab('드론영상')"></button>
    <button type="button" class="popup-close" title="닫기"></button>
</div>