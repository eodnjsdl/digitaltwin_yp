<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
$(document).ready(function() {
	readPhotoInfoView();
	
	// 이미지 보이게
	var ldstcPhotoAtflId = "<c:out value='${examinationInfo.ldstcPhotoAtflId}'/>";
	var accdPhotoAtflId = "<c:out value='${examinationInfo.accdPhotoAtflId}'/>";
	
	if (ldstcPhotoAtflId != "") {
		$("#ldstcArea img").attr("src", "<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value='${examinationInfo.ldstcPhotoAtflId}'/>");
	}
	if (accdPhotoAtflId != "") {
		$("#accdArea img").attr("src", "<c:url value='/cmm/fms/getImage.do'/>?atchFileId=<c:out value='${examinationInfo.accdPhotoAtflId}'/>");
	}
});

function readPhotoInfoView() {
	$('#ldstcFile').on('change', function() {
		var ldstc = document.getElementById('ldstcFile');
		
		if (ldstc.files && ldstc.files[0]) {
			$("#ldstcFile-name").text(ldstc.files[0].name);
			
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#ldstcArea img').attr('src', e.target.result);
			};
			reader.readAsDataURL(ldstc.files[0]);
		}
	});

	$('#accdFile').on('change', function(e) {
		var accd = document.getElementById('accdFile');
		
		if (accd.files && accd.files[0]) {
			$("#accdFile-name").text(accd.files[0].name);
			
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#accdArea img').attr('src', e.target.result);
			};
			reader.readAsDataURL(accd.files[0]);
		}
	});
}

</script>
<!-- 사진 -->
<div class="tab-cont proTab06">
	<div class="scroll-y">
		<div class="data-default">
			<table class="data-write">
				<tbody>
					<tr>
						<th scope="row">원경</th>
					</tr>
					<tr>
						<td>
							<div id="ldstcArea" class="select-file">
								<input type="file" id="ldstcFile" name="ldstcFile" multiple accept=".png, .jpg, .jpeg" />
								<label for="ldstcFile" class="select-label">
									<span id="ldstcFile-name" class="file-name">${ldstcFileResult[0].orignlFileNm}</span>
									<span class="selectBtn">사진 등록</span>
								</label>
								<img src="" width="500 "/>
								<input type="hidden" name="ldstcPhotoAtflId" value="<c:out value='${examinationInfo.ldstcPhotoAtflId}'/>" />
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">근경</th>
					</tr>
					<tr>
						<td>
							<div id="accdArea" class="select-file">
								<input type="file" id="accdFile" name="accdFile" multiple accept=".png, .jpg, .jpeg" />
								<label for="accdFile" class="select-label">
									<span id="accdFile-name" class="file-name">${accdFileResult[0].orignlFileNm}</span>
									<span class="selectBtn">사진 등록</span>
								</label>
								<img src="" width="500 "/>
								<input type="hidden" name="accdPhotoAtflId" value="<c:out value='${examinationInfo.accdPhotoAtflId}'/>" />
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