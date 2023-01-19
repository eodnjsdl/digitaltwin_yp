<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="javatime" uri="http://sargue.net/jsptags/time" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%
/**
 * @file Name : insertMapServiceManageView.jsp.jsp
 * @Description : 지도서비스 관리 등록 페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.02.16      이준호                  최초생성
 *
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.16
 * @version 1.0
 *
 */
%>
<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<%-- mapServiceVO 유효성 검사 --%>
<validator:javascript formName="mapServiceVO" staticJavascript="false" xhtml="true" cdata="false"/>

<!-- content -->
<section id="content">
    <div class="row">
        <div class="col-12 page-tit-wrap">
            <h3 class="page-tit">지도서비스관리</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
            <p class="page-txt">지도서비스를 관리하는 페이지 입니다.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <%--@elvariable id="mapServiceVO" type="egiskorea.com.mngr.sver.service.MapServiceVO"--%>
            <form:form modelAttribute="mapServiceVO" id="mapService-form" method="post" enctype="multipart/form-data" action="/com/mngr/sver/insertMapServiceManage.do">
                <form:hidden path="frstRegisterId" id="frstRegisterId"/> <%-- 생성자:hidden --%>
                <form:hidden path="lastUpdusrId" id="lastUpdusrId"/><%-- 수정자:hidden --%>
                <%-- 생성일:hidden --%>
                <javatime:format var="frstRegistDt" value="${mapServiceVO.frstRegistDt}" pattern="yyyy-MM-dd HH:mm:ss"/>
                <input type="hidden" name="frstRegistDt" id="frstRegistDt" value="${frstRegistDt}" />
                <%-- 수정일:hidden --%>
                <javatime:format var="lastModfDt" value="${mapServiceVO.lastModfDt}" pattern="yyyy-MM-dd HH:mm:ss"/>
                <input type="hidden" name="lastModfDt" id="lastModfDt" value="${lastModfDt}" />

                <%-- 검색(searchVO) hidden --%>
                <form:hidden path="pageIndex"/><%--페이지 번호--%>
                <form:hidden path="searchCondition"/><%--검색 조건--%>
                <form:hidden path="searchKeyword"/><%--검색 키워드--%>

                <div class="bbs-write-default">
                    <table class="bbs-write">
                        <colgroup>
                            <col style="width: 10%;">
                            <col style="width: 40%;">
                            <col style="width: 10%;">
                            <col style="width: 40%;">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.bmCode"/> <span class="essential">*</span></th><%--지도종류--%>
                                <td colspan="3">
                                    <form:select path="bmCode" cssClass="form-select w-20p">
                                        <option value="">지도종류를 선택해주십시오.</option>
                                        <form:options items="${mapCodes}" itemValue="code" itemLabel="codeNm" />
                                    </form:select>
                                    <form:errors path="bmCode" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceNm"/> <span class="essential">*</span></th><%--서비스명--%>
                                <td colspan="3">
                                    <form:input path="serviceNm" cssClass="form-control w-70p" id="serviceNm"/>
                                    <form:errors path="serviceNm" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceUrl"/></th><%--서비스주소(3D)--%>
                                <td colspan="3">
                                    <form:input path="serviceUrl" cssClass="form-control w-70p" id="serviceUrl"/>
                                    <form:errors path="serviceUrl" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceId"/></th><%--서비스ID(2D)--%>
                                <td colspan="3">
                                    <form:input path="serviceId" cssClass="form-control w-70p" id="serviceId"/>
                                    <form:errors path="serviceId" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceDc"/> <span class="essential">*</span></th><%--서비스 설명--%>
                                <td>
                                    <form:textarea path="serviceDc" cssClass="form-control h-200" id="serviceDc"/>
                                    <form:errors path="serviceDc" cssClass="error"/>
                                </td>
                                <th scope="col">이미지 파일</th>
                                <td>
                                    <div class="attach-file"></div>
                                    <div class="attach-file-name"><input name="attach" id="attach" type="file"></div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.useAt"/></th><%--사용여부--%>
                                <td>
                                    <span class="form-radio group">
                                        <span><form:radiobutton path="useAt" id="useY" value="Y" label="사용"/></span>
                                        <span><form:radiobutton path="useAt" id="useN" value="N" label="미사용"/></span>
                                    </span>
                                </td>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.basicAt"/></th><%--기본지도사용여부--%>
                                <td>
                                    <span class="form-radio group">
                                        <span><form:radiobutton path="basicAt" id="basicY" value="Y" label="사용"/></span>
                                        <span><form:radiobutton path="basicAt" id="basicN" value="N" label="미사용"/></span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.frstRegistDt"/></th><%--생성일--%>
                                <td><javatime:format value="${mapServiceVO.frstRegistDt}" pattern="yyyy-MM-dd"/></td>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.frstRegisterId"/></th><%--생성자--%>
                                <td><c:out value="${mapServiceVO.frstRegisterId}"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.lastModfDt"/></th><%--수정일--%>
                                <td><javatime:format value="${mapServiceVO.lastModfDt}" pattern="yyyy-MM-dd"/></td>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.lastUpdusrId"/></th><%--수정자--%>
                                <td><c:out value="${mapServiceVO.lastUpdusrId}"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn-wrap justify-content-between">
                    <div><a href="<c:url value='/com/mngr/sver/selectMapServiceManageList.do'/>" id="btn-list" class="btn basic" title="<spring:message code="button.list"/> 버튼"><spring:message code="button.list"/></a></div><%-- 목록 --%>
                    <div>
                        <button type="submit" id="btn-save" class="btn type01" title="<spring:message code="button.create"/> 버튼"><spring:message code="button.create"/></button><%--등록--%>
                    </div>
                </div>
            </form:form>
        </div>
    </div>
</section>
<!-- //content -->
<script>
    $(function() {

        /**
         * 목록 버튼 클릭 이벤트
         */
        $('#btn-list').click(function(e) {
            e.preventDefault();
            var action = $(this).attr('href');
            var $form = $('#mapService-form');

            submit({
                action: action,
                method: 'post',
                targetForm: $form
            });
        });

        /**
         * 저장 버튼 이벤트
         */
        $('#btn-save').click(function(e) {
            e.preventDefault();
            var form = document.getElementById('mapService-form');
            if (confirm("<spring:message code="common.regist.msg" />")) {
                if (validateMapServiceVO(form)) {
                    form.submit();
                }
            }
        });

        /**
         * 첨부파일 선택 이벤트
         */
        $('#attach').change(function() {
            var $target = $('.attach-file');
            imagePreview(this, $target);
        });
    });
</script>
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->