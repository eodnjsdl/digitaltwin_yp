<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script>
function fn_delete(gid){

	//if(confirm("<spring:message code="common.delete.msg" />")){
		$.ajax({
			type : "POST",
			url: "/job/sffm/deleteSffm.do",
			data : { "gid" : gid },
			dataType : "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
					//alert("<spring:message code="success.common.delete" />");
						$("#rightSubPopup").removeClass("opened").html("");
					// if(lastSpitalSearch != ''){
						aj_selectSafetyFacilitiesMngList($("#searchForm")[0],'spital');
					// } else {
						aj_selectSafetyFacilitiesMngList($("#searchForm")[0], 'attr');
					// }
				}else{
					//alert("<spring:message code="fail.common.delete" />");
					return;
				}
			}, complete : function(){
			}
		});
	//}
}

// 닫기
$("#rightSubPopup .popup-close").unbind('click').bind('click',function() {
	dtmap.vector.clearSelect(); //선택 해제
	window.target.clearSelect(); //그리드 선택 해제
	// 등록, 상세, 수정 팝업 창 닫기
	if ($("#rightSubPopup").hasClass("opened")) {
		$("#rightSubPopup").removeClass("opened");
		$("#rightSubPopup").empty();
	}
});
</script>

<%--<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="selectSafetyFacilLampMng">--%>
	<div class="popup-header">가로등관리 상세보기</div>
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
									<th scope="row">관리번호</th>
									<td>
										<c:out value="${result.manageNo}"></c:out>
									</td>
									<th scope="row">설치일자</th>
									<td>
										<div class="datapicker-group">
											<c:out value="${result.instlDe}"></c:out>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<c:out value="${result.adres}"></c:out>
									</td>
								</tr>
								<tr>
									<th scope="row">위도</th>
									<td>
										<c:out value="${result.lat}"></c:out>
									</td>
									<th scope="row">경도</th>
									<td>
										<c:out value="${result.lon}"></c:out>
									</td>
								</tr>
								<tr>
									<th scope="row">가로등수</th>
									<td colspan="3" class="align-left">
										<c:out value="${result.strtlgtCnt}"></c:out>
									</td>
								</tr>
								<tr>
									<th scope="row">기준일</th>
									<td colspan="3">
										<div class="datapicker-group">
											<c:out value="${result.stdde}"></c:out>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap" style="justify-content: right;">
					<div id="sffm_MngView_btn">
						<button type="button" class="btn basic bi-edit" onclick="fn_update('<c:out value="${result.gid}"/>');">수정</button> 
						<button type="button" class="btn basic bi-delete2" onclick="fn_delete('<c:out value="${result.gid}"/>');">삭제</button>
						<button type="button" class="btn basic bi-cancel closeSub">취소</button>
					</div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기"></button>				
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->