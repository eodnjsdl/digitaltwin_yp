<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- 공사예정정보 -->
<script src="/js/egiskorea/com/job/bco/cws.js"></script>

<script type="text/javascript">
var rePageChk = false;

callDatePicker();

var rePnrsAt = "<c:out value='${nomalList.pnrsAt}'></c:out>";
if(rePnrsAt == "Y"){
	$("#rChk1_1").prop('checked', true);	
}else if(rePnrsAt == "N"){
	$("#rChk1_2").prop('checked', true);
}





// 차수 조회내용(초기 1차 내용)
var orderInfo = ${orderInfo};

//차수 리스트 내용
var orderListSchedule = ${orderListInfo};

// 공사내역 상세 리스트 내용
var dtlListCode = ${dtlListCode};


// 공통 공사내역 상세코드 내용
var codeDtlList = ${codeDtlList};


// 공사예정 정보 > 상세페이지 > 차수정보 삭제 버튼 이벤트 처리
$("#odrDelete").unbind('click').bind('click',function(){
	if(confirm("<spring:message code="common.delete.msg" />")){
		var ordArray = [];
		for(var i=0; i < $("input[name='ordCkbox']").length; i++ ){
			if($("input[name='ordCkbox']")[i].checked){
				ordArray.push($("input[name='ordCkbox']")[i].dataset.odr);
			}
		}
		var objParams = {
	         "cntrkPrrngId" : $("tbody[name='tbodyOdrInfo'] tr").data("cntrkprrngid"), 	// 공사예정ID
	         "cntrkOdrList" : ordArray        											// 공사차수 리스트
	    };
		aj_deleteConstructionScheduleOrder(objParams, "odrDtlPage");
	}
});

//공사예정 정보 > 상세페이지 > 차수정보 삭제 버튼 이벤트 처리
$("#btnCwsDelete").unbind('click').bind('click',function(){	
	if(confirm("<spring:message code="common.delete.msg" />")){
		destroy();
		aj_deleteConstructionSchedule($(this).data("cwsid"), "odrDtlPage");
	}
});


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
var rePageIndexDtl = "<c:out value='${searchVO.pageIndex}'></c:out>";

</script>
<!-- 공사예정정보 -->
	<p class="cont-tit">공사예정정보 상세</p>
	<div class="scroll-y" id="innerConstructionPL">
		<p class="cont-stit">기본정보</p>
		<div class="data-default">
			<table class="data-write">
				<colgroup>
					<col style="width: 20%;">
					<col style="width: auto;">   
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">공사명</th>
						<td>
							<div class="form-row">
								<div class="col"><c:out value="${nomalList.cntrkNm}"></c:out></div> 
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사예정<br>활용여부</th>
						<td>
							<span class="form-radio text group">
								<span><input type="radio" name="rChk1" id="rChk1_1" onclick="return(false);"><label for="rChk1_1">Y</label></span>
								<span><input type="radio" name="rChk1" id="rChk1_2" onclick="return(false);"><label for="rChk1_2">N</label></span>
							</span>
						</td>
					</tr>
					<tr>
						<th scope="row">공사기간/차수</th>
						<td>
							<div class="form-row">
								<div class="col">
									<select name="" id="" class="form-select" disabled='true'>
										<option value="<c:out value='${nomalList.plnYear}'></c:out>"><c:out value='${nomalList.plnYear}'></c:out></option>
									</select>
								</div>
								<div class="col">
									<select name="" id="" class="form-select" disabled='true'>
										<option value="<c:out value='${nomalList.plnQu}'></c:out>"><c:out value='${nomalList.plnQu}'></c:out></option>
									</select>
								</div>
								<div class="col">
									<select name="" id="" class="form-select" disabled='true'>
										<option value="<c:out value='${nomalList.cntrkOdr}'></c:out>"><c:out value='${nomalList.cntrkOdr}차'></c:out></option>
									</select>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">담당자</th>
						<td>
							<div class="form-row">
								<div class="col">
									<select name="" id="" class="form-select" disabled='true'>
										<option value=""><c:out value='${nomalList.chpsnPsitn}'></c:out></option>
									</select>
								</div>
								<div class="col"><input type="text" class="form-control" placeholder="이름" value="<c:out value='${nomalList.chpsnNm}'></c:out>" readonly></div>
								<div class="col"><input type="text" class="form-control" placeholder="전화번호" value="<c:out value='${nomalList.chpsnCttpc}'></c:out>" readonly></div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사개요</th>
						<td><textarea name="" id="" class="form-control" style="height: 140px;" readonly><c:out value='${nomalList.cntrkOtl}'></c:out></textarea></td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="cont-stit">차수별 공사정보</p>
		<div class="data-default">
			<table class="data-write">
				<colgroup>
					<col style="width: 20%;">
					<col style="width: auto;">
					<col style="width: 20%;">
					<col style="width: auto;">
				</colgroup>
				<tbody id="tbCwsOrdInfo">
					<tr>
						<th scope="row">공사차수</th>
						<td colspan="3">
							<select name="cntrkOdr" id="cntrkOdrDtl" class="form-select w-auto" data-cntrkPrrngId="<c:out value='${nomalList.cntrkPrrngId}' />">
								<c:forEach items="${orderList}" var="ordList" varStatus="status">
									<option value="<c:out value='${ordList.cntrkOdr}' />"><c:out value="${ordList.cntrkOdr}차" /></option>																
								</c:forEach>	
							</select>
						</td>
					</tr>
					<tr>
						<th scope="row">공사구간</th>
						<td colspan="3">
							<span class="form-radio text group">
								<span><input type="radio" name="rChk2" id="rChk2_1" onclick="return(false);"><label for="rChk2_1">위치</label></span>
								<span><input type="radio" name="rChk2" id="rChk2_2" onclick="return(false);"><label for="rChk2_2">구간</label></span>
							</span>
						</td>
					</tr>
					<tr>
						<th scope="row">공사위치</th>
						<td colspan="3">
							<div class="form-row">
								<div class="col">
									<input type="text" class="form-control" name="cntrkLcAdres" id="odrCntrkLcAdres" readonly>
								</div> 
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">공사기간</th>
						<td colspan="3">
							<div class="form-row">
								<div class="col"><div class="datapicker-group"><input type="text" class="datepicker" name="cntrkBeginDe" id="cntrkBeginDe"></div></div>
								<div class="col-auto">~</div>
								<div class="col"><div class="datapicker-group"><input type="text" class="datepicker" name="cntrkEndDe" id="cntrkEndDe" ></div></div>
							</div>
						</td>
					</tr>
					
					<tr>
						<th scope="row" rowspan="11" name="thRow">공사내역</th>
						<td rowspan="11" name="tdRow">
							<select name="cntrkDtls" id="cntrkDtls"  class="form-select" disabled='true'>
								<c:forEach items="${codeList}" var="codeList" varStatus="status">
									<option value="<c:out value='${codeList.codeId}' />"><c:out value="${codeList.codeIdNm}" /></option>																
								</c:forEach>	
							</select>
						</td>
						<th scope="row" class="no-bg border-left align-left" name="thFastRow"></th>
						<td class="align-center" name="tdFastRow"></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="data-default">
			<table class="data-list tbl-all-center">
				<colgroup>
					<col style="width: 36px;">
					<col style="width: 15%;">
					<col style="width: auto;">
					<col style="width: auto;">
				</colgroup>
				<thead>
					<tr>
						<th colspan="col"><span class="form-checkbox"><span><input type="checkbox" name="ordChkAll" id="ordChkAll"><label for="ordChkAll"></label></span></span></th>
						<th colspan="col">차수</th>
						<th colspan="col">공사위치</th>
						<th colspan="col">공사기간</th>
					</tr>
				</thead>
				<tbody name="tbodyOdrInfo">
					<c:choose>
						<c:when test="${empty orderList}">
							<td colspan="4">데이터가 없습니다.</td>
						</c:when>
						<c:otherwise>
							<c:forEach items="${orderList}" var="ordList" varStatus="status">
								<tr data-cntrkPrrngId=<c:out value="${ordList.cntrkPrrngId}" /> data-lon=<c:out value="${ordList.lon}" /> data-lat=<c:out value="${ordList.lat}" /> >
									<td><span class="form-checkbox"><span><input type="checkbox" name="ordCkbox" id="<c:out value='ordCkbox${ordList.cntrkOdr}' />" data-odr=<c:out value="${ordList.cntrkOdr}" /> ><label for="<c:out value='ordCkbox${ordList.cntrkOdr}' />"></label></span></span></td>
									<td><c:out value="${ordList.cntrkOdr}차" /></td>
									<td><c:out value="${ordList.cntrkLcAdres}" /></td>
									<td><c:out value="${ordList.cntrkBeginDe}" /> ~ <c:out value="${ordList.cntrkEndDe}" /></td>
								</tr>																
							</c:forEach>
						</c:otherwise>					
					</c:choose>											
				</tbody>
			</table>
		</div>
		<div class="btn-wrap justify-content-start">
			<div><button type="button" class="btn basic bi-delete2" name="odrDelete" id="odrDelete">선택삭제</button></div>
		</div>
		<form:form name="dtlScheduleForm" id="dtlScheduleForm" method="post" onsubmit="return false;">
			<input type="hidden" id="plnYear" name="plnYear" value="<c:out value='${searchVO.plnYear}' />">
			<input type="hidden" id="plnQu" name="plnQu" value="<c:out value='${searchVO.plnQu}' />">
			<input type="hidden" id="cntrkTy" name="cntrkTy" value="<c:out value='${searchVO.cntrkTy}' />">
			<input type="hidden" id="chpsnPsitn" name="chpsnPsitn" value="<c:out value='${searchVO.chpsnPsitn}' />">
			<input type="hidden" id="cntrkLcAdres" name="cntrkLcAdres" value="<c:out value='${searchVO.cntrkLcAdres}' />">
			<input type="hidden" id="cntrkNm" name="cntrkNm" value="<c:out value='${searchVO.cntrkNm}' />">
			<input type="hidden" id="pageIndex" name="pageIndex" value="<c:out value='${searchVO.pageIndex}' />">
		</form:form>
	</div>
	
	<div class="position-bottom btn-wrap">
		<div>
			<button type="button" class="btn basic bi-write2" id="btnCwsUpdate"  data-cwsId="<c:out value='${nomalList.cntrkPrrngId}'></c:out>">수정</button>
			<button type="button" class="btn basic bi-delete2" id="btnCwsDelete" data-cwsId="<c:out value='${nomalList.cntrkPrrngId}'></c:out>">삭제</button>
			<button type="button" class="btn basic bi-cancel" id="btnCwsDtlCancel">취소</button>
		</div>
	</div>
<!-- //공사예정정보 -->