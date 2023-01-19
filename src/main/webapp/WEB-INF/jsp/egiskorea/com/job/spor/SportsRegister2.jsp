<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script>
//'지도에서 선택' 버튼
$("#mapSelectBtn").unbind('click').bind('click',function(){
	cmmUtil.getPositionGeom(positionCallback);
});
</script>
<body>

				<!-- 업무 > 시설관리 > 체육시설 > 등록하기 -->
				<div class="popup-panel popup-sub work-02-04-regist" style="bottom: 398px;right: 70px;width: 550px;height: 459px;">
					<div class="popup-header">체육시설정보 등록하기</div>
					<div class="popup-body">
						<div class="sub-popup-body">
							<div class="tabBoxDepth3-wrap">
								<div class="tabBoxDepth3">
									<ul>
										<li data-tab="sportsFacility01" class="on"><button type="button" class="inner-tab">기본정보</button></li>
										<li data-tab="sportsFacility02"><button type="button" class="inner-tab">운영정보</button></li>
										<li data-tab="sportsFacility03"><button type="button" class="inner-tab">시설정보</button></li>
										<li data-tab="sportsFacility04"><button type="button" class="inner-tab">공간정보</button></li>
									</ul>
								</div>
								
								<div class="tab-cont sportsFacility01 on">
									<div class="scroll-y" style="height: 100%;">
										<div class="data-default">
											<table class="data-write">
												<colgroup>
													<col style="width: 23%;">
													<col style="width: auto;">
													<col style="width: 23%;">
													<col style="width: auto;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">시설명</th>
														<td colspan="3"><input type="text" class="form-control sporInput"></td>												
													</tr>
													<tr>
														<th scope="row">주소</th>
														<td colspan="3">
															<div class="form-row">
																<div class="col"><input type="text" class="form-control sporInput" id="spor-lnm-adres"></div>
																<div class="col" style="display: none;"><input type="text" name="adres" class="form-control sporInput" disabled></div> 
<!-- 																<div class="col-auto"><button type="button" class="btn type01 bi-location">지도에서 선택</button></div> -->
																	<div class="col-auto"><button type="button" class="btn type01 bi-location" id="mapSelectBtn">지도에서 선택</button></div>
																	<input type="hidden" name="geom" id="geom">
															</div>
														</td>												
													</tr>
													<tr>
														<th scope="row">시설유형</th>
														<td>
															<select name="fclty_ty" id="fclty_ty" class="form-select">
																<option value="체육시설">체육시설</option>
															</select>
														</td>
														<th scope="row">운영방식</th>
														<td>
															<select name="oper_mthd" id="oper_mthd" class="form-select">
																<option value="위탁">위탁</option>
															</select>
														</td>
													</tr>
													<tr>
														<th scope="row">건립비용(백만원)</th>
														<td><input type="number" class="form-control align-left sporInput"></td>
														<th scope="row">건립일</th>
														<td><div class="datapicker-group"><input type="text" class="datepicker"></div></td>
													</tr>
													<tr>
														<th scope="row">건물면적(㎡)</th>
														<td><input type="number" class="form-control align-left sporInput"></td>
														<th scope="row">토지면적(㎡)</th>
														<td><input type="number" class="form-control align-left sporInput"></td>
													</tr>
													<tr>
														<th scope="row">관리인원(명)</th>
														<td><input type="number" class="form-control align-left sporInput"></td>
														<th scope="row">연간이용인원(명)</th>
														<td><input type="number" class="form-control align-left sporInput"></td>
													</tr>											
													<tr>
														<th scope="row">담당자</th>
														<td colspan="3">
															<div class="form-row">
																<div class="col">
																	<select name="" id="" class="form-select">
																		<option value="">국토토지과</option>
																	</select>
																</div>
																<div class="col"><input type="text" class="form-control sporInput" placeholder="이름"></div>
																<div class="col"><input type="text" class="form-control sporInput" placeholder="전화번호"></div>
															</div>
														</td>
													</tr>
													<tr>
														<th scope="row">시설물개요</th>
														<td colspan="3"><input type="text" class="form-control sporInput"></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									<div class="position-bottom btn-wrap">
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								
								
								<!-- 운영정보 -->
								<div class="tab-cont sportsFacility02">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">운영연도</th>
													<td>
														<select name="" id="" class="form-select">
															<option value="">2021</option>
														</select>
													</td>
													<th scope="row">취득가액</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
												<tr>
													<th scope="row">감가상각액</th>
													<td><input type="text" class="form-control align-right"></td>
													<th scope="row">감가상각누계액</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
												<tr>
													<th scope="row">장부가액</th>
													<td><input type="text" class="form-control align-right"></td>
													<th scope="row">내용연수</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
												<tr>
													<th scope="row">운영비용</th>
													<td><input type="text" class="form-control align-right"></td>
													<th scope="row">운영수익</th>
													<td><input type="text" class="form-control align-right"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="data-list-wrap marT10" style="height: 124px;">
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 10%;">
													<col style="width: 15%;">
													<col style="width: auto;">
													<col style="width: 15%;">
													<col style="width: 15%;">
													<col style="width: 15%;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></th>
														<th scope="col">연도</th>
														<th scope="col">감가상각액</th>
														<th scope="col">감가상각 누계액</th>
														<th scope="col">장부가액</th>
														<th scope="col">비용</th>
														<th scope="col">수익</th>
													</tr>
												</thead>												
											</table>
											<div class="scroll-y">
												<table class="data-list tbl-all-center">
													<colgroup>
														<col style="width: 36px;">
														<col style="width: 10%;">
														<col style="width: 15%;">
														<col style="width: auto;">
														<col style="width: 15%;">
														<col style="width: 15%;">
														<col style="width: 15%;">
													</colgroup>
													<tbody>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>2021</td>
															<td>6</td>
															<td>6</td>
															<td>4,413</td>
															<td>1,103</td>
															<td>585</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>2021</td>
															<td>6</td>
															<td>6</td>
															<td>4,413</td>
															<td>1,103</td>
															<td>585</td>
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
									
									<div class="position-bottom btn-wrap">
										<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								<!-- //운영정보 -->

								<!-- 시설정보 -->
								<div class="tab-cont sportsFacility03">
									<div class="data-default">
										<table class="data-write">
											<colgroup>
												<col style="width: 23%;">
												<col style="width: auto;">
												<col style="width: 23%;">
												<col style="width: auto;">
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">시설명</th>
													<td colspan="3"><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">운영시간</th>
													<td colspan="3">
														<div class="form-row">
															<div class="col-auto">
																<select name="" id="" class="form-select">
																	<option value="">05 시</option>
																</select>
															</div>
															<div class="col-auto">~</div>
															<div class="col-auto">
																<select name="" id="" class="form-select">
																	<option value="">24 시</option>
																</select>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<th scope="row">예약여부</th>
													<td>
														<span class="form-radio text group">
															<span><input type="radio" name="test" id="" checked=""><label for="">Y</label></span>
															<span><input type="radio" name="test" id=""><label for="">N</label></span>
														</span>
													</td>
													<th scope="row">층(호)수</th>
													<td><input type="text" class="form-control"></td>
												</tr>
												<tr>
													<th scope="row">시설설명</th>
													<td colspan="3"><input type="text" class="form-control"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="data-list-wrap marT10" style="height: 124px;">
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 7%;">
													<col style="width: 15%;">											
													<col style="width: 15%;">
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></th>
														<th scope="col">No</th>
														<th scope="col">시설명</th>
														<th scope="col">운영시간</th>
														<th scope="col">예약여부</th>
														<th scope="col">층(호)수</th>
														<th scope="col">시설설명</th>
													</tr>
												</thead>
											</table>
											<div class="scroll-y">
												<table class="data-list tbl-all-center">
													<colgroup>
														<col style="width: 36px;">
														<col style="width: 7%;">
														<col style="width: 15%;">											
														<col style="width: 15%;">
														<col style="width: 13%;">
														<col style="width: 13%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
										<div class="pagination marT5">
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
									
									<div class="position-bottom btn-wrap">
										<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
									</div>
								</div>
								<!-- //시설정보 -->

								<!-- 공간정보 -->
								<div class="tab-cont sportsFacility04">
									<div class="data-list-wrap" style="height: 100%;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
										<div class="data-default">
											<table class="data-list tbl-all-center">
												<colgroup>
													<col style="width: 36px;">
													<col style="width: 7%;">
													<col style="width: 15%;">											
													<col style="width: 15%;">
													<col style="width: 13%;">
													<col style="width: 13%;">
													<col style="width: auto;">
												</colgroup>
												<thead>
													<tr>
														<th scope="col"><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></th>
														<th scope="col">No</th>
														<th scope="col">시설명</th>
														<th scope="col">운영시간</th>
														<th scope="col">예약여부</th>
														<th scope="col">층(호)수</th>
														<th scope="col">시설설명</th>
													</tr>
												</thead>
											</table>
											<div class="scroll-y">
												<table class="data-list tbl-all-center">
													<colgroup>
														<col style="width: 36px;">
														<col style="width: 7%;">
														<col style="width: 15%;">											
														<col style="width: 15%;">
														<col style="width: 13%;">
														<col style="width: 13%;">
														<col style="width: auto;">
													</colgroup>
													<tbody>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
														</tr>
														<tr>
															<td><span class="form-checkbox"><span><input type="checkbox" name="" id="chk1"><label for="chk1"></label></span></span></td>
															<td>4</td>
															<td>주 경기장</td>
															<td>05시 ~ 24시</td>
															<td>Y</td>
															<td>1층</td>
															<td class="align-left">천연잔디, 육상트랙, 관람석(5608석), 트랙 내 애완견</td>
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
									<!-- <div class="position-bottom btn-wrap">
										<div class="position-absolute left"><button type="button" class="btn basic bi-delete2">선택삭제</button></div>
										<div><button type="button" class="btn basic bi-write2">등록</button> <button type="button" class="btn basic bi-cancel">취소</button></div>
										
									</div> -->	
									
									<div>
										<button type="button" class="btn basic bi-edit" id="lampUpdate" onclick="updateSportsView('<c:out value="${result.gid}"></c:out>')">수정</button> 
										<button type="button" class="btn basic bi-delete2" id ="deleteSports" onclick="deleteSports('<c:out value="${result.gid}"></c:out>')">삭제</button>
										<button type="button" class="btn basic bi-cancel">취소</button>
									</div>
								</div>
								<!-- //공간정보 -->
								
							</div>
						</div>
					</div>
					<button type="button" class="popup-close" title="닫기"></button>				
				</div>
				<!-- //업무 > 시설관리 > 체육시설 > 등록하기 -->
			
</body>
</html>