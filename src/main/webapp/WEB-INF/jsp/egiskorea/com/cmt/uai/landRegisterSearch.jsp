<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

								<div class="tabBoxDepth1">
									<ul>
										<li data-tab="examinationInfo01" class="on"><button type="button" class="inner-tab">토지대장</button></li>
										<li data-tab="examinationInfo02"><button type="button" class="inner-tab" onClick="aj_selectBuildingRegister(' <c:out value="${result.pnu}" />')">건축물대장</button></li>
										<li data-tab="examinationInfo03"><button type="button" class="inner-tab" onClick="aj_selectLandUseStatus(' <c:out value="${result.pnu}" />')">토지이용계획</button></li>
										<li data-tab="examinationInfo04"><button type="button" class="inner-tab" onClick="aj_selectOfficiallyAnnouncedLandPrice(' <c:out value="${result.pnu}" />')">공시지가</button></li>
										<li data-tab="examinationInfo05"><button type="button" class="inner-tab" onClick="aj_selectIndividualizationHousePrice(' <c:out value="${result.pnu}" />')">개별주택가격</button></li>
										<li data-tab="examinationInfo06"><button type="button" class="inner-tab" onClick="aj_selectAuthorizationPermission(' <c:out value="${result.pnu}" />')">인허가정보</button></li>
									</ul>
								</div>
								<!-- 토지대장 -->
								<div class="tab-cont examinationInfo01 on">
									<div class="scroll-y" style="height: 100%;">
										<div class="data-default">
											<table class="data-list">
												<colgroup>
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: auto;">
													<col style="width: 20%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row" colspan="2">토지소재</th>
														<td colspan="3"><c:out value="${result.landLocNm}" /></td>
													</tr>
													<tr>
														<th scope="row" colspan="2">도로명주소</th>
														<td colspan="3">양평시장길 20-1</td>
													</tr>
													<tr>
														<th scope="row" colspan="2">도호</th>
														<td><c:out value="${result.doho}" /></td>
														<th>축척명</th>
														<td><c:out value="${result.scaleNm}" /></td>
													</tr>
													<tr>
														<th scope="row" colspan="2">지목</th>
														<td><c:out value="${result.jimokNm}" /></td>
														<th>면적(㎡)</th>
														<td><c:out value="${result.parea}" /></td>
													</tr>
													<tr>
														<th scope="row" rowspan="3">최종토지 이동연혁</th>
														<th class="border-left">이동일자</th>
														<td colspan="3"><c:out value="${result.landMovYmd}" /></td>
													</tr>
													<tr>
														<th class="border-left">이동사유</th>
														<td colspan="3"><c:out value="${result.landMovRsnCdNm}" /></td>
													</tr>
													<tr>
														<th class="border-left">최종종번</th>
														<td colspan="3"><c:out value="${result.lastJibn}" /></td>
													</tr>
												</tbody>
											</table>										
										</div>
	
										<h4 class="cont-stit">토지이동연혁</h4>
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 20%;">
													<col style="width: auto;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">순번</th>
														<th scope="col">지목</th>
														<th scope="col">면적(㎡)</th>
														<th scope="col">토지이동사유</th>
														<th scope="col">토지이동일자</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach items="${resultList1}" var="result" varStatus="status">
													<tr>
														<td><c:out value="${status.count}" /></td>
														<td><c:out value="${result.jimokNm}" /></td>
														<td><c:out value="${result.parea}" /></td>
														<td><c:out value="${result.landMovRsnCdNm}" /></td>
														<td><c:out value="${result.dymd}" /></td>
													</tr>
													</c:forEach>
												</tbody>
											</table>										
										</div>
	
										<h4 class="cont-stit">소유권변동연혁</h4>
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: auto;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col">순번</th>
														<th scope="col">소유자명</th>
														<th scope="col">소유구분</th>
														<th scope="col">공유인수</th>
														<th scope="col">변동사유</th>
														<th scope="col">변동일자</th>
													</tr>
												</thead>
												<tbody>
													<c:forEach items="${resultList2}" var="result" varStatus="status">
													<tr>
														<td><c:out value="${status.count}" /></td>
														<td><c:out value="${result.ownerNm}" /></td>
														<td><c:out value="${result.ownGbn}" /></td>
														<td><c:out value="${result.shrCnt}" /></td>
														<td><c:out value="${result.ownRgtChgRsnCdNm}" /></td>
														<td><c:out value="${result.dymd}" /></td>													
													</tr>	
													</c:forEach>											
												</tbody>
											</table>										
										</div>
									</div>	
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-all" onclick="fn_right_select_detail('<c:out value="${result.pnu}" />')">국토조사정보</button></div>
										<div class="position-absolute right"><button type="button" class="btn basic bi-download">다운로드</button></div>
									</div>
								</div>
								<!-- //토지대장 -->
