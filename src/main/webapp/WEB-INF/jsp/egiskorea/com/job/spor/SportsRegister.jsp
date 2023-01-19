<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script>
//'지도에서 선택' 버튼
/* $("#mapSelectBtn").unbind('click').bind('click',function(){
// 	console.log("here")
	cmmUtil.getPositionGeom(positionCallback);
}); */
</script>
<body>
	<!-- 업무 > 체육시설 > 체육시설 신규 등록 -->
	<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="selectSafetyFacilLampMng">
		<div class="popup-header">체육시설정보 등록하기</div>
		<div class="popup-body">
			<div class="sub-popup-body">
				<div class="data-write-wrap" style="height: 100%;">
					<div class="scroll-y" style="height: 100%;">
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
										<th scope="row">시설명</th>
										<td colspan="3"><input type="text" name="fclty_nm" class="form-control sporInput"></td>												
									</tr>
									<tr>
										<th scope="row">주소</th>
										<td colspan="3">
											<div class="form-row">
												<div class="col"><input type="text" name="adres" class="form-control sporInput" disabled="disabled"></div> 
												<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn" onclick="cmmUtil.getPositionGeom(positionCallback);">지도에서 선택</button></div>
												<input type="hidden" name="geom" id="geom">
											</div>
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
										<td><input type="number" name="erc_ct" min="0" class="form-control align-right sporInput"></td>
										<th scope="row">건립일</th>
										<td>
										<div class="datapicker-group">
											<input type="text" name="fond_de" class="datepicker" id="spor_datepicker">
										</div>
										</td>
									</tr>
									<tr>
										<th scope="row">건물면적(㎡)</th>
										<td><input type="number" min="0" name="buld_size"class="form-control align-right sporInput"></td>
										<th scope="row">토지면적(㎡)</th>
										<td><input type="number" min="0" name="lad_size" class="form-control align-right sporInput"></td>
									</tr>
									<tr>
										<th scope="row">관리인원(명)</th>
										<td><input type="number" min="0" name="manage_nmpr" class="form-control align-right sporInput"></td>
										<th scope="row">연간이용인원(명)</th> 
										<td><input type="number" min="0" name="fyer_utlztn_nmpr" class="form-control align-right sporInput"></td>
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
												<div class="col"><input type="text" name="charger_nm" class="form-control sporInput" placeholder="이름"></div>
												<div class="col"><input type="text" name="cttpc_telno" class="form-control sporInput" placeholder="전화번호"></div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">시설물개요</th>
										<td colspan="3"><input type="text" name="fclty_sumry" class="form-control sporInput"></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="position-bottom btn-wrap">
						<div>
							<button type="button" class="btn basic bi-write2" onclick="insertSports();">등록</button> <button type="button" class="btn basic bi-cancel" onclick="cancleSportsPopup();">취소</button>
						</div>
					</div>							
				</div>
			</div>
		</div>
		<button type="button" class="popup-close" title="닫기" onclick="removePoint(GLOBAL.NomalIcon);"></button>				
	</div>
	<!-- 업무 > 체육시설 > 체육시설 신규 등록 -->
</body>
</html>