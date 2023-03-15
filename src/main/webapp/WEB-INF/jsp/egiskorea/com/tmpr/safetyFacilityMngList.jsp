<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
$(document).ready(function(){
// 	onOffLayer3D(storageId + ":criminal_zone_3857", true);
	showSafetyFacility("cctv");
	
	$("#facilityType").on("change",function(){
		showSafetyFacility($(this).val());
	});
	
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

bottomPopupOpen("safetyFacilityMng");
ui.callDatePicker();

// 안전시설 가시화
function showSafetyFacility(type){
	var layerList = new Module.JSLayerList(false);
	
	initSafeFacility();
	
	switch(type){
		case "cctv":
			var layer = layerList.nameAtLayer(storageId + ":test");		
			
			if(layer != null){
				layer.setVisible(true);
			} else {
				loadWFS_3D(storageId + ":tgd_cctv_status", "cctv");
			}
			
			break;
		case "lamp":
			layer = layerList.nameAtLayer("SL251");
			
			if (layer != null) {
				layer.setVisible(true);
			} else {
				loadLamp();
			}
			
			break;
	}
}

// 안전시설 초기화
function initSafeFacility(){
	var layerArr = [storageId + ":tgd_cctv_status", "SL251"];
	
	for(var i = 0; i < layerArr.length; i++){
		var layerList = new Module.JSLayerList(false);
		var layer = layerList.nameAtLayer(layerArr[i]);
		
		if(layer != null) layer.setVisible(false);
	}
}
</script>
					<!-- 안전시설물관리 -->					
					<div class="popup-body">
						<div class="bottom-popup-group">
							<!-- 검색영역 -->
							<div class="items search-area">
								<div class="top-search">
									<select id="facilityType" class="form-select">
										<option value="cctv">CCTV관리</option>
										<option value="lamp">가로등관리</option>
									</select>
								</div>
								<div class="tabBoxDepth2-wrap">
									<div class="tabBoxDepth2">
										<ul>
											<li data-tab="safetyFacility01" class="on"><button type="button" class="inner-tab">속성검색</button></li>
											<li data-tab="safetyFacility02"><button type="button" class="inner-tab">공간검색</button></li>
										</ul>
									</div>
									<div id="safetyFacility01" class="tab-cont on">
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
																<option value="">2021</option>
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
									<div id="safetyFacility02" class="tab-cont">
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
																<option value="">2021</option>
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
									<script>
										$(document).ready(function(){
											//tabBoxDepth2
											$(".tabBoxDepth2-wrap .tabBoxDepth2 > ul > li > .inner-tab").each(function(){ 
												$(this).click(function(){
													$(this).parent().addClass("on").siblings().removeClass("on");
													$("#"+$(this).parent().data("tab")).addClass("on").siblings().removeClass("on");
												});	
											});
										});
									</script>
								</div>
							</div>
							<!-- //검색영역 -->
							<div class="items data-area">
								<div class="bbs-top">
									<div class="bbs-list-num">조회결과 : <strong>50</strong>건</div>
									<div><button type="button" class="btn basic bi-write">등록</button> <button type="button" class="btn basic bi-excel">엑셀저장</button> <button type="button" class="btn basic bi-delete2">삭제</button></div>
								</div>
								<div class="bbs-list-wrap" style="height: 273px;"><!-- pagination 하단 고정을 위해 반드시 필요 -->
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
					<!-- //안전시설물관리 -->