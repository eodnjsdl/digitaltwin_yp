<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
										<div class="tab-cont proTab05">
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
															<th scope="row">전<br>(시설재배지)</th>
															<td>
																<form:select path="t0100" cssClass="form-select">
																	<form:option value="" label="" />
																	<form:options items="${t0100List}" itemValue="code" itemLabel="codeNm" />
																</form:select>
															</td>
															<th scope="row">기타재배지<br>(원예)</th>
															<td>
																<form:select path="t0200" cssClass="form-select">
																	<form:option value="" label="" />
																	<form:options items="${t0200List}" itemValue="code" itemLabel="codeNm" />
																</form:select>
															</td>
														</tr>
														<tr>
															<th scope="row">산림지역<br>(활엽)</th>
															<td>
																<form:select path="t0300" cssClass="form-select">
																	<form:option value="" label="" />
																	<form:options items="${t0300List}" itemValue="code" itemLabel="codeNm" />
																</form:select>
															</td>
															<th scope="row">초지<br>(자연,인공)</th>
															<td>
																<form:select path="t0400" cssClass="form-select">
																	<form:option value="" label="" />
																	<form:options items="${t0400List}" itemValue="code" itemLabel="codeNm" />
																</form:select>
															</td>
														</tr>
														<tr>
															<th scope="row">습지<br>(내륙,연안)</th>
															<td>
																<form:select path="t0500" cssClass="form-select">
																	<form:option value="" label="" />
																	<form:options items="${t0500List}" itemValue="code" itemLabel="codeNm" />
																</form:select>
															</td>
															<th scope="row">나지<br>(자연,기타)</th>
															<td>
																<form:select path="t0600" cssClass="form-select">
																	<form:option value="" label="" />
																	<form:options items="${t0600List}" itemValue="code" itemLabel="codeNm" />
																</form:select>
															</td>
														</tr>
														<tr>
															<th scope="row">수역(해양수)</th>
															<td colspan="3">
																<div style="width: 140px;">
																	<form:select path="t0700" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${t0700List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="position-bottom btn-wrap justify-content-end examinationBtn">
												<button type="button" class="btn basic bi-save" style="margin: 0 3px;" onClick="fn_update_examinationInfo(this.form)">수정</button>
												<button type="button" class="btn basic bi-cancel" style="margin: 0 3px;" onclick="fn_cancel_examinationInfo()">취소</button>
											</div>
										</div>