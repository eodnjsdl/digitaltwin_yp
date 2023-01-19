<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="javatime" uri="http://sargue.net/jsptags/time" %>
<%@ taglib prefix="egis" uri="http://www.egiskorea.com/jsp/egis" %>
<%
/**
 * @file Name : selectTMapManage.jsp
 * @Description : 주제도 관리 상세페이지
 * @Modification Information
 * @
 * @  수정일                         수정자                  수정내용
 * @ -------        --------    ---------------------------
 * @ 2022.02.11      이준호                  최초생성
 *
 * @author 플랫폼개발부문 DT솔루션 이준호
 * @since 2022.02.11
 * @version 1.0
 *
 */
%>
<!-- header -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/header.jsp" %>
<!-- //header -->

<!-- content -->
<section id="content">
    <div class="row">
        <div class="col-12 page-tit-wrap">
            <h3 class="page-tit">주제도 관리</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
            <p class="page-txt">주제도를 조회하는 페이지 입니다.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <%--@elvariable id="themaMapVO" type="egiskorea.com.mngr.info.service.ThemaMapVO"--%>
            <form:form modelAttribute="themaMapVO" id="themaMap-form" method="post" action="/com/mngr/info/updateTMapManageView.do">
                <form:hidden path="themamapId" id="themamapId"/><%--주제도 ID--%>

                <%-- 검색(searchVO) hidden --%>
                <input type="hidden" name="pageIndex" value="${searchVO.pageIndex}"/><%--페이지 번호--%>
                <input type="hidden" name="searchCondition" value="${searchVO.searchCondition}"/><%--검색 조건--%>
                <input type="hidden" name="searchKeyword" value="${searchVO.searchKeyword}"/><%--검색 키워드--%>
                <div class="bbs-write-default">
                    <table class="bbs-write">
                        <colgroup>
                            <col style="width: 15%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.themamapCl"/></th><%-- 분류 --%>
                                <td><c:out value="${themaMapVO.themamapCl}"/></td>
                            </tr>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.themamapNm"/></th><%-- 주제도 명 --%>
                                <td><c:out value="${themaMapVO.themamapNm}"/></td>
                            </tr>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.layerNm"/></th><%-- 레이어명 --%>
                                <td><c:out value="${themaMapVO.layerNm}"/></td>
                            </tr>
                            <tr>
                                <th scope="row"><spring:message code="comMngrInfo.TmapVO.themamapDeci"/></th><%-- 주제도 설명 --%>
                                <td><c:out value="${egis:nl2br(themaMapVO.themamapDeci)}" escapeXml="false"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrInfo.TmapVO.useAt"/></th><%-- 사용여부 --%>
                                <td><c:out value="${themaMapVO.useAt eq 'Y' ? '사용' : '미사용'}"/></td>
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
                        <button type="submit" class="btn type02" title="<spring:message code="button.update"/> 버튼"><spring:message code="button.update"/></button><%-- 수정 --%>
                        <a href="<c:url value="/com/mngr/info/deleteTMapManage.do"/>" id="btn-delete" class="btn basic" title="<spring:message code="button.delete"/> 버튼"><spring:message code="button.delete"/></a>
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
     * 삭제 버튼 클릭 이벤트
     */
    $('#btn-delete').click(function(e) {
        e.preventDefault();
        if (confirm("<spring:message code="common.delete.msg" />")) {
            var action = $(this).attr('href');
            var $form = $('#themaMap-form');
            $form.attr('action', action);
            $form.submit();
        }
    })
});
</script>
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->