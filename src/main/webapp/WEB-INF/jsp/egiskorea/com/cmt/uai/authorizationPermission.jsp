<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="examinationInfo01"><button type="button" class="inner-tab" onClick="aj_selectLandRegisterTest(' <c:out value="${result.pnu}" />')" >토지대장</button></li>
										<li data-tab="examinationInfo02"><button type="button" class="inner-tab" onClick="aj_selectBuildingRegister(' <c:out value="${result.pnu}" />')">건축물대장</button></li>
										<li data-tab="examinationInfo03"><button type="button" class="inner-tab" onClick="aj_selectLandUseStatus(' <c:out value="${result.pnu}" />')">토지이용계획</button></li>
										<li data-tab="examinationInfo04"><button type="button" class="inner-tab" onClick="aj_selectOfficiallyAnnouncedLandPrice(' <c:out value="${result.pnu}" />')">공시지가</button></li>
										<li data-tab="examinationInfo05"><button type="button" class="inner-tab" onClick="aj_selectIndividualizationHousePrice(' <c:out value="${result.pnu}" />')">개별주택가격</button></li>
										<li data-tab="examinationInfo06" class="on"><button type="button" class="inner-tab" >인허가정보</button></li>
									</ul>
								</div>								
								<!-- 인허가정보 -->
								<div class="tab-cont examinationInfo06 on">
									<div class="scroll-y">
										<div class="data-default">
											<table class="data-detail">
												<colgroup>
													<col style="width: 20%;">
													<col style="width: 30%;">
													<col style="width: 20%;">
													<col style="width: 30%;">
												</colgroup>
												<tbody>
													<tr>
														<th>지번주소</th>
														<td><c:out value="${result.landLocNm}" /></td>
														<th>도로명주소</th>
														<td>양근로441번길 40-10</td>
													</tr>
												</tbody>
											</table>										
										</div>

										<h4 class="cont-stit">기본정보</h4>
										<div class="data-default">
											<table class="data-detail">
												<colgroup>
													<col style="width: 20%;">
													<col style="width: 30%;">
													<col style="width: 20%;">
													<col style="width: 30%;">
												</colgroup>
												<tbody>
													<tr>
														<th>허가관리코드</th>
														<td>2015-0949</td>
														<th>지자체관리코드</th>
														<td>양근로441번길 40-10</td>
													</tr>
													<tr>
														<th>민원접수번호</th>
														<td>-</td>
														<th>개발행위구분</th>
														<td>개발행위협의</td>
													</tr>
												</tbody>
											</table>										
										</div>

										<h4 class="cont-stit">개발행위허가 정보</h4>
										<div class="data-default">
											<table class="data-detail">
												<colgroup>
													<col style="width: 20%;">
													<col style="width: 30%;">
													<col style="width: 20%;">
													<col style="width: 30%;">
												</colgroup>
												<tbody>
													<tr>
														<th>개발행위목적</th>
														<td colspan="3">농가주택</td>
													</tr>
													<tr>
														<th scope="row">신청인 성명</th>
														<td>손태호</td>
														<th scope="row">신청인 주소</th>
														<td>양평군</td>
													</tr>
													<tr>
														<th scope="row">사업기간 착공</th>
														<td>-</td>
														<th scope="row">사업기간 준공</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">신청일</th>
														<td>-</td>
														<th scope="row">허가일</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">만료일</th>
														<td>-</td>
														<th scope="row">연접개발제한적용</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">건축연면적</th>
														<td>-</td>
														<th scope="row">건축의제여부</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">변경허가사유</th>
														<td>-</td>
														<th scope="row">협의일</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">장수자</th>
														<td>-</td>
														<th scope="row">보증금</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">보증금납부일</th>
														<td>-</td>
														<th scope="row">보증금반환일</th>
														<td>-</td>
													</tr>
												</tbody>
											</table>										
										</div>

									</div>
									<div class="position-bottom btn-wrap justify-content-end">
<!-- 										<div><button type="button" class="btn basic bi-download">다운로드</button></div> -->
									</div>
								</div>
								<!-- //인허가정보 -->
