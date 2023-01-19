<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
datepicker();

$(document).ready(function(){
	$(".popup-panel .popup-bottom-toggle").click(function() {
		$(this).click(function(){
			$(this).parent().toggleClass("fold");
			if( $(this).parent().hasClass("fold") ){
				$(this).attr("title","펼치기");
			} else {			
				$(this).attr("title","접기");
			}
		});
	});
});
</script>
				<!-- 업무 > 공간정보활용 > 안전시설물관리 -->
					<div class="popup-header">안전시설물관리</div>
					<div class="popup-body">
						<div class="bottom-popup-body bottom-popup-group">						
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select name="" id="" class="form-select">
										<option value="">가로등관리</option>
										<option value="">CCTV관리</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="energyProperty" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="energySpace"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div class="tab-cont energyProperty on">
										<div class="srch-default">
											<table class="srch-tbl">
												<colgroup>
													<col style="width: 30%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">설치연도</th>
														<td>
															<select name="" id="" class="form-select">
																<option value="">전체</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">설치일자</th>
														<td><div class="datapicker-group"><input type="text" id="" name="" class="datepicker" value="2021-10-21" autocomplete="off"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="읍면동"></td>
													</tr>
													<tr>
														<td colspan="2"><input type="text" class="form-control" placeholder="도로구간번호"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
									<div class="tab-cont energySpace">
										<div class="space-search-group">
											<div class="space-search-items">
												<span class="form-radio text group">
													<span><input type="radio" name="test" id="rChk1-1" checked=""><label for="rChk1-1">현재화면영역</label></span>
													<span><input type="radio" name="test" id="rChk1-2"><label for="rChk1-2">사용자 정의</label></span>
												</span>
											</div>
											<div class="space-search-items">
												<span class="drawing-obj small">
													<span><input type="radio" name="areaDrawing" id="aChk1" checked="checked"><label for="aChk1" class="obj-sm01"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk2"><label for="aChk2" class="obj-sm02"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk3"><label for="aChk3" class="obj-sm03"></label></span>
													<span><input type="radio" name="areaDrawing" id="aChk4"><label for="aChk4" class="obj-sm04"></label></span>
												</span>
											</div>
											<div class="space-search-items">경계로부터 <span class="form-group"><input type="text" class="form-control align-center" placeholder="0"> <sub>m</sub></span> 이내 범위</div>
										</div>
										<div class="btn-wrap">
											<div><button type="button" class="btn type01 search">조회</button></div>
										</div>
									</div>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write" data-popup="work-01-04-regist">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 267px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
									<div class="bbs-default">
										<div class="bbs-list-head">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 7%;">
													<col style="width: auto;">
													<col style="width: 7%;">
													<col style="width: 7%;">
													<col style="width: 7%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 11%;">	
												</colgroup>
												<thead>
													<tr>
														<th scope="col">
															<span class="form-checkbox"><span><input type="checkbox" name="" id="chk-all"><label for="chk-all"></label></span></span>
														</th>
														<th scope="col">읍면동</th>
														<th scope="col">관리번호</th>
														<th scope="col">관리기관</th>
														<th scope="col">도로구간번호</th>
														<th scope="col">설치일자</th>
														<th scope="col">등기구모형</th>
														<th scope="col">등주형식</th>
														<th scope="col">등주재질</th>
														<th scope="col">광원종류</th>
														<th scope="col">등주높이 (m)</th>
														<th scope="col">암길이 (m)</th>
														<th scope="col">등기구수량</th>
														<th scope="col">담당자</th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="scroll-y">
											<table class="bbs-list">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 6%;">
													<col style="width: auto;">
													<col style="width: 7%;">
													<col style="width: auto;">
													<col style="width: 7%;">
													<col style="width: 7%;">
													<col style="width: 7%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 6%;">
													<col style="width: 11%;">				
												</colgroup>
												<tbody>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1" checked=""><label for="chk1"></label></span></span></td>
														<td>양근리</td>
														<td>2011310005</td>
														<td>양평군</td>
														<td>2018120016</td>
														<td>2012-09-20</td>
														<td>제송형 중형</td>
														<td>기존형</td>
														<td>강관</td>
														<td>수은램프</td>
														<td>8</td>
														<td>2</td>
														<td>1</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>양근리</td>
														<td>2011310005</td>
														<td>양평군</td>
														<td>2018120016</td>
														<td>2012-09-20</td>
														<td>제송형 중형</td>
														<td>기존형</td>
														<td>강관</td>
														<td>수은램프</td>
														<td>8</td>
														<td>2</td>
														<td>1</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>양근리</td>
														<td>2011310005</td>
														<td>양평군</td>
														<td>2018120016</td>
														<td>2012-09-20</td>
														<td>제송형 중형</td>
														<td>기존형</td>
														<td>강관</td>
														<td>수은램프</td>
														<td>8</td>
														<td>2</td>
														<td>1</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>양근리</td>
														<td>2011310005</td>
														<td>양평군</td>
														<td>2018120016</td>
														<td>2012-09-20</td>
														<td>제송형 중형</td>
														<td>기존형</td>
														<td>강관</td>
														<td>수은램프</td>
														<td>8</td>
														<td>2</td>
														<td>1</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
													<tr>
														<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
														<td>양근리</td>
														<td>2011310005</td>
														<td>양평군</td>
														<td>2018120016</td>
														<td>2012-09-20</td>
														<td>제송형 중형</td>
														<td>기존형</td>
														<td>강관</td>
														<td>수은램프</td>
														<td>8</td>
														<td>2</td>
														<td>1</td>
														<td class="align-left">국토토지조사과<br>홍길동 031-770-0000</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

									<div class="pagination">
										<a href="javascript:void(0);" class="first" title="처음"></a>
										<a href="javascript:void(0);" class="prev" title="이전"></a>
										<strong class="current">1</strong>
										<a href="javascript:void(0);">2</a>
										<a href="javascript:void(0);">3</a>
										<a href="javascript:void(0);">4</a>
										<a href="javascript:void(0);">5</a>
										<a href="javascript:void(0);" class="next" title="다음"></a>
										<a href="javascript:void(0);" class="last" title="마지막"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button type="button" class="manualBtn" title="도움말" onclick="manualTab('안전시설물관리')"></button>
					<button type="button" class="popup-close" title="닫기"></button>
					<button type="button" class="popup-reset" class="초기화"></button>
					<button type="button" class="popup-bottom-toggle" title="접기"></button>
				<!-- //업무 > 공간정보활용 > 안전시설물관리 -->