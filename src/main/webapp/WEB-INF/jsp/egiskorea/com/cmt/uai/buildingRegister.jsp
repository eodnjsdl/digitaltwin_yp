<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="examinationInfo01"><button type="button" class="inner-tab" onClick="aj_selectLandRegisterTest(' <c:out value="${result.pnu}" />')" >토지대장</button></li>
										<li data-tab="examinationInfo02" class="on"><button type="button" class="inner-tab" >건축물대장</button></li>
										<li data-tab="examinationInfo03"><button type="button" class="inner-tab" onClick="aj_selectLandUseStatus(' <c:out value="${result.pnu}" />')">토지이용계획</button></li>
										<li data-tab="examinationInfo04"><button type="button" class="inner-tab" onClick="aj_selectOfficiallyAnnouncedLandPrice(' <c:out value="${result.pnu}" />')">공시지가</button></li>
										<li data-tab="examinationInfo05"><button type="button" class="inner-tab" onClick="aj_selectIndividualizationHousePrice(' <c:out value="${result.pnu}" />')">개별주택가격</button></li>
										<li data-tab="examinationInfo06"><button type="button" class="inner-tab" onClick="aj_selectAuthorizationPermission(' <c:out value="${result.pnu}" />')">인허가정보</button></li>
									</ul>
								</div>								
								<!-- 건축물대장 -->
								<div class="tab-cont examinationInfo02 on">
									<div class="scroll-y" style="height: 100%;">
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 10%;">
													<col style="width: auto;">
													<col style="width: 10%;">
													<col style="width: 10%;">
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">대장종류</th>
														<th scope="col">건물명</th>
														<th scope="col">동명</th>
														<th scope="col">주용도</th>
														<th scope="col">연면적(㎡)</th>
														<th scope="col">승인일자</th>
														<th scope="col">지번주소</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<c:choose>
														<c:when test="${not empty result.platPlc}">
														<td><c:out value="${result.regstrKindCdNm}" /></td>
														<td><c:out value="${result.bldNm}" /></td>
														<td><c:out value="${result.dongNm}" /></td>
														<td><c:out value="${result.mainPurpsCdNm}" /></td>
														<td><c:out value="${result.totArea}" /></td>
														<td><c:out value="${result.useAprDay}" /></td>
														<td><c:out value="${result.platPlc}" /></td>
														</c:when>
														<c:otherwise>
														<td colspan="7">정보가 없습니다.</td>
														</c:otherwise>
														</c:choose>
													</tr>
												</tbody>
											</table>										
										</div>
										
										<c:if test="${not empty result.platPlc}">
										<h4 class="cont-stit">상세내용</h4>
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
														<th scope="row">지번주소</th>
														<td><c:out value="${result.platPlc}" /></td>
														<th scope="row">도로명주소</th>
														<td><c:out value="${result.newPlatPlc}" /></td>
													</tr>
													<tr>
														<th scope="row">동명칭</th>
														<td><c:out value="${result.dongNm}" /></td>
														<th scope="row">양성화여부</th>
														<td>-</td>
													</tr>
													<tr>
														<th scope="row">대지면적(㎡)</th>
														<td><c:out value="${result.platArea}" /></td>
														<th scope="row">주/부속구분</th>
														<td><c:out value="${result.mainAtchGbCdNm}" /></td>
													</tr>
													<tr>
														<th scope="row">건폐율(%)</th>
														<td><c:out value="${result.bcRat}" /></td>
														<th scope="row">연면적(㎡)</th>
														<td><c:out value="${result.totArea}" /></td>
													</tr>
													<tr>
														<th scope="row">용적율 산정연면적(㎡)</th>
														<td><c:out value="${result.vlRatEstmTotArea}" /></td>
														<th scope="row">용적율(%)</th>
														<td><c:out value="${result.vlRat}" /></td>
													</tr>
													<tr>
														<th scope="row">구조</th>
														<td><c:out value="${result.strctCdNm}" /></td>
														<th scope="row">구조(기타)</th>
														<td><c:out value="${result.etcStrct}" /></td>
													</tr>
													<tr>
														<th scope="row">주용도</th>
														<td><c:out value="${result.mainPurpsCdNm}" /></td>
														<th scope="row">용도(기타)</th>
														<td><c:out value="${result.etcPurps}" /></td>
													</tr>
													<tr>
														<th scope="row">지붕</th>
														<td><c:out value="${result.roofCdNm}" /></td>
														<th scope="row">지붕(기타)</th>
														<td><c:out value="${result.etcRoof}" /></td>
													</tr>
													<tr>
														<th scope="row">세대수</th>
														<td><c:out value="${result.hhldCnt}" /></td>
														<th scope="row">가구수</th>
														<td><c:out value="${result.fmlyCnt}" /></td>
													</tr>
													<tr>
														<th scope="row">높이</th>
														<td><c:out value="${result.heit}" /></td>
														<th scope="row">지상층수</th>
														<td><c:out value="${result.grndFlrCnt}" /></td>
													</tr>
													<tr>
														<th scope="row">지하층수</th>
														<td><c:out value="${result.ugrndFlrCnt}" /></td>
														<th scope="row">승용승강기대수</th>
														<td><c:out value="${result.rideUseElvtCnt}" /></td>
													</tr>
													<tr>
														<th scope="row">비상용승강기대수</th>
														<td><c:out value="${result.emgenUseElvtCnt}" /></td>
														<th scope="row">총동연면적</th>
														<td><c:out value="${result.totDongTotArea}" /></td>
													</tr>
													<tr>
														<th scope="row">옥외기계식주차대수</th>
														<td><c:out value="${result.oudrMechUtcnt}" /></td>
														<th scope="row">옥외기계식주차면적</th>
														<td><c:out value="${result.oudrMechArea}" /></td>
													</tr>
													<tr>
														<th scope="row">옥내자주식주차대수</th>
														<td><c:out value="${result.indrAutoUtcnt}" /></td>
														<th scope="row">옥내자주식주차면적</th>
														<td><c:out value="${result.indrAutoArea}" /></td>
													</tr>
													<tr>
														<th scope="row">옥외자주식주차대수</th>
														<td><c:out value="${result.oudrAutoUtcnt}" /></td>
														<th scope="row">옥외자주식주차면적</th>
														<td><c:out value="${result.oudrAutoArea}" /></td>
													</tr>
													<tr>
														<th scope="row">허가일</th>
														<td><c:out value="${result.pmsDay}" /></td>
														<th scope="row">착공일</th>
														<td><c:out value="${result.stcnsDay}" /></td>
													</tr>
													<tr>
														<th scope="row">사용승인일</th>
														<td><c:out value="${result.useAprDay}" /></td>
														<th scope="row">허가번호</th>
														<td><c:out value="${result.pmsnoYear}" />-<c:out value="${result.pmsnoKikCdNm}" />-<c:out value="${result.pmsnoYear}" /></td>
													</tr>
												</tbody>
											</table>										
										</div>
										</c:if>
										
										<h4 class="cont-stit">층별현황</h4>
										<div class="data-default">
											<table class="data-detail tbl-all-center">
												<colgroup>
													<col style="width: 9%;">
													<col style="width: 9%;">
													<col style="width: auto;">
													<col style="width: auto;">
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: 12%;">
													<col style="width: 12%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">구분</th>
														<th scope="col">층명</th>
														<th scope="col">구조</th>
														<th scope="col">기타구조</th>
														<th scope="col">주용도</th>
														<th scope="col">기타용도</th>
														<th scope="col">면적(㎡)</th>
														<th scope="col">주부속구분</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach items="${resultList1}" var="result" varStatus="status">
													<tr>
														<td><c:out value="${result.flrGbCdNm}" /></td>
														<td><c:out value="${result.flrNoNm}" /></td>
														<td><c:out value="${result.strctCdNm}" /></td>
														<td><c:out value="${result.etcStrct}" /></td>
														<td><c:out value="${result.mainPurpsCdNm}" /></td>
														<td><c:out value="${result.etcPurps}" /></td>
														<td><c:out value="${result.area}" /></td>
														<td><c:out value="${result.mainAtchGbCdNm}" /></td>
													</tr>
													</c:forEach>
													<c:if test="${fn:length(resultList1) == 0}">
													<tr>
														<td colspan="8">정보가 없습니다.</td>
													</tr>
													</c:if>
												</tbody>
											</table>										
										</div>
										
										
										<h4 class="cont-stit">관련지번현황</h4>
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 50%;">
													<col style="width: 50%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">지번주소</th>
														<th scope="col">도로명주소</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach items="${resultList2}" var="result" varStatus="status">
													<tr>
														<td><c:out value="${result.platPlc}" /></td>
														<td><c:out value="${result.newPlatPlc}" /></td>
													</tr>
													</c:forEach>
													<c:if test="${fn:length(resultList2) == 0}">
													<tr>
														<td colspan="2">정보가 없습니다.</td>
													</tr>
													</c:if>
												</tbody>
											</table>										
										</div>

									</div>
									<div class="position-bottom btn-wrap justify-content-end">
										<div><button type="button" class="btn basic bi-download">다운로드</button></div>
									</div>
								</div>
								<!-- //건축물대장 -->				
