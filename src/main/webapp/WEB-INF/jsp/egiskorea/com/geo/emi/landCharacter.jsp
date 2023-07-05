<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
										<div class="tab-cont proTab03">
											<div class="scroll-y">
												<h4 class="cont-stit marT0">공적규제</h4>
												<div class="data-default">
													<table class="data-write">
														<colgroup>
															<col style="width: 17%;">
															<col style="width: auto;">
														</colgroup>
														<tbody>
															<tr>
																<th scope="row">기타제한</th>
																<td>
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="l0100p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0100List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="l0100n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0100List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="l0100c" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">기타</div>
																			<div class="col">
																				<form:select path="l0100e" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0100List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																	</div>
																</td>														
															</tr>																																					
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">토지이용상황</h4>
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
																<th scope="row">대분류</th>
																<td class="align-top">
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="l0201p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0201List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="l0201n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0201List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="l0201c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">소분류</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="l0202p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0202List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="l0202n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0202List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="l0202c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="l0202e" cssClass="form-control" /></div>
																	</div>
																</td>
															</tr>																					
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">농지</h4>
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
																<th scope="row">구분</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="l0301p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0301List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="l0301n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0301List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="l0301c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">비옥도</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="l0302p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0302List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="l0302n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0302List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="l0302c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th scope="row">경지정리</th>
																<td colspan="3">
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="l0303p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0303List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="l0303n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0303List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="l0303c" cssClass="form-select">
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
												
												<h4 class="cont-stit">임야</h4>
												<div class="data-default">
													<table class="data-write">
														<colgroup>
															<col style="width: 17%;">
															<col style="width: auto;">
														</colgroup>
														<tbody>
															<tr>
																<th scope="row">임야</th>
																<td>
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="l0400p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0400List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="l0400n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0400List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="l0400c" cssClass="form-select">
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
																<th scope="row">도로거리</th>
																<td>
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="l0500p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0500List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="l0500n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${l0500List}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="l0500c" cssClass="form-select">
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

												<h4 class="cont-stit">대규모 개발사업</h4>
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
																<th scope="row">사업방식</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="l0601p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0601List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="l0601n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0601List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="l0601c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">사업단계</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="l0602p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0602List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="l0602n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${l0602List}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="l0602c" cssClass="form-select">
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
												<button type="button" class="btn basic bi-save" style="margin: 0 3px;" onClick="fn_update_examinationInfo(this.form)">수정</button>
												<button type="button" class="btn basic bi-cancel" style="margin: 0 3px;" onclick="fn_cancel_examinationInfo()">취소</button>
											</div>
										</div>