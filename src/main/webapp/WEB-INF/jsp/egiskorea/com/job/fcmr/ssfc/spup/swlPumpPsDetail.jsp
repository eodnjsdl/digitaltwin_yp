<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .swlPumpPs-popup-close {
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
	//console.log("swlPumpPsDetail.jsp");

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

//하수펌프장 상세보기 취소
function cancelSwlPumpPsDetail() {
	$(".swlPumpPs-popup-close").closest('.popup-panel').removeClass('opened');
	
	// 초기화 (지도)
	dtmap.draw.dispose();
	dtmap.draw.clear();

	dtmap.vector.clearSelect();			//선택 해제
	FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
}

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수펌프장 상세보기-->
<div class="popup-header">하수펌프장 상세보기</div>
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
									<c:out value="${swlPumpPsVO.ftr_cde_nm}"/>
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlPumpPsVO.ftr_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">읍면동</th>
								<td>
									<c:out value="${swlPumpPsVO.hjd_cde_nm}"/>
								</td>
								<th scope="row">관리기관</th>
								<td>
									<c:if test="${swlPumpPsVO.mng_cde_nm != '' || swlPumpPsVO.mng_cde_nm ne null}">
										<c:out value="${swlPumpPsVO.mng_cde_nm}"/>
									</c:if>
									<c:if test="${swlPumpPsVO.mng_cde_nm == '' || swlPumpPsVO.mng_cde_nm eq null}">
										<c:out value="${swlPumpPsVO.mng_cde}"/>
									</c:if>
								</td>
							</tr>
							<tr>
								<th scope="row">도엽번호</th>
								<td>
									<c:out value="${swlPumpPsVO.sht_num}"/>
								</td>
								<th scope="row">설치일자</th>
								<td>
									<fmt:parseDate value="${swlPumpPsVO.ist_ymd}" var="dateFmt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>
								</td>
							</tr>
							<tr>
								<th scope="row">하수펌프장명</th>
								<td>
									<c:out value="${swlPumpPsVO.pmp_nam}"/>
								</td>
								<th scope="row">부지면적</th>
								<td>
									<c:out value="${swlPumpPsVO.gai_ara}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">개통상태</th>
								<td>
									<c:out value="${swlPumpPsVO.soo_cde_nm}"/>
								</td>
								<th scope="row">펌프장용도</th>
								<td>
									<c:out value="${swlPumpPsVO.sbe_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">일일처리용량</th>
								<td>
									<c:out value="${swlPumpPsVO.day_vol}"/>
								</td>
								<th scope="row">최대저수용량</th>
								<td>
									<c:out value="${swlPumpPsVO.max_vol}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">표고</th>
								<td>
									<c:out value="${swlPumpPsVO.stp_hsl}"/>
								</td>
								<th scope="row">수위</th>
								<td>
									<c:out value="${swlPumpPsVO.pmp_wal}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">청천시_오수양수능력</th>
								<td>
									<c:out value="${swlPumpPsVO.cos_vol}"/>
								</td>
								<th scope="row">우천시_오수양수능력</th>
								<td>
									<c:out value="${swlPumpPsVO.uos_vol}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">우수양수능력</th>
								<td>
									<c:out value="${swlPumpPsVO.usu_vol}"/>
								</td>
								<th scope="row">공사번호</th>
								<td>
									<c:out value="${swlPumpPsVO.cnt_num}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">방향각</th>
								<td colspan="3">
									<c:out value="${swlPumpPsVO.ang_dir}"/>
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
					<button type="button" class="btn basic bi-edit btn_edit" onclick="updateSwlPumpPsView('<c:out value="${id}"/>')">수정</button>
					<button type="button" class="btn basic bi-delete2 btn_delete" onclick="deleteSwlPumpPs('<c:out value="${id}"/>')">삭제</button>  
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelSwlPumpPsDetail();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="swlPumpPs-popup-close" title="닫기" onclick="cancelSwlPumpPsDetail();"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수펌프장 상세보기 end -->