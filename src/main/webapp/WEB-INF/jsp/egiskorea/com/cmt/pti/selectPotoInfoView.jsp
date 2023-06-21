<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!-- swiper -->
<script src="/js/plugin/swiper/swiper.min.js"></script>
<link rel="stylesheet" href="/js/plugin/swiper/swiper.min.css">

<script>

    $(document).ready(function () {
        refreshLayerByPhoto();
        initByPotoInfoView();
        bindEventPotoInfoView();
    });

    function bindEventPotoInfoView() {
        // 사진정보 목록조회
        $(".btn-wrap .bi-list").on("click", function () {
            $(this).addClass("active");
            //rightPopupOpen('potoInfo');
            aj_selectPotoInfoList($("#selectPotoInfoViewForm")[0], "");
        });
        // 사진정보 수정페이지 이동
        $(".top-images-dtBody .btn-wrap .bi-edit").on("click", function () {
            $(this).addClass("active");
            <%--rightPopupOpen('updatePotoInfo', <c:out value="${result.phtoId}" />, $('#updateDeletePotoInfoForm')[0]);--%>

            // ui.openPopup("rightPopup");
            aj_updatePotoInfoView(<c:out value="${result.phtoId}" />, $('#updateDeletePotoInfoForm')[0]);
        });
        //사진정보 삭제
        $(".top-images-dtBody .btn-wrap .bi-delete").on("click", function () {
            if (confirm("사진정보를 삭제하시겠습니까?") == true) {    //확인
                aj_deletePotoInfo($("#updateDeletePotoInfoForm")[0]);
            } else {   //취소
                return false;
            }
        });
        //사진 다운로드
        $(".top-images-dtBody .position-bottom .bi-download").on("click", function () {
            const src = $(".swiper-slide-active img").attr("src");
            const fileNm = $(".swiper-slide-active .thumb").children()[1].value
            var link = document.createElement("a");
            link.download = fileNm;
            link.href = src;
            link.click();
        });
    }

    //사진정보 게시글 이동
    function selectPotoInfoView(id) {
        // rightPopupOpen('selectPotoInfoView', id, $('#selectPotoInfoViewForm')[0]);
        // ui.openPopup("rightPopup");
        aj_selectPotoInfoView(id, $('#selectPotoInfoViewForm')[0]);
    }

    function refreshLayerByPhoto() {
        const ids = [];
        const wkts = [];
        const sj = [];
        <c:forEach  items="${resultList}" var="item">
        ids.push("${item.phtoId}");
        wkts.push("${item.wkt}");
        sj.push("${item.sj}");
        </c:forEach>
        const reader = new ol.format.WKT();
        const features = [];
        wkts.forEach((wkt, index) => {
            if (wkt) {
                const feature = new ol.Feature(reader.readGeometry(wkt));
                feature.setId(ids[index]);
                feature.setProperties({"sj": sj[index]});
                features.push(feature);
            }
        });
        if (features.length > 0) {
            const format = new ol.format.GeoJSON();
            const geojson = format.writeFeatures(features);
            dtmap.draw.clear();
            dtmap.draw.dispose();
            dtmap.vector.clear();
            dtmap.vector.clearSelect();
            //지도에 GeoJSON 추가
            dtmap.vector.readGeoJson(geojson, function (feature) {
                return {
                    marker: {
                        src: '/images/poi/poto_poi.png'
                    },
                    label: {
                        text: feature.get("sj")
                    }
                }
            });
        }
    }

    function initByPotoInfoView() {
        const wkt = "<c:out value="${result.wkt}" />";
        const sj = "<c:out value="${result.sj}" />";
        const id = "<c:out value="${result.phtoId}" />";
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
            $("#loc_poto").html(result["address"]);
        });
    }

</script>

<style>
    .bbs-detail td .cont-download .position-bottom {
        right: 20px;
        bottom: 20px;
    }
</style>

<!-- top > 사진정보 > 상세 -->
<div class="popup-header">사진정보</div>
<div class="popup-body">

    <div class="tool-popup-body top-images-dtBody">
        <form:form name="selectPotoInfoViewForm" id="selectPotoInfoViewForm" action="/" method="post">
            <%--                 <input type="hidden" name="phtoId" id="phtoId" value="<c:out value="${result.phtoId}" />"> --%>
            <input type="hidden" name="atchmnflId" id="atchmnflId" value="<c:out value="${result.atchmnflId}" />">
            <input type="hidden" name="pageIndex" value="<c:out value='${pageIndex}' />">
            <input type="hidden" name="searchWrd" value="<c:out value='${searchWrd}' />">
            <input type="hidden" name="sortKind" value="<c:out value='${sortKind}' />">
            <input type="hidden" name="searchCnd" value="<c:out value='${searchCnd}' />">
            <input type="hidden" name="lastModfDt" value="<c:out value='${lastModfDt}' />">
        </form:form>

        <form:form name="updateDeletePotoInfoForm" id="updateDeletePotoInfoForm" action="/" method="post">
            <input type="hidden" name="phtoId" id="phtoId" value="<c:out value="${result.phtoId}" />">
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
                    <th scope="row">공유</th>
                    <td><c:if test="${result.pnrsAt == 'Y'}">공유</c:if><c:if
                            test="${result.pnrsAt == 'N'}">공유안함</c:if></td>
                </tr>
                <tr>
                    <th scope="row">위치</th>
                    <td><span id="loc_poto"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="cont cont-download imagesSwiper-cont" style="height: 391px;">

                            <!-- Swiper -->
                            <div class="swiper-container imagesSwiper">
                                <div class="swiper-wrapper">
                                    <c:forEach var="resultFile" items="${resultFile}" varStatus="status">
                                        <div class="swiper-slide">
                                            <div class="thumb">
                                                <a href='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>&streFileNm= <c:out value="${resultFile.streFileNm}"/>'
                                                   data-lightbox='infoImages' data-title=''>
                                                    <img src='<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value="${resultFile.atchFileId}"/>&fileSn=<c:out value="${resultFile.fileSn}"/>&streFileNm= <c:out value="${resultFile.streFileNm}"/>'
                                                         alt='파일이미지'/>
                                                </a>
                                                <input type="hidden" name="orignlFileNm"
                                                       value="<c:out value="${resultFile.orignlFileNm}" />">
                                            </div>
                                            <p class="swiper-txt"><c:out value="${resultFile.fileCn}"/></p>

                                        </div>
                                    </c:forEach>
                                </div>
                            </div>

                            <!-- Add Arrows -->
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>

                            <div class="position-bottom btn-wrap justify-content-end">
                                <div>
                                    <button type="button" class="btn basic bi-download">다운로드</button>
                                </div>
                            </div>

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
            	<c:if test="${potoInfoVO.emplyrId == result.emplyrId}">
	                <button type="button" class="btn basic bi-edit" data-popup="top-popup05-update">수정</button>
	                <button type="button" class="btn basic bi-delete">삭제</button>
                </c:if>
            </div>
        </div>

        <div class="bbs-detail-util">
            <c:if test="${null ne result.prevSj}">
                <div class="items">
                    <div class="term">이전</div>
                    <div class="desc" style="cursor: pointer;"
                         onclick="javascript:selectPotoInfoView('<c:out value="${result.prevPotoId}"/>');">
                        <a><c:out value="${result.prevSj}"/></a>
                    </div>
                </div>
            </c:if>
            <c:if test="${null ne result.nextSj}">
                <div class="items">
                    <div class="term">다음</div>
                    <div class="desc" style="cursor: pointer;"
                         onclick="javascript:selectPotoInfoView('<c:out value="${result.nextPotoId}"/>');">
                        <a><c:out value="${result.nextSj}"/></a>
                    </div>
                </div>
            </c:if>
        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사진정보')"></button>
<button type="button" class="popup-close" title="닫기"></button>

<script>
    $(function () {
        var swiper = new Swiper(".imagesSwiper", {
            slidesPerView: 1,
            //spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

    });
</script>
<!-- //top > 사진정보 > 상세 -->