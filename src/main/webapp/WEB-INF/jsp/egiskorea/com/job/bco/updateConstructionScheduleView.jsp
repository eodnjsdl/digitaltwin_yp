<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- 공사예정정보 -->
<script src="/js/egiskorea/com/job/bco/cws.js"></script>

<script type="text/javascript">
// 캘릭더 이벤트 
callDatePicker();

// 공사예정 활용여부 체크
var rePnrsAt = "<c:out value='${nomalList.pnrsAt}'></c:out>";

if(rePnrsAt == "N"){
	$("#rChk1_2").prop('checked', true);		
}else {
	$("#rChk1_1").prop('checked', true);
}

// 기본정보 
var upPlnYear = "<c:out value='${nomalList.plnYear}'></c:out>";			// 년도
var upPlnQu = "<c:out value='${nomalList.plnQu}'></c:out>";				// 분기
var upChpsnPsitn = "<c:out value='${nomalList.chpsnPsitn}'></c:out>"; 	// 담당과
var upCntrkTy = "<c:out value='${nomalList.cntrkTy}'></c:out>"; 		// 공사유형


//등록된 차수 정보 리스트
var orderListInfo = JSON.parse('${orderListInfo}');

// 차수 조회내용(초기 1차 내용)
var orderInfo = ${orderInfo};

// 공통 공사내역 상세코드 내용
var codeDtlList = ${codeDtlList};

// 저장된 공사 예정 정보 차수 정보
var reCntrkOdr = "<c:out value='${nomalList.cntrkOdr}'></c:out>";

// 공사 예정 정보 > 수정 페이지 > 기본 정보 수정
$("#btnCwsNomalUpdata").unbind('click').bind('click',function(){
	
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
		var ordArray = [];
		if(orderListInfoChk()){
			if(confirm("기존에 등록되어있는 차수 정보가 있습니다. 그래도 변경하시겠습니까?")){	
				var count = $("#updataNomalForm select[name='cntrkOdr']").val();
				for(var i=0; i < orderListInfo.length; i++){
					if( Number(orderListInfo[i].cntrkOdr) > Number(count)){
						ordArray.push(orderListInfo[i].cntrkOdr);
					}
				}				
			}else{
				return false;
			}
		}
		aj_updateConstructionScheduleNomal($("#updataNomalForm")[0]);
	}
	
});



updataDefaultOptions();
setDtlOrderInfo(true);


// 검색된 값 표출 처리를 위한 값들...
var rePageChk = false;

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



// 공사예정 정보 > 상세페이지 > 차수정보 삭제 버튼 이벤트 처리
$("#odrDelete").unbind('click').bind('click',function(){
	if(confirm("<spring:message code="common.delete.msg" />")){	// 삭제하시겠습니까?
		var ordArray = [];
		for(var i=0; i < $("input[name='ordCkbox']").length; i++ ){
			if($("input[name='ordCkbox']")[i].checked){
				ordArray.push($("input[name='ordCkbox']")[i].dataset.odr);
			}
		}
		var objParams = {
	         "cntrkPrrngId" : $("tbody[name='tbodyOdrUpdateInfo'] tr").data("cntrkprrngid"), 	// 공사예정ID
	         "cntrkOdrList" : ordArray        											// 공사차수 리스트
	    };
		aj_deleteConstructionScheduleOrder(objParams, "odrUpdatePage");	
	}	
});

//차수별 공사정보 등록하기 이벤트 처리
$("#btnCwsOdeUpdate").unbind('click').bind('click',function(){

	// 차수별 공사정보 등록처리
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
		if($("#cntrkBeginDe").val() == ''){
			alert("<spring:message code="common.startday.msg" />");return;
		}else if($("#cntrkEndDe").val() == ''){
			alert("<spring:message code="common.endday.msg" />");return;
		}else if($("#updataOdrForm input[name='cntrkLcAdres']").val() == ''){
			alert("공사 위치를 입력해주세요.");return;
		}
			
		// 수정/등록 구분.
		var visibleUpdate = false;
		for(var i=0; i < orderListInfo.length; i++){
			if($("#updateCntrkOdr").val() == orderListInfo[i].cntrkOdr){
				visibleUpdate = true;
			}	
		}
		destroy("startPoint");
		
		var dtlCodeArray = {};
		var count = 0;
		for(var i=0; i < $("input[name='dtlCode']").length; i++ ){
			dtlCodeArray["cntrkDt["+i+"]"] = $("input[name='dtlCode']")[i].dataset.code;
			dtlCodeArray["cntrkDh["+i+"]"] = $("input[name='dtlCode']")[i].value;
			count = count+1;
		}
		

		var keyId = '';
		if($("#rChk2_1").is(":checked")){
			keyId = "POINT";
		}else{
			keyId = "LINE";
		}
		
		dtlCodeArray["count"] = count;
		dtlCodeArray["cntrkOdr"] = $("#updataOdrForm")[0].cntrkOdr.value;
		dtlCodeArray["cntrkSctnTy"] = keyId;
		dtlCodeArray["cntrkLcAdres"] = $("#updataOdrForm")[0].cntrkLcAdres.value;
		dtlCodeArray["geom"] = $("#updataOdrForm")[0].geom.value;
		dtlCodeArray["cntrkBeginDe"] = $("#updataOdrForm")[0].cntrkBeginDe.value;
		dtlCodeArray["cntrkEndDe"] = $("#updataOdrForm")[0].cntrkEndDe.value;
		dtlCodeArray["cntrkPrrngId"] = $("#cntrkPrrngId").val();
		dtlCodeArray["cntrkDtls"] = $("#updataOdrForm")[0].cntrkDtls.value;
		
		if(visibleUpdate){
			aj_updateConstructionScheduleOdr(dtlCodeArray, "odrUpdatePage");
		}else{
			aj_insertConstructionScheduleOdr2(dtlCodeArray, "odrUpdatePage");
		}
		
	}
})

</script>
<!-- 공사예정정보 -->
	<p class="cont-tit">공사예정정보 수정</p>
	<div class="scroll-y" id="innerConstructionPL">
		<p class="cont-stit">기본정보</p>
		<div class="data-default">
			<form:form name="updataNomalForm" id="updataNomalForm" method="post" commandName="updataNomalForm">
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
										<option value="<c:out value='${codeList.codeId}' />"><c:out value="${codeList.codeIdNm}" /></option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row">공사명</th>
							<td>
								<div class="form-row">
									<div class="col"><input type="text" class="form-control" id="cntrkNm" name="cntrkNm" value='<c:out value="${nomalList.cntrkNm}"></c:out>'></div> 
									<div class="col-auto"><button type="button" class="btn type01 bi-search constSchedule" id="btnUpdataConstSchedule">공사계획 조회</button></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사예정<br>활용여부</th>
							<td>
								<span class="form-radio text group">
									<span><input type="radio" name="rChk1" id="rChk1_1"><label for="rChk1_1">Y</label></span>
									<span><input type="radio" name="rChk1" id="rChk1_2"><label for="rChk1_2">N</label></span>
								</span>
							</td>
						</tr>
						<tr>
							<th scope="row">공사기간/차수</th>
							<td>
								<div class="form-row">
									<div class="col">
										<select name="plnYear" id="plnYear" class="form-select">
											<%-- <option value="<c:out value='${nomalList.plnYear}'></c:out>"><c:out value='${nomalList.plnYear}'></c:out></option> --%>
										</select>
									</div>
									<div class="col">
										<select name="plnQu" id="plnQu" class="form-select">
											<%-- <option value="<c:out value='${nomalList.plnQu}'></c:out>"><c:out value='${nomalList.plnQu}'></c:out></option> --%>
										</select>
									</div>
									<div class="col">
										<select name="cntrkOdr" id="cntrkOdr" class="form-select"></select>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">담당자</th>
							<td>
								<div class="form-row">
									<div class="col">
										<select name="chpsnPsitn" id="chpsnPsitn" class="form-select">
											<%-- <option value="<c:out value='${nomalList.chpsnPsitn}' />"><c:out value='${nomalList.chpsnPsitn}' /></option> --%>
											<option value="건설과" >건설과</option>
											<option value="교통과" >교통과</option>
										</select>
									</div>
									<div class="col"><input type="text" class="form-control" placeholder="이름" name="chpsnNm" id="chpsnNm" value="<c:out value='${nomalList.chpsnNm}'></c:out>" ></div>
									<div class="col"><input type="text" class="form-control" placeholder="전화번호" name="chpsnCttpc" id="chpsnCttpc" value="<c:out value='${nomalList.chpsnCttpc}'></c:out>"></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사위치</th>
							<td>
								<div class="form-row">
									<div class="col"><input type="text" class="form-control"id="cntrkLcAdresNomal" name="cntrkLcAdres" value="<c:out value='${nomalList.cntrkLcAdres}' />" readonly></div> 
									<div class="col-auto"><button type="button" class="btn type01 bi-location" id="getPositionNomalUp">지도에서 선택</button></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사개요</th>
							<td><textarea name="cntrkOtl" id="cntrkOtl" class="form-control" style="height: 140px;"><c:out value='${nomalList.cntrkOtl}'></c:out></textarea></td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" name="cntrkPrrngId" id="cntrkPrrngId" value="<c:out value='${nomalList.cntrkPrrngId}' />">
				<%-- <input type="hidden" name="cntrkTy" id="cntrkTy" value="<c:out value='${nomalList.cntrkTy}' />"> --%>
				<%-- <input type="hidden" name="cntrkLcAdres" id="cntrkLcAdres" value="<c:out value='${nomalList.cntrkLcAdres}' />"> --%>
				<input type="hidden" name="maxOdr" id="maxOdr" value="<c:out value='${nomalList.cntrkOdr}' />">
				<input type="hidden" name="geom" id="geom" value="<c:out value='${nomalList.geom}' />">
				<div style="height: 50px;"><button type="button" class="btn btn-sm type03" style="top:10px; float:right; width:60px; height:30px;" id="btnCwsNomalUpdata" name="btnCwsNomalUpdata">적용</button></div>
			</form:form>
		</div>

		<p class="cont-stit">차수별 공사정보</p>
		<div class="data-default">
			<form:form name="updataOdrForm" id="updataOdrForm" method="post" commandName="updataOdrForm">
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
								<select name="cntrkOdr" id="updateCntrkOdr" class="form-select w-auto" data-cntrkPrrngId="<c:out value='${nomalList.cntrkPrrngId}' />"></select>
							</td>
						</tr>
						<tr>
							<th scope="row">공사구간</th>
							<td colspan="3">
								<span class="form-radio text group">
									<span><input type="radio" name="rChk2" id="rChk2_1" ><label for="rChk2_1">위치</label></span>
									<span><input type="radio" name="rChk2" id="rChk2_2" ><label for="rChk2_2">구간</label></span>
								</span>
							</td>
						</tr>
						<tr>
							<th scope="row">공사위치</th>
							<td colspan="3">
								<div class="form-row">
									<div class="col"><input type="text" class="form-control" id="odrCntrkLcAdres" name="cntrkLcAdres" readonly></div> 
									<div class="col-auto"><button type="button" class="btn type01 bi-location" id="updateGetPositionLocation">지도에서 선택</button></div>
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
								<select name="cntrkDtls" id="cntrkDtls"  class="form-select">
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
				<input type="hidden" name="cntrkPrrngId" value="<c:out value='${nomalList.cntrkPrrngId}' />">
				<input type="hidden" name="geom" value="">
				
			</form:form>
			<div style="height: 70px;"><button type="button" class="btn btn-sm type03" style="top:10px; float:right; width:60px; height:30px;" id="btnCwsOdeUpdate" name="btnCwsOdeUpdate">적용</button></div>
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
				<tbody name="tbodyOdrUpdateInfo">
					<c:choose>
						<c:when test="${empty orderList}">
							<td colspan="4">데이터가 없습니다.</td>
						</c:when>
						<c:otherwise>
							<c:forEach items="${orderList}" var="ordList" varStatus="status">
								<tr data-cntrkPrrngId=<c:out value="${ordList.cntrkPrrngId}" />>
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
	</div>
	
	<div class="position-bottom btn-wrap">
		<div>
			<%-- <button type="button" class="btn basic bi-write2" id="btnCwsUpdate"  data-cwsId="<c:out value='${nomalList.cntrkPrrngId}'></c:out>">수정</button> --%>
			<button type="button" class="btn basic bi-cancel" id="btnCwsUpdateCancel" data-cwsid="<c:out value='${nomalList.cntrkPrrngId}' />">취소</button></div>
	</div>
<!-- //공사예정정보 -->