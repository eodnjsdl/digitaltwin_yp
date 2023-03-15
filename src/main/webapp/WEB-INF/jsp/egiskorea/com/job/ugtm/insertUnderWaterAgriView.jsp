<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script src="/js/egiskorea/com/job/ugtm/ugtm.js"></script>
<script src="/js/egiskorea/com/job/spaceSearch.js"></script>
<script src="/js/egiskorea/com/cmm/cmmUtil.js"></script>
<script>


	toastr.warning("객체 선택 해제하기", "객체 선택 해제하기");

// 농업용공공관정 등록하기 버튼
$("#agriRegist").on("click", function(){
	
	var form = $("#insertUnderWaterAgriForm")[0];
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
	
	if(confirm("<spring:message code="common.regist.msg" />")){	//등록하시겠습니까?
       	loadingShowHide("show");
       	$.ajax({
       		type : "POST",
       		url	 : "/job/ugtm/insertUnderWaterAgri.do",
       		data : formData,
			processData : false,
			contentType : false,
			dataType: "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
					alert("<spring:message code="success.common.insert" />");
					bottomPopupOpen("undergroundWaterManagement");
				} else {
					alert("<spring:message code="fail.common.insert" />");
					return;
				}
			}, complete : function(){
				if(GLOBAL.StartPoint){
					GLOBAL.StartPoint = false;
					removePoint(GLOBAL.NomalIcon);
				}
				loadingShowHide("hide"); 
				
			}, 
       	});
	}
	
});

var years = "";
</script>
	<div class="popup-header">농업용공공관정 등록하기</div>
	<div class="popup-body">
		<form:form id="insertUnderWaterAgriForm" method="post">
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
									<th scope="row">시설명</th>
									<td colspan="3"><input type="text" class="form-control" id="fcltyNm" name="fcltyNm"></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" class="form-control" id="adres" name="adres"></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">시설물상태</th>
									<td>
										<select class="form-select" id="fcltsSttus" name="fcltsSttus">
											<c:forEach items="${fcltsSttusList}" var="fcltsSttusList" varStatus="status">
												<option value="<c:out value='${fcltsSttusList.fcltsSttus}' />">
													<c:out value="${fcltsSttusList.fcltsSttus}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">시설물점검일</th>
									<td><div class="datapicker-group"><input type="text" class="datepicker" id="fcltsChckDe" name="fcltsChckDe"></div></td>
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
									<th scope="row">구경(㎜)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="calbr" name="calbr" value="0" placeholder="0"></td>
									<th scope="row">심도(m)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="dph" name="dph" value="0" placeholder="0"></td>
								</tr>
								<tr>
									<th scope="row">양수능력(㎥/일)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="wpAblty" name="wpAblty" value="0" placeholder="0"></td>
									<th scope="row">토출관구경(㎥)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="dscrgppCalbr" name="dscrgppCalbr" value="0" placeholder="0"></td>
								</tr>
								<tr>
									<th scope="row">펌프형태</th>
									<td>
										<select class="form-select" id="pumpStleSe" name="pumpStleSe">
											<c:forEach items="${pumpStleSeList}" var="pumpStleSeList" varStatus="status">
												<option value="<c:out value='${pumpStleSeList.pumpStleSe}' />">
													<c:out value="${pumpStleSeList.pumpStleSe}" />
												</option>																
											</c:forEach>
										</select>
									</td>
									<th scope="row">펌프마력(hp)</th>
									<td class="align-right"><input type="text" class="form-control countChk" id="pumpHrspw" name="pumpHrspw" value="0" placeholder="0"></td>
								</tr>
								<tr>
									<th scope="row">관리기관</th>
									<td colspan="1">
										<select class="form-select" id="manageInsttNm" name="manageInsttNm">
											<c:forEach items="${manageInsttNmList}" var="manageInsttNmList" varStatus="status">
												<option value="<c:out value='${manageInsttNmList.manageInsttNm}' />">
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
						<button type="button" class="btn basic bi-write2" id="agriRegist">등록</button> 
						<button type="button" class="btn basic bi-cancel closeSub">취소</button>
					</div>
				</div>
			</div>							
		</div>
		</form:form>
	</div>
	<button type="button" class="popup-close" title="닫기" onClick="removePoint(GLOBAL.NomalIcon);"></button>				
<!-- </div> -->
<!-- //업무 > 공간정보활용 > 지하수관리 > 농업용공공관정 등록하기 -->