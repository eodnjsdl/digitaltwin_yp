<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .swlSpewPs-popup-close {
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
	//console.log("swlSpewPsDetail.jsp");

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

//토구 상세보기 취소
function cancelSwlSpewPsDetail() {
	$(".swlSpewPs-popup-close").closest('.popup-panel').removeClass('opened');
	
	// 초기화 (지도)
	dtmap.draw.dispose();
	dtmap.draw.clear();

	dtmap.vector.clearSelect();	//선택 해제
}

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 토구 상세보기-->
<div class="popup-header">토구 상세보기</div>
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
									<c:out value="${swlSpewPsVO.ftr_cde_nm}"/>
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlSpewPsVO.ftr_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">읍면동</th>
								<td>
									<c:out value="${swlSpewPsVO.hjd_cde_nm}"/>
								</td>
								<th scope="row">도엽번호</th>
								<td>
									<c:out value="${swlSpewPsVO.sht_num}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">관리기관</th>
								<td>
									<c:if test="${swlSpewPsVO.mng_cde_nm != '' || swlSpewPsVO.mng_cde_nm ne null}">
										<c:out value="${swlSpewPsVO.mng_cde_nm}"/>
									</c:if>
									<c:if test="${swlSpewPsVO.mng_cde_nm == '' || swlSpewPsVO.mng_cde_nm eq null}">
										<c:out value="${swlSpewPsVO.mng_cde}"/>
									</c:if>
								</td>
								<th scope="row">설치일자</th>
								<td>
									<fmt:parseDate value="${swlSpewPsVO.ist_ymd}" var="dateFmt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>
								</td>
							</tr>
							<tr>
								<th scope="row">토구용도</th>
								<td>
									<c:out value="${swlSpewPsVO.vmt_cde_nm}"/>
								</td>
								<th scope="row">시설물형태</th>
								<td>
									<c:out value="${swlSpewPsVO.for_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">원형토구내경</th>
								<td>
									<c:out value="${swlSpewPsVO.spw_dip}"/>
								</td>
								<th scope="row">각형토구가로길이</th>
								<td>
									<c:out value="${swlSpewPsVO.spw_hol}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">각형토구세로길이</th>
								<td>
									<c:out value="${swlSpewPsVO.spw_vel}"/>
								</td>
								<th scope="row">토구표고</th>
								<td>
									<c:out value="${swlSpewPsVO.spw_hsl}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">평균수위</th>
								<td>
									<c:out value="${swlSpewPsVO.spw_wal}"/>
								</td>
								<th scope="row">하천명</th>
								<td>
									<c:out value="${swlSpewPsVO.riv_nam}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">계획방류량</th>
								<td>
									<c:out value="${swlSpewPsVO.spw_saf}"/>
								</td>
								<th scope="row">배수구역지형지물부호</th>
								<td>
									<c:out value="${swlSpewPsVO.dra_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">배수구역관리번호</th>
								<td>
									<c:out value="${swlSpewPsVO.dra_idn}"/>
								</td>
								<th scope="row">처리구역지형지물부호</th>
								<td>
									<c:out value="${swlSpewPsVO.dsp_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">처리구역관리번호</th>
								<td>
									<c:out value="${swlSpewPsVO.dsp_idn}"/>
								</td>
								<th scope="row">공사번호</th>
								<td>
									<c:out value="${swlSpewPsVO.cnt_num}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">방향각</th>
								<td colspan="3">
									<c:out value="${swlSpewPsVO.ang_dir}"/>
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
					<button type="button" class="btn basic bi-edit btn_edit" onclick="updateSwlSpewPsView('<c:out value="${id}"/>')">수정</button>
					<button type="button" class="btn basic bi-delete2 btn_delete" onclick="deleteSwlSpewPs('<c:out value="${id}"/>')">삭제</button>  
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="closeSwlSpewPsPopup();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="swlSpewPs-popup-close" title="닫기" onclick="closeSwlSpewPsPopup();"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 토구 상세보기 end -->