<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
										<div class="tab-cont proTab01 on">
											<div class="scroll-y">
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
																<th scope="row">지목일치여부</th>
																<td>
																	<form:select path="j0100" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${j0100List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</td>
																<th scope="row">현실지목 대분류</th>
																<td>
																	<form:select path="j0301" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${j0301List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</td>
															</tr>
															<tr>
																<th scope="row">재설정 지목</th>
																<td>
																	<form:select path="j0200" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${j0200List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</td>
																<th scope="row">현실지목 소분류</th>
																<td>
																	<form:select path="j0302" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${j0302List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</td>
															</tr>													
														</tbody>
													</table>
												</div>

												<div class="row">
													<div class="col-6">
														<h4 class="cont-stit">토지용도</h4>
														<div class="data-default">
															<table class="data-write">
																<colgroup>
																	<col style="width: 35%;">
																	<col style="width: auto;">
																</colgroup>
																<tbody>
																	<tr>
																		<th scope="row">용도1</th>
																		<td>
																			<form:select path="j0401" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0401List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도1(%)</th>
																		<td>
																			<form:select path="j0401p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0401pList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도2</th>
																		<td>
																			<form:select path="j0402" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0401List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도2(%)</th>
																		<td>
																			<form:select path="j0402p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0401pList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도3</th>
																		<td>
																			<form:select path="j0403" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0401List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도3(%)</th>
																		<td>
																			<form:select path="j0403p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0401pList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>															
																</tbody>
															</table>
														</div>
													</div>
													<div class="col-6">
														<h4 class="cont-stit">건물용도</h4>
														<div class="data-default">
															<table class="data-write">
																<colgroup>
																	<col style="width: 35%;">
																	<col style="width: auto;">
																</colgroup>
																<tbody>
																	<tr>
																		<th scope="row">용도1</th>
																		<td>
																			<form:select path="j0501" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0501List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도1(%)</th>
																		<td>
																			<form:select path="j0501p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0501pList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도2</th>
																		<td>
																			<form:select path="j0502" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0501List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도2(%)</th>
																		<td>
																			<form:select path="j0502p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0501pList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도3</th>
																		<td>
																			<form:select path="j0503" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0501List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>
																	<tr>
																		<th scope="row">용도3(%)</th>
																		<td>
																			<form:select path="j0503p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${j0501pList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</td>
																	</tr>															
																</tbody>
															</table>
														</div>
													</div>
												</div>
													
												<h4 class="cont-stit">국공유지</h4>
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
																<th scope="row">국공유지</th>
																<td>
																	<form:select path="g0100" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${g0100List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</td>
																<th scope="row">유지무단</th>
																<td>
																	<form:select path="g0101" cssClass="form-select">
																		<form:option value="" label="" />
																		<form:options items="${g0100List}" itemValue="code" itemLabel="codeNm" />
																	</form:select>
																</td>
															</tr>																									
														</tbody>
													</table>
												</div>
												
												<h4 class="cont-stit">조사자 의견</h4>
												<div style="padding-bottom: 5px;"><form:textarea path="opinion" cssClass="form-control" /></div>
											</div>
											<div class="position-bottom btn-wrap justify-content-end examinationBtn">
												<button type="button" class="btn basic bi-save" style="margin: 0 3px;" onClick="fn_update_examinationInfo(this.form)">수정</button>
												<button type="button" class="btn basic bi-cancel" style="margin: 0 3px;" onclick="fn_cancel_examinationInfo()">취소</button>
											</div>
										</div>