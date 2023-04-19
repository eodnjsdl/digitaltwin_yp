<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

				<!-- top > 지적/건물 -->
					<div class="popup-header">지적/건물</div>
					<div class="popup-body">

						<div class="tool-popup-body tool-building-body ldbdList">
							<div class="bbs-list-num" id="totalcount">검색결과 <strong>0</strong>건</div>
							<div class="building-list-group">
								<div class="building-list-item">
									<div class="scroll-y">
										<ul class="building-list">
<%--											<li><p class="tit" id="jijukcount"></p>--%>
<%--											<span id="jijuk"></span>--%>
<%--													<li><a href="javascript:void(0);" class="active">409-9</a></li>--%>


<%--											<li><p class="tit" id="buildcount"></p>--%>
<%--												<span id="build"></span>--%>


<%--											</li>--%>
										</ul>
									</div>
								</div>

								<div class="building-data-item">
									<div class="data-default">
										<table class="data-list">
											<colgroup>
												<col style="width: 50%;">
												<col style="width: 50%;">
											</colgroup>
											<thead>
												<tr>
													<th scope="col">항목</th>
													<th scope="col">속성값</th>
												</tr>
											</thead>										
										</table>
										<div class="scroll-y">
											<table class="data-list">
												<colgroup>
													<col style="width: 50%;">
													<col style="width: 50%;">
												</colgroup>
												<tbody id="build_item">

												</tbody>
											</table>
										</div>										
									</div>
								</div>
							</div>

							<div class="position-bottom btn-wrap">
								<div><button type="button" class="btn basic bi-location2">위치이동</button></div>
							</div>
						</div>

					</div>
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('지적/건물')"></button>
					<button type="button" class="popup-close" title="닫기" onclick="dtmap.vector.clear();"></button>
				<!-- //top > 지적/건물 -->