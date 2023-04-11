<%--
* 공유재산 실태조사 엑셀 업로드 화면
* author : 백승석
* since : 2023.02.21
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<body>
<div class="popup-panel popup-sub opened" style="bottom: 398px;right: 70px;width: 550px;height: 445px;" id="pbprtAccdtExcelUploadView">
	<!-- 업무 > 공유지관리 > 공유재산 실태조사 엑셀 업로드  -->
		<div class="popup-header">공유재산 실태조사 엑셀 업로드</div>
		<div class="popup-body">
			<div class="sub-popup-body">
				<div class="data-write-wrap" style="height: 100%;">
					<div class="scroll-y" style="height: 100%;">
						<div class="data-default">
							<form id="pbprtAccdtExcelUploadForm"method="post" enctype="multipart/form-data">
		                    	<div class="pbprtAccdtExcelFile">
		                            <input name = "pbprtAccdtFile" type="file" id="f01" class="hidden" onchange="pbprtAccdtExcelDir()"/>
		                            <p class="fileName" id="fileDir">선택된 파일 없음</p>
		                        </div>
	                    	</form>
						</div>
						
					</div>
					<div class="position-bottom btn-wrap" style="justify-content: space-between;">
						<div class="excelFormDownloadBtton">
							<button type="button" onclick="selectPbprtAccdtExcelForm(); return false;" class="btn basic bi-excel pbprtAccdtExcelUploadForm">엑셀양식</button>
							<form:form name="excelUploadForm" id="excelUploadForm" method="post" onsubmit=""></form:form>
						</div>
						<div class="excelUploadBtton">
							<button type="button" class="btn basic bi-write2" onclick="pbprtAccdtExcelUpload()">등록</button> 
							<button type="button" class="btn basic bi-cancel" onclick="cancelPutPbprtAccdtPopup()">취소</button>
						</div>
					</div>							
				</div>
			</div>
		</div>
		<button type="button" class="popup-close" title="닫기" onclick="cancelPutPbprtAccdtPopup()"></button>				
	</div>
</body>
</html>