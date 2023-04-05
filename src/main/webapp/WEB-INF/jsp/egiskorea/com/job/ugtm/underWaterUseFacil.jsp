<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script>
// 지하수이용시설 단일삭제
function fn_deleteUnderWaterUseFacil(gid){
	
	if(confirm("<spring:message code="common.delete.msg" />")){
		$.ajax({
			type : "POST",
			url: "/job/ugtm/deleteUnderWaterUseFacil.do",
			data : { "gid" : gid },
			dataType : "json",
			success : function(returnData, status){
				if(returnData.result == "success") {
					alert("<spring:message code="success.common.delete" />");
					$("#rightSubPopup").removeClass("opened").html("");
					if(lastSpitalSearch != ''){
						aj_selectUnderWaterUseFacilList($("#searchForm")[0],'spital');
					} else {
						aj_selectUnderWaterUseFacilList($("#searchForm")[0], 'attr');
					}
				}else{
					alert("<spring:message code="fail.common.delete" />");
				}
			}
		});
	}
}
</script>
	
	<div class="popup-header">지하수이용시설 상세보기</div>
	<div class="popup-body">
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
										<c:out value="${result.manageSe}" />
									</td>
									<th scope="row">개발 연도</th>
									<td>
										<c:out value="${result.devlopYear}" />
									</td>
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><c:out value="${result.adres}" /></div> 
											<!-- <div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div> -->
											<input type="hidden" id="geom" name="geom" value="<c:out value="${result.geom}" />">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">허가/신고</th>
									<td>
										<c:out value="${result.prmisnSttemntSe}" />
									</td>
									<th scope="row">허가신고번호</th>
									<td>
										<c:out value="${result.prmisnSttemntNo}" />
									</td>
								</tr>
								<tr>
									<th scope="row">용도</th>
									<td>
										<c:out value="${result.prposSe}" />
									</td>
									<th scope="row">세부용도</th>
									<td>
										<c:out value="${result.detailPrposSe}" />
									</td>
								</tr>
								<tr>
									<th scope="row">공공/사설</th>
									<td>
										<c:out value="${result.publicPvtesblSe}" />
									</td>
									<th scope="row">충적/암반</th>
									<td>
										<c:out value="${result.allvlBsrckSe}" />
									</td>
								</tr>
								<tr>
									<th scope="row">표고</th>
									<td class="align-right">
										<c:out value="${result.al}" />
									</td>
									<th scope="row">심도(m)</th>
									<td class="align-right">
										<c:out value="${result.dph}" />
									</td>
								</tr>
								<tr>
									<th scope="row">구경(㎜)</th>
									<td class="align-right">
										<c:out value="${result.calbr}" />
									</td>
									<th scope="row">토출관구경(㎥)</th>
									<td class="align-right">
										<c:out value="${result.dscrgppCalbr}" />
									</td>
								</tr>
								<tr>
									<th scope="row">양수능력(㎥/일)</th>
									<td class="align-right">
										<c:out value="${result.wpQty}" />
									</td>
									<th scope="row">펌프마력(hp)</th>
									<td class="align-right">
										<c:out value="${result.pumpHrspw}" />
									</td>
								</tr>
								<tr>
									<th scope="row">연사용량(㎥)</th>
									<td class="align-right" colspan="1">
										<c:out value="${result.yrUseQty}" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap justify-content-end">
					<div>
						<button type="button" class="btn basic bi-edit" onClick="fn_update('<c:out value="${result.gid}" />')">수정</button>
						<button type="button" class="btn basic bi-delete2" onclick="fn_deleteUnderWaterUseFacil('<c:out value="${result.gid}" />')">삭제</button> 
						<button type="button" class="btn basic bi-cancel closeSub">취소</button>
					</div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기" onClick="cancelMode();"></button>				
