<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .swlManhPs-popup-close {
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
	//console.log("swlManhPsDetail.jsp");

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

//하수맨홀 상세보기 취소
function cancelSwlManhPsDetail() {
	$(".swlManhPs-popup-close").closest('.popup-panel').removeClass('opened');
	
	// 초기화 (지도)
	dtmap.draw.dispose();
	dtmap.draw.clear();

	dtmap.vector.clearSelect();			//선택 해제
	FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
}

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수맨홀 상세보기-->
<div class="popup-header">하수맨홀 상세보기</div>
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
									<c:out value="${swlManhPsVO.ftr_cde_nm}"/>
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlManhPsVO.ftr_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">읍면동</th>
								<td>
									<c:out value="${swlManhPsVO.hjd_cde_nm}"/>
								</td>
								<th scope="row">도엽번호</th>
								<td>
									<c:out value="${swlManhPsVO.sht_num}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">관리기관</th>
								<td>
									<c:if test="${swlManhPsVO.mng_cde_nm != '' || swlManhPsVO.mng_cde_nm ne null}">
										<c:out value="${swlManhPsVO.mng_cde_nm}"/>
									</c:if>
									<c:if test="${swlManhPsVO.mng_cde_nm == '' || swlManhPsVO.mng_cde_nm eq null}">
										<c:out value="${swlManhPsVO.mng_cde}"/>
									</c:if>
								</td>
								<th scope="row">설치일자</th>
								<td>
									<fmt:parseDate value="${swlManhPsVO.ist_ymd}" var="dateFmt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>
								</td>
							</tr>
							<tr>
								<th scope="row">최종준설일자</th>
								<td>
									<fmt:parseDate value="${swlManhPsVO.ecn_ymd}" var="dateFmt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>
								</td>
								<th scope="row">하수맨홀용도</th>
								<td>
									<c:out value="${swlManhPsVO.smu_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">맨홀형태</th>
								<td>
									<c:out value="${swlManhPsVO.for_cde_nm}"/>
								</td>
								<th scope="row">맨홀종류</th>
								<td>
									<c:out value="${swlManhPsVO.som_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">하수맨홀구경</th>
								<td>
									<c:out value="${swlManhPsVO.man_dip}"/>
								</td>
								<th scope="row">하수맨홀가로</th>
								<td>
									<c:out value="${swlManhPsVO.man_hol}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">하수맨홀세로</th>
								<td>
									<c:out value="${swlManhPsVO.man_vel}"/>
								</td>
								<th scope="row">뚜껑재질</th>
								<td>
									<c:out value="${swlManhPsVO.sbc_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">인버트유무</th>
								<td>
									<c:out value="${swlManhPsVO.ivt_cde_nm}"/>
								</td>
								<th scope="row">사다리설치유무</th>
								<td>
									<c:out value="${swlManhPsVO.lad_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">하수맨홀고도</th>
								<td>
									<c:out value="${swlManhPsVO.mos_hsl}"/>
								</td>
								<th scope="row">하수맨홀저고</th>
								<td>
									<c:out value="${swlManhPsVO.lms_hsl}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">이상상태</th>
								<td>
									<c:out value="${swlManhPsVO.cst_cde_nm}"/>
								</td>
								<th scope="row">공사번호</th>
								<td>
									<c:out value="${swlManhPsVO.cnt_num}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">방향각</th>
								<td colspan="3">
									<c:out value="${swlManhPsVO.ang_dir}"/>
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
					<button type="button" class="btn basic bi-edit btn_edit" onclick="updateSwlManhPsView('<c:out value="${id}"/>')">수정</button>
					<button type="button" class="btn basic bi-delete2 btn_delete" onclick="deleteSwlManhPs('<c:out value="${id}"/>')">삭제</button>  
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelSwlManhPsDetail();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="swlManhPs-popup-close" title="닫기" onclick="cancelSwlManhPsDetail();"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수맨홀 상세보기 end -->