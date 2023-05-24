<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="popup-header">행정자산관리 등록</div>
		<div class="popup-body">
			<div class="sub-popup-body">
				<div class="data-write-wrap" style="height: 100%;">
					<div class="scroll-y" style="height: 100%;">
						<div class="data-default">
							<form id="dataRegistForm">
								<table class="data-write">
									<colgroup>
										<col style="width: 23%;">
										<col style="width: auto;">
										<col style="width: 23%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">계약(갱신)일</th>
											<td colspan="3"><input type="text" id="ctrtYmd" name="ctrtYmd" maxlength="8" value="" placeholder="ex)230101" class="form-control"/></td>
										</tr>
										<tr>
											<th scope="row">계약기간</th>
											<td colspan="3"><input type="text" id="cntrctpd" name="cntrctpd" maxlength="50" value="" class="form-control"/></td>												
										</tr>
										<tr>
											<th scope="row">소재지</th>
											<td colspan="3"><input type="text" id="locplc" name="locplc" value="" class="form-control"/></td>
										</tr>
										<tr>
											<th scope="row">지목 코드</th>
											<td>
												<select id="ldcgCd" name="ldcgCd" class="form-select">
													<option>123</option>
													<option>123</option>
													<option>123</option>
													<option>123</option>
													<option>123</option>
													<option>123</option>
												</select>
											</td>
											<th scope="row">면적(㎡)</th>
											<td><input type="number" id="ar" name="ar" maxlength="10" value="" class="form-control align-right"/></td>
										</tr>
										<tr>
											<th scope="row">대부 면적(㎡)</th>
											<td><input type="number" id="loanAr" name="loanAr" maxlength="10" value="" class="form-control align-right"/></td>
											<th scope="row">대부 용도</th>
											<td><input type="text" id="loanPrpos" name="loanPrpos" maxlength="20" value="" class="form-control align-right"/></td>
										</tr>
										<tr>
											<th scope="row">주민등록번호</th>
											<td><input type="text" id="rrno" name="rrno" maxlength="13" value="" placeholder="숫자만입력하세요." class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">성명</th> 
											<td><input type="text" id="nm" name="nm" maxlength="5" value="" class="form-control"/></td>
											<th scope="row">주소</th> 
											<td><input type="text" id="addr" name="addr" maxlength="5" value="" class="form-control"/></td>
										</tr>											
										<tr>
											<th scope="row">우편번호</th>
											<td><input type="number" id="zip" name="zip" maxlength="5"  value="" class="form-control"/></td>
											<th scope="row">연락처</th>
											<td><input type="number" id="cttpc" name="cttpc" maxlength="11" value="" class="form-control"/></td>
										</tr>
										<tr>
											<th scope="row">첨부 서류</th>
											<td colspan="3"><input type="text" id="atchPapers" name="atchPapers" value="" class="form-control"/></td>
										</tr>
										<tr>
											<th scope="row">확인 사항</th>
											<td colspan="3"><input type="text" id="cnfirmMatter" name="cnfirmMatter" value="" class="form-control"/></td>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					<div class="position-bottom btn-wrap">
	                    <div>
	                   	    <button type="button" class="btn basic bi-edit">등록</button>
	                   		<button type="button" class="btn basic bi-cancel">취소</button>
	                    </div>
                    </div>							
				</div>
			</div>
		</div>
	<button type="button" class="popup-close" title="닫기"></button>	