<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="examinationInfo01"><button type="button" class="inner-tab" onClick="aj_selectLandRegisterTest(' <c:out value="${result.pnu}" />')" >토지대장</button></li>
										<li data-tab="examinationInfo02"><button type="button" class="inner-tab" onClick="aj_selectBuildingRegister(' <c:out value="${result.pnu}" />')">건축물대장</button></li>
										<li data-tab="examinationInfo03"><button type="button" class="inner-tab" onClick="aj_selectLandUseStatus(' <c:out value="${result.pnu}" />')">토지이용계획</button></li>
										<li data-tab="examinationInfo04" class="on"><button type="button" class="inner-tab">공시지가</button></li>
										<li data-tab="examinationInfo05"><button type="button" class="inner-tab" onClick="aj_selectIndividualizationHousePrice(' <c:out value="${result.pnu}" />')">개별주택가격</button></li>
										<li data-tab="examinationInfo06"><button type="button" class="inner-tab" onClick="aj_selectAuthorizationPermission(' <c:out value="${result.pnu}" />')">인허가정보</button></li>
									</ul>
								</div>								
								<!-- 공시지가 -->
								<div class="tab-cont examinationInfo04 on">
									<div class="scroll-y" style="height: 100%;">
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

										<div class="data-default marT20">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 20%;">
													<col style="width: auto;">
													<col style="width: 20%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">기준 년월</th>
														<th scope="col">개별공시지가(원)</th>
														<th scope="col">공시일자</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach items="${resultList}" var="result" varStatus="status">
													<tr>
														<td><c:out value="${result.baseYear}" />-<c:out value="${result.baseMon}" /></td>
														<td><c:out value="${result.pannJiga}" /></td>
														<td><c:out value="${result.pannYmd}" /></td>
													</tr>
													</c:forEach>
												</tbody>
											</table>										
										</div>
									</div>
									<div class="position-bottom btn-wrap justify-content-end">
										<div><button type="button" class="btn basic bi-download">다운로드</button></div>
									</div>
								</div>
								<!-- //공시지가 -->						
