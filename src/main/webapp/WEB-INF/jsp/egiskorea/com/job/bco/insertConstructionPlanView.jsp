<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script src="/js/egiskorea/com/job/bco/cwp.js"></script>
<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>

<script type="text/javascript">
//현재 년도  
var date = new Date();
var rePlnYear = date.getFullYear();

// 등록하기 이벤트 처리
$("#btnCpInsert").unbind('click').bind('click',function(){
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?

		
		if($("#cntrkTy").val() == ''){
			alert("공사유형 입력해주세요");return;
		}
		if($("#cntrkNm").val() == ''){
			alert("공사명 입력해주세요");return;
		}
		if($("#chpsnPsitn").val() == ''){
			alert("담당자 과 정보 입력해주세요");return;
		}
		if($("#chpsnNm").val() == ''){
			alert("담당자 이름 입력해주세요");return;
		}
		if($("#chpsnCttpc").val() == ''){
			alert("담당자 전화번호 입력해주세요");return;
		}
		if($("#cntrkLcAdres").val() == ''){
			alert("공사위치 입력해주세요");return;
		}
		if($("#cntrkOtl").val() == ''){
			alert("공사개요 입력해주세요");return;
		}
		
		aj_insertConstructionPlan($("#insertForm")[0]);
		destroy();
	}
});

callSelectOptions();

</script>

<!-- 공사계획정보 -->
	<p class="cont-tit">공사계획정보 등록하기</p>
	<div class="data-default">
		<%-- <form:form name="insertForm" id="insertForm" method="post" onsubmit="fn_insert_list(); return false;" > --%>
		<form:form name="insertForm" id="insertForm" method="post" commandName="insertForm">
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
									<option value="<c:out value='${codeList.codeId}'></c:out>"><c:out value="${codeList.codeIdNm}"></c:out></option>
								</c:forEach>
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row">공사명</th>
						<td><input type="text" class="form-control" id="cntrkNm" name="cntrkNm"></td>
					</tr>
					<tr>
						<th scope="row">계획시기</th>
						<td>
							<select name="plnYear" id="plnYear"  class="form-select w-auto"></select> 
							<select name="plnQu" id="plnQu" class="form-select w-auto"></select>
						</td>
					</tr>
					<tr>
						<th scope="row">공사예정<br>활용여부</th>
						<td>
							<span class="form-radio text group">
								<span><input type="radio" name="test" id="rChk1_1" value="Y" checked=""><label for="rChk1_1">Y</label></span>
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
										<option value="건설과">건설과</option>
										<option value="교통과">교통과</option>
									</select>
								</div>
								<div class="col"><input type="text" class="form-control" placeholder="이름" id="chpsnNm" name="chpsnNm" value=""></div>
								<div class="col"><input type="text" class="form-control" placeholder="전화번호" id="chpsnCttpc" name="chpsnCttpc" value=""></div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사위치</th>
						<td>
							<div class="form-row">
								<div class="col"><input type="text" class="form-control"id="cntrkLcAdres" name="cntrkLcAdres" value="" readonly></div> 
								<div class="col-auto"><button type="button" class="btn type01 bi-location" id="getPositionLocation">지도에서 선택</button></div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사개요</th>
						<td><textarea name="cntrkOtl" id="cntrkOtl" class="form-control" style="height: 140px;"></textarea></td>
					</tr>
				</tbody>
			</table>
			<input type="hidden" id="geom" name="geom" value="">
		</form:form>
		<form:form name="searchPlanForm" id="searchPlanForm" method="post" onsubmit="fn_selectPlanDtl_linkPage(); return false;">
			<input type="hidden" id="rePlnYear" name="plnYear" value="<c:out value='${searchVO.plnYear}' />">
			<input type="hidden" id="rePlnQu" name="plnQu" value="<c:out value='${searchVO.plnQu}' />">
			<input type="hidden" id="reCntrkTy" name="cntrkTy" value="<c:out value='${searchVO.cntrkTy}' />">
			<input type="hidden" id="reChpsnPsitn" name="chpsnPsitn" value="<c:out value='${searchVO.chpsnPsitn}' />">
			<input type="hidden" id="reCntrkLcAdres" name="cntrkLcAdres" value="<c:out value='${searchVO.cntrkLcAdres}' />">
			<input type="hidden" id="reCntrkNm" name="cntrkNm" value="<c:out value='${searchVO.cntrkNm}' />">
			<input type="hidden" id="rePageIndex" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
		</form:form>
	</div>
	<div class="position-bottom btn-wrap">
		<div><button type="button" class="btn basic bi-write2" id="btnCpInsert">등록</button> <button type="button" class="btn basic bi-cancel" id="btnCpInsertCancel">취소</button></div>
	</div>
<!-- //공사계획정보 -->