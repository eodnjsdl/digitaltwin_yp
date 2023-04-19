<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script>
$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

$(document).ready(function(){
	let fclty_se = '${result.fcltySe}';

	//시설구분 selectbox
	getCmmCodeData('FCLTCD', '#upWelFareFaciTbl #wlre_fclty_se', fclty_se);
});
</script>

<!-- 업무 > 시설관리 > 복지시설 > 수정하기 -->
<div class="popup-header">복지시설 수정하기</div>
<div class="popup-body">
	<div class="sub-popup-body">
		<div class="data-write-wrap" style="height: 100%;">
			<div class="scroll-y">
				<div class="data-default">
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
								<td colspan="3"><input type="text" class="form-control" id="wlre_fclty_nm" maxlength="50" value="<c:out value="${result.fcltyNm}"></c:out>"></td>
							</tr>										
							<tr>
								<th scope="row">시설구분</th>
								<td>
									<select name="wlre_fclty_se" class="form-control" id="wlre_fclty_se">
										<c:set var="fcltySe" value="${result.fcltySe}" />
										<c:choose>
											<c:when test='${fcltySe eq "01"}'>
												노인의료복지시설								
											</c:when>
											<c:when test='${fcltySe eq "02"}'>
												노인주거복지시설								
											</c:when>
											<c:when test='${fcltySe eq "03"}'>
												바우처제공기관								
											</c:when>
											<c:when test='${fcltySe eq "04"}'>
												사회복지관								
											</c:when>
											<c:when test='${fcltySe eq "05"}'>
												아동복지시설								
											</c:when>
											<c:when test='${fcltySe eq "06"}'>
												여성시설								
											</c:when>
											<c:when test='${fcltySe eq "07"}'>
												자원봉사센터								
											</c:when>
											<c:when test='${fcltySe eq "08"}'>
												장애인거주시설								
											</c:when>
											<c:when test='${fcltySe eq "09"}'>
												장애인의료재활시설								
											</c:when>
											<c:when test='${fcltySe eq "10"}'>
												장애인지역사회재활시설								
											</c:when>
											<c:when test='${fcltySe eq "11"}'>
												장애인직업재활시설								
											</c:when>
											<c:when test='${fcltySe eq "12"}'>
												재가노인복지시설								
											</c:when>
											<c:when test='${fcltySe eq "13"}'>
												정보센터								
											</c:when>
											<c:when test='${fcltySe eq "14"}'>
												지역자활센터								
											</c:when>
											<c:otherwise>
												${result.fcltySe}
											</c:otherwise>
										</c:choose>
									</select>
								</td>
								<th scope="row">전화번호</th>
								<td><input type="text" class="form-control" id="wlre_cttpc_telno" maxlength="20" value="<c:out value="${result.cttpcTelno}"></c:out>"></td>
							</tr>	
							<tr>
								<th scope="row">도로명주소</th>
								<td><input type="text" class="form-control" id="wlre_rn_adres" maxlength="200" value="<c:out value="${result.rnAdres}"></c:out>"></td>
								<th scope="row">우편번호</th>
								<td><input type="text" class="form-control" id="wlre_zip" maxlength="6" value="<c:out value="${result.zip}"></c:out>"></td>											
							</tr>	
							<tr>
								<th scope="row">지번주소</th>
								<td colspan="3">
									<div class="form-row">
										<div class="col">
											<input type="text" class="form-control" id="wlre_lnm_adres" maxlength="200" value="<c:out value="${result.lnmAdres}"></c:out>">
										</div>
										<div class="col" style="display: none;">
											<input type="text" class="form-control" id="wlre_location" readonly placeholder="경도, 위도">
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
				</div>
			</div>
			<div class="position-bottom btn-wrap">
				<div>
					<button type="button" class="btn basic bi-save" onclick="updateWelFareFaci('<c:out value="${result.gid}"/>')">저장</button> 
					<button type="button" class="btn basic bi-cancel" onclick="setTimeout(function(){selectWelFareFaciDetail('<c:out value="${result.gid}"/>','<c:out value="${result.lon}"/>','<c:out value="${result.lat}"/>');},10);" >취소</button>
				</div>
			</div>
		</div>							
	</div>
</div>
<button type="button" class="popup-close" title="닫기" onclick="removePoint(GLOBAL.NomalIcon);"></button>				
<!-- 업무 > 시설관리 > 체육시설 > 등록하기 / 수정하기 end -->