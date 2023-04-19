<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script>
$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});
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
								<td colspan="3"><input type="text" class="form-control" id="wlre_fclty_nm" name="fcltyNm" maxlength="50"></td>												
							</tr>										
							<tr>
								<th scope="row">시설구분</th>
								<td>
									<select name="wlre_fclty_se" class="form-control" id="wlre_fclty_se" name="fcltySe">
									</select>
								</td>
								<th scope="row">전화번호</th>
								<td><input type="text" class="form-control" id="wlre_cttpc_telno" name="cttpcTelno" maxlength="20"></td>
							</tr>	
							<tr>
								<th scope="row">도로명주소</th>
								<td><input type="text" class="form-control" id="wlre_rn_adres" name="rnAdres" maxlength="200"></td>
								<th scope="row">우편번호</th>
								<td><input type="text" class="form-control" id="wlre_zip" name="zip" maxlength="6"></td>											
							</tr>	
							<tr>
								<th scope="row">지번주소</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col">
											<input type="text" class="form-control" id="wlre_lnm_adres" name="lnmAdres" maxlength="200">
										</div>
										<div class="col" style="display: none;">
											<input type="text" class="form-control" id="wlre_lon" readonly placeholder="경도">
											<input type="text" class="form-control" id="wlre_lat" readonly placeholder="위도">
										</div> 
										<div class="col-auto">
											<button type="button" class="btn type01 bi-location" onclick="WLRE.setLocation();">지도에서 선택</button>
										</div>
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
					<button type="button" class="btn basic bi-save" onclick="insertWelFareFaci()">저장</button> 
					<button type="button" class="btn basic bi-cancel" onclick="cancleWelFarePopup();">취소</button>
				</div>
			</div>
		</div>							
	</div>
</div>
<button type="button" class="popup-close" title="닫기" onclick="removePoint(GLOBAL.NomalIcon);"></button>				
<!-- 업무 > 시설관리 > 체육시설 > 등록하기 / 수정하기 end -->