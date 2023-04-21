<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .swlDeptPs-popup-close {
	    top: 0;
	    right: 0;
	    width: 39px;
	    height: 39px;
	    border-left: 1px solid #44516A;
	    background: url(/images/icon/popup-close2.svg) no-repeat 50% 50%;
	    border-top-right-radius: 10px;
	    position: absolute;
	}
</style>

<script type="text/javascript">

$(document).ready(function(){
	//console.log("swlDeptPsDetail.jsp");

	//gird 데이터를 통한 주소 조회
	var id = "${id}";
	
	var geomData = getGeomDataForGridId(id);
	if (geomData) {
		getAddressForPoint(geomData, "#rightSubPopup .txt-geometry-address");
		$("#rightSubPopup input[name=geom]").val(geomData);
	} else {
		console.log("상세보기 좌표 오류");
	}
});

//하수연결관 상세보기 취소
function cancelSwlDeptPsDetail() {
	$(".swlDeptPs-popup-close").closest('.popup-panel').removeClass('opened');
	
	// 초기화 (지도)
	dtmap.draw.dispose();
	dtmap.draw.clear();

	dtmap.vector.clearSelect();	//선택 해제
}

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수관거심도 상세보기-->
<div class="popup-header">하수관거심도 상세보기</div>
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
								<th scope="row">지형지물부호</th>
								<td>
									<c:out value="${swlDeptPsVO.ftr_cde_nm}"/>
								</td>
								<th scope="row">심도</th>
								<td>
									<c:out value="${swlDeptPsVO.pip_dep}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">관리번호</th>
								<td colspan="3">
									<c:out value="${swlDeptPsVO.ftr_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">위치</th>
								<td colspan="3">
									<div class="form-row">
										<input type="text" class="form-control txt-geometry-address" value="" readonly="readonly">
										<input type="hidden" name="geom" class="form-control" value="">
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
					<button type="button" class="btn basic bi-edit btn_edit" onclick="updateSwlDeptPsView('<c:out value="${id}"/>')">수정</button>
					<button type="button" class="btn basic bi-delete2 btn_delete" onclick="deleteSwlDeptPs('<c:out value="${id}"/>')">삭제</button>  
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="closeSwlDeptPsPopup();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="swlDeptPs-popup-close" title="닫기" onclick="closeSwlDeptPsPopup();"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수관거심도 상세보기 end -->