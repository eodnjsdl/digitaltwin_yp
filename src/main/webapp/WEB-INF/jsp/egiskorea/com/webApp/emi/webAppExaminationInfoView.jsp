<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="examinationInfo" staticJavascript="false" xhtml="true" cdata="false"/>
<script>

	// 속성정보에서 수정 완료 함수
    function fn_update_examinationInfo(form) {
        if (!validateExaminationInfo(form)) {
            return false;
        } else {

            var formData = new FormData($("#examinationInfo")[0]);

            if (confirm("<spring:message code="common.update.msg" />")) {
                ui.loadingBar("show");
                $.ajax({
                    type: "POST",
                    url: "/webApp/emi/updateExaminationInfo.do",
                    data: formData,
                    dataType: "html",
                    processData: false,
                    contentType: false,
                    success: function (returnData, status) {
                        if (status == "success") {
                            if (removeLine(returnData) == "ok") {
                                toastr.success("<spring:message code="success.common.update" />");
								webApp_clickTerritory("<c:out value="${examinationInfo.pnu.substring(0, 10)} "/>",'1');
								webApp_leftSubPopupOpen("examinationInfo", "<c:out value="${examinationInfo.pnu} "/>", "left");
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

    // 수정화면의 닫기버튼 클릭시
    function webApp_cancel_examinationInfoView() {
        $("#leftSubPopup").removeClass("opened").html("");
    }
    
    // 수정화면의 취소버튼 클릭시 (수정화면 닫고 상세화면)
    function webApp_fn_cancel_examinationInfo(id) {
        $("#leftSubPopup").removeClass("opened").html("");
    	fn_left_select_detail(id[0].value);
    }
    
</script>
<!-- 국토정보관리 > 속성정보 > 더보기 -->
<form:form commandName="examinationInfo" method="post">
    <form:hidden path="pnu"/>
    <div class="popup-header">속성정보 수정</div>
    <div class="popup-body">
        <div class="sub-popup-body territory-info-body detail">
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
                        <th scope="row">ORG_FILD</th>
                        <td><c:out value="${examinationInfo.orgFid} "/></td>
                        <th scope="row">지번</th>
                        <td><c:out value="${examinationInfo.addr} "/></td>
                    </tr>
                    <tr>
                        <th scope="row">최종변경일자</th>
                        <td><c:out value="${examinationInfo.updateDate} "/></td>
                        <th scope="row">원지목</th>
                        <td><c:out value="${examinationInfo.ori}"/></td>
                    </tr>
                    <tr>
                        <th scope="row">조사자(정)</th>
                        <td><form:input path="main" cssClass="form-control"/></td>
                        <th scope="row">조사자(부)</th>
                        <td><form:input path="sub" cssClass="form-control"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="tabBoxDepth1-wrap" style="height: calc(100% - 160px);">
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
                    </ul>
                </div>
                <!-- 지목조사 -->
                <jsp:include page="landCategoryInfo_webApp.jsp" flush="true"/>
                
                <!-- 공통항목 -->
                <jsp:include page="commonInfo_webApp.jsp" flush="true"/>
                
                <!-- 토지특성 -->
                <jsp:include page="landCharacter_webApp.jsp" flush="true"/>
                
                <!-- 주택특성 -->
                <jsp:include page="houseCharacter_webApp.jsp" flush="true"/>
                
                <!-- 토지피복 -->
                <jsp:include page="landCover_webApp.jsp" flush="true"/>
            </div>
        </div>
    </div>
    <button type="button" class="webAppExaminationInfoView-popup-close" title="닫기" onclick="webApp_cancel_examinationInfoView();"></button>
</form:form>
<!-- //국토정보관리 > 속성정보 > 더보기 -->