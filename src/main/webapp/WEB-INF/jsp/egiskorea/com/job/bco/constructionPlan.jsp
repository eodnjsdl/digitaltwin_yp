<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script src="/js/egiskorea/com/job/bco/cwp.js"></script>

<script type="text/javascript">
// 공사 예정 활용여부 Y/N
var reCntrkPrrngPrcuseAt = "<c:out value='${result.cntrkPrrngPrcuseAt}'></c:out>";
if(reCntrkPrrngPrcuseAt == "Y"){
	$("#rChk1_1").attr('checked', true);	
}else if(reCntrkPrrngPrcuseAt == "N"){
	$("#rChk1_2").attr('checked', true);
}
var rePageChk = false;
// 시기 - 년도
var rePlnYearDtl = "<c:out value='${searchVO.plnYear}'></c:out>";
// 시기 - 분기
var rePlnQuDtl = "<c:out value='${searchVO.plnQu}'></c:out>";
// 유형 - 공사유형(전체)
var reCntrkTyDtl = "<c:out value='${searchVO.cntrkTy}'></c:out>";
// 유형 - 집행부서(전체)
var reChpsnPsitnDtl = "<c:out value='${searchVO.chpsnPsitn}'></c:out>";
// 유형 - 읍명동(전체)
var reCntrkLcAdresDtl = "<c:out value='${searchVO.cntrkLcAdres}'></c:out>";
// 유형 - 공사명
var reCntrkNmDtl = "<c:out value='${searchVO.cntrkNm}'></c:out>";

// 페이징 넘버
var rePageIndexDtl = "<c:out value='${searchVO.pageIndex}'/>";

//공사계획 수정페이지에서 등록 버튼 이벤트 처리
$("#btnCpDelete").unbind('click').bind('click',function(){
	if(confirm("<spring:message code="common.delete.msg" />")){
		aj_deleteConstructionPlan($("#updateForm")[0], $(this).data('cwpid'));
	}
});
</script>

<!-- 공사계획정보 -->
	<p class="cont-tit">공사계획정보 상세</p>
	<div class="data-default">
		<table class="data-write">
			<colgroup>
				<col style="width: 20%;">
				<col style="width: auto;">
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">공사유형</th>
					<c:forEach items="${codeList}" var="codeList" varStatus="status">
						<c:if test="${result.cntrkTy eq codeList.codeId}">
							<td ><c:out value="${codeList.codeIdNm}"></c:out></td>
						</c:if>
					</c:forEach>
					<%-- <td><c:out value="${result.cntrkTy}"></c:out></td> --%>
				</tr>
				<tr>
					<th scope="row">공사명</th>
					<td><c:out value='${result.cntrkNm}'></c:out></td>
				</tr>
				<tr>
					<th scope="row">계획시기</th>
					<td>
						<select name="" id="" class="form-select w-auto" onclick="return(false);">
							<option value="<c:out value='${result.plnYear}'></c:out>"><c:out value='${result.plnYear}'></c:out></option>
						</select> 
						<select name="" id="" class="form-select w-auto">
							<option value="<c:out value='${result.plnQu}'></c:out>"><c:out value='${result.plnQu}'></c:out></option>
						</select>
					</td>
				</tr>
				<tr>
					<th scope="row">공사예정<br>활용여부</th>
					<td>
						<span class="form-radio text group">
							<span><input type="radio" name="test" id="rChk1_1" onclick="return(false);"><label for="rChk1_1">Y</label></span>
							<span><input type="radio" name="test" id="rChk1_2" onclick="return(false);"><label for="rChk1_2">N</label></span>
						</span>
					</td>
				</tr>
				<tr>
					<th scope="row">담당자</th>
					<td>
						<div class="form-row">
							<div class="col">
								<select name="" id="" class="form-select">
									<option value=""><c:out value='${result.chpsnPsitn}'></c:out></option>
								</select>
							</div>
							<div class="col"><input type="text" class="form-control" placeholder="이름" value="<c:out value='${result.chpsnNm}'></c:out>" readonly></div>
							<div class="col"><input type="text" class="form-control" placeholder="전화번호" value="<c:out value='${result.chpsnCttpc}'></c:out>" readonly></div>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">공사위치</th>
					<td>
						<div class="form-row">
							<c:out value='${result.cntrkLcAdres}'></c:out>
							<!-- <div class="col"><input type="text" class="form-control" value="<c:out value='${result.cntrkLcAdres}'></c:out>"></div> --> 
							<!-- <div class="col-auto"><button type="button" class="btn type01 bi-location" id="getPositionLocation">지도에서 선택</button></div> -->
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">공사개요</th>
					<td><textarea name="" id="" class="form-control" style="height: 140px;" readonly><c:out value='${result.cntrkOtl}'></c:out></textarea></td>
				</tr>
			</tbody>
		</table>
		<form:form name="searchPlanForm" id="searchPlanForm" method="post" onsubmit="fn_selectPlanDtl_linkPage(); return false;">
			<input type="hidden" id="plnYear" name="plnYear" value="">
			<input type="hidden" id="plnQu" name="plnQu" value="">
			<input type="hidden" id="cntrkTy" name="cntrkTy" value="">
			<input type="hidden" id="chpsnPsitn" name="chpsnPsitn" value="">
			<input type="hidden" id="cntrkLcAdres" name="cntrkLcAdres" value="">
			<input type="hidden" id="cntrkNm" name="cntrkNm" value="">
			<input type="hidden" id="pageIndex" name="pageIndex" value="">
		</form:form>
	</div>
	<div class="position-bottom btn-wrap">
		<div>
			<button type="button" class="btn basic bi-write2" id="btnCpUpdate" data-cwpid="<c:out value='${result.cntrkPlnId}'></c:out>">수정</button>
			<button type="button" class="btn basic bi-delete2" id="btnCpDelete" data-cwpid="<c:out value='${result.cntrkPlnId}'></c:out>">삭제</button>
			<button type="button" class="btn basic bi-cancel" id="btnCpCancel">취소</button>
		</div>
	</div>

<!-- //공사계획정보 -->