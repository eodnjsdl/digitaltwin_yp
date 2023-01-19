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
 * @file Name : insertTMapManageView.jsp
 * @Description : 주제도 관리 등록 페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.02.07      이준호                  최초생성
 *
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.07
 * @version 1.0
 *
 */
%>
<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<%--TMapManage 유효성 검사 --%>
<validator:javascript formName="themaMapVO" staticJavascript="false" xhtml="true" cdata="false"/>

<!-- content -->
<section id="content">
    <div class="row">
        <div class="col-12 page-tit-wrap">
            <h3 class="page-tit">주제도 관리</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
            <p class="page-txt">주제도를 관리하는 페이지 입니다.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <%--@elvariable id="themaMapVO" type="egiskorea.com.mngr.info.service.ThemaMapVO"--%>
            <form:form modelAttribute="themaMapVO" id="themaMap-form" method="post" enctype="multipart/form-data" action="/com/mngr/info/insertTMapManage.do">
                <form:hidden path="registerId" id="registerId"/> <%-- 생성자:hidden --%>
                <form:hidden path="lastUpdusrId" id="lastUpdusrId"/><%-- 수정자:hidden --%>
                <%-- 생성일:hidden --%>
                <javatime:format var="frstRegistDt" value="${themaMapVO.frstRegistDt}" pattern="yyyy-MM-dd HH:mm:ss"/>
                <input type="hidden" name="frstRegistDt" id="frstRegistDt" value="${frstRegistDt}" />
                <%-- 수정일:hidden --%>
                <javatime:format var="lastModfDt" value="${themaMapVO.lastModfDt}" pattern="yyyy-MM-dd HH:mm:ss"/>
                <input type="hidden" name="lastModfDt" id="lastModfDt" value="${lastModfDt}" />

                <%-- 검색(searchVO) hidden --%>
                <form:hidden path="pageIndex"/><%--페이지 번호--%>
                <form:hidden path="searchCondition"/><%--검색 조건--%>
                <form:hidden path="searchKeyword"/><%--검색 키워드--%>

                <div class="bbs-write-default">
                    <table class="bbs-write">
                        <colgroup>
                            <col style="width: 15%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.themamapClCode"/> <span class="essential">*</span></th><%-- 분류 --%>
                                <td>
                                    <form:select path="themamapClCode" cssClass="form-select w-20p">
                                        <option value="">분류를 선택해주십시오.</option>
                                        <form:options items="${thematicMapClCodes}" itemValue="code" itemLabel="codeNm" />
                                    </form:select>
                                    <form:errors path="themamapClCode" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.themamapNm"/> <span class="essential">*</span></th><%-- 주제도 명 --%>
                                <td>
                                    <form:input path="themamapNm" id="themamapNm" cssClass="form-control w-100p"/>
                                    <form:errors path="themamapNm" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.layerNm"/> <span class="essential">*</span></th><%-- 레이어명 --%>
                                <td>
                                    <form:input path="layerNm" id="url" cssClass="form-control w-100p"/>
                                    <form:errors path="layerNm" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.themamapDeci"/> <span class="essential">*</span></th><%-- 주제도 설명 --%>
                                <td>
                                    <form:textarea path="themamapDeci" id="themamapDeci" cssClass="form-control"/>
                                    <form:errors path="themamapDeci" cssClass="error"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.useAt"/></th><%-- 사용여부 --%>
                                <td>
                                    <span class="form-radio group">
                                        <span><form:radiobutton path="useAt" id="useY" value="Y" label="사용"/></span>
                                        <span><form:radiobutton path="useAt" id="useN" value="N" label="미사용"/></span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.frstRegistDt"/></th><%-- 생성일 --%>
                                <td><javatime:format value="${themaMapVO.frstRegistDt}" pattern="yyyy-MM-dd"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.registerId"/></th><%-- 생성자 --%>
                                <td><c:out value="${themaMapVO.registerId}"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.lastModfDt"/></th><%-- 수정일 --%>
                                <td><javatime:format value="${themaMapVO.lastModfDt}" pattern="yyyy-MM-dd"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.lastUpdusrId"/></th><%-- 수정자 --%>
                                <td><c:out value="${themaMapVO.lastUpdusrId}"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn-wrap justify-content-between">
                    <div><a href="<c:url value='/com/mngr/info/selectTMapManageList.do'/>" id="btn-list" class="btn basic" title="<spring:message code="button.list"/> 버튼"><spring:message code="button.list"/></a></div><%-- 목록 --%>
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
        var $form = $('#themaMap-form');

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
        var form = document.getElementById('themaMap-form');
        if (confirm("<spring:message code="common.regist.msg" />")) {
            if (validateThemaMapVO(form)) {
                form.submit();
            }
        }
    });
});
</script>
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->