<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/tran/popltn/popltn.js"></script>
<script src="/js/map/lib/geostats/geostats.min.js"></script>
<!-- 교통분석-인구정보 -->
	<form name="pplSearchForm" id="pplSearchForm">
	<div class="popup-header">인구정보</div>
	<div class="popup-body">
		<div class="left-popup-body">	
			<div class="srch-box">
				<div class="srch-default">
					<table class="srch-tbl">
						<colgroup>
							<col style="width: 25%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
                               <th scope="row">항목 선택</th>
                               <td>
                                   <select name="pplShowType" id="pplShowType" class="form-select w-auto" style="width: 100%;">
                                       <option value="legal" selected="selected">법정동 경계</option>
                                       <option value="grid">격자</option>
                                   </select>
                               </td>
                           </tr>
                           <tr>
                              <th scope="row">대상 지역</th>
                               <td>
                                   <select name="liCd" id="liCd" class="form-select w-auto" style="width: 100%;">
                                       <option value="all" selected="selected">전체</option>
                                   </select>
                               </td> 
                           </tr>
                           <tr>
                              <th scope="row">자료 유형</th>
                               <td>
                                   <select name="pplGender" id="pplGender" class="form-select w-auto" style="width: 100%;">
                                       <option value="all" selected="selected">총인구</option>
                                       <option value="m">남자</option>
                                       <option value="w">여자</option>
                                   </select>
                               </td> 
                           </tr>										
                           <tr>
                              <th scope="row">기준 연월</th>
                               <td>
                                   <select name="stdrYm" id="pplBaseYYMM" class="form-select w-auto" style="width: 100%;">
                                   </select>
                               </td> 
                           </tr>										
						</tbody>
					</table>
				</div>
				<div class="btn-wrap">
                    <div>
                        <button type="button" id="pplInfoSearch" class="btn type01 search">조회</button>
                    </div>
                </div>
				
			</div>
			
			<div class="pplInfoLegalType">
				<div class="btn-wrap justify-content-between">
					<div class="bbs-list-num">조회결과 : <strong></strong>건</div>
					<!-- <div class="align-right"><button type="button" class="btn bi-write" id="faciRegistViewBtn">등록</button></div> -->
				</div>
		
				<div class="bbs-default">
					<div class="bbs-list-head">
	                    <table class="bbs-list">
	                        <colgroup>
	                            <col style="width: 30%;">
	                            <col style="width: 30%;">
	                            <col style="width: auto;">
	                        </colgroup>
	                        <thead>
		                        <tr>
		                            <th scope="col">지역</th>
		                            <th scope="col">통계치</th>
		                            <th scope="col">비율</th>
		                        </tr>
	                        </thead>
	                    </table>
	                </div>
					<div class="scroll-y" style="max-height: 180px;">
						<table class="bbs-list">
		                     <colgroup>
		                         <col style="width: 30%;">
		                         <col style="width: 30%;">
		                         <col style="width: auto;">
		                     </colgroup>
	                     <tbody id="pplInfoLegalList">
	                     <%-- <c:forEach items="${resultList}" var="cpList" varStatus="status">
	                         <tr name="tdCwpDtl" id="tdCwpDtl" data-cpi='<c:out value="${cpList.cntrkPlnId}" />'
	                             data-lon='<c:out value="${cpList.lon}" />'
	                             data-lat='<c:out value="${cpList.lat}" />'>
	                              
	                             <c:forEach items="${codeList}" var="codeList" varStatus="status">
	                                 <c:if test="${cpList.cntrkTy eq codeList.codeId}">
	                                     <td><c:out value="${codeList.codeIdNm}"></c:out></td>
	                                 </c:if>
	                             </c:forEach>
	                             <td><c:out value="${cpList.chpsnPsitn}"></c:out></td>
	                             <td><c:out value="${cpList.plnYear}"></c:out>년 <c:out
	                                     value="${cpList.plnQu}"></c:out></td>
	                             <td><c:out value="${cpList.cntrkNm}"></c:out></td>
	                         </tr>
	                     </c:forEach>
	                     <c:if test="${fn:length(resultList) == 0}">
	                         <tr>
	                             <td colspan="4">데이터가 없습니다.</td>
	                         </tr>
	                     </c:if> --%>
	                     </tbody>
	                 </table>
					</div>
				</div>
				
				<div class="graph-box2"></div>
			</div>
			
			<div class="pplInfoGridType" style="display: none;">
				<div>
				격자
				<ul>
					<li>aaa</li>
					<li>bbb</li>
					<li>ccc</li>
					<li>ddd</li>
					<li>eee</li>
					<li>fff</li>
				</ul>
				</div>
			</div>
			
		</div>
	</div>
	
	</form>
	
	<button type="button" class="manualBtn" title="도움말" onclick="manualTab('인구정보')"></button>
	<button type="button" class="popup-close" id="popltnCloseBtn" title="닫기"></button>
	<button type="button" class="popup-reset" class="초기화" id="populationReset"></button>
	<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- 교통분석-인구정보 -->

