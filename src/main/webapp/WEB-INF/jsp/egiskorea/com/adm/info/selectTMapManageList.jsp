<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="javatime" uri="http://sargue.net/jsptags/time" %>
<%
/**
 * @file Name : selectTMapManageList.jsp
 * @Description : 주제도 관리 목록 페이지
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

<!-- content -->
<section id="content">
    <div class="row">
        <div class="col-12 page-tit-wrap">
            <h3 class="page-tit">주제도 관리</h3><!-- left gnb 1차 메뉴 텍스트와 일치해야 해당 메뉴에 active 추가 됨 -->
            <p class="page-txt">주제도 목록을 입력 관리 할 수 있는 페이지 입니다.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="bbs-top">
                <div class="bbs-list-num">조회 : <strong><c:out value="${paginationInfo.totalRecordCount}"/></strong></div>
                <div class="d-flex">
                    <!-- 검색키워드 및 조회버튼 -->
                    <%--@elvariable id="searchVO" type="egiskorea.com.mngr.info.service.ThemaMapVO"--%>
                    <form:form modelAttribute="searchVO" name="searchForm" id="searchForm" method="post">
                        <form:hidden path="pageIndex" id="pageIndex"/>
                        <div class="desc">
                            <select class="form-select" name="searchCondition" title="<spring:message code="title.searchCondition" /> <spring:message code="input.cSelect" />">
                                <option value="1" <c:if test="${searchVO.searchCondition == '1'}">selected</c:if> ><spring:message code="comMngrInfo.TmapVO.themamapNm" /></option><!-- 주제도 명 -->
                                <option value="2" <c:if test="${searchVO.searchCondition == '2'}">selected</c:if> ><spring:message code="comMngrInfo.TmapVO.themamapCl" /></option><!-- 분류 -->
                            </select>
                            <form:input path="searchKeyword" cssClass="form-control" title="검색어 입력"/>
                            <button type="submit" class="btn type05 bi-srch" id="btn-search" title="<spring:message code="button.inquire" /> 버튼"><spring:message code="button.inquire" /></button> <!-- 조회 -->
                            <a href="<c:url value='/com/mngr/info/insertTMapManageView.do'/>" class="btn type01 btn-create" title="<spring:message code="button.create" /> 버튼"><spring:message code="button.create" /></a> <!-- 등록 -->
                        </div>
                    </form:form>
                </div>
            </div>

            <div class="bbs-default">
                <table class="bbs-list">
                    <colgroup>
                        <col style="width: 5%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 20%;">
                        <col style="width: auto;">
                        <col style="width: 20%;">
                        <col style="width: 20%;">
                        <col style="width: 10%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">
                            <span class="form-checkbox">
                                <span>
                                    <input type="checkbox" name="checkAll" id="checkAll">
                                    <label for="checkAll"></label>
                                </span>
                            </span>
                        </th>
                        <th scope="col"><spring:message code="table.num" /></th><!--번호-->
                        <th scope="col"><spring:message code="comMngrInfo.TmapVO.themamapCl" /></th><!-- 분류 -->
                        <th scope="col"><spring:message code="comMngrInfo.TmapVO.themamapNm" /></th><!-- 주제도 명 -->
                        <th scope="col"><spring:message code="comMngrInfo.TmapVO.layerNm" /></th><!-- 레이어명 -->
                        <th scope="col"><spring:message code="table.reger" /></th><!-- 등록자 -->
                        <th scope="col"><spring:message code="table.regdate" /></th><!-- 등록일 -->
                        <th scope="col"><spring:message code="comMngrInfo.TmapVO.useAt" /></th><!-- 사용여부 -->
                    </tr>
                    </thead>
                    <tbody>
                        <c:choose>
                            <c:when test="${fn:length(themaMapList) > 0}">
                                <c:forEach var="themaMapVO" items="${themaMapList}" varStatus="status">
                                    <tr>
                                        <td>
                                            <span class="form-checkbox">
                                                <span>
                                                    <input type="checkbox" value="<c:out value='${themaMapVO.themamapId}'/>" class="check" id="chk${status.count}">
                                                    <label for="chk${status.count}"></label>
                                                </span>
                                            </span>
                                        </td>
                                        <td><c:out value="${(searchVO.pageIndex-1) * (searchVO.pageUnit) + status.count}"/></td>
                                        <td><c:out value="${themaMapVO.themamapCl}"/></td>
                                        <td><a href="<c:url value='/com/mngr/info/selectTMapManage.do'/>" data-uid="${themaMapVO.themamapId}" class="btn-onClick" title="<c:out value="${themaMapVO.themamapNm}"/>"><c:out value="${themaMapVO.themamapNm}"/></a></td>
                                        <td><c:out value="${themaMapVO.layerNm}"/></td>
                                        <td><c:out value="${themaMapVO.registerId}"/></td>
                                        <td><javatime:format value="${themaMapVO.frstRegistDt}" pattern="yyyy.MM.dd"/></td>
                                        <td><c:out value="${themaMapVO.useAt eq 'Y' ? '사용' : '미사용'}"/></td>
                                    </tr>
                                </c:forEach>
                            </c:when>
                            <c:otherwise>
                                <tr>
                                    <td colspan="8"><spring:message code="common.nodata.msg" /></td>
                                </tr>
                            </c:otherwise>
                        </c:choose>
                    </tbody>
                </table>
            </div>
            <!-- pagination -->
            <div class="pagination">
                <ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fnLinkPage"/>
            </div>
            <!-- //pagination -->

            <div class="btn-wrap">
                <div><button type="button" class="btn basic" id="btn-checked-delete" title="<spring:message code="button.delete"/> 버튼"><spring:message code="button.delete"/></button></div>
            </div>
        </div>
    </div>
</section>
<!-- //content -->
<script>

/**
 * @description 페이징링크 함수
 * @param pageIndex
 */
function fnLinkPage(pageIndex) {
    submit({
        method: 'post',
        formData : {
            'pageIndex': pageIndex,
            'searchCondition': '${searchVO.searchCondition}',
            'searchKeyword': '${searchVO.searchKeyword}'
        }
    });
}

$(function() {

    /**
     * 등록 버틐 이벤트
     */
    $('.btn-create').click(function(e) {
        e.preventDefault();

        var action = $(this).attr('href');

        submit({
            action: action,
            method: 'post',
            formData: {
                'pageIndex': '${searchVO.pageIndex}',
                'searchCondition': '${searchVO.searchCondition}',
                'searchKeyword': '${searchVO.searchKeyword}'
            }
        });
    });

    /**
     * 검색시 기본적으로 페이징 값은 1로 해주기
     */
    $('#btn-search').click(function(e) {
        e.preventDefault();
        var $form = $('#searchForm');
        $('#pageIndex').val(1);
        $form.submit();
    });

    /**
     * 목록 내용 클릭시 이벤트
     */
    $('.btn-onClick').click(function(e) {
        e.preventDefault();
        var action = $(this).attr('href');
        var uid = $(this).data('uid');

        submit({
            action: action,
            method: 'post',
            formData: {
                'themamapId': uid,
                'pageIndex': '${searchVO.pageIndex}',
                'searchCondition': '${searchVO.searchCondition}',
                'searchKeyword': '${searchVO.searchKeyword}'
            }
        });
    });

    /**
     * 전체 체크박스 클릭 이벤트
     */
    $('#checkAll').click(function() {
        var checekd = $(this).is(':checked');
        if (checekd) {
            $('.check').prop('checked', true);
        } else {
            $('.check').prop('checked', false);
        }
    });

    /**
     * 각각의 삭제 체크 박스 클릭시 이벤트
     */
    $('.check').click(function() {
        var checkLength = $('.check').length;
        var checkedLength = $('.check:checked').length;

        if (checkLength == checkedLength) {
            $('#checkAll').prop('checked', true);
        } else {
            $('#checkAll').prop('checked', false);
        }
    });

    /**
     * 삭제 버튼 클릭 이벤트
     */
    $('#btn-checked-delete').click(function() {
        var $checked = $('.check:checked');
        var checkedLength = $checked.length;
        var confirmMessage = '<spring:message code="common.checked.delete.msg" arguments="###"/>';
        confirmMessage = confirmMessage.replace('###', checkedLength);

        if (checkedLength > 0) {
            if (confirm(confirmMessage)) {
                var themamapIds = [];
                $checked.each(function() {
                    themamapIds.push(this.value);
                });

                $.ajax({
                    type : 'POST',
                    url : '<c:url value="/com/mngr/info/deleteTMapManageList.do"/>',
                    dataType : "json",
                    data : {'themamapIds': themamapIds},
                    beforeSend : function(jqXHR, settings) {
                        $('#wrap').waitMe({
                            effect : 'timer',
                            text : '삭제 중입니다. 잠시만 기다려주십시오.',
                            bg : 'rgba(0,0,0,0.5)',
                            color : '#ffffff',
                            textPos : 'vertical',
                        });
                    },
                    success : function(data) {
                        alert(data.message);
                        location.reload();
                    },
                    error : function(request, status, error) {
                        console.log("code:" + request.status + "\nmessage:" + request.responseText + "\nerror:" + error);
                    },
                    complete : function(jqXHR, textStatus) {
                        $('#wrap').waitMe('hide');
                    }
                });
            }
        } else {
            alert('<spring:message code="common.nochecked.msg"/>');
        }
    });

    <c:if test="${not empty message}"><%--결과 메세지값 있을 경우만--%>
        alert('${message}');
    </c:if>

});
</script>
<!-- footer -->
<%@ include file="/WEB-INF/jsp/egiskorea/com/adm/include/footer.jsp" %>
<!-- //footer -->