<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script src="/js/egiskorea/com/job/wlre/wlre.js"></script>
<script>

</script>
				<!-- 업무 > 시설관리 > 복지시설 > 상세조회 -->
				<div id="wlreDetail_Div" class="popup-panel popup-sub work-02-05-regist opened" style="bottom: 398px;right: 70px;width: 550px;height: 330px;">
					<div class="popup-header">복지시설 상세보기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
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
											<td colspan="3" id="wlre-det-fcltyNm"><c:out value="${resultList.fcltyNm}"></c:out></td>												
										</tr>										
										<tr>
											<th scope="row">시설구분</th>
											<td id="wlre-det-fcltySe">
<%-- 											<c:out value="${resultList.fcltySe}"></c:out> --%>
													<c:set var="fcltySe" value="${resultList.fcltySe}" />
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
																${resultList.fcltySe}
															</c:otherwise>
															</c:choose>
											</td>
											<th scope="row">전화번호</th>
											<td id="wlre-det-cttpcTelno"><c:out value="${resultList.cttpcTelno}"></c:out></td>
										</tr>	
										<tr>
											<th scope="row">도로명주소</th>
											<td id="wlre-det-rnAdres"><c:out value="${resultList.rnAdres}"></c:out></td>
											<th scope="row">우편번호</th>
											<td id="wlre-det-zip"><c:out value="${resultList.zip}"></c:out></td>											
										</tr>	
										<tr>
											<th scope="row">지번주소</th>
											<td id="wlre-det-lnmAdres"><c:out value="${resultList.lnmAdres}"></c:out></td>	
											<th scope="row">기준일</th>
											<td id="wlre-det-dataStdde"><c:out value="${resultList.dataStdde}"></c:out></td>												
										</tr>
										<tr>
											<th scope="row">위도</th>
											<td id="wlre-det-lat"><c:out value="${resultList.lat}"></c:out></td>
											<th scope="row">경도</th>
											<td id="wlre-det-lon"><c:out value="${resultList.lon}"></c:out></td>											
										</tr>
									</tbody>
								</table>
							</div>
							
							<div class="position-bottom btn-wrap justify-content-end">
								<div>
									<button type="button" class="btn basic bi-edit" onclick="WLRE.updateWelfare('<c:out value="${resultList.gid}"/>', '<c:out value="${resultList.fcltyNm}"/>', '<c:out value="${resultList.fcltySe}"/>', '<c:out value="${resultList.cttpcTelno}"/>', '<c:out value="${resultList.rnAdres}"/>', '<c:out value="${resultList.lnmAdres}"/>', '<c:out value="${resultList.zip}"/>', '<c:out value="${resultList.lat}"/>', '<c:out value="${resultList.lon}"/>');">수정</button> 
									<button type="button" class="btn basic bi-delete2" onclick="WLRE.deleteWelfare('<c:out value="${resultList.gid}"/>');">삭제</button>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기" onclick="WLRE.cancelModal();"></button>				
				</div>
				<!-- //업무 > 시설관리 > 복지시설 > 상세조회 -->
