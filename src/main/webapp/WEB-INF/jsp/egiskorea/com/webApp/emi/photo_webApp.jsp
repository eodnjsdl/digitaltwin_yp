<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
$(document).ready(function () {
	readFilePhotoInfoView();
});

function readFilePhotoInfoView() {
    $('#distantFile').on('change', function(e) {
        $("#distantFile-name").val($("#distantFile").val());
    });
    
    $('#nearFile').on('change', function(e) {
        $("#nearFile-name").val($("#nearFile").val());
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
							<div id="distantArea" class="file-photo">
								<div id="selectDistant" class="select-file">
									<input type="file" id="distantFile" multiple accept=".png, .jpg, .jpeg">
									<input id="distantFile-name" class="file-name" value="파일선택">
									<label for="distantFile">파일찾기</label>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th scope="row">근경</th>
					</tr>
					<tr>
						<td>
							<div id="nearArea" class="file-photo">
								<div id="selectNear" class="select-file">
									<input type="file" id="nearFile" multiple accept=".png, .jpg, .jpeg">
									<input id="nearFile-name" class="file-name" value="파일선택">
									<label for="nearFile">파일찾기</label>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div
		class="position-bottom btn-wrap justify-content-end examinationBtn">
		<button type="button" class="btn basic bi-save" style="margin: 0 3px;"
			onClick="fn_update_examinationInfo(this.form)">수정</button>
		<button type="button" class="btn basic bi-cancel"
			style="margin: 0 3px;"
			onclick="webApp_fn_cancel_examinationInfo(this.form)">취소</button>
	</div>
</div>