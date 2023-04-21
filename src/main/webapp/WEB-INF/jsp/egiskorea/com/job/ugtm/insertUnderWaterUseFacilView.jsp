<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script src="/js/egiskorea/com/job/spaceSearch.js"></script>
<script>
ui.callDatePicker();
// 지하수이용시설 등록하기 버튼
$("#useFacilRegist").on("click", function(){
	
	var form = $("#insertUnderWaterUseFacilForm")[0];
	var formData = new FormData(form);
	
	if($("#geom").val() == '') {
		alert("'지도에서 선택'버튼을 이용하여 주소를 입력해주세요!");
		return false;
	}
	if($("#prmisnSttemntNo").val() == ''){
		alert("허가신고번호를 입력해주세요!");
		return false;
	}
	if(isNaN($(".countChk").val()) == true || Math.sign($(".countChk").val()) == '-1') {
		alert("숫자(양수)만 입력해주세요!");
		return false;
	}
	
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
       	ui.loadingBar("show");
       	$.ajax({
       		type : "POST",
       		url	 : "/job/ugtm/insertUnderWaterUseFacil.do",
       		data : formData,
			processData : false,
			contentType : false,
			dataType: "json",
			success :  function(returnData, status){
				if(returnData.result == "success") {
					
					$("#rightSubPopup").removeClass("opened").html("");
					initGrid();
					setData(0); 
				} else {
					alert("<spring:message code="fail.common.insert" />");
					return;
				}
			}, complete : function(){
				ui.loadingBar("hide");
			}, 
       	});
	}
	
});

var years = "";

</script>

	<div class="popup-header">지하수이용시설 등록하기</div>
	<div class="popup-body">
		<form:form id="insertUnderWaterUseFacilForm" method="post">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 375px;">
				<div class="scroll-y">
					<div class="data-default">
						<table class="data-write">
							<colgroup>
								<col style="width: 23%;">
								<col style="width: auto;">
								<col style="width: 23%;">
								<col style="width: auto;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">관리구분</th>
									<td>
										<select class="form-select" id="manageSe" name="manageSe">
											<c:forEach items="${manageSeList}" var="manageSeList" varStatus="status">
												<option value="<c:out value='${manageSeList.manageSe}' />">
													<c:out value="${manageSeList.manageSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">개발 연도</th>
									<td>
										<select class="form-select" id="devlopYear" name="devlopYear">
										
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="adres" name="adres" readonly></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn" onclick="fn_getLocation()">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">허가/신고</th>
									<td>
										<select class="form-select" id="prmisnSttemntSe" name="prmisnSttemntSe">
											<c:forEach items="${prmisnSttemntSeList}" var="prmisnSttemntSeList" varStatus="status">
												<option value="<c:out value='${prmisnSttemntSeList.prmisnSttemntSe}' />">
													<c:out value="${prmisnSttemntSeList.prmisnSttemntSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">허가신고번호</th>
									<td>
										<input type="text" class="form-control" id="prmisnSttemntNo" name="prmisnSttemntNo">
									</td>
								</tr>
								<tr>
									<th scope="row">용도</th>
									<td>
										<select class="form-select" id="prposSe" name="prposSe">
											<c:forEach items="${prposSeList}" var="prposSeList" varStatus="status">
												<option value="<c:out value='${prposSeList.prposSe}' />">
													<c:out value="${prposSeList.prposSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">세부용도</th>
									<td>
										<select class="form-select" id="detailPrposSe" name="detailPrposSe">
											<c:forEach items="${detailPrposSeList}" var="detailPrposSeList" varStatus="status">
												<option value="<c:out value='${detailPrposSeList.detailPrposSe}' />">
													<c:out value="${detailPrposSeList.detailPrposSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">공공/사설</th>
									<td>
										<select class="form-select" id="publicPvtesblSe" name="publicPvtesblSe">
											<c:forEach items="${publicPvtesblSeList}" var="publicPvtesblSeList" varStatus="status">
												<option value="<c:out value='${publicPvtesblSeList.publicPvtesblSe}' />">
													<c:out value="${publicPvtesblSeList.publicPvtesblSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">충적/암반</th>
									<td>
										<select class="form-select" id="allvlBsrckSe" name="allvlBsrckSe">
											<c:forEach items="${allvlBsrckSeList}" var="allvlBsrckSeList" varStatus="status">
												<option value="<c:out value='${allvlBsrckSeList.allvlBsrckSe}' />">
													<c:out value="${allvlBsrckSeList.allvlBsrckSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">표고(m)</th>
									<td class="align-right">
										<input type="text" class="form-control countChk" id="al" name="al" value="0" placeholder="0">
									</td>
									<th scope="row">심도(m)</th>
									<td class="align-right">
										<input type="text" class="form-control countChk" id="dph" name="dph" value="0" placeholder="0">
									</td>
								</tr>
								<tr>
									<th scope="row">구경(㎜)</th>
									<td class="align-right">
										<input type="text" class="form-control countChk" id="calbr" name="calbr" value="0" placeholder="0">
									</td>
									<th scope="row">토출관구경(㎥)</th>
									<td class="align-right">
										<input type="text" class="form-control countChk" id="dscrgppCalbr" name="dscrgppCalbr" value="0" placeholder="0">
									</td>
								</tr>
								<tr>
									<th scope="row">양수능력(㎥/일)</th>
									<td class="align-right">
										<input type="text" class="form-control countChk" id="wpQty" name="wpQty" value="0" placeholder="0">
									</td>
									<th scope="row">펌프마력(hp)</th>
									<td class="align-right">
										<input type="text" class="form-control countChk" id="pumpHrspw" name="pumpHrspw" value="0" placeholder="0">
									</td>
								</tr>
								<tr>
									<th scope="row">연사용량(㎥)</th>
									<td class="align-right" colspan="1">
										<input type="text" class="form-control countChk" id="yrUseQty" name="yrUseQty" value="0" placeholder="0">
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap">
					<div>
						<button type="button" class="btn basic bi-write2" id="useFacilRegist">등록</button> 
						<button type="button" class="btn basic bi-cancel closeSub">취소</button>
					</div>
				</div>
			</div>							
		</div>
		</form:form>
	</div>
	<button type="button" class="popup-close" title="닫기"></button>				
