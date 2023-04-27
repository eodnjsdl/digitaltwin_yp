<%--
* 공유재산 실태조사 상세정보
* author : 백승석
* since : 2023.02.21
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<script>
/**
 * 공유재산 실태조사서 새창
 * @param publndNo
 * @returns
 */
function selectPbprtAccdtWrinvstg(publndNo) {
	window.open('/job/publnd/selectPbprtAccdtWrinvstg.do?publndNo=' + publndNo, 'wrinvstg','width=1000, height=800');
}
</script>
<body>
	<!-- 업무 > 공유지관리 > 공유재산 실태조사 상세정보  -->
		<div class="popup-header">공유재산 실태조사 상세정보</div>
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
											<td colspan="3"><input type="text" id="ctrtYmd" name="ctrtYmd" maxlength="8" value="<c:out value="${pbprtAccdtDtlInfoList.ctrtYmd}"/>" placeholder="ex)230101" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">계약기간</th>
											<td colspan="3"><input type="text" id="cntrctpd" name="cntrctpd" maxlength="50" value="<c:out value="${pbprtAccdtDtlInfoList.cntrctpd}"/>" class="form-control pbprtAccdtInput"/></td>												
										</tr>
										<tr>
											<th scope="row">소재지</th>
											<td colspan="3"><input type="text" id="locplc" name="locplc" value="<c:out value="${pbprtAccdtDtlInfoList.locplc}"/>" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">지목 코드</th>
											<td>
												<select id="ldcgCd" name="ldcgCd" class="form-select">
													<c:if test="${fn:length(ldcgCd) > 0}">
														<c:forEach var="ldcgCd" items="${ldcgCd}">
															<c:if test="${ldcgCd.code == pbprtAccdtDtlInfoList.ldcgCd}">
																<option value="<c:out value="${ldcgCd.code}"/>" selected><c:out value="${ldcgCd.codeNm}"/></option>
															</c:if>
															<c:if test="${ldcgCd.code != pbprtAccdtDtlInfoList.ldcgCd}">
																<option value="<c:out value="${ldcgCd.code}"/>"><c:out value="${ldcgCd.codeNm}"/></option>
															</c:if>
														</c:forEach>
													</c:if>
												</select>
											</td>
											<th scope="row">면적(㎡)</th>
											<td><input type="number" id="ar" name="ar" maxlength="10" value="<c:out value="${pbprtAccdtDtlInfoList.ar}"/>" class="form-control align-right pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">대부 면적(㎡)</th>
											<td><input type="number" id="loanAr" name="loanAr" maxlength="10" value="<c:out value="${pbprtAccdtDtlInfoList.loanAr}"/>" class="form-control align-right pbprtAccdtInput"/></td>
											<th scope="row">대부 용도</th>
											<td><input type="text" id="loanPrpos" name="loanPrpos" maxlength="20" value="<c:out value="${pbprtAccdtDtlInfoList.loanPrpos}"/>" class="form-control align-right pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">주민등록번호</th>
											<td><input type="text" id="rrno" name="rrno" maxlength="13" value="<c:out value="${pbprtAccdtDtlInfoList.rrno}"/>" placeholder="숫자만입력하세요." class="form-control pbprtAccdtInput"/></td>
											<th scope="row">대부료 발송 여부</th>
											<td>
												<select id="loanmnSndngYn" name="loanmnSndngYn" class="form-select pbprtAccdtInput">
													<option value="Y" <c:if test="${pbprtAccdtDtlInfoList.loanmnSndngYn == 'Y'}">selected</c:if>>예</option>
													<option value="N" <c:if test="${pbprtAccdtDtlInfoList.loanmnSndngYn == 'N'}">selected</c:if>>아니오</option>
												</select>
											</td>
										</tr>
										<tr>
											<th scope="row">성명</th> 
											<td><input type="text" id="nm" name="nm" maxlength="5" value="<c:out value="${pbprtAccdtDtlInfoList.nm}"/>" class="form-control pbprtAccdtInput"/></td>
											<th scope="row">주소</th> 
											<td><input type="text" id="addr" name="addr" maxlength="5" value="<c:out value="${pbprtAccdtDtlInfoList.addr}"/>" class="form-control pbprtAccdtInput"/></td>
										</tr>											
										<tr>
											<th scope="row">우편번호</th>
											<td><input type="number" id="zip" name="zip" maxlength="5"  value="<c:out value="${pbprtAccdtDtlInfoList.zip}"/>" class="form-control pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
											<th scope="row">연락처</th>
											<td><input type="number" id="cttpc" name="cttpc" maxlength="11" value="<c:out value="${pbprtAccdtDtlInfoList.cttpc}"/>" class="form-control pbprtAccdtInput" oninput="numberMaxLengthCheck(this)"/></td>
										</tr>
										<tr>
											<th scope="row">비고</th>
											<td><input type="text" id="rm" name="rm" value="<c:out value="${pbprtAccdtDtlInfoList.rm}"/>" class="form-control pbprtAccdtInput"/></td>
											<th scope="row">고지서 발송</th>
											<td>
												<select id="nhtSndng" name="nhtSndng" class="form-select pbprtAccdtInput">
													<option value="Y" <c:if test="${pbprtAccdtDtlInfoList.nhtSndng == 'Y'}">selected</c:if>>예</option>
													<option value="N" <c:if test="${pbprtAccdtDtlInfoList.nhtSndng == 'N'}">selected</c:if>>아니오</option>
												</select>
											</td>
										</tr>
										<tr>
											<th scope="row">첨부 서류</th>
											<td colspan="3"><input type="text" id="atchPapers" name="atchPapers" value="<c:out value="${pbprtAccdtDtlInfoList.atchPapers}"/>" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">확인 사항</th>
											<td colspan="3"><input type="text" id="cnfirmMatter" name="cnfirmMatter" value="<c:out value="${pbprtAccdtDtlInfoList.cnfirmMatter}"/>" class="form-control pbprtAccdtInput"/></td>
										</tr>
										<tr>
											<th scope="row">등록 연도</th>
											<td><input type="text" id="year" name="year" maxlength="4" value="<c:out value="${pbprtAccdtDtlInfoList.year}"/>" class="form-control pbprtAccdtInput" disabled/></td>
											<th scope="row">위성 사진 저장</th>
											<td><button type="button" class="btn type01 bi-location" id="satlitPhotoSave" onclick="createSatlitImageLine()" disabled>현재 위치 저장</button></td>
										</tr>
									</tbody>
								</table>
								<input type="hidden" name="publndNo" value="<c:out value="${pbprtAccdtDtlInfoList.publndNo}"/>">
								<div class="saveMap-satlit-thumb">
									<img src="">
								</div>
							</form>
						</div>
					</div>
					<div class="position-bottom btn-wrap" style="justify-content: space-between;">
						<div class="wrinvstgBtton">
							<button type="button" class="btn basic bi-excel" onclick="selectPbprtAccdtWrinvstg(${pbprtAccdtDtlInfoList.publndNo})">조사서</button> 
						</div>
						<div class="modifyBtton">
							<button type="button" class="btn basic bi-write2" onclick="fn_update(${pbprtAccdtDtlInfoList.publndNo})">수정</button> 
							<button type="button" class="btn basic bi-cancel closeSub">취소</button>
						</div>
						<div class="deleteBtton">
							<button type="button" class="btn basic bi-delete" onclick="updatePbprtAccdtInfoDel(${pbprtAccdtDtlInfoList.publndNo})">삭제</button>
						</div>
					</div>							
				</div>
			</div>
		</div>
	<button type="button" class="popup-close closeSub" title="닫기"></button>				
</body>
</html>