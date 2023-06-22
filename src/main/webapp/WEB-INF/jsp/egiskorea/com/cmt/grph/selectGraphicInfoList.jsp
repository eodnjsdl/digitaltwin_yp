<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div class="popup-header">그리기 도구</div>
<div class="popup-body">
    <div class="tool-popup-body">
        <form class="searchForm" onsubmit="return false;">
            <input type="hidden" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
            <div class="srch-box">
                <div class="form-row">
                    <div class="col-auto">
                        <select name="searchCl" class="form-select">
                            <option value="">분류</option>
                            <c:forEach items="${clList}" var="cl">
                                <option value="<c:out value="${cl.clId}" />"><c:out value="${cl.clNm}"/></option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="col-auto">
                        <select name="searchCnd" class="form-select">
                            <option value="subject"
                                    <c:if test="${searchVO.searchCnd == 'subject'}">selected="selected"</c:if>>제목
                            </option>
                            <option value="writer"
                                    <c:if test="${searchVO.searchCnd == 'writer'}">selected="selected"</c:if>>작성자
                            </option>
                        </select>
                    </div>
                    <div class="col"><input name="searchWrd" type="text" class="form-control"
                                            value='<c:out value="${searchVO.searchWrd}"/>'></div>
                    <div class="col-auto">
                        <button type="button" class="btn type01 search btn-search">조회</button>
                    </div>
                </div>
            </div>

            <div class="btn-wrap justify-content-end">
                <div><a href="javascript:void(0);" id="write_GRPH" class="btn bi-write btn-register"
                        style="display:none">등록</a></div>
            </div>

            <div class="bbs-top marT10">
                <div class="bbs-list-num">조회결과 : <strong><c:out value="${paginationInfo.totalRecordCount}"/></strong>건
                </div>
                <div class="list-sort">
					<span class="form-radio text group">
						<span><input type="radio" name="sortKind" id="graphic-order-subject" value="subject"
                                     <c:if test="${searchVO.sortKind == 'subject'}">checked="checked"</c:if>><label
                                for="graphic-order-subject">제목순</label></span>
						<span><input type="radio" name="sortKind" id="graphic-order-newest" value="newest"
                                     <c:if test="${searchVO.sortKind == 'newest'}">checked="checked"</c:if>><label
                                for="graphic-order-newest">최신순</label></span>
					</span>
                </div>
            </div>
        </form>
        <div class="bbs-list-wrap" style="height: 586px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
            <div class="bbs-default">
                <div class="bbs-list-head">
                    <table class="bbs-list">
                        <colgroup>
                            <col style="width: 10%;">	
                            <col style="width: 10%;">
                            <col style="width: auto;">
                            <col style="width: 15%;">
                            <col style="width: 20%;">
                            <col style="width: 20%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">
                                <span class="form-checkbox">
                                	<span style="font-size: 10px;">공유
	                                	<input type="checkbox" name="share_check_all" id="graphic_share_check_all" class="graphic_share_check_all">
	                                	<label for="graphic_share_check_all"></label>
                                	</span>
                                </span>
                            </th>
                            <th scope="col">
                                <span class="form-checkbox"><span style="font-size: 10px;">보기<input type="checkbox" name="check_all"
                                                                         id="graphic_check_all"
                                                                         class="graphic_check_all"><label
                                        for="graphic_check_all"></label></span></span>
                            </th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">갱신일</th>
                            <th scope="col">공유</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="scroll-y">
                    <table class="bbs-list">
                        <c:choose>

                            <c:when test="${paginationInfo.totalRecordCount eq 0}">
                                <tr>
                                    <td colspan="5">"<span style="font-weight: bold;"><c:out
                                            value="${searchVO.searchWrd}"/></span>"에 대한 검색결과가 없습니다
                                    </td>
                                </tr>
                            </c:when>
                            <c:otherwise>
                                <colgroup>
                                    <col style="width: 10%;">
                                    <col style="width: 10%;">
                                    <col style="width: auto;">
                                    <col style="width: 15%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                </colgroup>
                                <tbody>
                                <c:forEach items="${resultList}" var="result" varStatus="status">
                                	<!-- 등록자만 편집 가능 -->
                                	<c:if test="${graphicInfoSearchVO.registerId == result.registerId }">
                                		<tr class="graphic_a" data-graphic-id="<c:out value="${result.grphcId}" />">
                                	</c:if>
                                	<c:if test="${graphicInfoSearchVO.registerId != result.registerId }">
	                                    <tr class="graphic_a" data-graphic-id="">
                                	</c:if>
                                	<!-- 등록자만 편집 가능 end -->
                                    	<!-- 일괄 공유 체크 박스 -->
                                    	<td class="td-checkbox">
                                            <span class="form-checkbox">
                                            	<span>
                                            		<c:if test="${graphicInfoSearchVO.registerId == result.registerId }">
                                            			<input type="checkbox" class="graphic_share_check" id="graphic_share_check_<c:out value="${result.grphcId}" />"
                                                                                     data-graphic-id="<c:out value="${result.grphcId}" />">
                                            		</c:if>
                                            		<c:if test="${graphicInfoSearchVO.registerId != result.registerId }">
                                            			<input type="checkbox" class="graphic_share_check" id="graphic_share_check_<c:out value="${result.grphcId}" />"
                                                                                     data-graphic-id="<c:out value="${result.grphcId}" />" disabled="disabled">
                                            		</c:if>
                                                    <label for="graphic_share_check_<c:out value="${result.grphcId}" />"></label>
                                                </span>
                                            </span>
                                        </td>
                                    	<!--일괄 공유 체크 박스 end -->
                                        <td class="td-checkbox">
                                            <span class="form-checkbox"><span><input type="checkbox"
                                                                                     class="graphic_check"
                                                                                     id="graphic_check_<c:out value="${result.grphcId}" />"
                                                                                     data-graphic-id="<c:out value="${result.grphcId}" />"><label
                                                    for="graphic_check_<c:out value="${result.grphcId}" />"></label></span></span>
                                        </td>
                                        <td class="subject align-left"><a href="javascript:void(0);"
                                                                          ><c:out
                                                value="${result.sj}"/></a></td>
                                        <td><c:out value="${result.register}"/></td>
                                        <td><c:out value="${result.lastModfDt}"/></td>
                                        <td><c:if test="${result.pnrsAt eq 'Y'}">공유</c:if><c:if
                                                test="${result.pnrsAt ne 'Y'}">공유안함</c:if></td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </c:otherwise>
                        </c:choose>
                    </table>
                </div>
            </div>
            
            <!-- 그리기 일괄 공유 추가  -->
            <div>
            	<button type="button" class="btn type01 search" onclick="selectGraphicShare(true); return false;">일괄공유</button>
            	<button type="button" class="btn type01 search" onclick="selectGraphicShare(false); return false;">일괄공유안함</button>
            </div>
            <!-- 그리기 일괄 공유 추가  end -->

            <c:choose>
                <c:when test="${paginationInfo.totalRecordCount eq 0}">
                </c:when>
                <c:otherwise>

                    <div class="pagination">
                        <ui:pagination paginationInfo="${paginationInfo}" type="pagination"
                                       jsFunction="fn_selectGraphicLinkPage"/>
                    </div>

                </c:otherwise>
            </c:choose>

        </div>
    </div>

</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('그리기 도구')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<script type="text/javascript">
    $(document).ready(function () {
        $('#write_GRPH').css('display', dtmap.mod === '2D' ? 'block' : 'none');
    })
</script>