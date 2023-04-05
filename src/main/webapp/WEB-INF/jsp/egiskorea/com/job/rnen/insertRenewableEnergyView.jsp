<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/spaceSearch.js"></script>
<script>
ui.callDatePicker();
// 태양광발전소 등록하기 버튼
$("#energyRegist").on("click", function(){
	
	var form = $("#insertRenewableEnergyForm")[0];
	var formData = new FormData(form);
	
	if($("#elcpwstnNm").val() == '') {
		alert("발전소명을 입력해주세요!");
		return false;
	}
	if($("#geom").val() == '') {
		alert("'지도에서 선택'버튼을 이용하여 주소를 입력해주세요!");
		return false;
	}
	if(isNaN($("#prmisnVolm").val()) == true || Math.sign($("#prmisnVolm").val()) == '-1') {
		alert("숫자(양수)만 입력해주세요!");
		return false;
	}
	
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
       	ui.loadingBar("show");
       	$.ajax({
       		type : "POST",
       		url	 : "/job/rnen/insertRenewableEnergy.do",
       		data : formData,
			processData : false,
			contentType : false,
			dataType: "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
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

</script>

<!-- 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록하기 -->
	<div class="popup-header">태양광발전소 등록하기</div>
	<div class="popup-body">
		<form:form id="insertRenewableEnergyForm" method="post">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
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
									<th scope="row">발전기구분</th>
									<td>
										<select class="form-select" id="eltgnrSe" name="eltgnrSe">
											<option value="태양광">태양광</option>
										</select>
									</td>
									<th scope="row">사업구분</th>
									<td>
										<select class="form-select" id="bsnsSe" name="bsnsSe">
											<c:forEach items="${bsnsSeList}" var="bsnsSeList" varStatus="status">
												<option value="<c:out value='${bsnsSeList.bsnsSe}' />">
													<c:out value="${bsnsSeList.bsnsSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">발전소명</th>
									<td colspan="3"><input type="text" class="form-control" id="elcpwstnNm" name="elcpwstnNm"></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="eqpLc" name="eqpLc"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">허가용량</th>
									<td colspan="3"><input type="text" class="form-control" id="prmisnVolm" name="prmisnVolm" value="0" placeholder="0"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap">
					<div>
						<button type="button" class="btn basic bi-write2" id="energyRegist">등록</button> 
						<button type="button" class="btn basic bi-cancel closeSub">취소</button>
					</div>
				</div>
			</div>							
		</div>
		</form:form>
	</div>
	<button type="button" class="popup-close" title="닫기" ></button>				
<!-- //업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록하기 -->