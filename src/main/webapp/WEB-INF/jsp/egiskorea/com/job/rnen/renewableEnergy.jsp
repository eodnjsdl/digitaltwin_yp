<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script>
// 태양광발전소 단일삭제
function fn_deleteRenewableEnergy(gid){
	
	if(confirm("<spring:message code="common.delete.msg" />")){
		$.ajax({
			type : "POST",
			url: "/job/rnen/deleteRenewableEnergy.do",
			data : { "gid" : gid },
			dataType : "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
					alert("<spring:message code="success.common.delete" />");
						$("#rightSubPopup").removeClass("opened").html("");
					if(lastSpitalSearch != ''){
						aj_selectRenewableEnergyList($("#searchForm")[0],'spital');
					} else {
						aj_selectRenewableEnergyList($("#searchForm")[0], 'attr');
					}
				}else{
					alert("<spring:message code="fail.common.delete" />");
					return;
				}
			}, complete : function(){
			}
		});
	}
}
// 닫기
$("#rightSubPopup .popup-close").unbind('click').bind('click',function() {
	// 등록, 상세, 수정 팝업 창 닫기
	if ($("#rightSubPopup").hasClass("opened")) {
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
});
</script>

<!-- 업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 상세조회 -->
<!-- <div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="selectRenewableEnergy"> -->
	<div class="popup-header">태양광발전소 상세보기</div>
	<div class="popup-body">
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
										<c:out value="${result.eltgnrSe}"></c:out>
									</td>
									<th scope="row">사업구분</th>
									<td>
										<c:out value="${result.bsnsSe}"></c:out>
									</td>
								</tr>
								<tr>
									<th scope="row">발전소명</th>
									<td colspan="3"><c:out value="${result.elcpwstnNm}"></c:out></td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><c:out value="${result.eqpLc}"></c:out></div> 
											<!-- <div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div> -->
											<input type="hidden" id="geom" name="geom" value="<c:out value="${result.geom}" />">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">허가용량</th>
									<td colspan="3">
										<c:out value="${result.prmisnVolm}"></c:out>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap justify-content-end">
					<div>
						<button type="button" class="btn basic bi-edit" onClick="fn_update('<c:out value="${result.gid}" />')">수정</button>
						<button type="button" class="btn basic bi-delete2" onclick="fn_deleteRenewableEnergy('<c:out value="${result.gid}" />')">삭제</button> 
					</div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" onClick="cancelMode();"></button>				
<!-- </div> -->
<!-- //업무 > 공간정보활용 > 신재생에너지 > 태양광발전소 등록하기 -->