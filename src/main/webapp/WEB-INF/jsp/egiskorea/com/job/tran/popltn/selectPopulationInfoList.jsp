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
			<div class="search-box">
				<table class="search-table">
					<colgroup>
						<col style="width: 40%;">
						<col style="width: auto;">
					</colgroup>
					<tbody>
						<tr id="showType">
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
                                   <option value="all">전체</option>
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
                                    <option value="old">노인</option>
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
				<div class="btn-wrap">
                    <div>
                        <button type="button" id="pplInfoSearch" class="btn type01 search">조회</button>
                    </div>
                </div>
				
			</div>
			
			<div class="pplInfoLegalType">
				<div class="btn-wrap justify-content-between">
					<h4 id="resultCnt">조회결과 : 명</h4>
				</div>
		
				<div class="data-default">
                    <table class="table-title data-list">
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
					<div class="scroll-y" style="max-height: 250px;">
						<table class="bbs-list">
		                     <colgroup>
		                         <col style="width: 30%;">
		                         <col style="width: 30%;">
		                         <col style="width: auto;">
		                     </colgroup>
	                     <tbody id="pplInfoLegalList">
	                     </tbody>
	                 </table>
					</div>
				</div>
				<div class="graph-box2" style="margin-top: 5px;"></div>
			</div>
			
			<div id="pplInfoGridType" class="regendLevel-type1" style="display: none;">
			<h4>인구 분포도 정보<small>*인구 수 (2022년 10월 기준)</small></h4>
			<ol>
				<li>
					<span class="rg lv01"></span>
					<label>
						<input id="lv01_1" type="text" value="0.00" readonly />-&nbsp;<input id="lv01_2" type="text" value="9.00" readonly />
					</label>
				</li>
				<li>
					<span class="rg lv02"></span>
					<label>
						<input id="lv02_1" type="text" value="9.00" readonly />-&nbsp;<input id="lv02_2" type="text" value="73.00" readonly />
					</label>
				</li>
				<li>
					<span class="rg lv03"></span>
					<label>
						<input id="lv03_1" type="text" value="73.00" readonly />-&nbsp;<input id="lv03_2" type="text" value="255.00" readonly />
					</label>
				</li>
				<li>
					<span class="rg lv04"></span>
					<label>
						<input id="lv04_1" type="text" value="255.00" readonly />-&nbsp;<input id="lv04_2" type="text" value="693.00" readonly />
					</label>
				</li>
				<li>
					<span class="rg lv05"></span>
					<label>
						<input id="lv05_1" type="text" value="693.00" readonly />-&nbsp;<input id="lv05_2" type="text" value="1479.00" readonly />
					</label>
				</li>
				
			</ol>
			</div>
		</div>
	</div>
	
	</form>
	
	<button type="button" class="manualBtn" title="도움말" onclick="manualTab('인구정보')"></button>
	<button type="button" class="popup-close" id="popltnCloseBtn" title="닫기"></button>
	<button type="button" class="popup-reset" class="초기화" id="populationReset"></button>
	<button type="button" class="popup-bottom-toggle" title="접기"></button>				
<!-- 교통분석-인구정보 -->

