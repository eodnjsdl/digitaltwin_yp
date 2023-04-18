<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<style type="text/css">
	.popup-panel.popup-sub .wel-popup-close {
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
	let fcltySe = '${result.fcltySe}';

	//시설구분 selectbox
	getCmmCodeData('FCLTCD', '#upWelFareFaciTbl #wel_fclty_se', fcltySe);
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
		$("#upWelFareFaciTbl input[name=lnmAdres]").val('경기도 양평군 ' + result["address"]);
		const format = new ol.format.WKT();
		const point = new ol.geom.Point([xObj, yObj]);
		const wkt = format.writeGeometry(point);
		
		$("#upWelFareFaciTbl input[name=geom]").val(wkt);
	});
	
	var lonLat = new ol.geom.Point(ol.proj.transform([xObj, yObj], 'EPSG:5179', 'EPSG:4326'));
	$("#upWelFareFaciTbl input[name=lon]").val(lonLat.flatCoordinates[0]);
	$("#upWelFareFaciTbl input[name=lat]").val(lonLat.flatCoordinates[1]);
}

</script>

<!-- 업무 > 시설관리 > 복지시설 > 수정하기 -->
<div class="popup-header">복지시설 수정하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
				<form id="upWelFareFaciFrm" method="post">
					<table id="upWelFareFaciTbl" class="data-write">
						<colgroup>
							<col style="width: 23%;">
							<col style="width: auto;">
							<col style="width: 23%;">
							<col style="width: auto;">
						</colgroup>
						<tbody>
							<tr>
								<th scope="row">시설명</th>
								<td colspan="3"><input type="text" class="form-control" id="wel_fclty_nm" name="fcltyNm" maxlength="50" value="<c:out value="${result.fcltyNm}"></c:out>"></td>
							</tr>										
							<tr>
								<th scope="row">시설구분</th>
								<td>
									<select name="fcltySe" class="form-control" id="wel_fclty_se">
									</select>
								</td>
								<th scope="row">전화번호</th>
								<td><input type="text" class="form-control" id="wel_cttpc_telno" name="cttpcTelno" maxlength="20" value="<c:out value="${result.cttpcTelno}"></c:out>"></td>
							</tr>	
							<tr>
								<th scope="row">도로명주소</th>
								<td><input type="text" class="form-control" id="wel_rn_adres" name="rnAdres" maxlength="200" value="<c:out value="${result.rnAdres}"></c:out>"></td>
								<th scope="row">우편번호</th>
								<td><input type="text" class="form-control" id="wel_zip" name="zip" maxlength="6" value="<c:out value="${result.zip}"></c:out>"></td>											
							</tr>	
							<tr>
								<th scope="row">지번주소</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col">
											<input type="text" class="form-control" id="wel_lnm_adres" name="lnmAdres" maxlength="200" value="<c:out value="${result.lnmAdres}"></c:out>" style="width: 270px;">
										</div>
										<div class="col">
											<input type="hidden" class="form-control" id="wel_lon" name="lon" placeholder="경도" value="<c:out value="${result.lon}"></c:out>">
											<input type="hidden" class="form-control" id="wel_lat" name="lat" placeholder="위도" value="<c:out value="${result.lat}"></c:out>">
										</div> 
										<div class="col-auto">
											<button type="button" class="btn type01 bi-location" onclick="welMapClick();">지도에서 선택</button>
										</div>
										<input type="hidden" name="geom" id="geom" value="<c:out value="${result.geom}"></c:out>" />
										<input type="hidden" name="gid" id="gid" value="<c:out value="${result.gid}"></c:out>" />
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
					<button type="button" class="btn basic bi-save" onclick="updateWelFareFaci(<c:out value="${result.gid}"/>)">저장</button> 
					<button type="button" class="btn basic bi-cancel" onclick="setTimeout(function(){ selectWelFareFaciDetail('<c:out value="${result.gid}"/>') });" >취소</button>
				</div>
			</div>
		</div>							
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="removePoint(GLOBAL.NomalIcon);"></button> -->
<button type="button" class="wel-popup-close" title="닫기" onclick="closeWelFarePopup();"></button>
<!-- 업무 > 시설관리 > 체육시설 > 수정하기 end -->