<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="examinationInfo" staticJavascript="false" xhtml="true" cdata="false"/>
<script>
    function fn_update_examinationInfo(form) {
        if (!validateExaminationInfo(form)) {
            return false;
        } else {

            var formData = new FormData($("#examinationInfo")[0]);

            if (confirm("<spring:message code="common.update.msg" />")) {
                ui.loadingBar("show");
                $.ajax({
                    type: "POST",
                    url: "/geo/emi/updateExaminationInfo.do",
                    data: formData,
                    dataType: "html",
                    processData: false,
                    contentType: false,
                    success: function (returnData, status) {
                        if (status == "success") {
                            if (removeLine(returnData) == "ok") {
                                toastr.success("<spring:message code="success.common.update" />");
                                aj_selectExaminationInfo($("#tmpForm")[0], "<c:out value="${examinationInfo.pnu} "/>");
                            } else {
                                toastr.success("<spring:message code="fail.common.update" />");
                            }
                        } else {
                            toastr.error("관리자에게 문의 바랍니다.", "정보를 불러오지 못했습니다.");
                            return;
                        }
                    }, complete: function () {
                        ui.loadingBar("hide");
                    }
                });
            }
        }
    }

    function fn_cancel_examinationInfo() {
    	aj_selectExaminationInfo($("#tmpForm")[0], "<c:out value='${examinationInfo.pnu}' />");
    }
</script>
<!-- 국토정보관리 > 속성정보 > 더보기 -->
<form:form commandName="examinationInfo" method="post">
    <form:hidden path="pnu"/>
    <div class="popup-header">속성정보</div>
    <div class="popup-body">
        <div class="sub-popup-body territory-info-body">
            <h3 class="cont-tit">기본정보</h3>
            <div class="data-default">
                <table class="data-write">
                    <colgroup>
                        <col style="width: 17%;">
                        <col style="width: auto;">
                        <col style="width: 17%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">지번</th>
                        <td><c:out value="${examinationInfo.addr} "/></td>
                        <th scope="row">최종변경일자</th>
                        <td><c:out value="${examinationInfo.updateDate} "/></td>
                    </tr>
                        <%-- 												<tr>
                                                                            <th scope="row">ORG_FILD</th>
                                                                            <td><c:out value="${examinationInfo.orgFid} "/></td>
                                                                            <th scope="row">조사시작일시</th>
                                                                            <td><c:out value="${examinationInfo.startDate} "/></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">지번</th>
                                                                            <td><c:out value="${examinationInfo.addr} "/></td>
                                                                            <th scope="row">조사종료일시</th>
                                                                            <td><c:out value="${examinationInfo.endDate} "/></td>
                                                                        </tr> --%>
                    <tr>
                        <th scope="row">원지목</th>
                        <td><c:out value="${examinationInfo.ori}"/></td>
                        <th scope="row">조사자(정)</th>
                        <td><form:input path="main" cssClass="form-control"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="tabBoxDepth1-wrap">
                <div class="tabBoxDepth1">
                    <ul>
                        <li data-tab="proTab01" class="on">
                            <button type="button" class="inner-tab">지목조사</button>
                        </li>
                        <li data-tab="proTab02">
                            <button type="button" class="inner-tab">공통항목</button>
                        </li>
                        <li data-tab="proTab03">
                            <button type="button" class="inner-tab">토지특성</button>
                        </li>
                        <li data-tab="proTab04">
                            <button type="button" class="inner-tab">주택특성</button>
                        </li>
                        <li data-tab="proTab05">
                            <button type="button" class="inner-tab">토지피복</button>
                        </li>
                        <li data-tab="proTab06">
                            <button type="button" class="inner-tab">사진</button>
                        </li>
                    </ul>
                </div>
                <!-- 지목조사 -->
                <jsp:include page="landCategoryInfo.jsp" flush="true"/>
                <!-- //지목조사 -->
                <!-- 공통항목 -->
                <jsp:include page="commonInfo.jsp" flush="true"/>
                <!-- //공통항목 -->
                <!-- 토지특성 -->
                <jsp:include page="landCharacter.jsp" flush="true"/>
                <!-- //토지특성 -->
                <!-- 주택특성 -->
                <jsp:include page="houseCharacter.jsp" flush="true"/>
                <!-- //주택특성 -->
                <!-- 토지피복 -->
                <jsp:include page="landCover.jsp" flush="true"/>
                <!-- //토지피복 -->
                <!-- 사진 -->
                <jsp:include page="photo.jsp" flush="true"/>
                <!-- //사진 -->
            </div>
        </div>
    </div>
    <button type="button" class="popup-close" title="닫기"></button>
</form:form>
<!-- //국토정보관리 > 속성정보 > 더보기 -->