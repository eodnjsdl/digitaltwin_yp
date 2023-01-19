<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="administrationZone" staticJavascript="false" xhtml="true" cdata="false"/>
<script type="text/javascript">
$(document).ready(function(){	
	$(".territory-regist-body").closest(".popup-panel").find(".popup-close").click(function(){
		$(".lnb-territory .bi-write").removeClass("active");
	});
	
	$("#code1").on("change",function(){
		commonnessCodeList($("#code1").val(), "code2");
	});
});

var uploadFiles = [];
var dataIdx = 0;
var tmpCnt = 0;
var maxFileCnt = 3;

$(document).ready(function(){	
	var $drop = $("#dragArea");
	
	$drop.on("dragenter", function(e) { //드래그 요소가 들어왔을떄
		$(this).addClass("active");
	}).on("dragleave", function(e) { //드래그 요소가 나갔을때
		$(this).removeClass("active");
	}).on("dragover", function(e) {
		e.stopPropagation();
		e.preventDefault();
	}).on("drop", function(e) {
		e.preventDefault();
		$(this).removeClass("active");
		
		var files = e.originalEvent.dataTransfer.files;
		var fileTypes = ["xls", "xlsx"];
		var ext = getExtensionOfFilename(files[0].name);

		if(!fileTypes.includes(ext.toLowerCase())){			
			alert(ext + "의 파일은 업로드 할 수 없습니다.");
			return;
		}
		
		for(var i = 0; i < files.length; i++) {		
			if (uploadFiles.length > maxFileCnt) {
				alert("첨부파일은 최대 " + maxFileCnt + "개까지 업로드 가능합니다.");
				return;
			}else{
				if($("#dragArea .text").css("display") != "none"){ // 파일이 아직 등록안된 상태
					uploadFiles = [];					
				}
				uploadFiles.push(files[i]);
			}			
		}
	
		$("#uploadFiles").show();
		$("#dragArea .text").hide();
		tmpCnt = uploadFiles.length;
		writeHtml();
	});
});

$(function() {
	progressbar = $( ".progressbar" ),
	progressLabel = $( ".progress-label" );

	progressbar.progressbar({
	value: 0,
		change: function() {
			progressLabel.text( progressbar.progressbar( "value" ) + "%" );
		}
	});
});

function removeFile(idx){
	uploadFiles.splice(idx, 1);
	tmpCnt --;

	writeHtml();
	if(tmpCnt == 0){
		$("#uploadFiles").hide();
		$("#dragArea .text").show();
	}	
}

function writeHtml() {
	var html = "";

	for (var i = 0; i<tmpCnt; i++) {
		var file = uploadFiles[i];
		html += "<tr>";
		html += "<th>" + (i+1) + "</th>";
		html += "<td>" + file.name + "</td>";
		html += "<td>" + numberWithCommas(file.size) + " KB</td>";
		html += "<td>" + file.type + "</td>";
		html += "<td><button type=\"button\" data-idx=\"" + (i) + "\" class=\"removeFile\" title=\"삭제\" onClick=\"removeFile(" + (i) + ")\"><img src=\"/images/icon/icon-symbol-delete.svg\" alt=\"\"></button></td>";
		html += "</tr>";
	}
	
	$("#uploadFiles > table > tbody").html(html);
}

function fn_insert_administrationZone(form){
	
	if (!validateAdministrationZone(form)) {	
		return false;
	} else {
		
		var isUpload = false;
		var formData = new FormData(form);
		
		$.each(uploadFiles, function(i, file) {		
			if(file.upload != "disable"){
				formData.append("upload-file"+i, file, file.name);
			}
		});
		
		for (var pair of formData.entries()) {
			if(pair[0].search("upload-file") != -1){
				isUpload = true;
			}
		}

		
		if(!isUpload){
			alert("등록할 파일을 드래그해주세요.");
			return;
		}
		
		if(confirm("<spring:message code="common.regist.msg" />")){
			$.ajax({
				type : "POST",
				url: "/geo/emi/insertAdministrationZone.do",
				data : formData,
				dataType : "html",
				processData : false,
				contentType : false,
				xhr: function() { //XMLHttpRequest 재정의 가능
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.onprogress = function(e) { //progress 이벤트 리스너 추가
						var percent = e.loaded * 100 / e.total;
						$(".progressbar-value").css("width",parseInt(percent)+"%");
						$(".progress-label").html(parseInt(percent)+"%");
						if(percent == "100"){
							loadingShowHide("show"); 
						}
					};
					return xhr;
				},
				success : function(returnData, status) {
					if(status == "success") {
						if(!removeLine(returnData) == "ok"){
							alert("<spring:message code="success.common.insert" />");
							$(".popup-left").removeClass("opened").html("");
							aj_selectAdministrationZoneList($("#searchForm")[0]);
						}else{
							alert("<spring:message code="fail.common.insert" />");
						}
					}else{
						alert("ERROR!");
						return;
					}
				}, complete : function(){
					loadingShowHide("hide"); 
				}
			});
		}
	}
}
</script>
				<!-- 국토정보관리 > 등록하기 -->
					<div class="popup-header">국토정보관리 등록하기</div>
					<div class="popup-body">
						<div class="left-popup-body territory-regist-body">						
							<form:form commandName="administrationZone" method="post">
							<form:hidden path="gubun" value="examinationInfo"/>
							<div class="data-default">
								<table class="data-write">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">읍면리</th>
											<td>
												<div class="form-row">
													<div class="col-auto">
														<form:select path="code1" cssClass="form-select">
															<form:option value="" label="읍면선택" />
															<form:options items="${code1List}" itemValue="code" itemLabel="codeNm" />
														</form:select>
													</div>
													<div class="col-auto">
														<form:select path="code2" cssClass="form-select">
															<form:option value="" label="리선택" />
														</form:select>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">데이터업로드</th>
											<td>
												<div id="dragArea" class="file-drop">
													<div class="text">
														등록할 파일을 <strong>드래그앤드롭</strong>으로 이동하세요 <br>
														(xls, xlsx)														
													</div>	
													<div id="uploadFiles" class="dataUpload-default" style="display: none;">
														<table class="dataUpload-list">
															<colgroup>
																<col style="width: 40px;">
																<col style="width: auto;">
																<col style="width: auto;">
																<col style="width: auto;">
																<col style="width: 50px;">
															</colgroup>
															<thead>
																<tr>
																	<th scope="col"></th>
																	<th scope="col">이름</th>
																	<th scope="col">크기</th>
																	<th scope="col">타입</th>
																	<th scope="col">삭제</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">진행율</th>
											<td>
												<div class="progressbar-group">														
													<div class="progressbar">
														<div class="progressbar-value" style="width: 0%;"></div>
													</div>
													<div class="progress-label">0%</div>
												</div>
											</td>
										</tr>									
									</tbody>
								</table>
							</div>
							<div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-write2" onClick="fn_insert_administrationZone(this.form)">등록</button></div></div>
							</form:form>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-left-toggle" title="접기"></button>
				<!-- //국토정보관리 > 등록하기 -->