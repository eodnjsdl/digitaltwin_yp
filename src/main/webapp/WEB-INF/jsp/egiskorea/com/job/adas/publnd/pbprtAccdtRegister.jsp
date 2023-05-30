<%--
* 공유재산 실태조사 정보 등록 화면
* author : 백승석
* since : 2023.02.21
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<body>
	<!-- 업무 > 공유지관리 > 공유재산 실태조사 신규 등록 -->
		<div class="popup-header">공유재산 실태조사정보 등록</div>
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
											<td colspan="3"><input type="text" id="ctrtYmd" name="ctrtYmd" maxlength="8" value="" placeholder="ex)230101" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">계약기간</th>
											<td colspan="3"><input type="text" id="cntrctpd" name="cntrctpd" maxlength="50" value="" class="form-control pbprtAccdtInput"/></td>												
										</tr>
										<tr>
											<th scope="row">소재지</th>
											<td colspan="3"><input type="text" id="locplc" name="locplc" value="" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">지목 코드</th>
											<td>
												<select id="ldcgCd" name="ldcgCd" class="form-select">
													<c:if test="${fn:length(ldcgCdList) > 0}">
														<c:forEach var="ldcgCdList" items="${ldcgCdList}">
															<option value="<c:out value="${ldcgCdList.code}"/>"><c:out value="${ldcgCdList.codeNm}"/></option>
														</c:forEach>
													</c:if>
												</select>
											</td>
											<th scope="row">면적(㎡)</th>
											<td><input type="number" id="ar" name="ar" maxlength="10" value="0" class="form-control align-right pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
										</tr>
										<tr>
											<th scope="row">대부 면적(㎡)</th>
											<td><input type="number" id="loanAr" name="loanAr" maxlength="10" value="0" class="form-control align-right pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
											<th scope="row">대부 용도</th>
											<td><input type="text" id="loanPrpos" name="loanPrpos" maxlength="20" value="" class="form-control align-right pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">주민등록번호</th>
											<td><input type="number" id="rrno" name="rrno" maxlength="13" value="" placeholder="숫자만입력하세요." class="form-control pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
											<th scope="row">대부료 발송 여부</th>
											<td>
												<select id="loanmnSndngYn" name="loanmnSndngYn" class="form-select pbprtAccdtInput">
													<option value="Y">예</option>
													<option value="N">아니오</option>
												</select>
											</td>
										</tr>
										<tr>
											<th scope="row">성명</th> 
											<td><input type="text" id="nm" name="nm" maxlength="5" value="" class="form-control pbprtAccdtInput"/></td>
											<th scope="row">우편번호</th>
											<td><input type="number" id="zip" name="zip" maxlength="5" value="0" class="form-control pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
										</tr>											
										<tr>
											<th scope="row">연락처</th>
											<td><input type="number" id="cttpc" name="cttpc" maxlength="11" value="0" class="form-control pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
											<th scope="row">비고</th>
											<td><input type="text" id="rm" name="rm" value="" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">고지서 발송</th>
											<td>
												<select id="nhtSndng" name="nhtSndng" class="form-select pbprtAccdtInput">
													<option value="Y" <c:if test="${pbprtAccdtDtlInfoList.nhtSndng == 'Y'}">selected</c:if>>예</option>
													<option value="N" <c:if test="${pbprtAccdtDtlInfoList.nhtSndng == 'N'}">selected</c:if>>아니오</option>
												</select>
											</td>
											<th scope="row">확인 사항</th>
											<td><input type="text" id="cnfirmMatter" name="cnfirmMatter" value="" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">첨부 서류</th>
											<td colspan="3"><input type="text" id="atchPapers" name="atchPapers" value="" class="form-control pbprtAccdtInput"/></td>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					<div class="position-bottom btn-wrap">
						<div>
							<button type="button" class="btn basic bi-write2" onclick="insertPbprtAccdtInfo()">등록</button> 
							<button type="button" class="btn basic bi-cancel closeSub">취소</button>
						</div>
					</div>							
				</div>
			</div>
		</div>
		<button type="button" class="popup-close closeSub" title="닫기"></button>				
	</div>
</body>
</html>