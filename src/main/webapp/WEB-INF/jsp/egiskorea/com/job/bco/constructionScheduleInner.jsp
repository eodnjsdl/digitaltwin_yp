<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 공사예정정보 -->
<script src="/js/egiskorea/com/job/bco/cws.js"></script>
<script type="text/javascript">

   	//ui.callDatePicker();
	// 시기 - 년도
	var rePlnYearInner = "<c:out value='${searchVO.plnYear}'></c:out>";
	// 시기 - 분기
	var rePlnQuInner = "<c:out value='${searchVO.plnQu}'></c:out>";
	// 유형 - 공사유형(전체)
	var reCntrkTyInner = "<c:out value='${searchVO.cntrkTy}'></c:out>";
	// 유형 - 집행부서(전체)
	var reChpsnPsitnInner = "<c:out value='${searchVO.chpsnPsitn}'></c:out>";
	// 유형 - 읍명동(전체)
	var reCntrkLcAdresInner = "<c:out value='${searchVO.cntrkLcAdres}'></c:out>";
	
	callSelectOptionsInner();
</script>
<!-- Left > 업무 > 공간정보활용 > 사업공유관리 > 공사계획정보 조회하기 -->
<div class="popup-panel popup-sub work-01-01-inquiry opened" style="top: 15px;left: 0px;width: 475px;height: 645px;" id="innerConstructionPlan">
	<div class="popup-header">공사계획정보 조회하기</div>
	<div class="popup-body pad30">
		
		<div class="sub-popup-body">
			<form:form name="innerSearchForm" id="innerSearchForm" method="post" onsubmit="fn_select_constructionScheduleInner(1); return false;">
				<input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
				<div class="data-default">
					<table class="data-write">
						<colgroup>
							<col style="width: 20%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">시기</th>
								<td>
									<select name="plnYear" id="plnYearInner" class="form-select w-auto" style="width: 49.5%;">
										<option value="">전체</option>
									</select> 
									<select name="plnQu" id="plnQuInner" class="form-select w-auto" style="width: 49.5%;">
										<option value="">전체</option>
									</select>
								</td>
							</tr>
							<tr>
								<th scope="row" class="align-top">유형</th>
								<td>
									<div class="form-row">
										<div class="col">
											<select class="form-select" id="cntrkTyInner" name="cntrkTy">
												<option value="">전체</option>
												<c:forEach items="${codeList}" var="codeList" varStatus="status">
													<option value="<c:out value="${codeList.codeId}"></c:out>"><c:out value="${codeList.codeIdNm}"></c:out></option>
												</c:forEach>
											</select>
										</div>
										<div class="col">
											<select class="form-select" id="chpsnPsitnInner" name="chpsnPsitn">
												<option value="">집행부서</option>
												<option value="건설과">건설과</option>
												<option value="토지과">토지과</option>
											</select>
										</div>
										<div class="col">
											<select class="form-select" id="cntrkLcAdresInner" name="cntrkLcAdres">
												<option value="">전체</option>
												<c:forEach items="${sccoEndList}" var="emdList" varStatus="status">
													<option value="<c:out value='${emdList.emdKorNm}'></c:out>"><c:out value="${emdList.emdKorNm}"></c:out></option>																
												</c:forEach>								
											</select>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">공사명</th>
								<td><input type="text" class="form-control" placeholder="공사명을 입력해주세요." id="cntrkNmInner" name="cntrkNm" value="<c:out value='${searchVO.cntrkNm}' />"></td>
							</tr>
						</tbody>
					</table>					
				</div>
				<div class="btn-wrap marT5 marB20">
					<div><button type="button" class="btn type01 search" name="cplSearchInner">조회</button></div>
				</div>
			</form:form>
			<div class="bbs-top">
				<div class="bbs-list-num">조회결과 : <strong><c:out value="${resultCnt}"></c:out></strong>건</div>
			</div>
			<div class="data-default" style="height: 305px;">
				<table class="data-list">
					<colgroup>
						<col style="width: 40px;">
						<col style="width: 20%;">
						<col style="width: 17%;">
						<col style="width: 25%;">
						<col style="width: auto;">
					</colgroup>
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">공사유형</th>
							<th scope="col">집행부서</th>
							<th scope="col">집행시기</th>
							<th scope="col">공사명</th>
						</tr>
					</thead>								
				</table>
				<div class="scroll-y">
					<table class="data-list tbl-all-center">
						<colgroup>
							<col style="width: 40px;">
							<col style="width: 20%;">
							<col style="width: 17%;">
							<col style="width: 25%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<!-- <tr>
								<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked=""><label for="chk1"></label></span></span></td>
								<td>도로정비</td>
								<td>건설과</td>
								<td>2022년 2분기</td>
								<td>양평 유치원 인근 4개소 CCTV설치</td>
							</tr> -->
							
							<c:forEach items="${resultList}" var="cpList" varStatus="status">
								<tr name="tdCwpDtl" data-id='<c:out value="${cpList.cntrkPlnId}"></c:out>'>
									<td>
										<span class="form-checkbox">
											<span>
												<input type="checkbox" name="innerChkbox" id="<c:out value='${cpList.cntrkPlnId}' />" 
													data-cntrkTy='<c:out value="${cpList.cntrkTy}"/>' data-cntrkNm='<c:out value="${cpList.cntrkNm}"/>'
													data-chpsnPsitn='<c:out value="${cpList.chpsnPsitn}" />' data-chpsnNm='<c:out value="${cpList.chpsnNm}" />' 
													data-chpsnCttpc='<c:out value="${cpList.chpsnCttpc}" />' data-cntrkOtl='<c:out value="${cpList.cntrkOtl}" />'
													data-frstRegisterId='<c:out value="${cpList.frstRegisterId}" />' data-cntrkLcAdres='<c:out value="${cpList.cntrkLcAdres}" />'
													data-plnYear='<c:out value="${cpList.plnYear}" />' data-plnQu='<c:out value="${cpList.plnQu}" />'
													data-lon='<c:out value="${cpList.lon}"/>' data-lat='<c:out value="${cpList.lat}"/>'
												>
												<label for="<c:out value='${cpList.cntrkPlnId}' ></c:out>"></label>
											</span>
										</span>
									</td>
									<c:forEach items="${codeList}" var="codeList" varStatus="status">
										<c:if test="${cpList.cntrkTy eq codeList.codeId}">
											<td ><c:out value="${codeList.codeIdNm}"></c:out></td>
										</c:if>
									</c:forEach>
									<td><c:out value="${cpList.chpsnPsitn}"></c:out></td>
									<td><c:out value="${cpList.plnYear}"></c:out>년 <c:out value="${cpList.plnQu}"></c:out></td>
									<td><c:out value="${cpList.cntrkNm}"></c:out></td>								
								</tr>
							</c:forEach>
							<c:if test="${fn:length(resultList) == 0}">
								<tr>
									<td colspan="5">데이터가 없습니다.</td>
								</tr>
							</c:if>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pagination">
				<ui:pagination paginationInfo="${paginationInfo}" type="pagination" jsFunction="fn_select_constructionScheduleInnerPage"/>
			</div>
			<div class="position-bottom btn-wrap">
				<div><button type="button" class="btn basic bi-check" name="selectCheck" id="selectCheck">선택</button></div>
			</div>
		</div>
	</div>
	<button type="button" class="manualBtn" title="도움말" onclick="manualTab('사업공유관리')"></button>
	<button type="button" class="popup-close" title="닫기"></button>				
</div>
<!-- //Left > 업무 > 공간정보활용 > 사업공유관리 > 공사계획정보 조회하기 -->