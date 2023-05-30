<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
#csvColumnHeader label {
	margin-right: 10px;
}
</style>
<div class="popup-header">행정자산관리 등록</div>
		<div class="popup-body">
			<div class="sub-popup-body">
				<div class="data-write-wrap" style="height: 100%;">
					<div class="scroll-y" style="height: 100%;">
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
											<select name="csvYear" class="form-select" >
												<option>2023</option>
												<option>2022</option>
												<option>2021</option>
												<option>2020</option>
											</select>
										</td>
									</tr>
									<tr>
										<th scope="row">데이터업로드</th>
										<td>
											<div id="dragArea" class="file-drop" style="height: 120px;position: inherit;">
												<div class="text" id="clickUpload">
													등록할 CSV 파일을 <strong>드래그앤드롭</strong>으로 이동하거나 클릭하세요<br>
												</div>	
												<input type="file" id="fileUploadClick" style="display: none;" accept=".csv" onchange="fileDragAndDrop(this.files)"/>
												<div id="uploadFiles" class="dataUpload-default" style="display: none;">
													<table class="dataUpload-list">
														<colgroup>
															<col style="width: 50%;">
															<col style="width: auto;">
															<col style="width: auto;">
														</colgroup>
														<thead>
															<tr>
																<th scope="col">파일이름</th>
																<th scope="col">크기</th>
																<th scope="col">타입</th>
															</tr>
														</thead>
														<tbody id="fileInfo">
														</tbody>
													</table>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">데이터명</th>
										<td><input type="text" name="csvName" id="csvName" class="form-control"></td>
									</tr>
									<tr class="csvOption hide">
										<th scope="row">항목</th>
										<td>
											<span id="csvColumnHeader" class="form-checkbox text group">
											</span>
										</td>
									</tr>
									<tr class="csvOption hide">
										<th scope="row">인코딩</th>
										<td>EUC-KR</td>
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