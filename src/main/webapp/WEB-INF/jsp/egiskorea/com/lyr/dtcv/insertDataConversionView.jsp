<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="mapsData" staticJavascript="false" xhtml="true" cdata="false"/>
<script>
var uploadFiles = [];
var dataIdx = 0;
var tmpCnt = 0;
var maxFileCnt = 3;
var ext = "";

$(document).ready(function(){
	//symbol 클릭 시 active
	$(".symbol-group button" ).on("click", function(){
		$(this).addClass("active").siblings().removeClass('active');
	});	
	
	$(".colorPicker").minicolors({
		control:'hue',
		defaultValue:'#000000',
		format:'hex',
		theme: 'default',
		opacity: false,
		swatches: [],
		change : function(hex){
			$("#poiColor").val(hex);
			$("#poiType1").prop("checked", true);
			$(".symbol-group button").removeClass("active");
		}
	});
	
	$("input[name='poiType']").on("click", function(){
		if($(this).val() == "0"){
			$(".symbol-group button").removeClass("active");
			$("#poiIndex").val();
		}
	});
	
	$(".poiImage").on("click", function(){
		$("#poiColor").val("");
		$("#poiIndex").val($(this).data("poi"));
		$("#poiType2").prop("checked", true);
	});
	
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
// 		var fileTypes = ["csv", "shp", "prj", "shx", "dbf", "qpj", "sbx", "cpg", "tif", "twf", "tfw", "img", "3ds", "las", "laz"];
		var fileTypes = ["csv", "tif", "img"];
		ext = getExtensionOfFilename(files[0].name);

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
		
		if(ext.toLowerCase() == "csv"){			
			var html = "";
			var header = "";			
			var file = uploadFiles[0];
			
			$("#dataName").val(file.name.replace("." + ext, ""));
			
			$(".csvOption").removeClass("hide");
			$(".imgOption").addClass("hide");
			
			const fileReader = new FileReader();

			fileReader.readAsText(file, "EUC-KR");

			fileReader.onload = function() {
				const dataset = fileReader.result;
				
				const result = dataset.split('\n').map(data => data.split(','));
				
				for(var j = 0; j < result[0].length; j++){
					if(result[0][j] == "위도"){
						$("#colY").val(j);
					}else if(result[0][j] == "경도"){
						$("#colX").val(j);					
					}
					header += "<span><input type=\"radio\" name=\"colLabel\" id=\"rChk" + j + "\" value=\"" + j + "\"><label for=\"rChk" + j + "\">" + result[0][j] + "</label></span>";
					
				}
				
				var x = $("#colX").val();
				var y = $("#colY").val();
				var minx = miny = maxx = maxy = "";
				
				for(var j = 1; j < result.length; j++){	
					miny = miny == "" ? miny = result[j][y] : (miny > result[j][y] ? result[j][y] : miny);
					minx = minx == "" ? minx = result[j][x] : (minx > result[j][x] ? result[j][x] : minx);
					
					maxy = maxy == "" ? maxy = result[j][y] : (maxy < result[j][y] ? result[j][y] : maxy);
					maxx = maxx == "" ? maxx = result[j][x] : (maxx < result[j][x] ? result[j][x] : maxx);
				}
				
				$("#dataType").val("C");
				$("#minx").val(minx);
				$("#miny").val(miny);
				$("#maxx").val(maxx);
				$("#maxy").val(maxy);
				
				$("#width").val(0);
				$("#height").val(0);
				$("#centerX").val(0);
				$("#centerY").val(0);
				$("#bands").val(0);
				
				$("#csvColumnHeader").html(header);
			};
			
		}else if(ext.toLowerCase() == "tif" || ext.toLowerCase() == "img"){
			
			$(".csvOption").addClass("hide");
			$(".imgOption").removeClass("hide");
			
			var form = $("#imageAttrFrm")[0];
			var formData = new FormData(form);
			
			$.each(uploadFiles, function(i, file) {		
				if(file.upload != "disable"){
					formData.append("upload-file", file, file.name);
				}
			});
			
			loadingShowHide("show");
			
			$.ajax({
				type : "POST",
				url: "/lyr/dtcv/getImageInfo.do",
				data : formData,
				processData : false,
				contentType : false,
				dataType : "json",
				success : function(returnData, status) {
					if(status == "success") {
						console.log(returnData.result);
						$("#dataType").val(returnData.result.dataType);
						$("#minx").val(returnData.result.minx);
						$("#miny").val(returnData.result.miny);
						$("#maxx").val(returnData.result.maxx);
						$("#maxy").val(returnData.result.maxy);
						$("#bands").val(returnData.result.bands);
						$("#width").val(returnData.result.width);
						$("#height").val(returnData.result.height);
						
						$("#bandsValue").html(returnData.result.bands);
						if(returnData.result.minx != ""){
							$("#minValue").html(returnData.result.minx + ", " + returnData.result.miny)
						}
						if(returnData.result.maxx != ""){
							$("#maxValue").html(returnData.result.maxx + ", " + returnData.result.maxy)
						}
						
						$("#widthValue").html(returnData.result.width);
						$("#heightValue").html(returnData.result.height);
						
						$(".imgOption").removeClass("hide");
						
					}else{
						alert("ERROR!");
						return;
					}
				}, complete : function(){
					loadingShowHide("hide"); 
				}
			});
		}
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
		$("#dataName").val("");
		$("#uploadFiles").hide();
		$("#dragArea .text").show();
		$(".csvOption").addClass("hide");
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

function fn_insert_DataConversion(form){
	
	if (!validateMapsData(form)) {	
		return false;
	} else {
				
		if(ext.toLowerCase() == "csv"){	
			$("#coordEpsg").val("EPSG:4326");
			if($('input[name="colLabel"]:checked').val() == undefined){
				alert("항목 컬럼(은)는 필수 입력값입니다.");
				return false;
			}else if($('input[name="poiType"]:checked').val() == undefined){
				alert("POI 종류(은)는 필수 입력값입니다.");
				return false;
			}
			
			if($('input[name="poiType"]:checked').val() == "0" && $("#poiColor").val() == ""){
				$("#poiColor").val("#000000");
			}
			
			if($('input[name="poiType"]:checked').val() == "1"){
				if($("#poiIndex").val() == ""){
					alert("POI 이미지 종류(은)는 필수 입력값입니다.");
					return false;
				}
			}
		}
		
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
				url: "/lyr/dtcv/insertDataConversion.do",
				data : formData,
				dataType : "json",
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
						if(returnData.resultMsg == "success") {
							alert("<spring:message code="success.common.insert" />");
							if(ext.toLowerCase() == "csv"){
								csvInterval = setInterval(function(){
									console.log(returnData);
									console.log(returnData.dataid);
									console.log($("#ctgrCd").val());
				                    $.ajax({
				                        url:'/lyr/dtcv/selectCsvProgress.do',
				                        type:"POST",
				                        data : {
				                        	"dataid" : returnData.dataid,
				                        	"lyrCl" : $("#ctgrCd").val(),
				                        	"shareYn" : $("#shareYn").val()
				                        },
				                        dataType:'json',
				                        success:function(result){
				                        	console.log(result.percent.progress);
				                        	if(result.percent.progress == "100"){
				                                clearInterval(csvInterval);
				                                leftPopupOpen("layerManagement");
				                            }				                            
				                        }
				                    })
				                },3000)
							}
						}else{
							$(".progressbar-value").css("width","0%");
							$(".progress-label").html("0%");
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
					<div class="popup-header">레이어관리</div>
					<div class="popup-body">
						<form:form commandName="mapsData" method="post">
						<form:hidden path="dataid"/>					
						<form:hidden path="dataType"/>					
						<form:hidden path="colX"/>					
						<form:hidden path="colY"/>	
						<form:hidden path="isShapeHeight"/>											
						<form:hidden path="minx"/>					
						<form:hidden path="miny"/>					
						<form:hidden path="maxx"/>					
						<form:hidden path="maxy"/>					
						<form:hidden path="width"/>					
						<form:hidden path="height"/>					
						<form:hidden path="centerX"/>					
						<form:hidden path="centerY"/>					
						<form:hidden path="bands"/>					
						<form:hidden path="coordEpsg"/>					
						<form:hidden path="poiIndex"/>					
						<form:hidden path="poiColor"/>					
						<div class="left-popup-body layerMng-body">						
							<div class="tabBoxDepth1-wrap">
								<div class="tabBoxDepth1">
									<ul>
										<li><button type="button" id="layerManagement" class="inner-tab leftPopup" data-popup="left-layer-mng">목록관리</button></li>
										<li class="on"><button type="button" id="dataConversion" class="inner-tab leftPopup" data-popup="left-layer-mng">등록관리</button></li>
									</ul>
								</div>
								<!-- 등록관리 -->		
								<div class="tab-cont layerRegistMng on">
									<div class="scroll-y">
										<div class="data-default">
											<table class="data-write">
												<colgroup>
													<col style="width: 20%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">분류</th>
														<td>
															<form:select path="ctgrCd" cssClass="form-select w-50p">
																<form:option value="" label="레이어 분류" />
																<form:options items="${ctgrList}" itemValue="code" itemLabel="codeNm" />
															</form:select>
														</td>
													</tr>
													<tr class="hide">
														<th scope="row">데이터공유</th>
														<td>
															<select name="" id="" class="form-select w-50p">
																<option value="">전체공유</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">데이터명</th>
														<td><form:input path="dataName" cssClass="form-control"/></td>
													</tr>											
													<tr>
														<th scope="row">데이터업로드</th>
														<td>
															<div id="dragArea" class="file-drop">
																<div class="text">
																	등록할 파일을 <strong>드래그앤드롭</strong>으로 이동하세요 <br>
																	(ESRI shape, CSV, 정사영상(tif, img),DEM(dem), Lidar(las)														
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
													<tr class="imgOption hide">
														<th scope="row">좌표계</th>
														<td>
															<form:select path="coordType" cssClass="form-select w-50p">
																<form:option value="" label="좌표계" />
																<form:options items="${epsgList}" itemValue="code" itemLabel="codeNm" />
															</form:select>
														</td>
													</tr>
													<tr class="imgOption hide">
														<th scope="row">BAND</th>
														<td id="bandsValue"></td>
													</tr>
													<tr class="imgOption hide">
														<th scope="row">MIN</th>
														<td id="minValue"></td>
													</tr>
													<tr class="imgOption hide">
														<th scope="row">MAX</th>
														<td id="maxValue"></td>
													</tr>
													<tr class="imgOption hide">
														<th scope="row">WIDTH</th>
														<td id="widthValue"></td>
													</tr>
													<tr class="imgOption hide">
														<th scope="row">HEIGHT</th>
														<td id="heightValue"></td>
													</tr>													
													<tr class="csvOption hide">
														<th scope="row">항목</th>
														<td>
															<span id="csvColumnHeader" class="form-radio text group">
															</span>
														</td>
													</tr>
													<tr class="csvOption hide">
														<th scope="row">색상 or POI</th>
														<td>
															<div class="form-row marB5">
																<div class="col-auto"><span class="form-radio text"><span><form:radiobutton path="poiType" value="0" label="색상"/></span></span></div>
																<div class="col"><input type="text" class="colorPicker"></div>
															</div>													
															<span class="form-radio text"><span><form:radiobutton path="poiType" value="1" label="POI 이미지"/></span></span>
															<div class="symbol-group">
																<button type="button" class="poiImage" data-poi="1"><img src="/images/symbol/1_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="2"><img src="/images/symbol/2_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="3"><img src="/images/symbol/3_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="4"><img src="/images/symbol/4_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="5"><img src="/images/symbol/5_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="6"><img src="/images/symbol/6_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="7"><img src="/images/symbol/7_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="8"><img src="/images/symbol/8_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="9"><img src="/images/symbol/9_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="10"><img src="/images/symbol/10_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="11"><img src="/images/symbol/11_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="12"><img src="/images/symbol/12_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="13"><img src="/images/symbol/13_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="14"><img src="/images/symbol/14_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="15"><img src="/images/symbol/15_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="16"><img src="/images/symbol/16_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="17"><img src="/images/symbol/17_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="18"><img src="/images/symbol/18_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="19"><img src="/images/symbol/19_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="20"><img src="/images/symbol/20_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="21"><img src="/images/symbol/21_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="22"><img src="/images/symbol/22_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="23"><img src="/images/symbol/23_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="24"><img src="/images/symbol/24_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="25"><img src="/images/symbol/25_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="26"><img src="/images/symbol/26_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="27"><img src="/images/symbol/27_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="28"><img src="/images/symbol/28_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="29"><img src="/images/symbol/29_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="30"><img src="/images/symbol/30_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="31"><img src="/images/symbol/31_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="32"><img src="/images/symbol/32_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="33"><img src="/images/symbol/33_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="34"><img src="/images/symbol/34_s.png" alt=""></button>
																<button type="button" class="poiImage" data-poi="35"><img src="/images/symbol/35_s.png" alt=""></button>
															</div>
														</td>
													</tr>
													<tr class="csvOption hide">
														<th scope="row">인코딩</th>
														<td>
															<form:select path="dataEncoding" cssClass="form-select w-50p">
																<form:options items="${dtecList}" itemValue="code" itemLabel="codeNm" />
															</form:select>
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
									</div>
									<div class="position-bottom btn-wrap"><div><button type="button" class="btn basic bi-write2" onClick="fn_insert_DataConversion(this.form)">등록</button></div></div>
								</div>
								<!-- //등록관리 -->
							</div>
						</div>
						</form:form>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-left-toggle" title="접기"></button>						