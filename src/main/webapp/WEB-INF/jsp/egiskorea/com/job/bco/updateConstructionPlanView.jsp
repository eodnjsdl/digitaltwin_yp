<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<script src="/js/egiskorea/com/job/bco/cwp.js"></script>
<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>

<script type="text/javascript">
$( function() {
	
	var rePageChk = false;
	// 시기 - 년도
	var rePlnYearDtl = "<c:out value='${searchVO.rePlnYear}'></c:out>";
	// 시기 - 분기
	var rePlnQuDtl = "<c:out value='${searchVO.rePlnQu}'></c:out>";
	// 유형 - 공사유형(전체)
	var reCntrkTyDtl = "<c:out value='${searchVO.reCntrkTy}'></c:out>";
	// 유형 - 집행부서(전체)
	var reChpsnPsitnDtl = "<c:out value='${searchVO.reChpsnPsitn}'></c:out>";
	// 유형 - 읍명동(전체)
	var reCntrkLcAdresDtl = "<c:out value='${searchVO.reCntrkLcAdres}'></c:out>";
	// 유형 - 공사명
	var reCntrkNmDtl = "<c:out value='${searchVO.reCntrkNm}'></c:out>";
	// 페이징 넘버
	var rePageIndexDtl = "<c:out value='${searchVO.rePageIndex}'></c:out>";
	
	
	
	// 시기 - 년도
	var rePlnYear = "<c:out value='${result.plnYear}'></c:out>";
	// 시기 - 분기
	var rePlnQu = "<c:out value='${result.plnQu}'></c:out>";
	// 유형 - 공사유형(전체)
	var reCntrkTy = "<c:out value='${result.cntrkTy}'></c:out>";
	// 유형 - 집행부서(전체)
	var reChpsnPsitn = "<c:out value='${result.chpsnPsitn}'></c:out>";
	// 유형 - 읍명동(전체)
	var reCntrkLcAdres = "<c:out value='${result.cntrkLcAdres}'></c:out>";
	
	// 공사 예정 활용여부 값 표출 Y/N로 표출
	var reCntrkPrrngPrcuseAt = "<c:out value='${result.cntrkPrrngPrcuseAt}'></c:out>";
	
	if(reCntrkPrrngPrcuseAt == "Y"){
		$("#rChk1_1").attr('checked', true);	
	}else if(reCntrkPrrngPrcuseAt == "N"){
		$("#rChk1_2").attr('checked', true);
	}
	callSelectOptions();
	
	// 시기 - 년도
	if(rePlnYear != ""){
		$("#plnYear").val(rePlnYear);
	}
	// 시기 - 분기
	if(rePlnQu != ""){
		$("#plnQu").val(rePlnQu);
	}
	// 공사계획 수정페이지에서 등록 버튼 이벤트 처리
	$("#btnCpUpdateInfo").unbind('click').bind('click',function(){
		if(confirm("<spring:message code="common.update.msg" />")){
			
			aj_updateConstructionPlan($("#updateForm")[0]);
		}
	});
	
})

</script>

<!-- 공사계획정보 -->

	<p class="cont-tit">공사계획정보 수정하기</p>
	<div class="data-default">
		<form:form name="updateForm" id="updateForm" method="post" onsubmit="fn_update_list(); return false;">
			<table class="data-write">
				<colgroup>
					<col style="width: 20%;">
					<col style="width: auto;">
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">공사유형</th>
						<td>
							<select name="cntrkTy" id="cntrkTy" class="form-select w-auto">
								<c:forEach items="${codeList}" var="codeList" varStatus="status">
									<c:choose> 
										<c:when test="${result.cntrkTy eq codeList.codeId}">
											<option value='<c:out value="${codeList.codeId}"></c:out>' selected="selected"><c:out value="${codeList.codeIdNm}"></c:out></option>
										</c:when> 
										<c:otherwise>
											<option value='<c:out value="${codeList.codeId}"></c:out>'><c:out value="${codeList.codeIdNm}"></c:out></option>
										</c:otherwise> 
									</c:choose> 
									
									
									<%-- <c:if test="${cpList.cntrkTy eq codeList.codeId}">
										<option value='<c:out value="${codeList.cntrkTy}"></c:out>'><c:out value="${codeList.codeIdNm}"></c:out></option>
									</c:if>
									<c:if test="${cpList.cntrkTy eq codeList.codeId}">
										<option value='<c:out value="${codeList.cntrkTy}"></c:out>'><c:out value="${codeList.codeIdNm}"></c:out></option>
									</c:if> --%>
								</c:forEach>
								<%-- <option value='<c:out value="${result.cntrkTy}"></c:out>'><c:out value="${result.cntrkTy}"></c:out></option> --%>
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row">공사명</th>
						<td><input type="text" class="form-control" id="cntrkNm" name="cntrkNm" value="<c:out value='${result.cntrkNm}'></c:out>"></td>
					</tr>
					<tr>
						<th scope="row">계획시기</th>
						<td>
							<select name="plnYear" id="plnYear" class="form-select w-auto"></select> 
							<select name="plnQu" id="plnQu" class="form-select w-auto"></select>
						</td>
					</tr>
					<tr>
						<th scope="row">공사예정<br>활용여부</th>
						<td>
							<span class="form-radio text group">
								<span><input type="radio" name="test" id="rChk1_1" value="Y"><label for="rChk1_1">Y</label></span>
								<span><input type="radio" name="test" id="rChk1_2" value="N"><label for="rChk1_2">N</label></span>
							</span>
						</td>
					</tr>
					<tr>
						<th scope="row">담당자</th>
						<td>
							<div class="form-row">
								<div class="col">
									<select name="chpsnPsitn" id="chpsnPsitn" class="form-select">
										<option value="<c:out value='${result.chpsnPsitn}'></c:out>"><c:out value='${result.chpsnPsitn}'></c:out></option>
									</select>
								</div>
								<div class="col"><input type="text" class="form-control" placeholder="이름" id="chpsnNm" name="chpsnNm" value="<c:out value='${result.chpsnNm}'></c:out>"></div>
								<div class="col"><input type="text" class="form-control" placeholder="전화번호" id="chpsnCttpc" name="chpsnCttpc" value="<c:out value='${result.chpsnCttpc}'></c:out>"></div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사위치</th>
						<td>
							<div class="form-row">
								<div class="col"><input type="text" class="form-control" id="cntrkLcAdres" name="cntrkLcAdres" value="<c:out value='${result.cntrkLcAdres}'></c:out>" readonly></div> 
								<div class="col-auto"><button type="button" class="btn type01 bi-location" id="getPositionLocation">지도에서 선택</button></div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사개요</th>
						<td><textarea name="cntrkOtl" id="cntrkOtl" class="form-control" style="height: 140px;"><c:out value='${result.cntrkOtl}'></c:out></textarea></td>
					</tr>
				</tbody>
			</table>
			<input type="hidden" value="<c:out value='${result.cntrkPlnId}'></c:out>" id="cntrkPlnId" name="cntrkPlnId">
			<input type="hidden" value="<c:out value='${result.geom}'></c:out>" id="geom" name="geom">
			
			<input type="hidden" id="rePlnYear" name="rePlnYear" value="<c:out value='${searchVO.rePlnYear}' />">
			<input type="hidden" id="rePlnQu" name="rePlnQu" value="<c:out value='${searchVO.rePlnQu}' />">
			<input type="hidden" id="reCntrkTy" name="reCntrkTy" value="<c:out value='${searchVO.reCntrkTy}' />">
			<input type="hidden" id="reChpsnPsitn" name="reChpsnPsitn" value="<c:out value='${searchVO.reChpsnPsitn}' />">
			<input type="hidden" id="reCntrkLcAdres" name="reCntrkLcAdres" value="<c:out value='${searchVO.reCntrkLcAdres}' />">
			<input type="hidden" id="reCntrkNm" name="reCntrkNm" value="<c:out value='${searchVO.reCntrkNm}' />">
			<input type="hidden" id="rePageIndex" name="rePageIndex" value="<c:out value='${searchVO.rePageIndex}' />">
		</form:form>
	</div>
	<div class="position-bottom btn-wrap">
		<div>
			<button type="button" class="btn basic bi-write2" id="btnCpUpdateInfo">저장</button> 
			<button type="button" class="btn basic bi-cancel" id="btnCpReCancel" data-cpi="<c:out value='${result.cntrkPlnId}'></c:out>">취소</button>
		</div>
	</div>

<!-- //공사계획정보 -->