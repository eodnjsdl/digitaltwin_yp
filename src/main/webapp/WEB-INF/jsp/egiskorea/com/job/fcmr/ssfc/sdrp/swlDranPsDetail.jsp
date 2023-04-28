<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .swlDranPs-popup-close {
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
	//console.log("swlDranPsDetail.jsp");

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

//하수처리장 상세보기 취소
function cancelSwlDranPsDetail() {
	$(".swlDranPs-popup-close").closest('.popup-panel').removeClass('opened');
	
	// 초기화 (지도)
	dtmap.draw.dispose();
	dtmap.draw.clear();

	dtmap.vector.clearSelect();	//선택 해제
	
	FACILITY.Ax5UiGrid.clearSelect();	//그리드 선택 해제
}

</script>

<!-- 업무 > 시설관리 > 하수도시설 > 하수처리장 상세보기-->
<div class="popup-header">하수처리장 상세보기</div>
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
									<c:out value="${swlDranPsVO.ftr_cde_nm}"/>
								</td>
								<th scope="row">관리번호</th>
								<td>
									<c:out value="${swlDranPsVO.ftr_idn}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">읍면동</th>
								<td>
									<c:out value="${swlDranPsVO.hjd_cde_nm}"/>
								</td>
								<th scope="row">도엽번호</th>
								<td>
									<c:out value="${swlDranPsVO.sht_num}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">관리기관</th>
								<td>
									<c:if test="${swlDranPsVO.mng_cde_nm != '' || swlDranPsVO.mng_cde_nm ne null}">
										<c:out value="${swlDranPsVO.mng_cde_nm}"/>
									</c:if>
									<c:if test="${swlDranPsVO.mng_cde_nm == '' || swlDranPsVO.mng_cde_nm eq null}">
										<c:out value="${swlDranPsVO.mng_cde}"/>
									</c:if>
								</td>
								<th scope="row">설치일자</th>
								<td>
									<fmt:parseDate value="${swlDranPsVO.ist_ymd}" var="dateFmt" pattern="yyyyMMdd"/>
									<fmt:formatDate value="${dateFmt}"  pattern="yyyy-MM-dd"/>
								</td>
							</tr>
							<tr>
								<th scope="row">하수처리장명</th>
								<td colspan="3">
									<c:out value="${swlDranPsVO.drn_nam}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">부지면적</th>
								<td>
									<c:out value="${swlDranPsVO.gai_ara}"/>
								</td>
								<th scope="row">개통상태</th>
								<td>
									<c:out value="${swlDranPsVO.soo_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">처리구역면적</th>
								<td>
									<c:out value="${swlDranPsVO.adp_ara}"/>
								</td>
								<th scope="row">하수처리방식</th>
								<td>
									<c:out value="${swlDranPsVO.sbb_cde_nm}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">청천시처리용량</th>
								<td>
									<c:out value="${swlDranPsVO.pcc_vol}"/>
								</td>
								<th scope="row">우천시처리용량</th>
								<td>
									<c:out value="${swlDranPsVO.puc_vol}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">설계유입수_수질</th>
								<td>
									<c:out value="${swlDranPsVO.qw1_exp}"/>
								</td>
								<th scope="row">설계유출수_수질</th>
								<td>
									<c:out value="${swlDranPsVO.qw2_exp}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">차집관연장</th>
								<td>
									<c:out value="${swlDranPsVO.pip_len}"/>
								</td>
								<th scope="row">방류수역명</th>
								<td>
									<c:out value="${swlDranPsVO.dra_nam}"/>
								</td>
							</tr>
							<tr>
								<th scope="row">공사번호</th>
								<td>
									<c:out value="${swlDranPsVO.cnt_num}"/>
								</td>
								<th scope="row">방향각</th>
								<td>
									<c:out value="${swlDranPsVO.ang_dir}"/>
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
					<button type="button" class="btn basic bi-edit btn_edit" onclick="updateSwlDranPsView('<c:out value="${id}"/>')">수정</button>
					<button type="button" class="btn basic bi-delete2 btn_delete" onclick="deleteSwlDranPs('<c:out value="${id}"/>')">삭제</button>  
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="closeSwlDranPsPopup();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기"></button> -->
<button type="button" class="swlDranPs-popup-close" title="닫기" onclick="closeSwlDranPsPopup();"></button>
<!-- //업무 > 시설관리 > 하수도시설 > 하수처리장 상세보기 end -->