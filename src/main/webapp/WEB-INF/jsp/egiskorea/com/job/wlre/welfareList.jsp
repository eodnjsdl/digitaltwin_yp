<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 

<script src="/js/egiskorea/com/job/wlre/wlre.js"></script>
<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>
<script>
$(document).ready(function() {
	WLRE.init();
});

// 복지시설 등록페이지 열기 버튼
$("#welfareModal").on("click", function(){
	WLRE.aj_selectWelfareFacilityModal();
});
</script>
				<!-- 업무 > 시설관리 > 복지시설 -->
				<div class="popup-header">복지시설</div>
				<div class="popup-body">
					<div class="bottom-popup-body bottom-popup-group">						
						<!-- 검색영역 -->
						<div class="items search-area">
						<form:form name="wlre_searchForm" id="wlre_searchForm" method="post" onsubmit="WLRE.fn_select_wlre_list(''); return false;">
						<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
						<input type="hidden" name="bufferArea" id="bufferArea" value="<c:out value='${searchVO.bufferArea}' />">
							<div class="tabBoxDepth2-wrap">
								<div class="tabBoxDepth2">
									<ul>
										<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
										<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
									</ul>
								</div>
								<div class="tab-cont waterProperty on">
									<div class="srch-default" style="margin-top: 15px;">
										<table class="srch-tbl">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">시설구분</th>
													<td colspan="1">
														<select name="wlre-search-fclty-se" class="form-control" id="wlre-search-fclty-se" onkeypress="if( event.keyCode == 13 ){ WLRE.fn_select_wlre_list('');}">
															<option name="전체" value=" ">전체</option>
														</select>
													</td>
<!-- 													<td colspan="1"><input type="text" class="form-control" id="wlre-search-fclty-se" onkeypress="if( event.keyCode == 13 ){ WLRE.fn_select_wlre_list(''); }"></td> -->
												</tr>
												<tr>
													<td colspan="2"><input type="text" class="form-control" id="wlre-search-rn-adres" onkeypress="if( event.keyCode == 13 ){ WLRE.fn_select_wlre_list(''); }" placeholder="도로명주소"></td>
												</tr>
												<tr>
													<td colspan="2"><input type="text" class="form-control" id="wlre-search-fclty-nm" onkeypress="if( event.keyCode == 13 ){ WLRE.fn_select_wlre_list(''); }" placeholder="시설명"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="btn-wrap">
										<div><button type="button" class="btn type01 search" onclick="WLRE.fn_select_wlre_list('');">조회</button></div>
									</div>
								</div>
								<div class="tab-cont waterSpace">
									<div class="space-search-group">
										<div class="space-search-items">
											<span class="form-radio text group">
												<span><input type="radio" name="wlreSelect" id="rChk1-1" checked="" value="1"><label for="rChk1-1">현재화면영역</label></span>
												<span><input type="radio" name="wlreSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
											</span>
										</div>
										<div class="space-search-items areaSrchTool">
											<span class="drawing-obj small">
												<span><input type="radio" name="wlreAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
												<span><input type="radio" name="wlreAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
												<span><input type="radio" name="wlreAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
												<span><input type="radio" name="wlreAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
											</span>
										</div>
										<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="text" id="wlreBuffer" class="form-control align-center" 
										onkeyup="this.value=this.value.replace(/[^-0-9]/g,'');" value="0" placeholder="0" onkeypress="if( event.keyCode == 13 ){ WLRE.fn_select_wlre_list('spital'); }"> <sub>m</sub></span> 이내 범위</div>
									</div>
									<div class="btn-wrap">
										<div><button type="button" class="btn type01 search" onclick="WLRE.fn_select_wlre_list('spital');">조회</button></div>
									</div>										
								</div>
							</div>
							</form:form>
						</div>
						<!-- //검색영역 -->
						<div class="items data-area">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong>${welfareListLength}</strong> 건</div>
								<div><button type="button" onclick="WLRE.getCode('', 'insert');" class="btn basic bi-write" id="welfareModal">등록</button> <a href="/job/wlre/wlreExcelDown.do"><button type="button" class="btn basic bi-excel">엑셀저장</button></a></div>
							</div>
							<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list" id="welfare-table">
											<colgroup>
												<col style="width: 15%;">
												<col style="width: auto;">
												<col style="width: auto;">
												<col style="width: 13%;">												
											</colgroup>
											<thead>
												<tr>
													<th scope="col">시설구분</th>
													<th scope="col">시설명</th>
													<th scope="col">주소</th>
													<th scope="col">전화번호</th>													
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
											<colgroup>
												<col style="width: 15%;">
												<col style="width: auto;">
												<col style="width: auto;">
												<col style="width: 13%;">
											</colgroup>
											<tbody>
											<c:set var="count" value="${welfareListLength}" />
												<c:choose>
											    <c:when test="${count eq 0}">
											    	<tr>
											    		<td class="noData" colspan="4">데이터가 없습니다.</td>
											    	</tr>
											    </c:when>
											    <c:otherwise>
												<c:forEach var="welfareVO" items="${welfareList}" varStatus="sts">
													<tr id="<c:out value="${welfareVO.gid}" />" data-gid="<c:out value="${welfareVO.gid}" />" class=""  onclick="WLRE.selectWelfare('<c:out value="${welfareVO.gid}"/>', '<c:out value="${welfareVO.lon}"/>', '<c:out value="${welfareVO.lat}"/>');">
<%-- 														<td><c:out value="${welfareVO.fcltySe}"/></td> --%>
														<td>
														<c:set var="fcltySe" value="${welfareVO.fcltySe}" />
															<c:choose>
															<c:when test='${fcltySe eq "01"}'>
																노인의료복지시설								
															</c:when>
															<c:when test='${fcltySe eq "02"}'>
																노인주거복지시설								
															</c:when>
															<c:when test='${fcltySe eq "03"}'>
																바우처제공기관								
															</c:when>
															<c:when test='${fcltySe eq "04"}'>
																사회복지관								
															</c:when>
															<c:when test='${fcltySe eq "05"}'>
																아동복지시설								
															</c:when>
															<c:when test='${fcltySe eq "06"}'>
																여성시설								
															</c:when>
															<c:when test='${fcltySe eq "07"}'>
																자원봉사센터								
															</c:when>
															<c:when test='${fcltySe eq "08"}'>
																장애인거주시설								
															</c:when>
															<c:when test='${fcltySe eq "09"}'>
																장애인의료재활시설								
															</c:when>
															<c:when test='${fcltySe eq "10"}'>
																장애인지역사회재활시설								
															</c:when>
															<c:when test='${fcltySe eq "11"}'>
																장애인직업재활시설								
															</c:when>
															<c:when test='${fcltySe eq "12"}'>
																재가노인복지시설								
															</c:when>
															<c:when test='${fcltySe eq "13"}'>
																정보센터								
															</c:when>
															<c:when test='${fcltySe eq "14"}'>
																지역자활센터								
															</c:when>
															<c:otherwise>
																${welfareVO.fcltySe}
															</c:otherwise>
															</c:choose>
														</td>
														<td><c:out value="${welfareVO.fcltyNm}"/></td>
														<td><c:out value="${welfareVO.rnAdres}"/></td>
														<td><c:out value="${welfareVO.cttpcTelno}"/></td>													
													</tr>
												</c:forEach>
												</c:otherwise>
											</c:choose>									
											</tbody>
										</table>
									</div>
								</div>

								<div class="pagination">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="WLRE.fn_select_wlre_linkPage"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button type="button" class="manualBtn" title="도움말" onclick="manualTab('복지시설')"></button>
				<button type="button" class="popup-close" title="닫기" onclick="WLRE.removeCmmPOI();"></button>
				<button type="button" class="popup-reset" class="초기화" onclick="bottomPopupOpen('welfareFacility');"></button>
				<button type="button" class="popup-bottom-toggle" title="접기" onclick="toggleFold(this);"></button>				
				<!-- //업무 > 시설관리 > 복지시설 -->
				