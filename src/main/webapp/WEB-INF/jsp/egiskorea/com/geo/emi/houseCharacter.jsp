<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
										<div class="tab-cont proTab04">
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
																<th scope="row">기타제한</th>
																<td class="align-top">
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0101p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0101List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0101n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0101List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0101c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">개발사업 지역구분</th>
																<td class="align-top">
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0102p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0102List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0102n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0102List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0102c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="b0102e" cssClass="form-control" /></div>
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
																			<form:select path="b0201p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0201List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0201n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0201List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0201c" cssClass="form-select">
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
																			<form:select path="b0202p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0202List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0202n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0202List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0202c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="b0202e" cssClass="form-control" /></div>
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
																<th scope="row">토지용도구분</th>
																<td colspan="3">
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="b0300p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${b0300List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="b0300n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${b0300List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="b0300c" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																				</form:select>
																			</div>
																		</div>
																	</div>
																</td>													
															</tr>	
															<tr>
																<th scope="row">건물구조</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0400p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0400List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0400n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0400List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0400c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="b0400e" cssClass="form-control" /></div>
																	</div>
																</td>
																<th scope="row">건물지붕</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0500p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0500List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0500n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0500List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0500c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="b0500e" cssClass="form-control" /></div>
																	</div>
																</td>														
															</tr>																																					
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">건물용도</h4>
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
																			<form:select path="b0601p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0601List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0601n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0601List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0601c" cssClass="form-select">
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
																			<form:select path="b0602p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0602List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0602n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0602List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0602c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="b0602e" cssClass="form-control" /></div>
																	</div>
																</td>														
															</tr>																																					
														</tbody>
													</table>
												</div>

												<h4 class="cont-stit">주택특성</h4>
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
																<th scope="row">중개축</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0700p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0700List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0700n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0700List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0700c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>
																<th scope="row">리모델링</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0800p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0800List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0800n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0800List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0800c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																</td>														
															</tr>
															<tr>
																<th scope="row">특수<br>부대시설</th>																
																<td class="align-top">
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b0900p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0900List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b0900n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b0900List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b0900c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">기타</div>
																		<div class="col"><form:input path="b0900e" cssClass="form-control" /></div>
																	</div>
																</td>
																<th scope="row">주택유형<br>구분</th>
																<td>
																	<div class="form-row">
																		<div class="col-auto tit">이전</div>
																		<div class="col">
																			<form:select path="b1000p" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b1000List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">현재</div>
																		<div class="col">
																			<form:select path="b1000n" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${b1000List}" itemValue="code" itemLabel="codeIdNm" />
																			</form:select>
																		</div>
																	</div>
																	<div class="form-row">
																		<div class="col-auto tit">변경</div>
																		<div class="col">
																			<form:select path="b1000c" cssClass="form-select">
																				<form:option value="" label="" />
																				<form:options items="${changeList}" itemValue="code" itemLabel="codeNm" />
																			</form:select>
																		</div>
																	</div>																	
																</td>														
															</tr>
															<tr>
																<th scope="row">공가<br>주택구분</th>
																<td colspan="3">
																	<div style="width: 140px;">
																		<div class="form-row">
																			<div class="col-auto tit">이전</div>
																			<div class="col">
																				<form:select path="b1100p" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${b1100List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">현재</div>
																			<div class="col">
																				<form:select path="b1100n" cssClass="form-select">
																					<form:option value="" label="" />
																					<form:options items="${b1100List}" itemValue="code" itemLabel="codeIdNm" />
																				</form:select>
																			</div>
																		</div>
																		<div class="form-row">
																			<div class="col-auto tit">변경</div>
																			<div class="col">
																				<form:select path="b1100c" cssClass="form-select">
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
											</div>
											<div class="position-bottom btn-wrap justify-content-end examinationBtn">
												<button type="button" class="btn basic bi-save" style="margin: 0 3px;" onClick="fn_update_examinationInfo(this.form)">수정</button>
												<button type="button" class="btn basic bi-cancel" style="margin: 0 3px;" onclick="fn_cancel_examinationInfo()">취소</button>
											</div>
										</div>