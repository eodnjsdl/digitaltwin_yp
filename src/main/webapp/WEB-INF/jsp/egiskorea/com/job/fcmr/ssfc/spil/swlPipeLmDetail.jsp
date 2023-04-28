<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .swlPipeLm-popup-close {
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
	//console.log("swlPipeLmDetail.jsp");

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

//하수관거 상세보기 취소
function cancelSwlPipeLmDetail() {
	$(".swlPipeLm-popup-close").closest('.popup-panel').removeClass('opened');
	
	// 초기화 (지도)
	dtmap.draw.dispose();
	dtmap.draw.clear();

	dtmap.vector.clearSelect();			//선택 해제
	FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
}

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수관거 상세보기-->
<div class="popup-header">하수관거 상세보기</div>
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
									<c:out value="${swlPipeLmVO.ftr_cde_nm}"/>
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlPipeLmVO.ftr_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">읍면동</th>
								<td>
									<c:out value="${swlPipeLmVO.hjd_cde_nm}"/>
								</td>
								<th scope="row">관리기관</th>
								<td>
									<c:if test="${swlPipeLmVO.mng_cde_nm != '' || swlPipeLmVO.mng_cde_nm ne null}">
										<c:out value="${swlPipeLmVO.mng_cde_nm}"/>
									</c:if>
									<c:if test="${swlPipeLmVO.mng_cde_nm == '' || swlPipeLmVO.mng_cde_nm eq null}">
										<c:out value="${swlPipeLmVO.mng_cde}"/>
									</c:if>
								</td>
							</tr>
							<tr>
								<th scope="row">도엽번호</th>
								<td>
									<c:out value="${swlPipeLmVO.sht_num}"/>
								</td>
								<th scope="row">설치일자</th>
								<td>
									<fmt:parseDate value="${swlPipeLmVO.ist_ymd}" var="dateFmt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>
								</td>
							</tr>
							<tr>
								<th scope="row">하수관용도</th>
								<td>
									<c:out value="${swlPipeLmVO.sba_cde_nm}"/>
								</td>
								<th scope="row">관재질</th>
								<td>
									<c:out value="${swlPipeLmVO.mop_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">규모</th>
								<td>
									<c:out value="${swlPipeLmVO.lit_cde_nm}"/>
								</td>
								<th scope="row">시설물형태</th>
								<td>
									<c:out value="${swlPipeLmVO.for_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">관경</th>
								<td>
									<c:out value="${swlPipeLmVO.std_dip}"/>
								</td>
								<th scope="row">가로길이</th>
								<td>
									<c:out value="${swlPipeLmVO.std_hol}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">세로길이</th>
								<td>
									<c:out value="${swlPipeLmVO.std_vel}"/>
								</td>
								<th scope="row">연장</th>
								<td>
									<c:out value="${swlPipeLmVO.byc_len}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">시점깊이</th>
								<td>
									<c:out value="${swlPipeLmVO.beg_dep}"/>
								</td>
								<th scope="row">종점깊이</th>
								<td>
									<c:out value="${swlPipeLmVO.end_dep}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">시점관저고</th>
								<td>
									<c:out value="${swlPipeLmVO.sbk_hsl}"/>
								</td>
								<th scope="row">종점관저고</th>
								<td>
									<c:out value="${swlPipeLmVO.sbl_hsl}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">평균구배</th>
								<td>
									<c:out value="${swlPipeLmVO.pip_slp}"/>
								</td>
								<th scope="row">평균구배</th>
								<td>
									<c:out value="${swlPipeLmVO.sph_lin}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">우수배수면적</th>
								<td>
									<c:out value="${swlPipeLmVO.bst_ara}"/>
								</td>
								<th scope="row">오수배수면적</th>
								<td>
									<c:out value="${swlPipeLmVO.drt_ara}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">우천시_유속</th>
								<td>
									<c:out value="${swlPipeLmVO.sbq_spd}"/>
								</td>
								<th scope="row">청천시_유속</th>
								<td>
									<c:out value="${swlPipeLmVO.sbr_spd}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">공사번호</th>
								<td>
									<c:out value="${swlPipeLmVO.cnt_num}"/>
								</td>
								<th scope="row">관라벨</th>
								<td>
									<c:out value="${swlPipeLmVO.pip_lbl}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">시점맨홀지형지물부호</th>
								<td>
									<c:out value="${swlPipeLmVO.bom_cde_nm}"/>
								</td>
								<th scope="row">시점맨홀관리번호</th>
								<td>
									<c:out value="${swlPipeLmVO.bom_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">종점맨홀지형지물부호</th>
								<td>
									<c:out value="${swlPipeLmVO.eom_cde_nm}"/>
								</td>
								<th scope="row">종점맨홀관리번호</th>
								<td>
									<c:out value="${swlPipeLmVO.eom_idn}"/>
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
					<button type="button" class="btn basic bi-edit btn_edit" onclick="updateSwlPipeLmView('<c:out value="${id}"/>')">수정</button>
					<button type="button" class="btn basic bi-delete2 btn_delete" onclick="deleteSwlPipeLm('<c:out value="${id}"/>')">삭제</button>  
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="cancelSwlPipeLmDetail();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="swlPipeLm-popup-close" title="닫기" onclick="cancelSwlPipeLmDetail();"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수관거 상세보기 end -->