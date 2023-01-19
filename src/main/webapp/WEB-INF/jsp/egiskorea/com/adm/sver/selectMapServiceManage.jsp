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
 * @file Name : selectMapServiceManage.jsp
 * @Description : 지도서비스관리 상세페이지
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

<!-- content -->
<section id="content">
    <div class="row">
        <div class="col-12 page-tit-wrap">
            <h3 class="page-tit">지도서비스관리</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
            <p class="page-txt">지도서비스를 조회하는 상세페이지 입니다.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <%--@elvariable id="mapServiceVO" type="egiskorea.com.mngr.sver.service.MapServiceVO"--%>
            <form:form modelAttribute="mapServiceVO" id="mapService-form" method="post" action="/com/mngr/sver/updateMapServiceManageView.do">
                <form:hidden path="mapserviceId" id="mapserviceId"/><%--주제도 ID--%>

                <%-- 검색(searchVO) hidden --%>
                <input type="hidden" name="pageIndex" value="${searchVO.pageIndex}"/><%--페이지 번호--%>
                <input type="hidden" name="searchCondition" value="${searchVO.searchCondition}"/><%--검색 조건--%>
                <input type="hidden" name="searchKeyword" value="${searchVO.searchKeyword}"/><%--검색 키워드--%>
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
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.bmCode"/></th><%--서비스명--%>
                                <td colspan="3"><c:out value="${mapServiceVO.bmCodeNm}"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceNm"/></th><%--서비스명--%>
                                <td colspan="3"><c:out value="${mapServiceVO.serviceNm}"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceUrl"/></th><%--서비스주소(3D)--%>
                                <td colspan="3" class="word-break"><c:out value="${mapServiceVO.serviceUrl}"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceId"/></th><%--서비스ID(2D)--%>
                                <td colspan="3"><c:out value="${mapServiceVO.serviceId}"/></td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.serviceDc"/></th><%--서비스 설명--%>
                                <td><c:out value="${egis:nl2br(mapServiceVO.serviceDc)}" escapeXml="false"/></td>
                                <th scope="col">이미지 파일</th>
                                <td>
                                    <c:if test="${not empty mapServiceVO.streFileNm && not empty mapServiceVO.originalFileNm}"><%--디비에 파일이름이 존재할 경우--%>
                                        <div class="attach-file">
                                            <c:choose>
                                                <c:when test="${egis:isFile(mapServiceVO.streFileNm)}"><%--실제로 파일이 존재할 경우--%>
                                                    <%--이미지 크기: 356×168px--%>
                                                    <img src="<c:url value='/com/cmm/image.do'/>?attach=<c:out value='${egis:encrypt(mapServiceVO.streFileNm)}'/>" alt="<c:out value='${mapServiceVO.originalFileNm}'/>">
                                                </c:when>
                                                <c:otherwise><%--업로드된 파일이 존재 하지 않을 경우 기본이미지(356x168)--%>
                                                    <img src="<c:url value='/adm/images/common/img_noimg_master.png'/>" alt="기본 이미지"/>
                                                </c:otherwise>
                                            </c:choose>
                                        </div>
                                        <div class="attach-file-name">
                                            <a href="<c:url value='/com/mngr/sver/fileDown.do'/>?mapserviceId=<c:out value='${mapServiceVO.mapserviceId}'/>" target="_blank" title="다운로드 받기">
                                                <i class="fa-solid fa-image"></i>&nbsp;<c:out value='${mapServiceVO.originalFileNm}'/>
                                            </a>
                                        </div>
                                    </c:if>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.useAt"/></th><%--사용여부--%>
                                <td><c:out value="${mapServiceVO.useAt eq 'Y' ? '사용' : '미사용'}"/></td>
                                <th scope="col"><spring:message code="comMngrSver.mapSvcVO.basicAt"/></th><%--기본지도사용여부--%>
                                <td><c:out value="${mapServiceVO.basicAt eq 'Y' ? '사용' : '미사용'}"/></td>
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
                        <button type="submit" class="btn type02" title="<spring:message code="button.update"/> 버튼"><spring:message code="button.update"/></button><%-- 수정 --%>
                        <a href="<c:url value="/com/mngr/sver/deleteMapServiceManage.do"/>" id="btn-delete" class="btn basic" title="<spring:message code="button.delete"/> 버튼"><spring:message code="button.delete"/></a>
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
     * 삭제 버튼 클릭 이벤트
     */
    $('#btn-delete').click(function(e) {
        e.preventDefault();
        if (confirm("<spring:message code="common.delete.msg" />")) {
            var action = $(this).attr('href');
            var $form = $('#mapService-form');
            $form.attr('action', action);
            $form.submit();
        }
    })
});
</script>
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->