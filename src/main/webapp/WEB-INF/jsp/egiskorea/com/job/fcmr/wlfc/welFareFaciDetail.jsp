<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script>

$(".scroll-y").mCustomScrollbar({
	scrollbarPosition: "outside"
});

</script>

<!-- 업무 > 시설관리 > 복지시설 > 상세보기 -->
<div class="popup-header">복지시설 상세보기</div>
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
								<th scope="row">시설명</th>
								<td colspan="3" id="wlre_det_fcltyNm"><c:out value="${result.fcltyNm}"></c:out></td>												
							</tr>										
							<tr>
								<th scope="row">시설구분</th>
								<td id="wlre_det_fcltySe">
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
								</td>
								<th scope="row">전화번호</th>
								<td id="wlre_det_cttpcTelno"><c:out value="${result.cttpcTelno}"></c:out></td>
							</tr>	
							<tr>
								<th scope="row">도로명주소</th>
								<td id="wlre_det_rnAdres"><c:out value="${result.rnAdres}"></c:out></td>
								<th scope="row">우편번호</th>
								<td id="wlre_det_zip"><c:out value="${result.zip}"></c:out></td>											
							</tr>	
							<tr>
								<th scope="row">지번주소</th>
								<td id="wlre_det_lnmAdres"><c:out value="${result.lnmAdres}"></c:out></td>	
								<th scope="row">기준일</th>
								<td id="wlre_det_dataStdde"><c:out value="${result.dataStdde}"></c:out></td>												
							</tr>
							<tr>
								<th scope="row">위도</th>
								<td id="wlre_det_lat"><fmt:formatNumber value="${result.lat}" pattern=".000000"></fmt:formatNumber></td>
								<th scope="row">경도</th>
								<td id="wlre_det_lon"><fmt:formatNumber value="${result.lon}" pattern=".0000000"></fmt:formatNumber></td>											
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="position-bottom btn-wrap justify-content-end">
				<div>
					<button type="button" class="btn basic bi-edit" onclick="updateWelFareFaciView(<c:out value="${result.gid}"/>);">수정</button> 
					<button type="button" class="btn basic bi-delete2" onclick="deleteWelFareFaci(<c:out value="${result.gid}"/>);">삭제</button>
					<button type="button" class="btn basic bi-cancel" onclick="closeWelFarePopup();">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <button type="button" class="popup-close" title="닫기" onclick="removePoint(GLOBAL.NomalIcon);"></button> -->
<button type="button" class="sub-popup-close" title="닫기" onclick="closeWelFarePopup();"></button>
<!-- 업무 > 시설관리 > 복지시설 > 상세보기 end -->