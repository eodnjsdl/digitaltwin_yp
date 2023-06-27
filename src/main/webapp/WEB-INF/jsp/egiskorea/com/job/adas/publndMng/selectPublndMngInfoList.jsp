<%--
* 공유지 관리 화면
* author : 백승석
* since : 2023.06.23
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script src="/js/egiskorea/com/job/adas/publndMng/publndMng.js"></script>
<!-- 행정자산 -> 공유지관리 -->
<div class="popup-header" style="font-size: 20px;">공유지관리</div>
<div class="popup-body">
	<div class="bottom-popup-body bottom-popup-group">
	<!-- 검색영역 -->
		<div class="items search-area">
			<div class="tabBoxDepth2-wrap">
                <div class="tabBoxDepth2">
					<ul>
						<li data-tab="publndMng" class="on">
							<button type="button" class="inner-tab" style="border-bottom-color: #8895AD;">속성검색</button>
						</li>
					</ul>
				</div>
				<div class="tab-cont on">
					<form name="publndMngSerach" id="publndMngSerach" method="post">
					<div class="srch-default">
						<table class="srch-tbl">
							<colgroup>
								<col style="width: 30%;">
								<col style="width: auto;">
							</colgroup>
							<tbody id="publndSrchOptions">
								<tr>
									<th scope="row">읍면동</th>
									<td colspan="2">
										<select name="stdgCd" id="stdgCd" class="form-select">
											<option value="">전체</option>
											<c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
												<option value="<c:out value='${emdList.emdCd}' />" <c:if test="${searchVO.emdKorNm == emdList.emdCd}">selected</c:if>>
													<c:out value="${emdList.emdKorNm}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">재산번호</th>
									<td colspan="2"><input type="text" class="form-control" id="prprtyNo" name="prprtyNo" placeholder="재산번호"></td>
								</tr>
								<tr>
									<th scope="row">소재지</th>
									<td colspan="2"><input type="text" class="form-control" id="locplc" name="locplc" placeholder="소재지"></td>
								</tr>
								<tr>
									<th scope="row">번지</th>
									<td colspan="2"><input type="text" class="form-control" id="lnbr" name="lnbr" placeholder="번지"></td>
								</tr>
							</tbody>
						</table>
					</div>
					</form>
					<div class="btn-wrap">
						<div><button type="submit" class="btn type01 search">조회</button></div>
					</div>
				</div>
				<!-- <div class="tab-cont roadSectSpace">
					<div class="space-search-group">
						<div class="space-search-items">
							<span class="form-radio text group">
								<span>
									<input type="radio" name="rad-facility-area" id="rad-facility-area-extent" value="extent" checked="checked">
									<label for="rad-facility-area-extent">현재화면영역</label>
								</span>
								<span>
									<input type="radio" name="rad-facility-area" id="rad-facility-area-custom" value="custom">
									<label for="rad-facility-area-custom">사용자 정의</label>
								</span>
							</span>
						</div>
						<div class="space-search-items space-facility-area" style="display:none;">
							<span class="drawing-obj small">
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-point" value="1">
									<label for="rad-facility-drawing-point" class="obj-sm01"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-linestring" value="2">
									<label for="rad-facility-drawing-linestring" class="obj-sm02"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-box" value="3">
									<label for="rad-facility-drawing-box" class="obj-sm03"></label>
								</span>
								<span>
									<input type="radio" name="rad-facility-drawing" id="rad-facility-drawing-circle" value="4">
									<label for="rad-facility-drawing-circle" class="obj-sm04"></label>
								</span>
							</span>
						</div>
						<div class="space-search-items">경계로부터
							<span class="form-group">
									<input type="text" onkeyup = "this.value=this.value.replace(/[^-0-9]/g,'');" class="form-control align-center area-facility-buffer" value="0" placeholder="0"/>
									<sub>m</sub>
							</span> 이내 범위
						</div>
					</div>
					<div class="btn-wrap">
						<div>
							<button type="submit" class="btn type01 search facility-spatial-search">조회</button>
						</div>
					</div>
				</div> -->
			</div>
		</div>
		<!-- //검색영역 -->
		<div class="items data-area">
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong></strong>건</div>
				<div class="bbs-top-side">
					<select id="year" class="form-select">
						<option value="allYear">전체</option>
						<c:if test="${fn:length(yearList) > 0}">
							<c:forEach var="yearList" items="${yearList}">
								<option value="<c:out value="${yearList}"/>"><c:out value="${yearList}"/></option>
							</c:forEach>
						</c:if>
 					</select>
				</div>
			</div>
			<div class="bbs-list-wrap" style="height: 267px;">
				<div class="bbs-default">
					<div id="publndMngGrid" data-ax5grid="publndMngGrid" data-ax5grid-config="{}" style="height: 267px;"></div>
					<!-- <div data-ax5grid="attr-grid-excel" style="display:none;"></div> -->
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="manualBtn" title="도움말" onclick="manualTab('공유지관리')"></button>
<button type="button" class="popup-close" title="닫기"></button>
<button type="button" class="popup-reset" class="초기화"></button>
<button type="button" class="popup-bottom-toggle" title="접기"></button>				
