<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
							
								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="examinationInfo01" ><button type="button" class="inner-tab" onClick="aj_selectLandRegisterTest(' <c:out value="${result.pnu}" />')" >토지대장</button></li>
										<li data-tab="examinationInfo02"><button type="button" class="inner-tab" onClick="aj_selectBuildingRegister(' <c:out value="${result.pnu}" />')">건축물대장</button></li>
										<li data-tab="examinationInfo03" class="on"><button type="button" class="inner-tab" >토지이용계획</button></li>
										<li data-tab="examinationInfo04"><button type="button" class="inner-tab" onClick="aj_selectOfficiallyAnnouncedLandPrice(' <c:out value="${result.pnu}" />')">공시지가</button></li>
										<li data-tab="examinationInfo05"><button type="button" class="inner-tab" onClick="aj_selectIndividualizationHousePrice(' <c:out value="${result.pnu}" />')">개별주택가격</button></li>
										<li data-tab="examinationInfo06"><button type="button" class="inner-tab" onClick="aj_selectAuthorizationPermission(' <c:out value="${result.pnu}" />')">인허가정보</button></li>
									</ul>
								</div>								
								<!-- 토지이용현황 -->
								<div class="tab-cont examinationInfo03 on">
									<!-- <div class="scroll-y" style="height: 100%;"> -->
									<div class="scroll-y" style="height: 50%;">
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
													<col style="width: 25%;">
													<col style="width: auto;">
													<col style="width: 15%;">
													<col style="width: 15%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">법률명</th>
														<th scope="col">용도지역지구명</th>
														<th scope="col">형태</th>
														<th scope="col">저촉여부</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach items="${resultList}" var="result" varStatus="status">
													<tr>
														<td><c:out value="${result.lawnm}" /></td>
														<td><c:out value="${result.uname}" /></td>
														<td>
															<c:choose>
															<c:when test="${result.gubun eq 1}">용도지역</c:when>
															<c:when test="${result.gubun eq 2}">용도지구</c:when>
															<c:when test="${result.gubun eq 3}">용도구역</c:when>
															<c:when test="${result.gubun eq 4}">기타</c:when>
															<c:when test="${result.gubun eq 5}">도시계획시설</c:when>
															<c:otherwise>기타로취급</c:otherwise>
															</c:choose>
														</td>
														<td>
															<c:choose>
															<c:when test="${result.ctype eq 1}">포함</c:when>
															<c:when test="${result.ctype eq 2}">저촉</c:when>
															<c:otherwise>접합</c:otherwise>
															</c:choose>
														</td>
													</tr>
													</c:forEach>												
												</tbody>
											</table>										
										</div>
									</div>
									
									<div style="width: 100%;">
										<div style="float: left; width: 50%">
											<c:if test="${not empty landUseStatusMainImgCode}">
												<img src="data:image/gif;base64,${landUseStatusMainImgCode}">
											</c:if>
										</div>
										<div class="data-default" style="float: left; width: 270px; margin-left: 20px; ">
										
											<div style="width: 100%;">
											<table class="data-list" >
												<colgroup>
													<col style="width: 25%;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col" colspan="2">범례</th>
													</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
											</div>
											
											<div class="scroll-y" style="height: 180px; width: 100%;">
											<table class="data-list">
												<colgroup>
													<col style="width: 25%;">
													<col style="width: auto;">
												</colgroup>
												<thead>
												</thead>
												<tbody>
													<c:forEach items="${landUseStatusLegendImgCodeList}" var="legendCode" varStatus="status">
													<tr>
														<td><img src="data:image/gif;base64,${legendCode.IMG }"></td>
														<td><c:out value="${legendCode.TEXT }"/></td>
													</tr>
													</c:forEach>											
												</tbody>
											</table>
											</div>
											
											<div style="margin-top: 5px;">
												<span>※ 본 도면은 "측량, 설계 등"과 그 밖의 목적으로 사용할 수 없는 "참고도면" 입니다.</span>
											</div>
										</div>
									</div>
									
									<div class="position-bottom btn-wrap" style="margin: -10px;">
										<div>
											<button type="button" class="btn basic bi-all" onclick="fn_land_use_status_cnncUrl('<c:out value="${result.pnu}" />')">토지이용 규제 정보시비스</button>
										</div>
										<!-- <div><button type="button" class="btn basic bi-download">다운로드</button></div> -->
									</div>
								</div>
								<!-- //토지이용현황 -->
