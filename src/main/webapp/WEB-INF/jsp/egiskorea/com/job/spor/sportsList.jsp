<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>
<script src="/js/egiskorea/com/job/spor/spor.js"></script>

<script>
//사용자 정의 툴 기본적으로 숨기기(공간검색시 예외처리 하단에 처리)
$(".areaSrchTool").hide();

//체육시설 목록
function fn_select_physicalEducation_facility_list(){
	document.spor_searchForm.pageIndex.value = 1;
	aj_selectPhysicalEducationFacilityList($("#spor_searchForm")[0]);
}
//체육시설목록 페이징
function fn_select_physicalEducation_facility_linkPage(pageNo){
	document.spor_searchForm.pageIndex.value = pageNo;
	if(SPOR_SPITAL_YN != ''){
		aj_selectPhysicalEducationFacilityList($("#spor_searchForm")[0],'sprital');
	}else{
		aj_selectPhysicalEducationFacilityList($("#spor_searchForm")[0]);
	}
}
//공간검색
$("input[name=sportsAreaDrawing]").on('click',function(){
	var chk2 = $("input[name=sportsAreaDrawing]:checked").val();
	cmmUtil.spitalDraw(chk2);
});

$("input[name=sportsSelect]").on('change',function(){
	cmmUtil.drawClear();
	var chk = $("input[name=sportsSelect]:checked").val();
	var chk2 = $("input[name=sportsAreaDrawing]:checked").val();
	
	if(chk !="1"){
		$("input[name=sportsAreaDrawing]").attr('disabled', false);
		$(".areaSrchTool").show();
		cmmUtil.spitalDraw(chk2);
	}else{
		$("input[name=sportsAreaDrawing]").attr('disabled', true);
		$(".areaSrchTool").hide();
		cmmUtil.drawClear();
	}
});

//공간검색시
if( SPOR_SPITAL_YN != ''){
	$(".waterProperty").removeClass("on");
	$(".waterSpace").addClass("on");
	$("li[data-tab='waterProperty']").removeClass("on");
	$("li[data-tab='waterSpace']").addClass("on");
}

//공간검색일때, 속성검색 목록 전부 초기화
$(document).on("click", ".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab", function(){ 
	if($("li[data-tab='waterSpace']").hasClass("on")){
		var emptList = ['#sports_fcty_tp_cd','#sports_oper_mthd_cd',"#sporSearchAdres","#sporSearchAlsfc_nm"];
			$.each(emptList,function(k,v){
				$(v).val('');
			});
	}
});

</script>
				<!-- 업무 > 시설관리 > 체육시설 -->
				<div class="popup-header">체육시설</div>
				<div class="popup-body">
					<div class="bottom-popup-body bottom-popup-group">						
						<!-- 검색영역 -->
						<div class="items search-area">
						<form:form name="spor_searchForm" id="spor_searchForm" method="post" onsubmit="fn_select_physicalEducation_facility_list(); return false;">
							<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${SportsVO.pageIndex}' />">
							<input type="hidden" name="bufferArea" id="bufferArea" value="<c:out value='${SportsVO.bufferArea}' />">
							<div class="tabBoxDepth2-wrap">
								<div class="tabBoxDepth2">
									<ul>
										<li data-tab="waterProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
										<li data-tab="waterSpace"><button type="button" class="inner-tab">공간검색</button></li>
									</ul>
								</div>
								<div class="tab-cont waterProperty on">
<!-- 								<div class="tab-cont sportsProperty on"> -->
									<div class="srch-default">
										<table class="srch-tbl">
											<colgroup>
												<col style="width: 30%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">시설구분</th>
													<td>
														<select name="sports_fcty_tp_cd" id="sports_fcty_tp_cd" class="form-select">
															<option value="">전체</option>
														</select>
													</td>
												</tr>
												<tr>
													<th scope="row">운영방식</th>
													<td>
														<select name="sports_oper_mthd_cd" id="sports_oper_mthd_cd" class="form-select">
															<option value="">전체</option>
															<option value="위탁">위탁</option>
														</select>
													</td>
												</tr>
												<tr>
													<td colspan="2"><input type="text" class="form-control" id="sporSearchAdres" name="sporSearchAdres" onkeypress="if( event.keyCode == 13 ){ aj_selectPhysicalEducationFacilityList();} "placeholder="읍면동"></td>
												</tr>
												<tr>
													<td colspan="2"><input type="text" class="form-control" id="sporSearchAlsfc_nm" name="sporSearchAlsfc_nm" onkeypress="if( event.keyCode == 13 ){ aj_selectPhysicalEducationFacilityList();}" placeholder="시설명"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="btn-wrap">
										<div><button type="button" class="btn type01 search" onclick="aj_selectPhysicalEducationFacilityList();">조회</button></div>
									</div>
								</div>
<!-- 								<div class="tab-cont sportsSpace"> -->
								<div class="tab-cont waterSpace">
									<div class="space-search-group">
										<div class="space-search-items">
											<span class="form-radio text group">
												<span><input type="radio" name="sportsSelect" id="rChk1-1" value="1" checked=""><label for="rChk1-1">현재화면영역</label></span>
												<span><input type="radio" name="sportsSelect" id="rChk1-2" value="2"><label for="rChk1-2">사용자 정의</label></span>
											</span>
										</div>
										<div class="space-search-items areaSrchTool">
											<span class="drawing-obj small">
												<span><input type="radio" name="sportsAreaDrawing" id="aChk1" value="1"><label for="aChk1" class="obj-sm01"></label></span>
												<span><input type="radio" name="sportsAreaDrawing" id="aChk2" value="2"><label for="aChk2" class="obj-sm02"></label></span>
												<span><input type="radio" name="sportsAreaDrawing" id="aChk3" value="3"><label for="aChk3" class="obj-sm03"></label></span>
												<span><input type="radio" name="sportsAreaDrawing" id="aChk4" value="4"><label for="aChk4" class="obj-sm04"></label></span>
											</span>
										</div>
										<div class="space-search-items areaSrchTool">경계로부터 <span class="form-group"><input type="text" onKeyup="this.value=this.value.replace(/[^-0-9]/g,'');" id="sportsBuffer" class="form-control align-center"onkeypress="if( event.keyCode == 13 ){ aj_selectPhysicalEducationFacilityList($('#spor_searchForm')[0],'spital'); }" value="0"> <sub>m</sub></span> 이내 범위</div>
										
									</div>
									<div class="btn-wrap">
										<div><button type="button" class="btn type01 search" onclick="aj_selectPhysicalEducationFacilityList($('#spor_searchForm')[0],'spital');">조회</button></div>
									</div>
								</div>
							</div>
							</form:form>
						</div>
						
						<!-- //검색영역 -->
						<div class="items data-area">
							<div class="bbs-top">
								<div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"></c:out></strong>건</div>
								<div><button type="button" onclick="insertSportsView();" class="btn basic bi-write" data-popup="work-02-04-regist">등록</button> <button type="button" class="btn basic bi-excel" id="sportsExcelDown">엑셀저장</button> </div>
							</div>
							<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
								<div class="bbs-default">
									<div class="bbs-list-head">
										<table class="bbs-list" id="sportsThead">
												<colgroup>
												<col style="width: 5%;">
												<col style="width: auto%;">
												<col style="width: auto;">
												<col style="width: 10%;">
												<col style="width: 20%;">
												<col style="width: 8%;">
												<col style="width: auto;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">관리번호</th>
													<th scope="col">체육시설명</th>
													<th scope="col">주소</th>
													<th scope="col">설립일자</th>
													<th scope="col">문의번호</th>
													<th scope="col">담당자</th>
													<th scope="col">최종수정시간</th>
												</tr>
											</thead>
										</table>
									</div>
									<div class="scroll-y">
										<table class="bbs-list">
												<colgroup>
												<col style="width: 5%;">
												<col style="width: auto%;">
												<col style="width: auto;">
												<col style="width: 10%;">
												<col style="width: 20%;">
												<col style="width: 8%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
											
											<c:set var="count" value="${resultCnt}" />
												<c:choose>
											    <c:when test="${count eq 0}">
											    	<tr>
											    		<td class="noData" colspan="7">데이터가 없습니다.</td>
											    	</tr>
											    </c:when>
											    <c:otherwise>
													<c:forEach items="${resultList}" var="sporList" varStatus="status">
														<tr id="<c:out value="${sporList.gid}" />" class=""  data-gid="<c:out value="${sporList.gid}" />" style="cursor:pointer;" onclick="selectSportsDetail('<c:out value="${sporList.gid}"/>','<c:out value="${sporList.lonLon}"/>','<c:out value="${sporList.latLat}"/>');">
															<td><c:out value="${sporList.gid}"></c:out></td>
															<td><c:out value="${sporList.fcltyNm}"></c:out></td>
															<td><c:out value="${sporList.adres}"></c:out></td>
															<td>
																<c:out value="${sporList.fondDe}"></c:out><br/>
																<%-- 
																	<fmt:parseDate value="${sporList.fondDe}" var="fondDe" pattern="yyyy-MM-dd/"/>
																	<fmt:formatDate value="${fondDe}"  pattern="yyyy년 MM월 dd일"/> 
																--%>
															</td>
															<td><c:out value="${sporList.cttpcTelno}"></c:out></td>
															<td><c:out value="${sporList.chargerNm}"></c:out></td>
															<td>
																<fmt:formatDate pattern="yyyy-MM-dd hh:mm:ss" value="${sporList.lastModfDt}"/>
															</td>
														</tr>
													</c:forEach>
											    </c:otherwise>
											</c:choose>
											</tbody>
										</table>
									</div>
								</div>
								<div class="pagination">
									<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_physicalEducation_facility_linkPage"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button type="button" class="manualBtn" title="도움말" onclick="manualTab('체육시설')"></button>
				<button type="button" class="popup-close" title="닫기" onclick="removeLayer(); destroy();"></button>
				<button type="button" class="popup-reset" class="초기화" onclick="bottomPopupOpen('physicalEducationFacility');"></button>
				<button type="button" class="popup-bottom-toggle" title="접기" onclick="toggleFold(this);"></button>				
				<!-- //업무 > 시설관리 > 체육시설 -->
	