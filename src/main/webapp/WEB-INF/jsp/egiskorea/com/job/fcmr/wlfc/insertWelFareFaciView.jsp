<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script>

$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

$(document).ready(function(){
	//3d 일때 지도 추가 버튼 삭제 
	if(dtmap.mod == "3D"){
		if($("#inWelFareFaciFrm .btn-select-map").css("display") != 'none'){
			$("#inWelFareFaciFrm .btn-select-map").hide();
		}
	}
});

//geom 값 넣기
function welMapClick() {
	dtmap.draw.active({type: 'Point', once: true});
	dtmap.draw.setBuffer(0);	// 공간검색으로 인한 범위 변경
	
	dtmap.on('drawend', welFareFaciGeom);
}

function welFareFaciGeom(e) {
	dtmap.draw.dispose();
	var geom = e.geometry;
	const position = geom.getFlatCoordinates();
	var xObj = parseFloat(position[0]);
	var yObj = parseFloat(position[1]);
	
	cmmUtil.reverseGeocoding(xObj, yObj).done((result) => {
		$("#inWelFareFaciTbl input[name=lnmAdres]").val('경기도 양평군 ' + result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		
		$("#inWelFareFaciTbl input[name=geom]").val(wkt);
	});
	
	var lonLat = new ol.geom.Point(ol.proj.transform([xObj, yObj], 'EPSG:5179', 'EPSG:4326'));
	$("#inWelFareFaciTbl input[name=lon]").val(lonLat.flatCoordinates[0]);
	$("#inWelFareFaciTbl input[name=lat]").val(lonLat.flatCoordinates[1]);
}

</script>

<!-- 업무 > 시설관리 > 복지시설 > 등록하기 -->
<div class="popup-header">복지시설 등록하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
				<form id="inWelFareFaciFrm" method="post">
					<table id="inWelFareFaciTbl" class="data-write">
						<colgroup>
							<col style="width: 23%;">
							<col style="width: auto;">
							<col style="width: 23%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">시설명</th>
								<td colspan="3"><input type="text" class="form-control" id="wel_fclty_nm" name="fcltyNm" maxlength="50"></td>												
							</tr>										
							<tr>
								<th scope="row">시설구분</th>
								<td>
									<select class="form-control" id="wel_fclty_se" name="fcltySe">
										<option value="">선택</option>
									</select>
								</td>
								<th scope="row">전화번호</th>
								<td><input type="text" class="form-control" id="wel_cttpc_telno" name="cttpcTelno" maxlength="20"></td>
							</tr>	
							<tr>
								<th scope="row">도로명주소</th>
								<td><input type="text" class="form-control" id="wel_rn_adres" name="rnAdres" maxlength="200"></td>
								<th scope="row">우편번호</th>
								<td><input type="text" class="form-control" id="wel_zip" name="zip" maxlength="6"></td>											
							</tr>	
							<tr>
								<th scope="row">지번주소</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col">
											<input type="text" class="form-control" id="wel_lnm_adres" name="lnmAdres" maxlength="200" readonly="readonly">
										</div>
										<div class="col-auto">
											<button type="button" class="btn type01 bi-location btn-select-map" onclick="welMapClick();">지도에서 선택</button>
										</div>
										<input type="hidden" class="form-control" id="wel_lon" name="lon" placeholder="경도">
										<input type="hidden" class="form-control" id="wel_lat" name="lat" placeholder="위도">
										<input type="hidden" name="geom" id="geom">
									</div>
								</td>												
							</tr>
						</tbody>
					</table>
				</form>
				</div>
			</div>
			<div class="position-bottom btn-wrap">
				<div>
					<button type="button" class="btn basic bi-edit btn_add" onclick="insertWelFareFaci()">등록</button> 
					<button type="button" class="btn basic bi-cancel btn_cancel" onclick="closeWelFarePopup();">취소</button>
				</div>
			</div>
		</div>							
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="removePoint(GLOBAL.NomalIcon);"></button> -->
<button type="button" class="sub-popup-close" title="닫기" onclick="closeWelFarePopup();"></button>	
<!-- 업무 > 시설관리 > 복지시설 > 등록하기 end -->