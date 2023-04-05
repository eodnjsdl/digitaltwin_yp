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
// 농업용공공관정 수정하기 버튼
$("#agriUpdate").on("click", function(){
	
	var form = $("#updateUnderWaterAgriForm")[0];
	var formData = new FormData(form);
	
	if($("#fcltyNm").val() == '') {
		alert("시설명을 입력해주세요!");
		return false;
	}
	if($("#geom").val() == '') {
		alert("'지도에서 선택'버튼을 이용하여 주소를 입력해주세요!");
		return false;
	}
	if($("#fcltsChckDe").val() == ''){
		alert("시설물점검일을 입력해주세요!");
		return false;
	}
	if(isNaN($(".countChk").val()) == true || Math.sign($(".countChk").val()) == '-1') {
		alert("숫자(양수)만 입력해주세요!");
		return false;
	}
	
	if(confirm("<spring:message code="common.update.msg" />")){	//수정하시겠습니까?
       	$.ajax({
       		type : "POST",
       		url	 : "/job/ugtm/updateUnderWaterAgri.do",
       		data : formData,
			processData : false,
			contentType : false,
			dataType: "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
					alert("<spring:message code="success.common.update" />");
					if(lastSpitalSearch != ''){
						setData(0); 
						fn_pageDetail($("#gid").val());
					} else {
						setData(0); 
						fn_pageDetail($("#gid").val());
					}
				} else {
					alert("<spring:message code="fail.common.update" />");
					return;
				}
			}
       	});
	}
});

var years = "<c:out value="${result.devlopYear}" />";
</script>

<!-- 업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 수정하기 -->
<!-- <div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="updateUnderWaterAgriView"> -->
	<div class="popup-header">농업용공공관정 수정하기</div>
	<div class="popup-body">
		<form:form id="updateUnderWaterAgriForm" method="post">
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
												<option value="<c:out value='${manageSeList.manageSe}' />" <c:if test="${result.manageSe == manageSeList.manageSe}">selected</c:if>>
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
									<th scope="row">시설명</th>
									<td colspan="3"><input type="text" class="form-control" id="fcltyNm" name="fcltyNm" value="<c:out value="${result.fcltyNm}" />"></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="adres" name="adres" value="<c:out value="${result.adres}" />"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn">지도에서 선택</button></div>
											<input type="hidden" id="geom" name="geom" value="<c:out value="${result.geom}" />">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">시설물상태</th>
									<td>
										<select class="form-select" id="fcltsSttus" name="fcltsSttus">
											<c:forEach items="${fcltsSttusList}" var="fcltsSttusList" varStatus="status">
												<option value="<c:out value='${fcltsSttusList.fcltsSttus}' />" <c:if test="${result.fcltsSttus == fcltsSttusList.fcltsSttus}">selected</c:if>>
													<c:out value="${fcltsSttusList.fcltsSttus}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">시설물점검일</th>
									<td><div class="datapicker-group"><input type="text" class="datepicker" id="fcltsChckDe" name="fcltsChckDe" value="<c:out value="${result.fcltsChckDe}" />"></div></td>
								</tr>
								<tr>
									<th scope="row">용도</th>
									<td>
										<select class="form-select" id="prposSe" name="prposSe">
											<c:forEach items="${prposSeList}" var="prposSeList" varStatus="status">
												<option value="<c:out value='${prposSeList.prposSe}' />" <c:if test="${result.prposSe == prposSeList.prposSe}">selected</c:if>>
													<c:out value="${prposSeList.prposSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">세부용도</th>
									<td>
										<select class="form-select" id="detailPrposSe" name="detailPrposSe">
											<c:forEach items="${detailPrposSeList}" var="detailPrposSeList" varStatus="status">
												<option value="<c:out value='${detailPrposSeList.detailPrposSe}' />" <c:if test="${result.prposSe == detailPrposSeList.detailPrposSe}">selected</c:if>>
													<c:out value="${detailPrposSeList.detailPrposSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">구경(㎜)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="calbr" name="calbr" value="<c:out value="${result.calbr}" />"></td>
									<th scope="row">심도(m)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="dph" name="dph" value="<c:out value="${result.dph}" />"></td>
								</tr>
								<tr>
									<th scope="row">양수능력(㎥/일)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="wpAblty" name="wpAblty" value="<c:out value="${result.wpAblty}" />"></td>
									<th scope="row">토출관구경(㎥)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="dscrgppCalbr" name="dscrgppCalbr" value="<c:out value="${result.dscrgppCalbr}" />"></td>
								</tr>
								<tr>
									<th scope="row">펌프형태</th>
									<td>
										<select class="form-select" id="pumpStleSe" name="pumpStleSe">
											<c:forEach items="${pumpStleSeList}" var="pumpStleSeList" varStatus="status">
												<option value="<c:out value='${pumpStleSeList.pumpStleSe}' />" <c:if test="${result.pumpStleSe == pumpStleSeList.pumpStleSe}">selected</c:if>>
													<c:out value="${pumpStleSeList.pumpStleSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">펌프마력(hp)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="pumpHrspw" name="pumpHrspw" value="<c:out value="${result.pumpHrspw}" />"></td>
								</tr>
								<tr>
									<th scope="row">관리기관</th>
									<td colspan="1">
										<select class="form-select" id="manageInsttNm" name="manageInsttNm">
											<c:forEach items="${manageInsttNmList}" var="manageInsttNmList" varStatus="status">
												<option value="<c:out value='${manageInsttNmList.manageInsttNm}' />" <c:if test="${result.manageInsttNm == manageInsttNmList.manageInsttNm}">selected</c:if>>
													<c:out value="${manageInsttNmList.manageInsttNm}" />
												</option>																
											</c:forEach>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap">
					<div>
						<button type="button" class="btn basic bi-write2" id="agriUpdate">수정완료</button> 
						<button type="button" class="btn basic bi-cancel" id="returnBack" onclick='fn_pageDetail(<c:out value="${result.gid}" />)'>취소</button>
					</div>
				</div>
			</div>							
		</div>
		<input type="hidden" id="gid" name="gid" value="<c:out value="${result.gid}" />">
		</form:form>
	</div>
	<button type="button" class="popup-close" title="닫기" ></button>				
<!-- </div> -->
<!-- //업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록하기 -->