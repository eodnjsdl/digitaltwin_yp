<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script>

$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

$(document).ready(function(){
	let fcltyTy = '${result.fcltyTy}';
	
	// 시설유형 selectbox
	getCmmCodeData('ALSFCTY', '#upPhyEduFaciTbl #fclty_ty', fcltyTy);
	
	var operMthd = '${result.operMthd}';
	$("#upPhyEduFaciTbl #oper_mthd").val(operMthd).prop("selected", true);
	
	var chrgDeptNm = '${result.chrgDeptNm}';
	$("#upPhyEduFaciTbl #chrg_dept_nm").val(chrgDeptNm).prop("selected", true);
	
	//3d 일때 지도 추가 버튼 삭제 
	if(dtmap.mod == "3D"){
		if($("#upPhyEduFaciTbl .btn-select-map").css("display") != 'none'){
			$("#upPhyEduFaciTbl .btn-select-map").hide();
		}
	}
});

//geom 값 넣기
function phyMapClick() {
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
		$("#upPhyEduFaciTbl input[name=adres]").val('경기도 양평군 ' + result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		
		$("#upPhyEduFaciTbl input[name=geom]").val(wkt);
	});
}

</script>

<!-- 업무 > 시설관리 > 체육시설 > 수정하기 -->
<div class="popup-header">체육시설 수정하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
					<form id="upPhyEduFaciFrm" method="post">
						<table id="upPhyEduFaciTbl" class="data-write">
							<tbody>
								<tr>
									<th scope="row">시설명</th>
									<td colspan="3"><input type="text" name="fcltyNm" class="form-control" value="<c:out value="${result.fcltyNm}"></c:out>"/></td>										
								</tr>
								<tr>
									<th scope="row">주소</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col"><input type="text" name="adres" class="form-control"  value="<c:out value="${result.adres}"></c:out>" readonly="readonly"/></div> 
											<div class="col-auto"><button type="button" class="btn type01 bi-location btn-select-map" id="mapSelectBtn" onclick="phyMapClick();">지도에서 선택</button></div>
											<input type="hidden" name="geom" id="geom" value="<c:out value="${result.geom}"></c:out>"/>
											<input type="hidden" name="gid" id="gid" value="<c:out value="${result.gid}"></c:out>"/>
										</div> 
									</td>												
								</tr>
								<tr>
									<th scope="row">시설유형</th>
									<td>
										<select name="fcltyTy" id="fclty_ty" class="form-select">
											<option value="">선택</option>
										</select>
									</td>
									<th scope="row">운영방식</th>
									<td>
										<select name="operMthd" id="oper_mthd" class="form-select">
											<option value="">선택</option>
											<option value="위탁">위탁</option>
										</select>
									</td>
								</tr>
								<tr>
									<th scope="row">건립비용(백만원)</th>
									<td>
										<fmt:parseNumber value="${result.ercCt}" var="ercCt"/>
										<input type="number" name="ercCt" min="0" class="form-control align-left" value="<c:out value="${ercCt}"></c:out>"/>
									</td>
									<th scope="row">설립일자</th>
									<td><div class="datapicker-group">
											<input type="text" name="fondDe" class="datepicker" id="spor_datepicker" value="<c:out value="${result.fondDe}"></c:out>" style="font-size: 12px;"/>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">건물면적(㎡)</th>
									<td>
										<fmt:parseNumber value="${result.buldSize}" var="buldSize"/>
										<input type="number" name="buldSize" min="0" class="form-control align-left" value="<c:out value="${buldSize}"></c:out>"/>
									</td>
									<th scope="row">토지면적(㎡)</th>
									<td>
										<fmt:parseNumber value="${result.ladSize}" var="ladSize"/>
										<input type="number" name="ladSize" min="0" class="form-control align-left" value="<c:out value="${ladSize}"></c:out>"/>
									</td>
								</tr>
								<tr>
									<th scope="row">관리인원(명)</th>
									<td>
										<fmt:parseNumber value="${result.manageNmpr}" var="manageNmpr"/>
										<input type="number" name="manageNmpr" min="0" class="form-control align-left" value="<c:out value="${manageNmpr}"></c:out>"/>
									</td>
									<th scope="row">연간이용인원(명)</th>
									<td>
										<fmt:parseNumber value="${result.fyerUtlztnNmpr}" var="manageNmpr"/>
										<input type="number" name="fyerUtlztnNmpr" min="0" class="form-control align-left" value="<c:out value="${fyerUtlztnNmpr}"></c:out>"/>
									</td>
								</tr>											
								<tr>
									<th scope="row">담당자</th>
									<td colspan="3">
										<div class="form-row">
											<div class="col">
												<select name="chrgDeptNm" id="chrg_dept_nm" class="form-select">
													<option value="">선택</option>
													<option value="양평군">양평군</option>
													<option value="양평공사">양평공사</option>
													<option value="강상면사무소">강상면사무소</option>
													<option value="강하면사무소">강하면사무소</option>
													<option value="개군면사무소">개군면사무소</option>
													<option value="단월면사무소">단월면사무소</option>
													<option value="서종면사무소">서종면사무소</option>
													<option value="양동면사무소">양동면사무소</option>
													<option value="양서면사무소">양서면사무소</option>
													<option value="양평읍사무소">양평읍사무소</option>
													<option value="옥천면사무소">옥천면사무소</option>
													<option value="용문면사무소">용문면사무소</option>
													<option value="지평면사무소">지평면사무소</option>
													<option value="청운면사무소">청운면사무소</option>
													<option value="양평군 교육체육과">양평군 교육체육과</option>
												</select>
											</div>
											<div class="col"><input type="text" name="chargerNm" class="form-control" value="<c:out value="${result.chargerNm}"></c:out>" placeholder="담당자 이름"/></div>
											<div class="col"><input type="text" name="cttpcTelno" class="form-control" value="<c:out value="${result.cttpcTelno}"></c:out>" placeholder="문의번호"/></div>
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
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
					<button type="button" class="btn basic bi-write2 btn_save" onclick="updatePhyEduFaci(<c:out value="${result.gid}"/>);">수정완료</button>
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="setTimeout(function(){ selectPhyEduFaciDetail(<c:out value="${result.gid}"/>) });">취소</button>
				</div>
			</div>
		</div>							
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="closeInsertPhyFaci();"></button> -->
<button type="button" class="sub-popup-close" title="닫기" onclick="closePhyEduFaciPopup();"></button>	
<!-- 업무 > 시설관리 > 체육시설 > 수정하기 end -->