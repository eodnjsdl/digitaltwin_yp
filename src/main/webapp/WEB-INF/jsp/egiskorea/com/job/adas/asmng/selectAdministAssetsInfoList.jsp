<%--
* 행정자산 관리 화면
* author : 백승석
* since : 2023.05.24
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/adas/asmng/asmng.js"></script>
<!-- 행정자산 -> 행정자산관리 -->
<div class="popup-header" style="font-size: 20px;">행정자산관리</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">
	<!-- 검색영역 -->
	<div class="scroll-y" style="height: 280px;">
		<div class="items search-area" style="padding-top: 0;">
			<div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
					<ul>
						<li data-tab="administAssets" class="on">
							<button type="button" class="inner-tab" style="border-bottom-color: #8895AD;">속성검색</button>
						</li>
					</ul>
				</div>
				<div class="tab-cont on">
					<form name="administAssetsSearch" id="administAssetsSearch" method="post">
					<div class="srch-default">
						<table class="srch-tbl">
							<colgroup>
								<col style="width: 40%;">
								<col style="width: auto;">
							</colgroup>
							<tbody id="adminSrchOptions">
								<tr>
									<th scope="row">재산번호</th>
									<td colspan="3"><input type="text" class="form-control" id="prprtyNo" name="prprtyNo" placeholder="재산번호"></td>
								</tr>
								<tr>
									<th scope="row">소재지</th>
									<td colspan="3"><input type="text" class="form-control" id="locplc" name="locplc" placeholder="소재지"></td>
								</tr>
								<tr>
									<th scope="row">재산관리관</th>
									<td colspan="3"><input type="text" class="form-control" id="prprtyMngInscd" name="prprtyMngInscd" placeholder="관리관코드"></td>
								</tr>
								<tr>
									<th scope="row">등기여부</th>
									<td colspan="3"><input type="text" class="form-control" id="rgistYn" name="rgistYn" placeholder="Y/N"></td>
								</tr>
								<tr>
									<th scope="row">대부가능여부</th>
									<td colspan="3"><input type="text" class="form-control" id="loanPosblYn" name="loanPosblYn" placeholder="Y/N"></td>
								</tr>
							</tbody>
						</table>
					</div>
					</form>
					<div class="btn-wrap">
						<div><button type="submit" class="btn type01 search">조회</button></div>
					</div>
				</div>
			</div>
		</div>
		</div>
		<!-- //검색영역 -->				
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong><c:out value="0"/></strong>건</div>
				<div class="bbs-top-side">
					<select id="year" class="form-select">
						<option value="allYear">전체</option>
						<c:if test="${fn:length(yearList) > 0}">
							<c:forEach var="yearList" items="${yearList}">
								<option value="<c:out value="${yearList}"/>"><c:out value="${yearList}"/></option>
							</c:forEach>
						</c:if>
 					</select>
					<button type="button" class="btn basic bi-write" id="regBtn">등록</button>
					<button type="button" class="btn basic bi-edit" id="exportBtn">선택 데이터 내보내기</button>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;">
				<div class="bbs-default">
					<div id="administAssetsGrid" data-ax5grid="administAssetsGrid" data-ax5grid-config="{}" style="height: 267px;"></div>
					<!-- <div data-ax5grid="attr-grid-excel" style="display:none;"></div> -->
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('행정자산관리')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>				
