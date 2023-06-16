<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
										<div class="tab-cont proTab02">
											<div class="scroll-y">
												<h4 class="cont-stit marT0">공적규제</h4>
												<div class="data-default">
													<table class="data-write">
														<colgroup>
															<col style="width: 17%;">
															<col style="width: auto;">
															<col style="width: 17%;">
															<col style="width: auto;">
														</colgroup>
														<tbody>
															<tr>
																<th scope="row">용도지역</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0100p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0100List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0100n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0100List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0100c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">용도지구</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0200p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0200List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0200n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0200List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0200c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th scope="row">기타제한<br>-<br>기타<br>(제주도)</th>
																<td class="align-top">
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0301n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0301List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col">
																			<form:select path="c0301e" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0301List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">기타제한<br>-<br>도시계획<br>신설</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0302p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0302List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0302n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0302List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0302c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col">
																			<form:select path="c0302e" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0302List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
															</tr>																								
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">지형지세</h4>
												<div class="data-default">
													<table class="data-write">
														<colgroup>
															<col style="width: 17%;">
															<col style="width: auto;">
															<col style="width: 17%;">
															<col style="width: auto;">
														</colgroup>
														<tbody>
															<tr>
																<th scope="row">고저</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0401p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0401List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0401n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0401List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0401c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">형상</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0402p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0402List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0402n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0402List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0402c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th scope="row">방위</th>
																<td colspan="3">
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="c0403p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${c0403List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="c0403n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${c0403List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="c0403c" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																	</div>
																</td>
															</tr>																								
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">도로조건</h4>
												<div class="data-default">
													<table class="data-write">
														<colgroup>
															<col style="width: 17%;">
															<col style="width: auto;">
														</colgroup>
														<tbody>
															<tr>
																<th scope="row">도로접면</th>
																<td>
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="c0500p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${c0500List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="c0500n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${c0500List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="c0500c" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																	</div>
																</td>														
															</tr>																																					
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">유해시설 접근성</h4>
												<div class="data-default">
													<table class="data-write">
														<colgroup>
															<col style="width: 17%;">
															<col style="width: auto;">
															<col style="width: 17%;">
															<col style="width: auto;">
														</colgroup>
														<tbody>
															<tr>
																<th scope="row">철도, 고속도로등</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0601p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0601List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0601n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0601List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0601c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">폐기물, 수질오염</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="c0602p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0602List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="c0602n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${c0602List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="c0602c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
															</tr>																																				
														</tbody>
													</table>
												</div>

											</div>
											<div class="position-bottom btn-wrap justify-content-end examinationBtn">
												<div><button type="button" class="btn basic bi-save" onClick="fn_update_examinationInfo(this.form)">수정</button></div>
											</div>
										</div>