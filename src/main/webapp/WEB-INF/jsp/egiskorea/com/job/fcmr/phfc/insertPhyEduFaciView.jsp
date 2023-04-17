<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .phy-popup-close {
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

<script>
$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

$(document).ready(function(){
	var fcltyTy = '${result.fcltyTy}';
	$("#phyEduFaciTbl #fclty_ty").val(fcltyTy).prop("selected", true);
	
	var operMthd = '${result.operMthd}';
	$("#phyEduFaciTbl #oper_mthd").val(operMthd).prop("selected", true);
	
	var chrgDeptNm = '${result.chrgDeptNm}';
	$("#phyEduFaciTbl #chrg_dept_nm").val(chrgDeptNm).prop("selected", true);
});

//geom 값 넣기
function mapClick() {
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.draw.setBuffer(0);	// 공간검색으로 인한 범위 변경
	
	dtmap.on('drawend', phyEduFaciGeom);
}

function phyEduFaciGeom(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	
	cmmUtil.reverseGeocoding(xObj, yObj).done((result) => {
		$("#phyEduFaciTbl input[name=adres]").val('경기도 양평군 ' + result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		$("#phyEduFaciTbl input[name=geom]").val(wkt);
	});
}
</script>

<!-- 업무 > 시설관리 > 체육시설 > 등록하기 / 수정하기 -->
<div class="popup-header">체육시설 등록하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<form id="phyEduFaciFrm" method="post">
						<table id="phyEduFaciTbl" class="data-write">
							<tbody>
								<tr>
									<th scope="row">시설명</th>
									<td colspan="3"><input type="text" name="fcltyNm" class="form-control sporInput" value="<c:out value="${result.fcltyNm}"></c:out>"/></td>												
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" name="adres" class="form-control sporInput"  value="<c:out value="${result.adres}"></c:out>" readonly="readonly"/></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn" onclick="mapClick();">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom" value="<c:out value="${result.geom}"></c:out>"/>
										</div> 
									</td>												
								</tr>
								<tr>
									<th scope="row">시설유형</th>
									<td>
										<select name="fcltyTy" id="fclty_ty" class="form-select">
											<option value=""></option>
											<option value="체육시설">체육시설</option>
										</select>
									</td>
									<th scope="row">운영방식</th>
									<td>
										<select name="operMthd" id="oper_mthd" class="form-select">
											<option value=""></option>
											<option value="위탁">위탁</option>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">건립비용(백만원)</th>
									<td><input type="number" name="ercCt" min="0" class="form-control align-left" value="<c:out value="${result.ercCt}"></c:out>"/></td>
									<th scope="row">설립일자</th>
									<td><div class="datapicker-group">
											<input type="text" name="fondDe" class="datepicker" id="spor_datepicker" value="<c:out value="${result.fondDe}"></c:out>" style="font-size: 12px;"/>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">건물면적(㎡)</th>
									<td><input type="number" name="buldSize" min="0" class="form-control align-left" value="<c:out value="${result.buldSize}"></c:out>"/></td>
									<th scope="row">토지면적(㎡)</th>
									<td><input type="number" name="ladSize" min="0" class="form-control align-left" value="<c:out value="${result.ladSize}"></c:out>"/></td>
								</tr>
								<tr>
									<th scope="row">관리인원(명)</th>
									<td><input type="number" name="manageNmpr" min="0" class="form-control align-left" value="<c:out value="${result.manageNmpr}"></c:out>"/></td>
									<th scope="row">연간이용인원(명)</th>
									<td><input type="number" name="fyerUtlztnNmpr" min="0" class="form-control align-left" value="<c:out value="${result.fyerUtlztnNmpr}"></c:out>"/></td>
								</tr>											
								<tr>
									<th scope="row">담당자</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col">
												<select name="chrgDeptNm" id="chrg_dept_nm" class="form-select">
													<option value=""></option>
													<option value="국토토지과">국토토지과</option>
												</select>
											</div>
											<div class="col"><input type="text" name="chargerNm" class="form-control" value="<c:out value="${result.chargerNm}"></c:out>"/></div>
											<div class="col"><input type="text" name="cttpcTelno" class="form-control" value="<c:out value="${result.cttpcTelno}"></c:out>"/></div>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">시설물개요</th>
									<td colspan="3"><input type="text" name="fcltySumry" class="form-control" value="<c:out value="${result.fcltySumry}"></c:out>"/></td>
								</tr> 
							</tbody>
						</table>
					</form>
				</div>
			</div>
			<div class="position-bottom btn-wrap">
				<div>
					<button type="button" class="btn basic bi-save" id="updateSports" onclick="insertPhyEduFaci()">저장</button> 
					<button type="button" class="btn basic bi-cancel" onclick="setTimeout(function(){ selectPhyEduFaciDetail('<c:out value="${result.gid}"/>') });" >취소</button>
				</div>
			</div>
		</div>							
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="closeInsertPhyFaci();"></button> -->
<button type="button" class="phy-popup-close" title="닫기" onclick="closePhyEduFaciPopup();"></button>	
<!-- 업무 > 시설관리 > 체육시설 > 등록하기 / 수정하기 end -->