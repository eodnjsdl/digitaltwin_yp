<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script>
$(document).ready(function(){
	//console.log("busRouteDetail.jsp");
});

function cancelbusRouteDetail() {
	ui.closeSubPopup();					// 창 닫기
	dtmap.vector.clearSelect();			// 선택 해제
	FACILITY.Ax5UiGrid.clearSelect();	// 그리드 선택 해제
}
</script>

<!-- 업무 > 교통분석 > 버스노선정보 > 버스노선 상세보기 -->
<div class="popup-header">버스노선 상세보기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<table class="data-detail">
						<colgroup>
							<col style="width: 23%;">
							<col style="width: auto;">
							<col style="width: 23%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">기점정류소명</th>
								<td><c:out value="${busRouteVO.cdpnt_sttn_nm}"/></td>
								<th scope="row">기점정류소번호</th>
								<td><c:out value="${busRouteVO.cdpnt_sttn_no}"/></td>
							</tr>
							<tr>
								<th scope="row">종점정류소명</th>
								<td><c:out value="${busRouteVO.tmnl_sttn_nm}"/></td>
								<th scope="row">종점정류소번호</th>
								<td><c:out value="${busRouteVO.tmnl_sttn_no}"/></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="data-default">
					<ul class="sttn-list">
						<li></li>
					</ul>
				</div>
			</div>
			<div class="scroll-y">
			</div>
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelbusRouteDetail();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<button type="button" class="sub-popup-close" title="닫기" onClick="cancelbusRouteDetail()"></button>
<!-- //업무 > 교통분석 > 버스노선정보 > 버스노선 상세보기 end -->