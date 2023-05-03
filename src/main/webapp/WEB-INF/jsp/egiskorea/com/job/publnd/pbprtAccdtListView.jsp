<%--
* 공유재산 실태조사 화면
* author : 백승석
* since : 2023.02.21
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>
<script src="/js/egiskorea/com/job/publnd/publnd.js"></script>
<link rel="stylesheet" href="/css/job/publnd/publnd.css"/>

<!-- 업무 > 공유지관리 > 공유재산 실태조사 -->
<div class="popup-header" style="font-size: 20px;">공유재산 실태조사</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">						
		<!-- //검색영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong><c:out value="${cnt}"/></strong>건</div>
				<div class="bbs-top-side">
					<select id="year" class="form-select">
						<option value="allYear">전체</option>
						<c:if test="${fn:length(yearList) > 0}">
							<c:forEach var="yearList" items="${yearList}">
								<option value="<c:out value="${yearList}"/>"><c:out value="${yearList}"/></option>
							</c:forEach>
						</c:if>
 					</select>
					<button type="button" onclick="fn_insertView();" class="btn basic bi-write">등록</button>
					<button type="button" onclick="selectPbprtAccdtExcelUploadView()" class="btn basic bi-excel pbprtAccdtExcelUpload">엑셀업로드</button>
					<button type="button" class="btn basic bi-excel pbprtAccdtExcelDownload" id="getPbprtAccdtExcelList">엑셀다운로드</button>
					<form:form name="searchFormExcel" id="searchFormExcel" method="post" onsubmit=""></form:form>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;">
				<div class="bbs-default">
				<form:form>
					<div data-ax5grid="pbprtAccdtGrid" data-ax5grid-config="{}" style="height: 267px;"></div>
					<div data-ax5grid="attr-grid-excel" style="display:none;"></div>
				</form:form>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab()"></button>
<button type="button" class="popup-close" title="닫기" onclick="removeLayer();"></button><!-- destroy(); 소멸자 -->
<button type="button" class="popup-reset" class="초기화" onclick="resetGrid();"></button>
<button type="button" class="popup-bottom-toggle" title="접기" onclick="toggleFold(this);"></button>				
