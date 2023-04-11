<%--
* 공유재산 실태조사서 화면
* author : 이혜인
* since : 2023.02.21
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="context_path" value="${pageContext.request.contextPath}" scope="application"/>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>공유재산 실태 조사서</title>
	<link rel="stylesheet" href="${context_path}/css/job/publnd/pbprtAccdtWrinvstg.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
	<div id="wrtContent" class="formBordr">
		<h1>공유재산 실태 조사서</h1>
		<div id="sanctner">
			<table>
				<thead>
					<tr>
						<th>주무관</th>
						<th>재산정책팀장</th>
						<th>회계과장</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id="exmnCnBordr">
			<h4>&#9744; 재산 소재지</h4>
			<div id="exmnCn">
				<form id="exmnCnForm" name="exmnCnForm">
					<table class="exmnFirst">
						<tbody>
							<tr>
								<td id="publndSe" class="fontSj">구분</td>
								<td id="locplc" class="fontSj">소재지</td>
								<td id="ldcgCd" class="fontSj">지목</td>
								<td id="ar" class="fontSj">면적&#40;m<sup>2</sup>&#41;</td>
								<td id="oalp" class="fontSj">공시지가&#40;원&#41;</td>
								<td id="rm" class="fontSj">비고</td>
							</tr>
							<tr>
								<td><input type="text" name="publndSe" value="${pbprtInfo.publndSe }"></td>
								<td><input type="text" name="locplc" value="${pbprtInfo.locplc }" disabled></td>
								<td>
									<input type="text" value="${pbprtInfo.ldcgCdNm }" disabled>
									<input type="hidden" name="ldcgCd" value="${pbprtInfo.ldcgCd }" disabled>
								</td>
								<td><input type="number" name="ar" value="${pbprtInfo.ar }" disabled></td>
								<td>
									<input type="number" name="oalp" value="${pbprtInfo.oalp }" 
										<c:if test="${pbprtInfo.oalp ne null }">value="${pbprtInfo.oalp }"</c:if>
										<c:if test="${pbprtInfo.oalp eq null }">value="0"</c:if>>
								</td>
								<td><input type="text" name="rm" value="${pbprtInfo.rm }" disabled></td>
							</tr>
							<tr>
								<td class="nullTd" colspan="6"></td>
							</tr>
						</tbody>
					</table>
					<table class="loan">
						<tbody>
							<tr>
								<td id="loan" class="fontSj">대부자</td>
								<td id="loanAddr" class="fontSj">주소</td>
								<td>
									<input type="text" value="${pbprtInfo.addr }" disabled>
								</td>
								<td id="loanNm" class="fontSj">성명</td>
								<td id="loanNmValue">
									<input type="text" value="${pbprtInfo.nm }" disabled>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="wtrmsPossesn">
						<tbody>
							<tr>
								<td id="possesnDtls" rowspan="2" class="fontSj">무단점유내역</td>
								<td class="fontSj">점유면적&#40;m<sup>2</sup>&#41;</td>
								<td class="fontSj">점유내용</td>
								<td class="fontSj">전화번호</td>
							</tr>
							<tr>
								<td>
									<input type="number" name="possesnAr" 
										<c:if test="${pbprtInfo.possesnAr ne null }">value="${pbprtInfo.possesnAr }"</c:if>
										<c:if test="${pbprtInfo.possesnAr eq null }">value="0"</c:if>>
								</td>
								<td><input type="text" name="possesnCn" value="${pbprtInfo.possesnCn }"></td>
								<td><input type="text" value="${pbprtInfo.cttpc }" disabled></td>
							</tr>
						</tbody>
					</table>
					<table class="loanPosblYn">
						<tbody>
							<tr>
								<td id="loanPosblYn" class="fontSj">대부가능여부</td>
								<td id="loanPosblYnValue">
									<input type="text" name="loanPosblYn" value="${pbprtInfo.loanPosblYn }">
								</td>
							</tr>
						</tbody>
					</table>
					<table class="bsrpCnExmnr">
						<tbody>
							<tr>
								<td id="bsrpCn" class="fontSj">출장내용</td>
								<td id="bsrpCnValue" contenteditable="true">${pbprtInfo.bsrpCn}</td>
							</tr>
							<tr>
								<td id="exmnr" class="fontSj">조사자</td>
								<td id="exmnrValue" contenteditable="true">${pbprtInfo.exmnr}</td>
							</tr>
						</tbody>
					</table>
					<table class="exmnPhotoTable">
						<tbody>
							<tr class="exmnPhoto">
								<td>
									<c:if test="${pbprtInfo.atchFileId eq null || pbprtInfo.satlitPhotoSn == 9}">
										<img id="satlitPhotoThumb" src="" alt="">
										<div class="photoContainer">
											<input type="file" id="satlitPhoto" accept="image/png, image/jpeg, image/jpg">
											<div id="delSatlitPhoto" class="delFileButton dsplyNone" onclick="delImgFile(this)">파일 삭제</div>
										</div>
									</c:if>
									<c:if test="${pbprtInfo.atchFileId ne null && pbprtInfo.satlitPhotoSn ne null && pbprtInfo.satlitPhotoSn != 9}">
										<img id="satlitPhotoThumb" src='${context_path}/cmm/fms/getImage.do?atchFileId=${pbprtInfo.atchFileId}&fileSn=${pbprtInfo.satlitPhotoSn}' alt="파일이미지">
										<div class="photoContainer">
											<input type="file" id="satlitPhoto" accept="image/png, image/jpeg, image/jpg">
											<div id="delSatlitPhoto" class="delFileButton" onclick="delImgFile(this)">파일 삭제</div>
										</div>
									</c:if>
								</td>
								<td>
									<c:if test="${pbprtInfo.atchFileId eq null || pbprtInfo.sptPhotoSn == 9}">
										<img id="sptPhotoThumb" src="" alt="">
										<div class="photoContainer">
											<input type="file" id="sptPhoto" accept="image/png, image/jpeg, image/jpg">
											<div id="delSptPhoto" class="delFileButton dsplyNone" onclick="delImgFile(this)">파일 삭제</div>
										</div>
									</c:if>
									<c:if test="${pbprtInfo.atchFileId ne null && pbprtInfo.sptPhotoSn ne null && pbprtInfo.sptPhotoSn != 9}">
										<img id="sptPhotoThumb" src='${context_path}/cmm/fms/getImage.do?atchFileId=${pbprtInfo.atchFileId}&fileSn=${pbprtInfo.sptPhotoSn}' alt="파일이미지">
										<div class="photoContainer">
											<input type="file" id="sptPhoto" accept="image/png, image/jpeg, image/jpg">
											<div id="delSptPhoto" class="delFileButton" onclick="delImgFile(this)">파일 삭제</div>
										</div>
									</c:if>
								</td>
							</tr>
							<tr>
								<td class="fontSj">위성사진</td>
								<td class="fontSj">현장사진</td>
							</tr>
						</tbody>
					</table>
					<input type="hidden" name="wrtYn" value="${pbprtInfo.wrtYn }">
					<input type="hidden" name="publndNo" value="${pbprtInfo.publndNo }">
					<input type="hidden" id="fileDelYn" name="fileDelYn" value="N">
					<input type="hidden" id="satlitPhotoSn" name="satlitPhotoSn" value="${pbprtInfo.satlitPhotoSn}">
					<input type="hidden" id="sptPhotoSn" name="sptPhotoSn" value="${pbprtInfo.sptPhotoSn}">
				</form>
			</div>
		</div>
		<div class="buttonBordr">
			<div class="buttonBordrStre">
				<div onclick="downloadPdf()">
					<span>PDF</span>
				</div>
				<div onclick="javascript:window.print()">
					<span>인쇄</span>
				</div>
				<div onclick="downloadHwp()">
					<span>한글</span>
				</div>
			</div>
			
			<div class="buttonBordrEdit">
				<div onclick="putInfo()">
					<c:if test="${pbprtInfo.wrtYn ne 'N' }">
						<span>수정</span>
					</c:if>
					<c:if test="${pbprtInfo.wrtYn eq 'N' }">
						<span>등록</span>
					</c:if>
				</div>
				<div onclick="removeInfo(${pbprtInfo.publndNo})">
					<c:if test="${pbprtInfo.wrtYn ne 'N' }">
						<span>삭제</span>
					</c:if>
					<c:if test="${pbprtInfo.wrtYn eq 'N' }">
						<span>취소</span>
					</c:if>
				</div>
			</div>
		</div>
	</div>
	
	<script>
		let context_path = "${context_path}";
	</script>
	<script src="/js/com/jquery/jquery-3.4.1.min.js"></script>
	<script src="/js/html2canvas.min.js" type="text/javascript"></script>
	<script src="/js/egiskorea/com/job/publnd/pbprtAccdtWrinvstg.js"></script>
</body>
</html>