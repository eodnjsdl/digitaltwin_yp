<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script>
ui.callDatePicker();

$('#lampUpdate').click(function(){

	var form = $("#updateLamp")[0];
	var formData = new FormData(form);
	
	
	if($('#manage-no').val() == ''){
		alert("관리번호를 입력해주세요!");
		return;
	}
	if($('#instl-de').val() == ''){
		alert("설치일을 입력해주세요!");
		return;
	}
	if($('#adres').val() == ''){
		alert("지도에서 선택하여 주소를 입력해주세요!");
		return;
	}

 	let regEx = /^[0-9]+$/;
	if($('#strtlgt-cnt').val() == ''){
		alert("가로등수를 입력해주세요!");
		return;
	}else if(!regEx.test($('#strtlgt-cnt').val())){
		alert("가로등수를 숫자로 입력해주세요!");
		return
	}
	
	if(confirm("<spring:message code="common.update.msg" />")){	//수정하시겠습니까?
       	$.ajax({
       		type : "POST",
       		url	 : "/job/sffm/updateSffm.do",
       		data : formData,
			processData : false,
			contentType : false,
			dataType: "json",
			success : function(returnData, status){

				if(returnData.result == "success") {
					alert("<spring:message code="success.common.update" />");
					setData($('button[data-ax5grid-page-selected=true]').text()-1); 
					fn_pageDetail($('#gid').val());
					
				} else {
					alert("<spring:message code="fail.common.update" />");
					return;
				}
			}
       	});
	}
})


</script>

<%--<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" >--%>
	<div class="popup-header" id="sffm-title-div">가로등관리 수정하기</div>
	<div class="popup-body">
		<form:form id="updateLamp" method="post">
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
									<th scope="row">관리번호</th>
									<td><input type="text" class="form-control" id="manage-no" name="manageNo" maxlength="19" value="<c:out value = '${result.manageNo}'/>"/></td>
									<th scope="row">설치일자</th>
									<td><div class="datapicker-group"><input type="text" class="datepicker" id="instl-de" name="instlDe" maxlength="11"  value="<c:out value = '${result.instlDe}'/>" readonly/></div></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="adres" name="adres" maxlength="65"  value="<c:out value = '${result.adres}'/>" readonly/></div>
											<div class="col" style="display: none;"><input type="text" class="form-control" id="sffm-location" name="location" readonly placeholder="경도, 위도" /></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" onclick="fn_getLocation()">지도에서 선택</button></div>
											<input type="hidden" name="lon" id="lon" value="<c:out value='${result.lon}'/>">
											<input type="hidden" name="lat" id="lat" value="<c:out value='${result.lat}'/>">
											<input type="hidden" name="alt" id="alt" value="<c:out value='${result.alttd}'/>">
											<input type="hidden" id="stdde" name="stdde" value="<c:out value='${result.stdde}'/>" >
											<input type="hidden" id="gid" name="gid" value="<c:out value='${result.gid}'/>" >
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">가로등수</th>
									<td colspan="3"><input type="text" class="form-control" id="strtlgt-cnt" maxlength="12"  name="strtlgtCnt" value="<c:out value = '${result.strtlgtCnt}'/>"/></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap" id="sffm-btn-div">
					<div>
						<button type="button" class="btn basic bi-write2" id="lampUpdate">수정 완료</button>
						<button type="button" class="btn basic bi-cancel closeSub" onclick='fn_pageDetail(<c:out value="${result.gid}" />)'>취소
						</button>
					</div>
				</div>
			</div>							
		</div>
		</form:form>
	</div>
	<button type="button" class="popup-close" title="닫기"></button>
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->