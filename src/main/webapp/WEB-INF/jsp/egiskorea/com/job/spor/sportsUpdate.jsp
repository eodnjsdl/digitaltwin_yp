<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/spor/spor.js"></script>
<script>
//'지도에서 선택' 버튼
$("#mapSelectBtn").unbind('click').bind('click',function(){
	cmmUtil.getPositionGeom(positionCallback);
});
                  

</script>

<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;">
	<div class="popup-header">체육시설 수정</div>
	<div class="popup-body">
		<div class="sub-popup-body">
			<div class="data-write-wrap" style="height: 100%;">
				<div class="scroll-y">
					<div class="data-default">
						<table class="data-write">
							<tbody>
									<tr>
										<th scope="row">시설명</th>
										<td colspan="3"><input type="text" name="fclty_nm" class="form-control sporInput" value="<c:out value="${result.fcltyNm}"></c:out>"/></td>												
									</tr>
									<tr>
										<th scope="row">주소</th>
										<td colspan="3">
											<div class="form-row">
												<div class="col"><input type="text" name="adres" class="form-control sporInput" disabled="disabled" value="<c:out value="${result.adres}"></c:out>"/></div> 
												<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn">지도에서 선택</button></div>
												<input type="hidden" name="geom" id="geom" value="<c:out value="${result.geom}"></c:out>"/></div> 
										</td>												
									</tr>
									<tr>
										<th scope="row">시설유형</th>
										<td>
											<select name="fclty_ty" id="fclty_ty" class="form-select">
												<option value="체육시설" selected>체육시설</option>
											</select>
										</td>
										<th scope="row">운영방식</th>
										<td>
											<select name="oper_mthd" id="oper_mthd" class="form-select">
												<option value="위탁" selected>위탁</option>
											</select>
										</td>
									</tr>
									<tr>
										<th scope="row">건립비용(백만원)</th>
										<td><input type="number" name="erc_ct" min="0" class="form-control align-left" value="<c:out value="${result.ercCt}"></c:out>"/></td>
										<th scope="row">건립일</th>
										<td><div class="datapicker-group">
												<input type="text" name="fond_de" class="datepicker" id="spor_datepicker" value="<c:out value="${result.fondDe}"></c:out>" style="font-size: 12px;"/>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">건물면적(㎡)</th>
										<td><input type="number" name="buld_size" min="0" class="form-control align-left" value="<c:out value="${result.buldSize}"></c:out>"/></td>
										<th scope="row">토지면적(㎡)</th>
										<td><input type="number" name="lad_size" min="0" class="form-control align-left" value="<c:out value="${result.ladSize}"></c:out>"/></td>
									</tr>
									<tr>
										<th scope="row">관리인원(명)</th>
										<td><input type="number" name="manage_nmpr" min="0" class="form-control align-left" value="<c:out value="${result.manageNmpr}"></c:out>"/></td>
										<th scope="row">연간이용인원(명)</th>
										<td><input type="number" name="fyer_utlztn_nmpr" min="0" class="form-control align-left" value="<c:out value="${result.fyerUtlztnNmpr}"></c:out>"/></td>
									</tr>											
									<tr>
										<th scope="row">담당자</th>
										<td colspan="3">
											<div class="form-row">
												<div class="col">
													<select name="chrg_dept_nm" id="chrg_dept_nm" class="form-select">
														<option value="국토토지과" selected>국토토지과</option>
													</select>
												</div>
												<div class="col"><input type="text" name="charger_nm" class="form-control" value="<c:out value="${result.chargerNm}"></c:out>"/></div>
												<div class="col"><input type="text" name="cttpc_telno" class="form-control" value="<c:out value="${result.cttpcTelno}"></c:out>"/></div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">시설물개요</th>
										<td colspan="3"><input type="text" name="fclty_sumry" class="form-control" value="<c:out value="${result.fcltySumry}"></c:out>"/></td>
									</tr>
								</tbody>
						</table>
					</div>
				</div>
				<div class="position-bottom btn-wrap">
					<div>
						<button type="button" class="btn basic bi-save" id="updateSports" onclick="updateSports('<c:out value="${result.gid}"></c:out>')">저장</button> 
<%-- 						<button type="button" class="btn basic bi-delete2" id ="deleteSports" onclick="deleteSports('<c:out value="${result.gid}"></c:out>')">삭제</button> --%>
						<button type="button" class="btn basic bi-cancel" onclick="setTimeout(function(){selectSportsDetail('<c:out value="${result.gid}"/>','<c:out value="${result.lon}"/>','<c:out value="${result.lat}"/>');},10);" >취소</button>
					</div>
				</div>
			</div>							
		</div>
	</div>
	<button type="button" class="popup-close" title="닫기"></button>				
</div>
<!-- //업무 > 공간정보활용 > 안전시설물관리 > 가로등관리 등록하기 -->