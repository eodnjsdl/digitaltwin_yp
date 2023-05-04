<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- 공사예정정보 -->
<script src="/js/egiskorea/com/job/bco/cws.js"></script>
<script type="text/javascript">
	var cws = {
			cntrkPrrngId : "",
			insertVisible : false,
			insertResult : false,
			cntrkOdr : 0
	}
	//현재 년도  
	var date = new Date();
	var rePlnYear = date.getFullYear();
   
	// 기본 정보 등록하기 이벤트 처리
   	$("#btnCwsNomalInsert").unbind('click').bind('click',function(){
   		if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
   			if(cws.insertResult){alert("이미 등록되어 있습니다.");return;}
   			
   			if($("#cntrkNm").val() == ''){
   				alert("공사명을 입력해주세요.");return;
   			}
   			
   			if($("#chpsnNm").val() == ''){
   				alert("담당자를 입력해주세요.");return;
   			}
   			if($("#chpsnCttpc").val() == ''){
   				alert("전화번호를 입력해주세요.");return;
   			}
   			if($("#cntrkLcAdresNomal").val() == ''){
   				alert("공사위치를 입력해주세요.");return;
   			}
   			
   			aj_insertConstructionScheduleNomal($("#insertNomalForm")[0]);
   		
   		}
   	});
	
	// 차수별 공사정보 등록하기 이벤트 처리
	$("#btnCwsOdeInsert").unbind('click').bind('click',function(){
		// 기본정보가 등록이 되어있는지 확인한다.
		if(!cws.insertVisible){alert("기본정보가 등록되어 있어야지만 사용이 가능합니다.");return;}
		// 차수별 공사정보 등록처리
		if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
			// 차수 등록여부 판변
			var insertVisible = true;
			// 선택되어있는 차수값
			var odeNum = Number($("#insertOdrForm select[name='cntrkOdr'] option:selected").val());	
			for(var i=0; i<$("tbody[name='tbodyOdrInfo'] tr").length; i++){
				if($("tbody[name='tbodyOdrInfo'] tr")[i].dataset.cntrkodr == odeNum){
					insertVisible = false;
				}
			}
			
			if(!insertVisible){alert("이미 등록되어 있습니다."); return;}
			
			if($("#cntrkBeginDe").val() == ''){
				alert("<spring:message code="common.startday.msg" />");return;
			}else if($("#cntrkEndDe").val() == ''){
				alert("<spring:message code="common.endday.msg" />");return;
			}else if($("#geom").val() == ''){
				alert("공사 위치를 입력해주세요.");return;
			}
			var dtlCodeArray = {};
			var count = 0;
			for(var i=0; i < $("input[name='dtlCode']").length; i++ ){
				dtlCodeArray["cntrkDt["+i+"]"] = $("input[name='dtlCode']")[i].dataset.code;
				dtlCodeArray["cntrkDh["+i+"]"] = $("input[name='dtlCode']")[i].value;
				count = count+1;
			}
			
			var keyId = '';
			if($("#rChk1_1").is(":checked")){
				keyId = "POINT";
			}else{
				keyId = "LINE";
			}
			
			dtlCodeArray["count"] = count;
			dtlCodeArray["cntrkOdr"] = $("#insertOdrForm")[0].cntrkOdr.value;
			dtlCodeArray["cntrkSctnTy"] = keyId;
			dtlCodeArray["cntrkLcAdres"] = $("#insertOdrForm")[0].cntrkLcAdres.value;
			dtlCodeArray["geom"] = $("#insertOdrForm")[0].geom.value;
			dtlCodeArray["cntrkBeginDe"] = $("#insertOdrForm")[0].cntrkBeginDe.value;
			dtlCodeArray["cntrkEndDe"] = $("#insertOdrForm")[0].cntrkEndDe.value;
			dtlCodeArray["cntrkPrrngId"] = $("#cntrkPrrngId").val();
			dtlCodeArray["cntrkDtls"] = $("#insertOdrForm")[0].cntrkDtls.value;
			
			aj_insertConstructionScheduleOdr2(dtlCodeArray,"odrInsertPage");
		}
	})
	
	ui.callDatePicker();
		
	function getDate( element ) {
		var date;
		try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
			date = null;
		}

		return date;
	}
	
	// 날짜 세팅
	var dateFormat = "yy-mm-dd",
	from = $("#cntrkBeginDe" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both"
	})
	.on( "change", function() {
		to.datepicker( "option", "minDate", getDate( this ) );
	}),
		to = $("#cntrkEndDe" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		showOn: "both"
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
	});
	
	// 초기 진입때 년도, 분기, 차수 세팅 
	callSelectOptions();
	callDefaultOptions();
</script>
<!-- 공사예정정보 -->
	<p class="cont-tit">공사예정정보 등록하기</p>
	<div class="scroll-y" id="innerConstructionPL">
		<form:form name="insertNomalForm" id="insertNomalForm" method="post" commandName="insertForm">
			<p class="cont-stit">기본정보</p>
			<div class="data-default">
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
									<div class="col"><input type="text" class="form-control" id="cntrkNm" name="cntrkNm"></div> 
									<div class="col-auto"><button type="button" class="btn type01 bi-search constSchedule" id="btnConstSchedule">공사계획 조회</button></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사예정<br>활용여부</th>
							<td>
								<span class="form-radio text group">
									<span><input type="radio" name="test" id="rChk2_1" checked=""><label for="rChk2_1">Y</label></span>
									<span><input type="radio" name="test" id="rChk2_2"><label for="rChk2_2">N</label></span>
								</span>
							</td>
						</tr>
						<tr>
							<th scope="row">공사기간/차수</th>
							<td>
								<div class="form-row">
									<div class="col">
										<select name="plnYear" id="plnYear" class="form-select"></select>
									</div>
									<div class="col">
										<select name="plnQu" id="plnQu" class="form-select"></select>
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
											<option value="건설과" >건설과</option>
											<option value="교통과" >교통과</option>
										</select>
									</div>
									<div class="col"><input type="text" class="form-control" placeholder="이름" name="chpsnNm" id="chpsnNm"></div>
									<div class="col"><input type="text" class="form-control" placeholder="전화번호" name="chpsnCttpc" id="chpsnCttpc"></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사위치</th>
							<td>
								<div class="form-row">
									<div class="col"><input type="text" class="form-control"id="cntrkLcAdresNomal" name="cntrkLcAdres" value="" readonly></div> 
									<div class="col-auto"><button type="button" class="btn type01 bi-location" id="getPositionNomal">지도에서 선택</button></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사개요</th>
							<td><textarea name="cntrkOtl" id="cntrkOtl" class="form-control" style="height: 140px;"></textarea></td>
						</tr>
						<input type="hidden" name="geom" id="position">
						<input type="hidden" name="frstRegisterId" id="frstRegisterId" value="">
						
					</tbody>
				</table>
			</div>
			<div style="height: 50px;"><button type="button" class="btn btn-sm type03" style="top:10px; float:right; width:60px; height:30px;" id="btnCwsNomalInsert" name="btnCwsNomalInsert">적용</button></div>
		</form:form>
		<p class="cont-stit">차수별 공사정보</p>
		<div class="data-default">
			<form:form name="insertOdrForm" id="insertOdrForm" method="post" commandName="insertOdrForm">
				<table class="data-write">
					<colgroup>
						<col style="width: 20%;">
						<col style="width: auto;">
						<col style="width: 20%;">
						<col style="width: auto;">
					</colgroup>
					<tbody name="tbCwsOrdInfo" Id="tbCwsOrdInfo">
						<tr>
							<th scope="row">공사차수</th>
							<td colspan="3">
								<select name="cntrkOdr" id="cntrkOdr2" class="form-select w-auto"></select>
							</td>
						</tr>
						<tr>
							<th scope="row">공사구간</th>
							<td colspan="3">
								<span class="form-radio text group">
									<span><input type="radio" name="test" id="rChk1_1" checked=""><label for="rChk1_1">위치</label></span>
									<span><input type="radio" name="test" id="rChk1_2"><label for="rChk1_2">구간</label></span>
								</span>
							</td>
						</tr>
						<tr>
							<th scope="row">공사위치</th>
							<td colspan="3">
								<div class="form-row">
									<div class="col"><input type="text" class="form-control" id="cntrkLcAdres" name="cntrkLcAdres" readonly></div> 
									<div class="col-auto"><button type="button" class="btn type01 bi-location" id="getPositionLocation">지도에서 선택</button></div>
								</div>
							</td>
						</tr>
						<tr>
							<th scope="row">공사기간</th>
							<td colspan="3">
								<div class="form-row">
									<div class="col"><div class="datapicker-group"><input type="text" class="datepicker" id="cntrkBeginDe" name="cntrkBeginDe"></div></div>
									<div class="col-auto">~</div>
									<div class="col"><div class="datapicker-group"><input type="text" class="datepicker" id="cntrkEndDe" name="cntrkEndDe"></div></div>
								</div>
							</td>
						</tr>
						
						<tr>
							<th scope="row" rowspan="11" name="thRow">공사내역</th>
							<td rowspan="11" name="tdRow">
								<select name="cntrkDtls" id="cntrkDtls"  class="form-select"></select>
							</td>
							<th scope="row" class="no-bg border-left align-left" name="thFastRow"></th>
							<td class="align-center" name="tdFastRow"><input type="text" class="form-control"></td>
						</tr>
						
						<input type="hidden" name="cntrkPrrngId" id="cntrkPrrngId">
						<input type="hidden" name="geom" id="geom">
					</tbody>
				</table>
			</form:form>
			<div style="height: 70px;"><button type="button" class="btn btn-sm type03" style="top:10px; float:right; width:60px; height:30px;" id="btnCwsOdeInsert" name="btnCwsOdeInsert">적용</button></div>
		</div>
		<div class="data-default">
			<table class="data-list tbl-all-center">
				<colgroup>
					<col style="width: 15%;">
					<col style="width: auto;">
					<col style="width: auto;">
				</colgroup>
				<thead>
					<tr>
						<th colspan="col">차수</th>
						<th colspan="col">공사위치</th>
						<th colspan="col">공사기간</th>
					</tr>
				</thead>
				<tbody name="tbodyOdrInfo">
					<tr>
						<td colspan="3" data-cntrkOdr = "">데이터가 없습니다.</td>
					</tr>												
				</tbody>
			</table>
		</div>
	</div>
	<form:form name="insertScheduleForm" id="insertScheduleForm" method="post" >
		<input type="hidden" id="rePlnYearInsert" name="plnYear" value="<c:out value='${searchVO.plnYear}'></c:out>">
		<input type="hidden" id="rePlnQuInsert" name="plnQu" value="<c:out value='${searchVO.plnQu}'></c:out>">
		<input type="hidden" id="reCntrkTyInsert" name="cntrkTy" value="<c:out value='${searchVO.cntrkTy}'></c:out>">
		<input type="hidden" id="reChpsnPsitnInsert" name="chpsnPsitn" value="<c:out value='${searchVO.chpsnPsitn}'></c:out>">
		<input type="hidden" id="reCntrkLcAdresInsert" name="cntrkLcAdres" value="<c:out value='${searchVO.cntrkLcAdres}'></c:out>">
		<input type="hidden" id="reCntrkNmInsert" name="cntrkNm" value="<c:out value='${searchVO.cntrkNm}'></c:out>">
		<input type="hidden" id="rePageIndexInsert" name="pageIndex" value="<c:out value='${searchVO.pageIndex}'></c:out>">
	</form:form>
	
	<div class="position-bottom btn-wrap">
		<div><button type="button" class="btn basic bi-list" id="btnCwsCancel">목록</button></div>
	</div>

<!-- //공사예정정보 -->